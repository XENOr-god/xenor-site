import type { Metadata } from "next";
import {
  GaeaBackground,
  GaeaSiteFooter,
  GaeaSiteHeader,
} from "../components/gaea-site-chrome";
import { GaeaSubpageManifesto } from "../components/gaea-subpage-manifesto";
import { LocalizedLink } from "../components/localized-link";
import {
  getLocaleFromSearchParams,
  type Locale,
  type SearchParamsLike,
} from "../lib/i18n";

export const metadata: Metadata = {
  title: "Vision",
  description:
    "XENØR vision: why the project exists, why crypto systems fail under pressure, and how XENØr works to make crypto systems harder to break.",
};

const sharedVisionCopy = {
  hero: {
    kicker: "Vision",
    title: [
      "Crypto systems often look",
      "fine until real",
      "pressure hits.",
    ],
    summary:
      "XENØr is a protocol research stack focused on making crypto systems harder to break through deterministic design, simulation-first validation, and audit-first engineering.",
    support:
      "We test incentives, edge cases, and system behavior before real users depend on them.",
    framing:
      "XENØr exists for the layer where systems stop being theoretical and start being exposed to real behavior.",
    meta: [
      "deterministic execution",
      "simulation-first validation",
      "verifiable incentive design",
      "audit-first engineering",
    ],
    actions: {
      primary: "Explore architecture",
      secondary: "Review repositories",
    },
    aside: {
      kicker: "Research focus",
      items: [
        {
          title: "Incentive pressure",
          body: "Model how incentives behave before users inherit the consequences.",
        },
        {
          title: "Edge cases",
          body: "Stress abnormal conditions instead of assuming the happy path holds.",
        },
        {
          title: "Accounting behavior",
          body: "Inspect how state moves, not just how interfaces describe it.",
        },
        {
          title: "Mechanism design",
          body: "Pressure-test release logic before public assumptions lock in.",
        },
      ],
    },
  },
  problem: {
    kicker: "Problem Statement",
    title: "Most systems fail at the edges, not in the happy path.",
    body:
      "Many crypto systems appear stable in normal conditions, but break under stress, adversarial behavior, ordering changes, or incentive feedback loops. XENØr exists to study those failure surfaces before production trust is assumed.",
    closing:
      "The market usually sees those cracks after launch. XENØr is built to inspect them earlier.",
    signals: [
      "adversarial behavior",
      "ordering changes",
      "feedback loops",
      "stacked edge cases",
    ],
  },
  what: {
    kicker: "What XENØr Does",
    title: "Research first. Stress before trust.",
    body:
      "XENØr helps model incentives, simulate edge cases, inspect accounting behavior, and pressure-test mechanism design before release claims become public assumptions.",
    strip: ["Expose pressure before the market inherits it."],
    items: [
      {
        title: "Model incentives",
        body: "Expose how incentives behave before those incentives become public narratives.",
      },
      {
        title: "Simulate edge cases",
        body: "Run stress cases before market conditions force them into view.",
      },
      {
        title: "Inspect accounting",
        body: "Keep system behavior legible at the state and accounting layer.",
      },
      {
        title: "Pressure-test design",
        body: "Treat release claims as something earned through evidence, not presentation.",
      },
    ],
  },
  audience: {
    kicker: "Who It Is For",
    title: "Built for people who care how systems hold under pressure.",
    items: [
      {
        label: "Retail",
        body: "for people who want stronger crypto systems, not just louder narratives",
      },
      {
        label: "KOLs and crypto-native audiences",
        body: "for people who need a simple way to explain why stronger systems matter",
      },
      {
        label: "Builders",
        body: "for teams designing mechanisms, incentives, and protocol logic",
      },
      {
        label: "Researchers and auditors",
        body: "for people who need inspectable assumptions, bounded behavior, and clearer reasoning",
      },
    ],
  },
  why: {
    kicker: "Why It Matters",
    title:
      "The real question is not whether a system works. It is whether it still holds when conditions stop being ideal.",
    body:
      "XENØr is built around the idea that systems should remain legible under stress. That means testing what happens when order changes, incentives collide, assumptions leak, and edge cases begin to stack.",
    items: [
      {
        title: "Order changes",
        body: "Execution should stay bounded even when sequencing stops being convenient.",
      },
      {
        title: "Incentives collide",
        body: "Mechanisms need inspection where incentives create pressure, not just where they align.",
      },
      {
        title: "Assumptions leak",
        body: "Systems should expose what they depend on before the market does it for them.",
      },
      {
        title: "Edge cases stack",
        body: "Pressure rarely arrives one variable at a time.",
      },
    ],
  },
  principles: {
    kicker: "Core Principles",
    title: "Deep principles, public clarity.",
    body:
      "XENØr keeps the deeper principles intact, but the point is simple: serious systems should stay readable before, during, and after public exposure.",
    items: [
      {
        title: "Deterministic execution",
        body:
          "Execution rules should remain predictable and inspectable under equivalent conditions.",
      },
      {
        title: "Simulation-first validation",
        body:
          "Critical assumptions should be pressure-tested before public trust depends on them.",
      },
      {
        title: "Explicit module boundaries",
        body:
          "Core logic, simulation tooling, and public interfaces should stay distinct so reasoning remains auditable.",
      },
      {
        title: "Research-driven release discipline",
        body:
          "Claims should be supported by observable behavior, not just design intent.",
      },
    ],
  },
  proof: {
    kicker: "Public Proof Surface",
    title: "The public surface should stay explicit.",
    body:
      "XENØr keeps its public surface explicit. Research, architecture, repositories, contract context, and public presence should remain easy to inspect from one place.",
    rows: [
      {
        title: "Architecture",
        tag: "structure",
        body: "Inspect how execution, validation, and public release stay separated.",
        href: "/architecture",
      },
      {
        title: "Repositories",
        tag: "modules",
        body: "Review the public repository map for xenor-core, xenor-sim, and xenor-site.",
        href: "/repositories",
      },
      {
        title: "Contract",
        tag: "launch",
        body: "Follow the canonical contract and launch-context surface.",
        href: "/contract",
      },
      {
        title: "Presence",
        tag: "channels",
        body: "Verify official communication routes and public trust boundaries.",
        href: "/presence",
      },
      {
        title: "GitHub",
        tag: "code",
        body: "Inspect repositories, history, and public implementation context.",
        href: "https://github.com/XENOr-god",
        external: true,
      },
    ],
    openLabel: "open",
  },
  cta: {
    kicker: "Inspect The Stack",
    title: "Inspect the stack. Follow the reasoning.",
    body:
      "XENØr is being built for people who care whether systems stay legible under real pressure, not just whether they look clean in theory.",
    closing:
      "The point is not abstract elegance. The point is whether the system still holds when pressure becomes real.",
    actions: [
      {
        label: "Inspect architecture",
        href: "/architecture",
        variant: "strong" as const,
      },
      {
        label: "Review repositories",
        href: "/repositories",
        variant: "button" as const,
      },
    ],
  },
} as const;

