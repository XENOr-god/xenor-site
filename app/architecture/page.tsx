import type { Metadata } from "next";
import {
  GaeaBackground,
  GaeaSiteFooter,
  GaeaSiteHeader,
} from "../components/gaea-site-chrome";
import {
  GaeaGhostSigil,
  GaeaSubpageManifesto,
} from "../components/gaea-subpage-manifesto";
import {
  getLocaleFromSearchParams,
  type SearchParamsLike,
} from "../lib/i18n";

export const metadata: Metadata = {
  title: "Architecture",
  description:
    "XENØR architecture: deterministic execution, validation, and public surface layers.",
};

const architectureCopy = {
  en: {
    diagramNodes: [
      { id: "01", module: "xenor-core", role: "deterministic execution", x: 84 },
      { id: "02", module: "xenor-sim", role: "simulation + validation", x: 364 },
      { id: "03", module: "xenor-site", role: "public surface", x: 644 },
    ],
    diagram: {
      title: "XENØR architecture flow diagram",
      description:
        "Flow from xenor-core to xenor-sim to xenor-site with a feedback loop from public and simulation findings back to core assumptions.",
      feedback: "feedback constraints",
    },
    manifesto: {
      kicker: "Canonical Architecture",
      title: ["Protocol logic moves", "through explicit", "surfaces."],
      summary:
        "XENØR keeps execution, validation, and public release intentionally separated. The goal is clearer reasoning, bounded responsibility, and inspectable handoff discipline across every module boundary.",
      meta: [
        "execution layer",
        "validation layer",
        "public surface",
        "explicit handoffs",
      ],
      actions: {
        primary: "Inspect repositories",
        secondary: "Review contract surface",
      },
      asideKicker: "Surface index",
      asideRows: [
        {
          id: "01",
          title: "xenor-core",
          role: "Deterministic execution layer",
          output: "Deterministic state transitions",
        },
        {
          id: "02",
          title: "xenor-sim",
          role: "Simulation and validation layer",
          output: "Validated behavior profiles",
        },
        {
          id: "03",
          title: "xenor-site",
          role: "Public surface layer",
          output: "Public release surface",
        },
      ],
    },
    flow: {
      kicker: "Flow Model",
      title: "Execution enters simulation before anything reaches the public surface.",
      description:
        "The architecture is not a blended stack. Each layer owns a specific responsibility boundary, and feedback only returns through explicit constraints.",
      panelKicker: "Architecture Diagram",
      panelDescription:
        "The flow shows how core execution feeds simulation, how simulation shapes the public surface, and how feedback returns to system assumptions.",
      legend: [
        { key: "Execution", detail: "Deterministic compute surface" },
        { key: "Validation", detail: "Simulation and stress evaluation" },
        { key: "Communication", detail: "Public surface and technical signaling" },
      ],
    },
    contracts: {
      kicker: "Interface Contracts",
      title: "Cross-layer handoff rules stay explicit and inspectable.",
      description:
        "Each handoff specifies what is transferred, why it matters, and which invariant must remain intact.",
      contractLabel: "Contract",
      handedOff: "Handed off",
      whyItMatters: "Why it matters",
      preserved: "Constraint preserved",
      rows: [
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
      ],
      invariant: {
        label: "Architecture Invariant",
        note:
          "Deterministic core quality strengthens validation confidence. Validation confidence sharpens the public surface and the release decisions that follow.",
      },
    },
  },
  id: {
    diagramNodes: [
      { id: "01", module: "xenor-core", role: "eksekusi deterministik", x: 84 },
      { id: "02", module: "xenor-sim", role: "simulasi + validasi", x: 364 },
      { id: "03", module: "xenor-site", role: "permukaan publik", x: 644 },
    ],
    diagram: {
      title: "Diagram alur arsitektur XENØR",
      description:
        "Alur dari xenor-core ke xenor-sim lalu xenor-site dengan loop feedback dari temuan publik dan simulation kembali ke asumsi inti.",
      feedback: "constraint feedback",
    },
    manifesto: {
      kicker: "Arsitektur Kanonik",
      title: ["Logika protokol bergerak", "melalui permukaan yang", "eksplisit."],
      summary:
        "XENØR menjaga execution, validation, dan rilis publik tetap terpisah secara sengaja. Tujuannya adalah penalaran yang lebih jelas, tanggung jawab yang terbatas, dan disiplin handoff yang bisa diinspeksi di setiap batas modul.",
      meta: [
        "lapisan eksekusi",
        "lapisan validasi",
        "permukaan publik",
        "handoff eksplisit",
      ],
      actions: {
        primary: "Lihat repositori",
        secondary: "Tinjau permukaan kontrak",
      },
      asideKicker: "Indeks permukaan",
      asideRows: [
        {
          id: "01",
          title: "xenor-core",
          role: "Lapisan eksekusi deterministik",
          output: "Transisi state deterministik",
        },
        {
          id: "02",
          title: "xenor-sim",
          role: "Lapisan simulasi dan validasi",
          output: "Profil perilaku tervalidasi",
        },
        {
          id: "03",
          title: "xenor-site",
          role: "Lapisan permukaan publik",
          output: "Permukaan publik siap rilis",
        },
      ],
    },
    flow: {
      kicker: "Model Alur",
      title: "Eksekusi masuk ke simulation sebelum apa pun mencapai permukaan publik.",
      description:
        "Arsitektur ini bukan stack yang bercampur. Setiap lapisan memiliki batas tanggung jawab yang spesifik, dan feedback hanya kembali melalui constraint yang eksplisit.",
      panelKicker: "Diagram Arsitektur",
      panelDescription:
        "Alur ini menunjukkan bagaimana eksekusi inti memberi masukan ke simulation, bagaimana simulation membentuk permukaan publik, dan bagaimana feedback kembali ke asumsi sistem.",
      legend: [
        { key: "Eksekusi", detail: "Permukaan komputasi deterministik" },
        { key: "Validasi", detail: "Evaluasi simulasi dan stress" },
        { key: "Komunikasi", detail: "Permukaan publik dan sinyal teknis" },
      ],
    },
    contracts: {
      kicker: "Kontrak Antarmuka",
      title: "Aturan handoff lintas lapisan tetap eksplisit dan bisa diinspeksi.",
      description:
        "Setiap handoff menjelaskan apa yang ditransfer, kenapa itu penting, dan invarians mana yang harus tetap utuh.",
      contractLabel: "Kontrak",
      handedOff: "Yang diserahkan",
      whyItMatters: "Kenapa penting",
      preserved: "Constraint yang dijaga",
      rows: [
        {
          id: "A",
          title: "xenor-core ke xenor-sim",
          handoff:
            "Transisi deterministik, asumsi batas, dan definisi invarians.",
          reason:
            "Simulation membutuhkan perilaku eksekusi kanonik untuk mengevaluasi kondisi tepi dengan baseline yang andal.",
          constraint: "Reprodusibilitas di bawah asumsi state dan input yang setara.",
        },
        {
          id: "B",
          title: "xenor-sim ke xenor-site",
          handoff:
            "Profil perilaku tervalidasi, batas kegagalan, dan interpretasi arsitektur.",
          reason:
            "Komunikasi level site harus bertumpu pada hasil simulation yang teramati, bukan deskripsi spekulatif.",
          constraint: "Batas komunikasi berbasis bukti.",
        },
        {
          id: "C",
          title: "Loop feedback",
          handoff:
            "Temuan operasional, pengawasan publik, dan sinyal edge-case yang belum selesai.",
          reason:
            "Observasi baru dimasukkan kembali ke rencana simulation dan asumsi inti agar arsitektur tetap adaptif.",
          constraint: "Penyempurnaan berkelanjutan tanpa melanggar jaminan deterministik.",
        },
      ],
      invariant: {
        label: "Invarians Arsitektur",
        note:
          "Kualitas inti yang deterministik memperkuat kepercayaan validasi. Kepercayaan validasi mempertajam permukaan publik dan keputusan rilis yang mengikutinya.",
      },
    },
  },
  ja: {
    diagramNodes: [
      { id: "01", module: "xenor-core", role: "deterministic execution", x: 84 },
      { id: "02", module: "xenor-sim", role: "simulation + validation", x: 364 },
      { id: "03", module: "xenor-site", role: "public surface", x: 644 },
    ],
    diagram: {
      title: "XENØR architecture flow diagram",
      description:
        "xenor-core から xenor-sim、xenor-site へ進む流れと、公開面および simulation の発見がコア前提に戻る feedback loop。",
      feedback: "feedback constraints",
    },
    manifesto: {
      kicker: "Canonical Architecture",
      title: ["プロトコルロジックは", "明示的なサーフェスを", "通って進む。"],
      summary:
        "XENØR は execution、validation、公開リリースを意図的に分離します。目的は、より明確な推論、限定された責任、そして各モジュール境界における検査可能な handoff 規律です。",
      meta: [
        "execution layer",
        "validation layer",
        "public surface",
        "explicit handoffs",
      ],
      actions: {
        primary: "リポジトリを見る",
        secondary: "コントラクト面を見る",
      },
      asideKicker: "Surface index",
      asideRows: [
        {
          id: "01",
          title: "xenor-core",
          role: "Deterministic execution layer",
          output: "Deterministic state transitions",
        },
        {
          id: "02",
          title: "xenor-sim",
          role: "Simulation and validation layer",
          output: "Validated behavior profiles",
        },
        {
          id: "03",
          title: "xenor-site",
          role: "Public surface layer",
          output: "Public release surface",
        },
      ],
    },
    flow: {
      kicker: "Flow Model",
      title: "何かが公開面に達する前に、execution は simulation に入る。",
      description:
        "この architecture は混合スタックではありません。各層は固有の責任境界を持ち、feedback は明示的な constraint を通してのみ戻ります。",
      panelKicker: "Architecture Diagram",
      panelDescription:
        "この flow は、コア execution が simulation に入り、simulation が公開面を形作り、feedback がシステム前提へ戻る様子を示します。",
      legend: [
        { key: "Execution", detail: "Deterministic compute surface" },
        { key: "Validation", detail: "Simulation and stress evaluation" },
        { key: "Communication", detail: "Public surface and technical signaling" },
      ],
    },
    contracts: {
      kicker: "Interface Contracts",
      title: "層をまたぐ handoff rule は、明示的で検査可能なまま保たれる。",
      description:
        "各 handoff は、何が渡されるか、なぜ重要か、どの不変条件を守るべきかを示します。",
      contractLabel: "Contract",
      handedOff: "Handed off",
      whyItMatters: "Why it matters",
      preserved: "Constraint preserved",
      rows: [
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
      ],
      invariant: {
        label: "Architecture Invariant",
        note:
          "Deterministic core quality strengthens validation confidence. Validation confidence sharpens the public surface and the release decisions that follow.",
      },
    },
  },
  zh: {
    diagramNodes: [
      { id: "01", module: "xenor-core", role: "决定性执行", x: 84 },
      { id: "02", module: "xenor-sim", role: "模拟 + 验证", x: 364 },
      { id: "03", module: "xenor-site", role: "公开界面", x: 644 },
    ],
    diagram: {
      title: "XENØR 架构流向图",
      description:
        "从 xenor-core 到 xenor-sim 再到 xenor-site 的流向，以及来自公开界面与 simulation 发现回到核心假设的反馈回路。",
      feedback: "反馈约束",
    },
    manifesto: {
      kicker: "规范架构",
      title: ["协议逻辑", "通过明确的", "界面流动。"],
      summary:
        "XENØR 有意将 execution、validation 与公开发布分离。目标是更清晰的推理、受限的职责，以及跨越每个模块边界的可审查 handoff 纪律。",
      meta: [
        "执行层",
        "验证层",
        "公开界面",
        "明确交接",
      ],
      actions: {
        primary: "查看代码库",
        secondary: "查看合约界面",
      },
      asideKicker: "界面索引",
      asideRows: [
        {
          id: "01",
          title: "xenor-core",
          role: "决定性执行层",
          output: "决定性状态迁移",
        },
        {
          id: "02",
          title: "xenor-sim",
          role: "模拟与验证层",
          output: "已验证的行为画像",
        },
        {
          id: "03",
          title: "xenor-site",
          role: "公开界面层",
          output: "公开发布界面",
        },
      ],
    },
    flow: {
      kicker: "流向模型",
      title: "在任何内容进入公开界面之前，execution 先进入 simulation。",
      description:
        "该架构不是混合栈。每一层都拥有明确职责边界，反馈也只会通过明确约束回流。",
      panelKicker: "架构图",
      panelDescription:
        "该流程展示核心 execution 如何进入 simulation，simulation 如何塑造公开界面，以及反馈如何返回系统假设。",
      legend: [
        { key: "执行", detail: "决定性计算界面" },
        { key: "验证", detail: "模拟与压力评估" },
        { key: "沟通", detail: "公开界面与技术信号" },
      ],
    },
    contracts: {
      kicker: "接口契约",
      title: "跨层 handoff 规则保持明确且可审查。",
      description:
        "每一次 handoff 都说明传递了什么、为什么重要，以及必须保持什么不变量。",
      contractLabel: "契约",
      handedOff: "交接内容",
      whyItMatters: "重要原因",
      preserved: "保持的约束",
      rows: [
        {
          id: "A",
          title: "xenor-core 到 xenor-sim",
          handoff:
            "决定性迁移、边界假设与不变量定义。",
          reason:
            "simulation 需要规范 execution 行为作为可靠基线，以评估边界条件。",
          constraint: "在等价 state 与输入假设下保持可复现。",
        },
        {
          id: "B",
          title: "xenor-sim 到 xenor-site",
          handoff:
            "已验证的行为画像、失败边界与架构解释。",
          reason:
            "站点层沟通必须基于已观察的 simulation 结果，而不是推测性描述。",
          constraint: "基于证据的沟通边界。",
        },
        {
          id: "C",
          title: "反馈回路",
          handoff:
            "运行发现、公众审视与未解决的边界信号。",
          reason:
            "新的观察会回流到 simulation 计划与核心假设中，以保持架构适应性。",
          constraint: "在不破坏决定性保障的前提下持续改进。",
        },
      ],
      invariant: {
        label: "架构不变量",
        note:
          "决定性核心质量增强验证信心，验证信心又强化公开界面与后续发布决策。",
      },
    },
  },
} as const;

