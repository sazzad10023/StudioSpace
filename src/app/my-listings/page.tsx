
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Studio = {
    _id: string;
    title: string;
    category: string;
    location: string;
    hourlyRate: number;
    securityDeposit?: number;
    maxCapacity?: number;
    imageUrl?: string;
    ownerEmail: string;
};

const OWNER_EMAIL = "tarikul3639@gmail.com";

export default function MyListingsPage() {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch studios belonging to this owner
    useEffect(() => {
        const fetchStudios = async () => {
            try {
                const res = await fetch(
                    `http://localhost:8000/my-studios/${encodeURIComponent(
                        OWNER_EMAIL
                    )}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch studios");
                }

                const data: Studio[] = await res.json();
                setStudios(data);
            } catch (error) {
                console.error("Error fetching studios:", error);
                setError("Failed to load your studio listings.");
            } finally {
                setLoading(false);
            }
        };

        fetchStudios();
    }, []);

    // Update handler
    const handleUpdate = (id: string) => {
        console.log("Update studio:", id);

        // TODO: Navigate to the edit page.
        // Example: router.push(`/my-listings/edit/${id}`);
    };

    // Delete handler
    const handleDelete = (id: string) => {
        console.log("Delete studio:", id);

        // TODO: Show confirmation modal and call DELETE API.
    };

    if (loading) {
        return (
            <main className="mx-auto max-w-6xl p-6">
                <p>Loading your studio listings...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="mx-auto max-w-6xl p-6">
                <p className="text-red-600">{error}</p>
            </main>
        );
    }

    return (
        <main className="mx-auto max-w-6xl p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    My Studio Listings
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Manage the studio spaces you have listed.
                </p>
            </div>

            {studios.length === 0 ? (
                <div className="rounded-lg border border-dashed p-10 text-center">
                    <h2 className="text-lg font-semibold">
                        No studio listings found
                    </h2>
                    <p className="mt-2 text-sm text-gray-500">
                        Add a studio to see it here.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {studios.map((studio) => (
                        <div
                            key={studio._id}
                            className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center dark:border-gray-800 dark:bg-gray-900"
                        >
                            {studio.imageUrl && (
                                <Image
                                    src={studio.imageUrl}
                                    alt={studio.title}
                                    width={320}
                                    height={200}
                                    className="h-40 w-full rounded-lg object-cover sm:h-28 sm:w-40"
                                />
                            )}

                            <div className="min-w-0 flex-1">
                                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {studio.title}
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    {studio.category}
                                </p>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    {studio.location}
                                </p>

                                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                                    <span>
                                        <strong>${studio.hourlyRate}</strong> / hour
                                    </span>

                                    {studio.maxCapacity !== undefined && (
                                        <span>
                                            Capacity: {studio.maxCapacity}
                                        </span>
                                    )}
                                </div>
                            </div>

                            <div className="flex gap-2 sm:flex-col">
                                <button
                                    type="button"
                                    onClick={() => handleUpdate(studio._id)}
                                    className="flex-1 rounded-md bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700 sm:flex-none"
                                >
                                    Update
                                </button>

                                <button
                                    type="button"
                                    onClick={() => handleDelete(studio._id)}
                                    className="flex-1 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700 sm:flex-none"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
}
