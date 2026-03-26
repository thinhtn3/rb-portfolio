import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ProfileCard } from "@/components/custom_ui/hero/ProfileCard.jsx";
import { Hyperlinks, hyperlinks } from "@/components/custom_ui/hero/Hyperlinks.jsx";
import { RippleButton } from "@/components/ui/ripple-button";

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

const NAV_BUTTONS = [
  { name: "About Me", href: "#about" },
  { name: "View Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export function ScrollExpansionHero() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Exact 21st.dev scroll mechanics
  useEffect(() => {
    if (isMobile) return; // Skip scroll locking on mobile

    // Disable lenis while we are controlling scroll
    if (window.lenis) {
      if (!mediaFullyExpanded) {
        window.lenis.stop();
      } else {
        window.lenis.start();
      }
    }

    // Also disable body scroll to prevent native scroll leakage
    if (!mediaFullyExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        // Collapse back when scrolling up at the top
        setMediaFullyExpanded(false);
        setShowContent(false);
      } else if (!mediaFullyExpanded) {
        const delta = e.deltaY * 0.0009;
        const next = Math.min(Math.max(scrollProgress + delta, 0), 1);
        setScrollProgress(next);

        // Reveal text at 75% expansion
        if (next >= 0.75) {
          setShowContent(true);
        } else {
          setShowContent(false);
        }

        if (next >= 1) {
          setMediaFullyExpanded(true);
        }
      }
    };

    const handleTouchStart = (e) => setTouchStartY(e.touches[0].clientY);

    const handleTouchMove = (e) => {
      if (!touchStartY) return;
      const touchY = e.touches[0].clientY;
      const dy = touchStartY - touchY;
      if (mediaFullyExpanded && dy < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        setShowContent(false);
      } else if (!mediaFullyExpanded) {
        const factor = dy < 0 ? 0.008 : 0.005;
        const next = Math.min(Math.max(scrollProgress + dy * factor, 0), 1);
        setScrollProgress(next);

        // Reveal text at 75% expansion
        if (next >= 0.75) {
          setShowContent(true);
        } else {
          setShowContent(false);
        }

        if (next >= 1) {
          setMediaFullyExpanded(true);
        }
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => setTouchStartY(0);

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: false });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      if (window.lenis) window.lenis.start();
      document.body.style.overflow = '';
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, isMobile]);

  // Responsive breakpoints
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const isLg  = vw >= 1024;
  const isXl  = vw >= 1280;
  const is2Xl = vw >= 1536;
  const is4K  = vw >= 1920;

  // ProfileCard rendered sizes (must match its Tailwind classes)
  let baseCardW = 320, baseCardH = 440;
  if (is4K)       { baseCardW = 520; baseCardH = 715; }
  else if (is2Xl) { baseCardW = 440; baseCardH = 605; }
  else if (isXl)  { baseCardW = 400; baseCardH = 550; }
  else if (isLg)  { baseCardW = 370; baseCardH = 510; }

  // Container max size — more generous on lg+ so the left column has room
  const NAV_H = 68; // fixed navbar height
  const maxW = is4K ? vw * 0.82 : is2Xl ? vw * 0.86 : isLg ? vw * 0.90 : vw * 0.7;
  const maxH = is4K ? (vh - NAV_H) * 0.92 : is2Xl ? (vh - NAV_H) * 0.92 : isLg ? (vh - NAV_H) * 0.94 : (vh - NAV_H) * 0.80;

  const scale = Math.min(1, maxW / baseCardW, maxH / baseCardH);
  const cardW = baseCardW * scale;
  const cardH = baseCardH * scale;

  // Expansion amounts tuned per breakpoint
  const expandW = isMobile ? 600 : is4K ? 1600 : is2Xl ? 1300 : isXl ? 1100 : isLg ? 1000 : 800;
  const expandH = isMobile ? 180 : is4K ? 500  : is2Xl ? 400  : isXl ? 340  : isLg ? 310  : 220;

  const clampedW = Math.min(cardW + scrollProgress * expandW, maxW);
  const clampedH = Math.min(cardH + scrollProgress * expandH, maxH);

  // Split title animation
  const textTranslateX = scrollProgress * (isMobile ? 80 : 120);
  const textRise = Math.min(1, Math.max(0, (scrollProgress - 0.15) / 0.2));
  const textFall = Math.min(1, Math.max(0, 1 - (scrollProgress - 0.5) / 0.25));
  const textOpacity = Math.min(textRise, textFall);

  useEffect(() => {
    setShowContent(scrollProgress >= 0.75);
  }, [scrollProgress]);

  // Right pad grows from 0 → 28px as card expands
  const cardRightPad = Math.round(scrollProgress * 28);
  const colGap = 24;
  const leftW = Math.max(0, clampedW - cardW - cardRightPad - colGap);

  // Left column inner padding — scales down on smaller lg screens
  const leftHorizPad = is4K ? 80 : is2Xl ? 56 : isXl ? 44 : isLg ? 36 : 20;

  if (isMobile) {
    return (
      <div className="min-h-[100svh] flex flex-col items-center justify-center relative bg-primary px-6 py-12 overflow-hidden">
        {/* Top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent z-10" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center z-10 w-full max-w-sm mt-12"
        >
          {/* Name */}
          <div className="flex flex-wrap font-extrabold justify-center text-center mb-6" style={{ gap: "0.3em", lineHeight: 1 }}>
            <span className="text-text-primary font-black uppercase text-5xl tracking-tight">Thinh</span>
            <span className="font-black uppercase text-5xl tracking-tight text-accent">Nguyen</span>
          </div>

          {/* Slogan */}
          <p className="text-gray-400 text-center mb-10 text-sm leading-relaxed">
            Building high-performance software with precision and speed.
            Specializing in backend development.
          </p>

          {/* Social links */}
          <div className="mb-8 w-full">
            <div className="grid grid-cols-2 gap-3 w-full">
              {hyperlinks.map((hyperlink, index) => (
                <motion.a
                  key={hyperlink.name}
                  href={hyperlink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                  className="w-full"
                >
                  <RippleButton
                    rippleColor="#FCD116"
                    className="bg-accent w-full h-12 rounded-sm group font-bold uppercase tracking-wide"
                  >
                    <div className="flex flex-row items-center justify-center gap-2">
                      <img
                        src={hyperlink.icon}
                        alt={hyperlink.name}
                        className="w-5 h-5 transition-all duration-300 group-hover:filter-primary"
                        style={{
                          filter:
                            "brightness(0) saturate(100%) invert(4%) sepia(15%) saturate(4500%) hue-rotate(200deg) brightness(95%) contrast(105%)",
                        }}
                      />
                      <span className="text-primary text-xs transition-colors duration-300 group-hover:text-text-primary">
                        {hyperlink.name}
                      </span>
                    </div>
                  </RippleButton>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Nav buttons */}
          <div className="flex flex-col gap-3 w-full">
            {NAV_BUTTONS.map((btn) => (
              <button
                key={btn.name}
                className="cursor-pointer w-full"
                onClick={() => {
                  document.querySelector(btn.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <RippleButton
                  className="bg-transparent border-2 border-accent hover:bg-accent/10 w-full h-12 rounded-sm group font-bold uppercase tracking-wide"
                  rippleColor="var(--color-accent)"
                >
                  <span className="text-accent group-hover:text-highlight transition-colors flex items-center justify-center gap-2 text-sm">
                    {btn.name}
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </span>
                </RippleButton>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <section
      className="relative min-h-[150vh] overflow-visible"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      {/* Sticky container to hold the expanding card while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* ── Expanding card (the "media" equivalent) ── */}
        <div
          className="absolute z-0 left-1/2"
          style={{
            top: "50%",
            transform: "translate(-50%, calc(-50% + 34px))",
            width: clampedW,
            height: clampedH,
            backgroundColor: "var(--color-primary)",
            borderRadius: `${(1 - scrollProgress) * 2}px`,
            overflow: "hidden",
            boxShadow: "0px 0px 60px rgba(0,0,0,0.5)",
          }}
        >
          {/* Top accent bar */}
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-accent z-10" />

          {/* ── Left content: hero info (fades in when expanded) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showContent ? 1 : 0 }}
            transition={{ duration: 0.6 }}
            className="absolute top-0 bottom-0 flex flex-col justify-center overflow-hidden z-[5]"
            style={{
              left: 0,
              width: leftW,
              padding: leftW > 80 ? `2rem ${leftHorizPad}px` : 0,
              pointerEvents: showContent ? "auto" : "none",
            }}
          >
            {/* Name */}
            <div
              className="flex flex-wrap font-extrabold"
              style={{ gap: "0.3em", lineHeight: 1 }}
            >
              <span
                className="text-text-primary font-black uppercase"
                style={{
                  fontSize: "clamp(1.6rem, 3.8vw, 6.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Thinh
              </span>
              <span
                className="font-black uppercase"
                style={{
                  fontSize: "clamp(1.6rem, 3.8vw, 6.5rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--color-accent)",
                }}
              >
                Nguyen
              </span>
            </div>

            {/* Slogan */}
            <p
              className="text-gray-400 mt-3"
              style={{
                fontSize: "clamp(0.8rem, 1.15vw, 1.3rem)",
                maxWidth: "40ch",
                lineHeight: 1.6,
              }}
            >
              Building high-performance software with precision and speed.
              Specializing in backend development.
            </p>

            {/* Social links */}
            <div className="mt-3">
              <Hyperlinks />
            </div>

            {/* Nav buttons */}
            <div className="mt-3 xl:mt-5 flex flex-wrap gap-2 xl:gap-3 2xl:gap-5">
              {NAV_BUTTONS.map((btn) => (
                <button
                  key={btn.name}
                  className="cursor-pointer"
                  onClick={() => {
                    setMediaFullyExpanded(true);
                    setTimeout(
                      () =>
                        document
                          .querySelector(btn.href)
                          ?.scrollIntoView({ behavior: "smooth" }),
                      350,
                    );
                  }}
                >
                <RippleButton
                  className="bg-transparent border border-accent hover:bg-accent/10 w-24 lg:w-28 xl:w-32 2xl:w-52 min-[1920px]:w-60 h-8 lg:h-9 xl:h-10 2xl:h-14 min-[1920px]:h-16 rounded-sm group font-bold uppercase tracking-wide"
                  rippleColor="var(--color-accent)"
                >
                    <span className="text-accent group-hover:text-highlight transition-colors flex items-center justify-center gap-1 text-[9px] lg:text-[10px] xl:text-xs 2xl:text-base min-[1920px]:text-lg">
                      {btn.name}
                      <span className="group-hover:translate-x-1 transition-transform">
                        →
                      </span>
                    </span>
                  </RippleButton>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Vertical divider */}
          {leftW > 80 && (
            <div
              className="absolute top-[8%] bottom-[8%] z-[5] pointer-events-none"
              style={{
                left: leftW,
                width: 1,
                backgroundColor: "rgba(255,255,255,0.08)",
              }}
            />
          )}

          {/* ── ProfileCard — anchored right with padding ── */}
          <div
            className="absolute top-1/2 -translate-y-1/2 z-[6] flex items-center justify-end"
            style={{ right: cardRightPad, width: cardW, height: cardH }}
          >
            <div style={{ width: baseCardW, height: baseCardH, transform: `scale(${scale})`, transformOrigin: "center right" }}>
              <ProfileCard />
            </div>
          </div>
        </div>

        {/* ── Split title (exact 21st.dev pattern) ── */}
        <div
          className="absolute left-1/2 z-10 flex flex-col items-center pointer-events-none select-none w-full"
          style={{ top: "50%", transform: "translate(-50%, calc(-50% + 34px))", gap: "0.1em" }}
        >
          <div
            style={{
              transform: `translateX(-${textTranslateX}vw)`,
              opacity: textOpacity,
              fontWeight: 900,
              textTransform: "uppercase",
              fontSize: "clamp(2.5rem, 6vw, 8rem)",
              letterSpacing: "-0.02em",
              color: "var(--color-text-primary, #EDEEF3)",
              whiteSpace: "nowrap",
            }}
          >
            THINH
          </div>
          <div
            style={{
              transform: `translateX(${textTranslateX}vw)`,
              opacity: textOpacity,
              fontWeight: 900,
              textTransform: "uppercase",
              fontSize: "clamp(2.5rem, 6vw, 8rem)",
              letterSpacing: "-0.02em",
              color: "var(--color-accent)",
              whiteSpace: "nowrap",
            }}
          >
            NGUYEN
          </div>
        </div>

        {/* Scroll hint */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-10"
          style={{ opacity: Math.max(0, 1 - scrollProgress * 6) }}
        >
          <span
            className="font-bold uppercase"
            style={{
              fontSize: "clamp(0.6rem, 1vw, 0.8rem)",
              letterSpacing: "0.28em",
              color: "#9CA3AF",
            }}
          >
            Scroll to expand
          </span>
          <div
            className="w-px h-7 2xl:h-10 min-[1920px]:h-12 bg-gradient-to-b from-accent to-transparent"
            style={{ animation: "pulse 1.5s ease-in-out infinite" }}
          />
        </div>

        {/* Progress bar */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-10"
          style={{ backgroundColor: "rgba(177,18,38,0.1)" }}
        >
          <div
            className="h-full bg-accent"
            style={{ width: `${scrollProgress * 100}%`, transition: "none" }}
          />
        </div>
      </div>
    </section>
  );
}
