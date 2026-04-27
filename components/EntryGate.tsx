'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface EntryGateProps {
  onComplete: () => void;
}

const GLITCH_CHARS = '!<>-_\\/[]{}—=+*^?#________';

function useGlitchText(text: string, active: boolean) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let frame = 0;
    const chars = text.split('');
    const interval = setInterval(() => {
      setDisplay(
        chars.map((c, i) =>
          i < frame / 2
            ? c
            : c === ' '
            ? ' '
            : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        ).join('')
      );
      if (frame >= chars.length * 2) clearInterval(interval);
      frame++;
    }, 30);
    return () => clearInterval(interval);
  }, [text, active]);
  return display;
}

export default function EntryGate({ onComplete }: EntryGateProps) {
  const [name, setName] = useState('');
  const [status, setStatus] = useState<'input' | 'loading' | 'success' | 'complete'>('input');
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>([]);
  const [glitching, setGlitching] = useState(false);
  const [focused, setFocused] = useState(false);
  const [tick, setTick] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const glitchTitle = useGlitchText('XENOR_PROTOCOL', glitching);

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

  // Periodic glitch on title
  useEffect(() => {
    const g = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 600);
    }, 4000);
    return () => clearInterval(g);
  }, []);

  // Blinking tick counter for cursor / data streams
  useEffect(() => {
    const t = setInterval(() => setTick(p => p + 1), 80);
    return () => clearInterval(t);
  }, []);

  // Hex-grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();

    const drawHex = (cx: number, cy: number, r: number, alpha: number) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.strokeStyle = `rgba(255,215,0,${alpha})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;
      const R = 28;
      const W = R * Math.sqrt(3);
      const H = R * 1.5;
      const cols = Math.ceil(canvas.width / W) + 2;
      const rows = Math.ceil(canvas.height / H) + 2;
      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const cx = col * W + (row % 2 === 0 ? 0 : W / 2);
          const cy = row * H;
          const dist = Math.sqrt((cx - canvas.width / 2) ** 2 + (cy - canvas.height / 2) ** 2);
          const pulse = Math.sin(t * 2 - dist * 0.01) * 0.5 + 0.5;
          const alpha = pulse * 0.04 + 0.01;
          drawHex(cx, cy, R - 2, alpha);
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);

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
      const logInterval = setInterval(() => {
        setLogs((prev) => {
          if (prev.length < terminalLogs.length) return [...prev, terminalLogs[prev.length]];
          return prev;
        });
      }, 300);
      return () => { clearInterval(timer); clearInterval(logInterval); };
    }
  }, [status]);

  // loading → success
  useEffect(() => {
    if (status === 'complete') {
      setTimeout(() => setStatus('success'), 500);
    }
  }, [status]);

  // success → site (auto after 3.5s)
  useEffect(() => {
    if (status === 'success') {
      const t = setTimeout(() => onComplete(), 3500);
      return () => clearTimeout(t);
    }
  }, [status, onComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) setStatus('loading');
  };

  const dataStream = Array.from({ length: 18 }, (_, i) =>
    ((tick + i * 7) % 36 < 18) ? '1' : '0'
  ).join('');

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden font-mono">

      {/* --- Layered Background --- */}
      <div className="absolute inset-0 bg-[#050508]/95" />

      {/* Hex grid canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Radial ambient — gold core */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(255,215,0,0.07)_0%,transparent_70%)] pointer-events-none" />

      {/* Scanline sweep */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255,215,0,0.03) 50%, transparent 100%)',
          height: '200%',
        }}
        animate={{ y: ['-50%', '0%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Data stream — left edge */}
      <div className="absolute left-4 top-0 bottom-0 flex flex-col items-center gap-0 pointer-events-none overflow-hidden w-6 hidden md:flex">
        <div className="font-mono text-[7px] text-accent/20 tracking-widest leading-[1.8] select-none">
          {dataStream.split('').map((c, i) => (
            <div key={i} style={{ opacity: 0.1 + (i % 5) * 0.06 }}>{c}</div>
          ))}
        </div>
      </div>

      {/* Data stream — right edge */}
      <div className="absolute right-4 top-0 bottom-0 flex flex-col items-center gap-0 pointer-events-none overflow-hidden w-6 hidden md:flex">
        <div className="font-mono text-[7px] text-accent/20 tracking-widest leading-[1.8] select-none">
          {dataStream.split('').reverse().map((c, i) => (
            <div key={i} style={{ opacity: 0.1 + (i % 4) * 0.05 }}>{c}</div>
          ))}
        </div>
      </div>

      {/* Top HUD bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-6 py-3 border-b border-white/5 pointer-events-none">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
          <span className="text-[8px] text-accent/50 uppercase tracking-[0.5em]">XENOR_OS v1.0.4</span>
        </div>
        <div className="flex items-center gap-6">
          <span className="text-[7px] text-white/15 uppercase tracking-widest">SYS_GATE</span>
          <span className="text-[7px] text-white/15 uppercase tracking-widest">//</span>
          <span className="text-[7px] text-white/15 uppercase tracking-widest">LAYER_01</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[7px] text-white/15 uppercase tracking-widest">SECURE</span>
        </div>
      </div>

      {/* Bottom HUD bar */}
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-6 py-3 border-t border-white/5 pointer-events-none">
        <span className="text-[7px] text-white/10 uppercase tracking-widest font-mono">ENCRYPTION: AES-256-GCM</span>
        <span className="text-[7px] text-white/10 uppercase tracking-widest font-mono">SOLANA: MAINNET</span>
        <span className="text-[7px] text-white/10 uppercase tracking-widest font-mono">DETERMINISTIC_CORE: ACTIVE</span>
      </div>

      <AnimatePresence mode="wait">

        {/* ====== INPUT STAGE ====== */}
        {status === 'input' && (
          <motion.div
            key="input-stage"
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.02, y: -10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-[92%] max-w-[440px] mx-auto"
          >
            {/* Outer glow */}
            <div className="absolute -inset-8 bg-accent/5 blur-[60px] rounded-full pointer-events-none" />

            {/* Main panel */}
            <div className="relative bg-black/70 border border-white/10 overflow-hidden backdrop-blur-xl">

              {/* Top gold accent line */}
              <motion.div
                className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear', repeatDelay: 2 }}
                style={{ width: '60%' }}
              />

              {/* Corner brackets — animated */}
              <motion.div
                className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-accent"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div
                className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-accent"
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/15" />
              <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/15" />

              {/* Vertical scanning line inside panel */}
              <motion.div
                className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-accent/20 to-transparent pointer-events-none"
                animate={{ x: ['-10px', '460px'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatDelay: 3 }}
              />

              <div className="px-8 py-10 sm:px-12 sm:py-14 text-center relative z-10">

                {/* Status badge */}
                <motion.div
                  className="flex items-center justify-center gap-2 mb-8"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.span
                    className="w-2 h-2 bg-accent rounded-full"
                    animate={{ scale: [1, 1.3, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <span className="text-[9px] text-accent/70 uppercase tracking-[0.45em] font-bold">
                    PROTOCOL_ACCESS: REQUIRED
                  </span>
                </motion.div>

                {/* Glitch title */}
                <motion.h1
                  className="text-white font-grotesk font-black tracking-tighter uppercase mb-1 relative"
                  style={{ fontSize: 'clamp(1.6rem, 5vw, 2.5rem)', lineHeight: 1 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {/* Glitch shadow layers */}
                  <span
                    className="absolute inset-0 text-accent/20 select-none pointer-events-none"
                    aria-hidden
                    style={{ transform: glitching ? 'translate(-2px, 1px)' : 'none', transition: 'transform 0.05s' }}
                  >
                    {glitchTitle}
                  </span>
                  <span
                    className="absolute inset-0 text-blue-400/10 select-none pointer-events-none"
                    aria-hidden
                    style={{ transform: glitching ? 'translate(2px, -1px)' : 'none', transition: 'transform 0.05s' }}
                  >
                    {glitchTitle}
                  </span>
                  <span className="relative z-10">{glitchTitle}</span>
                </motion.h1>

                <motion.p
                  className="text-white/25 text-[8px] tracking-[0.35em] uppercase mb-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  System_Gate_Encryption_Layer_01
                </motion.p>

                {/* Separator with dots */}
                <motion.div
                  className="flex items-center gap-2 justify-center mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent to-white/10" />
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.div
                        key={i}
                        className="w-1 h-1 bg-accent/40 rounded-full"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                  <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent to-white/10" />
                </motion.div>

                {/* Form */}
                <motion.form
                  onSubmit={handleSubmit}
                  className="space-y-4"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.55 }}
                >
                  {/* Input */}
                  <div className="relative group">
                    {/* Laser underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 h-[1px] bg-accent"
                      animate={focused ? { width: '100%' } : { width: '0%' }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    />
                    {/* Side accent */}
                    <div className={`absolute top-0 left-0 w-[2px] h-full bg-accent transition-opacity duration-300 ${focused ? 'opacity-100' : 'opacity-0'}`} />

                    <input
                      autoFocus
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      placeholder="ENTER_IDENTIFIER_"
                      className="w-full bg-white/[0.03] border border-white/8 border-b-0 px-6 py-4 text-center text-white placeholder:text-white/15 focus:outline-none focus:bg-white/[0.05] transition-all tracking-[0.25em] font-bold text-[11px] uppercase"
                    />
                    {/* Typing indicator */}
                    {focused && name && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-0.5">
                        {[0,1,2].map(i => (
                          <motion.div
                            key={i}
                            className="w-0.5 h-3 bg-accent/60"
                            animate={{ scaleY: [0.3, 1, 0.3] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    disabled={!name.trim()}
                    className="relative w-full py-3 overflow-hidden group/btn disabled:opacity-20 disabled:cursor-not-allowed"
                    whileHover={name.trim() ? { scale: 1.01 } : {}}
                    whileTap={name.trim() ? { scale: 0.99 } : {}}
                  >
                    {/* Button background layers */}
                    <div className="absolute inset-0 border border-white/20 group-hover/btn:border-accent/60 transition-colors duration-300" />
                    <motion.div
                      className="absolute inset-0 bg-accent/0 group-hover/btn:bg-accent/10 transition-colors duration-300"
                    />
                    {/* Sweep on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 pointer-events-none"
                      style={{ width: '50%', left: 0 }}
                    />
                    <span className="relative z-10 text-white group-hover/btn:text-accent font-black tracking-[0.4em] text-[9px] uppercase transition-colors duration-300">
                      INITIALIZE_SESSION
                    </span>
                    {/* Corner nubs */}
                    <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-accent/0 group-hover/btn:bg-accent transition-colors duration-200" />
                    <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-accent/0 group-hover/btn:bg-accent transition-colors duration-200" />
                  </motion.button>
                </motion.form>

                {/* Footer micro-info */}
                <motion.div
                  className="mt-6 flex justify-center gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  {['AES_256', 'SOL_NATIVE', 'DETERMINISTIC'].map((tag) => (
                    <span key={tag} className="text-[6px] text-white/15 uppercase tracking-widest">{tag}</span>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ====== LOADING STAGE ====== */}
        {status === 'loading' && (
          <motion.div
            key="loading-stage"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 w-[92%] max-w-[540px] mx-auto"
          >
            {/* Outer glow — more intense during loading */}
            <motion.div
              className="absolute -inset-12 bg-accent/8 blur-[80px] rounded-full pointer-events-none"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="relative bg-black/80 border border-accent/20 overflow-hidden backdrop-blur-xl">
              {/* Animated top line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-accent to-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1, repeat: Infinity }}
              />

              <div className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-accent" />
              <div className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-accent" />

              <div className="px-8 py-10 sm:px-16 sm:py-14">
                {/* Title */}
                <div className="text-center mb-8">
                  <motion.div
                    className="text-[9px] sm:text-[11px] text-accent uppercase tracking-[0.6em] font-black mb-4"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    Decrypting_Matrix_State
                  </motion.div>
                  <div className="text-[7px] text-white/20 uppercase tracking-widest">
                    USER: <span className="text-accent/60 font-bold">{name.toUpperCase()}</span>
                  </div>
                </div>

                {/* Segmented progress bar — dramatic */}
                <div className="flex gap-[3px] h-8 items-end justify-center mb-6">
                  {[...Array(24)].map((_, i) => {
                    const filled = (progress / 100) * 24 > i;
                    const isActive = Math.abs((progress / 100) * 24 - i) < 2;
                    return (
                      <motion.div
                        key={i}
                        className={`w-[10px] skew-x-[-8deg] transition-all duration-200 ${
                          filled
                            ? isActive
                              ? 'bg-accent shadow-[0_0_20px_rgba(255,215,0,0.8)]'
                              : 'bg-accent/70'
                            : 'bg-white/5'
                        }`}
                        style={{ height: filled ? `${24 + (isActive ? 10 : 0)}px` : '16px' }}
                        animate={filled && isActive ? { opacity: [0.7, 1, 0.7] } : {}}
                        transition={{ duration: 0.3, repeat: Infinity }}
                      />
                    );
                  })}
                </div>

                {/* Progress percentage */}
                <div className="text-center mb-6">
                  <motion.span
                    className="text-2xl font-black text-accent tabular-nums"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  >
                    {progress.toString().padStart(3, '0')}%
                  </motion.span>
                </div>

                {/* Progress line */}
                <div className="w-full h-[2px] bg-white/5 border border-white/5 relative mb-6 overflow-hidden">
                  <motion.div
                    className="h-full bg-accent shadow-[0_0_20px_rgba(255,215,0,0.6)]"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Shimmer on progress bar */}
                  <motion.div
                    className="absolute top-0 bottom-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    style={{ left: `${progress}%` }}
                    animate={{ x: ['-200%', '200%'] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  />
                </div>

                {/* Terminal logs */}
                <div className="h-36 sm:h-44 overflow-hidden text-[7px] sm:text-[9px] text-white/30 uppercase space-y-2 pt-3 border-t border-white/5">
                  <AnimatePresence mode="popLayout">
                    {logs.slice(-5).map((log, i) => (
                      <motion.div
                        key={log}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.03 }}
                        className="flex items-center gap-3 sm:gap-5 tracking-[0.1em]"
                      >
                        <span className="text-accent font-bold shrink-0">
                          [{new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}]
                        </span>
                        <span className={`truncate ${i === logs.slice(-5).length - 1 ? 'text-white/60' : ''}`}>{log}</span>
                        {i === logs.slice(-5).length - 1 && (
                          <motion.span
                            className="text-accent"
                            animate={{ opacity: [1, 0, 1] }}
                            transition={{ duration: 0.8, repeat: Infinity }}
                          >▋</motion.span>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ====== SUCCESS STAGE ====== */}
        {status === 'success' && (
          <motion.div
            key="success-stage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[110] flex items-center justify-center"
          >
            <motion.div
              className="absolute inset-0 bg-[#050508]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.97 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(ellipse_55%_45%_at_50%_50%,rgba(255,215,0,0.14)_0%,transparent_70%)]"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(255,215,0,0.012) 3px, rgba(255,215,0,0.012) 4px)' }}
            />
            <motion.div
              className="relative z-10 text-center px-8 max-w-sm w-full mx-auto"
              initial={{ y: 28, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Ring stack */}
              <div className="flex items-center justify-center mb-8">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <motion.div
                    className="absolute inset-0 rounded-full border border-accent/20"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute inset-3 rounded-full border border-dashed border-accent/30"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  />
                  <motion.div
                    className="absolute inset-6 rounded-full border-2 border-accent"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
                  />
                  <motion.div
                    className="absolute inset-6 rounded-full bg-accent/10"
                    animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0.1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="relative z-10 text-accent"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
                  >
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                      <motion.path
                        d="M6 16 L13 23 L26 9"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
                      />
                    </svg>
                  </motion.div>
                </div>
              </div>
              <motion.div
                className="flex items-center justify-center gap-2 mb-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span className="w-1.5 h-1.5 bg-accent rounded-full" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                <span className="font-mono text-[9px] text-accent/60 uppercase tracking-[0.5em]">ACCESS_GRANTED</span>
                <motion.span className="w-1.5 h-1.5 bg-accent rounded-full" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} />
              </motion.div>
              <motion.h2 className="font-grotesk font-black tracking-tighter uppercase text-white mb-1" style={{ fontSize: 'clamp(1.8rem,6vw,2.6rem)', lineHeight: 1 }} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}>
                WELCOME TO
              </motion.h2>
              <motion.h2
                className="font-grotesk font-black tracking-tighter uppercase mb-6"
                style={{ fontSize: 'clamp(1.8rem,6vw,2.6rem)', lineHeight: 1, background: 'linear-gradient(135deg,#FFD700 0%,#FFB800 50%,#FFF8DC 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
              >
                XENOR PROTOCOL
              </motion.h2>
              <motion.div className="flex items-center gap-3 justify-center mb-6" initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} transition={{ delay: 0.7 }}>
                <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-accent/40" />
                <div className="w-1 h-1 bg-accent/60 rotate-45" />
                <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-accent/40" />
              </motion.div>
              <motion.p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.3em] mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}>
                OPERATOR: <span className="text-accent font-black">{name.toUpperCase()}</span> // SESSION INITIALIZED
              </motion.p>
              <motion.div className="grid grid-cols-3 gap-2 mb-8" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}>
                {[{ label: 'IDENTITY', val: 'VERIFIED' }, { label: 'SUBSTRATE', val: 'ACTIVE' }, { label: 'ENCRYPTION', val: 'LOCKED' }].map((item, i) => (
                  <div key={i} className="p-2.5 border border-white/5 bg-white/[0.02] text-center space-y-1">
                    <div className="font-mono text-[6px] text-white/20 uppercase tracking-widest">{item.label}</div>
                    <div className="font-mono text-[8px] text-accent font-black uppercase">{item.val}</div>
                  </div>
                ))}
              </motion.div>
              <motion.button
                onClick={onComplete}
                className="relative w-full py-3 overflow-hidden group/enter"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.95 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-accent/10 border border-accent/40 group-hover/enter:bg-accent/20 group-hover/enter:border-accent transition-all duration-300" />
                <motion.div className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/25 to-transparent -translate-x-full group-hover/enter:translate-x-full transition-transform duration-700" />
                <div className="absolute top-0 left-0 w-2 h-2 bg-accent/60 group-hover/enter:bg-accent transition-colors duration-200" />
                <div className="absolute bottom-0 right-0 w-2 h-2 bg-accent/60 group-hover/enter:bg-accent transition-colors duration-200" />
                <span className="relative z-10 font-mono font-black text-[9px] uppercase tracking-[0.5em] text-accent group-hover/enter:text-white transition-colors duration-300">
                  ENTER_PROTOCOL &#x2192;
                </span>
              </motion.button>
              <motion.p className="mt-4 font-mono text-[7px] text-white/15 uppercase tracking-widest" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}>
                AUTO_ENTERING IN 3s...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
