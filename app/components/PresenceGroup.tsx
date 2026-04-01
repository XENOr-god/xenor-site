import type { ReactNode } from "react";

type PresenceGroupProps = {
  title: string;
  description?: string;
  children: ReactNode;
  variant?: "grid" | "rows";
};

export function PresenceGroup({
  title,
  description,
  children,
  variant = "grid",
}: PresenceGroupProps) {
  return (
    <section className="presence-group">
      <div className="presence-group-head">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>

      <div
        className={
          variant === "rows" ? "presence-group-grid presence-group-rows" : "presence-group-grid"
        }
      >
        {children}
      </div>
    </section>
  );
}
