import type { Context, Next } from "hono";
import { jwtSecret } from "../lib/jwt.js";

type EngineOperation = "build" | "improve" | "analyze" | "optimize" | "convert" | "explain" | "expand" | "libraryRead" | "submit";

const LIMITS: Record<EngineOperation, { auth: number; anon: number; windowMs: number }> = {
  build:       { auth: 20,  anon: 5,   windowMs: 60_000 },
  improve:     { auth: 20,  anon: 5,   windowMs: 60_000 },
  analyze:     { auth: 50,  anon: 10,  windowMs: 60_000 },
  optimize:    { auth: 20,  anon: 5,   windowMs: 60_000 },
  convert:     { auth: 20,  anon: 5,   windowMs: 60_000 },
  explain:     { auth: 30,  anon: 8,   windowMs: 60_000 },
  expand:      { auth: 20,  anon: 5,   windowMs: 60_000 },
  // Generous — legitimate public browsing/search traffic, just needs some backpressure.
  libraryRead: { auth: 300, anon: 120, windowMs: 60_000 },
  submit:      { auth: 10,  anon: 10,  windowMs: 60 * 60_000 },
};

interface BucketEntry {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, BucketEntry>();

// Opportunistic eviction of expired buckets so long-running processes don't
// accumulate unbounded per-IP/per-op entries. Cheap: only sweeps every Nth
// bucket creation rather than on every request.
let sweepCounter = 0;
function maybeSweep(now: number): void {
  sweepCounter++;
  if (sweepCounter % 200 !== 0) return;
  for (const [key, entry] of buckets) {
    if (now > entry.resetAt) buckets.delete(key);
  }
}

function getKey(op: string, userId: string | null, ip: string): string {
  return userId ? `user:${userId}:${op}` : `ip:${ip}:${op}`;
}

// Prefer cf-connecting-ip (set by Cloudflare's edge, not client-controllable)
// over x-forwarded-for. For XFF, trust only the LAST hop — the one appended
// by our own reverse proxy (Vercel's edge network) — not the first, which is
// whatever the client itself sent and can be set to an arbitrary value per
// request to get a fresh rate-limit bucket every time. This assumes exactly
// one trusted proxy hop in front of this service; if that topology changes,
// this needs to change with it.
function getIp(c: Context): string {
  const cf = c.req.header("cf-connecting-ip");
  if (cf) return cf;
  const xff = c.req.header("x-forwarded-for");
  if (xff) {
    const hops = xff.split(",").map((s) => s.trim()).filter(Boolean);
    if (hops.length) return hops[hops.length - 1];
  }
  return "unknown";
}

function checkAndIncrement(key: string, maxReqs: number, windowMs: number): boolean {
  const now = Date.now();
  maybeSweep(now);

  let bucket = buckets.get(key);
  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + windowMs };
    buckets.set(key, bucket);
  }

  if (bucket.count >= maxReqs) {
    return false;
  }

  bucket.count++;
  return true;
}

function retryAfterHeader(key: string): string {
  const bucket = buckets.get(key);
  const retryAfter = bucket ? Math.ceil((bucket.resetAt - Date.now()) / 1000) : 60;
  return String(Math.max(retryAfter, 1));
}

export function engineRateLimit(op: EngineOperation) {
  return async (c: Context, next: Next) => {
    const user = c.get("user") as { sub: string } | undefined;
    const userId = user?.sub ?? null;
    const ip = getIp(c);
    const key = getKey(op, userId, ip);

    const limit = LIMITS[op];
    const maxReqs = userId ? limit.auth : limit.anon;

    if (!checkAndIncrement(key, maxReqs, limit.windowMs)) {
      return c.json(
        { error: "Rate limit exceeded. Please wait before generating again." },
        429,
        { "Retry-After": retryAfterHeader(key) }
      );
    }

    await next();
  };
}

// ─── Auth rate limiting ─────────────────────────────────────────────────────
// Login/register have no per-account signal to key on before a user is
// identified, so this is IP-scoped — tight enough to blunt scripted brute
// force / mass account creation without needing a new account-lockout
// mechanism.

const AUTH_LIMITS: Record<"login" | "register", { max: number; windowMs: number }> = {
  login:    { max: 10, windowMs: 15 * 60_000 },
  register: { max: 5,  windowMs: 60 * 60_000 },
};

export function authRateLimit(op: keyof typeof AUTH_LIMITS) {
  return async (c: Context, next: Next) => {
    const ip = getIp(c);
    const key = `auth:${op}:${ip}`;
    const limit = AUTH_LIMITS[op];

    if (!checkAndIncrement(key, limit.max, limit.windowMs)) {
      return c.json(
        { error: "Too many attempts. Please wait before trying again." },
        429,
        { "Retry-After": retryAfterHeader(key) }
      );
    }

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
      const { payload } = await jwtVerify(token, jwtSecret, { algorithms: ["HS256"] });
      if (payload.sub) {
        c.set("user", { sub: payload.sub, isAdmin: payload.isAdmin === true });
      }
    } catch {
      // Invalid token — treat as anonymous, don't reject
    }
  }
  await next();
}
