'use client';

import Link from 'next/link';
import Image from 'next/image';
import { XENOR, NAVIGATION } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#020203] pt-20 pb-12 overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Technical Banner */}
        <div className="border-y border-white/5 py-16 mb-20 relative group">
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rotate-45 border border-accent/40 bg-accent/10" />
                <div className="font-mono text-[10px] text-accent uppercase tracking-[0.5em] font-bold">System Identity</div>
              </div>
              <h3 className="text-6xl md:text-[10rem] font-black font-grotesk tracking-tighter uppercase leading-[0.8] text-white/5 group-hover:text-white/10 transition-colors italic">
                {XENOR.name}
              </h3>
            </div>
            <div className="text-right">
              <div className="font-mono text-[10px] text-muted-foreground mb-4 uppercase tracking-[0.4em] font-bold">Protocol Status</div>
              <div className="flex items-center gap-4 justify-end">
                <div className="flex flex-col items-end">
                  <span className="font-mono text-[10px] text-white uppercase tracking-widest font-bold">Mainnet_Verified</span>
                  <span className="font-mono text-[8px] text-accent/60 uppercase">Sync_Successful</span>
                </div>
                <div className="w-12 h-12 rounded-sm border border-accent/20 flex items-center justify-center bg-accent/5">
                  <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#00e5ff]" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Subtle Scanline Animation in Banner */}
          <div className="absolute inset-0 bg-accent/[0.01] animate-scanline pointer-events-none" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* Navigation Matrix */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.5em] text-white mb-8 font-black border-b border-white/10 pb-2 inline-block">
                Interface
              </h4>
              <ul className="space-y-4">
                {NAVIGATION.map(item => (
                  <li key={item.name}>
                    <Link href={item.href} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-all font-mono font-bold hover:translate-x-1 inline-block">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.5em] text-white mb-8 font-black border-b border-white/10 pb-2 inline-block">
                Resources
              </h4>
              <ul className="space-y-4">
                <li><a href={XENOR.links.docs} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-all font-mono font-bold hover:translate-x-1 inline-block">Terminal API</a></li>
                <li><a href={XENOR.links.github} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-all font-mono font-bold hover:translate-x-1 inline-block">Open Source</a></li>
                <li><a href={XENOR.links.whitepaper} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-all font-mono font-bold hover:translate-x-1 inline-block">Manifesto</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-[0.5em] text-white mb-8 font-black border-b border-white/10 pb-2 inline-block">
                Network
              </h4>
              <ul className="space-y-4">
                <li><a href={XENOR.links.twitter} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-all font-mono font-bold hover:translate-x-1 inline-block">X / Twitter</a></li>
                <li><a href={XENOR.links.github} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-all font-mono font-bold hover:translate-x-1 inline-block">Github</a></li>
                <li><a href={XENOR.links.telegram} className="text-xs uppercase tracking-[0.2em] text-muted-foreground hover:text-accent transition-all font-mono font-bold hover:translate-x-1 inline-block">Telegram</a></li>
              </ul>
            </div>
          </div>

          {/* System Log / Slogan */}
          <div className="lg:col-span-4 bg-white/[0.01] border border-white/5 p-10 rounded-sm relative overflow-hidden backdrop-blur-3xl group hover:border-accent/30 transition-all">
            <div className="flex items-center justify-between mb-8">
              <div className="font-mono text-[10px] text-accent/60 uppercase tracking-[0.3em] font-bold">Protocol_Logic</div>
              <div className="font-mono text-[9px] text-muted-foreground/30 font-bold tracking-widest">v1.0.4-S</div>
            </div>
            <p className="text-sm text-white leading-relaxed font-mono italic uppercase tracking-tight group-hover:text-accent transition-colors">
              "The deterministic interaction layer for the decentralized future. Every execution is final."
            </p>
            <div className="mt-12 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-all">
              <div className="h-6 w-auto relative">
                <Image src={XENOR.logo} alt="Logo" width={80} height={20} className="h-4 w-auto mix-blend-screen grayscale brightness-200" />
              </div>
              <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Technical Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/5 gap-8">
          <div className="font-mono text-[10px] uppercase tracking-[0.5em] text-muted-foreground/40 flex flex-wrap items-center justify-center gap-6 font-bold">
            <span>© {currentYear} {XENOR.name} System</span>
            <span className="text-white/5 hidden md:block">◈</span>
            <span className="hidden sm:inline">Encrypted Terminal Interface</span>
          </div>
          
          <div className="flex items-center gap-12">
            <Link href="#" className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-accent transition-all font-bold">Legal.sys</Link>
            <Link href="#" className="font-mono text-[10px] uppercase tracking-[0.4em] text-muted-foreground hover:text-accent transition-all font-bold">Privacy.sys</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
