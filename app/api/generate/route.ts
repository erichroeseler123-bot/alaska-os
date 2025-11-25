// app/api/generate/route.ts
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";
import { CONFIG } from "@/lib/config";

export async function GET() {
  try {
    const homepageData = {
      lastUpdatedUTC: new Date().toISOString(),
      ports: CONFIG.PORTS.map((p) => ({
        slug: p.slug,
        name: p.name,
        summary: `${p.name} is an iconic Alaskan port known for scenery, wildlife, and unforgettable shore excursions.`,
      })),
    };

    // Save to Redis
    await redis.set("homepage", JSON.stringify(homepageData));

    return NextResponse.json({
      status: "ok",
      message: "Homepage generated",
      homepage: homepageData,
    });

  } catch (err: any) {
    console.error("GEN ERROR:", err);
    return NextResponse.json({ error: err.message || "Generation failed" }, { status: 500 });
  }
}
