'use client';

interface SectionLabelProps {
  number: string;
  text: string;
  color?: string;
}

export default function SectionLabel({ number, text, color = 'text-accent' }: SectionLabelProps) {
  return (
    <div className="inline-flex items-center gap-3 mb-6 group cursor-default">
      <div className={`w-[2px] h-3 ${color === 'text-accent' ? 'bg-accent' : 'bg-white/40'} opacity-50`} />
      <span className={`font-mono text-[9px] uppercase tracking-[0.4em] font-black ${color}`}>
        {number} <span className="opacity-20 mx-1">//</span> {text}
      </span>
    </div>
  );
}

