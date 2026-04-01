export type TokenIntelMetrics = {
  top10H: number | null;
  devH: number | null;
  snipersH: number | null;
  insiders: number | null;
  bundlers: number | null;
  lpBurned: number | null;
  holders: number | null;
  proTraders: number | null;
  dexPaid: boolean | null;
};

export type TokenIntelSnapshot = {
  status: "ok" | "unavailable";
  source: "solana-rpc" | "solana-rpc+solanatracker";
  mint: string;
  updatedAt: string;
  metrics: TokenIntelMetrics;
  note?: string;
};

export const emptyTokenIntelMetrics: TokenIntelMetrics = {
  top10H: null,
  devH: null,
  snipersH: null,
  insiders: null,
  bundlers: null,
  lpBurned: null,
  holders: null,
  proTraders: null,
  dexPaid: null,
};
