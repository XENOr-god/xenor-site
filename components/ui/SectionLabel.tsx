'use client';

interface SectionLabelProps {
  number: string;
  text: string;
  color?: string;
}

export default function SectionLabel({ number, text, color = 'text-accent' }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-4 mb-6">
      <span className={`font-mono text-xs uppercase tracking-[0.2em] ${color}`}>
        {number} — {text}
      </span>
      <span className="font-mono text-xs text-muted/40">//</span>
    </div>
  );
}

