"use client";

import Link from "next/link";
import { useSiteContent } from "@/lib/useSiteContent";
import SocialIcons from "./SocialIcons";

export default function BottomBar() {
  const { texts } = useSiteContent().content;
  return (
    <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-50 bg-gradient-to-t from-black/80 via-black/35 to-transparent">
      <div className="pointer-events-auto mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-5 sm:h-24 sm:px-[7%]">
        <div className="nav-link flex items-center gap-3 text-[10px] font-light uppercase text-white/85 sm:gap-4 sm:text-[17px]">
          <Link href="/about" className="hover:text-white">{texts.navMore}</Link>
          <span className="text-white/40">|</span>
          <Link href="/contact" className="hover:text-white">{texts.navBook}</Link>
        </div>
        <p className="hidden text-xs font-light tracking-wide text-white/50 lg:block">
          © {new Date().getFullYear()} {texts.footer}
        </p>
        <SocialIcons size={22} className="!gap-3 sm:!gap-5" />
      </div>
    </footer>
  );
}
