import QRCode from "qrcode";
import { Reveal } from "@/components/Reveal";
import { ZalpanTour } from "@/components/ZalpanTour";
import { ZalpanLogo } from "@/components/ZalpanLogo";
import { AiStack } from "@/components/AiStack";

const DISPLAY = "var(--font-bricolage), 'Bricolage Grotesque', sans-serif";
const MONO = "var(--font-plex-mono), 'IBM Plex Mono', monospace";

const zVars = {
  ["--or" as string]: "#F0531C",
  ["--or2" as string]: "#FF7C36",
  ["--zink" as string]: "#191512",
  ["--charcoal" as string]: "#26201B",
  ["--cream" as string]: "#FBF6EC",
  ["--paper" as string]: "#FFFDF8",
  ["--zline" as string]: "#E7DDC9",
  ["--green" as string]: "#3F7A55",
  ["--zmuted" as string]: "#6E6558",
} as React.CSSProperties;

const io = "http://www.w3.org/2000/svg";

const modules = [
  {
    title: "POS & Billing",
    desc: "Fast counter billing with split bills, discounts and GST invoices in seconds.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns={io}>
        <rect x="4" y="3" width="16" height="18" rx="2" stroke="#FF7C36" strokeWidth="1.7" />
        <path d="M8 8h8M8 12h8M8 16h4" stroke="#FF7C36" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Kitchen Display",
    desc: "Digital KOTs route each order straight to the right prep station.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns={io}>
        <rect x="3" y="4" width="18" height="13" rx="2" stroke="#FF7C36" strokeWidth="1.7" />
        <path d="M8 20h8M12 17v3" stroke="#FF7C36" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="12" cy="10.5" r="2.5" stroke="#FF7C36" strokeWidth="1.7" />
      </svg>
    ),
  },
  {
    title: "QR Ordering",
    desc: "Guests scan, browse, order and pay without waiting for staff.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns={io}>
        <rect x="4" y="4" width="7" height="7" rx="1" stroke="#FF7C36" strokeWidth="1.7" />
        <rect x="13" y="4" width="7" height="7" rx="1" stroke="#FF7C36" strokeWidth="1.7" />
        <rect x="4" y="13" width="7" height="7" rx="1" stroke="#FF7C36" strokeWidth="1.7" />
        <path d="M13 13h3v3M20 20v.01M16 20h.01M20 16h.01" stroke="#FF7C36" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Inventory",
    desc: "Recipe-linked stock that updates automatically with every sale.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns={io}>
        <path d="M4 7l8-4 8 4v10l-8 4-8-4V7z" stroke="#FF7C36" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M4 7l8 4 8-4M12 11v10" stroke="#FF7C36" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Purchase & Vendors",
    desc: "Raise purchase orders and manage suppliers from one ledger.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns={io}>
        <path d="M6 6h15l-1.5 9h-12L6 6zM6 6L5 3H3" stroke="#FF7C36" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="19" r="1.6" fill="#FF7C36" />
        <circle cx="17" cy="19" r="1.6" fill="#FF7C36" />
      </svg>
    ),
  },
  {
    title: "CRM & Loyalty",
    desc: "Recognise repeat guests, their history, preferences and rewards.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns={io}>
        <path d="M12 21s-7-4.5-7-10a4 4 0 017-2.5A4 4 0 0119 11c0 5.5-7 10-7 10z" stroke="#FF7C36" strokeWidth="1.7" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Staff & Roles",
    desc: "Role-based access, shift control and accountability across outlets.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns={io}>
        <circle cx="9" cy="8" r="3" stroke="#FF7C36" strokeWidth="1.7" />
        <path d="M3.5 20a5.5 5.5 0 0111 0M16 6a3 3 0 010 6M18 20a5 5 0 00-3-4.6" stroke="#FF7C36" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Analytics & Reports",
    desc: "Revenue, bestsellers, peak hours and outlet performance at a glance.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns={io}>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" stroke="#FF7C36" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
  },
];

const workflow = [
  { n: "01", e: "📱", t: "Guest scans QR" },
  { n: "02", e: "📜", t: "Menu opens, order placed" },
  { n: "03", e: "💻", t: "Order reaches POS" },
  { n: "04", e: "🍳", t: "KOT fires to kitchen" },
  { n: "05", e: "📦", t: "Stock reduces automatically" },
  { n: "06", e: "🧾", t: "Bill generated & paid" },
  { n: "07", e: "👤", t: "Customer profile updated" },
  { n: "08", e: "📈", t: "Owner sees analytics" },
];

const aiFeatures = [
  "Sales forecasting",
  "Inventory prediction",
  "Purchase recommendation",
  "Menu performance",
  "Repeat-visit insights",
  "Rush-hour prediction",
];

const outcomes = [
  { v: "[X]%", h: "Faster checkout", d: "Move queues quickly during peak hours." },
  { v: "[X]%", h: "Less wastage", d: "Recipe-linked stock cuts over-ordering." },
  { v: "[X]", h: "Outlets, one dashboard", d: "Manage every location in one view." },
  { v: "[X]+", h: "Orders processed", d: "Reliable at scale, service after service." },
];

const useCases = [
  { e: "🍽️", t: "Fine Dine", d: "Table-side QR, course-wise KOTs and guest preferences for a polished experience." },
  { e: "☕", t: "Café", d: "Quick billing, loyalty rewards and simple stock for high-frequency footfall." },
  { e: "🍜", t: "Cloud Kitchen", d: "Aggregator-ready order flow, station-wise KOTs and tight cost control." },
  { e: "🍔", t: "QSR", d: "Lightning-fast counters, combo billing and queue-busting QR ordering." },
  { e: "🏟️", t: "Food Court", d: "Multiple vendors, unified tokens and consolidated settlement reporting." },
  { e: "🏢", t: "Multi-Outlet Chain", d: "Central menus, pricing, inventory and analytics across every branch." },
];

const comparison = [
  ["Billing & GST invoices", true, true],
  ["Kitchen display (KOT)", false, true],
  ["QR self-ordering", false, true],
  ["Recipe-linked inventory", false, true],
  ["Vendor & purchase orders", "Limited", true],
  ["CRM & loyalty", false, true],
  ["Multi-outlet dashboard", false, true],
  ["AI forecasting", false, true],
  ["Real-time analytics", "Basic", true],
] as const;

