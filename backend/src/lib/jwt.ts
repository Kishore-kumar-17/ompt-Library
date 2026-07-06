import { TextEncoder } from "util";

const raw = process.env.JWT_SECRET;

if (!raw) {
  if (process.env.NODE_ENV === "production") {
    throw new Error("JWT_SECRET environment variable is required in production");
  }
  console.warn("[auth] JWT_SECRET not set — using insecure dev-only fallback. Set JWT_SECRET before deploying.");
}

export const jwtSecret = new TextEncoder().encode(raw ?? "dev-secret");
