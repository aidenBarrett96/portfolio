"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TSDemo,
  NextDemo,
  MotionDemo,
  ShopDemo,
  NodeDemo,
  CMSDemo,
} from "./demos";
import { ThreeDemo } from "./three-demo";
import { ContactForm } from "./ContactForm";

/* ─── Content ─── */

const facts: { k: string; v: string }[] = [
  { k: "Experience", v: "7 years" },
  { k: "Based", v: "Liverpool, UK · GMT" },
  { k: "Focus", v: "Commerce · SaaS · Creative" },
  { k: "Status", v: "Available — freelance & contract" },
];

const ticker = [
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "Framer Motion",
  "Three.js",
  "Stripe",
  "Shopify",
  "Sanity",
  "Postgres",
  "Edge runtime",
];

type Capability = {
  slug: string;
  title: string;
  blurb: string;
  file: string;
  tags: string[];
  Demo: React.ComponentType;
};

const capabilities: Capability[] = [
  {
    slug: "ecommerce",
    title: "Online stores that sell",
    blurb:
      "Product pages, carts and checkout on Stripe and Shopify — built to take real money on your busiest day without breaking a sweat. The boring reliability you actually want.",
    file: "Storefront & cart",
    tags: ["stripe", "shopify", "carts"],
    Demo: ShopDemo,
  },
  {
    slug: "nextjs",
    title: "Fast, modern websites",
    blurb:
      "Built on Next.js — the same toolkit behind some of the web's slickest sites. Scales from a one-pager to a full storefront, and stays quick to load and easy to add to.",
    file: "Page routing",
    tags: ["app-router", "rsc", "streaming"],
    Demo: NextDemo,
  },
  {
    slug: "cms",
    title: "Content you can edit yourself",
    blurb:
      "Sanity, Contentful and Payload, wired up so your team can change copy and images live — no waiting on me, no risky deploys. You get the keys to your own site.",
    file: "Content editor",
    tags: ["sanity", "payload", "preview"],
    Demo: CMSDemo,
  },
  {
    slug: "motion",
    title: "Motion that feels right",
    blurb:
      "Spring physics, drag and playful little transitions — the difference between a site that works and one that feels alive. Never jittery, never animation just to show off.",
    file: "Physics playground",
    tags: ["spring", "drag", "physics"],
    Demo: MotionDemo,
  },
  {
    slug: "threejs",
    title: "3D & interactive bits",
    blurb:
      "WebGL scenes for the moments that earn it — product configurators, hero pieces, and the kind of thing that makes people stop scrolling and have a play.",
    file: "3D scene",
    tags: ["webgl", "shaders", "scene"],
    Demo: ThreeDemo,
  },
  {
    slug: "node",
    title: "APIs & the behind-the-scenes",
    blurb:
      "The plumbing that makes it all work — APIs, queues, jobs and integrations, with the auth, rate-limiting and error handling quietly sorted so nothing falls over.",
    file: "Request pipeline",
    tags: ["express", "queues", "api"],
    Demo: NodeDemo,
  },
  {
    slug: "typescript",
    title: "Built to last",
    blurb:
      "Under the hood it's all TypeScript — which is a fancy way of saying the code catches its own mistakes before they reach you, and the next dev can pick it up without a headache.",
    file: "Type inference",
    tags: ["strict", "infer", "narrow"],
    Demo: TSDemo,
  },
];

type Project = {
  slug: string;
  name: string;
  sector: string;
  blurb: string;
  url?: string;
  domain: string;
  tags: string[];
  accent: string;
  image: string;
};

