import { createMiddleware } from "hono/factory";
import { HTTPException } from "hono/http-exception";
import { jwtVerify } from "jose";

export type JWTPayload = { sub: string; isAdmin: boolean };

declare module "hono" {
  interface ContextVariableMap {
    user: JWTPayload;
  }
}

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret && process.env.NODE_ENV === "production") {
  throw new Error("JWT_SECRET is required in production");
}

const secret = new TextEncoder().encode(jwtSecret ?? "dev-secret");

export const requireAuth = createMiddleware(async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw new HTTPException(401, { message: "Missing or invalid Authorization header" });
  }
  const token = authHeader.slice(7);
  try {
    const { payload } = await jwtVerify(token, secret);
    c.set("user", { sub: payload.sub as string, isAdmin: payload.isAdmin as boolean });
  } catch {
    throw new HTTPException(401, { message: "Token invalid or expired" });
  }
  await next();
});

export const requireAdmin = createMiddleware(async (c, next) => {
  const user = c.get("user");
  if (!user?.isAdmin) throw new HTTPException(403, { message: "Admin access required" });
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
