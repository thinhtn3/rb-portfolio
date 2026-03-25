import headshotNoBg from "@/assets/headshot_no_bg.png";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";

export function ProfileCard({
  name = "Thinh Nguyen",
  firstName = "THINH",
  lastName = "NGUYEN",
  number = "1",
  location = "Irvine, CA",
  title = "4x Hackathon Winner",
  subtitle = "Backend Developer",
  university = "UC Irvine",
  year = "2028",
  accentColor = "var(--color-accent)",
  highlightColor = "var(--color-highlight)",
  imageSrc = headshotNoBg,
}) {
  const cardRef = useRef(null);
  const scanLineRef = useRef(null);
  const streaksRef = useRef([]);
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-220, 220], [10, -10]), { stiffness: 300, damping: 35 });
  const rotateY = useSpring(useTransform(mouseX, [-160, 160], [-10, 10]), { stiffness: 300, damping: 35 });
  const glareX = useTransform(mouseX, [-160, 160], [0, 100]);
  const glareY = useTransform(mouseY, [-220, 220], [0, 100]);

  // GSAP: repeating scan line + speed streaks
  useEffect(() => {
    const ctx = gsap.context(() => {
      // ── Repeating scan line (every ~6s) ──
      gsap.set(scanLineRef.current, { top: "-4px", opacity: 0 });
      const scanTl = gsap.timeline({ repeat: -1, repeatDelay: 4.5, delay: 1.8 });
      scanTl
        .to(scanLineRef.current, { opacity: 1, duration: 0.12 })
        .to(scanLineRef.current, { top: "108%", duration: 1.3, ease: "power1.inOut" })
        .to(scanLineRef.current, { opacity: 0, duration: 0.25 }, "-=0.35")
        .set(scanLineRef.current, { top: "-4px" });

      // ── Speed streaks (every ~4.5s) ──
      const streaks = streaksRef.current.filter(Boolean);
      const streakTl = gsap.timeline({ repeat: -1, repeatDelay: 3.5, delay: 3.5 });
      // Reset all to start at the beginning of each loop
      streakTl.set(streaks, { x: "-110%", opacity: 0 });
      streaks.forEach((streak, i) => {
        streakTl.to(
          streak,
          { x: "120%", opacity: i === 0 ? 0.9 : 0.5, duration: 0.42, ease: "power2.inOut" },
          i * 0.07
        );
      });
    });
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - (rect.left + rect.width / 2));
    mouseY.set(e.clientY - (rect.top + rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const stagger = (i) => ({ duration: 0.5, delay: 0.6 + i * 0.1, ease: [0.16, 1, 0.3, 1] });

  const corners = [
    { pos: "top-2 left-2", border: "border-t-2 border-l-2" },
    { pos: "top-2 right-2", border: "border-t-2 border-r-2" },
    { pos: "bottom-2 left-2", border: "border-b-2 border-l-2" },
    { pos: "bottom-2 right-2", border: "border-b-2 border-r-2" },
  ];

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 60, scale: 0.88 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative w-[320px] h-[440px] 2xl:w-[400px] 2xl:h-[550px] rounded-sm overflow-hidden cursor-pointer select-none"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-secondary" />

      {/* Grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(237,239,243,1) 1px, transparent 1px), linear-gradient(90deg, rgba(237,239,243,1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Breathing border glow — always on, pulses */}
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 1px rgba(177,18,38,0.15), 0 0 12px rgba(177,18,38,0.04)",
            "0 0 0 1px rgba(177,18,38,0.6), 0 0 28px rgba(177,18,38,0.2), 0 0 55px rgba(177,18,38,0.08)",
            "0 0 0 1px rgba(177,18,38,0.15), 0 0 12px rgba(177,18,38,0.04)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
        className="absolute -inset-px rounded-sm z-0 pointer-events-none"
      />

      {/* Hover glow overlay */}
      <motion.div
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute -inset-px rounded-sm z-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 0 1px rgba(177,18,38,0.9), 0 0 40px rgba(177,18,38,0.35), 0 0 80px rgba(177,18,38,0.15)",
        }}
      />

      {/* Mouse glare */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none rounded-sm"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.09) 0%, transparent 55%)`
          ),
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Corner bracket accents */}
      {corners.map(({ pos, border }, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} w-4 h-4 z-30 pointer-events-none ${border} rounded-[1px]`}
          style={{ borderColor: accentColor }}
          animate={isHovered ? { opacity: 1, scale: 1.3 } : { opacity: 0.25, scale: 1 }}
          transition={{ duration: 0.35, delay: i * 0.04 }}
        />
      ))}

      {/* GSAP scan line */}
      <div
        ref={scanLineRef}
        className="absolute left-0 right-0 h-[2px] z-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(177,18,38,0.9), rgba(252,209,22,0.6), rgba(177,18,38,0.9), transparent)",
          boxShadow: "0 0 10px 2px rgba(177,18,38,0.5)",
        }}
      />

      {/* GSAP speed streaks */}
      {[
        { top: "28%", h: "2px", gradient: "linear-gradient(90deg, transparent, rgba(177,18,38,0.85), rgba(252,209,22,0.4), transparent)" },
        { top: "40%", h: "1px", gradient: "linear-gradient(90deg, transparent, rgba(177,18,38,0.5), transparent)" },
        { top: "50%", h: "1px", gradient: "linear-gradient(90deg, transparent, rgba(177,18,38,0.35), transparent)" },
      ].map((s, i) => (
        <div
          key={i}
          ref={(el) => { streaksRef.current[i] = el; }}
          className="absolute left-0 right-0 z-30 pointer-events-none"
          style={{ top: s.top, height: s.h, background: s.gradient, opacity: 0 }}
        />
      ))}

      {/* Top red accent bar */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        style={{ transformOrigin: "left", backgroundColor: accentColor }}
        className="absolute top-0 left-0 right-0 h-[3px] 2xl:h-[4px] z-20"
      />

      {/* Diagonal racing stripe */}
      <motion.div
        initial={{ x: -400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
        className="absolute top-0 left-0 right-0 h-[72px] 2xl:h-[90px] z-10 overflow-hidden"
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor} 40%, transparent 40%)`,
            opacity: 0.15,
          }}
        />
      </motion.div>

      {/* ── TOP: name + number ── */}
      <div className="absolute top-0 left-0 right-0 h-[72px] 2xl:h-[90px] z-20 flex items-center justify-between px-4 2xl:px-5 pt-3 2xl:pt-4">
        <div className="flex flex-col leading-tight">
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={stagger(0)}
            className="text-[10px] 2xl:text-[12px] tracking-[0.25em] font-bold text-text-secondary uppercase"
          >
            {subtitle}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={stagger(1)}
            className="text-[22px] 2xl:text-[28px] font-black uppercase leading-none tracking-tight text-text-primary"
          >
            {lastName.toUpperCase()}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={stagger(2)}
            className="text-[13px] 2xl:text-[16px] font-semibold uppercase tracking-widest"
            style={{ color: accentColor }}
          >
            {firstName.toUpperCase()}
          </motion.span>
        </div>

        {/* Driver number — glows on pulse */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: 1,
            scale: 1,
            filter: [
              "drop-shadow(0 0 0px transparent)",
              `drop-shadow(0 0 8px ${accentColor}) drop-shadow(0 0 16px rgba(177,18,38,0.4))`,
              "drop-shadow(0 0 0px transparent)",
            ],
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] },
            scale: { duration: 0.6, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] },
            filter: { duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 2.5 },
          }}
          className="text-[52px] 2xl:text-[64px] font-black leading-none -skew-x-6"
          style={{
            WebkitTextStroke: `2px ${accentColor}`,
            WebkitTextFillColor: "transparent",
          }}
        >
          {number}
        </motion.div>
      </div>

      {/* Separator */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
        style={{ transformOrigin: "left", top: "72px" }}
        className="absolute left-4 right-4 2xl:top-[90px] h-px bg-white/10 z-20"
      />

      {/* Headshot photo */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
        className="absolute left-0 right-0 z-10"
        style={{ top: "72px", bottom: "96px" }}
      >
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-contain object-bottom"
          draggable={false}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-24 2xl:h-32"
          style={{
            background: "linear-gradient(to top, var(--color-secondary) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── BOTTOM STATS ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[112px] 2xl:h-[130px] z-20 px-4 2xl:px-5 pb-4 2xl:pb-5 flex flex-col justify-end gap-1.5 2xl:gap-2">
        {/* Winner badge + car icon row */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(3)}
          className="flex items-center gap-2"
        >
          <div
            className="relative overflow-hidden px-2 py-0.5 text-[9px] 2xl:text-[11px] font-black uppercase tracking-widest -skew-x-6"
            style={{ backgroundColor: highlightColor, color: "#060C1F" }}
          >
            {title}
            {/* Shimmer sweep */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 25%, rgba(255,255,255,0.55) 50%, transparent 75%)",
              }}
              animate={{ x: ["-150%", "150%"] }}
              transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 3, ease: "linear", delay: 3.5 }}
            />
          </div>
        </motion.div>

        {/* Uber incoming tag */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(4)}
          className="flex items-center gap-1.5"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[#06C167] shadow-[0_0_6px_1px_rgba(6,193,103,0.7)]" />
          <span className="text-[9px] 2xl:text-[11px] font-bold uppercase tracking-widest text-[#06C167]">
            Incoming SWE Intern · Uber · Summer 2026
          </span>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(5)}
          className="flex items-center gap-2 text-[10px] 2xl:text-[12px] text-text-secondary font-semibold uppercase tracking-widest"
        >
          <span className="text-text-primary">{university}</span>
          <span style={{ color: accentColor }}>·</span>
          <span className="text-text-primary">{year}</span>
          <span style={{ color: accentColor }}>·</span>
          <span>{location}</span>
        </motion.div>

        {/* Bottom accent line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 1.3, ease: "easeOut" }}
          style={{ transformOrigin: "left", backgroundColor: accentColor }}
          className="h-[2px] w-full mt-0.5 opacity-60"
        />
      </div>
    </motion.div>
  );
}
