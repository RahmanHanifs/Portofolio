import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DATASETS = {
  Sales:     { bars: [34, 48, 40, 62, 55, 78, 92], line: [22, 34, 30, 46, 42, 60, 74], delta: "+18.2%", note: "Monthly revenue growth" },
  Churn:     { bars: [58, 52, 44, 40, 36, 30, 24], line: [62, 55, 47, 42, 38, 30, 25], delta: "-6.4%",  note: "Churn rate trending down" },
  Retention: { bars: [40, 44, 48, 52, 58, 64, 70], line: [42, 46, 50, 55, 60, 66, 71], delta: "+9.1%",  note: "90-day retention up" },
};

const BAR_X = (i) => 12 + i * 43;

export default function ChartWidget() {
  const [tab, setTab] = useState("Sales");
  const ds = DATASETS[tab];

  const linePath = ds.line
    .map((v, i) => `${i === 0 ? "M" : "L"} ${BAR_X(i) + 13} ${112 - (v / 100) * 96}`)
    .join(" ");

  return (
    <div
      className="rounded-3xl backdrop-blur p-5 sm:p-6 shadow-soft"
      style={{
        border: "1px solid color-mix(in oklab, var(--line) 10%, transparent)",
        background: "color-mix(in oklab, var(--surface) 90%, transparent)",
      }}
    >
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "color-mix(in oklab, var(--ink) 50%, transparent)" }}>
          Live data playground
        </span>
        <div className="flex gap-1 rounded-full p-1" style={{ background: "var(--mint-deep)" }}>
          {Object.keys(DATASETS).map((k) => (
            <button
              key={k}
              data-testid={`hero-chart-tab-${k.toLowerCase()}`}
              onClick={() => setTab(k)}
              className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-wider transition-all"
              style={
                tab === k
                  ? { background: "var(--panel)", color: "var(--panel-fg)" }
                  : { color: "color-mix(in oklab, var(--ink) 60%, transparent)" }
              }
            >
              {k}
            </button>
          ))}
        </div>
      </div>

      <svg viewBox="0 0 320 132" className="w-full">
        {[28, 56, 84].map((y) => (
          <line key={y} x1="8" y1={y + 28} x2="312" y2={y + 28} stroke="var(--ink)" strokeOpacity="0.1" strokeDasharray="3 5" />
        ))}
        {ds.bars.map((v, i) => (
          <motion.rect
            key={`${tab}-bar-${i}`}
            x={BAR_X(i)}
            width="26"
            rx="7"
            style={{ fill: i === ds.bars.length - 1 ? "var(--lime)" : "var(--brand)" }}
            fillOpacity={i === ds.bars.length - 1 ? 1 : 0.24}
            initial={{ y: 112, height: 0 }}
            animate={{ y: 112 - (v / 100) * 96, height: (v / 100) * 96 }}
            transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
        <AnimatePresence mode="wait">
          <motion.path
            key={`${tab}-line`}
            d={linePath}
            fill="none"
            style={{ stroke: "var(--emerald)" }}
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </AnimatePresence>
        {ds.line.map((v, i) => (
          <motion.circle
            key={`${tab}-dot-${i}`}
            cx={BAR_X(i) + 13}
            cy={112 - (v / 100) * 96}
            r="3.2"
            style={{ fill: "var(--pop)", stroke: "var(--ink)" }}
            strokeWidth="1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 + i * 0.08 }}
          />
        ))}
      </svg>

      <div className="mt-3 flex items-end justify-between pt-3" style={{ borderTop: "1px solid color-mix(in oklab, var(--line) 10%, transparent)" }}>
        <div>
          <span className="font-display text-2xl font-bold text-ink" data-testid="hero-chart-delta">{ds.delta}</span>
          <span className="block font-mono text-[10px] uppercase tracking-widest" style={{ color: "color-mix(in oklab, var(--ink) 50%, transparent)" }}>{ds.note}</span>
        </div>
        <span className="font-mono text-[10px]" style={{ color: "color-mix(in oklab, var(--ink) 40%, transparent)" }}>hanif.dataviz</span>
      </div>
    </div>
  );
}
