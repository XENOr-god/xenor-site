"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";

type FormKey = "xenor-core" | "xenor-sim" | "xenor-site";

type Vector2 = {
  x: number;
  y: number;
};

type Rotation = {
  x: number;
  y: number;
  z: number;
};

type ParticleTarget = {
  x: number;
  y: number;
  z: number;
  size: number;
  alpha: number;
  hue: number;
};

type Segment = {
  from: Vector2;
  to: Vector2;
  count: number;
  alpha?: number;
  size?: number;
  jitter?: number;
  depth?: number;
  hue?: number;
};

type Ring = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  count: number;
  alpha?: number;
  size?: number;
  depth?: number;
  hue?: number;
  start?: number;
  end?: number;
};

type Cloud = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  depth: number;
  count: number;
  alpha?: number;
  size?: number;
  hue?: number;
};

type Formation = {
  key: FormKey;
  title: string;
  copy: string;
  points: ParticleTarget[];
  nodes: ParticleTarget[];
  scale: number;
  spinSpeed: number;
  colorSpread: number;
  saturation: number;
  lightness: number;
  tiltX: number;
  wobbleX: number;
  wobbleZ: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  seed: number;
};

type TransitionState = {
  fromIndex: number;
  toIndex: number;
  startedAt: number;
};

type AmbientPoint = {
  x: number;
  y: number;
  size: number;
  alpha: number;
  speed: number;
};

type OrbitDustPoint = {
  angle: number;
  radiusX: number;
  radiusY: number;
  size: number;
  alpha: number;
  speed: number;
};

type QualityProfile = {
  particleCount: number;
  maxDpr: number;
  frameInterval: number;
  glowThreshold: number;
  glowBoost: number;
  dustStride: number;
};

const TAU = Math.PI * 2;
const VIEWBOX_WIDTH = 760;
const VIEWBOX_HEIGHT = 640;
const CENTER_X = VIEWBOX_WIDTH / 2;
const CENTER_Y = 314;
const PERSPECTIVE_FOCAL = 480;
const PARTICLE_COUNT = 4000;
const COLLAPSE_WINDOW_MS = 760;
const ASSEMBLY_WINDOW_MS = 520;
const CORE_CANVAS_ZOOM = 2.1;
const IDLE_OBJECT_SCALE = 0.42;
const IDLE_SPIN_SPEED = 0.00008;
const COLLAPSE_OBJECT_SCALE = 0.26;
const COLLAPSE_SPIN_SPEED = 0.00004;
const DENSITY_CELL_SIZE = 13;
const MAX_CANVAS_DPR = 1.5;

function hash(seed: number) {
  return Math.abs(Math.sin(seed * 91.713) * 10000) % 1;
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function resolveQualityProfile(reducedMotion: boolean): QualityProfile {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return {
      particleCount: PARTICLE_COUNT,
      maxDpr: MAX_CANVAS_DPR,
      frameInterval: 16,
      glowThreshold: 0.1,
      glowBoost: 1,
      dustStride: 1,
    };
  }

  const deviceMemory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 8;
  const hardwareConcurrency = navigator.hardwareConcurrency ?? 8;
  const isCompactViewport = window.matchMedia("(max-width: 900px)").matches;

  if (reducedMotion || isCompactViewport || deviceMemory <= 4 || hardwareConcurrency <= 4) {
    return {
      particleCount: 1800,
      maxDpr: 1,
      frameInterval: 33,
      glowThreshold: 0.24,
      glowBoost: 0.72,
      dustStride: 3,
    };
  }

  if (deviceMemory <= 8 || hardwareConcurrency <= 8) {
    return {
      particleCount: 2800,
      maxDpr: 1.2,
      frameInterval: 22,
      glowThreshold: 0.16,
      glowBoost: 0.84,
      dustStride: 2,
    };
  }

  return {
    particleCount: PARTICLE_COUNT,
    maxDpr: MAX_CANVAS_DPR,
    frameInterval: 16,
    glowThreshold: 0.1,
    glowBoost: 1,
    dustStride: 1,
  };
}

function createPoint(
  x: number,
  y: number,
  options: Partial<Omit<ParticleTarget, "x" | "y">> = {}
): ParticleTarget {
  return {
    x,
    y,
    z: options.z ?? 0,
    size: options.size ?? 1.2,
    alpha: options.alpha ?? 0.66,
    hue: options.hue ?? 220,
  };
}

function sampleSegment(segment: Segment) {
  const dx = segment.to.x - segment.from.x;
  const dy = segment.to.y - segment.from.y;
  const length = Math.hypot(dx, dy) || 1;
  const normalX = -dy / length;
  const normalY = dx / length;
  const depth = segment.depth ?? 56;
  const hue = segment.hue ?? 220;
  const seedBase =
    segment.from.x * 0.017 +
    segment.from.y * 0.013 +
    segment.to.x * 0.011 +
    segment.to.y * 0.007;

  return Array.from({ length: segment.count }, (_, index) => {
    const progress = segment.count === 1 ? 0.5 : index / (segment.count - 1);
    const offset = (hash(seedBase + index * 0.71) - 0.5) * (segment.jitter ?? 0);
    const z =
      (Math.sin(progress * Math.PI) * 0.55 + (hash(seedBase + index * 0.47) - 0.5) * 0.72) *
      depth;

    return createPoint(
      lerp(segment.from.x, segment.to.x, progress) + normalX * offset,
      lerp(segment.from.y, segment.to.y, progress) + normalY * offset,
      {
        z,
        size: (segment.size ?? 1.2) * (0.88 + hash(seedBase + index) * 0.26),
        alpha: clamp(
          (segment.alpha ?? 0.72) * (0.82 + hash(seedBase + index * 0.83) * 0.28),
          0.12,
          1
        ),
        hue: hue + (hash(seedBase + index * 0.19) - 0.5) * 52,
      }
    );
  });
}

