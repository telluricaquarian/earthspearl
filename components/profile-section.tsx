"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface ProfileSectionProps {
  name: string
  bio: string
  imageUrl: string
}

export function ProfileSection({ name, bio, imageUrl }: ProfileSectionProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <motion.div
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 500, damping: 25 }}
        className="relative img-protected"
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        <div
          className="relative h-[104px] w-[104px] overflow-hidden rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.5)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            boxShadow: `
              inset 0 2px 4px rgba(255, 255, 255, 0.8),
              0 0 0 2px rgba(255, 255, 255, 0.6),
              0 4px 16px rgba(0, 0, 0, 0.1),
              0 12px 32px rgba(120, 119, 198, 0.15)
            `,
          }}
        >
          <Image src={imageUrl || "/placeholder.svg"} alt={name} fill className="object-cover img-protected" priority />
          {/* Transparent overlay — absorbs right-click/drag on the image surface */}
          <div
            className="absolute inset-0 z-10 rounded-full"
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>

        {/* Subtle outer glow */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: "0 0 40px 8px rgba(120, 119, 198, 0.1)",
          }}
        />


      </motion.div>

      <p
        className="mt-5 text-[10px] text-center whitespace-nowrap"
        style={{
          fontFamily: "var(--font-earthtone)",
          color: "rgba(255, 255, 255, 0.52)",
          letterSpacing: "0.06em",
        }}
      >
        E A R T H S&nbsp;&nbsp;P E A R L
      </p>

      <h1 className="mt-1 text-xl font-semibold tracking-tight text-white">{name}</h1>
      <p className="mt-2 text-sm" style={{ color: "rgba(255, 255, 255, 0.85)" }}>{bio}</p>
    </div>
  )
}
