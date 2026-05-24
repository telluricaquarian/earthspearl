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
        className="group relative inline-flex h-11 max-w-full items-center justify-center gap-2.5 rounded-full bg-[#f5ead7] px-5 text-zinc-900 shadow-sm transition hover:bg-[#efe1c8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f5ead7]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/90">
          <span
            aria-hidden="true"
            className="img-protected block h-full w-full"
            style={{
              background: "#f5ead7",
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
