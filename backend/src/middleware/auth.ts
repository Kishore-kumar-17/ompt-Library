import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { jwtVerify } from "jose";
import { eq } from "drizzle-orm";
import { jwtSecret as secret } from "../lib/jwt.js";
import { db } from "../db/client.js";
import { users } from "../db/schema.js";

export type JWTPayload = { sub: string; isAdmin: boolean };

declare module "hono" {
  interface ContextVariableMap {
    user: JWTPayload;
  }
}

export const requireAuth = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new HTTPException(401, { message: "Missing or invalid Authorization header" });
  }
  const token = authHeader.slice(7);
  try {
    const { payload } = await jwtVerify(token, secret, { algorithms: ["HS256"] });
    c.set("user", { sub: payload.sub as string, isAdmin: payload.isAdmin as boolean });
  } catch {
    throw new HTTPException(401, { message: "Token invalid or expired" });
  }
  await next();
});

// Re-checks isAdmin against the database rather than trusting the JWT claim
// alone — the claim is signed at login and tokens live 7 days, so trusting it
// verbatim means a demoted or compromised admin keeps admin access for up to
// 7 days after `users.is_admin` is flipped. This adds a DB round-trip to
// every admin request, which is an acceptable cost for a low-traffic,
// high-privilege surface.
export const requireAdmin = createMiddleware(async (c, next) => {
  const user = c.get("user");
  if (!user) throw new HTTPException(403, { message: "Admin access required" });

  const [row] = await db
    .select({ isAdmin: users.isAdmin })
    .from(users)
    .where(eq(users.id, user.sub))
    .limit(1);

  if (!row?.isAdmin) throw new HTTPException(403, { message: "Admin access required" });
  await next();
});

export async function signToken(payload: JWTPayload): Promise<string> {
  const { SignJWT } = await import("jose");
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}
