"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSiteContent } from "@/lib/useSiteContent";

export default function HeroSlider() {
  const { content } = useSiteContent();
  const slides = content.photos.filter((photo) => photo.hero).slice(0, 5);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % Math.max(slides.length, 1));
    }, 4500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const safeSlide = slides.length > 0 ? currentSlide % slides.length : 0;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % Math.max(slides.length, 1));
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % Math.max(slides.length, 1));

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-[2rem] border border-[#d4af37]/20 bg-[#111] shadow-2xl shadow-black/40 sm:h-[620px] lg:h-[720px]">
      {slides.map((slide, index) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === safeSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={slide.src}
            alt={`DG Mawai ${slide.label}`}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            priority={index === 0}
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-black/20" />
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-8">
        <div className="max-w-xl rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-md sm:p-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#d4af37]">
            Official Artist Website
          </p>
          <h2 className="text-3xl font-black leading-tight text-white sm:text-5xl">
            {content.hero.title} {content.hero.highlight}
          </h2>
          <p className="mt-3 max-w-md text-sm leading-7 text-gray-200 sm:text-base">
            {content.hero.badge} | Live performer and folk music artist.
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous photo"
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/40 bg-black/55 text-[#d4af37] backdrop-blur transition hover:bg-[#d4af37] hover:text-black"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next photo"
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-[#d4af37]/40 bg-black/55 text-[#d4af37] backdrop-blur transition hover:bg-[#d4af37] hover:text-black"
      >
        <ChevronRight size={22} />
      </button>

      <div className="absolute bottom-4 right-5 z-20 flex items-center gap-2 sm:bottom-8 sm:right-8">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to photo ${index + 1}`}
            className={`h-2.5 rounded-full transition-all ${
              index === safeSlide ? "w-8 bg-[#d4af37]" : "w-2.5 bg-white/45"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
