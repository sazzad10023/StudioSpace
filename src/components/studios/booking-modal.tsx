
"use client";

import { useState } from "react";
import { CalendarDays, Clock, X } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { getTokenFromClient } from "@/lib/getTokenFromclient";

type BookingModalProps = {
  studioId: string;
  studioTitle: string;
  hourlyRate: number;
  studioImage: string;
};

export default function BookingModal({
  studioId,
  studioTitle,
  hourlyRate,
  studioImage,
}: BookingModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [hours, setHours] = useState("1");

  const { data: session } = authClient.useSession();
  const user = session?.user;

  const totalPrice = hourlyRate * Number(hours);

  const handleBooking = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please login before booking.");
      return;
    }

    const data = {
      username: user.name,
      email: user.email,
      image: user.image,

      studioId,
      studioTitle,
      studioImage,

      bookingDate: date,
      startTime,
      hours: Number(hours),
      totalPrice,

      createdAt: new Date().toISOString(),
    };
    const token = await getTokenFromClient();
    
    const res = await fetch("http://localhost:8000/add-booking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,

      },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    if (!res.ok) {
      toast.error(result.message || "Booking failed. Please try again.");
      return;
    }

    toast.success("Booking request submitted successfully!");

    setDate("");
    setStartTime("");
    setHours("1");
    closeModal();
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Open Modal Button */}
      <Button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full bg-violet-600 hover:bg-violet-700"
      >
        Book Workspace Now
      </Button>

      {/* Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">

            {/* Close Button */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label="Close booking modal"
            >
              <X className="size-5" />
            </button>

            {/* Header */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Book Your Workspace
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Complete your booking details below.
              </p>
            </div>

            {/* Studio Information */}
            <div className="mt-6 rounded-xl bg-violet-50 p-4 dark:bg-violet-500/10">
              <p className="font-semibold text-gray-900 dark:text-white">
                {studioTitle}
              </p>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                ${hourlyRate} / hour
              </p>
            </div>

            {/* Booking Form */}
            <form onSubmit={handleBooking} className="mt-6 space-y-4">

              {/* Booking Date */}
              <div>
                <Label htmlFor="booking-date">
                  Booking Date
                </Label>

                <div className="relative mt-2">
                  <CalendarDays className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />

                  <Input
                    id="booking-date"
                    type="date"
                    min={new Date().toLocaleDateString("en-CA")}
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Start Time */}
              <div>
                <Label htmlFor="start-time">
                  Start Time
                </Label>

                <div className="relative mt-2">
                  <Clock className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-gray-500" />

                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              {/* Duration */}
              <div>
                <Label htmlFor="hours">
                  Duration (Hours)
                </Label>

                <Input
                  id="hours"
                  type="number"
                  min={1}
                  max={24}
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                  className="mt-2"
                  required
                />
              </div>

              {/* Price Summary */}
              <div className="flex items-center justify-between border-t pt-4 dark:border-gray-700">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  Estimated Total
                </span>

                <span className="text-xl font-bold text-violet-600">
                  ${totalPrice}
                </span>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={closeModal}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  className="flex-1 bg-violet-600 hover:bg-violet-700"
                  disabled={
                    !date ||
                    !startTime ||
                    Number(hours) < 1 ||
                    Number(hours) > 24
                  }
                >
                  Continue Booking
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
