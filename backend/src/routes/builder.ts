import { Hono } from "hono";
import Anthropic from "@anthropic-ai/sdk";
import { assembleFromText } from "../engine/index.js";

const router = new Hono();

// ─── Platform formula specs (derived from formulas/) ─────────────────────────

const PLATFORM_FORMULAS: Record<string, string> = {
  chatgpt: `Platform: ChatGPT (DALL-E / GPT-4o image gen)
Word budget: 180-210 words.
Structure (in order):
1. Shot type + campaign/scene line
2. Subject description — detailed: form factor, material, color, finish, props
3. Composition — framing, subject placement, angle, negative space
4. Camera rig — body, lens, aperture, shutter, ISO
5. Grade — LUT, film emulation, grain, EV
6. Palette — 3-5 named colors with hex codes and percentages
7. References — 3-4 photographer or campaign references
8. Exclude — comma-separated list`,

  gemini: `Platform: Gemini
Word budget: 140-165 words (compact but complete).
Structure:
1. Shot type + campaign line
2. Subject description — compressed: key material, color, label text, props in one paragraph
3. Composition — framing + placement in one line
4. Camera + grade — single compressed line
5. Palette — hex + percentages single line
6. References — short name list
7. Exclude — comma-separated
Compression: Drop articles, compress camera to "Body Lens f/X 1/Xs ISO XX", grade to "LUT-name grain-N +/-EV".`,

  grok: `Platform: Grok
Word budget: 125-150 words (tightest compression).
Structure:
1. Single compact shot type + campaign line
2. Subject description — essential identifiers only, no explanatory phrases
3. Composition — minimal framing note
4. Camera + grade — bare minimum
5. Palette — hex + percentage only
6. References — surnames only
7. Exclude — short
Compression: Drop all articles, use slash-separated light "key az/alt/Kelvin", surnames only for refs.`,

  midjourney: `Platform: Midjourney
Word budget: 180-220 words (token-dense with :: separators).
Structure:
1. Shot type + subject description :: after opening phrase
2. Subject detail segments — each major element is its own :: segment
3. Composition segment — framing + placement
4. Camera rig segment — "Phase One XF IQ4 150MP Schneider 80mm LS f/8 1/125s ISO 50 tethered ::"
5. Grade segment — "Capture-One-LUT grain-N +/-EV ::"
6. Palette segment — "color #hex NN% ... palette ::"
7. References segment — "Firstname-Lastname Brand-name-style ::"
8. Parameter flags — "--ar X:Y --v 6.1 --stylize 0 --style raw --q 2 --no token1 token2"
Always end with --ar and --no flags.`,

  firefly: `Platform: Adobe Firefly
Word budget: 140-165 words (compact, commercially-safe).
Structure:
1. "editorial [shot type] [AR]" opener to signal commercial intent
2. Subject description — material, color, finish, label text, key props
3. Composition — framing + placement
4. Camera + grade — single compressed line (drop "tethered", "focus-stacked")
5. Palette — hex + percentage
6. References — surname-only for photographers, full brand name for campaigns
7. Exclude — comma-separated`,

  flux: `Platform: Flux
Word budget: 230-270 words (longest, most fully-elaborated).
Structure:
1. Shot type + campaign line — full sentence
2. "Subject: ..." — the most detailed description of all platforms, full narrative
3. "Composition: ..." — framing, placement, angle, negative space in full sentences
4. "Capture: ..." — camera body, lens, aperture, shutter, ISO
5. "Grade: ..." — LUT, film emulation, grain, EV
6. "Palette: ..." — named colors + hex + percentage
7. "References: ..." — 3-5 names/campaigns written out in full
8. "Exclude: ..." — comma-separated`,
};

