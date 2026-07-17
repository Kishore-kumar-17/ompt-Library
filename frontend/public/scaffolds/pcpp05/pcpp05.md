---
prompt_id: pcpp05
sub_category: Portfolio
sub_type: Indian Wedding Photography & Films
title: StoryBookOpulence — Luxury Cinematic Wedding Portfolios
reference_patterns: cinematic_video_heros, chapter_based_storytelling, high_vibrancy_gallery
inspiration: theweddingstory.in
quality_score:
status: draft
notes: Focused on a "Modern Indian Royalty" aesthetic with high-production value video and narrative chapters.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in luxury wedding production house portfolios and cinematic storytelling platforms. You understand that for high-end wedding photographers, the website is an emotional portal to a "Happily Ever After." You master the "Opulent UI," where every scroll feels like a frame from a Bollywood film. You reject "simple" or "flat" layouts in favor of the "Royalty" philosophy: rich gold accents, full-bleed cinematic heros, and narrative-driven "Wedding Stories." You design for "Emotional Impact," ensuring that the transition from a grand ceremony trailer to a curated photo-essay is seamless, romantic, and deeply moving.

---

### Section 2 — Application Overview

This is a premium digital portfolio for a leading Indian wedding photography and film production firm. The audience consists of high-net-worth couples, wedding planners, and celebrity managers. The goal is to showcase the firm's ability to create a "Visual Legacy" through grand destination weddings, cinematic trailers, and heirloom-quality photobooks.

The application covers: Hero Video Landing Page, Chapter-based "Wedding Stories," Cinematography Theater, High-Resolution Image Galleries, and a "Share Your Story" Inquiry Portal.

---

### Section 3 — Brand Voice & Mood

The mood is "Modern Royalty" and "Cinematically Romantic." It feels like a premium invitation to an exclusive event. It is vibrant, grand, and heart-led.

Copy is personal and narrative. Headers use names like "Chapters" and "Snippets." It avoids generic portfolio text in favor of storytelling: "Our Journey," "The Vows," "A Celebration of Souls." It uses a "Celebrity-Grade" tone to signal high production value and trust.

Vibe word: Opulent.

---

### Section 4 — Core Features & Functionality

1. **Cinematic Hero Video** — A full-screen, auto-playing trailer (muted) that immediately establishes the production quality of the firm.
2. **"Wedding Stories" (StoryBook Format)** — A chronological feed where each wedding is a "Chapter" with its own title, narrative introduction, and a mix of films and photos.
3. **Cinematography Theater** — A dedicated section for 4K trailers and highlight films, featuring custom-styled video players and "Director's Notes."
4. **"Your Story" Inquiry Flow** — A sophisticated lead-generation form that encourages couples to share their "Meet-Cute" and wedding vision before booking.
5. **Celebrity Highlights Strip** — A dedicated section for high-profile client work (e.g., Bollywood stars) to establish "Authority and Prestige."

---

### Section 5 — Design Specifications

**Visual style:** Modern Royalty. Gold and maroon accents, high-vibrancy imagery, and a mix of clean white space and deep dark-mode sections for video.

**Color mode:** Primarily Light Mode with "Theater Dark" overrides for video sections.

**Color palette:**
- Background: `#FFFFFF` (Clean White)
- Primary Accent: `#B59410` (Antique Gold — for borders and buttons)
- Secondary Accent: `#7D0A0A` (Deep Maroon — for "Snippets" and highlights)
- Surface/UI: `#FAFAFA` (Softest Grey)
- Text Primary: `#1A1A1A` (Near Black)
- Video Background: `#000000` (Pure Black)

**Typography:** Elegant Serif for headings; modern Sans-serif for body.
- Display Headings (Serif): `clamp(36px, 5vw, 64px)`, weight 600 (e.g., Playfair Display or Bodoni).
- Chapter Titles: `28px`, weight 500, serif.
- Body Copy: `16px`, weight 400, leading 1.7 (Sans-serif like Montserrat).
- Form Labels: `12px`, uppercase, bold, tracking `0.1em`.

