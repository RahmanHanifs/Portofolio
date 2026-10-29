import { FileSpreadsheet, Database, Braces, Terminal, BarChart3, PieChart, Table, Cpu, Cloud, LineChart, GitBranch, Sparkles } from "lucide-react";

const ICONS = {
  Excel: FileSpreadsheet,
  SQL: Database,
  Python: Braces,
  R: Terminal,
  "Power BI": BarChart3,
  Tableau: PieChart,
  Pandas: Table,
  "scikit-learn": Cpu,
  PostgreSQL: Database,
  BigQuery: Cloud,
  "Looker Studio": LineChart,
  Git: GitBranch,
};

const Group = ({ items }) =>
  items.map((t) => {
    const Icon = ICONS[t] || Sparkles;
    return (
      <span
        key={t}
        className="marquee-item flex items-center gap-2.5 rounded-full px-5 py-2.5 shadow-sm mx-2.5"
        style={{
          border: "1px solid color-mix(in oklab, var(--line) 12%, transparent)",
          background: "color-mix(in oklab, var(--surface) 85%, transparent)",
        }}
      >
        <Icon size={17} className="text-brand" />
        <span className="font-mono text-xs font-medium tracking-wide" style={{ color: "color-mix(in oklab, var(--ink) 75%, transparent)" }}>{t}</span>
      </span>
    );
  });

export const ToolsMarquee = ({ tools }) => (
  <section
    className="py-8"
    style={{
      borderTop: "1px solid color-mix(in oklab, var(--line) 10%, transparent)",
      borderBottom: "1px solid color-mix(in oklab, var(--line) 10%, transparent)",
      background: "color-mix(in oklab, var(--mint-deep) 40%, transparent)",
    }}
    data-testid="tools-marquee"
  >
    <div className="marquee">
      <div className="marquee-track" style={{ "--marquee-duration": "30s" }}>
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="marquee-group">
            <Group items={tools} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const WordsMarquee = ({ words }) => (
  <section
    className="py-14 overflow-hidden"
    style={{ borderTop: "1px solid color-mix(in oklab, var(--line) 10%, transparent)" }}
    data-testid="words-marquee"
  >
    <div className="marquee">
      <div className="marquee-track" style={{ "--marquee-duration": "46s" }}>
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="marquee-group">
            {words.map((w) => (
              <span key={w} className="flex items-center mx-4">
                <span className="font-display font-extrabold uppercase tracking-tight text-[clamp(2.4rem,6vw,4.5rem)] leading-none text-stroke">
                  {w}
                </span>
                <span className="ml-8 text-2xl text-lime">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  </section>
);
