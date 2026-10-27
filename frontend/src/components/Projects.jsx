import { useEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue } from "framer-motion";
import { ArrowLeft, ArrowRight, MoveHorizontal, BarChart3, Building2, Users, MapPin } from "lucide-react";

export default function Projects({ projects }) {
  const viewportRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [maxDrag, setMaxDrag] = useState(0);
  const x = useMotionValue();

  const goTo = (i) => {
    const clamped = Math.max(0, Math.min(i, projects.length - 1));
    const step = slideStep();
    const target = Math.min(maxDrag, clamped * step);
    animate(x, -target, { type: "spring", stiffness: 240, damping: 30 });
    setIndex(clamped);
  };

  const slideStep = () => {
    const track = viewportRef.current?.querySelector("[data-track]");
    const first = track?.children[0];
    return first ? first.offsetWidth + 24 : 0;
  };

  useEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      if (!vp) return;
      const track = vp.querySelector("[data-track]");
      setMaxDrag(Math.max(0, track.scrollWidth - vp.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [projects]);

  return (
    <section id="projects" className="py-20 md:py-28 bg-mint-deep/35 border-y border-emerald-900/10" data-testid="projects-section">
      <div className="mx-auto max-w-6xl px-5">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">✦ Selected Works</span>
          <div className="mt-2 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight">Featured Projects</h2>
            <div className="flex items-center gap-2" data-testid="projects-arrows">
              <button data-testid="projects-prev" onClick={() => goTo(index - 1)} disabled={index === 0} className="grid place-items-center w-11 h-11 rounded-full border border-emerald-900/15 bg-white text-ink disabled:opacity-35 hover:bg-lemon transition-all" aria-label="Previous project">
                <ArrowLeft size={17} />
              </button>
              <button data-testid="projects-next" onClick={() => goTo(index + 1)} disabled={index >= projects.length - 1} className="grid place-items-center w-11 h-11 rounded-full bg-ink text-mint disabled:opacity-35 hover:bg-brand transition-all" aria-label="Next project">
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
          <p className="mt-3 max-w-xl text-emerald-950/70">A curated set of analyses — from marketing strategy to churn models — presented the way I'd present them to a stakeholder.</p>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
        <div className="mt-10 flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-widest text-emerald-950/50" data-testid="projects-drag-hint">
          <MoveHorizontal size={15} /> Grab &amp; slide
        </div>

        <div ref={viewportRef} className="mt-4 overflow-hidden cursor-grab active:cursor-grabbing" data-testid="projects-track">
          <motion.div
            data-track
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -maxDrag, right: 0 }}
            dragTransition={{ power: 0.22, timeConstant: 220 }}
            onDragEnd={() => goTo(Math.round(-x.get() / slideStep()))}
            className="flex items-stretch gap-6 px-5 w-max"
          >
            {projects.map((p) => (
              <motion.article
                key={p.num}
                data-testid={`project-slide-${p.num}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: 0.05 * p.num }}
                className="w-[92vw] max-w-[980px] shrink-0"
              >
                <div className="grid md:grid-cols-[420px_1fr] rounded-[1.75rem] overflow-hidden bg-[#EAF6EF] border border-emerald-900/10 shadow-[0_24px_60px_rgba(5,46,43,0.10)] h-full">
                  <div className="relative h-60 md:h-auto min-h-[380px]" data-testid={`project-image-${p.num}`}>
                    <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover pointer-events-none" draggable={false} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-transparent" />
                    <div className="absolute bottom-0 inset-x-0 p-5 text-mint">
                      <span className="font-display font-bold leading-tight block">{p.title}</span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-lime mt-1 block">Data Analyst Project</span>
                    </div>
                  </div>

                  <div className="p-6 md:p-8 flex flex-col gap-5 text-ink">
                    <div className="flex items-center gap-3">
                      <span className="grid place-items-center w-10 h-10 rounded-xl bg-ink text-lime"><BarChart3 size={18} /></span>
                      <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-emerald-950/60">Project {p.num} · {p.category}</span>
                    </div>

                    <h3 className="font-display text-2xl md:text-[1.8rem] font-bold leading-tight tracking-tight">{p.title}</h3>

                    <div className="rounded-2xl border border-emerald-900/12 bg-white/75 p-4">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">About the project</span>
                      <p className="mt-1.5 text-sm leading-relaxed text-emerald-950/80">{p.about}</p>
                    </div>

                    <div>
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-950/50">Company information</span>
                      <div className="mt-2 grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-x-6 gap-y-2 items-center">
                        <span className="font-display text-2xl font-extrabold text-brand tracking-tight">{p.company.name}</span>
                        <div className="space-y-1.5 font-mono text-[11px] text-emerald-950/75">
                          <span className="flex items-center gap-2"><Building2 size={13} className="text-ink" /> {p.company.industry}</span>
                          <span className="flex items-center gap-2"><Users size={13} className="text-ink" /> {p.company.size}</span>
                          <span className="flex items-center gap-2"><MapPin size={13} className="text-ink" /> {p.company.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-auto pt-1">
                      <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-950/50">Tools</span>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {p.tools.map((t) => (
                          <span key={t} className="inline-flex items-center gap-1.5 rounded-full bg-white border border-emerald-900/12 px-3 py-1.5 font-mono text-[11px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-lime ring-1 ring-ink/20" /> {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>

        <div className="mx-auto max-w-6xl px-5 mt-8" data-testid="projects-progress-wrap">
          <div className="h-1.5 rounded-full bg-emerald-900/10 overflow-hidden">
            <motion.div
              data-testid="projects-progress"
              className="h-full rounded-full bg-brand"
              animate={{ width: `${((index + 1) / projects.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 26 }}
            />
          </div>
          <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-emerald-950/45">
            <span>{String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}</span>
            <span>{projects[index]?.category}</span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