type ArchitecturePageProps = {
  searchParams?: Promise<SearchParamsLike>;
};

function ArchitectureSignalDiagram({
  title,
  description,
  nodes,
  feedbackLabel,
}: {
  title: string;
  description: string;
  nodes: ReadonlyArray<{ id: string; module: string; role: string; x: number }>;
  feedbackLabel: string;
}) {
  return (
    <div className="architecture-diagram-shell">
      <svg
        className="architecture-diagram-svg"
        viewBox="0 0 980 330"
        role="img"
        aria-labelledby="architecture-diagram-title architecture-diagram-desc"
      >
        <title id="architecture-diagram-title">{title}</title>
        <desc id="architecture-diagram-desc">{description}</desc>

        <g className="architecture-diagram-grid">
          {Array.from({ length: 12 }).map((_, index) => (
            <line
              key={`h-${index}`}
              x1="40"
              y1={42 + index * 22}
              x2="940"
              y2={42 + index * 22}
            />
          ))}
          {Array.from({ length: 18 }).map((_, index) => (
            <line
              key={`v-${index}`}
              x1={40 + index * 50}
              y1="36"
              x2={40 + index * 50}
              y2="300"
            />
          ))}
        </g>

        <g className="architecture-diagram-links">
          <line x1="318" y1="145" x2="364" y2="145" />
          <line x1="598" y1="145" x2="644" y2="145" />
        </g>

        <g className="architecture-diagram-feedback">
          <path d="M 742 212 C 656 280, 324 280, 238 212" />
        </g>

        <g className="architecture-diagram-nodes">
          {nodes.map((node) => (
            <g key={node.module} transform={`translate(${node.x}, 88)`}>
              <rect width="236" height="118" rx="14" />
              <text x="18" y="28" className="architecture-diagram-node-id">
                {node.id}
              </text>
              <text x="18" y="56" className="architecture-diagram-node-title">
                {node.module}
              </text>
              <text x="18" y="82" className="architecture-diagram-node-role">
                {node.role}
              </text>
            </g>
          ))}
        </g>

        <text x="742" y="238" className="architecture-diagram-feedback-label">
          {feedbackLabel}
        </text>
      </svg>
    </div>
  );
}