const visionCopy: Record<Locale, typeof sharedVisionCopy> = {
  en: sharedVisionCopy,
  id: sharedVisionCopy,
  ja: sharedVisionCopy,
  zh: sharedVisionCopy,
};

type VisionPageProps = {
  searchParams?: Promise<SearchParamsLike>;
};

function VisionActionLink({
  href,
  label,
  locale,
  variant,
  external = false,
}: {
  href: string;
  label: string;
  locale: Locale;
  variant: "strong" | "command" | "button";
  external?: boolean;
}) {
  const className =
    variant === "command"
      ? "gaea-inline-command gaea-subpage-command"
      : variant === "strong"
        ? "gaea-action gaea-action-strong"
        : "gaea-action";

  if (external) {
    return (
      <a href={href} className={className} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    );
  }

  return (
    <LocalizedLink href={href} locale={locale} className={className}>
      {label}
    </LocalizedLink>
  );
}

function VisionRouteLink({
  href,
  title,
  tag,
  body,
  locale,
  openLabel,
  external = false,
}: {
  href: string;
  title: string;
  tag: string;
  body: string;
  locale: Locale;
  openLabel: string;
  external?: boolean;
}) {
  const content = (
    <>
      <div className="gaea-access-row-title">
        <strong>{title}</strong>
        <span>{tag}</span>
      </div>
      <p>{body}</p>
      <em>{openLabel}</em>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className="gaea-access-row"
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <LocalizedLink href={href} locale={locale} className="gaea-access-row">
      {content}
    </LocalizedLink>
  );
}

