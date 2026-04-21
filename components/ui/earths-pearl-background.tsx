"use client";

import { motion } from "framer-motion";

export default function EarthsPearlBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep base */}
      <div className="absolute inset-0 bg-[#1C0D04]" />

      {/* Primary warm center bloom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 35%, #3B200B 0%, transparent 70%)",
        }}
      />

      {/* Amber upper-left warmth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 20% 10%, #7A3E16 0%, transparent 55%)",
          opacity: 0.55,
        }}
      />

      {/* Caramel lower-right depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 80% 85%, #A05A2C 0%, transparent 55%)",
          opacity: 0.3,
        }}
      />

      {/* Dark anchor bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 100% 40% at 50% 100%, #241208 0%, transparent 60%)",
          opacity: 0.85,
        }}
      />

      {/* Soft cream highlight haze — upper */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 30% at 55% 5%, rgba(255, 235, 210, 0.12) 0%, transparent 60%)",
        }}
      />

      {/* Slow ambient drift — warm orb */}
      <motion.div
        className="absolute"
        style={{
          width: "60vw",
          height: "60vw",
          top: "5%",
          left: "-10%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(122, 62, 22, 0.22) 0%, transparent 70%)",
          filter: "blur(48px)",
        }}
        animate={{
          x: [0, 28, -14, 0],
          y: [0, -18, 22, 0],
        }}
        transition={{
          duration: 28,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      />

      {/* Slow ambient drift — deep orb */}
      <motion.div
        className="absolute"
        style={{
          width: "50vw",
          height: "50vw",
          bottom: "10%",
          right: "-8%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(160, 90, 44, 0.18) 0%, transparent 70%)",
          filter: "blur(56px)",
        }}
        animate={{
          x: [0, -22, 16, 0],
          y: [0, 20, -14, 0],
        }}
        transition={{
          duration: 34,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
          delay: 6,
        }}
      />

      {/* Ultra-fine grain */}
      <svg
        className="absolute inset-0 w-full h-full"
        style={{ opacity: 0.055, mixBlendMode: "overlay" }}
      >
        <filter id="ep-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#ep-noise)" />
      </svg>
    </div>
  );
}
