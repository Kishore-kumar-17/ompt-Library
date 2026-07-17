---
prompt_id: pcpp07
sub_category: Portfolio
sub_type: International Destination Wedding Photographer
title: AeroPerspective — Grand Cinematic Landscapes & Portraits
reference_patterns: birdseye_landscape_composition, chronological_story_blocks, film_emulation_palette
inspiration: israelarredondo.com
quality_score:
status: draft
notes: Focused on a "Grand & Honest" aesthetic with a technical "pilot's perspective" on landscape and scale.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in high-end destination wedding portfolios and atmospheric documentary platforms. You understand that for elite international photographers, the website is a "window to the world." You master the "Scale-First UI," where the vastness of a landscape is given as much priority as the intimacy of a portrait. You reject "generic" wedding grids in favor of the "Pilot's Perspective" philosophy: wide-angle immersion, chronological narrative blocks, and a "Film-Like" color science. You design for "Technical Honesty," ensuring that every pixel communicates perfectionism, scale, and deep emotional resonance.

---

### Section 2 — Application Overview

This is a premium digital portfolio for an internationally recognized destination wedding photographer and Fujifilm Ambassador. The audience consists of high-end couples planning weddings in remote locations, luxury travel brands, and photography perfectionists. The goal is to establish "Atmospheric Authority" through a minimalist, landscape-optimized UI that showcases grand compositions with technical precision.

The application covers: Full-Bleed Landscape Heros, Chronological Wedding Stories (Getting Ready to Reception), "The Pilot's Journey" (Bio/About), Integrated Booking Inquiries, and a Technical "Gear & Presets" section.

---

### Section 3 — Brand Voice & Mood

The mood is "Grand & Honest" and "Sophisticatedly Atmospheric." It feels like a high-end travel monograph or a luxury cinematic film. It is precise, expansive, and deeply emotional.

Copy is brief and evocative. Headers focus on "The Story of the Day" rather than "The Service." It uses a "Perfectionist" tone to signal technical mastery. It avoids clutter in favor of "Breathable Mastery."

Vibe word: Atmospheric.

---

### Section 4 — Core Features & Functionality

1. **Full-Bleed Landscape Heros** — Immersive, edge-to-edge images that showcase the "Grand View" of destination weddings (Mountains, Oceans, Cityscapes).
2. **Chronological Narrative Blocks** — A layout engine that organizes galleries by the "Time of Day," guiding the user through the wedding sequence from dawn to late-night.
3. **Film-Emulation Palette** — A UI theme that uses rich, organic neutrals to mirror the "Red Leaf" film-grade color science used in the photography.
4. **"Pilot-to-Photographer" Narrative** — A specialized "About" section that highlights the unique technical background (Aviation) of the artist to build trust.
5. **Frictionless Inquiry Portal** — A 1-page, high-contrast form designed for international couples to share their remote wedding visions.

---

### Section 5 — Design Specifications

**Visual style:** Atmospheric Minimalism. Large-scale compositions, organic contrast, and a "Gallery-Wall" neutral UI.

**Color mode:** Primarily Light Mode with soft, stone-grey accents to maintain a "Nature-Inspired" feel.

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Accent UI: `#E5E5E5` (Stone Grey — for dividers and labels)
- Text Primary: `#1A1A1A` (Near Black)
- Text Muted: `#6B7280` (Muted Slate)
- Call-to-Action: `#000000` (Pure Black — for high-contrast commitment)

**Typography:** Elegant Contrast.
- Display Headings (Serif): `clamp(28px, 3.5vw, 48px)`, weight 500, elegant serif (e.g., Garamond or Bodoni).
- Body/UI (Sans): `15px`, weight 400, clean sans-serif (e.g., Inter or Public Sans).
- Captions: `11px`, bold, uppercase, tracking `0.1em`.

**Spacing:** 16px base unit. 
- Section Gaps: `140px` (Grand scale padding).
- Grid Gaps: `8px` (Tight and precise).
- Container Max-width: `1600px` (Ultra-wide monitor optimization).

