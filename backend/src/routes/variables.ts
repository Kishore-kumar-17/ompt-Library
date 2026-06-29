import { Hono } from "hono";
import Anthropic from "@anthropic-ai/sdk";
import { assembleFromText } from "../engine/index.js";

const router = new Hono();

/**
 * Variable layer — Option B "Regenerate with my values".
 *
 * Takes a filled Variable Brief (token → value) and re-expands it into a Layer-2
 * descriptive prompt with the enrichment recomputed for the new values (e.g. the
 * correct skin-tone hex for a new subject, palette hex for a new colour story), then
 * appends the engine lock layer + negative locks. Returns the same shape as the
 * Builder so the UI can swap it in directly.
 */
router.post("/expand", async (c) => {
  const body = await c.req.json<{
    category: string;
    platform: string;
    brief: Record<string, string>;
    title?: string;
  }>();

  if (!body.brief || Object.keys(body.brief).length === 0) {
    return c.json({ error: "brief is required" }, 400);
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return c.json({ error: "AI service not configured" }, 503);

  const platform = body.platform || "chatgpt";
  const briefLines = Object.entries(body.brief)
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `- ${k}: ${v.trim()}`)
    .join("\n");

  const system = `You are an expert image-prompt engineer. Expand a filled "Variable Brief" into a single professional, photorealistic DESCRIPTIVE prompt (Layer 2) for ${platform}.

Rules:
- Weave EVERY brief value into rich, photography-grade prose: subject with skin physics (subsurface scattering, specular highlights, natural texture), outfit fabric/details, setting, lighting, camera rig, and grade.
- Recompute enrichment to MATCH the brief's values: derive correct hex colour codes for the described subject's skin tone and for the colour palette (with rough percentage ratios), and use the named style reference.
- Honour the EXCLUDE value as an "Exclude: ..." clause.
- Do NOT output any lock block or "LOCK LAYER" — a standardized lock layer + negative locks are appended automatically.
- Output ONLY the descriptive prompt prose. No JSON, no headings, no commentary.`;

  const user = `Category: ${body.category || "unknown"}\n\nVariable Brief:\n${briefLines}`;

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1200,
      system,
      messages: [{ role: "user", content: user }],
    });
    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();

    const locks = body.category
      ? assembleFromText({ text, category: body.category, platform, title: body.title })
      : null;

    return c.json({
      prompt: text,
      platform,
      family: "image",
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
      categoryId: locks?.categoryId ?? null,
      categoryLabel: locks?.categoryLabel ?? null,
      lockSection: locks?.lockSection ?? [],
      negativeLocks: locks?.negativeLockSection ?? [],
      variables: locks?.variables ?? [],
      validation: locks?.validation ?? null,
      finalAssembledText: locks?.finalAssembledText ?? text,
    });
  } catch (err: any) {
    console.error("Variable expand error:", err?.message ?? err);
    return c.json({ error: "Regeneration failed. Please try again." }, 500);
  }
});

export default router;
