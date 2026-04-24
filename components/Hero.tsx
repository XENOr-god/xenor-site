'use client';

import { motion } from 'framer-motion';
import { XENOR } from '@/lib/constants';



export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] flex items-center overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 mix-blend-overlay" />
      </div>

      <div className="relative z-30 max-w-7xl mx-auto w-full px-6 lg:px-10 pt-32 pb-20 lg:py-32">
        {/* Main Grid: Precise Proportion 1.2fr : 1fr : 0.8fr */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr_0.8fr] gap-16 lg:gap-16 items-center">

          {/* Column 1: Headline & CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 md:space-y-12"
          >
            <div className="space-y-4 md:space-y-6">
              <h1 className="font-grotesk text-xl md:text-4xl lg:text-5xl font-black text-white uppercase leading-[0.9] tracking-tighter">
                Deterministic <br />
                <span className="text-accent italic drop-shadow-[0_0_30px_rgba(124,255,0,0.2)]">Simulation-First</span> <br />
                Research Stack
              </h1>

              <p className="text-white/30 text-[9px] md:text-xs lg:text-sm leading-relaxed font-mono uppercase tracking-[0.2em] max-w-[280px] md:max-w-md border-l md:border-l-2 lg:border-l border-accent/20 pl-4 md:pl-6 mx-auto lg:mx-0">
                Protocol-grade infrastructure for verifiable systems research, deterministic execution, and simulation-led validation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-10">
              <a
                href={XENOR.links.jupiter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 h-12 md:px-12 md:h-14 bg-white text-black font-black font-grotesk rounded-full uppercase tracking-widest text-[10px] md:text-[11px] transition-all hover:scale-105 active:scale-95 flex items-center justify-center shadow-[0_0_50px_rgba(255,255,255,0.1)]"
              >
                INITIALIZE
              </a>
              <a
                href="#"
                className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white transition-colors flex items-center gap-3 group"
              >
                LEARN_MORE <span className="group-hover:translate-x-1 transition-transform text-accent">→</span>
              </a>
            </div>
          </motion.div>

          {/* Column 2: Mascot anchor (The Center Piece) with Modern Technical Frame */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center relative z-10"
          >
            <div className="relative w-full aspect-square flex items-center justify-center max-w-[320px] md:max-w-[400px] lg:max-w-[450px] p-4 md:p-8">
              {/* Technical Frame Layer */}
              <div className="absolute inset-0 border border-white/5 bg-white/[0.01] rounded-3xl backdrop-blur-sm overflow-hidden">
                {/* Corner Brackets */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/40 rounded-tl-3xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-white/10 rounded-tr-3xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-white/10 rounded-bl-3xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-accent/40 rounded-br-3xl" />

                {/* Status Telemetry */}
                <div className="absolute top-4 left-6 flex flex-col gap-1">
                  <span className="font-mono text-[6px] text-white/20 uppercase tracking-widest">SCAN_STATUS</span>
                  <span className="font-mono text-[7px] text-accent font-bold uppercase tracking-widest animate-pulse">[STABLE]</span>
                </div>
                <div className="absolute bottom-4 right-6 text-right flex flex-col gap-1">
                  <span className="font-mono text-[6px] text-white/20 uppercase tracking-widest">BUFFER_SYNC</span>
                  <span className="font-mono text-[7px] text-white/40 font-bold uppercase tracking-widest">0.0004MS</span>
                </div>

                {/* Subtle Grid Pattern Overlay */}
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>

              {/* Ambient Glow behind mascot */}
              <div className="absolute inset-0 bg-accent/5 blur-[100px] rounded-full scale-75" />

              {/* The Mascot */}
              <img
                src="/assets/images/xenor.gif"
                alt="XENOR Mascot"
                className="w-full h-full object-contain relative z-10 brightness-110 grayscale-[0.3] contrast-125 drop-shadow-[0_0_30px_rgba(136,255,0,0.1)] mix-blend-screen scale-90 md:scale-100"
              />
            </div>
          </motion.div>

          {/* Column 3: Technical Specs & Features Group */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="flex flex-col space-y-10"
          >
            {/* Grouped Right-Side Content Block */}
            <div className="space-y-6 md:space-y-8">
              {/* xenor-engine Highlight Card */}
              <div className="p-6 md:p-8 bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-xl group hover:border-white/10 transition-colors">
                <h3 className="font-mono text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-4">xenor-engine</h3>
                <p className="text-white/20 text-[9px] md:text-[10px] leading-relaxed uppercase tracking-[0.2em] font-mono group-hover:text-white/40 transition-colors">
                  The canonical deterministic substrate featuring fixed-timestep execution and explicit tick progression.
                </p>
              </div>

              {/* Specs List with consistent vertical baseline */}
              <div className="flex flex-col gap-4 md:gap-6 pl-4">
                {['Deterministic Core', 'Simulation-First', 'Verifiable Logic', 'Integer Ticks'].map((title, i) => (
                  <div key={i} className="flex items-center gap-6 group cursor-default">
                    <div className="w-1.5 h-1.5 bg-white/10 rounded-full group-hover:bg-accent transition-colors" />
                    <span className="font-mono text-[9px] md:text-[10px] font-bold text-white/20 group-hover:text-white transition-all uppercase tracking-[0.3em]">{title}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Persistent Social Dock */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-12 left-10 lg:left-20 flex items-center gap-8 text-white/10 z-40"
      >
        <a href={XENOR.links.twitter} target="_blank" className="hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
        </a>
        <a href={XENOR.links.github} target="_blank" className="hover:text-white transition-colors">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
        </a>
      </motion.div>
    </section>
  );
}
