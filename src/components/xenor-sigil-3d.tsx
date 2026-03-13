"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Line, OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

type XenorSigil3DProps = {
  className?: string;
};

type Vec3 = [number, number, number];
type SceneMode = "SIMULATION" | "VALIDATION" | "EXECUTION";

function mid(a: Vec3, b: Vec3): Vec3 {
  return [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2, (a[2] + b[2]) / 2];
}

function lerp3(a: Vec3, b: Vec3, t: number): Vec3 {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function createTriangleGeometry(a: Vec3, b: Vec3, c: Vec3) {
  const geometry = new THREE.BufferGeometry();

  const positions = new Float32Array([
    a[0], a[1], a[2],
    b[0], b[1], b[2],
    c[0], c[1], c[2],
  ]);

  const uvs = new Float32Array([
    0.5, 1.0,
    0.0, 0.0,
    1.0, 0.0,
  ]);

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.computeVertexNormals();

  return geometry;
}

const glyphVertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec4 world = modelMatrix * vec4(position, 1.0);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const glyphFragmentShader = `
  precision highp float;

  varying vec2 vUv;

  uniform float uTime;
  uniform float uBrightness;
  uniform float uDensity;
  uniform float uScroll;
  uniform float uSeed;
  uniform float uAlpha;
  uniform float uFocus;

  float hash21(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float rect(vec2 p, vec2 center, vec2 size) {
    vec2 d = abs(p - center) - size;
    return 1.0 - step(0.0, max(d.x, d.y));
  }

  float segH(vec2 p, float y) {
    return rect(p, vec2(0.5, y), vec2(0.28, 0.045));
  }

  float segV(vec2 p, float x, float y) {
    return rect(p, vec2(x, y), vec2(0.045, 0.20));
  }

  float segD1(vec2 p) {
    float a = abs((p.y - 0.2) - (p.x - 0.2));
    float body = 1.0 - smoothstep(0.02, 0.05, a);
    float bounds = step(0.2, p.x) * step(0.2, p.y) * step(p.x, 0.8) * step(p.y, 0.8);
    return body * bounds;
  }

  float segD2(vec2 p) {
    float a = abs((p.y - 0.8) + (p.x - 0.2) - 0.6);
    float body = 1.0 - smoothstep(0.02, 0.05, a);
    float bounds = step(0.2, p.x) * step(0.2, p.y) * step(p.x, 0.8) * step(p.y, 0.8);
    return body * bounds;
  }

  float glyph(vec2 p, vec2 cellId) {
    float g = 0.0;

    g = max(g, segH(p, 0.86) * step(0.16, hash21(cellId + 1.1)));
    g = max(g, segH(p, 0.50) * step(0.30, hash21(cellId + 2.3)));
    g = max(g, segH(p, 0.14) * step(0.22, hash21(cellId + 3.7)));

    g = max(g, segV(p, 0.18, 0.68) * step(0.35, hash21(cellId + 4.1)));
    g = max(g, segV(p, 0.82, 0.68) * step(0.35, hash21(cellId + 5.2)));
    g = max(g, segV(p, 0.18, 0.32) * step(0.35, hash21(cellId + 6.8)));
    g = max(g, segV(p, 0.82, 0.32) * step(0.35, hash21(cellId + 7.9)));

    g = max(g, segD1(p) * step(0.78, hash21(cellId + 8.3)));
    g = max(g, segD2(p) * step(0.78, hash21(cellId + 9.6)));

    float dotCore = rect(p, vec2(0.5, 0.5), vec2(0.05, 0.05)) * step(0.82, hash21(cellId + 12.4));
    g = max(g, dotCore);

    return g;
  }

  void main() {
    vec2 uv = vUv;

    float edge = min(min(uv.x, 1.0 - uv.x), min(uv.y, 1.0 - uv.y));
    float edgeFade = smoothstep(0.0, 0.16, edge);

    float rows = mix(42.0, 78.0, uDensity);
    float cols = mix(20.0, 42.0, uDensity);

    vec2 gridUv = vec2(
      uv.x * cols,
      uv.y * rows + uTime * uScroll
    );

    vec2 cellId = floor(gridUv);
    vec2 cellUv = fract(gridUv);

    float cellRnd = hash21(cellId + uSeed);
    float keep = step(0.23, cellRnd);

    float strips = smoothstep(0.04, 0.0, abs(cellUv.y - 0.5) - 0.38);
    float scan = 0.94 + 0.06 * sin((uv.y * 210.0) - uTime * 5.0);

    float charMask = glyph(cellUv, cellId) * keep;
    charMask *= strips;

    float rowFlicker = 0.78 + 0.22 * sin(uTime * 3.5 + cellId.y * 0.65 + cellId.x * 0.11);
    float colFlicker = 0.84 + 0.16 * sin(uTime * 2.1 + cellId.x * 0.9);
    float flicker = rowFlicker * colFlicker;

    float haze =
      0.05 * hash21(cellId * 0.35 + 19.0) +
      0.03 * sin(uv.y * 55.0 + uTime * 1.4) +
      0.02 * sin(uv.x * 33.0 - uTime * 0.8);

    float centerGlow = smoothstep(0.95, 0.15, distance(uv, vec2(0.5, 0.42)));
    float verticalBias = smoothstep(0.0, 0.7, uv.y);

    float intensity =
      charMask * flicker * (0.72 + 0.28 * verticalBias) +
      haze * 0.16 +
      centerGlow * 0.03;

    intensity *= scan;
    intensity *= edgeFade;
    intensity *= uBrightness;
    intensity *= mix(0.92, 1.12, uFocus);

    float whiteHot = smoothstep(0.78, 1.0, intensity);
    vec3 color = mix(vec3(0.34), vec3(0.82), intensity);
    color = mix(color, vec3(1.0), whiteHot * 0.7);

    float alpha = clamp(intensity * uAlpha, 0.0, 1.0);

    if (alpha < 0.025) discard;

    gl_FragColor = vec4(color, alpha);
  }
`;

function modeTuning(mode: SceneMode) {
  if (mode === "SIMULATION") {
    return {
      frontBrightness: 0.9,
      frontDensity: 1.0,
      frontScroll: 0.82,
      frontAlpha: 0.4,
      sideBrightness: 0.48,
      sideDensity: 0.92,
      sideScroll: 0.52,
      sideAlpha: 0.16,
      bloom: 0.22,
      focus: 0.92,
      activeNode: 0,
    };
  }

  if (mode === "VALIDATION") {
    return {
      frontBrightness: 0.72,
      frontDensity: 1.14,
      frontScroll: 0.34,
      frontAlpha: 0.34,
      sideBrightness: 0.42,
      sideDensity: 1.02,
      sideScroll: 0.24,
      sideAlpha: 0.13,
      bloom: 0.16,
      focus: 0.72,
      activeNode: 1,
    };
  }

  return {
    frontBrightness: 0.98,
    frontDensity: 0.88,
    frontScroll: 1.02,
    frontAlpha: 0.38,
    sideBrightness: 0.52,
    sideDensity: 0.86,
    sideScroll: 0.62,
    sideAlpha: 0.17,
    bloom: 0.24,
    focus: 1.0,
    activeNode: 2,
  };
}

function GlyphFace({
  geometry,
  brightness,
  density,
  scroll,
  alpha,
  seed,
  focus,
}: {
  geometry: THREE.BufferGeometry;
  brightness: number;
  density: number;
  scroll: number;
  alpha: number;
  seed: number;
  focus: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBrightness: { value: brightness },
      uDensity: { value: density },
      uScroll: { value: scroll },
      uSeed: { value: seed },
      uAlpha: { value: alpha },
      uFocus: { value: focus },
    }),
    [brightness, density, scroll, seed, alpha, focus]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh geometry={geometry} renderOrder={1}>
      <shaderMaterial
        ref={materialRef}
        vertexShader={glyphVertexShader}
        fragmentShader={glyphFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Atmosphere({ points }: { points: Float32Array }) {
  return (
    <Points positions={points} stride={3} renderOrder={0}>
      <PointMaterial
        transparent
        color="#9a9a9a"
        size={0.006}
        sizeAttenuation
        depthWrite={false}
        opacity={0.045}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function PyramidSkeleton({
  lines,
  nodes,
  activeNode,
}: {
  lines: Array<[Vec3, Vec3]>;
  nodes: Vec3[];
  activeNode: number;
}) {
  return (
    <group renderOrder={3}>
      {lines.map((line, i) => {
        const outer = i < 6;
        const ring = i >= 6 && i < 12;
        const spine = i >= 12 && i < 16;

        return (
          <Line
            key={i}
            points={line}
            color="#ffffff"
            transparent
            opacity={outer ? 0.62 : ring ? 0.34 : spine ? 0.28 : 0.18}
            lineWidth={1}
          />
        );
      })}

      {nodes.map((node, i) => {
        const isPrimary = i < 4;
        const isActive = i === activeNode + 4;

        return (
          <group key={i} position={node}>
            <mesh>
              <sphereGeometry args={[isPrimary ? 0.018 : isActive ? 0.018 : 0.011, 12, 12]} />
              <meshBasicMaterial
                color={isActive ? "#8FE7FF" : "#ffffff"}
                transparent
                opacity={isActive ? 0.95 : 0.78}
              />
            </mesh>

            {isActive && (
              <mesh>
                <sphereGeometry args={[0.05, 12, 12]} />
                <meshBasicMaterial color="#8FE7FF" transparent opacity={0.18} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

function RightSideOptions({
  mode,
  setMode,
}: {
  mode: SceneMode;
  setMode: (mode: SceneMode) => void;
}) {
  const items: Array<{
    id: SceneMode;
    title: string;
    subtitle: string;
    top: string;
    y: string;
  }> = [
    {
      id: "SIMULATION",
      title: "SIMULATION",
      subtitle: "STATE MODELLING",
      top: "23%",
      y: "24.5%",
    },
    {
      id: "VALIDATION",
      title: "VALIDATION",
      subtitle: "CONSTRAINT CHECK",
      top: "47%",
      y: "48.5%",
    },
    {
      id: "EXECUTION",
      title: "EXECUTION",
      subtitle: "ACTION OUTPUT",
      top: "71%",
      y: "72.5%",
    },
  ];

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      {items.map((item) => {
        const active = mode === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            onMouseEnter={() => setMode(item.id)}
            className="pointer-events-auto absolute right-[2%] flex items-center gap-3 bg-transparent text-left transition-all duration-300"
            style={{ top: item.top }}
          >
            <span className={`h-px w-16 transition-all duration-300 ${active ? "bg-cyan-100" : "bg-white/20"}`} />
            <span
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                active
                  ? "bg-cyan-300 shadow-[0_0_16px_rgba(110,210,255,0.95)]"
                  : "bg-cyan-300/70 shadow-[0_0_8px_rgba(110,210,255,0.22)]"
              }`}
            />
            <span>
              <span
                className={`block text-[15px] uppercase tracking-[0.28em] transition-all duration-300 ${
                  active ? "text-white" : "text-white/70"
                }`}
              >
                {item.title}
              </span>
              <span
                className={`mt-1 block text-[10px] uppercase tracking-[0.28em] transition-all duration-300 ${
                  active ? "text-white/42" : "text-white/18"
                }`}
              >
                {item.subtitle}
              </span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

function ConnectorOverlay({ mode }: { mode: SceneMode }) {
  const targets: Record<SceneMode, { top: string }> = {
    SIMULATION: { top: "24.5%" },
    VALIDATION: { top: "48.5%" },
    EXECUTION: { top: "72.5%" },
  };

  return (
    <svg className="pointer-events-none absolute inset-0 z-[9] h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <filter id="connectorGlow">
          <feGaussianBlur stdDeviation="0.25" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <path
        d="M 42 24 C 51 24, 58 24, 66 24"
        stroke={mode === "SIMULATION" ? "rgba(170,240,255,0.95)" : "rgba(255,255,255,0.18)"}
        strokeWidth="0.22"
        fill="none"
        filter="url(#connectorGlow)"
      />
      <path
        d="M 42 48 C 51 48, 58 48, 64 48"
        stroke={mode === "VALIDATION" ? "rgba(170,240,255,0.95)" : "rgba(255,255,255,0.18)"}
        strokeWidth="0.22"
        fill="none"
        filter="url(#connectorGlow)"
      />
      <path
        d="M 44 72 C 52 72, 58 72, 65 72"
        stroke={mode === "EXECUTION" ? "rgba(170,240,255,0.95)" : "rgba(255,255,255,0.18)"}
        strokeWidth="0.22"
        fill="none"
        filter="url(#connectorGlow)"
      />
    </svg>
  );
}

function Scene({ mode }: { mode: SceneMode }) {
  const groupRef = useRef<THREE.Group>(null);
  const tuning = modeTuning(mode);

  const data = useMemo(() => {
    const A: Vec3 = [0, 1.52, 0];
    const B: Vec3 = [-1.46, -1.08, 0.54];
    const C: Vec3 = [1.46, -1.08, 0.54];
    const D: Vec3 = [0, -1.14, -1.34];

    const centerTop: Vec3 = [0, 0.62, 0.14];
    const centerMid: Vec3 = [0, 0.02, 0.1];
    const centerLow: Vec3 = [0, -0.48, 0.02];

    const midAB = mid(A, B);
    const midAC = mid(A, C);
    const midAD = mid(A, D);
    const midBC = mid(B, C);
    const midBD = mid(B, D);
    const midCD = mid(C, D);

    const lowerBC = lerp3(B, C, 0.5);
    const lowerBD = lerp3(B, D, 0.5);
    const lowerCD = lerp3(C, D, 0.5);

    const lines: Array<[Vec3, Vec3]> = [
      [A, B],
      [A, C],
      [A, D],
      [B, C],
      [B, D],
      [C, D],

      [midAB, midAC],
      [midAC, midAD],
      [midAD, midAB],

      [midBC, midBD],
      [midBD, midCD],
      [midCD, midBC],

      [A, centerTop],
      [centerTop, centerMid],
      [centerMid, centerLow],
      [centerLow, lowerBC],

      [midAB, centerTop],
      [midAC, centerTop],
      [midAD, centerTop],

      [midAB, centerMid],
      [midAC, centerMid],
      [midAD, centerMid],
      [midBC, centerMid],
      [midBD, centerMid],
      [midCD, centerMid],

      [midBC, centerLow],
      [midBD, centerLow],
      [midCD, centerLow],

      [lowerBC, lowerBD],
      [lowerBD, lowerCD],
      [lowerCD, lowerBC],
    ];

    const nodes: Vec3[] = [
      A,
      B,
      C,
      D,
      centerTop,
      centerMid,
      centerLow,
      midAB,
      midAC,
      midAD,
      midBC,
      midBD,
      midCD,
    ];

    const front = createTriangleGeometry(A, B, C);
    const left = createTriangleGeometry(A, D, B);
    const right = createTriangleGeometry(A, C, D);

    const dustRaw: number[] = [];
    for (let i = 0; i < 700; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.25 + Math.random() * 1.45;
      dustRaw.push(
        Math.cos(angle) * radius,
        -0.95 + Math.random() * 0.32,
        Math.sin(angle) * radius * 0.72
      );
    }

    return {
      front,
      left,
      right,
      lines,
      nodes,
      dust: new Float32Array(dustRaw),
    };
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.rotation.y = 0.18 + Math.sin(t * 0.16) * 0.018;
    groupRef.current.rotation.x = -0.03 + Math.sin(t * 0.12) * 0.006;
    groupRef.current.rotation.z = Math.sin(t * 0.08) * 0.002;
    groupRef.current.scale.setScalar(0.98);
  });

  return (
    <>
      <group ref={groupRef} position={[-0.6, -0.02, 0]}>
        <Atmosphere points={data.dust} />

        <GlyphFace
          geometry={data.front}
          brightness={tuning.frontBrightness}
          density={tuning.frontDensity}
          scroll={tuning.frontScroll}
          alpha={tuning.frontAlpha}
          seed={1.3}
          focus={tuning.focus}
        />
        <GlyphFace
          geometry={data.front}
          brightness={0.22}
          density={1.12}
          scroll={0.92}
          alpha={0.06}
          seed={7.1}
          focus={0.4}
        />

        <GlyphFace
          geometry={data.left}
          brightness={tuning.sideBrightness}
          density={tuning.sideDensity}
          scroll={tuning.sideScroll}
          alpha={tuning.sideAlpha}
          seed={3.7}
          focus={0.5}
        />
        <GlyphFace
          geometry={data.right}
          brightness={tuning.sideBrightness}
          density={tuning.sideDensity}
          scroll={tuning.sideScroll}
          alpha={tuning.sideAlpha}
          seed={5.9}
          focus={0.5}
        />

        <PyramidSkeleton lines={data.lines} nodes={data.nodes} activeNode={tuning.activeNode} />
      </group>

      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />

      <EffectComposer>
        <Bloom luminanceThreshold={0.36} mipmapBlur intensity={tuning.bloom} />
      </EffectComposer>
    </>
  );
}

export default function XenorSigil3D({ className = "" }: XenorSigil3DProps) {
  const [mode, setMode] = useState<SceneMode>("SIMULATION");

  return (
    <div className={`relative w-full overflow-visible ${className}`}>
      <ConnectorOverlay mode={mode} />
      <RightSideOptions mode={mode} setMode={setMode} />

      <div className="pointer-events-none mx-auto w-[118%] max-w-none -ml-[6%]">
        <div className="relative h-[380px] overflow-visible sm:h-[440px] md:h-[520px] lg:h-[620px] xl:h-[680px]">
          <Canvas
            gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0.02, 7.8], fov: 32 }}
            dpr={[1, 2]}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0);
            }}
            style={{ background: "transparent", overflow: "visible" }}
          >
            <Scene mode={mode} />
          </Canvas>
        </div>
      </div>
    </div>
  );
}