**Spacing:** 16px base unit. 
- Section Padding: `100px` to `140px` (Grand scale).
- Card Spacing: `32px`.
- Container Max-width: `1280px` for storytelling grids.

**Border radius:** `2px` (Subtle) or `0px`. Gold-stroke borders (`1px`) around featured content blocks.

**Responsive:** Mobile-optimized for social-sharing. Video trailers must be responsive and load via light-weight proxies on 4G.

**Accessibility:** WCAG AA. High-contrast typography for narratives. Video controls must be keyboard accessible and support ARIA labels.

**Motion:** 
- Parallax: Subtle depth on lifestyle hero shots.
- Page Transitions: Elegant `opacity 0 -> 1` with a `20px` slide-up.
- Hover Effects: Gold border expansion or "Zoom-in" on story covers.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Sticky. Logo (Center). Links: Stories, Films, Images, Music, Contact.
2. **Hero:** Full-bleed Video Loop + Centered Headline ("Happily Ever After Starts Here") + "Watch the Reel" button.
3. **Featured Stories:** 3 large cards representing recent grand weddings. Each: Cover Image -> Names -> "Read the Chapter."
4. **Cinematography Strip:** Horizontal scroll of 4K trailers.
5. **The Team / Founder:** Portrait of Harpreet Bachher + "Our Philosophy" text block.

**Wedding Story Page:**
- **Intro:** Title (e.g., "Sonia ~ Aryan") -> Narrative paragraph (30-50 words) -> Metadata (Location/Date).
- **The Film:** Embedded 4K Trailer (Mux/YouTube).
- **The Gallery:** Alternating grid of full-bleed landscape shots and 2-column portrait pairings.

**Inquiry Page:**
- Narrative header: "Tell Us Your Story."
- Form: Custom fields for "How you met," "Wedding Venue," "Expected Guest Count."

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3 with custom gold/maroon utility classes.
- **Video:** Mux or Vimeo for high-bitrate trailers. Light-weight "Preview" GIFs for grid cards.
- **CMS:** Sanity.io or Contentlayer for "StoryBook" data (Chapter titles, narratives, linked media).
- **State:** Zustand for managing "Theater Mode" and form multi-steps.
- **Images:** Next.js `<Image>` with `quality={100}` for hero shots to preserve "Royal" details.

---

### Section 8 — Implementation Steps

1. **The Royal Theme:** Setup `globals.css` with gold-variable tokens and define the Serif-Sans pairing.
2. **Story Engine:** Build the "Chapter" template that dynamically intersperses text, video, and high-vibrancy photo grids.
3. **Cinematography Hub:** Implement the custom video player interface with "Theater Mode" transitions.
4. **Inquiry Portal:** Build the "Your Story" form with custom-styled inputs and error states.
5. **Performance Audit:** Optimize 4K video embeds and high-res image loading to maintain a premium speed.

---

### Section 9 — User Experience

The user is a "Dreamer." 
The UI must be "Opulent but Approachable." Use high-vibrancy colors but keep the structure simple enough to navigate while emotional.
The "Aha! moment" is the start of a wedding film—the custom music and cinematic slow-motion should create an instant emotional bond.

---

### Section 10 — Constraints

- **No flat/minimalist B&W** (unless for a specific "Legacy" section). Colors must be vibrant.
- **No generic stock icons.** Use custom gold-stroke SVGs or elegant typography.
- **No "Urgency" or "Salesy" language.** Focus on "Memories" and "Visual Legacies."
- **No low-resolution video.** If 4K isn't available, use a high-quality placeholder.

---

## Platform Versions

### Category A — v0

