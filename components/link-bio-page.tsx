"use client"

import { motion } from "framer-motion"
import { ProfileSection } from "./profile-section"
import { LinkCard } from "./link-card"
import { SocialFooter } from "./social-footer"
import { TestimonialMarquee } from "./testimonial-marquee"
import { Microscope, Droplets } from "lucide-react"

const sections = [
  {
    label: "START WITH YOUR WATER",
    subtext: "Education, testing, and cleaner-water options",
    links: [
      {
        title: "FREE WHATS IN YOUR WATER TEST",
        href: "https://www.ewg.org/tapwater/",
        icon: Droplets,
      },
      {
        title: "ELECTROLYZED REDUCED WATER RESEARCH",
        href: "https://hydrogenstudies.com/",
        icon: Microscope,
      },
      {
        title: "NSF WATER FILTER ($30 off with this link)",
        href: "https://www.multipure.com/products/drinking-water-systems/aquaperform/?coupon=435441",
        image: "/images/nsf-water-filter.jpg",
      },
      {
        title: "11% OFF BLUE BOTTLES",
        href: "https://bluebottlelove.com/?ref=840",
        image: "/images/blue-bottles.png",
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
        image: "/images/tallow-butter.jpg",
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
  return (
    <main className="relative min-h-screen px-6 py-10 flex flex-col overflow-hidden">
      {/* Base — warm paper ground, lighter center radiates outward to deep edges */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: "radial-gradient(ellipse 140% 100% at 50% 38%, #4D2410 0%, #3B200B 48%, #1F0B04 100%)",
        }}
      />

      {/* Blob A — large warm sienna atmosphere, drifts slowly from top-left */}
      <motion.div
        className="fixed z-0 pointer-events-none"
        style={{
          width: "140vw",
          height: "140vw",
          background: "radial-gradient(circle, rgba(148, 68, 20, 0.38) 0%, transparent 60%)",
          filter: "blur(90px)",
          top: "-35%",
          left: "-30%",
        }}
        animate={{
          x: [0, 70, 25, 0],
          y: [0, 55, 110, 0],
        }}
        transition={{
          duration: 55,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Blob B — deep ochre pool, drifts slowly from bottom-right */}
      <motion.div
        className="fixed z-0 pointer-events-none"
        style={{
          width: "130vw",
          height: "130vw",
          background: "radial-gradient(circle, rgba(110, 50, 16, 0.35) 0%, transparent 58%)",
          filter: "blur(110px)",
          bottom: "-35%",
          right: "-30%",
        }}
        animate={{
          x: [0, -55, -18, 0],
          y: [0, -45, -95, 0],
        }}
        transition={{
          duration: 65,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Blob C — soft amber center warmth, breathes slowly */}
      <motion.div
        className="fixed z-0 pointer-events-none"
        style={{
          width: "80vw",
          height: "80vw",
          background: "radial-gradient(circle, rgba(182, 100, 32, 0.14) 0%, transparent 65%)",
          filter: "blur(75px)",
          top: "8%",
          left: "10%",
        }}
        animate={{
          scale: [1, 1.08, 0.96, 1],
          y: [0, -25, 18, 0],
        }}
        transition={{
          duration: 38,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Vignette — soft warm framing, lighter than before */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse 130% 105% at 50% 46%, transparent 32%, rgba(8, 3, 1, 0.45) 100%)",
        }}
      />

      {/* Paper texture — single pass, near-invisible, purely tactile */}
      <div
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 900 900' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.45' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          opacity: 0.02,
          filter: "blur(0.6px)",
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 mx-auto max-w-[400px] w-full flex flex-col flex-1 justify-between"
      >
        <motion.div variants={itemVariants} className="pt-2">
          <ProfileSection
            name="Meghan Giudice"
            bio="🐚 helping women build sustainable businesses the feminine way"
            imageUrl="/earthspearldisplay.png"
          />
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
                    <LinkCard {...link} />
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
