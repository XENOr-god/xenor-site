"use client";

import { useMemo, useRef, useState } from "react";
import type {
  CSSProperties,
  KeyboardEvent,
  PointerEvent,
} from "react";

type HeroWiremarkProps = {
  className?: string;
  animated?: boolean;
};

export function HeroWiremark({ className, animated = true }: HeroWiremarkProps) {
  const [cursorVars, setCursorVars] = useState({
    "--cursor-noise-x": "0px",
    "--cursor-noise-y": "0px",
    "--cursor-node-x": "0px",
    "--cursor-node-y": "0px",
  });
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastPlayRef = useRef(0);

  const animationClass = animated ? "wiremark-animated" : "wiremark-static";
  const points = useMemo(
    () =>
      Array.from({ length: 48 }).map((_, i) => ({
        key: `p-${i}`,
        cx: 70 + ((i * 79) % 420),
        cy: 72 + ((i * 47) % 292),
      })),
    []
  );

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

    setCursorVars({
      "--cursor-noise-x": `${relativeX * 16}px`,
      "--cursor-noise-y": `${relativeY * 16}px`,
      "--cursor-node-x": `${relativeX * 6}px`,
      "--cursor-node-y": `${relativeY * 6}px`,
    });
  }

  function handlePointerLeave() {
    setCursorVars({
      "--cursor-noise-x": "0px",
      "--cursor-noise-y": "0px",
      "--cursor-node-x": "0px",
      "--cursor-node-y": "0px",
    });
  }

  async function playSignalTone() {
    const nowPerf = performance.now();
    if (nowPerf - lastPlayRef.current < 120) return;
    lastPlayRef.current = nowPerf;

    const audioContextConstructor =
      window.AudioContext ||
      (window as Window & { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!audioContextConstructor) return;

    const audioContext = audioContextRef.current ?? new audioContextConstructor();
    audioContextRef.current = audioContext;

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    const now = audioContext.currentTime;
    const variation = (Math.random() - 0.5) * 0.08;

    const masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.0001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.15, now + 0.004);
    masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.11);
    masterGain.connect(audioContext.destination);

    const clickBuffer = audioContext.createBuffer(
      1,
      Math.floor(audioContext.sampleRate * 0.018),
      audioContext.sampleRate
    );
    const clickData = clickBuffer.getChannelData(0);
    for (let i = 0; i < clickData.length; i += 1) {
      clickData[i] = (Math.random() * 2 - 1) * (1 - i / clickData.length);
    }

    const clickSource = audioContext.createBufferSource();
    clickSource.buffer = clickBuffer;
    const clickFilter = audioContext.createBiquadFilter();
    clickFilter.type = "highpass";
    clickFilter.frequency.setValueAtTime(1700, now);
    clickFilter.Q.setValueAtTime(0.75, now);
    const clickGain = audioContext.createGain();
    clickGain.gain.setValueAtTime(0.55, now);
    clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.02);
    clickSource.connect(clickFilter);
    clickFilter.connect(clickGain);
    clickGain.connect(masterGain);

    const thockOsc = audioContext.createOscillator();
    thockOsc.type = "sine";
    thockOsc.frequency.setValueAtTime(210 * (1 + variation), now);
    thockOsc.frequency.exponentialRampToValueAtTime(138 * (1 + variation), now + 0.07);
    const thockGain = audioContext.createGain();
    thockGain.gain.setValueAtTime(0.001, now);
    thockGain.gain.exponentialRampToValueAtTime(0.12, now + 0.005);
    thockGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.085);
    thockOsc.connect(thockGain);
    thockGain.connect(masterGain);

    const topOsc = audioContext.createOscillator();
    topOsc.type = "triangle";
    topOsc.frequency.setValueAtTime(2800 * (1 + variation), now);
    topOsc.frequency.exponentialRampToValueAtTime(1900 * (1 + variation), now + 0.03);
    const topGain = audioContext.createGain();
    topGain.gain.setValueAtTime(0.0001, now);
    topGain.gain.exponentialRampToValueAtTime(0.035, now + 0.002);
    topGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.035);
    topOsc.connect(topGain);
    topGain.connect(masterGain);

    clickSource.start(now);
    clickSource.stop(now + 0.02);
    thockOsc.start(now);
    thockOsc.stop(now + 0.09);
    topOsc.start(now);
    topOsc.stop(now + 0.04);
  }

  function handleTrigger() {
    void playSignalTone();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Tab") return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    } else if (event.key.length !== 1) {
      return;
    }
    handleTrigger();
  }

  return (
    <div
      className="hero-wiremark-wrap"
      style={cursorVars as CSSProperties}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handleTrigger}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="Interactive protocol mark. Click or type while focused to play keyboard click sound."
    >
      <svg
        viewBox="0 0 560 420"
        role="img"
        aria-label="Geometric protocol structure"
        className={["wiremark-svg", animationClass, className].filter(Boolean).join(" ")}
      >
        <g className="wiremark-grid">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <line
              key={`h-${i}`}
              x1={60 + i * 20}
              y1={350 - i * 48}
              x2={500 - i * 20}
              y2={350 - i * 48}
            />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`d1-${i}`} x1={80 + i * 95} y1={350} x2={280} y2={48} />
          ))}
          {[0, 1, 2, 3, 4].map((i) => (
            <line key={`d2-${i}`} x1={478 - i * 95} y1={350} x2={280} y2={48} />
          ))}
        </g>

        <g className="wiremark-axis">
          <line x1="70" y1="350" x2="492" y2="350" />
          <line x1="280" y1="62" x2="280" y2="360" />
        </g>

        <g className="wiremark-orbits">
          <ellipse cx="280" cy="350" rx="206" ry="19" />
          <ellipse cx="280" cy="350" rx="148" ry="13" />
        </g>

        <g className="wiremark-structure">
          <polygon points="280,48 80,350 478,350" />
          <polygon points="280,120 142,332 420,332" />
          <line x1="80" y1="350" x2="420" y2="332" />
          <line x1="478" y1="350" x2="142" y2="332" />
          <line x1="280" y1="48" x2="280" y2="350" />
          <line x1="190" y1="210" x2="372" y2="210" />
          <line x1="150" y1="276" x2="408" y2="276" />
        </g>

        <g className="wiremark-nodes">
          {[
            [280, 48],
            [80, 350],
            [478, 350],
            [142, 332],
            [420, 332],
            [280, 120],
            [280, 210],
            [190, 210],
            [372, 210],
            [150, 276],
            [408, 276],
            [280, 350],
          ].map(([x, y], i) => (
            <circle key={`n-${i}`} cx={x} cy={y} r={i % 3 === 0 ? 4.2 : 3} />
          ))}
        </g>

        <g className="wiremark-noise" aria-hidden="true">
          {points.map((point) => (
            <circle key={point.key} cx={point.cx} cy={point.cy} r={1.2} />
          ))}
        </g>
      </svg>
    </div>
  );
}
