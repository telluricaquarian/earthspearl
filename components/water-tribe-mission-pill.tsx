"use client"

import { useState } from "react"
import { WaterTribeModal } from "./water-tribe-modal"

export function WaterTribeMissionPill({ mode = "light" }: { mode?: "light" | "dark" }) {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="mt-5 flex justify-center px-1">
      <WaterTribeModal open={modalOpen} onOpenChange={setModalOpen} />
      <button
        type="button"
        aria-label="Access Water Tribe Mission"
        onClick={() => setModalOpen(true)}
        className="group relative inline-flex h-11 max-w-full items-center justify-center gap-2.5 rounded-full px-5 text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        style={{
          background: "rgba(255, 255, 255, 0.10)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1px solid rgba(255, 255, 255, 0.20)",
          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.20), inset 0 1px 0 rgba(255, 255, 255, 0.18)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.16)"
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.10)"
        }}
      >
        <span
          className="flex h-6 w-6 items-center justify-center rounded-full"
          style={{
            background: "rgba(255, 255, 255, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
          }}
        >
          <span
            aria-hidden="true"
            className="img-protected block h-full w-full"
            style={{
              background: "rgba(255, 255, 255, 0.90)",
              maskImage: 'url("/wtmb.png")',
              maskPosition: "center",
              maskRepeat: "no-repeat",
              maskSize: "contain",
              WebkitMaskImage: 'url("/wtmb.png")',
              WebkitMaskPosition: "center",
              WebkitMaskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
            }}
          />
        </span>
        <span className="text-[13.5px] font-medium">Access Water Tribe Mission</span>
      </button>
    </div>
  )
}
