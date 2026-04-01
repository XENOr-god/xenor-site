import { NextResponse } from "next/server";
import { contractAddress as fallbackContractAddress } from "../../lib/xenor-data";
import {
  emptyTokenIntelMetrics,
  type TokenIntelMetrics,
  type TokenIntelSnapshot,
} from "../../lib/token-intel";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const SOLANA_RPC_DEFAULT = "https://api.mainnet-beta.solana.com";
const TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
const TOKEN_2022_PROGRAM_ID = "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb";
const SOLANA_TRACKER_API_BASE_DEFAULT = "https://data.solanatracker.io";
const DEXSCREENER_API_BASE = "https://api.dexscreener.com";
const CACHE_TTL_MS = 30_000;
const SHORT_CACHE_TTL_MS = 10_000;
const SOLANA_TRACKER_TIMEOUT_MS = 12_000;
const DEXSCREENER_TIMEOUT_MS = 8_000;

type RpcTokenAmount = {
  amount?: string;
};

type RpcParsedInfo = {
  owner?: string;
  tokenAmount?: RpcTokenAmount;
};

type RpcProgramAccount = {
  account?: {
    data?: {
      parsed?: {
        info?: RpcParsedInfo;
      };
    };
  };
};

type RpcTokenSupplyResult = {
  value?: {
    amount?: string;
  };
};

type GenericRecord = Record<string, unknown>;

type SolanaTrackerResult = {
  metrics: Partial<TokenIntelMetrics>;
  note?: string;
};

let cacheEntry:
  | {
      expiresAt: number;
      payload: TokenIntelSnapshot;
    }
  | null = null;

function isSolanaAddress(value: string): boolean {
  return /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
}

function asRecord(value: unknown): GenericRecord | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return null;
  }

  return value as GenericRecord;
}

function withTimeout(signal: AbortSignal | undefined, timeoutMs: number): AbortSignal {
  if (AbortSignal.timeout) {
    return signal ? AbortSignal.any([signal, AbortSignal.timeout(timeoutMs)]) : AbortSignal.timeout(timeoutMs);
  }

  return signal || new AbortController().signal;
}

