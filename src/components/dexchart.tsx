"use client";

import { motion } from "framer-motion";

export default function DexChart() {
  // Contract Address token kamu
  const CA = "38JepT8P7N1AUS996QRqNLAewiPvFoNWxrPY7DR2pump";
  
  // URL Embed DexScreener (chain solana, parameter embed=1 & theme=dark)
  const embedUrl = `https://dexscreener.com/solana/${CA}?embed=1&theme=dark&trades=0&info=0`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ delay: 0.3, duration: 0.6 }}
      className="w-full flex flex-col gap-4 mt-6"
    >
      <div className="flex items-center gap-3">
        <span className="rounded-full border border-[#22D3EE]/30 bg-[#22D3EE]/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#22D3EE]">
          Live Chart
        </span>
        <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-[#9AA3B2]">
          DexScreener Terminal
        </h3>
      </div>

      {/* Kontainer iframe dengan style ala Web3 Dashboard */}
      <div className="relative w-full h-[500px] md:h-[650px] rounded-2xl border border-[#9AA3B2]/15 bg-[#0A0A0F] overflow-hidden shadow-[0_0_30px_rgba(0,0,0,0.5)]">
        
        {/* Placeholder Loading (muncul sepersekian detik sebelum iframe load) */}
        <div className="absolute inset-0 flex items-center justify-center -z-10">
          <div className="flex flex-col items-center gap-3">
            <div className="h-4 w-4 rounded-full bg-[#22D3EE] animate-ping opacity-75" />
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
          className="relative z-10 w-full h-full border-none"
        ></iframe>
      </div>
    </motion.div>
  );
}