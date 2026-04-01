"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeOptions, normalizeLocale, withLocale, type Locale } from "../lib/i18n";

type LanguageSwitcherProps = {
  className?: string;
  locale?: Locale;
};

export function LanguageSwitcher({
  className,
  locale = "en",
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const activeLocale = normalizeLocale(locale);

  return (
    <div
      className={`locale-switcher${className ? ` ${className}` : ""}`}
      aria-label="Language switcher"
    >
      {localeOptions.map((option) => (
        <Link
          key={option.code}
          href={withLocale(pathname, option.code)}
          className={activeLocale === option.code ? "is-active" : undefined}
          aria-label={`Switch language to ${option.nativeLabel}`}
        >
          {option.label}
        </Link>
      ))}
    </div>
  );
}
