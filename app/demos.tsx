"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ─── 01 TypeScript ─── */
type TSToken = {
  text: string;
  cls?: "kw" | "str" | "type" | "punct";
  hover?: { name: string; type: string };
};

const tsLines: TSToken[][] = [
  [
    { text: "const ", cls: "kw" },
    {
      text: "users",
      hover: {
        name: "users",
        type: 'readonly [{ readonly name: "Aiden"; readonly role: "engineer" }, ...]',
      },
    },
    { text: " = [", cls: "punct" },
  ],
  [
    { text: "  { name: " },
    { text: '"Aiden"', cls: "str" },
    { text: ", role: " },
    { text: '"engineer"', cls: "str" },
    { text: " }," },
  ],
  [
    { text: "  { name: " },
    { text: '"Mira"', cls: "str" },
    { text: ",  role: " },
    { text: '"designer"', cls: "str" },
    { text: " }," },
  ],
  [{ text: "] " }, { text: "as const", cls: "kw" }],
  [{ text: "" }],
  [
    { text: "type ", cls: "kw" },
    {
      text: "Role",
      cls: "type",
      hover: { name: "Role", type: '"engineer" | "designer"' },
    },
    { text: " = typeof users[" },
    { text: "number", cls: "type" },
    { text: "][" },
    { text: '"role"', cls: "str" },
    { text: "]" },
  ],
];

export function TSDemo() {
  const [name, setName] = useState("users");
  const active = tsLines.flat().find((t) => t.hover?.name === name)?.hover;

  return (
    <div className="t-ts">
      <pre>
        {tsLines.map((line, i) => (
          <div key={i}>
            <span className="ln">{String(i + 1).padStart(2, "0")}</span>
            {line.map((t, j) =>
              t.hover ? (
                <span
                  key={j}
                  className={`hov${name === t.hover.name ? " on" : ""}${
                    t.cls ? ` ${t.cls}` : ""
                  }`}
                  onMouseEnter={() => setName(t.hover!.name)}
                  onClick={() => setName(t.hover!.name)}
                >
                  {t.text}
                </span>
              ) : (
                <span key={j} className={t.cls}>
                  {t.text}
                </span>
              )
            )}
          </div>
        ))}
      </pre>
      {active && (
        <motion.div
          key={active.name}
          className="out"
          initial={{ opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.15 }}
        >
          <span className="lbl">› inferred</span>
          <span>
            {active.name}
            <span className="t-punct">: </span>
            <span className="type-out">{active.type}</span>
          </span>
        </motion.div>
      )}
    </div>
  );
}

/* ─── 02 Next.js ─── */
type NxRoute = {
  id: string;
  file: string;
  url: string;
  segments: { label: string; dynamic?: boolean }[];
  body: string;
  note: string;
};

const nxTree: NxRoute[] = [
  {
    id: "root",
    file: "app/page.tsx",
    url: "/",
    segments: [{ label: "/" }],
    body: "Home",
    note: "Server Component · static",
  },
  {
    id: "about",
    file: "app/about/page.tsx",
    url: "/about",
    segments: [{ label: "/about" }],
    body: "About",
    note: "Server Component · static",
  },
  {
    id: "blog",
    file: "app/blog/[slug]/page.tsx",
    url: "/blog/hello-world",
    segments: [{ label: "/blog" }, { label: "/[slug]", dynamic: true }],
    body: "Hello world",
    note: "Dynamic · revalidate 60s",
  },
  {
    id: "shop",
    file: "app/shop/(store)/[id]/page.tsx",
    url: "/shop/sk-194",
    segments: [
      { label: "/shop" },
      { label: "/(store)" },
      { label: "/[id]", dynamic: true },
    ],
    body: "Product · SK-194",
    note: "Streamed · RSC",
  },
];

