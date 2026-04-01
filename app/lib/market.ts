import {
  choosePrimaryPair,
  fetchPairByAddress,
  fetchTokenPairs,
  getPairUrl,
  type MarketPair,
} from "./dexscreener";
import {
  contractAddress as fallbackContractAddress,
  defaultDexScreenerPairAddress,
  defaultDexScreenerUrl,
} from "./xenor-data";

export type ContractConfig = {
  contractAddress: string;
  chainId: string;
  tokenAddress: string;
  pairAddress: string;
  explorerUrl: string;
  dexScreenerUrl: string;
  tradingUrl: string;
  githubUrl: string;
  xUrl: string;
};

export type MarketSurfaceState =
  | {
      status: "live";
      pair: MarketPair;
      source: "explicit-pair" | "token-pairs";
    }
  | {
      status: "pre-launch";
      message: string;
    }
  | {
      status: "error";
      message: string;
    };

export type AddressValidation = {
  isValid: boolean;
  reason: string;
};

const evmLikeChains = new Set([
  "ethereum",
  "eth",
  "bsc",
  "binance",
  "base",
  "arbitrum",
  "optimism",
  "polygon",
  "avalanche",
  "linea",
  "scroll",
  "zksync",
  "fantom",
]);

function fromEnv(name: string): string {
  return process.env[name]?.trim() ?? "";
}

export function getContractConfig(): ContractConfig {
  const contract = fromEnv("NEXT_PUBLIC_CONTRACT_ADDRESS") || fallbackContractAddress;
  const chainId = fromEnv("NEXT_PUBLIC_CHAIN_ID") || "solana";
  const tokenAddress = fromEnv("NEXT_PUBLIC_TOKEN_ADDRESS") || contract;
  const pairAddress =
    fromEnv("NEXT_PUBLIC_PAIR_ADDRESS") ||
    fromEnv("NEXT_PUBLIC_DEXSCREENER_PAIR_ADDRESS") ||
    defaultDexScreenerPairAddress;
  const explorerUrl = fromEnv("NEXT_PUBLIC_EXPLORER_URL");
  const dexScreenerUrl = fromEnv("NEXT_PUBLIC_DEXSCREENER_URL") || defaultDexScreenerUrl;
  const tradingUrl = fromEnv("NEXT_PUBLIC_TRADING_URL");

  return {
    contractAddress: contract,
    chainId,
    tokenAddress,
    pairAddress,
    explorerUrl,
    dexScreenerUrl,
    tradingUrl,
    githubUrl: "https://github.com/XENOr-god",
    xUrl: "https://x.com/Xenorlabs",
  };
}

export function isPlaceholderAddress(address: string): boolean {
  const normalized = address.trim().toUpperCase();

  return (
    !address ||
    normalized === "SOON" ||
    normalized === "TBA" ||
    normalized === "PENDING" ||
    normalized.includes("PASTE_") ||
    normalized.includes("YOUR_") ||
    normalized.includes("CONTRACT_ADDRESS")
  );
}

export function validateContractAddress(
  chainId: string,
  address: string
): AddressValidation {
  const normalizedChain = chainId.trim().toLowerCase();
  const value = address.trim();

  if (isPlaceholderAddress(value)) {
    return {
      isValid: false,
      reason: "Contract address has not been published.",
    };
  }

  if (normalizedChain === "solana" || normalizedChain === "sol") {
    const isValid = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/.test(value);
    return isValid
      ? { isValid: true, reason: "Address format matches Solana base58." }
      : {
          isValid: false,
          reason: "Expected a valid Solana base58 token address (32-44 characters).",
        };
  }

  if (evmLikeChains.has(normalizedChain)) {
    const isValid = /^0x[a-fA-F0-9]{40}$/.test(value);
    return isValid
      ? { isValid: true, reason: "Address format matches EVM (0x + 40 hex)." }
      : {
          isValid: false,
          reason: "Expected an EVM address in 0x + 40 hexadecimal format.",
        };
  }

  if (normalizedChain === "sui" || normalizedChain === "aptos") {
    const isValid = /^0x[a-fA-F0-9]{1,64}$/.test(value);
    return isValid
      ? { isValid: true, reason: "Address format matches 0x hexadecimal standard." }
      : {
          isValid: false,
          reason: "Expected a 0x-prefixed hexadecimal address for this chain.",
        };
  }

  if (normalizedChain === "tron") {
    const isValid = /^T[1-9A-HJ-NP-Za-km-z]{33}$/.test(value);
    return isValid
      ? { isValid: true, reason: "Address format matches Tron base58." }
      : {
          isValid: false,
          reason: "Expected a Tron base58 address starting with T.",
        };
  }

  if (value.length < 20) {
    return {
      isValid: false,
      reason: "Address appears too short for canonical publication.",
    };
  }

  return {
    isValid: true,
    reason: "Address published. Chain-specific validation is unavailable for this chain.",
  };
}