export default async function ArchitecturePage({
  searchParams,
}: ArchitecturePageProps) {
  const locale = getLocaleFromSearchParams(
    searchParams ? await searchParams : undefined
  );
  const copy = architectureCopy[locale];

  return (
    <main className="gaea-home gaea-subpage architecture-page">
      <GaeaBackground />
      <GaeaSiteHeader locale={locale} />

      <GaeaSubpageManifesto
        kicker={copy.manifesto.kicker}
        title={
          <>
            {copy.manifesto.title[0]}
            <br />
            {copy.manifesto.title[1]}
            <br />
            {copy.manifesto.title[2]}
          </>
        }
        summary={<>{copy.manifesto.summary}</>}
        meta={[...copy.manifesto.meta]}
        actions={[
          {
            label: copy.manifesto.actions.primary,
            href: "/repositories",
            variant: "primary",
          },
          {
            label: copy.manifesto.actions.secondary,
            href: "/contract",
            variant: "command",
          },
        ]}
        locale={locale}
        aside={
          <div className="gaea-subpage-aside-panel gaea-subpage-aside-panel-sigil architecture-manifesto-panel">
            <GaeaGhostSigil className="gaea-subpage-ghost-sigil" />
            <p className="gaea-subpage-aside-kicker">{copy.manifesto.asideKicker}</p>
            <div className="gaea-subpage-aside-list">
              {copy.manifesto.asideRows.map((item) => (
                <article key={item.title} className="gaea-subpage-aside-row">
                  <span>{item.id}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.role}</p>
                    <em>{item.output}</em>
                  </div>
                </article>
              ))}
            </div>
          </div>
        }
      />

      <section className="section section-animate architecture-diagram-section gaea-subpage-anchor">
        <div className="container gaea-architecture-diagram-grid">
          <div className="section-head architecture-head gaea-section-head-tight">
            <p className="section-kicker">{copy.flow.kicker}</p>
            <h2>{copy.flow.title}</h2>
            <p className="architecture-subcopy">{copy.flow.description}</p>
          </div>

          <article className="panel-card architecture-diagram-panel">
            <div className="architecture-diagram-head">
              <p className="architecture-diagram-kicker">{copy.flow.panelKicker}</p>
              <p className="architecture-diagram-subcopy">
                {copy.flow.panelDescription}
              </p>
            </div>

            <ArchitectureSignalDiagram
              title={copy.diagram.title}
              description={copy.diagram.description}
              nodes={copy.diagramNodes}
              feedbackLabel={copy.diagram.feedback}
            />

            <div className="architecture-legend">
              {copy.flow.legend.map((item) => (
                <div key={item.key} className="architecture-legend-item">
                  <p>{item.key}</p>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="section section-soft section-animate compact-top architecture-contracts-section">
        <div className="container">
          <div className="section-head architecture-contracts-head gaea-section-head-tight">
            <p className="section-kicker">{copy.contracts.kicker}</p>
            <h2>{copy.contracts.title}</h2>
            <p className="architecture-contracts-subcopy">
              {copy.contracts.description}
            </p>
          </div>

          <div className="architecture-contract-list">
            {copy.contracts.rows.map((item) => (
              <article key={item.id} className="architecture-contract-row">
                <p className="architecture-contract-id">
                  {copy.contracts.contractLabel} {item.id}
                </p>
                <div className="architecture-contract-main">
                  <h3>{item.title}</h3>
                  <p>
                    <span>{copy.contracts.handedOff}</span>
                    {item.handoff}
                  </p>
                  <p>
                    <span>{copy.contracts.whyItMatters}</span>
                    {item.reason}
                  </p>
                  <p>
                    <span>{copy.contracts.preserved}</span>
                    {item.constraint}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <p className="architecture-note architecture-invariant-note">
            <span>{copy.contracts.invariant.label}</span>
            {copy.contracts.invariant.note}
          </p>
        </div>
      </section>

      <GaeaSiteFooter locale={locale} />
    </main>
  );
}
