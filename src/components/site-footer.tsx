import Image from "next/image";

export default function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-white/10">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-3">


          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-zinc-300">
              XENØr
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.24em] text-zinc-500">
              Deterministic protocol systems with simulation-first validation and modular architecture discipline.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-5 text-[11px] uppercase tracking-[0.28em] text-zinc-500">
          <a
            href="https://github.com/XENOr-god"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://x.com/Xenorlabs"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            X
          </a>
        </div>
      </div>
    </footer>
  );
}