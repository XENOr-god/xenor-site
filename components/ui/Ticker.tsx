'use client';

import { motion } from 'framer-motion';

interface TickerProps {
  items: string[];
  reverse?: boolean;
}

export default function Ticker({ items, reverse = false }: TickerProps) {
  // Double the items to ensure seamless loop
  const displayItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full bg-white/[0.03] border-y border-white/10 py-5 overflow-hidden flex whitespace-nowrap relative z-20">
      <motion.div
        animate={{
          x: reverse ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          },
        }}
        className="flex items-center gap-8 md:gap-16 px-8 md:px-16"
      >
        {displayItems.map((item, index) => (
          <div key={index} className="flex items-center gap-8 md:gap-16">
            <span className="font-mono text-[10px] md:text-xs text-text/40 uppercase tracking-[0.4em] font-bold">
              {item}
            </span>
            <div className="w-1.5 h-1.5 rotate-45 border border-accent/40 shadow-[0_0_8px_rgba(0,229,255,0.2)]" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
