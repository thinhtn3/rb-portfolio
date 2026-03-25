import { useEffect, useRef } from "react";
import gsap from "gsap";
import finvisorImage from "@/assets/finVisor_demo.png";
import loopaiImage from "@/assets/loop_demo.png";
import rateMyCalendarImage from "@/assets/ratemycalendar_demo.png";
import munchImage from "@/assets/munch_demo.png";
import lePlayImage from "@/assets/Leplay_demo.png";
import makerSafeImage from "@/assets/makersafe.png";
import { SectionDivider } from "@/components/custom_ui/hero/SectionDivider.jsx";
import { RacingMark } from "@/components/custom_ui/RacingMark.jsx";

const projects = [
  {
    title: "MakerSafe",
    description:
      "An intelligent safety monitoring platform using computer vision to ensure makerspace safety compliance in real-time.",
    tags: [
      "Python",
      "Flask",
      "React",
      "TailwindCSS",
      "shadcn/ui",
      "Framer Motion",
      "PostgreSQL",
      "WebSockets",
      "Raspberry Pi",
    ],
    image: makerSafeImage,
    github: "https://github.com/justinsiek/Maker-Safe",
    devpost: "https://devpost.com/software/makersafe",
    winner: ["1st Overall Best Use of Viam @ CruzHacks 2026", "Best Hardware Hack (3rd Place)"],
    // featured: true,
  },
  {
    title: "finVisor",
    description:
      "Visualize your financial data with a personal AI assistant, built in under 3 hours.",
    tags: [
      "JavaScript",
      "Node.js",
      "Supabase",
      "LangChain",
      "React",
      "Chakra UI",
      "TailwindCSS",
    ],
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
      // ── Section header: wipe from left ──
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

      // ── Cards: stagger up once section is on screen ──
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

      // ── Winner badges: flash in after cards ──
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
          spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.05) 0%, transparent 65%)`;
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
      className="bg-primary pt-24 pb-8 px-8 2xl:pt-32 2xl:pb-12 2xl:px-12 h-screen flex flex-col"
    >
      {/* <SectionDivider /> */}

      <div ref={headerRef} className="shrink-0">
        <h2 className="text-3xl 2xl:text-4xl font-bold text-text-primary mb-6 2xl:mb-8 uppercase tracking-wider flex items-center gap-3">
          <RacingMark className="h-7 2xl:h-9" /> Projects
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 2xl:gap-6 max-w-7xl 2xl:max-w-[1600px] mx-auto w-full flex-1 min-h-0">
        {projects.map((project, index) => (
          <div
            key={project.title}
            ref={(el) => { cardsRef.current[index] = el; }}
            className={`
              group relative rounded-lg flex flex-col h-full
              border transition-[border-color,box-shadow,translate] duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-black/50
              ${project.winner
                ? "bg-secondary border-accent/20 hover:border-accent/40"
                : "bg-secondary border-white/5 hover:border-white/15"}
              ${project.featured ? "md:col-span-2 md:row-span-2" : ""}
            `}
            style={{ willChange: "transform" }}
          >
            {/* Mouse-tracking spotlight */}
            <div
              className="card-spotlight absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
              style={{ opacity: 0 }}
            />
            {/* Winner badges */}
            {project.winner && (
              <div className="absolute top-3 left-3 z-20 flex flex-col items-start gap-1">
                {Array.isArray(project.winner) ? (
                  project.winner.map((award, idx) => (
                    <div
                      key={idx}
                      className="winner-badge flex items-center gap-1 bg-highlight/95 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-md shadow-highlight/20"
                    >
                      <span className="text-[8px] 2xl:text-[10px] font-black text-primary uppercase tracking-wide whitespace-nowrap">
                        🏆 {award}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="winner-badge flex items-center gap-1 bg-highlight/95 backdrop-blur-sm px-2 py-0.5 rounded-full shadow-md shadow-highlight/20">
                    <span className="text-[8px] 2xl:text-[10px] font-black text-primary uppercase tracking-wide">
                      🏆 {project.winner}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Project image */}
            <div className="relative overflow-hidden rounded-t-lg h-32 2xl:h-44 shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-500 scale-100 group-hover:scale-105"
                style={{ transition: "opacity 0.5s, transform 0.6s" }}
              />
              <div className="absolute inset-0 bg-linear-to-t from-secondary via-secondary/60 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-4 2xl:p-6 flex-1 flex flex-col min-h-0">
              <h3 className="text-lg 2xl:text-xl font-bold text-text-primary mb-1.5 group-hover:text-highlight transition-colors duration-200 line-clamp-1">
                {project.title}
              </h3>
              <p className="text-text-secondary text-xs 2xl:text-sm mb-3 leading-relaxed line-clamp-2">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-3 overflow-hidden max-h-[44px] 2xl:max-h-[56px]">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] 2xl:text-xs px-2 py-0.5 bg-white/5 text-text-secondary rounded-full border border-white/10 hover:border-accent/50 hover:text-text-primary transition-colors duration-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              {(project.github || project.devpost) && (
                <div className="flex gap-2 mt-auto pt-2">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-text-primary text-[10px] 2xl:text-xs font-semibold rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-highlight transition-all duration-200"
                    >
                      <svg className="w-4 h-4 2xl:w-5 2xl:h-5" fill="currentColor" viewBox="0 0 24 24">
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
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 text-text-primary text-[10px] 2xl:text-xs font-semibold rounded-lg border border-white/10 hover:bg-white/10 hover:border-white/20 hover:text-accent transition-all duration-200"
                    >
                      <svg className="w-4 h-4 2xl:w-5 2xl:h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c.009-2.569-1.096-3.853-3.767-3.853h-1.336z" />
                      </svg>
                      Devpost
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Hover glow border */}
            <div className="absolute inset-0 z-20 rounded-lg border border-white/0 group-hover:border-white/10 transition-colors duration-300 pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
