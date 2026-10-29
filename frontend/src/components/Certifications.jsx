import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { fadeUp, stagger } from "@/lib/site";

export default function Certifications({ certifications }) {
  return (
    <section
      id="awards"
      className="py-20 md:py-28"
      style={{
        borderTop: "1px solid color-mix(in oklab, var(--line) 10%, transparent)",
        borderBottom: "1px solid color-mix(in oklab, var(--line) 10%, transparent)",
        background: "color-mix(in oklab, var(--mint-deep) 35%, transparent)",
      }}
      data-testid="certifications-list"
    >
      <div className="mx-auto max-w-6xl px-5">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          <motion.div variants={fadeUp}>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">✦ Recognition</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-extrabold tracking-tight">Awards &amp; Certifications</h2>
          </motion.div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((c) => (
              <motion.div
                variants={fadeUp}
                key={c.title}
                data-testid={`cert-item-${c.title.split(" ")[0].toLowerCase()}`}
                className="group rounded-3xl p-5 transition-colors cursor-default"
                style={{
                  border: "1px solid color-mix(in oklab, var(--line) 10%, transparent)",
                  background: "color-mix(in oklab, var(--surface) 85%, transparent)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--panel)";
                  e.currentTarget.style.color = "var(--panel-fg)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "color-mix(in oklab, var(--surface) 85%, transparent)";
                  e.currentTarget.style.color = "";
                }}
              >
                <span
                  className="grid place-items-center w-10 h-10 rounded-xl transition-colors"
                  style={{ background: "var(--mint-deep)", color: "var(--ink)" }}
                >
                  <Award size={18} />
                </span>
                <h3 className="mt-4 font-semibold leading-snug">{c.title}</h3>
                <div
                  className="mt-2 flex items-center justify-between font-mono text-[11px]"
                  style={{ color: "color-mix(in oklab, var(--ink) 60%, transparent)" }}
                >
                  <span>{c.issuer}</span>
                  <span>{c.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
