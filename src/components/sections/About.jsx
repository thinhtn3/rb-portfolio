import { motion } from "motion/react";
import { TechStack } from "@/components/custom_ui/hero/TechStack.jsx";
import ucIrvineLogo from "@/assets/uci_icon.jpg";
import uberLogo from "@/assets/uber_icon.png";
import claudeLogo from "@/assets/cbc_icon.jpeg";
import aiuciLogo from "@/assets/aiuci_icon.jpeg";
import { SectionDivider } from "@/components/custom_ui/hero/SectionDivider.jsx";

const timeline = [
  {
    month: "April",
    year: "2025",
    title: "Software Engineering Student",
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
  return (
    <section className="bg-primary min-h-screen py-8 px-8">
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
          <span className="text-accent">//</span> About Me
        </h2>
      </motion.div>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Bio Card */}
            <div className="bg-secondary p-8 rounded-sm relative overflow-hidden">
              {/* Diagonal stripe */}
              <div className="absolute top-0 right-0 w-32 h-32 overflow-hidden">
                <div className="absolute top-6 -right-10 w-40 h-8 bg-accent rotate-45 opacity-80" />
              </div>

              <h3 className="text-2xl font-bold text-text-primary mb-4 uppercase">
                About <span className="text-highlight">Me</span>
              </h3>

              <p className="text-text-secondary mb-4 leading-relaxed">
                I am currently pursuing a Bachelor's degree in Software
                Engineering at UC Irvine with an interest in backend
                development. I am passionate about building high-performance
                systems that solve real-world problems and can be scaled to a
                larger audience.
              </p>

              <p className="text-text-secondary mb-6 leading-relaxed"></p>

              {/* Quick facts */}
              <div className="border-t border-text-secondary/20 pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
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

            {/* TechStack - replaces CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
              className="mt-8"
            >
              <h3 className="text-lg font-bold text-text-primary mb-4 uppercase flex items-center gap-2">
                <span className="text-accent">//</span> Current Tech Stack
              </h3>
              <div className="bg-secondary p-6 rounded-sm border border-text-secondary/20">
                <TechStack />
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-bold text-text-primary mb-6 uppercase flex items-center gap-2">
              <span className="text-accent">//</span> Timeline
            </h3>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-text-secondary/20" />

              <div className="space-y-6">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.15 }}
                    viewport={{ once: true }}
                    className="relative flex gap-6"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`
                        relative z-10 w-12 h-14 rounded-sm flex flex-col items-center justify-center font-bold text-xs
                        ${
                          item.current
                            ? "bg-accent text-white"
                            : "bg-secondary text-text-primary"
                        }
                      `}
                    >
                      <span className="text-[10px] uppercase">
                        {item.month}
                      </span>
                      <span className="text-sm">{item.year.slice(2)}</span>
                    </div>

                    {/* Content card */}
                    <div
                      className={`
                        flex-1 bg-secondary p-5 rounded-sm relative overflow-hidden
                        border-l-4 ${
                          item.current ? "border-highlight" : "border-accent"
                        }
                      `}
                    >
                      {item.current && (
                        <span className="absolute top-2 right-2 text-xs bg-highlight text-primary px-2 py-0.5 rounded-sm font-bold uppercase">
                          Current
                        </span>
                      )}

                      <h4 className="text-text-primary font-bold text-lg flex items-center gap-2">
                        {item.logo && (
                          <img
                            src={item.logo}
                            alt={item.organization}
                            className="w-10 h-10 rounded-sm object-cover"
                          />
                        )}
                        {item.organization}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-accent text-sm font-medium">
                          {item.title}
                        </p>
                      </div>
                      <p className="text-text-secondary text-sm mt-2">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Achievements - moved from left column */}
            <div className="mt-12">
              <h3 className="text-lg font-bold text-text-primary mb-4 uppercase flex items-center gap-2">
                <span className="text-accent">//</span> Achievements
              </h3>

              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-secondary p-4 rounded-sm relative overflow-hidden group hover:border-highlight border border-transparent transition-colors"
                  >
                    {/* Position indicator - logo or emoji */}
                    <div className="absolute top-2 right-2">
                      {achievement.logo ? (
                        <img
                          src={achievement.logo}
                          alt={achievement.event}
                          className="w-8 h-8 rounded-sm object-cover"
                        />
                      ) : (
                        <span className="text-2xl">{achievement.icon}</span>
                      )}
                    </div>

                    {/* Year badge */}
                    <span className="text-xs text-accent font-bold">
                      {achievement.year}
                    </span>

                    <h4 className="text-text-primary font-bold text-sm mt-1 group-hover:text-highlight transition-colors">
                      {achievement.title}
                    </h4>
                    <p className="text-text-secondary text-xs mt-1">
                      {achievement.event}
                    </p>

                    {/* Bottom accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-highlight scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
