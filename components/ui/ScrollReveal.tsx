'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  duration?: number;
}

export default function ScrollReveal({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 20,
  duration = 0.5
}: ScrollRevealProps) {
  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const initialValue = direction === 'up' || direction === 'left' ? distance : -distance;

  return (
    <motion.div
      initial={{ opacity: 0, [axis]: initialValue }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.33, 1, 0.68, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
