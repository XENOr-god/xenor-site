'use client';

import { motion } from 'framer-motion';
import { ROADMAP } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-24 md:py-40 px-6 md:px-10 bg-[#050508] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
        >
          <div className="flex flex-col items-center text-center mb-32">
            <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-accent/20" />
              <SectionLabel number="06" text="Protocol Trajectory" />
              <div className="w-12 h-[1px] bg-accent/20" />
            </motion.div>
            <motion.h2 
              variants={fadeUp}
              className="text-5xl md:text-8xl font-black font-grotesk tracking-tighter uppercase italic leading-[0.8] text-white"
            >
              Execution <br />
              <span className="text-accent not-italic drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">Roadmap.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-[50%] left-0 w-full h-[1px] bg-white/5 -translate-y-1/2" />
            
            {ROADMAP.map((phase, i) => (
              <motion.div
                key={phase.id}
                variants={fadeUp}
                className="relative group"
              >
                <div className="h-full bg-white/[0.01] border border-white/5 p-12 rounded-sm group-hover:border-accent/40 transition-all duration-700 relative overflow-hidden backdrop-blur-3xl">
                  {/* Decorative Background ID */}
                  <div className="absolute -bottom-10 -right-4 font-mono text-[10rem] font-black text-white/[0.02] select-none uppercase italic group-hover:text-accent/[0.03] transition-colors leading-none">
                    {phase.id}
                  </div>

                  <div className="flex items-center justify-between mb-16 relative z-10">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-[10px] text-accent/60 uppercase tracking-[0.4em] font-bold">Sequence_0{i + 1}</span>
                      <h3 className="text-2xl font-black font-grotesk text-white uppercase italic tracking-tight leading-none group-hover:text-accent transition-colors">
                        {phase.phase}
                      </h3>
                    </div>
                    <div className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-sm font-mono text-[9px] uppercase tracking-widest text-muted-foreground group-hover:text-accent group-hover:border-accent/20 transition-all">
                      {phase.timeline}
                    </div>
                  </div>

                  <ul className="space-y-8 relative z-10 mb-16">
                    {phase.items.map((item, idx) => (
                      <li key={idx} className="flex gap-4 group/item">
                        <div className="mt-1 w-1.5 h-1.5 rotate-45 border border-accent/40 bg-accent/10 shrink-0 group-hover/item:bg-accent group-hover/item:animate-pulse transition-all" />
                        <div className="flex flex-col">
                          <span className="text-[9px] font-mono text-accent/30 uppercase tracking-widest mb-1 font-bold group-hover/item:text-accent/60 transition-colors">Point_0{idx + 1}</span>
                          <span className="text-xs md:text-sm text-muted-foreground leading-relaxed group-hover/item:text-text transition-colors font-mono uppercase tracking-tight">
                            {item}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Execution HUD Status */}
                  <div className="mt-auto pt-8 border-t border-white/5 flex items-center justify-between relative z-10">
                    <div className="flex flex-col gap-1">
                      <div className="font-mono text-[8px] text-muted-foreground/40 uppercase tracking-[0.4em] font-bold">Protocol_Log</div>
                      <div className="font-mono text-[10px] text-accent/40 uppercase group-hover:text-accent transition-colors">EXEC_INIT__{phase.id}</div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <div className="font-mono text-[8px] text-muted-foreground/40 uppercase tracking-[0.2em]">Sync_Rate</div>
                      <div className="w-24 h-1 bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-accent shadow-[0_0_10px_#00e5ff]" 
                          initial={{ width: '0%' }}
                          whileInView={{ width: '100%' }}
                          transition={{ duration: 1.5, delay: i * 0.2 + 0.5 }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Hover Scanline Effect */}
                  <div className="absolute inset-0 bg-accent/[0.01] opacity-0 group-hover:opacity-100 animate-scanline pointer-events-none" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