const pricing = [
  {
    name: "Starter",
    blurb: "Small cafés and single-outlet restaurants.",
    feats: ["POS & billing", "GST invoices & UPI", "Basic reports"],
    featured: false,
  },
  {
    name: "Growth",
    blurb: "Restaurants adding inventory, kitchen, QR & CRM.",
    feats: [
      "Everything in Starter",
      "Kitchen display & QR ordering",
      "Inventory & CRM",
      "Vendor purchase orders",
    ],
    featured: true,
  },
  {
    name: "Enterprise",
    blurb: "Multi-outlet chains & cruise vessel kitchens.",
    feats: [
      "Everything in Growth",
      "Advanced analytics",
      "AI forecasting",
      "Custom integrations",
    ],
    featured: false,
  },
];

const faqs = [
  {
    q: "Does it work for Indian restaurants?",
    a: "Yes. Zalpan is built for Indian F&B — GST-ready invoicing, UPI and digital payments, regional menu structures, and workflows that match how restaurants here actually run.",
  },
  {
    q: "Can it run on Android tablets?",
    a: "Absolutely. The counter POS and kitchen display run on standard Android devices, alongside the web portal and an owner mobile app.",
  },
  {
    q: "Does it support QR ordering?",
    a: "Yes. Guests scan a table QR, browse a live menu, order and pay — orders flow straight into the POS and kitchen with no manual re-entry.",
  },
  {
    q: "Can it work if the internet is unstable?",
    a: "Zalpan is designed to keep billing and KOTs running through patchy connectivity, syncing automatically once the connection is back.",
  },
  {
    q: "Does it support inventory and purchase orders?",
    a: "Yes. Recipe-linked inventory updates with every sale, and you can raise purchase orders and manage vendors from the same ledger.",
  },
  {
    q: "Can I manage multiple outlets?",
    a: "Yes. Central menus, pricing, inventory and consolidated analytics let you run many outlets — including cruise vessel kitchens — from one dashboard.",
  },
  {
    q: "Does it include AI forecasting?",
    a: "AI forecasting for demand, stock, peak hours and menu performance is available on higher plans as your restaurant’s co-pilot.",
  },
  {
    q: "Can it integrate with payment systems?",
    a: "Yes. Zalpan supports UPI and major digital payment methods, and can integrate with payment and third-party systems for enterprise setups.",
  },
];

const marquee = [
  "Fine Dine",
  "Cafés",
  "Cloud Kitchens",
  "QSR",
  "Food Courts",
  "Multi-Outlet Chains",
  "Cruise Vessel Kitchens",
];

// Real, scannable QR generated once at module load → the Zalpan page.
const QR_MATRIX = QRCode.create("https://zalpan.com", {
  errorCorrectionLevel: "M",
}).modules;

/** Scannable QR (→ /products/zalpan) rendered as crisp SVG modules with a quiet zone. */
function QrMock({ className }: { className?: string }) {
  const size = QR_MATRIX.size;
  const data = QR_MATRIX.data;
  const rects = [];
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      if (data[y * size + x]) {
        rects.push(
          <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill="#191512" />
        );
      }
    }
  }
  return (
    <svg
      viewBox={`-2 -2 ${size + 4} ${size + 4}`}
      className={className}
      xmlns={io}
      aria-hidden
      style={{ background: "#FFFDF8" }}
      shapeRendering="crispEdges"
    >
      {rects}
    </svg>
  );
}

