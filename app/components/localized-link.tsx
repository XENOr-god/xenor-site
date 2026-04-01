"use client";

import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { normalizeLocale, withLocale, type Locale } from "../lib/i18n";

type LocalizedLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "href"> & {
  href: string;
  children: ReactNode;
  locale?: Locale;
};

export function LocalizedLink({
  href,
  children,
  locale = "en",
  ...props
}: LocalizedLinkProps) {
  return (
    <Link href={withLocale(href, normalizeLocale(locale))} {...props}>
      {children}
    </Link>
  );
}
