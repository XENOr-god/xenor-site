import Link from "next/link";
import { SiteNav } from "./site-nav";

type BackgroundDecorProps = {
  variant?: "home" | "subtle";
};

export function BackgroundDecor({ variant = "subtle" }: BackgroundDecorProps) {
  const toneClass = variant === "home" ? "decor-home" : "decor-subtle";

  return (
    <>
      <div className={`bg-grid ${toneClass}`} aria-hidden="true" />
      <div className={`bg-glow bg-glow-a ${toneClass}`} aria-hidden="true" />
      <div className={`bg-glow bg-glow-b ${toneClass}`} aria-hidden="true" />
    </>
  );
}

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container nav-row">
        <Link href="/" className="brand" aria-label="XENØR home">
          <span>XENØR</span>
          <small>Research Stack</small>
        </Link>

        <SiteNav />

        <div className="nav-actions">
          <a
            className="button button-ghost"
            href="https://github.com/XENOr-god"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className="button button-primary"
            href="https://x.com/Xenorlabs"
            target="_blank"
            rel="noopener noreferrer"
          >
            X account
          </a>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer section-animate">
      <div className="container footer-grid">
        <div>
          <p className="section-kicker">Presence</p>
          <p className="footer-brand">XENØR</p>
          <p className="footer-copy">
            Deterministic execution, simulation-led validation, and disciplined
            public release.
          </p>
        </div>

        <div className="footer-links">
          <a
            href="https://github.com/XENOr-god"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://x.com/Xenorlabs"
            target="_blank"
            rel="noopener noreferrer"
          >
            X account
          </a>
        </div>
      </div>
    </footer>
  );
}
