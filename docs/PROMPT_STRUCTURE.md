# PromptVault — Full Prompt Structure Reference

> The canonical specification of every layer, category, platform, and option the
> Builder/Improver/Library use to assemble prompts. This is the single source of
> truth for "what a prompt is made of" on this website.

---

## 1. The 4-Layer Canonical Structure

Every image prompt on the site is built from four stacked layers. The first two are
**creative** (they vary per user/platform); the last two are **engineered** (clean,
category-driven, and identical across every AI platform so the output stays consistent).

```
┌─ LAYER 1 ── VARIABLE BRIEF ──────────── human-facing form, plain values
│              [SUBJECT] [OUTFIT] [SETTING] [PALETTE] [MOOD] …
│
├─ LAYER 2 ── DESCRIPTIVE PROMPT ───────── rich photography prose (per platform)
│              "Professional executive portrait… subsurface scattering…"
│
├─ LAYER 3 ── LOCK LAYER ───────────────── category locks (platform-INVARIANT)
│              LOCK 01 — SUBJECT: … / LOCK 02 — EXPRESSION: … …
│
└─ LAYER 4 ── NEGATIVE LOCKS ───────────── standardized exclusions (invariant)
               - No plastic skin. - No distorted hands. …
```

| Layer | Role | Varies by platform? | Source |
|---|---|---|---|
| 1 — Variable Brief | What the user wants (plain words) | No | `engine/variables.ts` |
| 2 — Descriptive Prompt | How it's described (photography language) | **Yes** | `routes/builder.ts`, library data |
| 3 — Lock Layer | What must NOT change (consistency) | No | `engine/locks/*.ts` |
| 4 — Negative Locks | Artefacts to avoid | No | `engine/negatives/*.ts` |

**Golden rule:** tokens (`[TOKEN]`) live **only in Layer 1/2**. Layers 3 & 4 never carry
tokens — that's what keeps the design identical across ChatGPT, Midjourney, Flux, etc.

---

## 2. Layer 1 — Variable Brief

The human-facing input form. Named placeholders the user fills with plain values; no
prompting knowledge required. Each token is **typed** so the UI renders the right input.

### Token dictionary

| Token | Input type | Controls |
|---|---|---|
| `[SUBJECT]` | text | Person: age, skin, hair, expression, features |
| `[OUTFIT]` | text | Clothing, fabric, colour codes, details |
| `[SETTING]` | text | Location, backdrop, environment |
| `[PALETTE]` | text | Dominant colours (names + hex + ratios) |
| `[MOOD]` | select | Emotional tone / atmosphere |
| `[STYLE_REFERENCE]` | text | Named photographer or publication |
| `[EXCLUDE]` | text | Artefacts / features to avoid |
| `[BRAND]` | text | Brand name (marketing) |
| `[PRODUCT]` | image | The product worn/held/sold |
| `[COLOR]` | color | Single accent / brand colour |
| `[TAGLINE]` | text | Short campaign tagline |
| `[GARMENT]` | text | Specific clothing item (fashion) |
| `[MODEL]` | text | Model description |
| `[LOCATION]` | text | Place / set |
| `[STYLE]` | text | Art / visual style descriptor |
| `[THEME]` | text | Overall theme / topic |
| `[TEXT]` | text | Headline / on-image copy |
| `[LOGO]` | image | Brand logo |
| `[SEASON]` | select | Spring / Summer / Autumn / Winter |

**Input types:** `text` (input/textarea) · `color` (named text + swatch picker) ·
`image` (description or reference upload) · `select` (dropdown).

### Per-category token sets

The Builder/templatizer exposes these tokens by category (auto-detect still picks up any
extra `[TOKEN]` in the text and types it as a generic text field):

| Category | Tokens exposed |
|---|---|
| Marketing & Ads | `BRAND, PRODUCT, COLOR, TAGLINE` |
| Product & Ecommerce | `PRODUCT, BRAND, COLOR, SETTING` |
| Fashion & Apparel | `SUBJECT, OUTFIT, SETTING, PALETTE, MOOD, STYLE_REFERENCE, EXCLUDE` |
| People & Portraits | `SUBJECT, OUTFIT, SETTING, PALETTE, MOOD, STYLE_REFERENCE, EXCLUDE` |
| Art & Illustration | `SUBJECT, STYLE, PALETTE, THEME` |
| Trending & Viral | `SUBJECT, THEME, COLOR, TEXT` |
| Social Media | `BRAND, SUBJECT, COLOR, TEXT` |

