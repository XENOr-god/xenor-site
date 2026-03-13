"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function ContractDashboard() {
  const [copied, setCopied] = useState(false);
  
  const CA = "38JepT8P7N1AUS996QRqNLAewiPvFoNWxrPY7DR2pump";
  const embedUrl = `https://dexscreener.com/solana/${CA}?embed=1&theme=dark&trades=0&info=0`;

  const handleCopy = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      

      <motion.div 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[#9AA3B2]/15 bg-[#11131A] p-6 md:p-8"
      >
        <div className="flex items-center gap-3 mb-6">
          <span className="rounded-full border border-[#9AA3B2]/20 bg-[#0A0A0F] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9AA3B2]">
            Canonical Address
          </span>
          <span className="rounded-full border border-[#9AA3B2]/20 bg-[#0A0A0F] px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#9AA3B2]">
            Solana Chain
          </span>
        </div>

        <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#9AA3B2] mb-3">
          Current CA
        </p>

        {/* Input box interaktif untuk Copy CA */}
        <button 
          onClick={handleCopy}
          className="group relative w-full flex items-center justify-between rounded-xl border border-[#9AA3B2]/20 bg-[#0A0A0F] p-4 transition-all hover:border-[#22D3EE]/50 hover:bg-[#11131A] text-left"
        >
          <span className="font-mono text-sm md:text-base text-[#F5F7FA] break-all">
            {CA}
          </span>
          <span className={`absolute right-4 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${copied ? "text-[#34D399]" : "text-[#22D3EE] opacity-0 group-hover:opacity-100"}`}>
            {copied ? "Copied!" : "Click to Copy"}
          </span>
        </button>

        <div className="mt-6 flex flex-wrap items-center gap-4">
          <a href={`https://solscan.io/token/${CA}`} target="_blank" rel="noreferrer" className="primary-button">
            View on Explorer
          </a>
          <a href={`https://dexscreener.com/solana/${CA}`} target="_blank" rel="noreferrer" className="secondary-button">
            Open DexScreener
          </a>
        </div>
        
        <p className="mt-6 text-sm text-[#9AA3B2]">
          Address format matches Solana base58. Only use the canonical address published here and on official XENØR channels.
        </p>
      </motion.div>

      {/* =========================================
          SECTION 2 & 3: KOTAK YANG SEIMBANG
      ========================================= */}
      {/* lg:items-stretch memastikan kedua kotak kanan-kiri tingginya ditarik sama rata */}
      <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
        
        {/* --- KIRI: LIVE CHART --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="flex flex-col rounded-2xl border border-[#9AA3B2]/15 bg-[#11131A] p-6 md:p-8"
        >
          {/* Header sejajar */}
          <div className="mb-6 flex items-center gap-3">
            <span className="rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#22D3EE]">
              Live Chart
            </span>
            <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#9AA3B2]">
              DexScreener Terminal
            </h3>
          </div>

          {/* Iframe flex-grow mengisi sisa ruang bawah */}
          <div className="relative flex-grow w-full rounded-xl border border-[#9AA3B2]/10 bg-[#0A0A0F] overflow-hidden min-h-[400px] lg:min-h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center -z-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE] animate-pulse" />
                <span className="font-mono text-[10px] text-[#9AA3B2] uppercase tracking-[0.2em]">
                  Establishing connection...
                </span>
              </div>
            </div>
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              frameBorder="0"
              title="DexScreener Chart"
              className="absolute inset-0 z-10 w-full h-full border-none"
            />
          </div>
        </motion.div>

        {/* --- KANAN: CONTRACT INVARIANTS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="flex flex-col rounded-2xl border border-[#9AA3B2]/15 bg-[#11131A] p-6 md:p-8"
        >
          {/* Header sejajar */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#9AA3B2]">
              Contract Invariants
            </h3>
            <div className="flex items-center gap-2 rounded-full border border-[#34D399]/30 bg-[#34D399]/10 px-3 py-1">
              <div className="w-2 h-2 rounded-full bg-[#34D399] shadow-[0_0_8px_#34D399] animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#34D399]">Verified Safe</span>
            </div>
          </div>

          {/* List Item flex-grow meratakan jarak atas bawah */}
          <div className="flex flex-col flex-grow justify-between gap-4">
            {[
              {
                title: "Mint Authority",
                desc: "No new tokens can ever be created.",
                status: "REVOKED",
                safe: true
              },
              {
                title: "Freeze Authority",
                desc: "Trading cannot be halted by developers.",
                status: "REVOKED",
                safe: true
              },
              {
                title: "Liquidity Pool (LP)",
                desc: "Initial liquidity tokens permanently destroyed.",
                status: "100% BURNED",
                safe: true
              },
              {
                title: "Transaction Taxes",
                desc: "Zero fees on buying or selling.",
                status: "0% / 0%",
                safe: true
              },
              {
                title: "Top 10 Holders",
                desc: "Supply distribution analysis.",
                status: "HEALTHY",
                safe: true
              }
            ].map((item, i) => (
              <div key={i} className="group flex items-center justify-between rounded-xl border border-[#9AA3B2]/10 bg-[#0A0A0F] p-4 transition-colors hover:border-[#34D399]/30">
                <div className="flex flex-col gap-1 pr-4">
                  <span className="font-['Space_Grotesk'] text-base md:text-lg font-semibold text-[#F5F7FA]">
                    {item.title}
                  </span>
                  <span className="text-xs text-[#9AA3B2]">
                    {item.desc}
                  </span>
                </div>
                
                <div className="shrink-0">
                  <span className={`inline-block rounded-full border px-3 py-1 font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest ${
                    item.safe 
                      ? "border-[#34D399]/30 bg-[#34D399]/10 text-[#34D399]" 
                      : "border-red-500/30 bg-red-500/10 text-red-500"
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-lg border border-[#22D3EE]/20 bg-[#22D3EE]/5 p-4">
            <p className="font-mono text-xs text-[#22D3EE]/80">
              <span className="font-bold text-[#22D3EE]">Note:</span> All deterministic constraints are locked at the protocol level on the Solana blockchain and cannot be altered.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}