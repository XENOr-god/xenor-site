export const DEXSCREENER_HOSTS = ["dexscreener.com"] as const;
export const DEXSCREENER_API_HOSTS = ["api.dexscreener.com"] as const;
export const GITHUB_HOSTS = ["github.com"] as const;
export const SOLANA_TRACKER_HOSTS = ["data.solanatracker.io"] as const;
export const TRUSTED_SOLANA_RPC_HOSTS = [
  "api.mainnet-beta.solana.com",
  "alchemy.com",
  "helius-rpc.com",
  "quiknode.pro",
  "quiknode.com",
  "drpc.org",
  "ankr.com",
  "allnodes.me",
  "chainstack.com",
  "chainstacklabs.com",
  "syndica.io",
  "blockdaemon.com",
  "onfinality.io",
  "nodies.app",
  "lava.build",
] as const;

function normalizeHostname(value: string): string {
  return value.trim().toLowerCase().replace(/\.+$/, "");
}

function isIpLiteral(hostname: string): boolean {
  const normalized = normalizeHostname(hostname);
  if (!normalized) {
    return false;
  }

  if (normalized.includes(":")) {
    return true;
  }

  const parts = normalized.split(".");
  if (parts.length !== 4) {
    return false;
  }

  return parts.every((part) => /^\d+$/.test(part) && Number(part) >= 0 && Number(part) <= 255);
}

function isLocalHostname(hostname: string): boolean {
  const normalized = normalizeHostname(hostname);
  return (
    normalized === "localhost" ||
    normalized === "0.0.0.0" ||
    normalized.endsWith(".localhost") ||
    normalized.endsWith(".local")
  );
}

function hasAllowedHostname(
  hostname: string,
  allowedHosts: readonly string[]
): boolean {
  const normalized = normalizeHostname(hostname);

  return allowedHosts.some((candidate) => {
    const allowed = normalizeHostname(candidate);
    return normalized === allowed || normalized.endsWith(`.${allowed}`);
  });
}

export function parseSafeHttpsUrl(value: string): URL | null {
  if (!value.trim()) {
    return null;
  }

  try {
    const parsed = new URL(value);
    const hostname = normalizeHostname(parsed.hostname);

    if (parsed.protocol !== "https:" || !hostname) {
      return null;
    }

    if (isIpLiteral(hostname) || isLocalHostname(hostname)) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function toSafeExternalUrl(value: string): string {
  return parseSafeHttpsUrl(value)?.toString() ?? "";
}

export function toAllowedExternalUrl(
  value: string,
  allowedHosts: readonly string[]
): string {
  const parsed = parseSafeHttpsUrl(value);
  if (!parsed || !hasAllowedHostname(parsed.hostname, allowedHosts)) {
    return "";
  }

  return parsed.toString();
}

export function sanitizeGitHubOwner(
  value: string | undefined,
  fallback: string
): string {
  const normalized = value?.trim().replace(/^@/, "") ?? "";
  return /^[A-Za-z0-9](?:[A-Za-z0-9-]{0,38})$/.test(normalized)
    ? normalized
    : fallback;
}

export function sanitizeXHandle(
  value: string | undefined,
  fallback: string
): string {
  const normalized = value?.trim().replace(/^@/, "") ?? "";
  return /^[A-Za-z0-9_]{1,15}$/.test(normalized) ? normalized : fallback;
}
