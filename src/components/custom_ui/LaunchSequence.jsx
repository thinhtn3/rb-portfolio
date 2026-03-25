import { useEffect, useRef } from "react";
import gsap from "gsap";

export function LaunchSequence({ onComplete }) {
  const overlayRef = useRef(null);
  const lightsRef = useRef([]);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);
  const streakRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const lights = lightsRef.current;

      gsap.set(lights, {
        backgroundColor: "#120303",
        boxShadow: "none",
        scale: 1,
      });
      gsap.set([nameRef.current, taglineRef.current], { opacity: 0, y: 14 });
      gsap.set(streakRef.current, { scaleX: 0, opacity: 0, transformOrigin: "left center" });

      const tl = gsap.timeline({ onComplete: () => onComplete?.() });

      // Reveal name + tagline
      tl.to(nameRef.current, { opacity: 1, y: 0, duration: 0.45, ease: "power2.out", delay: 0.25 })
        .to(taglineRef.current, { opacity: 0.45, y: 0, duration: 0.3, ease: "power2.out" }, "-=0.15");

      // Lights illuminate one by one
      lights.forEach((light) => {
        tl.to(light, {
          backgroundColor: "#B11226",
          boxShadow:
            "0 0 14px #B11226, 0 0 36px rgba(177,18,38,0.55), 0 0 60px rgba(177,18,38,0.2), inset 0 0 10px rgba(255,40,40,0.25)",
          scale: 1.1,
          duration: 0.13,
          ease: "power1.out",
        }).to(light, { scale: 1, duration: 0.09 });
      });

      // Hold tension — all 5 lit
      tl.to({}, { duration: 0.7 });

      // LIGHTS OUT — stagger extinguish
      tl.to(lights, {
        backgroundColor: "#080101",
        boxShadow: "none",
        duration: 0.07,
        stagger: 0.025,
      });
      tl.to([nameRef.current, taglineRef.current], { opacity: 0, duration: 0.18 }, "<");

      // Brief beat
      tl.to({}, { duration: 0.18 });

      // Speed streak flashes across
      tl.to(streakRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.18,
        ease: "power4.out",
      }).to(streakRef.current, {
        opacity: 0,
        duration: 0.12,
        ease: "power2.in",
      });

      // Overlay rockets up
      tl.to(overlayRef.current, {
        yPercent: -100,
        duration: 0.78,
        ease: "power4.inOut",
      }, "-=0.05");
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-7"
      style={{ backgroundColor: "#000" }}
    >
      {/* Name */}
      <div ref={nameRef} className="text-center">
        <p
          className="text-text-primary font-black text-3xl 2xl:text-4xl uppercase tracking-[0.25em]"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Thinh{" "}
          <span style={{ color: "var(--color-accent)" }}>Nguyen</span>
        </p>
      </div>

      {/* Race start lights */}
      <div className="flex gap-4 2xl:gap-5">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            ref={(el) => {
              lightsRef.current[i] = el;
            }}
            className="w-12 h-12 2xl:w-14 2xl:h-14 rounded-full"
            style={{
              border: "1.5px solid rgba(177,18,38,0.25)",
              backgroundColor: "#120303",
            }}
          />
        ))}
      </div>

      {/* Tagline */}
      <p
        ref={taglineRef}
        className="text-text-secondary text-[10px] 2xl:text-xs uppercase tracking-[0.45em]"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        Lights out and away we go
      </p>

      {/* Speed streak */}
      <div
        ref={streakRef}
        className="absolute left-0 right-0"
        style={{
          top: "50%",
          height: "2px",
          background:
            "linear-gradient(to right, transparent 0%, var(--color-accent) 30%, #fff 50%, var(--color-accent) 70%, transparent 100%)",
          boxShadow: "0 0 8px var(--color-accent)",
          opacity: 0,
        }}
      />
    </div>
  );
}