**Border radius:** `2px` (Subtle) or `0px`. Focus on straight lines to reflect "Precision."

**Responsive:** Mobile-first, but with specific ultra-wide optimizations for 4K displays to handle landscape shots.

**Accessibility:** WCAG AA. High-contrast typography. All landscape heros must include descriptive ALT text for environmental context.

**Motion:** 
- "Aero" Fade: A very slow, 1-second opacity transition between project heros.
- Parallax Scale: Subtle `scale 1.0 -> 1.02` on scroll for massive landscape images.
- Layout Cuts: Clean, instant cuts between story chapters.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Minimalist Top-bar. Logo (Left). Right: Stories, About, Inquire.
2. **Hero:** Full-screen Landscape Slideshow (Muted, slow transitions).
3. **Featured Stories:** Large tiles showing "Location + Couple." Each tile is a grand wide shot.
4. **The Perspective:** Small text-and-image block explaining the "Pilot's View."
5. **Footer:** Simple links + Fujifilm Ambassador Badge.

**Story Page Layout:**
- **Intro:** Title (Location) -> Time of Day Indicator (e.g., "08:00 AM - Preparation").
- **Sequence:** Vertical scroll of documentary shots interspersed with large-scale landscape highlights.
- **End:** "Fly to the Next Story" link.

**Inquiry Page:**
- Minimalist header: "Where are we going?"
- Form: Name, Email, Destination (Dropdown), Wedding Date, "Tell us about your vision."

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3 with custom "Stone" utility tokens.
- **Animation:** Framer Motion for slow "Aero" fades and scroll-triggered parallax.
- **Media:** Next.js `<Image>` with `quality={90}` and `unoptimized={true}` for large landscapes (to preserve grain and technical detail).
- **CMS:** Sanity.io or local MDX for "Story Chronology" and technical data.

---

### Section 8 — Implementation Steps

1. **The Canvas:** Setup `globals.css` with the white/stone palette and define the Elegant-Serif typography pairing.
2. **Hero Engine:** Build the full-screen slideshow component with slow-fade logic.
3. **Chronology Engine:** Implement the story template that handles the "Time of Day" grouping logic.
4. **Perspective Section:** Build the "About" layout with the aviation-inspired storytelling blocks.
5. **Inquiry Shell:** Implement the high-contrast lead form with international destination support.

---

### Section 9 — User Experience

The user is a "Dreamer with High Standards." 
The UI must be "Expansive." It should feel as open as the skies the photographer used to fly in.
The "Aha! moment" is the first grand landscape shot—where the user realizes that a wedding can be as epic as a nature documentary.

---

### Section 10 — Constraints

- **No cluttered grids.** Every image needs room to breathe.
- **No colorful UI.** Stick to whites, stones, and blacks to let the photography colors lead.
- **No "Sale" language.** Use "Availability" or "Collaborate" instead.
- **No standard "Small" heros.** Heros must be at least `80vh` tall.

---

## Platform Versions

### Category A — v0

Build an "International Destination" wedding portfolio inspired by Israel Arredondo. 
Style: White background, Stone Grey accents, 0px border-radius, and elegant Serif headings.
Include:
1. Full-bleed Landscape Hero slideshow with very slow transitions.
2. Chronological "Story of the Day" layout (Getting Ready -> Reception).
3. "The Perspective" bio section that highlights a technical background in aviation.
Use grand, wide-angle photography and a "Gallery-Wall" UI approach. Use minimalist Sans-serif for body text.

---

### Category B — Cursor

