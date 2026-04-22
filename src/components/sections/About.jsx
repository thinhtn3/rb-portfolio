import { useEffect, useRef } from "react";
import gsap from "gsap";
import ucIrvineLogo from "@/assets/uci_icon.jpg";
import uberLogo from "@/assets/uber_icon.png";
import claudeLogo from "@/assets/cbc_icon.jpeg";
import cruzhacksLogo from "@/assets/CruzHacks.png";
import aiuciLogo from "@/assets/aiuci_icon.jpeg";
import { RacingMark } from "@/components/custom_ui/RacingMark.jsx";
import { SectionDivider } from "@/components/custom_ui/hero/SectionDivider.jsx";
import {
  SiJavascript, SiTypescript, SiPython, SiCplusplus, SiGo,
  SiReact, SiNextdotjs, SiNodedotjs, SiExpress,
  SiMongodb, SiPostgresql, SiLangchain, SiFlask,
} from "react-icons/si";

const languages = [
  { name: "JavaScript", Icon: SiJavascript },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Python",     Icon: SiPython },
  { name: "Golang",     Icon: SiGo },
  { name: "C++",        Icon: SiCplusplus },
];

const tools = [
  { name: "React",      Icon: SiReact },
  { name: "Next.js",    Icon: SiNextdotjs },
  { name: "Node.js",    Icon: SiNodedotjs },
  { name: "Express",    Icon: SiExpress },
  { name: "MongoDB",    Icon: SiMongodb },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "LangChain",  Icon: SiLangchain },
  { name: "Flask",      Icon: SiFlask },
];

