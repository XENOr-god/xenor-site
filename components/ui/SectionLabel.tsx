'use client';

interface SectionLabelProps {
  number: string;
  text: string;
}

export default function SectionLabel({ number, text }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-4 mb-6">
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {number} — {text}
      </span>
      <span className="font-mono text-xs text-muted/40">//</span>
    </div>
  );
}

