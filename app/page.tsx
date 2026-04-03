import type { Metadata } from "next";
import { HomeXenorLogoDisplay } from "./components/home-xenor-logo-display";
import {
  GaeaBackground,
  GaeaSiteFooter,
  GaeaSiteHeader,
} from "./components/gaea-site-chrome";
import { LocalizedLink } from "./components/localized-link";
import {
  getLocaleFromSearchParams,
  type Locale,
  type SearchParamsLike,
} from "./lib/i18n";

export const metadata: Metadata = {
  title: "Home",
  description:
    "XENØR homepage: making crypto systems harder to break through deterministic design, simulation-first validation, and canonical public surfaces.",
};

const sharedHomeCopy = {
  hero: {
    kicker: "Protocol Research Stack",
    title: ["Research for systems", "that need to", "survive pressure."],
    description:
      "XENØR studies execution, incentives, and release logic before they become public risk.",
    support:
      "The work stays practical: deterministic rules, scenario testing, and reasoning that can be inspected.",
    primaryAction: "View architecture",
    secondaryAction: "Read the vision",
    visualLabels: {
      top: "research model",
      bottomLeft: "bounded logic",
      bottomRight: "public surface",
    },
  },
  problem: {
    kicker: "Problem",
    title: "Weak design usually becomes obvious too late.",
    body:
      "Most systems look coherent in calm conditions. The real failures appear when sequencing shifts, incentives loop, or edge cases begin to compound. XENØR exists to inspect that layer before users inherit it.",
    callout: "Pressure does not arrive one variable at a time.",
    signals: [
      "sequencing shifts",
      "incentive feedback",
      "adversarial usage",
      "compound edge cases",
    ],
  },
  what: {
    kicker: "What XENØr Does",
    title: "A small research surface with a clear job.",
    body:
      "Model incentives, run stress scenarios, inspect accounting behavior, and document findings before release language hardens into trust.",
    summaryStrip: [
      "Model incentives",
      "Run stress scenarios",
      "Inspect accounting",
      "Publish clear boundaries",
    ],
    capabilities: [
      {
        title: "Incentive modelling",
        body: "Test how a mechanism rewards, leaks, and bends before it faces live conditions.",
      },
      {
        title: "Scenario simulation",
        body: "Run abnormal flows and boundary conditions instead of validating only the happy path.",
      },
      {
        title: "Accounting inspection",
        body: "Check where state moves, accumulates, or breaks assumptions.",
      },
      {
        title: "Release discipline",
        body: "Keep public claims aligned with what has actually been tested.",
      },
    ],
  },
  audience: {
    kicker: "Who It Is For",
    title: "For teams and communities that want evidence before confidence.",
    items: [
      {
        label: "Builders",
        body: "Teams shaping mechanism design, execution rules, and launch behavior.",
      },
      {
        label: "Researchers",
        body: "People who need inspectable assumptions, stress cases, and bounded reasoning.",
      },
      {
        label: "Auditors",
        body: "Reviewers looking for clear boundaries between core logic, simulation, and public claims.",
      },
      {
        label: "Public operators",
        body: "People explaining systems in public and needing a surface that stays consistent.",
      },
    ],
    note:
      "Not a hype layer. A research surface.",
  },
  stack: {
    kicker: "Core Stack",
    title: "Three public surfaces. Clear separation.",
    body:
      "Core logic, simulation tooling, and the public website stay separate so each layer is easier to inspect.",
    items: [
      {
        name: "xenor-core",
        label: "execution layer",
        body: "Deterministic rules and bounded state transitions.",
        href: "/architecture",
      },
      {
        name: "xenor-sim",
        label: "validation layer",
        body: "Scenario testing, stress cases, and incentive analysis.",
        href: "/repositories",
      },
      {
        name: "xenor-site",
        label: "public surface",
        body: "The canonical public route for context, references, and updates.",
        href: "/presence",
      },
    ],
  },
  stress: {
    kicker: "Pressure Standard",
    title:
      "The standard is simple: stay legible when conditions change.",
    body:
      "The question is not whether a system works in a controlled flow. It is whether it still makes sense when order changes, incentives collide, and multiple edge cases stack.",
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
        body: "A research surface should expose what the system depends on before the market does.",
      },
      {
        title: "Edge cases stack",
        body: "Stress rarely arrives alone. Validation has to account for overlap and compounding failure.",
      },
    ],
  },
  proof: {
    kicker: "Public Surface",
    title: "Public routes should resolve cleanly.",
    body:
      "Architecture, repositories, launch context, and official channels should point back to the same canonical XENØR surface.",
    trustStrip: [
      "One identity",
      "Clear routes",
      "Verifiable references",
    ],
    rows: [
      {
        title: "GitHub",
        tag: "code",
        body: "Public repositories, commit history, and implementation context.",
        href: "https://github.com/XENOr-god",
        external: true,
      },
      {
        title: "Simulation proof",
        tag: "demo",
        body: "A deterministic settlement slice rendered from real Rust engine output.",
        href: "/simulation",
      },
      {
        title: "X / presence",
        tag: "channels",
        body: "Official communication routes, social surface, and signaling boundaries.",
        href: "/presence",
      },
      {
        title: "Architecture",
        tag: "structure",
        body: "Execution, validation, and public surface boundaries in plain view.",
        href: "/architecture",
      },
      {
        title: "Repositories",
        tag: "modules",
        body: "The public map for xenor-core, xenor-sim, and xenor-site.",
        href: "/repositories",
      },
      {
        title: "Contract / launch context",
        tag: "launch",
        body: "Canonical contract, launch reference, and market routes when published.",
        href: "/contract",
      },
    ],
    openLabel: "open",
  },
  cta: {
    kicker: "Start Here",
    title: "Start with the public surface. Go deeper where the evidence lives.",
    body:
      "Use the site as the canonical entry point, then follow the architecture, repositories, and launch context as needed.",
    actions: [
      {
        label: "Explore architecture",
        href: "/architecture",
        variant: "strong" as const,
      },
      {
        label: "Review repositories",
        href: "/repositories",
        variant: "button" as const,
      },
      {
        label: "View launch context",
        href: "/contract",
        variant: "command" as const,
      },
    ],
  },
} as const;

