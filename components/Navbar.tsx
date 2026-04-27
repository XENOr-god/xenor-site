'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION, XENOR } from '@/lib/constants';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isWarping, setIsWarping] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Hyperwarp Global Flash */}
      <AnimatePresence>
        {isWarping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, times: [0, 0.1, 1] }}
            className="fixed inset-0 z-[100] bg-white/5 pointer-events-none mix-blend-overlay backdrop-blur-[1px]"
          >
            <motion.div
              initial={{ top: '-20%' }}
              animate={{ top: '120%' }}
              transition={{ duration: 0.4, ease: "linear" }}
              className="absolute w-full h-[2px] bg-accent shadow-[0_0_30px_rgba(255,215,0,0.8)] opacity-50"
            />
            <motion.div
              initial={{ top: '-10%' }}
              animate={{ top: '110%' }}
              transition={{ duration: 0.4, ease: "linear", delay: 0.05 }}
              className="absolute w-full h-[1px] bg-white shadow-[0_0_20px_rgba(255,255,255,0.5)] opacity-30"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 px-4 md:pt-6 md:px-6 pointer-events-none">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto relative px-6 md:px-10 py-2 md:py-3 flex items-center gap-6 md:gap-10 transition-all duration-700 max-w-fit group/nav-bar ${scrolled
            ? 'bg-black/95 backdrop-blur-xl border border-white/20 shadow-[0_0_40px_rgba(0,0,0,0.8)]'
            : 'bg-black/40 backdrop-blur-md border border-white/10'
            }`}
          style={{ borderRadius: scrolled ? '2px' : '40px' }}
        >
          {/* Tactical HUD Markers */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-accent transition-all duration-500 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
            <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-accent transition-all duration-500 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
            <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-accent transition-all duration-500 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />
            <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-accent transition-all duration-500 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`} />

            {/* Diamond Ornaments */}
            <div className={`absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rotate-45 transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
            <div className={`absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-accent rotate-45 transition-all duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />

            {/* Ambient Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.03] to-transparent h-[1px] w-full animate-scanline opacity-20" />
          </div>

          {/* Status Indicator */}
          <div className="hidden xl:flex items-center gap-3 pr-4 border-r border-white/10">
            <div className="relative flex items-center justify-center">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(255,215,0,0.8)]" />
              <div className="absolute inset-0 w-2 h-2 bg-accent rounded-full animate-ping opacity-40" />
            </div>
            <div className="flex flex-col">
              <span className="font-mono text-[7px] text-accent font-black uppercase tracking-[0.2em]">XENOR_PROTOCOL</span>
              <span className="font-mono text-[6px] text-white/30 uppercase tracking-[0.1em]">VER: XNR_2.1.0</span>
            </div>
          </div>

          {/* Main Logo */}
          <Link
            href="#home"
            className="group/logo relative z-10"
            onClick={() => {
              setIsWarping(true);
              setTimeout(() => setIsWarping(false), 800);
            }}
          >
            <div className="flex items-center relative">
              <AnimatePresence>
                {isWarping && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1, 2.5, 3], opacity: [0, 0.6, 0] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 bg-accent rounded-full blur-2xl z-0"
                  />
                )}
              </AnimatePresence>

              <img
                src="/assets/images/xenor-gold.png"
                alt="XENØR"
                className="h-6 md:h-7 w-auto object-contain hover:brightness-125 transition-all group-hover/logo:scale-110 active:scale-95 relative z-10"
              />
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group/item relative px-3 py-1 font-mono text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-all"
              >
                <span className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent opacity-0 group-hover/item:opacity-100 transition-all duration-300" />
                <span className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-accent opacity-0 group-hover/item:opacity-100 transition-all duration-300" />
                {item.name}
                <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/40 to-transparent scale-x-0 group-hover/item:scale-x-100 transition-transform duration-500" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4 relative z-10">
            <a
              href={XENOR.links.jupiter}
              target="_blank"
              rel="noopener noreferrer"
              className="relative px-6 py-2 bg-accent/10 border border-accent/30 text-accent hover:bg-accent hover:text-black font-mono text-[9px] font-black uppercase tracking-[0.3em] transition-all hidden md:block overflow-hidden group/btn shadow-[0_0_20px_rgba(255,215,0,0.1)]"
            >
              <div className="absolute top-0 left-0 w-1 h-1 border-t border-l border-accent" />
              <div className="absolute bottom-0 right-0 w-1 h-1 border-b border-r border-accent" />
              <span className="relative z-10">INITIALIZE</span>
              <div className="absolute inset-0 bg-accent translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center lg:hidden text-accent hover:text-white transition-all group border border-white/5 bg-white/[0.02]"
            >
              <div className={`w-5 h-[1px] bg-current mb-1.5 transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <div className={`w-3 h-[1px] bg-current mb-1.5 transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
              <div className={`w-5 h-[1px] bg-current transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-0.5' : ''}`} />
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#080808] flex flex-col md:hidden"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 bg-accent rounded-[1px]" />
                <span className="font-mono text-[10px] text-accent font-black tracking-[0.3em] uppercase">
                  XENOR_PROTOCOL
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="flex flex-col">
                {NAVIGATION.map((item, i) => {
                  const Icon = require('lucide-react')[item.icon || 'Circle'];
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group relative flex items-center justify-between px-8 py-6 border-b border-white/5 hover:bg-gradient-to-r hover:from-accent/5 hover:to-transparent transition-all"
                      >
                        {/* Active Indicator */}
                        <div className="absolute left-0 top-0 w-[2px] h-full bg-accent opacity-0 group-hover:opacity-100 shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-all" />
                        
                        <div className="flex items-center gap-8">
                          <div className="w-1 h-1 bg-accent rounded-full opacity-40 group-hover:opacity-100" />
                          <div className="text-white/40 group-hover:text-accent transition-colors">
                            <Icon size={20} strokeWidth={1.5} />
                          </div>
                          <span className="font-mono text-[11px] text-white/40 group-hover:text-white font-black tracking-[0.4em] uppercase transition-all">
                            {item.name}
                          </span>
                        </div>

                        <div className="text-accent/40 group-hover:text-accent transition-colors">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M9 18l6-6-6-6" />
                          </svg>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-white/5 bg-black/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse shadow-[0_0_5px_rgba(255,215,0,0.5)]" />
                  <span className="font-mono text-[9px] text-white/30 tracking-[0.2em] uppercase">ONLINE</span>
                </div>
                <div className="flex items-end gap-[2px]">
                  <div className="w-[2px] h-2 bg-white/10" />
                  <div className="w-[2px] h-3 bg-white/20" />
                  <div className="w-[2px] h-4 bg-accent shadow-[0_0_5px_rgba(255,215,0,0.5)]" />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
