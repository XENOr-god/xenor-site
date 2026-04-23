'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleCopy}
      className="flex items-center gap-3 px-6 py-3 border border-accent/30 text-accent font-mono text-[11px] uppercase tracking-widest hover:bg-accent hover:text-bg-base transition-all duration-300"
    >
      <AnimatePresence mode="wait">
        {copied ? (
          <motion.div
            key="check"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Check size={14} />
            <span>Copied!</span>
          </motion.div>
        ) : (
          <motion.div
            key="copy"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex items-center gap-2"
          >
            <Copy size={14} />
            <span>Copy</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