const projects: Project[] = [
  {
    slug: "flowtech",
    name: "Flowtech",
    sector: "Fluid power · headless commerce",
    blurb:
      "A high-throughput store for a UK fluid-power specialist — thousands of parts searchable by code, brand or tech sheet, with trade pricing, next-day delivery and same-day despatch. Vendure drives the commerce, Payload the content, all containerised on Kubernetes across AWS and built as a white-label platform ready to spin up new storefronts.",
    url: "https://flowtech.co.uk",
    domain: "flowtech.co.uk",
    tags: ["Next.js", "TypeScript", "Payload CMS", "Vendure", "AWS", "Kubernetes", "Tailwind"],
    accent: "#1f86e0",
    image: "/projects/flowtech.jpeg",
  },
  {
    slug: "northern-air",
    name: "Northern Air Solutions",
    sector: "Marketing site",
    blurb:
      "A motion-led marketing site with editorial content managed in Payload CMS, and Framer Motion driving the storytelling as you scroll.",
    url: "https://www.northernairsolutions.co.uk/",
    domain: "northernairsolutions.co.uk",
    tags: ["Next.js", "TypeScript", "Payload CMS", "Framer Motion", "Tailwind"],
    accent: "#16b5c4",
    image: "/projects/northern-air.jpeg",
  },
  {
    slug: "macallan",
    name: "The Macallan",
    sector: "Single malt Scotch · brand & commerce",
    blurb:
      "The home of the incomparable single malt — an editorial commerce experience spanning the Timeless Collections, rare limited releases and The Macallan Estate, all carrying its mastery of wood and spirit since 1824. Next.js and Framer Motion up front, content from Drupal, hosted on Azure.",
    url: "https://www.themacallan.com/en",
    domain: "themacallan.com",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Drupal", "Azure", "Tailwind"],
    accent: "#c08231",
    image: "/projects/macallan.jpeg",
  },
  {
    slug: "mvmnt",
    name: "Mvmnt",
    sector: "Fitness app · marketing site",
    blurb:
      "The site for a beginner-friendly workout app — 400+ short, coached sessions spanning strength, yoga, cardio and meditation, most under ten minutes. Content runs on Contentful, with Framer Motion bringing the movement to life.",
    url: "https://www.mvmnt.com/",
    domain: "mvmnt.com",
    tags: ["Next.js", "TypeScript", "Contentful", "Framer Motion", "Tailwind"],
    accent: "#4aa63c",
    image: "/projects/mvmnt.jpeg",
  },
];

const approach = [
  {
    n: "01",
    h: "We start with a chat",
    p: "Bring me the idea — even if it's still half-baked. I'll tell you straight what's a day's work, what's a month, and what's honestly not worth building at all.",
  },
  {
    n: "02",
    h: "You see it every week",
    p: "No three-month silences and a big reveal. Working bits land regularly, so we catch the wrong turns early and never drift off down a rabbit hole.",
  },
  {
    n: "03",
    h: "I sweat the small stuff",
    p: "The animations, the copy, the fiddly edge cases — that last ten percent is what makes something feel proper. It's baked into the price, not bolted on at the end.",
  },
];

const testimonials = [
  {
    quote:
      "Working with Aiden was an absolute pleasure. Not only a talented developer who consistently exceeded our expectations, but also a really great team player. Highly recommend.",
    name: "Lizzie Hindle",
    role: "CEO, Round World Digital",
  },
  {
    quote:
      "Aiden slotted in to our fast-paced team very well. His experience and ingenuity with Next.js, and willingness to educate and support others, made him a pleasure to work with.",
    name: "Paul Gregory",
    role: "Solutions Architect / Tech Lead, Access",
  },
  {
    quote:
      "Aiden is a skilled React developer — efficient, and he always got things done. Plus he made the work environment nicer with his positive attitude. Highly recommend him!",
    name: "Ismael Abu-jadur",
    role: "Front-end Developer, Access",
  },
];

/* ─── Reusable bits ─── */

const ease = [0.16, 1, 0.3, 1] as const;

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Showcase (mini code windows) ─── */

