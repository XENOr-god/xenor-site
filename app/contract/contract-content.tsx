"use client";

import { useEffect, useMemo, useState } from "react";
import { GaeaSubpageManifesto } from "../components/gaea-subpage-manifesto";
import { LocalizedLink } from "../components/localized-link";
import type { MarketPair } from "../lib/dexscreener";
import { getIntlLocale, normalizeLocale, type Locale } from "../lib/i18n";
import {
  fetchMarketSurface,
  getContractConfig,
  getDexUrl,
  getExplorerUrl,
  getTradingUrl,
  isPlaceholderAddress,
  validateContractAddress,
  type AddressValidation,
  type ContractConfig,
  type MarketSurfaceState,
} from "../lib/market";
import type { TokenIntelSnapshot } from "../lib/token-intel";
import { DEXSCREENER_HOSTS, toAllowedExternalUrl } from "../lib/url-security";

type CopyState = "idle" | "copied" | "error";

type ReadinessItem = {
  label: string;
  ready: boolean;
};

type TokenInfoTone = "safe" | "risk" | "info" | "muted" | "neutral";

const tokenInfoSafeThresholds = {
  top10H: 20,
  devH: 3,
  snipersH: 3,
  insiders: 12,
  bundlers: 12,
  lpBurned: 95,
  holders: 700,
  proTraders: 150,
} as const;

