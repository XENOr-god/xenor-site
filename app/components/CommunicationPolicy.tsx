type CommunicationPolicyProps = {
  kicker?: string;
  title?: string;
  items?: readonly string[];
};

const defaultItems = [
  "GitHub is the canonical source of implementation details and technical changes.",
  "The X account publishes release signaling and public progress summaries.",
  "Only trust links published on this page or on the canonical contract reference page.",
  "Architecture claims must map directly to repository artifacts.",
];

export function CommunicationPolicy({
  kicker = "Communication Policy",
  title = "How XENØR communicates technical state",
  items = defaultItems,
}: CommunicationPolicyProps) {
  return (
    <article className="panel-card presence-policy-card">
      <p className="section-kicker">{kicker}</p>
      <h2>{title}</h2>
      <ul className="presence-policy-list">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