Build a "Modern Indian Royalty" wedding portfolio inspired by The Wedding Story. 
Style: White background, Gold (#B59410) and Maroon (#7D0A0A) accents, 0px border-radius, and elegant Serif headings.
Include:
1. Full-bleed Video Hero section with a "Watch the Reel" action.
2. "Wedding Stories" Grid - a chapter-based layout where each wedding is a story with a narrative excerpt.
3. High-Vibrancy Photo Gallery featuring alternating single and double-column image layouts.
Use cinematic imagery and a "Luxury Storybook" UI approach.

---

### Category B — Cursor

In `src/app/`, implement a "Luxury Wedding Production Platform" (The Wedding Story style).
Stack: Next.js 14, Tailwind, Sanity CMS, Framer Motion.
Visual Rules: 
- Primary Color: `#B59410` (Gold)
- Secondary Color: `#7D0A0A` (Maroon)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-none` (0px)
- Font: Elegant Serif (Playfair Display) + Sans (Montserrat).

Implement:
1. `app/page.tsx` - A grand landing page with a hero video loop and a featured stories strip.
2. `app/stories/[slug]/page.tsx` - A narrative chapter layout with integrated 4K video and high-vibrancy photo grids.
3. `components/contact/InquiryForm.tsx` - A sophisticated "Tell Your Story" form with gold-stroke styling.
4. `components/media/VideoTheater.tsx` - A custom video player with "Director's Notes" overlays.

Focus on "Opulence & Emotion" and high-production value visual storytelling. No generic grids. No flat designs.

---

### Lovable

Build a luxury Indian wedding portfolio — "Modern Indian Royalty". White (#FFFFFF) canvas, antique gold (#B59410) and deep maroon (#7D0A0A) accents, 0px border-radius, Playfair Display serif headings.

Must include:
- Cinematic hero: `height: 100svh`. `<video autoPlay muted loop playsInline poster={posterSrc}>`. `prefers-reduced-motion`: `<img poster>` only. "Watch the Reel" button with `1px solid #B59410` border.
- Wedding Stories feed: gold chapter number `12px` uppercase, Playfair `28px` title, narrative excerpt `16px`, 2-column photo strip below each chapter.
- Video theater: 4K trailer grid with maroon play button overlay. `aria-label` per video.
- Inquiry form: "Tell Your Story" — couple names, date, venue, story, email, phone. No payment fields. Submit → `role="status"` success state.
- Celebrity highlights strip: horizontal name strip for notable clients.

`prefers-reduced-motion`: hero shows poster image, no entrance animations.

---

### ChatGPT Canvas

Let's build a luxury Indian wedding portfolio — "Modern Indian Royalty" — for a high-end wedding production firm inspired by The Wedding Story.

**Design system:**
- Background: `#FFFFFF`; Surface: `#FDF9F0` warm cream; Gold: `#B59410`; Maroon: `#7D0A0A`
- Text: `#1A1A1A`; Muted: `#6B6B6B`; Video bg: `#000000`
- Border-radius: `0px` everywhere
- Headings: Playfair Display — `clamp(36px, 5vw, 64px)` weight 600; chapter titles `28px` weight 500; body `16px` Montserrat leading 1.7

**Build iteratively:**
1. **Hero** — `100svh` muted autoplay video + poster fallback. `prefers-reduced-motion`: poster only.
2. **Wedding Stories** `/stories` — chapter feed: gold number, serif title, excerpt, 2-col photo strip
3. **Story page** `/stories/[slug]` — narrative layout with 4K video embed and photo grid
4. **Inquiry form** — gold input styling, no payment, `role="status"` success
5. **Celebrity strip** — notable client highlights

Motion: `opacity 0→1 500ms` on chapter cards. `prefers-reduced-motion`: no animation, video replaced by poster.

---

### Bolt

Scaffold a luxury Indian wedding portfolio — cinematic, opulent, serif-driven.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root {
  --bg: #FFFFFF; --surface: #FDF9F0;
  --gold: #B59410; --maroon: #7D0A0A;
  --ink: #1A1A1A; --muted: #6B6B6B;
}
*, *::before, *::after { border-radius: 0; }
body { background: var(--bg); color: var(--ink); }
```

Components:
- `VideoHero` — `height: 100svh`. `<video autoPlay muted loop playsInline poster>`. `useEffect` checks `prefers-reduced-motion`, renders `<img>` if true. `aria-label="Wedding highlights reel"`.
- `StoryChapterCard` — gold chapter number, Playfair `28px` title, excerpt, 2-col `<img>` strip.
- `VideoTheater` — `<video>` grid, maroon play overlay. `aria-label` per entry.
- `InquiryForm` — `'use client'`. Couple names, date, venue, story, email. `role="status"` on submit. No payment fields.

---

### Claude Artifacts

Build a self-contained luxury wedding portfolio. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export interface WeddingStory {
  id: string; slug: string; title: string
  chapterNumber: number; date: string
  venue: string; venueCity: string; excerpt: string
  posterSrc: string; posterAlt: string
  coverVideoUrl?: string
  photos: { src: string; alt: string }[]
  isCelebrity?: boolean
}

export interface InquiryFormData {
  partner1: string; partner2: string
  weddingDate: string; venueCity: string
  story: string; email: string; phone: string
}
```

Design rules:
- `--gold: #B59410; --maroon: #7D0A0A` — only as accent colours; never inline in components
- `border-radius: 0` everywhere — no exceptions
- `VideoHero`: `useEffect` detects `prefers-reduced-motion` — if `true`, renders `<img posterSrc>` instead of `<video>`
- `InquiryForm` is `'use client'` — `role="status"` on success — NEVER render payment fields
- `generateStaticParams()` from story slugs. `notFound()` for unknown slugs.

---

### Grok

Implement StoryBookOpulence — luxury Indian wedding portfolio.

1. `src/app/globals.css` — `--bg: #FFFFFF; --surface: #FDF9F0; --gold: #B59410; --maroon: #7D0A0A; --ink: #1A1A1A; --muted: #6B6B6B` — `*, *::before, *::after { border-radius: 0; }`
2. `src/types/index.ts` — `WeddingStory` interface (id, slug, title, chapterNumber, date, venue, venueCity, excerpt, posterSrc, posterAlt, optional coverVideoUrl, photos array, optional isCelebrity)
3. `src/lib/stories.ts` — 8 mock `WeddingStory` objects, 2 with `isCelebrity: true`
4. `src/components/home/VideoHero.tsx` — `height: 100svh` — `<video autoPlay muted loop playsInline poster={posterSrc}>` — `useEffect` checks `window.matchMedia('(prefers-reduced-motion: reduce)')`, swaps to `<img>` if true — `aria-label="Wedding highlights reel"`
5. `src/app/page.tsx` — VideoHero + chapter feed (gold number, Playfair title, excerpt, 2-col photos) + celebrity strip
6. `src/app/stories/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — narrative: video embed + high-vibrancy photo grid
7. `src/components/contact/InquiryForm.tsx` — `'use client'` — fields: partner names, date, venue, story, email, phone — `role="status"` on submit — no payment fields
8. QA: `grep -r "payment\|stripe\|card" src --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a luxury Indian wedding portfolio — "Modern Indian Royalty" — for a high-end wedding production firm.

**Design layer:** `#FFFFFF` background, `#FDF9F0` warm cream surface. Gold `#B59410` for borders, chapter numbers, CTAs. Maroon `#7D0A0A` for video play overlays. Typography: Playfair Display — `clamp(36px, 5vw, 64px)` weight 600; chapter titles `28px` weight 500; body `16px` Montserrat leading 1.7. `border-radius: 0` everywhere.

**Data layer:** `WeddingStory` interface (slug, title, chapterNumber, date, posterSrc, photos array, optional coverVideoUrl, optional isCelebrity). Static in `src/lib/stories.ts`. `generateStaticParams()` for `[slug]`.

**Component layer:** `VideoHero` (100svh, autoPlay muted loop, poster fallback). `StoryChapterCard` (gold number, serif title, excerpt, 2-col photos). `VideoTheater` (trailer grid, maroon play overlay, `aria-label`). `InquiryForm` (client, success status, no payment). `CelebrityStrip` (filtered `isCelebrity` clients).

**Motion layer:** Chapter cards: `opacity 0→1 500ms ease-out` on viewport entry. `prefers-reduced-motion`: `VideoHero` shows poster only; all entrance animations disabled.