const sharedContractCopy = {
  status: {
    preLaunch: "Pre-launch",
    verificationPending: "Verification pending",
    live: "Live",
    canonical: "Canonical",
  },
  manifest: {
    kicker: "Launch Context",
    title: ["Canonical contract.", "Clear market surface."],
    summary:
      "This page exists to make the XENØr launch surface easy to verify. If public market routes exist, they should resolve back to this page, the official repositories, and the official public presence.",
    trustStrip: [
      "One contract surface.",
      "One public route.",
      "One canonical reference.",
    ],
    meta: {
      canonicalAddress: "canonical address",
      launchContext: "launch context",
    },
    aside: {
      kicker: "Interpretation",
      body: "The token is a market-facing layer around a deeper systems thesis.",
      note: "Read the token through the system, not price action alone.",
    },
    actions: {
      explorer: "View explorer",
      dex: "Open DexScreener",
    },
  },
  addressPanel: {
    currentCa: "Contract address",
    copyCa: "Copy CA",
    addressCopied: "CA copied",
    copyFailed: "Copy failed",
    viewExplorer: "View explorer",
    openTrading: "Open trading route",
    placeholder: "SOON",
    trustNote: "Only treat routes linked from this page as canonical.",
    validationLabel: "Validation",
  },
  context: {
    kicker: "Launch Meaning",
    title: "What the token represents, what it does not, and how the launch should be read.",
    description:
      "XENØr keeps the market-facing layer explicit so launch visitors can understand the token quickly without losing the underlying system context.",
    cards: [
      {
        label: "Represents",
        title: "What the XENØr token represents",
        body:
          "The XENØr token is the public market surface around a protocol research direction focused on stronger crypto systems, pressure-aware design, and inspectable reasoning.",
        note: "It is a market-facing layer around a deeper systems thesis.",
      },
      {
        label: "Does not represent",
        title: "What it does not represent",
        points: [
          "It does not mean the research is finished.",
          "It does not replace architecture, repositories, or technical evidence.",
          "It does not turn XENØr into a hype-first project.",
          "It is not a substitute for the underlying system work.",
        ],
      },
      {
        label: "How to read the launch",
        title: "How to read the launch",
        body:
          "The launch should be read as a public-facing market layer around XENØr's broader research direction. The serious value remains in the architecture, repositories, public reasoning, and research discipline behind it.",
        strip: [
          "Market surface above.",
          "Systems work underneath.",
        ],
      },
    ],
  },
  references: {
    kicker: "Verification Surface",
    title: "Canonical verification surface",
    description: "Only treat routes linked from this page as canonical.",
    rows: {
      contractAddress: {
        title: "Contract address",
        tag: "canonical reference",
        body: "The onchain reference for the XENØr launch surface.",
      },
      explorer: {
        title: "Explorer",
        tag: "verification",
        body: "Verify the contract through the canonical explorer route.",
      },
      market: {
        title: "DexScreener",
        tag: "market route",
        body: "Follow the canonical market surface once the contract is indexed.",
      },
      trading: {
        title: "Market route",
        tag: "launch route",
        body: "Open the canonical trading route associated with this surface.",
      },
      github: {
        title: "GitHub",
        tag: "code",
        body: "Inspect repositories, history, and the public implementation record.",
      },
      presence: {
        title: "Official presence",
        tag: "channels",
        body: "Verify the communication boundary and public trust surface.",
      },
      architecture: {
        title: "Architecture",
        tag: "structure",
        body: "Inspect how the system separates execution, validation, and release surfaces.",
      },
      repositories: {
        title: "Repositories",
        tag: "modules",
        body: "Review xenor-core, xenor-sim, and xenor-site from one canonical route.",
      },
    },
    openLabel: "open route",
  },
  marketStats: {
    kicker: "Market Reference",
    title: "Market telemetry summary",
    labels: {
      pair: "Pair",
      chain: "Chain",
      dex: "DEX",
      priceUsd: "Price USD",
      liquidity: "Liquidity",
      volume24h: "24h Volume",
      fdvMcap: "FDV / MCap",
      pairAge: "Pair age",
      pairStatus: "Pair status",
    },
    status: {
      loading: "Loading",
      activePair: "Active pair detected",
      awaiting: "Awaiting indexing",
      unavailable: "Unavailable",
      notLive: "Not live",
    },
  },
  tokenInfo: {
    kicker: "Token Telemetry",
    title: "Token metrics snapshot",
    awaiting: "Awaiting token intel snapshot.",
    updatedJustNow: "Updated just now",
    updatedAgo: "Updated",
    unknown: "Unknown",
    paid: "Paid",
    unpaid: "Unpaid",
    labels: {
      top10H: "Top 10 H",
      devH: "Dev H",
      snipersH: "Snipers H",
      insiders: "Insiders",
      bundlers: "Bundlers",
      lpBurned: "LP Burned",
      holders: "Holders",
      proTraders: "Pro Traders",
      dexPaid: "Dex Paid",
    },
  },
  chart: {
    kicker: "Market Surface",
    liveSurface: "Live market surface",
    marketSurfaceSuffix: "market surface",
    liveDescription:
      "Market telemetry is live. This panel provides market context, while the canonical DexScreener route carries the broader surface.",
    embedDescription:
      "Live chart is embedded from the canonical DexScreener route.",
    offlineTitle: "Market surface is offline",
    pendingTitle: "Market surface appears once the token is live",
    checking: "Checking market indexers for active pair data.",
    openDex: "Open DexScreener",
    copyCa: "Copy CA",
    viewChannels: "View official channels",
    footnoteReady:
      "This surface appears after the canonical token is indexed by market trackers.",
    footnoteOffline:
      "DexScreener remains offline until the official contract address is published.",
    messages: {
      dexOffline:
        "DexScreener remains offline until the official contract address is published.",
      live: "Market telemetry is live.",
      preLaunch:
        "Market telemetry is offline until the official contract address is published.",
      invalidAddress:
        "The published contract address does not yet pass validation. Market telemetry activates after verification.",
      error:
        "Market data is temporarily unavailable. Canonical links remain the current reference.",
    },
  },
  readiness: {
    kicker: "Launch Verification",
    title: "What is currently verifiable",
    description:
      "These checks track what can be confirmed through current canonical routes and currently published launch references.",
    ok: "OK",
    pending: "..",
    items: [
      "Canonical contract published",
      "Address format validated",
      "Explorer reference available",
      "Primary pair indexed",
      "Market route available",
    ],
  },
  safety: {
    title: "Trust note",
    text:
      "Only treat routes linked from this page as canonical. Verify chain, explorer, and route continuity before acting.",
  },
  finalNote: {
    title: "Read the token through the system.",
    body:
      "XENØr should not be interpreted through price action alone. The token is only one public layer. The underlying architecture, repositories, and research surface remain the deeper source of meaning.",
  },
  numbers: {
    justIndexed: "Just indexed",
    daySuffix: "d",
    hourSuffix: "h",
    notAvailable: "-",
    notConfigured: "Not configured",
  },
} as const;

const contractCopy: Record<Locale, typeof sharedContractCopy> = {
  en: sharedContractCopy,
  id: sharedContractCopy,
  ja: sharedContractCopy,
  zh: sharedContractCopy,
};

type ContractLocaleCopy = (typeof contractCopy)[Locale];