export function NextDemo() {
  const [activeId, setActiveId] = useState("blog");
  const active = nxTree.find((r) => r.id === activeId)!;

  return (
    <div className="t-nx">
      <div className="t-nx-tree">
        <div className="t-nx-head">app/</div>
        <ul>
          {nxTree.map((r) => {
            const indent = (r.file.match(/\//g)?.length ?? 1) - 1;
            const filename = r.file.split("/").slice(-2).join("/");
            return (
              <li
                key={r.id}
                className={`t-nx-item${activeId === r.id ? " on" : ""}`}
                style={{ paddingLeft: 8 + indent * 12 }}
                onClick={() => setActiveId(r.id)}
              >
                <span className="caret">▸</span> {filename}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="t-nx-out">
        <div className="t-nx-url">
          <span className="t-nx-url-lbl">URL</span>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              className="t-nx-segments"
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.22 }}
            >
              {active.segments.map((s, i) => (
                <span
                  key={i}
                  className={`t-nx-seg${s.dynamic ? " dyn" : ""}`}
                >
                  {s.label}
                </span>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            className="t-nx-render"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="t-nx-render-bar">
              <span className="dot" /> 200 OK · {active.url}
            </div>
            <div className="t-nx-render-body">
              <strong>{active.body}</strong>
              <span>{active.note}</span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── 03 Motion ─── */
const glyphs = [
  { ch: "◉", cls: "" },
  { ch: "▣", cls: "c-green" },
  { ch: "▲", cls: "c-cyan" },
  { ch: "✦", cls: "c-red" },
];

type Body = { x: number; y: number; vx: number; vy: number; r: number };

export function MotionDemo() {
  const stageRef = useRef<HTMLDivElement>(null);
  const shapeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bodies = useRef<Body[]>([]);
  const dragIdx = useRef<number | null>(null);
  const lastPtr = useRef<{ x: number; y: number; dx: number; dy: number } | null>(null);

  function reseedBodies(impulse = 5) {
    const stage = stageRef.current;
    if (!stage) return;
    const W = stage.clientWidth;
    const H = stage.clientHeight;
    const r = 26;
    bodies.current = glyphs.map(() => {
      // Scatter freely across the stage (kept clear of the walls) and fling
      // each shape off in a random direction at a random-ish speed.
      const dir = Math.random() * Math.PI * 2;
      const speed = impulse * (0.5 + Math.random() * 1.1);
      return {
        x: r + Math.random() * Math.max(1, W - r * 2),
        y: r + Math.random() * Math.max(1, H - r * 2),
        vx: Math.cos(dir) * speed,
        vy: Math.sin(dir) * speed,
        r,
      };
    });
  }

  useEffect(() => {
    reseedBodies();
    let raf = 0;

    function tick() {
      const stage = stageRef.current;
      if (!stage) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const b = bodies.current;

      // 1. Integrate (skip the dragged body)
      for (let i = 0; i < b.length; i++) {
        if (dragIdx.current === i) continue;
        b[i].x += b[i].vx;
        b[i].y += b[i].vy;
        b[i].vx *= 0.992;
        b[i].vy *= 0.992;
      }

      // 2. Walls (elastic with restitution)
      const e = 0.78;
      for (let i = 0; i < b.length; i++) {
        const body = b[i];
        if (dragIdx.current === i) continue;
        if (body.x - body.r < 0) { body.x = body.r; body.vx = Math.abs(body.vx) * e; }
        if (body.x + body.r > W) { body.x = W - body.r; body.vx = -Math.abs(body.vx) * e; }
        if (body.y - body.r < 0) { body.y = body.r; body.vy = Math.abs(body.vy) * e; }
        if (body.y + body.r > H) { body.y = H - body.r; body.vy = -Math.abs(body.vy) * e; }
      }

      // 3. Pairwise circle collisions
      for (let i = 0; i < b.length; i++) {
        for (let j = i + 1; j < b.length; j++) {
          const a = b[i], c = b[j];
          const dx = c.x - a.x;
          const dy = c.y - a.y;
          const dist = Math.hypot(dx, dy);
          const minDist = a.r + c.r;
          if (dist > 0 && dist < minDist) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            const aDrag = dragIdx.current === i;
            const cDrag = dragIdx.current === j;
            if (aDrag && !cDrag) {
              c.x += nx * overlap;
              c.y += ny * overlap;
            } else if (cDrag && !aDrag) {
              a.x -= nx * overlap;
              a.y -= ny * overlap;
            } else if (!aDrag && !cDrag) {
              a.x -= (nx * overlap) / 2;
              a.y -= (ny * overlap) / 2;
              c.x += (nx * overlap) / 2;
              c.y += (ny * overlap) / 2;
            }
            const rvx = c.vx - a.vx;
            const rvy = c.vy - a.vy;
            const vn = rvx * nx + rvy * ny;
            if (vn < 0) {
              const rest = 0.88;
              const impulse = (-(1 + rest) * vn) / 2;
              const ix = impulse * nx;
              const iy = impulse * ny;
              if (!aDrag) { a.vx -= ix; a.vy -= iy; }
              if (!cDrag) { c.vx += ix; c.vy += iy; }
            }
          }
        }
      }

      // 4. Write transforms
      for (let i = 0; i < b.length; i++) {
        const el = shapeRefs.current[i];
        if (el) {
          el.style.transform = `translate(${b[i].x - b[i].r}px, ${b[i].y - b[i].r}px)`;
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  function onDown(i: number) {
    return (e: React.PointerEvent<HTMLDivElement>) => {
      e.currentTarget.setPointerCapture(e.pointerId);
      dragIdx.current = i;
      const stage = stageRef.current!;
      const rect = stage.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      lastPtr.current = { x: px, y: py, dx: 0, dy: 0 };
    };
  }

  function onMove(i: number) {
    return (e: React.PointerEvent<HTMLDivElement>) => {
      if (dragIdx.current !== i) return;
      const stage = stageRef.current!;
      const rect = stage.getBoundingClientRect();
      const px = e.clientX - rect.left;
      const py = e.clientY - rect.top;
      const body = bodies.current[i];
      const prev = lastPtr.current!;
      body.x = px;
      body.y = py;
      lastPtr.current = { x: px, y: py, dx: px - prev.x, dy: py - prev.y };
    };
  }

  function onUp(i: number) {
    return () => {
      if (dragIdx.current !== i) return;
      const lp = lastPtr.current;
      if (lp) {
        bodies.current[i].vx = lp.dx;
        bodies.current[i].vy = lp.dy;
      }
      dragIdx.current = null;
      lastPtr.current = null;
    };
  }

  return (
    <div>
      <div className="t-motion-stage" ref={stageRef}>
        {glyphs.map((g, i) => (
          <div
            key={i}
            ref={(el) => {
              shapeRefs.current[i] = el;
            }}
            className={`t-motion-shape ${g.cls}`}
            onPointerDown={onDown(i)}
            onPointerMove={onMove(i)}
            onPointerUp={onUp(i)}
            onPointerCancel={onUp(i)}
          >
            {g.ch}
          </div>
        ))}
      </div>
      <div className="t-motion-foot">
        <button className="t-btn" onClick={() => reseedBodies(7)}>
          ↻ reseed
        </button>
        <span>drag · collide · bounce</span>
      </div>
    </div>
  );
}

/* ─── 04 E-commerce ─── */
type ShopProduct = {
  id: string;
  name: string;
  sub: string;
  price: number;
  swatch: string;
};

const shopProducts: ShopProduct[] = [
  { id: "p1", name: "Cliff Lamp", sub: "Travertine · 06", price: 240, swatch: "#dccfa9" },
  { id: "p2", name: "Field Bowl", sub: "Stoneware · L",   price: 96,  swatch: "var(--green)" },
  { id: "p3", name: "Echo Vase",  sub: "Hand-thrown",      price: 184, swatch: "var(--accent-hot)" },
];

function ShopAnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (v) => `$${v.toFixed(0)}`);
  useEffect(() => {
    const c = animate(mv, value, { duration: 0.45, ease: [0.16, 1, 0.3, 1] });
    return c.stop;
  }, [value, mv]);
  return <motion.span>{rounded}</motion.span>;
}

export function ShopDemo() {
  const [cart, setCart] = useState<Record<string, number>>({});

  function add(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
  }
  function remove(id: string) {
    setCart((c) => {
      const next = { ...c };
      if (!next[id]) return next;
      if (next[id] <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  }

  const items = Object.entries(cart).map(([id, qty]) => ({
    ...shopProducts.find((p) => p.id === id)!,
    qty,
  }));
  const total = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count = items.reduce((s, i) => s + i.qty, 0);

  return (
    <div className="t-ec">
      <div className="t-ec-grid">
        {shopProducts.map((p) => (
          <div className="t-ec-card" key={p.id}>
            <div className="t-ec-swatch" style={{ background: p.swatch }} />
            <div className="t-ec-name">{p.name}</div>
            <div className="t-ec-sub">{p.sub}</div>
            <button className="t-ec-add" onClick={() => add(p.id)}>
              <span>${p.price}</span>
              <span className="plus">＋ Add</span>
            </button>
          </div>
        ))}
      </div>

      <div className="t-ec-cart">
        <div className="t-ec-cart-head">
          <span>Bag</span>
          <span className="t-ec-count">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={count}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                {count} item{count === 1 ? "" : "s"}
              </motion.span>
            </AnimatePresence>
          </span>
        </div>

        <div className="t-ec-items">
          <AnimatePresence initial={false}>
            {items.length === 0 && (
              <motion.div
                key="empty"
                className="t-ec-empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Your bag is empty.
              </motion.div>
            )}
            {items.map((i) => (
              <motion.div
                key={i.id}
                className="t-ec-item"
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              >
                <span
                  className="t-ec-item-sw"
                  style={{ background: i.swatch }}
                />
                <span className="t-ec-item-name">{i.name}</span>
                <div className="t-ec-qty">
                  <button onClick={() => remove(i.id)} aria-label="decrease">
                    −
                  </button>
                  <span>{i.qty}</span>
                  <button onClick={() => add(i.id)} aria-label="increase">
                    ＋
                  </button>
                </div>
                <span className="t-ec-item-price">${i.price * i.qty}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="t-ec-total">
          <span>Subtotal</span>
          <strong>
            <ShopAnimatedNumber value={total} />
          </strong>
        </div>
      </div>
    </div>
  );
}

/* ─── 05 Node ─── */
const eps = [
  { id: "list",   method: "GET",    path: "/api/products",      status: 200, ms: 38 },
  { id: "create", method: "POST",   path: "/api/orders",        status: 201, ms: 64 },
  { id: "del",    method: "DELETE", path: "/api/sessions/3a8b", status: 204, ms: 22 },
];

const layers = ["cors", "auth", "rate-limit", "router", "handler"];

export function NodeDemo() {
  const [activeId, setActiveId] = useState("list");
  const [tick, setTick] = useState(0);
  const [stage, setStage] = useState(-1);
  const e = eps.find((x) => x.id === activeId)!;

  useEffect(() => {
    setStage(-1);
    const ts: number[] = [];
    layers.forEach((_, i) => {
      ts.push(window.setTimeout(() => setStage(i), 220 + i * 240));
    });
    return () => ts.forEach(clearTimeout);
  }, [tick, activeId]);

  return (
    <div className="t-node">
      <div className="routes">
        {eps.map((ep) => (
          <button
            key={ep.id}
            className={`route${activeId === ep.id ? " on" : ""}`}
            onClick={() => {
              setActiveId(ep.id);
              setTick((t) => t + 1);
            }}
          >
            {ep.method} {ep.path}
          </button>
        ))}
      </div>
      <div className="pipe">
        <div style={{ color: "var(--accent)", marginBottom: 4 }}>
          $ curl -X {e.method} api{e.path}
        </div>
        {layers.map((l, i) => {
          const hit = stage >= i;
          const active = stage === i;
          return (
            <div
              key={l}
              className={`step${hit ? " hit" : ""}${active ? " active" : ""}`}
            >
              <span className="mark">{hit ? "✓" : "·"}</span>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <span>{l.padEnd(14, " ")}</span>
              <span className="ms">{hit ? `${(i + 1) * 6}ms` : "—"}</span>
            </div>
          );
        })}
        {stage >= layers.length - 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: 8,
              paddingTop: 8,
              borderTop: "1px dashed var(--rule)",
              color: "var(--green)",
            }}
          >
            ← {e.status} OK · {e.ms}ms · {`{ "ok": true }`}
          </motion.div>
        )}
      </div>
    </div>
  );
}

/* ─── 06 CMS ─── */
export function CMSDemo() {
  const [doc, setDoc] = useState({
    badge: "field notes",
    title: "On building things that last.",
    body: "Versioned, previewed, shipped. Content modelled like an API — decoupled from the frontend it feeds.",
    color: "blue" as "blue" | "green" | "cyan",
  });

  function upd<K extends keyof typeof doc>(k: K, v: (typeof doc)[K]) {
    setDoc((d) => ({ ...d, [k]: v }));
  }

  const bMap: Record<string, string> = { blue: "", green: "b-green", cyan: "b-cyan" };

  return (
    <div className="t-cms">
      <div className="pane-l">
        <div className="pane-tag">~/post.yml</div>
        <div className="row">
          <label>badge:</label>
          <input value={doc.badge} onChange={(e) => upd("badge", e.target.value)} maxLength={24} />
        </div>
        <div className="row">
          <label>title:</label>
          <input value={doc.title} onChange={(e) => upd("title", e.target.value)} maxLength={56} />
        </div>
        <div className="row">
          <label>body:</label>
          <textarea
            value={doc.body}
            onChange={(e) => upd("body", e.target.value)}
            rows={4}
            maxLength={180}
          />
        </div>
        <div className="row">
          <label>color:</label>
          <div style={{ display: "flex", gap: 6 }}>
            {(["blue", "green", "cyan"] as const).map((c) => (
              <button
                key={c}
                onClick={() => upd("color", c)}
                style={{
                  padding: "2px 8px",
                  background: doc.color === c ? "var(--accent)" : "transparent",
                  color: doc.color === c ? "var(--bg)" : "var(--fg-soft)",
                  border: "1px solid var(--rule)",
                  fontFamily: "var(--f-mono)",
                  fontSize: 10,
                  letterSpacing: "0.12em",
                  cursor: "pointer",
                }}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pane-r">
        <div className="pane-tag">{":preview"}</div>
        <motion.div className="preview" layout transition={{ duration: 0.3 }}>
          <motion.span layout className={`badge ${bMap[doc.color]}`}>
            {doc.badge || "—"}
          </motion.span>
          <motion.h4 layout>{doc.title || "Untitled"}</motion.h4>
          <motion.p layout>{doc.body || "(no body)"}</motion.p>
        </motion.div>
      </div>
    </div>
  );
}

