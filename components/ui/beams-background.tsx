"use client"

import { useEffect, useRef } from "react"

interface BeamsProps {
  lightColor?: string
  beamWidth?: number
  beamHeight?: number
  beamNumber?: number
  speed?: number
  noiseIntensity?: number
  scale?: number
  rotation?: number
  style?: React.CSSProperties
}

function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "")
  const r = parseInt(c.slice(0, 2), 16) / 255
  const g = parseInt(c.slice(2, 4), 16) / 255
  const b = parseInt(c.slice(4, 6), 16) / 255
  return [r, g, b]
}

const VERT = `
  attribute vec4 a_position;
  void main() { gl_Position = a_position; }
`

const FRAG = `
  precision highp float;

  uniform float uTime;
  uniform vec2  uResolution;
  uniform vec3  uLightColor;
  uniform float uBeamWidth;
  uniform float uBeamHeight;
  uniform float uBeamNumber;
  uniform float uSpeed;
  uniform float uNoiseIntensity;
  uniform float uScale;
  uniform float uRotation;

  float hash(vec2 p) {
    p = fract(p * vec2(127.1, 311.7));
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

  void main() {
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    float aspect = uResolution.x / uResolution.y;
    float t = uTime * uSpeed * 0.18;

    // Centre, correct for aspect, rotate, un-correct
    vec2 p = uv - 0.5;
    p.x *= aspect;
    float cosR = cos(uRotation);
    float sinR = sin(uRotation);
    p = vec2(cosR * p.x - sinR * p.y, sinR * p.x + cosR * p.y);
    p.x /= aspect;
    p += 0.5;

    float accumLight = 0.0;
    float beamSpacing = 1.0 / uBeamNumber;

    // Width: beamWidth drives tightness; scale drives overall zoom
    float beamHalfW = uBeamWidth * uScale * beamSpacing * 0.45;

    for (float i = 0.0; i < 64.0; i++) {
      if (i >= uBeamNumber) break;

      float center = (i + 0.5) * beamSpacing;

      // Per-beam slow horizontal drift + noise wander
      float drift = sin(t * 0.6 + i * 1.9) * uNoiseIntensity * beamSpacing * 0.05;
      float wander = (noise(vec2(i * 1.7, t * 0.35)) - 0.5) * uNoiseIntensity * beamSpacing * 0.12;

      float dx = abs(p.x - center - drift - wander);
      float beamI = exp(-dx * dx / (beamHalfW * beamHalfW));

      // Vertical: beamHeight governs how far beams extend above/below 0.5
      float halfH = uBeamHeight * uScale * 0.28;
      float vy = (p.y - 0.5) / max(halfH, 0.001);
      float vertFade = exp(-vy * vy * 0.55);
      vertFade = pow(max(vertFade, 0.0), 0.4);

      // Shimmer along the beam length
      float shimmer = noise(vec2(i * 0.8, p.y * 4.0 + t * 2.2)) * 0.45 + 0.55;

      accumLight += beamI * vertFade * shimmer;
    }

    accumLight = clamp(accumLight, 0.0, 1.0);

    vec3 bgColor = vec3(0.059, 0.039, 0.0); // #0f0a00
    vec3 color   = mix(bgColor, uLightColor, accumLight * 0.70);

    // Soft vignette to anchor the edges
    vec2 vp = uv - 0.5;
    float vig = 1.0 - clamp(dot(vp, vp) * 2.8, 0.0, 1.0);
    color = mix(bgColor * 0.6, color, vig * 0.65 + 0.35);

    gl_FragColor = vec4(color, 1.0);
  }
`

export function BeamsBackground({
  lightColor = "#F59E0B",
  beamWidth = 2,
  beamHeight = 15,
  beamNumber = 12,
  speed = 2,
  noiseIntensity = 1.5,
  scale = 0.2,
  rotation = 0,
  style,
}: BeamsProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const gl = canvas.getContext("webgl")
    if (!gl) return

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!
      gl.shaderSource(s, src)
      gl.compileShader(s)
      return s
    }

    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW)

    const aPos = gl.getAttribLocation(prog, "a_position")
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = {
      time:           gl.getUniformLocation(prog, "uTime"),
      resolution:     gl.getUniformLocation(prog, "uResolution"),
      lightColor:     gl.getUniformLocation(prog, "uLightColor"),
      beamWidth:      gl.getUniformLocation(prog, "uBeamWidth"),
      beamHeight:     gl.getUniformLocation(prog, "uBeamHeight"),
      beamNumber:     gl.getUniformLocation(prog, "uBeamNumber"),
      speed:          gl.getUniformLocation(prog, "uSpeed"),
      noiseIntensity: gl.getUniformLocation(prog, "uNoiseIntensity"),
      scale:          gl.getUniformLocation(prog, "uScale"),
      rotation:       gl.getUniformLocation(prog, "uRotation"),
    }

    const [r, g, b] = hexToRgb(lightColor)
    gl.uniform3f(u.lightColor, r, g, b)
    gl.uniform1f(u.beamWidth, beamWidth)
    gl.uniform1f(u.beamHeight, beamHeight)
    gl.uniform1f(u.beamNumber, beamNumber)
    gl.uniform1f(u.speed, speed)
    gl.uniform1f(u.noiseIntensity, noiseIntensity)
    gl.uniform1f(u.scale, scale)
    gl.uniform1f(u.rotation, rotation)

    const resize = () => {
      const w = container.clientWidth
      const h = container.clientHeight
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2)
      canvas.width  = w * dpr
      canvas.height = h * dpr
      canvas.style.width  = `${w}px`
      canvas.style.height = `${h}px`
      gl.viewport(0, 0, canvas.width, canvas.height)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const start = performance.now()
    const draw = (now: number) => {
      const elapsed = (now - start) / 1000
      gl.uniform1f(u.time, elapsed)
      gl.uniform2f(u.resolution, canvas.width, canvas.height)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      frameRef.current = requestAnimationFrame(draw)
    }
    frameRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frameRef.current)
      ro.disconnect()
      gl.deleteProgram(prog)
      gl.deleteBuffer(buf)
    }
  }, [lightColor, beamWidth, beamHeight, beamNumber, speed, noiseIntensity, scale, rotation])

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%", ...style }}>
      <canvas ref={canvasRef} style={{ display: "block", width: "100%", height: "100%" }} />
    </div>
  )
}