export function shortenAddress(value: string, start = 10, end = 8): string {
  if (!value) {
    return "Not configured";
  }

  if (value.length <= start + end + 3) {
    return value;
  }

  return `${value.slice(0, start)}...${value.slice(-end)}`;
}

function buildDefaultExplorerUrl(config: ContractConfig): string {
  const validation = validateContractAddress(config.chainId, config.contractAddress);
  if (!config.contractAddress || !validation.isValid) {
    return "";
  }

  if (config.chainId.toLowerCase() === "solana") {
    return `https://solscan.io/token/${config.contractAddress}`;
  }

  return "";
}

function buildDefaultDexUrl(config: ContractConfig, pair?: MarketPair): string {
  if (pair) {
    return getPairUrl(pair);
  }

  if (config.dexScreenerUrl) {
    return config.dexScreenerUrl;
  }

  if (config.pairAddress) {
    return `https://dexscreener.com/${config.chainId}/${config.pairAddress}`;
  }

  if (config.tokenAddress && !isPlaceholderAddress(config.tokenAddress)) {
    return `https://dexscreener.com/${config.chainId}/${config.tokenAddress}`;
  }

  return "https://dexscreener.com";
}

export function getExplorerUrl(config: ContractConfig): string {
  return config.explorerUrl || buildDefaultExplorerUrl(config);
}

export function getDexUrl(config: ContractConfig, pair?: MarketPair): string {
  return config.dexScreenerUrl || buildDefaultDexUrl(config, pair);
}

export function getTradingUrl(config: ContractConfig): string {
  return config.tradingUrl || "";
}

export async function fetchMarketSurface(
  config: ContractConfig,
  signal?: AbortSignal
): Promise<MarketSurfaceState> {
  const validation = validateContractAddress(config.chainId, config.contractAddress);

  if (isPlaceholderAddress(config.contractAddress)) {
    return {
      status: "pre-launch",
      message:
        "The canonical contract has not been published. Market telemetry activates after publication.",
    };
  }

  if (!validation.isValid) {
    return {
      status: "pre-launch",
      message:
        "The published contract address does not yet pass validation. Market telemetry activates after verification.",
    };
  }

  let encounteredError: unknown = null;

  if (config.chainId && config.pairAddress) {
    try {
      const pair = await fetchPairByAddress(
        config.chainId,
        config.pairAddress,
        signal
      );

      if (pair) {
        return {
          status: "live",
          pair,
          source: "explicit-pair",
        };
      }
    } catch (error) {
      encounteredError = error;
    }
  }

  if (config.chainId && config.tokenAddress) {
    try {
      const pairs = await fetchTokenPairs(config.chainId, config.tokenAddress, signal);
      const pair = choosePrimaryPair(pairs);

      if (pair) {
        return {
          status: "live",
          pair,
          source: "token-pairs",
        };
      }
    } catch (error) {
      encounteredError = error;
    }
  }

  if (encounteredError) {
    return {
      status: "error",
      message:
        "Market data is temporarily unavailable. Canonical links remain the current reference.",
    };
  }

  return {
    status: "pre-launch",
    message:
      "No indexed pair is available yet. This is expected before launch or before market indexers complete discovery.",
  };
}
