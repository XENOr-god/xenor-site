'use client';

const marqueeContent = [
  '$XNR', '◈', 'DETERMINISTIC EXECUTION', '●', 'SIMULATION-LED VALIDATION', '◈',
  'VERIFIABLE INCENTIVE FLOW', '●', 'BUILT IN RUST', '◈', 'SOLANA NATIVE', '●',
  'XENOR-CORE', '◈', 'XENOR-SIM', '●', 'XENOR-ENGINE', '◈', 'XENOR-SITE', '●'
];

export default function Marquee() {
  return (
    <section className="w-full h-12 bg-bg-surface border-y border-bg-border overflow-hidden flex items-center">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex items-center gap-10 px-5">
            {marqueeContent.map((item, idx) => (
              <span 
                key={`${i}-${idx}`} 
                className={`font-mono text-[12px] tracking-[0.15em] ${
                  ['◈', '●'].includes(item) ? 'text-accent' : 'text-muted'
                }`}
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

