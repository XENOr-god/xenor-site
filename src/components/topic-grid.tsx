import Link from "next/link";

const topics = [
  {
    href: "/vision",
    title: "Vision",
    description:
      "Core principles, system guarantees, and engineering direction of XENØr.",
  },
  {
    href: "/architecture",
    title: "Architecture",
    description:
      "Architecture, repositories, and how xenor-core, xenor-sim, and xenor-web compose a deterministic stack.",
  },
  {
    href: "/contract",
    title: "Contract Address",
    description:
      "Canonical CA reference and release readiness details.",
  },
  {
    href: "/presence",
    title: "Public Presence",
    description:
      "Official channels and communication policy for public updates.",
  },
];

export default function TopicGrid() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
      {topics.map((topic) => (
        <Link
          key={topic.href}
          href={topic.href}
          className="panel rounded-[28px] p-7 transition hover:border-violet-300/20 hover:bg-white/5"
        >
          <h3 className="text-2xl font-semibold text-white">{topic.title}</h3>
          <p className="body-copy mt-4">{topic.description}</p>
          <p className="mt-8 text-sm font-medium uppercase tracking-[0.22em] text-white">
            Open page
          </p>
        </Link>
      ))}
    </div>
  );
}