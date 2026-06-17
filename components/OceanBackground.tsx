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
      {/* Upgrade path: drop a painterly ocean still at /public/ocean-base.webp and render it here as the bottom layer (object-fit:cover, full-bleed) beneath this gradient; keep grain + pearl fade on top. */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #f7e3d6 0%, #f1cdbe 9%, #d7b2ac 18%, #9fa6b8 30%, #6f8aa8 41%, #3f6f97 52%, #2b5e8a 63%, #214f78 75%, #1b4566 88%, #173b58 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: "49%",
          height: "14%",
          background:
            "linear-gradient(180deg, rgba(247,232,220,0.55), rgba(247,232,220,0))",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "50%",
          background:
            "repeating-linear-gradient(180deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, rgba(255,255,255,0) 1px, rgba(255,255,255,0) 7px)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          mixBlendMode: "overlay",
          opacity: 0.42,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "42%",
          background:
            "linear-gradient(180deg, rgba(247,238,240,0) 0%, rgba(247,238,240,0.45) 40%, rgba(248,236,238,0.9) 72%, #f8ecee 100%)",
        }}
      />
    </div>
  )
}
