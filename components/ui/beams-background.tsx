"use client"

import { Beams } from "@paper-design/shaders-react"

export function BeamsBackground() {
  return (
    <Beams
      lightColor="#F59E0B"
      beamWidth={2}
      beamHeight={15}
      beamNumber={12}
      speed={2}
      noiseIntensity={1.5}
      scale={0.2}
      rotation={0}
      style={{ width: "100%", height: "100%" }}
    />
  )
}
