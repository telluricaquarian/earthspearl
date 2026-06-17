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
    backdropFilter: "",
    WebkitBackdropFilter: "",
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
    hoverBackground: "linear-gradient(160deg, #FEFCF8 0%, #F7EBD8 65%, #F1E2C8 100%)",
  },
  dark: {
    background: "rgba(255,255,255,0.66)",
    backdropFilter: "blur(14px)",
    WebkitBackdropFilter: "blur(14px)",
    boxShadow: "0 4px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.9)",
    border: "0.5px solid rgba(255,255,255,0.85)",
    hoverShadow: "0 8px 24px rgba(0,0,0,0.16), inset 0 1px 0 rgba(255,255,255,0.9)",
    hoverBackground: "rgba(255,255,255,0.78)",
    tapShadow: "0 2px 8px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
    iconBackground: "rgba(0,0,0,0.05)",
    iconBorder: "1px solid rgba(0,0,0,0.08)",
    title: "#16181d",
    description: "rgba(22,24,29,0.6)",
    arrow: "rgba(22,24,29,0.55)",
    image: "/earthspearlblack.png",
    iconClassName: "",
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
        backdropFilter: styles.backdropFilter,
        WebkitBackdropFilter: styles.WebkitBackdropFilter,
        boxShadow: styles.boxShadow,
        border: styles.border,
      }}
      whileHover={{
        y: -2,
        boxShadow: styles.hoverShadow,
        background: styles.hoverBackground,
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
