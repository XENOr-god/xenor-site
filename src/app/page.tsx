import PageHero from "@/src/components/page-hero";
import SectionCard from "@/src/components/section-card";
import TopicGrid from "@/src/components/topic-grid";
import XenorSigil3D from "@/src/components/xenor-sigil-3d"; // Pastikan path ini benar!

export default function HomePage() {
  return (
    <main className="page-wrap">
      <section className="section-border flex min-h-[85vh] items-center">
        <div className="mx-auto w-full max-w-7xl px-6 py-16 md:px-10 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
          <div className="flex flex-col gap-6 lg:max-w-xl">
            <p className="eyebrow text-[#22D3EE]">Deterministic Protocol Systems</p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1] text-[#F5F7FA] font-['Space_Grotesk']">
                Deterministic protocol infrastructure, engineered for verifiable systems.
              </h1>
            <p className="body-copy text-2XL">
              XENØr is a systems-focused project exploring deterministic execution, simulation-driven design, and verifiable incentives.
            </p>
            
            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://github.com/XENOr-god"
                target="_blank"
                rel="noreferrer"
                className="primary-button"
              >
                View GitHub Profile
              </a>
              <a
                href="https://x.com/Xenorlabs"
                target="_blank"
                rel="noreferrer"
                className="secondary-button"
              >
                Follow on X
              </a>
            </div>
          </div>

          {/* KANAN: Visual 3D Sigil */}
          <div className="mt-16 w-full lg:mt-0">
             {/* Dibungkus div transparan agar memiliki batas ruang yang jelas */}
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              <XenorSigil3D />
            </div>
          </div>
        </div>
      </section>

      <section className="section-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="flex flex-wrap gap-3 mb-16">
            {[
              "Deterministic Execution",
              "Simulation-First Validation",
              "Modular Protocol Architecture",
              "Rust Core",
              "Protocol-native",
              "Verifiable systems",
              "Rust",
              "Audit-first discipline",
            ].map((item) => (
              <div key={item} className="pill">
                {item}
              </div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <SectionCard
              label="Visual grammar"
              title="Deterministic geometry"
              description="Low-noise architecture clarity"
            />
            <SectionCard
              label="3 Core modules"
              title="xenor-core, xenor-sim, xenor-web"
              description="Public stack boundaries across deterministic execution, simulation, and interface layers."
            />
            <SectionCard
              label="1 Deterministic engine"
              title="Simulation-first validation"
              description="Behavior analysis before external exposure."
            />
          </div>
        </div>
      </section>

      <section className="section-border bg-gradient-to-b from-transparent to-[#11131A]/20">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="eyebrow text-[#8B5CF6]">System Guarantees</p>
            <h2 className="section-title mt-4">
              Protocol qualities XENØR is designed to preserve
            </h2>
            <p className="body-copy mt-6 text-lg">
              These guarantees align architecture decisions with deterministic
              behavior, auditability, and simulation-first validation discipline.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <SectionCard
              title="Reproducible Behavior"
              description="Given identical inputs and state assumptions, execution outcomes should remain consistent."
            />
            <SectionCard
              title="Inspectable System Boundaries"
              description="Each module exposes clear responsibilities so protocol reasoning is auditable and maintainable."
            />
            <SectionCard
              title="Validation Before Exposure"
              description="Critical assumptions are exercised in simulation before they become public-facing decisions."
            />
            <SectionCard
              title="Composable Module Surface"
              description="Core execution, simulation, and interface layers can evolve independently with explicit contracts."
            />
          </div>
        </div>
      </section>
      <section className="section-border">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="max-w-3xl">
            <p className="eyebrow text-[#22D3EE]">Engineering Workflow</p>
            <h2 className="section-title mt-4">
              Research-to-release operating sequence
            </h2>
            <p className="body-copy mt-6 text-lg">
              XENØR follows a strict engineering loop so each release reflects
              deterministic reasoning and simulation evidence.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <SectionCard
              label="01"
              title="Model Rules"
              description="Define protocol invariants, transition constraints, and expected outcomes."
            />
            <SectionCard
              label="02"
              title="Simulate & Stress"
              description="Run controlled scenarios and edge-case sweeps to pressure-test assumptions."
            />
            <SectionCard
              label="03"
              title="Refine System"
              description="Feed simulation findings back into module boundaries and interfaces."
            />
            <SectionCard
              label="04"
              title="Publish State"
              description="Expose current state through interfaces, repositories, and channels."
            />
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-10">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow text-[#8B5CF6]">Topic Index</p>
            <h2 className="section-title mt-4 max-w-3xl">
              Dedicated pages for each project surface
            </h2>
            <p className="body-copy mt-6 max-w-2xl">
              Navigate directly to the topic you need without scanning a long
              single-page layout.
            </p>
          </div>

          <div className="mt-16">
            <TopicGrid />
          </div>
        </div>
      </section>

    </main>
  );
}