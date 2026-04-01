import { DEXSCREENER_HOSTS, toAllowedExternalUrl } from "./url-security";

const DEXSCREENER_API_BASE = "https://api.dexscreener.com";

type DexToken = {
  address?: string;
  symbol?: string;
  name?: string;
};

type DexLiquidity = {
  usd?: number | string;
};

type DexVolume = {
  h24?: number | string;
};

type DexPriceChange = {
  h24?: number | string;
};

type DexPairRaw = {
  chainId?: string;
  dexId?: string;
  pairAddress?: string;
  url?: string;
  baseToken?: DexToken;
  quoteToken?: DexToken;
  priceUsd?: number | string;
  liquidity?: DexLiquidity;
  volume?: DexVolume;
  fdv?: number | string;
  marketCap?: number | string;
  pairCreatedAt?: number | string;
  priceChange?: DexPriceChange;
};

export type MarketPair = {
  chainId: string;
  dexId: string;
  pairAddress: string;
  pairLabel: string;
  baseSymbol: string;
  quoteSymbol: string;
  priceUsd: number | null;
  liquidityUsd: number | null;
  volume24h: number | null;
  fdv: number | null;
  marketCap: number | null;
  pairCreatedAt: number | null;
  priceChange24h: number | null;
  url: string | null;
};

function toNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }

  return null;
}

function extractPairs(payload: unknown): DexPairRaw[] {
  if (!payload || typeof payload !== "object") {
    return [];
  }

  const value = payload as Record<string, unknown>;

  if (Array.isArray(value.pairs)) {
    return value.pairs as DexPairRaw[];
  }

  if (value.pair && typeof value.pair === "object") {
    return [value.pair as DexPairRaw];
  }

  if (Array.isArray(payload)) {
    return payload as DexPairRaw[];
  }

  return [];
}

export function normalizePair(pair: DexPairRaw): MarketPair | null {
  if (!pair.chainId || !pair.dexId || !pair.pairAddress || !pair.baseToken) {
    return null;
  }

  const baseSymbol = pair.baseToken.symbol?.trim() || "BASE";
  const quoteSymbol = pair.quoteToken?.symbol?.trim() || "QUOTE";

  return {
    chainId: pair.chainId,
    dexId: pair.dexId,
    pairAddress: pair.pairAddress,
    pairLabel: `${baseSymbol}/${quoteSymbol}`,
    baseSymbol,
    quoteSymbol,
    priceUsd: toNumber(pair.priceUsd),
    liquidityUsd: toNumber(pair.liquidity?.usd),
    volume24h: toNumber(pair.volume?.h24),
    fdv: toNumber(pair.fdv),
    marketCap: toNumber(pair.marketCap),
    pairCreatedAt: toNumber(pair.pairCreatedAt),
    priceChange24h: toNumber(pair.priceChange?.h24),
    url: pair.url ? toAllowedExternalUrl(pair.url, DEXSCREENER_HOSTS) || null : null,
  };
}

async function requestJson(url: string, signal?: AbortSignal): Promise<unknown> {
  const response = await fetch(url, {
    method: "GET",
    cache: "no-store",
    signal,
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`DexScreener request failed: ${response.status}`);
  }

  return response.json();
}

export async function fetchPairByAddress(
  chainId: string,
  pairAddress: string,
  signal?: AbortSignal
): Promise<MarketPair | null> {
  const payload = await requestJson(
    `${DEXSCREENER_API_BASE}/latest/dex/pairs/${chainId}/${pairAddress}`,
    signal
  );

  const pairs = extractPairs(payload)
    .map(normalizePair)
    .filter((pair): pair is MarketPair => Boolean(pair));

  return pairs[0] ?? null;
}

export async function fetchTokenPairs(
  chainId: string,
  tokenAddress: string,
  signal?: AbortSignal
): Promise<MarketPair[]> {
  let firstError: unknown = null;

  try {
    const payload = await requestJson(
      `${DEXSCREENER_API_BASE}/token-pairs/v1/${chainId}/${tokenAddress}`,
      signal
    );

    const normalized = extractPairs(payload)
      .map(normalizePair)
      .filter((pair): pair is MarketPair => pair !== null);

    return normalized.filter((pair) => pair.chainId === chainId);
  } catch (error) {
    firstError = error;
  }

  try {
    const payload = await requestJson(
      `${DEXSCREENER_API_BASE}/latest/dex/tokens/${tokenAddress}`,
      signal
    );

    const normalized = extractPairs(payload)
      .map(normalizePair)
      .filter((pair): pair is MarketPair => pair !== null);

    return normalized.filter((pair) => pair.chainId === chainId);
  } catch (error) {
    throw firstError ?? error;
  }
}

export function choosePrimaryPair(pairs: MarketPair[]): MarketPair | null {
  if (!pairs.length) {
    return null;
  }

  return [...pairs].sort((left, right) => {
    const liquidityDiff = (right.liquidityUsd ?? 0) - (left.liquidityUsd ?? 0);
    if (liquidityDiff !== 0) {
      return liquidityDiff;
    }

    const volumeDiff = (right.volume24h ?? 0) - (left.volume24h ?? 0);
    if (volumeDiff !== 0) {
      return volumeDiff;
    }

    return (right.fdv ?? 0) - (left.fdv ?? 0);
  })[0];
}

export function getPairUrl(pair: MarketPair): string {
  return (
    (pair.url ? toAllowedExternalUrl(pair.url, DEXSCREENER_HOSTS) : "") ||
    `https://dexscreener.com/${pair.chainId}/${pair.pairAddress}`
  );
}
