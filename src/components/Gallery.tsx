"use client";

import Image from "next/image";
import { useSiteContent } from "@/lib/useSiteContent";

export default function Gallery() {
  const { content } = useSiteContent();

  return (
    <section id="gallery" className="bg-[#0a0a0a] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="section-divider mb-10" />
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Photo Gallery
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            DG Mawai <span className="gradient-gold">Official Photos</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400">
            Singer portraits, traditional looks, live show moments, and artist
            photos shared for the official website.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.photos.map((item) => (
            <figure
              key={item.src}
              className={`group relative overflow-hidden rounded-3xl border border-[#2a2a2a] bg-[#141414] shadow-xl shadow-black/20 ${
                item.large ? "sm:col-span-2 sm:row-span-2" : ""
              }`}
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={item.src}
                  alt={`DG Mawai ${item.label}`}
                  fill
                  sizes={item.large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
                  className="object-cover object-center transition duration-500 group-hover:scale-105"
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/70 to-transparent p-5">
                <span className="mb-2 inline-block rounded-full bg-[#d4af37] px-3 py-1 text-xs font-bold text-black">
                  {item.category}
                </span>
                <p className="text-base font-semibold leading-snug text-white">
                  {item.label}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href={content.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-pink-500 px-6 py-3 text-sm font-bold text-pink-400 transition hover:bg-pink-500/10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
