import { useEffect, useRef } from "react";
import gsap from "gsap";
import { RippleButton } from "@/components/ui/ripple-button";
import { SectionDivider } from "@/components/custom_ui/hero/SectionDivider.jsx";
import { SiGmail, SiLinkedin, SiGithub } from "react-icons/si";

const contactMethods = [
  {
    label: "Email",
    value: "thinhtn3@uci.edu",
    href: "mailto:thinhtn3@uci.edu",
    icon: SiGmail,
  },
  {
    label: "LinkedIn",
    value: "thinhttnguyen",
    href: "https://www.linkedin.com/in/thinhttnguyen/",
    icon: SiLinkedin,
  },
  {
    label: "GitHub",
    value: "thinhtn3",
    href: "https://github.com/thinhtn3",
    icon: SiGithub,
  },
];

export function Contact() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const contactCardsRef = useRef([]);
  const ctaRef = useRef(null);
  const footerNoteRef = useRef(null);

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

      // ── Contact cards: alternate left/right slide ──
      contactCardsRef.current.forEach((card, i) => {
        if (!card) return;
        const fromX = i % 2 === 0 ? -70 : 70;
        gsap.fromTo(
          card,
          { x: fromX, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 90%",
              once: true,
            },
            delay: i * 0.08,
          }
        );
      });

      // ── CTA button: scale in with bounce ──
      gsap.fromTo(
        ctaRef.current,
        { scale: 0.88, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.55,
          ease: "back.out(1.6)",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 92%",
            once: true,
          },
        }
      );

      // ── Footer note: fade in ──
      gsap.fromTo(
        footerNoteRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerNoteRef.current,
            start: "top 95%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="bg-black py-8 px-8 2xl:py-12 2xl:px-12 min-h-screen"
    >
      <SectionDivider />

      {/* Section Header */}
      <div ref={headerRef} className="mb-16 2xl:mb-20">
        <h2 className="text-4xl 2xl:text-5xl font-bold text-text-primary uppercase tracking-wider">
          <span className="text-accent">//</span> Contact
        </h2>
      </div>

      <div className="max-w-2xl 2xl:max-w-3xl mx-auto">
        <h3 className="text-lg 2xl:text-xl font-bold text-text-primary mb-6 2xl:mb-8 uppercase flex items-center gap-2">
          <span className="text-accent">//</span> Get In Touch
        </h3>

        <div className="space-y-4 2xl:space-y-6">
          {contactMethods.map((method, index) => (
            <a
              key={method.label}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              ref={(el) => { contactCardsRef.current[index] = el; }}
              className="block bg-primary p-5 2xl:p-7 rounded-sm relative overflow-hidden group hover:border-highlight border border-transparent transition-all cursor-pointer"
            >
              {/* Icon */}
              <div className="absolute top-4 right-4 2xl:top-6 2xl:right-6 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                <method.icon className="w-6 h-6 2xl:w-8 2xl:h-8" color="#FFFFFF" />
              </div>

              <span className="text-xs 2xl:text-sm text-accent font-bold uppercase tracking-wide">
                {method.label}
              </span>
              <p className="text-text-primary font-bold text-lg 2xl:text-xl mt-1 2xl:mt-2 group-hover:text-highlight transition-colors">
                {method.value}
              </p>

              <span className="absolute right-4 bottom-4 2xl:right-6 2xl:bottom-6 2xl:text-lg text-text-secondary group-hover:text-highlight group-hover:translate-x-1 transition-all">
                →
              </span>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-highlight scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </a>
          ))}
        </div>

        {/* CTA Button */}
        <div ref={ctaRef} className="mt-8 2xl:mt-10">
          <a href="mailto:thinhtn3@uci.edu">
            <RippleButton
              className="bg-accent w-full h-14 2xl:h-16 rounded-sm group text-lg 2xl:text-xl font-bold uppercase tracking-wide"
              rippleColor="#FCD116"
            >
              <span className="text-primary group-hover:text-text-primary transition-colors">
                Send Me a Message
              </span>
            </RippleButton>
          </a>
        </div>

        {/* Footer note */}
        <p
          ref={footerNoteRef}
          className="text-text-secondary text-sm 2xl:text-base text-center mt-6 2xl:mt-8"
        >
          Or connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/thinhttnguyen/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-highlight hover:underline"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </section>
  );
}
