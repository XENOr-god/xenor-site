'use client';

import React, { useState } from 'react';
import { FEATURES } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';
import FeatureCanvas from './ui/FeatureCanvas';
import { Settings, RotateCw, Target, Diamond, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Features() {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  // Mapping icon names to Lucide components
  const IconMap: Record<string, React.ComponentType<{ className?: string; strokeWidth?: number }>> = {
    Settings,
    RotateCw,
    Target,
    Diamond
  };

  // Mapping feature IDs to FeatureCanvas variants
  const getVariant = (id: string): 'particles' | 'rings' | 'datamatrix' => {
    if (id === 'SIM') return 'particles';
    if (id === 'ENGINE') return 'rings';
    return 'datamatrix';
  };

  return (
    <section id="features" className="relative py-16 md:py-32 px-6 md:px-10 bg-transparent overflow-hidden scroll-mt-[-25px]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.02)_0%,transparent_50%)] pointer-events-none hidden md:block" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top Header & Main Architecture Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mb-16 md:mb-24">

          {/* Info Block (5 cols) */}
          <div className="lg:col-span-5 space-y-10 lg:sticky lg:top-32">
            <ScrollReveal delay={0.1}>
              <div className="flex items-center gap-4">
                <SectionLabel number="02" text="System Architecture" />
                <div className="h-[1px] flex-1 bg-white/10" />
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <h2 className="text-3xl sm:text-4xl md:text-6xl font-black font-grotesk leading-[0.85] tracking-tighter uppercase text-white">
                  BUILT <br />
                  <span className="text-accent italic drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">DETERMINISM</span>
                </h2>
                <div className="glass p-6 md:p-8 corner-brackets relative">
                  <span className="corner-bottom-left" />
                  <span className="corner-bottom-right" />
                  <p className="text-white/60 text-xs md:text-sm font-mono uppercase tracking-tight leading-relaxed">
                    Verified by Rust substrate. Zero-failure execution layer. Every state transition is cryptographically validated.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            {/* Quick stats list */}
            <div className="space-y-4">
              {[
                { name: 'BITRATE', val: '1.2 GB/S', type: 'THROUGHPUT' },
                { name: 'STATE_INTEGRITY', val: '100%', type: 'VERIFICATION' },
              ].map((item, i) => (
                <ScrollReveal key={item.name} delay={0.3 + i * 0.1}>
                  <div className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 hover:border-accent/20 transition-all group">
                    <div className="flex flex-col">
                      <span className="font-mono text-[8px] text-white/30 tracking-[0.2em] mb-1">{item.type}</span>
                      <span className="font-mono text-xs font-bold text-white uppercase">{item.name}</span>
                    </div>
                    <span className="font-mono text-xs text-accent font-bold">{item.val}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Large Architecture Visual (7 cols) */}
          <div className="lg:col-span-7 relative group">
            <ScrollReveal direction="left" distance={40}>
              <div className="relative aspect-[4/3] w-full border border-white/10 bg-black/40 overflow-hidden backdrop-blur-sm shadow-2xl">
                {/* HUD Elements */}
                <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-accent/40 z-20 group-hover:border-accent transition-all duration-500" />
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/10 z-20" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/10 z-20" />
                <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-accent/40 z-20 group-hover:border-accent transition-all duration-500" />

                {/* Grid Overlay */}
                <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

                {/* Main Visual Animation */}
                <div
                  className="absolute inset-4 flex items-center justify-center overflow-hidden bg-black/90 border border-white/5 transition-colors cursor-help group/visual"
                  onMouseEnter={() => setShowPhilosophy(true)}
                  onMouseLeave={() => setShowPhilosophy(false)}
                  onClick={() => setShowPhilosophy(!showPhilosophy)}
                >
                  {/* Fitted Substrate Frame */}
                  <div className="relative w-[75%] aspect-[4/3] flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-1/2 w-full animate-scanline pointer-events-none z-10" />

                    {/* Tightly Fitted HUD Markers */}
                    <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-accent/40 z-20" />
                    <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-accent/40 z-20" />

                    <img
                      src="/assets/images/gif/02-System-Architecture.gif"
                      alt="System Architecture"
                      className={`w-full h-full object-contain mix-blend-screen transition-all duration-1000 brightness-110 relative z-10 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_90%)] ${showPhilosophy ? 'opacity-20 scale-95 blur-sm' : 'opacity-80 group-hover/visual:opacity-100 group-hover/visual:scale-105'}`}
                    />

                    {/* Philosophical Overlay */}
                    <AnimatePresence>
                      {showPhilosophy && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="absolute inset-0 z-30 flex flex-col items-center justify-center p-8 text-center"
                        >
                          <div className="mb-4">
                            <Info className="w-6 h-6 text-accent animate-pulse" />
                          </div>
                          <h4 className="font-mono text-[6px] md:text-[7px] text-accent font-bold tracking-[0.2em] md:tracking-[0.5em] uppercase mb-4">
                            [ ARCHITECTURAL_PHILOSOPHY ]
                          </h4>
                          <p className="font-mono text-[6px] md:text-[8px] text-white/80 leading-relaxed uppercase tracking-wider max-w-[280px]">
                            "XENØr Digital Substrate — A living architecture where chaos meets absolute order, weaving the protocol's memory into a singular truth."
                          </p>
                          <div className="mt-6 flex gap-4">
                            <div className="w-12 h-[1px] bg-accent/30" />
                            <div className="w-1 h-1 bg-accent rounded-full" />
                            <div className="w-12 h-[1px] bg-accent/30" />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <motion.div 
                      animate={{ opacity: showPhilosophy ? 0 : 1 }}
                      className="absolute -top-2 left-2 font-mono text-[7px] text-accent font-bold tracking-[0.4em] z-20 border-l border-accent/40 pl-3"
                    >
                      [ XNR_ARCH_SYNC_LIVE ]
                    </motion.div>
                  </div>
                </div>

                {/* Telemetry Footer */}
                <motion.div 
                  animate={{ opacity: showPhilosophy ? 0 : 1 }}
                  className="absolute bottom-8 left-8 right-8 flex justify-between font-mono text-[7px] text-white/20 uppercase tracking-[0.5em] z-20"
                >
                  <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" /> ENGINE_ACTIVE</span>
                  <span>LOAD: 12.4%</span>
                  <span>BLOCK: #88219</span>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Feature Cards Grid (2x2) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.id} delay={0.1 * i} direction="up">
              <div className="glass p-8 h-full relative overflow-hidden border border-white/5 hover:border-accent/40 transition-all duration-500 group flex flex-col justify-between min-h-[320px]">
                {/* Header info */}
                <div className="flex justify-between items-start mb-8">
                  <div className="w-10 h-10 border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-accent/40 transition-colors">
                    {(() => {
                      const Icon = IconMap[feature.icon];
                      return Icon ? <Icon className="w-5 h-5 text-accent grayscale group-hover:grayscale-0 transition-all" strokeWidth={1.5} /> : null;
                    })()}
                  </div>
                  <span className="font-mono text-[8px] text-accent/60 tracking-[0.4em] uppercase">[{String(i + 1).padStart(2, '0')}]</span>
                </div>

                {/* Feature Content */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1 h-1 bg-accent rounded-full" />
                    <span className="font-mono text-[8px] text-white/20 tracking-[0.4em] uppercase">{feature.id}</span>
                  </div>
                  <h3 className="text-xl font-black font-grotesk text-white tracking-tighter uppercase italic group-hover:text-accent transition-colors leading-tight">
                    {feature.title}
                  </h3>
                  <p className="text-[10px] text-white/40 font-mono uppercase tracking-tight leading-relaxed line-clamp-3">
                    {feature.description}
                  </p>
                </div>

                {/* Bottom Visual Animation */}
                <div className="mt-8 pt-6 border-t border-white/5 relative aspect-video overflow-hidden bg-black/40 border border-white/5">
                  <FeatureCanvas
                    variant={getVariant(feature.id)}
                    className="w-full h-full opacity-40 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-3 font-mono text-[7px] text-accent uppercase tracking-widest">{feature.label}</div>
                </div>

                {/* Grid decor */}
                <div className="absolute inset-0 grid-bg opacity-[0.02] pointer-events-none" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
