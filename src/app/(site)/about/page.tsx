import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import GalleryCarousel from "@/components/site/GalleryCarousel";
import Img from "@/components/site/Img";
import { getContent } from "@/lib/store";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "About & Biography",
  description: "Biography of DG Mawai, Rajasthani Gurjar Rasiya singer — journey, milestones, photos and upcoming releases.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About & Biography | DG Mawai", description: "Biography of DG Mawai, Rajasthani Gurjar Rasiya singer — journey, milestones, photos and upcoming releases.", url: "/about" },
};

export default async function AboutPage() {
  const { about, achievements, photos, releases } = await getContent();
  const upcoming = releases.filter((r) => /soon|upcoming|latest/i.test(r.status));

  return (
    <>
      <section className="relative h-[100svh] overflow-hidden">
        <Img src={about.image} alt={about.highlight} loading="eager" className="slow-zoom absolute inset-0 h-full w-full object-cover" style={{ objectPosition: "50% 22%" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent" />
        <div className="absolute inset-y-0 left-0 flex max-w-2xl flex-col justify-center px-5 sm:px-[8%]">
          <p className="nav-link fade-up text-[10px] uppercase text-gold sm:text-xs">{about.eyebrow}</p>
          <h1 className="fade-up mt-4 text-5xl font-extralight text-white sm:text-7xl">{about.highlight}</h1>
          <p className="fade-up mt-6 text-lg font-light leading-relaxed text-white/80 sm:text-xl">{about.intro}</p>
        </div>
      </section>

      <section className="px-5 py-28 sm:py-36">
        <div className="mx-auto max-w-3xl">
          <h2 className="reveal text-center text-3xl font-extralight text-gold sm:text-5xl">{about.heading}</h2>
          <div className="mt-14 space-y-8">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="reveal text-lg font-light leading-9 text-white/75 sm:text-xl">{p}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 pb-28 sm:pb-36">
        <h2 className="reveal text-center text-3xl font-extralight text-gold sm:text-5xl">Milestones</h2>
        <div className="mx-auto mt-16 grid max-w-6xl sm:grid-cols-2 lg:grid-cols-3">
          {achievements.map((a, i) => (
            <div key={i} className="reveal border-white/10 px-8 py-10 text-center lg:[&:not(:nth-child(3n))]:border-r">
              <p className="text-sm font-light text-muted">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-3 text-4xl font-extralight text-white">{a.value}</p>
              <p className="mt-3 font-light leading-relaxed text-muted">{a.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="reveal pb-16 text-center text-3xl font-extralight text-white sm:text-5xl">Moments</h2>
        <GalleryCarousel photos={photos} />
      </section>

      {upcoming.length > 0 && (
        <section className="px-5 py-28 text-center">
          <h2 className="reveal text-3xl font-extralight text-white sm:text-5xl">Upcoming</h2>
          <div className="mx-auto mt-14 max-w-3xl divide-y divide-white/10 border-y border-white/10">
            {upcoming.map((r, i) => (
              <div key={i} className="reveal flex items-center justify-between gap-4 py-7 text-left">
                <p className="text-2xl font-extralight text-white sm:text-3xl">{r.title}</p>
                <p className="shrink-0 text-sm font-light text-gold">{r.status} · {r.year}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="px-5 pb-40 pt-10 text-center">
        <p className="reveal text-2xl font-extralight text-white/85 sm:text-4xl">Bring DG Mawai to your stage.</p>
        <Link href="/contact" className="mt-10 inline-flex items-center gap-2 border-b border-white pb-2 text-sm uppercase tracking-[0.3em] text-white hover:text-white/70">
          Book a show <ArrowUpRight size={14} />
        </Link>
      </section>
    </>
  );
}
