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
    <section id="security" className="relative py-24 md:py-40 px-6 md:px-10 overflow-hidden">
      {/* Immersive Background Layers */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 grayscale"
      >
        <source src="/assets/videos/bg3.mp4" type="video/mp4" />
      </video>

      {/* Dynamic Overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,50,50,0.05)_0%,rgba(2,2,3,0.9)_100%)] z-10" />
      <div className="absolute inset-0 grid-bg opacity-10 z-10" />
      
      <div className="max-w-7xl mx-auto relative z-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
        >
          <div className="flex flex-col items-center text-center mb-32">
            <motion.div variants={fadeUp} className="mb-8 flex items-center gap-4">
              <div className="w-12 h-[1px] bg-warn/30" />
              <SectionLabel number="07" text="Safety Protocols" />
              <div className="w-12 h-[1px] bg-warn/30" />
            </motion.div>
            <motion.h2 
              variants={fadeUp}
              className="text-4xl md:text-8xl font-black font-grotesk tracking-tighter uppercase italic leading-[0.8] text-warn"
            >
              Defense <br />
              <span className="text-white not-italic drop-shadow-[0_0_30px_rgba(255,50,50,0.3)]">Perimeter.</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-24">
            {/* Status Panel */}
            <motion.div 
              variants={fadeUp}
              className="lg:col-span-4 bg-warn/[0.02] border border-warn/20 p-8 md:p-12 rounded-sm relative overflow-hidden backdrop-blur-3xl group"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-warn/40 animate-pulse" />
              <div className="font-mono text-[11px] text-warn uppercase tracking-[0.5em] mb-16 font-bold">
                VERIFICATION_SYSTEM
              </div>
              
              <div className="space-y-12">
                <div className="group/item">
                  <div className="font-mono text-[9px] text-warn/60 uppercase mb-3 tracking-widest font-bold">Network_Status</div>
                  <div className="text-3xl font-black font-grotesk text-warn tracking-tight uppercase italic group-hover:drop-shadow-[0_0_15px_rgba(255,50,50,0.4)] transition-all">Pending_Deployment</div>
                </div>
                <div className="group/item">
                  <div className="font-mono text-[9px] text-warn/60 uppercase mb-3 tracking-widest font-bold">Audit_Layer</div>
                  <div className="text-2xl font-black font-grotesk text-white tracking-tight uppercase italic group-hover:text-warn transition-colors">Manual_Review_Active</div>
                </div>
                <div className="pt-12 border-t border-warn/10">
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-full border border-warn/30 flex items-center justify-center group-hover:bg-warn/10 transition-all">
                      <span className="text-warn text-2xl font-black italic">!</span>
                    </div>
                    <div className="font-mono text-[10px] text-muted-foreground uppercase leading-tight tracking-tight font-bold">
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
                  className="p-6 md:p-10 bg-white/[0.01] border border-white/5 rounded-sm group hover:border-warn/40 hover:bg-warn/[0.01] transition-all duration-700 relative overflow-hidden backdrop-blur-3xl"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-2 h-2 rotate-45 border border-warn bg-warn/20" />
                    <h3 className="font-black font-grotesk text-lg text-white group-hover:text-warn tracking-tight uppercase italic transition-colors">
                      {p.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-xs md:text-sm leading-relaxed group-hover:text-text transition-colors font-mono uppercase tracking-tight opacity-70 group-hover:opacity-100">
                    {p.desc}
                  </p>
                  {/* Decorative corner */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-r border-b border-white/5 group-hover:border-warn/40 transition-colors" />
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            variants={fadeUp}
            className="relative bg-white/[0.01] border border-white/5 p-8 md:p-16 rounded-sm text-center group overflow-hidden backdrop-blur-3xl"
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
