import { useEffect, useRef } from "react";
import gsap from "gsap";
import finvisorImage from "@/assets/finVisor_demo.png";
import loopaiImage from "@/assets/loop_demo.png";
import rateMyCalendarImage from "@/assets/ratemycalendar_demo.png";
import munchImage from "@/assets/munch_demo.png";
import lePlayImage from "@/assets/Leplay_demo.png";
import makerSafeImage from "@/assets/makersafe.png";
import { RacingMark } from "@/components/custom_ui/RacingMark.jsx";
import { SectionDivider } from "@/components/custom_ui/hero/SectionDivider.jsx";

const projects = [
  {
    title: "MakerSafe",
    description:
      "An intelligent safety monitoring platform using computer vision to ensure makerspace safety compliance in real-time.",
    tags: ["Python", "Flask", "React", "TailwindCSS", "shadcn/ui", "Framer Motion", "PostgreSQL", "WebSockets", "Raspberry Pi"],
    image: makerSafeImage,
    github: "https://github.com/justinsiek/Maker-Safe",
    devpost: "https://devpost.com/software/makersafe",
    winner: ["1st Overall Best Use of Viam @ CruzHacks 2026", "Best Hardware Hack (3rd Place)"],
  },
  {
    title: "finVisor",
    description: "Visualize your financial data with a personal AI assistant, built in under 3 hours.",
    tags: ["JavaScript", "Node.js", "Supabase", "LangChain", "React", "Chakra UI", "TailwindCSS"],
    image: finvisorImage,
    github: "https://github.com/thinhtn3/finVisor",
    devpost: "https://devpost.com/software/finvisor-p30hcd",
    winner: "1st Place @ Claude Builder Club 2025",
  },
  {
    title: "RateMyCalendar",
    description: "A dashboard for analyzing and visualizing calendar data",
    tags: ["JavaScript", "Node.js", "AWS", "DynamoDB", "Bedrock", "React", "Chakra UI"],
    image: rateMyCalendarImage,
    github: "https://github.com/winstonjgiang/RateMyCalendar",
    devpost: "https://devpost.com/software/ratemycalendar",
    winner: "3rd Place @ AWS Cloud Hack 2025",
  },
  {
    title: "LoopAI",
    description: "Your personal AI technical interview trainer",
    tags: ["JavaScript", "GoLang", "React", "Supabase", "LangChain", "shadcn/ui"],
    image: loopaiImage,
    github: "https://github.com/thinhtn3/loopai",
  },
  {
    title: "Munch",
    description: "Take a snapshot of your food and find the best restaurant in the area",
    tags: ["JavaScript", "Node.js", "React", "Material UI"],
    image: munchImage,
    github: "https://github.com/thinhtn3/munch",
  },
  {
    title: "LePlay",
    description: "Capture, replay and share highlights from your favorite NBA games",
    tags: ["Python", "Flask", "pytesseract", "React", "shadcn/ui", "TailwindCSS"],
    image: lePlayImage,
    github: "https://github.com/kYpranite/LePlay",
    devpost: "https://devpost.com/software/leplay",
  },
];

