type ChannelCardProps = {
  title: string;
  status: string;
  summary: string;
  meta: string;
  href: string;
};

export default function ChannelCard({
  title,
  status,
  summary,
  meta,
  href,
}: ChannelCardProps) {
  return (
    <div className="panel rounded-[28px] p-7">
      <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
        {title}
      </p>
      <p className="mt-4 text-sm uppercase tracking-[0.22em] text-violet-200">
        {status}
      </p>
      <p className="body-copy mt-4">{summary}</p>
      <p className="mt-5 text-sm text-zinc-500">{meta}</p>

      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-8 inline-flex primary-button"
      >
        Open channel
      </a>
    </div>
  );
}