"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
    ArrowLeft,
    Building2,
    MapPin,
    Users,
    Clock,
    ShieldCheck,
    Check,
    Star,
    Mail,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { createLogger } from "@/lib/logger";
import page from "../page";
import BookingModal from "@/components/studios/booking-modal";

const logger = createLogger("studio-details");

type StudioReview = {
    name: string;
    rating: number;
    comment: string;
};

type Studio = {
    _id?: string;
    title: string;
    category: string;
    imageUrl?: string;
    location?: string;
    maxCapacity?: number;
    hourlyRate: number | string;
    securityDeposit?: number | string;
    overview?: string;
    amenities?: string[];
    hostName?: string;
    hostEmail?: string;
    reviews?: StudioReview[];
};

export default function StudioDetailsPage() {
    const { id } = useParams<{ id: string }>();

    const [studio, setStudio] = useState<Studio | null>(null);
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);

    useEffect(() => {
        const getStudio = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8000/get-studio/${id}`
                );

                if (!response.ok) {
                    throw new Error("Studio not found");
                }

                const data: Studio = await response.json();
                setStudio(data);
            } catch (error: unknown) {
                console.error(error);
                setFailed(true);
            } finally {
                setLoading(false);
            }
        };

        getStudio();
    }, [id]);

    if (loading) {
        return (
            <main className="grid min-h-screen place-items-center bg-gray-50 dark:bg-gray-950">
                <p className="animate-pulse text-gray-500">
                    Loading studio details...
                </p>
            </main>
        );
    }

    if (failed || !studio) {
        return (
            <main className="grid min-h-[60vh] place-items-center bg-gray-50 px-4 dark:bg-gray-950">
                <div className="text-center">
                    <Building2 className="mx-auto size-12 text-gray-400" />

                    <h1 className="mt-4 text-xl font-bold">
                        Studio Not Found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        This studio could not be loaded.
                    </p>

                    <Link
                        href="/studios"
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-white hover:bg-violet-700"
                    >
                        <ArrowLeft className="size-4" />
                        Back to Studios
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-gray-50 px-4 py-6 sm:px-6 sm:py-10 dark:bg-gray-950">
            <div className="mx-auto max-w-6xl">
                {/* Back Link */}
                <Link
                    href="/studios"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 transition hover:text-violet-600 dark:text-gray-400"
                >
                    <ArrowLeft className="size-4" />
                    Back to Studios
                </Link>

                {/* Studio Image */}
                <div className="relative mt-5 aspect-[16/9] overflow-hidden rounded-2xl border bg-gray-100 sm:aspect-[21/9] dark:border-gray-800 dark:bg-gray-900">
                    {studio.imageUrl ? (
                        <Image
                            src={studio.imageUrl}
                            alt={studio.title}
                            fill
                            priority
                            sizes="(max-width: 768px) 100vw, 1152px"
                            className="object-cover"
                        />
                    ) : (
                        <div className="flex h-full items-center justify-center">
                            <Building2 className="size-16 text-gray-400" />
                        </div>
                    )}
                </div>

                {/* Title and Category */}
                <section className="mt-6">
                    <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-sm font-medium text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                        {studio.category}
                    </span>

                    <h1 className="mt-3 break-words text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                        {studio.title}
                    </h1>

                    <p className="mt-3 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin className="size-4 shrink-0" />
                        {studio.location || "Location not specified"}
                    </p>
                </section>

                {/* Main Content */}
                <div className="mt-8 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
                    {/* Left Content */}
                    <div className="min-w-0 space-y-6 lg:col-span-2">
                        {/* Overview */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                About This Workspace
                            </h2>

                            <p className="mt-3 whitespace-pre-line break-words text-sm leading-7 text-gray-600 sm:text-base dark:text-gray-400">
                                {studio.overview || "No description available."}
                            </p>
                        </section>

                        {/* Specifications */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Studio Specifications
                            </h2>

                            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <Users className="mt-1 size-5 shrink-0 text-violet-600" />

                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Maximum Capacity
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                            {studio.maxCapacity ?? "N/A"} people
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <Clock className="mt-1 size-5 shrink-0 text-violet-600" />

                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Hourly Rate
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                            ${studio.hourlyRate} / hour
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <ShieldCheck className="mt-1 size-5 shrink-0 text-violet-600" />

                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Security Deposit
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                            {studio.securityDeposit != null
                                                ? `$${studio.securityDeposit}`
                                                : "Not specified"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">
                                    <Building2 className="mt-1 size-5 shrink-0 text-violet-600" />

                                    <div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Studio Category
                                        </p>

                                        <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                                            {studio.category}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Amenities */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Amenities & Equipment
                            </h2>

                            {studio.amenities && studio.amenities.length > 0 ? (
                                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                                    {studio.amenities.map((amenity) => (
                                        <div
                                            key={amenity}
                                            className="flex min-w-0 items-start gap-2 text-sm text-gray-600 dark:text-gray-300"
                                        >
                                            <Check className="mt-0.5 size-4 shrink-0 text-violet-600" />

                                            <span className="break-words">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-3 text-sm text-gray-500">
                                    No amenities available.
                                </p>
                            )}
                        </section>

                        {/* Reviews */}
                        <section className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 dark:border-gray-800 dark:bg-gray-900">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                Reviews
                            </h2>

                            {studio.reviews && studio.reviews.length > 0 ? (
                                <div className="mt-4 space-y-4">
                                    {studio.reviews.map((review, index) => (
                                        <div
                                            key={index}
                                            className="border-t border-gray-100 pt-4 dark:border-gray-800"
                                        >
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {review.name}
                                            </p>

                                            <p className="mt-1 flex items-center gap-1 text-sm text-amber-600">
                                                <Star className="size-4 fill-current" />
                                                {review.rating}
                                            </p>

                                            <p className="mt-2 break-words text-sm leading-6 text-gray-600 dark:text-gray-400">
                                                {review.comment}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="mt-3 text-sm text-gray-500">
                                    No reviews available yet.
                                </p>
                            )}
                        </section>
                    </div>

                    {/* Host Information */}
                    <aside className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 lg:sticky lg:top-6 dark:border-gray-800 dark:bg-gray-900">
                        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                            Studio Host
                        </h2>

                        <div className="mt-5 flex items-center gap-3">
                            <div className="grid size-12 shrink-0 place-items-center rounded-full bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300">
                                <Building2 className="size-6" />
                            </div>

                            <div className="min-w-0">
                                <p className="break-words font-semibold text-gray-900 dark:text-white">
                                    {studio.hostName || "Studio Host"}
                                </p>

                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Workspace Owner
                                </p>
                            </div>
                        </div>

                        {studio.hostEmail && (
                            <div className="mt-5 border-t border-gray-100 pt-5 dark:border-gray-800">
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    Contact Information
                                </p>

                                <a
                                    href={`mailto:${studio.hostEmail}`}
                                    className="flex items-start gap-2 break-all text-sm text-violet-600 hover:underline dark:text-violet-400"
                                >
                                    <Mail className="mt-0.5 size-4 shrink-0" />
                                    {studio.hostEmail}
                                </a>
                            </div>
                        )}

                        {/* Booking Button - Added */}
                        {/* Booking Modal */}
                        <BookingModal
                            studioId={studio._id ?? id}
                            studioTitle={studio.title}
                            hourlyRate={studio.hourlyRate}
                        />

                        <div className="mt-6 rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
                            <p className="text-sm leading-6 text-violet-800 dark:text-violet-300">
                                Interested in this workspace? Contact the host for more
                                information.
                            </p>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
    );
}