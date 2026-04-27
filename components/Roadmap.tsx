'use client';

import React, { useState } from 'react';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';
import {
  Box,
  Layers,
  Globe,
  Lock,
  Settings,
  Triangle,
  Target,
  BatteryMedium,
  Activity,
  Flag,
  ArrowRight,
  Diamond,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Roadmap() {
  const [showPhilosophy, setShowPhilosophy] = useState(false);
  return (
    <section id="roadmap" className="relative py-16 md:py-40 px-6 md:px-10 bg-transparent overflow-hidden scroll-mt-[-25px]">
      {/* Background Decor */}
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-accent/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* TOP HUD SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-stretch">

          {/* Left: Execution Roadmap Title (Cols 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-12 relative p-8 border border-white/5 bg-white/[0.01]">
            <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-white/10" />
            <div className="absolute top-4 right-8 font-mono text-[6px] text-white/20 uppercase tracking-[0.4em]">XENOR_PROTOCOL_06</div>

            <ScrollReveal>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <SectionLabel number="06" text="Protocol_Trajectory" />
                </div>
                <h2 className="text-4xl sm:text-6xl md:text-8xl font-black font-grotesk tracking-tighter uppercase leading-[0.8] text-white">
                  EXECUTION <br />
                  <span className="text-accent italic drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">ROADMAP</span>
                </h2>
                <p className="max-w-xs font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] leading-relaxed">
                  The deterministic path to global substrate dominance. High-fidelity research. Simulation parameters established.
                </p>
              </div>
            </ScrollReveal>

            {/* Badges */}
            <ScrollReveal direction="up" delay={0.2} className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4">
              {[
                { label: 'EXECUTION MODEL', val: 'DETERMINISTIC', icon: Box },
                { label: 'VALIDATION METHOD', val: 'SIMULATION-FIRST', icon: Layers },
                { label: 'GLOBAL OBJECTIVE', val: 'SUBSTRATE DOMINANCE', icon: Globe },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group">
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[10px] text-accent/60 group-hover:border-accent group-hover:text-accent transition-all">
                    <item.icon size={14} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <span className="block font-mono text-[5px] text-white/20 uppercase tracking-widest">{item.label}</span>
                    <span className="block font-mono text-[8px] text-white font-bold uppercase tracking-widest group-hover:text-accent transition-colors">{item.val}</span>
                  </div>
                </div>
              ))}
            </ScrollReveal>
          </div>

          {/* Right: Trajectory Visual (Cols 6-12) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="left" className="h-full">
              <div className="relative h-full w-full border border-accent/20 bg-black/40 p-4 rounded-md group">
                {/* HUD Elements */}
                <div className="absolute top-6 left-6 flex items-center gap-3 z-20">
                  <div className="w-1.5 h-1.5 border border-accent" />
                  <span className="font-mono text-[7px] text-accent font-black uppercase tracking-[0.4em]">TRAJECTORY_VISUAL_06 //</span>
                </div>

                <div className="absolute top-6 right-8 font-mono text-[6px] text-white/30 text-right z-20 uppercase tracking-widest leading-relaxed">
                  <div className="flex justify-end items-center gap-4">VECTOR FLOW <span className="text-accent font-black">STABLE</span> <div className="w-1 h-1 bg-accent rounded-full animate-pulse" /></div>
                  <div className="flex justify-end items-center gap-4">PATH ALIGNMENT <span className="text-white/80 font-black">99.87%</span></div>
                  <div className="flex justify-end items-center gap-4">SIMULATION FIDELITY <span className="text-white/80 font-black">98.92%</span></div>
                </div>

                <div
                  className="relative h-full w-full bg-black/90 border border-white/5 flex items-center justify-center overflow-hidden min-h-[280px] md:min-h-[450px] transition-colors cursor-help group/visual"
                  onMouseEnter={() => setShowPhilosophy(true)}
                  onMouseLeave={() => setShowPhilosophy(false)}
                  onClick={() => setShowPhilosophy(!showPhilosophy)}
                >
                  {/* Fitted Trajectory Window */}
                  <div className="relative w-[70%] aspect-[4/3] flex items-center justify-center">
                    {/* Inner Trajectory Brackets */}
                    <div className="absolute -top-4 -left-4 w-10 h-10 border-t border-l border-accent/40 z-20" />
                    <div className="absolute -bottom-4 -right-4 w-10 h-10 border-b border-r border-accent/40 z-20" />

                    <img
                      src="/assets/images/gif/06-Protocol-Trajectory.gif"
                      alt="Protocol Trajectory"
                      className={`w-full h-full object-contain mix-blend-screen transition-all duration-1000 brightness-110 relative z-10 [mask-image:radial-gradient(circle_at_center,black_30%,transparent_90%)] ${showPhilosophy ? 'opacity-20 blur-md scale-95' : 'opacity-90 group-hover/visual:scale-110'}`}
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
                            [ TRAJECTORY_PHILOSOPHY ]
                          </h4>
                          <p className="font-mono text-[6px] md:text-[8px] text-white/80 leading-relaxed uppercase tracking-widest">
                            "Protocol Trajectory: A deterministic prediction. The future is written in logic, witnessing the inevitable unfolding of mathematical certainty."
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Local Simulation Grid */}
                    <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-0" />
                  </div>

                  {/* Visual Coordinate Tags */}
                  <motion.div 
                    animate={{ opacity: showPhilosophy ? 0 : 1 }}
                    className="absolute right-12 bottom-24 font-mono text-[6px] text-white/30 space-y-4 z-20 text-right"
                  >
                    <div className="space-y-1.5">
                      <div className="opacity-40 tracking-widest">COORDINATES</div>
                      <div className="text-accent font-black flex justify-end gap-3">X <span className="text-white/60">84.992</span></div>
                      <div className="text-accent font-black flex justify-end gap-3">Y <span className="text-white/60">12.001</span></div>
                      <div className="text-accent font-black flex justify-end gap-3">Z <span className="text-white/60">11.382</span></div>
                    </div>
                  </motion.div>

                  <div className="absolute right-12 bottom-8 text-right font-mono text-[6px] text-white/30 z-20">
                    <div className="opacity-40 tracking-widest">TIMESTAMP</div>
                    <div className="text-white/60 font-black">2025-05-18 <br /> 19:42:31 UTC</div>
                  </div>

                  {/* Left Vertical Scale */}
                  <div className="absolute left-10 top-1/2 -translate-y-1/2 h-1/2 w-[1px] bg-white/10" />
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 h-1/2 flex flex-col justify-between font-mono text-[5px] text-white/20">
                    <span>100% |</span>
                    <span>75% |</span>
                    <span>50% |</span>
                    <span>25% |</span>
                    <span>0% |</span>
                  </div>
                </div>

                <div className="absolute bottom-6 left-10 flex items-center gap-3 z-20">
                  <div className="font-mono text-[6px] text-white/20 uppercase tracking-[0.3em]">NODE_STATUS</div>
                  <div className="px-4 py-1.5 bg-black/90 border border-accent/40 font-mono text-[8px] text-accent font-black uppercase tracking-[0.3em] flex items-center gap-2 rounded-sm shadow-[0_0_15px_rgba(255,215,0,0.1)]">
                    LOCKED <Lock size={10} className="text-accent/60" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* MIDDLE SECTION — PHASE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              id: 'P.01',
              phase: 'PHASE_01',
              status: 'IN PROGRESS',
              title: 'XENOR-CORE: DETERMINISTIC EXECUTION ENGINE',
              items: ['XENOR-CODE: CORE SYSTEM AND VALIDATION LAYER', 'XENOR-ORACLE: SETTLEMENT LOGIC + FUTURE ORACLE'],
              completion: '2025 Q4',
              progress: 48,
              icon: Settings
            },
            {
              id: 'P.02',
              phase: 'PHASE_02',
              status: 'IN PROGRESS',
              title: 'XENOR-NETIC: CANONICAL PUBLIC GRAPHIC LINE',
              items: ['CANONICAL SUBSTRATE ARCHITECTURE', 'PUBLIC VERIFICATION LIFECYCLE ACTIVE'],
              completion: '2026 Q1',
              progress: 36,
              icon: Triangle
            },
            {
              id: 'P.03',
              phase: 'PHASE_03',
              status: 'PLANNED',
              title: 'TOKEN DEPLOYMENT + ON-CHAIN VERIFICATION',
              items: ['XENOR-NATIVE TOKENOMICS', 'ADVANCED SIMULATION ENGINES', 'ENHANCED CROSS-PLATFORM GRAPHICS'],
              completion: '2026 Q2',
              progress: 0,
              icon: Target
            }
          ].map((item, i) => (
            <ScrollReveal key={i} delay={0.1 * i} direction="up">
              <div className="bg-black/40 border border-white/10 p-8 rounded-md space-y-8 relative group hover:border-accent/40 transition-all">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="block font-mono text-[7px] text-accent font-black uppercase tracking-widest">{item.phase}</span>
                    <h3 className="text-4xl font-black font-grotesk text-white tracking-tighter uppercase">{item.id}</h3>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-sm">
                    <span className={`w-1 h-1 rounded-full ${item.status === 'PLANNED' ? 'bg-white/20' : 'bg-accent animate-pulse'}`} />
                    <span className="font-mono text-[6px] text-white/40 uppercase tracking-widest font-black">{item.status}</span>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-5">
                    <div className="w-14 h-14 flex-shrink-0 border border-white/10 bg-white/[0.02] flex items-center justify-center text-accent group-hover:border-accent/40 transition-all">
                      <item.icon size={24} strokeWidth={1.5} className="grayscale group-hover:grayscale-0 transition-all" />
                    </div>
                    <div className="space-y-5">
                      <h4 className="font-mono text-[10px] text-white font-black uppercase tracking-wider leading-tight line-clamp-2">{item.title}</h4>
                      <ul className="space-y-3">
                        {item.items.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2.5">
                            <Diamond size={6} className="text-accent mt-1.5 flex-shrink-0 fill-accent" strokeWidth={1} />
                            <span className="font-mono text-[8px] text-white/30 uppercase tracking-tight leading-relaxed group-hover:text-white/60 transition-colors">{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-white/5">
                  <div className="flex justify-between items-end font-mono text-[6px] uppercase tracking-widest">
                    <div className="space-y-1">
                      <span className="block text-white/20">ESTIMATED_COMPLETION</span>
                      <span className="block text-white/60 font-black">{item.completion}</span>
                    </div>
                    <span className="text-accent font-black">{item.progress}% COMPLETE</span>
                  </div>
                  <div className="w-full h-[1px] bg-white/5 relative overflow-hidden">
                    <div className="h-full bg-accent shadow-[0_0_10px_rgba(255,215,0,0.5)]" style={{ width: `${item.progress}%` }} />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* BOTTOM HUD BAR */}
        <ScrollReveal direction="up" delay={0.4}>
          <div className="bg-black/60 border border-white/10 grid grid-cols-2 lg:grid-cols-4 rounded-md overflow-hidden">
            {[
              { label: 'TRAJECTORY_STATUS', val: 'STABLE', icon: BatteryMedium },
              { label: 'SYSTEM_SYNC', val: 'LOCKED', icon: Lock },
              { label: 'GLOBAL_ALIGNMENT', val: '99.87%', icon: Activity, scale: true },
              { label: 'NEXT_MILESTONE', val: 'P.02 STABILIZATION', icon: Flag, arrow: true },
            ].map((stat, i) => (
              <div key={i} className="flex items-center gap-6 p-6 border-r border-white/5 last:border-0 group hover:bg-white/[0.02] transition-all">
                <div className="w-10 h-10 border border-white/5 bg-white/[0.01] flex items-center justify-center text-xs opacity-40 group-hover:opacity-100 group-hover:border-accent/40 transition-all">
                  <stat.icon size={16} strokeWidth={1.5} className="text-accent" />
                </div>
                <div className="flex-1 space-y-1.5">
                  <span className="block font-mono text-[6px] text-white/20 uppercase tracking-widest">{stat.label}</span>
                  <span className="block font-mono text-[9px] text-white font-black uppercase tracking-widest">{stat.val}</span>
                  {stat.scale && (
                    <div className="w-full h-[1px] bg-white/5 mt-2 relative">
                      <div className="absolute right-0 top-0 w-1/4 h-full bg-accent/40" />
                      <div className="absolute left-[99.87%] top-[-2px] w-1 h-1.5 bg-accent" />
                    </div>
                  )}
                </div>
                {stat.arrow && <ArrowRight size={12} className="text-accent group-hover:translate-x-1 transition-transform" />}
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
