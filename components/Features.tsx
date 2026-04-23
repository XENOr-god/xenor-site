'use client';

import { motion } from 'framer-motion';
import { FEATURES } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Features() {
  return (
    <section id="features" className="relative py-24 md:py-40 px-6 md:px-10 bg-[#050508] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 blur-[160px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end mb-24">
            <div className="lg:col-span-8">
              <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
                <SectionLabel number="02" text="System Architecture" />
                <div className="h-[1px] w-24 bg-accent/30" />
              </motion.div>
              <motion.h2 
                variants={fadeUp}
                className="text-4xl md:text-8xl font-black font-grotesk tracking-tighter uppercase italic leading-[0.8] text-white"
              >
                Built for <br />
                <span className="text-accent not-italic">Deterministic</span><br />
                Resilience.
              </motion.h2>
            </div>
            <div className="lg:col-span-4 pb-4">
              <motion.div variants={fadeUp} className="border-l border-accent/30 pl-8">
                <p className="text-muted text-sm md:text-base font-mono uppercase tracking-tight leading-relaxed max-w-xs">
                  <span className="text-accent">// SPECIFICATION_ID: XNR-092</span><br />
                  Verified by Rust substrate. Zero-failure execution layer.
                </p>
              </motion.div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={feature.id}
                variants={fadeUp}
                className="group relative bg-white/[0.01] border border-white/5 p-8 md:p-10 rounded-sm hover:bg-white/[0.03] hover:border-accent/40 transition-all duration-700 overflow-hidden cursor-pointer"
              >
                {/* Advanced HUD Corner Decor */}
                <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-white/5 group-hover:border-accent transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-white/5 group-hover:border-accent transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="mb-10 flex items-center justify-between">
                    <div className="font-mono text-3xl font-black text-white/5 group-hover:text-accent/20 transition-colors duration-500">
                      0{i + 1}
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/50 group-hover:bg-accent/5 transition-all">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full group-hover:animate-ping" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-black font-grotesk text-white mb-5 uppercase tracking-tight group-hover:text-accent transition-colors leading-none">
                    {feature.title}
                  </h3>
                  
                  <p className="text-muted text-xs leading-relaxed mb-8 font-mono tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">
                    {feature.description}
                  </p>

                  <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[9px] text-accent/60 uppercase tracking-widest">{feature.label}</span>
                      <span className="font-mono text-[8px] text-muted-foreground uppercase opacity-0 group-hover:opacity-100 transition-opacity">Module_Ready</span>
                    </div>
                    {/* Visual Telemetry Bar */}
                    <div className="flex gap-0.5 h-[2px]">
                      {[...Array(12)].map((_, idx) => (
                        <div 
                          key={idx} 
                          className={`flex-1 transition-all duration-500 ${idx < 4 ? 'bg-accent/40 group-hover:bg-accent' : 'bg-white/5'}`}
                          style={{ transitionDelay: `${idx * 50}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Animated Distortion Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(0,229,255,0.08)_0%,transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

