// app/api/generate/route.ts
import { NextResponse } from "next/server";
import { redis } from "@/lib/redis";

export async function GET() {
  try {
    const homepageData = {
      generatedAt: Date.now(),
      message: "Homepage data generated successfully",
    };

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
