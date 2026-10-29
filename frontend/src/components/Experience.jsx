import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { fadeUp, stagger } from "@/lib/site";

export default function Experience({ experience }) {
  return (
    <section id="experience" className="py-20 md:py-28" data-testid="experience-timeline">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
          <motion.div variants={fadeUp}>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">✦ Career Path</span>
            <h2 className="mt-2 font-display text-4xl md:text-5xl font-extrabold tracking-tight">My Experience</h2>
            <p className="mt-3 max-w-xl" style={{ color: "color-mix(in oklab, var(--ink) 70%, transparent)" }}>
              A timeline of my professional journey, highlighting key roles and contributions in the data industry.
            </p>
          </motion.div>

          <div
            className="mt-10 relative ml-2 md:ml-4 space-y-10"
            style={{ borderLeft: "2px solid color-mix(in oklab, var(--line) 12%, transparent)" }}
          >
            {experience.map((x, i) => (
              <motion.div
                variants={fadeUp}
                key={x.role}
                className="relative pl-6 md:pl-10"
                data-testid={`experience-item-${i + 1}`}
              >
                <span
                  className="absolute -left-[13px] top-1 grid place-items-center w-6 h-6 rounded-full bg-lime"
                  style={{ boxShadow: "0 0 0 4px var(--mint)" }}
                >
                  <Briefcase size={11} className="text-ink" />
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-xl md:text-2xl font-bold tracking-tight">{x.role}</h3>
                  <span
                    className="font-mono text-[11px] rounded-full px-3 py-1"
                    style={{
                      background: "var(--mint-deep)",
                      color: "color-mix(in oklab, var(--ink) 75%, transparent)",
                    }}
                  >
                    {x.period}
                  </span>
                </div>
                <span className="mt-0.5 block font-mono text-xs text-brand">{x.company}</span>
                <ul className="mt-3 space-y-1.5">
                  {x.bullets.map((b) => (
                    <li key={b} className="text-sm leading-relaxed flex gap-2" style={{ color: "color-mix(in oklab, var(--ink) 75%, transparent)" }}>
                      <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-brand shrink-0" /> {b}
                    </li>
                  ))}
                </ul>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {x.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full px-2.5 py-1 font-mono text-[10px]"
                      style={{
                        border: "1px solid color-mix(in oklab, var(--line) 12%, transparent)",
                        color: "color-mix(in oklab, var(--ink) 60%, transparent)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
