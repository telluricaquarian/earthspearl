"use client"

import Beams from './Beams'

export function BeamsBackground() {
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}>
      <Beams
        beamWidth={3}
        beamHeight={30}
        beamNumber={6}
        lightColor="#92620A"
        speed={2}
        noiseIntensity={1.75}
        scale={0.2}
        rotation={30}
      />
    </div>
  )
}
