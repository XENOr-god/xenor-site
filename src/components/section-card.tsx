type SectionCardProps = {
  label?: string;
  title: string;
  description: string;
};

export default function SectionCard({
  label,
  title,
  description,
}: SectionCardProps) {
  return (
    <div className="panel rounded-[28px] p-7">
      {label ? (
        <p className="text-[11px] uppercase tracking-[0.35em] text-zinc-500">
          {label}
        </p>
      ) : null}
      <h3 className="mt-6 text-2xl font-semibold text-white">{title}</h3>
      <p className="body-copy mt-5">{description}</p>
    </div>
  );
}