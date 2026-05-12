'use client';

import { useEffect, useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

/**
 * Amber-marble MeshGradient motion base.
 *
 * All four color stops are pulled from existing palette tokens already in use
 * in earths-pearl-shader-background.tsx and link-card.tsx — no new colors.
 * Sits at z-0 under the GLSL amber treatment (z-2, opacity 0.9) and the
 * cream wash damper (z-1). Net contribution to the final composite: ~10%.
 */
export function ShaderBackdrop() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return (
    <MeshGradient
      colors={[
        '#241208', // deepBrown — GLSL shader base field
        '#8A4A22', // caramel  — GLSL amber glow peak
        '#EDE2CA', // warm sand — card thumbnail container bg
        '#FEFAF4', // cream    — card surface base
      ]}
      distortion={1.0}
      swirl={0.8}
      speed={reduced ? 0 : 0.2}
      grainMixer={0}
      grainOverlay={0}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
      }}
    />
  );
}
