type QuickActionItem = {
  label: string;
  href: string;
  ariaLabel: string;
  icon: "github" | "x" | "dex" | "explorer";
};

type PresenceHeroProps = {
  quickActions: QuickActionItem[];
};

function QuickIcon({ icon }: { icon: QuickActionItem["icon"] }) {
  if (icon === "github") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 2a10 10 0 0 0-3.16 19.48c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.36 1.09 2.94.84.09-.65.35-1.09.63-1.35-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.99 1.03-2.69-.1-.26-.45-1.3.1-2.7 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.84c.85 0 1.7.12 2.5.35 1.9-1.29 2.74-1.02 2.74-1.02.55 1.4.2 2.44.1 2.7.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v2.76c0 .27.18.58.69.48A10 10 0 0 0 12 2" />
      </svg>
    );
  }

  if (icon === "x") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M18.9 2h3.2l-7 8 8.2 12h-6.4l-5-7.2L5.5 22H2.2l7.5-8.6L1.8 2h6.6l4.5 6.6zM17.8 20h1.8L7.4 3.9H5.4z" />
      </svg>
    );
  }

  if (icon === "dex") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M3 4h18v3H3zm2 6h14v3H5zm3 6h8v3H8z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M12 2 4 6v6c0 5 3.4 9.7 8 11 4.6-1.3 8-6 8-11V6zm0 3.2 5 2.2V12c0 3.9-2.5 7.7-5 8.8-2.5-1.1-5-4.9-5-8.8V7.4z" />
    </svg>
  );
}

export function PresenceHero({ quickActions }: PresenceHeroProps) {
  return (
    <div className="section-head presence-hero-head">
      <p className="section-kicker">Presence</p>
      <h1 className="presence-title">Official channels and ecosystem entry points</h1>
      <p className="presence-subcopy">
        These endpoints identify official modules, update channels, and
        architecture references across the public surface.
      </p>

      <div className="presence-quick-row">
        {quickActions.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="presence-quick-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.ariaLabel}
          >
            <QuickIcon icon={item.icon} />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
