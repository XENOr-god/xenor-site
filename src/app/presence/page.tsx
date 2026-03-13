"use client";

import { motion, Variants } from "framer-motion";
import ChannelCard from "@/src/components/channel-card";
import PageHero from "@/src/components/page-hero";
import SectionCard from "@/src/components/section-card";

// --- Variabel Animasi dengan tipe 'Variants' yang benar ---
const fadeUpContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const fadeUpItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6 } // Properti 'ease' dihapus agar TypeScript tidak error, default-nya sudah smooth
  },
};

export default function PresencePage() {
  return (
    <main className="page-wrap relative overflow-hidden">
      
      {/* --- Ambient Glow Halus --- */}
      <div className="absolute top-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#22D3EE]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none" />

      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10"
      >
        <PageHero
          eyebrow="Public Presence"
          title="Official channels and project surfaces"
          description="Use these endpoints to follow implementation updates, inspect repositories, and verify public communication across the XENØR ecosystem."
        >
          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="https://github.com/XENOr-god"
              target="_blank"
              rel="noreferrer"
              className="primary-button"
            >
              GitHub
            </a>
            <a
              href="https://x.com/Xenorlabs"
              target="_blank"
              rel="noreferrer"
              className="secondary-button"
            >
              X Account
            </a>
          </div>
        </PageHero>
      </motion.div>

      {/* ==========================================
          OFFICIAL CHANNELS SECTION
      ========================================== */}
      <section className="section-border relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUpContainer}
          >
            <motion.div variants={fadeUpItem} className="mb-14">
              <p className="eyebrow text-[#22D3EE]">Official Channels</p>
              <h2 className="section-title mt-4">Primary public entry points</h2>
              <p className="body-copy mt-6 max-w-3xl text-lg">
                These are the main places where people should discover XENØR,
                follow updates, and verify ongoing technical progress.
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div variants={fadeUpItem} whileHover={{ y: -5 }} className="transition-transform duration-300">
                <ChannelCard
                  title="GitHub Profile"
                  status="Official Development Surface"
                  summary="Primary source for repositories, implementation history, and architecture-facing technical work."
                  meta="Canonical source for code and module visibility."
                  href="https://github.com/XENOr-god"
                />
              </motion.div>
              <motion.div variants={fadeUpItem} whileHover={{ y: -5 }} className="transition-transform duration-300">
                <ChannelCard
                  title="X Account"
                  status="Official Communication Surface"
                  summary="Public channel for project updates, release signaling, and ecosystem-facing announcements."
                  meta="Canonical source for public updates and social presence."
                  href="https://x.com/Xenorlabs"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          DEVELOPMENT SURFACES SECTION
      ========================================== */}
      <section className="section-border relative z-10 bg-gradient-to-b from-transparent to-[#11131A]/20">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUpContainer}
          >
            <motion.div variants={fadeUpItem} className="mb-14">
              <p className="eyebrow text-[#8B5CF6]">Development Surfaces</p>
              <h2 className="section-title mt-4">Public repositories</h2>
              <p className="body-copy mt-6 max-w-3xl text-lg">
                The public repositories below expose the current technical surface
                of the XENØR ecosystem across execution, simulation, and
                implementation tracks.
              </p>
            </motion.div>

            <div className="grid gap-6 lg:grid-cols-3">
              <motion.div variants={fadeUpItem} whileHover={{ y: -5 }} className="transition-transform duration-300">
                <ChannelCard
                  title="xenor-core"
                  status="Execution Layer"
                  summary="Rust protocol core for deterministic execution and foundational system behavior."
                  meta="Core module • Rust • deterministic execution"
                  href="https://github.com/XENOr-god/xenor-core"
                />
              </motion.div>
              <motion.div variants={fadeUpItem} whileHover={{ y: -5 }} className="transition-transform duration-300">
                <ChannelCard
                  title="xenor-sim"
                  status="Validation Layer"
                  summary="Simulation environment for scenario testing, validation loops, and behavior analysis."
                  meta="Simulation module • Rust • validation tooling"
                  href="https://github.com/XENOr-god/xenor-sim"
                />
              </motion.div>
              <motion.div variants={fadeUpItem} whileHover={{ y: -5 }} className="transition-transform duration-300">
                <ChannelCard
                  title="xenor-sale"
                  status="Implementation Track"
                  summary="Protocol-adjacent implementation track capturing earlier mechanism and architecture exploration."
                  meta="Experimental module • implementation track"
                  href="https://github.com/XENOr-god/xenor-sale"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ==========================================
          COMMUNICATION POLICY SECTION
      ========================================== */}
      <section className="relative z-10">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUpContainer}
          >
            <motion.div variants={fadeUpItem} className="mb-14">
              <p className="eyebrow text-[#22D3EE]">Communication Policy</p>
              <h2 className="section-title mt-4">How XENØR communicates public state</h2>
              <p className="body-copy mt-6 max-w-3xl text-lg">
                Public communication should stay aligned with real technical
                progress, canonical repositories, and verified official channels.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  title: "GitHub is canonical for code",
                  desc: "Implementation details, repository changes, and technical artifacts should always be verified through the public GitHub surface."
                },
                {
                  title: "X is canonical for updates",
                  desc: "Release notes, summaries, and public-facing project communication should route through the official X account."
                },
                {
                  title: "Avoid unofficial mirrors",
                  desc: "Only trust links published on the official website, official GitHub profile, or official X account."
                },
                {
                  title: "Architecture should match communication",
                  desc: "Any claim about the system should map back to visible repositories, modules, or documented project structure."
                }
              ].map((policy, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeUpItem} 
                  whileHover={{ y: -5 }} 
                  className="transition-transform duration-300"
                >
                  <SectionCard
                    title={policy.title}
                    description={policy.desc}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}