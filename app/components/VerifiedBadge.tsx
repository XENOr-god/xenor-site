type VerifiedBadgeProps = {
  label?: string;
};

export function VerifiedBadge({ label = "Verified" }: VerifiedBadgeProps) {
  return (
    <span className="presence-verified-badge" aria-label={label}>
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M6.4 11.2 3.6 8.4l1.1-1.1 1.7 1.7 4.9-4.9 1.1 1.1Z" />
      </svg>
      {label}
    </span>
  );
}
