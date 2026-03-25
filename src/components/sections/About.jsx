import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TechStack } from "@/components/custom_ui/hero/TechStack.jsx";
import ucIrvineLogo from "@/assets/uci_icon.jpg";
import uberLogo from "@/assets/uber_icon.png";
import claudeLogo from "@/assets/cbc_icon.jpeg";
import cruzhacksLogo from "@/assets/CruzHacks.png";
import aiuciLogo from "@/assets/aiuci_icon.jpeg";
import { SectionDivider } from "@/components/custom_ui/hero/SectionDivider.jsx";

const timeline = [
  {
    month: "April",
    year: "2025",
    title: "B.S. in Software Engineering",
    organization: "UC Irvine",
    description: "Pursuing a Bachelor's degree in Software Engineering",
    current: true,
    logo: ucIrvineLogo,
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
        }
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
        }
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
        }
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
        }
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
          }
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
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-primary min-h-screen py-8 px-8 2xl:py-12 2xl:px-12"
    >
      <SectionDivider />

      {/* Section Header */}
      <div ref={headerRef} className="mb-16 2xl:mb-20">
        <h2 className="text-4xl 2xl:text-5xl font-bold text-text-primary uppercase tracking-wider">
          <span className="text-accent">//</span> About
        </h2>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 2xl:gap-16">
          {/* Left Column */}
          <div>
            {/* Bio Card */}
            <div ref={bioCardRef}>
              <div className="bg-secondary p-8 2xl:p-10 rounded-sm relative overflow-hidden">
                {/* Diagonal stripe */}
                <div className="absolute top-0 right-0 w-32 2xl:w-40 h-32 2xl:h-40 overflow-hidden">
                  <div className="absolute top-6 2xl:top-8 -right-10 2xl:-right-12 w-40 2xl:w-48 h-8 2xl:h-10 bg-accent rotate-45 opacity-80" />
                </div>

                <h3 className="text-2xl 2xl:text-3xl font-bold text-text-primary mb-4 2xl:mb-6 uppercase">
                  About <span className="text-highlight">Me</span>
                </h3>

                <p className="text-text-secondary mb-4 2xl:mb-6 leading-relaxed text-base 2xl:text-lg">
                  I am currently pursuing a Bachelor's degree in Software
                  Engineering at UC Irvine with an interest in backend
                  development. I am passionate about building high-performance
                  systems that solve real-world problems and can be scaled to a
                  larger audience.
                </p>

                <p className="text-text-secondary mb-6 leading-relaxed"></p>

                {/* Quick facts */}
                <div className="border-t border-text-secondary/20 pt-4 2xl:pt-6 mt-4 2xl:mt-6">
                  <div className="grid grid-cols-2 gap-4 2xl:gap-6 text-sm 2xl:text-base">
                    <div>
                      <span className="text-text-secondary">Location</span>
                      <p className="text-text-primary font-bold">Irvine, CA</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Education</span>
                      <p className="text-text-primary font-bold">UC Irvine</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Focus</span>
                      <p className="text-text-primary font-bold">Backend Dev</p>
                    </div>
                    <div>
                      <span className="text-text-secondary">Status</span>
                      <p className="text-highlight font-bold">Open to Work</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TechStack */}
            <div ref={techStackRef} className="mt-8 2xl:mt-10">
              <h3 className="text-lg 2xl:text-xl font-bold text-text-primary mb-4 2xl:mb-6 uppercase flex items-center gap-2">
                <span className="text-accent">//</span> Current Tech Stack
              </h3>
              <div className="bg-secondary p-6 2xl:p-8 rounded-sm border border-text-secondary/20">
                <TechStack />
              </div>
            </div>
          </div>

          {/* Right Column — Timeline */}
          <div ref={timelineColRef}>
            <h3 className="text-lg 2xl:text-xl font-bold text-text-primary mb-6 2xl:mb-8 uppercase flex items-center gap-2">
              <span className="text-accent">//</span> Timeline
            </h3>

            <div className="relative">
              {/* Timeline line — drawn by GSAP scrub */}
              <div
                ref={timelineLineRef}
                className="absolute left-[23px] 2xl:left-[28px] top-0 bottom-0 w-0.5 bg-text-secondary/20"
              />

              <div className="space-y-6 2xl:space-y-8">
                {timeline.map((item, index) => (
                  <div
                    key={index}
                    ref={(el) => {
                      timelineItemsRef.current[index] = el;
                    }}
                    className="relative flex gap-6 2xl:gap-8"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`
                        relative z-10 w-12 h-14 2xl:w-14 2xl:h-16 rounded-sm flex flex-col items-center justify-center font-bold text-xs 2xl:text-sm
                        ${item.current ? "bg-accent text-white" : "bg-secondary text-text-primary"}
                      `}
                    >
                      <span className="text-[10px] 2xl:text-xs uppercase">
                        {item.month}
                      </span>
                      <span className="text-sm 2xl:text-base">
                        {item.year.slice(2)}
                      </span>
                    </div>

                    {/* Content card */}
                    <div
                      className={`
                        flex-1 bg-secondary p-5 2xl:p-6 rounded-sm relative overflow-hidden
                        border-l-4 ${item.current ? "border-highlight" : "border-accent"}
                      `}
                    >
                      {item.current && (
                        <span className="absolute top-2 right-2 text-xs 2xl:text-sm bg-highlight text-primary px-2 py-0.5 rounded-sm font-bold uppercase">
                          Current
                        </span>
                      )}
                      <h4 className="text-text-primary font-bold text-lg 2xl:text-xl flex items-center gap-2 2xl:gap-3">
                        {item.logo && (
                          <img
                            src={item.logo}
                            alt={item.organization}
                            className="w-10 h-10 2xl:w-12 2xl:h-12 rounded-sm object-cover"
                          />
                        )}
                        {item.organization}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-accent text-sm 2xl:text-base font-medium">
                          {item.title}
                        </p>
                      </div>
                      <p className="text-text-secondary text-sm 2xl:text-base mt-2">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="mt-12 2xl:mt-16">
              <h3 className="text-lg 2xl:text-xl font-bold text-text-primary mb-4 2xl:mb-6 uppercase flex items-center gap-2">
                <span className="text-accent">//</span> Achievements
              </h3>

              <div
                ref={achievementGridRef}
                className="grid grid-cols-2 gap-3 2xl:gap-4"
              >
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.title}
                    ref={(el) => {
                      achievementCardsRef.current[index] = el;
                    }}
                    className="bg-secondary p-4 2xl:p-5 rounded-sm relative overflow-hidden group hover:border-highlight border border-transparent transition-colors"
                  >
                    {/* Logo */}
                    <div className="absolute top-2 2xl:top-3 right-2 2xl:right-3">
                      {achievement.logo ? (
                        <img
                          src={achievement.logo}
                          alt={achievement.event}
                          className="w-8 h-8 2xl:w-10 2xl:h-10 rounded-sm object-cover"
                        />
                      ) : (
                        <span className="text-2xl 2xl:text-3xl">
                          {achievement.icon}
                        </span>
                      )}
                    </div>

                    <span className="text-xs 2xl:text-sm text-accent font-bold">
                      {achievement.year}
                    </span>
                    <h4 className="text-text-primary font-bold text-sm 2xl:text-base mt-1 group-hover:text-highlight transition-colors">
                      {achievement.title}
                    </h4>
                    <p className="text-text-secondary text-xs 2xl:text-sm mt-1">
                      {achievement.event}
                    </p>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-highlight scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
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
