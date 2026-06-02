"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
  useInView,
  animate,
  type Variants,
} from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const itemUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE },
  },
};

const charVariants: Variants = {
  hidden: { opacity: 0, y: "100%" },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const bootLog = [
  "// boot sequence",
  "loading kernel.....ok",
  "mounting /portfolio.....ok",
  "verifying signals.....ok",
  "init render pipeline.....ok",
];

function SplitText({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, wi) => (
        <span
          key={wi}
          style={{ display: "inline-block", overflow: "hidden", verticalAlign: "top" }}
        >
          {word.split("").map((ch, ci) => (
            <motion.span key={ci} className="fx-char" variants={charVariants}>
              {ch}
            </motion.span>
          ))}
          {wi < words.length - 1 && (
            <motion.span className="fx-char" variants={charVariants}>
              {" "}
            </motion.span>
          )}
        </span>
      ))}
    </span>
  );
}

function Boot({ onDone }: { onDone: () => void }) {
  const [stage, setStage] = useState(0);
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    const timers: number[] = [];
    bootLog.forEach((_, i) => {
      timers.push(window.setTimeout(() => setStage(i + 1), 220 + i * 220));
    });
    timers.push(window.setTimeout(() => onDoneRef.current(), 1500));
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div
      className="fx-boot"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5, ease: EASE } }}
    >
      <div className="fx-boot-inner">
        <motion.p
          className="fx-boot-line"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          ◦ AB-OS v2.6 · initializing
        </motion.p>
        <div className="fx-boot-bar">
          <motion.span
            initial={{ x: "-100%" }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
          />
        </div>
        <div className="fx-boot-log">
          {bootLog.slice(0, stage).map((line, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              <b>›</b> {line}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function CursorGlow() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 90, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 90, damping: 18, mass: 0.4 });

  useEffect(() => {
    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
    }
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return <motion.div className="fx-cursor" style={{ x: sx, y: sy }} />;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });
  return <motion.div className="fx-progress" style={{ scaleX }} />;
}

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  const display = to >= 10 ? Math.round(value) : value.toFixed(1);
  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

function ParallaxBand({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["10%", "-25%"]);
  return (
    <div ref={ref} className="fx-band-wrap" aria-hidden>
      <motion.div className="fx-band" style={{ x }}>
        {children}
      </motion.div>
    </div>
  );
}

const TESTIMONIALS = [
  {
    quote:
      "Shipped in three weeks what our last agency couldn't in three months. The animations actually feel intentional — every transition does something.",
    name: "Maya Chen",
    role: "Head of Product",
    org: "Lumen Studio",
    tag: "01 / 04",
  },
  {
    quote:
      "Aiden cares about the details that compound. Our checkout went from 'okay' to genuinely fast, and conversion lifted in the first week.",
    name: "Daniel Reyes",
    role: "CTO",
    org: "Northwind Commerce",
    tag: "02 / 04",
  },
  {
    quote:
      "Rare to find an engineer who can hold both the brand and the back-of-house in their head. We hired him for a week and kept him for six months.",
    name: "Aoife Quinn",
    role: "Design Lead",
    org: "Field Notes",
    tag: "03 / 04",
  },
  {
    quote:
      "He told us what not to build. I'd hire him again just for that.",
    name: "Tomás Reinhardt",
    role: "Founder",
    org: "Drift Labs",
    tag: "04 / 04",
  },
];

const MARQUEE = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "NODE",
  "POSTGRES",
  "SHOPIFY",
  "SANITY",
  "FRAMER MOTION",
  "THREE.JS",
  "TAILWIND",
  "VERCEL",
  "AI SDK",
];

