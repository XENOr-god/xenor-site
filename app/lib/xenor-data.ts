export const contractAddress = "SOON";
export const defaultDexScreenerPairAddress = "";
export const defaultDexScreenerUrl = "https://dexscreener.com";

export const tags = [
  "Deterministic Execution",
  "Simulation-First Validation",
  "Modular Protocol Architecture",
  "Rust Core",
] as const;

export const credibilityStrip = [
  "Protocol-native",
  "Verifiable systems",
  "Rust",
  "Audit-first discipline",
] as const;

export const summaryMetrics = [
  {
    value: "3",
    label: "Core modules",
    note: "Deterministic stack components",
    modules: ["xenor-core", "xenor-sim", "xenor-site"],
  },
  {
    value: "1",
    label: "Deterministic engine",
    note: "Protocol logic grounded in reproducibility",
  },
  {
    value: "Simulation-first",
    label: "Validation model",
    note: "Behavior analysis before external exposure",
  },
  {
    value: "Research-driven",
    label: "Engineering mode",
    note: "Architecture informed by iterative experiments",
  },
] as const;

export const pillars = [
  {
    title: "Deterministic Logic",
    description:
      "Execution paths are designed to remain predictable, inspectable, and reproducible across runs.",
  },
  {
    title: "Simulation First",
    description:
      "Hypotheses are validated in controlled environments before being promoted to broader system layers.",
  },
  {
    title: "Modular Architecture",
    description:
      "Core logic, validation tooling, and public interfaces are separated to preserve clarity and maintainability.",
  },
  {
    title: "Research-Driven Engineering",
    description:
      "Design choices are grounded in iterative analysis, protocol reasoning, and measurable system behavior.",
  },
] as const;

export const systemGuarantees = [
  {
    title: "Reproducible Behavior",
    detail:
      "Given identical inputs and state assumptions, execution outcomes should remain consistent.",
  },
  {
    title: "Inspectable System Boundaries",
    detail:
      "Each module exposes clear responsibilities so protocol reasoning is auditable and maintainable.",
  },
  {
    title: "Validation Before Exposure",
    detail:
      "Critical assumptions are exercised in simulation before they become public-facing decisions.",
  },
  {
    title: "Composable Module Surface",
    detail:
      "Core execution, simulation, and interface layers can evolve independently with explicit contracts.",
  },
] as const;

export const visionValidationLoop = [
  {
    stage: "01",
    title: "Specify Deterministic Invariants",
    detail:
      "Define non-negotiable transition rules and boundary assumptions before implementation work proceeds.",
  },
  {
    stage: "02",
    title: "Simulate and Measure",
    detail:
      "Exercise edge conditions in controlled simulation runs and compare outcomes against expected invariants.",
  },
  {
    stage: "03",
    title: "Promote Constrained Interfaces",
    detail:
      "Publish only interfaces that preserve determinism and remain inspectable across module boundaries.",
  },
] as const;

export const visionConstraintMap = [
  {
    principle: "Deterministic Logic",
    constraint: "No hidden branch outcomes",
    evidence:
      "Execution rules in xenor-core remain reproducible under equivalent state assumptions.",
  },
  {
    principle: "Simulation First",
    constraint: "Validation precedes public rollout",
    evidence:
      "Scenario sweeps and stress runs in xenor-sim gate architecture updates and release decisions.",
  },
  {
    principle: "Modular Architecture",
    constraint: "Explicit module contracts",
    evidence:
      "Core, simulation, and web layers expose bounded responsibilities with traceable interfaces.",
  },
  {
    principle: "Research-Driven Engineering",
    constraint: "Claims require measurable support",
    evidence:
      "Design changes are accepted only when supported by repeatable observations and documented reasoning.",
  },
] as const;

