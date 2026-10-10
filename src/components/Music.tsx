"use client";

import { Clock, ExternalLink, Play, TrendingUp } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";


export default function Music() {
  const { content } = useSiteContent();

  return (
    <section id="music" className="bg-[#080808] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="section-divider mb-10" />
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            Music
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            <span className="gradient-gold">Trending</span> Songs
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400">
            Viral Rasiya songs, fan favourites, and upcoming releases by DG Mawai.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-[#2a2a2a] bg-[#141414]">
          <div className="hidden grid-cols-12 gap-4 border-b border-[#2a2a2a] px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 sm:grid">
            <div className="col-span-1">#</div>
            <div className="col-span-6">Title</div>
            <div className="col-span-2 text-center">Plays</div>
            <div className="col-span-2 text-center">Year</div>
            <div className="col-span-1 text-right"><Clock size={14} className="inline" /></div>
          </div>

          {content.songs.map((song, index) => (
            <a
              key={song.title}
              href={content.socials.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="block border-b border-[#2a2a2a]/70 px-5 py-5 transition last:border-b-0 hover:bg-white/[0.03] sm:grid sm:grid-cols-12 sm:items-center sm:gap-4 sm:px-6"
            >
              <div className="hidden text-sm font-bold text-gray-500 sm:col-span-1 sm:block">
                {index + 1}
              </div>
              <div className="sm:col-span-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/15 sm:hidden">
                    <Play size={15} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold leading-7 text-white transition hover:text-[#d4af37]">
                      {song.title}
                    </h3>
                    {song.trending && (
                      <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-green-500/10 px-3 py-1 text-xs font-bold text-green-400">
                        <TrendingUp size={12} />
                        Trending
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3 text-sm sm:col-span-5 sm:mt-0 sm:block sm:contents">
                <p className="rounded-xl bg-black/25 px-3 py-2 text-center font-semibold text-gray-300 sm:col-span-2 sm:bg-transparent sm:p-0">
                  {song.plays}
                </p>
                <p className="rounded-xl bg-black/25 px-3 py-2 text-center text-gray-400 sm:col-span-2 sm:bg-transparent sm:p-0">
                  {song.year}
                </p>
                <p className="rounded-xl bg-black/25 px-3 py-2 text-center text-gray-400 sm:col-span-1 sm:bg-transparent sm:p-0 sm:text-right">
                  {song.duration}
                </p>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="mb-6 text-center text-2xl font-black leading-tight text-white">
            Upcoming & Latest <span className="gradient-gold">Releases</span>
          </h3>
          <div className="grid gap-5 sm:grid-cols-3">
            {content.releases.map((song) => (
              <div key={song.title} className="rounded-3xl border border-[#2a2a2a] bg-[#141414] p-6 card-hover">
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#d4af37]/15 px-3 py-1 text-xs font-bold text-[#d4af37]">
                    {song.status}
                  </span>
                  <span className="text-xs font-semibold text-gray-500">
                    {song.year}
                  </span>
                </div>
                <h4 className="text-lg font-bold leading-7 text-white">
                  {song.title}
                </h4>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <a href={content.socials.spotify} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-gold px-7 py-3 text-sm font-bold text-black transition hover:scale-105">
            <ExternalLink size={18} />
            Listen on All Platforms
          </a>
        </div>
      </div>
    </section>
  );
}
