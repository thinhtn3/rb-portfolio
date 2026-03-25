import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TechStack } from "@/components/custom_ui/hero/TechStack.jsx";
import ucIrvineLogo from "@/assets/uci_icon.jpg";
import uberLogo from "@/assets/uber_icon.png";
import claudeLogo from "@/assets/cbc_icon.jpeg";
import cruzhacksLogo from "@/assets/CruzHacks.png";
import aiuciLogo from "@/assets/aiuci_icon.jpeg";
import { SectionDivider } from "@/components/custom_ui/hero/SectionDivider.jsx";
import { RacingMark } from "@/components/custom_ui/RacingMark.jsx";

const timeline = [
  {
    month: "June",
    year: "2026",
    title: "Incoming Software Engineering Intern",
    organization: "Uber",
    description: "Incoming Software Engineering Intern for Summer 2026.",
    // current: true,
    logo: uberLogo,
  },
  {
    month: "Dec",
    year: "2024",
    title: "Uber Career Prep: Software Engineer Fellow",
    organization: "Uber",
    description:
      "Completed an 8 month program to gain early career experience in software engineering.",
    logo: uberLogo,
  },
];

const achievements = [
  {
    title: "1st Overall Best Use of Viam",
    event: "CruzHacks",
    year: "January 2026",
    logo: cruzhacksLogo,
  },
  {
    title: "Best Hardware Hack (3rd Place)",
    event: "CruzHacks",
    year: "January 2026",
    logo: cruzhacksLogo,
  },
  {
    title: "1st Place Overall",
    event: "Claude Builder Club",
    year: "November 2025",
    logo: claudeLogo,
  },
  {
    title: "3rd Place Overall",
    event: "AWS Cloud Hack",
    year: "May 2025",
    logo: aiuciLogo,
  },
  {
    title: "Dean's List",
    event: "UC Irvine",
    year: "2025",
    logo: ucIrvineLogo,
  },
];

