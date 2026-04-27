'use client';

import { useRef, useEffect, useCallback } from 'react';

const GOLD = { r: 255, g: 215, b: 0 };
function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r},${g},${b},${a})`;
}

interface FloatingNode {
  x: number; y: number;
  vx: number; vy: number;
  size: number;
  phase: number;
  type: 'dot' | 'ring' | 'diamond' | 'cross';
}

function drawHeroBackground(ctx: CanvasRenderingContext2D, w: number, h: number, t: number, nodes: FloatingNode[]) {
  ctx.clearRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.5;

  // Subtle radial grid lines from center
  const gridLineCount = 12;
  for (let i = 0; i < gridLineCount; i++) {
    const angle = (Math.PI * 2 / gridLineCount) * i + t * 0.02;
    const len = Math.max(w, h) * 0.7;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len);
    ctx.strokeStyle = rgba(GOLD.r, GOLD.g, GOLD.b, 0.015);
    ctx.lineWidth = 0.5;
    ctx.stroke();
  }

  // Concentric pulse rings from center
  for (let ring = 0; ring < 5; ring++) {
    const baseRadius = 80 + ring * 100;
    const pulse = Math.sin(t * 0.5 - ring * 0.8) * 0.5 + 0.5;
    const r = baseRadius + pulse * 20;
    const alpha = 0.02 + pulse * 0.03;

    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = rgba(GOLD.r, GOLD.g, GOLD.b, alpha);
    ctx.lineWidth = 0.5;
    ctx.stroke();

    const segCount = 4 + ring * 2;
    for (let s = 0; s < segCount; s++) {
      const startAngle = (Math.PI * 2 / segCount) * s + t * (ring % 2 === 0 ? 0.1 : -0.08);
      const arcLen = (Math.PI * 2 / segCount) * 0.3;
      ctx.beginPath();
      ctx.arc(cx, cy, r, startAngle, startAngle + arcLen);
      ctx.strokeStyle = rgba(GOLD.r, GOLD.g, GOLD.b, alpha * 2 + pulse * 0.04);
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  // Floating nodes
  const connectionDist = 150;
  for (const node of nodes) {
    node.x += node.vx;
    node.y += node.vy;
    if (node.x < -20 || node.x > w + 20) node.vx *= -1;
    if (node.y < -20 || node.y > h + 20) node.vy *= -1;
  }

  // Connections
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const a = nodes[i];
      const b = nodes[j];
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < connectionDist) {
        const alpha = (1 - dist / connectionDist) * 0.06;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.strokeStyle = rgba(GOLD.r, GOLD.g, GOLD.b, alpha);
        ctx.lineWidth = 0.3;
        ctx.stroke();
      }
    }
  }

  // Draw nodes
  for (const node of nodes) {
    const pulse = Math.sin(t * 1.2 + node.phase) * 0.5 + 0.5;
    const alpha = 0.1 + pulse * 0.25;

    switch (node.type) {
      case 'dot':
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * (0.7 + pulse * 0.5), 0, Math.PI * 2);
        ctx.fillStyle = rgba(GOLD.r, GOLD.g, GOLD.b, alpha);
        ctx.fill();
        break;
      case 'ring':
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size * 1.5, 0, Math.PI * 2);
        ctx.strokeStyle = rgba(GOLD.r, GOLD.g, GOLD.b, alpha * 0.8);
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = rgba(GOLD.r, GOLD.g, GOLD.b, alpha);
        ctx.fill();
        break;
      case 'diamond': {
        const s = node.size * 1.5;
        ctx.beginPath();
        ctx.moveTo(node.x, node.y - s);
        ctx.lineTo(node.x + s, node.y);
        ctx.lineTo(node.x, node.y + s);
        ctx.lineTo(node.x - s, node.y);
        ctx.closePath();
        ctx.strokeStyle = rgba(GOLD.r, GOLD.g, GOLD.b, alpha * 0.6);
        ctx.lineWidth = 0.5;
        ctx.stroke();
        break;
      }
      case 'cross': {
        const s = node.size;
        ctx.beginPath();
        ctx.moveTo(node.x - s, node.y);
        ctx.lineTo(node.x + s, node.y);
        ctx.moveTo(node.x, node.y - s);
        ctx.lineTo(node.x, node.y + s);
        ctx.strokeStyle = rgba(GOLD.r, GOLD.g, GOLD.b, alpha * 0.5);
        ctx.lineWidth = 0.5;
        ctx.stroke();
        break;
      }
    }
  }

  // Horizontal scan line
  const scanY = ((t * 25) % (h + 60)) - 30;
  const scanGrd = ctx.createLinearGradient(0, scanY, w, scanY);
  scanGrd.addColorStop(0, rgba(GOLD.r, GOLD.g, GOLD.b, 0));
  scanGrd.addColorStop(0.3, rgba(GOLD.r, GOLD.g, GOLD.b, 0.04));
  scanGrd.addColorStop(0.5, rgba(GOLD.r, GOLD.g, GOLD.b, 0.08));
  scanGrd.addColorStop(0.7, rgba(GOLD.r, GOLD.g, GOLD.b, 0.04));
  scanGrd.addColorStop(1, rgba(GOLD.r, GOLD.g, GOLD.b, 0));
  ctx.fillStyle = scanGrd;
  ctx.fillRect(0, scanY - 1, w, 2);
}

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<FloatingNode[]>([]);
  const lastSizeRef = useRef({ w: 0, h: 0 });

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const cw = Math.round(rect.width * dpr);
    const ch = Math.round(rect.height * dpr);

    // Re-init nodes only when size changes
    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
      ctx.scale(dpr, dpr);
      if (lastSizeRef.current.w !== rect.width || lastSizeRef.current.h !== rect.height) {
        const count = Math.min(Math.floor((rect.width * rect.height) / 8000), 60);
        const types: FloatingNode['type'][] = ['dot', 'ring', 'diamond', 'cross'];
        nodesRef.current = Array.from({ length: count }, () => ({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 3 + 1.5,
          phase: Math.random() * Math.PI * 2,
          type: types[Math.floor(Math.random() * types.length)],
        }));
        lastSizeRef.current = { w: rect.width, h: rect.height };
      }
    }

    const t = performance.now() / 1000;
    drawHeroBackground(ctx, rect.width, rect.height, t, nodesRef.current);
    animRef.current = requestAnimationFrame(animate);
  }, []);

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
      className="absolute inset-0 w-full h-full z-0"
      style={{ display: 'block' }}
    />
  );
}
