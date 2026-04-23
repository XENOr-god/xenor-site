'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryGateProps {
  onComplete: (name: string) => void;
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
    "PROTOCOL_HANDSHAKE_COMPLETE.",
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
      setTimeout(() => onComplete(name), 800);
    }
  }, [status, name, onComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setStatus('loading');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#020203] flex items-center justify-center overflow-hidden font-mono">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,229,255,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-accent/[0.01] animate-scanline pointer-events-none" />
      
      <AnimatePresence mode="wait">
        {status === 'input' && (
          <motion.div
            key="input-stage"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="relative z-10 w-full max-w-md px-10 text-center"
          >
            <div className="mb-10 flex flex-col items-center">
              <div className="w-16 h-16 mb-6 border border-accent/30 flex items-center justify-center bg-accent/5 rotate-45 group">
                <div className="w-8 h-8 border border-accent bg-accent/20 animate-pulse -rotate-45" />
              </div>
              <h2 className="text-accent text-sm font-black tracking-[0.5em] uppercase mb-2">Identify_Protocol</h2>
              <p className="text-muted-foreground text-[10px] tracking-widest uppercase">System_Access_Requires_Authentication</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative group">
                <input
                  autoFocus
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ENTER_IDENTIFIER_"
                  className="w-full bg-white/[0.02] border border-white/10 px-6 py-4 text-center text-white placeholder:text-white/10 focus:outline-none focus:border-accent/50 focus:bg-accent/5 transition-all rounded-sm tracking-widest"
                />
                <div className="absolute inset-0 border border-accent/0 group-focus-within:border-accent/20 rounded-sm pointer-events-none transition-all scale-105" />
              </div>
              
              <button
                type="submit"
                disabled={!name.trim()}
                className="w-full py-4 border border-accent/30 text-accent font-black tracking-[0.3em] text-xs uppercase hover:bg-accent hover:text-black transition-all disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-accent group overflow-hidden relative"
              >
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 bg-accent transition-transform duration-500" />
                <span className="relative z-10">INITIALIZE_HANDSHAKE</span>
              </button>
            </form>
          </motion.div>
        )}

        {status === 'loading' && (
          <motion.div
            key="loading-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-xl px-10"
          >
            <div className="mb-12 flex flex-col items-center text-center">
              <div className="text-6xl font-black font-grotesk text-white italic mb-2 tracking-tighter">
                {progress}%
              </div>
              <div className="text-[10px] text-accent uppercase tracking-[0.5em] font-black">Syncing_Neural_Matrix</div>
            </div>

            <div className="space-y-6">
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-white/5 border border-white/10 rounded-full overflow-hidden relative">
                <motion.div 
                  className="h-full bg-accent shadow-[0_0_20px_#00e5ff]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              {/* Terminal Logs */}
              <div className="h-40 overflow-hidden text-[9px] text-muted-foreground/60 uppercase tracking-widest space-y-2 pt-4">
                <AnimatePresence mode="popLayout">
                  {logs.slice(-6).map((log, i) => (
                    <motion.div
                      key={log}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-4"
                    >
                      <span className="text-accent/40">[{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]</span>
                      <span>{log}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
