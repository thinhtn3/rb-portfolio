import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiGo,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiLangchain,
  SiFlask,
} from "react-icons/si";
import { motion } from "motion/react";

const languages = [
  { name: "JavaScript", Icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", Icon: SiTypescript, color: "#3178C6" },
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Golang", Icon: SiGo, color: "#00ADD8" },
  { name: "C++", Icon: SiCplusplus, color: "#00599C" },
];

const tools = [
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#ffffff" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#339933" },
  { name: "Express", Icon: SiExpress, color: "#ffffff" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#336791" },
  { name: "LangChain", Icon: SiLangchain, color: "#FFFFFF" },
  { name: "Flask", Icon: SiFlask, color: "#FFFFFF" },
];

function TechItem({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      viewport={{ once: true }}
      className="group relative flex flex-col items-center p-1.5 md:p-1.5 lg:p-2 xl:p-2.5 2xl:p-3 rounded-sm bg-secondary/50 hover:bg-secondary border border-white/5 hover:border-white/15 transition-all cursor-pointer"
    >
      <item.Icon
        className="text-text-secondary group-hover:text-text-primary transition-colors duration-300 w-4 h-4 md:w-4 md:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7"
        style={{ color: undefined }}
      />
      <span className="mt-1 text-[7px] md:text-[8px] lg:text-[9px] xl:text-[10px] text-text-secondary group-hover:text-text-primary transition-colors uppercase tracking-wide text-center leading-tight">
        {item.name}
      </span>
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-highlight scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
    </motion.div>
  );
}

import { RacingMark } from "@/components/custom_ui/RacingMark.jsx";

export function TechStack() {
  return (
    <div className="flex flex-col gap-2 md:gap-2 lg:gap-3 xl:gap-3 2xl:gap-6">
      {/* Languages */}
      <div>
        <h4 className="text-[10px] md:text-[10px] lg:text-xs xl:text-xs font-bold text-text-primary mb-1 md:mb-1.5 lg:mb-2 uppercase flex items-center gap-1.5">
          <RacingMark className="h-3" /> Languages
        </h4>
        <div className="grid grid-cols-5 gap-1 md:gap-1 lg:gap-1.5 xl:gap-2">
          {languages.map((lang, index) => (
            <TechItem key={lang.name} item={lang} index={index} />
          ))}
        </div>
      </div>

      {/* Tools */}
      <div>
        <h4 className="text-[10px] md:text-[10px] lg:text-xs xl:text-xs font-bold text-text-primary mb-1 md:mb-1.5 lg:mb-2 uppercase flex items-center gap-1.5">
          <RacingMark className="h-3" /> Tools
        </h4>
        <div className="grid grid-cols-4 gap-1 md:gap-1 lg:gap-1.5 xl:gap-2">
          {tools.map((tool, index) => (
            <TechItem
              key={tool.name}
              item={tool}
              index={index + languages.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
