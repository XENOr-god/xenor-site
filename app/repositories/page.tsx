import type { Metadata } from "next";
import {
  GaeaBackground,
  GaeaSiteFooter,
  GaeaSiteHeader,
} from "../components/gaea-site-chrome";
import { GaeaSubpageManifesto } from "../components/gaea-subpage-manifesto";
import {
  getLocaleFromSearchParams,
  type SearchParamsLike,
} from "../lib/i18n";

export const metadata: Metadata = {
  title: "Repositories",
  description:
    "XENØR repositories overview: xenor-core, xenor-sim, and xenor-site with explicit module responsibilities.",
};

const repositoryCopy = {
  en: {
    manifesto: {
      kicker: "Repositories",
      title: [
        "Public code boundaries",
        "stay inspectable when",
        "repositories map to real layers.",
      ],
      summary:
        "The XENØR codebase is organized into explicit repositories for execution, validation, and public surface work. Repository structure is part of release discipline here, not just internal organization.",
      meta: [
        "core execution",
        "simulation validation",
        "public site interface",
        "repository stewardship",
      ],
      actions: {
        primary: "Open GitHub",
        secondary: "Inspect architecture",
      },
      asideKicker: "Boundary frame",
      asideRows: [
        {
          id: "01",
          title: "One repository, one surface",
          detail:
            "Execution, simulation, and public interface remain separate ownership zones.",
        },
        {
          id: "02",
          title: "Published scope stays explicit",
          detail:
            "Each repository exposes a narrow public responsibility instead of a blended stack surface.",
        },
        {
          id: "03",
          title: "Review stays local to the boundary",
          detail:
            "Repository structure keeps code stewardship and release scope inspectable.",
        },
      ],
    },
    repositories: [
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
        owns: "Canonical execution rules",
        publishes: "Deterministic state transitions",
        runtime: "Rust execution core",
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
        owns: "Scenario validation harness",
        publishes: "Observed behavior envelopes",
        runtime: "Rust simulation layer",
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
        owns: "Public routes and documentation",
        publishes: "Canonical public surface",
        runtime: "Next.js interface layer",
      },
    ],
    labels: {
      language: "Language",
      role: "Role",
      layer: "Layer",
      viewRepository: "View repository",
      owns: "Owns",
      publishes: "Publishes",
      runtime: "Runtime",
      status: "Status",
      open: "Open",
      influenceScore: "Influence score",
    },
    boundaryRegister: {
      kicker: "Repository Boundary Register",
      title: "Which repository owns which public responsibility",
      description:
        "Repositories in XENØR are public responsibility boundaries. This page records ownership, published surface, and runtime layer for each repository rather than restating system flow.",
      note:
        "Architecture explains how the stack moves. Repositories explains where code ownership, review scope, and public publication live.",
    },
    boundaryDiscipline: {
      kicker: "Boundary Discipline",
      title: "Why repository ownership stays explicit",
      description:
        "Clear boundaries keep stewardship, validation scope, and release responsibility visible without blurring execution logic, simulation work, and public interface maintenance.",
      rows: [
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
      ],
    },
    governance: {
      kicker: "Repository Governance",
      title: "Rules for repository boundaries",
      description:
        "These rules keep execution, validation, and public communication focused as the codebase grows.",
      rows: [
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
      ],
      note: "Public repository structure is part of XENØR's release discipline.",
    },
    collaborators: {
      kicker: "Open Source Collaborators",
      title: "Contributors shaping the XENØR public codebase",
      description:
        "Contributors are listed by visible influence on architecture, review flow, repository stewardship, and release direction.",
      rows: [
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
      ],
    },
    index: {
      kicker: "Repository Index",
      title: "Repository access",
      rows: [
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
      ],
    },
  },
  id: {
    manifesto: {
      kicker: "Repositori",
      title: [
        "Batas kode publik",
        "tetap dapat diinspeksi ketika",
        "repositori memetakan lapisan nyata.",
      ],
      summary:
        "Codebase XENØR diatur ke dalam repositori yang eksplisit untuk execution, validation, dan pekerjaan permukaan publik. Struktur repositori di sini adalah bagian dari disiplin rilis, bukan sekadar organisasi internal.",
      meta: [
        "eksekusi inti",
        "validasi simulasi",
        "antarmuka situs publik",
        "stewardship repositori",
      ],
      actions: {
        primary: "Buka GitHub",
        secondary: "Lihat arsitektur",
      },
      asideKicker: "Kerangka batas",
      asideRows: [
        {
          id: "01",
          title: "Satu repositori, satu permukaan",
          detail:
            "Execution, simulation, dan antarmuka publik tetap menjadi zona kepemilikan yang terpisah.",
        },
        {
          id: "02",
          title: "Scope publik tetap eksplisit",
          detail:
            "Setiap repositori membuka tanggung jawab publik yang sempit, bukan permukaan stack yang tercampur.",
        },
        {
          id: "03",
          title: "Review tetap lokal pada batasnya",
          detail:
            "Struktur repositori menjaga stewardship kode dan scope rilis tetap bisa diinspeksi.",
        },
      ],
    },
    repositories: [
      {
        name: "xenor-core",
        href: "https://github.com/XENOr-god/xenor-core",
        role: "Mesin eksekusi deterministik",
        description:
          "Core Rust untuk execution deterministik, penegakan invarians, dan perilaku protokol fondasional.",
        focus: "Lapisan eksekusi",
        layer: "Lapisan inti",
        language: "Rust",
        status: "Modul aktif",
        owns: "Aturan eksekusi kanonik",
        publishes: "Transisi state deterministik",
        runtime: "Core eksekusi Rust",
      },
      {
        name: "xenor-sim",
        href: "https://github.com/XENOr-god/xenor-sim",
        role: "Lingkungan simulasi dan validasi",
        description:
          "Lingkungan simulasi untuk pengujian skenario, loop validasi, dan analisis perilaku adversarial.",
        focus: "Lapisan validasi",
        layer: "Lapisan validasi",
        language: "Rust",
        status: "Jalur validasi",
        owns: "Harness validasi skenario",
        publishes: "Envelope perilaku teramati",
        runtime: "Lapisan simulasi Rust",
      },
      {
        name: "xenor-site",
        href: "https://github.com/XENOr-god/xenor-site",
        role: "Situs publik dan permukaan antarmuka",
        description:
          "Permukaan publik Next.js yang menerbitkan arsitektur, konteks repositori, referensi kontrak, dan rute kanonik.",
        focus: "Lapisan antarmuka",
        layer: "Lapisan situs",
        language: "TypeScript",
        status: "Situs publik",
        owns: "Rute publik dan dokumentasi",
        publishes: "Permukaan publik kanonik",
        runtime: "Lapisan antarmuka Next.js",
      },
    ],
    labels: {
      language: "Bahasa",
      role: "Peran",
      layer: "Lapisan",
      viewRepository: "Lihat repositori",
      owns: "Memiliki",
      publishes: "Menerbitkan",
      runtime: "Runtime",
      status: "Status",
      open: "Buka",
      influenceScore: "Skor pengaruh",
    },
    boundaryRegister: {
      kicker: "Register Batas Repositori",
      title: "Repositori mana memiliki tanggung jawab publik yang mana",
      description:
        "Repositori di XENØR adalah batas tanggung jawab publik. Halaman ini mencatat kepemilikan, permukaan yang diterbitkan, dan lapisan runtime untuk tiap repositori alih-alih mengulang alur sistem.",
      note:
        "Architecture menjelaskan bagaimana stack bergerak. Repositories menjelaskan di mana kepemilikan kode, scope review, dan publikasi publik berada.",
    },
    boundaryDiscipline: {
      kicker: "Disiplin Batas",
      title: "Mengapa kepemilikan repositori harus tetap eksplisit",
      description:
        "Batas yang jelas menjaga stewardship, scope validasi, dan tanggung jawab rilis tetap terlihat tanpa mengaburkan logika execution, kerja simulation, dan pemeliharaan antarmuka publik.",
      rows: [
        {
          title: "Batas eksekusi",
          detail:
            "Logika state deterministik diisolasi dalam core khusus agar perilaku tetap bisa diinspeksi dan direproduksi.",
        },
        {
          title: "Batas validasi",
          detail:
            "Lingkungan simulation menguji edge case dan asumsi sebelum representasi publik yang lebih luas.",
        },
        {
          title: "Batas situs",
          detail:
            "Situs publik tetap menjadi lapisan antarmuka khusus agar komunikasi dan verifikasi tidak mengaburkan tanggung jawab core dan simulation.",
        },
      ],
    },
    governance: {
      kicker: "Tata Kelola Repositori",
      title: "Aturan untuk batas repositori",
      description:
        "Aturan ini menjaga execution, validation, dan komunikasi publik tetap fokus saat codebase bertumbuh.",
      rows: [
        {
          title: "Model kepemilikan",
          detail:
            "Setiap repositori memegang batas tanggung jawab yang fokus untuk mengurangi coupling dan menjaga keterlacakan arsitektur.",
        },
        {
          title: "Model validasi",
          detail:
            "Perilaku mesin deterministik diuji dalam simulation sebelum asumsi bergerak menuju implementasi yang lebih menghadap publik.",
        },
        {
          title: "Kejelasan publik",
          detail:
            "Batas repositori yang eksplisit membantu kontributor memetakan kode, tanggung jawab, dan arsitektur tanpa ambiguitas.",
        },
      ],
      note: "Struktur repositori publik adalah bagian dari disiplin rilis XENØR.",
    },
    collaborators: {
      kicker: "Kolaborator Open Source",
      title: "Kontributor yang membentuk codebase publik XENØR",
      description:
        "Kontributor dicatat berdasarkan pengaruh yang terlihat terhadap arsitektur, alur review, stewardship repositori, dan arah rilis.",
      rows: [
        {
          username: "XENOr-god",
          profileUrl: "https://github.com/XENOr-god",
          role: "Pemilik proyek",
          influenceLabel: "Fundamental",
          impactScore: 100,
          summary:
            "Menentukan strategi repositori, arah arsitektur, disiplin merge, dan persetujuan rilis final di seluruh stack XENØR.",
          areas: ["xenor-core", "xenor-sim", "xenor-site"],
        },
        {
          username: "xvrique",
          profileUrl: "https://github.com/xvrique",
          role: "Kontributor situs",
          influenceLabel: "Berkontribusi",
          impactScore: 18,
          summary:
            "Terlihat di graph contributor xenor-site dengan kontribusi awal pada permukaan situs publik dan pengaruh yang terbatas terhadap keputusan stack yang lebih luas.",
          areas: ["xenor-site"],
        },
      ],
    },
    index: {
      kicker: "Indeks Repositori",
      title: "Akses repositori",
      rows: [
        {
          name: "xenor-core",
          descriptor: "mesin eksekusi",
          href: "https://github.com/XENOr-god/xenor-core",
        },
        {
          name: "xenor-sim",
          descriptor: "lingkungan simulasi",
          href: "https://github.com/XENOr-god/xenor-sim",
        },
        {
          name: "xenor-site",
          descriptor: "antarmuka situs",
          href: "https://github.com/XENOr-god/xenor-site",
        },
      ],
    },
  },
  ja: {
    manifesto: {
      kicker: "Repositories",
      title: [
        "公開コード境界は、",
        "リポジトリが実際の層を",
        "示すと検査しやすい。",
      ],
      summary:
        "XENØR の codebase は execution、validation、公開面のために明示的なリポジトリへ整理されています。ここでの repository structure は、単なる内部整理ではなく release discipline の一部です。",
      meta: [
        "core execution",
        "simulation validation",
        "public site interface",
        "repository stewardship",
      ],
      actions: {
        primary: "GitHub を開く",
        secondary: "architecture を見る",
      },
      asideKicker: "Boundary frame",
      asideRows: [
        {
          id: "01",
          title: "One repository, one surface",
          detail:
            "execution、simulation、公開 interface は分離された ownership zone に保たれます。",
        },
        {
          id: "02",
          title: "Published scope stays explicit",
          detail:
            "各 repository は、混ざった stack surface ではなく狭い公開責任を示します。",
        },
        {
          id: "03",
          title: "Review stays local to the boundary",
          detail:
            "repository structure は、code stewardship と release scope を検査可能に保ちます。",
        },
      ],
    },
    repositories: [
      {
        name: "xenor-core",
        href: "https://github.com/XENOr-god/xenor-core",
        role: "Deterministic execution engine",
        description:
          "deterministic execution、不変条件の保持、基礎的な protocol behavior のための Rust core。",
        focus: "Execution layer",
        layer: "Core layer",
        language: "Rust",
        status: "Active module",
        owns: "Canonical execution rules",
        publishes: "Deterministic state transitions",
        runtime: "Rust execution core",
      },
      {
        name: "xenor-sim",
        href: "https://github.com/XENOr-god/xenor-sim",
        role: "Simulation and validation environment",
        description:
          "scenario test、validation loop、adversarial analysis のための simulation environment。",
        focus: "Validation layer",
        layer: "Validation layer",
        language: "Rust",
        status: "Validation track",
        owns: "Scenario validation harness",
        publishes: "Observed behavior envelopes",
        runtime: "Rust simulation layer",
      },
      {
        name: "xenor-site",
        href: "https://github.com/XENOr-god/xenor-site",
        role: "Public site and interface surface",
        description:
          "architecture、repository context、contract reference、canonical route を公開する Next.js public surface。",
        focus: "Interface layer",
        layer: "Site layer",
        language: "TypeScript",
        status: "Public site",
        owns: "Public routes and documentation",
        publishes: "Canonical public surface",
        runtime: "Next.js interface layer",
      },
    ],
    labels: {
      language: "Language",
      role: "Role",
      layer: "Layer",
      viewRepository: "View repository",
      owns: "Owns",
      publishes: "Publishes",
      runtime: "Runtime",
      status: "Status",
      open: "Open",
      influenceScore: "Influence score",
    },
    boundaryRegister: {
      kicker: "Repository Boundary Register",
      title: "どの repository がどの公開責任を持つか",
      description:
        "XENØR の repository は公開責任の境界です。このページは system flow を繰り返すのではなく、各 repository の ownership、published surface、runtime layer を記録します。",
      note:
        "Architecture は stack がどう動くかを説明します。Repositories は、code ownership、review scope、public publication がどこにあるかを説明します。",
    },
    boundaryDiscipline: {
      kicker: "Boundary Discipline",
      title: "なぜ repository ownership を明示的に保つのか",
      description:
        "明確な境界は、execution logic、simulation work、public interface maintenance を混ぜることなく、stewardship、validation scope、release responsibility を見える状態に保ちます。",
      rows: [
        {
          title: "Execution boundary",
          detail:
            "deterministic state logic は専用 core に隔離され、挙動を検査可能かつ再現可能に保ちます。",
        },
        {
          title: "Validation boundary",
          detail:
            "simulation environment は、より広い公開表現の前に edge case と前提を検証します。",
        },
        {
          title: "Site boundary",
          detail:
            "public site は専用 interface layer に保たれ、communication と verification が core と simulation の責任を曖昧にしません。",
        },
      ],
    },
    governance: {
      kicker: "Repository Governance",
      title: "repository boundary のルール",
      description:
        "これらのルールは、codebase が成長しても execution、validation、public communication の焦点を保ちます。",
      rows: [
        {
          title: "Ownership model",
          detail:
            "各 repository は、coupling を減らし architecture traceability を保つために焦点化された責任境界を持ちます。",
        },
        {
          title: "Validation model",
          detail:
            "deterministic engine の挙動は、前提がより広い public-facing 実装へ進む前に simulation で検証されます。",
        },
        {
          title: "Public clarity",
          detail:
            "明示的な repository boundary は、contributor が code、責任、architecture を曖昧さなく把握する助けになります。",
        },
      ],
      note: "Public repository structure は XENØR の release discipline の一部です。",
    },
    collaborators: {
      kicker: "Open Source Collaborators",
      title: "XENØR の public codebase を形作る contributor",
      description:
        "contributor は architecture、review flow、repository stewardship、release direction への可視的な影響で一覧化されています。",
      rows: [
        {
          username: "XENOr-god",
          profileUrl: "https://github.com/XENOr-god",
          role: "Project owner",
          influenceLabel: "Foundational",
          impactScore: 100,
          summary:
            "XENØR stack 全体の repository strategy、architecture direction、merge discipline、最終 release approval を定義します。",
          areas: ["xenor-core", "xenor-sim", "xenor-site"],
        },
        {
          username: "xvrique",
          profileUrl: "https://github.com/xvrique",
          role: "Site contributor",
          influenceLabel: "Contributing",
          impactScore: 18,
          summary:
            "xenor-site contributor graph に見える初期の contributor であり、public site surface に早期貢献を行い、広い stack decision への影響は限定的です。",
          areas: ["xenor-site"],
        },
      ],
    },
    index: {
      kicker: "Repository Index",
      title: "Repository access",
      rows: [
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
      ],
    },
  },
  zh: {
    manifesto: {
      kicker: "代码库",
      title: [
        "当代码库映射到真实层级时，",
        "公开代码边界",
        "才保持可审查。",
      ],
      summary:
        "XENØR 的代码库被明确拆分为 execution、validation 与公开界面工作所对应的独立仓库。这里的 repository structure 是发布纪律的一部分，而不仅是内部组织方式。",
      meta: [
        "核心执行",
        "模拟验证",
        "公开站点接口",
        "代码库治理",
      ],
      actions: {
        primary: "打开 GitHub",
        secondary: "查看架构",
      },
      asideKicker: "边界框架",
      asideRows: [
        {
          id: "01",
          title: "一个代码库，一个界面",
          detail:
            "execution、simulation 与公开接口保持为分离的所有权区域。",
        },
        {
          id: "02",
          title: "公开范围保持明确",
          detail:
            "每个代码库只暴露狭窄而明确的公开职责，而不是混合式栈界面。",
        },
        {
          id: "03",
          title: "审查停留在边界内",
          detail:
            "代码库结构让代码治理与发布范围保持可审查。",
        },
      ],
    },
    repositories: [
      {
        name: "xenor-core",
        href: "https://github.com/XENOr-god/xenor-core",
        role: "决定性执行引擎",
        description:
          "用于决定性执行、不变量约束与基础协议行为的 Rust 核心。",
        focus: "执行层",
        layer: "核心层",
        language: "Rust",
        status: "活跃模块",
        owns: "规范执行规则",
        publishes: "决定性状态迁移",
        runtime: "Rust 执行核心",
      },
      {
        name: "xenor-sim",
        href: "https://github.com/XENOr-god/xenor-sim",
        role: "模拟与验证环境",
        description:
          "用于场景测试、验证循环与对抗性行为分析的模拟环境。",
        focus: "验证层",
        layer: "验证层",
        language: "Rust",
        status: "验证轨道",
        owns: "场景验证框架",
        publishes: "观测到的行为边界",
        runtime: "Rust 模拟层",
      },
      {
        name: "xenor-site",
        href: "https://github.com/XENOr-god/xenor-site",
        role: "公开站点与接口界面",
        description:
          "用于发布架构、代码库上下文、合约参考与规范路线的 Next.js 公开界面。",
        focus: "接口层",
        layer: "站点层",
        language: "TypeScript",
        status: "公开站点",
        owns: "公开路线与文档",
        publishes: "规范公开界面",
        runtime: "Next.js 接口层",
      },
    ],
    labels: {
      language: "语言",
      role: "角色",
      layer: "层级",
      viewRepository: "查看代码库",
      owns: "负责",
      publishes: "发布",
      runtime: "运行时",
      status: "状态",
      open: "打开",
      influenceScore: "影响力分数",
    },
    boundaryRegister: {
      kicker: "代码库边界登记",
      title: "哪个代码库负责哪一项公开职责",
      description:
        "XENØR 中的代码库本身就是公开职责边界。此页面记录每个代码库的所有权、发布界面与运行时层，而不是重复系统流程。",
      note:
        "Architecture 说明栈如何流动。Repositories 说明代码所有权、审查范围与公开发布分别位于何处。",
    },
    boundaryDiscipline: {
      kicker: "边界纪律",
      title: "为什么代码库所有权必须保持明确",
      description:
        "清晰边界让治理、验证范围与发布责任保持可见，同时避免 execution logic、simulation work 与公开接口维护相互混淆。",
      rows: [
        {
          title: "执行边界",
          detail:
            "决定性状态逻辑被隔离在专用核心中，以保持行为可审查且可复现。",
        },
        {
          title: "验证边界",
          detail:
            "simulation environment 会在更广泛公开表达前测试边界情况与假设。",
        },
        {
          title: "站点边界",
          detail:
            "公开站点保持为专用接口层，因此沟通与验证不会模糊 core 与 simulation 的职责。",
        },
      ],
    },
    governance: {
      kicker: "代码库治理",
      title: "代码库边界规则",
      description:
        "随着代码库增长，这些规则让 execution、validation 与公开沟通保持聚焦。",
      rows: [
        {
          title: "所有权模型",
          detail:
            "每个代码库都持有聚焦的职责边界，以减少耦合并保持架构可追踪性。",
        },
        {
          title: "验证模型",
          detail:
            "决定性引擎行为会先在 simulation 中得到检验，再让相关假设走向更广泛的公开实现。",
        },
        {
          title: "公开清晰度",
          detail:
            "明确的代码库边界帮助贡献者在无歧义的前提下理解代码、职责与架构。",
        },
      ],
      note: "公开代码库结构是 XENØR 发布纪律的一部分。",
    },
    collaborators: {
      kicker: "开源协作者",
      title: "塑造 XENØR 公开代码库的贡献者",
      description:
        "贡献者按其对架构、审查流程、代码库治理与发布方向的可见影响进行列示。",
      rows: [
        {
          username: "XENOr-god",
          profileUrl: "https://github.com/XENOr-god",
          role: "项目所有者",
          influenceLabel: "基础性",
          impactScore: 100,
          summary:
            "负责整个 XENØR 栈的代码库策略、架构方向、合并纪律与最终发布批准。",
          areas: ["xenor-core", "xenor-sim", "xenor-site"],
        },
        {
          username: "xvrique",
          profileUrl: "https://github.com/xvrique",
          role: "站点贡献者",
          influenceLabel: "贡献中",
          impactScore: 18,
          summary:
            "在 xenor-site 贡献图中可见，早期参与公开站点界面建设，对更广泛栈决策影响有限。",
          areas: ["xenor-site"],
        },
      ],
    },
    index: {
      kicker: "代码库索引",
      title: "代码库访问",
      rows: [
        {
          name: "xenor-core",
          descriptor: "执行引擎",
          href: "https://github.com/XENOr-god/xenor-core",
        },
        {
          name: "xenor-sim",
          descriptor: "模拟环境",
          href: "https://github.com/XENOr-god/xenor-sim",
        },
        {
          name: "xenor-site",
          descriptor: "站点接口",
          href: "https://github.com/XENOr-god/xenor-site",
        },
      ],
    },
  },
} as const;

