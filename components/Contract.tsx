'use client';

import { motion } from 'framer-motion';
import { XENOR } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';
import CopyButton from './ui/CopyButton';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Contract() {
  return (
    <section id="contract" className="relative py-24 md:py-40 px-6 md:px-10 bg-[#020203] overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="flex flex-col items-center"
        >
          <motion.div variants={fadeUp} className="mb-12 flex items-center gap-4">
            <div className="w-8 h-[1px] bg-accent/30" />
            <SectionLabel number="05" text="Contract Verification" />
            <div className="w-8 h-[1px] bg-accent/30" />
          </motion.div>

          <motion.div 
            variants={fadeUp}
            className="w-full"
          >
            <div className="flex flex-col items-center text-center space-y-20">
              <div className="space-y-6">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <div className="w-2 h-2 rotate-45 border border-accent/60 bg-accent/20" />
                  <span className="font-mono text-[11px] text-accent uppercase tracking-[0.6em] font-bold">Secure_Protocol_Entry</span>
                  <div className="w-2 h-2 rotate-45 border border-accent/60 bg-accent/20" />
                </div>
                <h2 className="text-5xl md:text-8xl font-black font-grotesk tracking-tighter uppercase leading-[0.8] text-white italic">
                  Official <span className="text-accent not-italic drop-shadow-[0_0_30px_rgba(0,229,255,0.3)]">Deployer.</span>
                </h2>
              </div>

              <div className="w-full grid grid-cols-1 gap-8">
                {/* Developer Address */}
                <div className="w-full py-16 border border-white/5 bg-white/[0.01] rounded-sm group relative overflow-hidden backdrop-blur-3xl">
                  <div className="absolute top-0 left-0 w-1 h-full bg-accent/40 group-hover:bg-accent transition-colors" />
                  <div className="relative z-10 space-y-8 px-8">
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-1 h-1 bg-accent rounded-full animate-ping" />
                      <span className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] font-bold">System_Root_Address</span>
                    </div>
                    <div className="font-mono text-sm sm:text-xl md:text-2xl lg:text-3xl font-black text-white break-words tracking-tight leading-tight italic group-hover:text-accent transition-all duration-500 max-w-4xl mx-auto px-4">
                      {XENOR.contract.devWallet}
                    </div>
                    <div className="flex justify-center">
                      <CopyButton text={XENOR.contract.devWallet} />
                    </div>
                  </div>
                  {/* Decorative HUD Scanline */}
                  <div className="absolute inset-0 bg-accent/[0.02] animate-scanline pointer-events-none" />
                </div>

                {/* Token Address (Pending) */}
                <div className="w-full py-16 border border-white/5 bg-white/[0.01] rounded-sm group relative overflow-hidden opacity-40 hover:opacity-100 transition-opacity backdrop-blur-3xl">
                  <div className="relative z-10 space-y-6 px-8">
                    <span className="font-mono text-[10px] text-muted uppercase tracking-[0.5em] font-bold">Protocol_Liquid_Entry</span>
                    <div className="font-mono text-3xl md:text-6xl font-black uppercase italic tracking-tighter text-muted-foreground group-hover:text-white transition-colors">
                      Pending_Deployment
                    </div>
                    <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-white/10 rounded-full bg-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground animate-pulse" />
                      <span className="font-mono text-[9px] text-muted uppercase tracking-[0.3em] font-bold">Awaiting_Mainnet_Sync</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Integrated Security Note */}
              <div className="max-w-2xl mx-auto opacity-30 hover:opacity-80 transition-opacity">
                <p className="font-mono text-[11px] md:text-sm leading-relaxed uppercase tracking-widest text-muted-foreground">
                  ◈ Always verify the signature against this official source. ◈<br />
                  Token deployment is scheduled for maximum resilience. 
                  Do not interact with unauthorized shadow clones.
                </p>
                <div className="mt-8 flex items-center justify-center gap-6">
                  <div className="h-[1px] w-20 bg-white/5" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.4em] text-accent/60 font-bold">Verifiable_Truth_Substrate</span>
                  <div className="h-[1px] w-20 bg-white/5" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