Two editing modes (hybrid):
- **Instant (literal):** changing a field swaps that span in place — no AI, free, offline.
- **Regenerate with my values:** re-expands the descriptive via AI so coupled detail
  (skin-tone hex, palette hex) recomputes for the new values. (`POST /api/variables/expand`)

---

## 3. Layer 2 — Descriptive Prompt

Expands the filled brief into full photography-grade prose. This is what activates the
model's trained vocabulary. It is the **only** layer that changes per platform.

### What Layer 2 adds over Layer 1

| Element | Example | Why it works |
|---|---|---|
| Skin physics | subsurface scattering at ears & nasal bridge | simulates real light through skin |
| Specular detail | specular highlight on T-zone | realistic oil/moisture sheen |
| Hex colour codes | `#7B4F2E`, `#1B2A4A` | exact values, not "navy" |
| Colour ratios | navy 45%, white 35%, brown 15% | controls palette balance |
| Named style refs | Annie Leibovitz, Vogue editorial | pulls a known visual vocabulary |
| Quality anchors | 8K, photorealistic, sharp focus | high-fidelity output mode |
| Photography terms | catchlight, cyclorama, bokeh | activates studio-photography concepts |
| Explicit exclusions | Exclude: ring flash, plastic skin | prevents common AI artefacts |

### Per-platform formulas (Layer 2 shape)

Each platform gets a tuned variant of the same descriptive content:

| Platform | Word budget | Shape |
|---|---|---|
| **ChatGPT** | 180–210 | Shot type → subject → composition → camera rig → grade → palette (hex %) → refs → exclude |
| **Gemini** | 140–165 | Compressed: subject paragraph, one-line composition, single camera+grade line, hex palette, short refs |
| **Grok** | 125–150 | Tightest: essential identifiers, slash light notation `key az/alt/Kelvin`, surnames-only refs |
| **Midjourney** | 180–220 | `::` weight-break segments; camera rig segment; grade segment; palette segment; ends `--ar X:Y --v 6.1 --style raw --no …` |
| **Firefly** | 140–165 | `editorial [shot] [AR]` opener; compressed camera+grade; hex palette; surname refs; exclude list |
| **Flux** | 230–270 | Longest, narrative: `Subject:` / `Composition:` / `Capture:` / `Grade:` / `Palette:` / `References:` / `Exclude:` |

Supported platform IDs: `chatgpt, gemini, grok, midjourney, firefly, flux, ideogram,
seedream, recraft`.

Standard rules baked into every descriptive prompt:
- **Quantization:** non-round numbers (48% not 50%, 47° not 45°, 5200K not 5000K).
- **Camera default:** Phase One XF IQ4 150MP, Schneider 80mm LS, f/8, 1/125s, ISO 50.
- **Palette:** 3–5 named colours with hex + percentages totalling ~100%.
- **No cargo-cult tokens:** drop "8K ultra-sharp", "aesthetic", vague adjective stacks.
- **No lock block in Layer 2** — the engine appends Layers 3 & 4 automatically.

---

## 4. Layer 3 — Lock Layer (per category)

The clean, platform-invariant locks that hold the design steady. **Mandatory** locks must
resolve; **optional** locks only appear when the prompt warrants them.

### People & Portraits
- **Mandatory:** Subject · Expression · Background · Composition · Lighting · Style DNA
- **Optional:** Wardrobe · Pose · Gaze · Hand Position · Head Position · Crop · Camera Angle · Material · Surface · Palette

### Fashion & Apparel — *protect the garment first, model second*
- **Mandatory:** Model · Garment · Garment Color · Composition · Lighting · Fabric · Style DNA
- **Optional:** Garment Fit · Pose · Garment Visibility · Hand Position · Background · Expression · Gaze · Crop · Palette

### Product & Ecommerce
- **Mandatory:** Product · Orientation · Scale · Position · Composition · Background · Lighting · Material · Brand Style
- **Optional:** Visibility · Surface · Palette · Props · Camera Angle · Crop

### Marketing & Ads — *protect campaign message + commercial composition*
- **Mandatory:** Hero Subject · Product · Composition · Lighting · Campaign Style
- **Optional:** Action · Emotion · CTA Space · Brand Colors · Background · Palette · Crop

