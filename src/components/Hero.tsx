"use client";

import { Music, Play, Users } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";
import HeroSlider from "./HeroSlider";

export default function Hero() {
  const { content } = useSiteContent();

  return (
    <section id="home" className="relative overflow-hidden px-4 pt-24 pb-16 sm:pt-28 sm:pb-24">
      <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-[#121224] to-[#050505]" />
      <div className="absolute inset-0 opacity-25">
        <div className="absolute left-10 top-28 h-72 w-72 rounded-full bg-[#d4af37] blur-[130px]" />
        <div className="absolute bottom-20 right-10 h-72 w-72 rounded-full bg-[#d4af37] blur-[150px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="order-2 text-center lg:order-1 lg:text-left">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#d4af37]/30 bg-[#d4af37]/10 px-4 py-2 text-sm font-semibold text-[#d4af37]">
              <Music size={16} />
              {content.hero.badge}
            </div>

            <h1 className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight text-white sm:text-7xl lg:text-8xl">
              {content.hero.title} <span className="gradient-gold">{content.hero.highlight}</span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-300 sm:text-xl lg:mx-0">
              {content.hero.tagline}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:max-w-2xl">
              {content.hero.stats.map(({ value, label }) => (
                <div key={label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-center">
                  <p className="text-2xl font-black leading-none text-[#d4af37] sm:text-3xl">
                    {value}
                  </p>
                  <p className="mt-2 text-xs font-medium leading-5 text-gray-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#music"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-gold px-8 py-3 text-base font-bold text-black transition hover:scale-105"
              >
                <Play size={18} />
                Listen Now
              </a>
              <a
                href="#booking"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border-2 border-[#d4af37] px-8 py-3 text-base font-bold text-[#d4af37] transition hover:bg-[#d4af37]/10"
              >
                <Users size={18} />
                Book a Show
              </a>
            </div>

            <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 lg:justify-start">
              <a href={content.socials.spotify} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-400 transition hover:text-green-400">Spotify</a>
              <a href={content.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-400 transition hover:text-red-400">YouTube</a>
              <a href={content.socials.appleMusic} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-400 transition hover:text-pink-400">Apple Music</a>
              <a href={content.socials.jiosaavn} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-400 transition hover:text-teal-400">JioSaavn</a>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <HeroSlider />
          </div>
        </div>
      </div>
    </section>
  );
}
