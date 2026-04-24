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
  // Simple check to disable or simplify on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  const axis = direction === 'up' || direction === 'down' ? 'y' : 'x';
  const initialValue = direction === 'up' || direction === 'left' ? distance : -distance;

  return (
    <motion.div
      initial={{ opacity: 0, [axis]: initialValue }}
      whileInView={{ opacity: 1, [axis]: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ 
        duration: duration, 
        delay: delay, 
        ease: [0.33, 1, 0.68, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
