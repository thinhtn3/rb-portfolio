import finvisorImage from "@/assets/finVisor_demo.png";
import loopaiImage from "@/assets/loop_demo.png";
import rateMyCalendarImage from "@/assets/ratemycalendar_demo.png";
import munchImage from "@/assets/munch_demo.png";
import lePlayImage from "@/assets/leplay_demo.png";
import spotiEventImage from "@/assets/spotievent_demo.png";
import { SectionDivider } from "@/components/custom_ui/hero/SectionDivider.jsx";

import { motion } from "motion/react";

const projects = [
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
  },
  {
    title: "LoopAI",
    description: "Your personal AI technical interview trainer",
    tags: ["JavaScript", "Node.js", "React", "Supabase", "LangChain", "shadcn/ui"],
    image: loopaiImage,
    github: "https://github.com/thinhtn3/loopai",
  },
  {
    title: "RateMyCalendar",
    description: "A dashboard for analyzing and visualizing calendar data",
    tags: ["JavaScript", "Node.js", "AWS", "DynamoDB", "Bedrock", "React", "Chakra UI"],
    image: rateMyCalendarImage,
    github: "https://github.com/winstonjgiang/RateMyCalendar",
    devpost: "https://devpost.com/software/ratemycalendar",
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
  {
    title: "SpotiEvent",
    description: "Capture, replay and share highlights from your favorite NBA games",
    tags: ["JavaScript", "Node.js", "React", "Chakra UI"],
    image: spotiEventImage,
    github: "https://github.com/thinhtn3/spotievent",
    devpost: "https://devpost.com/software/spotievent",
  },
];

export function Projects() {
  return (
    <motion.section className="bg-primary min-h-screen py-8 px-8">
      <SectionDivider />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl font-bold text-text-primary mb-12 uppercase tracking-wider">
          <span className="text-accent">//</span> Projects
        </h2>

        {/* F1-style asymmetric grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <div
              key={project.title}
              className={`
                group relative overflow-hidden rounded-sm bg-secondary
                transition-transform duration-300 hover:-translate-y-1
                ${project.featured ? "md:col-span-2 md:row-span-2" : ""}
              `}
            >
              {/* Diagonal accent stripe */}
              <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden">
                <div className="absolute top-4 -right-8 w-32 h-6 bg-accent rotate-45 opacity-80" />
              </div>

              {/* Project image with overlay */}
              <div className={`relative ${project.featured ? "h-80" : "h-64"}`}>
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/50 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-highlight transition-colors">
                  {project.title}
                </h3>
                <p className="text-text-secondary text-sm mb-4">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-1 bg-primary text-text-primary rounded-sm border-l-2 border-accent"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Link buttons - only show if links exist */}
                {(project.github || project.devpost) && (
                  <div className="flex gap-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-text-primary text-xs font-bold uppercase rounded-sm border border-text-secondary/30 hover:border-highlight hover:text-highlight transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.devpost && (
                      <a
                        href={project.devpost}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-text-primary text-xs font-bold uppercase rounded-sm border border-text-secondary/30 hover:border-accent hover:text-accent transition-colors"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.002 1.61L0 12.004L6.002 22.39h11.996L24 12.004L17.998 1.61H6.002zm1.593 4.084h3.947c3.605 0 6.276 1.695 6.276 6.31c0 4.436-3.21 6.302-6.456 6.302H7.595V5.694zm2.517 2.449v7.714h1.241c2.646 0 3.862-1.55 3.862-3.861c.009-2.569-1.096-3.853-3.767-3.853h-1.336z"/>
                        </svg>
                        Devpost
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* Hover border effect */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-highlight/50 transition-colors duration-300 rounded-sm pointer-events-none" />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}