const SHARED_FORMULA = `You are an expert image-prompt engineer.

CORE RULES:
- Tier awareness: PRODUCT (products/accessories/packaging/marketing), PEOPLE (portraits/fashion/social), ART (cultural/digital/traditional) — emphasize the right details per tier.
- Quantization: Avoid round numbers (use 48% not 50%, 47deg not 45deg, 1.52m not 1.5m, 5200K not 5000K). Exception: semantically meaningful rounds (AR 4:5, axis 0.50).
- Delete cargo-cult tokens: "8K ultra-sharp", "aesthetic", vague adjective stacks.
- Camera rig default: Phase One XF IQ4 150MP, Schneider 80mm LS, f/8, 1/125s, ISO 50 (adjust per subject).
- Palette: Always include 3-5 named colors with hex codes and percentages totaling ~100%.
- Exclude list: Always include relevant items to avoid (harsh specular, plastic sheen, visible seams, etc.).

CRITICAL — DO NOT output any lock block. No "**LOCKS — …**", no "**GEOMETRY/ORIENTATION/FRAMING/LIGHT/MATERIAL:**" headers, no ":: GEOMETRY/ORIENTATION" segments, no "X LOCK:" lines. Write ONLY the descriptive prompt (shot, subject, composition, camera, grade, palette, references, exclude). A standardized lock layer + negative locks are appended automatically by the system afterward.

VARIABLE LAYER (image prompts) — mark genuinely swappable content with [TOKEN] placeholders in UPPER_SNAKE brackets so the user can personalize the prompt. Use these canonical tokens when they apply: [BRAND], [PRODUCT], [COLOR], [TAGLINE], [SUBJECT], [MODEL], [LOCATION], [GARMENT], [STYLE], [THEME], [TEXT]. Only bracket nouns the user would realistically change (the brand, the product, the accent color, the subject) — never bracket structural or compositional wording, camera specs, or palette hex values. Use at most ~4 tokens. If nothing is swappable, use none.

For VIDEO prompts, write rich cinematic descriptions with:
- Camera movement (dolly, crane, steadicam, etc.)
- Lighting setup and mood
- Color grading references
- Duration and pacing notes
- Sound design suggestions
- Aspect ratio

For TEXT/CONTENT prompts, write structured AI instructions with:
- Clear role framing ("Act as...")
- Specific task breakdown
- Output format specification
- Tone and audience definition
- Constraints and quality criteria`;

// ─── Route ───────────────────────────────────────────────────────────────────

router.post("/generate", async (c) => {
  const body = await c.req.json<{
    idea: string;
    family: string;
    platform: string;
    style?: string;
    mood?: string;
    aspect?: string;
    category?: string;
  }>();

  if (!body.idea?.trim()) {
    return c.json({ error: "idea is required" }, 400);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return c.json({ error: "AI service not configured" }, 503);
  }

  const platformFormula = PLATFORM_FORMULAS[body.platform] ?? PLATFORM_FORMULAS.chatgpt;

  const systemPrompt = `${SHARED_FORMULA}

${platformFormula}

IMPORTANT: Output ONLY the final prompt text. No explanations, no markdown code fences, no commentary. Just the raw prompt ready to paste into ${body.platform}.`;

  const userMessage = buildUserMessage(body);

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    });

    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");

    // For image prompts with a known category, derive a lock layer + negative
    // locks from the generated text via the engine (no DB, pure assembly).
    const locks =
      body.family === "image" && body.category
        ? assembleFromText({
            text: text.trim(),
            category: body.category,
            platform: body.platform,
            title: body.idea,
          })
        : null;

    return c.json({
      prompt: text.trim(),
      platform: body.platform,
      family: body.family,
      tokensUsed: response.usage.input_tokens + response.usage.output_tokens,
      categoryId: locks?.categoryId ?? null,
      categoryLabel: locks?.categoryLabel ?? null,
      lockSection: locks?.lockSection ?? [],
      negativeLocks: locks?.negativeLockSection ?? [],
      variables: locks?.variables ?? [],
      validation: locks?.validation ?? null,
      finalAssembledText: locks?.finalAssembledText ?? text.trim(),
    });
  } catch (err: any) {
    console.error("Builder AI error:", err?.message ?? err);
    return c.json({ error: "AI generation failed. Please try again." }, 500);
  }
});

function buildUserMessage(body: {
  idea: string;
  family: string;
  platform: string;
  style?: string;
  mood?: string;
  aspect?: string;
}): string {
  const parts = [`Generate a ${body.family} prompt for ${body.platform}.`];
  parts.push(`Subject/idea: ${body.idea}`);
  if (body.style) parts.push(`Style: ${body.style}`);
  if (body.mood) parts.push(`Mood: ${body.mood}`);
  if (body.aspect) parts.push(`Aspect ratio: ${body.aspect}`);

  if (body.family === "image") {
    parts.push("Apply the v4.2 descriptive formula for the appropriate tier (PRODUCT, PEOPLE, or ART based on the subject). Include camera rig, grade, palette with hex codes, references, and exclude list. Do NOT include any lock block — output the descriptive prompt only.");
  } else if (body.family === "video") {
    parts.push("Write a rich cinematic video prompt with camera movement, lighting, color grading, duration, pacing, and sound design.");
  } else {
    parts.push("Write a structured AI instruction prompt with role framing, task breakdown, output format, tone definition, and constraints.");
  }

  return parts.join("\n");
}

export default router;
