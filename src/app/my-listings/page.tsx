"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  Building2,
  MapPin,
  Plus,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { authClient } from "@/lib/auth-client";
import Editstudio from "@/components/home/editstudio";
import Deletestudio from "@/components/home/deletestudio";
import Image from "next/image";

type Studio = {
  _id: string;
  title: string;
  category: string;
  location: string;
  hourlyRate: number;
  securityDeposit?: number;
  maxCapacity?: number;
  imageUrl?: string;
  overview?: string;
  amenities?: string[];
  ownerEmail: string;
  hostName?: string;
  hostEmail?: string;
  createdAt?: string;
};

const API_URL = "http://localhost:8000";

export default function MyListingsPage() {
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isPending) return;

    if (!user?.email) {
      setStudios([]);
      setLoading(false);
      return;
    }

    const getStudios = async () => {
      setLoading(true);
      setErrorMessage("");

      try {
        const res = await fetch(
          `${API_URL}/my-studios/${encodeURIComponent(user.email)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            cache: "no-store",
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch your studio listings.");
        }

        const data: Studio[] = await res.json();

        setStudios(data);
      } catch (error) {
        console.error("Error fetching studios:", error);
        setErrorMessage(
          "Unable to load your studio listings. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    getStudios();
  }, [user?.email, isPending]);

  if (isPending || loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-2 text-gray-500">
          <Loader2 className="size-5 animate-spin" />
          <span>Loading your listings...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
        <Building2 className="mb-4 size-12 text-gray-400" />

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Login Required
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Please login to view your studio listings.
        </p>

        <Link
          href="/login"
          className="mt-5 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
        >
          Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-violet-600">
              Studio Dashboard
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              My Listings
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage your studio spaces and listings.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-violet-700"
          >
            <Plus className="size-4" />
            Add Studio
          </Link>
        </div>

        {/* User Information */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Logged in as
          </p>

          <p className="mt-1 font-medium text-gray-900 dark:text-white">
            {user.name}
          </p>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            {user.email}
          </p>
        </div>

        {/* Listing Count */}
        <div className="mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Your studio listings:{" "}
            <span className="font-semibold text-gray-900 dark:text-white">
              {studios.length}
            </span>
          </p>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <div
            role="alert"
            className="mb-6 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-600 dark:border-red-900 dark:bg-red-950/30 dark:text-red-400"
          >
            <AlertCircle className="size-5 shrink-0" />
            {errorMessage}
          </div>
        )}

        {/* Empty State */}
        {!errorMessage && studios.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 bg-white px-5 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
            <Building2 className="mx-auto size-12 text-gray-400" />

            <h2 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
              No Studios Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-gray-500 dark:text-gray-400">
              You haven't added any studios yet. Create your first listing to
              get started.
            </p>

            <Link
              href="/add-studio"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              <Plus className="size-4" />
              Add Your First Studio
            </Link>
          </div>
        )}

        {/* Studio Cards */}
        {studios.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {studios.map((studio) => (
              <article
                key={studio._id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                {/* Studio Image */}
                <div className="relative h-52 bg-gray-100 dark:bg-gray-800">
                  {studio.imageUrl ? (
                    <Image
                      src={studio.imageUrl}
                      alt={studio.title}
                      width={400}
                      height={208}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Building2 className="size-12 text-gray-400" />
                    </div>
                  )}

                  <span className="absolute top-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-violet-700">
                    {studio.category}
                  </span>
                </div>

                {/* Studio Information */}
                <div className="p-5">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                    {studio.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="size-4 shrink-0" />
                    <span className="line-clamp-1">
                      {studio.location}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4 dark:border-gray-800">
                    <div>
                      <p className="text-xs text-gray-500">
                        Hourly Rate
                      </p>

                      <p className="text-lg font-bold text-violet-600">
                        ${studio.hourlyRate}
                        <span className="text-xs font-normal text-gray-500">
                          {" "}/ hour
                        </span>
                      </p>
                    </div>

                    {studio.maxCapacity !== undefined && (
                      <div className="text-right">
                        <p className="text-xs text-gray-500">
                          Max Capacity
                        </p>

                        <p className="font-semibold text-gray-900 dark:text-white">
                          {studio.maxCapacity} People
                        </p>
                      </div>
                    )}
                  </div>

                  {studio.overview && (
                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                      {studio.overview}
                    </p>
                  )}

                  {/* Actions */}
                  <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4 dark:border-gray-800">
                    <Link
                      href={`/studios/${studio._id}`}
                      className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800"
                    >
                      View Details
                    </Link>

                    <Editstudio data={studio} />

                    <Deletestudio id={studio._id} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}