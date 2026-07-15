/**
 * REST API for the imported prompt library.
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { sql, type SQL } from "drizzle-orm";
import { db } from "../db/client.js";
import { requireAuth } from "../middleware/auth.js";
import { optionalAuth, engineRateLimit } from "../middleware/rateLimit.js";

const router = new Hono();

async function rawSql<T = Record<string, unknown>>(query: SQL): Promise<T[]> {
  const result = await db.execute(query);
  return result as unknown as T[];
}

function tagArraySql(tags: string): SQL {
  const tagList = tags.split(",").map((t) => t.trim()).filter(Boolean);
  if (tagList.length === 0) return sql`ARRAY[]::text[]`;
  return sql`ARRAY[${sql.join(tagList.map((tag) => sql`${tag}`), sql`, `)}]::text[]`;
}

function filterConditions(category?: string, tags?: string): SQL[] {
  const conditions: SQL[] = [];
  if (category) conditions.push(sql`category = ${category}`);
  if (tags) conditions.push(sql`tags && ${tagArraySql(tags)}`);
  return conditions;
}

function whereClause(conditions: SQL[]): SQL {
  return conditions.length > 0 ? sql`WHERE ${sql.join(conditions, sql` AND `)}` : sql``;
}

function andClause(conditions: SQL[]): SQL {
  return conditions.length > 0 ? sql`AND ${sql.join(conditions, sql` AND `)}` : sql``;
}

// Runs the activity-table DDL at most once per process lifetime instead of on
// every copy/save request — previously this ran 4 statements on every single
// hit to the two hottest write endpoints in the library.
let activityTablesReady: Promise<void> | null = null;

function ensureLibraryActivityTables(): Promise<void> {
  if (!activityTablesReady) {
    activityTablesReady = (async () => {
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS pl_saved_prompts (
          user_id   VARCHAR(21) NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          prompt_id INTEGER     NOT NULL REFERENCES pl_prompts(id) ON DELETE CASCADE,
          saved_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
          PRIMARY KEY (user_id, prompt_id)
        )
      `);
      await db.execute(sql`
        CREATE TABLE IF NOT EXISTS pl_copy_events (
          id         SERIAL      PRIMARY KEY,
          prompt_id  INTEGER     NOT NULL REFERENCES pl_prompts(id) ON DELETE CASCADE,
          user_id    VARCHAR(21) REFERENCES users(id) ON DELETE SET NULL,
          platform   VARCHAR(50),
          copied_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `);
      await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_pl_saved_user ON pl_saved_prompts (user_id)`);
      await db.execute(sql`CREATE INDEX IF NOT EXISTS idx_pl_copy_user ON pl_copy_events (user_id)`);
    })().catch((err) => {
      // Let the next request retry instead of caching a permanent failure.
      activityTablesReady = null;
      throw err;
    });
  }
  return activityTablesReady;
}

router.get("/categories", optionalAuth, engineRateLimit("libraryRead"), async (c) => {
  const rows = await rawSql<{ category: string; count: number }>(sql`
    SELECT category, count(*)::int AS count
    FROM   pl_prompts
    GROUP  BY category
    ORDER  BY count DESC
  `);
  return c.json(rows);
});

router.get("/tags", optionalAuth, engineRateLimit("libraryRead"), zValidator("query", z.object({
  limit: z.coerce.number().int().min(1).max(100).default(30),
})), async (c) => {
  const { limit } = c.req.valid("query");
  const rows = await rawSql<{ tag: string; count: number }>(sql`
    SELECT tag, count(*)::int AS count
    FROM   pl_prompts, unnest(tags) AS tag
    GROUP  BY tag
    ORDER  BY count DESC
    LIMIT  ${limit}
  `);
  return c.json(rows);
});

const listSchema = z.object({
  category: z.string().optional(),
  tags: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

const searchSchema = listSchema.extend({
  q: z.string().min(1),
  mode: z.enum(["fulltext", "fuzzy", "both"]).default("both"),
});

router.get("/prompts", optionalAuth, engineRateLimit("libraryRead"), zValidator("query", listSchema), async (c) => {
  const { category, tags, page, limit } = c.req.valid("query");
  const offset = (page - 1) * limit;
  const where = whereClause(filterConditions(category, tags));

  const [rows, [{ total }]] = await Promise.all([
    rawSql<Record<string, unknown>>(sql`
      SELECT id, slug, title, base_prompt, category, sub_category,
             prompt_type, tags, quality_score, tested, image_url, created_at
      FROM   pl_prompts
      ${where}
      ORDER  BY id
      LIMIT  ${limit} OFFSET ${offset}
    `),
    rawSql<{ total: number }>(sql`SELECT count(*)::int AS total FROM pl_prompts ${where}`),
  ]);

  return c.json({ data: rows, total, page, limit, pages: Math.ceil(total / limit) });
});

router.get("/prompts/search", optionalAuth, engineRateLimit("libraryRead"), zValidator("query", searchSchema), async (c) => {
  const { q, mode, category, tags, page, limit } = c.req.valid("query");
  const offset = (page - 1) * limit;
  const filters = andClause(filterConditions(category, tags));

  let rows: Record<string, unknown>[] = [];
  let total = 0;
  let resultMode: "fulltext" | "fuzzy" | "none" = "none";

  if (mode === "fulltext" || mode === "both") {
    rows = await rawSql<Record<string, unknown>>(sql`
      SELECT id, slug, title, base_prompt, category, sub_category,
             prompt_type, tags, quality_score, tested, image_url,
             ts_rank(search_vec, plainto_tsquery('english', ${q})) AS rank
      FROM   pl_prompts
      WHERE  search_vec @@ plainto_tsquery('english', ${q})
             ${filters}
      ORDER  BY rank DESC
      LIMIT  ${limit} OFFSET ${offset}
    `);

    const [{ count }] = await rawSql<{ count: number }>(sql`
      SELECT count(*)::int AS count
      FROM   pl_prompts
      WHERE  search_vec @@ plainto_tsquery('english', ${q})
             ${filters}
    `);

    total = count;
    if (rows.length > 0) resultMode = "fulltext";
  }

  if ((mode === "fuzzy" || mode === "both") && rows.length === 0) {
    rows = await rawSql<Record<string, unknown>>(sql`
      SELECT id, slug, title, base_prompt, category, sub_category,
             prompt_type, tags, quality_score, tested, image_url,
             similarity(title, ${q}) AS rank
      FROM   pl_prompts
      WHERE  similarity(title, ${q}) > 0.15
             ${filters}
      ORDER  BY rank DESC
      LIMIT  ${limit} OFFSET ${offset}
    `);

    const [{ count }] = await rawSql<{ count: number }>(sql`
      SELECT count(*)::int AS count
      FROM   pl_prompts
      WHERE  similarity(title, ${q}) > 0.15
             ${filters}
    `);

    total = count;
    if (rows.length > 0) resultMode = "fuzzy";
  }

  return c.json({
    data: rows,
    total,
    page,
    limit,
    pages: Math.ceil(total / limit),
    query: q,
    mode: resultMode,
  });
});

router.get("/saved", requireAuth, async (c) => {
  const userId = c.get("user").sub;
  await ensureLibraryActivityTables();

  const rows = await rawSql<{ prompt_id: number }>(sql`
    SELECT prompt_id FROM pl_saved_prompts WHERE user_id = ${userId}
  `);

  return c.json({ ids: rows.map((r) => r.prompt_id) });
});

router.get("/prompts/:id", optionalAuth, engineRateLimit("libraryRead"), async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const [[prompt], platforms] = await Promise.all([
    rawSql<Record<string, unknown>>(sql`
      SELECT id, slug, title, base_prompt, category, sub_category,
             prompt_type, tags, quality_score, tested, image_url, created_at
      FROM   pl_prompts
      WHERE  id = ${id}
    `),
    rawSql<{ platform: string; prompt_text: string }>(sql`
      SELECT platform, prompt_text
      FROM   pl_prompt_platforms
      WHERE  prompt_id = ${id}
      ORDER  BY platform
    `),
  ]);

  if (!prompt) return c.json({ error: "Not found" }, 404);

  const platformMap = Object.fromEntries(platforms.map((p) => [p.platform, p.prompt_text]));
  return c.json({ ...prompt, platforms: platformMap });
});

router.post("/prompts/:id/copy", requireAuth, async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const userId = c.get("user").sub;
  const { platformId } = await c.req.json().catch(() => ({})) as { platformId?: string };

  await ensureLibraryActivityTables();

  const [prompt] = await rawSql(sql`SELECT id FROM pl_prompts WHERE id = ${id}`);
  if (!prompt) return c.json({ error: "Not found" }, 404);

  await db.execute(sql`
    INSERT INTO pl_copy_events (prompt_id, user_id, platform)
    VALUES (${id}, ${userId}, ${platformId ?? null})
  `);

  return c.json({ success: true });
});

router.post("/prompts/:id/save", requireAuth, async (c) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.json({ error: "Invalid id" }, 400);

  const userId = c.get("user").sub;

  await ensureLibraryActivityTables();

  const [prompt] = await rawSql(sql`SELECT id FROM pl_prompts WHERE id = ${id}`);
  if (!prompt) return c.json({ error: "Not found" }, 404);

  const [existing] = await rawSql(sql`
    SELECT 1
    FROM   pl_saved_prompts
    WHERE  user_id = ${userId} AND prompt_id = ${id}
    LIMIT  1
  `);

  if (existing) {
    await db.execute(sql`
      DELETE FROM pl_saved_prompts
      WHERE user_id = ${userId} AND prompt_id = ${id}
    `);
    return c.json({ saved: false });
  }

  await db.execute(sql`
    INSERT INTO pl_saved_prompts (user_id, prompt_id)
    VALUES (${userId}, ${id})
  `);

  return c.json({ saved: true });
});

export default router;
