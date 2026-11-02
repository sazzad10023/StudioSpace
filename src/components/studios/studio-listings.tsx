
"use client";

import React from "react";
import { Building2, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { createLogger } from "@/lib/logger";
import type { Studio } from "@/lib/studios";

const logger = createLogger("allstudio");

// Category filters
const FILTERS = [
  { label: "All", keyword: "" },
  { label: "Photo Studio", keyword: "photo" },
  { label: "Sound Stages", keyword: "sound" },
  { label: "Podcast Lounge", keyword: "podcast" },
  { label: "Music Suite", keyword: "music" },
  { label: "Film Stages", keyword: "film" },
  { label: "Art Workshop", keyword: "art" },
] as const;

// Homepage category names -> listing filter names
const CATEGORY_MAP: Record<string, string> = {
  "photo studios": "Photo Studio",
  "sound stages": "Sound Stages",
  "podcast rooms": "Podcast Lounge",
  "music suites": "Music Suite",
  "art workshops": "Art Workshop",
};

// Match URL category with a filter
function getMatchingFilter(category: string | null): string {
  if (!category) return "All";

  return (
    CATEGORY_MAP[category.trim().toLowerCase()] ?? "All"
  );
}

// Shared UI scale
const PILL = "h-10 rounded-full px-4";

// --------------------------------------------------
// Studio Card
// --------------------------------------------------

function StudioCard({ studio }: { studio: Studio }) {
  return (
    <Card className="w-full gap-0 rounded-2xl border border-gray-200 bg-white py-0 shadow-sm ring-0 transition hover:-translate-y-0.5 hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      {/* Cover image */}
      <div className="relative aspect-[16/10] bg-gray-100 dark:bg-gray-800">
        {studio.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={studio.imageUrl}
            alt={studio.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-gray-300 dark:text-gray-600">
            <Building2 className="size-10" />
          </div>
        )}

        <Badge className="absolute top-3 left-3 bg-white/90 text-violet-700 dark:bg-gray-900/80 dark:text-violet-300">
          {studio.category}
        </Badge>
      </div>

      {/* Title, rating, location */}
      <CardContent className="flex flex-1 flex-col gap-3 pt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-gray-900 sm:text-lg dark:text-white">
            {studio.title}
          </h3>

          {studio.rating !== null ? (
            <span className="flex shrink-0 items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/15 dark:text-amber-300">
              <Star className="size-3.5" />
              {studio.rating.toFixed(1)}
            </span>
          ) : (
            <span className="shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500 dark:bg-gray-800 dark:text-gray-400">
              New
            </span>
          )}
        </div>

        <p className="flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400">
          <MapPin className="size-4 shrink-0" />
          {studio.location || "Location not specified"}
        </p>
      </CardContent>

      {/* Price + action */}
      <CardFooter className="mt-auto flex-col-reverse items-stretch gap-3 border-t border-gray-100 bg-transparent p-4 sm:flex-row sm:items-center sm:justify-between dark:border-gray-800">
        <p className="text-gray-900 dark:text-white">
          {studio.hourlyRate !== null ? (
            <>
              <span className="text-lg font-bold">
                ${studio.hourlyRate}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {" "}/ hour
              </span>
            </>
          ) : (
            <span className="text-sm font-medium">
              Price on request
            </span>
          )}
        </p>

        <Link
          href={`/studios/${studio.id}`}
          className="w-full sm:w-auto"
        >
          <Button
            size="sm"
            className="w-full bg-violet-600 text-white hover:bg-violet-700 sm:w-auto dark:bg-violet-600 dark:text-white dark:hover:bg-violet-700"
            onClick={() =>
              logger.info("View details requested", {
                id: studio.id,
                title: studio.title,
              })
            }
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

// --------------------------------------------------
// Studio Filters
// --------------------------------------------------

function StudioFilters({
  active,
  onSelect,
}: {
  active: string;
  onSelect: (label: string) => void;
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {FILTERS.map((filter) => {
        const isActive = active === filter.label;

        return (
          <Button
            key={filter.label}
            type="button"
            variant="outline"
            size="lg"
            className={cn(
              "shrink-0 whitespace-nowrap dark:bg-gray-900",
              PILL,
              isActive
                ? "border-violet-600 bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-600 dark:text-white"
                : "border-gray-200 bg-white text-gray-700 hover:border-violet-300 hover:bg-transparent dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            )}
            onClick={() => onSelect(filter.label)}
          >
            {filter.label}
          </Button>
        );
      })}
    </div>
  );
}

// --------------------------------------------------
// Studio Listings
// --------------------------------------------------

export default function StudioListings({
  studios,
  failed,
}: {
  studios: Studio[];
  failed: boolean;
}) {
  const searchParams = useSearchParams();

  const selectedCategory = searchParams.get("category");

  // Initialize filter from URL
  const [activeFilter, setActiveFilter] =
    React.useState<string>(() =>
      getMatchingFilter(selectedCategory)
    );

  // Update filter when URL changes
  React.useEffect(() => {
    setActiveFilter(getMatchingFilter(selectedCategory));
  }, [selectedCategory]);

  if (failed) {
    return (
      <div className="bg-gray-50 py-10 sm:py-16 dark:bg-gray-950">
        <Card className="mx-auto max-w-4xl rounded-2xl border border-gray-200 px-4 py-10 text-center shadow-sm ring-0 sm:px-6 dark:border-gray-800 dark:bg-gray-900">
          <CardContent>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              Could not load studios
            </p>

            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              The studio service is not reachable right now.
              Please try again later.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Filter studios
  const activeKeyword =
    FILTERS.find(
      (filter) => filter.label === activeFilter
    )?.keyword ?? "";

  const visible = activeKeyword
    ? studios.filter((studio) =>
        (studio.category ?? "")
          .toLowerCase()
          .includes(activeKeyword)
      )
    : studios;

  return (
    <div className="bg-gray-50 py-8 sm:py-10 dark:bg-gray-950">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            All Studios
          </h1>

          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Browse every workspace available for booking.
          </p>
        </div>

        {/* Category filters */}
        <div className="mt-6">
          <StudioFilters
            active={activeFilter}
            onSelect={(label) => {
              setActiveFilter(label);

              logger.debug("Filter changed", {
                filter: label,
                studios: studios.length,
              });
            }}
          />
        </div>

        {/* Studio cards */}
        {visible.length === 0 ? (
          <Card className="mt-6 rounded-2xl border border-gray-200 px-4 py-10 text-center shadow-sm ring-0 dark:border-gray-800 dark:bg-gray-900">
            <CardContent>
              <Building2 className="mx-auto size-8 text-gray-400" />

              <p className="mt-4 font-semibold text-gray-900 dark:text-white">
                No studios found
              </p>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                No studios match this category yet.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visible.map((studio) => (
              <StudioCard
                key={studio.id}
                studio={studio}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
