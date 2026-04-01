"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/vision", label: "Vision" },
  { href: "/architecture", label: "Architecture" },
  { href: "/repositories", label: "Repositories" },
  { href: "/contract", label: "Contract" },
  { href: "/presence", label: "Presence" },
] as const;

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="nav-links" aria-label="Primary navigation">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link key={item.href} href={item.href} className={isActive ? "nav-active" : undefined}>
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
