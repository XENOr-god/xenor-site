"use client";

import { motion, Variants } from "framer-motion";
import PageHero from "@/src/components/page-hero";
import SectionCard from "@/src/components/section-card";

// Konfigurasi animasi container untuk efek berurutan (stagger)
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Jeda kemunculan antar card
    },
  },
};

// Konfigurasi animasi untuk masing-masing item (card)
const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
};

export default function VisionPage() {
  return (
    <motion.main
      className="page-wrap"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <PageHero
        eyebrow="Vision"
        title="XENØr vision and protocol engineering principles"
        description="XENØr treats deterministic protocol infrastructure as an engineering stack: reproducible execution, simulation-first validation, and explicit modular boundaries."
      />

      {/* SECTION 1: Core Principles */}
      <section className="section-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.div
            className="grid gap-6 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Deterministic Logic"
                description="Execution paths are designed to remain predictable, inspectable, and reproducible across runs."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Simulation First"
                description="Hypotheses are validated in controlled environments before being promoted to broader system layers."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Modular Architecture"
                description="Core logic, validation tooling, and public interfaces are separated to preserve clarity and maintainability."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Research-Driven Engineering"
                description="Design choices are grounded in iterative analysis, protocol reasoning, and measurable system behavior."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Operational Model */}
      <section className="section-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">Operational Model</p>
            <h2 className="section-title mt-4">How vision is continuously tested</h2>
            <p className="body-copy mt-6 max-w-3xl">
              Vision is treated as an operating loop: define constraints, validate
              behavior, and expose only surfaces that preserve deterministic guarantees.
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
                label="Stage 01"
                title="Specify Deterministic Invariants"
                description="Define non-negotiable transition rules and boundary assumptions before implementation work proceeds."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                label="Stage 02"
                title="Simulate and Measure"
                description="Exercise edge conditions in controlled simulation runs and compare outcomes against expected invariants."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                label="Stage 03"
                title="Promote Constrained Interfaces"
                description="Publish only interfaces that preserve determinism and remain inspectable across module boundaries."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 3: Constraint Mapping */}
      <section className="section-border">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">Constraint Mapping</p>
          </motion.div>
          
          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Deterministic Logic"
                description="Constraint: No hidden branch outcomes. Evidence: Execution rules in xenor-core remain reproducible under equivalent state assumptions."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Simulation First"
                description="Constraint: Validation precedes public rollout. Evidence: Scenario sweeps and stress runs in xenor-sim gate architecture updates and release decisions."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Modular Architecture"
                description="Constraint: Explicit module contracts. Evidence: Core, simulation, and web layers expose bounded responsibilities with traceable interfaces."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Research-Driven Engineering"
                description="Constraint: Claims require measurable support. Evidence: Design changes are accepted only when supported by repeatable observations and documented reasoning."
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 4: Design Guarantees */}
      <section>
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow">Design Guarantees</p>
            <h2 className="section-title mt-4">
              How principles become system constraints
            </h2>
            <p className="body-copy mt-6 max-w-3xl">
              Principles are enforced as architecture and validation constraints,
              not maintained as narrative statements.
            </p>
          </motion.div>

          <motion.div
            className="mt-10 grid gap-6 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Reproducible Behavior"
                description="Given identical inputs and state assumptions, execution outcomes should remain consistent."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Inspectable System Boundaries"
                description="Each module exposes clear responsibilities so protocol reasoning is auditable and maintainable."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Validation Before Exposure"
                description="Critical assumptions are exercised in simulation before they become public-facing decisions."
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <SectionCard
                title="Composable Module Surface"
                description="Core execution, simulation, and interface layers can evolve independently with explicit contracts."
              />
            </motion.div>
          </motion.div>

          <motion.p
            className="body-copy mt-10 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Vision summary: deterministic execution defines protocol confidence,
            simulation validates claims, and modular design keeps the stack adaptable
            under research pressure.
          </motion.p>
        </div>
      </section>
    </motion.main>
  );
}