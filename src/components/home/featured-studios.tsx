
import Image from "next/image";
import Link from "next/link";
import { MapPin, Star, ArrowUpRight } from "lucide-react";

const API_URL = "http://localhost:8000";

type Studio = {
  _id: string;
  title: string;
  category: string;
  imageUrl: string;
  hourlyRate: number;
  rating?: number;
  location: string;
};

export default async function FeaturedStudios() {
  let studios: Studio[] = [];

  try {
    const res = await fetch(`${API_URL}/featured-studios`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch studios");
    }

    studios = await res.json();
  } catch (error) {
    console.error("Featured Studios Error:", error);
  }

  return (
    <section className="py-12 md:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
              Discover Spaces
            </p>

            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              Featured Studios
            </h2>

            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Discover amazing creative spaces for your next project.
            </p>
          </div>

          <Link
            href="/studios"
            className="hidden items-center gap-1.5 text-sm font-semibold transition-colors hover:text-primary sm:flex"
          >
            View All
            <ArrowUpRight size={16} />
          </Link>
        </div>

        {/* Studio Cards */}
        {studios.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {studios.slice(0, 6).map((studio) => (
              <Link
                key={studio._id}
                href={`/studios/${studio._id}`}
                className="group overflow-hidden rounded-lg border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                {/* Studio Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {studio.imageUrl && (
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}

                  {/* Category Badge */}
                  <span className="absolute left-3 top-3 rounded-md bg-background/90 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                    {studio.category}
                  </span>

                  {/* Rating Badge */}
                  <span className="absolute right-3 top-3 flex items-center gap-1 rounded-md bg-background/90 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                    <Star
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    {studio.rating ?? "New"}
                  </span>
                </div>

                {/* Studio Content */}
                <div className="space-y-3 p-4">
                  <div>
                    <h3 className="line-clamp-1 text-base font-semibold transition-colors group-hover:text-primary">
                      {studio.title}
                    </h3>

                    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <MapPin size={13} />
                      <span className="line-clamp-1">
                        {studio.location}
                      </span>
                    </p>
                  </div>

                  {/* Price and Details */}
                  <div className="flex items-center justify-between border-t pt-3">
                    <div>
                      <span className="text-lg font-bold">
                        ${studio.hourlyRate}
                      </span>

                      <span className="text-xs text-muted-foreground">
                        {" "}/ hr
                      </span>
                    </div>

                    <span className="flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground transition-opacity group-hover:opacity-90">
                      View Details
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed py-12 text-center">
            <h3 className="text-base font-semibold">
              No Featured Studios Yet
            </h3>

            <p className="mt-2 text-sm text-muted-foreground">
              New studio spaces will appear here soon.
            </p>
          </div>
        )}

        {/* Mobile View All */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary"
          >
            View All Studios
            <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
