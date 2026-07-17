import { Hono } from "hono";
import { buildPrompt } from "../engine/modules/builder.js";
import { promptEngineBuilder } from "../engine/engines/prompt-engine-builder.js";
import { PLATFORM_KNOWLEDGE } from "../engine/rag/knowledge.js";
import { getRAGFileList } from "../engine/rag/loader.js";
import { optionalAuth, engineRateLimit } from "../middleware/rateLimit.js";
import { assembleFromText } from "../engine/lock-engine/index.js";
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
  lighting?: string;
  cameraAngle?: string;
  setting?: string;
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
    body.lighting && `lighting: ${body.lighting}`,
    body.cameraAngle && `camera/shot type: ${body.cameraAngle}`,
    body.setting && `setting: ${body.setting}`,
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
      // The pipeline engine has no lock-layer/variable concept of its own. For
      // the image family, run the real content-aware lock-engine (same one
      // /api/variables/expand uses) over the generated prompt text so the
      // frontend's LockLayerPanel reflects what was actually built, instead of
      // a category-generic template; other families still get safe empty
      // defaults. finalAssembledText stays the plain prompt — the lock/negative
      // text is rendered as its own panel, not appended into the copy text.
      // body.input has Builder's enrichment hints folded in as a trailing
      // "(style: ...; category: ...)" annotation (see normalizeBuildRequest) —
      // strip it back off before using it as the lock-engine's subject-fallback
      // title, or that annotation leaks into the Subject lock value verbatim.
      const cleanTitle = body.input.replace(/\s*\([^()]*\)\s*$/, "").trim();
      const assembled = body.mode === "image"
        ? assembleFromText({ text: result.prompt, category: body.category ?? "", platform: result.metadata.platform, title: cleanTitle })
        : null;
      return c.json({
        prompt: result.prompt,
        platform: result.metadata.platform,
        family: body.mode,
        tokensUsed: 0,
        categoryId: assembled?.categoryId ?? null,
        categoryLabel: assembled?.categoryLabel ?? null,
        lockSection: assembled?.lockSection ?? [],
        negativeLocks: assembled?.negativeLockSection ?? [],
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
