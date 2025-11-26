import { redis } from "@/lib/redis";

export async function GET() {
  try {
    const homepage = await redis.get("homepage");

    return Response.json({
      status: "ok",
      raw: homepage ?? null,
      type: typeof homepage,
      message: homepage ? "Redis HAS homepage key" : "Redis homepage key is EMPTY",
    });
  } catch (err) {
    return Response.json({
      status: "error",
      message: "Redis connection failed",
      error: String(err),
    });
  }
}