In `src/app/`, implement an "Atmospheric Destination Portfolio" (Israel Arredondo style).
Stack: Next.js 14, Tailwind, Sanity CMS, Framer Motion.
Visual Rules: 
- Primary Color: `#1A1A1A` (Text)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-none` (0px)
- Font: Elegant Serif (Bodoni) + Sans (Public Sans).

Implement:
1. `app/page.tsx` - A grand landing page with ultra-wide landscape heros and location-based story tiles.
2. `app/stories/[slug]/page.tsx` - A chronological documentary layout with "Time of Day" markers.
3. `components/media/AeroHero.tsx` - A full-screen slideshow component with subtle scroll-parallax scale effects.
4. `app/inquiry/page.tsx` - A high-contrast "Where are we going?" form with destination-selection logic.

Focus on "Grand View" and technical perfectionism. No colorful UI. No blurs.

---

### Lovable

Build a destination wedding portfolio — "Grand View" — for an international photographer and Fujifilm Ambassador. White (#FFFFFF) canvas, stone grey (#E5E5E5) accents, 0px border-radius, atmospheric minimalist aesthetic.

Must include:
- Landscape hero slideshow: `min-height: 80vh`, automatic crossfade `1000ms ease`. `prefers-reduced-motion`: single static `<img>` only, no transition.
- Story page `/stories/[slug]`: "Time of Day" chapter labels `11px` bold uppercase `letter-spacing: 0.1em`, alternating full-width landscape shots and 2-column portrait grids. `gap: 8px` between images.
- "The Perspective" bio section: aviation background narrative. Text-left, portrait-right two-column layout. `max-width: 1200px`.
- Inquiry page `/inquiry`: header "Where are we going?", fields: name, email, destination `<select>` (20+ international locations), wedding date, vision textarea. `role="status"` on submit. No payment fields.
- Footer: Fujifilm Ambassador badge `<img alt="Fujifilm X Ambassador">`, minimal social links.

Garamond/Bodoni serif headings `clamp(28px, 3.5vw, 48px)` weight 500. No colorful UI — white, stone, black only. `prefers-reduced-motion`: all animations disabled, all content visible immediately.

---

### ChatGPT Canvas

Let's build a destination wedding portfolio — "Atmospheric Minimalism" — for an elite international photographer inspired by Israel Arredondo.

**Design system:**
- Background: `#FFFFFF`; Accent/Dividers: `#E5E5E5`; Text: `#1A1A1A`; Muted: `#6B7280`; CTA: `#000000`
- Border-radius: `0px` (images, sections) / `2px` (form inputs)
- Headings: elegant serif (Garamond/Bodoni) — `clamp(28px, 3.5vw, 48px)` weight 500; captions `11px` bold uppercase `letter-spacing: 0.1em`; body `15px` Inter/Public Sans

**Build iteratively:**
1. **Homepage** — full-screen landscape slideshow `min-height: 80vh` + location-based story tiles + "The Perspective" aviation bio block + Fujifilm badge
2. **Story page** `/stories/[slug]` — "Time of Day" chapter labels (`11px` uppercase) + alternating full-width / 2-column portrait documentary shots
3. **Inquiry page** `/inquiry` — "Where are we going?" header + destination `<select>` + vision textarea + `role="status"` success state
4. **AeroHero component** — `1000ms` opacity crossfade slideshow. `prefers-reduced-motion`: single static image.

Motion: hero fade `1000ms ease`. All other transitions `400ms ease-out`. `prefers-reduced-motion`: all instant.

---

### Bolt

Scaffold a destination wedding portfolio — atmospheric, landscape-first, precision-crafted.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root {
  --bg: #FFFFFF; --stone: #E5E5E5;
  --ink: #1A1A1A; --muted: #6B7280; --cta: #000000;
}
*, *::before, *::after { border-radius: 0; }
body { background: var(--bg); color: var(--ink); }
```

Components:
- `AeroHero` — `min-height: 80vh`. Image slideshow with `1000ms` opacity crossfade. `useReducedMotion()`: single static `<img>`, no transition. `aria-label="Destination wedding highlights"`.
- `StoryChronology` — "Time of Day" `<section>` blocks: `11px` bold uppercase chapter label, alternating full-width + 2-column portrait grids. `gap: 8px`.
- `PerspectiveSection` — `grid-template-columns: 2fr 1fr`. Text left, portrait right. Fujifilm badge `<img alt="Fujifilm X Ambassador">`. `max-width: 1200px`.
- `InquiryForm` — `'use client'`. Destination `<select>` (20+ options). Vision `<textarea>`. `role="status"` on submit. No payment fields.

---

### Claude Artifacts

Build a self-contained destination wedding portfolio. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type TimeOfDay = 'preparation' | 'ceremony' | 'portraits' | 'reception' | 'night'

export interface WeddingStory {
  id: string; slug: string; title: string
  location: string; country: string; date: string
  coverSrc: string; coverAlt: string; excerpt: string
  chapters: { time: TimeOfDay; images: { src: string; alt: string }[] }[]
}

export interface InquiryFormData {
  name: string; email: string; destination: string
  weddingDate: string; vision: string
}
```

