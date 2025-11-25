// lib/config.ts

export const CONFIG = {
  // API Keys (read from env)
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  FH_SHORT_NAME: process.env.FH_SHORT_NAME,
  FH_APP_KEY: process.env.FH_APP_KEY,
  FH_API_KEY: process.env.FH_API_KEY,

  // AI Settings
  GEMINI_MODEL: 'gemini-2.5-flash',
  
  // Data Paths
  DATA_OUTPUT_PATH: 'public/data', 

  // The Destination Brain (With Coordinates for Weather)
  PORTS: [
      { slug: 'juneau', name: 'Juneau', lat: 58.3019, lon: -134.4197 },
      { slug: 'skagway', name: 'Skagway', lat: 59.4595, lon: -135.3140 },
      { slug: 'ketchikan', name: 'Ketchikan', lat: 55.3422, lon: -131.6461 },
      { slug: 'sitka', name: 'Sitka', lat: 57.0531, lon: -135.3300 },
      { slug: 'icy', name: 'Icy Strait Point', lat: 58.2887, lon: -135.5222 },
      { slug: 'haines', name: 'Haines', lat: 59.2333, lon: -135.5500 },
      { slug: 'seward', name: 'Seward', lat: 60.1042, lon: -149.4422 },
      { slug: 'whittier', name: 'Whittier', lat: 60.7735, lon: -148.6834 }
  ],
};