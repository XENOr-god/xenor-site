export const locales = ["en", "id", "ja", "zh"] as const;

export type Locale = (typeof locales)[number];

export type SearchParamsLike = Record<
  string,
  string | string[] | undefined
>;

export const localeOptions: Array<{
  code: Locale;
  label: string;
  nativeLabel: string;
}> = [
  { code: "en", label: "EN", nativeLabel: "English" },
  { code: "id", label: "ID", nativeLabel: "Indonesia" },
  { code: "ja", label: "JP", nativeLabel: "Japanese" },
  { code: "zh", label: "ZH", nativeLabel: "Chinese" },
];

export function normalizeLocale(value: string | null | undefined): Locale {
  if (!value) {
    return "en";
  }

  const normalized = value.trim().toLowerCase();

  if (normalized === "id" || normalized === "in") {
    return "id";
  }

  if (normalized === "ja" || normalized === "jp") {
    return "ja";
  }

  if (
    normalized === "zh" ||
    normalized === "zh-cn" ||
    normalized === "zh-hans" ||
    normalized === "cn"
  ) {
    return "zh";
  }

  return "en";
}

export function getLocaleFromSearchParams(
  searchParams?: SearchParamsLike
): Locale {
  if (!searchParams) {
    return "en";
  }

  const raw = searchParams.lang;
  return normalizeLocale(Array.isArray(raw) ? raw[0] : raw);
}

export function getIntlLocale(locale: Locale): string {
  if (locale === "id") {
    return "id-ID";
  }

  if (locale === "ja") {
    return "ja-JP";
  }

  if (locale === "zh") {
    return "zh-CN";
  }

  return "en-US";
}

export function withLocale(href: string, locale: Locale): string {
  if (!href.startsWith("/")) {
    return href;
  }

  const [pathWithQuery, hash = ""] = href.split("#");
  const [pathname, query = ""] = pathWithQuery.split("?");
  const params = new URLSearchParams(query);

  if (locale === "en") {
    params.delete("lang");
  } else {
    params.set("lang", locale);
  }

  const nextQuery = params.toString();
  const nextHref = nextQuery ? `${pathname}?${nextQuery}` : pathname;

  return hash ? `${nextHref}#${hash}` : nextHref;
}

export function isInternalHref(href: string): boolean {
  return href.startsWith("/");
}
