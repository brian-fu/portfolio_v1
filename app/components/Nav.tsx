"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "/", label: "about" },
  { href: "/projects", label: "projects" },
  { href: "/gallery", label: "gallery" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav className="nav fade">
      <Link className="navl" href="/">
        ~/brian
      </Link>
      <div className="nav-links">
        {links.map((link) => (
          <Link
            key={link.href}
            className={pathname === link.href ? "navl active" : "navl"}
            href={link.href}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
