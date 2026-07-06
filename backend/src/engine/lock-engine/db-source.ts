/**
 * Engine Module 1 — Prompt Database Interface.
 *
 * Loads prompts from BOTH library sources into the engine's PromptRecord shape:
 *   - pl_prompts (raw-SQL image/video library)      -> id "lib:<numericId>"
 *   - Drizzle `prompts` table (approved only)        -> id "db:<nanoid>"
 *
 * Ids are namespaced so the two keyspaces never collide. Rows are mapped through
 * the existing normalizePromptRecord() so the rest of the engine stays unaware of
 * where a prompt came from.
 */

import { sql, eq, and, inArray, type SQL } from "drizzle-orm";
import { db } from "../../db/client.js";
import {
  prompts,
  promptPlatforms,
  promptTags,
  tags,
  categories,
} from "../../db/schema.js";
import { normalizePromptRecord, searchPrompts } from "./prompts.js";
import type { PromptRecord } from "./types.js";

const LIB_PREFIX = "lib:";
const DB_PREFIX = "db:";

async function rawSql<T = Record<string, unknown>>(query: SQL): Promise<T[]> {
  const result = await db.execute(query);
  return result as unknown as T[];
}

interface IdRef {
  source: "lib" | "db";
  raw: string;
}

function parseEngineId(id: string): IdRef | null {
  if (id.startsWith(LIB_PREFIX)) return { source: "lib", raw: id.slice(LIB_PREFIX.length) };
  if (id.startsWith(DB_PREFIX)) return { source: "db", raw: id.slice(DB_PREFIX.length) };
  return null;
}

// ─── pl_prompts (library) ──────────────────────────────────────────────────────

interface PlRow {
  id: number;
  slug: string | null;
  title: string;
  base_prompt: string | null;
  category: string | null;
  sub_category: string | null;
  tags: string[] | null;
  tested: boolean | null;
  image_url: string | null;
}

function mapPlRow(row: PlRow, platforms: Record<string, string>): PromptRecord | null {
  return normalizePromptRecord({
    id: `${LIB_PREFIX}${row.id}`,
    slug: row.slug ?? undefined,
    title: row.title,
    // pl_prompts has no separate description column — base_prompt is the rich
    // description layer the parser reads from.
    description: row.base_prompt ?? undefined,
    basePrompt: row.base_prompt ?? undefined,
    category: row.category ?? "",
    subCategory: row.sub_category ?? undefined,
    tags: row.tags ?? [],
    tested: row.tested ?? undefined,
    image: row.image_url ?? undefined,
    platforms,
  });
}

const PL_COLUMNS = sql`id, slug, title, base_prompt, category, sub_category, tags, tested, image_url`;

function inIntList(ids: number[]): SQL {
  return sql.join(ids.map((id) => sql`${id}`), sql`, `);
}

async function loadPlPlatformMaps(ids: number[]): Promise<Map<number, Record<string, string>>> {
  const map = new Map<number, Record<string, string>>();
  if (ids.length === 0) return map;

  const rows = await rawSql<{ prompt_id: number; platform: string; prompt_text: string }>(sql`
    SELECT prompt_id, platform, prompt_text
    FROM   pl_prompt_platforms
    WHERE  prompt_id IN (${inIntList(ids)})
  `);

  for (const row of rows) {
    const existing = map.get(row.prompt_id) ?? {};
    existing[row.platform] = row.prompt_text;
    map.set(row.prompt_id, existing);
  }
  return map;
}

async function getPlPromptById(numericId: number): Promise<PromptRecord | null> {
  const [row] = await rawSql<PlRow>(sql`
    SELECT ${PL_COLUMNS} FROM pl_prompts WHERE id = ${numericId}
  `);
  if (!row) return null;

  const platformMap = await loadPlPlatformMaps([row.id]);
  return mapPlRow(row, platformMap.get(row.id) ?? {});
}

async function searchPlPrompts(query: string, limit: number): Promise<PromptRecord[]> {
  const rows = await rawSql<PlRow>(sql`
    SELECT ${PL_COLUMNS}
    FROM   pl_prompts
    WHERE  search_vec @@ plainto_tsquery('english', ${query})
    ORDER  BY ts_rank(search_vec, plainto_tsquery('english', ${query})) DESC
    LIMIT  ${limit}
  `);
  if (rows.length === 0) return [];

  const platformMaps = await loadPlPlatformMaps(rows.map((r) => r.id));
  return rows
    .map((row) => mapPlRow(row, platformMaps.get(row.id) ?? {}))
    .filter((r): r is PromptRecord => r !== null);
}

