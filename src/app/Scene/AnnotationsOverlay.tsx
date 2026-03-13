"use client";

import type { OverlayItem, SceneMode } from "./types";

const items: OverlayItem[] = [
  {
    id: "SIMULATION",
    title: "SIMULATION",
    subtitle: "STATE MODELLING",
    top: "23%",
    right: "6%",
  },
  {
    id: "VALIDATION",
    title: "VALIDATION",
    subtitle: "CONSTRAINT CHECK",
    top: "46%",
    right: "5%",
  },
  {
    id: "EXECUTION",
    title: "EXECUTION",
    subtitle: "ACTION OUTPUT",
    top: "68%",
    right: "7%",
  },
];

export default function AnnotationsOverlay({
  mode,
  setMode,
}: {
  mode: SceneMode;
  setMode: (mode: SceneMode) => void;
}) {
  return (
    <div className="pointer-events-none absolute inset-0">
      {items.map((item) => {
        const active = mode === item.id;

        return (
          <button
            key={item.id}
            type="button"
            onClick={() => setMode(item.id)}
            onMouseEnter={() => setMode(item.id)}
            className="pointer-events-auto absolute flex items-center gap-3 bg-transparent text-left transition-all duration-300"
            style={{ top: item.top, right: item.right }}
          >
            <span
              className={`h-px w-16 transition-all duration-300 ${
                active ? "bg-cyan-100" : "bg-white/25"
              }`}
            />
            <span
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                active
                  ? "bg-cyan-300 shadow-[0_0_18px_rgba(110,210,255,0.95)]"
                  : "bg-cyan-300/70 shadow-[0_0_8px_rgba(110,210,255,0.25)]"
              }`}
            />
            <span>
              <span
                className={`block text-[15px] uppercase tracking-[0.28em] transition-all duration-300 ${
                  active ? "text-white" : "text-white/72"
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