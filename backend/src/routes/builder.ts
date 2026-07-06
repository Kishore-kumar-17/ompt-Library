import { Hono } from "hono";
import { buildPrompt } from "../engine/modules/builder.js";
import { promptEngineBuilder } from "../engine/engines/prompt-engine-builder.js";
import { PLATFORM_KNOWLEDGE } from "../engine/rag/knowledge.js";
import { getRAGFileList } from "../engine/rag/loader.js";
import { optionalAuth, engineRateLimit } from "../middleware/rateLimit.js";
import type { BuildPromptRequest } from "../engine/contracts.js";

const router = new Hono();

// ─── POST /generate — single platform ─────────────────────────────────────────
router.post(
  "/generate",
  optionalAuth,
  engineRateLimit("build"),
  async (c) => {
    const body = await c.req.json<BuildPromptRequest>();

    if (!body.input?.trim()) {
      return c.json({ error: "input is required" }, 400);
    }
    if (!body.mode) {
      return c.json({ error: "mode is required" }, 400);
    }
    if (!body.platform) {
      return c.json({ error: "platform is required" }, 400);
    }

    const user = c.get("user") as { sub: string } | undefined;
    const userId = user?.sub ?? null;

    try {
      const result = await buildPrompt(body, userId);
      return c.json(result);
    } catch (err: any) {
      console.error("Builder error:", err?.message ?? err);
      return c.json({ error: err?.message ?? "AI generation failed. Please try again." }, 500);
    }
  }
);

// ─── POST /generate-all — all 6 platforms in one shot ─────────────────────────
// Uses the PromptEngineBuilder pipeline: idea → SceneJSON → per-engine prompt.
// Zero API calls, <10ms, replaces 6 parallel frontend requests.
router.post(
  "/generate-all",
  optionalAuth,
  engineRateLimit("build"),
  async (c) => {
    const body = await c.req.json<{
      idea: string
      style?: string
      mood?: string
    }>();

    if (!body.idea?.trim()) {
      return c.json({ error: "idea is required" }, 400);
    }

    try {
      // Combine idea + optional style/mood hints into one idea string
      const ideaParts = [body.idea.trim()]
      if (body.style) ideaParts.push(body.style)
      if (body.mood)  ideaParts.push(body.mood)
      const fullIdea = ideaParts.join(", ")

      const result = promptEngineBuilder.generateAllPrompts(fullIdea)
      return c.json({ ok: true, data: result })
    } catch (err: any) {
      console.error("Generate-all error:", err?.message ?? err);
      return c.json({ error: err?.message ?? "Generation failed" }, 500);
    }
  }
);

// ─── GET /engines — list available engine models ──────────────────────────────
router.get("/engines", (c) => {
  return c.json({ ok: true, data: promptEngineBuilder.listAvailableModels() });
});

// ─── GET /knowledge — all platforms knowledge overview ────────────────────────
router.get("/knowledge", (c) => {
  const ragFiles = getRAGFileList();
  const platforms = Object.values(PLATFORM_KNOWLEDGE).map((k) => ({
    platform:        k.platform,
    promptStructure: k.promptStructure,
    bestPractices:   k.bestPractices,
    avoid:           k.avoid,
    parameters:      k.parameters,
    styleKeywords:   k.styleKeywords,
    qualityModifiers: k.qualityModifiers,
    examplePrompts:  k.examplePrompts,
    source:          k.source,
    ragFiles:        ragFiles.find((r) => r.platform === k.platform)?.files ?? [],
  }));
  return c.json({ ok: true, data: platforms });
});

// ─── GET /knowledge/:platform — single platform knowledge ────────────────────
router.get("/knowledge/:platform", (c) => {
  const platform = c.req.param("platform").toLowerCase();
  const knowledge = PLATFORM_KNOWLEDGE[platform];

  if (!knowledge) {
    const valid = Object.keys(PLATFORM_KNOWLEDGE).join(", ");
    return c.json({ error: `Unknown platform. Valid: ${valid}` }, 404);
  }

  const ragFiles = getRAGFileList();
  const data = {
    ...knowledge,
    ragFiles: ragFiles.find((r) => r.platform === platform)?.files ?? [],
  };

  return c.json({ ok: true, data });
});

export default router;
