import { Hero } from "@/components/sections/Hero.jsx";
import { Projects } from "@/components/sections/Projects.jsx";
import { About } from "@/components/sections/About.jsx";
import { Contact } from "@/components/sections/Contact.jsx";
import { Navbar } from "@/components/custom_ui/Navbar.jsx";

function App() {
  return (
    <>
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
