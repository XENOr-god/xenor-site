import { HOW_TO_BUY } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="relative py-32 md:py-56 px-6 overflow-hidden border-t border-white/5 scroll-mt-24">
      {/* Background Infrastructure */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-accent/5 blur-[150px] rounded-full pointer-events-none hidden md:block" />

      {/* Pipeline Connecting Line */}
      <div className="absolute top-[75%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent hidden lg:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section: Industrial Layout with Featured Visual */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 border-b border-white/5 pb-16">
          {/* Pipeline Visual on Left */}
          <div className="lg:col-span-5 relative group order-2 lg:order-1">
            <ScrollReveal direction="right">
              <div className="relative aspect-square w-full bg-black/60 border border-white/10 p-2 overflow-hidden group-hover:border-accent/40 transition-all duration-500">
                <div className="absolute inset-0 bg-accent/5 blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute inset-0 grid-bg opacity-10" />

                {/* Active Scanline - Handled by CSS in globals.css */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/10 to-transparent h-1/2 w-full scanline pointer-events-none z-10" />

                <img
                  src="/assets/images/gif/03-Acquisition-Pipeline.gif"
                  alt="Acquisition Pipeline"
                  loading="lazy"
                  className="w-full h-full object-cover mix-blend-screen opacity-90 group-hover:scale-105 transition-all duration-700 relative z-20 grayscale hover:grayscale-0"
                />

                <div className="absolute top-4 left-4 font-mono text-[7px] text-accent font-bold uppercase tracking-[0.2em] z-30 opacity-40 group-hover:opacity-100 transition-opacity">
                  [ PIPELINE_VISUAL_FEED ]
                </div>

                {/* Visual Frame Brackets */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-accent/40" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-accent/40" />
              </div>
            </ScrollReveal>
          </div>

          {/* Section Text on Right */}
          <div className="lg:col-span-7 space-y-8 order-1 lg:order-2">
            <ScrollReveal>
              <div className="flex items-center gap-4">
                <SectionLabel number="03" text="Acquisition_Pipeline" />
                <div className="h-[1px] w-24 bg-accent/30" />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-5xl md:text-7xl font-black font-grotesk tracking-tighter uppercase leading-[0.85] text-white">
                How to Acquire <br />
                <span className="text-accent italic drop-shadow-[0_0_40px_rgba(124,255,0,0.3)]">$XNR</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-mono text-[10px] text-white/30 uppercase tracking-[0.3em] leading-relaxed max-w-md">
                Deterministic acquisition sequence for protocol synchronization. Ensure all steps are executed within the canonical environment to prevent asset fragmentation.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-accent/5 border border-accent/20 rounded-sm">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[8px] text-accent font-black uppercase tracking-widest">Pipeline_Status: Ready</span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Acquisition Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0">
          {HOW_TO_BUY.map((step, idx) => (
            <ScrollReveal key={step.step} delay={0.1 * idx}>
              <div className={`p-8 lg:p-10 h-full border border-white/5 lg:border-r lg:border-l-0 first:lg:border-l bg-white/[0.01] hover:bg-white/[0.03] transition-all duration-500 flex flex-col relative overflow-hidden group/card ${step.status === 'warn' ? 'hover:border-warn/40' : 'hover:border-accent/40'
                }`}>

                {/* Decorative Scanline Animation on Hover - Optimized */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent h-1/2 w-full -translate-y-full group-hover/card:animate-scanline pointer-events-none hidden md:block" />

                {/* Step Metadata */}
                <div className="flex justify-between items-start mb-16 relative z-10">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className={`w-1 h-1 rounded-full ${step.status === 'warn' ? 'bg-warn' : 'bg-accent'}`} />
                      <span className={`font-mono text-[9px] font-black uppercase tracking-[0.4em] ${step.status === 'warn' ? 'text-warn/60' : 'text-accent/60'
                        }`}>Step_0{step.step}</span>
                    </div>
                    <div className="font-mono text-[7px] text-white/20 uppercase tracking-widest">Sequence_ID: STEP_SYNC_0{step.step}</div>
                  </div>
                  <span className="font-mono text-[24px] font-black text-white/5 italic group-hover/card:text-accent/10 transition-colors">0{step.step}</span>
                </div>

                {/* Content Body */}
                <div className="space-y-6 mb-12 relative z-10">
                  <h3 className="text-2xl font-black font-grotesk uppercase italic leading-none tracking-tight text-white group-hover/card:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-white/40 text-[10px] font-mono uppercase tracking-widest leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Actions / Progress Visualization */}
                <div className="mt-auto relative z-10 pt-8 border-t border-white/5">
                  {step.links ? (
                    <div className="space-y-2">
                      {step.links.map(link => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full p-3 flex justify-between items-center bg-white/[0.02] border border-white/5 hover:border-accent/40 hover:bg-accent/5 transition-all group/link"
                        >
                          <span className="font-mono text-[8px] font-black uppercase tracking-widest text-white/40 group-hover/link:text-white">{link.label}</span>
                          <span className="text-[10px] text-white/20 group-hover/link:text-accent group-hover/link:translate-x-0.5 transition-all">→</span>
                        </a>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex justify-between items-end">
                        <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">Processing_Asset</span>
                        <span className="font-mono text-[7px] text-accent font-bold">88%</span>
                      </div>
                      <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-accent/40 w-[88%]" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Brackets Overlay */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-white/10 group-hover/card:border-accent transition-colors" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-white/10 group-hover/card:border-accent transition-colors" />
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Footer Pipeline Info */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-between gap-6 opacity-20 group cursor-default">
          <div className="flex items-center gap-8">
            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white">Execution_Deterministic_Enabled</span>
            <div className="h-[1px] w-12 bg-white/20" />
            <span className="font-mono text-[8px] uppercase tracking-[0.5em] text-white">Substrate_Root_Verified</span>
          </div>
          <div className="font-mono text-[8px] uppercase tracking-[1em] text-accent animate-pulse group-hover:tracking-[1.2em] transition-all">FINAL_SYNCHRONIZATION_REQUIRED</div>
        </div>
      </div>
    </section>
  );
}