function formatCompactUsd(value: number | null, locale: Locale): string {
  if (value === null || !Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat(getIntlLocale(locale), {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPriceUsd(value: number | null, locale: Locale): string {
  if (value === null || !Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat(getIntlLocale(locale), {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value < 1 ? 6 : 4,
  }).format(value);
}

function formatPairAge(
  timestamp: number | null,
  locale: Locale,
  copy: ContractLocaleCopy
): string {
  if (!timestamp || !Number.isFinite(timestamp)) {
    return copy.numbers.notAvailable;
  }

  const created = new Date(timestamp).getTime();
  const diff = Date.now() - created;

  if (diff <= 0) {
    return copy.numbers.justIndexed;
  }

  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;

  if (diff >= day) {
    return `${Math.floor(diff / day)}${copy.numbers.daySuffix}`;
  }

  return `${Math.max(1, Math.floor(diff / hour))}${copy.numbers.hourSuffix}`;
}

function formatPercentMetric(value: number | null): string {
  if (value === null || !Number.isFinite(value)) {
    return "-";
  }

  return `${value.toFixed(2)}%`;
}

function formatCountMetric(value: number | null, locale: Locale): string {
  if (value === null || !Number.isFinite(value)) {
    return "-";
  }

  return new Intl.NumberFormat(getIntlLocale(locale)).format(
    Math.max(0, Math.round(value))
  );
}

function formatPaidMetric(
  value: boolean | null,
  copy: ContractLocaleCopy
): string {
  if (value === null) {
    return copy.tokenInfo.unknown;
  }

  return value ? copy.tokenInfo.paid : copy.tokenInfo.unpaid;
}

function formatFreshness(
  updatedAt: string | undefined,
  locale: Locale,
  copy: ContractLocaleCopy
): string {
  if (!updatedAt) {
    return copy.tokenInfo.awaiting;
  }

  const ts = new Date(updatedAt).getTime();
  if (!Number.isFinite(ts)) {
    return copy.tokenInfo.awaiting;
  }

  const diffSeconds = Math.max(0, Math.floor((Date.now() - ts) / 1000));

  if (diffSeconds < 5) {
    return copy.tokenInfo.updatedJustNow;
  }

  if (diffSeconds < 60) {
    return new Intl.RelativeTimeFormat(getIntlLocale(locale), {
      numeric: "auto",
    }).format(-diffSeconds, "second");
  }

  return new Intl.RelativeTimeFormat(getIntlLocale(locale), {
    numeric: "auto",
  }).format(-Math.floor(diffSeconds / 60), "minute");
}

function toneForLowRiskPercent(value: number | null, safeMax: number): TokenInfoTone {
  if (value === null || !Number.isFinite(value)) {
    return "muted";
  }

  return value <= safeMax ? "safe" : "risk";
}

function toneForHighPercent(value: number | null, safeMin: number): TokenInfoTone {
  if (value === null || !Number.isFinite(value)) {
    return "muted";
  }

  return value >= safeMin ? "safe" : "risk";
}

function toneForCount(value: number | null, safeMin: number): TokenInfoTone {
  if (value === null || !Number.isFinite(value)) {
    return "muted";
  }

  return value >= safeMin ? "safe" : "neutral";
}

function toDexEmbedUrl(url: string): string {
  const safeUrl = toAllowedExternalUrl(url, DEXSCREENER_HOSTS);
  if (!safeUrl) {
    return "";
  }

  try {
    const parsed = new URL(safeUrl);
    parsed.searchParams.set("embed", "1");
    parsed.searchParams.set("theme", "dark");
    parsed.searchParams.set("trades", "0");
    parsed.searchParams.set("info", "0");

    return parsed.toString();
  } catch {
    return "";
  }
}

function getStatusBadge(
  config: ContractConfig,
  loading: boolean,
  marketState: MarketSurfaceState,
  addressValidation: AddressValidation,
  copy: ContractLocaleCopy
): string {
  if (isPlaceholderAddress(config.contractAddress)) {
    return copy.status.preLaunch;
  }

  if (!addressValidation.isValid) {
    return copy.status.verificationPending;
  }

  if (loading) {
    return copy.status.verificationPending;
  }

  if (marketState.status === "live") {
    return copy.status.live;
  }

  return copy.status.canonical;
}

function buildReadinessItems(
  config: ContractConfig,
  marketState: MarketSurfaceState,
  addressValidation: AddressValidation,
  explorerUrl: string,
  hasMarketRoute: boolean,
  copy: ContractLocaleCopy
): ReadinessItem[] {
  const checks = new Map<string, boolean>(
    copy.readiness.items.map((entry) => [entry, false])
  );

  checks.set(copy.readiness.items[0], !isPlaceholderAddress(config.contractAddress));
  checks.set(copy.readiness.items[1], addressValidation.isValid);
  checks.set(copy.readiness.items[2], Boolean(explorerUrl));
  checks.set(copy.readiness.items[3], marketState.status === "live");
  checks.set(copy.readiness.items[4], hasMarketRoute);

  return Array.from(checks.entries()).map(([label, ready]) => ({
    label,
    ready,
  }));
}

function LaunchContextSection({ copy }: { copy: ContractLocaleCopy }) {
  return (
    <section className="section section-animate contract-context-section">
      <div className="container">
        <div className="section-head">
          <p className="section-kicker">{copy.context.kicker}</p>
          <h2>{copy.context.title}</h2>
          <p>{copy.context.description}</p>
        </div>

        <div className="topic-grid">
          {copy.context.cards.map((card) => (
            <article key={card.title} className="panel-card contract-context-card">
              <p className="contract-label">{card.label}</p>
              <h3>{card.title}</h3>
              {"body" in card && card.body ? <p>{card.body}</p> : null}
              {"note" in card && card.note ? (
                <p className="gaea-market-note">{card.note}</p>
              ) : null}
              {"points" in card && card.points ? (
                <ul className="contract-context-points">
                  {card.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
              {"strip" in card && card.strip ? (
                <div className="gaea-market-summary-strip" aria-label="Launch summary">
                  {card.strip.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContractRouteLink({
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

function OfficialReferencesSection({
  locale,
  config,
  copyState,
  onCopy,
  statusBadge,
  addressValidation,
  explorerUrl,
  dexUrl,
  dexScreenerEnabled,
  tradingUrl,
  copy,
}: {
  locale: Locale;
  config: ContractConfig;
  copyState: CopyState;
  onCopy: () => Promise<void>;
  statusBadge: string;
  addressValidation: AddressValidation;
  explorerUrl: string;
  dexUrl: string;
  dexScreenerEnabled: boolean;
  tradingUrl: string;
  copy: ContractLocaleCopy;
}) {
  const hasCanonical = !isPlaceholderAddress(config.contractAddress);
  const canCopy = hasCanonical && addressValidation.isValid;

  return (
    <section className="gaea-access-section gaea-market-proof-section contract-reference-section">
      <div className="container gaea-access-grid">
        <div className="gaea-access-intro">
          <p className="gaea-kicker">{copy.references.kicker}</p>
          <h2>{copy.references.title}</h2>
          <p className="gaea-section-copy">{copy.references.description}</p>
        </div>

        <div className="contract-verification-surface">
          <article className="gaea-access-row contract-access-row">
            <div className="gaea-access-row-title">
              <strong>{copy.references.rows.contractAddress.title}</strong>
              <span>{copy.references.rows.contractAddress.tag}</span>
            </div>
            <div className="contract-access-copy">
              <p>{copy.references.rows.contractAddress.body}</p>
              <code className="contract-access-code" title={config.contractAddress}>
                {hasCanonical
                  ? config.contractAddress
                  : copy.addressPanel.placeholder}
              </code>
            </div>
            <div className="contract-access-actions">
              <button
                type="button"
                className="button button-primary"
                onClick={onCopy}
                disabled={!canCopy}
              >
                {copyState === "copied"
                  ? copy.addressPanel.addressCopied
                  : copyState === "error"
                    ? copy.addressPanel.copyFailed
                    : copy.addressPanel.copyCa}
              </button>
              <span className="contract-status-badge">{statusBadge}</span>
            </div>
          </article>

          <div className="gaea-access-rows">
            <ContractRouteLink
              href={explorerUrl || "#"}
              title={copy.references.rows.explorer.title}
              tag={copy.references.rows.explorer.tag}
              body={copy.references.rows.explorer.body}
              locale={locale}
              openLabel={copy.references.openLabel}
              external
            />

            {dexScreenerEnabled ? (
              <ContractRouteLink
                href={dexUrl}
                title={copy.references.rows.market.title}
                tag={copy.references.rows.market.tag}
                body={copy.references.rows.market.body}
                locale={locale}
                openLabel={copy.references.openLabel}
                external
              />
            ) : tradingUrl ? (
              <ContractRouteLink
                href={tradingUrl}
                title={copy.references.rows.trading.title}
                tag={copy.references.rows.trading.tag}
                body={copy.references.rows.trading.body}
                locale={locale}
                openLabel={copy.references.openLabel}
                external
              />
            ) : null}

            <ContractRouteLink
              href={config.githubUrl}
              title={copy.references.rows.github.title}
              tag={copy.references.rows.github.tag}
              body={copy.references.rows.github.body}
              locale={locale}
              openLabel={copy.references.openLabel}
              external
            />

            <ContractRouteLink
              href="/presence"
              title={copy.references.rows.presence.title}
              tag={copy.references.rows.presence.tag}
              body={copy.references.rows.presence.body}
              locale={locale}
              openLabel={copy.references.openLabel}
            />

            <ContractRouteLink
              href="/architecture"
              title={copy.references.rows.architecture.title}
              tag={copy.references.rows.architecture.tag}
              body={copy.references.rows.architecture.body}
              locale={locale}
              openLabel={copy.references.openLabel}
            />

            <ContractRouteLink
              href="/repositories"
              title={copy.references.rows.repositories.title}
              tag={copy.references.rows.repositories.tag}
              body={copy.references.rows.repositories.body}
              locale={locale}
              openLabel={copy.references.openLabel}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function MarketStatsCard({
  loading,
  marketState,
  pair,
  locale,
  copy,
}: {
  loading: boolean;
  marketState: MarketSurfaceState;
  pair: MarketPair | null;
  locale: Locale;
  copy: ContractLocaleCopy;
}) {
  const pairStatus =
    loading
      ? copy.marketStats.status.loading
      : marketState.status === "live"
        ? copy.marketStats.status.activePair
        : marketState.status === "error"
          ? copy.marketStats.status.unavailable
          : pair
            ? copy.marketStats.status.awaiting
            : copy.marketStats.status.notLive;

  return (
    <article className="panel-card contract-market-stats-card">
      <div className="contract-market-card-head">
        <p className="section-kicker">{copy.marketStats.kicker}</p>
        <h3>{copy.marketStats.title}</h3>
      </div>

      <dl>
        <div>
          <dt>{copy.marketStats.labels.pair}</dt>
          <dd>{pair?.pairLabel ?? "-"}</dd>
        </div>
        <div>
          <dt>{copy.marketStats.labels.chain}</dt>
          <dd>{pair?.chainId ?? "-"}</dd>
        </div>
        <div>
          <dt>{copy.marketStats.labels.dex}</dt>
          <dd>{pair?.dexId ?? "-"}</dd>
        </div>
        <div>
          <dt>{copy.marketStats.labels.priceUsd}</dt>
          <dd>{formatPriceUsd(pair?.priceUsd ?? null, locale)}</dd>
        </div>
        <div>
          <dt>{copy.marketStats.labels.liquidity}</dt>
          <dd>{formatCompactUsd(pair?.liquidityUsd ?? null, locale)}</dd>
        </div>
        <div>
          <dt>{copy.marketStats.labels.volume24h}</dt>
          <dd>{formatCompactUsd(pair?.volume24h ?? null, locale)}</dd>
        </div>
        <div>
          <dt>{copy.marketStats.labels.fdvMcap}</dt>
          <dd>
            {formatCompactUsd(pair?.fdv ?? null, locale)} / {formatCompactUsd(
              pair?.marketCap ?? null,
              locale
            )}
          </dd>
        </div>
        <div>
          <dt>{copy.marketStats.labels.pairAge}</dt>
          <dd>{formatPairAge(pair?.pairCreatedAt ?? null, locale, copy)}</dd>
        </div>
        <div>
          <dt>{copy.marketStats.labels.pairStatus}</dt>
          <dd>{pairStatus}</dd>
        </div>
      </dl>
    </article>
  );
}

function TokenInfoCard({
  loading,
  tokenIntel,
  locale,
  copy,
}: {
  loading: boolean;
  tokenIntel: TokenIntelSnapshot | null;
  locale: Locale;
  copy: ContractLocaleCopy;
}) {
  const metricsSource = tokenIntel?.metrics;
  const isUnavailable = tokenIntel?.status === "unavailable";
  const statusText =
    loading && !tokenIntel
      ? copy.tokenInfo.awaiting
      : formatFreshness(tokenIntel?.updatedAt, locale, copy);

  const metrics = [
    {
      label: copy.tokenInfo.labels.top10H,
      value: formatPercentMetric(metricsSource?.top10H ?? null),
      tone: toneForLowRiskPercent(
        metricsSource?.top10H ?? null,
        tokenInfoSafeThresholds.top10H
      ),
    },
    {
      label: copy.tokenInfo.labels.devH,
      value: formatPercentMetric(metricsSource?.devH ?? null),
      tone: toneForLowRiskPercent(metricsSource?.devH ?? null, tokenInfoSafeThresholds.devH),
    },
    {
      label: copy.tokenInfo.labels.snipersH,
      value: formatPercentMetric(metricsSource?.snipersH ?? null),
      tone: toneForLowRiskPercent(
        metricsSource?.snipersH ?? null,
        tokenInfoSafeThresholds.snipersH
      ),
    },
    {
      label: copy.tokenInfo.labels.insiders,
      value: formatPercentMetric(metricsSource?.insiders ?? null),
      tone: toneForLowRiskPercent(
        metricsSource?.insiders ?? null,
        tokenInfoSafeThresholds.insiders
      ),
    },
    {
      label: copy.tokenInfo.labels.bundlers,
      value: formatPercentMetric(metricsSource?.bundlers ?? null),
      tone: toneForLowRiskPercent(
        metricsSource?.bundlers ?? null,
        tokenInfoSafeThresholds.bundlers
      ),
    },
    {
      label: copy.tokenInfo.labels.lpBurned,
      value: formatPercentMetric(metricsSource?.lpBurned ?? null),
      tone: toneForHighPercent(
        metricsSource?.lpBurned ?? null,
        tokenInfoSafeThresholds.lpBurned
      ),
    },
    {
      label: copy.tokenInfo.labels.holders,
      value: formatCountMetric(metricsSource?.holders ?? null, locale),
      tone: toneForCount(metricsSource?.holders ?? null, tokenInfoSafeThresholds.holders),
    },
    {
      label: copy.tokenInfo.labels.proTraders,
      value: formatCountMetric(metricsSource?.proTraders ?? null, locale),
      tone: toneForCount(
        metricsSource?.proTraders ?? null,
        tokenInfoSafeThresholds.proTraders
      ),
    },
    {
      label: copy.tokenInfo.labels.dexPaid,
      value: formatPaidMetric(metricsSource?.dexPaid ?? null, copy),
      tone:
        metricsSource?.dexPaid === null
          ? ("muted" as const)
          : metricsSource?.dexPaid
            ? ("safe" as const)
            : ("risk" as const),
    },
  ];

  return (
    <article className="panel-card contract-token-info-card">
      <div className="contract-market-card-head contract-token-info-head">
        <p className="section-kicker">{copy.tokenInfo.kicker}</p>
        <h3>{copy.tokenInfo.title}</h3>
        <p className="contract-token-info-status">{statusText}</p>
      </div>

      <div className="contract-token-info-grid">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className={`contract-token-info-item is-${metric.tone}`}
          >
            <span>{metric.label}</span>
            <strong>{metric.value}</strong>
          </div>
        ))}
      </div>

      {isUnavailable && tokenIntel?.note ? (
        <p className="contract-token-info-note">{tokenIntel.note}</p>
      ) : null}
    </article>
  );
}

function MarketChartPanel({
  loading,
  marketState,
  pair,
  dexUrl,
  dexScreenerEnabled,
  onCopy,
  canCopy,
  copy,
}: {
  loading: boolean;
  marketState: MarketSurfaceState;
  pair: MarketPair | null;
  dexUrl: string;
  dexScreenerEnabled: boolean;
  onCopy: () => Promise<void>;
  canCopy: boolean;
  copy: ContractLocaleCopy;
}) {
  const [embedFailed, setEmbedFailed] = useState(false);
  const embedUrl = toDexEmbedUrl(dexUrl);
  const fallbackMessage =
    !dexScreenerEnabled
      ? copy.chart.messages.dexOffline
      : marketState.status === "live"
        ? copy.chart.messages.live
        : marketState.message;

  if (dexScreenerEnabled && embedUrl) {
    return (
      <article className="panel-card contract-chart-panel">
        <div className="contract-chart-head">
          <p className="section-kicker">{copy.chart.kicker}</p>
          <h3>
            {pair
              ? `${pair.pairLabel} ${copy.chart.marketSurfaceSuffix}`
              : copy.chart.liveSurface}
          </h3>
          <p>
            {marketState.status === "live"
              ? copy.chart.liveDescription
              : copy.chart.embedDescription}
          </p>
        </div>

        {!embedFailed ? (
          <div className="contract-chart-live-embed">
            <iframe
              title="DexScreener chart"
              src={embedUrl}
              loading="lazy"
              onError={() => setEmbedFailed(true)}
            />
          </div>
        ) : (
          <div className="contract-chart-live-fallback" aria-hidden="true">
            <svg viewBox="0 0 840 300" className="contract-chart-svg">
              <g className="contract-chart-grid">
                {Array.from({ length: 8 }).map((_, index) => (
                  <line
                    key={`h-${index}`}
                    x1="20"
                    y1={20 + index * 36}
                    x2="820"
                    y2={20 + index * 36}
                  />
                ))}
                {Array.from({ length: 14 }).map((_, index) => (
                  <line
                    key={`v-${index}`}
                    x1={20 + index * 60}
                    y1="20"
                    x2={20 + index * 60}
                    y2="272"
                  />
                ))}
              </g>
              <path
                className="contract-chart-line"
                d="M 22 214 C 86 202, 132 178, 188 182 C 238 186, 290 210, 336 195 C 392 177, 439 112, 500 119 C 559 124, 614 182, 670 174 C 716 167, 764 131, 818 138"
              />
            </svg>
          </div>
        )}

        <div className="contract-chart-actions">
          <a
            className="button button-ghost"
            href={dexUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.chart.openDex}
          </a>
        </div>
      </article>
    );
  }

  return (
    <article className="panel-card contract-chart-panel">
      <div className="contract-chart-head">
        <p className="section-kicker">{copy.chart.kicker}</p>
        <h3>
          {dexScreenerEnabled
            ? copy.chart.pendingTitle
            : copy.chart.offlineTitle}
        </h3>
        <p>
          {loading && dexScreenerEnabled
            ? copy.chart.checking
            : fallbackMessage}
        </p>
      </div>

      <div className="contract-chart-placeholder" aria-hidden="true">
        <svg viewBox="0 0 840 300" className="contract-chart-svg">
          <g className="contract-chart-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <line
                key={`h-${index}`}
                x1="20"
                y1={20 + index * 36}
                x2="820"
                y2={20 + index * 36}
              />
            ))}
            {Array.from({ length: 14 }).map((_, index) => (
              <line
                key={`v-${index}`}
                x1={20 + index * 60}
                y1="20"
                x2={20 + index * 60}
                y2="272"
              />
            ))}
          </g>
          <path
            className="contract-chart-line muted"
            d="M 22 214 C 86 214, 132 214, 188 214 C 238 214, 290 214, 336 214 C 392 214, 439 214, 500 214 C 559 214, 614 214, 670 214 C 716 214, 764 214, 818 214"
          />
        </svg>
      </div>

      <p className="contract-chart-footnote">
        {dexScreenerEnabled
          ? copy.chart.footnoteReady
          : copy.chart.footnoteOffline}
      </p>

      <div className="contract-chart-actions">
        <button
          type="button"
          className="button button-primary"
          onClick={onCopy}
          disabled={!canCopy}
        >
          {copy.chart.copyCa}
        </button>
        <a
          className="button button-ghost"
          href="https://x.com/Xenorlabs"
          target="_blank"
          rel="noopener noreferrer"
        >
          {copy.chart.viewChannels}
        </a>
      </div>
    </article>
  );
}

function LaunchReadinessPanel({
  items,
  copy,
}: {
  items: ReadinessItem[];
  copy: ContractLocaleCopy;
}) {
  return (
    <section className="section section-soft section-animate compact-top contract-readiness-section">
      <div className="container">
        <div className="section-head contract-readiness-head">
          <p className="section-kicker">{copy.readiness.kicker}</p>
          <h2>{copy.readiness.title}</h2>
          <p>{copy.readiness.description}</p>
        </div>

        <div className="contract-market-check-grid">
          {items.map((item) => (
            <article
              key={item.label}
              className={`panel-card contract-market-check ${
                item.ready ? "is-ready" : "is-pending"
              }`}
            >
              <span aria-hidden="true">
                {item.ready ? copy.readiness.ok : copy.readiness.pending}
              </span>
              <p>{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SafetyNotice({ copy }: { copy: ContractLocaleCopy }) {
  return (
    <article className="panel-card contract-safety-note">
      <p className="contract-safety-title">{copy.safety.title}</p>
      <p>{copy.safety.text}</p>
    </article>
  );
}

export function ContractContent({ locale }: { locale: Locale }) {
  const activeLocale = normalizeLocale(locale);
  const copy = contractCopy[activeLocale];
  const config = useMemo(() => getContractConfig(), []);
  const [copyState, setCopyState] = useState<CopyState>("idle");
  const [marketState, setMarketState] = useState<MarketSurfaceState>({
    status: "pre-launch",
    message: copy.chart.messages.preLaunch,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [tokenIntel, setTokenIntel] = useState<TokenIntelSnapshot | null>(null);
  const addressValidation = useMemo(
    () => validateContractAddress(config.chainId, config.contractAddress),
    [config.chainId, config.contractAddress]
  );

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function loadSurfaces(markLoading: boolean) {
      if (markLoading) {
        setIsLoading(true);
      }

      let nextMarket: MarketSurfaceState;
      try {
        nextMarket = await fetchMarketSurface(config, controller.signal);
      } catch {
        nextMarket = {
          status: "error",
          message: copy.chart.messages.error,
        };
      }

      let nextTokenIntel: TokenIntelSnapshot | null = null;
      try {
        const response = await fetch("/api/token-intel", {
          method: "GET",
          cache: "no-store",
          signal: controller.signal,
        });

        if (response.ok) {
          nextTokenIntel = (await response.json()) as TokenIntelSnapshot;
        }
      } catch {
        nextTokenIntel = null;
      }

      if (!active) {
        return;
      }

      setMarketState(nextMarket);
      if (nextTokenIntel) {
        setTokenIntel(nextTokenIntel);
      }
      setIsLoading(false);
    }

    void loadSurfaces(true);

    const timer = window.setInterval(() => {
      void loadSurfaces(false);
    }, 45000);

    return () => {
      active = false;
      controller.abort();
      window.clearInterval(timer);
    };
  }, [config, copy.chart.messages.error, copy.chart.messages.preLaunch]);

  const pair = marketState.status === "live" ? marketState.pair : null;
  const statusBadge = getStatusBadge(
    config,
    isLoading,
    marketState,
    addressValidation,
    copy
  );
  const explorerUrl = getExplorerUrl(config);
  const dexUrl = getDexUrl(config, pair ?? undefined);
  const dexScreenerEnabled =
    !isPlaceholderAddress(config.contractAddress) &&
    Boolean(dexUrl) &&
    dexUrl !== "https://dexscreener.com";
  const tradingUrl = getTradingUrl(config);
  const hasMarketRoute = dexScreenerEnabled || Boolean(tradingUrl);
  const readinessItems = buildReadinessItems(
    config,
    marketState,
    addressValidation,
    explorerUrl,
    hasMarketRoute,
    copy
  );
  const canCopy =
    !isPlaceholderAddress(config.contractAddress) && addressValidation.isValid;

  async function handleCopy() {
    try {
      if (!navigator.clipboard || isPlaceholderAddress(config.contractAddress)) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(config.contractAddress);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 1800);
    }
  }

  return (
    <>
      <GaeaSubpageManifesto
        className="contract-manifesto"
        kicker={copy.manifest.kicker}
        title={
          <>
            <span className="contract-title-line">
              {copy.manifest.title[0]}
            </span>
            <span className="contract-title-line">
              {copy.manifest.title[1]}
            </span>
          </>
        }
        summary={
          <>
            <p>{copy.manifest.summary}</p>
            <div className="gaea-market-thesis-strip" aria-label="Trust strip">
              {copy.manifest.trustStrip.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </>
        }
        meta={[
          copy.manifest.meta.canonicalAddress,
          `${config.chainId.toUpperCase()} chain`,
          copy.manifest.meta.launchContext,
          statusBadge.toLowerCase(),
        ]}
        actions={[
          {
            label: copy.manifest.actions.explorer,
            href: explorerUrl || "#",
            external: true,
            variant: "primary",
          },
          ...(dexScreenerEnabled
            ? [
                {
                  label: copy.manifest.actions.dex,
                  href: dexUrl,
                  external: true,
                  variant: "command" as const,
                },
              ]
            : []),
        ]}
        locale={activeLocale}
        asidePlacement="below-copy"
        aside={
          <article className="gaea-subpage-aside-panel contract-manifesto-panel">
            <p className="gaea-subpage-aside-kicker">{copy.manifest.aside.kicker}</p>
            <p className="contract-manifesto-panel-copy">{copy.manifest.aside.body}</p>
            <p className="contract-manifesto-panel-note">{copy.manifest.aside.note}</p>
          </article>
        }
      />

      <LaunchContextSection copy={copy} />

      <OfficialReferencesSection
        locale={activeLocale}
        config={config}
        copyState={copyState}
        onCopy={handleCopy}
        statusBadge={statusBadge}
        addressValidation={addressValidation}
        explorerUrl={explorerUrl}
        dexUrl={dexUrl}
        dexScreenerEnabled={dexScreenerEnabled}
        tradingUrl={tradingUrl}
        copy={copy}
      />

      <section className="section section-animate contract-market-section">
        <div className="container contract-market-layout">
          <div className="contract-market-main">
            <MarketChartPanel
              loading={isLoading}
              marketState={marketState}
              pair={pair}
              dexUrl={dexUrl}
              dexScreenerEnabled={dexScreenerEnabled}
              onCopy={handleCopy}
              canCopy={canCopy}
              copy={copy}
            />

            <SafetyNotice copy={copy} />
          </div>

          <div className="contract-market-side">
            <TokenInfoCard
              loading={isLoading}
              tokenIntel={tokenIntel}
              locale={activeLocale}
              copy={copy}
            />
            <MarketStatsCard
              loading={isLoading}
              marketState={marketState}
              pair={pair}
              locale={activeLocale}
              copy={copy}
            />
          </div>
        </div>
      </section>

      <LaunchReadinessPanel items={readinessItems} copy={copy} />

      <section className="gaea-market-section contract-final-note-section">
        <div className="container">
          <article className="gaea-market-focus-card contract-final-note">
            <h2>{copy.finalNote.title}</h2>
            <p>{copy.finalNote.body}</p>
          </article>
        </div>
      </section>
    </>
  );
}
