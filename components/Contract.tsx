'use client';

import { motion } from 'framer-motion';
import { XENOR } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';
import CopyButton from './ui/CopyButton';

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Contract() {
  return (
    <section id="contract" className="relative py-32 md:py-48 px-6 overflow-hidden scroll-mt-24">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-accent/5 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="space-y-16"
        >
          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
            <div className="space-y-6">
              <SectionLabel number="05" text="Contract_Verify_System" />
              <h2 className="text-4xl md:text-6xl font-black font-grotesk tracking-tighter uppercase leading-[0.9] text-white">
                Official <br />
                <span className="text-accent italic">Truth_Substrate</span>
              </h2>
            </div>
            <div className="max-w-md text-right hidden md:block">
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-widest leading-relaxed">
                Deterministic validation layer for cross-chain execution. All transactions are verifiable via the canonical XENOr root deployer.
              </p>
            </div>
          </div>

          {/* Main Terminal Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

            {/* Left: Verification Metrics (Cols 1-4) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="p-8 glass border border-white/5 space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent/20 group-hover:bg-accent transition-colors" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent animate-pulse" />
                    <span className="font-mono text-[9px] text-accent font-black uppercase tracking-[0.4em]">Scan_Telemetry</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="block font-mono text-[8px] text-white/20 uppercase tracking-widest">Integrity</span>
                      <span className="block font-mono text-[10px] text-white/60 font-bold uppercase tracking-widest">100.00%</span>
                    </div>
                    <div className="space-y-1">
                      <span className="block font-mono text-[8px] text-white/20 uppercase tracking-widest">Origin</span>
                      <span className="block font-mono text-[10px] text-white/60 font-bold uppercase tracking-widest">Verified</span>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-white/5" />

                <div className="space-y-4">
                  <span className="block font-mono text-[9px] text-white/30 uppercase tracking-widest">Root_Deployer_Address</span>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-white/[0.02] border border-white/5 rounded-sm">
                    <div className="font-mono text-[9px] sm:text-[10px] text-white font-bold break-all tracking-tight leading-tight uppercase sm:pr-4 sm:border-r border-white/5">
                      {XENOR.contract.devWallet}
                    </div>
                    <div className="flex justify-end">
                      <CopyButton text={XENOR.contract.devWallet} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Ribbon */}
              <div className="p-6 border border-white/5 bg-accent/5 rounded-sm flex items-center justify-between">
                <span className="font-mono text-[9px] text-accent/60 uppercase tracking-[0.4em] font-black">Mainnet_Status</span>
                <span className="px-3 py-1 bg-accent/10 border border-accent/20 text-accent font-mono text-[8px] font-black uppercase tracking-widest rounded-full">ACTIVE</span>
              </div>
            </div>

            {/* Center: Inspection Window (Cols 5-12) */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Inspection Visual */}
              <div className="relative aspect-square md:aspect-auto bg-black/40 border border-white/5 p-4 overflow-hidden group">
                {/* HUD Elements */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-accent/40" />
                <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-accent/40" />
                <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-accent/40" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-accent/40" />

                <img
                  src="/assets/images/gif/05-Contract-Verification.gif"
                  alt="Contract Verification"
                  className="w-full h-full object-cover mix-blend-screen opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                />

                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="font-mono text-[8px] text-white/10 uppercase tracking-[1em] rotate-90">VISUAL_INSPECTION</div>
                </div>
              </div>

              {/* Deployment Queue */}
              <div className="p-8 border border-white/5 bg-white/[0.01] flex flex-col justify-between group overflow-hidden relative">
                <div className="absolute -right-12 -top-12 w-32 h-32 bg-white/5 blur-3xl rounded-full" />

                <div className="space-y-6 relative z-10">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-accent animate-pulse" />
                    <span className="font-mono text-[9px] text-white/30 uppercase tracking-[0.4em] font-bold">Deployment_Queue</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-end">
                      <span className="font-mono text-[10px] text-white/60 font-black uppercase">Token_Protocol</span>
                      <span className="font-mono text-[8px] text-white/20 uppercase">Awaiting_TGE</span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: '65%' }}
                        transition={{ duration: 2, ease: "circOut" }}
                        className="h-full bg-white/10 group-hover:bg-accent transition-colors"
                      />
                    </div>
                  </div>

                  <p className="font-mono text-[9px] text-white/20 uppercase tracking-[0.2em] leading-relaxed">
                    XENOr liquid tokens are pending mainnet synchronization. Do not interact with unverified CA addresses found on external platforms.
                  </p>
                </div>

                <div className="pt-8 relative z-10">
                  <button className="w-full py-4 border border-white/5 font-mono text-[9px] text-white/20 uppercase tracking-[0.5em] hover:border-white/20 hover:text-white transition-all cursor-not-allowed">
                    Awaiting_Final_Sync
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Footer Security Note */}
          <div className="flex flex-col items-center gap-6 opacity-20">
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="font-mono text-[8px] uppercase tracking-[1em] text-white font-bold">VERIFIABLE_TRUTH_IS_OUR_SUBSTRATE</span>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
