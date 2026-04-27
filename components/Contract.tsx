'use client';

import React, { useState } from 'react';
import { XENOR } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';
import {
  Copy,
  Lock,
  Hourglass,
  Check,
  RotateCw,
  Settings,
  Box,
  Shield,
  Timer,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Contract() {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(XENOR.contract.devWallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contract" className="relative py-24 md:py-40 px-6 md:px-10 bg-transparent overflow-hidden scroll-mt-[-10px]">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[200px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Top Header — Official Truth Substrate */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16 md:mb-20">
          <ScrollReveal>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <SectionLabel number="05" text="Contract_Verify_System" />
                <span className="font-mono text-[7px] text-white/20 uppercase tracking-[0.4em]">ECON_SUBSTRATE_v2.1.0</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-black font-grotesk leading-[0.85] tracking-tighter uppercase text-white">
                OFFICIAL <br />
                <span className="text-accent italic drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">TRUTH_SUBSTRATE</span>
              </h2>
            </div>
          </ScrollReveal>

          {/* Top Right Badges */}
          <ScrollReveal direction="left" className="flex flex-wrap gap-4 lg:gap-8 pt-4">
            {[
              { label: 'VALIDATION_LAYER', val: 'DETERMINISTIC' },
              { label: 'VERIFICATION_MODE', val: 'CANONICAL' },
              { label: 'EXECUTION_SCOPE', val: 'CROSS-CHAIN' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-1">
                <span className="block font-mono text-[6px] text-white/20 uppercase tracking-widest">{item.label}</span>
                <span className="block font-mono text-[9px] text-white font-bold uppercase tracking-widest">{item.val}</span>
              </div>
            ))}
          </ScrollReveal>
        </div>

        {/* Main Terminal Interface — ALIGNED GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 items-stretch">

          {/* Left Column: SCAN_TELEMETRY + MAINNET_STATUS (Cols 1-3) */}
          <div className="lg:col-span-3 flex flex-col gap-6">
            <ScrollReveal direction="right" className="bg-black/40 border border-white/10 p-6 space-y-8 relative group rounded-md flex-1">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <span className="font-mono text-lg md:text-xl text-accent font-black uppercase tracking-wider">SCAN_TELEMETRY</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] text-white/40 uppercase font-black">LIVE</span>
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { label: 'INTEGRITY', val: '100.00%', color: 'text-accent' },
                  { label: 'ORIGIN', val: 'VERIFIED', color: 'text-green-500' },
                  { label: 'SYNC', val: 'LOCKED', color: 'text-green-500' },
                ].map((stat, i) => (
                  <div key={i} className="p-3 border border-white/5 bg-white/[0.02] text-center space-y-1.5">
                    <span className="block font-mono text-[7px] text-white/20 uppercase tracking-tight">{stat.label}</span>
                    <span className={`block font-mono text-[10px] font-bold uppercase ${stat.color}`}>{stat.val}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <span className="block font-mono text-[9px] text-white/30 uppercase tracking-widest">ROOT_DEPLOYER_ADRESS</span>
                <div className="flex items-center justify-between gap-2 p-3 bg-white/[0.02] border border-white/5 rounded-sm group/addr">
                  <span className="font-mono text-[8px] text-white font-bold uppercase leading-tight overflow-hidden overflow-ellipsis break-all line-clamp-2">
                    {XENOR.contract.devWallet}
                  </span>
                  <div className="flex-shrink-0">
                    <button
                      onClick={handleCopy}
                      className={`flex items-center gap-1.5 px-3 py-1.5 border font-mono text-[8px] font-black uppercase transition-all duration-300 ${copied ? 'bg-green-500/20 border-green-500 text-green-500' : 'bg-accent/10 border-accent/40 text-accent hover:bg-accent hover:text-black'}`}
                    >
                      {copied ? <Check size={10} /> : <Copy size={10} />}
                      {copied ? 'COPIED!' : 'COPY'}
                    </button>
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 font-mono text-[7px] uppercase tracking-widest leading-relaxed">
                <div className="flex justify-between">
                  <span className="text-white/20">CHAIN_ID</span>
                  <span className="text-white/60">XENOR_MAINNET</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/20">ROOT_HASH</span>
                  <span className="text-white/60">0XBF3A...7C9E21</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/20">LAST_SCAN</span>
                  <span className="text-white/60 uppercase">12 SEC AGO</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/20">SCAN_DEPTH</span>
                  <span className="text-white/60">128,456 BLOCKS</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={0.1} className="p-5 border border-accent/40 bg-black/40 flex items-center justify-between rounded-md">
              <span className="font-mono text-[9px] text-accent font-black uppercase tracking-[0.4em]">MAINNET_STATUS</span>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                <span className="text-green-500 font-mono text-[8px] font-black uppercase tracking-widest">ACTIVE</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Center Column: Visual Inspection (Cols 4-8) */}
          <div className="lg:col-span-6 relative group flex flex-col">
            <ScrollReveal direction="up" className="flex-1 flex flex-col">
              <div className="relative flex-1 w-full border border-accent/30 bg-black/40 p-4 rounded-md flex flex-col">
                {/* Visual Label */}
                <motion.div 
                  animate={{ opacity: showPhilosophy ? 0 : 1 }}
                  className="absolute top-6 left-6 flex items-center gap-3 z-20"
                >
                  <div className="w-2 h-2 border border-accent/60" />
                  <span className="font-mono text-[7px] text-accent font-black uppercase tracking-[0.4em]">CANONICAL_ARTIFACT //</span>
                </motion.div>

                <motion.div 
                  animate={{ opacity: showPhilosophy ? 0 : 1 }}
                  className="absolute top-6 right-6 font-mono text-[7px] text-white/30 uppercase tracking-widest z-20 text-right"
                >
                  SCAN_MODE <br /> <span className="text-white/60 font-black">DEEP_VERIFY</span>
                </motion.div>

                <div
                  className="relative flex-1 w-full bg-black/90 border border-white/5 flex items-center justify-center overflow-hidden min-h-[220px] md:min-h-[380px] transition-colors cursor-help group/visual"
                  onMouseEnter={() => setShowPhilosophy(true)}
                  onMouseLeave={() => setShowPhilosophy(false)}
                  onClick={() => setShowPhilosophy(!showPhilosophy)}
                >
                  {/* Fitted HUD Inspection Window */}
                  <div className="relative w-[55%] aspect-square flex items-center justify-center">
                    {/* Inspection Brackets */}
                    <motion.div 
                      animate={{ opacity: showPhilosophy ? 0 : 1 }}
                      className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-accent/60 z-20" 
                    />
                    <motion.div 
                      animate={{ opacity: showPhilosophy ? 0 : 1 }}
                      className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-accent/60 z-20" 
                    />

                    <img
                      src="/assets/images/goldxen.gif"
                      alt="Truth Artifact"
                      className={`w-full h-full object-contain mix-blend-screen brightness-110 relative z-10 transition-all duration-700 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_90%)] ${showPhilosophy ? 'opacity-10 scale-95' : 'opacity-90 group-hover/visual:scale-105'}`}
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
                            <Info className="w-5 h-5 text-accent animate-pulse" />
                          </div>
                          <h4 className="font-mono text-[6px] md:text-[7px] text-accent font-bold tracking-[0.2em] md:tracking-[0.5em] uppercase mb-2">
                            [ VERIFICATION_PHILOSOPHY ]
                          </h4>
                          <p className="font-mono text-[6px] md:text-[8px] text-white/80 leading-relaxed uppercase tracking-widest">
                            "Verification Substrate: Mathematical proof replaces trust. Code is immutable law—a crystalline reflection of intent that cannot be broken."
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Local Scanning Effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent h-1/3 w-full animate-scanline pointer-events-none z-20" />
                  </div>

                  {/* Left Scale */}
                  <motion.div 
                    animate={{ opacity: showPhilosophy ? 0 : 1 }}
                    className="absolute left-6 top-1/2 -translate-y-1/2 h-[70%] flex flex-col justify-between items-end font-mono text-[6px] text-white/20"
                  >
                    <span>100% |</span>
                    <span>75% |</span>
                    <span>50% |</span>
                    <span>25% |</span>
                    <span>0% |</span>
                  </motion.div>
                  <motion.div 
                    animate={{ opacity: showPhilosophy ? 0 : 1 }}
                    className="absolute left-12 top-1/2 -translate-y-1/2 h-[70%] w-[1px] bg-white/10" 
                  />

                  {/* Right HUD Stats */}
                  <motion.div 
                    animate={{ opacity: showPhilosophy ? 0 : 1 }}
                    className="absolute right-8 top-1/2 -translate-y-1/2 space-y-6 font-mono text-[6px] text-white/30 text-right"
                  >
                    <div className="space-y-1">
                      <div>OBJECT_ID</div>
                      <div className="text-white/60">XA-04-TRUTH</div>
                    </div>
                    <div className="space-y-1">
                      <div>CATEGORY</div>
                      <div className="text-white/60">ROOT_VERIFIER</div>
                    </div>
                    <div className="space-y-1">
                      <div>STATUS</div>
                      <div className="text-accent font-black">LOCKED</div>
                    </div>
                    <div className="space-y-1">
                      <div>SIGNATURE</div>
                      <div className="text-green-500 font-black">MATCHED</div>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  animate={{ opacity: showPhilosophy ? 0 : 1 }}
                  className="absolute bottom-4 left-0 w-full flex items-center justify-center gap-4 z-20"
                >
                  <div className="px-4 py-1 border border-accent/40 bg-black/80 font-mono text-[8px] text-accent font-black uppercase tracking-[0.4em] flex items-center gap-2 rounded-sm shadow-[0_0_20px_rgba(255,215,0,0.1)]">
                    <Lock size={10} className="text-accent/60" /> TRUTH_NODE // LOCKED
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: DEPLOYMENT_QUEUE (Cols 9-12) */}
          <div className="lg:col-span-3 flex flex-col">
            <ScrollReveal direction="left" className="bg-black/40 border border-white/10 p-6 space-y-8 flex-1 group rounded-md flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-accent" />
                <span className="font-mono text-lg md:text-xl text-accent font-black uppercase tracking-wider">DEPLOYMENT_QUEUE</span>
              </div>

              <div className="flex justify-between items-center font-mono text-[8px] text-white/20 uppercase tracking-widest">
                <span>SYSTEM_QUEUE</span>
                <span className="text-white/60">4 ITEMS</span>
              </div>

              <div className="space-y-3 flex-1">
                {[
                  { name: 'TOKEN_PROTOCOL', status: 'AWAITING_TGE', icon: Hourglass, color: 'bg-accent' },
                  { name: 'ROOT_DEPLOYER', status: 'SYNCED', icon: Check, color: 'bg-green-500' },
                  { name: 'MAINNET_REGISTRY', status: 'PENDING', icon: RotateCw, color: 'bg-accent' },
                  { name: 'EXTERNAL_CA_CHECK', status: 'LOCKED', icon: Lock, color: 'bg-white/20' },
                ].map((item, i) => (
                  <div key={i} className="p-4 border border-white/5 bg-white/[0.02] flex items-center gap-4 group/item transition-all hover:bg-white/[0.04]">
                    <div className="w-8 h-8 rounded-full border border-white/5 flex items-center justify-center text-accent/60 group-hover:border-accent transition-all">
                      <item.icon size={14} strokeWidth={1.5} />
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[11px] font-black text-white/80 uppercase">{item.name}</span>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                      </div>
                      <span className="block font-mono text-[7px] text-white/30 uppercase">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 space-y-4">
                <div className="font-mono text-[9px] text-white/20 uppercase tracking-widest">NEXT_ACTION</div>
                <div className="p-4 border border-white/5 bg-white/[0.02] space-y-3">
                  <div className="font-mono text-[8px] text-accent font-black uppercase tracking-[0.3em]">AWAITING_FINAL_SYNC</div>
                  <div className="flex gap-1.5">
                    {[1, 1, 1, 0, 0].map((b, i) => (
                      <div key={i} className={`h-1.5 w-4 ${b ? 'bg-accent' : 'bg-white/5'}`} />
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* BOTTOM STATS ROW */}
        <ScrollReveal direction="up" delay={0.2}>
          <div className="bg-black/60 border border-white/10 rounded-xl p-8 grid grid-cols-1 md:grid-cols-4 gap-8">

            {/* ROOT_DEPLOYER */}
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <div className="absolute inset-0 border border-accent/20 rotate-45" />
                <Settings size={20} className="text-accent grayscale group-hover:grayscale-0 transition-all" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-[8px] text-white/40 uppercase tracking-[0.2em]">ROOT_DEPLOYER</span>
                <span className="block font-mono text-xs font-black text-green-500 uppercase">VERIFIED</span>
                <span className="block font-mono text-[7px] text-white/20 uppercase">Canonically Matched</span>
              </div>
            </div>

            {/* CANONICAL_HASH */}
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <div className="absolute inset-0 border border-white/10 rotate-45" />
                <Box size={20} className="text-white/40 group-hover:text-accent transition-colors" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-[8px] text-white/40 uppercase tracking-[0.2em]">CANONICAL_HASH</span>
                <span className="block font-mono text-xs font-black text-green-500 uppercase">MATCHED</span>
                <span className="block font-mono text-[7px] text-white/20 uppercase">0X8F3A...7C9E21</span>
              </div>
            </div>

            {/* MAINNET_STATUS */}
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <div className="absolute inset-0 border border-white/10 rotate-45" />
                <Shield size={20} className="text-white/40 group-hover:text-accent transition-colors" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-[8px] text-white/40 uppercase tracking-[0.2em]">MAINNET_STATUS</span>
                <span className="block font-mono text-xs font-black text-green-500 uppercase">ACTIVE</span>
                <span className="block font-mono text-[7px] text-white/20 uppercase">Fully Operational</span>
              </div>
            </div>

            {/* LAST_VALIDATION */}
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 relative flex items-center justify-center">
                <div className="absolute inset-0 border border-white/10 rotate-45" />
                <Timer size={20} className="text-white/40 group-hover:text-accent transition-colors" strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <span className="block font-mono text-[8px] text-white/40 uppercase tracking-[0.2em]">LAST_VALIDATION</span>
                <span className="block font-mono text-xs font-black text-white/80 uppercase">12 SEC AGO</span>
                <span className="block font-mono text-[7px] text-white/20 uppercase">Block #8,456,312</span>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
