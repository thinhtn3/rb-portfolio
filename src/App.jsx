import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Hero } from "@/components/sections/Hero.jsx";
import { Projects } from "@/components/sections/Projects.jsx";
import { About } from "@/components/sections/About.jsx";
import { Contact } from "@/components/sections/Contact.jsx";
import { Navbar } from "@/components/custom_ui/Navbar.jsx";
import { LaunchSequence } from "@/components/custom_ui/LaunchSequence.jsx";
import { SpeedBackground } from "@/components/custom_ui/SpeedBackground.jsx";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showLaunch, setShowLaunch] = useState(true);

  return (
    <>
      <SpeedBackground />
      {showLaunch && (
        <LaunchSequence onComplete={() => setShowLaunch(false)} />
      )}
      <Navbar />
      <section id="hero">
        <Hero />
      </section>
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
  );
}

export default App;
