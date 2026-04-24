'use client';

import Link from 'next/link';
import { XENOR, NAVIGATION } from '@/lib/constants';



export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-transparent pt-32 pb-16 overflow-hidden border-t border-white/5">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full grid-bg opacity-5 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-accent/[0.01] blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-10 relative z-10">
        


        {/* Navigation & System Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          
          {/* Brand & Manifesto Block */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-6">
              <div className="flex items-center">
                <img 
                  src="/assets/images/xenor-icon.png" 
                  alt="XENØR LABS" 
                  className="h-8 md:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
              <p className="text-white/40 text-[11px] font-mono uppercase tracking-[0.2em] leading-relaxed italic max-w-sm">
                ◈ Building the deterministic execution substrate for verifiable compute. No compromises. No overrides. ◈
              </p>
            </div>
            
            <div className="flex gap-4">
              {[
                { 
                  name: 'X', 
                  url: XENOR.links.twitter,
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  )
                },
                { 
                  name: 'Github', 
                  url: XENOR.links.github,
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  )
                },
                { 
                  name: 'Telegram', 
                  url: XENOR.links.telegram,
                  icon: (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.91-1.27 4.85-2.11 5.82-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
                    </svg>
                  )
                }
              ].map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center border border-white/5 bg-white/[0.01] hover:border-accent/40 hover:bg-accent/5 transition-all text-white/40 hover:text-accent shadow-2xl"
                  title={link.name}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation Matrix */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-8">
            <div className="space-y-8">
              <h4 className="font-mono text-[9px] text-accent font-black uppercase tracking-[0.4em]">Protocol_Map</h4>
              <ul className="space-y-4">
                {NAVIGATION.map((item) => (
                  <li key={item.name}>
                    <Link 
                      href={item.href} 
                      className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="font-mono text-[9px] text-accent font-black uppercase tracking-[0.4em]">Resources</h4>
              <ul className="space-y-4">
                {[
                  { name: 'Terminal API', url: XENOR.links.docs },
                  { name: 'Manifesto', url: XENOR.links.whitepaper },
                  { name: 'Audit Logs', url: XENOR.links.github },
                  { name: 'Security', url: '#security' }
                ].map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.url} 
                      className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 hover:text-white transition-all hover:translate-x-1 inline-block"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* System Manifest Block */}
          <div className="lg:col-span-3">
            <div className="p-8 border border-white/5 bg-black/40 relative group overflow-hidden">
              <div className="absolute inset-0 bg-accent/[0.02] opacity-0 group-hover:opacity-100 animate-scanline pointer-events-none" />
              <div className="space-y-6 relative z-10">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-[8px] text-white/20 uppercase tracking-widest">System_Log</span>
                  <span className="font-mono text-[8px] text-accent/60 uppercase tracking-widest font-black">v1.0.4</span>
                </div>
                <div className="font-mono text-[9px] text-white/60 uppercase tracking-[0.2em] leading-relaxed">
                  "Deterministic interaction layer for the decentralized future. Every execution is final."
                </div>
                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                  <div className="flex gap-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-1 h-1 bg-accent/20 rounded-full group-hover:bg-accent/60 transition-colors" />
                    ))}
                  </div>
                  <span className="font-mono text-[7px] text-white/20 uppercase">Core_Verified</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Copyright Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="font-mono text-[9px] text-white/20 uppercase tracking-[0.5em] font-bold">
              © {currentYear} {XENOR.name} PROTOCØL
            </div>
            <div className="hidden md:block w-1 h-1 bg-white/10 rounded-full" />
            <div className="font-mono text-[9px] text-white/10 uppercase tracking-[0.3em]">
              EST_2025_DECENTRALIZED_INFRASTRUCTURE
            </div>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="#" className="font-mono text-[9px] text-white/30 hover:text-white uppercase tracking-[0.4em] transition-all">Terms.sys</Link>
            <div className="w-[1px] h-3 bg-white/10" />
            <Link href="#" className="font-mono text-[9px] text-white/30 hover:text-white uppercase tracking-[0.4em] transition-all">Privacy.sys</Link>
          </div>
        </div>
      </div>

      {/* Decorative HUD Elements */}
      <div className="absolute bottom-4 left-4 font-mono text-[6px] text-white/5 uppercase tracking-[1em] vertical-text hidden lg:block">
        XENOR_CANONICAL_INTERFACE_v1.0.4
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[6px] text-white/5 uppercase tracking-[1em] vertical-text hidden lg:block">
        SECURE_CONNECTION_ESTABLISHED
      </div>
    </footer>
  );
}
