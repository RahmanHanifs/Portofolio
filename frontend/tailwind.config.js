/** @type {import('tailwindcss').Config} */
module.exports = {
  blocklist: ["overline"],
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        /* Portfolio semantic tokens — resolve via CSS variables so dark-mode works */
        mint: {
          DEFAULT: "var(--mint)",
          deep: "var(--mint-deep)",
        },
        ink:      "var(--ink)",
        brand:    "var(--brand)",
        emerald:  "var(--emerald)",
        lime:     "var(--lime)",
        pop:      "var(--pop)",
        lemon:    "var(--lemon)",
        surface: {
          DEFAULT: "var(--surface)",
          alt:     "var(--surface-alt)",
        },
        line:     "var(--line)",
        panel:    "var(--panel)",
        "panel-fg":  "var(--panel-fg)",
        "on-accent": "var(--on-accent)",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "sans-serif"],
        body:    ['"Schibsted Grotesk"',   "sans-serif"],
        mono:    ['"JetBrains Mono"',       "monospace"],
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to:   { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to:   { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
