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
    <div className="w-full bg-black/40 border-y border-white/5 py-6 overflow-hidden flex whitespace-nowrap relative z-20">
      <motion.div
        animate={{
          x: reverse ? [0, -1000] : [-1000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 35,
            ease: "linear",
          },
        }}
        className="flex items-center gap-10 md:gap-20 px-10 md:px-20"
      >
        {displayItems.map((item, index) => (
          <div key={index} className="flex items-center gap-10 md:gap-20">
            <span className="font-mono text-[9px] md:text-[10px] text-white/30 uppercase tracking-[0.5em] font-bold italic">
              {item}
            </span>
            <div className="w-[1px] h-3 bg-white/10" />
          </div>
        ))}
      </motion.div>
    </div>
  );
}

