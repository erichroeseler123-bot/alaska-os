// lib/redis.ts
import { Redis } from "@upstash/redis";
import { CONFIG } from "./config";

export const redis = new Redis({
  url: CONFIG.UPSTASH_REDIS_REST_URL,
  token: CONFIG.UPSTASH_REDIS_REST_TOKEN,
});