function sampleRing(ring: Ring) {
  const start = ring.start ?? 0;
  const end = ring.end ?? TAU;
  const depth = ring.depth ?? 68;
  const hue = ring.hue ?? 235;
  const seedBase = ring.cx * 0.013 + ring.cy * 0.011 + ring.rx * 0.007 + ring.ry * 0.019;

  return Array.from({ length: ring.count }, (_, index) => {
    const progress = ring.count === 1 ? 0.5 : index / ring.count;
    const angle = lerp(start, end, progress);
    const radiusScale = 0.986 + hash(seedBase + index * 0.63) * 0.028;
    const z =
      (Math.sin(angle * 2 + hash(seedBase + index * 0.11) * 0.8) *
        (0.34 + hash(seedBase + index * 0.27) * 0.36) +
        (hash(seedBase + index * 0.9) - 0.5) * 0.24) *
      depth;

    return createPoint(
      ring.cx + Math.cos(angle) * ring.rx * radiusScale,
      ring.cy + Math.sin(angle) * ring.ry * radiusScale,
      {
        z,
        size: (ring.size ?? 1.04) * (0.88 + hash(seedBase + index * 0.37) * 0.24),
        alpha: clamp((ring.alpha ?? 0.32) * (0.82 + hash(seedBase + index) * 0.34), 0.08, 1),
        hue: hue + (hash(seedBase + index * 0.17) - 0.5) * 58,
      }
    );
  });
}

function sampleCloud(cloud: Cloud) {
  const points: ParticleTarget[] = [];

  for (let index = 0; index < cloud.count; index += 1) {
    const seedBase = cloud.cx * 0.01 + cloud.cy * 0.02 + index;
    const angle = hash(seedBase) * TAU;
    const radius = Math.sqrt(hash(seedBase + 5));

    points.push(
      createPoint(
        cloud.cx + Math.cos(angle) * cloud.rx * radius,
        cloud.cy + Math.sin(angle) * cloud.ry * radius,
        {
          z:
            (hash(seedBase + 9) - 0.5) *
            2 *
            cloud.depth *
            (0.5 + hash(seedBase + 13) * 0.4),
          size: (cloud.size ?? 0.96) * (0.8 + hash(seedBase + 11) * 0.24),
          alpha: (cloud.alpha ?? 0.18) * (0.76 + hash(seedBase + 17) * 0.34),
          hue: (cloud.hue ?? 220) + (hash(seedBase + 19) - 0.5) * 78,
        }
      )
    );
  }

  return points;
}

function sampleNodeCluster(node: ParticleTarget, index: number) {
  return Array.from({ length: 13 }, (_, clusterIndex) => {
    if (clusterIndex === 0) {
      return createPoint(node.x, node.y, {
        z: node.z,
        size: node.size * 0.4,
        alpha: node.alpha * 0.36,
        hue: node.hue,
      });
    }

    const angle = (TAU * clusterIndex) / 12 + hash(index * 17 + clusterIndex) * 0.22;
    const radius = 2.4 + hash(index * 11 + clusterIndex) * 5.4;

    return createPoint(node.x + Math.cos(angle) * radius, node.y + Math.sin(angle) * radius, {
      z: node.z + (hash(index * 19 + clusterIndex) - 0.5) * 24,
      size: node.size * 0.28,
      alpha: node.alpha * 0.2,
      hue: node.hue + (hash(index * 23 + clusterIndex) - 0.5) * 24,
    });
  });
}

function samplePyramidSlices({
  apexY,
  baseY,
  centerX,
  baseWidth,
  levels,
  alpha,
  size,
  depth,
  hue,
}: {
  apexY: number;
  baseY: number;
  centerX: number;
  baseWidth: number;
  levels: number;
  alpha: number;
  size: number;
  depth: number;
  hue: number;
}) {
  return Array.from({ length: levels }, (_, index) => {
    const progress = (index + 1) / (levels + 1);
    const y = lerp(apexY + 22, baseY - 22, progress);
    const halfWidth = lerp(18, baseWidth / 2 - 10, progress);

    return sampleSegment({
      from: { x: centerX - halfWidth, y },
      to: { x: centerX + halfWidth, y },
      count: 12 + Math.round(progress * 30),
      alpha: alpha * (0.86 + progress * 0.18),
      size: size * (0.92 + progress * 0.14),
      depth: depth * (0.82 + progress * 0.24),
      hue: hue + progress * 14,
      jitter: 0.28,
    });
  }).flat();
}

function thickenPoints(points: ParticleTarget[]) {
  const cloud: ParticleTarget[] = [];

  for (const [index, point] of points.entries()) {
    cloud.push(point);

    const copies =
      1 +
      Math.round(point.alpha * 3.4) +
      (point.size > 1.8 ? 2 : 1);

    for (let copyIndex = 0; copyIndex < copies; copyIndex += 1) {
      const seedBase = index * 37 + copyIndex * 17 + point.x * 0.03 + point.y * 0.02;
      const angle = hash(seedBase) * TAU;
      const radius = (0.42 + hash(seedBase + 7) * 1.7) * (0.54 + point.size * 0.26);

      cloud.push(
        createPoint(point.x + Math.cos(angle) * radius, point.y + Math.sin(angle) * radius, {
          z: point.z + (hash(seedBase + 11) - 0.5) * 26,
          size: point.size * (0.34 + hash(seedBase + 13) * 0.28),
          alpha: point.alpha * (0.18 + hash(seedBase + 19) * 0.24),
          hue: point.hue + (hash(seedBase + 29) - 0.5) * 38,
        })
      );
    }
  }

  return cloud;
}

