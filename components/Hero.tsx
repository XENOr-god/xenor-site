'use client';

import React, { useState } from 'react';
import { XENOR } from '@/lib/constants';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Circle,
  Info
} from 'lucide-react';

// ── Animation orchestration ──
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  show: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1, x: 0,
    transition: { duration: 0.7, ease: [0.33, 1, 0.68, 1] },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  show: {
    opacity: 1, scale: 1,
    transition: { duration: 0.8, ease: [0.33, 1, 0.68, 1] },
  },
};

const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 40px rgba(255,215,0,0.1)',
      '0 0 80px rgba(255,215,0,0.2)',
      '0 0 40px rgba(255,215,0,0.1)',
    ],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};

export default function Hero() {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
      {/* ── Animated Canvas Background ── */}
      {/* <HeroCanvas /> */}

      {/* ── Ambient Gradient Overlays ── */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        {/* Top gold bloom */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/[0.04] blur-[180px] rounded-full" />
        {/* Bottom fade to base */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black to-transparent" />
      </div>

      {/* ── Corner HUD elements ── */}
      <div className="absolute top-6 left-6 z-20 hidden lg:flex flex-col gap-1">
        <span className="font-mono text-[7px] text-white/10 uppercase tracking-[0.5em]">SYS_PROTOCOL</span>
        <span className="font-mono text-[7px] text-accent/30 uppercase tracking-[0.5em]">v2.0.1_STABLE</span>
      </div>
      <div className="absolute top-6 right-6 z-20 hidden lg:flex flex-col gap-1 text-right">
        <span className="font-mono text-[7px] text-white/10 uppercase tracking-[0.5em]">NET_SOLANA</span>
        <span className="font-mono text-[7px] text-accent/30 uppercase tracking-[0.5em] flex items-center justify-end gap-2">
          BLOCK_SYNC <Circle size={6} className="fill-accent text-accent animate-pulse" />
        </span>
      </div>

      {/* ── Edge accent lines ── */}
      <div className="absolute top-0 left-0 w-24 h-[1px] bg-gradient-to-r from-accent/30 to-transparent z-20 hidden lg:block" />
      <div className="absolute top-0 right-0 w-24 h-[1px] bg-gradient-to-l from-accent/30 to-transparent z-20 hidden lg:block" />
      <div className="absolute bottom-0 left-0 w-48 h-[1px] bg-gradient-to-r from-accent/20 to-transparent z-20 hidden lg:block" />
      <div className="absolute bottom-0 right-0 w-48 h-[1px] bg-gradient-to-l from-accent/20 to-transparent z-20 hidden lg:block" />
      <div className="absolute top-0 left-0 w-[1px] h-24 bg-gradient-to-b from-accent/30 to-transparent z-20 hidden lg:block" />
      <div className="absolute top-0 right-0 w-[1px] h-24 bg-gradient-to-b from-accent/30 to-transparent z-20 hidden lg:block" />

      {/* ── Main Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-30 max-w-7xl mx-auto w-full px-6 lg:px-10 pt-24 pb-16 lg:py-32"
      >
        {/* Main Grid: Precise Proportion 1.2fr : 1fr : 0.8fr */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.8fr] gap-12 lg:gap-16 items-center">

          {/* Column 1: Headline & CTA */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 md:space-y-12 order-1">
            <motion.div variants={fadeUp} className="space-y-6 md:space-y-8">
              <h1 className="font-grotesk text-2xl md:text-3xl lg:text-5xl font-black text-white uppercase leading-[0.85] tracking-tighter">
                <motion.span
                  className="inline-block"
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  Deterministic{' '}
                </motion.span>
                <br />
                <motion.span
                  className="text-accent italic drop-shadow-[0_0_30px_rgba(255,215,0,0.2)] inline-block"
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -30, filter: 'blur(8px)' }}
                  animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  Simulation-First
                </motion.span>{' '}
                <br />
                <motion.span
                  className="inline-block"
                  initial={isMobile ? { opacity: 0 } : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Research Stack
                </motion.span>
              </h1>

              <motion.p
                variants={fadeUp}
                className="text-white/40 text-[10px] md:text-xs lg:text-sm leading-relaxed font-mono uppercase tracking-[0.2em] max-w-[300px] md:max-w-md border-l-2 border-accent/30 pl-6 mx-auto lg:mx-0 text-left"
              >
                Protocol-grade infrastructure for verifiable systems research, deterministic execution, and simulation-led validation.
              </motion.p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-center gap-4 md:gap-8 w-full sm:w-auto pt-4 md:pt-0"
            >
              <motion.a
                href={XENOR.links.jupiter}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-cta-primary w-full sm:w-auto px-6 h-10 md:px-8 md:h-12 bg-white text-black font-black font-grotesk rounded-full uppercase tracking-[0.2em] text-[9px] md:text-[10px] transition-all hover:bg-accent hover:scale-105 active:scale-95 flex items-center justify-center relative overflow-hidden group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Shimmer effect */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative z-10">INITIALIZE_PROTOCOL</span>
              </motion.a>
              <a
                href="#"
                className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/30 hover:text-white transition-colors flex items-center gap-3 group"
              >
                LEARN_MORE <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform text-accent" />
              </a>
            </motion.div>
          </div>

          {/* Column 2: Mascot anchor (The Center Piece) with Modern Technical Frame */}
          <motion.div
            variants={scaleIn}
            className="flex justify-center relative z-10 order-2 lg:order-2"
          >
            <div className="relative w-full aspect-square flex items-center justify-center max-w-[280px] sm:max-w-[360px] md:max-w-[420px] lg:max-w-[480px] p-4 md:p-10">

              {/* ── Rotating Orbit Ring ── */}
              {!isMobile && (
                <div className="absolute inset-[-15px] md:inset-[-20px] animate-spin-slow pointer-events-none">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent/40 rounded-full" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-accent/20 rounded-full" />
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-accent/30 rounded-full" />
                </div>
              )}

              {/* ── Second orbit (counter-rotating) ── */}
              <div className="absolute inset-[-30px] md:inset-[-40px] animate-spin-reverse-slow pointer-events-none hidden md:block">
                <div className="absolute top-1/4 right-0 w-1 h-1 bg-accent/20 rounded-full" />
                <div className="absolute bottom-1/4 left-0 w-1.5 h-1.5 bg-accent/15 rounded-full" />
              </div>

              {/* Orbit ring path */}
              <div className="absolute inset-[-15px] md:inset-[-20px] border border-accent/[0.06] rounded-full pointer-events-none" />
              <div className="absolute inset-[-30px] md:inset-[-40px] border border-accent/[0.03] rounded-full pointer-events-none hidden md:block" />

              {/* Technical Frame Layer */}
              <motion.div
                className={`absolute inset-0 border border-white/5 bg-black/20 rounded-3xl overflow-hidden ${!isMobile ? 'backdrop-blur-md shadow-[inset_0_0_30px_rgba(0,0,0,0.5)]' : ''}`}
                animate={!isMobile ? glowPulse.animate : {}}
              >
                {/* Corner Brackets — cool neon glow */}
                <motion.div
                  className="absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-accent/60 rounded-tl-3xl drop-shadow-[0_0_5px_rgba(255,215,0,0.3)]"
                  animate={{ borderColor: ['rgba(255,215,0,0.4)', 'rgba(255,215,0,0.8)', 'rgba(255,215,0,0.4)'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                />
                <div className="absolute top-0 right-0 w-10 h-10 border-t border-r border-white/10 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-10 h-10 border-b border-l border-white/10 rounded-bl-3xl" />
                <motion.div
                  className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-accent/60 rounded-br-3xl drop-shadow-[0_0_5px_rgba(255,215,0,0.3)]"
                  animate={{ borderColor: ['rgba(255,215,0,0.4)', 'rgba(255,215,0,0.8)', 'rgba(255,215,0,0.4)'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                />

                {/* Status Telemetry */}
                <div className="absolute top-6 left-8 flex flex-col gap-1 z-20">
                  <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">SCAN_STATUS</span>
                  <span className="font-mono text-[8px] text-accent font-bold uppercase tracking-widest animate-pulse">[STABLE]</span>
                </div>
                <div className="absolute bottom-6 right-8 text-right flex flex-col gap-1 z-20">
                  <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">BUFFER_SYNC</span>
                  <span className="font-mono text-[8px] text-white/50 font-bold uppercase tracking-widest">0.0004MS</span>
                </div>

                {/* Additional HUD readouts */}
                <div className="absolute top-6 right-8 flex flex-col gap-1 text-right z-20">
                  <span className="font-mono text-[6px] text-white/10 uppercase tracking-widest">FRAME_RATE</span>
                  <span className="font-mono text-[7px] text-accent/50 font-bold uppercase tracking-widest">60 FPS</span>
                </div>
                <div className="absolute bottom-6 left-8 flex flex-col gap-1 z-20">
                  <span className="font-mono text-[6px] text-white/10 uppercase tracking-widest">RESOLUTION</span>
                  <span className="font-mono text-[7px] text-accent/50 font-bold uppercase tracking-widest">4K UHD</span>
                </div>

                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                {/* Scan line inside frame */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                  <div className="scanline opacity-20" />
                </div>
              </motion.div>

              {/* Ambient Glow behind mascot */}
              <div className="absolute inset-0 bg-accent/5 blur-[120px] rounded-full scale-75 pointer-events-none" />
              {!isMobile && (
                <motion.div
                  className="absolute inset-0 bg-accent/5 blur-[80px] rounded-full scale-50 pointer-events-none"
                  animate={{
                    scale: [0.5, 0.6, 0.5],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                />
              )}

              {/* The Mascot */}
              <div
                className="relative w-full h-full flex items-center justify-center cursor-crosshair group/mascot z-20"
                onMouseEnter={() => setShowPhilosophy(true)}
                onMouseLeave={() => setShowPhilosophy(false)}
                onClick={() => setShowPhilosophy(!showPhilosophy)}
              >
                <motion.img
                  src="/assets/images/xenor.gif"
                  alt="XENOR Mascot"
                  className={`w-full h-full object-contain relative z-10 transition-all duration-700 brightness-125 grayscale-[0.1] contrast-125 mix-blend-screen [mask-image:radial-gradient(circle_at_center,black_40%,transparent_90%)] ${showPhilosophy ? 'opacity-10 blur-sm scale-90' : 'opacity-100 scale-95 md:scale-100 group-hover/mascot:scale-105 group-hover/mascot:brightness-150'}`}
                  animate={!isMobile ? {
                    filter: [
                      'brightness(1.25) contrast(1.25) grayscale(0.1)',
                      'brightness(1.4) contrast(1.35) grayscale(0)',
                      'brightness(1.25) contrast(1.25) grayscale(0.1)',
                    ],
                  } : {}}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />

                {/* Philosophical Overlay - Clean Text with Drop Shadow */}
                <AnimatePresence>
                  {showPhilosophy && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 5 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 5 }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 z-40 flex flex-col items-center justify-center p-8 text-center"
                    >
                      <div className="mb-4">
                        <Info className="w-6 h-6 text-accent animate-pulse drop-shadow-[0_0_8px_rgba(255,215,0,0.8)]" />
                      </div>
                      <h4 className="font-mono text-[8px] text-accent font-black tracking-[0.5em] uppercase mb-3 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        [ PROTOCOL_GHOST ]
                      </h4>
                      <p className="font-mono text-[8px] text-white/90 leading-relaxed uppercase tracking-[0.2em] max-w-xs drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] font-semibold">
                        "XENØr: The Ghost in the Substrate. A visual anchor for deterministic simulation and absolute verifiable proof."
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Column 3: Technical Specs & Features Group */}
          <motion.div variants={fadeLeft} className="flex flex-col space-y-10 order-3">
            {/* Grouped Right-Side Content Block */}
            <div className="space-y-6 md:space-y-10">
              {/* xenor-engine Highlight Card */}
              <motion.div
                className="p-8 md:p-10 bg-white/[0.03] border border-white/10 rounded-2xl backdrop-blur-2xl group hover:border-accent/30 transition-all duration-500 relative overflow-hidden"
                whileHover={{ y: -2 }}
              >
                {/* Shimmer on hover */}
                <div className="absolute inset-0 holo-shimmer opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <h3 className="font-mono text-[11px] font-black text-accent uppercase tracking-[0.5em] mb-6 relative z-10">xenor-engine</h3>
                <p className="text-white/30 text-[10px] md:text-[11px] leading-relaxed uppercase tracking-[0.2em] font-mono group-hover:text-white/50 transition-colors relative z-10">
                  The canonical deterministic substrate featuring fixed-timestep execution and explicit tick progression.
                </p>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-accent/30 group-hover:w-full transition-all duration-700" />
              </motion.div>

              {/* Specs List with consistent vertical baseline */}
              <div className="flex flex-col gap-5 md:gap-8 pl-6">
                {['Deterministic Core', 'Simulation-First', 'Verifiable Logic', 'Integer Ticks'].map((title, i) => (
                  <motion.div
                    key={i}
                    className="flex items-center gap-8 group cursor-default"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2 + i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-white/10 rounded-full group-hover:bg-accent group-hover:scale-125 transition-all duration-300"
                      animate={{
                        boxShadow: [
                          '0 0 0 0 rgba(255,215,0,0)',
                          '0 0 0 4px rgba(255,215,0,0.1)',
                          '0 0 0 0 rgba(255,215,0,0)',
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
                    />
                    <span className="font-mono text-[10px] md:text-[11px] font-bold text-white/20 group-hover:text-white transition-all uppercase tracking-[0.4em]">{title}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Persistent Social Dock */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="absolute bottom-12 left-10 lg:left-20 flex items-center gap-8 text-white/10 z-40"
      >
        <a href={XENOR.links.twitter} target="_blank" className="hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
        <a href={XENOR.links.github} target="_blank" className="hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
        </a>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-40"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
      >
        <span className="font-mono text-[7px] text-white/15 uppercase tracking-[0.5em]">SCROLL</span>
        <motion.div
          className="w-[1px] h-6 bg-accent/30"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  );
}
