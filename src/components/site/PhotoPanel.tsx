import type { ReactNode } from "react";
import type { SitePhoto } from "@/lib/siteContent";
import Img from "./Img";

export default function PhotoPanel({ photo, children, first = false }: { photo: SitePhoto; children?: ReactNode; first?: boolean }) {
  return (
    <section className="sticky top-0 h-[100svh] w-full overflow-hidden bg-black">
      <Img
        src={photo.src}
        alt={photo.label}
        loading={first ? "eager" : "lazy"}
        className={`absolute inset-0 h-full w-full object-cover ${first ? "slow-zoom" : ""}`}
        style={{ objectPosition: photo.focus || "50% 30%" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      {children}
      {!first && photo.label && (
        <p className="nav-link absolute bottom-24 left-5 text-[10px] font-light uppercase text-white/70 sm:bottom-32 sm:left-[7%] sm:text-xs">
          {photo.label}
          {photo.category && <span className="text-white/40"> — {photo.category}</span>}
        </p>
      )}
    </section>
  );
}
