import { NextResponse } from "next/server";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  message?: string;
  company?: string; // honeypot
};

// Where enquiries land. Kept server-side so it never appears on the page.
const TO = process.env.CONTACT_TO ?? "aiden.e.barrett@gmail.com";

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();

  // Bot fell into the honeypot — pretend everything's fine.
  if ((body.company ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email and a message." },
      { status: 422 }
    );
  }
  if (!emailRe.test(email)) {
    return NextResponse.json(
      { error: "That email doesn't look quite right." },
      { status: 422 }
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "That message is a little long — can you trim it down?" },
      { status: 422 }
    );
  }

  const key = process.env.RESEND_API_KEY;

  // No provider wired up yet (e.g. local dev) — accept the message so the
  // UI flow works, and log it so nothing is silently lost.
  if (!key) {
    console.info("[contact] (no RESEND_API_KEY set) new enquiry:", {
      name,
      email,
      message,
    });
    return NextResponse.json({ ok: true });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [TO],
        reply_to: email,
        subject: `New project enquiry from ${name}`,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[contact] resend error:", res.status, detail);
      return NextResponse.json(
        { error: "Couldn't send right now — please try again shortly." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[contact] send failed:", err);
    return NextResponse.json(
      { error: "Couldn't send right now — please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
