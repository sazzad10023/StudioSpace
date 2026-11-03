
"use client";

import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Link2, MapPin, User } from "lucide-react";

import { getTokenFromClient } from "@/lib/getTokenFromclient";
import { toast } from "sonner";

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
  hostName?: string;
  hostEmail?: string;
  ownerEmail?: string;
};

type StudioForm = {
  title: string;
  category: string;
  maxCapacity: string;
  hourlyRate: string;
  securityDeposit: string;
  location: string;
  imageUrl: string;
  amenities: string[];
  overview: string;
};

type EditstudioProps = {
  data: Studio;
  onUpdated?: () => void;
};

type TextField = Exclude<keyof StudioForm, "amenities">;

const EMPTY_FORM: StudioForm = {
  title: "",
  category: "",
  maxCapacity: "",
  hourlyRate: "",
  securityDeposit: "",
  location: "",
  imageUrl: "",
  amenities: [],
  overview: "",
};

function toFormData(studio: Studio): StudioForm {
  return {
    title: studio.title ?? "",
    category: studio.category ?? "",
    maxCapacity:
      studio.maxCapacity != null
        ? String(studio.maxCapacity)
        : "",
    hourlyRate:
      studio.hourlyRate != null
        ? String(studio.hourlyRate)
        : "",
    securityDeposit:
      studio.securityDeposit != null
        ? String(studio.securityDeposit)
        : "",
    location: studio.location ?? "",
    imageUrl: studio.imageUrl ?? "",
    amenities: studio.amenities ?? [],
    overview: studio.overview ?? "",
  };
}

function FieldLabel({
  htmlFor,
  children,
}: {
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <Label
      htmlFor={htmlFor}
      className="mb-1 block text-xs font-medium"
    >
      {children}
    </Label>
  );
}

