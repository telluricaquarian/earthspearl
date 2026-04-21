"use client";

export default function EarthsPearlBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">

      {/* Darkest base */}
      <div className="absolute inset-0 bg-[#241208]" />

      {/* Core brown center — lifts the mid-page */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 40%, #3B200B 0%, transparent 68%)",
        }}
      />

      {/* Warm amber bloom — upper-center, wide and soft */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 48% 12%, #6A3416 0%, transparent 60%)",
          opacity: 0.45,
        }}
      />

      {/* Caramel accent — lower-right corner warmth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 85% 90%, #8A4A22 0%, transparent 58%)",
          opacity: 0.28,
        }}
      />

      {/* Dark vignette — edges and bottom */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 110% 50% at 50% 105%, #241208 0%, transparent 55%)",
          opacity: 0.9,
        }}
      />

      {/* Side vignette — left edge */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(18, 7, 2, 0.55) 0%, transparent 28%)",
        }}
      />

      {/* Side vignette — right edge */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to left, rgba(18, 7, 2, 0.55) 0%, transparent 28%)",
        }}
      />

      {/* Soft cream highlight — top-center breath */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 45% 22% at 50% 0%, rgba(255, 235, 210, 0.10) 0%, transparent 65%)",
        }}
      />

    </div>
  );
}
