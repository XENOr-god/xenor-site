"use client";

import { useMemo, useRef } from "react";
import { Points, PointMaterial } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { SceneMode } from "./types";

const COUNT = 950;

function createPositions(mode: SceneMode) {
  const arr = new Float32Array(COUNT * 3);

  for (let i = 0; i < COUNT; i++) {
    const i3 = i * 3;

    const y = -2.15 + Math.random() * 5.2;
    const t = (y + 2.15) / 5.2;
    const width = (1 - t) * 2.75 + 0.05;

    let x = (Math.random() * 2 - 1) * width;
    let z = (Math.random() * 2 - 1) * 0.18;

    if (mode === "SIMULATION") {
      x += Math.sin(i * 0.11) * 0.06;
    } else if (mode === "VALIDATION") {
      x *= 0.86;
      z *= 0.7;
    } else {
      x += (y < -0.25 ? 0.1 : 0);
      z *= 0.85;
    }

    arr[i3] = x;
    arr[i3 + 1] = y;
    arr[i3 + 2] = z;
  }

  return arr;
}

export default function ParticleField({ mode }: { mode: SceneMode }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => createPositions(mode), [mode]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.y = Math.sin(t * 0.2) * 0.04;
    ref.current.position.y = Math.sin(t * 0.45) * 0.02;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#F4FBFF"
        size={0.012}
        sizeAttenuation
        depthWrite={false}
        opacity={0.2}
      />
    </Points>
  );
}