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

  // ── Noise helpers (used only for subtle surface texture) ──────────────────

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

  // 3-octave fbm — kept light on purpose; used only as surface breath
  float fbm3(vec2 p) {
    float v = 0.0, a = 0.5;
    for (int i = 0; i < 3; i++) {
      v += a * noise(p);
      p  = p * 2.1 + vec2(3.1, 1.7);
      a *= 0.5;
    }
    return v;
  }

  // ── Gaussian soft-light helper ─────────────────────────────────────────────

  float glow(vec2 fragP, vec2 center, float spread) {
    float d = length(fragP - center);
    return exp(-d * d * spread);
  }

  // ── Main ───────────────────────────────────────────────────────────────────

  void main() {
    vec2  uv     = gl_FragCoord.xy / uResolution.xy;
    float aspect = uResolution.x / uResolution.y;
    float t      = uTime;

    // Aspect-corrected centered coords — circles stay circular at any viewport
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

    // ── Animated light positions ──────────────────────────────────────────────
    //
    // Primary glow: slow lemniscate — horizontal sweep, floats above centre.
    // p.y offset +0.10 → uv.y ≈ 0.60, ranging up to 0.21 (upper-mid field).
    float ta = t * 0.20;
    vec2  posA = vec2(
      sin(ta)        * 0.17,
      sin(ta * 0.65) * 0.11 + 0.10
    );

    // Secondary glow: slower counter-movement, upper quadrant.
    float tb = t * 0.12;
    vec2  posB = vec2(
      cos(tb + 1.1)        * 0.22,
      sin(tb * 0.75 + 2.3) * 0.13 + 0.15
    );

    // Lower anchor: very slow — keeps the lower field warm without dominating.
    float tc = t * 0.07;
    vec2  posC = vec2(
      sin(tc + 0.5) * 0.14,
      cos(tc * 1.2) * 0.08 - 0.14
    );

    // Static upper-field ambient — guarantees warmth in the top region at all
    // times, independent of where the animated zones happen to be.
    vec2  posTop = vec2(0.0, 0.22);

    // ── Light intensities (Gaussian falloff) ──────────────────────────────────
    float glowA   = glow(p, posA,   6.2);            // primary — crisp, warm centre
    float glowB   = glow(p, posB,   3.0) * 0.60;    // secondary — broader, upper field
    float glowC   = glow(p, posC,   2.6) * 0.32;    // anchor — lower warmth, subtle
    float glowTop = glow(p, posTop, 3.2) * 0.44;    // static upper ambient

    // ── Surface texture: fbm as breath, not as structure ──────────────────────
    // Drifts at 0.007 × time — imperceptibly slow, organic only
    float tex    = fbm3(uv * 1.5 + t * 0.007);
    float texMod = (tex - 0.5) * 0.09;  // ± 4.5 % — barely visible

    // ── Earths Pearl brown palette ─────────────────────────────────────────────
    vec3 darkBase  = vec3(0.086, 0.043, 0.024); // #160B06  — deepest shadow
    vec3 deepBrown = vec3(0.141, 0.071, 0.031); // #241208  — base field
    vec3 coreBrown = vec3(0.231, 0.125, 0.043); // #3B200B  — mid lift
    vec3 warmAmber = vec3(0.416, 0.204, 0.086); // #6A3416  — glow field
    vec3 caramel   = vec3(0.541, 0.290, 0.133); // #8A4A22  — glow peak

    // ── Color assembly ────────────────────────────────────────────────────────
    vec3 color = deepBrown;

    // Static upper ambient: coreBrown base so top is never dead
    color = mix(color, coreBrown, glowTop);

    // Primary light zone: deepBrown → warmAmber, caramel at hot centre
    color = mix(color, warmAmber, glowA * 0.88);
    color = mix(color, caramel,   glowA * glowA * 0.58);

    // Secondary zone: warms upper field to warmAmber (softer than primary)
    color = mix(color, warmAmber, glowB * 0.65);

    // Lower anchor: coreBrown warmth — keeps bottom alive, never dominant
    color = mix(color, coreBrown, glowC);

    // Surface breath: very subtle noise lift/dip in coreBrown space
    color += coreBrown * texMod;
    color  = clamp(color, darkBase, caramel + 0.04);

    // ── Vignette — soft elliptical edge darkening ────────────────────────────
    // Wider smoothstep range + lower power = much softer falloff.
    // darkBase * 0.72 (not 0.50) ensures shadow floor is visible brown, not black.
    float vigDist  = length((uv - 0.5) * vec2(1.0, 0.88));
    float vignette = 1.0 - smoothstep(0.30, 1.15, vigDist * 1.30);
    vignette       = pow(vignette, 1.1);
    color          = mix(darkBase * 0.72, color, vignette);

    // ── Top-centre warmth — ambient light falling from above ─────────────────
    // uv.y = 1 at TOP in WebGL (gl_FragCoord.y counts up from bottom).
    // pow(uv.y, ...) is max at the top and zero at the bottom — correct.
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