function toAmountNumber(value: string | undefined): number {
  if (!value || !/^\d+$/.test(value)) {
    return 0;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

function toPercent(value: number, total: number): number | null {
  if (total <= 0 || value < 0 || !Number.isFinite(value) || !Number.isFinite(total)) {
    return null;
  }

  return (value / total) * 100;
}

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

function toBoolean(value: unknown): boolean | null {
  if (typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    return value !== 0;
  }

  if (typeof value === "string") {
    const normalized = value.trim().toLowerCase();
    if (normalized === "true" || normalized === "yes" || normalized === "paid") {
      return true;
    }
    if (normalized === "false" || normalized === "no" || normalized === "unpaid") {
      return false;
    }
  }

  return null;
}

function normalizePercent(value: number | null): number | null {
  if (value === null || !Number.isFinite(value)) {
    return null;
  }

  if (value >= 0 && value <= 1) {
    return value * 100;
  }

  return value;
}

function pickPath(source: GenericRecord, path: string[]): unknown {
  let current: unknown = source;

  for (const key of path) {
    const record = asRecord(current);
    if (!record || !(key in record)) {
      return undefined;
    }
    current = record[key];
  }

  return current;
}

function pickUnknown(source: GenericRecord, paths: string[][]): unknown {
  for (const path of paths) {
    const value = pickPath(source, path);
    if (value !== undefined && value !== null) {
      return value;
    }
  }

  return undefined;
}

function parsePercentFromUnknown(value: unknown): number | null {
  const direct = normalizePercent(toNumber(value));
  if (direct !== null) {
    return direct;
  }

  const record = asRecord(value);
  if (!record) {
    return null;
  }

  return normalizePercent(
    toNumber(
      pickUnknown(record, [
        ["totalPercentage"],
        ["percentage"],
        ["percent"],
        ["pct"],
        ["value"],
      ])
    )
  );
}

function parseCountFromUnknown(value: unknown): number | null {
  const direct = toNumber(value);
  if (direct !== null) {
    return direct;
  }

  const record = asRecord(value);
  if (!record) {
    return null;
  }

  return toNumber(
    pickUnknown(record, [["count"], ["total"], ["wallets"], ["holders"], ["value"]])
  );
}

function mergeMetrics(
  base: TokenIntelMetrics,
  patch: Partial<TokenIntelMetrics>
): TokenIntelMetrics {
  return {
    top10H: patch.top10H ?? base.top10H,
    devH: patch.devH ?? base.devH,
    snipersH: patch.snipersH ?? base.snipersH,
    insiders: patch.insiders ?? base.insiders,
    bundlers: patch.bundlers ?? base.bundlers,
    lpBurned: patch.lpBurned ?? base.lpBurned,
    holders: patch.holders ?? base.holders,
    proTraders: patch.proTraders ?? base.proTraders,
    dexPaid: patch.dexPaid ?? base.dexPaid,
  };
}

function readManualOverrides(): Partial<TokenIntelMetrics> {
  const numberVar = (name: string): number | undefined => {
    const raw = process.env[name]?.trim();
    if (!raw) {
      return undefined;
    }
    const parsed = Number(raw);
    return Number.isFinite(parsed) ? parsed : undefined;
  };

  const boolVar = (name: string): boolean | undefined => {
    const raw = process.env[name]?.trim();
    if (!raw) {
      return undefined;
    }
    const parsed = toBoolean(raw);
    return parsed === null ? undefined : parsed;
  };

  return {
    top10H: numberVar("TOKEN_INTEL_OVERRIDE_TOP10_H"),
    devH: numberVar("TOKEN_INTEL_OVERRIDE_DEV_H"),
    snipersH: numberVar("TOKEN_INTEL_OVERRIDE_SNIPERS_H"),
    insiders: numberVar("TOKEN_INTEL_OVERRIDE_INSIDERS"),
    bundlers: numberVar("TOKEN_INTEL_OVERRIDE_BUNDLERS"),
    lpBurned: numberVar("TOKEN_INTEL_OVERRIDE_LP_BURNED"),
    holders: numberVar("TOKEN_INTEL_OVERRIDE_HOLDERS"),
    proTraders: numberVar("TOKEN_INTEL_OVERRIDE_PRO_TRADERS"),
    dexPaid: boolVar("TOKEN_INTEL_OVERRIDE_DEX_PAID"),
  };
}

async function rpcRequest<T>(
  rpcUrl: string,
  method: string,
  params: unknown[],
  signal?: AbortSignal
): Promise<T> {
  const response = await fetch(rpcUrl, {
    method: "POST",
    cache: "no-store",
    signal,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method,
      params,
    }),
  });

  if (!response.ok) {
    throw new Error(`RPC request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as {
    result?: T;
    error?: { message?: string };
  };

  if (payload.error) {
    throw new Error(payload.error.message || "RPC returned an error");
  }

  if (!payload.result) {
    throw new Error("RPC result is empty");
  }

  return payload.result;
}

async function loadOnChainMetrics(
  tokenAddress: string,
  devWallet: string,
  signal?: AbortSignal
): Promise<TokenIntelMetrics> {
  const rpcUrl = process.env.SOLANA_RPC_URL?.trim() || SOLANA_RPC_DEFAULT;

  const supplyResult = await rpcRequest<RpcTokenSupplyResult>(
    rpcUrl,
    "getTokenSupply",
    [tokenAddress],
    signal
  );
  const totalSupply = toAmountNumber(supplyResult.value?.amount);

  const accountQueryConfig = {
    encoding: "jsonParsed",
    commitment: "confirmed",
    filters: [
      { dataSize: 165 },
      {
        memcmp: {
          offset: 0,
          bytes: tokenAddress,
        },
      },
    ],
  };

  const discoveredAccounts: RpcProgramAccount[] = [];
  for (const programId of [TOKEN_PROGRAM_ID, TOKEN_2022_PROGRAM_ID]) {
    try {
      const accounts = await rpcRequest<RpcProgramAccount[]>(
        rpcUrl,
        "getProgramAccounts",
        [programId, accountQueryConfig],
        signal
      );
      discoveredAccounts.push(...accounts);
    } catch {
      // Continue; one program may have zero accounts or be temporarily unreachable.
    }
  }

  const ownerBalances = new Map<string, number>();

  for (const account of discoveredAccounts) {
    const info = account.account?.data?.parsed?.info;
    const owner = info?.owner?.trim();
    const amount = toAmountNumber(info?.tokenAmount?.amount);

    if (!owner || amount <= 0) {
      continue;
    }

    ownerBalances.set(owner, (ownerBalances.get(owner) || 0) + amount);
  }

  const rankedBalances = [...ownerBalances.values()].sort((left, right) => right - left);
  const top10Total = rankedBalances.slice(0, 10).reduce((sum, value) => sum + value, 0);
  const devAmount =
    devWallet && ownerBalances.has(devWallet) ? ownerBalances.get(devWallet) || 0 : 0;

  const metrics: TokenIntelMetrics = {
    ...emptyTokenIntelMetrics,
    top10H: toPercent(top10Total, totalSupply),
    devH: devWallet ? toPercent(devAmount, totalSupply) : null,
    holders: ownerBalances.size,
  };

  return metrics;
}

async function fetchSolanaTrackerMetrics(
  tokenAddress: string,
  apiKey: string,
  signal?: AbortSignal
): Promise<SolanaTrackerResult | null> {
  const baseUrl =
    process.env.SOLANA_TRACKER_API_BASE?.trim() || SOLANA_TRACKER_API_BASE_DEFAULT;
  const requestSignal = withTimeout(signal, SOLANA_TRACKER_TIMEOUT_MS);
  const response = await fetch(`${baseUrl}/tokens/${tokenAddress}`, {
    method: "GET",
    cache: "no-store",
    signal: requestSignal,
    headers: {
      Accept: "application/json",
      "x-api-key": apiKey,
    },
  });

  if (!response.ok) {
    return null;
  }

  const payloadUnknown = (await response.json()) as unknown;
  const payload = asRecord(payloadUnknown);
  if (!payload) {
    return null;
  }

  const risk = asRecord(payload.risk) || payload;
  const metrics: Partial<TokenIntelMetrics> = {};

  metrics.top10H = parsePercentFromUnknown(
    pickUnknown(risk, [["top10"], ["top10H"], ["top10h"], ["top10Holders"]])
  );
  metrics.devH = parsePercentFromUnknown(
    pickUnknown(risk, [["dev"], ["devH"], ["devPercentage"], ["devHoldings"]])
  );
  metrics.snipersH = parsePercentFromUnknown(
    pickUnknown(risk, [["snipers"], ["snipersH"], ["sniper"], ["sniperH"]])
  );
  metrics.insiders = parsePercentFromUnknown(
    pickUnknown(risk, [["insiders"], ["insider"], ["insidersH"]])
  );
  metrics.bundlers = parsePercentFromUnknown(
    pickUnknown(risk, [["bundlers"], ["bundler"], ["bundlersH"]])
  );

  const lpBurnRaw = pickUnknown(risk, [["lpBurn"], ["lpBurned"], ["lp"], ["lp_burned"]]);
  const lpBurnAsPercent = parsePercentFromUnknown(lpBurnRaw);
  const lpBurnAsBoolean = toBoolean(lpBurnRaw);
  metrics.lpBurned =
    lpBurnAsPercent !== null ? lpBurnAsPercent : lpBurnAsBoolean === null ? null : lpBurnAsBoolean ? 100 : 0;

  metrics.holders = parseCountFromUnknown(
    pickUnknown(payload, [["holders"], ["holderCount"], ["holdersCount"], ["holdersTotal"]])
  );
  metrics.proTraders = parseCountFromUnknown(
    pickUnknown(payload, [["proTraders"], ["pro_traders"], ["smartTraders"]])
  );
  metrics.dexPaid = toBoolean(
    pickUnknown(payload, [["dexPaid"], ["dex_paid"], ["paid"], ["isDexPaid"]])
  );

  return {
    metrics,
    note: "Advanced wallet-class metrics loaded from SolanaTracker.",
  };
}

async function fetchDexPaidFallback(
  tokenAddress: string,
  chainId: string,
  signal?: AbortSignal
): Promise<boolean | null> {
  const requestSignal = withTimeout(signal, DEXSCREENER_TIMEOUT_MS);

  try {
    const ordersResponse = await fetch(
      `${DEXSCREENER_API_BASE}/orders/v1/${chainId}/${tokenAddress}`,
      {
        method: "GET",
        cache: "no-store",
        signal: requestSignal,
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (ordersResponse.ok) {
      const orders = (await ordersResponse.json()) as unknown;
      if (Array.isArray(orders)) {
        return orders.length > 0;
      }

      const payload = asRecord(orders);
      if (payload) {
        const ordersList = payload.orders;
        if (Array.isArray(ordersList)) {
          return ordersList.length > 0;
        }
      }
    }
  } catch {
    // Continue to boosts-based fallback.
  }

  const response = await fetch(
    `${DEXSCREENER_API_BASE}/latest/dex/tokens/${tokenAddress}`,
    {
      method: "GET",
      cache: "no-store",
      signal: requestSignal,
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as { pairs?: unknown[] };
  if (!Array.isArray(payload.pairs) || payload.pairs.length === 0) {
    return null;
  }

  const pairs = payload.pairs
    .map((entry) => asRecord(entry))
    .filter((entry): entry is GenericRecord => Boolean(entry));
  if (!pairs.length) {
    return null;
  }

  const primary = [...pairs].sort((left, right) => {
    const leftLiquidity = toNumber(pickUnknown(left, [["liquidity", "usd"]])) ?? 0;
    const rightLiquidity = toNumber(pickUnknown(right, [["liquidity", "usd"]])) ?? 0;
    return rightLiquidity - leftLiquidity;
  })[0];

  const boostsRaw = pickUnknown(primary, [["boosts"], ["boosts", "active"]]);
  const boostsAsBoolean = toBoolean(boostsRaw);
  if (boostsAsBoolean !== null) {
    return boostsAsBoolean;
  }

  const boostsAsNumber = toNumber(boostsRaw);
  if (boostsAsNumber !== null) {
    return boostsAsNumber > 0;
  }

  return null;
}

async function loadTokenIntel(): Promise<TokenIntelSnapshot> {
  const tokenAddress =
    process.env.NEXT_PUBLIC_TOKEN_ADDRESS?.trim() ||
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS?.trim() ||
    fallbackContractAddress;
  const chainId = process.env.NEXT_PUBLIC_CHAIN_ID?.trim() || "solana";
  const devWallet =
    process.env.NEXT_PUBLIC_DEV_WALLET?.trim() ||
    process.env.TOKEN_DEV_WALLET?.trim() ||
    "";
  const trackerApiKey = process.env.SOLANA_TRACKER_API_KEY?.trim() || "";

  if (!isSolanaAddress(tokenAddress)) {
    return {
      status: "unavailable",
      source: "solana-rpc",
      mint: tokenAddress,
      updatedAt: new Date().toISOString(),
      metrics: emptyTokenIntelMetrics,
      note: "Token intel is unavailable because the canonical mint has not been published.",
    };
  }

  const notes: string[] = [];
  const controller = new AbortController();

  const onChainMetrics = await loadOnChainMetrics(
    tokenAddress,
    devWallet,
    controller.signal
  );
  let metrics = onChainMetrics;
  let source: TokenIntelSnapshot["source"] = "solana-rpc";

  if (trackerApiKey) {
    try {
      const tracker = await fetchSolanaTrackerMetrics(
        tokenAddress,
        trackerApiKey,
        controller.signal
      );
      if (tracker) {
        metrics = mergeMetrics(metrics, tracker.metrics);
        source = "solana-rpc+solanatracker";
        if (tracker.note) {
          notes.push(tracker.note);
        }
      } else {
        notes.push("Supplemental token-intel data is currently unavailable.");
      }
    } catch {
      notes.push("Supplemental token-intel data could not be loaded.");
    }
  } else {
    notes.push("Advanced token-intel fields are not active on the current surface.");
  }

  if (metrics.dexPaid === null) {
    try {
      const dexPaid = await fetchDexPaidFallback(
        tokenAddress,
        chainId,
        controller.signal
      );
      if (dexPaid !== null) {
        metrics = {
          ...metrics,
          dexPaid,
        };
      }
    } catch {
      // Ignore fallback errors; token intel stays available from on-chain source.
    }
  }

  if (!trackerApiKey) {
    notes.push("Top 10 H and Holders are sourced from Solana RPC.");
  }

  const manualOverrides = readManualOverrides();
  const hasManualOverrides = Object.values(manualOverrides).some(
    (value) => value !== undefined && value !== null
  );
  if (hasManualOverrides) {
    metrics = mergeMetrics(metrics, manualOverrides);
    notes.push("Token intel includes manual review inputs.");
  }

  return {
    status: "ok",
    source,
    mint: tokenAddress,
    updatedAt: new Date().toISOString(),
    metrics,
    note: notes.length ? notes.join(" ") : undefined,
  };
}

function createUnavailableSnapshot(message: string): TokenIntelSnapshot {
  const tokenAddress =
    process.env.NEXT_PUBLIC_TOKEN_ADDRESS?.trim() ||
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS?.trim() ||
    fallbackContractAddress;

  return {
    status: "unavailable",
    source: "solana-rpc",
    mint: tokenAddress,
    updatedAt: new Date().toISOString(),
    metrics: emptyTokenIntelMetrics,
    note: message,
  };
}

export async function GET() {
  const now = Date.now();

  if (cacheEntry && cacheEntry.expiresAt > now) {
    return NextResponse.json(cacheEntry.payload, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  try {
    const payload = await loadTokenIntel();
    cacheEntry = {
      expiresAt: now + CACHE_TTL_MS,
      payload,
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  } catch {
    const payload = createUnavailableSnapshot(
      "Token intel is temporarily unavailable."
    );
    cacheEntry = {
      expiresAt: now + SHORT_CACHE_TTL_MS,
      payload,
    };

    return NextResponse.json(payload, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }
}
