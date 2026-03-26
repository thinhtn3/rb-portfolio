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
      // ── Section header: wipe from left (Mobile only) ──
      if (headerRef.current) {
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
      }

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
      className="relative bg-primary pt-32 min-h-screen md:h-screen pb-6 px-6 md:pt-16 md:pb-0 md:px-8 xl:pt-20 xl:px-10 2xl:pt-24 2xl:px-16 flex flex-col overflow-hidden"
    >
      <div className="max-w-7xl 2xl:max-w-[1600px] w-full mx-auto md:py-6 lg:py-8 xl:py-10 2xl:py-12">
        {/* Mobile Heading */}
        <div ref={headerRef} className="md:hidden mb-8">
          <h2 className="text-3xl font-bold text-text-primary uppercase tracking-wider flex items-center gap-3">
            <RacingMark className="h-7" /> About
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-4 xl:gap-8 2xl:gap-16">
          {/* Left Column */}
          <div className="flex flex-col gap-4 md:gap-5 xl:gap-6">
            {/* Bio Card */}
            <div ref={bioCardRef}>
              <div className="bg-secondary p-4 md:p-5 xl:p-6 2xl:p-10 rounded-lg relative overflow-hidden border border-white/5">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-accent via-highlight to-transparent rounded-t-2xl" />

                <h3 className="text-base md:text-lg xl:text-xl 2xl:text-3xl font-bold text-text-primary mb-2 md:mb-3 2xl:mb-6 uppercase">
                  About <span className="text-highlight">Me</span>
                </h3>

                <p className="text-text-secondary mb-2 md:mb-3 2xl:mb-6 leading-relaxed text-xs md:text-sm xl:text-sm 2xl:text-lg">
                  I am currently pursuing a Bachelor's degree in Software
                  Engineering at UC Irvine with an interest in backend
                  development. I am passionate about building high-performance
                  systems that solve real-world problems and can be scaled to a
                  larger audience.
                </p>

                {/* Quick facts */}
                <div className="border-t border-white/10 pt-2 md:pt-3 2xl:pt-6 mt-1">
                  <div className="grid grid-cols-2 gap-1.5 md:gap-2 xl:gap-3 2xl:gap-6">
                    <div className="bg-white/3 rounded-lg p-2 md:p-2.5 2xl:p-4">
                      <span className="text-text-secondary text-[9px] md:text-[10px] uppercase tracking-wider">Location</span>
                      <p className="text-text-primary font-bold mt-0.5 text-xs md:text-sm 2xl:text-base">Irvine, CA</p>
                    </div>
                    <div className="bg-white/3 rounded-lg p-2 md:p-2.5 2xl:p-4">
                      <span className="text-text-secondary text-[9px] md:text-[10px] uppercase tracking-wider">Education</span>
                      <p className="text-text-primary font-bold mt-0.5 text-xs md:text-sm 2xl:text-base">UC Irvine</p>
                    </div>
                    <div className="bg-white/3 rounded-lg p-2 md:p-2.5 2xl:p-4">
                      <span className="text-text-secondary text-[9px] md:text-[10px] uppercase tracking-wider">Focus</span>
                      <p className="text-text-primary font-bold mt-0.5 text-xs md:text-sm 2xl:text-base">Backend Dev</p>
                    </div>
                    <div className="bg-highlight/10 rounded-lg p-2 md:p-2.5 2xl:p-4 border border-highlight/20">
                      <span className="text-highlight/70 text-[9px] md:text-[10px] uppercase tracking-wider">Status</span>
                      <p className="text-highlight font-bold mt-0.5 text-xs md:text-sm 2xl:text-base">Open to Work</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* TechStack */}
            <div ref={techStackRef}>
              <h3 className="text-xs md:text-sm xl:text-base 2xl:text-xl font-bold text-text-primary mb-2 md:mb-3 2xl:mb-6 uppercase flex items-center gap-2">
                <RacingMark className="h-3 md:h-4" /> Tech Stack
              </h3>
              <div className="bg-secondary p-3 md:p-4 xl:p-5 2xl:p-8 rounded-lg border border-white/5">
                <TechStack />
              </div>
            </div>
          </div>

          {/* Right Column — Timeline + Achievements */}
          <div ref={timelineColRef} className="flex flex-col gap-4 md:gap-5 xl:gap-6">
            {/* Experience */}
            <div>
              <h3 className="text-xs md:text-sm xl:text-base 2xl:text-xl font-bold text-text-primary mb-2 md:mb-3 2xl:mb-8 uppercase flex items-center gap-2">
                <RacingMark className="h-3 md:h-4" /> Experience
              </h3>

              <div className="relative">
                <div ref={timelineLineRef} className="absolute left-[17px] md:left-[19px] 2xl:left-[28px] top-0 bottom-0 w-0.5 bg-white/10" />

                <div className="space-y-2 md:space-y-3 2xl:space-y-6">
                  {timeline.map((item, index) => (
                    <div key={index} ref={(el) => { timelineItemsRef.current[index] = el; }} className="relative flex gap-3 md:gap-4 2xl:gap-7">
                      {/* Date badge */}
                      <div className={`relative z-10 w-9 h-10 md:w-10 md:h-12 2xl:w-14 2xl:h-16 rounded-lg flex flex-col items-center justify-center font-bold shrink-0 ${item.current ? "bg-accent text-white shadow-lg shadow-accent/30" : "bg-secondary text-text-primary border border-white/10"}`}>
                        <span className="text-[8px] md:text-[9px] 2xl:text-xs uppercase opacity-80">{item.month}</span>
                        <span className="text-[10px] md:text-xs 2xl:text-base font-black">{item.year.slice(2)}</span>
                      </div>

                      {/* Content */}
                      <div className={`flex-1 bg-secondary p-2.5 md:p-3 2xl:p-6 rounded-lg relative overflow-hidden border border-white/5 ${item.current ? "border-l-2 border-l-highlight" : "border-l-2 border-l-accent/50"}`}>
                        {item.current && (
                          <span className="absolute top-2 right-2 text-[8px] bg-highlight/15 text-highlight px-1.5 py-0.5 rounded-full font-bold uppercase border border-highlight/30">Current</span>
                        )}
                        <h4 className="text-text-primary font-bold text-xs md:text-sm 2xl:text-lg flex items-center gap-1.5 md:gap-2 2xl:gap-3">
                          {item.logo && <img src={item.logo} alt={item.organization} className="w-5 h-5 md:w-6 md:h-6 2xl:w-10 2xl:h-10 rounded-md object-cover" />}
                          {item.organization}
                        </h4>
                        <p className="text-accent text-[10px] md:text-xs 2xl:text-base font-medium mt-0.5 md:mt-1">{item.title}</p>
                        <p className="text-text-secondary text-[10px] md:text-xs 2xl:text-base mt-0.5 md:mt-1 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-xs md:text-sm xl:text-base 2xl:text-xl font-bold text-text-primary mb-2 md:mb-3 2xl:mb-6 uppercase flex items-center gap-2">
                <RacingMark className="h-3 md:h-4" /> Achievements
              </h3>

              <div ref={achievementGridRef} className="grid grid-cols-2 md:grid-cols-3 gap-1.5 md:gap-2 xl:gap-2.5 2xl:gap-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.title}
                    ref={(el) => { achievementCardsRef.current[index] = el; }}
                    className="group bg-secondary p-2 md:p-2.5 2xl:p-5 rounded-lg relative overflow-hidden border border-white/5 hover:border-white/15 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/30 transition-all duration-300"
                  >
                    <div className="flex items-start justify-between mb-1.5 md:mb-2">
                      <span className="text-[8px] md:text-[10px] 2xl:text-sm text-accent font-semibold bg-accent/10 px-1.5 py-0.5 rounded-full">{achievement.year}</span>
                      {achievement.logo && <img src={achievement.logo} alt={achievement.event} className="w-5 h-5 md:w-6 md:h-6 2xl:w-9 2xl:h-9 rounded-md object-cover" />}
                    </div>
                    <h4 className="text-text-primary font-bold text-[10px] md:text-xs 2xl:text-base leading-snug">{achievement.title}</h4>
                    <p className="text-text-secondary text-[9px] md:text-[10px] 2xl:text-sm mt-0.5 md:mt-1 font-medium">{achievement.event}</p>
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