export default async function VisionPage({ searchParams }: VisionPageProps) {
  const locale = getLocaleFromSearchParams(
    searchParams ? await searchParams : undefined
  );
  const copy = visionCopy[locale];

  return (
    <main className="gaea-home gaea-subpage vision-page">
      <GaeaBackground />
      <GaeaSiteHeader locale={locale} />

      <GaeaSubpageManifesto
        kicker={copy.hero.kicker}
        title={
          <>
            {copy.hero.title[0]}
            <br />
            {copy.hero.title[1]}
            <br />
            {copy.hero.title[2]}
          </>
        }
        summary={
          <>
            <p>{copy.hero.summary}</p>
            <p className="gaea-market-support">{copy.hero.support}</p>
            <p className="gaea-market-line">{copy.hero.framing}</p>
          </>
        }
        meta={[...copy.hero.meta]}
        actions={[
          {
            label: copy.hero.actions.primary,
            href: "/architecture",
            variant: "primary",
          },
          {
            label: copy.hero.actions.secondary,
            href: "/repositories",
            variant: "command",
          },
        ]}
        locale={locale}
        asidePlacement="below-copy"
        aside={
          <div className="gaea-subpage-aside-panel vision-manifesto-panel">
            <p className="gaea-subpage-aside-kicker">{copy.hero.aside.kicker}</p>
            <div className="gaea-subpage-aside-list">
              {copy.hero.aside.items.map((item, index) => (
                <article key={item.title} className="gaea-subpage-aside-row">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        }
      />

      <section className="gaea-market-section" id="problem">
        <div className="container gaea-market-split">
          <div className="gaea-section-head gaea-section-head-tight">
            <p className="gaea-kicker">{copy.problem.kicker}</p>
            <h2>{copy.problem.title}</h2>
            <p className="gaea-section-copy">{copy.problem.body}</p>
            <p className="gaea-market-callout">{copy.problem.closing}</p>
          </div>

          <article className="gaea-market-focus-card">
            <p className="gaea-market-card-label">Failure Surface</p>
            <div className="gaea-market-signal-list">
              {copy.problem.signals.map((signal) => (
                <div key={signal} className="gaea-market-signal">
                  <span>pressure</span>
                  <strong>{signal}</strong>
                </div>
              ))}
            </div>
          </article>
        </div>
      </section>

      <section className="gaea-market-section">
        <div className="container">
          <div className="gaea-section-head gaea-section-head-tight">
            <p className="gaea-kicker">{copy.what.kicker}</p>
            <h2>{copy.what.title}</h2>
            <p className="gaea-section-copy">{copy.what.body}</p>
          </div>

          <div className="gaea-market-summary-strip" aria-label="Summary strip">
            {copy.what.strip.map((entry) => (
              <span key={entry}>{entry}</span>
            ))}
          </div>

          <div className="gaea-market-capability-grid">
            {copy.what.items.map((item) => (
              <article key={item.title} className="gaea-market-capability">
                <p className="gaea-market-card-label">Research Surface</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gaea-market-section gaea-market-section-soft">
        <div className="container">
          <div className="gaea-section-head gaea-section-head-tight">
            <p className="gaea-kicker">{copy.audience.kicker}</p>
            <h2>{copy.audience.title}</h2>
          </div>

          <div className="gaea-market-capability-grid">
            {copy.audience.items.map((item) => (
              <article key={item.label} className="gaea-market-capability">
                <p className="gaea-market-card-label">Audience</p>
                <h3>{item.label}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gaea-market-section">
        <div className="container">
          <div className="gaea-section-head gaea-section-head-tight">
            <p className="gaea-kicker">{copy.why.kicker}</p>
            <h2>{copy.why.title}</h2>
            <p className="gaea-section-copy">{copy.why.body}</p>
          </div>

          <div className="gaea-market-stress-grid">
            {copy.why.items.map((item) => (
              <article key={item.title} className="gaea-market-stress-card">
                <p className="gaea-market-card-label">Stress Case</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gaea-market-section gaea-market-section-soft">
        <div className="container">
          <div className="gaea-section-head gaea-section-head-tight">
            <p className="gaea-kicker">{copy.principles.kicker}</p>
            <h2>{copy.principles.title}</h2>
            <p className="gaea-section-copy">{copy.principles.body}</p>
          </div>

          <div className="gaea-market-capability-grid">
            {copy.principles.items.map((item) => (
              <article key={item.title} className="gaea-market-capability">
                <p className="gaea-market-card-label">Principle</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gaea-access-section gaea-market-proof-section">
        <div className="container gaea-access-grid">
          <div className="gaea-access-intro">
            <p className="gaea-kicker">{copy.proof.kicker}</p>
            <h2>{copy.proof.title}</h2>
            <p className="gaea-section-copy">{copy.proof.body}</p>
          </div>

          <div className="gaea-access-rows">
            {copy.proof.rows.map((row) => (
              <VisionRouteLink
                key={row.href}
                href={row.href}
                title={row.title}
                tag={row.tag}
                body={row.body}
                locale={locale}
                openLabel={copy.proof.openLabel}
                external={"external" in row ? row.external : false}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="gaea-market-cta-section">
        <div className="container">
          <div className="gaea-market-cta">
            <div className="gaea-market-cta-copy">
            <p className="gaea-kicker">{copy.cta.kicker}</p>
            <h2>{copy.cta.title}</h2>
            <p>{copy.cta.body}</p>
            <p className="gaea-market-note">{copy.cta.closing}</p>
          </div>

            <div className="gaea-market-cta-actions">
              {copy.cta.actions.map((action) => (
                <VisionActionLink
                  key={action.href}
                  href={action.href}
                  label={action.label}
                  locale={locale}
                  variant={action.variant}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <GaeaSiteFooter locale={locale} />
    </main>
  );
}
