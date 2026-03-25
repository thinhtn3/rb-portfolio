import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

  // ScrollTrigger-driven horizontal wipe: About exits left, Projects enters right.
  useEffect(() => {
    if (!expansionReady) return;

    const ctx = gsap.context(() => {
      const setPositions = () => {
        if (!aboutRef.current || !projectsRef.current || !wrapperRef.current) return;
        
        const aboutHeight = aboutRef.current.offsetHeight;
        const windowHeight = window.innerHeight;
        // Projects should start exactly when the viewport reaches the bottom of About
        const offset = Math.max(0, aboutHeight - windowHeight);
        const projectsHeight = projectsRef.current.offsetHeight;

        gsap.set(projectsRef.current, {
          position: "absolute",
          top: offset,
          left: 0,
          width: "100%",
          x: "100vw", // Start off-screen
        });

        gsap.set(wrapperRef.current, {
          minHeight: offset + projectsHeight,
        });
      };

      setPositions();
      ScrollTrigger.addEventListener("refreshInit", setPositions);

      const offsetCalc = () => {
        if (!aboutRef.current) return 0;
        return Math.max(0, aboutRef.current.offsetHeight - window.innerHeight);
      };

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: () => `top -${offsetCalc()}px`,
          // Increase the end value to make the horizontal wipe take longer to complete
          // This means the user has to scroll further down the page to finish the wipe
          end: "+=300%", 
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
    }, wrapperRef);

    return () => ctx.revert();
  }, [expansionReady]);

  return (
    <>
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
      <div ref={wrapperRef} style={{ position: "relative", overflowX: "hidden" }}>
        <section id="about" ref={aboutRef}>
          <About />
        </section>
        <section id="projects" ref={projectsRef}>
          <Projects />
        </section>
      </div>
      <section id="contact">
        <Contact />
      </section>
    </>
  );
}

export default App;