const homeCopy: Record<Locale, typeof sharedHomeCopy> = {
  en: sharedHomeCopy,
  id: sharedHomeCopy,
  ja: sharedHomeCopy,
  zh: sharedHomeCopy,
};

type HomePageProps = {
  searchParams?: Promise<SearchParamsLike>;
};

function HomeActionLink({
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
      ? "gaea-inline-command"
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

function ProofSurfaceLink({
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

export default async function HomePage({ searchParams }: HomePageProps) {
  const locale = getLocaleFromSearchParams(
    searchParams ? await searchParams : undefined
  );
  const copy = homeCopy[locale];

  return (
    <main className="gaea-home">
      <GaeaBackground />
      <GaeaSiteHeader locale={locale} />

      <section className="gaea-manifesto gaea-market-hero">
        <div className="container gaea-manifesto-grid">
          <div className="gaea-manifesto-copy">
            <p className="gaea-kicker">{copy.hero.kicker}</p>
            <h1>
              {copy.hero.title.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h1>
            <p className="gaea-manifesto-description">{copy.hero.description}</p>
            <p className="gaea-market-support">{copy.hero.support}</p>

            <div className="gaea-manifesto-actions">
              <HomeActionLink
                href="/#problem"
                label={copy.hero.primaryAction}
                locale={locale}
                variant="strong"
              />
              <HomeActionLink
                href="/vision"
                label={copy.hero.secondaryAction}
                locale={locale}
                variant="command"
              />
            </div>
          </div>

          <div className="gaea-manifesto-visual">
            <div className="gaea-particle-chamber">
              <span className="gaea-particle-label gaea-particle-label-top">
                {copy.hero.visualLabels.top}
              </span>
              <span className="gaea-particle-label gaea-particle-label-bottom-left">
                {copy.hero.visualLabels.bottomLeft}
              </span>
              <span className="gaea-particle-label gaea-particle-label-bottom-right">
                {copy.hero.visualLabels.bottomRight}
              </span>
              <div className="gaea-opening-blurmark" aria-hidden="true">
                XENØR
              </div>
              <div className="gaea-opening-particles">
                <HomeXenorLogoDisplay />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="gaea-market-section" id="problem">
        <div className="container gaea-market-split">
          <div className="gaea-section-head gaea-section-head-tight">
            <p className="gaea-kicker">{copy.problem.kicker}</p>
            <h2>{copy.problem.title}</h2>
            <p className="gaea-section-copy">{copy.problem.body}</p>
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
            <p className="gaea-market-callout">{copy.problem.callout}</p>
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

          <div className="gaea-market-capability-grid">
            {copy.what.capabilities.map((item) => (
              <article key={item.title} className="gaea-market-capability">
                <p className="gaea-market-card-label">Capability</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <div className="gaea-market-summary-strip" aria-label="XENØR research summary">
            {copy.what.summaryStrip.map((item) => (
              <span key={item}>{item}</span>
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

          <div className="gaea-market-audience-grid">
            {copy.audience.items.map((item) => (
              <article key={item.label} className="gaea-market-audience-card">
                <p className="gaea-market-card-label">Audience</p>
                <h3>{item.label}</h3>
                <p>{item.body}</p>
              </article>
            ))}
          </div>

          <p className="gaea-market-note">{copy.audience.note}</p>
        </div>
      </section>

      <section className="gaea-market-section">
        <div className="container">
          <div className="gaea-section-head gaea-section-head-tight">
            <p className="gaea-kicker">{copy.stack.kicker}</p>
            <h2>{copy.stack.title}</h2>
            <p className="gaea-section-copy">{copy.stack.body}</p>
          </div>

          <div className="gaea-market-stack-grid">
            {copy.stack.items.map((item) => (
              <LocalizedLink
                key={item.name}
                href={item.href}
                locale={locale}
                className="gaea-market-stack-card"
              >
                <p className="gaea-market-card-label">{item.label}</p>
                <h3>{item.name}</h3>
                <strong>{item.body}</strong>
              </LocalizedLink>
            ))}
          </div>
        </div>
      </section>

      <section className="gaea-market-section">
        <div className="container">
          <div className="gaea-section-head gaea-section-head-tight">
            <p className="gaea-kicker">{copy.stress.kicker}</p>
            <h2>{copy.stress.title}</h2>
            <p className="gaea-section-copy">{copy.stress.body}</p>
          </div>

          <div className="gaea-market-stress-grid">
            {copy.stress.items.map((item) => (
              <article key={item.title} className="gaea-market-stress-card">
                <p className="gaea-market-card-label">Stress Case</p>
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
              <ProofSurfaceLink
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

          <div className="gaea-market-summary-strip gaea-market-trust-strip" aria-label="Trust strip">
            {copy.proof.trustStrip.map((item) => (
              <span key={item}>{item}</span>
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
            </div>

            <div className="gaea-market-cta-actions">
              {copy.cta.actions.map((action) => (
                <HomeActionLink
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
