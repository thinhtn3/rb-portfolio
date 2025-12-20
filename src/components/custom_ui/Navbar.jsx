import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import siteLogo from "@/assets/site_icon.svg";

const navLinks = [
  { name: "Home", href: "#hero", pos: "P1" },
  { name: "About", href: "#about", pos: "P2" },
  { name: "Projects", href: "#projects", pos: "P3" },
  { name: "Contact", href: "#contact", pos: "P4" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = navLinks.map((link) => link.href.slice(1));
      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-black/95 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        {/* Top racing stripe */}
        <div className="h-1 bg-accent" />

        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Pit board style logo */}
            <a
              href="#hero"
              onClick={(e) => handleClick(e, "#hero")}
              className="flex items-center"
            >
              {/* Driver number style */}
              <div className="px-2  -skew-x-12">
                <img src={siteLogo} alt="Site Logo" className="w-12 h-12" />
              </div>
              <div className="ml-3 border-l-2 border-highlight pl-3">
                <span className="text-xs text-text-secondary uppercase tracking-widest">
                  NGU
                </span>
                <span className="block text-sm font-bold text-text-primary uppercase -mt-1">
                  Thinh
                </span>
              </div>
            </a>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.slice(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="relative group"
                  >
                    <div
                      className={`flex items-center px-1 mx-1 transition-all duration-200 ${
                        isActive ? "" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {/* Position indicator */}
                      <div
                        className={`w-8 h-8 flex items-center justify-center font-black text-sm -skew-x-12 transition-colors ${
                          isActive
                            ? "bg-highlight text-primary"
                            : "bg-text-secondary/20 text-text-secondary group-hover:bg-accent group-hover:text-primary"
                        }`}
                      >
                        <span className="skew-x-12">{link.pos}</span>
                      </div>

                      {/* Label */}
                      <div
                        className={`ml-2 pr-3 border-r border-text-secondary/30 last:border-r-0 ${
                          isActive ? "text-text-primary" : "text-text-secondary"
                        }`}
                      >
                        <span className="text-xs font-bold uppercase tracking-wide">
                          {link.name}
                        </span>
                      </div>
                    </div>

                    {/* Active LED indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeLED"
                        className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-highlight shadow-[0_0_8px_2px_rgba(252,209,22,0.6)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center gap-1.5"
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-accent transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-text-primary transition-all duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </button>
          </div>
        </div>

        {/* Bottom accent stripe */}
        <div
          className={`flex transition-opacity ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="h-0.5 flex-1 bg-accent" />
          <div className="h-0.5 w-32 bg-highlight -skew-x-12" />
          <div className="h-0.5 flex-1 bg-accent" />
        </div>
      </motion.nav>

      {/* Mobile side menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 z-40 md:hidden"
            />

            {/* Side menu */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 h-full w-72 bg-primary z-50 md:hidden"
            >
              {/* Racing stripe accent */}
              <div className="absolute top-0 left-0 w-1 h-full bg-accent" />

              <div className="pt-20 px-6">
                <div className="space-y-2">
                  {navLinks.map((link, index) => {
                    const isActive = activeSection === link.href.slice(1);
                    return (
                      <motion.a
                        key={link.name}
                        href={link.href}
                        onClick={(e) => handleClick(e, link.href)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`flex items-center gap-4 p-3 rounded-sm transition-colors ${
                          isActive
                            ? "bg-secondary"
                            : "hover:bg-secondary/50"
                        }`}
                      >
                        {/* Position badge */}
                        <div
                          className={`w-10 h-10 flex items-center justify-center font-black text-sm -skew-x-12 ${
                            isActive
                              ? "bg-highlight text-primary"
                              : "bg-text-secondary/20 text-text-secondary"
                          }`}
                        >
                          <span className="skew-x-12">{link.pos}</span>
                        </div>

                        <span
                          className={`font-bold uppercase tracking-wide ${
                            isActive ? "text-highlight" : "text-text-primary"
                          }`}
                        >
                          {link.name}
                        </span>

                        {/* Active indicator */}
                        {isActive && (
                          <div className="ml-auto w-2 h-2 rounded-full bg-highlight shadow-[0_0_8px_2px_rgba(252,209,22,0.6)]" />
                        )}
                      </motion.a>
                    );
                  })}
                </div>

                {/* Decorative element */}
                <div className="mt-12 pt-6 border-t border-text-secondary/20">
                  <div className="flex items-center gap-3">
                    <div className="bg-accent px-2 py-1 -skew-x-12">
                      <span className="text-lg font-black text-primary skew-x-12 inline-block">
                        01
                      </span>
                    </div>
                    <div>
                      <span className="text-xs text-text-secondary uppercase">
                        Thinh Nguyen
                      </span>
                      <p className="text-xs text-highlight font-bold uppercase">
                        Software Engineer
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}