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
    <section id="about" className="relative py-24 md:py-48 px-6 md:px-10 bg-transparent overflow-hidden scroll-mt-24">
      {/* Immersive Background Decorations */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none" />

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
              <div className="h-[1px] flex-1 bg-white/10" />
            </motion.div>

            <motion.h2
              variants={fadeUp}
              className="text-3xl md:text-5xl font-black font-grotesk leading-[1] tracking-tighter mb-10 uppercase text-white"
            >
              Deterministic <br />
              <span className="text-white/40 italic">Substrate</span>
            </motion.h2>

            <motion.div variants={fadeUp} className="relative mb-12 glass p-8 corner-brackets">
              <span className="corner-bottom-left" />
              <span className="corner-bottom-right" />
              <p className="text-white/60 text-sm md:text-base leading-relaxed uppercase tracking-tight font-medium">
                XENØr is not just a promise; it's a hard-coded reality.
                Built on a Rust execution layer, our protocol ensures every state
                transition is verified before it's finalized.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="grid grid-cols-1 gap-4">
              {[
                { name: 'XENOR-CORE', type: 'ROUTING_ENGINE', code: 'v1.0.4' },
                { name: 'XENOR-SIM', type: 'SCENARIO_VALIDATOR', code: 'active' },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 group hover:border-white/20 transition-all duration-500">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-white/30 mb-1 tracking-widest">{item.type}</span>
                    <span className="font-mono text-xs font-bold text-white uppercase">{item.name}</span>
                  </div>
                  <div className="text-right font-mono text-[9px] text-accent uppercase tracking-widest">{item.code}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Central Visual - 4 Columns */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-4 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center mx-auto group">
              {/* Technical Frame with Intense Glow */}
              <div className="absolute inset-0 bg-black/60 border border-white/10 backdrop-blur-xl group-hover:border-accent/40 transition-colors duration-500" />
              <div className="absolute inset-0 bg-accent/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Enhanced Corner Accents */}
              <div className="absolute -top-1 -left-1 w-10 h-10 border-t-[2px] border-l-[2px] border-accent z-20 drop-shadow-[0_0_8px_rgba(136,255,0,0.4)]" />
              <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-[2px] border-r-[2px] border-accent z-20 drop-shadow-[0_0_8px_rgba(136,255,0,0.4)]" />

              {/* Grid Lines */}
              <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

              {/* Central Core Content */}
              <div className="relative z-10 w-full h-full p-2 flex items-center justify-center overflow-hidden">
                {/* Active Scanline Over Visual */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent h-1/2 w-full animate-scanline pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity" />

                <img
                  src="/assets/images/gif/01-Protocol-Infrastructure.gif"
                  alt="Protocol Infrastructure"
                  className="w-full h-full object-cover mix-blend-screen opacity-90 group-hover:opacity-100 group-hover:scale-110 group-hover:brightness-125 transition-all duration-700 relative z-10"
                />

                {/* Internal HUD Detail */}
                <div className="absolute top-6 left-6 font-mono text-[8px] text-accent font-bold tracking-[0.2em] opacity-40 group-hover:opacity-100 transition-opacity uppercase">
                  [ VISUAL_CORE_01 ]
                </div>
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
              { label: 'CORE_LANG', value: 'RUST_1.75', status: 'STABLE', icon: '01' },
              { label: 'NETWORK', value: 'SOLANA', status: 'FAST', icon: '02' },
              { label: 'VERIFIED', value: '100%', status: 'SECURE', icon: '03' },
            ].map((mod, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="relative group h-full"
              >
                <div className="glass p-8 h-full relative overflow-hidden border border-white/5 hover:border-accent/40 transition-all duration-500">
                  {/* Decorative corner brackets for each card */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-accent/20 group-hover:border-accent transition-colors" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-accent/20 group-hover:border-accent transition-colors" />

                  <div className="absolute top-4 right-4 flex items-center gap-3">
                    <div className="h-[1px] w-8 bg-accent/20" />
                    <span className="font-mono text-[7px] text-accent tracking-widest uppercase">[{mod.icon}]</span>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="pulse-red !bg-accent group-hover:glow-accent" />
                      <div className="font-mono text-[8px] text-white/30 tracking-[0.4em] uppercase">{mod.label}</div>
                    </div>
                    <div className="text-3xl font-black font-grotesk text-white tracking-tighter uppercase italic group-hover:text-accent transition-colors">
                      {mod.value}
                    </div>
                    <div className="pt-4 border-t border-white/5">
                      <div className="font-mono text-[7px] text-muted-foreground uppercase tracking-widest flex justify-between items-center">
                        <span>Status_Output</span>
                        <span className="text-accent">{mod.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Background noise/grid for individual card */}
                  <div className="absolute inset-0 grid-bg opacity-[0.02] group-hover:opacity-[0.05] transition-opacity" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