type LocaleRepository = (typeof repositoryCopy.en.repositories)[number];
type RepositoryName = LocaleRepository["name"];
type RepositoryLabels = {
  language: string;
  role: string;
  layer: string;
  viewRepository: string;
  owns: string;
  publishes: string;
  runtime: string;
  status: string;
  open: string;
  influenceScore: string;
};

type RepositoryRecord = {
  name: RepositoryName;
  href: string;
  role: string;
  description: string;
  focus: string;
  layer: string;
  language: string;
  status: string;
  owns: string;
  publishes: string;
  runtime: string;
};

type QuickIndexItem = {
  name: string;
  descriptor: string;
  href: string;
};

type CollaboratorRecord = {
  username: string;
  profileUrl: string;
  role: string;
  influenceLabel: string;
  impactScore: number;
  summary: string;
  areas: readonly string[];
};

function RepositoryGlyph({ name }: { name: LocaleRepository["name"] }) {
  if (name === "xenor-core") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <circle cx="24" cy="24" r="13" />
        <circle cx="24" cy="24" r="3.5" />
        <path d="M24 7v10M24 31v10M7 24h10M31 24h10" />
      </svg>
    );
  }

  if (name === "xenor-sim") {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path d="M24 8 36 15v18L24 40 12 33V15z" />
        <path d="M24 8v32M12 15l12 7 12-7M12 33l12-7 12 7" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M24 8 35 38H13z" />
      <path d="M24 8v30M17 26h14M19 18l5 8 5-8" />
    </svg>
  );
}

