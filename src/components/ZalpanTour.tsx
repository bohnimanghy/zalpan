"use client";

import { useState } from "react";

const DISPLAY = "var(--font-bricolage), 'Bricolage Grotesque', sans-serif";
const MONO = "var(--font-plex-mono), 'IBM Plex Mono', monospace";

type Panel = {
  key: string;
  tab: string;
  title: string;
  desc: string;
  stats: { v: string; l: string }[];
  visual: React.ReactNode;
};

function Row({ a, b, dim }: { a: string; b: string; dim?: boolean }) {
  return (
    <div
      className="flex items-center justify-between"
      style={{ fontSize: 12.5, color: dim ? "#9C9488" : "#E7DDC9" }}
    >
      <span>{a}</span>
      <span style={{ color: "#fff", fontWeight: 600 }}>{b}</span>
    </div>
  );
}

function VisualShell({
  label,
  status,
  children,
}: {
  label: string;
  status?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        width: "100%",
        maxWidth: 340,
        background: "#1F1A16",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14,
        padding: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 14,
        }}
      >
        <span
          style={{
            fontFamily: MONO,
            fontSize: 10,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "#FF7C36",
          }}
        >
          {label}
        </span>
        {status && (
          <span
            style={{ fontSize: 10, color: "#3F7A55", fontWeight: 600 }}
          >
            {status}
          </span>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {children}
      </div>
    </div>
  );
}

const PANELS: Panel[] = [
  {
    key: "billing",
    tab: "Billing",
    title: "Fast counter billing",
    desc: "Split bills, discounts, GST invoices and digital payments — all from a single, keyboard-friendly screen.",
    stats: [
      { v: "<15s", l: "per bill" },
      { v: "1-tap", l: "split & discount" },
    ],
    visual: (
      <VisualShell label="POS · Bill #4821" status="PAID">
        <Row a="Butter Chicken" b="320" />
        <Row a="Garlic Naan ×3" b="150" />
        <Row a="Masala Chai ×2" b="80" dim />
        <div
          style={{
            borderTop: "1px dashed rgba(255,255,255,0.15)",
            marginTop: 6,
            paddingTop: 10,
          }}
        >
          <Row a="Total incl. GST" b="₹577" />
        </div>
      </VisualShell>
    ),
  },
  {
    key: "kitchen",
    tab: "Kitchen",
    title: "Live kitchen display",
    desc: "Digital KOTs route each dish to the right station with timers, so nothing is missed during a rush.",
    stats: [
      { v: "0", l: "lost tickets" },
      { v: "Station", l: "wise routing" },
    ],
    visual: (
      <VisualShell label="KOT #248 · Table 07" status="FIRING">
        <Row a="2× Paneer Tikka" b="04:12" />
        <Row a="1× Dal Makhani" b="03:40" />
        <Row a="1× Jeera Rice" b="02:05" dim />
      </VisualShell>
    ),
  },
  {
    key: "inventory",
    tab: "Inventory",
    title: "Recipe-linked inventory",
    desc: "Every sale auto-deducts ingredients, so stock stays accurate and wastage drops.",
    stats: [
      { v: "Real-time", l: "stock levels" },
      { v: "Auto", l: "reorder alerts" },
    ],
    visual: (
      <VisualShell label="Stock · Live" status="OK">
        <Row a="Paneer" b="6.2 kg" />
        <Row a="Tomatoes" b="3.1 kg" />
        <Row a="Basmati Rice" b="24 kg" dim />
      </VisualShell>
    ),
  },
  {
    key: "qr",
    tab: "QR Order",
    title: "QR self-ordering",
    desc: "Guests scan, browse, order and pay from their phone — fewer queues, faster tables.",
    stats: [
      { v: "0", l: "wait to order" },
      { v: "UPI", l: "contactless pay" },
    ],
    visual: (
      <VisualShell label="Table 12 · Order" status="LIVE">
        <Row a="Veg Biryani" b="₹240" />
        <Row a="Paneer Tikka" b="₹260" />
        <Row a="Sweet Lassi ×2" b="₹120" dim />
      </VisualShell>
    ),
  },
  {
    key: "analytics",
    tab: "Analytics",
    title: "Live analytics",
    desc: "Revenue, bestsellers, peak hours and outlet performance, updated in real time.",
    stats: [
      { v: "Real-time", l: "dashboards" },
      { v: "Per-outlet", l: "breakdown" },
    ],
    visual: (
      <VisualShell label="Today · Revenue" status="▲ 12.4%">
        <Row a="Net sales" b="₹1,84,720" />
        <Row a="Orders" b="312" />
        <Row a="Avg. bill" b="₹592" dim />
      </VisualShell>
    ),
  },
  {
    key: "crm",
    tab: "CRM",
    title: "CRM & loyalty",
    desc: "Recognise repeat guests, their history and preferences, and reward them automatically.",
    stats: [
      { v: "Guest", l: "profiles" },
      { v: "Auto", l: "rewards" },
    ],
    visual: (
      <VisualShell label="Guest · Ananya R." status="GOLD">
        <Row a="Visits" b="14" />
        <Row a="Avg. spend" b="₹680" />
        <Row a="Reward points" b="1,240" dim />
      </VisualShell>
    ),
  },
  {
    key: "ai",
    tab: "AI",
    title: "AI co-pilot",
    desc: "Forecasts demand, predicts stock-outs and recommends purchases before service.",
    stats: [
      { v: "Demand", l: "forecast" },
      { v: "Stock", l: "prediction" },
    ],
    visual: (
      <VisualShell label="AI · Suggestion" status="NEW">
        <Row a="Sat dinner" b="+18% ▲" />
        <Row a="Extra paneer" b="12 kg" />
        <Row a="Reorder tomatoes" b="Thu" dim />
      </VisualShell>
    ),
  },
];

