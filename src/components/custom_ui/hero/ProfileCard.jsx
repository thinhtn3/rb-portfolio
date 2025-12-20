import headshotImage from "@/assets/headshot_bg.JPG";
import { motion } from "motion/react";

export function ProfileCard({
  name = "Thinh Nguyen",
  firstName = "NGU",
  number = "1",
  location = "Irvine, CA",
  title = "2x Hackathon Winner",
  subtitle = "Backend Developer",
  university = "UC Irvine",
  year = "2028",
  accentColor = "var(--color-accent)",
  imageSrc = headshotImage,
}) {
  return (
    <motion.div 
    initial={{ opacity: 0, }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
    className="relative w-[320px] h-[440px] bg-white rounded-lg overflow-hidden shadow-xl">
      {/* Top info section */}
      <div className="absolute top-4 left-14 right-4 flex justify-between text-xs z-10">
        <div className="text-gray-800">
          <p className="font-bold">{name}</p>
          <p className="text-gray-500">{location}</p>
          <p className="text-gray-500">{subtitle}</p>
        </div>
        <div className="text-right" style={{ color: accentColor }}>
          <p className="font-bold">{title}</p>
        </div>
      </div>

      {/* Vertical name on left */}
      <div
        className="absolute left-6 top-2/5 -translate-y-1/2 text-6xl font-bold italic"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "rotate(180deg) translateX(50%)",
          color: "#1a1a1a",
        }}
      >
        {firstName}
      </div>

      {/* Photo container */}
      <div className="absolute top-16 left-12 right-4 bottom-24 overflow-hidden">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Large outlined number */}
      <div
        className="absolute -bottom-4 -right-2 text-[180px] font-black leading-none z-20 pointer-events-none"
        style={{
          WebkitTextStroke: `3px ${accentColor}`,
          WebkitTextFillColor: "transparent",
          transform: "skewX(-8deg)",
        }}
      >
        {number}
      </div>

      {/* Year */}
      <div className="absolute bottom-4 left-14">
        <p
          className="left-14 text-xl font-bold z-10 italic"
          style={{ color: "#1a1a1a" }}
        >
          {university}
        </p>
        <p 
        className="text-xl font-bold z-10 italic" 
        style={{ color: accentColor }}>
          {year}
        </p>
      </div>
    </motion.div>
  );
}
