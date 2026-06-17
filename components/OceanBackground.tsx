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
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, #f7e3d6 0%, #f1cdbe 8%, #d9b6b0 16%, #b3a9b8 26%, #8294ad 37%, #5878a0 48%, #3a6088 58%, #284a6e 68%, #1b3a56 78%, #122a40 87%, #0a1827 94%, #060d16 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 62% 26% at 50% 13%, rgba(247,225,220,0.42), rgba(247,225,220,0) 70%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          mixBlendMode: "overlay",
          opacity: 0.42,
          pointerEvents: "none",
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "55%",
          pointerEvents: "none",
          background:
            "linear-gradient(180deg, rgba(6,13,22,0) 0%, rgba(6,13,22,0.3) 55%, rgba(6,13,22,0.72) 100%)",
        }}
      />
    </div>
  )
}
