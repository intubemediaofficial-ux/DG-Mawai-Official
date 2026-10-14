import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PhotoPanel from "@/components/site/PhotoPanel";
import VideoCarousel from "@/components/site/VideoCarousel";
import { pageMetadata } from "@/lib/seo";
import { getContent } from "@/lib/store";
import { splitEvents } from "@/lib/events";

export const dynamic = "force-dynamic";
export function generateMetadata(): Promise<Metadata> {
  return pageMetadata("home", "/");
}

export default async function Home() {
  const content = await getContent();
  const stack = content.photos.filter((p) => p.hero);
  const panels = stack.length ? stack : content.photos.slice(0, 5);
  const [first, ...rest] = panels;
  const before = rest.slice(0, 2);
  const after = rest.slice(2);
  const next = splitEvents(content).upcoming[0];
  const show = content.sections;

  return (
    <>
      <div className="relative">
        {first && (
          <PhotoPanel photo={first} first>
            <div className="absolute inset-x-0 bottom-28 px-5 text-center sm:bottom-36">
              <p className="nav-link fade-up text-[10px] uppercase text-white/75 sm:text-sm">{content.hero.badge}</p>
              <h1 className="fade-up mt-3 text-5xl font-extralight uppercase tracking-[0.14em] text-white sm:text-8xl sm:tracking-[0.18em] lg:text-[9rem]">
                {content.hero.title} {content.hero.highlight}
              </h1>
            </div>
          </PhotoPanel>
        )}
        {before.map((p, i) => <PhotoPanel key={i} photo={p} />)}
      </div>

      {show.homeVideos && content.videos.length > 0 && <VideoCarousel videos={content.videos} title={content.texts.homeVideosTitle} />}

      <div className="relative">
        {after.map((p, i) => <PhotoPanel key={i} photo={p} />)}
      </div>

      <section className="relative z-10 bg-black px-5 py-28 sm:py-36">
        <div className="mx-auto max-w-5xl text-center">
          {show.homeTagline && <p className="reveal mx-auto max-w-3xl text-2xl font-extralight leading-relaxed text-white/90 sm:text-4xl">{content.hero.tagline}</p>}
          {show.homeStats && content.hero.stats.length > 0 && <div className="reveal mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-y-10 sm:grid-cols-4">
            {content.hero.stats.map((s, i) => (
              <div key={i} className="px-2">
                <p className="text-4xl font-extralight text-white sm:text-5xl">{s.value}</p>
                <p className="nav-link mt-2 text-[9px] uppercase text-muted sm:text-[10px]">{s.label}</p>
              </div>
            ))}
          </div>}
          {show.homeNextShow && next && (
            <Link href="/performance" className="reveal group mx-auto mt-20 flex max-w-3xl flex-col items-center justify-between gap-4 border-y border-white/10 py-8 text-left sm:flex-row">
              <div>
                <p className="nav-link text-[10px] uppercase text-gold">{content.texts.homeNextShow}</p>
                <p className="mt-2 text-2xl font-light text-white">{next.title}</p>
                <p className="text-sm font-light text-muted">{[next.venue, next.city].filter(Boolean).join(", ")}{next.date && ` · ${next.date}`}</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/60 px-6 py-3 text-sm text-white transition group-hover:bg-white group-hover:text-black">
                {content.texts.homeAllShows} <ArrowUpRight size={16} />
              </span>
            </Link>
          )}
          {show.homeBookCta && <Link href="/contact" className="mt-14 inline-flex items-center gap-2 border-b border-white pb-2 text-sm uppercase tracking-[0.3em] text-white hover:text-white/70">
            {content.texts.bookCta} <ArrowUpRight size={14} />
          </Link>}
        </div>
      </section>
      <div className="h-16 bg-black sm:h-24" />
    </>
  );
}
