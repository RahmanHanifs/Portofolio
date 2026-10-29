import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Copy, MapPin, Clock, GraduationCap, Wrench, Briefcase, Sparkles } from "lucide-react";
import { copyEmail, fadeUp, stagger, scrollToId } from "@/lib/site";

const SectionLabel = ({ children }) => (
  <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
    <Sparkles size={13} /> {children}
  </span>
);

export default function AboutBento({ portfolio }) {
  const { profile, socials, about, education, tools, experience } = portfolio;
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString("en-GB", { timeZone: "Asia/Jakarta", hour: "2-digit", minute: "2-digit" }));
    tick();
    const t = setInterval(tick, 30000);
    return () => clearInterval(t);
  }, []);

  const cellStyle = {
    borderRadius: "1.5rem",
    border: "1px solid color-mix(in oklab, var(--line) 10%, transparent)",
    background: "color-mix(in oklab, var(--surface) 85%, transparent)",
    padding: "1.5rem",
  };

  return (
    <section id="about" className="py-20 md:py-28" data-testid="about-bento">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} className="grid md:grid-cols-12 gap-5">
          {/* Photo card */}
          <motion.div
            variants={fadeUp}
            className="md:col-span-4 md:row-span-3 relative rounded-3xl overflow-hidden min-h-[420px] md:min-h-full"
            style={{ border: "1px solid color-mix(in oklab, var(--line) 10%, transparent)" }}
            data-testid="bento-photo"
          >
            <img src={profile.photo} alt={profile.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(to top, color-mix(in oklab, var(--panel) 85%, transparent), color-mix(in oklab, var(--panel) 10%, transparent), transparent)" }} />
            <div className="absolute top-4 left-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5" style={{ background: "color-mix(in oklab, var(--surface) 90%, transparent)" }}>
              <span className="w-2 h-2 rounded-full bg-lime animate-pulse-dot" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-ink">{profile.availability}</span>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between text-panel-fg">
              <div>
                <span className="font-display text-xl font-bold">{profile.name}</span>
                <span className="block font-mono text-[11px] uppercase tracking-widest text-lime">{profile.role}</span>
              </div>
              <div className="text-right font-mono text-[10px] space-y-1" style={{ color: "color-mix(in oklab, var(--panel-fg) 80%, transparent)" }}>
                <span className="flex items-center justify-end gap-1"><MapPin size={11} /> {profile.location}</span>
                <span className="flex items-center justify-end gap-1"><Clock size={11} /> {time} WIB</span>
              </div>
            </div>
          </motion.div>

          {/* About */}
          <motion.div variants={fadeUp} className="md:col-span-8" style={cellStyle}>
            <SectionLabel>About Me</SectionLabel>
            <p className="mt-3 font-display text-2xl md:text-[1.7rem] font-semibold leading-snug tracking-tight">
              Turning raw numbers into <span className="text-brand">decisions</span> — with 1+ years of analysis, 25+ dashboards, and zero tolerance for blurry charts.
            </p>
            <p className="mt-3 text-sm md:text-base leading-relaxed" style={{ color: "color-mix(in oklab, var(--ink) 70%, transparent)" }}>{about}</p>
          </motion.div>

          {/* Education */}
          <motion.div variants={fadeUp} className="md:col-span-4" style={cellStyle} data-testid="bento-education">
            <SectionLabel><GraduationCap size={13} /> Education</SectionLabel>
            <div className="mt-4 space-y-4">
              {education.map((e) => (
                <div key={e.degree}>
                  <span className="font-semibold text-sm leading-snug block">{e.degree}</span>
                  <span className="block font-mono text-[11px] text-brand mt-0.5">{e.school} · {e.period}</span>
                  <span className="block text-xs mt-1" style={{ color: "color-mix(in oklab, var(--ink) 60%, transparent)" }}>{e.detail}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Experience mini */}
          <motion.div variants={fadeUp} className="md:col-span-4 md:row-span-2" style={cellStyle} data-testid="bento-experience">
            <SectionLabel><Briefcase size={13} /> Experience</SectionLabel>
            <div className="mt-4 space-y-4">
              {experience.map((x) => (
                <div key={x.role} className="flex items-start justify-between gap-3 pb-3 last:pb-0" style={{ borderBottom: "1px solid color-mix(in oklab, var(--line) 10%, transparent)" }}>
                  <div>
                    <span className="font-semibold text-sm block">{x.role}</span>
                    <span className="text-xs" style={{ color: "color-mix(in oklab, var(--ink) 60%, transparent)" }}>{x.company}</span>
                  </div>
                  <span className="font-mono text-[10px] text-brand whitespace-nowrap mt-0.5">{x.period}</span>
                </div>
              ))}
            </div>
            <button
              data-testid="bento-experience-more"
              onClick={() => scrollToId("#experience")}
              className="mt-4 font-mono text-[11px] uppercase tracking-widest text-brand hover:text-ink transition-colors"
            >
              Full timeline ↓
            </button>
          </motion.div>

          {/* Tools */}
          <motion.div variants={fadeUp} className="md:col-span-4" style={cellStyle} data-testid="bento-tools">
            <SectionLabel><Wrench size={13} /> Tools</SectionLabel>
            <div className="mt-4 flex flex-wrap gap-2">
              {tools.map((t) => (
                <span
                  key={t}
                  className="rounded-full px-3 py-1.5 font-mono text-[11px] transition-colors cursor-default"
                  style={{ background: "var(--mint-deep)", color: "color-mix(in oklab, var(--ink) 80%, transparent)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--lime)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "var(--mint-deep)")}
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Contact CTA */}
          <motion.div
            variants={fadeUp}
            id="contact"
            className="md:col-span-12 rounded-3xl p-7 md:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10 bg-panel text-panel-fg"
            data-testid="bento-contact"
          >
            <div className="flex-1">
              <SectionLabel>Contact</SectionLabel>
              <h3 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
                Have data? <span className="text-lime">Let's make it talk.</span>
              </h3>
              <p className="mt-2 text-sm md:text-base" style={{ color: "color-mix(in oklab, var(--panel-fg) 70%, transparent)" }}>No forms, no friction — grab my email and say hi.</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                data-testid="bento-copy-email"
                onClick={() => copyEmail(profile.email, toast)}
                className="inline-flex items-center gap-2 rounded-full bg-lime text-on-accent px-6 py-3 text-sm font-bold hover:-translate-y-0.5 transition-all"
                onMouseEnter={(e) => (e.currentTarget.style.background = "var(--pop)")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              >
                <Copy size={15} /> {profile.email}
              </button>
              <div className="flex gap-4">
                {socials.filter((s) => s.label !== "Email").map((s) => (
                  <a
                    key={s.label}
                    data-testid={`bento-social-${s.label.toLowerCase()}`}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] uppercase tracking-widest hover:text-lime transition-colors"
                    style={{ color: "color-mix(in oklab, var(--panel-fg) 70%, transparent)" }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
