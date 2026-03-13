"use client";

import { motion, Variants } from "framer-motion";

export default function ArchitectureFlow() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
  };

  const nodes = [
    { id: "01", title: "xenor-core", desc: "deterministic execution" },
    { id: "02", title: "xenor-sim", desc: "simulation + validation" },
    { id: "03", title: "xenor-web", desc: "public interface" },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      className="w-full flex flex-col gap-4"
    >
      {/* ==========================================
          HEADER & DIAGRAM BOX
      ========================================== */}
      <div className="relative w-full rounded-2xl border border-[#9AA3B2]/15 bg-[#0A0A0F] p-6 md:p-10">
        
        <motion.div variants={itemVariants} className="mb-12">
          <h3 className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-[#F5F7FA] font-bold">
            ARCHITECTURE DIAGRAM
          </h3>
          <p className="mt-3 text-sm md:text-base leading-relaxed text-[#9AA3B2] max-w-4xl">
            Module flow: core execution feeds simulation, simulation informs public interface, and feedback signals refine assumptions.
          </p>
        </motion.div>

        {/* REVISI: Menambahkan md:pb-32 agar bagian bawah punya ruang untuk garis lengkung */}
        <motion.div variants={itemVariants} className="relative w-full rounded-xl border border-[#9AA3B2]/10 bg-[#050508] p-8 md:p-16 md:pb-32 overflow-hidden">
          
          <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(154,163,178,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(154,163,178,0.05)_1px,transparent_1px)] bg-[size:32px_32px]" />

          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            
            <div className="hidden md:block absolute top-1/2 left-[16.6%] right-[16.6%] -translate-y-1/2 pointer-events-none">
              
              <div className="absolute top-0 w-full border-t border-dashed border-[#9AA3B2]/40" />
              
              <div className="absolute top-[-5px] left-[48%] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-[#9AA3B2]/60" />
              <div className="absolute top-[-5px] right-[-2px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[6px] border-l-[#9AA3B2]/60" />

              {/* REVISI: h-[80px] diubah menjadi h-[110px] agar garis turun lebih dalam ke bawah kotak */}
              <div className="absolute top-0 w-full h-[110px] rounded-b-3xl border-b border-l border-r border-dashed border-[#9AA3B2]/30" />
              
              <div className="absolute bottom-[-5px] left-[-2px] w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-r-[6px] border-r-[#9AA3B2]/60" />
              
              {/* REVISI: Teks dipindah ke bawah (top-[120px]) dan diletakkan di tengah agar 100% bebas dari tabrakan */}
              <span className="absolute top-[118px] left-1/2 -translate-x-1/2 font-mono text-[10px] text-[#9AA3B2] bg-[#050508] px-2">
                feedback constraints
              </span>

              <motion.div 
                className="absolute top-[-2px] w-1 h-1 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"
                animate={{ left: ["0%", "45%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="absolute top-[-2px] w-1 h-1 rounded-full bg-[#22D3EE] shadow-[0_0_8px_#22D3EE]"
                animate={{ left: ["55%", "98%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
              />
              
              {/* REVISI: Animasi titik ungu (Violet) disesuaikan kedalamannya menjadi 110px */}
              <motion.div 
                className="absolute w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shadow-[0_0_8px_#8B5CF6]"
                animate={{ 
                  right: ["0%", "0%", "100%", "100%"],
                  top: ["0px", "110px", "110px", "0px"]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {nodes.map((node) => (
              <motion.div
                key={node.id}
                whileHover={{ y: -2, borderColor: "rgba(34, 211, 238, 0.4)" }}
                className="relative z-10 flex flex-col justify-center rounded-xl border border-[#9AA3B2]/20 bg-[#11131A] p-6 shadow-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(34,211,238,0.1)]"
              >
                <span className="font-mono text-[10px] text-[#9AA3B2] tracking-[0.2em] mb-3">
                  {node.id}
                </span>
                <h4 className="font-['Space_Grotesk'] text-xl md:text-2xl font-semibold text-[#F5F7FA]">
                  {node.title}
                </h4>
                <p className="mt-2 text-xs md:text-sm text-[#9AA3B2]">
                  {node.desc}
                </p>
              </motion.div>
            ))}

          </div>
        </motion.div>
      </div>

      {/* ==========================================
          FOOTER BOXES
      ========================================== */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#9AA3B2]/15 rounded-2xl border border-[#9AA3B2]/15 bg-[#0A0A0F]"
      >
        <div className="p-6 md:p-8">
          <h5 className="font-bold text-sm text-[#F5F7FA] mb-1">Execution</h5>
          <p className="text-xs text-[#9AA3B2]">Deterministic compute surface</p>
        </div>
        <div className="p-6 md:p-8">
          <h5 className="font-bold text-sm text-[#F5F7FA] mb-1">Validation</h5>
          <p className="text-xs text-[#9AA3B2]">Simulation and stress evaluation</p>
        </div>
        <div className="p-6 md:p-8">
          <h5 className="font-bold text-sm text-[#F5F7FA] mb-1">Communication</h5>
          <p className="text-xs text-[#9AA3B2]">Public interface and technical narrative</p>
        </div>
      </motion.div>

    </motion.div>
  );
}