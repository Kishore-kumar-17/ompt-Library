import { Hono } from "hono";
import { analyzePrompt }  from "../engine/modules/analyzer.js";
import { convertPrompt }  from "../engine/modules/converter.js";
import { explainPrompt }  from "../engine/modules/explainer.js";
import { platformRegistry } from "../engine/platforms/index.js";
import { optionalAuth, engineRateLimit } from "../middleware/rateLimit.js";
import { requireAuth } from "../middleware/auth.js";
import { db } from "../db/client.js";
import { builtPrompts, improvedPrompts } from "../db/schema.js";
import { eq, desc, or } from "drizzle-orm";
import type { AnalyzeRequest, ConvertRequest, ExplainRequest } from "../engine/types.js";

const router = new Hono();

// ─── Analyze ──────────────────────────────────────────────────────────────────

router.post("/analyze", optionalAuth, engineRateLimit("analyze"), async (c) => {
  const body = await c.req.json<AnalyzeRequest>();
  if (!body.promptText?.trim()) {
    return c.json({ error: "promptText is required" }, 400);
  }
  try {
    const result = await analyzePrompt(body);
    return c.json(result);
  } catch (err: any) {
    console.error("Analyzer error:", err?.message ?? err);
    return c.json({ error: "Analysis failed. Please try again." }, 500);
  }
});

// ─── Convert ──────────────────────────────────────────────────────────────────

router.post("/convert", optionalAuth, engineRateLimit("convert"), async (c) => {
  const body = await c.req.json<ConvertRequest>();
  if (!body.promptText?.trim())  return c.json({ error: "promptText is required" }, 400);
  if (!body.fromPlatform)        return c.json({ error: "fromPlatform is required" }, 400);
  if (!body.toPlatform)          return c.json({ error: "toPlatform is required" }, 400);
  if (!body.family)              return c.json({ error: "family is required" }, 400);
  try {
    const result = await convertPrompt(body);
    return c.json(result);
  } catch (err: any) {
    console.error("Converter error:", err?.message ?? err);
    return c.json({ error: "Conversion failed. Please try again." }, 500);
  }
});

// ─── Explain ──────────────────────────────────────────────────────────────────

router.post("/explain", optionalAuth, engineRateLimit("explain"), async (c) => {
  const body = await c.req.json<ExplainRequest>();
  if (!body.promptText?.trim()) return c.json({ error: "promptText is required" }, 400);
  try {
    const result = await explainPrompt(body);
    return c.json(result);
  } catch (err: any) {
    console.error("Explainer error:", err?.message ?? err);
    return c.json({ error: "Explanation failed. Please try again." }, 500);
  }
});

// ─── History ──────────────────────────────────────────────────────────────────

router.get("/history", requireAuth, async (c) => {
  const user = c.get("user") as { sub: string };
  const limit = Math.min(Number(c.req.query("limit") ?? "20"), 50);
  const type = c.req.query("type") as "built" | "improved" | undefined;

  try {
    const results: Array<{
      id: number; type: "built" | "improved"; platform: string | null;
      preview: string; score: number | null; createdAt: string;
    }> = [];

    if (!type || type === "built") {
      const built = await db
        .select({
          id: builtPrompts.id,
          platformId: builtPrompts.platformId,
          generatedPrompt: builtPrompts.generatedPrompt,
          qualityScore: builtPrompts.qualityScore,
          createdAt: builtPrompts.createdAt,
        })
        .from(builtPrompts)
        .where(eq(builtPrompts.userId, user.sub))
        .orderBy(desc(builtPrompts.createdAt))
        .limit(limit);

      for (const row of built) {
        results.push({
          id: row.id,
          type: "built",
          platform: row.platformId,
          preview: row.generatedPrompt.slice(0, 100),
          score: row.qualityScore,
          createdAt: row.createdAt.toISOString(),
        });
      }
    }

    if (!type || type === "improved") {
      const improved = await db
        .select({
          id: improvedPrompts.id,
          platformId: improvedPrompts.platformId,
          improvedText: improvedPrompts.improvedText,
          scoreAfter: improvedPrompts.scoreAfter,
          createdAt: improvedPrompts.createdAt,
        })
        .from(improvedPrompts)
        .where(eq(improvedPrompts.userId, user.sub))
        .orderBy(desc(improvedPrompts.createdAt))
        .limit(limit);

      for (const row of improved) {
        results.push({
          id: row.id,
          type: "improved",
          platform: row.platformId,
          preview: row.improvedText.slice(0, 100),
          score: row.scoreAfter,
          createdAt: row.createdAt.toISOString(),
        });
      }
    }

    results.sort((a, b) => b.createdAt.localeCompare(a.createdAt));

    return c.json({ data: results.slice(0, limit), total: results.length });
  } catch (err: any) {
    return c.json({ error: "Failed to fetch history" }, 500);
  }
});

// ─── Platforms (public) ───────────────────────────────────────────────────────

router.get("/platforms", async (c) => {
  const family = c.req.query("family");
  const platforms = family
    ? platformRegistry.getByFamily(family as any)
    : platformRegistry.getAll();

  return c.json({
    platforms: platforms.map((p) => ({
      id: p.id,
      name: p.name,
      family: p.family,
      wordBudget: p.wordBudget,
      compressionLevel: p.compressionLevel,
    })),
  });
});

export default router;
