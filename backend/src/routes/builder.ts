import { Hono } from "hono";
import Anthropic from "@anthropic-ai/sdk";
import { assembleFromText } from "../engine/index.js";
import { WEBSITE_FORMULA } from "../formulas/website-base.js";
import { WEBSITE_PLATFORM_FORMULAS } from "../formulas/website-platforms.js";

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

const IMAGE_FORMULA = `You are an expert image-prompt engineer.

CORE RULES:
- Tier awareness: PRODUCT (products/accessories/packaging/marketing), PEOPLE (portraits/fashion/social), ART (cultural/digital/traditional) — emphasize the right details per tier.
- Quantization: Avoid round numbers (use 48% not 50%, 47deg not 45deg, 1.52m not 1.5m, 5200K not 5000K). Exception: semantically meaningful rounds (AR 4:5, axis 0.50).
- Delete cargo-cult tokens: "8K ultra-sharp", "aesthetic", vague adjective stacks.
- Camera rig default: Phase One XF IQ4 150MP, Schneider 80mm LS, f/8, 1/125s, ISO 50 (adjust per subject).
- Palette: Always include 3-5 named colors with hex codes and percentages totaling ~100%.
- Exclude list: Always include relevant items to avoid (harsh specular, plastic sheen, visible seams, etc.).

CRITICAL — DO NOT output any lock block. No "**LOCKS — …**", no "**GEOMETRY/ORIENTATION/FRAMING/LIGHT/MATERIAL:**" headers, no ":: GEOMETRY/ORIENTATION" segments, no "X LOCK:" lines. Write ONLY the descriptive prompt (shot, subject, composition, camera, grade, palette, references, exclude). A standardized lock layer + negative locks are appended automatically by the system afterward.

VARIABLE LAYER — mark genuinely swappable content with [TOKEN] placeholders in UPPER_SNAKE brackets so the user can personalize the prompt. Use these canonical tokens when they apply: [BRAND], [PRODUCT], [COLOR], [TAGLINE], [SUBJECT], [MODEL], [LOCATION], [GARMENT], [STYLE], [THEME], [TEXT]. Only bracket nouns the user would realistically change (the brand, the product, the accent color, the subject) — never bracket structural or compositional wording, camera specs, or palette hex values. Use at most ~4 tokens. If nothing is swappable, use none.`;

// ─── Video system prompt ──────────────────────────────────────────────────────

const VIDEO_FORMULA = `You are an expert cinematic video-prompt engineer specializing in AI video generation.

CORE RULES:
- Write rich, production-grade video prompts optimized for AI video generators.
- Every prompt must specify: camera movement, lighting, color grade, pacing, and sound design.
- Quantization: Avoid round numbers (use 48fps not 50fps, 4.7s not 5s, 3200K not 3000K). Exception: standard frame rates (24fps, 30fps, 60fps) and standard durations (5s, 15s).
- Delete cargo-cult tokens: "ultra-realistic", "cinematic masterpiece", vague adjective stacks.
- Palette: Include 3-5 dominant colors with hex codes for the color grade.
- Exclude list: Always include items to avoid (jump cuts, flickering, morphing artifacts, text overlays, watermarks).

CAMERA MOVEMENT VOCABULARY:
- Static/locked-off, slow dolly in/out, lateral tracking, crane up/down, steadicam orbit
- Whip pan, rack focus pull, push-in, pull-back reveal, drone ascent/descent
- Handheld with stabilization, Dutch angle drift, parallax slide

STRUCTURE — write prompts in this order:
1. Opening shot description — what we see in frame one
2. Subject & action — who/what, movement, expression, interaction
3. Camera movement — specific rig and motion path
4. Lighting — key/fill/rim setup, practical lights, time of day, color temperature
5. Color grade — LUT reference, contrast ratio, saturation level, film stock emulation
6. Pacing & duration — beat timing, cut rhythm, total duration
7. Sound design — ambient bed, SFX hits, music genre/tempo, dialogue notes
8. Exclude — artifacts and elements to avoid

VARIABLE LAYER — mark swappable content with [TOKEN] placeholders. Canonical tokens: [SUBJECT], [LOCATION], [ACTION], [PRODUCT], [BRAND], [COLOR], [MOOD_TONE]. Use at most ~4 tokens.`;

