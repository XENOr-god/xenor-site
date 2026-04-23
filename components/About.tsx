'use client';

import { motion } from 'framer-motion';
import SectionLabel from './ui/SectionLabel';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-40 px-6 md:px-10 bg-[#020203] overflow-hidden">
      {/* Immersive Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(0,229,255,0.05)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_70%,rgba(124,92,252,0.03)_0%,transparent_50%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
          {/* Main Info - 5 Columns */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="lg:col-span-5"
          >
            <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
              <SectionLabel number="01" text="Protocol Infrastructure" />
              <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/20 to-transparent" />
            </motion.div>
            
            <motion.h2 
              variants={fadeUp}
              className="text-4xl md:text-7xl font-black font-grotesk leading-[0.85] tracking-tighter mb-10 uppercase italic text-white"
            >
              Deterministic <br />
              <span className="text-accent not-italic drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">Substrate.</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="relative mb-12 group">
              <div className="absolute -left-6 top-0 bottom-0 w-[1px] bg-accent/50 group-hover:w-[3px] transition-all duration-500 shadow-[0_0_15px_rgba(0,229,255,0.5)]" />
              <p className="text-muted text-base md:text-lg leading-relaxed pl-6 uppercase tracking-tight font-medium">
                XENØr is not just a promise; it's a hard-coded reality. 
                Built on a Rust execution layer, our protocol ensures every state 
                transition is verified before it's finalized.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4">
              {[
                { name: 'XENOR-CORE', type: 'ROUTING_ENGINE', code: 'v1.0.4' },
                { name: 'XENOR-SIM', type: 'SCENARIO_VALIDATOR', code: 'active' },
                { name: 'XENOR-ENGINE', type: 'DETERMINISTIC_LAYER', code: 'rust_base' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-4 md:p-5 bg-white/[0.02] border border-white/5 rounded-sm group hover:bg-accent/[0.03] hover:border-accent/30 transition-all duration-500 cursor-crosshair">
                  <div className="flex flex-col">
                    <span className="font-mono text-[10px] text-muted mb-1 tracking-widest">{item.type}</span>
                    <span className="font-mono text-sm font-bold text-white group-hover:text-accent transition-colors">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-[8px] text-accent/40 uppercase mb-1">Status</div>
                    <div className="font-mono text-[10px] text-accent uppercase tracking-widest">{item.code}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Central Visual - 4 Columns */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="lg:col-span-4 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[260px] md:max-w-full aspect-square flex items-center justify-center mx-auto">
              {/* Complex Rotating HUD */}
              <div className="absolute inset-0 border-[0.5px] border-dashed border-accent/20 rounded-sm animate-spin-slow opacity-40" />
              <div className="absolute inset-8 border border-white/5 rounded-sm animate-spin-slow opacity-20" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
              <div className="absolute inset-20 border border-accent/10 rounded-sm animate-spin-slow opacity-30" style={{ animationDuration: '20s' }} />
              
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-12 h-12 border-l border-t border-accent opacity-50" />
              <div className="absolute bottom-0 right-0 w-12 h-12 border-r border-b border-accent opacity-50" />
              
              {/* Central Core Content */}
              <div className="relative z-10 w-full h-full p-12">
                <div className="absolute inset-0 bg-accent/10 blur-[120px] rounded-sm animate-pulse" />
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-contain mix-blend-lighten filter drop-shadow-[0_0_40px_rgba(0,229,255,0.4)] scale-110"
                >
                  <source src="/assets/videos/xenor-icon.mp4" type="video/mp4" />
                </video>
              </div>

              {/* Dynamic Scanning Line */}
              <div className="absolute inset-0 overflow-hidden rounded-sm pointer-events-none">
                <div className="w-full h-[2px] bg-accent/30 shadow-[0_0_15px_rgba(0,229,255,0.8)] animate-scanline absolute top-0 left-0" />
              </div>
            </div>
          </motion.div>

          {/* System Modules - 3 Columns */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
            className="lg:col-span-3 space-y-6"
          >
            {[
              { label: 'CORE_LANG', value: 'RUST_1.75', status: 'STABLE', icon: '◈' },
              { label: 'NETWORK', value: 'SOLANA', status: 'FAST', icon: '▣' },
              { label: 'REPOS', value: '05_ACTIVE', status: 'LIVE', icon: '⧇' },
              { label: 'VERIFIED', value: '100%', status: 'SECURE', icon: '◬' },
            ].map((mod, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white/[0.01] border border-white/5 p-6 md:p-7 rounded-sm relative group hover:border-accent/40 transition-all duration-500 overflow-hidden backdrop-blur-3xl"
              >
                <div className="absolute top-0 right-0 p-3 text-[9px] font-mono text-accent flex items-center gap-2">
                  <span className="w-1 h-1 bg-accent rounded-full animate-ping" />
                  {mod.status}
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-accent text-xs">{mod.icon}</span>
                  <div className="font-mono text-[9px] text-muted tracking-[0.3em] uppercase">{mod.label}</div>
                </div>
                <div className="text-2xl font-bold font-grotesk text-white group-hover:text-accent transition-colors tracking-tight">{mod.value}</div>
                
                {/* Micro Visual Decor */}
                <div className="mt-4 flex gap-1 h-[2px] w-full bg-white/5">
                  <div className="h-full bg-accent/40 w-[30%] group-hover:w-[100%] transition-all duration-1000" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
