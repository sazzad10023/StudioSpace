"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MapPin, Plus } from "lucide-react";
import Editstudio from "@/components/home/editstudio";
import Deletestudio from "@/components/home/deletestudio";


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
};

const API_URL = "http://localhost:8000";
const OWNER_EMAIL = "tarikul3639@gmail.com";

export default function MyListingsPage() {
    const [studios, setStudios] = useState<Studio[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getStudios = async () => {
            try {
                const res = await fetch(
                    `${API_URL}/my-studios/${encodeURIComponent(OWNER_EMAIL)}`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch studios");
                }

                const data: Studio[] = await res.json();
                setStudios(data);
            } catch (error) {
                console.error("Error fetching studios:", error);
            } finally {
                setLoading(false);
            }
        };

        getStudios();
    }, []);

    if (loading) {
        return (
            <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
                <div className="mx-auto max-w-5xl">
                    <p className="text-sm text-gray-500">Loading studios...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-8">
            <div className="mx-auto max-w-5xl">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            My Listings
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            {studios.length} studio(s)
                        </p>
                    </div>

                    <Link
                        href="/add-studio"
                        className="flex shrink-0 items-center gap-2 rounded-md bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800"
                    >
                        <Plus size={16} />
                        Add Studio
                    </Link>
                </div>

                {/* Studio Cards */}
                <div className="space-y-3">
                    {studios.map((studio) => (
                        <div
                            key={studio._id}
                            className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-3 transition hover:shadow-sm sm:flex-row"
                        >
                            {/* Image */}
                            <div className="relative h-40 w-full shrink-0 overflow-hidden rounded-md bg-gray-100 sm:h-32 sm:w-44">
                                {studio.imageUrl ? (
                                    <Image
                                        src={studio.imageUrl}
                                        alt={studio.title}
                                        fill
                                        sizes="(max-width: 640px) 100vw, 176px"
                                        className="object-cover"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-sm text-gray-400">
                                        No image
                                    </div>
                                )}
                            </div>

                            {/* Details */}
                            <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                                <div>
                                    <span className="text-xs font-medium text-gray-500">
                                        {studio.category}
                                    </span>

                                    <h2 className="mt-1 text-lg font-semibold text-gray-900">
                                        {studio.title}
                                    </h2>

                                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                                        <MapPin size={14} className="shrink-0" />
                                        {studio.location}
                                    </p>
                                    {studio.overview && (
                                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">
                                            {studio.overview}
                                        </p>
                                    )}

                                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-600">
                                        <span className="font-semibold text-gray-900">
                                            ৳{studio.hourlyRate}/hr
                                        </span>

                                        <span>
                                            Capacity: {studio.maxCapacity ?? "N/A"}
                                        </span>

                                        <span>
                                            Deposit: ৳{studio.securityDeposit ?? 0}
                                        </span>
                                    </div>
                                </div>

                                {/* Action Buttons - Right Side */}
                                <div className="flex flex-wrap items-center justify-end gap-2 border-t border-gray-100 pt-3">
                                    <Link
                                        href={`/studios/${studio._id}`}
                                        className="inline-flex items-center rounded-md bg-gray-900 px-4 py-2 text-xs font-medium text-white transition hover:bg-gray-700"
                                    >
                                        View Details
                                    </Link>


                                    <Editstudio data={studio}></Editstudio>
                                   
                                    <Deletestudio id={studio._id}></Deletestudio>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State */}
                    {studios.length === 0 && (
                        <div className="rounded-lg border border-gray-200 bg-white py-12 text-center">
                            <p className="text-sm text-gray-500">
                                No studio listings found.
                            </p>

                            <Link
                                href="/add-studio"
                                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-gray-900 underline"
                            >
                                <Plus size={15} />
                                Add your first studio
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}