import { config } from "../config";
import axios from "axios";

/**
 * FareHarbor Provider
 * Works with ONLY shortName (public endpoint)
 * No API key required for item listing.
 */

export async function fetchFareHarborTours(portSlug: string) {
  const shortName = config.fareHarbor.shortName;

  // --------------------------------
  // Disabled Mode (no shortName)
  // --------------------------------
  if (!shortName) {
    console.log(`FareHarbor shortName missing. Empty tours for ${portSlug}.`);
    return { enabled: false, tours: [] };
  }

  try {
    console.log(`Fetching FareHarbor tours for shortName: ${shortName}`);

    const url = `https://fareharbor.com/api/external/v1/companies/${shortName}/items/`;

    const { data } = await axios.get(url);

    const tours = (data?.items || []).map((item: any) => ({
      id: item.id,
      name: item.name,
      price: item.default_price || 0,
      duration: item.duration || null,
      url: item.short_summary || null,
      bookingUrl: item.book_url || null,
    }));

    return { enabled: true, tours };
  } catch (error) {
    console.error(`FareHarbor API failed for ${shortName}:`, error);
    return { enabled: false, tours: [] };
  }
}
