"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import type { Locale } from "../lib/i18n";
import { VerifiedBadge } from "./VerifiedBadge";
import { LocalizedLink } from "./localized-link";

type PresenceCardProps = {
  title: string;
  description: string;
  href: string;
  chips?: readonly string[];
  verified?: boolean;
  verifiedLabel?: string;
  actionLabel?: string;
  copyValue?: string;
  copyLabel?: string;
  copiedLabel?: string;
  copyFailedLabel?: string;
  sideNoteLabel?: string;
  activity?: ReactNode;
  external?: boolean;
  layout?: "card" | "row";
  locale?: Locale;
};

export function PresenceCard({
  title,
  description,
  href,
  chips,
  verified = false,
  verifiedLabel = "Verified",
  actionLabel = "View channel",
  copyValue,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  copyFailedLabel = "Copy failed",
  sideNoteLabel = "Official route",
  activity,
  external = true,
  layout = "card",
  locale = "en",
}: PresenceCardProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle"
  );

  async function handleCopy() {
    if (!copyValue) {
      return;
    }

    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(copyValue);
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("error");
      window.setTimeout(() => setCopyState("idle"), 1800);
    }
  }

  if (layout === "row") {
    return (
      <article className="panel-card presence-card presence-card-row">
        <div className="presence-card-main">
          <div className="presence-card-head">
            <h3>{title}</h3>
            {verified ? <VerifiedBadge label={verifiedLabel} /> : null}
          </div>

          <p className="presence-card-description">{description}</p>

          {chips && chips.length ? (
            <div className="presence-card-chips">
              {chips.map((chip, index) => (
                <span key={`${chip}-${index}`}>{chip}</span>
              ))}
            </div>
          ) : null}
        </div>

        <div className="presence-card-side">
          {activity ? (
            <div className="presence-card-activity-wrap">{activity}</div>
          ) : (
            <p className="presence-card-side-note">{sideNoteLabel}</p>
          )}
        </div>

        <div className="presence-card-actions">
          {external ? (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="presence-card-open"
              aria-label={`${actionLabel}: ${title}`}
            >
              {actionLabel}
            </a>
          ) : (
            <LocalizedLink
              href={href}
              locale={locale}
              className="presence-card-open"
              aria-label={`${actionLabel}: ${title}`}
            >
              {actionLabel}
            </LocalizedLink>
          )}

          {copyValue ? (
            <button
              type="button"
              className="presence-card-copy"
              onClick={handleCopy}
              aria-label={`Copy link for ${title}`}
            >
              {copyState === "copied"
                ? copiedLabel
                : copyState === "error"
                  ? copyFailedLabel
                  : copyLabel}
            </button>
          ) : null}
        </div>
      </article>
    );
  }

  return (
    <article className={`panel-card presence-card presence-card-${layout}`}>
      <div className="presence-card-head">
        <h3>{title}</h3>
        {verified ? <VerifiedBadge label={verifiedLabel} /> : null}
      </div>

      <p className="presence-card-description">{description}</p>

      {chips && chips.length ? (
        <div className="presence-card-chips">
          {chips.map((chip, index) => (
            <span key={`${chip}-${index}`}>{chip}</span>
          ))}
        </div>
      ) : null}

      {activity ? <div className="presence-card-activity-wrap">{activity}</div> : null}

      <div className="presence-card-actions">
        {external ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="presence-card-open"
            aria-label={`${actionLabel}: ${title}`}
          >
            {actionLabel}
          </a>
        ) : (
          <LocalizedLink
            href={href}
            locale={locale}
            className="presence-card-open"
            aria-label={`${actionLabel}: ${title}`}
          >
            {actionLabel}
          </LocalizedLink>
        )}

        {copyValue ? (
          <button
            type="button"
            className="presence-card-copy"
            onClick={handleCopy}
            aria-label={`Copy link for ${title}`}
          >
            {copyState === "copied"
              ? copiedLabel
              : copyState === "error"
                ? copyFailedLabel
                : copyLabel}
          </button>
        ) : null}
      </div>
    </article>
  );
}
