// Types + helpers for studio data coming from the local backend API.
//
// The API is not documented, so these helpers do simple jobs:
//   - extractStudioList   -> find the array of studios in a list response
//   - extractStudioDetail -> unwrap a single studio object
//   - normalizeStudio(s)  -> turn raw objects into clean types
//
// Every helper returns safe fallbacks instead of crashing on surprises.

// The clean shape used by the listings grid.
export type Studio = {
  id: string;
  title: string;
  category: string;
  hourlyRate: number | null; // null = unknown, shown as "Price on request"
  location: string;
  rating: number | null; // null = unknown, shown as "New"
  imageUrl: string | null; // null = unknown, shown as a placeholder
};

// One review on the details page.
export type StudioReview = {
  id: string;
  author: string;
  rating: number | null;
  comment: string;
  date: string;
};

// The full shape used by the details page.
export type StudioDetail = Studio & {
  maxCapacity: number | null;
  securityDeposit: number | null;
  overview: string;
  amenities: string[];
  gallery: string[];
  host: { name: string; email: string };
  reviews: StudioReview[];
};

type RawStudio = Record<string, unknown>;

// Returns the first non-empty value found among the given field names.
// The API may use any of these spellings, so we try them in order.
function pick(item: RawStudio, keys: string[]): unknown {
  for (const key of keys) {
    const value = item[key];

    if (value !== undefined && value !== null && value !== "") {
      return value;
    }
  }

  return null;
}

// Returns the first non-empty array found among the given field names.
function pickList(item: RawStudio, keys: string[]): unknown[] {
  for (const key of keys) {
    const value = item[key];

    if (Array.isArray(value) && value.length > 0) {
      return value;
    }
  }

  return [];
}

// Turns any value into a clean number, or null when impossible.
function toNumber(value: unknown): number | null {
  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

// ---------------------------------------------------------------------------
// Lists (used by /allstudio)
// ---------------------------------------------------------------------------

// Step 1 — the API may return a plain array, or an object wrapping the
// array under a key. This finds the array wherever it is.
export function extractStudioList(json: unknown): unknown[] {
  if (Array.isArray(json)) {
    return json;
  }

  for (const key of ["studios", "data", "items", "results"]) {
    if (json && typeof json === "object" && Array.isArray((json as RawStudio)[key])) {
      return (json as RawStudio)[key] as unknown[];
    }
  }

  return [];
}

// Step 2 — safely map one raw API object to our clean `Studio` type.
// Returns null when the object is unusable (no title anywhere).
export function normalizeStudio(raw: unknown): Studio | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }

  const item = raw as RawStudio;
  const title = pick(item, ["title", "name", "studioName"]) as string | null;

  if (!title) {
    return null;
  }

  const hourlyRate = toNumber(pick(item, ["hourlyRate", "rate", "pricePerHour", "price"]));
  const rating = toNumber(pick(item, ["rating", "averageRating", "stars"]));

  return {
    id: (pick(item, ["id", "_id", "studioId"]) as string) ?? title,
    title,
    category: ((pick(item, ["category", "type", "genre"]) as string) ?? "Uncategorized").trim(),
    hourlyRate: hourlyRate !== null && hourlyRate >= 0 ? hourlyRate : null,
    location: (pick(item, ["location", "address", "city", "cityName"]) as string) ?? "",
    rating: rating !== null && rating > 0 ? rating : null,
    imageUrl: (pick(item, ["imageUrl", "image", "image_url", "coverImage", "photoUrl"]) as string) ?? null,
  };
}

// Step 3 — normalize the whole list, dropping unusable entries.
export function normalizeStudios(rawItems: unknown[]): Studio[] {
  return rawItems
    .map(normalizeStudio)
    .filter((studio): studio is Studio => studio !== null);
}

// ---------------------------------------------------------------------------
// Details (used by /studios/[id])
// ---------------------------------------------------------------------------

