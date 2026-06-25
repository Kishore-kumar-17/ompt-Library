import { Hono } from "hono";
import Anthropic from "@anthropic-ai/sdk";
import { assembleFromText } from "../engine/index.js";

const router = new Hono();

// ─── Platform-specific improvement instructions ──────────────────────────────

const PLATFORM_RULES: Record<string, string> = {
  midjourney: `Midjourney improvements:
- Convert to :: weight-break format with hyphenated tokens
- Tighten composition: framing, subject placement, angle, negative space
- Add camera rig segment: "Phase One XF IQ4 150MP Schneider 80mm LS f/8 1/125s ISO 50 tethered ::"
- Add grade segment: "Capture-One-LUT grain-N +/-EV ::"
- Add palette with hex codes and percentages
- Add reference photographers/brands
- End with --ar X:Y --v 6.1 --stylize 0 --style raw --q 2 --no <excludes>
- Delete cargo-cult tokens: "8K ultra-sharp", "aesthetic"
- Word budget: 180-220 words`,

  flux: `Flux improvements:
- Expand into the longest, most narrative version with full sentences
- Use "Subject: ..." opener for description
- Add "Composition: ..." line — framing, placement, angle, negative space
- Add "Capture: ..." line with camera body, lens, aperture, shutter, ISO
- Add "Grade: ..." line with LUT, film emulation, grain, EV
- Add "Palette: ..." with named colors + hex + percentages
- Add "References: ..." with 3-5 full names
- Add "Exclude: ..." comma-separated
- Word budget: 230-270 words`,

  firefly: `Firefly improvements:
- Start with "editorial [shot type] [AR]" to signal commercial intent
- Tighten composition: framing + placement
- Add compressed camera + grade line (drop "tethered", "focus-stacked")
- Add palette with hex + percentages
- Add references (surname-only for photographers)
- Add exclude list
- Word budget: 140-165 words`,

  chatgpt: `ChatGPT improvements:
- Tighten composition: framing, subject placement, angle, negative space
- Add Camera: line with full rig details
- Add Grade: line with LUT, film emulation, grain, EV
- Add Palette: with named colors, hex codes, percentages
- Add References: with 3-4 photographer/campaign names
- Add Exclude: comma-separated
- Word budget: 180-210 words`,

  gemini: `Gemini improvements:
- Tighten composition: framing + placement in one line
- Compress camera + grade to single line
- Add palette with hex + percentages
- Add short reference list
- Add exclude list
- Drop articles and compress where possible
- Word budget: 140-165 words`,

  grok: `Grok improvements:
- Maximum compression — tightest word budget
- Minimal composition note (framing + placement)
- Use slash-separated light notation: key az/alt/Kelvin
- Camera + grade on one bare line
- Palette: hex + percentage only
- References: surnames only
- Short exclude list
- Word budget: 125-150 words`,
};

// ─── Route ───────────────────────────────────────────────────────────────────

router.post("/improve", async (c) => {
  const body = await c.req.json<{
    prompt: string;
    platform: string;
    family?: string;
  }>();

  if (!body.prompt?.trim()) {
    return c.json({ error: "prompt is required" }, 400);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return c.json({ error: "AI service not configured" }, 503);
  }

  const family = body.family ?? detectFamily(body.prompt, body.platform);
  const platformRule = PLATFORM_RULES[body.platform] ?? PLATFORM_RULES.chatgpt;

  const systemPrompt = buildSystemPrompt(family, platformRule, body.platform);

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1500,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: `Improve this ${body.platform} prompt:\n\n${body.prompt}`,
        },
      ],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    // Parse the response — expect JSON with improved prompt + changes (+ category)
    const parsed = parseResponse(text);

    // For image prompts, derive a lock layer + negative locks from the improved
    // text using the category the model classified.
    const locks =
      family === "image" && parsed.category && parsed.category !== "none"
        ? assembleFromText({
            text: parsed.improved,
            category: parsed.category,
            platform: body.platform,
          })
        : null;

    return c.json({
      improved: parsed.improved,
      changes: parsed.changes,
      platform: body.platform,
      family,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
      categoryId: locks?.categoryId ?? null,
      categoryLabel: locks?.categoryLabel ?? null,
      lockSection: locks?.lockSection ?? [],
      negativeLocks: locks?.negativeLockSection ?? [],
      validation: locks?.validation ?? null,
      finalAssembledText: locks?.finalAssembledText ?? parsed.improved,
    });
  } catch (err: any) {
    console.error("Improver AI error:", err?.message ?? err);
    return c.json({ error: "AI improvement failed. Please try again." }, 500);
  }
});

