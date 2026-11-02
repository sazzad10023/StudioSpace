import React from "react";

import StudioListings from "@/components/studios/studio-listings";
import { createLogger } from "@/lib/logger";
import { extractStudioList, normalizeStudios, type Studio } from "@/lib/studios";

const logger = createLogger("studios");
const ENDPOINT = "http://localhost:8000/get-studios";

// Server component: fetches the studio data, then hands it to the
// client component (`StudioListings`) that renders the filters + grid.
const AllStudios = async () => {
  let studios: Studio[] = [];
  let failed = false;

  try {
    const res = await fetch(ENDPOINT, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`API responded with status ${res.status}`);
    }

    studios = normalizeStudios(extractStudioList(await res.json()));

    logger.info("Loaded studio listings", {
      source: ENDPOINT,
      count: studios.length,
    });
  } catch (error) {
    failed = true;
    logger.error("Failed to load studio listings", error);
  }

  return <StudioListings studios={studios} failed={failed} />;
};

export default AllStudios;
