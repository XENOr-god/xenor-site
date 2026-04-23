'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAVIGATION, XENOR } from '@/lib/constants';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pt-8 md:pt-10 px-6 pointer-events-none">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto px-3 md:px-6 py-1.5 md:py-2.5 bg-black/40 backdrop-blur-2xl border border-white/5 rounded-sm flex items-center gap-3 transition-all duration-700 ${
            scrolled ? 'border-accent/20 bg-black/60 shadow-[0_0_40px_rgba(0,0,0,0.8)]' : ''
          }`}
        >
          {/* Main Logo Shortcut */}
          <Link href="/" className="mr-2 md:mr-4">
            <div className="w-8 h-8 flex items-center justify-center">
              <img src="/assets/images/icon.png" alt="XENOR" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
            </div>
          </Link>

          {/* Centered Navigation Dock */}
          <div className="flex items-center">
            <div className="hidden lg:flex items-center gap-2">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-1.5 rounded-sm font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-white hover:bg-white/5 transition-all font-bold"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            
            <div className="w-[1px] h-6 bg-white/10 mx-6 hidden lg:block" />
            
            <a 
              href={XENOR.links.jupiter}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-accent text-black rounded-sm font-mono text-[10px] font-black uppercase tracking-[0.4em] hover:bg-white hover:glow-hover transition-all hidden md:block"
            >
              INITIALIZE
            </a>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 flex flex-col items-center justify-center lg:hidden text-white/40 hover:text-accent rounded-sm hover:bg-white/5 transition-all group"
            >
              <div className="w-5 h-[2px] bg-current mb-1.5 group-hover:w-6 transition-all" />
              <div className="w-4 h-[2px] bg-current self-end group-hover:w-6 transition-all" />
            </button>
          </div>
          
          {/* Aesthetic Dock Line */}
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[60] bg-[#020203] flex flex-col p-10 md:hidden overflow-hidden"
          >
            {/* Background Grid for Menu */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,229,255,0.05)_0%,transparent_70%)] pointer-events-none" />
            <div className="absolute inset-0 bg-accent/[0.01] animate-scanline pointer-events-none" />
            
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12 md:mb-20">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-[11px] text-accent uppercase tracking-[0.5em] font-black">XENOR_INTERFACE</span>
                  <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.3em] font-bold">Protocol_Access: Active</span>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)} 
                  className="w-10 h-10 flex items-center justify-center font-mono text-sm text-white border border-white/10 rounded-sm bg-white/5 active:bg-accent/20 transition-all font-black"
                >
                  X
                </button>
              </div>
              
              <div className="flex flex-col gap-6 md:gap-8 px-2">
                {NAVIGATION.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + (i * 0.05) }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-end gap-6"
                    >
                      <span className="font-mono text-[9px] text-accent/40 mb-1 font-black tracking-tighter">0{i+1}</span>
                      <span className="font-grotesk text-2xl md:text-3xl font-black uppercase italic tracking-tighter text-white group-hover:text-accent transition-all duration-500 leading-none">
                        {item.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-auto pt-12 border-t border-white/5"
                >
                  <a 
                    href={XENOR.links.jupiter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-5 bg-accent text-black rounded-sm font-black font-grotesk text-xl uppercase tracking-[0.4em] text-center shadow-[0_0_50px_rgba(0,229,255,0.2)] block active:scale-[0.98] transition-all"
                  >
                    LAUNCH PROTOCOL
                  </a>
                  <div className="mt-8 flex flex-col items-center gap-2">
                    <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.5em] opacity-40 font-bold">
                      Deterministic_Execution_Substrate
                    </p>
                    <div className="w-12 h-[1px] bg-white/10" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
