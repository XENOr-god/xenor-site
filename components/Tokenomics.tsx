import { XENOR } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="relative py-24 md:py-40 px-6 md:px-10 bg-transparent overflow-hidden scroll-mt-24">
      {/* Background Decor - Simplified for mobile */}
      <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-5 -z-10" />
      <div className="absolute bottom-0 right-0 w-full h-1/2 bg-accent/[0.02] blur-[120px] -z-10 hidden md:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section - Economic Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-24">
          {/* Title Block (Cols 1-7) */}
          <div className="lg:col-span-7 border border-white/10 bg-black/40 p-10 relative overflow-hidden group flex flex-col justify-center min-h-[360px]">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/40 group-hover:border-accent transition-all" />
            <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

            <div className="relative z-10">
              <ScrollReveal>
                <div className="mb-8 flex items-center gap-4">
                  <SectionLabel number="04" text="Economic Substrate" />
                  <div className="h-[1px] flex-grow bg-white/5" />
                  <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">[ ECON_SYNC: NOMINAL ]</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic leading-none text-white mb-8">
                  LIQUIDITY <br />
                  <span className="text-accent not-italic drop-shadow-[0_0_30px_rgba(0,229,255,0.2)]">ARCHITECTURE</span>
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <ScrollReveal delay={0.2} className="space-y-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-1 h-12 bg-accent/40 group-hover:bg-accent transition-colors" />
                    <p className="text-white/60 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] leading-relaxed max-w-sm">
                      Absolute transparency. Zero inflation. Zero hidden reserves. Maximum capital velocity for compute.
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={0.3} className="p-4 border border-white/5 bg-white/[0.02] space-y-4">
                  <div className="flex justify-between items-center font-mono text-[7px] text-white/30 uppercase">
                    <span>Sync_Rate</span>
                    <span className="text-accent">99.9%</span>
                  </div>
                  <div className="w-full h-[1px] bg-white/5 relative">
                    <div className="h-full bg-accent absolute top-0 left-0 w-[99%]" />
                  </div>
                  <div className="flex justify-between items-center font-mono text-[7px] text-white/30 uppercase">
                    <span>Block_Height</span>
                    <span className="text-white/60 tracking-wider">#092,841</span>
                  </div>
                </ScrollReveal>
              </div>
            </div>

            <div className="absolute bottom-4 left-10 font-mono text-[7px] text-white/10 uppercase tracking-[0.5em] flex gap-12">
              <span>CANONICAL: {XENOR.tokenomics.supply}</span>
              <span>FEE: 0.00%</span>
            </div>
          </div>

          {/* GIF Inspection Portal (Cols 8-12) */}
          <div className="lg:col-span-5 relative group">
            <ScrollReveal direction="left" className="h-full">
              <div className="relative aspect-square w-full border border-accent/20 bg-black/60 overflow-hidden h-full">
                <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute inset-0 grid-bg opacity-10" />

                {/* HUD Highlights */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-accent" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-accent" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-accent" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-accent" />

                <img
                  src="/assets/images/gif/04-Token-Economy.gif"
                  alt="Token Economy"
                  loading="lazy"
                  className="w-full h-full object-cover mix-blend-screen opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 brightness-125"
                />

                <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-accent font-black uppercase tracking-[0.5em] bg-black/80 px-3 py-1 border border-accent/20">
                  ECON_VISUAL_04
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Economic Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {[
            { label: 'Public Liquidity', value: XENOR.tokenomics.fairLaunch, desc: '100% fair launch. Distributed through market discovery.' },
            { label: 'Supply Limit', value: XENOR.tokenomics.supply, desc: 'Fixed canonical float. No mint function. Immutable substrate.' },
            { label: 'Protocol Fee', value: '0.00%', desc: 'Native fee-less execution for maximum compute interaction.' }
          ].map((stat, i) => (
            <ScrollReveal key={i} delay={0.1 * i}>
              <div className="bg-black/40 border border-white/5 p-8 relative overflow-hidden group hover:border-accent/30 transition-all duration-500">
                <div className="absolute top-0 left-0 w-1 h-full bg-accent/10 group-hover:bg-accent/40 transition-colors" />
                <div className="space-y-6 relative z-10">
                  <div className="flex justify-between items-start">
                    <span className="font-mono text-[8px] text-accent font-bold uppercase tracking-[0.4em]">PARA_0{i + 1}</span>
                    <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">[ READ_OK ]</span>
                  </div>
                  <div className="space-y-1">
                    <span className="block font-mono text-[8px] text-white/40 uppercase tracking-widest">{stat.label}</span>
                    <div className="text-3xl font-black text-white italic tracking-tighter group-hover:text-accent transition-colors">
                      {stat.value}
                    </div>
                  </div>
                  <p className="font-mono text-[9px] text-white/30 uppercase tracking-[0.2em] leading-relaxed italic">
                    {stat.desc}
                  </p>
                </div>
                {/* Scanline overlay - Handled by CSS in globals.css */}
                <div className="absolute inset-0 bg-accent/[0.02] opacity-0 group-hover:opacity-100 scanline pointer-events-none" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Allocation Matrix & Validation Block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Allocation Matrix (Cols 1-5) */}
          <div className="lg:col-span-5 bg-black/40 border border-white/5 p-8 relative overflow-hidden group">
            <ScrollReveal>
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

          {/* Public Audit Gateway (Cols 6-12) */}
          <div className="lg:col-span-7 bg-black/40 border border-white/5 p-8 relative overflow-hidden group flex flex-col justify-between">
            <ScrollReveal direction="left">
              <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-white/10 group-hover:border-accent/40 transition-all" />
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[9px] text-accent font-black uppercase tracking-[0.4em]">Audit_Log_Verification</span>
                  <span className="font-mono text-[7px] text-white/40 uppercase animate-pulse">● LIVE_SYNC</span>
                </div>
                <p className="font-mono text-[10px] text-white/40 uppercase tracking-[0.2em] leading-relaxed italic max-w-xl">
                  ◈ All economic parameters are hardcoded into the XENOr substrate. Public verification is established through canonical GitHub audit logs. ◈
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
                  className="px-8 py-3 bg-white text-black font-mono text-[9px] font-black uppercase tracking-[0.5em] hover:bg-accent transition-all hover:scale-105 active:scale-95"
                >
                  VERIFY_ON_GITHUB_↗
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
