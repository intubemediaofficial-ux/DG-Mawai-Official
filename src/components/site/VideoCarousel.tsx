"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { SiteVideo } from "@/lib/siteContent";
import { youtubeId } from "@/lib/youtube";
import Img from "./Img";

export default function VideoCarousel({ videos, title = "Watch" }: { videos: SiteVideo[]; title?: string }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState<number | null>(null);
  if (!videos.length) return null;

  const go = (d: number) => {
    setPlaying(null);
    setIndex((i) => (i + d + videos.length) % videos.length);
  };

  return (
    <section className="relative z-10 overflow-hidden bg-black py-24 sm:py-32">
      <h2 className="reveal mb-12 text-center text-3xl font-extralight tracking-wide text-white sm:mb-16 sm:text-5xl">{title}</h2>
      <div
        className="flex gap-4 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] sm:gap-8"
        style={{
          ["--w" as string]: "min(86vw, 1100px)",
          transform: `translateX(calc(50vw - var(--w) / 2 - ${index} * (var(--w) + 2rem)))`,
        }}
      >
        {videos.map((v, i) => {
          const id = youtubeId(v.url);
          const active = i === index;
          const thumb = v.image || (id ? `https://i.ytimg.com/vi/${id}/hqdefault.jpg` : "");
          return (
            <div key={i} className="w-[var(--w)] shrink-0">
              <div
                className={`relative aspect-video overflow-hidden rounded-2xl bg-neutral-900 transition-all duration-700 sm:rounded-3xl ${active ? "opacity-100" : "scale-[0.92] opacity-35"}`}
              >
                {playing === i && id ? (
                  <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
                    title={v.title}
                    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
                    allowFullScreen
                  />
                ) : (
                  <button
                    type="button"
                    className="group absolute inset-0"
                    onClick={() => {
                      if (!active) return setIndex(i);
                      if (id) setPlaying(i);
                      else window.open(v.url, "_blank", "noopener");
                    }}
                    aria-label={`Play ${v.title}`}
                  >
                    {thumb && <Img src={thumb} alt={v.title} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />}
                    <span className="absolute inset-0 bg-black/25 transition group-hover:bg-black/10" />
                    {active && (
                      <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-black/30 backdrop-blur-sm transition group-hover:scale-110 sm:h-20 sm:w-20">
                        <Play className="ml-1 fill-white text-white" size={26} />
                      </span>
                    )}
                  </button>
                )}
              </div>
              <div className={`mt-6 text-center transition-opacity duration-500 ${active ? "opacity-100" : "opacity-0"}`}>
                <p className="text-lg font-light text-white sm:text-2xl">{v.title}</p>
                <p className="mt-1 text-sm font-light text-muted">{[v.views, v.duration].filter(Boolean).join(" · ")}</p>
              </div>
            </div>
          );
        })}
      </div>
      {videos.length > 1 && (
        <>
          <button onClick={() => go(-1)} aria-label="Previous video" className="absolute left-3 top-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 sm:left-8">
            <ChevronLeft size={22} />
          </button>
          <button onClick={() => go(1)} aria-label="Next video" className="absolute right-3 top-1/2 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition hover:bg-white/30 sm:right-8">
            <ChevronRight size={22} />
          </button>
        </>
      )}
    </section>
  );
}
