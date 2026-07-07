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

// Claymorphic 3D object per tab (traced from the design), rendered above each visual card
const TOUR_OBJECTS: Record<string, { anim: string; inner: string }> = {
  billing: {
    anim: "zFloat 6.5s",
    inner: `<rect x="56" y="30" width="84" height="122" rx="14" fill="url(#clayPuff)"/><line x1="72" y1="64" x2="124" y2="64" stroke="#B69A6C" stroke-width="4" stroke-linecap="round" opacity="0.4"/><line x1="72" y1="82" x2="124" y2="82" stroke="#B69A6C" stroke-width="4" stroke-linecap="round" opacity="0.4"/><line x1="72" y1="100" x2="106" y2="100" stroke="#B69A6C" stroke-width="4" stroke-linecap="round" opacity="0.4"/><circle cx="132" cy="134" r="27" fill="url(#clayBand)"/><text x="132" y="145" text-anchor="middle" font-family="Baloo 2,cursive" font-weight="800" font-size="30" fill="#F0531C">₹</text>`,
  },
  kitchen: {
    anim: "zFloat2 7s",
    inner: `<path d="M86 46c-8-8 6-16 0-26" stroke="#F0531C" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.75"/><path d="M114 46c8-8-6-16 0-26" stroke="#F0531C" stroke-width="5" stroke-linecap="round" fill="none" opacity="0.75"/><path d="M60 82a40 22 0 0 1 80 0z" fill="url(#clayBand)"/><circle cx="100" cy="58" r="8" fill="url(#clayPuff)"/><path d="M62 90h76l-7 58a12 12 0 0 1-12 11H81a12 12 0 0 1-12-11z" fill="url(#clayPuff)"/><rect x="40" y="96" width="24" height="13" rx="6.5" fill="url(#clayBand)"/><rect x="136" y="96" width="24" height="13" rx="6.5" fill="url(#clayBand)"/><ellipse cx="88" cy="104" rx="14" ry="8" fill="#fff" opacity="0.3"/>`,
  },
  inventory: {
    anim: "zFloat 7.5s",
    inner: `<rect x="48" y="98" width="104" height="58" rx="13" fill="url(#clayPuff)"/><rect x="62" y="46" width="76" height="56" rx="12" fill="url(#clayBand)"/><rect x="74" y="68" width="52" height="9" rx="4.5" fill="#E7DDC9"/><rect x="74" y="68" width="32" height="9" rx="4.5" fill="#F0531C"/><line x1="100" y1="98" x2="100" y2="156" stroke="#B69A6C" stroke-width="3" opacity="0.28"/>`,
  },
  qr: {
    anim: "zFloat2 6.8s",
    inner: `<rect x="64" y="28" width="72" height="144" rx="17" fill="url(#clayPuff)"/><rect x="78" y="50" width="44" height="44" rx="7" fill="#26201B"/><rect x="84" y="56" width="10" height="10" fill="#F6EFDF"/><rect x="106" y="56" width="10" height="10" fill="#F6EFDF"/><rect x="84" y="78" width="10" height="10" fill="#F6EFDF"/><rect x="98" y="70" width="8" height="8" fill="#F0531C"/><circle cx="100" cy="150" r="7" fill="url(#clayBand)"/>`,
  },
  analytics: {
    anim: "zFloat 7.2s",
    inner: `<rect x="50" y="150" width="100" height="15" rx="7.5" fill="url(#clayBand)"/><rect x="56" y="106" width="25" height="46" rx="9" fill="url(#clayPuff)"/><rect x="88" y="78" width="25" height="74" rx="9" fill="url(#clayPuff)"/><rect x="120" y="52" width="25" height="100" rx="9" fill="#F0531C"/><circle cx="132" cy="40" r="7" fill="#FF7C36"/>`,
  },
  crm: {
    anim: "zFloat2 6.6s",
    inner: `<path d="M100 156c-46-30-58-56-58-79a30 30 0 0 1 58-11 30 30 0 0 1 58 11c0 23-12 49-58 79z" fill="url(#clayPuff)"/><ellipse cx="80" cy="64" rx="15" ry="10" fill="#fff" opacity="0.4"/>`,
  },
  ai: {
    anim: "zFloat 6.9s",
    inner: `<circle cx="98" cy="106" r="52" fill="url(#clayPuff)"/><ellipse cx="82" cy="88" rx="18" ry="12" fill="#fff" opacity="0.4"/><path d="M144 42c2 13 6 17 19 19-13 2-17 6-19 19-2-13-6-17-19-19 13-2 17-6 19-19z" fill="#F0531C"/>`,
  },
};