function rebalancePoints(points: ParticleTarget[], targetCount: number) {
  if (points.length === targetCount) {
    return points;
  }

  return Array.from({ length: targetCount }, (_, index) => {
    const source = points[Math.floor((index / targetCount) * points.length) % points.length];
    const seedBase = source.x * 0.01 + source.y * 0.02 + source.z * 0.003 + index;

    return createPoint(
      source.x + (hash(seedBase) - 0.5) * 1.6,
      source.y + (hash(seedBase + 5) - 0.5) * 1.6,
      {
        z: source.z + (hash(seedBase + 9) - 0.5) * 18,
        size: source.size,
        alpha: clamp(source.alpha * (0.88 + hash(seedBase + 13) * 0.22), 0.08, 1),
        hue: source.hue + (hash(seedBase + 17) - 0.5) * 18,
      }
    );
  });
}

function buildFormation({
  key,
  title,
  copy,
  sources,
  nodes,
  scale = 0.82,
  spinSpeed = 0.0002,
  colorSpread = 12,
  saturation = 60,
  lightness = 76,
  tiltX = -0.36,
  wobbleX = 0.07,
  wobbleZ = 0.02,
}: {
  key: FormKey;
  title: string;
  copy: string;
  sources: ParticleTarget[];
  nodes: ParticleTarget[];
  scale?: number;
  spinSpeed?: number;
  colorSpread?: number;
  saturation?: number;
  lightness?: number;
  tiltX?: number;
  wobbleX?: number;
  wobbleZ?: number;
}): Formation {
  const pointCloud = thickenPoints([...sources, ...nodes.flatMap(sampleNodeCluster)]);

  return {
    key,
    title,
    copy,
    nodes,
    points: rebalancePoints(pointCloud, PARTICLE_COUNT),
    scale,
    spinSpeed,
    colorSpread,
    saturation,
    lightness,
    tiltX,
    wobbleX,
    wobbleZ,
  };
}

function rotatePoint(point: ParticleTarget, rotation: Rotation) {
  let x = point.x - CENTER_X;
  let y = point.y - CENTER_Y;
  let z = point.z;

  const cosY = Math.cos(rotation.y);
  const sinY = Math.sin(rotation.y);
  const rotatedYx = x * cosY - z * sinY;
  const rotatedYz = x * sinY + z * cosY;
  x = rotatedYx;
  z = rotatedYz;

  const cosX = Math.cos(rotation.x);
  const sinX = Math.sin(rotation.x);
  const rotatedXy = y * cosX - z * sinX;
  const rotatedXz = y * sinX + z * cosX;
  y = rotatedXy;
  z = rotatedXz;

  const cosZ = Math.cos(rotation.z);
  const sinZ = Math.sin(rotation.z);
  const rotatedZx = x * cosZ - y * sinZ;
  const rotatedZy = x * sinZ + y * cosZ;

  return { x: rotatedZx, y: rotatedZy, z };
}

function projectPoint(
  point: ParticleTarget,
  rotation: Rotation,
  scale: number,
  burstOffset: number
) {
  const inflated = createPoint(point.x, point.y, {
    z: point.z + burstOffset,
    size: point.size,
    alpha: point.alpha,
    hue: point.hue,
  });
  const rotated = rotatePoint(inflated, rotation);
  const perspective = PERSPECTIVE_FOCAL / (PERSPECTIVE_FOCAL + rotated.z + 240);
  const screenX = CENTER_X + rotated.x * perspective * scale;
  const screenY = CENTER_Y + rotated.y * perspective * scale;

  return {
    x: screenX,
    y: screenY,
    z: rotated.z,
    perspective,
  };
}

function drawAmbientPoints(
  context: CanvasRenderingContext2D,
  points: AmbientPoint[],
  now: number
) {
  for (const [index, point] of points.entries()) {
    const pulse = 0.42 + Math.sin(now * point.speed + index) * 0.24;
    context.fillStyle = `rgba(255,255,255,${clamp(point.alpha + pulse * 0.08, 0.02, 0.28)})`;
    context.beginPath();
    context.arc(point.x, point.y, point.size, 0, TAU);
    context.fill();
  }
}

