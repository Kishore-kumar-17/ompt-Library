import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq, and, gt, ilike, sql, desc, asc, inArray } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "../db/client.js";
import {
  prompts, promptPlatforms, promptVariables, promptTags, tags,
  categories, copyEvents, viewEvents, savedPrompts,
} from "../db/schema.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { optionalAuth } from "../middleware/rateLimit.js";

const VIEW_DEDUP_WINDOW_MS = 24 * 60 * 60_000;
const COPY_DEDUP_WINDOW_MS = 60 * 60_000;

const router = new Hono();

// ─── List / Search ────────────────────────────────────────────────────────────

const listSchema = z.object({
  family: z.enum(["image", "video", "text", "content"]).optional(),
  category: z.string().optional(),
  platform: z.string().optional(),
  tested: z.coerce.boolean().optional(),
  search: z.string().optional(),
  sort: z.enum(["newest", "popular", "rating"]).default("newest"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});

router.get("/", zValidator("query", listSchema), async (c) => {
  const { family, category, platform, search, sort, page, limit } = c.req.valid("query");
  const offset = (page - 1) * limit;

  const conditions = [eq(prompts.status, "approved")];

  if (family) conditions.push(eq(prompts.family, family));
  if (category) conditions.push(eq(prompts.categoryId, category));
  if (search) {
    conditions.push(
      sql`to_tsvector('english', coalesce(${prompts.title},'') || ' ' || coalesce(${prompts.description},'') || ' ' || coalesce(${prompts.basePrompt},'')) @@ plainto_tsquery('english', ${search})`
    );
  }

  const orderBy = sort === "popular"
    ? desc(prompts.copyCount)
    : sort === "rating"
    ? desc(prompts.qualityScore)
    : desc(prompts.createdAt);

  // Filter by platform tested-on
  let promptIds: string[] | undefined;
  if (platform) {
    const rows = await db
      .select({ promptId: promptPlatforms.promptId })
      .from(promptPlatforms)
      .where(and(eq(promptPlatforms.platformId, platform), eq(promptPlatforms.isTested, true)));
    promptIds = rows.map((r) => r.promptId);
    if (promptIds.length === 0) return c.json({ data: [], total: 0 });
    conditions.push(inArray(prompts.id, promptIds));
  }

  const [rows, [countRow]] = await Promise.all([
    db.select().from(prompts).where(and(...conditions)).orderBy(orderBy).limit(limit).offset(offset),
    db.select({ count: sql<number>`count(*)` }).from(prompts).where(and(...conditions)),
  ]);

  return c.json({ data: rows, total: Number(countRow.count), page, limit });
});

// ─── Get Single ───────────────────────────────────────────────────────────────

router.get("/:id", optionalAuth, async (c) => {
  const id = c.req.param("id");
  if (!id) return c.json({ error: "Not found" }, 404);

  const [prompt] = await db.select().from(prompts).where(eq(prompts.id, id)).limit(1);
  if (!prompt || prompt.status !== "approved") return c.json({ error: "Not found" }, 404);

  const [platforms, variables] = await Promise.all([
    db.select().from(promptPlatforms).where(eq(promptPlatforms.promptId, id)),
    db.select().from(promptVariables).where(eq(promptVariables.promptId, id)),
  ]);

  // Only track views for signed-in users, deduped to once per prompt per
  // rolling 24h window — an anonymous GET can be spammed with no identity to
  // dedup against, so it no longer increments the public view count at all.
  const user = c.get("user") as { sub: string } | undefined;
  if (user) {
    const since = new Date(Date.now() - VIEW_DEDUP_WINDOW_MS);
    const [recent] = await db
      .select({ id: viewEvents.id })
      .from(viewEvents)
      .where(and(eq(viewEvents.promptId, id), eq(viewEvents.userId, user.sub), gt(viewEvents.viewedAt, since)))
      .limit(1);

    if (!recent) {
      await Promise.all([
        db.insert(viewEvents).values({ promptId: id, userId: user.sub }),
        db.update(prompts).set({ viewCount: sql`${prompts.viewCount} + 1` }).where(eq(prompts.id, id)),
      ]);
    }
  }

  return c.json({ ...prompt, platforms, variables });
});

// ─── Copy Event ───────────────────────────────────────────────────────────────

router.post("/:id/copy", requireAuth, async (c) => {
  const promptId = c.req.param("id");
  const userId = c.get("user").sub;
  const { platformId } = await c.req.json().catch(() => ({})) as { platformId?: string };

  // Always record the event (real activity log for the "Copied" stat), but
  // only bump the public copyCount ranking signal once per prompt per rolling
  // hour per user — otherwise a tight loop trivially inflates "popular" sort.
  const since = new Date(Date.now() - COPY_DEDUP_WINDOW_MS);
  const [recent] = await db
    .select({ id: copyEvents.id })
    .from(copyEvents)
    .where(and(eq(copyEvents.promptId, promptId), eq(copyEvents.userId, userId), gt(copyEvents.copiedAt, since)))
    .limit(1);

  await db.insert(copyEvents).values({ promptId, userId, platformId });
  if (!recent) {
    await db.update(prompts).set({ copyCount: sql`${prompts.copyCount} + 1` }).where(eq(prompts.id, promptId));
  }

  return c.json({ success: true });
});

// ─── Save / Unsave ────────────────────────────────────────────────────────────

router.post("/:id/save", requireAuth, async (c) => {
  const promptId = c.req.param("id");
  const userId = c.get("user").sub;

  const existing = await db
    .select()
    .from(savedPrompts)
    .where(and(eq(savedPrompts.userId, userId), eq(savedPrompts.promptId, promptId)))
    .limit(1);

  if (existing.length > 0) {
    await db
      .delete(savedPrompts)
      .where(and(eq(savedPrompts.userId, userId), eq(savedPrompts.promptId, promptId)));
    await db.update(prompts).set({ saveCount: sql`${prompts.saveCount} - 1` }).where(eq(prompts.id, promptId));
    return c.json({ saved: false });
  }

  await db.insert(savedPrompts).values({ userId, promptId });
  await db.update(prompts).set({ saveCount: sql`${prompts.saveCount} + 1` }).where(eq(prompts.id, promptId));
  return c.json({ saved: true });
});

// ─── Admin: Create Prompt ─────────────────────────────────────────────────────

const createSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().optional(),
  family: z.enum(["image", "video", "text", "content"]),
  categoryId: z.string().optional(),
  basePrompt: z.string().min(1),
  platforms: z.array(z.object({
    platformId: z.string(),
    promptText: z.string(),
    qualityScore: z.number().int().min(0).max(100).optional(),
    exampleOutput: z.string().optional(),
    isTested: z.boolean().default(false),
  })).optional(),
  variables: z.array(z.object({
    name: z.string(),
    placeholder: z.string().optional(),
    defaultValue: z.string().optional(),
    isRequired: z.boolean().default(false),
  })).optional(),
  tags: z.array(z.string()).optional(),
  qualityScore: z.number().int().min(0).max(100).optional(),
  isFeatured: z.boolean().default(false),
});

router.post("/", requireAuth, requireAdmin, zValidator("json", createSchema), async (c) => {
  const data = c.req.valid("json");
  const authorId = c.get("user").sub;
  const id = nanoid();

  await db.transaction(async (tx) => {
    await tx.insert(prompts).values({
      id, authorId,
      family: data.family,
      categoryId: data.categoryId,
      title: data.title,
      description: data.description,
      basePrompt: data.basePrompt,
      qualityScore: data.qualityScore,
      isFeatured: data.isFeatured,
      status: "approved",
    });

    if (data.platforms?.length) {
      await tx.insert(promptPlatforms).values(
        data.platforms.map((p) => ({ ...p, promptId: id }))
      );
    }

    if (data.variables?.length) {
      await tx.insert(promptVariables).values(
        data.variables.map((v, i) => ({ ...v, promptId: id, sortOrder: i }))
      );
    }

    if (data.tags?.length) {
      for (const name of data.tags) {
        const [tag] = await tx
          .insert(tags)
          .values({ name })
          .onConflictDoUpdate({ target: tags.name, set: { name } })
          .returning({ id: tags.id });
        await tx.insert(promptTags).values({ promptId: id, tagId: tag.id });
      }
    }
  });

  return c.json({ id }, 201);
});

export default router;