function RepositoryCard({
  repo,
  variantClass,
  labels,
}: {
  repo: RepositoryRecord;
  variantClass?: string;
  labels: RepositoryLabels;
}) {
  return (
    <a
      className={`panel-card repo-card repositories-primary-card${
        variantClass ? ` ${variantClass}` : ""
      }`}
      href={repo.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="repositories-card-head">
        <p className="repositories-status">
          <span aria-hidden="true" />
          {repo.status}
        </p>

        <span className="repositories-card-glyph" aria-hidden="true">
          <RepositoryGlyph name={repo.name} />
        </span>
      </div>
      <h3 className="repositories-repo-name">{repo.name}</h3>
      <p className="repositories-role-label">{repo.role}</p>
      <p className="repositories-description">{repo.description}</p>

      <div className="repo-meta repositories-meta-chips">
        <span>{repo.focus}</span>
        <span>{repo.language}</span>
      </div>

      <dl className="repositories-metadata">
        <div>
          <dt>{labels.language}</dt>
          <dd>{repo.language}</dd>
        </div>
        <div>
          <dt>{labels.role}</dt>
          <dd>{repo.role}</dd>
        </div>
        <div>
          <dt>{labels.layer}</dt>
          <dd>{repo.layer}</dd>
        </div>
      </dl>

      <em className="repositories-open-link">{labels.viewRepository}</em>
    </a>
  );
}

function RepositoryBoundaryRegister({
  repositories,
  labels,
}: {
  repositories: readonly RepositoryRecord[];
  labels: RepositoryLabels;
}) {
  return (
    <div className="repositories-register">
      {repositories.map((repo, index) => (
        <article key={repo.name} className="repositories-register-row">
          <span className="repositories-register-index">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="repositories-register-repo">
            <p>{repo.layer}</p>
            <h3>{repo.name}</h3>
          </div>

          <div className="repositories-register-ownership">
            <div>
              <span>{labels.owns}</span>
              <p>{repo.owns}</p>
            </div>
            <div>
              <span>{labels.publishes}</span>
              <p>{repo.publishes}</p>
            </div>
          </div>

          <dl className="repositories-register-meta">
            <div>
              <dt>{labels.runtime}</dt>
              <dd>{repo.runtime}</dd>
            </div>
            <div>
              <dt>{labels.status}</dt>
              <dd>{repo.status}</dd>
            </div>
          </dl>
        </article>
      ))}
    </div>
  );
}

function RepositoryIndexRow({
  item,
  openLabel,
}: {
  item: QuickIndexItem;
  openLabel: string;
}) {
  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="repositories-index-row"
    >
      <p>{item.name}</p>
      <span>{item.descriptor}</span>
      <em>{openLabel}</em>
    </a>
  );
}

