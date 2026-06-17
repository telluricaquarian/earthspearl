export function OceanBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      {/* Upgrade path: for true painted fidelity, drop a painterly ocean still at /public/ocean-base.webp and render it as the base layer (object-fit:cover) BENEATH the displacement svg; keep haze + grain + scrim on top. */}

      {/* Layer 1: Displaced gradient — fractal noise warps the gradient into painterly bands */}
      <div style={{ position: "absolute", inset: 0 }}>
        <svg width="100%" height="100%" preserveAspectRatio="none">
          <defs>
            <linearGradient id="oc" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#f3cdbe" />
              <stop offset="11%"  stopColor="#dcb6ad" />
              <stop offset="23%"  stopColor="#b5a6b3" />
              <stop offset="36%"  stopColor="#8593ac" />
              <stop offset="48%"  stopColor="#5878a0" />
              <stop offset="60%"  stopColor="#3a6088" />
              <stop offset="71%"  stopColor="#284a6e" />
              <stop offset="82%"  stopColor="#1b3a56" />
              <stop offset="91%"  stopColor="#112740" />
              <stop offset="100%" stopColor="#0a1827" />
            </linearGradient>
            <filter id="paint" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.009 0.022"
                numOctaves={4}
                seed={11}
                result="t"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="t"
                scale={30}
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>
          </defs>
          {/* Rect oversized by 12% on each side so displacement never exposes transparent edges */}
          <rect
            x="-12%"
            y="-12%"
            width="124%"
            height="124%"
            fill="url(#oc)"
            filter="url(#paint)"
          />
        </svg>
      </div>

      {/* Layer 2: Painterly haze — low-freq noise in soft-light adds tonal variation */}
      <div style={{ position: "absolute", inset: 0, mixBlendMode: "soft-light", opacity: 0.6 }}>
        <svg width="100%" height="100%">
          <defs>
            <filter id="haze">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.013 0.02"
                numOctaves={3}
                seed={4}
                stitchTiles="stitch"
              />
              <feColorMatrix type="saturate" values="0" />
            </filter>
          </defs>
          <rect width="100%" height="100%" filter="url(#haze)" />
        </svg>
      </div>

      {/* Layer 3: Coarse grain — higher baseFrequency, overlay blend for texture punch */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          mixBlendMode: "overlay",
          opacity: 0.5,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23g)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 4: Bottom scrim — legibility for white text over dark lower half */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "55%",
          background:
            "linear-gradient(180deg, rgba(6,13,22,0) 0%, rgba(6,13,22,0.3) 55%, rgba(6,13,22,0.72) 100%)",
        }}
      />
    </div>
  )
}