// ─── Video platform formulas ──────────────────────────────────────────────────

const VIDEO_PLATFORM_FORMULAS: Record<string, string> = {
  veo: `Platform: Google Veo
Word budget: 200-250 words.
Structure: Full narrative sentences. Veo excels with natural language descriptions.
- Open with the scene setting and atmosphere
- Describe subject action as a continuous flow
- Camera movement as a sentence: "The camera slowly dollies forward..."
- Include lighting and time of day naturally in the prose
- End with color/mood summary and aspect ratio
- Specify duration explicitly: "Duration: Xs"
Veo-specific: Favors photorealistic descriptions, responds well to film director references (Villeneuve, Deakins, Lubezki). Avoid parameter flags.`,

  kling: `Platform: Kling AI
Word budget: 150-180 words (concise, directive).
Structure:
1. Scene + subject in opening line
2. Action sequence — frame-by-frame if complex
3. Camera: specify movement type and speed
4. Lighting: practical + ambient in one line
5. Color grade: single reference (e.g., "Kodak Vision3 500T")
6. Duration + aspect ratio at end
Kling-specific: Excels at human motion and facial expression. Specify pose transitions. Keep prose tight — Kling performs better with direct instructions than flowery descriptions.`,

  seedance: `Platform: Seedance
Word budget: 160-200 words.
Structure:
1. Opening frame description
2. Subject + motion choreography
3. Camera movement with speed qualifier (slow/medium/fast)
4. Lighting setup — key + fill + color temp
5. Grade reference + palette (3 hex colors)
6. Sound/music cue (one line)
7. Duration + AR
Seedance-specific: Strong at dance, fluid motion, and rhythmic content. Specify beat-sync points if musical. Include transition style between scenes.`,

  higgsfield: `Platform: Higgsfield
Word budget: 140-170 words (punchy, visual-first).
Structure:
1. Hero shot — single vivid sentence
2. Subject detail — appearance, wardrobe, expression
3. Action — movement with directional cues (left-to-right, toward camera)
4. Camera — movement type + lens feel (wide/tight/macro)
5. Mood — lighting + color in one combined line
6. Duration + format
Higgsfield-specific: Optimized for social-media-ready clips. Emphasize vertical framing for Reels/TikTok when aspect is 9:16. Keep descriptions punchy and visual.`,

  pika: `Platform: Pika Labs
Word budget: 120-150 words (shortest, most direct).
Structure:
1. Scene description — what's in frame
2. Motion — what moves and how
3. Camera — movement type (keep simple: pan, zoom, static)
4. Style reference — one filmmaker or visual style
5. Mood — single adjective + color tone
6. -neg: items to exclude (Pika negative prompt syntax)
Pika-specific: Works best with simple, clear motion instructions. One primary action per prompt. Avoid complex multi-subject choreography. Use "-neg" prefix for negative prompts instead of "Exclude:".`,
};

