import githubIcon from "@/assets/github.svg";
import linkedinIcon from "@/assets/InBug-Black.png";
import devpostIcon from "@/assets/devpost.svg";
import leetcodeIcon from "@/assets/leetcode.svg";
import { RippleButton } from "@/components/ui/ripple-button";
import { motion } from "motion/react";

export const hyperlinks = [
  { name: "GitHub", url: "https://github.com/thinhtn3", icon: githubIcon },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/thinhttnguyen/",
    icon: linkedinIcon,
  },
  {
    name: "Devpost",
    url: "https://devpost.com/thinhtn3",
    icon: devpostIcon,
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/thinhttnguyen/",
    icon: leetcodeIcon,
  },
];

export function Hyperlinks() {
  return (
    <div className="flex flex-row flex-nowrap justify-start gap-2 2xl:gap-3 mt-4 2xl:mt-6 items-center">
      {hyperlinks.map((hyperlink, index) => (
        <motion.a
          key={hyperlink.name}
          href={hyperlink.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <RippleButton
            rippleColor="#FCD116"
            className="bg-accent w-20 lg:w-24 xl:w-32 2xl:w-40 min-[1920px]:w-52 h-7 lg:h-9 xl:h-11 2xl:h-14 min-[1920px]:h-16 rounded-sm group font-bold uppercase tracking-wide"
          >
            <div className="flex flex-row items-center justify-center gap-1 lg:gap-1.5 2xl:gap-3">
              <img
                src={hyperlink.icon}
                alt={hyperlink.name}
                className="w-3 h-3 lg:w-3.5 lg:h-3.5 xl:w-4 xl:h-4 2xl:w-7 2xl:h-7 transition-all duration-300 group-hover:filter-primary"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(4%) sepia(15%) saturate(4500%) hue-rotate(200deg) brightness(95%) contrast(105%)",
                }}
              />
              <span className="text-primary text-[8px] lg:text-[9px] xl:text-xs 2xl:text-sm min-[1920px]:text-base transition-colors duration-300 group-hover:text-text-primary">
                {hyperlink.name}
              </span>
            </div>
          </RippleButton>
        </motion.a>
      ))}
    </div>
  );
}
