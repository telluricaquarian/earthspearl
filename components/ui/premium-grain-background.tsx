"use client";

export default function PremiumGrainBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Base color */}
      <div className="absolute inset-0 bg-[#3B200B]" />

      {/* Soft lighting (depth) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.06),transparent_40%),radial-gradient(circle_at_70%_80%,rgba(0,0,0,0.35),transparent_50%)]" />

      {/* Fine grain */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08] mix-blend-overlay">
        <filter id="noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* Ultra fine grain (adds crispness) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04] mix-blend-soft-light">
        <filter id="noise2">
          <feTurbulence type="fractalNoise" baseFrequency="1.8" numOctaves="2" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise2)" />
      </svg>

    </div>
  );
}