// Website formulas imported from ../formulas/website-base.ts and ../formulas/website-platforms.ts

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
    subCategory?: string;
    audience?: string;
    palette?: string;
    pages?: string[];
    // Video-specific
    duration?: string;
    cameraMovement?: string;
    pacing?: string;
    soundDesign?: string;
  }>();

  if (!body.idea?.trim()) {
    return c.json({ error: "idea is required" }, 400);
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return c.json({ error: "AI service not configured" }, 503);
  }

  const isWebsite = body.family === "website";
  const isVideo   = body.family === "video";

  let systemPrompt: string;
  let userMessage: string;
  let maxTokens = 1024;

  if (isWebsite) {
    const wpf = WEBSITE_PLATFORM_FORMULAS[body.platform] ?? WEBSITE_PLATFORM_FORMULAS.lovable;
    systemPrompt = `${WEBSITE_FORMULA}\n\nPLATFORM-SPECIFIC FORMATTING:\n${wpf}\n\nIMPORTANT: Output ONLY the final prompt text. No explanations, no markdown code fences, no commentary.`;
    userMessage = buildWebsiteUserMessage(body);
    maxTokens = 4096;
  } else if (isVideo) {
    const vpf = VIDEO_PLATFORM_FORMULAS[body.platform] ?? VIDEO_PLATFORM_FORMULAS.veo;
    systemPrompt = `${VIDEO_FORMULA}\n\n${vpf}\n\nIMPORTANT: Output ONLY the final prompt text. No explanations, no markdown code fences, no commentary. Just the raw video prompt ready to paste into ${body.platform}.`;
    userMessage = buildVideoUserMessage(body);
  } else {
    const platformFormula = PLATFORM_FORMULAS[body.platform] ?? PLATFORM_FORMULAS.chatgpt;
    systemPrompt = `${IMAGE_FORMULA}\n\n${platformFormula}\n\nIMPORTANT: Output ONLY the final prompt text. No explanations, no markdown code fences, no commentary. Just the raw prompt ready to paste into ${body.platform}.`;
    userMessage = buildUserMessage(body);
  }

  try {
    const client = new Anthropic({ apiKey });
    const response = await client.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
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

function buildWebsiteUserMessage(body: {
  idea: string;
  platform: string;
  category?: string;
  subCategory?: string;
  style?: string;
  mood?: string;
  palette?: string;
  audience?: string;
  pages?: string[];
}): string {
  const parts = [`Generate a website prompt for ${body.platform}.`];
  parts.push(`Business/idea: ${body.idea}`);
  if (body.category) parts.push(`Website type: ${body.category}`);
  if (body.subCategory) parts.push(`Subcategory: ${body.subCategory}`);
  if (body.style) parts.push(`Visual style / aesthetic direction: ${body.style}`);
  if (body.mood) parts.push(`Mood/tone: ${body.mood}`);
  if (body.palette) parts.push(`Color palette direction (derive exact hex codes from this): ${body.palette}`);
  if (body.audience) parts.push(`Target audience: ${body.audience}`);
  if (body.pages?.length) parts.push(`Key pages to include: ${body.pages.join(", ")}`);
  parts.push("Invent a fictional brand name that fits this business. Follow the 10-section structure exactly. Make it production-ready and specific to this business.");
  return parts.join("\n");
}

function buildVideoUserMessage(body: {
  idea: string;
  platform: string;
  style?: string;
  mood?: string;
  aspect?: string;
  category?: string;
  duration?: string;
  cameraMovement?: string;
  pacing?: string;
  soundDesign?: string;
}): string {
  const parts = [`Generate a video prompt for ${body.platform}.`];
  parts.push(`Scene/idea: ${body.idea}`);
  if (body.category) parts.push(`Category: ${body.category}`);
  if (body.style) parts.push(`Visual style: ${body.style}`);
  if (body.mood) parts.push(`Mood: ${body.mood}`);
  if (body.aspect) parts.push(`Aspect ratio: ${body.aspect}`);
  if (body.duration) parts.push(`Target duration: ${body.duration}`);
  if (body.cameraMovement) parts.push(`Camera movement: ${body.cameraMovement}`);
  if (body.pacing) parts.push(`Pacing: ${body.pacing}`);
  if (body.soundDesign) parts.push(`Sound design: ${body.soundDesign}`);
  parts.push("Follow the 8-section video structure exactly. Output only the raw video prompt.");
  return parts.join("\n");
}

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
  } else {
    parts.push("Write a structured AI instruction prompt with role framing, task breakdown, output format, tone definition, and constraints.");
  }

  return parts.join("\n");
}

export default router;
