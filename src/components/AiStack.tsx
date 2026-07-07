"use client";

import { useEffect, useState } from "react";

const MONO = "var(--font-plex-mono), 'IBM Plex Mono', monospace";

// AI insight cards that auto-cycle, highlighting one at a time (traced from the design)
const AI_CARDS: [string, string][] = [
  ["Inventory", "Paneer stock may run low by Friday evening."],
  ["Rush hour", "Peak predicted today: 7:30 PM – 9:15 PM."],
  ["Menu", "Butter Chicken sales are up 34% this week."],
  ["Staffing", "You may be short-staffed for Saturday dinner."],
  ["Cost", "Food cost increased 8% versus last week."],
];

export function AiStack() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIdx((i) => (i + 1) % AI_CARDS.length),
      2600,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {AI_CARDS.map(([tag, body], i) => {
        const active = i === idx;
        return (
          <div
            key={tag}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 14,
              background: active
                ? "linear-gradient(150deg,#FFFDF8,#FDF3E8)"
                : "var(--paper)",
              border: `1px solid ${active ? "rgba(240,83,28,0.5)" : "var(--zline)"}`,
              borderRadius: 14,
              padding: 18,
              transition: "all .4s",
              transform: active ? "scale(1.03)" : "scale(1)",
              boxShadow: active
                ? "0 20px 40px -24px rgba(240,83,28,0.55)"
                : "none",
            }}
          >
            <span
              style={{
                width: 34,
                height: 34,
                flex: "0 0 auto",
                borderRadius: 9,
                background: active
                  ? "linear-gradient(150deg,#FF7C36,#F0531C)"
                  : "rgba(240,83,28,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"
                  stroke={active ? "#fff" : "#F0531C"}
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <circle
                  cx="12"
                  cy="12"
                  r="3.2"
                  stroke={active ? "#fff" : "#F0531C"}
                  strokeWidth="1.8"
                />
              </svg>
            </span>
            <div>
              <div
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "#B8431A",
                  marginBottom: 4,
                }}
              >
                {tag}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5, color: "var(--zink)" }}>
                {body}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
