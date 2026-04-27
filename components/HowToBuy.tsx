'use client';

import React, { useState } from 'react';
import { HOW_TO_BUY } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';
import { ArrowRight, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HowToBuy() {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <section id="how-to-buy" className="relative py-20 md:py-40 px-6 overflow-hidden border-t border-white/5 scroll-mt-[-25px]">
      {/* Background Infrastructure */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none hidden md:block" />

      {/* Pipeline Connecting Line */}
      <div className="absolute top-[75%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section: Industrial Layout with Featured Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 mb-16 md:mb-24 border-b border-white/5 pb-16">
          {/* Pipeline Visual on Left */}
          <div className="lg:col-span-5 relative group order-2 lg:order-1">
            <ScrollReveal direction="right">
              <div className="relative aspect-square w-full bg-black/60 border border-white/10 p-2 overflow-hidden group-hover:border-accent/40 transition-all duration-500">
                <div className="absolute inset-0 bg-accent/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 grid-bg opacity-10" />

                {/* Active Scanline - Disabled on mobile */}
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent h-1/2 w-full scanline pointer-events-none z-10" />
                )}

                <div
                  className="absolute inset-0 bg-black/90 flex items-center justify-center cursor-help group/visual"
                  onMouseEnter={() => setShowPhilosophy(true)}
                  onMouseLeave={() => setShowPhilosophy(false)}
                  onClick={() => setShowPhilosophy(!showPhilosophy)}
                >
                  <div className="relative w-[70%] aspect-square flex items-center justify-center">
                    {/* Acquisition Brackets */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-accent/40 z-30" />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-accent/40 z-30" />

                    <img
                      src="/assets/images/gif/03-Acquisition-Pipeline.gif"
                      alt="Acquisition Pipeline"
                      loading="lazy"
                      className={`w-full h-full object-contain mix-blend-screen transition-all duration-700 relative z-20 grayscale [mask-image:radial-gradient(circle_at_center,black_30%,transparent_90%)] ${showPhilosophy ? 'opacity-20 blur-md scale-95' : 'opacity-90 group-hover/visual:scale-110 group-hover/visual:grayscale-0'}`}
                    />

                    {/* Philosophical Overlay */}
                    <AnimatePresence>
                      {showPhilosophy && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          className="absolute inset-0 z-40 flex flex-col items-center justify-center p-4 text-center"
                        >
                          <div className="mb-3">
                            <Info className={`w-5 h-5 text-accent ${!isMobile ? 'animate-pulse' : ''}`} />
                          </div>
                          <h4 className="font-mono text-[6px] md:text-[7px] text-accent font-bold tracking-[0.2em] md:tracking-[0.5em] uppercase mb-2">
                            [ PIPELINE_PHILOSOPHY ]
                          </h4>
                          <p className="font-mono text-[6px] md:text-[8px] text-white/80 leading-relaxed uppercase tracking-widest">
                            "The Acquisition Pipeline: A convergence of intent. Each step is a filtered gate, transitioning observers into active protocol participants."
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div 
                      animate={{ opacity: showPhilosophy ? 0 : 1 }}
                      className="absolute top-2 left-2 font-mono text-[7px] text-accent font-bold uppercase tracking-[0.4em] z-30 border-l border-accent/30 pl-3"
                    >
                      [ PIPELINE_LIVE ]
                    </motion.div>
                  </div>
                </div>

                {/* Visual Frame Brackets */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/40" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent/40" />
              </div>
            </ScrollReveal>
          </div>

          {/* Section Text on Right */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <ScrollReveal>
              <div className="flex items-center gap-4">
                <SectionLabel number="03" text="Acquisition_Pipeline" />
                <div className="h-[1px] w-24 bg-accent/30" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-5xl md:text-7xl font-black font-grotesk tracking-tighter uppercase leading-[0.85] text-white">
                How to Acquire <br />
                <span className="text-accent italic drop-shadow-[0_0_40px_rgba(124,255,0,0.3)]">$XNR</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] leading-relaxed max-w-md">
                Deterministic acquisition sequence for protocol synchronization. Ensure all steps are executed within the canonical environment to prevent asset fragmentation.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/5 border border-accent/20 rounded-sm">
                <div className={`w-1.5 h-1.5 rounded-full bg-accent ${!isMobile ? 'animate-pulse' : ''}`} />
                <span className="font-mono text-[8px] text-accent font-black uppercase tracking-widest">Pipeline_Status: Ready</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Acquisition Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {HOW_TO_BUY.map((step, idx) => (
            <ScrollReveal key={step.step} delay={0.1 * idx}>
              <div className={`p-8 lg:p-10 h-full border border-white/5 lg:border-r lg:border-l-0 first:lg:border-l bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 flex flex-col relative overflow-hidden group/card ${step.status === 'warn' ? 'hover:border-warn/40' : 'hover:border-accent/40'
                }`}>

                {/* Decorative Scanline Animation on Hover - Optimized */}
                {!isMobile && (
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent h-1/2 w-full -translate-y-full group-hover/card:animate-scanline pointer-events-none hidden md:block" />
                )}

                {/* Step Metadata */}
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-1 h-1 rounded-full ${step.status === 'warn' ? 'bg-warn' : 'bg-accent'}`} />
                      <span className={`font-mono text-[9px] font-black uppercase tracking-[0.4em] ${step.status === 'warn' ? 'text-warn/60' : 'text-accent/60'
                        }`}>Step_0{step.step}</span>
                    </div>
                    <div className="font-mono text-[7px] text-white/20 uppercase tracking-widest">Sequence_ID: STEP_SYNC_0{step.step}</div>
                  </div>
                  <span className="font-mono text-[24px] font-black text-white/5 italic group-hover/card:text-accent/10 transition-colors">0{step.step}</span>
                </div>

                {/* Content Body */}
                <div className="space-y-6 mb-12 relative z-10">
                  <h3 className="text-2xl font-black font-grotesk uppercase italic leading-none tracking-tight text-white group-hover/card:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Actions / Progress Visualization */}
                <div className="mt-auto relative z-10 pt-8 border-t border-white/5">
                  {step.links ? (
                    <div className="space-y-2">
                      {step.links.map(link => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full p-3 flex justify-between items-center bg-white/[0.02] border border-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all group/link"
                        >
                          <span className="font-mono text-[8px] font-black uppercase tracking-widest text-white/40 group-hover/link:text-white">{link.label}</span>
                          <ArrowRight size={10} className="text-white/20 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">Processing_Asset</span>
                        <span className="font-mono text-[7px] text-accent font-bold">88%</span>
                      </div>
                      <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-accent/40 w-[88%]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Brackets Overlay */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 group-hover/card:border-accent transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 group-hover/card:border-accent transition-colors" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer Pipeline Info */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 opacity-20 group cursor-default">
          <div className="flex items-center gap-8">
            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white">Execution_Deterministic_Enabled</span>
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white">Substrate_Root_Verified</span>
          </div>
          <div className="font-mono text-[8px] uppercase tracking-[1em] text-accent animate-pulse group-hover:tracking-[1.2em] transition-all">FINAL_SYNCHRONIZATION_REQUIRED</div>
        </div>
      </div>
    </section>
  );
}