/** Claymorphic object floating above the panel's visual card. */
function ClayObject({ obj }: { obj: { anim: string; inner: string } }) {
  return (
    <div
      style={{
        position: "relative",
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        minHeight: 104,
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          bottom: 2,
          width: "44%",
          height: 22,
          borderRadius: "50%",
          background: "radial-gradient(ellipse at center,rgba(0,0,0,0.5),transparent 70%)",
          filter: "blur(7px)",
          animation: "zGround 7s ease-in-out infinite",
        }}
      />
      <div style={{ width: "clamp(96px,12vw,138px)" }}>
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          style={{ width: "100%", animation: `${obj.anim} ease-in-out infinite`, overflow: "visible" }}
        >
          <defs>
            <radialGradient id="clayPuff" cx="38%" cy="28%" r="78%">
              <stop offset="0" stopColor="#FBF4E4" />
              <stop offset="0.46" stopColor="#EBD8B3" />
              <stop offset="1" stopColor="#CBAF83" />
            </radialGradient>
            <linearGradient id="clayBand" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E6D3A9" />
              <stop offset="0.55" stopColor="#D6BE90" />
              <stop offset="1" stopColor="#BFA277" />
            </linearGradient>
            <filter id="tourClaySoft" x="-30%" y="-20%" width="160%" height="150%">
              <feDropShadow dx="0" dy="16" stdDeviation="14" floodColor="#7A5A2E" floodOpacity="0.24" />
            </filter>
          </defs>
          <g filter="url(#tourClaySoft)" dangerouslySetInnerHTML={{ __html: obj.inner }} />
        </svg>
      </div>
    </div>
  );
}

