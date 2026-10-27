export const scrollToId = (selector) => {
  const el = document.querySelector(selector);
  if (!el) return;
  if (window.__lenis) window.__lenis.scrollTo(el, { offset: -84, duration: 1.2 });
  else el.scrollIntoView({ behavior: "smooth" });
};

export const copyEmail = async (email, toast) => {
  try {
    await navigator.clipboard.writeText(email);
    toast.success("Email copied — talk soon!");
  } catch {
    toast.info(email);
  }
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
