import { useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToId } from "@/lib/site";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Awards", href: "#awards" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ profile }) {
  const [open, setOpen] = useState(false);

  const go = (href) => {
    setOpen(false);
    scrollToId(href);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 pt-4">
      <nav className="mx-auto max-w-6xl rounded-2xl border border-emerald-900/10 bg-white/75 backdrop-blur-xl shadow-[0_8px_30px_rgba(5,46,43,0.06)] px-4 sm:px-5 py-3 flex items-center justify-between">
        <button
          data-testid="navbar-logo"
          onClick={() => go("#top")}
          className="flex items-center gap-2.5 group"
        >
          <span className="grid place-items-center w-9 h-9 rounded-xl bg-ink text-pop font-mono text-sm font-bold group-hover:rotate-6 transition-transform">
            H.
          </span>
          <span className="font-display font-bold text-lg tracking-tight hidden sm:block">
            {profile.first_name}
            <span className="text-brand">.data</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <button
              key={l.href}
              data-testid={`navbar-link-${l.label.toLowerCase()}`}
              onClick={() => go(l.href)}
              className="px-3.5 py-2 rounded-full text-sm font-medium text-emerald-950/70 hover:text-ink hover:bg-mint-deep transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            data-testid="navbar-cta"
            href={`mailto:${profile.email}`}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-ink text-mint px-4 py-2 text-sm font-semibold hover:bg-brand hover:gap-2.5 transition-all"
          >
            Let's Talk <ArrowUpRight size={15} />
          </a>
          <button
            data-testid="mobile-menu-button"
            onClick={() => setOpen(!open)}
            className="md:hidden grid place-items-center w-9 h-9 rounded-xl border border-emerald-900/10 text-ink"
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          data-testid="mobile-menu"
          className="md:hidden mx-auto max-w-6xl mt-2 rounded-2xl border border-emerald-900/10 bg-white/95 backdrop-blur-xl p-2 shadow-lg"
        >
          {LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium hover:bg-mint-deep transition-colors"
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
