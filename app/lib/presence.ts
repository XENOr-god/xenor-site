import { formatRelativeTime } from "./time";

type GitHubCommitRaw = {
  sha?: string;
  html_url?: string;
  commit?: {
    message?: string;
    author?: {
      date?: string;
    };
  };
};

type DexPairRaw = {
  chainId?: string;
  dexId?: string;
  pairAddress?: string;
  url?: string;
  priceUsd?: string | number;
  liquidity?: {
    usd?: number | string;
  };
  volume?: {
    h24?: number | string;
  };
};

export type GitHubLatestCommit = {
  sha: string;
  date: string;
  message: string;
  url: string;
};

export type DexPairStatus =
  | {
      status: "live";
      pairUrl: string;
      priceUsd: number | null;
      liquidityUsd: number | null;
      volume24h: number | null;
    }
  | {
      status: "indexing";
      message: string;
      pairUrl?: string;
    }
  | {
      status: "not_found";
      message: string;
    }
  | {
      status: "error";
      message: string;
    };

const defaultDexSearchApi =
  "https://api.dexscreener.com/latest/dex/search?q=";

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) {
      return parsed;
    }
  }

  return null;
}

/**
 * Fetch latest commit metadata for a repository.
 * `token` is optional and should only be used server-side.
 */
export async function fetchGitHubLatestCommit(
  owner: string,
  repo: string,
  token?: string
): Promise<GitHubLatestCommit | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as GitHubCommitRaw[];
    const latest = payload[0];

    if (!latest || !latest.sha || !latest.commit?.author?.date) {
      return null;
    }

    return {
      sha: latest.sha,
      date: latest.commit.author.date,
      message: latest.commit.message ?? "",
      url:
        latest.html_url ??
        `https://github.com/${owner}/${repo}/commit/${latest.sha}`,
    };
  } catch {
    return null;
  }
}

function choosePrimaryPair(pairs: DexPairRaw[]): DexPairRaw | null {
  if (!pairs.length) {
    return null;
  }

  return [...pairs].sort((left, right) => {
    const leftLiquidity = toNumber(left.liquidity?.usd) ?? 0;
    const rightLiquidity = toNumber(right.liquidity?.usd) ?? 0;

    if (rightLiquidity !== leftLiquidity) {
      return rightLiquidity - leftLiquidity;
    }

    const leftVolume = toNumber(left.volume?.h24) ?? 0;
    const rightVolume = toNumber(right.volume?.h24) ?? 0;
    return rightVolume - leftVolume;
  })[0];
}

/**
 * Fetch pair status from DexScreener using a token or pair query.
 */
export async function fetchDexPairStatus(
  pairOrToken: string,
  dexscreenerApi?: string
): Promise<DexPairStatus> {
  if (!pairOrToken?.trim()) {
    return {
      status: "not_found",
      message: "No pair or token identifier configured.",
    };
  }

  const baseApi = dexscreenerApi?.trim() || defaultDexSearchApi;

  try {
    const response = await fetch(
      `${baseApi}${encodeURIComponent(pairOrToken.trim())}`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return {
        status: "error",
        message: "Unable to query market indexer right now.",
      };
    }

    const payload = (await response.json()) as { pairs?: DexPairRaw[] };
    const primary = choosePrimaryPair(payload.pairs ?? []);

    if (!primary) {
      return {
        status: "not_found",
        message: "No indexed pair detected yet.",
      };
    }

    const liquidityUsd = toNumber(primary.liquidity?.usd);
    const pairUrl =
      primary.url ||
      (primary.chainId && primary.pairAddress
        ? `https://dexscreener.com/${primary.chainId}/${primary.pairAddress}`
        : "");

    if (!liquidityUsd || liquidityUsd <= 0) {
      return {
        status: "indexing",
        message: "Pair discovered, liquidity indexing in progress.",
        pairUrl: pairUrl || undefined,
      };
    }

    return {
      status: "live",
      pairUrl: pairUrl || "https://dexscreener.com",
      priceUsd: toNumber(primary.priceUsd),
      liquidityUsd,
      volume24h: toNumber(primary.volume?.h24),
    };
  } catch {
    return {
      status: "error",
      message: "No recent activity detected from market source.",
    };
  }
}

export function normalizeGitHubDateToRelative(
  date: string,
  locale = "en"
): string {
  return formatRelativeTime(date, locale);
}

export function parseGithubRepos(value: string | undefined): string[] {
  if (!value) {
    return [];
  }

  return value
    .split(",")
    .map((entry) => entry.trim())
    .filter(Boolean);
}
