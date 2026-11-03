
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  CalendarDays,
  Clock,
  ArrowUpRight,
  Wallet,
  XCircle,
  Camera,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { getTokenFromClient } from "@/lib/getTokenFromclient";
import { toast } from "sonner";

type Booking = {
  _id: string;
  username: string;
  email: string;
  studioId: string;
  studioTitle: string;
  bookingDate: string;
  startTime: string;
  hours: number;
  totalPrice: number;
  status: "Pending" | "Confirmed" | "Completed" | "Cancelled";
  studioImage?: string;
};

type Props = {
  initialBookings: Booking[];
};

export default function MyBookingsList({ initialBookings }: Props) {
  const [bookings, setBookings] = useState(initialBookings);
  const [loadingId, setLoadingId] = useState<string | null>(null);
 

  const getStatusStyle = (status: Booking["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:ring-amber-500/20";

      case "Confirmed":
        return "bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20";

      case "Completed":
        return "bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20";

      case "Cancelled":
        return "bg-red-50 text-red-700 ring-red-200 dark:bg-red-500/10 dark:text-red-400 dark:ring-red-500/20";

      default:
        return "bg-gray-100 text-gray-700 ring-gray-200";
    }
  };

  const handleCancelBooking = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to cancel this booking?"
    );
 const token = await getTokenFromClient();
    if (!confirmed) return;


    try {
      setLoadingId(id);

      const res = await fetch(
        `http://localhost:8000/cancel-booking/${id}`,
        {
          method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
        }
     } );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.message || "Cancellation failed");
      }
   
      // Update booking status without removing the booking
      setBookings((previousBookings) =>
        previousBookings.map((booking) =>
          booking._id === id
            ? { ...booking, status: "Cancelled" }
            : booking
        )
        
      );
      toast.success("Booking cancelled successfully!");
    } catch (error) {
      console.error("Cancel Booking Error:", error);
      toast.error("Failed to cancel booking.");
    } finally {
      setLoadingId(null);
    }
  };

  // Empty State
  if (bookings.length === 0) {
    return (
      <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/70 px-5 py-12 text-center dark:border-gray-700 dark:bg-gray-900/50">
        <div className="mb-5 flex size-16 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
          <CalendarDays className="size-8" />
        </div>

        <h2 className="text-xl font-bold tracking-tight">
          No Bookings Yet
        </h2>

        <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
          You have not reserved any workspace yet. Explore our studios and
          find the perfect space for your next project.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {bookings.map((booking) => (
        <article
          key={booking._id}
          className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-500/5 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-violet-500/30"
        >
          <div className="flex flex-col md:flex-row">
            {/* Studio Image */}
            <div className="relative h-56 w-full shrink-0 overflow-hidden bg-gray-100 md:h-auto md:min-h-[250px] md:w-[280px] dark:bg-gray-800">
              {booking.studioImage ? (
                <Image
                  src={booking.studioImage}
                  alt={booking.studioTitle}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="flex h-full min-h-56 items-center justify-center text-gray-400">
                  <div className="text-center">
                    <Camera className="mx-auto size-10 opacity-50" />
                    <p className="mt-2 text-sm">No Image Available</p>
                  </div>
                </div>
              )}

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              <div className="absolute bottom-4 left-4">
                <span className="rounded-lg border border-white/20 bg-black/40 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                  Workspace Reservation
                </span>
              </div>
            </div>

            {/* Booking Content */}
            <div className="flex min-w-0 flex-1 flex-col justify-between p-5 sm:p-6">
              {/* Top Section */}
              <div>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-600 dark:text-violet-400">
                      Your Reservation
                    </p>

                    <h2 className="mt-1.5 text-xl font-bold tracking-tight text-gray-900 transition-colors group-hover:text-violet-700 sm:text-2xl dark:text-white dark:group-hover:text-violet-400">
                      {booking.studioTitle}
                    </h2>
                  </div>

                  <span
                    className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${getStatusStyle(
                      booking.status
                    )}`}
                  >
                    <span className="size-1.5 rounded-full bg-current" />
                    {booking.status}
                  </span>
                </div>

                {/* Booking Details */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                      <CalendarDays className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Booking Date
                      </p>
                      <p className="mt-0.5 truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {booking.bookingDate}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                      <Clock className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Start Time
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {booking.startTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                      <Clock className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Duration
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-gray-800 dark:text-gray-200">
                        {booking.hours} {booking.hours === 1 ? "Hour" : "Hours"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                      <Wallet className="size-5" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Total Amount
                      </p>
                      <p className="mt-0.5 text-sm font-bold text-gray-900 dark:text-white">
                        ${booking.totalPrice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Section */}
              <div className="mt-6 flex flex-col justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center dark:border-gray-800">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Booking Total
                  </p>
                  <p className="mt-0.5 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    ${booking.totalPrice}
                  </p>
                </div>

                {booking.status === "Pending" ? (
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={loadingId === booking._id}
                    onClick={() => handleCancelBooking(booking._id)}
                    className="h-10 w-full border-red-200 text-red-600 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-700 sm:w-auto dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                  >
                    <XCircle className="mr-2 size-4" />
                    {loadingId === booking._id
                      ? "Cancelling..."
                      : "Cancel Booking"}
                  </Button>
                ) : (
                  <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                    <span>Booking Status</span>
                    <ArrowUpRight className="size-4" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
