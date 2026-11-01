
"use client";

import Link from "next/link";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

const slides = [
  {
    badge: "NEXT-GEN CREATIVE STUDIOS",
    title: "Reserve Production Spaces Built for",
    highlight: "Visionary Creators",
    description:
      "Step into pre-rigged cyclorama soundstages, 4K multi-cam podcast lounges, and Dolby Atmos mixing suites across the continent.",
  },
  {
    badge: "YOUR VISION, YOUR SPACE",
    title: "Find the Perfect Space for",
    highlight: "Your Next Big Idea",
    description:
      "Discover inspiring photography studios, filmmaking spaces, and professional production environments for every creative project.",
  },
  {
    badge: "CREATE WITHOUT LIMITS",
    title: "Bring Your Ideas to Life with",
    highlight: "The Perfect Studio",
    description:
      "Explore unique creative spaces, compare facilities, and book the right studio for your next production.",
  },
];

export default function HeroBanner() {
  return (
    <section className="relative isolate h-[480px] overflow-hidden bg-black text-white sm:h-[530px] lg:h-[480px]">
      {/* Background image */}
      <div
        className="absolute inset-0 -z-20 bg-cover bg-center"
        style={{
          backgroundImage: "url('images/studio-hero.png')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black via-black/85 to-black/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/40 to-transparent" />

      {/* Slider */}
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: ".studio-prev",
          nextEl: ".studio-next",
        }}
        pagination={{
          clickable: true,
          el: ".studio-pagination",
        }}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.badge}>
            <div className="mx-auto flex h-full max-w-7xl items-center px-6 sm:px-10 lg:px-16">
              <div className="max-w-2xl">
                {/* Badge */}
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-2">
                  <span className="text-amber-400">✦</span>
                  <span className="text-[10px] font-bold tracking-wider text-amber-300 sm:text-xs">
                    {slide.badge}
                  </span>
                </div>

                {/* Heading */}
                <h1 className="text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl md:text-6xl">
                  {slide.title}{" "}
                  <span className="text-amber-400">
                    {slide.highlight}
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-xl text-sm leading-7 text-gray-300 sm:text-base sm:leading-8">
                  {slide.description}
                </p>

                {/* CTA buttons */}
                <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
                  <Link
                    href="/studios"
                    className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-amber-400 px-6 py-3 text-sm font-bold text-black shadow-lg shadow-amber-500/20 transition hover:-translate-y-0.5 hover:bg-amber-300"
                  >
                    Explore All Studios
                    <span aria-hidden="true">→</span>
                  </Link>

                  <Link
                    href="/studios"
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Host Your Space
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Previous */}
      <button
        type="button"
        aria-label="Previous slide"
        className="studio-prev absolute left-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/30 text-2xl transition hover:bg-amber-400 hover:text-black sm:left-5 sm:h-12 sm:w-12"
      >
        ‹
      </button>

      {/* Next */}
      <button
        type="button"
        aria-label="Next slide"
        className="studio-next absolute right-3 top-1/2 z-20 flex h-10 w-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/25 bg-black/30 text-2xl transition hover:bg-amber-400 hover:text-black sm:right-5 sm:h-12 sm:w-12"
      >
        ›
      </button>

      {/* Pagination */}
      <div className="studio-pagination absolute bottom-7 left-0 z-20 flex w-full items-center justify-center gap-2" />

      <style jsx global>{`
        .studio-pagination .swiper-pagination-bullet {
          width: 7px;
          height: 7px;
          margin: 0 3px !important;
          background: white;
          opacity: 0.55;
          transition: all 0.3s ease;
        }

        .studio-pagination .swiper-pagination-bullet-active {
          width: 23px;
          border-radius: 20px;
          background: #fbbf24;
          opacity: 1;
        }
      `}</style>
    </section>
  );
}
