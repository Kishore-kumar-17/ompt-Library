import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";
import { db } from "../db/client.js";
import { users } from "../db/schema.js";
import { signToken, requireAuth } from "../middleware/auth.js";
import { authRateLimit } from "../middleware/rateLimit.js";

const router = new Hono();

// Exercised on the "no such user" login path so response timing doesn't
// reveal whether an email is registered on top of the (accepted, standard)
// 409-on-register enumeration signal.
const DUMMY_HASH_PROMISE = bcrypt.hash("timing-safety-dummy-password", 12);

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  displayName: z.string().min(2).max(100).optional(),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

router.post("/register", authRateLimit("register"), zValidator("json", registerSchema), async (c) => {
  const { email, password, displayName } = c.req.valid("json");

  const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (existing.length > 0) {
    return c.json({ error: "Email already registered" }, 409);
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const [user] = await db
    .insert(users)
    .values({ id: nanoid(), email, passwordHash, displayName: displayName ?? email.split("@")[0] })
    .returning({
      id: users.id, email: users.email, displayName: users.displayName,
      avatarUrl: users.avatarUrl, bio: users.bio, isAdmin: users.isAdmin,
    });

  const token = await signToken({ sub: user.id, isAdmin: user.isAdmin });
  return c.json({ user, token }, 201);
});

router.post("/login", authRateLimit("login"), zValidator("json", loginSchema), async (c) => {
  const { email, password } = c.req.valid("json");

  const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);
  if (!user || !user.passwordHash) {
    // Still pay the bcrypt cost so response timing doesn't distinguish
    // "no such user" from "wrong password."
    await bcrypt.compare(password, await DUMMY_HASH_PROMISE);
    return c.json({ error: "Invalid credentials" }, 401);
  }

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return c.json({ error: "Invalid credentials" }, 401);

  const token = await signToken({ sub: user.id, isAdmin: user.isAdmin });
  const { passwordHash: _, ...safeUser } = user;
  return c.json({ user: safeUser, token });
});

router.get("/me", requireAuth, async (c) => {
  const { sub } = c.get("user");
  const [user] = await db
    .select({
      id: users.id, email: users.email, displayName: users.displayName,
      avatarUrl: users.avatarUrl, bio: users.bio, isAdmin: users.isAdmin,
      createdAt: users.createdAt,
    })
    .from(users)
    .where(eq(users.id, sub))
    .limit(1);

  if (!user) return c.json({ error: "User not found" }, 404);
  return c.json(user);
});

export default router;