const CAPS = [
  {
    id: "/01",
    title: "Interface engineering",
    body: "Production-grade UI with React, Next.js and TypeScript. Cache Components, server actions, edge-aware data fetching.",
    meta: ["React", "Next 16"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M3 7h18M3 12h12M3 17h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: "/02",
    title: "Motion + animation",
    body: "Framer Motion, scroll choreography, GPU-accelerated transitions. Interfaces that move with intent, not for show.",
    meta: ["FM 12", "Three.js"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="7" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 12h4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "/03",
    title: "Commerce + content",
    body: "Headless storefronts, Sanity / Contentful, payments and search. Built for editors and tuned for conversion.",
    meta: ["Shopify", "Sanity"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M5 7l1 12h12l1-12" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M9 7a3 3 0 016 0" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "/04",
    title: "Backend + infra",
    body: "Node, Postgres, Redis. Auth, queues, webhooks. Deployed on Vercel / Fluid Compute with observability baked in.",
    meta: ["Node", "Vercel"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="5" width="18" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        <rect x="3" y="13" width="18" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="7" cy="8" r="0.8" fill="currentColor" />
        <circle cx="7" cy="16" r="0.8" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "/05",
    title: "AI integration",
    body: "Claude, OpenAI, AI SDK. Streaming, tools, agents, RAG. Practical wiring that ships — not just demos.",
    meta: ["AI SDK", "MCP"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    id: "/06",
    title: "Design + systems",
    body: "Brand-to-build pipeline. Tokens, themes, component libraries. I design what I build — and care about it.",
    meta: ["Figma", "Tokens"],
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="4" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
        <rect x="13" y="4" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
        <rect x="4" y="13" width="7" height="7" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="16.5" cy="16.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
];

export function FuturisticView() {
  const [booting, setBooting] = useState(true);
  const [time, setTime] = useState("");

  // Match body bg to avoid cream peek on scroll-bounce
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "#05060a";
    return () => {
      document.body.style.background = prev;
    };
  }, []);

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const hh = String(d.getUTCHours()).padStart(2, "0");
      const mm = String(d.getUTCMinutes()).padStart(2, "0");
      const ss = String(d.getUTCSeconds()).padStart(2, "0");
      setTime(`${hh}:${mm}:${ss} UTC`);
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="fx-root">
      {/* Background layers */}
      <div className="fx-bg" aria-hidden>
        <motion.div
          className="fx-orb a"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ duration: 2, ease: EASE, delay: 0.6 }}
        />
        <motion.div
          className="fx-orb b"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.55, scale: 1 }}
          transition={{ duration: 2.2, ease: EASE, delay: 0.8 }}
        />
        <motion.div
          className="fx-orb c"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 2.4, ease: EASE, delay: 1 }}
        />
        <motion.div
          className="fx-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: EASE, delay: 0.4 }}
        />
        <motion.div
          className="fx-scan"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        />
        <div className="fx-noise" />
      </div>

      <CursorGlow />
      <ScrollProgress />

      <AnimatePresence>
        {booting && <Boot key="boot" onDone={() => setBooting(false)} />}
      </AnimatePresence>

      <motion.div
        className="fx-wrap"
        variants={containerVariants}
        initial="hidden"
        animate={booting ? "hidden" : "show"}
      >
        {/* Top nav */}
        <motion.div className="fx-nav" variants={itemUp}>
          <div className="fx-brand">
            <span className="fx-brand-dot" />
            <span>
              <b>AB</b>
              <span> · NODE 001 / LIVERPOOL</span>
            </span>
          </div>
          <div className="fx-nav-meta">
            <span>STATUS<b>ONLINE</b></span>
            <span>LAT<b>53.41°N</b></span>
            <span>SYS<b>{time || "--:--:-- UTC"}</b></span>
          </div>
        </motion.div>

        {/* Hero */}
        <section className="fx-hero">
          <motion.div
            className="fx-bracket tl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={booting ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
          />
          <motion.div
            className="fx-bracket tr"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={booting ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
          />
          <motion.div
            className="fx-bracket bl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={booting ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease: EASE }}
          />
          <motion.div
            className="fx-bracket br"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={booting ? {} : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6, ease: EASE }}
          />

          <div>
            <motion.div className="fx-eyebrow" variants={itemUp}>
              ◦ AIDEN BARRETT — FULL-STACK ENGINEER + DESIGNER
            </motion.div>

            <motion.h1
              className="fx-title"
              variants={containerVariants}
            >
              <SplitText text="Interfaces from" />
              <br />
              <SplitText text="the " />
              <span className="fx-grad">
                <SplitText text="near future." />
              </span>
            </motion.h1>

            <motion.p className="fx-lede" variants={itemUp}>
              Seven years shipping production software across startups, agencies
              and in-house teams. I design and build <b>animated, performant,
              considered</b> interfaces — and the systems that power them.
              Currently taking freelance work in commerce, content tooling and
              creative web.
            </motion.p>

            <motion.div className="fx-ctas" variants={itemUp}>
              <a className="fx-cta" href="mailto:aiden.e.barrett@gmail.com">
                Open channel
                <span className="fx-arrow">→</span>
              </a>
              <a className="fx-cta ghost" href="#capabilities">
                Browse capabilities
              </a>
            </motion.div>
          </div>

          {/* Right HUD */}
          <motion.div className="fx-hud" variants={itemUp}>
            <div className="fx-hud-head">
              <span>// SYSTEM READOUT</span>
              <b>● LIVE</b>
            </div>
            <dl className="fx-stats">
              <div className="fx-stat">
                <dt className="fx-stat-k">Years operational</dt>
                <dd className="fx-stat-v">
                  07<small>/ since 2019</small>
                </dd>
              </div>
              <div className="fx-stat">
                <dt className="fx-stat-k">Stacks shipped</dt>
                <dd className="fx-stat-row">
                  {["Next.js", "React", "Node", "Postgres", "TS", "AI SDK"].map(
                    (t) => (
                      <span className="fx-tag" key={t}>{t}</span>
                    )
                  )}
                </dd>
              </div>
              <div className="fx-stat">
                <dt className="fx-stat-k">Currently accepting</dt>
                <dd className="fx-stat-v" style={{ fontSize: 22 }}>
                  Freelance · Contract
                </dd>
              </div>
            </dl>
          </motion.div>
        </section>

        {/* Capabilities */}
        <section className="fx-section" id="capabilities">
          <motion.div
            className="fx-section-head"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div>
              <span className="fx-eyebrow">◦ /CAPABILITIES — SECTOR A</span>
              <h2>
                A modular set of <em>operating capabilities.</em>
              </h2>
            </div>
            <p>
              Each module ships independently. Mix and match for the project —
              I&apos;ll tell you what&apos;s overkill and what&apos;s missing.
            </p>
          </motion.div>

          <motion.div
            className="fx-grid-3"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.08 } },
            }}
          >
            {CAPS.map((c) => (
              <motion.article
                key={c.id}
                className="fx-card"
                variants={itemUp}
                whileHover={{ y: -6 }}
              >
                <div className="fx-card-id">{c.id}</div>
                <div className="fx-card-icon">{c.icon}</div>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
                <div className="fx-card-meta">
                  <span>{c.meta[0]}</span>
                  <span>{c.meta[1]}</span>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </section>

        {/* Counter strip */}
        <section className="fx-section">
          <motion.div
            className="fx-counters"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
          >
            <div className="fx-counter">
              <span className="fx-counter-k">YEARS SHIPPING</span>
              <span className="fx-counter-v">
                <Counter to={7} />
              </span>
            </div>
            <div className="fx-counter">
              <span className="fx-counter-k">PROJECTS DELIVERED</span>
              <span className="fx-counter-v">
                <Counter to={48} suffix="+" />
              </span>
            </div>
            <div className="fx-counter">
              <span className="fx-counter-k">CLIENT NPS</span>
              <span className="fx-counter-v">
                <Counter to={9.6} />
              </span>
            </div>
            <div className="fx-counter">
              <span className="fx-counter-k">DEPLOYS THIS WEEK</span>
              <span className="fx-counter-v">
                <Counter to={23} />
              </span>
            </div>
          </motion.div>
        </section>

        {/* Parallax band */}
        <ParallaxBand>
          BUILD · SHIP · POLISH · BUILD · SHIP · POLISH · BUILD · SHIP · POLISH ·
        </ParallaxBand>

        {/* Testimonials */}
        <section className="fx-section" id="signals">
          <motion.div
            className="fx-section-head"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <div>
              <span className="fx-eyebrow">◦ /SIGNALS — SECTOR B</span>
              <h2>
                Incoming <em>transmissions.</em>
              </h2>
            </div>
            <p>
              Real words from real people I&apos;ve worked with — lightly edited
              for the dossier.
            </p>
          </motion.div>

          <motion.div
            className="fx-testimonials"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.14 } },
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <motion.figure
                key={t.name}
                className="fx-tcard"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 60,
                    rotateX: 16,
                    filter: "blur(8px)",
                  },
                  show: {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.9, ease: EASE },
                  },
                }}
                whileHover={{ y: -4 }}
                style={{
                  alignSelf: i % 2 === 0 ? "start" : "end",
                }}
              >
                <div className="fx-tcard-head">
                  <span className="fx-tcard-quote">&ldquo;</span>
                  <span className="fx-tcard-tag">{t.tag}</span>
                </div>
                <blockquote className="fx-tcard-body">{t.quote}</blockquote>
                <figcaption className="fx-tcard-foot">
                  <span className="fx-tcard-avatar" aria-hidden>
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                  <span className="fx-tcard-who">
                    <b>{t.name}</b>
                    <span>
                      {t.role} · {t.org}
                    </span>
                  </span>
                </figcaption>
              </motion.figure>
            ))}
          </motion.div>
        </section>

        {/* Marquee */}
        <section className="fx-marquee" aria-hidden>
          <motion.div
            className="fx-marquee-track"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[...MARQUEE, ...MARQUEE].map((t, i) => (
              <span key={i} className="fx-marquee-item">
                {t}
                <span className="fx-marquee-dot" />
              </span>
            ))}
          </motion.div>
        </section>

        {/* Footer / contact */}
        <motion.footer
          className="fx-foot"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: EASE }}
        >
          <div>
            <span className="fx-eyebrow">◦ /CONTACT — DIRECT LINE</span>
            <h2>
              Have something to <em>build?</em>
            </h2>
            <a className="fx-cta" href="mailto:aiden.e.barrett@gmail.com">
              aiden.e.barrett@gmail.com
              <span className="fx-arrow">→</span>
            </a>
          </div>
          <div className="fx-foot-r">
            <dl className="fx-foot-meta">
              <div>
                <dt>Channels</dt>
                <dd>GitHub ↗</dd>
                <dd>LinkedIn ↗</dd>
                <dd>Read.cv ↗</dd>
              </div>
              <div>
                <dt>Coordinates</dt>
                <dd>Liverpool, UK</dd>
                <dd>53.41°N · 2.99°W</dd>
                <dd>GMT / BST</dd>
              </div>
            </dl>
            <span className="fx-foot-colophon">
              © 2026 — AB-OS v2.6 · Hand-built, no template
            </span>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
}
