'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryGateProps {
  onComplete: () => void;
}

export default function EntryGate({ onComplete }: EntryGateProps) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'input' | 'loading' | 'complete'>('input');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);

  const terminalLogs = [
    "INITIALIZING_VIRTUAL_MACHINE...",
    "CONNECTING_TO_XENOR_CORE...",
    "AUTHENTICATING_USER_PROTOCOL...",
    "DECRYPTING_SECURE_LAYER_01...",
    "ALLOCATING_DETERMINISTIC_SUBSTRATE...",
    "SYNCING_SOLANA_MAINNET_STATE...",
    "VERIFYING_SYSTEM_INTEGRITY...",
    "ESTABLISHING_ENCRYPTED_TUNNEL...",
    "PROTOCOL_GATE_COMPLETE.",
    "WELCOME_TO_THE_VOID."
  ];

  useEffect(() => {
    if (status === 'loading') {
      const timer = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(timer);
            setTimeout(() => setStatus('complete'), 500);
            return 100;
          }
          return prev + 1;
        });
      }, 30);

      // Add logs periodically
      const logInterval = setInterval(() => {
        setLogs((prev) => {
          if (prev.length < terminalLogs.length) {
            return [...prev, terminalLogs[prev.length]];
          }
          return prev;
        });
      }, 300);

      return () => {
        clearInterval(timer);
        clearInterval(logInterval);
      };
    }
  }, [status]);

  useEffect(() => {
    if (status === 'complete') {
      setTimeout(() => onComplete(), 800);
    }
  }, [status, name, onComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setStatus('loading');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0c]/80 flex items-center justify-center overflow-hidden font-mono backdrop-blur-sm">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_70%)]" />
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <AnimatePresence mode="wait">
        {status === 'input' && (
          <motion.div
            key="input-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-lg p-16 glass border border-white/5 overflow-hidden"
          >
            {/* HUD Corner Decor */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-[3px] border-l-[3px] border-accent z-20" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-[3px] border-r-[3px] border-accent z-20" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/20" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-white/20" />

            <div className="relative z-10 text-center">
              <div className="mb-12 flex flex-col items-center">
                <div className="mb-6 flex items-center gap-2">
                  <span className="pulse-red" />
                  <span className="text-[10px] text-white/40 uppercase tracking-[0.4em] font-bold">Protocol_Access: Required</span>
                </div>
                <h2 className="text-white text-4xl font-grotesk font-black tracking-tighter uppercase mb-4">XENOR_PROTOCOL</h2>
                <p className="text-white/30 text-[9px] tracking-[0.3em] uppercase">System_Gate_Encryption_Layer_01</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative group">
                  <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="ENTER_IDENTIFIER_"
                    className="w-full bg-white/[0.03] border border-white/10 px-8 py-5 text-center text-white placeholder:text-white/10 focus:outline-none focus:border-white/30 transition-all rounded-none tracking-[0.2em] font-bold text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!name.trim()}
                  className="w-full py-4 border border-white/20 text-white font-black tracking-[0.4em] text-[10px] uppercase hover:bg-white hover:text-black transition-all disabled:opacity-20"
                >
                  INITIALIZE_SESSION
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {status === 'loading' && (
          <motion.div
            key="loading-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-2xl p-20 glass border border-white/5 overflow-hidden"
          >
            {/* HUD Corner Decor */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-[3px] border-l-[3px] border-accent z-20" />
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-[3px] border-r-[3px] border-accent z-20" />

            <div className="relative z-10">
              <div className="mb-20 flex flex-col items-center text-center">
                <div className="text-[11px] text-accent uppercase tracking-[0.8em] font-black mb-8">Decrypting_Matrix_State</div>
                
                {/* Segmented Technical Bar */}
                <div className="flex gap-1.5 h-12 items-center">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-8 skew-x-12 transition-all duration-300 ${
                        (progress / 5) > i ? 'bg-accent shadow-[0_0_15px_rgba(124,255,0,0.5)]' : 'bg-white/5'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-8 max-w-xl mx-auto">
                {/* Progress Bar */}
                <div className="w-full h-[2px] bg-white/5 border border-white/10 relative">
                  <motion.div
                    className="h-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)]"
                    style={{ width: `${progress}%` }}
                  />
                </div>

                {/* Terminal Logs */}
                <div className="h-48 overflow-hidden text-[9px] text-white/30 uppercase tracking-[0.2em] space-y-3 pt-6 border-t border-white/5">
                  <AnimatePresence mode="popLayout">
                    {logs.slice(-5).map((log, i) => (
                      <motion.div
                        key={log}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center gap-6"
                      >
                        <span className="text-accent font-bold">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                        <span>{log}</span>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