// Panel visual cards (traced from the design) — injected below each clay object
const TOUR_VISUALS: Record<string, string> = {
  billing: `<div style="background:#FFFDF8;border-radius:12px;padding:16px;font-family:'IBM Plex Sans';">
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#6E6558;margin-bottom:9px;"><span>Paneer Tikka &times;2</span><span style="color:#191512;font-weight:600;">440</span></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#6E6558;margin-bottom:9px;"><span>Butter Naan &times;4</span><span style="color:#191512;font-weight:600;">200</span></div>
      <div style="display:flex;justify-content:space-between;font-size:12px;color:#6E6558;margin-bottom:12px;"><span>Gulab Jamun &times;2</span><span style="color:#191512;font-weight:600;">120</span></div>
      <div style="border-top:1px dashed #E7DDC9;padding-top:11px;display:flex;justify-content:space-between;align-items:center;margin-bottom:14px;"><span style="font-size:12px;color:#6E6558;">Total incl. GST</span><span style="font-family:'Bricolage Grotesque';font-weight:800;font-size:20px;">&#8377;798</span></div>
      <div style="display:flex;gap:8px;"><div style="flex:1;text-align:center;background:#F0531C;color:#fff;font-weight:600;font-size:12px;padding:10px;border-radius:8px;">UPI</div><div style="flex:1;text-align:center;background:#F3EBDB;color:#191512;font-weight:600;font-size:12px;padding:10px;border-radius:8px;">Card</div><div style="flex:1;text-align:center;background:#F3EBDB;color:#191512;font-weight:600;font-size:12px;padding:10px;border-radius:8px;">Cash</div></div>
    </div>`,
  kitchen: `<div style="display:flex;gap:10px;">
      <div style="flex:1;background:#1F1A16;border:1px solid rgba(255,255,255,0.1);border-radius:10px;padding:12px;"><div style="font-family:'IBM Plex Mono';font-size:10px;color:#FF7C36;margin-bottom:8px;">KOT #248 &middot; 04:12</div><div style="font-family:'IBM Plex Mono';font-size:11px;color:#E7DDC9;line-height:1.8;">2&times; Paneer Tikka<br>1&times; Dal Makhani</div></div>
      <div style="flex:1;background:#1F1A16;border:1px solid rgba(63,122,85,0.5);border-radius:10px;padding:12px;"><div style="font-family:'IBM Plex Mono';font-size:10px;color:#5EAE7C;margin-bottom:8px;">KOT #249 &middot; READY</div><div style="font-family:'IBM Plex Mono';font-size:11px;color:#E7DDC9;line-height:1.8;">3&times; Masala Dosa<br>2&times; Filter Coffee</div></div>
    </div>`,
  inventory: `<div style="background:#FFFDF8;border-radius:12px;padding:16px;">
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;"><div style="flex:1;"><div style="font-size:12px;font-weight:600;color:#191512;">Paneer</div><div style="height:6px;background:#F3EBDB;border-radius:3px;margin-top:5px;overflow:hidden;"><div style="width:22%;height:100%;background:#F0531C;"></div></div></div><span style="font-family:'IBM Plex Mono';font-size:11px;color:#F0531C;">2.2 kg</span></div>
      <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;"><div style="flex:1;"><div style="font-size:12px;font-weight:600;color:#191512;">Basmati Rice</div><div style="height:6px;background:#F3EBDB;border-radius:3px;margin-top:5px;overflow:hidden;"><div style="width:68%;height:100%;background:#3F7A55;"></div></div></div><span style="font-family:'IBM Plex Mono';font-size:11px;color:#3F7A55;">14 kg</span></div>
      <div style="display:flex;align-items:center;gap:10px;"><div style="flex:1;"><div style="font-size:12px;font-weight:600;color:#191512;">Butter</div><div style="height:6px;background:#F3EBDB;border-radius:3px;margin-top:5px;overflow:hidden;"><div style="width:45%;height:100%;background:#C08A2C;"></div></div></div><span style="font-family:'IBM Plex Mono';font-size:11px;color:#C08A2C;">5.1 kg</span></div>
    </div>`,
  qr: `<div style="background:#FFFDF8;border-radius:12px;padding:18px;text-align:center;">
      <div style="width:110px;aspect-ratio:1;margin:0 auto 12px;border-radius:10px;background:conic-gradient(from 45deg,#191512 25%,#fff 0 50%,#191512 0 75%,#fff 0);background-size:22% 22%;"></div>
      <div style="font-weight:700;font-size:14px;color:#191512;">Table 07 &middot; Scan to order</div>
      <div style="font-size:12px;color:#6E6558;margin-top:4px;">Menu &middot; Order &middot; Pay</div>
    </div>`,
  analytics: `<div style="background:#FFFDF8;border-radius:12px;padding:16px;">
      <div style="display:flex;justify-content:space-between;margin-bottom:14px;"><span style="font-size:11px;color:#6E6558;">This week</span><span style="font-size:11px;color:#3F7A55;font-weight:600;">&#9650; 18%</span></div>
      <div style="display:flex;align-items:flex-end;gap:6px;height:80px;">
        <div style="flex:1;height:40%;background:#F3EBDB;border-radius:3px;"></div><div style="flex:1;height:58%;background:#F3EBDB;border-radius:3px;"></div><div style="flex:1;height:48%;background:#F3EBDB;border-radius:3px;"></div><div style="flex:1;height:74%;background:#FFCBA8;border-radius:3px;"></div><div style="flex:1;height:100%;background:linear-gradient(180deg,#FF7C36,#F0531C);border-radius:3px;"></div><div style="flex:1;height:66%;background:#F3EBDB;border-radius:3px;"></div><div style="flex:1;height:86%;background:#FFCBA8;border-radius:3px;"></div>
      </div>
      <div style="display:flex;justify-content:space-between;margin-top:12px;font-family:'IBM Plex Mono';font-size:9px;color:#9C9488;"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
    </div>`,
  crm: `<div style="background:#FFFDF8;border-radius:12px;padding:16px;">
      <div style="display:flex;align-items:center;gap:11px;margin-bottom:14px;"><span style="width:38px;height:38px;border-radius:50%;background:linear-gradient(150deg,#FF7C36,#F0531C);display:flex;align-items:center;justify-content:center;color:#fff;font-weight:700;font-family:'Bricolage Grotesque';">R</span><div><div style="font-size:13px;font-weight:700;color:#191512;">Riya Sharma</div><div style="font-size:11px;color:#6E6558;">12 visits &middot; Gold tier</div></div></div>
      <div style="display:flex;gap:8px;"><div style="flex:1;background:#F3EBDB;border-radius:8px;padding:10px;text-align:center;"><div style="font-family:'Bricolage Grotesque';font-weight:800;font-size:16px;color:#191512;">&#8377;9.4k</div><div style="font-size:10px;color:#6E6558;">lifetime</div></div><div style="flex:1;background:#F3EBDB;border-radius:8px;padding:10px;text-align:center;"><div style="font-family:'Bricolage Grotesque';font-weight:800;font-size:16px;color:#191512;">240</div><div style="font-size:10px;color:#6E6558;">points</div></div></div>
      <div style="margin-top:10px;font-size:11px;color:#6E6558;">Favourite: <span style="color:#191512;font-weight:600;">Paneer Tikka</span></div>
    </div>`,
  ai: `<div style="background:#FFFDF8;border-radius:12px;padding:16px;">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px;"><span style="width:8px;height:8px;border-radius:50%;background:#F0531C;"></span><span style="font-family:'IBM Plex Mono';font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:#B8431A;">AI forecast</span></div>
      <div style="font-size:13.5px;color:#191512;font-weight:600;line-height:1.5;margin-bottom:10px;">Peak predicted 7:30&ndash;9:15 PM tonight.</div>
      <div style="font-size:12.5px;color:#6E6558;line-height:1.5;">Prep +18 portions of Butter Chicken and roster one extra server for the dinner rush.</div>
    </div>`,
};

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
          className="flex flex-col items-center justify-center"
          style={{
            background: "var(--charcoal)",
            padding: "clamp(20px,3vw,32px)",
            gap: 14,
            minHeight: 300,
          }}
        >
          {TOUR_OBJECTS[panel.key] && <ClayObject obj={TOUR_OBJECTS[panel.key]} />}
          {TOUR_VISUALS[panel.key] ? (
            <div
              style={{ width: "100%", maxWidth: 340 }}
              dangerouslySetInnerHTML={{ __html: TOUR_VISUALS[panel.key] }}
            />
          ) : (
            <div style={{ width: "100%", maxWidth: 340, display: "flex", justifyContent: "center" }}>
              {panel.visual}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
