import type { ReactNode } from "react";
import type { Locale } from "../lib/i18n";
import { LocalizedLink } from "./localized-link";

type ManifestoAction = {
  label: string;
  href: string;
  external?: boolean;
  variant?: "primary" | "command";
};

type GaeaSubpageManifestoProps = {
  kicker: string;
  title: ReactNode;
  summary: ReactNode;
  meta: string[];
  actions?: ManifestoAction[];
  aside: ReactNode;
  asidePlacement?: "column" | "below-copy";
  className?: string;
  locale?: Locale;
};

function ManifestoActionLink({
  action,
  locale,
}: {
  action: ManifestoAction;
  locale: Locale;
}) {
  const className =
    action.variant === "command"
      ? "gaea-inline-command gaea-subpage-command"
      : "gaea-action gaea-action-strong";

  if (action.external) {
    return (
      <a
        href={action.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
      >
        {action.label}
      </a>
    );
  }

  return (
    <LocalizedLink href={action.href} className={className} locale={locale}>
      {action.label}
    </LocalizedLink>
  );
}

export function GaeaGhostSigil({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 188"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M80 10 146 150H14z" />
      <path d="M80 10v164" />
      <path d="M40 98h80" />
      <path d="M52 64 80 98l28-34" />
      <path d="M24 150 80 112l56 38" />
      <path d="M40 150 80 52l40 98" />
    </svg>
  );
}

export function GaeaSubpageManifesto({
  kicker,
  title,
  summary,
  meta,
  actions = [],
  aside,
  asidePlacement = "column",
  className,
  locale = "en",
}: GaeaSubpageManifestoProps) {
  return (
    <section className={`gaea-subpage-manifesto${className ? ` ${className}` : ""}`}>
      <div className="container gaea-subpage-manifesto-grid">
        <div className="gaea-subpage-manifesto-copy">
          <p className="gaea-kicker">{kicker}</p>
          <h1>{title}</h1>
          <div className="gaea-subpage-manifesto-summary">{summary}</div>

          <div className="gaea-subpage-actions">
            {actions.map((action) => (
              <ManifestoActionLink
                key={`${action.href}-${action.label}`}
                action={action}
                locale={locale}
              />
            ))}
          </div>

          <div className="gaea-subpage-meta-rail" aria-label={`${kicker} metadata`}>
            {meta.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>

          {asidePlacement === "below-copy" ? (
            <div className="gaea-subpage-inline-aside">{aside}</div>
          ) : null}
        </div>

        {asidePlacement === "column" ? (
          <div className="gaea-subpage-manifesto-aside">{aside}</div>
        ) : null}
      </div>
    </section>
  );
}
