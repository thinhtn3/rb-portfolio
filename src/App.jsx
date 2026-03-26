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

  const wrapperRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);

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

  // ScrollTrigger-driven horizontal wipe: About exits left, Projects enters right.
  useEffect(() => {
    if (!expansionReady) return;

    const ctx = gsap.context(() => {
      let mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const setPositions = () => {
          if (!aboutRef.current || !projectsRef.current || !wrapperRef.current) return;
          
          // Ensure About fills the screen exactly so it doesn't scroll internally
          gsap.set(aboutRef.current, {
            height: "100vh",
            width: "100%",
          });

          gsap.set(projectsRef.current, {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            x: "100vw",
          });

          gsap.set(wrapperRef.current, {
            height: "100vh",
          });
        };

        setPositions();
        ScrollTrigger.addEventListener("refreshInit", setPositions);

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapperRef.current,
            start: "top top", // Start pinning exactly when the wrapper hits the top of the viewport
            end: "+=200%", // 200% of viewport height for the wipe duration
            pin: true,
            scrub: 1, // Smooth scrubbing
            invalidateOnRefresh: true,
            pinSpacing: true,
          },
        });

        // The wipe animation takes up the first 80% of the timeline
        tl.to(aboutRef.current, { x: "-50vw", ease: "none", duration: 0.8 }, 0)
          .to(projectsRef.current, { x: "0vw", ease: "none", duration: 0.8 }, 0)
          // Add a "dummy" tween that does nothing for the remaining 20% of the timeline
          // This forces the user to keep scrolling while the screen stays pinned and nothing moves
          .to({}, { duration: 0.2 });
          
        return () => {
          ScrollTrigger.removeEventListener("refreshInit", setPositions);
        };
      });

      mm.add("(max-width: 767px)", () => {
        // On mobile, just stack them vertically normally.
        // Clear any inline styles that might have been set by desktop view
        gsap.set([aboutRef.current, projectsRef.current, wrapperRef.current], {
          clearProps: "all"
        });
      });

    }, wrapperRef);

    return () => ctx.revert();
  }, [expansionReady]);

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
          <div ref={wrapperRef} className="max-md:flex max-md:flex-col md:relative md:overflow-x-hidden">
            <section id="about" ref={aboutRef} className="w-full">
              <About />
            </section>
            <section id="projects" ref={projectsRef} className="w-full">
              <Projects />
            </section>
          </div>
          <section id="contact">
            <Contact />
          </section>
        </>
      )}
    </>
  );
}

export default App;
