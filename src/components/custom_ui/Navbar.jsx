import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import siteLogo from "@/assets/site_icon.svg";

function F1CarSVG() {
  return (
    <svg viewBox="0 0 110 36" width="56" height="18" xmlns="http://www.w3.org/2000/svg">
      {/* Rear wing — vertical strut + top blade */}
      <rect x="4" y="8" width="3" height="14" fill="#B11226" />
      <rect x="1" y="8" width="10" height="2.5" fill="#FCD116" />

      {/* Main body */}
      <path
        d="M7,26 L9,15 L22,11 L68,11 L82,15 L92,20 L94,26 Z"
        fill="#B11226"
      />
      {/* Body highlight stripe */}
      <path
        d="M22,11 L68,11 L70,13.5 L20,13.5 Z"
        fill="#FCD116"
        opacity="0.6"
      />

      {/* Cockpit opening */}
      <path
        d="M32,11 L37,4 L58,4 L63,11 Z"
        fill="#060C1F"
      />
      {/* Halo */}
      <path
        d="M38,4 L42,2 L54,2 L58,4 Z"
        fill="#0A1A3F"
        stroke="#B11226"
        strokeWidth="0.5"
      />

      {/* Front nose taper */}
      <path
        d="M88,20 L106,22 L106,25 L88,26 Z"
        fill="#B11226"
      />
      {/* Front wing */}
      <path
        d="M96,24 L110,22 L110,27 L96,28 Z"
        fill="#FCD116"
      />
      <rect x="106" y="22" width="2" height="6" fill="#B11226" />

      {/* Rear wheel */}
      <circle cx="20" cy="27" r="7.5" fill="#111" />
      <circle cx="20" cy="27" r="3.5" fill="#222" />
      <circle cx="20" cy="27" r="1.2" fill="#444" />

      {/* Front wheel */}
      <circle cx="80" cy="27" r="7.5" fill="#111" />
      <circle cx="80" cy="27" r="3.5" fill="#222" />
      <circle cx="80" cy="27" r="1.2" fill="#444" />

      {/* Floor/underfloor */}
      <rect x="9" y="25.5" width="85" height="1.5" fill="#8B0E1E" opacity="0.7" />
    </svg>
  );
}

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
        <div className="h-1 2xl:h-1.5 bg-accent" />

        <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-6 2xl:px-10 py-3 2xl:py-4">
          <div className="flex items-center justify-between">
            {/* Pit board style logo */}
            <a
              href="#hero"
              onClick={(e) => handleClick(e, "#hero")}
              className="flex items-center"
            >
              {/* Driver number style */}
              <div className="px-2 -skew-x-12">
                <img src={siteLogo} alt="Site Logo" className="w-12 h-12 2xl:w-14 2xl:h-14" />
              </div>
              <div className="ml-3 2xl:ml-4 border-l-2 border-highlight pl-3 2xl:pl-4">
                <span className="text-xs 2xl:text-sm text-text-secondary uppercase tracking-widest">
                  NGUYEN
                </span>
                <span className="block text-sm 2xl:text-base font-bold text-text-primary uppercase -mt-1">
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
                      className={`flex items-center px-1 2xl:px-2 mx-1 2xl:mx-2 transition-all duration-200 ${
                        isActive ? "" : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      {/* Position indicator */}
                      <div
                        className={`w-8 h-8 2xl:w-10 2xl:h-10 flex items-center justify-center font-black text-sm 2xl:text-base -skew-x-12 transition-colors ${
                          isActive
                            ? "bg-highlight text-primary"
                            : "bg-text-secondary/20 text-text-secondary group-hover:bg-accent group-hover:text-primary"
                        }`}
                      >
                        <span className="skew-x-12">{link.pos}</span>
                      </div>

                      {/* Label */}
                      <div
                        className={`ml-2 2xl:ml-3 pr-3 2xl:pr-4 border-r border-text-secondary/30 last:border-r-0 ${
                          isActive ? "text-text-primary" : "text-text-secondary"
                        }`}
                      >
                        <span className="text-xs 2xl:text-sm font-bold uppercase tracking-wide">
                          {link.name}
                        </span>
                      </div>
                    </div>

                    {/* F1 car active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeCarIndicator"
                        className="absolute -bottom-5 2xl:-bottom-6 left-1/2 -translate-x-1/2"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      >
                        <F1CarSVG />
                        {/* Glow under the car */}
                        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full blur-sm" style={{ backgroundColor: "rgba(177,18,38,0.6)" }} />
                      </motion.div>
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
          <div className="h-0.5 2xl:h-[3px] flex-1 bg-accent" />
          <div className="h-0.5 2xl:h-[3px] w-32 2xl:w-40 bg-highlight -skew-x-12" />
          <div className="h-0.5 2xl:h-[3px] flex-1 bg-accent" />
        </div>
      </motion.nav>

      {/* Mobile side menu - no 2xl changes needed as it's only for mobile */}
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