'use client';

import React, { useState } from 'react';
import { XENOR } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';
import {
  Circle,
  Diamond,
  ExternalLink,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Tokenomics() {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return (
    <section id="tokenomics" className="relative py-24 md:py-40 px-6 md:px-10 bg-transparent scroll-mt-[-25px]">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_20%,rgba(255,215,0,0.02)_0%,transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-16 md:space-y-24">

        {/* PHASE 01: LIQUIDITY ARCHITECTURE CONTROL CENTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column — Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-8">
              <ScrollReveal>
                <div className="flex items-center gap-4">
                  <SectionLabel number="04" text="Economic Substrate" />
                  <div className="h-[1px] flex-1 bg-white/10" />
                  <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest hidden md:block">ECON_SYNC: NOMINAL</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="text-3xl sm:text-5xl md:text-7xl font-black font-grotesk leading-[0.85] tracking-tighter uppercase text-white">
                  LIQUIDITY <br />
                  <span className="text-accent italic drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">ARCHITECTURE</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <p className="text-white/60 text-xs md:text-sm font-mono uppercase tracking-[0.15em] leading-relaxed max-w-md">
                  Absolute transparency. Zero inflation. Zero hidden reserves. Maximum capital velocity for compute.
                </p>
              </ScrollReveal>
            </div>

            {/* Live Metrics Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScrollReveal delay={0.3} direction="up" className="glass p-5 border border-white/5 relative group">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">Sync_Rate</span>
                  </div>
                  <span className="font-mono text-xs text-accent font-bold">99.9%</span>
                </div>
                <div className="h-8 w-full relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0,30 Q10,25 20,28 T40,22 T60,25 T80,20 T100,24" fill="none" stroke="#FFD700" strokeWidth="1.5" className="drop-shadow-[0_0_8px_rgba(255,215,0,0.5)]" />
                  </svg>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.4} direction="up" className="glass p-5 border border-white/5 relative group">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-white/20 rounded-full" />
                    <span className="font-mono text-[8px] text-white/40 uppercase tracking-widest">Block_Height</span>
                  </div>
                  <span className="font-mono text-xs text-white/80 font-bold">#892,841</span>
                </div>
                <div className="h-8 w-full relative overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                    <path d="M0,35 Q15,34 30,35 T60,34 T90,35 L100,35" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  </svg>
                </div>
              </ScrollReveal>
            </div>

            {/* Footer Params */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
              {[
                { label: 'Canonical Supply', val: XENOR.tokenomics.supply },
                { label: 'Base Fee', val: '0.00%' },
                { label: 'Transparency Protocol', val: 'Verified' },
              ].map((item, i) => (
                <ScrollReveal key={i} delay={0.5 + i * 0.1}>
                  <div className="space-y-1">
                    <span className="block font-mono text-[6px] md:text-[7px] text-white/20 uppercase tracking-widest">{item.label}</span>
                    <span className="block font-mono text-[8px] md:text-[10px] text-white/80 uppercase tracking-tighter font-black">{item.val}</span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Right Column — Large Visual (7 cols) */}
          <div className="lg:col-span-7 relative group">
            <ScrollReveal direction="left" distance={40}>
              <div className="relative aspect-[4/3] w-full border border-white/10 bg-black/40 overflow-hidden backdrop-blur-sm shadow-2xl">
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-accent/40 z-20 group-hover:border-accent transition-all duration-500" />
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-accent/40 z-20 group-hover:border-accent transition-all duration-500" />
                <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

                <div
                  className="absolute inset-4 flex items-center justify-center overflow-hidden bg-black/90 border border-white/5 transition-colors cursor-help group/visual"
                  onMouseEnter={() => setShowPhilosophy(true)}
                  onMouseLeave={() => setShowPhilosophy(false)}
                  onClick={() => setShowPhilosophy(!showPhilosophy)}
                >
                  {/* Fitted HUD Frame */}
                  <div className="relative w-[70%] aspect-[4/3] flex items-center justify-center">
                    {/* Inner Brackets - Tightly Fitted */}
                    <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-accent/60 z-20" />
                    <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-accent/60 z-20" />

                    <img
                      src="/assets/images/gif/04-Token-Economy.gif"
                      alt="Token Economy"
                      className={`w-full h-full object-contain mix-blend-screen transition-all duration-1000 relative z-10 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_90%)] ${showPhilosophy ? 'opacity-20 blur-md scale-95' : 'opacity-80 group-hover/visual:opacity-100 group-hover/visual:scale-105'}`}
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
                            [ ECONOMIC_PHILOSOPHY ]
                          </h4>
                          <p className="font-mono text-[6px] md:text-[8px] text-white/80 leading-relaxed uppercase tracking-widest">
                            "The Economic Substrate: A perpetual engine of value. Liquidity flows through deterministic laws, harnessed by the protocol's rotation."
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Scanning Line localized to the GIF - Disabled on mobile */}
                    {!isMobile && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-1/2 w-full animate-scanline pointer-events-none z-20" />
                    )}
                  </div>

                  {/* HUD Labels */}
                  <motion.div 
                    animate={{ opacity: showPhilosophy ? 0 : 1 }}
                    className="absolute top-8 left-8 space-y-4 z-20"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-1.5 h-1.5 bg-accent rounded-full ${!isMobile ? 'animate-pulse' : ''}`} />
                      <span className="font-mono text-[8px] text-accent font-black uppercase tracking-[0.4em]">ECON_VISUAL_04</span>
                    </div>
                  </motion.div>

                  <motion.div 
                    animate={{ opacity: showPhilosophy ? 0 : 1 }}
                    className="absolute bottom-8 right-8 w-44 p-4 z-20 border-l border-accent/20"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="font-mono text-[7px] text-white/30 uppercase tracking-widest">FLOW OVER TIME</span>
                    </div>
                    <div className="h-12 w-full relative">
                      <svg className="w-full h-full" viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0,35 Q10,32 20,34 T40,25 T60,30 T80,15 T100,20" fill="none" stroke="rgba(255,215,0,0.6)" strokeWidth="1" />
                      </svg>
                    </div>
                  </motion.div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* PHASE 02: ECONOMIC PARAMETERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20">
          {[
            { label: 'Public Liquidity', value: XENOR.tokenomics.fairLaunch, desc: '100% fair launch. Distributed through market discovery.' },
            { label: 'Supply Limit', value: XENOR.tokenomics.supply, desc: 'Fixed canonical float. No mint function. Immutable substrate.' },
            { label: 'Protocol Fee', value: '0.00%', desc: 'Native fee-less execution for maximum compute interaction.' }
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={0.1 * i} direction="up">
              <div className="bg-black/40 border border-white/5 p-8 relative overflow-hidden group hover:border-accent/30 transition-all duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent/10 group-hover:bg-accent/40 transition-colors" />
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[8px] text-accent font-bold uppercase tracking-[0.4em]">PARA_0{i + 1}</span>
                    <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">[ READ_OK ]</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest">{stat.label}</span>
                    <div className="text-3xl font-black text-white italic tracking-tighter group-hover:text-accent transition-colors font-grotesk">
                      {stat.value}
                    </div>
                  </div>
                  <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] leading-relaxed italic">
                    {stat.desc}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* PHASE 03: ALLOCATION MATRIX & AUDIT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-20">
          {/* Allocation Matrix */}
          <div className="lg:col-span-5 bg-black/40 border border-white/5 p-8 relative overflow-hidden group">
            <ScrollReveal direction="up">
              <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10 group-hover:border-accent/40 transition-all" />
              <div className="space-y-8 relative z-10">
                <div className="flex justify-between items-end">
                  <span className="font-mono text-[9px] text-accent font-black uppercase tracking-[0.4em]">Allocation_Matrix</span>
                  <span className="font-mono text-[7px] text-white/20 uppercase">Units: %</span>
                </div>
                <div className="space-y-6">
                  {[
                    { label: "Market Distribution", value: "100%", active: true },
                    { label: "Team Reserve", value: "0%", active: false },
                    { label: "VC Allocation", value: "0%", active: false }
                  ].map((item, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-[8px] font-mono uppercase tracking-widest">
                        <span className={item.active ? "text-white" : "text-white/30"}>{item.label}</span>
                        <span className={item.active ? "text-accent" : "text-white/30"}>{item.value}</span>
                      </div>
                      <div className="w-full h-[1px] bg-white/5 relative">
                        <div className={`h-full absolute top-0 left-0 ${item.active ? "bg-accent" : "bg-white/10"}`} style={{ width: item.value }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Audit Verification */}
          <div className="lg:col-span-7 bg-black/40 border border-white/5 p-8 relative overflow-hidden group flex flex-col justify-between">
            <ScrollReveal direction="up" delay={0.1}>
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-accent/40 transition-all" />
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] text-accent font-black uppercase tracking-[0.4em]">Audit_Log_Verification</span>
                  <span className="flex items-center gap-2 font-mono text-[7px] text-white/40 uppercase">
                    <Circle size={6} className="fill-accent text-accent animate-pulse" /> LIVE_SYNC
                  </span>
                </div>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] leading-relaxed italic max-w-xl flex items-center gap-3">
                  <Diamond size={8} className="text-accent/60" />
                  All economic parameters are hardcoded into the XENOr substrate. Public verification is established through canonical GitHub audit logs.
                  <Diamond size={8} className="text-accent/60" />
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6 pt-8 border-t border-white/5 relative z-10">
                <div className="space-y-1">
                  <span className="block font-mono text-[6px] text-white/20 uppercase tracking-widest">System_Version</span>
                  <span className="block font-mono text-[9px] text-white/60 uppercase tracking-widest font-bold">READY_TO_SYNC_v1.0.4</span>
                </div>
                <a
                  href={XENOR.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-white text-black font-mono text-[9px] font-black uppercase tracking-[0.5em] hover:bg-accent transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  VERIFY_ON_GITHUB <ExternalLink size={10} />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