export default function ZalpanPage() {
  return (
    <div
      style={{
        ...zVars,
        fontFamily: "var(--font-plex-sans), 'IBM Plex Sans', sans-serif",
        background: "var(--cream)",
        color: "var(--zink)",
        overflowX: "hidden",
      }}
    >
      {/* ============ HEADER ============ */}
      <header
        className="sticky top-0 z-[100]"
        style={{
          background: "rgba(251,246,236,0.82)",
          backdropFilter: "saturate(150%) blur(14px)",
          WebkitBackdropFilter: "saturate(150%) blur(14px)",
          borderBottom: "1px solid var(--zline)",
        }}
      >
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between gap-6 px-[18px] md:px-10">
          <div className="flex shrink-0 items-center gap-3">
            <a href="#top" className="flex items-center no-underline" aria-label="Zalpan — home">
              <ZalpanLogo style={{ height: 41, width: "auto", color: "#1f2a37" }} />
            </a>
            <span className="hidden h-6 w-px bg-[var(--zline)] sm:block" aria-hidden />
            <a href="https://bohniman.ai" target="_blank" rel="noopener noreferrer" className="hidden items-center no-underline transition-colors hover:text-[var(--or)] sm:inline-flex" style={{ fontSize: 12.5, fontWeight: 500, color: "#6E6558" }}>
              By Bohniman Systems
            </a>
          </div>
          <div className="flex items-center gap-[30px]">
            <nav className="hidden items-center gap-[30px] md:flex">
              {[
                ["Platform", "#platform"],
                ["Features", "#platform"],
                ["AI", "#ai"],
                ["Pricing", "#pricing"],
                ["Demo", "#demo"],
              ].map(([label, href], i) => (
                <a key={i} href={href} className="no-underline transition-colors hover:text-[var(--or)]" style={{ fontSize: 14.5, color: "#4A4237", fontWeight: 500 }}>
                  {label}
                </a>
              ))}
            </nav>
            <a href="#demo" className="rounded-[9px] px-[18px] py-[11px] font-semibold text-white no-underline transition-transform hover:-translate-y-px" style={{ fontSize: 14, background: "var(--zink)" }}>
              Start Free Trial
            </a>
          </div>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section
        id="top"
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(180deg,#FBF6EC,#F6EFDF)",
          borderBottom: "1px solid var(--zline)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(90deg,rgba(25,21,18,0.045) 1px,transparent 1px),linear-gradient(rgba(25,21,18,0.045) 1px,transparent 1px)",
            backgroundSize: "64px 64px,64px 64px",
          }}
        />
        <div className="relative mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-[18px] py-[clamp(48px,7vw,92px)] md:grid-cols-2 md:gap-[clamp(40px,5vw,72px)] md:px-10">
          {/* copy */}
          <div className="max-w-[600px]">
            <Reveal className="mb-[26px] inline-flex items-center gap-[9px] rounded-full px-[14px] py-[7px]" style={{ background: "rgba(240,83,28,0.1)", border: "1px solid rgba(240,83,28,0.24)" }}>
              <span className="h-[7px] w-[7px] rounded-full" style={{ background: "var(--or)", animation: "zPulse 2s ease-in-out infinite" }} />
              <span style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", color: "#B8431A", fontWeight: 500 }}>
                Restaurant Operating System
              </span>
            </Reveal>
            <Reveal>
              <h1 className="m-0 mb-6 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.035em", fontSize: "clamp(38px,5.6vw,68px)", lineHeight: 0.98 }}>
                Run your entire restaurant from one smart platform.
              </h1>
            </Reveal>
            <Reveal>
              <p className="m-0 mb-[34px] max-w-[52ch]" style={{ fontSize: "clamp(16px,1.5vw,19px)", lineHeight: 1.6, color: "var(--zmuted)" }}>
                Billing, kitchen display, inventory, QR ordering, CRM, vendor
                management, analytics and AI-powered forecasting — built for
                restaurants that want faster service, lower wastage and tighter
                control.
              </p>
            </Reveal>
            <Reveal className="mb-[34px] flex flex-wrap gap-[14px]">
              <a href="#demo" className="inline-flex items-center gap-[10px] rounded-[11px] px-[26px] py-[15px] font-semibold text-white transition-transform hover:-translate-y-[2px]" style={{ background: "var(--or)", fontSize: 15.5, boxShadow: "0 12px 28px -12px rgba(240,83,28,0.7)" }}>
                Book a Demo <span style={{ fontFamily: MONO }}>&rarr;</span>
              </a>
              <a href="#tour" className="inline-flex items-center gap-[11px] rounded-[11px] px-[24px] py-[15px] font-semibold transition-transform hover:-translate-y-[2px]" style={{ background: "var(--paper)", color: "var(--zink)", fontSize: 15.5, border: "1px solid var(--zline)" }}>
                <span className="inline-flex h-[22px] w-[22px] items-center justify-center rounded-full" style={{ background: "var(--zink)" }}>
                  <span style={{ borderLeft: "7px solid #fff", borderTop: "4.5px solid transparent", borderBottom: "4.5px solid transparent", marginLeft: 2 }} />
                </span>
                Watch Product Tour
              </a>
            </Reveal>
            <Reveal className="flex flex-wrap gap-x-[22px] gap-y-[10px]">
              {["Android, Web & Cloud", "GST-ready billing", "UPI & digital payments", "Multi-outlet ready"].map((t) => (
                <span key={t} className="inline-flex items-center gap-[7px]" style={{ fontSize: 13, color: "#5B5346" }}>
                  <span style={{ color: "var(--green)", fontWeight: 700 }}>✓</span>
                  {t}
                </span>
              ))}
            </Reveal>
          </div>

          {/* floating ops stack */}
          <div className="relative h-[clamp(400px,44vw,540px)]">
            {/* revenue dashboard */}
            <div className="absolute left-[14%] top-[6%] w-[min(60%,320px)] rounded-[18px] p-5" style={{ background: "var(--charcoal)", boxShadow: "0 40px 70px -30px rgba(25,21,18,0.55)", animation: "zFloat2 8s ease-in-out infinite" }}>
              <div className="mb-4 flex items-center justify-between">
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", color: "#9C9488" }}>Today&rsquo;s revenue</span>
                <span style={{ fontSize: 10, color: "var(--or2)", fontWeight: 600 }}>▲ 12.4%</span>
              </div>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 30, color: "#fff", letterSpacing: "-0.02em" }}>₹1,84,720</div>
              <div className="mt-4 flex h-[56px] items-end gap-[6px]">
                {[38, 56, 44, 72, 90, 64, 80].map((h, i) => (
                  <div key={i} className="flex-1 rounded-[3px]" style={{ height: `${h}%`, background: i === 4 ? "linear-gradient(180deg,var(--or2),var(--or))" : h > 60 ? "#5A4A38" : "#4A4238" }} />
                ))}
              </div>
            </div>
            {/* POS billing */}
            <div className="absolute left-0 top-[34%] w-[min(52%,240px)] rounded-[16px] p-[18px]" style={{ background: "var(--paper)", border: "1px solid var(--zline)", boxShadow: "0 34px 60px -26px rgba(25,21,18,0.4)", animation: "zFloat 6.5s ease-in-out infinite" }}>
              <div className="mb-[14px] flex items-center gap-2">
                <span className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-[7px]" style={{ background: "rgba(240,83,28,0.12)", color: "var(--or)", fontWeight: 700, fontSize: 13 }}>₹</span>
                <span style={{ fontWeight: 700, fontSize: 13 }}>POS Billing</span>
              </div>
              {[["Butter Chicken", "320"], ["Garlic Naan ×3", "150"], ["Masala Chai ×2", "80"]].map(([a, b]) => (
                <div key={a} className="mb-[7px] flex justify-between" style={{ fontSize: 12, color: "#6E6558" }}>
                  <span>{a}</span>
                  <span style={{ color: "var(--zink)", fontWeight: 600 }}>{b}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-[10px]" style={{ borderTop: "1px dashed var(--zline)" }}>
                <span style={{ fontSize: 12, color: "#6E6558" }}>Total incl. GST</span>
                <span style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 18 }}>₹577</span>
              </div>
            </div>
            {/* kitchen ticket */}
            <div className="absolute right-[2%] top-[44%] w-[min(44%,190px)] rounded-[14px] p-4" style={{ background: "#1F1A16", boxShadow: "0 30px 54px -24px rgba(25,21,18,0.5)", animation: "zFloat 7.5s ease-in-out infinite" }}>
              <div className="mb-3 flex items-center justify-between">
                <span style={{ fontFamily: MONO, fontSize: 10, color: "var(--or2)", letterSpacing: "0.08em" }}>KOT #248</span>
                <span className="h-[7px] w-[7px] rounded-full" style={{ background: "var(--green)", animation: "zBlink 1.4s infinite" }} />
              </div>
              <div style={{ fontFamily: MONO, fontSize: 11, color: "#E7DDC9", lineHeight: 1.9 }}>
                <div>2× Paneer Tikka</div>
                <div>1× Dal Makhani</div>
                <div style={{ color: "#9C9488" }}>1× Jeera Rice</div>
              </div>
              <div className="mt-3" style={{ fontFamily: MONO, fontSize: 9.5, color: "#7C746A" }}>TABLE 07 · FIRING</div>
            </div>
            {/* QR card */}
            <div className="absolute right-[8%] top-0 w-[min(30%,120px)] rounded-[14px] p-[14px] text-center" style={{ background: "var(--paper)", border: "1px solid var(--zline)", boxShadow: "0 24px 44px -22px rgba(25,21,18,0.35)", animation: "zFloat2 9s ease-in-out infinite" }}>
              <QrMock className="mb-2 aspect-square w-full rounded-[6px]" />
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--zink)" }}>Scan to order</div>
            </div>
            {/* AI low-stock */}
            <div className="absolute bottom-[2%] left-[20%] w-[min(58%,270px)] rounded-[14px] px-4 py-[14px]" style={{ background: "var(--paper)", border: "1px solid rgba(240,83,28,0.3)", boxShadow: "0 30px 54px -24px rgba(25,21,18,0.4)", animation: "zFloat 6s ease-in-out infinite" }}>
              <div className="flex items-center gap-[11px]">
                <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[9px]" style={{ background: "rgba(240,83,28,0.12)" }}>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" xmlns={io}>
                    <path d="M12 3l9 16H3L12 3z" stroke="#F0531C" strokeWidth="1.8" strokeLinejoin="round" />
                    <path d="M12 10v4M12 16.5v.5" stroke="#F0531C" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--zink)" }}>AI · Low stock alert</div>
                  <div style={{ fontSize: 11.5, color: "#6E6558", marginTop: 2 }}>Paneer may run out by Fri evening</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* marquee */}
        <div className="overflow-hidden py-[15px]" style={{ borderTop: "1px solid var(--zline)", background: "rgba(255,253,248,0.6)" }}>
          <div className="flex w-max gap-[52px] whitespace-nowrap" style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase", color: "#8A8072", animation: "zMarquee 26s linear infinite" }}>
            {[...marquee, ...marquee].map((m, i) => (
              <span key={i} className="flex items-center gap-[52px]">
                {m}
                <span style={{ color: "var(--or)" }}>●</span>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PROBLEM ============ */}
      <section className="mx-auto max-w-[1280px] px-[18px] py-[clamp(64px,8vw,110px)] md:px-10">
        <Reveal className="mb-[52px] max-w-[760px]">
          <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or)", marginBottom: 18 }}>01 / The problem</div>
          <h2 className="m-0 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.03 }}>
            Still running your restaurant on disconnected tools?
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[18px] sm:grid-cols-2 lg:grid-cols-3" style={{ background: "var(--zline)", border: "1px solid var(--zline)" }}>
          {[
            ["🖥️", "Separate POS software", "Billing lives in one silo, everything else somewhere else."],
            ["📊", "Excel inventory", "Spreadsheets that are out of date the moment service starts."],
            ["📱", "WhatsApp orders", "Orders scattered across chats, easy to miss during a rush."],
            ["📜", "Paper KOT slips", "Handwritten tickets that get lost, smudged or misread."],
            ["📦", "Manual stock tracking", "No one really knows what's left until it runs out."],
            ["🕵️", "No visibility at rush hour", "You feel the chaos but can't see where it's coming from."],
          ].map(([e, t, d]) => (
            <div key={t} className="p-[30px]" style={{ background: "var(--paper)" }}>
              <div className="mb-[14px]" style={{ fontSize: 26 }}>{e}</div>
              <div className="mb-[6px]" style={{ fontWeight: 700, fontSize: 16 }}>{t}</div>
              <div style={{ fontSize: 13.5, color: "var(--zmuted)", lineHeight: 1.55 }}>{d}</div>
            </div>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <p className="mx-auto m-0 max-w-[20ch]" style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(20px,2.6vw,32px)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Replace fragmented tools with <span style={{ color: "var(--or)" }}>one connected restaurant OS.</span>
          </p>
        </Reveal>
      </section>

      {/* ============ THE PROMISE ============ */}
      <section style={{ position: "relative", overflow: "hidden", background: "#F6EFDF", backgroundImage: "linear-gradient(90deg,rgba(25,21,18,0.05) 1px,transparent 1px),linear-gradient(rgba(25,21,18,0.05) 1px,transparent 1px)", backgroundSize: "72px 72px", borderTop: "1px solid var(--zline)", borderBottom: "1px solid var(--zline)" }}>
        <div className="mx-auto max-w-[1280px]" style={{ padding: "clamp(60px,8vw,104px) clamp(18px,4vw,40px)" }}>
          <div className="grid items-center gap-[clamp(36px,5vw,64px)]" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))" }}>
          {/* USP text */}
          <div>
            <Reveal>
              <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--or)", marginBottom: 24 }}>02 / The promise</div>
            </Reveal>
            <Reveal>
              <h2 className="m-0" style={{ fontFamily: DISPLAY, fontWeight: 800, lineHeight: 0.92, letterSpacing: "-0.01em", margin: "0 0 26px", color: "var(--zink)" }}>
                <span style={{ display: "block", fontSize: "clamp(30px,4.4vw,58px)" }}>Run your</span>
                <span style={{ display: "block", fontSize: "clamp(46px,7.4vw,104px)", color: "var(--or)" }}>ENTIRE</span>
                <span style={{ display: "block", fontSize: "clamp(30px,4.4vw,58px)" }}>restaurant from</span>
                <span style={{ display: "inline-block", fontSize: "clamp(46px,7.4vw,104px)", background: "linear-gradient(150deg,var(--or2),var(--or))", WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>ONE</span>
                <span style={{ fontSize: "clamp(30px,4.4vw,58px)" }}> platform.</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="m-0" style={{ fontSize: "clamp(15px,1.5vw,18px)", lineHeight: 1.6, color: "var(--zmuted)", margin: "0 0 28px", maxWidth: "44ch" }}>
                No more juggling six disconnected apps. Billing, kitchen, stock, ordering, CRM and AI — under one roof, in perfect sync.
              </p>
            </Reveal>
            <Reveal className="flex flex-wrap gap-[10px]">
              <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 14, padding: "8px 16px", borderRadius: 100, background: "var(--zink)", color: "#fff" }}>1 login</span>
              <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 14, padding: "8px 16px", borderRadius: 100, background: "rgba(240,83,28,0.1)", color: "#B8431A", border: "1px solid rgba(240,83,28,0.24)" }}>8 modules</span>
              <span style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 14, padding: "8px 16px", borderRadius: 100, background: "rgba(63,122,85,0.12)", color: "var(--green)", border: "1px solid rgba(63,122,85,0.28)" }}>0 spreadsheets</span>
            </Reveal>
          </div>

          {/* claymorphic chef's toque */}
          <Reveal className="relative flex items-center justify-center" style={{ minHeight: "clamp(320px,34vw,420px)" }}>
            {/* soft ground shadow */}
            <div aria-hidden style={{ position: "absolute", left: "50%", bottom: "8%", width: "56%", height: 34, borderRadius: "50%", background: "radial-gradient(ellipse at center,rgba(122,90,46,0.4),transparent 70%)", filter: "blur(9px)", animation: "zGround 7s ease-in-out infinite" }} />
            {/* accent capsule (top-left) */}
            <svg aria-hidden viewBox="0 0 120 60" style={{ position: "absolute", top: "6%", left: "2%", width: "clamp(70px,9vw,118px)", transform: "rotate(-24deg)", animation: "zFloat 8.5s ease-in-out infinite", filter: "drop-shadow(0 12px 14px rgba(122,90,46,0.24))" }}>
              <defs><linearGradient id="promiseCapG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#EAD7B2" /><stop offset="1" stopColor="#C7AC7E" /></linearGradient></defs>
              <rect x="6" y="14" width="108" height="32" rx="16" fill="url(#promiseCapG)" />
              <ellipse cx="30" cy="24" rx="16" ry="7" fill="#F7EEDC" opacity="0.5" />
            </svg>
            {/* accent sphere (bottom-right) */}
            <svg aria-hidden viewBox="0 0 80 80" style={{ position: "absolute", bottom: "14%", right: "3%", width: "clamp(48px,6.5vw,80px)", animation: "zFloat2 10s ease-in-out infinite", filter: "drop-shadow(0 14px 16px rgba(122,90,46,0.26))" }}>
              <defs><radialGradient id="promiseSphG" cx="36%" cy="30%" r="72%"><stop offset="0" stopColor="#FBF4E4" /><stop offset="55%" stopColor="#E6D2AC" /><stop offset="100%" stopColor="#C2A576" /></radialGradient></defs>
              <circle cx="40" cy="40" r="34" fill="url(#promiseSphG)" />
              <ellipse cx="30" cy="28" rx="12" ry="8" fill="#fff" opacity="0.4" />
            </svg>
            {/* the toque */}
            <svg aria-hidden viewBox="0 0 340 360" style={{ position: "relative", width: "clamp(230px,27vw,340px)", animation: "zFloat2 9s ease-in-out infinite", overflow: "visible" }}>
              <defs>
                <radialGradient id="promiseClayPuff" cx="38%" cy="28%" r="78%"><stop offset="0" stopColor="#FBF4E4" /><stop offset="46%" stopColor="#EBD8B3" /><stop offset="100%" stopColor="#CBAF83" /></radialGradient>
                <linearGradient id="promiseClayBand" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E6D3A9" /><stop offset="55%" stopColor="#D6BE90" /><stop offset="100%" stopColor="#BFA277" /></linearGradient>
                <radialGradient id="promiseClayHi" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#ffffff" stopOpacity="0.55" /><stop offset="100%" stopColor="#ffffff" stopOpacity="0" /></radialGradient>
                <filter id="promiseClaySoft" x="-30%" y="-20%" width="160%" height="150%"><feDropShadow dx="0" dy="20" stdDeviation="18" floodColor="#7A5A2E" floodOpacity="0.24" /></filter>
              </defs>
              <g filter="url(#promiseClaySoft)">
                {/* connector neck */}
                <rect x="100" y="150" width="140" height="96" rx="42" fill="url(#promiseClayPuff)" />
                {/* band */}
                <rect x="92" y="216" width="156" height="78" rx="19" fill="url(#promiseClayBand)" />
                <line x1="120" y1="228" x2="120" y2="282" stroke="#B69A6C" strokeWidth="2" strokeLinecap="round" opacity="0.32" />
                <line x1="147" y1="228" x2="147" y2="282" stroke="#B69A6C" strokeWidth="2" strokeLinecap="round" opacity="0.32" />
                <line x1="174" y1="228" x2="174" y2="282" stroke="#B69A6C" strokeWidth="2" strokeLinecap="round" opacity="0.32" />
                <line x1="201" y1="228" x2="201" y2="282" stroke="#B69A6C" strokeWidth="2" strokeLinecap="round" opacity="0.32" />
                <line x1="228" y1="228" x2="228" y2="282" stroke="#B69A6C" strokeWidth="2" strokeLinecap="round" opacity="0.32" />
                {/* crown puffs */}
                <circle cx="110" cy="152" r="58" fill="url(#promiseClayPuff)" />
                <circle cx="230" cy="152" r="58" fill="url(#promiseClayPuff)" />
                <circle cx="170" cy="110" r="78" fill="url(#promiseClayPuff)" />
                {/* highlight */}
                <ellipse cx="146" cy="82" rx="40" ry="26" fill="url(#promiseClayHi)" />
              </g>
            </svg>
          </Reveal>
          </div>
        </div>
      </section>

      {/* ============ PLATFORM ============ */}
      <section id="platform" style={{ background: "var(--charcoal)", color: "#F3ECDF", backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)", backgroundSize: "64px 64px" }}>
        <div className="mx-auto max-w-[1280px] px-[18px] py-[clamp(64px,8vw,110px)] md:px-10">
          <Reveal className="mb-[56px] max-w-[720px]">
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or2)", marginBottom: 18 }}>03 / The platform</div>
            <h2 className="m-0 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.03, color: "#fff" }}>
              One platform. Complete restaurant control.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m) => (
              <div key={m.title} className="group rounded-[16px] p-[26px] transition-all duration-300 hover:-translate-y-1" style={{ background: "rgba(255,253,248,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div className="mb-[18px] flex h-[44px] w-[44px] items-center justify-center rounded-[11px]" style={{ background: "rgba(240,83,28,0.16)" }}>{m.icon}</div>
                <div className="mb-[7px]" style={{ fontWeight: 700, fontSize: 17, color: "#fff" }}>{m.title}</div>
                <div style={{ fontSize: 13.5, color: "#B5AC9E", lineHeight: 1.55 }}>{m.desc}</div>
                <div className="mt-[18px] h-2 rounded-[4px]" style={{ background: "linear-gradient(90deg,var(--or),transparent)", opacity: 0.7 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CONNECTED WORKFLOW ============ */}
      <section className="mx-auto max-w-[1280px] px-[18px] py-[clamp(64px,8vw,110px)] md:px-10">
        <Reveal className="mb-[60px] max-w-[800px]">
          <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or)", marginBottom: 18 }}>04 / Connected workflow</div>
          <h2 className="m-0 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.05 }}>
            From guest order to kitchen to billing to analytics — everything stays in sync.
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 gap-[14px] md:grid-cols-4 lg:grid-cols-8">
          {workflow.map((s) => (
            <div key={s.n} className="rounded-[14px] p-[22px]" style={{ background: "var(--paper)", border: "1px solid var(--zline)" }}>
              <div className="mb-3" style={{ fontFamily: MONO, fontSize: 12, color: "#B0A695" }}>{s.n}</div>
              <div className="mb-[10px]" style={{ fontSize: 24 }}>{s.e}</div>
              <div style={{ fontWeight: 700, fontSize: 14.5, lineHeight: 1.3 }}>{s.t}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ PRODUCT TOUR ============ */}
      <section id="tour" style={{ background: "#F3EBDB", borderBlock: "1px solid var(--zline)" }}>
        <div className="mx-auto max-w-[1280px] px-[18px] py-[clamp(64px,8vw,110px)] md:px-10">
          <Reveal className="mb-[44px] max-w-[720px]">
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or)", marginBottom: 18 }}>05 / Product tour</div>
            <h2 className="m-0 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(28px,3.6vw,48px)", lineHeight: 1.05 }}>
              See how it works during a real <span style={{ color: "var(--or)" }}>rush hour.</span>
            </h2>
          </Reveal>
          <ZalpanTour />
        </div>
      </section>

      {/* ============ AI CO-PILOT ============ */}
      <section id="ai" className="mx-auto max-w-[1280px] px-[18px] py-[clamp(64px,8vw,110px)] md:px-10">
        <div className="grid grid-cols-1 items-center gap-[clamp(40px,5vw,72px)] md:grid-cols-2">
          <Reveal>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or)", marginBottom: 18 }}>06 / AI co-pilot</div>
            <h2 className="m-0 mb-5 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.02 }}>
              Meet your restaurant AI co-pilot.
            </h2>
            <p className="m-0 mb-[30px] max-w-[46ch]" style={{ fontSize: 17, lineHeight: 1.6, color: "var(--zmuted)" }}>
              Turn daily restaurant data into decisions you can act on before
              service, not after.
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {aiFeatures.map((f) => (
                <div key={f} className="flex items-center gap-[9px]" style={{ fontSize: 14, color: "#4A4237" }}>
                  <span className="h-[6px] w-[6px] rounded-full" style={{ background: "var(--or)" }} />
                  {f}
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="relative min-h-[340px]">
            <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 60% 40%,rgba(240,83,28,0.12),transparent 65%)" }} />
            <div className="relative">
              <AiStack />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ OUTCOMES ============ */}
      <section style={{ background: "var(--charcoal)", color: "#F3ECDF" }}>
        <div className="mx-auto max-w-[1280px] px-[18px] py-[clamp(64px,8vw,110px)] md:px-10">
          <Reveal className="mb-[52px] max-w-[680px]">
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or2)", marginBottom: 18 }}>07 / Outcomes</div>
            <h2 className="m-0 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.03, color: "#fff" }}>
              Outcomes restaurant owners actually care about.
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {outcomes.map((o) => (
              <div key={o.h} className="rounded-[16px] p-[28px]" style={{ background: "rgba(255,253,248,0.04)", border: "1px solid rgba(255,255,255,0.09)" }}>
                <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(36px,4.5vw,52px)", letterSpacing: "-0.03em", color: "var(--or2)", lineHeight: 1 }}>{o.v}</div>
                <div className="mt-3" style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>{o.h}</div>
                <div className="mt-[5px]" style={{ fontSize: 13, color: "#B5AC9E", lineHeight: 1.5 }}>{o.d}</div>
              </div>
            ))}
            <div className="rounded-[16px] p-[28px]" style={{ background: "linear-gradient(150deg,var(--or2),var(--or))" }}>
              <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(28px,3vw,36px)", letterSpacing: "-0.02em", color: "#fff", lineHeight: 1.05 }}>More repeat customers</div>
              <div className="mt-2" style={{ fontSize: 13, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>CRM & loyalty that bring guests back.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ USE CASES ============ */}
      <section className="mx-auto max-w-[1280px] px-[18px] py-[clamp(64px,8vw,110px)] md:px-10">
        <Reveal className="mb-[52px] max-w-[680px]">
          <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or)", marginBottom: 18 }}>08 / Use cases</div>
          <h2 className="m-0 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.03 }}>
            Built for every restaurant format.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {useCases.map((u) => (
            <div key={u.t} className="rounded-[16px] p-[30px] transition-all duration-300 hover:-translate-y-1" style={{ background: "var(--paper)", border: "1px solid var(--zline)" }}>
              <div className="mb-4" style={{ fontSize: 30 }}>{u.e}</div>
              <div className="mb-2" style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 20 }}>{u.t}</div>
              <div style={{ fontSize: 14, color: "var(--zmuted)", lineHeight: 1.55 }}>{u.d}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ DEVICES ============ */}
      <section style={{ background: "#F3EBDB", borderBlock: "1px solid var(--zline)" }}>
        <div className="mx-auto max-w-[1280px] px-[18px] py-[clamp(64px,8vw,110px)] md:px-10">
          <Reveal className="mb-[52px] max-w-[680px]">
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or)", marginBottom: 18 }}>09 / Anywhere</div>
            <h2 className="m-0 mb-4 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.03 }}>
              Run it anywhere.
            </h2>
            <p className="m-0 max-w-[60ch]" style={{ fontSize: 16, color: "var(--zmuted)", lineHeight: 1.6 }}>
              Android devices at the counter, kitchen screens for KOTs, a mobile
              dashboard for owners and a web portal for management and analytics.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                t: "Android POS tablet",
                d: "Counter billing",
                icon: (
                  <svg width="60" height="46" viewBox="0 0 46 34" fill="none">
                    <rect x="1.5" y="1.5" width="43" height="31" rx="4.5" stroke="var(--zink)" strokeWidth="2" />
                    <rect x="6" y="6" width="30" height="22" rx="2" fill="rgba(240,83,28,0.16)" />
                    <circle cx="40" cy="17" r="1.6" fill="var(--zink)" />
                  </svg>
                ),
              },
              {
                t: "Kitchen display",
                d: "Live KOTs",
                icon: (
                  <svg width="52" height="50" viewBox="0 0 44 42" fill="none">
                    <rect x="2" y="2" width="40" height="27" rx="3.5" stroke="var(--zink)" strokeWidth="2" />
                    <rect x="6.5" y="6.5" width="31" height="18" rx="1.5" fill="rgba(240,83,28,0.16)" />
                    <path d="M22 29 V35 M14 39 H30" stroke="var(--zink)" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                ),
              },
              {
                t: "Owner mobile app",
                d: "Dashboard on the go",
                icon: (
                  <svg width="34" height="50" viewBox="0 0 28 44" fill="none">
                    <rect x="2.5" y="1.5" width="23" height="41" rx="5" stroke="var(--zink)" strokeWidth="2" />
                    <rect x="6" y="8" width="16" height="24" rx="1.5" fill="rgba(240,83,28,0.16)" />
                    <line x1="11" y1="5" x2="17" y2="5" stroke="var(--zink)" strokeWidth="2" strokeLinecap="round" />
                    <circle cx="14" cy="37.5" r="1.6" fill="var(--zink)" />
                  </svg>
                ),
              },
              {
                t: "Web admin portal",
                d: "Full management",
                icon: (
                  <svg width="60" height="46" viewBox="0 0 46 34" fill="none">
                    <rect x="1.5" y="2.5" width="43" height="29" rx="4" stroke="var(--zink)" strokeWidth="2" />
                    <line x1="1.5" y1="10.5" x2="44.5" y2="10.5" stroke="var(--zink)" strokeWidth="2" />
                    <circle cx="6.5" cy="6.5" r="1.3" fill="var(--zink)" />
                    <circle cx="11" cy="6.5" r="1.3" fill="var(--zink)" />
                    <circle cx="15.5" cy="6.5" r="1.3" fill="var(--zink)" />
                    <rect x="6" y="15" width="34" height="12" rx="2" fill="rgba(240,83,28,0.16)" />
                  </svg>
                ),
              },
            ].map((dv) => (
              <div key={dv.t} className="rounded-[16px] p-[28px] text-center" style={{ background: "var(--paper)", border: "1px solid var(--zline)" }}>
                <div className="mx-auto mb-[18px] flex h-[52px] items-center justify-center">
                  {dv.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{dv.t}</div>
                <div className="mt-[5px]" style={{ fontSize: 12.5, color: "var(--zmuted)" }}>{dv.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="mx-auto max-w-[1080px] px-[18px] py-[clamp(64px,8vw,110px)] md:px-10">
        <Reveal className="mb-[44px] max-w-[680px]">
          <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or)", marginBottom: 18 }}>10 / Comparison</div>
          <h2 className="m-0 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.03 }}>
            More than a traditional POS.
          </h2>
        </Reveal>
        <Reveal className="overflow-hidden rounded-[18px]" style={{ border: "1px solid var(--zline)", background: "var(--paper)" }}>
          <div className="grid grid-cols-[1.4fr_1fr_1fr]" style={{ background: "var(--charcoal)", color: "#fff" }}>
            <div className="px-[22px] py-[18px]" style={{ fontWeight: 600, fontSize: 14 }}>Capability</div>
            <div className="px-[22px] py-[18px] text-center" style={{ fontWeight: 600, fontSize: 14, color: "#B5AC9E" }}>Traditional POS</div>
            <div className="px-[22px] py-[18px] text-center" style={{ fontWeight: 700, fontSize: 14, color: "var(--or2)" }}>Zalpan</div>
          </div>
          {comparison.map(([cap, trad, zal], i) => (
            <div key={cap as string} className="grid grid-cols-[1.4fr_1fr_1fr] items-center" style={{ borderTop: "1px solid var(--zline)", background: i % 2 ? "rgba(231,221,201,0.18)" : "transparent" }}>
              <div className="px-[22px] py-[15px]" style={{ fontSize: 14, fontWeight: 500, color: "var(--zink)" }}>{cap}</div>
              <div className="px-[22px] py-[15px] text-center" style={{ fontSize: 14, color: "var(--zmuted)" }}>
                {trad === true ? <span style={{ color: "var(--green)", fontWeight: 700 }}>✓</span> : trad === false ? <span style={{ color: "#C9BFB0" }}>—</span> : <span style={{ fontSize: 12.5 }}>{trad}</span>}
              </div>
              <div className="px-[22px] py-[15px] text-center" style={{ fontSize: 14 }}>
                {zal === true ? <span style={{ color: "var(--or)", fontWeight: 700 }}>✓</span> : <span>{zal}</span>}
              </div>
            </div>
          ))}
        </Reveal>
      </section>

      {/* ============ SOCIAL PROOF ============ */}
      <section style={{ background: "var(--charcoal)", color: "#F3ECDF", overflow: "hidden" }}>
        <div className="mx-auto max-w-[1280px] px-[18px] py-[clamp(56px,7vw,90px)] text-center md:px-10">
          <Reveal>
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or2)", marginBottom: 22 }}>Trusted by growing restaurants across India</div>
            <div style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: "clamp(40px,7vw,88px)", letterSpacing: "-0.03em", lineHeight: 1, color: "#fff" }}>
              1.2M+ <span style={{ color: "var(--or2)" }}>KOTs</span>
            </div>
            <div className="mx-auto mt-4 max-w-[36ch]" style={{ fontSize: 16, color: "#B5AC9E" }}>generated without missing a single order.</div>
            <div className="mt-10 inline-flex items-center gap-[14px] rounded-[14px] px-[26px] py-4" style={{ border: "1px solid rgba(255,255,255,0.12)", background: "rgba(255,253,248,0.03)" }}>
              <span className="inline-flex h-[42px] w-[42px] items-center justify-center rounded-[10px]" style={{ background: "linear-gradient(150deg,var(--or2),var(--or))", fontFamily: DISPLAY, fontWeight: 800, color: "#fff", fontSize: 18 }}>D</span>
              <div className="text-left">
                <div style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Dine Way Platz</div>
                <div style={{ fontSize: 12.5, color: "#9C9488" }}>Guwahati</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="pricing" className="mx-auto max-w-[1280px] px-[18px] py-[clamp(64px,8vw,110px)] md:px-10">
        <Reveal className="mx-auto mb-[56px] max-w-[640px] text-center">
          <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or)", marginBottom: 18 }}>10 / Pricing</div>
          <h2 className="m-0 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(30px,4vw,52px)", lineHeight: 1.03 }}>
            Plans that grow with you.
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 items-start gap-[18px] md:grid-cols-3">
          {pricing.map((p) => (
            <div key={p.name} className="relative rounded-[20px] p-[32px]" style={p.featured ? { background: "var(--charcoal)", color: "#fff", border: "1px solid var(--charcoal)", boxShadow: "0 30px 60px -30px rgba(25,21,18,0.5)" } : { background: "var(--paper)", border: "1px solid var(--zline)" }}>
              {p.featured && (
                <div className="absolute right-[22px] top-[22px] rounded-full px-[11px] py-[5px]" style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase", color: "#fff", background: "var(--or)" }}>Most popular</div>
              )}
              <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: p.featured ? "var(--or2)" : "var(--zmuted)", marginBottom: 12 }}>{p.name}</div>
              <div className="mb-[6px]" style={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: 32, letterSpacing: "-0.02em" }}>Let&rsquo;s talk</div>
              <div className="mb-6" style={{ fontSize: 13.5, color: p.featured ? "#B5AC9E" : "var(--zmuted)", lineHeight: 1.5 }}>{p.blurb}</div>
              <div className="mb-7 flex flex-col gap-[11px]">
                {p.feats.map((f) => (
                  <div key={f} className="flex gap-[9px]" style={{ fontSize: 14, color: p.featured ? "#E7DDC9" : "#4A4237" }}>
                    <span style={{ color: p.featured ? "var(--or2)" : "var(--green)", fontWeight: 700 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>
              <a href="#demo" className="block rounded-[11px] py-[13px] text-center font-semibold transition-transform hover:-translate-y-[2px]" style={p.featured ? { background: "var(--or)", color: "#fff", fontSize: 14.5 } : { border: "1px solid var(--zink)", color: "var(--zink)", fontSize: 14.5 }}>
                Talk to Sales
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section id="faq" style={{ background: "#F3EBDB", borderBlock: "1px solid var(--zline)" }}>
        <div className="mx-auto max-w-[840px] px-[18px] py-[clamp(64px,8vw,110px)] md:px-10">
          <Reveal className="mb-[44px]">
            <div style={{ fontFamily: MONO, fontSize: 12, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--or)", marginBottom: 18 }}>11 / FAQ</div>
            <h2 className="m-0 text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.03em", fontSize: "clamp(28px,3.6vw,46px)", lineHeight: 1.05 }}>
              Questions, answered.
            </h2>
          </Reveal>
          <div style={{ borderTop: "1px solid var(--zline)" }}>
            {faqs.map((f) => (
              <details key={f.q} className="group" style={{ borderBottom: "1px solid var(--zline)" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[22px]" style={{ fontFamily: DISPLAY, fontWeight: 600, fontSize: "clamp(17px,1.9vw,21px)", letterSpacing: "-0.01em", color: "var(--zink)" }}>
                  {f.q}
                  <span className="shrink-0 transition-transform duration-300 group-open:rotate-45" style={{ fontFamily: MONO, color: "var(--or)", fontSize: 22, lineHeight: 1 }}>+</span>
                </summary>
                <p className="m-0 pb-[24px]" style={{ fontSize: 16, lineHeight: 1.62, color: "var(--zmuted)", maxWidth: "62ch" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FINAL CTA ============ */}
      <section id="demo" className="relative overflow-hidden" style={{ background: "var(--zink)", color: "#fff" }}>
        <div aria-hidden className="pointer-events-none absolute" style={{ top: "-30%", right: "-10%", width: "60%", height: "160%", background: "radial-gradient(circle at 50% 50%,rgba(240,83,28,0.35),transparent 62%)", filter: "blur(30px)" }} />
        <Reveal className="relative mx-auto max-w-[900px] px-[18px] py-[clamp(72px,9vw,130px)] text-center md:px-10">
          <h2 className="m-0 mb-[22px] text-balance" style={{ fontFamily: DISPLAY, fontWeight: 800, letterSpacing: "-0.035em", fontSize: "clamp(36px,6vw,76px)", lineHeight: 0.98 }}>
            Ready to run your restaurant smarter?
          </h2>
          <p className="mx-auto m-0 mb-10 max-w-[56ch]" style={{ fontSize: "clamp(16px,1.8vw,20px)", lineHeight: 1.55, color: "#C9BFB0" }}>
            Bring billing, kitchen, stock, customers, payments and growth into
            one connected platform.
          </p>
          <div className="flex flex-wrap justify-center gap-[14px]">
            <a href="mailto:hello@bohniman.com" className="inline-flex items-center gap-[10px] rounded-[12px] px-8 py-[17px] font-semibold text-white transition-transform hover:-translate-y-[2px]" style={{ background: "var(--or)", fontSize: 16, boxShadow: "0 16px 34px -14px rgba(240,83,28,0.8)" }}>
              Book a Demo <span style={{ fontFamily: MONO }}>&rarr;</span>
            </a>
            <a href="mailto:hello@bohniman.com" className="inline-flex items-center rounded-[12px] px-[30px] py-[17px] font-semibold text-white transition-transform hover:-translate-y-[2px]" style={{ background: "transparent", fontSize: 16, border: "1px solid rgba(255,255,255,0.25)" }}>
              Start Free Trial
            </a>
          </div>
        </Reveal>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={{ background: "var(--charcoal)", color: "#B5AC9E", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-6 px-[18px] py-11 md:px-10">
          <div className="flex items-center">
            <ZalpanLogo tagline style={{ height: 43, width: "auto", color: "#fff" }} />
          </div>
          <div style={{ fontSize: 13, color: "#8A8072" }}>
            By{" "}
            <a href="https://bohniman.ai" target="_blank" rel="noopener noreferrer" className="no-underline" style={{ color: "var(--or2)", fontWeight: 600 }}>
              Bohniman Systems
            </a>{" "}
            · Restaurant Operating System
          </div>
        </div>
      </footer>
    </div>
  );
}
