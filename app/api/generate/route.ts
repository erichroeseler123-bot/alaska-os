import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs-extra';
import path from 'path';
import { Redis } from '@upstash/redis';
import { CONFIG } from '../../../lib/config'; 
import { fetchWeather } from '../../../lib/providers/weather'; 

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// Paths
const MASTER_FILE = path.join(process.cwd(), 'public/data/alaska-master-fallback.json');
const PUBLIC_API_DIR = path.join(process.cwd(), 'public/data/tours');

// Helper to match city names to slugs
const cityToSlug = (city: string) => {
  const map: Record<string, string> = {
    'Juneau': 'juneau',
    'Skagway': 'skagway',
    'Ketchikan': 'ketchikan',
    'Sitka': 'sitka',
    'Icy Strait Point': 'icy',
    'Haines': 'haines',
    'Seward': 'seward',
    'Whittier': 'whittier'
  };
  return map[city] || city.toLowerCase();
};

export async function GET(request: NextRequest) {
  // 1. Security Check
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  console.log("🚀 Starting Daily Master Brain Update...");

  try {
    // 2. Load Master Tour Data
    if (!fs.existsSync(MASTER_FILE)) {
      throw new Error("Master data file missing.");
    }
    const rawFile = await fs.readFile(MASTER_FILE, 'utf-8');
    const masterData = JSON.parse(rawFile);
    const allTours = masterData.items;

    // 3. Process Each Port (Parallel)
    const results = await Promise.all(
      CONFIG.PORTS.map(async (port) => {
        
        // A. Fetch Live Weather
        const weatherData = await fetchWeather(port.lat, port.lon);
        
        // B. Filter Tours for this Port
        const portTours = allTours.filter((item: any) => 
            item.locations.some((loc: any) => cityToSlug(loc.city) === port.slug)
        );

        // C. Construct the Master Output Object
        const portPayload = {
            port: port.name,
            slug: port.slug,
            lastUpdated: new Date().toISOString(),
            weather: weatherData.ok ? weatherData.current : { tempF: "N/A" },
            tours: portTours
        };

        // D. Save to Redis & Public JSON
        await redis.set(`static_tours_fallback:${port.slug}`, portPayload);
        await fs.ensureDir(PUBLIC_API_DIR);
        await fs.writeJSON(
            path.join(PUBLIC_API_DIR, `${port.slug}.json`), 
            portPayload, 
            { spaces: 2 }
        );

        return { port: port.slug, tours: portTours.length };
      })
    );

    console.log("✅ Daily Update Complete:", results);
    return NextResponse.json({ success: true, results });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
