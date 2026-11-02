"use client";

import React from "react";
import { redirect, useRouter } from "next/navigation";
import { Building2, Link2, MapPin, User } from "lucide-react";

import { authClient } from "@/lib/auth-client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createLogger } from "@/lib/logger";

const logger = createLogger("add-studio");

const API_URL = "http://localhost:8000";

const CATEGORIES = [
  "Photo Studios",
  "Sound Stages",
  "Podcast Lounge",
  "Music Suite",
  "Art Workshops",
  "Film Stages",
] as const;

const AMENITIES = [
  "Wi-Fi",
  "Professional Lighting",
  "Parking",
  "Air Conditioning",
  "Soundproofing",
  "Makeup Room",
  "Green Screen",
  "Restroom",
  "Power Backup",
  "Equipment Included",
] as const;

const EMPTY_FORM = {
  title: "",
  category: "",
  maxCapacity: "",
  hourlyRate: "",
  securityDeposit: "",
  location: "",
  imageUrl: "",
  amenities: [] as string[],
  overview: "",
};

const inputClasses = "h-10";

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <Label htmlFor={htmlFor} className="mb-1.5">
      {children} <span className="text-red-500">*</span>
    </Label>
  );
}

export default function AddStudioPage() {
  const router = useRouter();

  // Get the currently logged-in user.
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [form, setForm] = React.useState(EMPTY_FORM);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");

  const setField = (field: keyof typeof EMPTY_FORM, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setForm((prev) => {
      const added = !prev.amenities.includes(amenity);

      logger.debug("Amenity toggled", { amenity, added });

      return {
        ...prev,
        amenities: added
          ? [...prev.amenities, amenity]
          : prev.amenities.filter((item) => item !== amenity),
      };
    });
  };

  const handleAdd = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    if (!user) {
      setErrorMessage("Please login before adding a studio.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const studioData = {
      ...form,

      title: form.title.trim(),
      maxCapacity: Number(form.maxCapacity),
      hourlyRate: Number(form.hourlyRate),
      securityDeposit: Number(form.securityDeposit),
      location: form.location.trim(),
      imageUrl: form.imageUrl.trim(),
      overview: form.overview.trim(),

      // Logged-in user's information.
      hostName: user.name,
      hostEmail: user.email,
      ownerEmail: user.email,

      createdAt: new Date().toISOString(),
    };

    logger.info("Submitting new studio listing", {
      title: studioData.title,
      category: studioData.category,
      ownerEmail: studioData.ownerEmail,
    });

    try {
      const res = await fetch(`${API_URL}/add-studio`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(studioData),
      });

      if (!res.ok) {
        throw new Error("Failed to add studio");
      }

      const data = await res.json();

      logger.info("Studio listing saved to MongoDB", {
        id: data.insertedId ?? data._id,
        title: studioData.title,
      });

      setForm(EMPTY_FORM);

      // Redirect to My Listings after successful submission.
      router.push("/my-listings");
      router.refresh();
    // redirect("/my-listings");
    } catch (error) {
      logger.error("Failed to add studio", error);

      setErrorMessage(
        "Failed to add studio. Please check your server and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    logger.info("Form reset");

    setForm(EMPTY_FORM);
    setErrorMessage("");
  };

  // Wait until Better Auth checks the session.
  if (isPending) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-gray-500">Checking authentication...</p>
      </div>
    );
  }

  // Only authenticated users can add studios.
  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <h1 className="text-2xl font-bold">Login Required</h1>

        <p className="text-sm text-gray-500">
          Please login to add your studio.
        </p>

        <Button onClick={() => router.push("/login")}>
          Login
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 dark:bg-gray-950">
      <main className="mx-auto max-w-4xl px-4 sm:px-6">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-8 dark:border-gray-800 dark:bg-gray-900">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <span className="rounded-xl bg-violet-100 p-3.5 text-violet-600 dark:bg-violet-500/15">
              <Building2 className="size-6" />
            </span>

            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
                Add New Studio
              </h1>

              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                List your studio space and start receiving bookings.
              </p>
            </div>
          </div>

          <form onSubmit={handleAdd} className="mt-6 sm:mt-8">
            <div className="space-y-5">
              {/* Studio Title */}
              <div>
                <FieldLabel htmlFor="title">Studio Title</FieldLabel>

                <Input
                  id="title"
                  className={inputClasses}
                  placeholder="e.g. Creative Loft Studio"
                  required
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                />
              </div>

              {/* Category + Max Capacity */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="category">Category</FieldLabel>

                  <Select
                    value={form.category || undefined}
                    onValueChange={(value) =>
                      setField("category", value ?? "")
                    }
                  >
                    <SelectTrigger id="category" className="h-10 w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>

                    <SelectContent>
                      {CATEGORIES.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <FieldLabel htmlFor="maxCapacity">
                    Max Capacity
                  </FieldLabel>

                  <Input
                    id="maxCapacity"
                    className={inputClasses}
                    type="number"
                    min={1}
                    inputMode="numeric"
                    placeholder="e.g. 20"
                    required
                    value={form.maxCapacity}
                    onChange={(e) =>
                      setField("maxCapacity", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Hourly Rate + Security Deposit */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <FieldLabel htmlFor="hourlyRate">
                    Hourly Rate ($)
                  </FieldLabel>

                  <Input
                    id="hourlyRate"
                    className={inputClasses}
                    type="number"
                    min={0}
                    inputMode="decimal"
                    placeholder="e.g. 50"
                    required
                    value={form.hourlyRate}
                    onChange={(e) =>
                      setField("hourlyRate", e.target.value)
                    }
                  />
                </div>

                <div>
                  <FieldLabel htmlFor="securityDeposit">
                    Security Deposit ($)
                  </FieldLabel>

                  <Input
                    id="securityDeposit"
                    className={inputClasses}
                    type="number"
                    min={0}
                    inputMode="decimal"
                    placeholder="e.g. 100"
                    required
                    value={form.securityDeposit}
                    onChange={(e) =>
                      setField("securityDeposit", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <FieldLabel htmlFor="location">
                  Location / Address
                </FieldLabel>

                <div className="relative">
                  <MapPin className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500" />

                  <Input
                    id="location"
                    className={`${inputClasses} pl-9`}
                    placeholder="Street, area, city, country"
                    required
                    value={form.location}
                    onChange={(e) =>
                      setField("location", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Image URL */}
              <div>
                <FieldLabel htmlFor="imageUrl">Image URL</FieldLabel>

                <div className="relative">
                  <Link2 className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-500" />

                  <Input
                    id="imageUrl"
                    className={`${inputClasses} pl-9`}
                    type="url"
                    placeholder="https://example.com/studio.jpg"
                    required
                    value={form.imageUrl}
                    onChange={(e) =>
                      setField("imageUrl", e.target.value)
                    }
                  />
                </div>
              </div>

              {/* Amenities */}
              <div>
                <Label className="mb-1.5">
                  Amenities <span className="text-red-500">*</span>
                </Label>

                <div className="mt-1 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
                  {AMENITIES.map((amenity) => (
                    <Label
                      key={amenity}
                      className="flex cursor-pointer items-center gap-2.5 rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-normal text-gray-900 transition-colors hover:border-violet-300 dark:border-gray-700 dark:text-gray-200 dark:hover:border-violet-500/50"
                    >
                      <Checkbox
                        checked={form.amenities.includes(amenity)}
                        onCheckedChange={() => toggleAmenity(amenity)}
                      />

                      {amenity}
                    </Label>
                  ))}
                </div>
              </div>

              {/* Overview */}
              <div>
                <FieldLabel htmlFor="overview">
                  Detailed Overview
                </FieldLabel>

                <Textarea
                  id="overview"
                  className="min-h-28"
                  placeholder="Describe your studio, its atmosphere, equipment, ideal use cases, and booking details..."
                  required
                  value={form.overview}
                  onChange={(e) =>
                    setField("overview", e.target.value)
                  }
                />
              </div>

              {/* Host Information */}
              <div className="rounded-xl bg-violet-100 p-4 dark:bg-violet-500/15">
                <div className="flex items-start gap-3">
                  <span className="rounded-lg bg-violet-600 p-2 text-white">
                    <User className="size-5" />
                  </span>

                  <div>
                    <h2 className="font-semibold text-gray-900 dark:text-white">
                      Host Information (Read-only)
                    </h2>

                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      This listing will be added under your account.
                    </p>
                  </div>
                </div>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="hostName" className="mb-1.5">
                      Name
                    </Label>

                    <Input
                      id="hostName"
                      className={`${inputClasses} bg-gray-100 dark:bg-gray-800`}
                      value={user.name ?? ""}
                      disabled
                    />
                  </div>

                  <div>
                    <Label htmlFor="hostEmail" className="mb-1.5">
                      Email
                    </Label>

                    <Input
                      id="hostEmail"
                      className={`${inputClasses} bg-gray-100 dark:bg-gray-800`}
                      value={user.email ?? ""}
                      disabled
                    />
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {errorMessage && (
                <p
                  role="alert"
                  className="rounded-lg bg-red-50 p-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400"
                >
                  {errorMessage}
                </p>
              )}

              {/* Actions */}
              <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end dark:border-gray-800">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                  onClick={handleReset}
                  disabled={isSubmitting}
                >
                  Reset
                </Button>

                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full bg-violet-600 text-white hover:bg-violet-700 sm:w-auto dark:bg-violet-600 dark:text-white dark:hover:bg-violet-700"
                >
                  {isSubmitting ? "Adding Studio..." : "Add Studio"}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}