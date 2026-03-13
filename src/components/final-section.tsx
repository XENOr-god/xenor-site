export default function FinalSection() {
  return (
    <section className="relative z-10 mx-auto max-w-7xl px-6 py-24 md:px-10">
      <div className="rounded-[36px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.14),transparent_32%)] p-10 md:p-14">
        <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
          Current Direction
        </p>

        <h2 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight tracking-[-0.05em] text-white md:text-6xl">
          Building an ecosystem across Rust, simulation, and Solana-native
          experimentation.
        </h2>

        <p className="mt-6 max-w-2xl leading-8 text-zinc-400">
          Keep the closing section focused on technical momentum and public
          discovery. It should invite people to follow the research, not sell
          hype.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="https://github.com/XENOr-god"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 bg-white px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-black transition hover:scale-[1.02]"
          >
            Explore GitHub
          </a>

          <a
            href="https://x.com/Xenorlabs"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-7 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
          >
            Follow Updates
          </a>
        </div>
      </div>
    </section>
  );
}