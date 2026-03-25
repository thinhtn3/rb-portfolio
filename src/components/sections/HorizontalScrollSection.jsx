import { useEffect, useRef, useLayoutEffect, useState } from "react";
import finvisorImage from "@/assets/finVisor_demo.png";
import loopaiImage from "@/assets/loop_demo.png";
import rateMyCalendarImage from "@/assets/ratemycalendar_demo.png";
import munchImage from "@/assets/munch_demo.png";
import lePlayImage from "@/assets/Leplay_demo.png";
import makerSafeImage from "@/assets/makersafe.png";
import uberLogo from "@/assets/uber_icon.png";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiGo,
  SiCplusplus,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
} from "react-icons/si";

const TECH = [
  { name: "JS",     Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TS",     Icon: SiTypescript, color: "#3178C6" },
  { name: "Python", Icon: SiPython,     color: "#3776AB" },
  { name: "Go",     Icon: SiGo,         color: "#00ADD8" },
  { name: "C++",    Icon: SiCplusplus,  color: "#00599C" },
  { name: "React",  Icon: SiReact,      color: "#61DAFB" },
  { name: "Node",   Icon: SiNodedotjs,  color: "#339933" },
  { name: "SQL",    Icon: SiPostgresql, color: "#336791" },
];

const PROJECTS = [
  {
    title: "MakerSafe",
    description: "Intelligent safety monitoring platform using computer vision for real-time makerspace compliance.",
    tags: ["Python", "Flask", "React", "WebSockets"],
    image: makerSafeImage,
    github: "https://github.com/justinsiek/Maker-Safe",
    devpost: "https://devpost.com/software/makersafe",
    winner: "1st Overall Best Use of Viam · CruzHacks 2026",
  },
  {
    title: "finVisor",
    description: "Visualize your financial data with a personal AI assistant, built in under 3 hours.",
    tags: ["Node.js", "Supabase", "LangChain", "React"],
    image: finvisorImage,
    github: "https://github.com/thinhtn3/finVisor",
    devpost: "https://devpost.com/software/finvisor-p30hcd",
    winner: "1st Place · Claude Builder Club 2025",
  },
  {
    title: "RateMyCalendar",
    description: "Dashboard for analyzing and visualizing calendar and scheduling data.",
    tags: ["AWS", "DynamoDB", "Bedrock", "React"],
    image: rateMyCalendarImage,
    github: "https://github.com/winstonjgiang/RateMyCalendar",
    devpost: "https://devpost.com/software/ratemycalendar",
    winner: "3rd Place · AWS Cloud Hack 2025",
  },
  {
    title: "LoopAI",
    description: "Your personal AI technical interview trainer.",
    tags: ["GoLang", "Supabase", "LangChain", "React"],
    image: loopaiImage,
    github: "https://github.com/thinhtn3/loopai",
  },
  {
    title: "Munch",
    description: "Snapshot your food and find the best restaurant in the area.",
    tags: ["JavaScript", "Node.js", "React", "Material UI"],
    image: munchImage,
    github: "https://github.com/thinhtn3/munch",
  },
  {
    title: "LePlay",
    description: "Capture, replay and share highlights from your favorite NBA games.",
    tags: ["Python", "Flask", "React", "TailwindCSS"],
    image: lePlayImage,
    github: "https://github.com/kYpranite/LePlay",
    devpost: "https://devpost.com/software/leplay",
  },
];

export function HorizontalScrollSection() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const projectsAnchorRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Measure track, set container height, position #projects anchor
  useLayoutEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const container = containerRef.current;
      const projectsAnchor = projectsAnchorRef.current;
      if (!track || !container) return;

      const maxHScroll = track.scrollWidth - window.innerWidth;
      container.style.height = `${window.innerHeight + Math.max(0, maxHScroll)}px`;

      // Position #projects sentinel so scrollIntoView brings first project into view
      const firstProjCard = track.querySelector("[data-proj-card]");
      if (firstProjCard && projectsAnchor) {
        const offset = Math.max(0, firstProjCard.offsetLeft - 60);
        projectsAnchor.style.top = `${offset}px`;
      }
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Drive horizontal translation from window scroll
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track) return;

      const maxHScroll = track.scrollWidth - window.innerWidth;
      if (maxHScroll <= 0) return;

      const scrolled = Math.max(0, -container.getBoundingClientRect().top);
      const p = Math.min(1, scrolled / maxHScroll);

      setProgress(p);
      // Direct DOM write — no React re-render lag on scroll
      track.style.transform = `translateX(${-scrolled}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const onProjects = progress > 0.18;

  return (
    <div ref={containerRef} className="relative bg-primary">
      {/* ── Anchor sentinels ── */}
      <div id="about" style={{ position: "absolute", top: 0 }} />
      <div ref={projectsAnchorRef} id="projects" style={{ position: "absolute" }} />

      {/* ── Sticky viewport ── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Horizontal scroll progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] z-30 bg-white/5">
          <div
            className="h-full bg-accent"
            style={{ width: `${progress * 100}%`, transition: "none" }}
          />
        </div>

        {/* Panel dot indicators */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 flex gap-2.5 items-center">
          {["About", "Projects"].map((label, i) => {
            const active = i === 0 ? !onProjects : onProjects;
            return (
              <div
                key={label}
                className="h-[3px] rounded-full transition-all duration-400"
                style={{
                  width: active ? 28 : 8,
                  backgroundColor: active ? "var(--color-accent)" : "rgba(255,255,255,0.2)",
                }}
              />
            );
          })}
        </div>

        {/* Side panel label */}
        <div className="absolute top-1/2 -translate-y-1/2 right-5 z-30 pointer-events-none select-none">
          <div className="flex flex-col items-center gap-3" style={{ writingMode: "vertical-rl" }}>
            <span
              className="text-[9px] font-bold uppercase tracking-[0.3em] transition-colors duration-300"
              style={{ color: onProjects ? "rgba(255,255,255,0.2)" : "var(--color-accent)" }}
            >
              About
            </span>
            <div className="w-px h-5 bg-white/15" />
            <span
              className="text-[9px] font-bold uppercase tracking-[0.3em] transition-colors duration-300"
              style={{ color: onProjects ? "var(--color-accent)" : "rgba(255,255,255,0.2)" }}
            >
              Projects
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 pointer-events-none select-none"
          style={{ opacity: Math.max(0, 1 - progress * 8) }}
        >
          <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-text-secondary">
            scroll to explore
          </span>
          <div className="w-6 h-px bg-accent" style={{ animation: "pulse 1.5s ease-in-out infinite" }} />
          <span className="text-accent text-xs">→</span>
        </div>

        {/* ── Horizontal track ── */}
        <div
          ref={trackRef}
          className="flex items-center h-full will-change-transform"
          style={{ paddingLeft: 80, paddingRight: 80, gap: 28 }}
        >

          {/* ── About card ── */}
          <div
            className="flex-shrink-0 relative bg-secondary rounded-sm overflow-hidden border border-white/5 shadow-2xl shadow-black/60"
            style={{ width: 460, height: "calc(100vh - 100px)" }}
          >
            {/* Accent bar */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent z-10" />

            {/* Pit board header */}
            <div className="absolute top-0 left-0 right-0 h-[52px] z-10 flex items-center px-5 gap-3">
              <div className="bg-highlight px-2 py-0.5 -skew-x-12 shrink-0">
                <span className="text-primary font-black text-sm skew-x-12 inline-block">P2</span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-text-secondary">
                About
              </span>
            </div>

            <div className="h-full flex flex-col px-6 pt-[60px] pb-5 gap-4">
              {/* Name */}
              <div>
                <div className="text-[9px] uppercase tracking-[0.35em] text-accent font-bold mb-1">
                  Software Engineer
                </div>
                <h2 className="text-[2.2rem] font-black uppercase leading-[1.05] text-text-primary tracking-tight">
                  Thinh<br />
                  <span className="text-accent">Nguyen</span>
                </h2>
              </div>

              {/* Bio */}
              <p className="text-text-secondary text-[13px] leading-relaxed">
                Pursuing a B.S. in Software Engineering at UC Irvine. Passionate about
                building high-performance backend systems that scale to a larger audience.
              </p>

              {/* Quick stats */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Location", value: "Irvine, CA" },
                  { label: "Education", value: "UC Irvine" },
                  { label: "Focus", value: "Backend Dev" },
                  { label: "Status", value: "Open to Work", accent: true },
                ].map(({ label, value, accent }) => (
                  <div
                    key={label}
                    className={`rounded-sm p-2.5 border ${accent
                      ? "bg-highlight/10 border-highlight/20"
                      : "bg-white/[0.03] border-white/5"
                    }`}
                  >
                    <span className={`block text-[9px] uppercase tracking-wider ${accent ? "text-highlight/60" : "text-text-secondary"}`}>
                      {label}
                    </span>
                    <span className={`text-xs font-bold mt-0.5 block ${accent ? "text-highlight" : "text-text-primary"}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Uber badge */}
              <div className="flex items-center gap-2.5 px-3 py-2 bg-black/25 rounded-sm border border-white/5">
                <img src={uberLogo} alt="Uber" className="w-6 h-6 rounded" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#06C167] shadow-[0_0_5px_rgba(6,193,103,0.8)]" />
                    <span className="text-[#06C167] text-[9px] font-black uppercase tracking-widest">
                      Incoming SWE Intern
                    </span>
                  </div>
                  <span className="text-text-secondary text-[9px]">Uber · Summer 2026</span>
                </div>
              </div>

              {/* Tech stack */}
              <div className="flex-1 flex flex-col justify-end">
                <div className="text-[9px] uppercase tracking-[0.28em] text-text-secondary mb-2 font-bold">
                  <span className="text-accent mr-1">//</span> Tech Stack
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {TECH.map(({ name, Icon, color }) => (
                    <div
                      key={name}
                      className="flex flex-col items-center gap-1 p-2 rounded-sm bg-white/[0.03] border border-white/5 hover:border-white/15 hover:bg-white/5 transition-all"
                    >
                      <Icon size={16} style={{ color }} />
                      <span className="text-[8px] text-text-secondary uppercase tracking-wide">{name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Divider between About and Projects ── */}
          <div className="flex-shrink-0 flex flex-col items-center justify-center gap-3" style={{ height: "50vh" }}>
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
            <div
              className="text-[8px] font-bold uppercase tracking-[0.4em] text-text-secondary"
              style={{ writingMode: "vertical-rl" }}
            >
              Projects
            </div>
            <div className="w-px flex-1 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>

          {/* ── Project cards ── */}
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              data-proj-card="true"
              className="flex-shrink-0 relative bg-secondary rounded-sm overflow-hidden border border-white/5 group hover:border-white/10 transition-[border-color,box-shadow] duration-300 hover:shadow-2xl hover:shadow-black/70"
              style={{ width: 340, height: "calc(100vh - 100px)" }}
            >
              {/* Accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] z-10 bg-accent opacity-50 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Card number */}
              <div
                className="absolute top-4 right-4 z-10 text-[32px] font-black leading-none -skew-x-6 pointer-events-none"
                style={{
                  WebkitTextStroke: "1px rgba(177,18,38,0.4)",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </div>

              {/* Winner badge */}
              {project.winner && (
                <div className="absolute top-4 left-4 z-20">
                  <div className="bg-highlight/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-lg shadow-highlight/25">
                    <span className="text-[8px] font-black text-primary uppercase tracking-wide whitespace-nowrap">
                      🏆 {project.winner}
                    </span>
                  </div>
                </div>
              )}

              {/* Project image */}
              <div className="relative overflow-hidden" style={{ height: "42%" }}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-45 group-hover:opacity-65 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/55 to-transparent" />
              </div>

              {/* Content */}
              <div className="flex flex-col px-5 py-4" style={{ height: "58%" }}>
                <h3 className="text-base font-black text-text-primary uppercase tracking-tight mb-1 group-hover:text-highlight transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-[11px] leading-relaxed mb-3 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] px-2 py-0.5 bg-white/[0.04] text-text-secondary rounded-full border border-white/10 uppercase tracking-wide"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] text-text-primary text-[9px] font-bold rounded-sm border border-white/10 hover:bg-white/10 hover:text-highlight hover:border-highlight/30 transition-all uppercase tracking-wide"
                    >
                      <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.devpost && (
                    <a
                      href={project.devpost}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.04] text-text-primary text-[9px] font-bold rounded-sm border border-white/10 hover:bg-white/10 hover:text-accent hover:border-accent/30 transition-all uppercase tracking-wide"
                    >
                      Devpost
                    </a>
                  )}
                </div>
              </div>

              {/* Hover glow border */}
              <div className="absolute inset-0 rounded-sm border border-highlight/0 group-hover:border-highlight/12 transition-colors duration-300 pointer-events-none" />
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}