// ─── Drizzle `prompts` (curated, approved-only) ─────────────────────────────────

async function loadDbPlatformMaps(ids: string[]): Promise<Map<string, Record<string, string>>> {
  const map = new Map<string, Record<string, string>>();
  if (ids.length === 0) return map;

  const rows = await db
    .select({
      promptId: promptPlatforms.promptId,
      platformId: promptPlatforms.platformId,
      promptText: promptPlatforms.promptText,
    })
    .from(promptPlatforms)
    .where(inArray(promptPlatforms.promptId, ids));

  for (const row of rows) {
    const existing = map.get(row.promptId) ?? {};
    existing[row.platformId] = row.promptText;
    map.set(row.promptId, existing);
  }
  return map;
}

async function loadDbTags(promptId: string): Promise<string[]> {
  const rows = await db
    .select({ name: tags.name })
    .from(promptTags)
    .innerJoin(tags, eq(promptTags.tagId, tags.id))
    .where(eq(promptTags.promptId, promptId));
  return rows.map((r: { name: string }) => r.name);
}

type DbPromptRow = typeof prompts.$inferSelect;

function mapDbRow(
  row: DbPromptRow,
  categoryLabel: string | null,
  platforms: Record<string, string>,
  promptTagList: string[],
): PromptRecord | null {
  return normalizePromptRecord({
    id: `${DB_PREFIX}${row.id}`,
    title: row.title,
    description: row.description ?? undefined,
    basePrompt: row.basePrompt,
    // resolveCategoryId matches on human labels; fall back to the raw category id.
    category: categoryLabel ?? row.categoryId ?? "",
    family: row.family,
    tags: promptTagList,
    rating: row.qualityScore ?? undefined,
    platforms,
  });
}

async function getDbPromptById(nanoId: string): Promise<PromptRecord | null> {
  const [hit] = await db
    .select({ prompt: prompts, categoryLabel: categories.label })
    .from(prompts)
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .where(and(eq(prompts.id, nanoId), eq(prompts.status, "approved")))
    .limit(1);
  if (!hit) return null;

  const [platformMap, tagList] = await Promise.all([
    loadDbPlatformMaps([nanoId]),
    loadDbTags(nanoId),
  ]);

  return mapDbRow(hit.prompt, hit.categoryLabel, platformMap.get(nanoId) ?? {}, tagList);
}

async function searchDbPrompts(query: string, limit: number): Promise<PromptRecord[]> {
  const hits = await db
    .select({ prompt: prompts, categoryLabel: categories.label })
    .from(prompts)
    .leftJoin(categories, eq(prompts.categoryId, categories.id))
    .where(
      and(
        eq(prompts.status, "approved"),
        sql`to_tsvector('english', coalesce(${prompts.title},'') || ' ' || coalesce(${prompts.description},'') || ' ' || coalesce(${prompts.basePrompt},'')) @@ plainto_tsquery('english', ${query})`,
      ),
    )
    .limit(limit);
  if (hits.length === 0) return [];

  const ids = hits.map((h: { prompt: DbPromptRow; categoryLabel: string | null }) => h.prompt.id);
  const platformMaps = await loadDbPlatformMaps(ids);

  return hits
    .map((h: { prompt: DbPromptRow; categoryLabel: string | null }) =>
      mapDbRow(h.prompt, h.categoryLabel, platformMaps.get(h.prompt.id) ?? {}, []),
    )
    .filter((r): r is PromptRecord => r !== null);
}

// ─── Public access surface ──────────────────────────────────────────────────────

export async function getEnginePromptById(id: string): Promise<PromptRecord | null> {
  const ref = parseEngineId(id);
  if (!ref) return null;

  if (ref.source === "lib") {
    const numericId = Number(ref.raw);
    if (!Number.isInteger(numericId)) return null;
    return getPlPromptById(numericId);
  }

  return getDbPromptById(ref.raw);
}

/**
 * Engine Module 2 — Search. Pulls full-text candidates from both sources, then
 * re-ranks the merged pool with the engine's own token scorer for one consistent
 * ordering across the two keyspaces.
 */
export async function searchEnginePrompts(query: string, limit = 10): Promise<PromptRecord[]> {
  const trimmed = query.trim();
  if (!trimmed) return [];

  const candidateLimit = Math.max(limit * 2, 20);
  const [libResults, dbResults] = await Promise.all([
    searchPlPrompts(trimmed, candidateLimit),
    searchDbPrompts(trimmed, candidateLimit),
  ]);

  return searchPrompts([...libResults, ...dbResults], trimmed, limit);
}
