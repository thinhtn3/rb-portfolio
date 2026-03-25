import headshotNoBg from "@/assets/headshot_no_bg.png";
import { motion, useMotionValue, useTransform, useSpring } from "motion/react";
import { useRef, useState } from "react";

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
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-220, 220], [10, -10]), {
    stiffness: 300,
    damping: 35,
  });
  const rotateY = useSpring(useTransform(mouseX, [-160, 160], [-10, 10]), {
    stiffness: 300,
    damping: 35,
  });
  const glareX = useTransform(mouseX, [-160, 160], [0, 100]);
  const glareY = useTransform(mouseY, [-220, 220], [0, 100]);

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

  return (
    <motion.div
      ref={cardRef}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="relative w-[320px] h-[440px] 2xl:w-[400px] 2xl:h-[550px] rounded-sm overflow-hidden cursor-pointer select-none"
    >
      {/* Card background */}
      <div className="absolute inset-0 bg-secondary" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.04] z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(237,239,243,1) 1px, transparent 1px), linear-gradient(90deg, rgba(237,239,243,1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Outer glow on hover */}
      <motion.div
        animate={isHovered ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute -inset-px rounded-sm z-0 pointer-events-none"
        style={{
          boxShadow:
            "0 0 0 1px rgba(177,18,38,0.6), 0 0 30px rgba(177,18,38,0.25), 0 0 60px rgba(177,18,38,0.1)",
        }}
      />

      {/* Glare highlight on hover */}
      <motion.div
        className="absolute inset-0 z-30 pointer-events-none rounded-sm"
        style={{
          background: useTransform(
            [glareX, glareY],
            ([x, y]) =>
              `radial-gradient(circle at ${x}% ${y}%, rgba(255,255,255,0.07) 0%, transparent 60%)`
          ),
          opacity: isHovered ? 1 : 0,
        }}
      />

      {/* Scan line reveal on load */}
      <motion.div
        initial={{ top: "-4px", opacity: 1 }}
        animate={{ top: "110%", opacity: 0 }}
        transition={{ duration: 1.0, ease: "easeInOut", delay: 0.3 }}
        className="absolute left-0 right-0 h-[3px] z-40 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(177,18,38,0.9), rgba(252,209,22,0.5), rgba(177,18,38,0.9), transparent)",
          boxShadow: "0 0 12px 2px rgba(177,18,38,0.6)",
        }}
      />

      {/* Top red accent bar — sweeps in */}
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

      {/* ── TOP SECTION: name + number ── */}
      <div className="absolute top-0 left-0 right-0 h-[72px] 2xl:h-[90px] z-20 flex items-center justify-between px-4 2xl:px-5 pt-3 2xl:pt-4">
        {/* Name */}
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

        {/* Driver number */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          className="text-[52px] 2xl:text-[64px] font-black leading-none -skew-x-6"
          style={{
            WebkitTextStroke: `2px ${accentColor}`,
            WebkitTextFillColor: "transparent",
          }}
        >
          {number}
        </motion.div>
      </div>

      {/* ── SEPARATOR ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5, delay: 1.0, ease: "easeOut" }}
        style={{ transformOrigin: "left", top: "72px" }}
        className="absolute left-4 right-4 2xl:top-[90px] h-px bg-white/10 z-20"
      />

      {/* ── PHOTO ── */}
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

        {/* Bottom fade into card */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 2xl:h-32"
          style={{
            background:
              "linear-gradient(to top, var(--color-secondary) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── BOTTOM STATS STRIP ── */}
      <div className="absolute bottom-0 left-0 right-0 h-[96px] 2xl:h-[112px] z-20 px-4 2xl:px-5 pb-4 2xl:pb-5 flex flex-col justify-end gap-1.5 2xl:gap-2">
        {/* Winner badge */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(3)}
          className="flex items-center gap-2"
        >
          <div
            className="px-2 py-0.5 text-[9px] 2xl:text-[11px] font-black uppercase tracking-widest -skew-x-6"
            style={{ backgroundColor: highlightColor, color: "#060C1F" }}
          >
            {title}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={stagger(4)}
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
