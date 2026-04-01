"use client";

import { usePathname } from "next/navigation";
import { normalizeLocale, type Locale } from "../lib/i18n";
import { LocalizedLink } from "./localized-link";

const navItems = {
  en: [
    { href: "/", label: "Home" },
    { href: "/vision", label: "Vision" },
    { href: "/architecture", label: "Architecture" },
    { href: "/repositories", label: "Repositories" },
    { href: "/contract", label: "Contract" },
    { href: "/presence", label: "Presence" },
  ],
  id: [
    { href: "/", label: "Beranda" },
    { href: "/vision", label: "Visi" },
    { href: "/architecture", label: "Arsitektur" },
    { href: "/repositories", label: "Repositori" },
    { href: "/contract", label: "Kontrak" },
    { href: "/presence", label: "Presensi" },
  ],
  ja: [
    { href: "/", label: "ホーム" },
    { href: "/vision", label: "ビジョン" },
    { href: "/architecture", label: "アーキテクチャ" },
    { href: "/repositories", label: "リポジトリ" },
    { href: "/contract", label: "コントラクト" },
    { href: "/presence", label: "プレゼンス" },
  ],
  zh: [
    { href: "/", label: "首页" },
    { href: "/vision", label: "愿景" },
    { href: "/architecture", label: "架构" },
    { href: "/repositories", label: "代码库" },
    { href: "/contract", label: "合约" },
    { href: "/presence", label: "渠道" },
  ],
} as const;

const footerCopy = {
  en: {
    kicker: "Canonical Public Surface",
    title:
      "XENØR keeps research, architecture, repositories, contract context, and public presence aligned through one consistent surface.",
    summary:
      "The project exists to make crypto systems harder to break while keeping the reasoning inspectable under pressure.",
  },
  id: {
    kicker: "Canonical Public Surface",
    title:
      "XENØR keeps research, architecture, repositories, contract context, and public presence aligned through one consistent surface.",
    summary:
      "The project exists to make crypto systems harder to break while keeping the reasoning inspectable under pressure.",
  },
  ja: {
    kicker: "Canonical Public Surface",
    title:
      "XENØR keeps research, architecture, repositories, contract context, and public presence aligned through one consistent surface.",
    summary:
      "The project exists to make crypto systems harder to break while keeping the reasoning inspectable under pressure.",
  },
  zh: {
    kicker: "Canonical Public Surface",
    title:
      "XENØR keeps research, architecture, repositories, contract context, and public presence aligned through one consistent surface.",
    summary:
      "The project exists to make crypto systems harder to break while keeping the reasoning inspectable under pressure.",
  },
} as const;

function XenorHeaderMark() {
  return (
    <svg viewBox="0 0 72 72" aria-hidden="true" focusable="false">
      <path d="M36 8 58 60H14z" />
      <path d="M36 8v54M22 42h28M27 28l9 14 9-14M18 60l18-18 18 18" />
    </svg>
  );
}

export function GaeaBackground() {
  return (
    <div className="gaea-background" aria-hidden="true">
      <div className="gaea-grid" />
      <div className="gaea-smudge gaea-smudge-left" />
      <div className="gaea-smudge gaea-smudge-right" />
      <div className="gaea-glow gaea-glow-left" />
      <div className="gaea-glow gaea-glow-right" />
    </div>
  );
}

export function GaeaSiteHeader({ locale = "en" }: { locale?: Locale }) {
  const pathname = usePathname();
  const activeLocale = normalizeLocale(locale);
  const items = navItems[activeLocale];

  return (
    <aside className="gaea-header" aria-label="Site navigation">
      <div className="gaea-header-inner">
        <LocalizedLink
          href="/"
          className="gaea-brand"
          aria-label="XENØR home"
          locale={activeLocale}
        >
          <span className="gaea-brand-mark">
            <XenorHeaderMark />
          </span>
          <span className="gaea-brand-lockup">
            <span className="gaea-brand-wordmark">XENØR</span>
            <span className="gaea-brand-cue">Canonical public surface.</span>
          </span>
        </LocalizedLink>

        <nav className="gaea-nav" aria-label="Primary navigation">
          {items.map((item) => (
            <LocalizedLink
              key={item.href}
              href={item.href}
              locale={activeLocale}
              className={pathname === item.href ? "is-active" : undefined}
            >
              {item.label}
            </LocalizedLink>
          ))}
        </nav>

        <div className="gaea-header-actions">
          <a
            href="https://github.com/XENOr-god"
            className="gaea-action gaea-action-strong"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </aside>
  );
}

export function GaeaSiteFooter({ locale = "en" }: { locale?: Locale }) {
  const activeLocale = normalizeLocale(locale);
  const copy = footerCopy[activeLocale];

  return (
    <footer className="gaea-subpage-footer">
      <div className="container">
        <div className="gaea-subpage-footer-inner">
          <div className="gaea-subpage-footer-copy">
            <p className="gaea-kicker">{copy.kicker}</p>
            <strong>{copy.title}</strong>
            <span>{copy.summary}</span>
          </div>

          <div className="gaea-subpage-footer-links">
            {navItems[activeLocale].slice(1).map((item) => (
              <LocalizedLink key={item.href} href={item.href} locale={activeLocale}>
                {item.label}
              </LocalizedLink>
            ))}
            <a
              href="https://github.com/XENOr-god"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