function detectFamily(prompt: string, platform: string): string {
  const p = prompt.toLowerCase();
  if (["midjourney", "flux", "firefly"].includes(platform)) return "image";
  if (/\b(video|cinematic|footage|clip|scene|animation|motion)\b/.test(p)) return "video";
  if (/\b(image|photo|picture|portrait|render|illustration|draw|paint)\b/.test(p)) return "image";
  return "text";
}

function buildSystemPrompt(family: string, platformRule: string, platform: string): string {
  const imageRules = `You are an expert prompt engineer using the Pro Formula v4.2 system.

Your job is to take a weak/basic prompt and transform it into a professional v4.2 prompt.

CORE RULES:
- Apply the correct tier: PRODUCT (products/packaging/marketing), PEOPLE (portraits/fashion/social), ART (cultural/digital/traditional)
- Tighten composition: framing, subject placement, angle, negative space
- Quantization: Use non-round numbers (48% not 50%, 47deg not 45deg, 1.52m not 1.5m, 5200K not 5000K)
- Add camera rig, grade, palette (3-5 colors with hex + percentages), references, exclude list
- Delete cargo-cult tokens: "8K ultra-sharp", "aesthetic", vague adjective stacks

CRITICAL — do NOT output any lock block (no "**LOCKS — …**", no "GEOMETRY/ORIENTATION/FRAMING/LIGHT/MATERIAL:" headers, no ":: GEOMETRY" segments, no "X LOCK:" lines). Improve ONLY the descriptive prompt; a standardized lock layer + negative locks are appended automatically afterward.

${platformRule}`;

  const videoRules = `You are an expert video prompt engineer.

Transform the weak prompt into a professional cinematic video prompt with:
- Detailed camera movement (dolly, crane, steadicam, tracking)
- Lighting setup and mood description
- Color grading references
- Duration and pacing notes
- Sound design suggestions
- Aspect ratio specification

${platformRule}`;

  const textRules = `You are an expert text/content prompt engineer.

Transform the weak prompt into a structured, high-quality AI instruction with:
- Clear role framing ("Act as...")
- Specific task breakdown with steps
- Output format specification
- Tone and audience definition
- Constraints and quality criteria
- Examples if helpful`;

  let rules: string;
  if (family === "image") rules = imageRules;
  else if (family === "video") rules = videoRules;
  else rules = textRules;

  return `${rules}

RESPONSE FORMAT: You MUST respond with valid JSON only. No markdown, no code fences, no extra text.
{
  "improved": "the full improved prompt text here",
  "category": "for IMAGE prompts, the single best-fit category id from: people-portraits, product-ecommerce, fashion-apparel, marketing-ads, art-illustration, trending-viral, social-media. For non-image prompts use: none",
  "changes": [
    {"label": "description of change 1", "applied": true},
    {"label": "description of change 2", "applied": true},
    {"label": "description of check that was already good", "applied": false}
  ]
}

The "changes" array should list 4-8 specific improvements made (applied: true) or checks that passed (applied: false).
The "improved" field must contain ONLY the final prompt — no explanations, no code fences.`;
}

function parseResponse(text: string): {
  improved: string;
  changes: { label: string; applied: boolean }[];
  category?: string;
} {
  // Try to extract JSON from the response
  const cleaned = text.replace(/```json?\s*/g, "").replace(/```\s*/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (parsed.improved && Array.isArray(parsed.changes)) {
      return parsed;
    }
  } catch {
    // Try to find JSON object in the text
    const jsonMatch = cleaned.match(/\{[\s\S]*"improved"[\s\S]*"changes"[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const parsed = JSON.parse(jsonMatch[0]);
        if (parsed.improved && Array.isArray(parsed.changes)) {
          return parsed;
        }
      } catch { /* fall through */ }
    }
  }

  // Fallback: treat entire text as the improved prompt
  return {
    improved: text.trim(),
    changes: [
      { label: "Applied professional prompt structure", applied: true },
      { label: "Enhanced with platform-specific formatting", applied: true },
    ],
  };
}

export default router;
