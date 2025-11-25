// lib/config.ts

export const config = {
  ports: [
    { name: "Juneau", slug: "juneau", lat: 58.3019, lon: -134.4197 },
    { name: "Skagway", slug: "skagway", lat: 59.4583, lon: -135.3139 },
    { name: "Ketchikan", slug: "ketchikan", lat: 55.3422, lon: -131.6461 },
    { name: "Sitka", slug: "sitka", lat: 57.0531, lon: -135.3300 },
    { name: "Icy Strait Point", slug: "icy-strait-point", lat: 58.1581, lon: -135.4275 },
    { name: "Haines", slug: "haines", lat: 59.2358, lon: -135.4450 },
    { name: "Seward", slug: "seward", lat: 60.1042, lon: -149.4422 },
    { name: "Whittier", slug: "whittier", lat: 60.7733, lon: -148.6833 }
  ],

  ai: {
    model: "gemini-1.5-flash",
    temperature: 0.25
  },

  // 👇 **HARDCODED shortName so we don’t rely on environment variables**
  fareHarbor: {
    shortName: "juneauadventuretours",
    apiKey: ""   // keep empty unless you want live pricing
  },

  updateFrequency: "daily",

  dataSources: {
    cruiseSchedules: "https://claalaska.com/?page_id=1250"
  }
};
