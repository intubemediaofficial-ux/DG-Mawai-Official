"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSiteContent } from "@/lib/useSiteContent";

export default function TopNav() {
  const path = usePathname();
  const { texts } = useSiteContent().content;
  const LINKS = [
    { href: "/", label: texts.navHome },
    { href: "/music", label: texts.navMusic },
    { href: "/performance", label: texts.navPerformance },
  ];
  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 bg-gradient-to-b from-black/70 via-black/25 to-transparent">
      <nav className="pointer-events-auto mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:h-24 sm:px-[10%]">
        {LINKS.map(({ href, label }) => {
          const active = href === "/" ? path === "/" : path.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`nav-link text-[10px] uppercase transition-colors duration-300 sm:text-[15px] ${
                active ? "font-medium text-white" : "font-light text-white/60 hover:text-white"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
