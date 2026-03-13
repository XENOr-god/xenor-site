type RepoCardProps = {
  tag: string;
  name: string;
  summary: string;
  language: string;
  role: string;
  layer: string;
  href: string;
};

export default function RepoCard({
  tag,
  name,
  summary,
  language,
  role,
  layer,
  href,
}: RepoCardProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="panel rounded-[28px] p-7 transition hover:border-violet-300/20 hover:bg-white/5"
    >
      <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
        {tag}
      </p>

      <h3 className="mt-6 text-2xl font-semibold text-white">{name}</h3>
      <p className="body-copy mt-4">{summary}</p>

      <div className="mt-8 space-y-3 text-sm">
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3">
          <span className="uppercase tracking-[0.22em] text-zinc-500">
            Language
          </span>
          <span className="text-zinc-200">{language}</span>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3">
          <span className="uppercase tracking-[0.22em] text-zinc-500">
            Role
          </span>
          <span className="text-zinc-200">{role}</span>
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3">
          <span className="uppercase tracking-[0.22em] text-zinc-500">
            Layer
          </span>
          <span className="text-zinc-200">{layer}</span>
        </div>
      </div>

      <p className="mt-8 text-sm font-medium uppercase tracking-[0.22em] text-white">
        Open repository
      </p>
    </a>
  );
}