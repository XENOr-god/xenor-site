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
  title: "Presence",
  description:
    "XENØR public presence: official routes, communication boundaries, and trust guidance for the canonical public surface.",
};

const defaultGithubOwner = "XENOr-god";

const sharedPresenceCopy = {
  hero: {
    kicker: "Public Presence",
    title: ["Official routes.", "Clear boundaries."],
    body:
      "XENØR keeps its public communication surface explicit. Social presence, repositories, architecture, and contract context should remain easy to verify from one place.",
    trustStrip: ["Canonical public surface."],
    meta: [
      "official routes",
      "canonical accounts",
      "communication boundaries",
      "trust note",
    ],
    actions: {
      primary: "View contract",
      secondary: "Open GitHub",
    },
    aside: {
      kicker: "Primary routes",
      items: [
        { code: "WEB", label: "Website", href: "/", external: false },
        { code: "CT", label: "Contract", href: "/contract", external: false },
        { code: "GH", label: "GitHub", href: "github", external: true },
        { code: "SOC", label: "X / social", href: "x", external: true },
      ],
    },
  },
  official: {
    kicker: "Official Presence",
    title: "Official presence",
    body:
      "Use this page to verify which public accounts and routes are officially associated with XENØR.",
    rows: [
      {
        title: "X / social",
        tag: "public route",
        body: "Official short-form communication route for direction, announcements, and public continuity.",
        href: "x",
        external: true,
      },
      {
        title: "GitHub",
        tag: "code",
        body: "Primary source for repositories, implementation history, and public evidence.",
        href: "github",
        external: true,
      },
      {
        title: "Website",
        tag: "surface",
        body: "Canonical website surface for how XENØR explains itself publicly.",
        href: "/",
      },
      {
        title: "Contract page",
        tag: "launch context",
        body: "Canonical contract and market-context page for the token surface.",
        href: "/contract",
      },
      {
        title: "Architecture",
        tag: "structure",
        body: "Public architecture route for how the stack is separated and reasoned about.",
        href: "/architecture",
      },
      {
        title: "Repositories",
        tag: "modules",
        body: "Canonical route to xenor-core, xenor-sim, and xenor-site.",
        href: "/repositories",
      },
    ],
    openLabel: "open route",
  },
  accounts: {
    kicker: "Canonical Accounts",
    title: "Canonical accounts and routes",
    body:
      "If a public account, market route, or contract reference is not linked from this page or the canonical website surface, do not treat it as official.",
    signals: [
      "linked from this page",
      "linked from the website",
      "linked from contract context",
      "traceable back to XENØR",
    ],
  },
  boundaries: {
    kicker: "Communication Boundaries",
    title: "Communication boundaries",
    body:
      "Short-form public updates are signals, not substitutes for architecture, repositories, or technical reasoning. Public posts help communicate direction, but the deeper evidence should remain in the system surface itself.",
    cards: [
      {
        title: "Signals",
        body: "Public posts help route attention and communicate direction. They are not the underlying proof surface.",
      },
      {
        title: "Evidence",
        body: "The deeper evidence should remain in architecture, repositories, and contract context that can be inspected directly.",
      },
    ],
  },
  trust: {
    kicker: "Trust Note",
    title: "Trust note",
    body:
      "Always verify public routes through the canonical website surface. If something cannot be resolved back to the official XENØR pages, repositories, or contract context, do not treat it as canonical.",
    actions: {
      contract: "View contract",
      repositories: "Review repositories",
    },
  },
} as const;

const presenceCopy: Record<Locale, typeof sharedPresenceCopy> = {
  en: sharedPresenceCopy,
  id: sharedPresenceCopy,
  ja: sharedPresenceCopy,
  zh: sharedPresenceCopy,
};

type PresencePageProps = {
  searchParams?: Promise<SearchParamsLike>;
};

