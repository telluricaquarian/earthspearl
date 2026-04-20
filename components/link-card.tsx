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
        background: "linear-gradient(180deg, #FFFFFF 0%, #F7F7F7 100%)",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
      }}
      whileHover={{
        y: -2,
        boxShadow: "0 10px 28px rgba(0, 0, 0, 0.32), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      whileTap={{
        y: 0,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.05)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
      }}
    >
      <div
        className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden text-gray-700"
        style={{
          background: "#F2F2F2",
          border: "1px solid rgba(0, 0, 0, 0.06)",
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
        <h3
          className="text-[16px] text-gray-800 tracking-normal leading-tight"
          style={{ fontFamily: "var(--font-redaction)", fontStyle: "italic" }}
        >{title}</h3>
        {description && <p className="text-[12px] text-gray-500 truncate mt-0.5">{description}</p>}
      </div>

      <ChevronRight
        className="relative h-5 w-5 text-gray-400 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-gray-600"
        strokeWidth={2}
      />
    </motion.a>
  )
}