export function About() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const bioCardRef = useRef(null);
  const techStackRef = useRef(null);
  const timelineColRef = useRef(null);
  const timelineLineRef = useRef(null);
  const timelineItemsRef = useRef([]);
  const achievementGridRef = useRef(null);
  const achievementCardsRef = useRef([]);

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

      // ── Bio card: slides in from left ──
      gsap.fromTo(
        bioCardRef.current,
        { x: -70, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: bioCardRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );

      // ── Tech stack: fade up ──
      gsap.fromTo(
        techStackRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: techStackRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );

      // ── Timeline column: slide in from right ──
      gsap.fromTo(
        timelineColRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineColRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );

      // ── Timeline line: draws down as you scroll ──
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: timelineLineRef.current,
            start: "top 75%",
            end: "bottom 55%",
            scrub: 0.6,
          },
        },
      );

      // ── Timeline items: stagger in ──
      timelineItemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { x: 40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.55,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: "top 90%",
              once: true,
            },
          },
        );
      });

      // ── Achievement cards: stagger up with back bounce ──
      const cards = achievementCardsRef.current.filter(Boolean);
      if (cards.length) {
        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.5)",
            stagger: 0.07,
            scrollTrigger: {
              trigger: achievementGridRef.current,
              start: "top 88%",
              once: true,
            },
          },
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-primary pt-40 h-screen pb-6 px-6 md:pt-36 md:pb-8 md:px-8 2xl:pt-40 2xl:pb-12 2xl:px-12 flex flex-col justify-center"
    >

      <div className="max-w-7xl 2xl:max-w-[1600px] w-full mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 2xl:gap-16">
          {/* Left Column */}
          <div className="flex flex-col gap-6 md:gap-8">
            {/* Bio Card */}
            <div ref={bioCardRef}>
              <div className="bg-secondary p-5 md:p-8 2xl:p-10 rounded-lg relative overflow-hidden border border-white/5">
                {/* Subtle top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-accent via-highlight to-transparent rounded-t-2xl" />

                <h3 className="text-xl md:text-2xl 2xl:text-3xl font-bold text-text-primary mb-3 md:mb-4 2xl:mb-6 uppercase">
                  About <span className="text-highlight">Me</span>
                </h3>

                <p className="text-text-secondary mb-3 md:mb-4 2xl:mb-6 leading-relaxed text-sm md:text-base 2xl:text-lg">
                  I am currently pursuing a Bachelor's degree in Software
                  Engineering at UC Irvine with an interest in backend
                  development. I am passionate about building high-performance
                  systems that solve real-world problems and can be scaled to a
                  larger audience.
                </p>

                {/* Quick facts */}
                <div className="border-t border-white/10 pt-3 md:pt-4 2xl:pt-6 mt-2">
                  <div className="grid grid-cols-2 gap-2 md:gap-4 2xl:gap-6 text-xs md:text-sm 2xl:text-base">
                    <div className="bg-white/3 rounded-xl p-2.5 md:p-3 2xl:p-4">
                      <span className="text-text-secondary text-[10px] md:text-xs uppercase tracking-wider">
                        Location
                      </span>
                      <p className="text-text-primary font-bold mt-1">
                        Irvine, CA
                      </p>
                    </div>
                    <div className="bg-white/3 rounded-xl p-2.5 md:p-3 2xl:p-4">
                      <span className="text-text-secondary text-[10px] md:text-xs uppercase tracking-wider">
                        Education
                      </span>
                      <p className="text-text-primary font-bold mt-1">
                        UC Irvine
                      </p>
                    </div>
                    <div className="bg-white/3 rounded-xl p-2.5 md:p-3 2xl:p-4">
                      <span className="text-text-secondary text-[10px] md:text-xs uppercase tracking-wider">
                        Focus
                      </span>
                      <p className="text-text-primary font-bold mt-1">
                        Backend Dev
                      </p>
                    </div>
                    <div className="bg-highlight/10 rounded-xl p-2.5 md:p-3 2xl:p-4 border border-highlight/20">
                      <span className="text-highlight/70 text-[10px] md:text-xs uppercase tracking-wider">
                        Status
                      </span>
                      <p className="text-highlight font-bold mt-1">
                        Open to Work
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TechStack */}
            <div ref={techStackRef}>
              <h3 className="text-base md:text-lg 2xl:text-xl font-bold text-text-primary mb-3 md:mb-4 2xl:mb-6 uppercase flex items-center gap-2">
                <RacingMark className="h-4" />Tech Stack
              </h3>
              <div className="bg-secondary p-4 md:p-6 2xl:p-8 rounded-lg border border-white/5">
                <TechStack />
              </div>
            </div>
          </div>

          {/* Right Column — Timeline */}
          <div ref={timelineColRef} className="flex flex-col gap-6 md:gap-8">
            <div>
              <h3 className="text-base md:text-lg 2xl:text-xl font-bold text-text-primary mb-4 md:mb-6 2xl:mb-8 uppercase flex items-center gap-2">
                <RacingMark className="h-4" /> Experience
              </h3>

              <div className="relative">
                {/* Timeline line — drawn by GSAP scrub */}
                <div
                  ref={timelineLineRef}
                  className="absolute left-[19px] md:left-[23px] 2xl:left-[28px] top-0 bottom-0 w-0.5 bg-white/10"
                />

                <div className="space-y-3 md:space-y-4 2xl:space-y-6">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      ref={(el) => {
                        timelineItemsRef.current[index] = el;
                      }}
                      className="relative flex gap-4 md:gap-5 2xl:gap-7"
                    >
                      {/* Timeline dot */}
                      <div
                        className={`
                          relative z-10 w-10 h-12 md:w-12 md:h-14 2xl:w-14 2xl:h-16 rounded-xl flex flex-col items-center justify-center font-bold text-xs 2xl:text-sm shrink-0
                          ${item.current ? "bg-accent text-white shadow-lg shadow-accent/30" : "bg-secondary text-text-primary border border-white/10"}
                        `}
                      >
                        <span className="text-[9px] md:text-[10px] 2xl:text-xs uppercase opacity-80">
                          {item.month}
                        </span>
                        <span className="text-xs md:text-sm 2xl:text-base font-black">
                          {item.year.slice(2)}
                        </span>
                      </div>

                      {/* Content card */}
                      <div
                        className={`
                          flex-1 bg-secondary p-3 md:p-4 2xl:p-6 rounded-lg relative overflow-hidden
                          border border-white/5
                          ${item.current ? "border-l-2 border-l-highlight" : "border-l-2 border-l-accent/50"}
                        `}
                      >
                        {item.current && (
                          <span className="absolute top-2 right-2 md:top-3 md:right-3 text-[9px] md:text-[10px] 2xl:text-xs bg-highlight/15 text-highlight px-2 py-0.5 md:px-2.5 md:py-1 rounded-full font-bold uppercase border border-highlight/30">
                            Current
                          </span>
                        )}
                        <h4 className="text-text-primary font-bold text-sm md:text-base 2xl:text-lg flex items-center gap-2 md:gap-2.5 2xl:gap-3 pr-14 md:pr-16">
                          {item.logo && (
                            <img
                              src={item.logo}
                              alt={item.organization}
                              className="w-6 h-6 md:w-8 md:h-8 2xl:w-10 2xl:h-10 rounded-lg object-cover"
                            />
                          )}
                          {item.organization}
                        </h4>
                        <p className="text-accent text-xs md:text-sm 2xl:text-base font-medium mt-1 md:mt-1.5">
                          {item.title}
                        </p>
                        <p className="text-text-secondary text-xs md:text-sm 2xl:text-base mt-1.5 md:mt-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-base md:text-lg 2xl:text-xl font-bold text-text-primary mb-3 md:mb-4 2xl:mb-6 uppercase flex items-center gap-2">
                <RacingMark className="h-4" /> Achievements
              </h3>

              <div
                ref={achievementGridRef}
                className="grid grid-cols-2 gap-2.5 md:gap-3 2xl:gap-4"
              >
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.title}
                    ref={(el) => {
                      achievementCardsRef.current[index] = el;
                    }}
                    className="group bg-secondary p-2.5 md:p-3 2xl:p-5 rounded-lg relative overflow-hidden border border-white/5 hover:border-white/15 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 transition-all duration-300"
                  >
                    {/* Logo */}
                    <div className="flex items-start justify-between mb-2 md:mb-3">
                      <span className="text-[10px] md:text-xs 2xl:text-sm text-accent font-semibold bg-accent/10 px-1.5 py-0.5 md:px-2 md:py-0.5 rounded-full">
                        {achievement.year}
                      </span>
                      {achievement.logo && (
                        <img
                          src={achievement.logo}
                          alt={achievement.event}
                          className="w-6 h-6 md:w-8 md:h-8 2xl:w-9 2xl:h-9 rounded-lg object-cover"
                        />
                      )}
                    </div>

                    <h4 className="text-text-primary font-bold text-xs md:text-sm 2xl:text-base transition-colors duration-200 leading-snug">
                      {achievement.title}
                    </h4>
                    <p className="text-text-secondary text-[10px] md:text-xs 2xl:text-sm mt-1 md:mt-1.5 font-medium">
                      {achievement.event}
                    </p>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-linear-to-r from-accent to-highlight scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
