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
      {/* Base background — deep warm brown */}
      <div
        className="fixed inset-0 z-0"
        style={{ background: "linear-gradient(135deg, #271508 0%, #3B200B 55%, #4A2A10 100%)" }}
      />

      {/* Animated gradient orbs */}
      {/* Orb 1 — warm amber, top-left */}
      <motion.div
        className="fixed z-0 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(210, 130, 45, 0.28) 0%, transparent 70%)",
          filter: "blur(60px)",
          top: "-10%",
          left: "-10%",
        }}
        animate={{
          x: [0, 100, 50, 0],
          y: [0, 50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Orb 2 — warm copper, right */}
      <motion.div
        className="fixed z-0 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(180, 85, 35, 0.22) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "30%",
          right: "-20%",
        }}
        animate={{
          x: [0, -80, -40, 0],
          y: [0, 80, -40, 0],
          scale: [1, 0.85, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Orb 3 — deep terracotta, bottom */}
      <motion.div
        className="fixed z-0 w-[450px] h-[450px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(155, 65, 25, 0.2) 0%, transparent 70%)",
          filter: "blur(70px)",
          bottom: "-5%",
          left: "20%",
        }}
        animate={{
          x: [0, 60, -30, 0],
          y: [0, -60, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Orb 4 — soft gold, left */}
      <motion.div
        className="fixed z-0 w-[350px] h-[350px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(225, 165, 55, 0.14) 0%, transparent 70%)",
          filter: "blur(50px)",
          top: "60%",
          left: "-5%",
        }}
        animate={{
          x: [0, 40, 80, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.2, 1, 1],
        }}
        transition={{
          duration: 22,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Animated shifting ellipses — warm highlight wash */}
      <motion.div
        className="fixed inset-0 z-0 pointer-events-none opacity-60"
        animate={{
          background: [
            "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(255,200,120,0.07), transparent 50%), radial-gradient(ellipse 60% 80% at 80% 70%, rgba(255,180,80,0.05), transparent 50%)",
            "radial-gradient(ellipse 80% 60% at 50% 20%, rgba(255,200,120,0.07), transparent 50%), radial-gradient(ellipse 60% 80% at 30% 80%, rgba(255,180,80,0.05), transparent 50%)",
            "radial-gradient(ellipse 80% 60% at 80% 40%, rgba(255,200,120,0.07), transparent 50%), radial-gradient(ellipse 60% 80% at 60% 60%, rgba(255,180,80,0.05), transparent 50%)",
            "radial-gradient(ellipse 80% 60% at 20% 30%, rgba(255,200,120,0.07), transparent 50%), radial-gradient(ellipse 60% 80% at 80% 70%, rgba(255,180,80,0.05), transparent 50%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />


      {/* Atmospheric vignette — soft edge depth, draws focus to center */}
      <div
        className="pointer-events-none fixed inset-0 z-[1]"
        style={{
          background: "radial-gradient(ellipse 110% 90% at 50% 44%, transparent 28%, rgba(8, 3, 1, 0.55) 100%)",
        }}
      />

      {/* Primary organic grain — earthy coarse texture */}
      <div
        className="pointer-events-none fixed inset-0 z-[2]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g1'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.62' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g1)'/%3E%3C/svg%3E")`,
          opacity: 0.06,
        }}
      />

      {/* Fine film grain — secondary pass for layered tactile depth */}
      <div
        className="pointer-events-none fixed inset-0 z-[3]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 128 128' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g2'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.88' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g2)'/%3E%3C/svg%3E")`,
          opacity: 0.032,
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