export const engineeringWorkflow = [
  {
    step: "01",
    title: "Model Deterministic Rules",
    detail:
      "Define protocol invariants, transition constraints, and expected deterministic outcomes.",
  },
  {
    step: "02",
    title: "Simulate and Stress",
    detail:
      "Run controlled scenarios and edge-case sweeps in xenor-sim to pressure-test assumptions.",
  },
  {
    step: "03",
    title: "Refine Architecture",
    detail:
      "Feed simulation findings back into module boundaries and protocol interfaces.",
  },
  {
    step: "04",
    title: "Publish and Communicate",
    detail:
      "Expose current state through xenor-site, repositories, and official public channels.",
  },
] as const;

export const repositories = [
  {
    name: "xenor-core",
    href: "https://github.com/XENOr-god/xenor-core",
    role: "Deterministic execution engine",
    description:
      "Rust core for deterministic execution, invariant enforcement, and foundational protocol behavior.",
    focus: "Execution layer",
    layer: "Core layer",
    language: "Rust",
    status: "Active module",
  },
  {
    name: "xenor-sim",
    href: "https://github.com/XENOr-god/xenor-sim",
    role: "Simulation and validation environment",
    description:
      "Simulation environment for scenario testing, validation loops, and adversarial behavior analysis.",
    focus: "Validation layer",
    layer: "Validation layer",
    language: "Rust",
    status: "Validation track",
  },
  {
    name: "xenor-site",
    href: "https://github.com/XENOr-god/xenor-site",
    role: "Public site and interface surface",
    description:
      "Next.js public surface that publishes architecture, repository context, contract reference, and canonical routes.",
    focus: "Interface layer",
    layer: "Site layer",
    language: "TypeScript",
    status: "Public site",
  },
] as const;

export const repositoryBoundaries = [
  {
    title: "Execution boundary",
    detail:
      "Deterministic state logic is isolated in a dedicated core so behavior remains inspectable and reproducible.",
  },
  {
    title: "Validation boundary",
    detail:
      "Simulation environments test edge cases and assumptions before broader public representation.",
  },
  {
    title: "Site boundary",
    detail:
      "The public site remains a dedicated interface layer so communication and verification do not blur core and simulation responsibilities.",
  },
] as const;

export const repositoryGovernance = [
  {
    title: "Ownership model",
    detail:
      "Each repository holds a focused responsibility boundary to reduce coupling and preserve architectural traceability.",
  },
  {
    title: "Validation model",
    detail:
      "Deterministic engine behavior is exercised in simulation before assumptions move toward broader public-facing implementation.",
  },
  {
    title: "Public clarity",
    detail:
      "Explicit repository boundaries help contributors map code, responsibility, and architecture without ambiguity.",
  },
] as const;

// Add open-source collaborators here as GitHub access expands.
export const repositoryCollaborators = [
  {
    username: "XENOr-god",
    profileUrl: "https://github.com/XENOr-god",
    role: "Project owner",
    influenceLabel: "Foundational",
    impactScore: 100,
    summary:
      "Defines repository strategy, architecture direction, merge discipline, and final release approval across the XENØR stack.",
    areas: ["xenor-core", "xenor-sim", "xenor-site"],
  },
  {
    username: "xvrique",
    profileUrl: "https://github.com/xvrique",
    role: "Site contributor",
    influenceLabel: "Contributing",
    impactScore: 18,
    summary:
      "Visible on the xenor-site contributor graph with an early contribution to the public site surface and limited influence on wider stack decisions.",
    areas: ["xenor-site"],
  },
] as const;

export const repositoryQuickIndex = [
  {
    name: "xenor-core",
    descriptor: "execution engine",
    href: "https://github.com/XENOr-god/xenor-core",
  },
  {
    name: "xenor-sim",
    descriptor: "simulation environment",
    href: "https://github.com/XENOr-god/xenor-sim",
  },
  {
    name: "xenor-site",
    descriptor: "site interface",
    href: "https://github.com/XENOr-god/xenor-site",
  },
] as const;

