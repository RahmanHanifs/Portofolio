import { ArrowUp, Linkedin, Github, Instagram, Mail } from "lucide-react";

const ICONS = { LinkedIn: Linkedin, GitHub: Github, Instagram: Instagram, Kaggle: null, Email: Mail };

export default function Footer({ profile, socials }) {
  const toTop = () => {
    if (window.__lenis) window.__lenis.scrollTo(0, { duration: 1.2 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-panel text-panel-fg pt-14 pb-8" data-testid="footer">
      <div className="mx-auto max-w-6xl px-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-lime text-on-accent font-mono text-sm font-bold">
                H.
              </span>
              <span className="font-display font-bold text-lg">{profile.name}</span>
            </div>
            <p
              className="mt-2 font-mono text-[11px] uppercase tracking-widest"
              style={{ color: "color-mix(in oklab, var(--panel-fg) 50%, transparent)" }}
            >
              {profile.role} · {profile.location}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {socials.map((s) => {
              const Icon = ICONS[s.label];
              return (
                <a
                  key={s.label}
                  data-testid={`footer-social-${s.label.toLowerCase()}`}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="grid place-items-center w-10 h-10 rounded-full transition-all"
                  style={{
                    border: "1px solid color-mix(in oklab, var(--panel-fg) 20%, transparent)",
                    color: "color-mix(in oklab, var(--panel-fg) 80%, transparent)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--lime)";
                    e.currentTarget.style.color = "var(--on-accent)";
                    e.currentTarget.style.borderColor = "var(--lime)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "";
                    e.currentTarget.style.color = "color-mix(in oklab, var(--panel-fg) 80%, transparent)";
                    e.currentTarget.style.borderColor = "color-mix(in oklab, var(--panel-fg) 20%, transparent)";
                  }}
                >
                  {Icon ? <Icon size={16} /> : <span className="font-mono text-[9px] font-bold">KG</span>}
                </a>
              );
            })}
            <button
              data-testid="footer-back-to-top"
              onClick={toTop}
              className="ml-2 grid place-items-center w-10 h-10 rounded-full bg-lime text-on-accent transition-colors"
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--pop)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row justify-between gap-2 font-mono text-[11px]"
          style={{
            borderTop: "1px solid color-mix(in oklab, var(--panel-fg) 10%, transparent)",
            color: "color-mix(in oklab, var(--panel-fg) 45%, transparent)",
          }}
        >
          <span>© 2026 {profile.name} — All data, no noise.</span>
          <span>React · FastAPI · MongoDB</span>
        </div>
      </div>
    </footer>
  );
}