### Art & Illustration — *protect illustration language over realism*
- **Mandatory:** Art Style · Character · Palette · Composition
- **Optional:** Pose · Expression · Lighting · Background · Rendering Style · Gaze · Material · Crop

### Trending & Viral — *protect the visual hook + attention pattern*
- **Mandatory:** Main Subject · Visual Hook · Expression · Action · Composition · Lighting · Color Impact · Viral Style
- **Optional:** Background · Crop

### Social Media — *protect engagement + platform-ready composition*
- **Mandatory:** Hero Subject · Composition · Lighting · Social Style
- **Optional:** Action · Expression · Platform Crop · Brand Colors · Background · Palette

Rendered form: `LOCK 01 — SUBJECT: <value>` … one numbered line per resolved lock.

---

## 5. Layer 4 — Negative Locks (per category)

Standardized "what to avoid" list appended after the locks. Platform-invariant.

**People & Portraits:** No plastic skin · No distorted hands or fused fingers · No cropped
extremities when hands should stay visible · No warped facial proportions · No duplicate
accessories/features · No generic wardrobe substitutions · No muddy texture / AI artifacts.

**Fashion & Apparel:** No warped/melted/impossible garment geometry · No drifting garment
colour · No distorted prints/patterns/logos · No plastic skin · No distorted hands/extra
limbs · No cropped extremities when full garment is shown · No generic garment substitution
· No floating accessories/detached straps · No muddy fabric texture / AI artifacts.

**Product & Ecommerce:** No floating product / missing contact shadow · No warped geometry ·
No distorted/misspelled/smeared label text · No plastic sheen · No blown-out speculars · No
visible seams/dust/fingerprints on a clean product · No duplicated product/parts · No
impossible reflections · No wrong product-to-prop proportions.

**Marketing & Ads:** No cluttered composition burying the hero · No text/logos over the CTA
space · No off-brand colours · No distorted/unreadable product · No conflicting focal points
· No plastic skin / warped hands · No muddy lighting · No AI artifacts undercutting trust.

**Art & Illustration:** No drift toward generic realism · No inconsistent rendering style ·
No off-palette colours · No warped character anatomy · No muddy/smeared linework · No
conflicting lighting · No accidental photographic artifacts.

**Trending & Viral:** No weak/buried visual hook · No flat low-contrast colour · No
cluttered framing hiding the subject · No muddy low-energy lighting · No distorted
faces/hands/anatomy · No off-trend styling · No low-effort AI artifacts.

**Social Media:** No placement that breaks the crop · No off-brand colours · No cluttered
composition · No content under platform UI overlays · No distorted faces/hands · No muddy
lighting · No AI artifacts lowering perceived quality.

---

## 6. Builder Options Reference

The options a user picks in the Builder, and how they map to the structure above.

| Option | Values |
|---|---|
| **Family** | `image` · `video` · `text` · `content` |
| **Category** (image) | People & Portraits · Product & Ecommerce · Fashion & Apparel · Marketing & Ads · Art & Illustration · Trending & Viral · Social Media |
| **Platform** (image) | ChatGPT · Gemini · Grok · Midjourney · Firefly · Flux (+ Ideogram · Seedream · Recraft) |
| **Style** | Cinematic · Minimalist · Vintage · Dark Moody · Vibrant · Hyperrealistic · Anime · Watercolor · 3D Render · Sketch · Oil Painting · Neon |
| **Mood** | Dramatic · Peaceful · Energetic · Mysterious · Nostalgic · Futuristic · Romantic · Eerie · Epic · Intimate |
| **Aspect** | 1:1 · 16:9 · 9:16 · 4:3 · 2:3 · 3:2 · 21:9 |

**Other families:**
- **Video** — cinematic prompt: camera movement, lighting/mood, colour grade, duration/pacing, sound design, aspect ratio.
- **Text / Content** — structured AI instruction: role framing, task breakdown, output format, tone/audience, constraints.
- **Website** (Library) — platforms: Lovable · Bolt · v0 · Replit AI · Cursor; each design ships a full scaffold + live preview.

**Flow:** pick Family → (image) pick Category + Platform + Style/Mood/Aspect → generate →
engine returns Layer 2 + Layers 3/4 + the Variable Brief → user personalizes → copy.

---

## 7. Worked Example — People & Portraits

