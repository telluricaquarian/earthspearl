"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  void main() {
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float;

  uniform float uTime;
  uniform vec2  uResolution;

  // ── Noise helpers ─────────────────────────────────────────────────────────

  float hash(vec2 p) {
    p = fract(p * vec2(127.34, 311.78));
    p += dot(p, p + 48.23);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i),              hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  // 3-octave fbm — intentionally light; used for surface texture only
  float fbm3(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(3.1, 1.7);
      a *= 0.5;
    }
    return v;
  }

  // Gaussian soft-light — models a soft area light source
  float glow(vec2 fragP, vec2 center, float spread) {
    float d = length(fragP - center);
    return exp(-d * d * spread);
  }

  // ── Main ──────────────────────────────────────────────────────────────────

  void main() {
    vec2  uv     = gl_FragCoord.xy / uResolution.xy;
    float aspect = uResolution.x / uResolution.y;
    float t      = uTime;

    // Aspect-corrected centred coords so circles stay circular
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    // ── Palette ───────────────────────────────────────────────────────────────
    vec3 darkBase  = vec3(0.086, 0.043, 0.024); // #160B06 — deepest shadow
    vec3 deepBrown = vec3(0.141, 0.071, 0.031); // #241208 — base field
    vec3 coreBrown = vec3(0.231, 0.125, 0.043); // #3B200B — mid lift
    vec3 warmAmber = vec3(0.416, 0.204, 0.086); // #6A3416 — glow field
    vec3 caramel   = vec3(0.541, 0.290, 0.133); // #8A4A22 — glow peak
    // Desaturated warm gold — used only at the absolute peak (< 6% influence)
    vec3 paleGold  = vec3(0.730, 0.560, 0.340);

    // ── FBM: two scales for layered surface variation ─────────────────────────
    //
    // Fine scale — organic glow-edge irregularity, fine surface breath
    float texFine  = fbm3(uv * 1.6 + t * 0.006);
    float modFine  = (texFine  - 0.5) * 0.07;   // ± 3.5 %
    //
    // Broad scale — large material variation (left/right tonal drift).
    // At uv * 0.5, one noise cycle spans 2 screen-widths, so within a single
    // viewport the tonal shift is slow and non-repeating.
    float texBroad = fbm3(uv * 0.50 + t * 0.004 + vec2(5.3, 2.1));
    float modBroad = (texBroad - 0.5) * 0.11;   // ± 5.5 %

    // ── Animated glow positions ───────────────────────────────────────────────
    //
    // posA — primary, floats upper-mid, slow lemniscate path
    float ta = t * 0.20;
    vec2  posA = vec2(sin(ta) * 0.17,  sin(ta * 0.65) * 0.11 + 0.10);

    // posB — secondary, upper quadrant, counter-drift to posA
    float tb = t * 0.12;
    vec2  posB = vec2(cos(tb + 1.1) * 0.22, sin(tb * 0.75 + 2.3) * 0.13 + 0.15);

    // posC — lower anchor, keeps the lower field alive
    float tc = t * 0.07;
    vec2  posC = vec2(sin(tc + 0.5) * 0.14, cos(tc * 1.2) * 0.08 - 0.14);

    // ── Light field construction — broad → specific ───────────────────────────
    //
    // Layer 1 · Environmental fill
    // Very wide (spread 0.95), low intensity — lifts the entire central volume
    // from deepBrown to coreBrown.  This is the "room feels warm" base that
    // eliminates the single-spotlight-in-darkness read.
    float envFill = glow(p, vec2(0.0, 0.06), 0.95) * 0.36;

    // Layer 2 · Horizontal depth-plane band
    // A wide ellipse at mid-height (uv.y ≈ 0.5).  Creates the impression of a
    // warm surface plane in depth rather than a purely 2-D light field.
    // p.y² × 9.0 → FWHM ≈ ±0.28 in p-space (uv.y 0.22 – 0.78 has presence).
    // p.x² × 0.55 → barely falls off horizontally, reads as a full-width band.
    float midBand = exp(-p.y * p.y * 9.0) * exp(-p.x * p.x * 0.55) * 0.28;

    // Layer 3 · Static upper ambient
    // Cooler than the main amber zones (maps to coreBrown, not warmAmber) so
    // the upper area feels atmospherically distinct — supported, not competing.
    float glowTop = glow(p, vec2(0.0, 0.22), 3.0) * 0.38;

    // Layer 4 · Primary glow
    // Spread reduced from 6.2 → 3.8: much broader, more environmental.
    // Fine FBM modulation gives organic (non-circular) glow edges.
    float glowA = glow(p, posA, 3.8) * (1.0 + modFine * 0.6);

    // Layer 5 · Secondary upper glow
    float glowB = glow(p, posB, 2.8) * 0.54;

    // Layer 6 · Lower anchor
    float glowC = glow(p, posC, 2.4) * 0.28;

    // ── Color assembly — broadest influence first ─────────────────────────────
    //
    // Base: blend of darkBase + deepBrown for a richer starting darkness
    vec3 color = mix(darkBase, deepBrown, 0.65);

    // Broad material variation — slow breathing tonal shift across whole frame.
    // Clamped to [0, 0.18] so it always adds a small lift, never subtracts.
    color = mix(color, coreBrown, clamp(modBroad + 0.06, 0.0, 0.18));

    // Environmental fill: central-volume lift to coreBrown
    color = mix(color, coreBrown, envFill);

    // Horizontal depth band: warmAmber in the mid-height plane
    color = mix(color, warmAmber, midBand * 0.55);

    // Upper ambient: coreBrown (cooler than amber — visible tonal separation)
    color = mix(color, coreBrown, glowTop);

    // Primary glow: warmAmber field, caramel peak, pale-gold hint at hot centre
    color = mix(color, warmAmber, glowA * 0.85);
    color = mix(color, caramel,   glowA * glowA * 0.52);
    color = mix(color, paleGold,  glowA * glowA * glowA * 0.055);

    // Secondary upper zone: warmAmber, softer register
    color = mix(color, warmAmber, glowB * 0.58);

    // Lower anchor: coreBrown warmth
    color = mix(color, coreBrown, glowC);

    // Fine surface texture: organic noise lift/dip
    color += coreBrown * modFine;
    color  = clamp(color, darkBase * 0.85, caramel + 0.06);

    // ── Mineral strata — amber-marble experiment ───────────────────────────────
    // Reuses texBroad (already computed) as a domain warp — zero extra fbm cost.
    // Sine through the warped domain produces long flowing strata that read as
    // polished dark mineral / amber stone rather than white-marble veining.
    float stratum     = sin((uv.x * 2.8 + uv.y * 1.6 + texBroad * 3.4) * 2.2);
    float mineralLine = smoothstep(0.86, 1.0, abs(stratum));
    color = mix(color, warmAmber * 0.82, mineralLine * 0.042);

    // ── Vignette ──────────────────────────────────────────────────────────────
    float vigDist  = length((uv - 0.5) * vec2(1.0, 0.88));
    float vignette = 1.0 - smoothstep(0.30, 1.15, vigDist * 1.30);
    vignette       = pow(vignette, 1.1);
    color          = mix(darkBase * 0.72, color, vignette);

    // ── Top bloom (uv.y = 1 at top in WebGL) ─────────────────────────────────
    float topBloom = exp(-pow((uv.x - 0.5) * 2.6, 2.0)) * pow(uv.y, 1.2);
    color          = mix(color, warmAmber, topBloom * 0.20);

    gl_FragColor = vec4(color, 1.0);
  }
`;

function ShaderPlane() {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0.0 },
      uResolution: { value: new THREE.Vector2(800, 600) },
    }),
    []
  );

  useFrame((state) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    matRef.current.uniforms.uResolution.value.set(
      state.size.width,
      state.size.height
    );
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

export default function EarthsPearlShaderBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      {/* Instant solid fallback shown before WebGL initialises */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#241208",
        }}
      />

      {mounted && (
        <Canvas
          camera={{ position: [0, 0, 1] }}
          gl={{ antialias: false, alpha: false }}
          dpr={[1, 1.5]}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          <ShaderPlane />
        </Canvas>
      )}
    </div>
  );
}
