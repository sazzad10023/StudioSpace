import React from "react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import MyBookingsList from "@/components/my-bookings/my-bookings-list";
import { getTokenFromServer } from "@/lib/getTokenFromServer";

const MyBookingPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  if (!user) {
    redirect("/login");
  }
  const token = await getTokenFromServer();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/get-bookings/${encodeURIComponent(user.email)}`,
    {
         headers: {

            authorization: `Bearer ${token}`,
        },
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch bookings");
  }

  const bookings = await res.json();

  return (
    <div className="min-h-screen px-4 py-10 md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            My Bookings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your workspace reservations.
          </p>
        </div>

        <MyBookingsList initialBookings={bookings} />
      </div>
    </div>
  );
};

export default MyBookingPage;