import { motion } from "motion/react";
import { RippleButton } from "@/components/ui/ripple-button";
import { SectionDivider } from "@/components/custom_ui/hero/SectionDivider.jsx";
import { SiGmail } from "react-icons/si";
import { SiLinkedin } from "react-icons/si";
import { SiGithub } from "react-icons/si";

const contactMethods = [
  {
    label: "Email",
    value: "thinhtn3@uci.edu",
    href: "mailto:thinhtn3@uci.edu",
    icon: <SiGmail className="w-6 h-6" color="#FFFFFF" />,
  },
  {
    label: "LinkedIn",
    value: "thinhttnguyen",
    href: "https://www.linkedin.com/in/thinhttnguyen/",
    icon: <SiLinkedin className="w-6 h-6" color="#FFFFFF" />,
  },
  {
    label: "GitHub",
    value: "thinhtn3",
    href: "https://github.com/thinhtn3",
    icon: <SiGithub className="w-6 h-6" color="#FFFFFF" />,
  },
];

export function Contact() {
  return (
    <section className="bg-black min-h-screen py-8 px-8">
      <SectionDivider />
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl font-bold text-text-primary uppercase tracking-wider">
          <span className="text-accent">//</span> Contact
        </h2>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="bg-primary p-8 rounded-sm relative overflow-hidden h-full">
              {/* Diagonal stripe */}
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                <div className="absolute top-6 -right-10 w-40 h-8 bg-accent rotate-45 opacity-80" />
              </div>

              {/* Large decorative number */}
              <span className="absolute -bottom-8 -right-4 text-[180px] font-black text-highlight/5 leading-none pointer-events-none select-none">
                01
              </span>

              <h3 className="text-3xl font-bold text-text-primary mb-4 uppercase">
                Let's <span className="text-highlight">Build</span> Something{" "}
                <span className="text-accent">Fast</span>
              </h3>

              <p className="text-text-secondary mb-6 leading-relaxed relative z-10">
                I'm currently open to new opportunities and collaborations.
                Whether you have a project in mind, want to discuss backend
                architecture, or just want to connect — I'd love to hear from
                you.
              </p>

              <div className="border-t border-text-secondary/20 pt-6 mt-6">
                <p className="text-text-secondary text-sm mb-2">
                  Preferred response time
                </p>
                <p className="text-text-primary font-bold text-lg">
                  Within <span className="text-highlight">24 hours</span>
                </p>
              </div>

              <div className="mt-6">
                <p className="text-text-secondary text-sm mb-2">Location</p>
                <p className="text-text-primary font-bold">
                  Irvine, CA{" "}
                  <span className="text-text-secondary font-normal">
                    (Open to Remote)
                  </span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Contact Methods */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-text-primary mb-6 uppercase flex items-center gap-2">
              <span className="text-accent">//</span> Get In Touch
            </h3>

            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={method.label}
                  href={method.href}
                  target={method.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    method.href.startsWith("http")
                      ? "noopener noreferrer"
                      : undefined
                  }
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="block bg-primary p-5 rounded-sm relative overflow-hidden group hover:border-highlight border border-transparent transition-all cursor-pointer"
                >
                  {/* Icon */}
                  <div className="absolute top-4 right-4 text-3xl opacity-50 group-hover:opacity-100 transition-opacity">
                    {method.icon}
                  </div>

                  {/* Label */}
                  <span className="text-xs text-accent font-bold uppercase tracking-wide">
                    {method.label}
                  </span>

                  {/* Value */}
                  <p className="text-text-primary font-bold text-lg mt-1 group-hover:text-highlight transition-colors">
                    {method.value}
                  </p>

                  {/* Arrow indicator */}
                  <span className="absolute right-4 bottom-4 text-text-secondary group-hover:text-highlight group-hover:translate-x-1 transition-all">
                    →
                  </span>

                  {/* Bottom accent line */}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-highlight scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <a href="mailto:thinhtn3@uci.edu">
                <RippleButton
                  className="bg-accent w-full h-14 rounded-sm group text-lg font-bold uppercase tracking-wide"
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
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              className="text-text-secondary text-sm text-center mt-6"
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
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}