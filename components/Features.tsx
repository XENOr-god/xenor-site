import { FEATURES } from '@/lib/constants';
import SectionLabel from './ui/SectionLabel';
import ScrollReveal from './ui/ScrollReveal';

export default function Features() {
  return (
    <section id="features" className="relative py-16 md:py-32 px-6 md:px-10 bg-transparent overflow-hidden scroll-mt-24">
      {/* Background Decor - Simplified for mobile */}
      <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-5 -z-10" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/[0.02] blur-[120px] -z-10 hidden md:block" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-20">
          {/* Title Block (Cols 1-7) */}
          <div className="lg:col-span-7 border border-white/10 bg-black/40 p-6 md:p-12 min-h-[280px] relative overflow-hidden group flex flex-col justify-center">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-accent/40 group-hover:border-accent transition-all" />
            <div className="absolute inset-0 grid-bg opacity-5 pointer-events-none" />

            <div className="relative z-10">
              <ScrollReveal>
                <div className="mb-8 flex items-center gap-4">
                  <SectionLabel number="02" text="System Architecture" />
                  <div className="h-[1px] flex-grow bg-white/5" />
                  <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest">[ UNIT_ID: XNR-ARCH-02 ]</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-[0.9] text-white mb-8">
                  BUILT<br />
                  <span className="text-accent not-italic drop-shadow-[0_0_30px_rgba(255,215,0,0.2)]">DETERMINISM</span>
                </h2>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="flex gap-4 items-start">
                  <div className="w-1 h-10 bg-accent/40 group-hover:bg-accent transition-colors" />
                  <p className="text-white/60 text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] leading-relaxed max-w-sm">
                    Verified by Rust substrate. Zero-failure execution layer. Every state transition is cryptographically validated.
                  </p>
                </div>
              </ScrollReveal>
            </div>

            <div className="absolute bottom-4 left-6 md:left-12 font-mono text-[7px] text-white/10 uppercase tracking-[0.5em] flex gap-8 md:gap-12">
              <span>BITRATE: 1.2 GB/S</span>
              <span>STATE_INTEGRITY: 100%</span>
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
                  src="/assets/images/gif/02-System-Architecture.gif"
                  alt="System Architecture"
                  loading="lazy"
                  className="w-full h-full object-cover mix-blend-screen opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000 brightness-125"
                />

                <div className="absolute top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] text-accent font-black uppercase tracking-[0.5em] bg-black/80 px-3 py-1 border border-accent/20">
                  ARCH_VISUAL_02
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Architecture Units Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {FEATURES.map((feature, i) => (
            <ScrollReveal key={feature.id} delay={0.1 * i}>
              <div className="h-full bg-black/40 border border-white/5 p-8 relative overflow-hidden transition-all duration-500 group-hover:border-accent/30 flex flex-col group">
                {/* Unit Header */}
                <div className="flex items-center justify-between mb-10 pb-4 border-b border-white/5">
                  <div className="w-12 h-12 border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-accent/40 transition-colors overflow-hidden relative">
                    <span className="text-2xl grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all relative z-10">{feature.icon}</span>
                    <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <div className="text-right">
                    <span className="block font-mono text-[8px] text-accent font-black tracking-[0.4em] mb-1">[ UNIT_{i + 1} ]</span>
                    <span className="block font-mono text-[6px] text-white/20 uppercase tracking-widest">FUNC_SYNC_0{i + 1}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-grow">
                  <h3 className="text-xl font-black text-white uppercase italic tracking-tight leading-none group-hover:text-accent transition-colors">
                    {feature.title}
                  </h3>
                  <div className="w-8 h-[2px] bg-accent/40 group-hover:w-full transition-all duration-700" />
                  <p className="text-[10px] md:text-xs text-white/60 leading-relaxed group-hover:text-white transition-colors font-mono uppercase tracking-tight">
                    {feature.description}
                  </p>
                </div>

                {/* Telemetry Footer */}
                <div className="mt-auto pt-6 border-t border-white/5 space-y-4">
                  <div className="flex justify-between items-center font-mono text-[7px] text-white/30 uppercase tracking-widest">
                    <span>Sync_Rate</span>
                    <span className="text-accent group-hover:animate-pulse">99.8%</span>
                  </div>

                  <div className="flex gap-0.5 h-[1.5px]">
                    {[...Array(12)].map((_, idx) => (
                      <div
                        key={idx}
                        className={`flex-1 transition-all duration-500 ${idx < 6 ? 'bg-accent/40 group-hover:bg-accent' : 'bg-white/5'}`}
                        style={{ transitionDelay: `${idx * 50}ms` }}
                      />
                    ))}
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[7px] text-accent/60 uppercase font-black">{feature.label}</span>
                    <div className="flex gap-1">
                      {[1, 2, 3].map(bit => (
                        <div key={bit} className="w-0.5 h-0.5 bg-accent/40 group-hover:bg-accent group-hover:animate-pulse" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Scanline overlay - Disabled on mobile via CSS class handled in globals.css */}
                <div className="absolute inset-0 bg-accent/[0.02] opacity-0 group-hover:opacity-100 scanline pointer-events-none" />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

