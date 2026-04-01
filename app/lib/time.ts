/**
 * Format a date value as a compact relative time string.
 */
export function formatRelativeTime(
  value: string | number | Date,
  locale = "en"
): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return locale === "id"
      ? "tidak diketahui"
      : locale === "ja"
        ? "不明"
        : locale === "zh"
          ? "未知"
          : "unknown";
  }

  const now = Date.now();
  const diffMs = date.getTime() - now;
  const diffMinutes = Math.round(diffMs / (1000 * 60));

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: "auto" });

  if (Math.abs(diffMinutes) < 60) {
    return rtf.format(diffMinutes, "minute");
  }

  const diffHours = Math.round(diffMinutes / 60);
  if (Math.abs(diffHours) < 24) {
    return rtf.format(diffHours, "hour");
  }

  const diffDays = Math.round(diffHours / 24);
  if (Math.abs(diffDays) < 30) {
    return rtf.format(diffDays, "day");
  }

  const diffMonths = Math.round(diffDays / 30);
  if (Math.abs(diffMonths) < 12) {
    return rtf.format(diffMonths, "month");
  }

  const diffYears = Math.round(diffMonths / 12);
  return rtf.format(diffYears, "year");
}
