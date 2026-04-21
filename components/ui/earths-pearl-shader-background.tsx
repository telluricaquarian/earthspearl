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

  float hash(vec2 p) {
    p = fract(p * vec2(127.34, 311.78));
    p += dot(p, p + 48.23);
    return fract(p.x * p.y);
  }

  float smoothNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * f * (f * (f * 6.0 - 15.0) + 10.0);
    return mix(
      mix(hash(i),                hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }

  float fbm(vec2 p) {
    float v   = 0.0;
    float amp = 0.5;
    mat2  m   = mat2(1.6,  1.2, -1.2, 1.6);
    for (int i = 0; i < 5; i++) {
      v   += amp * smoothNoise(p);
      p    = m * p;
      amp *= 0.5;
    }
    return v;
  }

  void main() {
    vec2  uv     = gl_FragCoord.xy / uResolution.xy;
    float aspect = uResolution.x / uResolution.y;
    float t      = uTime * 0.016;

    vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 2.4;

    // Two-stage domain warp — creates organic, paper-like depth
    vec2 q = vec2(
      fbm(p + t * vec2( 0.8,  0.6)),
      fbm(p + t * vec2(-0.5,  0.9) + vec2(3.2, 1.7))
    );
    vec2 r = vec2(
      fbm(p + q * 1.15 + t * 0.35 + vec2(1.7, 9.2)),
      fbm(p + q * 0.90 - t * 0.28 + vec2(8.3, 2.8))
    );

    float f = fbm(p + r * 0.9);

    // Earths Pearl brown palette
    vec3 darkBase  = vec3(0.141, 0.071, 0.031); // #241208
    vec3 coreBrown = vec3(0.231, 0.125, 0.043); // #3B200B
    vec3 warmAmber = vec3(0.416, 0.204, 0.086); // #6A3416
    vec3 caramel   = vec3(0.541, 0.290, 0.133); // #8A4A22
    vec3 creamHaze = vec3(0.957, 0.906, 0.847); // #F4E7D8

    // Soft graduated color blend driven by fbm depth
    vec3 color = darkBase;
    color = mix(color, coreBrown, smoothstep(0.22, 0.52, f));
    color = mix(color, warmAmber, smoothstep(0.44, 0.70, f) * 0.68);
    color = mix(color, caramel,   smoothstep(0.58, 0.80, f) * 0.40);
    color = mix(color, creamHaze, smoothstep(0.70, 0.88, f) * 0.13);

    // Radial vignette — deepens edges, pulls eye to center
    float dist     = length(uv - 0.5) * 1.55;
    float vignette = 1.0 - smoothstep(0.28, 1.05, dist);
    vignette       = pow(vignette, 1.3);
    color          = mix(darkBase * 0.65, color, vignette);

    // Soft cream breath from top-center — feminine warmth
    float topBloom = (1.0 - uv.y) * exp(-pow((uv.x - 0.5) * 3.2, 2.0));
    color += creamHaze * topBloom * 0.055;

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
