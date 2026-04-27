'use client';

import React, { useState } from 'react';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';
import { motion, AnimatePresence } from 'framer-motion';
import { Info } from 'lucide-react';

export default function About() {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section id="about" className="relative py-16 md:py-32 px-6 md:px-10 bg-transparent overflow-hidden scroll-mt-[-30px]">
      {/* Immersive Background Decorations - Simplified for mobile */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Main Info - 5 Columns */}
          <div className="lg:col-span-5">
            <ScrollReveal delay={0.1}>
              <div className="mb-6 md:mb-8 flex items-center gap-4">
                <SectionLabel number="01" text="Protocol Infrastructure" />
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h2 className="text-3xl md:text-5xl font-black font-grotesk leading-[0.9] tracking-tighter mb-8 md:mb-10 uppercase text-white">
                Deterministic <br />
                <span className="text-white/40 italic">Substrate</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <div className="relative mb-8 md:mb-12 glass p-6 md:p-8 corner-brackets">
                <span className="corner-bottom-left" />
                <span className="corner-bottom-right" />
                <p className="text-white/60 text-xs md:text-base leading-relaxed uppercase tracking-tight font-medium">
                  XENØr is not just a promise; it's a hard-coded reality.
                  Built on a Rust execution layer, our protocol ensures every state
                  transition is verified before it's finalized.
                </p>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-4">
              {[
                { name: 'XENOR-CORE', type: 'ROUTING_ENGINE', code: 'v1.0.4' },
                { name: 'XENOR-SIM', type: 'SCENARIO_VALIDATOR', code: 'active' },
              ].map((item, i) => (
                <ScrollReveal key={item.name} delay={0.4 + i * 0.1}>
                  <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 group hover:border-white/20 transition-all duration-500">
                    <div className="flex flex-col">
                      <span className="font-mono text-[9px] text-white/30 mb-1 tracking-widest">{item.type}</span>
                      <span className="font-mono text-xs font-bold text-white uppercase">{item.name}</span>
                    </div>
                    <div className="text-right font-mono text-[9px] text-accent uppercase tracking-widest">{item.code}</div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Central Visual - 4 Columns */}
          <div className="lg:col-span-4 relative flex items-center justify-center">
            <ScrollReveal direction="up" distance={40} duration={0.8} className="w-full">
              <div className="relative w-full max-w-[400px] aspect-square flex items-center justify-center mx-auto group">
                {/* Technical Frame with Intense Glow - Removed backdrop-blur for performance */}
                <div className="absolute inset-0 bg-black/80 border border-white/10 group-hover:border-accent/40 transition-colors duration-500" />
                <div className="absolute inset-0 bg-accent/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Enhanced Corner Accents */}
                <div className="absolute -top-1 -left-1 w-10 h-10 border-t-[2px] border-l-[2px] border-accent z-20 drop-shadow-[0_0_8px_rgba(136,255,0,0.4)]" />
                <div className="absolute -bottom-1 -right-1 w-10 h-10 border-b-[2px] border-r-[2px] border-accent z-20 drop-shadow-[0_0_8px_rgba(136,255,0,0.4)]" />

                {/* Grid Lines */}
                <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

                {/* Central Core Content */}
                <div
                  className="relative z-10 w-full h-full p-2 flex items-center justify-center overflow-hidden cursor-help group/visual"
                  onMouseEnter={() => setShowPhilosophy(true)}
                  onMouseLeave={() => setShowPhilosophy(false)}
                  onClick={() => setShowPhilosophy(!showPhilosophy)}
                >
                  {/* Active Scanline Over Visual - Disabled on mobile */}
                  {!isMobile && (
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent h-1/2 w-full animate-scanline pointer-events-none z-0 opacity-0 group-hover/visual:opacity-100 transition-opacity" />
                  )}

                  <img
                    src="/assets/images/gif/01-Protocol-Infrastructure.gif"
                    alt="Protocol Infrastructure"
                    loading="lazy"
                    className={`w-full h-full object-cover mix-blend-screen transition-all duration-700 relative z-10 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_90%)] ${showPhilosophy ? 'opacity-10 scale-95' : 'opacity-90 group-hover/visual:opacity-100 group-hover/visual:scale-105 group-hover/visual:brightness-110'}`}
                  />

                  {/* Philosophical Overlay */}
                  <AnimatePresence>
                    {showPhilosophy && (
                      <motion.div
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="absolute inset-0 z-30 flex flex-col items-center justify-center p-6 text-center"
                      >
                        <div className="mb-4">
                          <Info className={`w-5 h-5 text-accent ${!isMobile ? 'animate-pulse' : ''}`} />
                        </div>
                        <h4 className="font-mono text-[6px] md:text-[7px] text-accent font-bold tracking-[0.2em] md:tracking-[0.5em] uppercase mb-4">
                          [ INFRASTRUCTURE_PHILOSOPHY ]
                        </h4>
                        <p className="font-mono text-[6px] md:text-[8px] text-white/80 leading-relaxed uppercase tracking-widest">
                          "XENØr Protocol Infrastructure: The digital substrate of reality. A deterministic mesh where every bit is a testament to unyielding order."
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Internal HUD Detail */}
                  <motion.div 
                    animate={{ opacity: showPhilosophy ? 0 : 1 }}
                    className="absolute top-6 left-6 font-mono text-[7px] text-accent font-bold tracking-[0.4em] opacity-40 group-hover/visual:opacity-100 transition-opacity uppercase border-l border-accent/30 pl-3"
                  >
                    [ VISUAL_CORE_01 ]
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* System Modules - 3 Columns */}
          <div className="lg:col-span-3 space-y-6">
            {[
              { label: 'CORE_LANG', value: 'RUST_1.75', status: 'STABLE', icon: '01' },
              { label: 'NETWORK', value: 'SOLANA', status: 'FAST', icon: '02' },
              { label: 'VERIFIED', value: '100%', status: 'SECURE', icon: '03' },
            ].map((mod, i) => (
              <ScrollReveal key={i} delay={0.2 * i} direction="right">
                <div className="relative group h-full">
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
                        <span className={`pulse-red !bg-accent ${!isMobile ? 'group-hover:glow-accent' : ''}`} />
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
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

