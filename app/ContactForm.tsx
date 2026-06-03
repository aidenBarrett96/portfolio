"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Status = "idle" | "sending" | "sent" | "error";
type FieldErrors = { name?: boolean; email?: boolean; message?: boolean };

// Mirror the server-side check so we fail fast before the round-trip.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const [invalid, setInvalid] = useState<FieldErrors>({});

  // As soon as the visitor edits anything, clear a previous error/success so
  // the form feels live and the submit button comes back.
  function handleEdit() {
    if (status === "error" || status === "sent") {
      setStatus("idle");
      setError(null);
      setInvalid({});
    }
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      message: String(data.get("message") ?? "").trim(),
      // simple honeypot — bots fill hidden fields
      company: String(data.get("company") ?? ""),
    };

    const errs: FieldErrors = {
      name: !payload.name,
      email: !payload.email || !EMAIL_RE.test(payload.email),
      message: !payload.message,
    };

    if (errs.name || errs.email || errs.message) {
      setInvalid(errs);
      setStatus("error");
      setError(
        !payload.name || !payload.message
          ? "Mind filling in your name, email and a message?"
          : "That email doesn't look quite right."
      );
      const firstInvalid = errs.name ? "name" : errs.email ? "email" : "message";
      (form.elements.namedItem(firstInvalid) as HTMLElement | null)?.focus();
      return;
    }

    setInvalid({});
    setStatus("sending");
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error ?? "Something went wrong.");
      }
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Couldn't send that — try again in a sec?"
      );
    }
  }

  return (
    <form className="cf" onSubmit={onSubmit} onInput={handleEdit} noValidate>
      <div className="cf-row">
        <label className="cf-field">
          <span>Your name</span>
          <input
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            aria-invalid={invalid.name || undefined}
            required
          />
        </label>
        <label className="cf-field">
          <span>Email</span>
          <input
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="jane@company.com"
            aria-invalid={invalid.email || undefined}
            required
          />
        </label>
      </div>

      <label className="cf-field">
        <span>What&apos;s on your mind?</span>
        <textarea
          name="message"
          rows={4}
          placeholder="A rough idea is plenty — what you're after, roughly when, and any links that help."
          aria-invalid={invalid.message || undefined}
          required
        />
      </label>

      {/* honeypot — visually hidden, off-screen */}
      <input
        className="cf-hp"
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <div className="cf-foot">
        <button
          className="btn cf-submit"
          type="submit"
          disabled={status === "sending" || status === "sent"}
        >
          {status === "sending"
            ? "Sending…"
            : status === "sent"
              ? "Sent — thank you"
              : "Send it over"}
          {status !== "sent" && <span className="btn-arrow">→</span>}
        </button>

        <div className="cf-status" role="status" aria-live="polite">
          <AnimatePresence mode="wait">
            {status === "sent" && (
              <motion.span
                key="ok"
                className="cf-msg ok"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                Got it — I&apos;ll be in touch shortly.
              </motion.span>
            )}
            {status === "error" && error && (
              <motion.span
                key="err"
                className="cf-msg err"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {error}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </form>
  );
}
