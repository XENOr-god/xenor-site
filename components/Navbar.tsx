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
      <nav className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 md:pt-8 px-6 pointer-events-none">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto px-6 md:px-8 py-2 md:py-2.5 glass rounded-full border-white/10 flex items-center gap-6 md:gap-12 transition-all duration-700 max-w-fit shadow-[0_8px_32px_rgba(0,0,0,0.4)] ${scrolled ? 'bg-black/80 border-white/20' : ''
            }`}
        >
          {/* Main Logo Shortcut */}
          <Link href="/">
            <div className="flex items-center">
              <img 
                src="/assets/images/xenor-icon.png" 
                alt="XENØR" 
                className="h-7 md:h-8 w-auto object-contain hover:brightness-125 transition-all"
              />
            </div>
          </Link>

          <div className="w-[1px] h-4 bg-white/10 hidden md:block" />

          {/* Centered Navigation Dock */}
          <div className="flex items-center gap-1 md:gap-2">
            <div className="hidden lg:flex items-center gap-1">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="px-4 py-1 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40 hover:text-white transition-all font-bold relative group/nav"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-4 right-4 h-[1px] bg-accent scale-x-0 group-hover/nav:scale-x-100 transition-transform origin-center" />
                </Link>
              ))}
            </div>

            <div className="w-[1px] h-4 bg-white/10 hidden lg:block mx-4" />

            <div className="flex items-center gap-4">

              <a
                href={XENOR.links.jupiter}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-1.5 bg-accent/10 border border-accent/20 text-accent hover:bg-accent hover:text-black rounded-full font-mono text-[9px] font-black uppercase tracking-[0.3em] transition-all hidden md:block shadow-[0_0_15px_rgba(136,255,0,0.05)]"
              >
                INITIALIZE
              </a>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-8 h-8 flex flex-col items-center justify-center lg:hidden text-white/40 hover:text-white transition-all group ml-2"
            >
              <div className="w-4 h-[1px] bg-current mb-1 transition-all group-hover:w-5" />
              <div className="w-4 h-[1px] bg-current transition-all group-hover:w-5" />
            </button>
          </div>
        </motion.div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-md flex flex-col p-10 md:hidden"
          >
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex justify-between items-center mb-12">
                <span className="font-mono text-[10px] text-accent uppercase tracking-[0.4em] font-bold">MENU_SYSTEM</span>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white font-mono text-sm uppercase tracking-widest font-bold"
                >
                  CLOSE [X]
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {NAVIGATION.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="font-grotesk text-xl font-black uppercase tracking-tighter text-white/40 hover:text-white transition-all"
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto pb-10">
                <a
                  href={XENOR.links.jupiter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 border border-accent/20 bg-accent/5 text-accent font-mono text-[10px] uppercase tracking-[0.4em] text-center block transition-all"
                >
                  INITIALIZE
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
