'use client';

import { motion } from 'framer-motion';
import { HOW_TO_BUY, XENOR } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="relative py-24 md:py-40 px-6 md:px-10 bg-[#020203] overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={stagger}
        >
          <div className="flex flex-col items-center text-center mb-32">
            <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-accent/30" />
              <SectionLabel number="03" text="Acquisition Pipeline" />
              <div className="w-12 h-[1px] bg-accent/30" />
            </motion.div>
            <motion.h2 
              variants={fadeUp}
              className="text-5xl md:text-8xl font-black font-grotesk tracking-tighter uppercase italic leading-[0.8] text-white"
            >
              How to Acquire <br />
              <span className="text-accent not-italic drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">{XENOR.ticker}</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_TO_BUY.map((step) => (
              <motion.div
                key={step.step}
                variants={fadeUp}
                className="relative group"
              >
                <div className={`h-full bg-white/[0.01] border border-white/5 p-10 rounded-sm hover:border-accent/40 transition-all duration-700 flex flex-col relative overflow-hidden backdrop-blur-3xl ${
                  step.status === 'warn' ? 'border-warn/30 shadow-[0_0_30px_rgba(255,100,100,0.05)]' : ''
                }`}>
                  {/* Phase ID background */}
                  <div className="absolute -top-6 -right-6 font-mono text-8xl font-black text-white/[0.02] italic group-hover:text-accent/[0.05] transition-colors">
                    0{step.step}
                  </div>

                  <div className="flex items-center justify-between mb-12 relative z-10">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rotate-45 border border-accent/40 bg-accent/10" />
                      <div className="font-mono text-[10px] text-accent tracking-[0.4em] uppercase font-bold">
                        PHASE_{step.step}
                      </div>
                    </div>
                    {step.status === 'warn' && (
                      <div className="flex items-center gap-2 px-2 py-0.5 border border-warn/30 bg-warn/5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-warn animate-pulse" />
                        <span className="font-mono text-[7px] text-warn uppercase">Critical</span>
                      </div>
                    )}
                  </div>

                  <h3 className={`text-2xl font-black font-grotesk mb-6 uppercase group-hover:text-accent transition-colors relative z-10 leading-none ${
                    step.status === 'warn' ? 'text-warn' : 'text-white'
                  }`}>
                    {step.title}
                  </h3>
                  
                  <p className="text-muted text-xs leading-relaxed mb-12 font-mono tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">
                    {step.description}
                  </p>

                  <div className="mt-auto pt-8 border-t border-white/5 relative z-10">
                    {step.links ? (
                      <div className="flex flex-col gap-4">
                        {step.links.map(link => (
                          <a 
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/link flex items-center justify-between p-3 border border-white/5 bg-white/[0.02] hover:border-accent/40 hover:bg-accent/[0.05] transition-all rounded-sm"
                          >
                            <span className="font-mono text-[10px] uppercase tracking-widest text-text/80 group-hover/link:text-accent font-bold transition-colors">{link.label}</span>
                            <span className="text-accent/40 group-hover/link:text-accent transition-all translate-x-[-4px] group-hover/link:translate-x-0">→</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <div className="font-mono text-[9px] text-muted uppercase tracking-[0.3em] opacity-40">
                          Awaiting_Execution
                        </div>
                        <div className="w-full h-[1px] bg-white/5 overflow-hidden">
                          <div className="w-1/3 h-full bg-accent/20 animate-scanline" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Aesthetic HUD Line */}
                  <div className="absolute bottom-0 left-0 w-[1px] h-0 group-hover:h-full bg-accent/40 transition-all duration-700" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
