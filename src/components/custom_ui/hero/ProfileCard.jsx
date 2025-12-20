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
    className="relative w-[320px] h-[440px] 2xl:w-[400px] 2xl:h-[550px] bg-white rounded-lg overflow-hidden shadow-xl">
      {/* Top info section */}
      <div className="absolute top-4 2xl:top-5 left-14 2xl:left-16 right-4 2xl:right-5 flex justify-between text-xs 2xl:text-sm z-10">
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
        className="absolute left-6 2xl:left-7 top-2/5 -translate-y-1/2 text-6xl 2xl:text-7xl font-bold italic"
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
      <div className="absolute top-16 2xl:top-20 left-12 2xl:left-14 right-4 2xl:right-5 bottom-24 2xl:bottom-28 overflow-hidden">
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Large outlined number */}
      <div
        className="absolute -bottom-4 2xl:-bottom-6 -right-2 2xl:-right-3 text-[180px] 2xl:text-[220px] font-black leading-none z-20 pointer-events-none"
        style={{
          WebkitTextStroke: `3px ${accentColor}`,
          WebkitTextFillColor: "transparent",
          transform: "skewX(-8deg)",
        }}
      >
        {number}
      </div>

      {/* Year */}
      <div className="absolute bottom-4 2xl:bottom-5 left-14 2xl:left-16">
        <p
          className="text-xl 2xl:text-2xl font-bold z-10 italic"
          style={{ color: "#1a1a1a" }}
        >
          {university}
        </p>
        <p 
        className="text-xl 2xl:text-2xl font-bold z-10 italic" 
        style={{ color: accentColor }}>
          {year}
        </p>
      </div>
    </motion.div>
  );
}