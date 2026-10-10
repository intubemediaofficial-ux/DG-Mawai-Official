"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";

export default function Videos() {
  const { content } = useSiteContent();

  return (
    <section id="videos" className="bg-[#0a0a0a] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="section-divider mb-10" />
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Videos
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            Music <span className="gradient-gold">Videos</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400">
            Watch DG Mawai songs, live performances, and new Rasiya releases on
            the official YouTube channel.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {content.videos.map((video) => (
            <a key={video.title} href={video.url} target="_blank" rel="noopener noreferrer" className="group card-hover">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-[#2a2a2a] bg-[#141414]">
                <Image
                  src={video.image}
                  alt={`DG Mawai ${video.title}`}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover object-center transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                <div className="absolute left-5 top-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#d4af37] bg-black/55 text-[#d4af37] backdrop-blur transition group-hover:bg-[#d4af37] group-hover:text-black">
                  <Play size={24} className="ml-1" />
                </div>
                <div className="absolute right-4 top-4 rounded-full bg-black/75 px-3 py-1 text-xs font-bold text-white">
                  {video.duration}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h3 className="text-lg font-black leading-7 text-white transition group-hover:text-[#d4af37]">
                    {video.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-gray-300">
                    {video.views}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href={content.socials.youtube} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-red-500 px-6 py-3 text-sm font-bold text-red-400 transition hover:bg-red-500/10">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
            Subscribe on YouTube
          </a>
        </div>
      </div>
    </section>
  );
}
