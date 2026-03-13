"use client";

import { motion } from "framer-motion";
import ContractPanel from "@/src/components/contract-panel";
import PageHero from "@/src/components/page-hero";

export default function ContractPage() {
  return (
    <motion.main 
      className="page-wrap"
      // Animasi saat halaman dimuat (muncul perlahan dari bawah)
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      // Animasi saat pindah halaman (jika kamu menggunakan AnimatePresence di layout)
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <PageHero
        eyebrow="Contract Address"
        title="Canonical contract reference"
        description="Official XENØR contract address and live market reference surface. Verify the canonical CA here before using any trading route."
      />

      <section>
        <motion.div 
          className="mx-auto max-w-7xl px-6 py-20 md:px-10"
          // Memberikan delay sedikit agar ContractPanel muncul setelah PageHero
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        >
          <ContractPanel />
        </motion.div>
      </section>
    </motion.main>
  );
}