function PresenceAsideLink({
  href,
  code,
  label,
  locale,
  external = false,
}: {
  href: string;
  code: string;
  label: string;
  locale: Locale;
  external?: boolean;
}) {
  const content = (
    <>
      <span>{code}</span>
      <div>
        <strong>{label}</strong>
        <p>{href.replace(/^https?:\/\//, "")}</p>
      </div>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="gaea-subpage-aside-row gaea-subpage-aside-link"
      >
        {content}
      </a>
    );
  }

  return (
    <LocalizedLink
      href={href}
      locale={locale}
      className="gaea-subpage-aside-row gaea-subpage-aside-link"
    >
      {content}
    </LocalizedLink>
  );
}

function PresenceRouteLink({
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

function PresenceActionLink({
  href,
  label,
  locale,
  variant,
}: {
  href: string;
  label: string;
  locale: Locale;
  variant: "strong" | "button";
}) {
  const className =
    variant === "strong" ? "gaea-action gaea-action-strong" : "gaea-action";

  return (
    <LocalizedLink href={href} locale={locale} className={className}>
      {label}
    </LocalizedLink>
  );
}

export default async function PresencePage({ searchParams }: PresencePageProps) {
  const locale = getLocaleFromSearchParams(
    searchParams ? await searchParams : undefined
  );
  const copy = presenceCopy[locale];

  const githubOwner =
    process.env.NEXT_PUBLIC_GITHUB_ORG?.trim() || defaultGithubOwner;
  const githubProfileUrl = `https://github.com/${githubOwner}`;

  const xAccountRaw = process.env.NEXT_PUBLIC_X_ACCOUNT?.trim() || "@Xenorlabs";
  const xAccount = xAccountRaw.startsWith("@") ? xAccountRaw : `@${xAccountRaw}`;
  const xHandle = xAccount.replace(/^@/, "");
  const xUrl = `https://x.com/${xHandle}`;

  const resolvedHeroRoutes = copy.hero.aside.items.map((item) => ({
    ...item,
    href:
      item.href === "github"
        ? githubProfileUrl
        : item.href === "x"
          ? xUrl
          : item.href,
  }));

  const resolvedRows = copy.official.rows.map((row) => ({
    ...row,
    href:
      row.href === "github"
        ? githubProfileUrl
        : row.href === "x"
          ? xUrl
          : row.href,
  }));

  return (
    <main className="gaea-home gaea-subpage presence-page">
      <GaeaBackground />
      <GaeaSiteHeader locale={locale} />

      <GaeaSubpageManifesto
        kicker={copy.hero.kicker}
        title={
          <>
            {copy.hero.title[0]}
            <br />
            {copy.hero.title[1]}
          </>
        }
        summary={
          <>
            <p>{copy.hero.body}</p>
            <div className="gaea-market-summary-strip" aria-label="Trust strip">
              {copy.hero.trustStrip.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </>
        }
        meta={[...copy.hero.meta]}
        actions={[
          {
            label: copy.hero.actions.primary,
            href: "/contract",
            variant: "primary",
          },
          {
            label: copy.hero.actions.secondary,
            href: githubProfileUrl,
            external: true,
            variant: "command",
          },
        ]}
        locale={locale}
        asidePlacement="below-copy"
        aside={
          <div className="gaea-subpage-aside-panel presence-manifesto-panel">
            <p className="gaea-subpage-aside-kicker">{copy.hero.aside.kicker}</p>
            <div className="gaea-subpage-aside-list">
              {resolvedHeroRoutes.map((route) => (
                <PresenceAsideLink
                  key={route.code}
                  href={route.href}
                  code={route.code}
                  label={route.label}
                  locale={locale}
                  external={route.external}
                />
              ))}
            </div>
          </div>
        }
      />

      <section className="gaea-access-section gaea-market-proof-section presence-official-section">
        <div className="container gaea-access-grid">
          <div className="gaea-access-intro">
            <p className="gaea-kicker">{copy.official.kicker}</p>
            <h2>{copy.official.title}</h2>
            <p className="gaea-section-copy">{copy.official.body}</p>
          </div>

          <div className="gaea-access-rows">
            {resolvedRows.map((row) => (
              <PresenceRouteLink
                key={`${row.title}-${row.href}`}
                href={row.href}
                title={row.title}
                tag={row.tag}
                body={row.body}
                locale={locale}
                openLabel={copy.official.openLabel}
                external={"external" in row ? row.external : false}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="gaea-market-section gaea-market-section-soft">
        <div className="container gaea-market-split">
          <div className="gaea-section-head gaea-section-head-tight">
            <p className="gaea-kicker">{copy.accounts.kicker}</p>
            <h2>{copy.accounts.title}</h2>
            <p className="gaea-section-copy">{copy.accounts.body}</p>
          </div>

          <article className="gaea-market-focus-card">
            <p className="gaea-market-card-label">Trust boundary</p>
            <div className="gaea-market-signal-list">
              {copy.accounts.signals.map((signal) => (
                <div key={signal} className="gaea-market-signal">
                  <span>official</span>
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
            <p className="gaea-kicker">{copy.boundaries.kicker}</p>
            <h2>{copy.boundaries.title}</h2>
            <p className="gaea-section-copy">{copy.boundaries.body}</p>
          </div>

          <div className="gaea-market-capability-grid presence-boundary-grid">
            {copy.boundaries.cards.map((card) => (
              <article key={card.title} className="gaea-market-capability">
                <p className="gaea-market-card-label">Boundary</p>
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="gaea-market-cta-section presence-trust-section">
        <div className="container">
          <div className="gaea-market-cta">
            <div className="gaea-market-cta-copy">
              <p className="gaea-kicker">{copy.trust.kicker}</p>
              <h2>{copy.trust.title}</h2>
              <p>{copy.trust.body}</p>
            </div>

            <div className="gaea-market-cta-actions">
              <PresenceActionLink
                href="/contract"
                label={copy.trust.actions.contract}
                locale={locale}
                variant="strong"
              />
              <PresenceActionLink
                href="/repositories"
                label={copy.trust.actions.repositories}
                locale={locale}
                variant="button"
              />
            </div>
          </div>
        </div>
      </section>

      <GaeaSiteFooter locale={locale} />
    </main>
  );
}
