"use client"

import { motion } from "framer-motion"
import { ProfileSection } from "./profile-section"
import { LinkCard } from "./link-card"
import { SocialFooter } from "./social-footer"
import { TestimonialMarquee } from "./testimonial-marquee"
import EarthsPearlShaderBackground from "./ui/earths-pearl-shader-background"
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
    <main className="relative min-h-screen px-6 py-10 flex flex-col">
      <EarthsPearlShaderBackground />

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
