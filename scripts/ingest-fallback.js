const fs = require('fs');
const path = require('path');
const { Redis } = require('@upstash/redis');
require('dotenv').config({ path: '.env.local' });

// Initialize Redis
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

// Config paths
const MASTER_FILE = path.join(process.cwd(), 'public/data/alaska-master-fallback.json');
const PUBLIC_API_DIR = path.join(process.cwd(), 'public/data/tours');

const PORTS = [
    { slug: 'juneau', name: 'Juneau' },
    { slug: 'skagway', name: 'Skagway' },
    { slug: 'ketchikan', name: 'Ketchikan' },
    { slug: 'sitka', name: 'Sitka' },
    { slug: 'icy', name: 'Icy Strait Point' },
    { slug: 'haines', name: 'Haines' },
    { slug: 'seward', name: 'Seward' },
    { slug: 'whittier', name: 'Whittier' }
];

async function run() {
    console.log("🚀 Starting Master Ingestion & API Generation...");
    
    // Ensure output directory exists
    if (!fs.existsSync(PUBLIC_API_DIR)) {
        fs.mkdirSync(PUBLIC_API_DIR, { recursive: true });
    }

    try {
        if (!fs.existsSync(MASTER_FILE)) {
            throw new Error(`Master file not found at: ${MASTER_FILE}`);
        }

        const raw = fs.readFileSync(MASTER_FILE, 'utf8');
        const data = JSON.parse(raw);
        const allItems = data.items;

        console.log(`📄 Loaded ${allItems.length} tours from master file.`);

        for (const port of PORTS) {
            // Filter tours for this port
            const portItems = allItems.filter(item => 
                item.locations.some(loc => loc.city === port.name)
            );

            if (portItems.length > 0) {
                // 1. Store in Redis (The Brain's Memory)
                await redis.set(`static_tours_fallback:${port.slug}`, portItems);
                
                // 2. Generate Public API File (The "OpenAlaska" Feed)
                const apiPath = path.join(PUBLIC_API_DIR, `${port.slug}.json`);
                fs.writeFileSync(apiPath, JSON.stringify(portItems, null, 2));

                console.log(`✅ ${port.slug.toUpperCase()}: Cached ${portItems.length} tours in Redis & wrote public API.`);
            } else {
                console.log(`⚠️ ${port.slug.toUpperCase()}: No tours found.`);
            }
        }
        console.log("\n🎉 SYSTEM ONLINE. Public JSON feeds are live.");
    } catch (error) {
        console.error("❌ Error:", error.message);
    }
}

run();
