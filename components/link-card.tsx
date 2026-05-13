"use client"

import { motion } from "framer-motion"
import { ChevronRight, type LucideIcon } from "lucide-react"

interface LinkCardProps {
  title: string
  description?: string
  href: string
  mode?: "light" | "dark"
  icon?: LucideIcon
  image?: string
}

const cardStyles = {
  light: {
    background: "linear-gradient(160deg, #FEFAF4 0%, #F5E9D4 65%, #EFE0C4 100%)",
    boxShadow: "0 6px 20px rgba(80, 40, 10, 0.24), inset 0 1px 0 rgba(255, 248, 235, 0.9), inset 0 -1px 0 rgba(180, 120, 50, 0.08)",
    border: "1px solid rgba(195, 140, 65, 0.22)",
    hoverShadow: "0 10px 28px rgba(80, 40, 10, 0.32), inset 0 1px 0 rgba(255, 248, 235, 0.9), inset 0 -1px 0 rgba(180, 120, 50, 0.08)",
    tapShadow: "0 4px 12px rgba(80, 40, 10, 0.18), inset 0 1px 0 rgba(255, 248, 235, 0.9)",
    iconBackground: "#EDE2CA",
    iconBorder: "1px solid rgba(195, 140, 65, 0.14)",
    title: "#1F2937",
    description: "#6B7280",
    arrow: "rgba(155, 95, 35, 0.6)",
    image: "/earthspearlblack.png",
    iconClassName: "text-amber-900",
  },
  dark: {
    background: "linear-gradient(160deg, #21160F 0%, #17110D 62%, #100B08 100%)",
    boxShadow: "0 10px 28px rgba(16, 9, 5, 0.32), inset 0 1px 0 rgba(245, 234, 215, 0.08), inset 0 -1px 0 rgba(196, 154, 108, 0.08)",
    border: "1px solid rgba(245, 234, 215, 0.5)",
    hoverShadow: "0 14px 34px rgba(16, 9, 5, 0.42), inset 0 1px 0 rgba(245, 234, 215, 0.12), inset 0 -1px 0 rgba(196, 154, 108, 0.12)",
    tapShadow: "0 6px 18px rgba(16, 9, 5, 0.28), inset 0 1px 0 rgba(245, 234, 215, 0.1)",
    iconBackground: "rgba(245, 234, 215, 0.08)",
    iconBorder: "1px solid rgba(245, 234, 215, 0.16)",
    title: "#F5EAD7",
    description: "#CBB89E",
    arrow: "#C49A6C",
    image: "/earthspearlcream.png",
    iconClassName: "text-amber-100",
  },
}

export function LinkCard({ title, description, href, mode = "light", icon: Icon }: LinkCardProps) {
  const styles = cardStyles[mode]

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex w-full items-center gap-4 rounded-[20px] px-4 py-4 overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#241208]"
      style={{
        background: styles.background,
        boxShadow: styles.boxShadow,
        border: styles.border,
      }}
      whileHover={{
        y: -2,
        boxShadow: styles.hoverShadow,
      }}
      whileTap={{
        y: 0,
        boxShadow: styles.tapShadow,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 35,
      }}
    >
      <div
        className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl overflow-hidden ${styles.iconClassName}`}
        style={{
          background: styles.iconBackground,
          border: styles.iconBorder,
        }}
      >
        {styles.image ? (
          <>
            <img
              src={styles.image}
              alt=""
              className="h-full w-full object-contain p-2 img-protected"
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
        <h3 className="text-[15px] font-semibold tracking-tight leading-tight" style={{ color: styles.title }}>{title}</h3>
        {description && <p className="text-[12px] truncate mt-0.5" style={{ color: styles.description }}>{description}</p>}
      </div>

      <ChevronRight
        className="relative h-5 w-5 transition-all duration-200 group-hover:translate-x-0.5"
        style={{ color: styles.arrow }}
        strokeWidth={2}
      />
    </motion.a>
  )
}
