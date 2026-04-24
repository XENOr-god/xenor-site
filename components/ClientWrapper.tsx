'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import EntryGate from './EntryGate';
import Navbar from './Navbar';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  const [isEntryComplete, setIsEntryComplete] = useState(false);

  return (
    <AnimatePresence mode="wait">
      {!isEntryComplete ? (
        <EntryGate key="gate" onComplete={() => setIsEntryComplete(true)} />
      ) : (
        <motion.div
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Navbar />
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
