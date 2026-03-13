"use client";

import { Suspense, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import ParticleField from "./ParticleField";
import GroundRings from "./GroundRings";
import AnnotationsOverlay from "./AnnotationsOverlay";
import type { SceneMode } from "./types";

type P3 = [number, number, number];

function lerp3(a: P3, b: P3, t: number): P3 {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t,
  ];
}

function CameraFloat() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime() * 0.1;
    camera.position.x = Math.sin(t) * 0.06;
    camera.position.y = 0.04 + Math.cos(t * 1.15) * 0.025;
    camera.position.z = 10.2 + Math.sin(t * 0.8) * 0.04;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function SigilWireframe({ mode }: { mode: SceneMode }) {
  const top: P3 = [0, 3.05, 0];
  const left: P3 = [-2.85, -2.15, 0.42];
  const right: P3 = [2.85, -2.15, 0.42];
  const bottom: P3 = [0, -2.38, -0.06];

  const sim: P3 = [-0.68, 1.38, 0.03];
  const val: P3 = [0.92, 0.18, 0.03];
  const exe: P3 = [0.25, -1.28, 0.03];
  const core: P3 = [0.02, -0.15, 0];

  const leftUpper = lerp3(top, left, 0.42);
  const rightUpper = lerp3(top, right, 0.42);
  const leftMid = lerp3(left, bottom, 0.42);
  const rightMid = lerp3(right, bottom, 0.42);
  const centerUpper = lerp3(top, bottom, 0.42);
  const centerLower = lerp3(top, bottom, 0.68);

  const leftBandA = lerp3(top, left, 0.22);
  const rightBandA = lerp3(top, right, 0.22);
  const leftBandB = lerp3(top, left, 0.63);
  const rightBandB = lerp3(top, right, 0.63);

  const opacity =
    mode === "SIMULATION" ? 0.34 : mode === "VALIDATION" ? 0.4 : 0.37;

  const faintOpacity =
    mode === "SIMULATION" ? 0.18 : mode === "VALIDATION" ? 0.24 : 0.2;

  const outerLines: P3[][] = [
    [top, left],
    [top, right],
    [left, right],
    [left, bottom],
    [right, bottom],
    [top, bottom],
  ];

  const innerLines: P3[][] = [
    [leftUpper, rightUpper],
    [leftMid, rightMid],
    [leftUpper, core],
    [rightUpper, core],
    [centerUpper, leftUpper],
    [centerUpper, rightUpper],
    [centerUpper, val],
    [centerLower, exe],
    [left, core],
    [right, core],
    [leftUpper, bottom],
    [rightUpper, bottom],
    [leftMid, core],
    [rightMid, core],
    [sim, core],
    [val, core],
    [exe, core],
    [sim, val],
    [val, exe],
    [sim, leftUpper],
    [sim, top],
    [val, rightUpper],
    [exe, leftMid],
    [exe, rightMid],
  ];

  const bands: P3[][] = [
    [leftBandA, rightBandA],
    [leftBandB, rightBandB],
    [lerp3(left, right, 0.18), centerLower],
    [lerp3(left, right, 0.82), centerLower],
  ];

  const sideFaints: P3[][] = [
    [top, leftMid],
    [top, rightMid],
    [leftUpper, rightMid],
    [rightUpper, leftMid],
    [leftBandA, rightUpper],
    [rightBandA, leftUpper],
  ];

  const controlNodes = [
    { p: sim, active: mode === "SIMULATION" },
    { p: val, active: mode === "VALIDATION" },
    { p: exe, active: mode === "EXECUTION" },
  ];

  const baseNodes = [top, left, right, bottom, core, centerUpper, centerLower];

  return (
    <group>
      {outerLines.map((points, i) => (
        <Line
          key={`outer-${i}`}
          points={points}
          color="#F5FBFF"
          transparent
          opacity={opacity}
          lineWidth={1.05}
        />
      ))}

      {innerLines.map((points, i) => (
        <Line
          key={`inner-${i}`}
          points={points}
          color="#EEF7FF"
          transparent
          opacity={opacity * 0.95}
          lineWidth={0.82}
        />
      ))}

      {bands.map((points, i) => (
        <Line
          key={`band-${i}`}
          points={points}
          color="#EAF5FF"
          transparent
          opacity={faintOpacity}
          lineWidth={0.75}
        />
      ))}

      {sideFaints.map((points, i) => (
        <Line
          key={`faint-${i}`}
          points={points}
          color="#EAF5FF"
          transparent
          opacity={faintOpacity}
          lineWidth={0.6}
        />
      ))}

      {baseNodes.map((p, i) => (
        <group key={`node-${i}`} position={p}>
          <mesh>
            <sphereGeometry args={[0.038, 14, 14]} />
            <meshBasicMaterial color="#F4FBFF" />
          </mesh>
        </group>
      ))}

      {controlNodes.map((node, i) => (
        <group key={`control-${i}`} position={node.p}>
          <mesh>
            <sphereGeometry args={[0.05, 14, 14]} />
            <meshBasicMaterial color={node.active ? "#B8F0FF" : "#DDF6FF"} />
          </mesh>
          <mesh>
            <sphereGeometry args={[0.14, 14, 14]} />
            <meshBasicMaterial
              color="#7DD8FF"
              transparent
              opacity={node.active ? 0.14 : 0.06}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function SceneContent({ mode }: { mode: SceneMode }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0.04, 10.2]} fov={22} />
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
      <CameraFloat />

      <ambientLight intensity={0.72} />
      <pointLight position={[0, 3.8, 2]} intensity={1.05} color="#F3FBFF" />
      <pointLight position={[2.2, 0.7, 1.4]} intensity={0.5} color="#9ADFFF" />
      <pointLight position={[-2.2, -0.3, 1.4]} intensity={0.42} color="#9ADFFF" />

      <group scale={0.95} position={[0, -0.08, 0]}>
        <GroundRings />
        <SigilWireframe mode={mode} />
        <ParticleField mode={mode} />
      </group>
    </>
  );
}

export default function PyramidNetwork() {
  const [mode, setMode] = useState<SceneMode>("SIMULATION");

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        className="bg-transparent"
      >
        <Suspense fallback={null}>
          <SceneContent mode={mode} />
        </Suspense>
      </Canvas>

      <AnnotationsOverlay mode={mode} setMode={setMode} />
    </div>
  );
}