function drawRadialGlow(
  context: CanvasRenderingContext2D,
  x: number,
  y: number,
  radius: number,
  hue: number,
  saturation: number,
  lightness: number,
  alpha: number
) {
  const gradient = context.createRadialGradient(x, y, 0, x, y, radius);
  gradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`);
  gradient.addColorStop(0.32, `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.42})`);
  gradient.addColorStop(0.68, `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 0.12})`);
  gradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);
  context.fillStyle = gradient;
  context.beginPath();
  context.arc(x, y, radius, 0, TAU);
  context.fill();
}

function drawOrbitMesh(
  context: CanvasRenderingContext2D,
  now: number,
  dustPoints: OrbitDustPoint[]
) {
  const rotation = now * 0.00006;
  const meshCenterY = CENTER_Y + 8;

  context.save();
  context.translate(CENTER_X, meshCenterY);

  for (const dust of dustPoints) {
    const angle = dust.angle + rotation * dust.speed;
    const x = Math.cos(angle) * dust.radiusX;
    const y = Math.sin(angle) * dust.radiusY;
    const alpha = dust.alpha * (0.74 + Math.sin(now * 0.00024 + dust.angle * 7) * 0.26);

    context.fillStyle = `rgba(255,255,255,${clamp(alpha, 0.01, 0.22)})`;
    context.beginPath();
    context.arc(x, y, dust.size, 0, TAU);
    context.fill();
  }

  context.restore();
}

const coreNodes = [
  createPoint(CENTER_X, CENTER_Y, { z: 0, size: 4.2, alpha: 1, hue: 218 }),
  createPoint(CENTER_X, CENTER_Y - 112, { z: 12, size: 3.2, alpha: 0.86, hue: 214 }),
  createPoint(CENTER_X, CENTER_Y + 112, { z: -10, size: 3.2, alpha: 0.86, hue: 242 }),
  createPoint(CENTER_X - 112, CENTER_Y, { z: 18, size: 3.2, alpha: 0.86, hue: 208 }),
  createPoint(CENTER_X + 112, CENTER_Y, { z: -18, size: 3.2, alpha: 0.86, hue: 232 }),
];

const simNodes = [
  createPoint(CENTER_X, 172, { z: 46, size: 3.2, alpha: 0.94, hue: 210 }),
  createPoint(322, 236, { z: -28, size: 2.9, alpha: 0.9, hue: 204 }),
  createPoint(438, 236, { z: 28, size: 2.9, alpha: 0.9, hue: 236 }),
  createPoint(322, 440, { z: -24, size: 2.9, alpha: 0.9, hue: 214 }),
  createPoint(438, 440, { z: 24, size: 2.9, alpha: 0.9, hue: 248 }),
  createPoint(CENTER_X, 504, { z: -46, size: 3.2, alpha: 0.94, hue: 258 }),
];

const siteNodes = [
  createPoint(CENTER_X, 152, { z: 72, size: 3.4, alpha: 0.96, hue: 214 }),
  createPoint(298, 500, { z: -22, size: 3, alpha: 0.9, hue: 210 }),
  createPoint(462, 500, { z: 22, size: 3, alpha: 0.9, hue: 238 }),
  createPoint(CENTER_X, 510, { z: -56, size: 3.3, alpha: 0.92, hue: 248 }),
  createPoint(334, 338, { z: -18, size: 2.8, alpha: 0.84, hue: 208 }),
  createPoint(426, 338, { z: 18, size: 2.8, alpha: 0.84, hue: 232 }),
  createPoint(CENTER_X, 394, { z: 8, size: 2.6, alpha: 0.78, hue: 224 }),
];

const formations = [
  buildFormation({
    key: "xenor-core",
    title: "xenor-core",
    copy: "Klik pertama membentuk reticle mark dalam volume 3D.",
    sources: [
      ...sampleRing({
        cx: CENTER_X,
        cy: CENTER_Y,
        rx: 116,
        ry: 116,
        count: 164,
        alpha: 0.9,
        size: 1.32,
        depth: 94,
        hue: 216,
      }),
      ...sampleRing({
        cx: CENTER_X,
        cy: CENTER_Y,
        rx: 62,
        ry: 62,
        count: 108,
        alpha: 0.78,
        size: 1.1,
        depth: 66,
        hue: 256,
      }),
      ...sampleSegment({
        from: { x: CENTER_X - 146, y: CENTER_Y },
        to: { x: CENTER_X + 146, y: CENTER_Y },
        count: 92,
        alpha: 0.72,
        size: 1.02,
        depth: 72,
        hue: 194,
      }),
      ...sampleSegment({
        from: { x: CENTER_X, y: CENTER_Y - 146 },
        to: { x: CENTER_X, y: CENTER_Y + 146 },
        count: 92,
        alpha: 0.72,
        size: 1.02,
        depth: 72,
        hue: 278,
      }),
      ...sampleSegment({
        from: { x: CENTER_X, y: CENTER_Y + 150 },
        to: { x: CENTER_X, y: CENTER_Y + 210 },
        count: 24,
        alpha: 0.4,
        size: 0.82,
        depth: 44,
        hue: 312,
      }),
      ...sampleCloud({
        cx: CENTER_X,
        cy: CENTER_Y,
        rx: 42,
        ry: 42,
        depth: 58,
        count: 48,
        alpha: 0.18,
        size: 0.74,
        hue: 226,
      }),
    ],
    nodes: coreNodes,
    scale: 1.08,
    spinSpeed: 0.0001,
    colorSpread: 8,
    saturation: 48,
    lightness: 78,
  }),
  buildFormation({
    key: "xenor-sim",
    title: "xenor-sim",
    copy: "Klik berikutnya memadat jadi cube mark yang berputar di ruang 3D.",
    sources: [
      ...sampleSegment({
        from: { x: CENTER_X, y: 172 },
        to: { x: 322, y: 236 },
        count: 66,
        alpha: 0.82,
        size: 1.1,
        depth: 68,
        hue: 202,
      }),
      ...sampleSegment({
        from: { x: CENTER_X, y: 172 },
        to: { x: 438, y: 236 },
        count: 66,
        alpha: 0.82,
        size: 1.1,
        depth: 68,
        hue: 250,
      }),
      ...sampleSegment({
        from: { x: 322, y: 236 },
        to: { x: 322, y: 440 },
        count: 62,
        alpha: 0.74,
        size: 1.02,
        depth: 58,
        hue: 184,
      }),
      ...sampleSegment({
        from: { x: 438, y: 236 },
        to: { x: 438, y: 440 },
        count: 62,
        alpha: 0.74,
        size: 1.02,
        depth: 58,
        hue: 272,
      }),
      ...sampleSegment({
        from: { x: 322, y: 440 },
        to: { x: CENTER_X, y: 504 },
        count: 66,
        alpha: 0.82,
        size: 1.1,
        depth: 68,
        hue: 168,
      }),
      ...sampleSegment({
        from: { x: 438, y: 440 },
        to: { x: CENTER_X, y: 504 },
        count: 66,
        alpha: 0.82,
        size: 1.1,
        depth: 68,
        hue: 304,
      }),
      ...sampleSegment({
        from: { x: CENTER_X, y: 172 },
        to: { x: CENTER_X, y: 504 },
        count: 84,
        alpha: 0.5,
        size: 0.92,
        depth: 48,
        hue: 228,
      }),
      ...sampleSegment({
        from: { x: 322, y: 236 },
        to: { x: CENTER_X, y: 338 },
        count: 40,
        alpha: 0.46,
        size: 0.82,
        depth: 42,
        hue: 202,
      }),
      ...sampleSegment({
        from: { x: 438, y: 236 },
        to: { x: CENTER_X, y: 338 },
        count: 40,
        alpha: 0.46,
        size: 0.82,
        depth: 42,
        hue: 256,
      }),
      ...sampleSegment({
        from: { x: 322, y: 440 },
        to: { x: CENTER_X, y: 338 },
        count: 40,
        alpha: 0.46,
        size: 0.82,
        depth: 42,
        hue: 184,
      }),
      ...sampleSegment({
        from: { x: 438, y: 440 },
        to: { x: CENTER_X, y: 338 },
        count: 40,
        alpha: 0.46,
        size: 0.82,
        depth: 42,
        hue: 300,
      }),
      ...sampleSegment({
        from: { x: 322, y: 236 },
        to: { x: 438, y: 236 },
        count: 38,
        alpha: 0.42,
        size: 0.8,
        depth: 28,
        hue: 218,
      }),
      ...sampleSegment({
        from: { x: 322, y: 440 },
        to: { x: 438, y: 440 },
        count: 38,
        alpha: 0.42,
        size: 0.8,
        depth: 28,
        hue: 238,
      }),
      ...sampleSegment({
        from: { x: 322, y: 338 },
        to: { x: 438, y: 338 },
        count: 42,
        alpha: 0.44,
        size: 0.82,
        depth: 24,
        hue: 228,
      }),
      ...sampleCloud({
        cx: CENTER_X,
        cy: 338,
        rx: 30,
        ry: 44,
        depth: 34,
        count: 96,
        alpha: 0.12,
        size: 0.64,
        hue: 224,
      }),
    ],
    nodes: simNodes,
    scale: 1.12,
    spinSpeed: 0.00008,
    colorSpread: 8,
    saturation: 46,
    lightness: 80,
    tiltX: -0.12,
    wobbleX: 0.018,
    wobbleZ: 0.006,
  }),
  buildFormation({
    key: "xenor-site",
    title: "xenor-site",
    copy: "Klik selanjutnya membentuk pyramid mark besar yang terus berputar.",
    sources: [
      ...sampleSegment({
        from: { x: CENTER_X, y: 152 },
        to: { x: 298, y: 500 },
        count: 88,
        alpha: 0.9,
        size: 1.26,
        depth: 82,
        hue: 212,
        jitter: 0.22,
      }),
      ...sampleSegment({
        from: { x: CENTER_X, y: 152 },
        to: { x: 462, y: 500 },
        count: 88,
        alpha: 0.9,
        size: 1.26,
        depth: 82,
        hue: 224,
        jitter: 0.22,
      }),
      ...sampleSegment({
        from: { x: 298, y: 500 },
        to: { x: 462, y: 500 },
        count: 68,
        alpha: 0.84,
        size: 1.08,
        depth: 62,
        hue: 228,
        jitter: 0.2,
      }),
      ...sampleSegment({
        from: { x: CENTER_X, y: 152 },
        to: { x: CENTER_X, y: 510 },
        count: 82,
        alpha: 0.72,
        size: 1.02,
        depth: 70,
        hue: 220,
      }),
      ...sampleSegment({
        from: { x: 334, y: 338 },
        to: { x: 426, y: 338 },
        count: 36,
        alpha: 0.68,
        size: 0.96,
        depth: 54,
        hue: 226,
      }),
      ...sampleSegment({
        from: { x: 334, y: 338 },
        to: { x: CENTER_X, y: 510 },
        count: 48,
        alpha: 0.62,
        size: 0.92,
        depth: 58,
        hue: 216,
      }),
      ...sampleSegment({
        from: { x: 426, y: 338 },
        to: { x: CENTER_X, y: 510 },
        count: 48,
        alpha: 0.62,
        size: 0.92,
        depth: 58,
        hue: 236,
      }),
      ...sampleSegment({
        from: { x: CENTER_X, y: 152 },
        to: { x: 334, y: 338 },
        count: 44,
        alpha: 0.58,
        size: 0.86,
        depth: 52,
        hue: 216,
      }),
      ...sampleSegment({
        from: { x: CENTER_X, y: 152 },
        to: { x: 426, y: 338 },
        count: 44,
        alpha: 0.58,
        size: 0.86,
        depth: 52,
        hue: 232,
      }),
      ...sampleSegment({
        from: { x: 298, y: 500 },
        to: { x: CENTER_X, y: 394 },
        count: 36,
        alpha: 0.46,
        size: 0.8,
        depth: 44,
        hue: 220,
      }),
      ...sampleSegment({
        from: { x: 462, y: 500 },
        to: { x: CENTER_X, y: 394 },
        count: 36,
        alpha: 0.46,
        size: 0.8,
        depth: 44,
        hue: 234,
      }),
      ...samplePyramidSlices({
        apexY: 152,
        baseY: 500,
        centerX: CENTER_X,
        baseWidth: 164,
        levels: 10,
        alpha: 0.22,
        size: 0.7,
        depth: 32,
        hue: 220,
      }),
      ...sampleCloud({
        cx: CENTER_X,
        cy: 384,
        rx: 42,
        ry: 118,
        depth: 42,
        count: 96,
        alpha: 0.07,
        size: 0.58,
        hue: 222,
      }),
    ],
    nodes: siteNodes,
    scale: 1.12,
    spinSpeed: 0.00009,
    colorSpread: 7,
    saturation: 42,
    lightness: 82,
  }),
] as const;

const idleTargets = rebalancePoints(
  thickenPoints([
    ...sampleCloud({
      cx: CENTER_X,
      cy: CENTER_Y + 10,
      rx: 188,
      ry: 204,
      depth: 156,
      count: 220,
      alpha: 0.08,
      size: 0.68,
      hue: 220,
    }),
    ...sampleRing({
      cx: CENTER_X,
      cy: 548,
      rx: 182,
      ry: 54,
      count: 48,
      alpha: 0.05,
      size: 0.58,
      depth: 42,
      hue: 228,
    }),
  ]),
  PARTICLE_COUNT
);

const collapseTargets = rebalancePoints(
  thickenPoints([
    ...sampleCloud({
      cx: CENTER_X,
      cy: CENTER_Y,
      rx: 20,
      ry: 22,
      depth: 22,
      count: 130,
      alpha: 0.14,
      size: 0.62,
      hue: 224,
    }),
    ...sampleRing({
      cx: CENTER_X,
      cy: CENTER_Y,
      rx: 24,
      ry: 24,
      count: 40,
      alpha: 0.08,
      size: 0.52,
      depth: 16,
      hue: 228,
    }),
  ]),
  PARTICLE_COUNT
);

const ambientPoints: AmbientPoint[] = [];

const groundPoints: AmbientPoint[] = [];

const ORBIT_WHEEL_DOT_COUNT = 18;

const orbitDustPoints: OrbitDustPoint[] = Array.from({ length: 520 }, (_, index) => {
  const seed = index + 701;
  const band = index % 4;
  const bandBlend = band / 3;

  return {
    angle: hash(seed) * TAU,
    radiusX: 134 + bandBlend * 96 + hash(seed + 3) * 24,
    radiusY: 22 + bandBlend * 26 + hash(seed + 5) * 10,
    size: 0.16 + hash(seed + 7) * 0.92,
    alpha: 0.02 + hash(seed + 11) * 0.12,
    speed: 0.42 + hash(seed + 13) * 0.9,
  };
});

function OrbitWheel() {
  return (
    <svg
      viewBox="0 0 199 199"
      className="xenor-mark-wheel-svg"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="xenorWheelGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.94)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0.1)" />
        </linearGradient>
      </defs>

      {Array.from({ length: ORBIT_WHEEL_DOT_COUNT }, (_, index) => {
        const angle = -Math.PI / 2 + (index / ORBIT_WHEEL_DOT_COUNT) * TAU;
        const dotX = 99.5 + Math.cos(angle) * 89.55;
        const dotY = 99.5 + Math.sin(angle) * 89.55;

        return (
          <circle
            key={index}
            cx={dotX}
            cy={dotY}
            r="1.1"
            fill="url(#xenorWheelGradient)"
          />
        );
      })}
    </svg>
  );
}

export function HomeXenorLogoDisplay() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const overlayCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fieldRef = useRef<HTMLDivElement | null>(null);
  const coreRef = useRef<HTMLDivElement | null>(null);
  const activeIndexRef = useRef(-1);
  const transitionRef = useRef<TransitionState | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const canvas = canvasRef.current;
    const overlayCanvas = overlayCanvasRef.current;
    const field = fieldRef.current;
    const core = coreRef.current;

    if (!canvas || !overlayCanvas || !field || !core) {
      return;
    }

    const context = canvas.getContext("2d");
    const overlayContext = overlayCanvas.getContext("2d");

    if (!context || !overlayContext) {
      return;
    }

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const quality = resolveQualityProfile(motionQuery.matches);
    const resolvedFormations = formations.map((formation) => ({
      ...formation,
      points: rebalancePoints(formation.points, quality.particleCount),
    }));
    const resolvedIdleTargets = rebalancePoints(idleTargets, quality.particleCount);
    const resolvedCollapseTargets = rebalancePoints(collapseTargets, quality.particleCount);
    const resolvedOrbitDustPoints = orbitDustPoints.filter(
      (_, index) => index % quality.dustStride === 0
    );
    const particles: Particle[] = resolvedIdleTargets.map((target, index) => ({
      x: target.x + (hash(index + 1) - 0.5) * 14,
      y: target.y + (hash(index + 101) - 0.5) * 14,
      vx: 0,
      vy: 0,
      seed: hash(index + 201),
    }));

    let frameId = 0;
    let lastRenderAt = 0;

    const resizeCanvas = (targetCanvas: HTMLCanvasElement, element: HTMLElement) => {
      const bounds = element.getBoundingClientRect();
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, quality.maxDpr);

      targetCanvas.width = Math.max(1, Math.round(bounds.width * devicePixelRatio));
      targetCanvas.height = Math.max(1, Math.round(bounds.height * devicePixelRatio));
      targetCanvas.style.width = `${bounds.width}px`;
      targetCanvas.style.height = `${bounds.height}px`;
    };

    const resizeCanvases = () => {
      resizeCanvas(canvas, core);
      resizeCanvas(overlayCanvas, field);
    };

    const applyContainedView = (
      targetContext: CanvasRenderingContext2D,
      targetCanvas: HTMLCanvasElement,
      zoom = 1
    ) => {
      const baseScale = Math.min(
        targetCanvas.width / VIEWBOX_WIDTH,
        targetCanvas.height / VIEWBOX_HEIGHT
      );
      const scale = baseScale * zoom;
      const offsetX = (targetCanvas.width - VIEWBOX_WIDTH * scale) / 2;
      const offsetY = (targetCanvas.height - VIEWBOX_HEIGHT * scale) / 2;

      targetContext.setTransform(scale, 0, 0, scale, offsetX, offsetY);
    };

    resizeCanvases();

    const resizeObserver =
      typeof ResizeObserver === "undefined" ? null : new ResizeObserver(resizeCanvases);
    resizeObserver?.observe(field);
    resizeObserver?.observe(core);
    window.addEventListener("resize", resizeCanvases);

    const render = (now: number) => {
      const reducedMotion = motionQuery.matches;
      if (!reducedMotion && quality.frameInterval > 16 && now - lastRenderAt < quality.frameInterval) {
        frameId = window.requestAnimationFrame(render);
        return;
      }
      lastRenderAt = now;
      let formation =
        activeIndexRef.current >= 0 ? resolvedFormations[activeIndexRef.current] : null;
      let targets = formation?.points ?? resolvedIdleTargets;
      let isIdle = formation === null;
      let objectScale = formation?.scale ?? IDLE_OBJECT_SCALE;
      let spinSpeed = formation?.spinSpeed ?? IDLE_SPIN_SPEED;
      let colorSpread = formation?.colorSpread ?? 16;
      let saturationBase = formation?.saturation ?? 54;
      let lightnessBase = formation?.lightness ?? 74;
      let tiltX = formation?.tiltX ?? -0.36;
      let wobbleX = formation?.wobbleX ?? 0.07;
      let wobbleZ = formation?.wobbleZ ?? 0.02;
      let assemblyBoost = 0;

      const transition = transitionRef.current;

      if (transition) {
        const elapsed = now - transition.startedAt;
        const fromFormation =
          transition.fromIndex >= 0 ? resolvedFormations[transition.fromIndex] : null;
        const toFormation = resolvedFormations[transition.toIndex];

        if (!reducedMotion && elapsed < COLLAPSE_WINDOW_MS) {
          const collapseProgress = clamp(elapsed / COLLAPSE_WINDOW_MS, 0, 1);

          formation = fromFormation;
          targets = resolvedCollapseTargets;
          isIdle = false;
          objectScale = lerp(
            fromFormation?.scale ?? IDLE_OBJECT_SCALE,
            COLLAPSE_OBJECT_SCALE,
            collapseProgress
          );
          spinSpeed = lerp(
            fromFormation?.spinSpeed ?? IDLE_SPIN_SPEED,
            COLLAPSE_SPIN_SPEED,
            collapseProgress
          );
          colorSpread = lerp(fromFormation?.colorSpread ?? 16, 3, collapseProgress);
          saturationBase = lerp(fromFormation?.saturation ?? 54, 20, collapseProgress);
          lightnessBase = lerp(fromFormation?.lightness ?? 74, 76, collapseProgress);
          tiltX = fromFormation?.tiltX ?? -0.36;
          wobbleX = fromFormation?.wobbleX ?? 0.07;
          wobbleZ = fromFormation?.wobbleZ ?? 0.02;
        } else {
          const assembleElapsed = reducedMotion ? ASSEMBLY_WINDOW_MS : elapsed - COLLAPSE_WINDOW_MS;
          const assembleProgress = clamp(assembleElapsed / ASSEMBLY_WINDOW_MS, 0, 1);

          if (activeIndexRef.current !== transition.toIndex) {
            activeIndexRef.current = transition.toIndex;
            setActiveIndex(transition.toIndex);
          }

          formation = toFormation;
          targets = toFormation.points;
          isIdle = false;
          objectScale = lerp(COLLAPSE_OBJECT_SCALE, toFormation.scale, assembleProgress);
          spinSpeed = lerp(COLLAPSE_SPIN_SPEED, toFormation.spinSpeed, assembleProgress);
          colorSpread = toFormation.colorSpread;
          saturationBase = toFormation.saturation;
          lightnessBase = toFormation.lightness;
          tiltX = toFormation.tiltX;
          wobbleX = toFormation.wobbleX;
          wobbleZ = toFormation.wobbleZ;
          assemblyBoost = reducedMotion ? 0 : clamp(1 - assembleElapsed / ASSEMBLY_WINDOW_MS, 0, 1);

          if (assembleProgress >= 1) {
            transitionRef.current = null;
          }
        }
      }

      const spring = reducedMotion ? 0.16 : isIdle ? 0.034 : 0.126 + assemblyBoost * 0.026;
      const damping = reducedMotion ? 0.7 : isIdle ? 0.86 : 0.68 + (1 - assemblyBoost) * 0.08;
      const snapPull = reducedMotion ? 0.3 : isIdle ? 0.02 : 0.18 + (1 - assemblyBoost) * 0.16;
      const rotation: Rotation = {
        x: reducedMotion ? tiltX : tiltX + Math.sin(now * 0.00019) * wobbleX,
        y:
          reducedMotion
            ? 0.42
            : now * (isIdle ? IDLE_SPIN_SPEED : spinSpeed) + (activeIndexRef.current + 1) * 0.52,
        z: reducedMotion ? 0 : Math.sin(now * 0.00013) * wobbleZ,
      };

      overlayContext.setTransform(1, 0, 0, 1, 0, 0);
      overlayContext.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
      applyContainedView(overlayContext, overlayCanvas);
      drawOrbitMesh(overlayContext, now, resolvedOrbitDustPoints);
      drawAmbientPoints(overlayContext, ambientPoints, now);
      drawAmbientPoints(overlayContext, groundPoints, now);

      context.setTransform(1, 0, 0, 1, 0, 0);
      context.clearRect(0, 0, canvas.width, canvas.height);
      applyContainedView(context, canvas, CORE_CANVAS_ZOOM);

      const projectedParticles = particles.map((particle, index) => {
        const target = targets[index];
        const radialX = target.x - CENTER_X;
        const radialY = target.y - CENTER_Y;
        const radialLength = Math.hypot(radialX, radialY) || 1;
        const burstScale = 1 + assemblyBoost * (0.1 + particle.seed * 0.06);
        const burstTarget = createPoint(
          CENTER_X + (radialX / radialLength) * radialLength * burstScale,
          CENTER_Y + (radialY / radialLength) * radialLength * burstScale,
          {
            z: target.z + assemblyBoost * (8 + particle.seed * 20),
            size: target.size,
            alpha: target.alpha,
            hue: target.hue,
          }
        );
        const projected = projectPoint(
          burstTarget,
          {
            x: rotation.x,
            y: rotation.y + assemblyBoost * 0.12 * (particle.seed > 0.5 ? 1 : -1),
            z: rotation.z,
          },
          objectScale,
          0
        );
        const driftRadius = reducedMotion
          ? 0
          : isIdle
            ? 2.2 + particle.seed * 1.7
            : 0.06 + particle.seed * 0.12;
        const targetX =
          projected.x +
          Math.cos(now * (isIdle ? 0.00042 : 0.00022) + particle.seed * 13) * driftRadius;
        const targetY =
          projected.y +
          Math.sin(now * (isIdle ? 0.00052 : 0.00028) + particle.seed * 11) * driftRadius;

        particle.vx += (targetX - particle.x) * spring;
        particle.vy += (targetY - particle.y) * spring;
        particle.vx *= damping;
        particle.vy *= damping;
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.x = lerp(particle.x, targetX, snapPull);
        particle.y = lerp(particle.y, targetY, snapPull);

        const hue =
          (((burstTarget.hue +
            (particle.seed - 0.5) * 88 +
            Math.sin(now * 0.00014 + particle.seed * 12) * (colorSpread + 14) +
            projected.z * 0.05) %
            360) +
            360) %
          360;
        const lightness = clamp(
          lightnessBase + projected.perspective * 10 + burstTarget.alpha * 5,
          52,
          88
        );
        const saturation = clamp(saturationBase + projected.perspective * 12 + 18, 56, 96);
        const size = clamp(
          burstTarget.size * projected.perspective * (0.9 + particle.seed * 0.06),
          0.1,
          1.45
        );
        const alpha = clamp(burstTarget.alpha * (isIdle ? 0.9 : 1), 0.08, 1);

        return {
          x: particle.x,
          y: particle.y,
          z: projected.z,
          hue,
          size,
          alpha,
          lightness,
          saturation,
        };
      });

      const densityMap = new Map<string, number>();

      for (const projected of projectedParticles) {
        const key = `${Math.round(projected.x / DENSITY_CELL_SIZE)}:${Math.round(
          projected.y / DENSITY_CELL_SIZE
        )}`;
        densityMap.set(key, (densityMap.get(key) ?? 0) + 1);
      }

      const denseProjectedParticles = projectedParticles.map((projected) => {
        const key = `${Math.round(projected.x / DENSITY_CELL_SIZE)}:${Math.round(
          projected.y / DENSITY_CELL_SIZE
        )}`;
        const density = clamp(((densityMap.get(key) ?? 1) - 1) / 8, 0, 1);

        return {
          ...projected,
          density,
        };
      });

      denseProjectedParticles.sort((left, right) => left.z - right.z);

      for (const projected of denseProjectedParticles) {
        const glowStrength =
          projected.density > quality.glowThreshold
            ? ((projected.density - quality.glowThreshold) / (1 - quality.glowThreshold)) *
              quality.glowBoost
            : 0;
        const collisionBlend = clamp((projected.density - 0.32) / 0.45, 0, 1);
        const glowAlpha = projected.alpha * (0.006 + glowStrength * 0.18);
        const glowRadius = projected.size * (0.9 + glowStrength * 1.8);
        const particleLightness = projected.lightness + projected.density * 10;
        const renderHue = collisionBlend > 0.5 ? 0 : projected.hue;
        const renderSaturation = lerp(projected.saturation, 0, collisionBlend);
        const renderLightness = particleLightness + collisionBlend * 16;
        const particleAlpha = clamp(
          projected.alpha * (0.72 + projected.density * 0.52),
          0.06,
          1
        );

        if (glowStrength > 0) {
          drawRadialGlow(
            context,
            projected.x,
            projected.y,
            glowRadius,
            renderHue,
            renderSaturation,
            renderLightness,
            glowAlpha
          );
        }

        context.fillStyle = `hsla(${renderHue}, ${renderSaturation}%, ${
          renderLightness + 3
        }%, ${
          particleAlpha
        })`;
        context.beginPath();
        context.arc(projected.x, projected.y, projected.size, 0, TAU);
        context.fill();
      }

      frameId = window.requestAnimationFrame(render);
    };

    frameId = window.requestAnimationFrame(render);

    return () => {
      window.cancelAnimationFrame(frameId);
      resizeObserver?.disconnect();
      window.removeEventListener("resize", resizeCanvases);
    };
  }, []);

  function cycleFormation() {
    if (transitionRef.current) {
      return;
    }

    transitionRef.current = {
      fromIndex: activeIndexRef.current,
      toIndex: (activeIndexRef.current + 1) % formations.length,
      startedAt: performance.now(),
    };
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    cycleFormation();
  }

  const activeFormation = activeIndex >= 0 ? formations[activeIndex] : null;
  const readoutTitle = activeFormation?.title ?? null;

  return (
    <div className="xenor-mark-shell">
      <div
        ref={fieldRef}
        className="xenor-mark-field"
        role="button"
        tabIndex={0}
        aria-label="Click to cycle the Xenor particle marks"
        onClick={cycleFormation}
        onKeyDown={handleKeyDown}
      >
        <div ref={coreRef} className="xenor-mark-core">
          <div className="xenor-mark-core-layer">
            <canvas ref={canvasRef} className="xenor-mark-canvas xenor-mark-object-canvas" />
          </div>
        </div>

        <div className="xenor-mark-overlay" aria-hidden="true">
          <canvas
            ref={overlayCanvasRef}
            className="xenor-mark-canvas xenor-mark-overlay-canvas"
          />
        </div>

        <div className="xenor-mark-wheel rotate-animation" aria-hidden="true">
          <OrbitWheel />
        </div>
      </div>

      <div className="xenor-mark-readout">
        {readoutTitle ? <strong>{readoutTitle}</strong> : null}
      </div>
    </div>
  );
}