export const architectureFlow = [
  {
    id: "01",
    title: "xenor-core",
    track: "Compute layer",
    role: "Deterministic execution layer",
    description:
      "Implements deterministic logic and protocol mechanics as the computational base.",
    output: "Deterministic state transitions",
  },
  {
    id: "02",
    title: "xenor-sim",
    track: "Validation layer",
    role: "Simulation and validation layer",
    description:
      "Stress-tests assumptions, edge cases, and system-level outcomes under controlled conditions.",
    output: "Validated behavior profiles",
  },
  {
    id: "03",
    title: "xenor-site",
    track: "Interface layer",
    role: "Public surface layer",
    description:
      "Publishes architecture, repositories, contract reference, and official routes through a clear public surface.",
    output: "Public release surface",
  },
] as const;

export const architectureHandoffs = [
  {
    id: "A",
    title: "xenor-core to xenor-sim",
    handoff:
      "Deterministic transitions, boundary assumptions, and invariant definitions.",
    reason:
      "Simulation requires canonical execution behavior to evaluate edge conditions with reliable baselines.",
    constraint: "Reproducibility under equivalent state and input assumptions.",
  },
  {
    id: "B",
    title: "xenor-sim to xenor-site",
    handoff:
      "Validated behavior profiles, failure envelopes, and architecture interpretation.",
    reason:
      "Site-level communication must be grounded in observed simulation outcomes, not speculative descriptions.",
    constraint: "Evidence-backed communication boundaries.",
  },
  {
    id: "C",
    title: "Feedback loop",
    handoff:
      "Operational findings, public scrutiny, and unresolved edge-case signals.",
    reason:
      "New observations are fed back into simulation plans and core assumptions to keep architecture adaptive.",
    constraint: "Continuous refinement without violating deterministic guarantees.",
  },
] as const;

export const architectureLegend = [
  { key: "Execution", detail: "Deterministic compute surface" },
  { key: "Validation", detail: "Simulation and stress evaluation" },
  { key: "Communication", detail: "Public surface and technical signaling" },
] as const;

export const readinessChecklist = [
  "Finalize production contract address",
  "Publish deployment network and verification links",
  "Document release conditions and version identifier",
  "Sync announcement copy with GitHub and X account",
] as const;

export const marketReadinessChecks = [
  "Canonical contract published",
  "Explorer verification available",
  "Primary pair indexed",
  "DexScreener route confirmed",
  "Official announcement synced",
  "Trading surface verified",
] as const;

export const communicationPolicy = [
  "GitHub is the canonical source of implementation details and technical changes.",
  "The X account publishes release signaling and public progress summaries.",
  "Architecture claims should map directly to repository artifacts.",
] as const;

export const channels = [
  {
    title: "GitHub Profile",
    href: "https://github.com/XENOr-god",
    description:
      "Primary source for repositories, implementation history, and architecture artifacts.",
  },
  {
    title: "xenor-core",
    href: "https://github.com/XENOr-god/xenor-core",
    description:
      "Deterministic core module and protocol foundation code.",
  },
  {
    title: "xenor-sim",
    href: "https://github.com/XENOr-god/xenor-sim",
    description:
      "Simulation module for validation workflows and controlled analysis.",
  },
  {
    title: "xenor-site",
    href: "https://github.com/XENOr-god/xenor-site",
    description:
      "Official public surface for architecture, contract reference, and canonical routes.",
  },
  {
    title: "X Account",
    href: "https://x.com/Xenorlabs",
    description:
      "Official channel for project updates, release notes, and public communication.",
  },
  {
    title: "X Community",
    href: "https://x.com/i/communities/2031281159112634725",
    description:
      "Official X community route for discussion, coordination, and broader holder visibility.",
  },
] as const;

export const topicPages = [
  {
    title: "Vision",
    href: "/vision",
    description:
      "Core principles, system guarantees, and engineering direction of XENØR.",
  },
  {
    title: "Architecture",
    href: "/architecture",
    description:
      "How xenor-core, xenor-sim, and xenor-site compose the XENØR stack.",
  },
  {
    title: "Repositories",
    href: "/repositories",
    description:
      "Repository boundaries, module ownership, and codebase scope.",
  },
  {
    title: "Contract",
    href: "/contract",
    description:
      "Canonical contract reference, verification routes, and publication status.",
  },
  {
    title: "Presence",
    href: "/presence",
    description:
      "Official channels and communication policy for public updates.",
  },
] as const;
