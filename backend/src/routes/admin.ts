import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "../db/client.js";
import { bulkImports, prompts, promptPlatforms } from "../db/schema.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = new Hono();

router.use("*", requireAuth, requireAdmin);

// ─── Bulk Import ──────────────────────────────────────────────────────────────

const columnMapSchema = z.object({
  title: z.string(),
  family: z.string(),
  basePrompt: z.string(),
  categoryId: z.string().optional(),
  qualityScore: z.string().optional(),
  testedOn: z.string().optional(),
});

const bulkRowSchema = z.object({
  title: z.string().min(1),
  family: z.enum(["image", "video", "text", "content", "website"]),
  basePrompt: z.string().min(1),
  categoryId: z.string().optional(),
  qualityScore: z.coerce.number().int().min(0).max(100).optional(),
  platforms: z.record(z.string()).optional(),
});

const MAX_IMPORT_ROWS = 500;
// Leaves headroom under Vercel's 30s function timeout (vercel.json) — if the
// loop is still running past this, stop and report a partial import instead
// of letting the platform kill the function mid-loop, which previously left
// bulkImports.status stuck at "processing" forever with no record of what
// had already landed.
const MAX_PROCESSING_MS = 20_000;

router.post("/import/start", zValidator("json", z.object({
  filename: z.string(),
  columnMap: columnMapSchema,
  rows: z.array(z.record(z.string())).max(
    MAX_IMPORT_ROWS,
    `Import is limited to ${MAX_IMPORT_ROWS} rows per batch — split larger files and import in multiple passes.`
  ),
})), async (c) => {
  const { filename, columnMap, rows } = c.req.valid("json");
  const adminId = c.get("user").sub;
  const importId = nanoid();
  const startedAt = Date.now();

  await db.insert(bulkImports).values({
    id: importId,
    adminId,
    filename,
    rowCount: rows.length,
    columnMap,
    status: "processing",
  });

  // Process rows. Best-effort (a bad row doesn't abort the batch) — but
  // wrapped in try/finally so the import record ALWAYS gets a terminal
  // status, whether the loop finishes, self-truncates on time, or an
  // unexpected error escapes it. Previously any of those left the row stuck
  // at "processing" indefinitely with no indication of what succeeded.
  let imported = 0;
  let truncated = false;
  const errors: { row: number; error: string }[] = [];

  try {
    for (let i = 0; i < rows.length; i++) {
      if (Date.now() - startedAt > MAX_PROCESSING_MS) {
        truncated = true;
        errors.push({
          row: i + 1,
          error: `Import stopped after ${i} of ${rows.length} rows to stay within the request time limit — re-run with the remaining rows.`,
        });
        break;
      }

      const raw = rows[i];
      const mapped = {
        title: raw[columnMap.title],
        family: raw[columnMap.family],
        basePrompt: raw[columnMap.basePrompt],
        categoryId: columnMap.categoryId ? raw[columnMap.categoryId] : undefined,
        qualityScore: columnMap.qualityScore ? Number(raw[columnMap.qualityScore]) : undefined,
      };

      const parsed = bulkRowSchema.safeParse(mapped);
      if (!parsed.success) {
        errors.push({ row: i + 1, error: parsed.error.issues[0].message });
        continue;
      }

      try {
        const promptId = nanoid();
        await db.insert(prompts).values({
          id: promptId,
          authorId: adminId,
          ...parsed.data,
          status: "approved",
        });
        imported++;
      } catch (e) {
        errors.push({ row: i + 1, error: String(e) });
      }
    }
  } finally {
    await db
      .update(bulkImports)
      .set({
        importedCount: imported,
        errorCount: errors.length,
        errors,
        status: "completed",
        completedAt: new Date(),
      })
      .where(eq(bulkImports.id, importId));
  }

  return c.json({ importId, imported, errors, truncated });
});

router.get("/import/:id", async (c) => {
  const id = c.req.param("id");
  const [row] = await db.select().from(bulkImports).where(eq(bulkImports.id, id)).limit(1);
  if (!row) return c.json({ error: "Not found" }, 404);
  return c.json(row);
});

export default router;
