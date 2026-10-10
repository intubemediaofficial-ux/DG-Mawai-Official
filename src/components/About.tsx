"use client";

import Image from "next/image";
import { Award, Heart, Mic2, Star } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";

const icons = [Award, Heart, Star, Mic2];

export default function About() {
  const { content } = useSiteContent();

  return (
    <section id="about" className="relative bg-[#0a0a0a] px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="section-divider mb-10" />
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-[#d4af37]">
            {content.about.eyebrow}
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            {content.about.title} <span className="gradient-gold">{content.about.highlight}</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-gray-400">
            {content.about.intro}
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -right-4 -top-4 h-28 w-28 rounded-3xl border-2 border-[#d4af37]/30" />
            <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-3xl border-2 border-[#d4af37]/30" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-[#d4af37]/20 bg-[#141414] shadow-2xl shadow-black/40">
              <Image
                src={content.about.image}
                alt="DG Mawai traditional Rajasthani portrait"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-black leading-tight text-white sm:text-3xl">
              {content.about.heading}
            </h3>
            <div className="mt-6 space-y-5 text-base leading-8 text-gray-300">
              {content.about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {content.achievements.map(({ value, label }, i) => {
                const Icon = icons[i % icons.length];
                return (
                <div key={label} className="flex items-center gap-4 rounded-2xl border border-[#2a2a2a] bg-[#141414] p-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/15">
                    <Icon size={22} className="text-[#d4af37]" />
                  </div>
                  <div>
                    <p className="text-lg font-black leading-tight text-white">
                      {value}
                    </p>
                    <p className="mt-1 text-sm leading-5 text-gray-400">
                      {label}
                    </p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
