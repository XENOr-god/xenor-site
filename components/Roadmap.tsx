'use client';

import { motion } from 'framer-motion';
import { ROADMAP } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 md:py-48 px-6 md:px-10 bg-transparent overflow-hidden scroll-mt-24">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-5 -z-10" />
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-black to-transparent -z-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          {/* Header Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-24">
            {/* Title Block (Cols 1-7) */}
            <div className="lg:col-span-7 border border-white/10 bg-black/40 backdrop-blur-3xl p-10 relative overflow-hidden group flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/40 group-hover:border-accent transition-all" />
              <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

              <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
                <SectionLabel number="06" text="Protocol Trajectory" />
                <div className="h-[1px] flex-grow bg-white/5" />
                <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">[ SYNC_STATUS: ESTABLISHING ]</span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-6xl font-black font-grotesk tracking-tighter uppercase italic leading-none text-white mb-8"
              >
                EXECUTION <br />
                <span className="text-accent not-italic drop-shadow-[0_0_30px_rgba(0,229,255,0.2)]">ROADMAP</span>
              </motion.h2>

              <motion.div variants={fadeUp} className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-1 h-12 bg-accent/40 group-hover:bg-accent transition-colors" />
                  <p className="text-muted text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] leading-relaxed max-w-sm">
                    The deterministic path to global substrate dominance. High-fidelity research simulation parameters established.
                  </p>
                </div>
              </motion.div>

              <div className="absolute bottom-4 left-10 font-mono text-[7px] text-white/10 uppercase tracking-[0.5em] flex gap-12">
                <span>COORD_LAT: 35.6895</span>
                <span>COORD_LONG: 139.6917</span>
              </div>
            </div>

            {/* GIF Inspection Portal (Cols 8-12) */}
            <div className="lg:col-span-5 relative group">
              <div className="relative aspect-square w-full border border-accent/20 bg-black/60 overflow-hidden">
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 grid-bg opacity-10" />

                {/* HUD Highlights */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-accent" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-accent" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-accent" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-accent" />

                <img
                  src="/assets/images/gif/06-Protocol-Trajectory.gif"
                  alt="Protocol Trajectory"
                  className="w-full h-full object-cover mix-blend-screen opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 brightness-125"
                />

                <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-accent font-black uppercase tracking-[0.5em] bg-black/80 px-3 py-1 border border-accent/20">
                  TRAJECTORY_VISUAL
                </div>
              </div>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {ROADMAP.map((phase, i) => (
              <motion.div
                key={phase.id}
                variants={fadeUp}
                className="relative group h-full"
              >
                <div className="h-full bg-black/40 border border-white/5 p-8 relative overflow-hidden backdrop-blur-3xl transition-all duration-500 group-hover:border-accent/30 flex flex-col">
                  {/* Decorative Header */}
                  <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[8px] text-accent uppercase tracking-[0.3em] font-bold">SEQ_0{i + 1}</span>
                      <h3 className="text-xl font-black font-grotesk text-white uppercase italic tracking-tight leading-none group-hover:text-accent transition-colors">
                        {phase.phase}
                      </h3>
                    </div>
                    <div className="text-right">
                      <div className="px-3 py-1 border border-white/10 bg-white/5 font-mono text-[8px] text-white/40 uppercase tracking-widest">
                        {phase.timeline}
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-6 mb-10 flex-grow">
                    {phase.items.map((item, idx) => (
                      <li key={idx} className="flex gap-4 group/item">
                        <div className="mt-1.5 w-1 h-1 bg-accent/40 group-hover/item:bg-accent transition-colors shrink-0" />
                        <span className="text-[10px] md:text-xs text-muted-foreground leading-relaxed group-hover/item:text-white transition-colors font-mono uppercase tracking-tight">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Telemetry Footer */}
                  <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                    <div className="flex justify-between items-end">
                      <div className="space-y-1">
                        <span className="block font-mono text-[7px] text-white/20 uppercase tracking-[0.4em]">Protocol_Log</span>
                        <span className="block font-mono text-[9px] text-accent/60 uppercase group-hover:text-accent transition-colors">INIT::{phase.id}</span>
                      </div>
                      <span className="font-mono text-[8px] text-accent font-black animate-pulse">
                        {i === 0 ? '[ ESTABLISHED ]' : '[ IN_QUEUE ]'}
                      </span>
                    </div>

                    <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden relative">
                      <motion.div
                        className="h-full bg-accent shadow-[0_0_10px_#00e5ff]"
                        initial={{ width: '0%' }}
                        whileInView={{ width: i === 0 ? '100%' : '15%' }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                      />
                    </div>
                  </div>

                  {/* ID Watermark */}
                  <div className="absolute -bottom-8 -right-4 font-mono text-8xl font-black text-white/[0.02] pointer-events-none italic select-none group-hover:text-accent/[0.03] transition-colors">
                    {phase.id}
                  </div>

                  {/* Scanline overlay */}
                  <div className="absolute inset-0 bg-accent/[0.02] opacity-0 group-hover:opacity-100 animate-scanline pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
