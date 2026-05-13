"use client"

import { useEffect, useState } from "react"

const introStorageKey = "earthspearl-intro-seen"

export function EarthsPearlLoader() {
  const [shouldRender, setShouldRender] = useState(true)

  useEffect(() => {
    try {
      if (window.sessionStorage.getItem(introStorageKey) === "true") {
        setShouldRender(false)
        return
      }

      window.sessionStorage.setItem(introStorageKey, "true")
    } catch {
      // Storage can be unavailable in some private browsing contexts.
    }

    const timer = window.setTimeout(() => {
      setShouldRender(false)
    }, 1900)

    return () => window.clearTimeout(timer)
  }, [])

  if (!shouldRender) {
    return null
  }

  return (
    <div className="earths-pearl-intro" aria-hidden="true">
      <div className="earths-pearl-intro__glow" />
      <img
        src="/earthspearlcream.png"
        alt=""
        className="earths-pearl-intro__mark img-protected"
        draggable={false}
      />
      <style>{`
        .earths-pearl-intro {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          overflow: hidden;
          background:
            radial-gradient(circle at 50% 44%, rgba(196, 154, 108, 0.2), transparent 30%),
            linear-gradient(160deg, #2a160c 0%, #17110d 54%, #0f0906 100%);
          animation: earthsPearlIntroFade 1.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .earths-pearl-intro__glow {
          position: absolute;
          width: min(54vw, 260px);
          aspect-ratio: 1;
          border-radius: 9999px;
          background: radial-gradient(circle, rgba(245, 234, 215, 0.26), rgba(196, 154, 108, 0.12) 42%, transparent 68%);
          filter: blur(10px);
          opacity: 0;
          transform: scale(0.72);
          animation: earthsPearlGlow 1.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        .earths-pearl-intro__mark {
          position: relative;
          width: 96px;
          height: 92px;
          object-fit: contain;
          transform-origin: 50% 58%;
          opacity: 0;
          filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.28));
          animation: earthsPearlReveal 1.45s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @keyframes earthsPearlIntroFade {
          0% {
            opacity: 1;
            visibility: visible;
          }
          72% {
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }

        @keyframes earthsPearlReveal {
          0% {
            opacity: 0;
            transform: translateY(8px) scaleX(0.92) scaleY(0.54) rotate(-2deg);
          }
          34% {
            opacity: 1;
          }
          68% {
            transform: translateY(0) scaleX(1.03) scaleY(1.02) rotate(1deg);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scaleX(1) scaleY(1) rotate(0deg);
          }
        }

        @keyframes earthsPearlGlow {
          0% {
            opacity: 0;
            transform: scale(0.72);
          }
          48% {
            opacity: 1;
          }
          100% {
            opacity: 0.64;
            transform: scale(1);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .earths-pearl-intro {
            animation: earthsPearlIntroFadeReduced 900ms ease-out forwards;
          }

          .earths-pearl-intro__glow,
          .earths-pearl-intro__mark {
            animation: none;
            opacity: 1;
            transform: none;
          }
        }

        @keyframes earthsPearlIntroFadeReduced {
          0% {
            opacity: 1;
            visibility: visible;
          }
          100% {
            opacity: 0;
            visibility: hidden;
          }
        }
      `}</style>
    </div>
  )
}
