"use client"

import { motion } from "framer-motion"
import { ChevronRight, type LucideIcon } from "lucide-react"

interface LinkCardProps {
  title: string
  description?: string
  href: string
  icon?: LucideIcon
  image?: string
}

export function LinkCard({ title, description, href, icon: Icon, image }: LinkCardProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full items-center gap-4 rounded-[20px] px-4 py-4 overflow-hidden"
      style={{
        /* Warm amber-stone surface: cream highlight → soft mineral mid-tone */
        background: "linear-gradient(160deg, #FEFAF4 0%, #F5E9D4 65%, #EFE0C4 100%)",
        boxShadow: "0 6px 20px rgba(80, 40, 10, 0.24), inset 0 1px 0 rgba(255, 248, 235, 0.9), inset 0 -1px 0 rgba(180, 120, 50, 0.08)",
        border: "1px solid rgba(195, 140, 65, 0.22)",
      }}
      whileHover={{
        y: -2,
        boxShadow: "0 10px 28px rgba(80, 40, 10, 0.32), inset 0 1px 0 rgba(255, 248, 235, 0.9), inset 0 -1px 0 rgba(180, 120, 50, 0.08)",
      }}
      whileTap={{
        y: 0,
        boxShadow: "0 4px 12px rgba(80, 40, 10, 0.18), inset 0 1px 0 rgba(255, 248, 235, 0.9)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
      }}
    >
      <div
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden text-amber-900"
        style={{
          background: "#EDE2CA",
          border: "1px solid rgba(195, 140, 65, 0.14)",
        }}
      >
        {image ? (
          <>
            <img
              src={image}
              alt=""
              className="h-full w-full object-cover img-protected"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
            {/* Transparent overlay — absorbs right-click/drag on product thumbnails */}
            <div
              className="absolute inset-0 z-10"
              onContextMenu={(e) => e.preventDefault()}
              onDragStart={(e) => e.preventDefault()}
            />
          </>
        ) : Icon ? (
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        ) : null}
      </div>

      <div className="relative flex-1 min-w-0">
        <h3 className="text-[15px] font-semibold text-gray-800 tracking-tight leading-tight">{title}</h3>
        {description && <p className="text-[12px] text-gray-500 truncate mt-0.5">{description}</p>}
      </div>

      <ChevronRight
        className="relative h-5 w-5 transition-all duration-200 group-hover:translate-x-0.5"
        style={{ color: "rgba(155, 95, 35, 0.6)" }}
        strokeWidth={2}
      />
    </motion.a>
  )
}
