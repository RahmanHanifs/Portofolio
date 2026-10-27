import { motion, useMotionValue, useSpring } from "framer-motion";
import { toast } from "sonner";
import { ArrowDown, Copy, TrendingUp } from "lucide-react";
import { scrollToId, copyEmail, stagger, fadeUp } from "@/lib/site";
import ChartWidget from "@/components/ChartWidget";

const SOCIALS = ["LinkedIn", "GitHub", "Kaggle", "Instagram"];

export default function Hero({ profile, socials }) {

  const rxRaw = useMotionValue(0);
  const ryRaw = useMotionValue(0);
  const rx = useSpring(rxRaw, { stiffness: 160, damping: 18 });
  const ry = useSpring(ryRaw, { stiffness: 160, damping: 18 });

  const onTilt = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    rxRaw.set(-py * 7);
    ryRaw.set(px * 9);
  };

  const socialUrl = (label) => {
    const s = socials.find((s) => s.label.toLowerCase() === label.toLowerCase());
    return s ? s.url : "#";
  };

  const lines = ["Turning raw data", "into sharp"];

  return (
    <section id="top" className="relative pt-32 md:pt-40 pb-16 overflow-hidden">
      <div className="absolute -top-32 -right-24 w-[480px] h-[480px] rounded-full bg-lemon/60 blur-3xl pointer-events-none" />
      <div className="absolute top-64 -left-32 w-[420px] h-[420px] rounded-full bg-emerald-200/50 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-emerald-900/15 bg-white/80 px-3.5 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-lime animate-pulse-dot" data-testid="hero-availability-dot" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-emerald-900/80">{profile.availability}</span>
          </motion.div>

          <motion.p variants={fadeUp} className="font-mono text-sm text-brand mb-3">
            Hello, it's me {profile.first_name} 
          </motion.p>

          <h1 className="font-display font-extrabold tracking-tight leading-[0.98] text-[clamp(2.6rem,7vw,4.9rem)]">
            {lines.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span
                  className="block"
                  initial={{ y: "112%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.13, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
            <span className="block overflow-hidden pb-2">
              <motion.span
                className="block"
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.41, ease: [0.22, 1, 0.36, 1] }}
              >
                <em className="not-italic relative inline-block text-brand">
                  decisions.
                  <motion.svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 220 12"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                  >
                    <motion.path
                      d="M4 8 C 60 2, 160 2, 216 7"
                      stroke="#A3E635"
                      strokeWidth="5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, delay: 1.1, ease: "easeOut" }}
                    />
                  </motion.svg>
                </em>
              </motion.span>
            </span>
          </h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-xl text-emerald-950/70 text-base md:text-lg leading-relaxed">
            {profile.intro}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <button
              data-testid="hero-cta-projects"
              onClick={() => scrollToId("#projects")}
              className="inline-flex items-center gap-2 rounded-full bg-ink text-mint px-6 py-3 text-sm font-semibold hover:bg-brand hover:-translate-y-0.5 transition-all shadow-[0_10px_24px_rgba(5,46,43,0.18)]"
            >
              Explore Projects <TrendingUp size={16} />
            </button>
            <button
              data-testid="hero-copy-email"
              onClick={() => copyEmail(profile.email, toast)}
              className="inline-flex items-center gap-2 rounded-full bg-white/85 border border-emerald-900/15 px-6 py-3 text-sm font-semibold hover:bg-lemon hover:-translate-y-0.5 transition-all"
            >
              <Copy size={15} /> Copy Email
            </button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
            {SOCIALS.map((s) => (
              <a
                key={s}
                data-testid={`hero-social-${s.toLowerCase()}`}
                href={socialUrl(s)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-950/60 hover:text-brand transition-colors"
              >
                {s}
              </a>
            ))}
            <a
              data-testid="hero-social-email"
              href={`mailto:${profile.email}`}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-950/60 hover:text-brand transition-colors"
            >
              Email
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ perspective: 900 }}
          onMouseMove={onTilt}
          onMouseLeave={() => { rxRaw.set(0); ryRaw.set(0); }}
        >
          <motion.div style={{ rotateX: rx, rotateY: ry }} data-testid="hero-chart-widget">
            <ChartWidget />
          </motion.div>

          <div className="animate-floaty absolute -left-3 sm:-left-8 -top-6 rounded-2xl border border-emerald-900/10 bg-white px-4 py-2.5 shadow-[0_14px_34px_rgba(5,46,43,0.14)]">
            <span className="font-mono text-xs font-bold text-ink">&lt;/&gt; SQL</span>
          </div>
          <div className="animate-floaty absolute -right-2 sm:-right-6 -bottom-7 rounded-2xl bg-ink text-mint px-4 py-3 shadow-[0_14px_34px_rgba(5,46,43,0.22)]" style={{ animationDelay: "1.2s" }}>
            <span className="font-display text-lg font-bold text-lime">25+</span>
            <span className="block font-mono text-[10px] uppercase tracking-widest text-mint/70">Dashboards built</span>
          </div>
        </motion.div>
      </div>

      <button
        data-testid="hero-scroll-down"
        onClick={() => scrollToId("#about")}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-950/50 hover:text-brand transition-colors"
      >
        Scroll Down
        <ArrowDown size={14} className="animate-bounce" />
      </button>
    </section>
  );
}