Design rules:
- `border-radius: 0` everywhere — use `2px` only on `<input>` and `<select>` elements
- `AeroHero`: crossfade `1000ms` — `useReducedMotion()` guard: if `true`, render single `<img>`, no transition
- All landscape images: descriptive `alt` with location context (e.g., "Couple at Santorini cliffs at sunset")
- `generateStaticParams()` from story slugs. `notFound()` for unknown slugs.
- Inquiry `<select>` destination list: minimum 20 international locations

---

### Grok

Implement AeroPerspective — destination wedding portfolio.

1. `src/app/globals.css` — `--bg: #FFFFFF; --stone: #E5E5E5; --ink: #1A1A1A; --muted: #6B7280; --cta: #000000` — `*, *::before, *::after { border-radius: 0; }`
2. `src/types/index.ts` — `TimeOfDay` union (preparation|ceremony|portraits|reception|night) — `WeddingStory` interface (id, slug, title, location, country, date, coverSrc, coverAlt, excerpt, chapters: `{ time: TimeOfDay; images: { src: string; alt: string }[] }[]`)
3. `src/lib/stories.ts` — 8 mock `WeddingStory` objects across varied international locations with populated chapters
4. `src/components/home/AeroHero.tsx` — `min-height: 80vh` slideshow — `1000ms` opacity crossfade — `useReducedMotion()` → single static `<img>` — `aria-label="Destination wedding highlights"`
5. `src/app/page.tsx` — AeroHero + location-based story tiles (location + couple name overlay) + "The Perspective" aviation bio block + Fujifilm badge
6. `src/app/stories/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — Time of Day `<section>` blocks (`11px` uppercase labels) + alternating full-width/2-column portrait image grids
7. `src/app/inquiry/page.tsx` — "Where are we going?" header — destination `<select>` (20+ options) — vision `<textarea>` — `role="status"` success — no payment fields
8. QA: `grep -r "border-radius" src/components --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a destination wedding portfolio — "Atmospheric Minimalism" — for an internationally recognized photographer.

**Design layer:** `#FFFFFF` background, `#E5E5E5` stone dividers/labels, `#1A1A1A` text, `#6B7280` muted, `#000000` CTA. Typography: elegant serif (Garamond/Bodoni) — `clamp(28px, 3.5vw, 48px)` weight 500; captions `11px` bold uppercase `letter-spacing: 0.1em`; body `15px` Public Sans. `border-radius: 0` (images, sections) / `2px` (inputs).

**Data layer:** `TimeOfDay` union (preparation|ceremony|portraits|reception|night). `WeddingStory` interface (slug, location, country, date, coverSrc, coverAlt, chapters array). `generateStaticParams()` for `[slug]`.

**Component layer:** `AeroHero` (80vh+, image slideshow, 1000ms crossfade). `StoryChronology` (Time of Day chapter sections, alternating full-width/portrait grids, 8px gap). `PerspectiveSection` (aviation bio, 2-col layout, Fujifilm badge). `InquiryForm` (destination select 20+ options, vision textarea, `role="status"` success, no payment fields).

**Motion layer:** Hero: `1000ms ease` crossfade. Grid items: `opacity 0→1 500ms ease-out` on viewport entry. `prefers-reduced-motion`: hero shows single static image; all transitions instant; `useReducedMotion()` guard on all Framer Motion components.
