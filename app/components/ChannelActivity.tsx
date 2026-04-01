"use client";

import { useEffect, useState } from "react";
import {
  fetchDexPairStatus,
  fetchGitHubLatestCommit,
  normalizeGitHubDateToRelative,
} from "../lib/presence";
import { getIntlLocale, normalizeLocale } from "../lib/i18n";

type ChannelActivityProps = {
  type: "github" | "x" | "dex";
  owner?: string;
  repo?: string;
  identifier?: string;
  dexscreenerApi?: string;
  locale?: string;
};

type ActivityState = {
  status: "loading" | "ready" | "empty" | "error";
  text: string;
  href?: string;
};

const activityCopy = {
  en: {
    xUpdates: "Updates appear on the official timeline.",
    loadingActivity: "Loading activity...",
    repoUnavailable: "Repository activity unavailable.",
    noRecentActivity: "No recent activity detected.",
    lastCommit: "Last commit",
    pairUnavailable: "Pair status unavailable.",
    loadingMarket: "Loading market status...",
    livePair: "Live pair",
    liquidity: "Liquidity",
    pairIndexing: "Pair indexing in progress.",
    marketUnavailable: "Market source is temporarily unavailable.",
    noIndexedPair: "No indexed pair detected yet.",
  },
  id: {
    xUpdates: "Pembaruan muncul di timeline resmi.",
    loadingActivity: "Memuat aktivitas...",
    repoUnavailable: "Aktivitas repositori tidak tersedia.",
    noRecentActivity: "Belum ada aktivitas terbaru.",
    lastCommit: "Commit terakhir",
    pairUnavailable: "Status pair tidak tersedia.",
    loadingMarket: "Memuat status market...",
    livePair: "Pair live",
    liquidity: "Likuiditas",
    pairIndexing: "Pengindeksan pair sedang berlangsung.",
    marketUnavailable: "Sumber market sedang tidak tersedia.",
    noIndexedPair: "Belum ada pair yang terindeks.",
  },
  ja: {
    xUpdates: "更新は公式タイムラインに表示されます。",
    loadingActivity: "アクティビティを読み込み中...",
    repoUnavailable: "リポジトリアクティビティを取得できません。",
    noRecentActivity: "最近のアクティビティは見つかりません。",
    lastCommit: "最新コミット",
    pairUnavailable: "ペア状況を取得できません。",
    loadingMarket: "マーケット状況を読み込み中...",
    livePair: "ライブペア",
    liquidity: "流動性",
    pairIndexing: "ペアのインデックス処理中です。",
    marketUnavailable: "マーケットソースは一時的に利用できません。",
    noIndexedPair: "まだインデックス済みのペアはありません。",
  },
  zh: {
    xUpdates: "更新会显示在官方时间线上。",
    loadingActivity: "正在加载活动...",
    repoUnavailable: "仓库活动不可用。",
    noRecentActivity: "暂未检测到近期活动。",
    lastCommit: "最近一次提交",
    pairUnavailable: "交易对状态不可用。",
    loadingMarket: "正在加载市场状态...",
    livePair: "实时交易对",
    liquidity: "流动性",
    pairIndexing: "交易对正在索引中。",
    marketUnavailable: "市场数据源暂时不可用。",
    noIndexedPair: "尚未检测到已索引交易对。",
  },
} as const;

function formatCompactUsd(value: number | null, locale: string): string {
  if (value === null) {
    return "-";
  }

  return new Intl.NumberFormat(getIntlLocale(normalizeLocale(locale)), {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

export function ChannelActivity({
  type,
  owner,
  repo,
  identifier,
  dexscreenerApi,
  locale = "en",
}: ChannelActivityProps) {
  const activeLocale = normalizeLocale(locale);
  const copy = activityCopy[activeLocale];
  const [activity, setActivity] = useState<ActivityState>(() => {
    if (type === "x") {
      return {
        status: "empty",
        text: copy.xUpdates,
      };
    }

    return {
      status: "loading",
      text: copy.loadingActivity,
    };
  });

  useEffect(() => {
    let active = true;

    async function load() {
      if (type === "github") {
        if (!owner || !repo) {
          setActivity({ status: "empty", text: copy.repoUnavailable });
          return;
        }

        setActivity({ status: "loading", text: copy.loadingActivity });
        const latest = await fetchGitHubLatestCommit(owner, repo);

        if (!active) {
          return;
        }

        if (!latest) {
          setActivity({
            status: "empty",
            text: copy.noRecentActivity,
          });
          return;
        }

        setActivity({
          status: "ready",
          text: `${copy.lastCommit} ${normalizeGitHubDateToRelative(
            latest.date,
            activeLocale
          )}`,
          href: latest.url,
        });
        return;
      }

      if (type === "dex") {
        if (!identifier) {
          setActivity({ status: "empty", text: copy.pairUnavailable });
          return;
        }

        setActivity({ status: "loading", text: copy.loadingMarket });
        const status = await fetchDexPairStatus(identifier, dexscreenerApi);

        if (!active) {
          return;
        }

        if (status.status === "live") {
          setActivity({
            status: "ready",
            text: `${copy.livePair} • ${copy.liquidity} ${formatCompactUsd(
              status.liquidityUsd,
              activeLocale
            )}`,
            href: status.pairUrl,
          });
          return;
        }

        if (status.status === "indexing") {
          setActivity({
            status: "empty",
            text: copy.pairIndexing,
            href: status.pairUrl ?? undefined,
          });
          return;
        }

        setActivity({
          status: status.status === "error" ? "error" : "empty",
          text:
            status.status === "error"
              ? copy.marketUnavailable
              : copy.noIndexedPair,
        });
      }
    }

    void load();

    return () => {
      active = false;
    };
  }, [type, owner, repo, identifier, dexscreenerApi, activeLocale, copy]);

  return (
    <div className={`presence-activity presence-activity-${activity.status}`} aria-live="polite">
      <span className="presence-activity-dot" aria-hidden="true" />
      {activity.href ? (
        <a href={activity.href} target="_blank" rel="noopener noreferrer">
          {activity.text}
        </a>
      ) : (
        <p>{activity.text}</p>
      )}
    </div>
  );
}
