import { Diamond, Circle } from 'lucide-react';

const marqueeContent = [
  { type: 'text', val: '$XNR' },
  { type: 'icon', val: Diamond },
  { type: 'text', val: 'DETERMINISTIC EXECUTION' },
  { type: 'icon', val: Circle },
  { type: 'text', val: 'SIMULATION-LED VALIDATION' },
  { type: 'icon', val: Diamond },
  { type: 'text', val: 'VERIFIABLE INCENTIVE FLOW' },
  { type: 'icon', val: Circle },
  { type: 'text', val: 'BUILT IN RUST' },
  { type: 'icon', val: Diamond },
  { type: 'text', val: 'SOLANA NATIVE' },
  { type: 'icon', val: Circle },
  { type: 'text', val: 'XENOR-CORE' },
  { type: 'icon', val: Diamond },
  { type: 'text', val: 'XENOR-SIM' },
  { type: 'icon', val: Circle },
  { type: 'text', val: 'XENOR-ENGINE' },
  { type: 'icon', val: Diamond },
  { type: 'text', val: 'XENOR-SITE' },
  { type: 'icon', val: Circle }
];

export default function Marquee() {
  return (
    <section className="w-full h-12 bg-bg-surface border-y border-bg-border overflow-hidden flex items-center">
      <div className="flex animate-marquee whitespace-nowrap">
        {/* Reduced duplication for performance, especially on mobile */}
        {[...Array(3)].map((_, i) => (
          <div key={i} className={`flex items-center gap-10 px-5 ${i > 1 ? 'hidden md:flex' : 'flex'}`}>
            {marqueeContent.map((item, idx) => (
              item.type === 'text' ? (
                <span 
                  key={`${i}-${idx}`} 
                  className="font-mono text-[11px] tracking-[0.2em] text-muted font-bold"
                >
                  {item.val as string}
                </span>
              ) : (
                <div key={`${i}-${idx}`} className="text-accent">
                  {/* @ts-ignore */}
                  <item.val size={8} strokeWidth={3} fill="currentColor" />
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

