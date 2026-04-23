'use client';

import { motion } from 'framer-motion';
import { XENOR } from '@/lib/constants';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 px-6 md:px-10">
      {/* Immersive Background Layers */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-100"
      >
        <source src="/assets/videos/bg6.mp4" type="video/mp4" />
      </video>

      {/* Dynamic Overlays */}
      <div className="absolute inset-0 grid-bg opacity-30 z-10" />
      <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      {/* Animated Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-[0.03] overflow-hidden">
        <div className="w-full h-[100%] bg-gradient-to-b from-transparent via-accent to-transparent animate-scanline" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/20 to-bg-base z-20" />

      <div className="relative z-30 max-w-6xl mx-auto w-full">
        {/* Floating HUD Elements - Top Left */}
        <div className="absolute -top-12 -left-4 hidden lg:block opacity-40 pointer-events-none">
          <div className="border-l border-t border-accent/30 p-4 space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 bg-accent rounded-full animate-ping" />
              <span className="font-mono text-[8px] text-accent tracking-[0.2em] uppercase">Core_Link_Established</span>
            </div>
            <div className="w-32 h-[1px] bg-gradient-to-r from-accent/40 to-transparent" />
            <div className="font-mono text-[7px] text-muted uppercase space-y-1">
              <p>Buffer_Size: 1024kb</p>
              <p>Latency: 14ms</p>
            </div>
          </div>
        </div>

        {/* Floating HUD Elements - Bottom Right */}
        <div className="absolute -bottom-12 -right-4 hidden lg:block opacity-40 pointer-events-none text-right">
          <div className="border-r border-b border-accent/30 p-4 space-y-2 flex flex-col items-end">
            <span className="font-mono text-[8px] text-accent tracking-[0.2em] uppercase">Sector_09_Monitoring</span>
            <div className="w-32 h-[1px] bg-gradient-to-l from-accent/40 to-transparent" />
            <div className="font-mono text-[7px] text-muted uppercase space-y-1">
              <p>XNR_Value: Verifying</p>
              <p>Node_Count: 1,402</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center text-center">
          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 md:mb-8 relative"
          >
            <div className="px-4 py-1.5 border border-accent/20 bg-accent/5 backdrop-blur-xl rounded-sm text-[8px] sm:text-[9px] font-mono tracking-[0.3em] sm:tracking-[0.5em] text-accent flex items-center gap-2 sm:gap-3 shadow-[0_0_20px_rgba(0,229,255,0.05)]">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-accent"></span>
              </span>
              AUTHENTICATED_ACCESS_GRANTED
            </div>
          </motion.div>

          {/* Logo with Advanced Glow & Distortion */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 md:mb-10 relative group px-6 sm:px-10"
          >
            {/* Multi-layered Glow */}
            <div className="absolute inset-0 bg-accent/10 blur-[80px] rounded-full opacity-30 group-hover:opacity-50 transition-opacity animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

            <img
              src="/assets/images/xenoricon.png"
              alt="XENOR Protocol"
              className="relative z-10 w-full max-w-[180px] sm:max-w-[320px] md:max-w-[650px] h-auto mx-auto select-none pointer-events-none filter drop-shadow-[0_0_20px_rgba(0,229,255,0.2)] group-hover:scale-105 transition-transform duration-700"
            />
          </motion.div>

          {/* Typography & Subheader */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center mb-6 md:mb-14"
          >
            <h2 className="text-xl sm:text-3xl md:text-6xl font-grotesk font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white/90 to-white/30 mb-2 sm:mb-4 px-4 leading-tight">
              Deterministic Infrastructure<span className="text-accent not-italic"></span>
            </h2>
            <div className="flex items-center gap-6 opacity-40">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-accent" />
              <p className="font-mono text-[9px] md:text-[11px] text-text uppercase tracking-[0.6em]">System_Integrity_Verified</p>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-accent" />
            </div>
          </motion.div>

          {/* Action Modules */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 w-full max-w-2xl px-6"
          >
            <a
              href={XENOR.links.jupiter}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full md:w-64 py-4 md:py-5 bg-accent text-bg-base font-black font-grotesk uppercase tracking-[0.3em] text-xs transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative z-10">Initialize_Protocol</span>
              <div className="absolute top-0 right-0 p-1">
                <div className="w-1 h-1 bg-bg-base/30" />
              </div>
            </a>

            <a
              href={XENOR.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative w-full md:w-64 py-4 md:py-5 border border-white/10 hover:border-accent/40 text-text font-black font-grotesk uppercase tracking-[0.3em] text-xs transition-all bg-white/[0.02] backdrop-blur-xl"
            >
              <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative z-10 transition-colors group-hover:text-accent">Access_Docs_</span>
              <div className="absolute bottom-0 left-0 p-1">
                <div className="w-1 h-1 bg-white/20" />
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
