"use client";

import { useEffect, useState } from "react";
import {
  fetchDexPairStatus,
  fetchGitHubLatestCommit,
  normalizeGitHubDateToRelative,
  type DexPairStatus,
  type GitHubLatestCommit,
} from "../lib/presence";
import type { TokenIntelSnapshot } from "../lib/token-intel";

type HomeStatusPanelProps = {
  chainLabel: string;
  contractAddress: string;
  explorerUrl: string;
  dexQuery: string;
  githubOwner: string;
  primaryRepo: string;
};

type FeedItem = {
  label: string;
  value: string;
  tone: "positive" | "neutral" | "warning";
  href?: string;
};

function formatCompactNumber(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function formatCompactUsd(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return "--";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPercent(value: number | null | undefined) {
  if (value === null || value === undefined || !Number.isFinite(value)) {
    return "--";
  }

  return `${value.toFixed(value >= 10 ? 1 : 2)}%`;
}

function truncateMiddle(value: string, start = 6, end = 6) {
  if (value.length <= start + end + 1) {
    return value;
  }

  return `${value.slice(0, start)}...${value.slice(-end)}`;
}

export function HomeStatusPanel({
  chainLabel,
  contractAddress,
  explorerUrl,
  dexQuery,
  githubOwner,
  primaryRepo,
}: HomeStatusPanelProps) {
  const [intel, setIntel] = useState<TokenIntelSnapshot | null>(null);
  const [dexStatus, setDexStatus] = useState<DexPairStatus | null>(null);
  const [latestCommit, setLatestCommit] = useState<GitHubLatestCommit | null>(null);

  useEffect(() => {
    let active = true;

    const load = async () => {
      const [intelResult, dexResult, commitResult] = await Promise.allSettled([
        fetch("/api/token-intel", { cache: "no-store" }).then(async (response) => {
          if (!response.ok) {
            throw new Error("token-intel");
          }

          return (await response.json()) as TokenIntelSnapshot;
        }),
        fetchDexPairStatus(dexQuery),
        fetchGitHubLatestCommit(githubOwner, primaryRepo),
      ]);

      if (!active) {
        return;
      }

      if (intelResult.status === "fulfilled") {
        setIntel(intelResult.value);
      }

      if (dexResult.status === "fulfilled") {
        setDexStatus(dexResult.value);
      }

      if (commitResult.status === "fulfilled") {
        setLatestCommit(commitResult.value);
      }
    };

    void load();

    const interval = window.setInterval(() => {
      void load();
    }, 30_000);

    return () => {
      active = false;
      window.clearInterval(interval);
    };
  }, [dexQuery, githubOwner, primaryRepo]);

  const liquidityValue =
    dexStatus?.status === "live" ? formatCompactUsd(dexStatus.liquidityUsd) : "Indexing";

  const feedItems: FeedItem[] = [
    {
      label: "surface",
      value: "Official XENØR status surface online",
      tone: "positive",
    },
  ];

  if (dexStatus?.status === "live") {
    feedItems.unshift({
      label: "market",
      value: `Live pair with ${formatCompactUsd(dexStatus.liquidityUsd)} liquidity`,
      tone: "positive",
      href: dexStatus.pairUrl,
    });
  } else if (dexStatus?.status === "indexing") {
    feedItems.unshift({
      label: "market",
      value: "Pair discovered, liquidity indexing in progress",
      tone: "warning",
      href: dexStatus.pairUrl,
    });
  } else if (dexStatus?.status === "not_found") {
    feedItems.unshift({
      label: "market",
      value: "Dex route not indexed yet",
      tone: "warning",
    });
  }

  if (latestCommit) {
    feedItems.unshift({
      label: "github",
      value: `${primaryRepo} updated ${normalizeGitHubDateToRelative(latestCommit.date)}`,
      tone: "positive",
      href: latestCommit.url,
    });
  }

  return (
    <aside className="gaea-status-rail" aria-label="Live telemetry">
      <div className="gaea-status-panel">
        <div className="gaea-status-grid">
          <article className="gaea-status-stat">
            <span>Holders</span>
            <strong>{formatCompactNumber(intel?.metrics.holders)}</strong>
          </article>

          <article className="gaea-status-stat">
            <span>Liquidity</span>
            <strong>{liquidityValue}</strong>
          </article>
        </div>

        <div className="gaea-status-rows">
          <div>
            <span>Chain</span>
            <strong>{chainLabel}</strong>
          </div>
          <div>
            <span>Contract</span>
            <a href={explorerUrl} target="_blank" rel="noopener noreferrer">
              {truncateMiddle(contractAddress)}
            </a>
          </div>
          <div>
            <span>Top 10 H</span>
            <strong>{formatPercent(intel?.metrics.top10H)}</strong>
          </div>
          <div>
            <span>Dev H</span>
            <strong>{formatPercent(intel?.metrics.devH)}</strong>
          </div>
          <div>
            <span>LP Burned</span>
            <strong>{formatPercent(intel?.metrics.lpBurned)}</strong>
          </div>
          <div>
            <span>Source</span>
            <strong>{intel?.source ?? "indexed feed"}</strong>
          </div>
        </div>
      </div>

      <div className="gaea-feed-panel">
        <div className="gaea-feed-head">
          <p>Live Feed</p>
          <span>{latestCommit ? normalizeGitHubDateToRelative(latestCommit.date) : "syncing"}</span>
        </div>

        <div className="gaea-feed-list">
          {feedItems.slice(0, 8).map((item) => {
            const content = (
              <>
                <span className={`gaea-feed-tone gaea-feed-tone-${item.tone}`} />
                <p>{item.label}</p>
                <strong>{item.value}</strong>
              </>
            );

            return item.href ? (
              <a
                key={`${item.label}-${item.value}`}
                className="gaea-feed-item"
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                {content}
              </a>
            ) : (
              <div key={`${item.label}-${item.value}`} className="gaea-feed-item">
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
