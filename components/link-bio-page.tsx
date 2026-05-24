"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { ProfileSection } from "./profile-section"
import { LinkCard } from "./link-card"
import { EarthsPearlLoader } from "./earths-pearl-loader"
import { SocialFooter } from "./social-footer"
import { TestimonialMarquee } from "./testimonial-marquee"
import { WaterTribeMissionPill } from "./water-tribe-mission-pill"

type CardMode = "light" | "dark"

const modeStorageKey = "earthspearl-card-mode"

const sections = [
  {
    label: "START WITH YOUR WATER",
    subtext: "Education, testing, and cleaner-water options",
    links: [
      {
        title: "FREE WHATS IN YOUR WATER TEST",
        href: "https://www.ewg.org/tapwater/",
      },
      {
        title: "ELECTROLYZED REDUCED WATER RESEARCH",
        href: "https://hydrogenstudies.com/",
      },
      {
        title: "NSF WATER FILTER ($30 off with this link)",
        href: "https://www.multipure.com/products/drinking-water-systems/aquaperform/?coupon=435441",
      },
      {
        title: "11% OFF BLUE BOTTLES",
        href: "https://bluebottlelove.com/?ref=840",
      },
    ],
  },
  {
    label: "SHOP EARTHS PEARL",
    subtext: "Shop recommended products",
    links: [
      {
        title: "HOMEMADE TALLOW BUTTERS",
        href: "http://earthspearlll.weebly.com/store/p109/earthspearlll.tallowbutter.html",
      },
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 350,
      damping: 25,
    },
  },
}

export function LinkBioPage() {
  const [cardMode, setCardMode] = useState<CardMode>("light")

  useEffect(() => {
    const savedMode = window.localStorage.getItem(modeStorageKey)

    if (savedMode === "light" || savedMode === "dark") {
      setCardMode(savedMode)
    }
  }, [])

  const toggleCardMode = () => {
    setCardMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light"

      window.localStorage.setItem(modeStorageKey, nextMode)

      return nextMode
    })
  }

  return (
    <main className="relative min-h-screen px-6 py-10 flex flex-col">
      <EarthsPearlLoader />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 mx-auto max-w-[400px] w-full flex flex-col flex-1 justify-between"
      >
        <button
          type="button"
          onClick={toggleCardMode}
          aria-label={`Switch to ${cardMode === "light" ? "dark" : "light"} card mode`}
          aria-pressed={cardMode === "dark"}
          className="absolute right-0 top-0 z-20 flex h-9 w-9 items-center justify-center rounded-full transition-colors motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-100/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#241208]"
          style={{
            background: "rgba(36, 18, 8, 0.48)",
            border: "1px solid rgba(245, 234, 215, 0.18)",
            color: "#F5EAD7",
            boxShadow: "inset 0 1px 0 rgba(245, 234, 215, 0.1), 0 8px 20px rgba(16, 9, 5, 0.18)",
          }}
        >
          {cardMode === "light" ? (
            <Moon className="h-4 w-4" strokeWidth={1.8} />
          ) : (
            <Sun className="h-4 w-4" strokeWidth={1.8} />
          )}
        </button>

        <motion.div variants={itemVariants} className="pt-2">
          <ProfileSection
            name="Meghan Giudice"
            bio="🐚 helping women build sustainable businesses the feminine way"
            imageUrl="/earthspearldisplay.png"
          />
          <WaterTribeMissionPill />
        </motion.div>

        <motion.div className="py-8 space-y-8" variants={containerVariants}>
          {sections.map((section) => (
            <motion.div key={section.label} variants={itemVariants}>
              <div className="mb-4 px-1">
                <p className="text-[11px] uppercase tracking-[0.15em] font-semibold text-white/65">
                  {section.label}
                </p>
                <p className="text-[12px] text-white/40 mt-1">
                  {section.subtext}
                </p>
              </div>
              {section.label === "SHOP EARTHS PEARL" && <TestimonialMarquee />}
              <div className="space-y-3">
                {section.links.map((link) => (
                  <motion.div key={link.title} variants={itemVariants}>
                    <LinkCard {...link} mode={cardMode} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div variants={itemVariants} className="pb-2">
          <SocialFooter />
        </motion.div>
      </motion.div>
    </main>
  )
}
