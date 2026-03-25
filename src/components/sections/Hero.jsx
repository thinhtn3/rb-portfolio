import { ProfileCard } from "@/components/custom_ui/hero/ProfileCard.jsx";
import { HyperText } from "@/components/ui/hyper-text.jsx";
import { TextAnimate } from "@/components/ui/text-animate.jsx";
import { TechStack } from "@/components/custom_ui/hero/TechStack.jsx";
import { Hyperlinks } from "@/components/custom_ui/hero/Hyperlinks.jsx";
import { RippleButton } from "@/components/ui/ripple-button";
import { motion } from "motion/react";

const navButtons = [
  { name: "About Me", href: "#about" },
  { name: "View Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function Hero() {
  const handleClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden">
      {/* Speed lines background */}
      <div className="absolute inset-0 -z-10 bg-primary">
        {/* Animated speed lines */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: "-100%",
              width: `${100 + Math.random() * 200}px`,
              animation: `speedLine ${2 + Math.random() * 3}s linear infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Corner accent glow */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-accent/10 to-transparent" />
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row w-full min-h-screen justify-center items-center gap-10 lg:gap-0 2xl:gap-16 px-6 py-12 lg:px-0 lg:py-0 2xl:px-12">
        <div className="w-full lg:w-1/2 2xl:w-5/12 text-center lg:text-left">
          {/* Hyper Text Component */}
          <div className="flex flex-wrap gap-x-2 2xl:gap-x-4 font-extrabold justify-center lg:justify-start">
            <HyperText
              className="text-text-primary text-4xl sm:text-5xl lg:text-5xl 2xl:text-7xl"
              duration={1500}
              animateOnHover={false}
            >
              Thinh
            </HyperText>
            <HyperText
              duration={1500}
              animateOnHover={false}
              className="text-accent text-4xl sm:text-5xl lg:text-5xl 2xl:text-7xl"
            >
              Nguyen
            </HyperText>
          </div>
          {/* Subtitle */}
          <TextAnimate
            animation="slideLeft"
            className="text-base sm:text-lg lg:text-lg 2xl:text-2xl text-gray-500 w-full lg:w-2/3 2xl:w-3/4 mx-auto lg:mx-0 2xl:mt-4"
            duration={0.5}
            startOnView={false}
          >
            Building high-performance software with precision and speed.
            Specializing in backend development.
          </TextAnimate>
          {/* Hyperlinks */}
          <div className="2xl:mt-8">
            <Hyperlinks />
          </div>

          {/* Navigation Buttons */}
          <div className="mt-8 2xl:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 2xl:gap-4 justify-center lg:justify-start">
            {navButtons.map((button, index) => (
              <motion.a
                key={button.name}
                href={button.href}
                onClick={(e) => handleClick(e, button.href)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                <RippleButton
                  className="bg-transparent border-2 border-accent hover:bg-accent/10 w-full sm:w-40 2xl:w-44 h-12 2xl:h-14 rounded-sm group font-bold uppercase tracking-wide"
                  rippleColor="var(--color-accent)"
                >
                  <span className="text-accent group-hover:text-highlight transition-colors flex items-center justify-center gap-2 text-xs 2xl:text-sm">
                    {button.name}
                    <span className="group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </span>
                </RippleButton>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Profile Card - hidden on small screens */}
        <div
          className="hidden md:block 2xl:scale-110 2xl:origin-center"
          style={{ perspective: "1000px" }}
        >
          <ProfileCard />
        </div>
      </div>
    </section>
  );
}
