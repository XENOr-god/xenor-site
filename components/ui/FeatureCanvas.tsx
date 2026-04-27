'use client';

import { useRef, useEffect, useCallback } from 'react';

type FeatureVariant = 'particles' | 'rings' | 'datamatrix';

interface FeatureCanvasProps {
  variant: FeatureVariant;
  className?: string;
}

const GOLD = { r: 255, g: 215, b: 0 };
const DIM_GOLD = { r: 180, g: 155, b: 0 };

function rgba(c: typeof GOLD, a: number) {
  return `rgba(${c.r},${c.g},${c.b},${a})`;
}

// ── 1. PARTICLE NETWORK — for SIM ──
interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  pulse: number;
  speed: number;
}

function initParticles(w: number, h: number): Particle[] {
  const count = Math.min(Math.floor((w * h) / 4000), 60);
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.6,
    vy: (Math.random() - 0.5) * 0.6,
    size: Math.random() * 2.5 + 1,
    pulse: Math.random() * Math.PI * 2,
    speed: Math.random() * 0.5 + 0.3,
  }));
}

function drawParticleNetwork(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, particles: Particle[]) {
  ctx.clearRect(0, 0, w, h);
  const connectionDist = Math.min(w, h) * 0.2;

  for (const p of particles) {
    p.x += p.vx * p.speed;
    p.y += p.vy * p.speed;
    if (p.x < 0 || p.x > w) p.vx *= -1;
    if (p.y < 0 || p.y > h) p.vy *= -1;
    p.x = Math.max(0, Math.min(w, p.x));
    p.y = Math.max(0, Math.min(h, p.y));
  }

  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const a = particles[i];
      const b = particles[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connectionDist) {
        const alpha = (1 - dist / connectionDist) * 0.25;
        const pulse = Math.sin(t * 0.5 + i * 0.3) * 0.5 + 0.5;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = rgba(GOLD, alpha * (0.5 + pulse * 0.5));
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const pulse = Math.sin(t * 1.2 + p.pulse) * 0.5 + 0.5;
    const alpha = 0.3 + pulse * 0.5;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * (0.8 + pulse * 0.4), 0, Math.PI * 2);
    ctx.fillStyle = rgba(GOLD, alpha);
    ctx.fill();
  }
}

// ── 2. CONCENTRIC RINGS — for ENGINE ──
function drawConcentricRings(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) * 0.42;
  const ringCount = 6;

  for (let ring = 0; ring < ringCount; ring++) {
    const r = maxR * ((ring + 1) / ringCount);
    const rotSpeed = (ring % 2 === 0 ? 1 : -1) * (0.2 + ring * 0.08);
    const rotation = t * rotSpeed;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    const ringAlpha = 0.08 + (ring / ringCount) * 0.12;
    ctx.strokeStyle = rgba(GOLD, ringAlpha);
    ctx.lineWidth = 0.8;
    ctx.stroke();

    const dashCount = 8 + ring * 4;
    for (let d = 0; d < dashCount; d++) {
      const angle = rotation + (Math.PI * 2 / dashCount) * d;
      const dashLen = 4 + ring * 2;
      const pulse = Math.sin(t * 1.5 + d * 0.5 + ring) * 0.5 + 0.5;
      const x1 = cx + (r - dashLen) * Math.cos(angle);
      const y1 = cy + (r - dashLen) * Math.sin(angle);
      const x2 = cx + (r + dashLen) * Math.cos(angle);
      const y2 = cy + (r + dashLen) * Math.sin(angle);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = rgba(GOLD, ringAlpha + pulse * 0.15);
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    const nodeCount = 2 + ring;
    for (let n = 0; n < nodeCount; n++) {
      const angle = rotation * 1.5 + (Math.PI * 2 / nodeCount) * n;
      const nx = cx + r * Math.cos(angle);
      const ny = cy + r * Math.sin(angle);
      const pulse = Math.sin(t * 2 + n * 1.3 + ring * 0.7) * 0.5 + 0.5;
      const nodeSize = 2 + pulse * 2;
      ctx.beginPath();
      ctx.arc(nx, ny, nodeSize, 0, Math.PI * 2);
      ctx.fillStyle = rgba(GOLD, 0.5 + pulse * 0.4);
      ctx.fill();
    }
  }

  const corePulse = Math.sin(t * 1.2) * 0.5 + 0.5;
  ctx.beginPath();
  ctx.arc(cx, cy, 3, 0, Math.PI * 2);
  ctx.fillStyle = rgba(GOLD, 0.8 + corePulse * 0.2);
  ctx.fill();
}

