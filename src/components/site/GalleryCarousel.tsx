"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SitePhoto } from "@/lib/siteContent";
import Img from "./Img";

export default function GalleryCarousel({ photos }: { photos: SitePhoto[] }) {
  const [i, setI] = useState(0);
  const n = photos.length;
  useEffect(() => {
    if (n < 2) return;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [n]);
  if (!n) return null;
  const go = (d: number) => setI((x) => (x + d + n) % n);

  return (
    <div className="relative h-[85svh] w-full overflow-hidden bg-black">
      {photos.map((p, k) => (
        <div key={p.src + k} className={`absolute inset-0 transition-opacity duration-1000 ${k === i ? "opacity-100" : "opacity-0"}`}>
          <Img src={p.src} alt={p.label} className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl" />
          <Img src={p.src} alt={p.label} className="absolute inset-0 h-full w-full object-contain" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        </div>
      ))}
      <div className="absolute bottom-24 right-5 max-w-sm text-right sm:bottom-16 sm:right-[8%]">
        <p className="text-3xl font-extralight text-white sm:text-5xl">{photos[i].label}</p>
        <p className="nav-link mt-2 text-[10px] uppercase text-white/60">{photos[i].category}</p>
      </div>
      <button onClick={() => go(-1)} aria-label="Previous photo" className="absolute left-3 top-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/30 sm:left-8">
        <ChevronLeft size={22} />
      </button>
      <button onClick={() => go(1)} aria-label="Next photo" className="absolute right-3 top-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur hover:bg-white/30 sm:right-8">
        <ChevronRight size={22} />
      </button>
      <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/15 px-3 py-2 backdrop-blur">
        {photos.map((_, k) => (
          <button key={k} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? "w-5 bg-white" : "w-2 bg-white/50"}`} />
        ))}
      </div>
    </div>
  );
}
