"use client";

import { Reveal } from "@/components/Reveal";
import { TiltCard } from "@/components/TiltCard";

const DISPLAY = "var(--font-bricolage), 'Bricolage Grotesque', sans-serif";
const MONO = "var(--font-plex-mono), 'IBM Plex Mono', monospace";

type Plan = {
  name: string;
  blurb: string;
  /** yearly price in ₹; undefined = "Let's talk" (monthly billing TBD) */
  price?: number;
  deploy?: string;
  feats: string[];
  addons: string[];
  featured: boolean;
};

const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
/** list price before launch discount (current = list ÷ 1.5) */
const list = (n: number) => Math.round(n * 1.5);

const EXTRA_USER = "Extra users +₹499/user/yr";

const plans: Plan[] = [
  {
    name: "Lite",
    blurb: "Single-outlet cafés and restaurants. 1 user included.",
    price: 5999,
    deploy: "on-premise",
    feats: [
      "POS & billing",
      "GST invoices & UPI",
      "Basic reports",
      "Cloud dashboard included",
      "Runs up to 7 days offline",
    ],
    addons: [EXTRA_USER],
    featured: false,
  },
  {
    name: "Lite",
    blurb: "Same as Lite, fully hosted — no server at the outlet. 1 user included.",
    price: 7999,
    deploy: "cloud",
    feats: [
      "POS & billing",
      "GST invoices & UPI",
      "Basic reports",
      "Hosted & backed up by us",
      "Access from anywhere",
    ],
    addons: [EXTRA_USER],
    featured: false,
  },
  {
    name: "Pro",
    blurb: "Restaurants adding inventory, kitchen, QR & CRM. 5 users included.",
    price: 14999,
    deploy: "on-premise",
    feats: [
      "Everything in Lite",
      "Kitchen display & QR ordering",
      "Inventory & CRM",
      "Vendor purchase orders",
    ],
    addons: [EXTRA_USER, "Extra floors +₹2,999/floor/yr"],
    featured: true,
  },
  {
    name: "Pro+",
    blurb: "Multi-outlet chains & cruise vessel kitchens.",
    feats: [
      "Everything in Pro",
      "Advanced analytics",
      "AI forecasting",
      "Custom integrations",
    ],
    addons: [],
    featured: false,
  },
];

export function PricingPlans() {
  return (
    <>
      <div className="grid grid-cols-1 items-start gap-[18px] sm:grid-cols-2 xl:grid-cols-4">
        {plans.map((p, i) => (
          <Reveal key={`${p.name}-${p.deploy ?? "talk"}`} delay={i * 0.06}>
            <TiltCard
              className="relative rounded-[20px] p-[28px]"
              style={
                p.featured
                  ? { background: "var(--charcoal)", color: "#fff", border: "1px solid var(--charcoal)", boxShadow: "0 30px 60px -30px rgba(25,21,18,0.5)" }
                  : { background: "var(--paper)", border: "1px solid var(--zline)" }
              }
            >
              {p.featured && (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full px-[12px] py-[5px]" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "var(--or)" }}>
                  Most popular
                </div>
              )}
              <div className="mb-[12px] flex flex-wrap items-center gap-[8px]">
                <span style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: p.featured ? "var(--or2)" : "var(--zmuted)" }}>
                  Zalpan {p.name}
                </span>
                {p.deploy && (
                  <span className="rounded-full px-[8px] py-[2px]" style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: p.featured ? "#E7DDC9" : "var(--zink)", background: p.featured ? "rgba(255,253,248,0.1)" : "#F3EBDB", border: `1px solid ${p.featured ? "rgba(255,255,255,0.12)" : "var(--zline)"}` }}>
                    {p.deploy}
                  </span>
                )}
              </div>

              {p.price ? (
                <>
                  <div className="mb-[6px] flex items-center gap-[8px]">
                    <s style={{ fontFamily: MONO, fontSize: 13, color: p.featured ? "#8A8174" : "#A89E8F", textDecorationColor: "var(--or)" }}>{inr(list(p.price))}/yr</s>
                    <span className="whitespace-nowrap rounded-full px-[8px] py-[3px]" style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "var(--green)" }}>33% off</span>
                  </div>
                  <div className="mb-[10px] flex items-baseline gap-[6px]">
                    <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 36, letterSpacing: "-0.02em", lineHeight: 1 }}>{inr(p.price)}</span>
                    <span style={{ fontFamily: MONO, fontSize: 12.5, color: p.featured ? "#B5AC9E" : "var(--zmuted)" }}>/yr</span>
                  </div>
                </>
              ) : (
                <div className="mb-[6px]" style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 32, letterSpacing: "-0.02em" }}>Let&rsquo;s talk</div>
              )}

              <div className="mb-6" style={{ fontSize: 13.5, color: p.featured ? "#B5AC9E" : "var(--zmuted)", lineHeight: 1.5 }}>{p.blurb}</div>

              <div className="mb-5 flex flex-col gap-[11px]">
                {p.feats.map((f) => (
                  <div key={f} className="flex gap-[9px]" style={{ fontSize: 14, color: p.featured ? "#E7DDC9" : "#4A4237" }}>
                    <span style={{ color: p.featured ? "var(--or2)" : "var(--green)", fontWeight: 700 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>

              {p.addons.length > 0 ? (
                <div className="mb-7 flex flex-col gap-[6px] rounded-[12px] px-[14px] py-[11px]" style={{ background: p.featured ? "rgba(255,253,248,0.06)" : "#F3EBDB", border: `1px solid ${p.featured ? "rgba(255,255,255,0.09)" : "var(--zline)"}` }}>
                  <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: p.featured ? "var(--or2)" : "var(--or)" }}>Add-ons</div>
                  {p.addons.map((a) => (
                    <div key={a} style={{ fontSize: 12.5, lineHeight: 1.45, color: p.featured ? "#B5AC9E" : "var(--zmuted)" }}>{a}</div>
                  ))}
                </div>
              ) : (
                <div className="mb-7" />
              )}

              <a
                href="#demo"
                className="block rounded-[11px] py-[13px] text-center font-semibold transition-transform hover:-translate-y-[2px]"
                style={p.featured ? { background: "var(--or)", color: "#fff", fontSize: 14.5 } : { border: "1px solid var(--zink)", color: "var(--zink)", fontSize: 14.5 }}
              >
                {p.price ? "Get started" : "Talk to Sales"}
              </a>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-[28px] text-center" style={{ fontFamily: MONO, fontSize: 12, color: "var(--zmuted)", letterSpacing: "0.02em" }}>
        All prices exclude GST. Billed yearly.
      </Reveal>
    </>
  );
}
