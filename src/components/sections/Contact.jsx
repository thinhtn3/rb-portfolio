import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion } from "motion/react";
import { RippleButton } from "@/components/ui/ripple-button";
import { SectionDivider } from "@/components/custom_ui/hero/SectionDivider.jsx";
import { RacingMark } from "@/components/custom_ui/RacingMark.jsx";
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
        <h2 className="text-4xl 2xl:text-5xl font-bold text-text-primary uppercase tracking-wider flex items-center gap-3">
          <RacingMark className="h-7 2xl:h-9" /> Contact
        </h2>
      </div>

      <div className="max-w-2xl 2xl:max-w-3xl mx-auto">
        <h3 className="text-lg 2xl:text-xl font-bold text-text-primary mb-6 2xl:mb-8 uppercase flex items-center gap-2">
          <RacingMark className="h-4" /> Get In Touch
        </h3>

        <div className="space-y-4 2xl:space-y-6">
          {contactMethods.map((method, index) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="block bg-primary p-5 2xl:p-7 rounded-sm relative overflow-hidden group hover:border-white/20 border border-white/5 transition-all cursor-pointer"
            >
              {/* Icon */}
              <div className="absolute top-4 right-4 2xl:top-6 2xl:right-6 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                <method.icon className="w-6 h-6 2xl:w-8 2xl:h-8" color="#FFFFFF" />
              </div>

              <span className="text-xs 2xl:text-sm text-accent font-bold uppercase tracking-wide">
                {method.label}
              </span>
              <p className="text-text-primary font-bold text-lg 2xl:text-xl mt-1 2xl:mt-2 transition-colors">
                {method.value}
              </p>

              <span className="absolute right-4 bottom-4 2xl:right-6 2xl:bottom-6 2xl:text-lg text-text-secondary group-hover:text-text-primary group-hover:translate-x-1 transition-all">
                →
              </span>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-highlight scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mt-8 2xl:mt-10"
        >
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
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-text-secondary text-sm 2xl:text-base text-center mt-6 2xl:mt-8"
        >
          Or connect with me on{" "}
          <a
            href="https://www.linkedin.com/in/thinhttnguyen/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            LinkedIn
          </a>
        </motion.p>
      </div>
    </section>
  );
}
