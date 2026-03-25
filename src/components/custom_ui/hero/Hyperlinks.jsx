import githubIcon from "@/assets/github.svg";
import linkedinIcon from "@/assets/InBug-Black.png";
import devpostIcon from "@/assets/devpost.svg";
import leetcodeIcon from "@/assets/leetcode.svg";
import { RippleButton } from "@/components/ui/ripple-button";
import { motion } from "motion/react";

const hyperlinks = [
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
    <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center lg:justify-start gap-3 sm:gap-4 2xl:gap-5 mt-6 items-center sm:items-start">
      {hyperlinks.map((hyperlink, index) => (
        <motion.a
          key={hyperlink.name}
          href={hyperlink.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="relative w-full sm:w-auto after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 after:bg-highlight after:transition-transform after:duration-300 hover:after:scale-x-100"
        >
          <RippleButton
            rippleColor="#FCD116"
            className="bg-accent w-full sm:w-30 2xl:w-36 h-10 2xl:h-12 rounded-sm group"
          >
            <div className="flex flex-row items-center justify-center gap-2 2xl:gap-3">
              <img
                src={hyperlink.icon}
                alt={hyperlink.name}
                className="w-5 h-5 sm:w-6 sm:h-6 2xl:w-7 2xl:h-7 transition-all duration-300 group-hover:filter-primary"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(4%) sepia(15%) saturate(4500%) hue-rotate(200deg) brightness(95%) contrast(105%)",
                }}
              />
              <span className="text-primary text-xs 2xl:text-sm transition-colors duration-300 group-hover:text-text-primary">
                {hyperlink.name}
              </span>
            </div>
          </RippleButton>
        </motion.a>
      ))}
    </div>
  );
}
