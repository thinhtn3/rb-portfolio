import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { About } from "@/components/sections/About.jsx";
import { Projects } from "@/components/sections/Projects.jsx";
import { Contact } from "@/components/sections/Contact.jsx";
import { Navbar } from "@/components/custom_ui/Navbar.jsx";
import { LaunchSequence } from "@/components/custom_ui/LaunchSequence.jsx";
import { SpeedBackground } from "@/components/custom_ui/SpeedBackground.jsx";
import { ScrollExpansionHero } from "@/components/custom_ui/ScrollExpansionHero.jsx";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showLaunch, setShowLaunch] = useState(true);
  const [expansionReady, setExpansionReady] = useState(false);

  const { scrollYProgress } = useScroll();
  const dotY = useTransform(scrollYProgress, [0, 1], ["2vh", "96vh"]);

  // Initialize Lenis for smooth scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    // Make lenis globally available so ScrollExpansionHero can pause/resume it
    window.lenis = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      window.lenis = undefined;
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <>
      {/* Minimal yellow dot scroll progress */}
      <motion.div
        className="fixed top-0 right-4 w-2 h-2 rounded-full z-50 pointer-events-none"
        style={{
          backgroundColor: "var(--color-highlight)",
          y: dotY,
        }}
      />
      
      <SpeedBackground />
      {showLaunch && (
        <LaunchSequence
          onComplete={() => {
            setShowLaunch(false);
            setExpansionReady(true);
          }}
        />
      )}
      <Navbar />
      <section id="hero">{expansionReady && <ScrollExpansionHero />}</section>
      {expansionReady && (
        <>
          <section id="about">
            <About />
          </section>
          <section id="projects">
            <Projects />
          </section>
          <section id="contact">
            <Contact />
          </section>
        </>
      )}
    </>
  );
}

export default App;
