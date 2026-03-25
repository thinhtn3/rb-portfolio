import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { ProfileCard } from "@/components/custom_ui/hero/ProfileCard.jsx";
import { Hyperlinks } from "@/components/custom_ui/hero/Hyperlinks.jsx";
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
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  // Match ProfileCard's Tailwind fixed sizes exactly:
  // w-[320px] h-[440px]  →  default
  // 2xl:w-[440px] 2xl:h-[605px]  →  ≥ 1536px
  // min-[1920px]:w-[520px] min-[1920px]:h-[715px]  →  ≥ 1920px
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  let baseCardW = 320;
  let baseCardH = 440;
  if (vw >= 1920) {
    baseCardW = 520;
    baseCardH = 715;
  } else if (vw >= 1536) {
    baseCardW = 440;
    baseCardH = 605;
  }

  // Cap at ~80% of viewport for very large screens, but 70% for laptop/standard desktop
  const maxW = vw >= 1920 ? vw * 0.82 : vw * 0.7;
  const maxH = vw >= 1920 ? vh * 0.82 : vh * 0.7;

  // Maintain aspect ratio when scaling down
  const scale = Math.min(1, maxW / baseCardW, maxH / baseCardH);
  const cardW = baseCardW * scale;
  const cardH = baseCardH * scale;

  // Adjust expansion multiplier based on the new max sizes
  const mediaWidth =
    cardW +
    scrollProgress *
      (isMobile ? 600 : vw >= 1920 ? 1600 : vw >= 1536 ? 1300 : 1000);
  const mediaHeight =
    cardH +
    scrollProgress *
      (isMobile ? 180 : vw >= 1920 ? 500 : vw >= 1536 ? 400 : 300);

  const clampedW = Math.min(mediaWidth, maxW);
  const clampedH = Math.min(mediaHeight, maxH);

  // Title: hidden until card grows to ~30% expansion, then fades in then back out
  const textTranslateX = scrollProgress * (isMobile ? 80 : 120);
  const textRise = Math.min(1, Math.max(0, (scrollProgress - 0.15) / 0.2));
  const textFall = Math.min(1, Math.max(0, 1 - (scrollProgress - 0.5) / 0.25));
  const textOpacity = Math.min(textRise, textFall);

  // Content reveal logic - wait until 75% expanded
  useEffect(() => {
    if (scrollProgress >= 0.75) {
      setShowContent(true);
    } else {
      setShowContent(false);
    }
  }, [scrollProgress]);

  // Padding inside the expanded box
  const innerPad = Math.round(clamp(scrollProgress, 0, 1) * 40); // 0 → 40px as card expands

  // Right pad grows from 0 (card flush at start) to 28px when fully expanded
  const cardRightPad = Math.round(scrollProgress * 28);
  const colGap = 24;
  const leftW = Math.max(0, clampedW - cardW - cardRightPad - colGap);

  return (
    <section
      className="relative min-h-[150vh] overflow-visible"
      style={{ backgroundColor: "var(--color-primary)" }}
    >
      {/* Sticky container to hold the expanding card while scrolling */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* ── Expanding card (the "media" equivalent) ── */}
        <div
          className="absolute z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
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
              padding: leftW > 80 ? "2rem clamp(28px, 5vw, 100px)" : 0,
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
                  fontSize: "clamp(2.2rem, 5vw, 6.5rem)",
                  letterSpacing: "-0.02em",
                }}
              >
                Thinh
              </span>
              <span
                className="font-black uppercase"
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 6.5rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--color-accent)",
                }}
              >
                Nguyen
              </span>
            </div>

            {/* Slogan */}
            <p
              className="text-gray-400 mt-4"
              style={{
                fontSize: "clamp(0.85rem, 1.3vw, 1.3rem)",
                maxWidth: "44ch",
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
            <div className="mt-5 flex flex-wrap gap-3">
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
                    className="bg-transparent border-2 border-accent hover:bg-accent/10 w-44 h-12 2xl:w-52 2xl:h-14 min-[1920px]:w-60 min-[1920px]:h-16 rounded-sm group font-bold uppercase tracking-wide"
                    rippleColor="var(--color-accent)"
                  >
                    <span className="text-accent group-hover:text-highlight transition-colors flex items-center justify-center gap-2 text-sm 2xl:text-base min-[1920px]:text-lg">
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
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center pointer-events-none select-none w-full"
          style={{ gap: "0.1em" }}
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
