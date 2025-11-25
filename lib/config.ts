// lib/config.ts

export const CONFIG = {
  // -------------------------------------------------------------
  // 🔑 API KEYS (values not provided yet)
  // -------------------------------------------------------------
  GEMINI_API_KEY: "AIzaSyC43L1W9eVffPPpkg-0mOl88R-aV1ToIm4",
  FH_SHORT_NAME: "[juneauadventuretours]",
  FH_APP_KEY: "",
  FH_API_KEY: "",

  // -------------------------------------------------------------
  // 🔐 REDIS (Upstash)
  // -------------------------------------------------------------
  UPSTASH_REDIS_REST_URL: "https://included-dogfish-35348.upstash.io",
  UPSTASH_REDIS_REST_TOKEN: "AYoUAAIncDIwYzA1ZTQ3MTE0Mzk0MTAzYjExNmZlYTY5OTUxYjBiMXAyMzUzNDg",

  // -------------------------------------------------------------
  // 🤖 AI Model
  // -------------------------------------------------------------
  GEMINI_MODEL: "gemini-1.5-flash",

  // -------------------------------------------------------------
  // 📁 Local Data Output
  // -------------------------------------------------------------
  DATA_OUTPUT_PATH: "public/data",

  // -------------------------------------------------------------
  // 🌎 Port Definitions
  // -------------------------------------------------------------
  PORTS: [
    { slug: "juneau",    name: "Juneau",             lat: 58.3019, lon: -134.4197 },
    { slug: "skagway",   name: "Skagway",            lat: 59.4595, lon: -135.3140 },
    { slug: "ketchikan", name: "Ketchikan",          lat: 55.3422, lon: -131.6461 },
    { slug: "sitka",     name: "Sitka",              lat: 57.0531, lon: -135.3300 },
    { slug: "icy",       name: "Icy Strait Point",   lat: 58.2887, lon: -135.5222 },
    { slug: "haines",    name: "Haines",             lat: 59.2333, lon: -135.5500 },
    { slug: "seward",    name: "Seward",             lat: 60.1042, lon: -149.4422 },
    { slug: "whittier",  name: "Whittier",           lat: 60.7735, lon: -148.6834 }
  ],
};