export function ZalpanTour() {
  const [active, setActive] = useState(0);
  const panel = PANELS[active];

  return (
    <>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 9, marginBottom: 32 }}>
        {PANELS.map((p, i) => {
          const on = i === active;
          return (
            <button
              key={p.key}
              onClick={() => setActive(i)}
              style={{
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: 14,
                fontWeight: 600,
                padding: "10px 18px",
                borderRadius: 100,
                border: `1px solid ${on ? "#191512" : "var(--zline)"}`,
                background: on ? "#191512" : "transparent",
                color: on ? "#fff" : "#191512",
                transition: "all .2s",
              }}
            >
              {p.tab}
            </button>
          );
        })}
      </div>
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{
          border: "1px solid var(--zline)",
          borderRadius: 20,
          overflow: "hidden",
          background: "var(--paper)",
          boxShadow: "0 30px 60px -40px rgba(25,21,18,0.4)",
        }}
      >
        <div
          className="flex flex-col justify-center"
          style={{ padding: "clamp(28px,4vw,48px)" }}
        >
          <div
            style={{
              fontFamily: DISPLAY,
              fontWeight: 800,
              fontSize: "clamp(24px,2.6vw,32px)",
              letterSpacing: "-0.02em",
              marginBottom: 16,
            }}
          >
            {panel.title}
          </div>
          <div style={{ fontSize: 16, lineHeight: 1.6, color: "var(--zmuted)" }}>
            {panel.desc}
          </div>
          <div style={{ marginTop: 26, display: "flex", gap: 20 }}>
            {panel.stats.map((s) => (
              <div key={s.l}>
                <div
                  style={{
                    fontFamily: DISPLAY,
                    fontWeight: 800,
                    fontSize: 26,
                    color: "var(--or)",
                  }}
                >
                  {s.v}
                </div>
                <div style={{ fontSize: 12, color: "var(--zmuted)" }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        <div
          className="flex items-center justify-center"
          style={{
            background: "var(--charcoal)",
            padding: "clamp(28px,4vw,48px)",
            minHeight: 320,
          }}
        >
          {panel.visual}
        </div>
      </div>
    </>
  );
}