function RepositoryCollaboratorCard({
  collaborator,
  influenceScoreLabel,
}: {
  collaborator: CollaboratorRecord;
  influenceScoreLabel: string;
}) {
  return (
    <a
      href={collaborator.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="repositories-collaborator-row"
    >
      <div className="repositories-collaborator-identity">
        <div>
          <p className="repositories-collaborator-handle">
            @{collaborator.username}
          </p>
          <h3>{collaborator.role}</h3>
        </div>
        <div className="repositories-collaborator-areas">
          {collaborator.areas.map((area) => (
            <span key={area}>{area}</span>
          ))}
        </div>
      </div>

      <p className="repositories-collaborator-summary">
        {collaborator.summary}
      </p>

      <div className="repositories-collaborator-metrics">
        <span className="repositories-collaborator-label">
          {collaborator.influenceLabel}
        </span>

        <div className="repositories-collaborator-impact">
          <span>{influenceScoreLabel}</span>
          <strong>{collaborator.impactScore}/100</strong>
        </div>

        <div className="repositories-collaborator-meter" aria-hidden="true">
          <span style={{ width: `${collaborator.impactScore}%` }} />
        </div>
      </div>
    </a>
  );
}

type RepositoriesPageProps = {
  searchParams?: Promise<SearchParamsLike>;
};

export default async function RepositoriesPage({
  searchParams,
}: RepositoriesPageProps) {
  const locale = getLocaleFromSearchParams(
    searchParams ? await searchParams : undefined
  );
  const copy = repositoryCopy[locale];

  return (
    <main className="gaea-home gaea-subpage repositories-page">
      <GaeaBackground />
      <GaeaSiteHeader locale={locale} />

      <GaeaSubpageManifesto
        className="repositories-manifesto"
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
            href: "https://github.com/XENOr-god",
            external: true,
            variant: "primary",
          },
          {
            label: copy.manifesto.actions.secondary,
            href: "/architecture",
            variant: "command",
          },
        ]}
        locale={locale}
        asidePlacement="below-copy"
        aside={
          <div className="gaea-subpage-aside-panel repositories-manifesto-panel">
            <p className="gaea-subpage-aside-kicker">{copy.manifesto.asideKicker}</p>
            <div className="gaea-subpage-aside-list">
              {copy.manifesto.asideRows.map((item) => (
                <article key={item.id} className="gaea-subpage-aside-row">
                  <span>{item.id}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        }
      />

      <section className="section section-animate repositories-strip-section">
        <div className="container">
          <div className="repo-grid repositories-primary-grid">
            {copy.repositories.map((repo, index) => (
              <RepositoryCard
                key={repo.name}
                repo={repo}
                labels={copy.labels}
                variantClass={
                  index === 0
                    ? "repositories-primary-card-wide"
                    : index === 1
                      ? "repositories-primary-card-medium"
                      : "repositories-primary-card-narrow"
                }
              />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-animate repositories-register-section">
        <div className="container">
          <article className="panel-card repositories-register-panel">
            <div className="repositories-register-head">
              <p className="section-kicker">{copy.boundaryRegister.kicker}</p>
              <h2>{copy.boundaryRegister.title}</h2>
              <p>{copy.boundaryRegister.description}</p>
            </div>

            <RepositoryBoundaryRegister
              repositories={copy.repositories}
              labels={copy.labels}
            />

            <p className="repositories-register-note">
              {copy.boundaryRegister.note}
            </p>
          </article>

          <div className="section-head repositories-relationship-head">
            <p className="section-kicker">{copy.boundaryDiscipline.kicker}</p>
            <h2>{copy.boundaryDiscipline.title}</h2>
            <p>{copy.boundaryDiscipline.description}</p>
          </div>

          <div className="repositories-boundary-strip">
            {copy.boundaryDiscipline.rows.map((item, index) => (
              <article key={item.title} className="repositories-boundary-row">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-soft section-animate compact-top repositories-governance-section">
        <div className="container">
          <div className="repositories-governance-layout">
            <section className="repositories-governance-column">
              <div className="section-head repositories-governance-head">
                <p className="section-kicker">{copy.governance.kicker}</p>
                <h2>{copy.governance.title}</h2>
                <p>{copy.governance.description}</p>
              </div>

              <div className="repositories-governance-list">
                {copy.governance.rows.map((item, index) => (
                  <article key={item.title} className="repositories-governance-row">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.detail}</p>
                    </div>
                  </article>
                ))}
              </div>

              <p className="architecture-note repositories-governance-note">
                {copy.governance.note}
              </p>
            </section>

            <section className="repositories-collaborators-column">
              <div className="section-head repositories-collaborators-head">
                <p className="section-kicker">{copy.collaborators.kicker}</p>
                <h2>{copy.collaborators.title}</h2>
                <p>{copy.collaborators.description}</p>
              </div>

              <div className="repositories-collaborator-list">
                {copy.collaborators.rows.map((collaborator) => (
                  <RepositoryCollaboratorCard
                    key={collaborator.username}
                    collaborator={collaborator}
                    influenceScoreLabel={copy.labels.influenceScore}
                  />
                ))}
              </div>
            </section>
          </div>

          <article className="repositories-index-panel">
            <div className="repositories-index-head">
              <p className="section-kicker">{copy.index.kicker}</p>
              <h3>{copy.index.title}</h3>
            </div>

            <div className="repositories-index-list">
              {copy.index.rows.map((item) => (
                <RepositoryIndexRow
                  key={item.name}
                  item={item}
                  openLabel={copy.labels.open}
                />
              ))}
            </div>
          </article>
        </div>
      </section>

      <GaeaSiteFooter locale={locale} />
    </main>
  );
}
