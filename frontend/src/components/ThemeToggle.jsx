import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export const THEME_KEY = "portfolio-theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    // On mount, read persisted preference; default to dark
    const saved = (() => {
      try { return localStorage.getItem(THEME_KEY); } catch { return null; }
    })();
    const prefersDark = saved ? saved === "dark" : true;
    setDark(prefersDark);
    document.documentElement.classList.toggle("dark", prefersDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  };

  return (
    <button
      data-testid="theme-toggle"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      className="grid place-items-center w-9 h-9 rounded-xl border border-line/15 text-ink hover:text-brand transition-colors"
      style={{ borderColor: "color-mix(in oklab, var(--line) 15%, transparent)" }}
    >
      {dark ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}

