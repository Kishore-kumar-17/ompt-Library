import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, and, desc, sql } from "drizzle-orm";
import { db } from "../db/client.js";
import { users, savedPrompts, copyEvents, submissions, prompts } from "../db/schema.js";
import { requireAuth } from "../middleware/auth.js";

const router = new Hono();

async function countLibrarySaves(userId: string): Promise<number> {
  try {
    const rows = await db.execute(sql`
      SELECT count(*)::int AS count
      FROM   pl_saved_prompts
      WHERE  user_id = ${userId}
    `) as unknown as { count: number }[];
    return Number(rows[0]?.count ?? 0);
  } catch {
    return 0;
  }
}

async function countLibraryCopies(userId: string): Promise<number> {
  try {
    const rows = await db.execute(sql`
      SELECT count(*)::int AS count
      FROM   pl_copy_events
      WHERE  user_id = ${userId}
    `) as unknown as { count: number }[];
    return Number(rows[0]?.count ?? 0);
  } catch {
    return 0;
  }
}

// ─── Get profile stats ────────────────────────────────────────────────────────

router.get("/stats", requireAuth, async (c) => {
  const userId = c.get("user").sub;

  const [saves, librarySaves, copies, libraryCopies, submitted, approved] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(savedPrompts).where(eq(savedPrompts.userId, userId)),
    countLibrarySaves(userId),
    db.select({ count: sql<number>`count(*)` }).from(copyEvents).where(eq(copyEvents.userId, userId)),
    countLibraryCopies(userId),
    db.select({ count: sql<number>`count(*)` }).from(submissions).where(eq(submissions.submitterId, userId)),
    db.select({ count: sql<number>`count(*)` }).from(submissions).where(
      and(eq(submissions.submitterId, userId), eq(submissions.status, "approved"))
    ),
  ]);

  return c.json({
    saved: Number(saves[0].count) + librarySaves,
    copied: Number(copies[0].count) + libraryCopies,
    submitted: Number(submitted[0].count),
    approved: Number(approved[0].count),
  });
});

// ─── Get saved prompts ────────────────────────────────────────────────────────

router.get("/saved", requireAuth, async (c) => {
  const userId = c.get("user").sub;

  const rows = await db
    .select({ prompt: prompts, savedAt: savedPrompts.savedAt })
    .from(savedPrompts)
    .innerJoin(prompts, eq(savedPrompts.promptId, prompts.id))
    .where(eq(savedPrompts.userId, userId))
    .orderBy(desc(savedPrompts.savedAt));

  return c.json(rows);
});

// ─── Update profile ───────────────────────────────────────────────────────────

const updateSchema = z.object({
  displayName: z.string().min(2).max(100).optional(),
  bio: z.string().max(500).optional(),
  avatarUrl: z.string().url().optional(),
});

router.patch("/", requireAuth, zValidator("json", updateSchema), async (c) => {
  const userId = c.get("user").sub;
  const updates = c.req.valid("json");

  const [user] = await db
    .update(users)
    .set({ ...updates, updatedAt: new Date() })
    .where(eq(users.id, userId))
    .returning({
      id: users.id, email: users.email, displayName: users.displayName,
      avatarUrl: users.avatarUrl, bio: users.bio,
    });

  return c.json(user);
});

export default router;