**Layer 1 — Variable Brief**
```
Subject:         South Asian woman, early 30s, warm medium-brown skin, calm confident
Outfit:          deep navy wool blazer over crisp white silk blouse, pearl buttons
Setting:         clean white seamless cyclorama
Colour palette:  navy, white, warm brown, gold
Mood:            confident, approachable, professional
Style reference: Annie Leibovitz, Vogue editorial
Exclude:         heavy retouching, plastic skin, ring flash, extra fingers
```

**Layer 2 — Descriptive Prompt**
> Professional executive portrait, editorial quality. Subject: South Asian woman, early
> 30s, warm medium-brown skin #7B4F2E, shoulder-length black hair in loose waves, calm
> confident expression. Subsurface scattering visible at ears and nasal bridge, specular
> highlight on T-zone, natural skin texture. Wearing deep navy wool blazer #1B2A4A, notch
> lapel, single button, over crisp white silk blouse with pearl buttons. Clean white
> seamless cyclorama. Confident, approachable, professional atmosphere. Palette: navy
> #1B2A4A 45%, white #F5F5F5 35%, warm brown #7B4F2E 15%, gold #C8A96E 5%. Refs: Annie
> Leibovitz portrait, Vogue editorial. 8K resolution, photorealistic skin texture, sharp
> focus, catchlight in eyes. Exclude: heavy retouching, plastic skin, ring flash, direct
> flash, extra fingers.

**Layer 3 — Lock Layer**
```
LOCK 01 — SUBJECT: South Asian woman, early 30s, warm medium-brown skin, calm confident
LOCK 02 — EXPRESSION: calm, confident, approachable
LOCK 03 — BACKGROUND: clean white seamless cyclorama
LOCK 04 — COMPOSITION: centered editorial head-and-shoulders portrait
LOCK 05 — LIGHTING: soft key with catchlight, gentle negative fill
LOCK 06 — STYLE DNA: editorial executive portrait (Leibovitz / Vogue)
```

**Layer 4 — Negative Locks**
```
- No plastic skin.
- No distorted hands or fused fingers.
- No warped facial proportions.
- No duplicate accessories or duplicated facial features.
- No muddy texture or obvious AI artifacts.
```

---

## 8. Worked Example — Marketing & Ads (ad poster)

**Layer 1 — Variable Brief**
```
Brand:    [BRAND]      e.g. Nike
Product:  [PRODUCT]    e.g. running sneakers
Color:    [COLOR]      e.g. electric blue
Tagline:  [TAGLINE]    e.g. Just Do It
```

**Layer 2 — Descriptive Prompt (template)**
> A world-class luxury advertising campaign poster, 4:5 ratio, for **[BRAND]**. A single
> model — confident, mid-motion — wearing/interacting with **[PRODUCT]** naturally, shot in
> a high-end studio. Dramatic **[COLOR]** neon and gel lighting casting vivid coloured
> shadows. The product appears both worn AND large/floating in the background. Explosive
> energy elements erupting from the interaction. Oversized editorial brand typography in a
> corner, partially behind the model. Tagline **[TAGLINE]** in clean thin font. Deep dark
> gradient background. Photorealistic, shot on Hasselblad, Nike/Apple global-campaign feel.

**Layer 3 — Lock Layer:** Hero Subject · Product · Composition · Lighting · Campaign Style
(+ optional CTA Space, Brand Colors).
**Layer 4 — Negative Locks:** the Marketing & Ads exclusions from §5.

---

## 9. Where this lives in the code

| Concern | File |
|---|---|
| Variable tokens / dictionary / category sets | `backend/src/engine/variables.ts` |
| Lock templates (per category) | `backend/src/engine/locks/*.ts` |
| Negative locks (per category) | `backend/src/engine/negatives/*.ts` |
| Assembly (Layers 2→3→4 + variables) | `backend/src/engine/assembler.ts`, `index.ts` |
| Per-platform descriptive formulas | `backend/src/routes/builder.ts` |
| Improver (weak → pro) | `backend/src/routes/improver.ts` |
| Regenerate-with-values | `backend/src/routes/variables.ts` (`POST /api/variables/expand`) |
| Variable Brief UI | `frontend/src/app/components/VariablePanel.tsx` |
| Lock layer UI | `frontend/src/app/components/LockLayerPanel.tsx` |
| Library prompts (baked Layers 2–4) | `frontend/src/app/lib/library-platforms-locked.ts` |
| Library variable briefs | `frontend/src/app/lib/library-variables.ts` |
