"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/vision", label: "Vision" },
  { href: "/architecture", label: "Architecture" },
  { href: "/contract", label: "Contract" },
  { href: "/presence", label: "Presence" },
];

export default function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname(); // Untuk mendeteksi halaman saat ini aktif

  return (
    <header className="relative z-50 border-b border-[#9AA3B2]/15 bg-[#0A0A0F]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-5 md:px-10">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center gap-4 group">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.34em] text-[#F5F7FA] transition group-hover:text-[#22D3EE]">
              XENØR
            </p>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#9AA3B2]">
              Protocol Systems
            </p>
          </div>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`font-mono text-xs uppercase tracking-[0.24em] transition duration-200 ${
                  isActive 
                    ? "text-[#22D3EE] drop-shadow-[0_0_8px_rgba(34,211,238,0.4)]" // Style saat aktif (Cyan + Glow)
                    : "text-[#9AA3B2] hover:text-[#F5F7FA]" // Style default (Muted -> Putih)
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* DESKTOP SOCIALS */}
        <div className="hidden items-center gap-5 md:flex">
          <a
            href="https://github.com/XENOr-god"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-[0.22em] text-[#9AA3B2] transition hover:text-[#22D3EE]"
          >
            GitHub
          </a>
          <a
            href="https://x.com/Xenorlabs"
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs uppercase tracking-[0.22em] text-[#9AA3B2] transition hover:text-[#22D3EE]"
          >
            X 
          </a>
        </div>

        {/* MOBILE MENU BUTTON (Hamburger) */}
        <button
          className="flex flex-col gap-[5px] p-2 lg:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className={`h-[2px] w-6 bg-[#F5F7FA] transition-transform duration-300 ${isMobileMenuOpen ? "translate-y-[7px] rotate-45" : ""}`} />
          <div className={`h-[2px] w-6 bg-[#F5F7FA] transition-opacity duration-300 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <div className={`h-[2px] w-6 bg-[#F5F7FA] transition-transform duration-300 ${isMobileMenuOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      <div 
        className={`absolute left-0 top-full w-full border-b border-[#9AA3B2]/15 bg-[#0A0A0F]/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 visible py-6" : "opacity-0 invisible h-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col items-center gap-6 px-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)} // Tutup menu setelah klik
                className={`font-mono text-sm uppercase tracking-[0.24em] ${
                  isActive ? "text-[#22D3EE]" : "text-[#9AA3B2]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          
          {/* Mobile Socials */}
          <div className="flex w-full items-center justify-center gap-8 border-t border-[#9AA3B2]/15 pt-6 mt-2">
            <a href="https://github.com/XENOr-god" className="font-mono text-xs uppercase tracking-[0.22em] text-[#9AA3B2]">
              GitHub
            </a>
            <a href="https://x.com/Xenorlabs" className="font-mono text-xs uppercase tracking-[0.22em] text-[#9AA3B2]">
              X
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}