'use client';

import React, { useState } from 'react';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';
import { Shield, Lock, Settings, Ban, LockKeyhole, Hexagon, ChevronRight, Plus, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Security() {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  return (
    <section id="security" className="relative py-24 md:py-40 px-6 md:px-10 overflow-hidden bg-transparent scroll-mt-[-25px]">
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,166,35,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ===== TOP: VISUAL + TITLE (side by side) ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 items-center">

          {/* Visual Inspection Window */}
          <div className="relative group">
            <ScrollReveal direction="right">
              <div className="relative w-full bg-black/60 border border-warn/30 overflow-hidden rounded-lg">
                {/* Top gold line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-warn/80 via-warn/40 to-transparent z-20" />

                {/* Corner brackets */}
                <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-warn z-20" />
                <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-warn/30 z-20" />
                <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-warn/30 z-20" />
                <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-warn z-20" />

                {/* Top-right label */}
                <div className="absolute top-5 right-10 font-mono text-[7px] text-white/30 uppercase tracking-[0.3em] z-20">
                  // ROOT NODE: <span className="text-warn font-black">SECURE</span>
                </div>

                {/* Image */}
                <div
                  className="relative aspect-[4/3] w-full bg-black/90 overflow-hidden transition-colors flex items-center justify-center cursor-help group/visual"
                  onMouseEnter={() => setShowPhilosophy(true)}
                  onMouseLeave={() => setShowPhilosophy(false)}
                  onClick={() => setShowPhilosophy(!showPhilosophy)}
                >
                  <div className="relative w-[70%] aspect-[4/3] flex items-center justify-center">
                    {/* Fitted Focus Brackets */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 border-t border-l border-warn z-20" />
                    <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b border-r border-warn z-20" />

                    <img
                      src="/assets/images/gif/07-Safety-Protocols.gif"
                      alt="Safety Protocols"
                      loading="lazy"
                      className={`w-full h-full object-contain mix-blend-screen transition-all duration-1000 brightness-110 relative z-10 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_90%)] ${showPhilosophy ? 'opacity-20 blur-md scale-95' : 'opacity-80 group-hover/visual:opacity-100 group-hover/visual:scale-105'}`}
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
                            <Info className="w-5 h-5 text-warn animate-pulse" />
                          </div>
                          <h4 className="font-mono text-[6px] md:text-[7px] text-warn font-bold tracking-[0.2em] md:tracking-[0.5em] uppercase mb-2">
                            [ SECURITY_PHILOSOPHY ]
                          </h4>
                          <p className="font-mono text-[6px] md:text-[8px] text-white/80 leading-relaxed uppercase tracking-widest">
                            "Defense Perimeter: Security is the fundamental state of the substrate. Every gate is a manifestation of integrity, unassailable through mathematical absolute."
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Left HUD overlay */}
                  <motion.div 
                    animate={{ opacity: showPhilosophy ? 0 : 1 }}
                    className="absolute left-6 top-10 font-mono text-[6px] text-white/25 space-y-5 z-20 uppercase tracking-widest"
                  >
                    <div className="space-y-1">
                      <div className="text-warn/50 font-bold">STRUCTURAL_SCAN</div>
                      <div className="text-white/40">DEPTH MAP // 87%</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-warn/50 font-bold">RESOLUTION</div>
                      <div className="text-white/40">8192 X 8192</div>
                    </div>
                  </motion.div>

                  {/* Bottom-left HUD */}
                  <motion.div 
                    animate={{ opacity: showPhilosophy ? 0 : 1 }}
                    className="absolute left-6 bottom-6 font-mono text-[6px] text-white/25 space-y-1 z-20 uppercase tracking-widest"
                  >
                    <div className="text-warn/50 font-bold">PROTOCOL_ID</div>
                    <div className="text-white/40">XR-07-A17</div>
                  </motion.div>
                </div>

                {/* Bottom gold line */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-warn/60 via-warn/20 to-transparent z-20" />
              </div>
            </ScrollReveal>
          </div>

          {/* Title Block */}
          <div className="flex flex-col justify-center">
            <ScrollReveal>
              <div className="space-y-8">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rotate-45 bg-warn/80" />
                  <SectionLabel number="07" text="Safety Protocols" color="text-warn" />
                  <span className="font-mono text-[7px] text-white/15 uppercase tracking-[0.4em]">////</span>
                </div>
                <h2 className="text-5xl sm:text-7xl md:text-[110px] font-black font-grotesk tracking-tighter uppercase leading-[0.85]">
                  <span className="text-warn italic block">DEFENSE</span>
                  <span className="text-white block">PERIMETER</span>
                </h2>
                <p className="font-mono text-[9px] text-white/25 uppercase tracking-[0.25em] leading-relaxed max-w-sm">
                  Redundant failure-safes for critical asset integrity.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* ===== MIDDLE: VERIFICATION + 2×2 GRID ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-10">

          {/* Verification Layer Panel (Cols 1-4) */}
          <div className="lg:col-span-4">
            <ScrollReveal direction="right" className="h-full">
              <div className="bg-black/50 border border-warn/15 p-8 h-full rounded-lg relative overflow-hidden group flex flex-col">
                {/* Top accent line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-warn/20 group-hover:bg-warn/40 transition-colors" />

                <div className="space-y-2 mb-10">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[10px] text-warn font-black uppercase tracking-[0.3em]">VERIFICATION LAYER</span>
                    <span className="font-mono text-[6px] text-white/15 uppercase tracking-widest">///</span>
                  </div>
                  <span className="block font-mono text-[7px] text-white/15 uppercase tracking-[0.3em]">// SYSTEM STATE</span>
                </div>

                <h3 className="text-xl md:text-2xl font-black font-grotesk text-white tracking-tighter uppercase leading-none mb-10 group-hover:text-warn transition-colors">
                  PENDING_DEPLOYMENT
                </h3>

                <div className="space-y-2 mb-10">
                  <span className="block font-mono text-[7px] text-warn/50 uppercase tracking-[0.3em]">REVIEW_LAYER</span>
                  <span className="block font-mono text-[10px] text-white font-black uppercase tracking-wider">MANUAL_REVIEW_ACTIVE</span>
                </div>

                {/* Bottom items */}
                <div className="pt-8 border-t border-warn/10 space-y-6">
                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full border border-warn/30 flex items-center justify-center group-hover:bg-warn/10 transition-all">
                      <Settings className="w-5 h-5 text-warn" strokeWidth={1.5} />
                    </div>
                    <div className="font-mono text-[9px] text-white/40 uppercase leading-tight tracking-tight">
                      <span className="text-white/60 font-bold block">SYSTEM OPERATION</span>
                      <div className="flex gap-1 mt-1 opacity-20">
                        {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="w-2 h-[1px] bg-white" />)}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full border border-warn/30 flex items-center justify-center group-hover:bg-warn/10 transition-all">
                      <Lock className="w-5 h-5 text-warn" strokeWidth={1.5} />
                    </div>
                    <div className="font-mono text-[9px] text-white/40 uppercase leading-tight tracking-tight">
                      EXTERNAL SECURITY CONSTRAINTS.. <br />
                      <span className="text-warn font-black">ENFORCED</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* 2×2 Protection Grid (Cols 5-12) */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: 'ANTI-TAMPER PROTECTION',
                desc: 'Tamper-resistant logic designed to withstand malicious attempts.',
                status: 'ACTIVE',
                statusColor: 'text-warn',
                icon: <Shield className="w-6 h-6 text-warn" strokeWidth={1.5} />,
                ringColor: 'border-warn/60',
                ringBg: 'bg-warn/10',
              },
              {
                title: 'DETERMINISTIC SUPPLY',
                desc: 'Supply curve and mechanics set in stone. No variations.',
                status: 'LOCKED',
                statusColor: 'text-white/50',
                icon: <Hexagon className="w-6 h-6 text-white/60" strokeWidth={1.5} />,
                ringColor: 'border-white/15',
                ringBg: 'bg-white/5',
              },
              {
                title: 'LIQUIDITY LOCK',
                desc: '100% of critical liquidity will be permanently locked or burned.',
                status: 'LOCKED',
                statusColor: 'text-warn',
                icon: <LockKeyhole className="w-6 h-6 text-warn" strokeWidth={1.5} />,
                ringColor: 'border-warn/60',
                ringBg: 'bg-warn/10',
              },
              {
                title: 'NO MINT FUNCTION',
                desc: 'Smart contract prevents any token mint function.',
                status: 'DISABLED',
                statusColor: 'text-warn',
                icon: <Ban className="w-6 h-6 text-warn" strokeWidth={1.5} />,
                ringColor: 'border-warn/60',
                ringBg: 'bg-warn/10',
              },
            ].map((p, i) => (
              <ScrollReveal key={i} delay={0.08 * i}>
                <div className="bg-black/50 border border-warn/10 p-7 rounded-lg group hover:border-warn/30 transition-all duration-500 relative overflow-hidden h-full flex flex-col">
                  {/* Top accent */}
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-warn/10 group-hover:bg-warn/30 transition-colors" />

                  {/* Icon + Title row */}
                  <div className="flex items-center gap-4 mb-5">
                    <div className={`w-12 h-12 flex-shrink-0 rounded-full border-2 ${p.ringColor} ${p.ringBg} flex items-center justify-center transition-all group-hover:scale-110`}>
                      {p.icon}
                    </div>
                    <h3 className="text-sm font-black font-grotesk text-white group-hover:text-warn tracking-tight uppercase leading-tight transition-colors">
                      {p.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="font-mono text-[7px] text-white/25 uppercase tracking-[0.1em] leading-relaxed mb-6 group-hover:text-white/40 transition-colors flex-1">
                    {p.desc}
                  </p>

                  {/* Footer: STATUS + dots */}
                  <div className="pt-4 border-t border-warn/5 flex items-center justify-between">
                    <div className="font-mono text-[7px] uppercase tracking-[0.2em]">
                      <span className="text-white/15">STATUS: </span>
                      <span className={`font-black ${p.statusColor}`}>{p.status}</span>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(bit => (
                        <div key={bit} className="w-1.5 h-1.5 bg-warn/15 group-hover:bg-warn/60 transition-colors" />
                      ))}
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* ===== BOTTOM: QUOTE BANNER ===== */}
        <ScrollReveal delay={0.3}>
          <div className="relative bg-black/50 border border-warn/15 py-10 px-8 md:px-16 rounded-lg overflow-hidden group">
            {/* Corner brackets */}
            <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-warn/50" />
            <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-warn/50" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-warn/50" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-warn/50" />

            {/* Quote text */}
            <p className="text-center font-mono text-[9px] md:text-[10px] text-white/40 uppercase tracking-[0.12em] leading-relaxed max-w-4xl mx-auto italic mb-8 group-hover:text-white/60 transition-colors">
              &quot;Security is not a feature; it is the fundamental constraint under which the entire protocol operates. Every line of code is reviewed for irreversibility execution before being committed to the mainnet.&quot;
            </p>

            {/* Footer bar */}
            <div className="flex flex-wrap items-center justify-between font-mono text-[6px] uppercase tracking-[0.5em] pt-4 border-t border-warn/10 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 border border-warn/40 flex items-center justify-center text-[6px] text-warn/60">
                  <Plus className="w-2 h-2" />
                </div>
                <span className="text-white/20">PRINCIPLES:</span>
                <span className="text-warn font-black">IMMUTABLE</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <div className="w-8 h-[1px] bg-warn/30" />
                <div className="w-1.5 h-1.5 bg-warn/30 rotate-45" />
                <div className="w-8 h-[1px] bg-warn/30" />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-white/20">COMMITMENT:</span>
                <span className="text-warn font-black">ABSOLUTE</span>
                <div className="w-3 h-3 border border-warn/40 flex items-center justify-center text-[6px] text-warn/60">
                  <ChevronRight className="w-2 h-2" />
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