// Unwraps a single studio object from likely response wrappers, e.g.
// { data: { ...studio } } or { studio: { ...studio } }.
export function extractStudioDetail(json: unknown): unknown {
  if (Array.isArray(json)) {
    return json[0] ?? null;
  }

  if (json && typeof json === "object") {
    for (const key of ["studio", "data", "result", "item", "workspace"]) {
      const value = (json as RawStudio)[key];

      if (value && typeof value === "object" && !Array.isArray(value)) {
        return value;
      }
    }

    return json;
  }

  return null;
}

// Builds the host info from `host`, `owner`, or flat `hostName`/`hostEmail`.
function pickHost(item: RawStudio): { name: string; email: string } {
  const nested = (pick(item, ["host", "owner", "hostInfo"]) as RawStudio) ?? null;

  if (nested && typeof nested === "object") {
    return {
      name: (pick(nested, ["name", "hostName"]) as string) ?? "",
      email: (pick(nested, ["email", "hostEmail"]) as string) ?? "",
    };
  }

  return {
    name: (pick(item, ["hostName", "host_name", "ownerName"]) as string) ?? "",
    email: (pick(item, ["hostEmail", "host_email", "ownerEmail", "email"]) as string) ?? "",
  };
}

// Cleans one review object (or passes through plain strings).
function normalizeReview(raw: unknown, index: number): StudioReview | null {
  if (!raw) {
    return null;
  }

  if (typeof raw === "string") {
    return { id: `review-${index}`, author: "Guest", rating: null, comment: raw, date: "" };
  }

  if (typeof raw !== "object") {
    return null;
  }

  const item = raw as RawStudio;
  const comment = (pick(item, ["comment", "text", "message", "review"]) as string) ?? "";
  const rating = toNumber(pick(item, ["rating", "stars"]));
  const author = (pick(item, ["author", "name", "user", "guest"]) as string) ?? "Guest";
  const date = (pick(item, ["date", "createdAt", "createdAtIso", "timestamp"]) as string) ?? "";

  // A review with no meaningful content is not worth showing.
  if (!comment && !rating) {
    return null;
  }

  return { id: `review-${index}`, author, rating: rating !== null && rating > 0 ? rating : null, comment, date };
}

// Builds the full details-page object from one raw API object.
// Returns null when there is no usable studio at all.
export function normalizeStudioDetail(raw: unknown): StudioDetail | null {
  const base = normalizeStudio(raw);

  if (!base) {
    return null;
  }

  const item = (raw && typeof raw === "object" ? raw : {}) as RawStudio;

  // Gallery: every image field combined, main image first, no duplicates.
  const gallery = Array.from(
    new Set(
      [
        (pick(item, ["imageUrl", "image", "image_url", "coverImage"]) as string) ?? "",
        ...pickList(item, ["gallery", "images", "imageUrls", "image_urls", "photos"]),
      ].filter((url): url is string => typeof url === "string" && url !== "")
    )
  );

  const amenities = pickList(item, ["amenities", "facilities", "features"]).filter(
    (amenity): amenity is string => typeof amenity === "string" && amenity !== ""
  );

  const reviews = pickList(item, ["reviews", "feedbacks", "comments"])
    .map(normalizeReview)
    .filter((review): review is StudioReview => review !== null);

  const maxCapacity = toNumber(pick(item, ["maxCapacity", "capacity", "maxGuests"]));
  const securityDeposit = toNumber(pick(item, ["securityDeposit", "deposit"]));

  return {
    ...base,
    maxCapacity: maxCapacity !== null && maxCapacity > 0 ? maxCapacity : null,
    securityDeposit: securityDeposit !== null && securityDeposit >= 0 ? securityDeposit : null,
    overview: (pick(item, ["overview", "overviewDetailed", "description", "about", "details"]) as string) ?? "",
    amenities,
    gallery,
    host: pickHost(item),
    reviews,
  };
}
