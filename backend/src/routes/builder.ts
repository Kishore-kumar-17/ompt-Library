import { Hono } from "hono";
import { buildPrompt } from "../engine/modules/builder.js";
import { promptEngineBuilder } from "../engine/engines/prompt-engine-builder.js";
import { PLATFORM_KNOWLEDGE } from "../engine/rag/knowledge.js";
import { getRAGFileList } from "../engine/rag/loader.js";
import { optionalAuth, engineRateLimit } from "../middleware/rateLimit.js";
import type { BuildPromptRequest, PromptMode } from "../engine/contracts.js";

const router = new Hono();

// The frontend builder page (Builder.tsx) posts its own shape — `idea` + `family`
// plus a grab-bag of enrichment fields — rather than the public contract's
// `input` + `mode`. Normalize here so contracts.ts stays the frozen public API
// and the frontend doesn't need to change.
interface FrontendBuildPayload {
  input?: string;
  mode?: PromptMode;
  idea?: string;
  family?: string;
  platform?: string;
  style?: string;
  mood?: string;
  aspect?: string;
  category?: string;
  subCategory?: string;
  audience?: string;
  palette?: string;
  pages?: string[];
  duration?: string;
  cameraMovement?: string;
  pacing?: string;
  soundDesign?: string;
  options?: BuildPromptRequest["options"];
}

const VALID_MODES: PromptMode[] = ["image", "video", "text", "code", "website"];

function normalizeBuildRequest(body: FrontendBuildPayload): BuildPromptRequest | { error: string } {
  const rawInput = body.input ?? body.idea;
  if (!rawInput?.trim()) return { error: "input is required" };

  const mode = body.mode ?? (body.family as PromptMode | undefined);
  if (!mode) return { error: "mode is required" };
  if (!VALID_MODES.includes(mode)) {
    return { error: `mode "${mode}" is not supported yet. Valid modes: ${VALID_MODES.join(", ")}` };
  }

  if (!body.platform) return { error: "platform is required" };

  // Fold the frontend's enrichment fields into the idea text so they aren't
  // silently dropped — the pipeline only reads BuildPromptRequest.input.
  const hints = [
    body.style && `style: ${body.style}`,
    body.mood && `mood: ${body.mood}`,
    body.aspect && `aspect ratio: ${body.aspect}`,
    body.category && `category: ${body.category}`,
    body.subCategory && `sub-category: ${body.subCategory}`,
    body.audience && `audience: ${body.audience}`,
    body.palette && `palette: ${body.palette}`,
    body.pages?.length && `pages: ${body.pages.join(", ")}`,
    body.duration && `duration: ${body.duration}`,
    body.cameraMovement && `camera movement: ${body.cameraMovement}`,
    body.pacing && `pacing: ${body.pacing}`,
    body.soundDesign && `sound design: ${body.soundDesign}`,
  ].filter(Boolean) as string[];
  const input = hints.length ? `${rawInput.trim()} (${hints.join("; ")})` : rawInput.trim();

  return {
    platform: body.platform as BuildPromptRequest["platform"],
    mode,
    input,
    category: body.category,
    options: body.options,
  };
}

// ─── POST /generate — single platform ─────────────────────────────────────────
router.post(
  "/generate",
  optionalAuth,
  engineRateLimit("build"),
  async (c) => {
    const rawBody = await c.req.json<FrontendBuildPayload>();
    const normalized = normalizeBuildRequest(rawBody);
    if ("error" in normalized) {
      return c.json({ error: normalized.error }, 400);
    }
    const body = normalized;

    const user = c.get("user") as { sub: string } | undefined;
    const userId = user?.sub ?? null;

    try {
      const result = await buildPrompt(body, userId);
      // The pipeline engine has no lock-layer/variable concept (that belonged to
      // the retired lock-engine) — send safe empty defaults so the frontend's
      // LockLayerPanel/VariablePanel (which assume these arrays always exist)
      // don't crash on undefined.
      return c.json({
        prompt: result.prompt,
        platform: result.metadata.platform,
        family: body.mode,
        tokensUsed: 0,
        categoryId: null,
        categoryLabel: null,
        lockSection: [],
        negativeLocks: [],
        variables: [],
        validation: null,
        finalAssembledText: result.prompt,
      });
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
