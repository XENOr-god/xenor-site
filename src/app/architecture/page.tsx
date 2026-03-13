"use client";

import { motion, Variants } from "framer-motion";
import ArchitectureFlow from "@/src/components/architecture-flow";
import PageHero from "@/src/components/page-hero";
import SectionCard from "@/src/components/section-card";

// Tambahkan tipe : Variants agar TypeScript tidak protes
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function ArchitecturePage() {
  return (
    <motion.main
      className="page-wrap"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <PageHero
        eyebrow="Architecture"
        title="Layered deterministic protocol architecture"
        description="XENØr defines explicit system layers so deterministic execution, simulation validation, and public communication can evolve with clear contracts and independent constraints."
      />

      <section className="section-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.div
            className="grid gap-6 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <SectionCard
                label="Layer 01"
                title="xenor-core"
                description="Compute layer. Deterministic execution layer. Implements deterministic logic and protocol mechanics as the computational base. Output: deterministic state transitions."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                label="Layer 02"
                title="xenor-sim"
                description="Validation layer. Simulation and validation layer. Stress-tests assumptions, edge cases, and system-level outcomes under controlled conditions. Output: validated behavior profiles."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                label="Layer 03"
                title="xenor-web"
                description="Interface layer. Public interface layer. Communicates architecture, repositories, and project direction with a clear external surface. Output: public project visibility."
              />
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-10"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <ArchitectureFlow />
          </motion.div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">Interface Contracts</p>
            <h2 className="section-title mt-4">Cross-layer handoff contracts</h2>
            <p className="body-copy mt-6 max-w-3xl">
              Each handoff specifies what is transferred, why it matters, and
              which invariant must remain intact.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <SectionCard
                label="Contract A"
                title="xenor-core to xenor-sim"
                description="Handed off: deterministic transitions, boundary assumptions, and invariant definitions. Why it matters: simulation requires canonical execution behavior to evaluate edge conditions with reliable baselines. Constraint preserved: reproducibility under equivalent state and input assumptions."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                label="Contract B"
                title="xenor-sim to xenor-web"
                description="Handed off: validated behavior profiles, failure envelopes, and architecture interpretation. Why it matters: public interface claims must be grounded in observed simulation outcomes, not speculative descriptions. Constraint preserved: evidence-backed communication boundaries."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                label="Contract C"
                title="Feedback loop"
                description="Handed off: operational findings, public scrutiny, and unresolved edge-case signals. Why it matters: new observations are fed back into simulation plans and core assumptions to keep architecture adaptive. Constraint preserved: continuous refinement without violating deterministic guarantees."
              />
            </motion.div>
          </motion.div>

          <motion.p
            className="body-copy mt-10 max-w-4xl"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Architecture invariant: deterministic core quality improves simulation
            confidence. Simulation confidence improves interface clarity and architecture decisions.
          </motion.p>
        </div>
      </section>
    </motion.main>
  );
}