'use client';

import { motion } from 'framer-motion';
import { XENOR } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="relative py-24 md:py-40 px-6 md:px-10 bg-[#050508] overflow-hidden">
      {/* Immersive Background Decorations */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_20%,rgba(0,229,255,0.03)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_80%,rgba(124,92,252,0.03)_0%,transparent_50%)] pointer-events-none" />

      <div className="relative z-20 max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
            <div className="w-12 h-[1px] bg-accent/20" />
            <SectionLabel number="04" text="Token Economy" />
            <div className="w-12 h-[1px] bg-accent/20" />
          </motion.div>

          <motion.h2 
            variants={fadeUp}
            className="text-5xl md:text-8xl font-grotesk font-black tracking-tighter mb-6 text-center uppercase italic text-white"
          >
            System <span className="text-accent not-italic drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">Liquidity</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="text-muted text-sm mb-20 text-center max-w-lg mx-auto uppercase tracking-[0.4em] font-mono"
          >
            Zero inflation. Zero reserves. Pure execution.
          </motion.p>

          {/* Main Dashboard Grid */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 mb-4">
            {/* Supply Card - Highlight */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-8 p-6 md:p-12 border border-white/5 bg-white/[0.01] rounded-sm relative overflow-hidden group backdrop-blur-3xl"
            >
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                  <div className="text-[10px] font-mono text-accent uppercase tracking-[0.5em] font-bold">Total Protocol Float</div>
                </div>
                <div className="text-[clamp(32px,8vw,90px)] font-black font-grotesk text-white mb-6 tracking-tighter leading-none italic">
                  {XENOR.tokenomics.supply}
                </div>
                <div className="flex flex-wrap items-center gap-8">
                  <div className="flex items-center gap-4 border border-white/10 px-4 py-2 rounded-sm bg-white/5">
                    <div className="flex -space-x-2">
                      {[1,2,3].map(i => <div key={i} className="w-5 h-5 rounded-full border border-bg-base bg-accent/40" />)}
                    </div>
                    <span className="text-[9px] font-mono text-text/60 uppercase tracking-widest font-bold">Verified_Holders</span>
                  </div>
                  <span className="text-[10px] font-mono text-muted uppercase tracking-[0.2em]">Verified by Rust Engine v1.0.4</span>
                </div>
              </div>
              
              {/* Decorative HUD Circle */}
              <div className="absolute top-1/2 right-[-50px] -translate-y-1/2 opacity-5 pointer-events-none">
                <div className="w-80 h-80 border-[20px] border-accent rounded-full border-dashed animate-spin-slow" />
              </div>
            </motion.div>

            {/* Public Distribution Card */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-4 p-8 md:p-12 border border-white/5 bg-white/[0.01] rounded-sm flex flex-col justify-center items-center text-center relative overflow-hidden backdrop-blur-3xl"
            >
              <div className="relative z-10">
                <div className="text-7xl md:text-8xl font-black font-grotesk text-white mb-2 italic">100%</div>
                <div className="text-[10px] font-mono text-accent uppercase tracking-[0.4em] font-bold">Public Launch</div>
                <div className="mt-8 w-40 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="h-full bg-accent shadow-[0_0_10px_#00e5ff]"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-accent/[0.02] animate-scanline" />
            </motion.div>
          </div>

          {/* Secondary Stats Grid */}
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            {[
              { label: "Team Allocation", value: XENOR.tokenomics.teamAlloc, color: "text-muted" },
              { label: "VC / Private Sale", value: XENOR.tokenomics.vcSale, color: "text-muted" },
              { label: "Fair Launch", value: XENOR.tokenomics.fairLaunch, color: "text-accent" }
            ].map((s, i) => (
              <motion.div 
                key={i}
                variants={fadeUp}
                className="p-8 border border-white/5 bg-white/[0.01] rounded-sm text-center group hover:border-accent/30 transition-all backdrop-blur-3xl"
              >
                <div className="text-[9px] font-mono text-muted mb-3 uppercase tracking-[0.3em] font-bold group-hover:text-accent/60 transition-colors">{s.label}</div>
                <div className={`text-3xl font-black font-grotesk ${s.color} italic tracking-tight`}>{s.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Logic Breakdown */}
          <motion.div 
            variants={fadeUp}
            className="w-full grid md:grid-cols-3 gap-10 p-8 md:p-12 border border-white/5 bg-white/[0.01] rounded-sm backdrop-blur-3xl"
          >
            {[
              { title: "Fair Launch", desc: "No pre-mine. No insider whitelists. Complete parity.", icon: "◈" },
              { title: "Zero Tax", desc: "0% Buy/Sell fees. Maximum capital velocity.", icon: "◈" },
              { title: "Deflationary", desc: "Native burn mechanisms in core execution.", icon: "◈" }
            ].map((item, i) => (
              <div key={i} className="space-y-4 relative">
                <div className="text-accent font-mono text-sm">{item.icon}</div>
                <h4 className="font-black font-grotesk uppercase tracking-tight text-lg text-white">{item.title}</h4>
                <p className="text-[11px] text-muted leading-relaxed font-mono uppercase tracking-tight">{item.desc}</p>
                {i < 2 && <div className="hidden md:block absolute top-0 right-[-20px] bottom-0 w-[1px] bg-white/5" />}
              </div>
            ))}
          </motion.div>
          {/* Disclaimer / System Info */}
          <motion.div 
            variants={fadeUp}
            className="w-full mt-12 p-6 md:p-10 border border-white/5 bg-white/[0.01] rounded-sm text-center backdrop-blur-3xl"
          >
            <p className="text-muted text-[10px] md:text-xs leading-relaxed mb-6 uppercase tracking-[0.2em] max-w-2xl mx-auto font-mono opacity-60">
              The {XENOR.ticker} token is a public utility surface for protocol interaction. 
              This is not a financial instrument. Performance is tied to system execution metrics.
            </p>
            <a 
              href={XENOR.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-mono text-[10px] uppercase tracking-[0.4em] text-accent border border-accent/20 px-8 py-3 rounded-sm hover:bg-accent hover:text-black hover:glow-hover transition-all font-black"
            >
              SYSTEM_DOCUMENTATION_&_AUDIT ↗
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

