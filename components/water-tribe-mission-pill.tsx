"use client"

import { useState } from "react"
import { WaterTribeModal } from "./water-tribe-modal"

const lightSurface = {
  background: "linear-gradient(160deg, #FEFAF4 0%, #F5E9D4 65%, #EFE0C4 100%)",
  border: "1px solid rgba(195, 140, 65, 0.22)",
  boxShadow:
    "0 6px 20px rgba(80, 40, 10, 0.24), inset 0 1px 0 rgba(255, 248, 235, 0.9), inset 0 -1px 0 rgba(180, 120, 50, 0.08)",
}

const lightRing = {
  background:
    "linear-gradient(115deg, rgba(195,140,65,0.30), rgba(195,140,65,0.50), rgba(180,120,50,0.40), rgba(155,95,35,0.25), rgba(195,140,65,0.30))",
  backgroundSize: "220% 220%",
  boxShadow: "0 0 12px rgba(195,140,65,0.15), inset 0 0 0 1px rgba(195,140,65,0.22)",
}

export function WaterTribeMissionPill({ mode = "light" }: { mode?: "light" | "dark" }) {
  const isLight = mode === "light"
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="mt-5 flex justify-center px-1">
      <WaterTribeModal open={modalOpen} onOpenChange={setModalOpen} />
      <button
        type="button"
        aria-label="Access Water Tribe Mission"
        className="water-tribe-pill"
        style={isLight ? { color: "#1F2937" } : undefined}
        onClick={() => setModalOpen(true)}
      >
        <span className="water-tribe-pill__ring" aria-hidden="true" style={isLight ? lightRing : undefined} />
        <span className="water-tribe-pill__surface" style={isLight ? lightSurface : undefined}>
          <span
            className="water-tribe-pill__icon img-protected"
            aria-hidden="true"
            style={isLight ? { background: "#000000" } : undefined}
          />
          <span
            className="water-tribe-pill__text"
            style={isLight ? { color: "#1F2937", textShadow: "none" } : undefined}
          >Access Water Tribe Mission</span>
        </span>
      </button>

      <style jsx>{`
        .water-tribe-pill {
          position: relative;
          display: inline-flex;
          height: 46px;
          max-width: 100%;
          border: 0;
          border-radius: 9999px;
          padding: 0;
          background: transparent;
          color: #f5ead7;
          cursor: pointer;
          isolation: isolate;
        }

        .water-tribe-pill__ring {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background:
            linear-gradient(
              115deg,
              rgba(245, 234, 215, 0.32),
              rgba(245, 234, 215, 0.5),
              rgba(203, 184, 158, 0.42),
              rgba(196, 154, 108, 0.26),
              rgba(245, 234, 215, 0.32)
            );
          background-size: 220% 220%;
          box-shadow:
            0 0 18px rgba(245, 234, 215, 0.1),
            inset 0 0 0 1px rgba(245, 234, 215, 0.16);
          animation: waterTribePillSheen 10s ease-in-out infinite;
        }

        .water-tribe-pill__surface {
          position: relative;
          z-index: 1;
          display: flex;
          height: calc(100% - 2px);
          align-items: center;
          gap: 10px;
          margin: 1px;
          border-radius: inherit;
          padding: 0 18px 0 12px;
          background: linear-gradient(160deg, #21160f 0%, #17110d 62%, #100b08 100%);
          border: 1px solid rgba(245, 234, 215, 0.08);
          box-shadow:
            0 10px 28px rgba(16, 9, 5, 0.32),
            inset 0 1px 0 rgba(245, 234, 215, 0.08),
            inset 0 -1px 0 rgba(196, 154, 108, 0.08);
        }

        .water-tribe-pill__icon {
          height: 28px;
          width: 28px;
          flex: 0 0 auto;
          padding: 2px;
          background: #f5ead7;
          mask-image: url("/wtmb.png");
          mask-position: center;
          mask-repeat: no-repeat;
          mask-size: contain;
          -webkit-mask-image: url("/wtmb.png");
          -webkit-mask-position: center;
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-size: contain;
        }

        .water-tribe-pill__text {
          color: #f5ead7;
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 0.01em;
          line-height: 1;
          white-space: nowrap;
          text-shadow: 0 1px 10px rgba(245, 234, 215, 0.1);
        }

        .water-tribe-pill:focus-visible {
          outline: 2px solid rgba(245, 234, 215, 0.66);
          outline-offset: 3px;
        }

        @keyframes waterTribePillSheen {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @media (max-width: 420px) {
          .water-tribe-pill {
            height: 44px;
          }

          .water-tribe-pill__surface {
            gap: 9px;
            padding: 0 15px 0 10px;
          }

          .water-tribe-pill__icon {
            height: 26px;
            width: 26px;
          }

          .water-tribe-pill__text {
            font-size: 13.5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .water-tribe-pill__ring {
            animation: none;
            background-position: 50% 50%;
          }
        }
      `}</style>
    </div>
  )
}