export default function Editstudio({
  data,
  onUpdated,
}: EditstudioProps) {
  const [form, setForm] = useState<StudioForm>(() =>
    data ? toFormData(data) : EMPTY_FORM
  );

  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    setForm(data ? toFormData(data) : EMPTY_FORM);
  }, [data]);

  const setField = (field: TextField, value: string) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const toggleAmenity = (amenity: string) => {
    setForm((previous) => ({
      ...previous,
      amenities: previous.amenities.includes(amenity)
        ? previous.amenities.filter(
            (item) => item !== amenity
          )
        : [...previous.amenities, amenity],
    }));
  };

  const resetForm = () => {
    setForm(toFormData(data));
    setErrorMessage("");
    setSuccessMessage("");
  };

  const handleReset = () => {
    resetForm();
    toast.info("Form has been reset.");
  };

  const handleUpdate = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");
    setSuccessMessage("");

    const studioData = {
      title: form.title.trim(),
      category: form.category,
      maxCapacity: Number(form.maxCapacity),
      hourlyRate: Number(form.hourlyRate),
      securityDeposit: Number(form.securityDeposit || 0),
      location: form.location.trim(),
      imageUrl: form.imageUrl.trim(),
      amenities: form.amenities,
      overview: form.overview.trim(),
      hostName: data.hostName,
      hostEmail: data.hostEmail,
      ownerEmail: data.ownerEmail,
    };
     const token = await getTokenFromClient();
    try {
      const response = await fetch(
        `${API_URL}/update-studio/${encodeURIComponent(data._id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(studioData),
        }
      );

      if (!response.ok) {
        const message = await response.text();

        throw new Error(
          message || `Update failed (${response.status})`
        );
      }

      setSuccessMessage("Studio updated successfully.");
      toast.success("Studio updated successfully.");

      onUpdated?.();

      setTimeout(() => {
        setIsOpen(false);
        setSuccessMessage("");
      }, 500);
    } catch (error: unknown) {
      console.error("Failed to update studio:", error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating the studio."
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Something went wrong while updating the studio."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);

        if (open) {
          resetForm();
        }
      }}
    >
      <DialogTrigger
        render={
          <Button
            type="button"
            variant="outline"
            className="h-8 rounded-md px-3 text-xs transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:hover:border-violet-500 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
          />
        }
      >
        Update
      </DialogTrigger>

      <DialogContent className="max-h-[85vh] overflow-y-auto p-5 sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            Update Studio
          </DialogTitle>

          <DialogDescription className="text-xs">
            Update the details of {data.title}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <FieldLabel htmlFor="studio-title">
              Studio Title
            </FieldLabel>

            <Input
              id="studio-title"
              className="h-9 text-sm"
              value={form.title}
              onChange={(event) =>
                setField("title", event.target.value)
              }
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="studio-category">
                Category
              </FieldLabel>

              <Select
                value={form.category}
                onValueChange={(value) =>
                  setField("category", value ?? "")
                }
                required
              >
                <SelectTrigger
                  id="studio-category"
                  className="h-9"
                >
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>

                <SelectContent>
                  {CATEGORIES.map((category) => (
                    <SelectItem
                      key={category}
                      value={category}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <FieldLabel htmlFor="studio-capacity">
                Max Capacity
              </FieldLabel>

              <Input
                id="studio-capacity"
                type="number"
                min={1}
                className="h-9 text-sm"
                value={form.maxCapacity}
                onChange={(event) =>
                  setField("maxCapacity", event.target.value)
                }
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <FieldLabel htmlFor="studio-rate">
                Hourly Rate
              </FieldLabel>

              <Input
                id="studio-rate"
                type="number"
                min={0}
                className="h-9 text-sm"
                value={form.hourlyRate}
                onChange={(event) =>
                  setField("hourlyRate", event.target.value)
                }
                required
              />
            </div>

            <div>
              <FieldLabel htmlFor="studio-deposit">
                Security Deposit
              </FieldLabel>

              <Input
                id="studio-deposit"
                type="number"
                min={0}
                className="h-9 text-sm"
                value={form.securityDeposit}
                onChange={(event) =>
                  setField(
                    "securityDeposit",
                    event.target.value
                  )
                }
              />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="studio-location">
              Location
            </FieldLabel>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="studio-location"
                className="h-9 pl-9 text-sm"
                value={form.location}
                onChange={(event) =>
                  setField("location", event.target.value)
                }
                required
              />
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="studio-image">
              Image URL
            </FieldLabel>

            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

              <Input
                id="studio-image"
                type="url"
                className="h-9 pl-9 text-sm"
                value={form.imageUrl}
                onChange={(event) =>
                  setField("imageUrl", event.target.value)
                }
                required
              />
            </div>
          </div>

          <div>
            <Label className="mb-2 block text-xs font-medium">
              Amenities
            </Label>

            <div className="grid grid-cols-2 gap-2">
              {AMENITIES.map((amenity) => (
                <Label
                  key={amenity}
                  className="flex cursor-pointer items-center gap-2 rounded-md border p-2 text-xs"
                >
                  <Checkbox
                    checked={form.amenities.includes(amenity)}
                    onCheckedChange={() =>
                      toggleAmenity(amenity)
                    }
                  />

                  {amenity}
                </Label>
              ))}
            </div>
          </div>

          <div>
            <FieldLabel htmlFor="studio-overview">
              Overview
            </FieldLabel>

            <Textarea
              id="studio-overview"
              className="min-h-20 text-sm"
              value={form.overview}
              onChange={(event) =>
                setField("overview", event.target.value)
              }
              required
            />
          </div>

          <div className="rounded-lg bg-violet-100 p-3 dark:bg-violet-500/15">
            <div className="mb-2 flex items-center gap-2">
              <User className="size-4 text-violet-600" />

              <span className="text-sm font-medium">
                Host Information
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <Label className="mb-1 block text-xs">
                  Name
                </Label>

                <Input
                  className="h-9 text-xs"
                  value={data.hostName ?? ""}
                  readOnly
                />
              </div>

              <div>
                <Label className="mb-1 block text-xs">
                  Email
                </Label>

                <Input
                  className="h-9 text-xs"
                  type="email"
                  value={data.hostEmail ?? data.ownerEmail ?? ""}
                  readOnly
                />
              </div>
            </div>
          </div>

          {errorMessage && (
            <p
              role="alert"
              className="rounded-md bg-red-50 p-3 text-sm text-red-600"
            >
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p
              role="status"
              className="rounded-md bg-green-50 p-3 text-sm text-green-700"
            >
              {successMessage}
            </p>
          )}

          <div className="flex justify-end gap-2 border-t pt-3">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleReset}
              disabled={isSubmitting}
              className="transition-colors hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 dark:hover:border-violet-500 dark:hover:bg-violet-500/10 dark:hover:text-violet-400"
            >
              Reset
            </Button>

            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting}
              className="bg-violet-600 text-white transition-colors hover:bg-violet-700 hover:shadow-sm"
            >
              {isSubmitting ? "Updating..." : "Update Studio"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