const timeline = [
  {
    month: "June",
    year: "2026",
    title: "Incoming Software Engineering Intern",
    organization: "Uber",
    description: "Incoming Software Engineering Intern for Summer 2026.",
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
  { title: "1st Overall Best Use of Viam",  event: "CruzHacks",        year: "Jan 2026", logo: cruzhacksLogo },
  { title: "Best Hardware Hack (3rd Place)", event: "CruzHacks",        year: "Jan 2026", logo: cruzhacksLogo },
  { title: "1st Place Overall",             event: "Claude Builder Club",year: "Nov 2025", logo: claudeLogo },
  { title: "3rd Place Overall",             event: "AWS Cloud Hack",    year: "May 2025", logo: aiuciLogo },
  { title: "Dean's List",                   event: "UC Irvine",         year: "2025",     logo: ucIrvineLogo },
];

/* ── Compact icon badge used inside the dossier card ── */
function TechBadge({ Icon, name }) {
  return (
    <div className="group relative flex flex-col items-center p-1.5 lg:p-2 2xl:p-2.5 rounded-sm bg-white/3 hover:bg-white/7 border border-white/5 hover:border-white/15 transition-all cursor-default overflow-hidden">
      <Icon className="w-4 h-4 lg:w-4 lg:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 text-text-secondary group-hover:text-text-primary transition-colors" />
      <span className="mt-0.5 text-[7px] lg:text-[7px] xl:text-[8px] text-text-secondary group-hover:text-text-primary transition-colors uppercase tracking-wide text-center leading-tight">
        {name}
      </span>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-accent to-highlight scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </div>
  );
}

export function About() {
  const sectionRef       = useRef(null);
  const headerRef        = useRef(null);
  const dossierRef       = useRef(null);
  const timelineColRef   = useRef(null);
  const timelineLineRef  = useRef(null);
  const timelineItemsRef = useRef([]);
  const achievementGridRef  = useRef(null);
  const achievementCardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* mobile section heading wipe */
      if (headerRef.current) {
        gsap.set(headerRef.current, { clipPath: "inset(0 100% 0 0)" });
        gsap.to(headerRef.current, {
          clipPath: "inset(0 0% 0 0)", duration: 0.75, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%", once: true },
        });
      }

      /* dossier card: slide from left */
      gsap.fromTo(
        dossierRef.current,
        { x: -70, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: dossierRef.current, start: "top 88%", once: true } },
      );

      /* right column: slide from right */
      gsap.fromTo(
        timelineColRef.current,
        { x: 50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: timelineColRef.current, start: "top 88%", once: true } },
      );

      /* timeline line draw */
      gsap.fromTo(
        timelineLineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, ease: "none",
          scrollTrigger: { trigger: timelineLineRef.current, start: "top 75%", end: "bottom 55%", scrub: 0.6 } },
      );

      /* timeline items stagger */
      timelineItemsRef.current.forEach((item) => {
        if (!item) return;
        gsap.fromTo(item, { x: 40, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.55, ease: "power3.out",
            scrollTrigger: { trigger: item, start: "top 90%", once: true } });
      });

      /* achievement rows stagger */
      const cards = achievementCardsRef.current.filter(Boolean);
      if (cards.length) {
        gsap.fromTo(cards, { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)", stagger: 0.07,
            scrollTrigger: { trigger: achievementGridRef.current, start: "top 88%", once: true } });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-primary pt-12 min-h-screen pb-8 px-6
                 md:h-screen md:pt-16 md:pb-4 md:px-8
                 xl:pt-14 xl:px-12 2xl:pt-32 2xl:pb-0 2xl:px-16
                 flex flex-col overflow-hidden"
    >
      <SectionDivider />

      {/* Section header — lives directly in <section>, same as Projects/Contact */}
      <div ref={headerRef} className="shrink-0 mb-3 xl:mb-4 2xl:mb-10">
        <p className="text-[8px] xl:text-[9px] 2xl:text-sm text-accent/60 uppercase tracking-[0.25em] font-bold mb-0.5 2xl:mb-2">
          Driver Profile
        </p>
        <h2 className="text-2xl xl:text-3xl 2xl:text-5xl font-black text-text-primary uppercase tracking-wider flex items-center gap-2">
          <RacingMark className="h-5 xl:h-7 2xl:h-10" /> About
        </h2>
      </div>

      <div className="max-w-7xl 2xl:max-w-[1600px] w-full mx-auto flex-1 flex flex-col min-h-0">
        <div className="grid md:grid-cols-2 gap-5 lg:gap-6 2xl:gap-10 flex-1 min-h-0">

          {/* ══════════════════════════════════════════════════
              LEFT — Driver Dossier: bio + stats + tech stack
              Gradient border wrapper; zone separation via bg tint only.
          ══════════════════════════════════════════════════ */}

          <div
            ref={dossierRef}
            className="rounded-sm p-px bg-accent/40 shadow-lg shadow-black/30 self-start"
          >
            <div className="bg-secondary rounded-[3px] flex flex-col overflow-hidden h-full">

              {/* ── Zone 1: header ── */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 lg:px-6 lg:pt-6 xl:px-7 2xl:px-9 2xl:pt-7 2xl:pb-5">
                <h3 className="text-sm lg:text-base xl:text-lg 2xl:text-2xl font-bold text-text-primary uppercase">
                  About <span className="text-highlight">Me</span>
                </h3>
                <span className="flex items-center gap-1.5 text-[9px] lg:text-[10px] xl:text-xs font-bold text-highlight bg-highlight/10 border border-highlight/20 px-2 py-0.5 rounded-full uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-highlight animate-pulse" />
                  Open to Work
                </span>
              </div>

              {/* ── Zone 2: bio ── */}
              <p className="px-5 pb-4 lg:px-6 lg:pb-5 xl:px-7 2xl:px-9 2xl:pb-6 text-text-secondary text-xs lg:text-sm 2xl:text-base leading-relaxed">
                I am currently pursuing a Bachelor's degree in Software Engineering
                at UC Irvine with an interest in backend development. I am passionate
                about building high-performance systems that solve real-world problems
                and can be scaled to a larger audience.
              </p>

              {/* ── Zone 3: stats bento boxes — tinted background, no border line ── */}
              <div className="grid grid-cols-2 gap-2 lg:gap-2.5 2xl:gap-4 px-5 py-4 lg:px-6 lg:py-4 xl:px-7 2xl:px-9 2xl:py-6">
                <div className="bg-white/4 rounded-sm px-3.5 py-2.5 lg:px-4 lg:py-3 2xl:px-5 2xl:py-4">
                  <span className="text-text-secondary text-[8px] lg:text-[9px] xl:text-[10px] uppercase tracking-wider block">Location</span>
                  <p className="text-text-primary font-bold mt-0.5 text-xs lg:text-sm 2xl:text-base">Irvine, CA</p>
                </div>
                <div className="bg-white/4 rounded-sm px-3.5 py-2.5 lg:px-4 lg:py-3 2xl:px-5 2xl:py-4">
                  <span className="text-text-secondary text-[8px] lg:text-[9px] xl:text-[10px] uppercase tracking-wider block">Education</span>
                  <p className="text-text-primary font-bold mt-0.5 text-xs lg:text-sm 2xl:text-base">UC Irvine</p>
                </div>
                <div className="bg-white/4 rounded-sm px-3.5 py-2.5 lg:px-4 lg:py-3 2xl:px-5 2xl:py-4">
                  <span className="text-text-secondary text-[8px] lg:text-[9px] xl:text-[10px] uppercase tracking-wider block">Focus</span>
                  <p className="text-text-primary font-bold mt-0.5 text-xs lg:text-sm 2xl:text-base">Backend Dev</p>
                </div>
                <div className="bg-highlight/10 rounded-sm px-3.5 py-2.5 lg:px-4 lg:py-3 2xl:px-5 2xl:py-4">
                  <span className="text-highlight/70 text-[8px] lg:text-[9px] xl:text-[10px] uppercase tracking-wider block">Degree</span>
                  <p className="text-highlight font-bold mt-0.5 text-xs lg:text-sm 2xl:text-base">Software Eng.</p>
                </div>
              </div>

              {/* ── Zone 4: tech stack — tinted background, no border line ── */}
              <div className="px-5 py-4 lg:px-6 lg:py-5 xl:px-7 2xl:px-9 2xl:py-6 flex flex-col gap-3 lg:gap-3.5 2xl:gap-5">
                <h4 className="text-[10px] lg:text-xs 2xl:text-sm font-bold text-text-primary uppercase flex items-center gap-2">
                  <RacingMark className="h-3" /> Tech Stack
                </h4>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[8px] lg:text-[9px] text-text-secondary uppercase tracking-widest">Languages</span>
                  <div className="grid grid-cols-5 gap-1.5 lg:gap-2 2xl:gap-2.5">
                    {languages.map(({ name, Icon }) => (
                      <TechBadge key={name} Icon={Icon} name={name} />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[8px] lg:text-[9px] text-text-secondary uppercase tracking-widest">Tools</span>
                  <div className="grid grid-cols-4 gap-1.5 lg:gap-2 2xl:gap-2.5">
                    {tools.map(({ name, Icon }) => (
                      <TechBadge key={name} Icon={Icon} name={name} />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ══════════════════════════════════════════════════
              RIGHT — Experience + Achievements
          ══════════════════════════════════════════════════ */}
          <div ref={timelineColRef} className="flex flex-col gap-5 lg:gap-6 2xl:gap-8">

            {/* Experience */}
            <div>
              <h3 className="text-xs lg:text-sm 2xl:text-lg font-bold text-text-primary mb-2 lg:mb-3 uppercase flex items-center gap-2">
                <RacingMark className="h-3 lg:h-3.5" /> Experience
              </h3>
              <div className="relative">
                <div ref={timelineLineRef} className="absolute left-[17px] lg:left-[19px] 2xl:left-[25px] top-0 bottom-0 w-0.5 bg-white/10" />
                <div className="space-y-3 lg:space-y-3.5 2xl:space-y-5">
                  {timeline.map((item, index) => (
                    <div
                      key={index}
                      ref={(el) => { timelineItemsRef.current[index] = el; }}
                      className="relative flex gap-3 lg:gap-3.5 2xl:gap-5"
                    >
                      <div className={`relative z-10 w-9 h-10 lg:w-10 lg:h-11 2xl:w-12 2xl:h-14 rounded-sm flex flex-col items-center justify-center font-bold shrink-0 ${item.current ? "bg-accent text-white" : "bg-secondary text-text-primary border border-white/10"}`}>
                        <span className="text-[8px] lg:text-[9px] 2xl:text-[10px] uppercase opacity-80">{item.month}</span>
                        <span className="text-[10px] lg:text-xs 2xl:text-sm font-black">{item.year.slice(2)}</span>
                      </div>
                      <div className={`flex-1 bg-secondary p-3 lg:p-3.5 2xl:p-6 rounded-sm border border-white/5 ${item.current ? "border-l-2 border-l-highlight" : "border-l-2 border-l-accent/50"}`}>
                        {item.current && (
                          <span className="absolute top-2 right-2 text-[8px] bg-highlight/15 text-highlight px-1.5 py-0.5 rounded-full font-bold uppercase border border-highlight/30">Current</span>
                        )}
                        <h4 className="text-text-primary font-bold text-xs lg:text-sm 2xl:text-base flex items-center gap-1.5 2xl:gap-2.5">
                          {item.logo && <img src={item.logo} alt={item.organization} className="w-4 h-4 lg:w-5 lg:h-5 2xl:w-7 2xl:h-7 rounded-sm object-cover" />}
                          {item.organization}
                        </h4>
                        <p className="text-accent text-[10px] lg:text-xs 2xl:text-sm font-medium mt-0.5">{item.title}</p>
                        <p className="text-text-secondary text-[10px] lg:text-xs 2xl:text-sm mt-0.5 leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div>
              <h3 className="text-xs lg:text-sm 2xl:text-lg font-bold text-text-primary mb-2 lg:mb-3 uppercase flex items-center gap-2">
                <RacingMark className="h-3 lg:h-3.5" /> Achievements
              </h3>
              <div ref={achievementGridRef} className="space-y-2 lg:space-y-2.5 2xl:space-y-4">
                {achievements.map((achievement, index) => (
                  <div
                    key={achievement.title}
                    ref={(el) => { achievementCardsRef.current[index] = el; }}
                    className="group flex items-center gap-3 lg:gap-3.5 2xl:gap-5 bg-secondary p-2.5 lg:p-3 2xl:p-5 rounded-sm border border-white/5 hover:border-white/15 hover:-translate-y-px transition-all duration-200"
                  >
                    {achievement.logo && (
                      <img src={achievement.logo} alt={achievement.event} className="w-7 h-7 lg:w-8 lg:h-8 2xl:w-10 2xl:h-10 rounded-sm object-cover shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-text-primary font-bold text-[10px] lg:text-xs 2xl:text-sm leading-snug">{achievement.title}</p>
                      <p className="text-text-secondary text-[9px] lg:text-[10px] 2xl:text-xs mt-px">{achievement.event}</p>
                    </div>
                    <span className="text-accent text-[8px] lg:text-[9px] 2xl:text-[10px] font-semibold bg-accent/10 px-1.5 py-0.5 rounded-full whitespace-nowrap shrink-0">
                      {achievement.year}
                    </span>
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
