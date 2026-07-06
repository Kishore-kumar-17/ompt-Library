import type { Context, Next } from "hono";
import { jwtSecret } from "../lib/jwt.js";

type EngineOperation = "build" | "improve" | "analyze" | "optimize" | "convert" | "explain";

const LIMITS: Record<EngineOperation, { auth: number; anon: number; windowMs: number }> = {
  build:    { auth: 20,  anon: 5,  windowMs: 60_000 },
  improve:  { auth: 20,  anon: 5,  windowMs: 60_000 },
  analyze:  { auth: 50,  anon: 10, windowMs: 60_000 },
  optimize: { auth: 20,  anon: 5,  windowMs: 60_000 },
  convert:  { auth: 20,  anon: 5,  windowMs: 60_000 },
  explain:  { auth: 30,  anon: 8,  windowMs: 60_000 },
};

interface BucketEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, BucketEntry>();

function getKey(op: EngineOperation, userId: string | null, ip: string): string {
  return userId ? `user:${userId}:${op}` : `ip:${ip}:${op}`;
}

function getIp(c: Context): string {
  return (
    c.req.header("x-forwarded-for")?.split(",")[0]?.trim() ??
    c.req.header("cf-connecting-ip") ??
    "unknown"
  );
}

export function engineRateLimit(op: EngineOperation) {
  return async (c: Context, next: Next) => {
    const user = c.get("user") as { sub: string } | undefined;
    const userId = user?.sub ?? null;
    const ip = getIp(c);
    const key = getKey(op, userId, ip);

    const limit = LIMITS[op];
    const maxReqs = userId ? limit.auth : limit.anon;
    const now = Date.now();

    let bucket = buckets.get(key);
    if (!bucket || now > bucket.resetAt) {
      bucket = { count: 0, resetAt: now + limit.windowMs };
      buckets.set(key, bucket);
    }

    if (bucket.count >= maxReqs) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      return c.json(
        { error: "Rate limit exceeded. Please wait before generating again." },
        429,
        { "Retry-After": String(retryAfter) }
      );
    }

    bucket.count++;
    await next();
  };
}

// Optional auth middleware — sets user context if token present, doesn't reject if missing
export async function optionalAuth(c: Context, next: Next) {
  const authHeader = c.req.header("Authorization");
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.slice(7);
    try {
      const { jwtVerify } = await import("jose");
      const { payload } = await jwtVerify(token, jwtSecret);
      if (payload.sub) {
        c.set("user", { sub: payload.sub, isAdmin: payload.isAdmin === true });
      }
    } catch {
      // Invalid token — treat as anonymous, don't reject
    }
  }
  await next();
}
