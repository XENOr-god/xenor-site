'use client';

import { motion } from 'framer-motion';
import SectionLabel from './ui/SectionLabel';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Security() {
  const protections = [
    { title: 'ANTI-MEV PROTECTION', desc: 'Deterministic block sequencing to mitigate sandwich attacks.' },
    { title: 'DETERMINISTIC SUPPLY', desc: 'Hard-coded cap. No hidden mint functions or inflationary backdoors.' },
    { title: 'LIQUIDITY LOCK', desc: '100% of initial liquidity will be permanently burned at deployment.' },
    { title: 'NO MINT FUNCTION', desc: 'Owner cannot generate new tokens post-launch. Immutable supply.' },
  ];

  return (
    <section id="security" className="relative py-24 md:py-48 px-6 md:px-10 overflow-hidden bg-transparent scroll-mt-24">
      {/* Dynamic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,50,50,0.05)_0%,rgba(2,2,3,0.3)_100%)] z-10" />

      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-32 w-full">
            <div className="lg:col-span-5 relative group order-2 lg:order-1">
              <div className="relative aspect-square w-full bg-black/60 border border-warn/20 p-2 overflow-hidden backdrop-blur-xl group-hover:border-warn/40 transition-all duration-500">
                <div className="absolute inset-0 bg-warn/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 grid-bg opacity-10" />

                {/* Active Scanline */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-warn/10 to-transparent h-1/2 w-full animate-scanline pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <img
                  src="/assets/images/gif/07-Safety-Protocols.gif"
                  alt="Safety Protocols"
                  className="w-full h-full object-cover grayscale mix-blend-screen opacity-90 group-hover:scale-110 group-hover:brightness-125 transition-all duration-700 relative z-20"
                />

                {/* Enhanced Brackets */}
                <div className="absolute -top-1 -left-1 w-12 h-12 border-t-[2px] border-l-[2px] border-warn z-30 drop-shadow-[0_0_8px_rgba(255,50,50,0.4)]" />
                <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b-[2px] border-r-[2px] border-warn z-30 drop-shadow-[0_0_8px_rgba(255,50,50,0.4)]" />

                <div className="absolute top-6 right-6 font-mono text-[8px] text-warn font-bold uppercase tracking-[0.2em] z-30 opacity-40 group-hover:opacity-100 transition-opacity">
                  [ DEFENSE_UNIT_07 ]
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex flex-col items-start text-left order-1 lg:order-2">
              <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
                <div className="w-12 h-[1px] bg-warn/30" />
                <SectionLabel number="07" text="Safety Protocols" color="text-warn" />
              </motion.div>
              <motion.h2
                variants={fadeUp}
                className="text-4xl md:text-6xl font-black font-grotesk tracking-tighter uppercase italic leading-[1] text-warn mb-8"
              >
                Defense <br />
                <span className="text-white not-italic drop-shadow-[0_0_30px_rgba(255,50,50,0.2)]">Perimeter</span>
              </motion.h2>
              <motion.p variants={fadeUp} className="text-muted-foreground text-sm font-mono uppercase tracking-[0.2em] border-l border-warn/30 pl-6">
                Redundant failure-safes for critical asset integrity.
              </motion.p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
            {/* Status Panel */}
            <motion.div
              variants={fadeUp}
              className="lg:col-span-4 bg-warn/[0.02] border border-warn/20 p-6 md:p-12 rounded-sm relative overflow-hidden backdrop-blur-3xl group"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-warn/40 animate-pulse" />
              <div className="font-mono text-[10px] md:text-[11px] text-warn uppercase tracking-[0.5em] mb-10 md:mb-16 font-bold">
                VERIFICATION_SYSTEM
              </div>

              <div className="space-y-8 md:space-y-12">
                <div className="group/item">
                  <div className="font-mono text-[8px] md:text-[9px] text-warn/60 uppercase mb-2 md:mb-3 tracking-widest font-bold">Network_Status</div>
                  <div className="text-xl md:text-3xl font-black font-grotesk text-warn tracking-tight uppercase italic group-hover:drop-shadow-[0_0_15px_rgba(255,50,50,0.4)] transition-all">Pending_Deployment</div>
                </div>
                <div className="group/item">
                  <div className="font-mono text-[8px] md:text-[9px] text-warn/60 uppercase mb-2 md:mb-3 tracking-widest font-bold">Audit_Layer</div>
                  <div className="text-lg md:text-2xl font-black font-grotesk text-white tracking-tight uppercase italic group-hover:text-warn transition-colors">Manual_Review_Active</div>
                </div>
                <div className="pt-8 md:pt-12 border-t border-warn/10">
                  <div className="flex items-center gap-4 md:gap-6">
                    <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-warn/30 flex items-center justify-center group-hover:bg-warn/10 transition-all">
                      <span className="text-warn text-xl md:text-2xl font-black italic">!</span>
                    </div>
                    <div className="font-mono text-[9px] md:text-[10px] text-muted-foreground uppercase leading-tight tracking-tight font-bold">
                      System operating under <br />
                      <span className="text-warn">maximum security</span> constraints.
                    </div>
                  </div>
                </div>
              </div>
              {/* Aesthetic HUD Scanline */}
              <div className="absolute inset-0 bg-warn/[0.01] animate-scanline pointer-events-none" />
            </motion.div>

            {/* Protections Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {protections.map((p, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="glass p-6 md:p-10 border border-warn/10 group hover:border-warn/40 transition-all duration-700 relative overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-warn/20 group-hover:border-warn transition-all" />

                  <div className="flex items-center gap-4 mb-6 md:mb-8 relative z-10">
                    <div className="w-2 h-2 rotate-45 border border-warn bg-warn shadow-[0_0_8px_#ff3232]" />
                    <h3 className="text-lg md:text-xl font-black font-grotesk text-white group-hover:text-warn tracking-tighter uppercase italic transition-all leading-none">
                      {p.title}
                    </h3>
                  </div>

                  <p className="text-muted-foreground text-[10px] md:text-[11px] leading-relaxed font-mono uppercase tracking-tight opacity-60 group-hover:opacity-100 transition-opacity">
                    {p.desc}
                  </p>

                  <div className="mt-auto pt-6 border-t border-warn/5 flex items-center justify-between">
                    <span className="font-mono text-[8px] text-warn/30 uppercase tracking-widest font-bold">Prot_Layer_0{i + 1}</span>
                    <div className="flex gap-0.5">
                      {[1, 2, 3].map(bit => <div key={bit} className="w-1 h-1 bg-warn/20 group-hover:bg-warn" />)}
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-warn/[0.01] opacity-0 group-hover:opacity-100 animate-scanline pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            variants={fadeUp}
            className="relative bg-white/[0.01] border border-white/5 p-6 md:p-16 rounded-sm text-center group overflow-hidden backdrop-blur-3xl"
          >
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-warn/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />

            <p className="relative z-10 text-muted-foreground text-sm md:text-base leading-relaxed max-w-4xl mx-auto italic font-mono uppercase tracking-tight opacity-60 group-hover:opacity-100 transition-opacity">
              "Security is not a feature; it is the fundamental constraint under
              which the XENØr protocol operates. Every line of code is reviewed
              for deterministic execution before being committed to the mainnet."
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
