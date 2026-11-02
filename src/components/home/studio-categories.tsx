"use client";

import { useRouter } from "next/navigation";
import {
  Camera,
  Clapperboard,
  Mic,
  Music2,
  Palette,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    name: "Photo Studios",
    icon: Camera,
    color: "text-violet-600",
    bg: "bg-violet-100",
    border: "border-violet-200",
    hover: "hover:bg-violet-50",
  },
  {
    name: "Sound Stages",
    icon: Clapperboard,
    color: "text-blue-600",
    bg: "bg-blue-100",
    border: "border-blue-200",
    hover: "hover:bg-blue-50",
  },
  {
    name: "Podcast Rooms",
    icon: Mic,
    color: "text-emerald-600",
    bg: "bg-emerald-100",
    border: "border-emerald-200",
    hover: "hover:bg-emerald-50",
  },
  {
    name: "Music Suites",
    icon: Music2,
    color: "text-amber-600",
    bg: "bg-amber-100",
    border: "border-amber-200",
    hover: "hover:bg-amber-50",
  },
  {
    name: "Art Workshops",
    icon: Palette,
    color: "text-rose-600",
    bg: "bg-rose-100",
    border: "border-rose-200",
    hover: "hover:bg-rose-50",
  },
];

export default function StudioCategories() {
  const router = useRouter();

  const handleCategoryClick = (category: string) => {
    router.push(
      `/studios?category=${encodeURIComponent(category)}`
    );
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-7">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Browse by Studio Categories
          </h2>

          <p className="mt-2 text-sm text-gray-500 sm:text-base">
            Find the perfect creative space for your needs.
          </p>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <button
                key={category.name}
                type="button"
                onClick={() =>
                  handleCategoryClick(category.name)
                }
                className={`
                  group flex min-h-[155px] flex-col
                  items-start justify-between rounded-xl
                  border p-4 text-left transition-all
                  duration-200 hover:-translate-y-1
                  hover:shadow-md sm:min-h-[175px] sm:p-5
                  ${category.border}
                  ${category.hover}
                `}
              >
                {/* Icon */}
                <div
                  className={`flex size-12 items-center justify-center rounded-xl sm:size-14 ${category.bg}`}
                >
                  <Icon
                    className={`size-6 sm:size-7 ${category.color}`}
                    strokeWidth={1.8}
                  />
                </div>

                {/* Title and Arrow */}
                <div className="flex w-full items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-gray-900 sm:text-base">
                    {category.name}
                  </h3>

                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-200 group-hover:translate-x-1">
                    <ArrowRight className="size-4 text-gray-800" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}