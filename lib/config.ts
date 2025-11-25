// lib/config.ts

export const CONFIG = {
  // No API keys for now (optional)
  GEMINI_API_KEY: "",
  FH_SHORT_NAME: "",
  FH_APP_KEY: "",
  FH_API_KEY: "",

  // Upstash connection (REPLACE TOKEN IF YOU ROTATED)
  UPSTASH_REDIS_REST_URL: "https://included-dogfish-35348.upstash.io",
  UPSTASH_REDIS_REST_TOKEN: "AYoUAAIncDIwYzA1ZTQ3MTE0Mzk0MTAzYjExNmZlYTY5OTUxYjBiMXAyMzUzNDg",

  GEMINI_MODEL: "gemini-1.5-flash",

  DATA_OUTPUT_PATH: "public/data",

  PORTS: [
    { slug: "juneau", name: "Juneau", lat: 58.3019, lon: -134.4197 },
    { slug: "skagway", name: "Skagway", lat: 59.4595, lon: -135.3140 },
    { slug: "ketchikan", name: "Ketchikan", lat: 55.3422, lon: -131.6461 },
    { slug: "sitka", name: "Sitka", lat: 57.0531, lon: -135.3300 },
    { slug: "icy", name: "Icy Strait Point", lat: 58.2887, lon: -135.5222 },
    { slug: "haines", name: "Haines", lat: 59.2333, lon: -135.5500 },
    { slug: "seward", name: "Seward", lat: 60.1042, lon: -149.4422 },
    { slug: "whittier", name: "Whittier", lat: 60.7735, lon: -148.6834 }
  ],
};
