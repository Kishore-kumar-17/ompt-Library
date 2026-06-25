import { Hono } from "hono";
import Anthropic from "@anthropic-ai/sdk";
import { assembleFromText } from "../engine/index.js";

const router = new Hono();

// ─── Platform formula specs (derived from formulas/) ─────────────────────────

const PLATFORM_FORMULAS: Record<string, string> = {
  chatgpt: `Platform: ChatGPT (DALL-E / GPT-4o image gen)
Word budget: 200-225 words.
Structure (in order):
1. Shot type + campaign/scene line
2. Subject description — detailed: form factor, material, color, finish, props
3. Lock block (inline, bolded) — use "**LOCKS — GEOMETRY:**", "**ORIENTATION:**", "**FRAMING:**", "**LIGHT:**", "**MATERIAL:**" (or CLOTHING for people)
4. Camera rig — body, lens, aperture, shutter, ISO
5. Grade — LUT, film emulation, grain, EV
6. Palette — 3-5 named colors with hex codes and percentages
7. References — 3-4 photographer or campaign references
8. Exclude — comma-separated list

Lock block format:
**LOCKS — GEOMETRY:** <content>. **ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **MATERIAL:** <content>.

For PEOPLE tier (no GEOMETRY/MATERIAL; CLOTHING added):
**LOCKS — ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **CLOTHING:** <content>.

For ART tier:
**LOCKS — ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>.`,

  gemini: `Platform: Gemini
Word budget: 155-180 words (compact but complete).
Structure:
1. Shot type + campaign line (shorter than ChatGPT)
2. Subject description — compressed: key material, color, label text, props in one paragraph
3. Lock block (inline, bolded — NO "LOCKS —" prefix)
4. Camera + grade — single compressed line
5. Palette — hex + percentages single line
6. References — short name list
7. Exclude — comma-separated

Lock format: **GEOMETRY:** <content>. **ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **MATERIAL:** <content>.
Compression: Drop articles, compress camera to "Body Lens f/X 1/Xs ISO XX", grade to "LUT-name grain-N +/-EV".`,

  grok: `Platform: Grok
Word budget: 140-165 words (tightest compression).
Structure:
1. Single compact shot type + campaign line
2. Subject description — essential identifiers only, no explanatory phrases
3. Lock block (inline, bolded) — maximally compressed values
4. Camera + grade — bare minimum
5. Palette — hex + percentage only
6. References — surnames only
7. Exclude — short

Lock format: **GEOMETRY:** <compressed>. **ORIENTATION:** <compressed>. **FRAMING:** <compressed>. **LIGHT:** <compressed>. **MATERIAL:** <compressed>.
Compression: Drop all articles, use slash-separated light "key az/alt/Kelvin", surnames only for refs.`,

  midjourney: `Platform: Midjourney
Word budget: 210-250 words (token-dense with :: separators).
Structure:
1. Shot type + subject description :: after opening phrase
2. Subject detail segments — each major element is its own :: segment
3. Lock block segments — one :: segment per lock type, values in hyphenated form
4. Camera rig segment — "Phase One XF IQ4 150MP Schneider 80mm LS f/8 1/125s ISO 50 tethered ::"
5. Grade segment — "Capture-One-LUT grain-N +/-EV ::"
6. Palette segment — "color #hex NN% ... palette ::"
7. References segment — "Firstname-Lastname Brand-name-style ::"
8. Parameter flags — "--ar X:Y --v 6.1 --stylize 0 --style raw --q 2 --no token1 token2"

Lock format (hyphenated tokens inside :: segments):
:: GEOMETRY <hyphenated-values> :: ORIENTATION <hyphenated-values> :: FRAMING <hyphenated-values> :: LIGHT <hyphenated-values> :: MATERIAL <hyphenated-values> ::

Hyphenation: spaces become hyphens inside values, degrees stay attached (90°), ratios as-is (1.23:1).
Always end with --ar and --no flags.`,

  firefly: `Platform: Adobe Firefly
Word budget: 155-180 words (compact, commercially-safe).
Structure:
1. "editorial [shot type] [AR]" opener to signal commercial intent
2. Subject description — material, color, finish, label text, key props
3. Lock block (inline, bolded — no "LOCKS —" prefix)
4. Camera + grade — single compressed line (drop "tethered", "focus-stacked")
5. Palette — hex + percentage
6. References — surname-only for photographers, full brand name for campaigns
7. Exclude — comma-separated

Lock format: **GEOMETRY:** <content>. **ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **MATERIAL:** <content>.`,

  flux: `Platform: Flux
Word budget: 255-285 words (longest, most fully-elaborated).
Structure:
1. Shot type + campaign line — full sentence
2. "Subject: ..." — the most detailed description of all platforms, full narrative
3. Lock block — full sentences, bolded headers ending in "LOCK"
4. "Capture: ..." — camera body, lens, aperture, shutter, ISO
5. "Grade: ..." — LUT, film emulation, grain, EV
6. "Palette: ..." — named colors + hex + percentage
7. "References: ..." — 3-5 names/campaigns written out in full
8. "Exclude: ..." — comma-separated

Lock format (full sentences):
**GEOMETRY LOCK:** <full sentence>. **ORIENTATION LOCK:** <full sentence>. **FRAMING LOCK:** <full sentence>. **LIGHT LOCK:** <full sentence>. **MATERIAL LOCK:** <full sentence>.

Expand abbreviated lock values into full English: "lens height 0.92m" -> "camera lens height 0.92m positioned at the tote mid-body".`,
};

const SHARED_FORMULA = `You are an expert prompt engineer using the Pro Formula v4.2 system.

CORE RULES:
- The 10 invariants must be followed: anchor phrase, 5+ hex codes with %, identical camera rig, identical lighting rig, identical exclude list, typography consistency, skin physics on faces, consistent canvas AR, Object Geometry Lock, Orientation+Framing+Light-direction Lock.
- Tier assignment: PRODUCT tier (geometry+orientation+framing+light+material locks) for products/accessories/packaging/marketing. PEOPLE tier (orientation+framing+light+clothing locks) for portraits/fashion/social. ART tier (orientation+framing+light locks) for cultural/digital/traditional art.
- Quantization: Avoid round numbers (use 48% not 50%, 47deg not 45deg, 1.52m not 1.5m, 5200K not 5000K). Exception: semantically meaningful rounds (AR 4:5, axis 0.50).
- Delete cargo-cult tokens: "8K ultra-sharp", "aesthetic", vague adjective stacks. Lock block is authoritative; prose is atmosphere.
- Camera rig default: Phase One XF IQ4 150MP, Schneider 80mm LS, f/8, 1/125s, ISO 50 (adjust per subject).
- Palette: Always include 3-5 named colors with hex codes and percentages totaling ~100%.
- Exclude list: Always include relevant items to avoid (harsh specular, plastic sheen, visible seams, etc.).

For VIDEO prompts, do NOT use the lock block system. Instead write rich cinematic descriptions with:
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
      validation: locks?.validation ?? null,
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
    parts.push("Apply the full v4.2 Pro Formula with appropriate tier locks (PRODUCT, PEOPLE, or ART based on the subject). Include camera rig, grade, palette with hex codes, references, and exclude list.");
  } else if (body.family === "video") {
    parts.push("Write a rich cinematic video prompt with camera movement, lighting, color grading, duration, pacing, and sound design.");
  } else {
    parts.push("Write a structured AI instruction prompt with role framing, task breakdown, output format, tone definition, and constraints.");
  }

  return parts.join("\n");
}

export default router;