// ── 3. DATA MATRIX — for SURFACE ──
function drawDataMatrix(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.clearRect(0, 0, w, h);
  const cellSize = Math.min(w, h) * 0.045;
  const gap = cellSize * 0.3;
  const totalCell = cellSize + gap;
  const cols = Math.ceil(w / totalCell) + 1;
  const rows = Math.ceil(h / totalCell) + 1;
  const offsetX = (w - cols * totalCell) / 2 + totalCell / 2;
  const offsetY = (h - rows * totalCell) / 2 + totalCell / 2;
  const cx = w / 2;
  const cy = h / 2;
  const maxDist = Math.sqrt(cx * cx + cy * cy);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = offsetX + col * totalCell;
      const y = offsetY + row * totalCell;
      const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
      const distNorm = dist / maxDist;
      const wave1 = Math.sin(t * 0.6 + col * 0.3 + row * 0.2) * 0.5 + 0.5;
      const wave2 = Math.sin(t * 0.4 - dist * 0.01) * 0.5 + 0.5;
      const combined = wave1 * 0.6 + wave2 * 0.4;
      const baseAlpha = 0.04 + (1 - distNorm) * 0.12;
      const alpha = baseAlpha + combined * 0.2;
      const seed = (col * 7 + row * 13) % 5;

      switch (seed) {
        case 0:
          ctx.fillStyle = rgba(GOLD, alpha * 0.4);
          ctx.fillRect(x - cellSize / 2, y - cellSize / 2, cellSize, cellSize);
          ctx.strokeStyle = rgba(GOLD, alpha);
          ctx.lineWidth = 0.5;
          ctx.strokeRect(x - cellSize / 2, y - cellSize / 2, cellSize, cellSize);
          break;
        case 1:
          ctx.beginPath();
          ctx.arc(x, y, cellSize / 2.5, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(GOLD, alpha * 1.2);
          ctx.lineWidth = 0.8;
          ctx.stroke();
          break;
        case 2: {
          const ds = cellSize / 2.2;
          ctx.beginPath();
          ctx.moveTo(x, y - ds);
          ctx.lineTo(x + ds, y);
          ctx.lineTo(x, y + ds);
          ctx.lineTo(x - ds, y);
          ctx.closePath();
          ctx.strokeStyle = rgba(GOLD, alpha);
          ctx.lineWidth = 0.5;
          ctx.stroke();
          break;
        }
        case 3: {
          const ps = cellSize / 3;
          ctx.beginPath();
          ctx.moveTo(x - ps, y);
          ctx.lineTo(x + ps, y);
          ctx.moveTo(x, y - ps);
          ctx.lineTo(x, y + ps);
          ctx.strokeStyle = rgba(DIM_GOLD, alpha * 0.8);
          ctx.lineWidth = 0.8;
          ctx.stroke();
          break;
        }
        case 4:
          ctx.beginPath();
          ctx.arc(x, y, 1.5 + combined * 1, 0, Math.PI * 2);
          ctx.fillStyle = rgba(GOLD, alpha * 0.8);
          ctx.fill();
          break;
      }
    }
  }

  // Scanning line
  const scanY = ((t * 30) % (h + 40)) - 20;
  ctx.beginPath();
  ctx.moveTo(0, scanY);
  ctx.lineTo(w, scanY);
  const scanGrd = ctx.createLinearGradient(0, scanY, w, scanY);
  scanGrd.addColorStop(0, rgba(GOLD, 0));
  scanGrd.addColorStop(0.5, rgba(GOLD, 0.3));
  scanGrd.addColorStop(1, rgba(GOLD, 0));
  ctx.strokeStyle = scanGrd;
  ctx.lineWidth = 1;
  ctx.stroke();
}

const drawFunctions: Record<FeatureVariant, (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, extra?: unknown) => void> = {
  particles: (ctx, w, h, t, extra) => drawParticleNetwork(ctx, w, h, t, extra as Particle[]),
  rings: drawConcentricRings,
  datamatrix: drawDataMatrix,
};

export default function FeatureCanvas({ variant, className = '' }: FeatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      animRef.current = requestAnimationFrame(animate);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(rect.width * dpr);
    const ch = Math.round(rect.height * dpr);

    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
      ctx.scale(dpr, dpr);
      if (variant === 'particles') {
        particlesRef.current = initParticles(rect.width, rect.height);
      }
    }

    const t = performance.now() / 1000;
    if (variant === 'particles') {
      drawParticleNetwork(ctx, rect.width, rect.height, t, particlesRef.current);
    } else {
      drawFunctions[variant](ctx, rect.width, rect.height, t);
    }

    animRef.current = requestAnimationFrame(animate);
  }, [variant]);

  useEffect(() => {
    if (typeof window === 'undefined' || window.innerWidth < 768) return;

    animRef.current = requestAnimationFrame(animate);

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animRef.current);
      } else {
        animRef.current = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ display: 'block' }}
    />
  );
}
