import React, { useEffect } from "react";
import Lenis from "lenis";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "sonner";
import axios from "axios";
import "@/App.css";
import { FALLBACK_PORTFOLIO } from "@/data";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { ToolsMarquee, WordsMarquee } from "@/components/Marquee";
import AboutBento from "@/components/AboutBento";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }
  static getDerivedStateFromError() {
    return { error: true };
  }
  render() {
    if (this.state.error) {
      return <div className="min-h-screen grid place-items-center bg-mint text-ink font-mono text-sm">Something went wrong — refresh the page.</div>;
    }
    return this.props.children;
  }
}

function App() {
  const { data } = useQuery({
    queryKey: ["portfolio"],
    queryFn: async () => {
      if (!process.env.REACT_APP_BACKEND_URL) return FALLBACK_PORTFOLIO;
      const res = await axios.get(`${API}/portfolio`);
      return res.data;
    },
    retry: false,
    staleTime: 5 * 60_000,
  });
  const portfolio = (data && data.profile) ? data : FALLBACK_PORTFOLIO;

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true });
    window.__lenis = lenis;
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);

  return (
    <ErrorBoundary>
      <div className="grain relative min-h-screen bg-mint text-ink overflow-x-clip">
        <Navbar profile={portfolio.profile} />
        <main>
          <Hero profile={portfolio.profile} socials={portfolio.socials} />
          <ToolsMarquee tools={portfolio.tools} />
          <AboutBento portfolio={portfolio} />
          <Projects projects={portfolio.projects} />
          <Experience experience={portfolio.experience} />
          <Certifications certifications={portfolio.certifications} />
          <WordsMarquee words={portfolio.marquee_words} />
        </main>
        <Footer profile={portfolio.profile} socials={portfolio.socials} />
        <Toaster position="bottom-right" richColors />
      </div>
    </ErrorBoundary>
  );
}

export default App;