export function Projects() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(headerRef.current, { clipPath: "inset(0 100% 0 0)" });
      gsap.to(headerRef.current, {
        clipPath: "inset(0 0% 0 0)",
        duration: 0.75,
        ease: "power3.out",
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 88%",
          once: true,
        },
      });

      const cards = cardsRef.current.filter(Boolean);
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, rotateX: 8, transformOrigin: "top center" },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.65,
          ease: "power3.out",
          stagger: { amount: 0.5, from: "start" },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      const winnerBadges = sectionRef.current.querySelectorAll(".winner-badge");
      if (winnerBadges.length) {
        gsap.fromTo(
          winnerBadges,
          { scale: 0.8, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: "back.out(2)",
            stagger: 0.06,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
              once: true,
            },
            delay: 0.4,
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── Hover: 3D tilt + spotlight per card ──
  useEffect(() => {
    const cards = cardsRef.current.filter(Boolean);
    const cleanups = cards.map((card) => {
      const spotlight = card.querySelector(".card-spotlight");

      const onMouseMove = (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        gsap.to(card, {
          rotateY: ((x - cx) / cx) * 7,
          rotateX: -((y - cy) / cy) * 5,
          transformPerspective: 900,
          duration: 0.25,
          ease: "power2.out",
        });
        if (spotlight) {
          spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.06) 0%, transparent 65%)`;
          spotlight.style.opacity = "1";
        }
      };

      const onMouseLeave = () => {
        gsap.to(card, {
          rotateY: 0,
          rotateX: 0,
          duration: 0.6,
          ease: "power3.out",
        });
        if (spotlight) spotlight.style.opacity = "0";
      };

      card.addEventListener("mousemove", onMouseMove);
      card.addEventListener("mouseleave", onMouseLeave);
      return () => {
        card.removeEventListener("mousemove", onMouseMove);
        card.removeEventListener("mouseleave", onMouseLeave);
      };
    });
    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-primary pt-12 pb-4 px-6 md:pt-16 md:pb-4 md:px-8 xl:pt-14 xl:px-12 2xl:pt-32 2xl:pb-0 2xl:px-16 min-h-screen md:h-[88vh] flex flex-col overflow-hidden"
    >
      <SectionDivider />

      {/* ── Section header ── */}
      <div ref={headerRef} className="shrink-0 mb-3 xl:mb-4 2xl:mb-10">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[8px] xl:text-[9px] 2xl:text-sm text-accent/60 uppercase tracking-[0.25em] font-bold mb-0.5 2xl:mb-2">
              Constructor&apos;s Portfolio
            </p>
            <h2 className="text-2xl xl:text-3xl 2xl:text-5xl font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
              <RacingMark className="h-5 xl:h-7 2xl:h-10" /> Projects
            </h2>
          </div>
          <div className="hidden md:flex items-center gap-2 pb-0.5 2xl:pb-2">
            <span className="text-[8px] xl:text-[9px] 2xl:text-sm text-text-secondary/40 uppercase tracking-[0.2em] tabular-nums">
              {String(projects.length).padStart(2, "0")} Builds
            </span>
            <div className="w-1.5 h-1.5 2xl:w-2 2xl:h-2 rounded-full bg-accent animate-pulse" />
          </div>
        </div>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:grid-rows-2 gap-2 xl:gap-2.5 2xl:gap-6 max-w-7xl 2xl:max-w-[1800px] mx-auto w-full flex-1 min-h-0">
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={(el) => { cardsRef.current[index] = el; }}
            className={`
              group relative flex flex-col h-full rounded-sm
              border transition-[border-color,box-shadow,translate] duration-300
              hover:-translate-y-0.5
              ${project.winner
                ? "bg-secondary border-highlight/15 hover:border-highlight/40 hover:shadow-lg hover:shadow-highlight/8"
                : "bg-secondary border-white/5 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/8"}
            `}
            style={{ willChange: "transform" }}
          >
            {/* Mouse-tracking spotlight */}
            <div
              className="card-spotlight absolute inset-0 z-10 pointer-events-none transition-opacity duration-300 rounded-sm"
              style={{ opacity: 0 }}
            />

            {/* Top livery stripe */}
            <div
              className={`absolute top-0 left-0 right-0 h-[2px] z-20 ${
                project.winner
                  ? "bg-gradient-to-r from-highlight via-highlight/50 to-transparent"
                  : "bg-gradient-to-r from-accent via-accent/50 to-transparent"
              }`}
            />

            {/* ── Image ── */}
            <div className="relative overflow-hidden rounded-t-sm h-40 md:h-[35%] shrink-0 2xl:flex-1 2xl:h-auto">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-500 scale-105 group-hover:scale-110"
                style={{ transition: "opacity 0.5s, transform 0.6s" }}
              />
              {/* Gradient fade to card bg */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/5 to-secondary" />
              {/* Diagonal livery speed stripe */}
              <div
                className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, transparent 52%, rgba(177,18,38,0.5) 52%, rgba(252,209,22,0.2) 65%, transparent 65%)",
                }}
              />
              {/* Race number */}
              <div className="absolute top-2 right-2 z-10 font-black tabular-nums leading-none tracking-widest text-white/50 group-hover:text-white/70 transition-colors duration-300 text-[10px] xl:text-xs 2xl:text-base">
                {String(index + 1).padStart(2, "0")}
              </div>
              {/* Winner badges */}
              {project.winner && (
                <div className="absolute top-1.5 left-1.5 xl:top-2 xl:left-2 z-20 flex flex-col items-start gap-0.5 2xl:gap-2">
                  {Array.isArray(project.winner) ? (
                    project.winner.map((award, idx) => (
                      <div
                        key={idx}
                        className="winner-badge flex items-center bg-highlight/95 backdrop-blur-sm px-1.5 py-0.5 rounded-sm shadow-md shadow-highlight/20 2xl:px-3 2xl:py-1"
                      >
                        <span className="text-[7px] xl:text-[8px] 2xl:text-xs font-black text-primary uppercase tracking-wide whitespace-nowrap">
                          🏆 {award}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="winner-badge flex items-center bg-highlight/95 backdrop-blur-sm px-1.5 py-0.5 rounded-sm shadow-md shadow-highlight/20 2xl:px-3 2xl:py-1">
                      <span className="text-[7px] xl:text-[8px] 2xl:text-xs font-black text-primary uppercase tracking-wide whitespace-nowrap">
                        🏆 {project.winner}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ── Content ── */}
            <div className="relative flex flex-col p-2.5 xl:p-3 2xl:p-6 md:flex-1 md:min-h-0 overflow-hidden 2xl:flex-none 2xl:shrink-0">
              {/* Ghost race number background */}
              <div
                className="absolute -bottom-2 -right-1 font-black leading-none select-none pointer-events-none tabular-nums z-0"
                style={{
                  fontSize: "clamp(3rem, 5vw, 5.5rem)",
                  color: "rgba(255,255,255,0.03)",
                  lineHeight: 1,
                }}
              >
                {String(index + 1).padStart(2, "0")}
              </div>

              {/* Title */}
              <h3 className="relative z-10 text-xs md:text-xs xl:text-base 2xl:text-2xl font-black text-text-primary group-hover:text-highlight transition-colors duration-200 line-clamp-1 uppercase tracking-tight mb-1 2xl:mb-2">
                {project.title}
              </h3>

              {/* Accent dash separator */}
              <div className="relative z-10 flex items-center gap-1 mb-1.5 2xl:mb-4">
                <div className={`h-[1.5px] w-6 2xl:w-10 ${project.winner ? "bg-highlight" : "bg-accent"}`} />
                <div className={`h-[1.5px] w-2 2xl:w-4 ${project.winner ? "bg-highlight/35" : "bg-accent/35"}`} />
                <div className={`h-[1.5px] w-1 2xl:w-2 ${project.winner ? "bg-highlight/15" : "bg-accent/15"}`} />
              </div>

              {/* Description */}
              <p className="relative z-10 text-text-secondary text-[10px] md:text-[10px] xl:text-xs 2xl:text-base leading-relaxed line-clamp-2 mb-1.5 2xl:mb-0">
                {project.description}
              </p>

              {/* Tech specs */}
              <div className="relative z-10 mt-1.5 2xl:mt-4">
                <p className="text-[7px] xl:text-[8px] 2xl:text-[10px] uppercase tracking-[0.2em] font-bold mb-1 2xl:mb-2"
                  style={{ color: project.winner ? "rgba(252,209,22,0.45)" : "rgba(177,18,38,0.55)" }}
                >
                  SPECS
                </p>
                <div className="flex flex-wrap gap-[3px] xl:gap-1 2xl:gap-2 overflow-hidden max-h-[2.8rem] xl:max-h-[3rem] 2xl:max-h-none">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[8px] xl:text-[9px] 2xl:text-xs px-1.5 py-[2px] 2xl:px-2.5 2xl:py-1 rounded-sm bg-white/[0.04] text-text-secondary/70 border border-white/[0.07] hover:border-accent/40 hover:text-text-primary transition-colors duration-200 uppercase tracking-wider"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Links */}
              {(project.github || project.devpost) && (
                <div className="relative z-10 flex gap-1.5 xl:gap-2 2xl:gap-3 mt-2 2xl:mt-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 xl:gap-1.5 2xl:gap-2 px-2 xl:px-2.5 2xl:px-4 py-1 2xl:py-2 rounded-sm bg-white/[0.04] text-text-primary text-[9px] xl:text-[10px] 2xl:text-sm font-bold border-l-2 border-l-white/20 border-y border-r border-white/[0.07] hover:bg-accent/10 hover:border-l-accent hover:border-y-accent/20 hover:border-r-accent/20 hover:text-highlight transition-all duration-200 uppercase tracking-widest"
                    >
                      <svg className="w-2.5 h-2.5 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4" fill="currentColor" viewBox="0 0 24 24">
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
                      className="flex items-center gap-1 xl:gap-1.5 2xl:gap-2 px-2 xl:px-2.5 2xl:px-4 py-1 2xl:py-2 rounded-sm bg-white/[0.04] text-text-primary text-[9px] xl:text-[10px] 2xl:text-sm font-bold border-l-2 border-l-accent/40 border-y border-r border-white/[0.07] hover:bg-accent/10 hover:border-l-accent hover:border-y-accent/20 hover:border-r-accent/20 hover:text-accent transition-all duration-200 uppercase tracking-widest"
                    >
                      <svg className="w-2.5 h-2.5 xl:w-3 xl:h-3 2xl:w-4 2xl:h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c.009-2.569-1.096-3.853-3.767-3.853h-1.336z" />
                      </svg>
                      Devpost
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Bottom-right corner accent slash */}
            <div
              className="absolute bottom-0 right-0 w-8 h-8 xl:w-9 xl:h-9 2xl:w-14 2xl:h-14 pointer-events-none z-10 opacity-30 group-hover:opacity-60 transition-opacity duration-300"
              style={{
                background: project.winner
                  ? "linear-gradient(135deg, transparent 50%, rgba(252,209,22,0.35) 50%)"
                  : "linear-gradient(135deg, transparent 50%, rgba(177,18,38,0.3) 50%)",
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