function Showcase() {
  const [active, setActive] = useState(0);
  const cap = capabilities[active];
  const { Demo } = cap;

  return (
    <div className="sh">
      <ol className="sh-index" role="tablist" aria-label="Capabilities">
        {capabilities.map((c, i) => (
          <li key={c.slug}>
            <button
              role="tab"
              aria-selected={i === active}
              className={`sh-item${i === active ? " on" : ""}`}
              onClick={() => setActive(i)}
            >
              <span className="sh-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="sh-name">{c.title}</span>
              <span className="sh-arrow">→</span>
            </button>
          </li>
        ))}
      </ol>

      <div className="sh-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={cap.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
          >
            <div className="sh-copy">
              <h3>{cap.title}</h3>
              <p>{cap.blurb}</p>
              <div className="sh-tags">
                {cap.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            <figure className="cw">
              <div className="cw-bar">
                <span className="cw-tag">{cap.file}</span>
                <span className="cw-hint">
                  <i className="cw-pulse" /> live — have a play
                </span>
              </div>
              <div className="t-root cw-screen">
                <Demo />
              </div>
            </figure>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Recent work (interactive browser windows) ─── */

function Projects() {
  const [active, setActive] = useState(0);
  const p = projects[active];

  return (
    <div className="pj">
      <ol className="pj-index" role="tablist" aria-label="Recent projects">
        {projects.map((proj, i) => (
          <li key={proj.slug}>
            <button
              role="tab"
              aria-selected={i === active}
              className={`pj-item${i === active ? " on" : ""}`}
              onClick={() => setActive(i)}
              style={{ "--pa": proj.accent } as React.CSSProperties}
            >
              <span className="pj-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="pj-info">
                <span className="pj-name">{proj.name}</span>
                <span className="pj-sector">{proj.sector}</span>
              </span>
              <span className="pj-dot" />
            </button>
          </li>
        ))}
      </ol>

      <div className="pj-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.slug}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease }}
            style={{ "--pa": p.accent } as React.CSSProperties}
          >
            <div className="pj-copy">
              <span className="pj-kicker">{p.sector}</span>
              <h3>{p.name}</h3>
              <p>{p.blurb}</p>
              <div className="pj-tags">
                {p.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>

            <figure className="bw">
              <div className="bw-bar">
                <span className="cw-dots">
                  <i /> <i /> <i />
                </span>
                <span className="bw-url">
                  <span className="bw-lock">{p.url ? "🔒" : "▦"}</span>
                  {p.url ? p.domain : p.domain}
                </span>
                {p.url ? (
                  <a
                    className="bw-visit"
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit ↗
                  </a>
                ) : (
                  <span className="bw-visit disabled">Case study</span>
                )}
              </div>

              {p.url ? (
                <a
                  className="bw-shot"
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open ${p.name}`}
                >
                  <img src={p.image} alt={`${p.name} homepage`} loading="lazy" />
                </a>
              ) : (
                <div className="bw-shot">
                  <img src={p.image} alt={`${p.name} homepage`} loading="lazy" />
                </div>
              )}
            </figure>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Page ─── */

export function SiteView() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site">
      <div className="site-grain" aria-hidden />

      <header className="nav">
        <a className="nav-mark" href="#top" onClick={closeMenu}>
          <span className="nav-mark-star">✦</span> Aiden&nbsp;Barrett
        </a>
        <nav className="nav-links">
          <a href="#projects">Work</a>
          <a href="#work">Skills</a>
          <a href="#approach">Approach</a>
          <a href="#contact">Contact</a>
        </nav>
        <span className="nav-status">
          <i /> Open to work
        </span>
        <button
          type="button"
          className={`nav-toggle${menuOpen ? " open" : ""}`}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="nav-mobile"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.24, ease }}
          >
            <a href="#projects" onClick={closeMenu}>Work</a>
            <a href="#work" onClick={closeMenu}>Skills</a>
            <a href="#approach" onClick={closeMenu}>Approach</a>
            <a href="#contact" onClick={closeMenu}>Contact</a>
            <span className="nav-mobile-status">
              <i /> Open to work
            </span>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className="wrap" id="top">
        {/* Hero */}
        <section className="hero">
          <div className="hero-main">
            <motion.span
              className="kicker"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              Freelance engineer & designer — Liverpool, UK
            </motion.span>

            <h1 className="hero-h1">
              {["I build websites", "that work hard", "and show off,"].map(
                (line, i) => (
                  <motion.span
                    key={i}
                    className="hero-line"
                    initial={{ opacity: 0, y: 28 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.08 + i * 0.08, ease }}
                  >
                    {line === "and show off," ? (
                      <em>and show off.</em>
                    ) : (
                      line
                    )}
                  </motion.span>
                )
              )}
            </h1>

            <motion.p
              className="hero-lede"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease }}
            >
              Seven years building things for the web — for scrappy startups,
              busy agencies and a few household-name brands. I live where the
              pretty design meets the gnarly engineering, and I&apos;m taking on
              freelance projects right now: online stores, content tools, and
              the occasional gloriously weird idea.
            </motion.p>

            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55, ease }}
            >
              <a className="btn" href="#contact">
                Start a project <span className="btn-arrow">→</span>
              </a>
              <a className="btn ghost" href="#work">
                See the work
              </a>
            </motion.div>
          </div>

          <motion.aside
            className="hero-facts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
          >
            <dl>
              {facts.map((f) => (
                <div className="fact" key={f.k}>
                  <dt>{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </motion.aside>
        </section>

        {/* Ticker */}
        <div className="ticker" aria-hidden>
          <div className="ticker-row">
            {[...ticker, ...ticker].map((t, i) => (
              <span key={i}>
                {t}
                <i>✦</i>
              </span>
            ))}
          </div>
        </div>

        {/* Work */}
        <section className="section" id="work">
          <Reveal className="section-head">
            <span className="eyebrow">/ 01 — Selected capabilities</span>
            <h2>
              A few things I&apos;m <em>good at</em>.
            </h2>
            <p className="section-meta">
              Pick one to see it running. Each preview is built with the same
              tools I&apos;d reach for on your project.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Showcase />
          </Reveal>
        </section>

        {/* Recent work */}
        <section className="section" id="projects">
          <Reveal className="section-head">
            <span className="eyebrow">/ 02 — Recent work</span>
            <h2>
              Things I&apos;ve <em>shipped</em>.
            </h2>
            <p className="section-meta">
              A selection of recent client builds. Click through — each preview
              links out to the live site where it&apos;s public.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Projects />
          </Reveal>
        </section>

        {/* Approach */}
        <section className="section" id="approach">
          <Reveal className="section-head">
            <span className="eyebrow">/ 03 — How I work</span>
            <h2>
              No surprises, just <em>good work</em>.
            </h2>
          </Reveal>
          <div className="approach">
            {approach.map((a, i) => (
              <Reveal key={a.n} delay={i * 0.08} className="approach-card">
                <span className="approach-num">{a.n}</span>
                <h3>{a.h}</h3>
                <p>{a.p}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="section" id="words">
          <Reveal className="section-head">
            <span className="eyebrow">/ 04 — Kind words</span>
            <h2>
              What people <em>say</em>.
            </h2>
          </Reveal>
          <div className="quotes">
            {testimonials.map((t, i) => {
              const initials = t.name
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("");
              return (
                <Reveal key={t.name} delay={i * 0.08}>
                  <figure className="quote">
                    <span className="quote-mark" aria-hidden>
                      &ldquo;
                    </span>
                    <blockquote>{t.quote}</blockquote>
                    <figcaption>
                      <span className="quote-av" aria-hidden>
                        {initials}
                      </span>
                      <span className="quote-id">
                        <span className="quote-name">{t.name}</span>
                        <span className="quote-role">{t.role}</span>
                      </span>
                    </figcaption>
                  </figure>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* Contact */}
        <footer className="foot" id="contact">
          <Reveal className="foot-main">
            <span className="eyebrow">/ Contact</span>
            <h2 className="foot-h">
              Got something
              <br />
              in mind? <em>Let&apos;s build it.</em>
            </h2>
            <p className="foot-sub">
              Tell me a little about the project — even a rough idea is plenty.
              I read every message and usually reply within a day.
            </p>
            <ContactForm />
          </Reveal>
          <div className="foot-meta">
            <div>
              <span className="foot-lbl">Elsewhere</span>
              <a
                href="https://github.com/aidenBarrett96"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </a>
              <a
                href="https://www.linkedin.com/in/aiden-barrett-b7687b178/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn ↗
              </a>
            </div>
            <div>
              <span className="foot-lbl">Location</span>
              <span>Liverpool, UK</span>
              <span>GMT / BST</span>
            </div>
          </div>
        </footer>

        <div className="colophon">
          <span>© 2026 — Aiden Barrett</span>
          <span>Designed &amp; built from scratch · no template</span>
        </div>
      </main>
    </div>
  );
}
