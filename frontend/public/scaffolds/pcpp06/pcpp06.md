---
prompt_id: pcpp06
sub_category: Portfolio
sub_type: Global Luxury Wedding Photographer
title: IconicElegance — Sophisticated Cinematic Portfolios
reference_patterns: cinematic_hero_loops, masonry_editorial_grids, integrated_education_hub
inspiration: josephradhik.com
quality_score:
status: draft
notes: Focused on a "Global Luxury" aesthetic that balances high-end client work with educational authority.
---

## Base Prompt

### Section 2 — Application Overview

This is a premium digital portfolio for an internationally acclaimed wedding photographer and industry educator. The audience consists of celebrity clients, high-end fashion brands, and aspiring photographers. The goal is to establish "Iconic Excellence" through a cinematic, minimalist UI that showcases world-class imagery while managing a complex secondary layer of workshops, conferences, and masterclasses.

The application covers: Cinematic Video Heros, Sophisticated Masonry Galleries, The "Journal" (Narrative Blog), Workshop/Event Hub, and a Prestige Press Archive.

---

### Section 3 — Brand Voice & Mood

The mood is "Sophisticated & Timeless" and "Global Luxury." It feels like a high-end fashion magazine (Vogue/Harper’s Bazaar) in digital form. It is clean, expansive, and authoritative.

Copy is minimalist and premium. Headers are elegant and brief. It uses a "Master-of-Craft" tone to signal both artistic brilliance and educational leadership. It avoids generic labels in favor of "Stories," "Journal," and "Legacy."

Vibe word: Iconic.

---

### Section 4 — Core Features & Functionality

1. **Cinematic Hero Heros** — Full-width, high-resolution image heros or auto-playing silent video loops that establish a "larger-than-life" movie-poster feel.
2. **Masonry Editorial Grid** — A sophisticated grid layout that handles varied aspect ratios (vertical portraits vs. wide candids) with generous whitespace.
3. **Integrated Education Hub** — A dedicated section for "PEP" (Photography Education Program), listing global conferences, masterclasses, and mentorship programs.
4. **The "Journal" Narrative** — A long-scroll storytelling format for wedding series, interspersed with minimal, wide-tracked editorial captions.
5. **Prestige Press Strip** — A dedicated area for "Sony Global Ambassador" status and features in major international publications.

---

### Section 5 — Design Specifications

**Visual style:** Minimalist Luxury. Sophisticated masonry grids, clean white spaces (or deep black for dark sections), and editorial-grade typography pairings.

**Color mode:** Primarily Light Mode with high-contrast "Dark Gallery" overrides for specific cinematic series.

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Surface/UI: `#F9F9F9` (Soft Grey)
- Border: `#1A1A1A` (Pure Black - used only for thin separators)
- Text Primary: `#1A1A1A` (Near Black)
- Text Secondary: `#757575` (Muted Slate)
- Accent: `#1A1A1A` (Minimalist black structural accents)

**Typography:** Elegant Serif + Modern Geometric Sans.
- Story Titles (Serif): `clamp(32px, 4vw, 56px)`, weight 600 (e.g., Playfair Display or Didot).
- UI/Navigation (Sans): `14px`, weight 500, tracking `0.15em` (e.g., Montserrat or Montserrat).
- Body Copy: `16px`, weight 400, leading 1.6.

**Spacing:** 16px base unit. 
- Section Margins: `120px` to `180px` (Expansive whitespace).
- Masonry Gaps: `16px` to `32px`.
- Container Max-width: `1440px` (Wide screen focus).

**Border radius:** `0px` (Strictly sharp edges to maintain the fashion-magazine aesthetic).

**Responsive:** Desktop-first for the "Iconic" layout. Mobile view uses a 1-column high-impact stack with simplified navigation.

**Accessibility:** WCAG AA. High-contrast typography. All media must have `aria-label` support for screen readers.

**Motion:** 
- Parallax: Smooth depth effect on hero imagery.
- Hover states: Subtle "Image Zoom" or "Overlay Fade" on project cards.
- Transitions: Fluid `opacity 0 -> 1` over `400ms`.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Minimalist Top-bar. Logo (Left). Right: Work, Journal, Education, Bio, Contact.
2. **Hero:** Full-screen Video Loop or High-Res Image + Centered Title.
3. **Featured Work:** Masonry grid of recent iconic weddings/portraits.
4. **Education Preview:** Grid of 2 cards: "Conferences" & "Masterclasses."
5. **Press Strip:** Horizontal row of monochrome magazine logos.

**Story/Journal Page:**
- **Hero:** Vertical or Horizontal "Iconic" shot.
- **Narrative:** Small text block (Centered) -> Followed by a long vertical scroll of the wedding story.
- **Gallery:** Mixed masonry layouts with occasional full-bleed highlights.

**Education Page:**
- List of upcoming events with Date, Location, and "Register" CTAs.
- "Mentorship" section with a clean application form.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3 with custom editorial utility classes.
- **Grid Engine:** `react-masonry-css` or custom CSS Grid for performance-optimized masonry.
- **State:** Zustand for managing "Gallery Lightbox" and "Event Filters."
- **Media:** Next.js `<Image>` with `priority` for heros. High-res imagery via a CDN (Cloudinary).
- **CMS:** Sanity.io for structured Portfolio, Journal, and Workshop data.

---

### Section 8 — Implementation Steps

1. **The Luxury Shell:** Setup `globals.css` with the Serif-Sans pairing and expansive whitespace tokens.
2. **Masonry Engine:** Build the performant masonry layout component that handles mixed aspect ratios.
3. **Story Template:** Implement the long-scroll "Journal" layout with centered editorial text blocks.
4. **Workshop Hub:** Build the event listing and registration UI with Supabase integration.
5. **Prestige Polish:** Add parallax effects and high-end hover transitions to finalize the "Iconic" feel.

---

### Section 9 — User Experience

The user is a "Connoisseur of Art." 
The UI must be "Authoritative yet Quiet." Let the legendary status of the client work (celebrities, Netflix, etc.) do the talking.
The "Aha! moment" is the first masonry scroll—where the variety and scale of the work create an immediate sense of "Iconic Mastery."

---

### Section 10 — Constraints

- **No generic portfolio grids.** Masonry is mandatory to handle varied aspect ratios.
- **No colorful UI elements.** Accents must be black/white only.
- **No fast/jumpy animations.** Everything must be smooth and "Springy."
- **No poor font spacing.** Navigation and sub-headers must use wide tracking (`tracking-widest`).

---

## Platform Versions

### Category A — v0

Build a "Cinematic Luxury" wedding portfolio inspired by Joseph Radhik. 
Style: Pure White background (#FFFFFF), Near Black typography (#1A1A1A), 0px border-radius, and elegant Serif headings.
Include:
1. Cinematic Hero section with a silent video loop.
2. Masonry Portfolio Grid that handles mixed vertical and horizontal shots.
3. "Journal" storytelling layout for long-form wedding series.
Use high-end photography and an "Editorial Fashion" UI approach. Use wide font-tracking for navigation.

---

### Category B — Cursor

In `src/app/`, implement a "Global Luxury Portfolio & Education Hub" (Joseph Radhik style).
Stack: Next.js 14, Tailwind, Sanity CMS, Framer Motion.
Visual Rules: 
- Primary Color: `#1A1A1A` (Text)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-none` (0px)
- Font: Elegant Serif (Didot) + Sans (Inter).

Implement:
1. `app/page.tsx` - A grand landing page with high-contrast masonry work and a prestige press strip.
2. `app/journal/[slug]/page.tsx` - A long-scroll vertical story layout with centered editorial captions.
3. `app/education/page.tsx` - A structured hub for workshops and conferences with clean event cards.
4. `components/ui/EditorialGrid.tsx` - A masonry component with generous whitespace and subtle image hover reveals.

Focus on "Iconic Excellence" and sophisticated typographic hierarchy. No colors. No rounded corners.

---

### Lovable

Build a global luxury wedding portfolio — "Iconic Excellence" — for a world-class wedding photographer and educator. White (#FFFFFF) canvas, near-black (#1A1A1A) text, 0px border-radius, editorial fashion aesthetic.

Must include:
- Masonry editorial grid: CSS `columns: 3` desktop → `1` mobile, `gap: 24px`. Cards: full-bleed `<img alt>` with hover `opacity 0→1` title overlay. `aria-label` per card. Varied portrait (3:4) and landscape (4:3) aspect ratios.
- Cinematic hero: full-screen `<video autoPlay muted loop playsInline poster={posterSrc}>` OR high-res image. `prefers-reduced-motion`: poster `<img>` only.
- Nav: logo left, right links `14px` weight 500 uppercase `letter-spacing: 0.15em`. Sticky, `border-bottom: 1px solid #1A1A1A` on scroll.
- Journal page `/journal/[slug]`: centered narrative block `max-width: 700px`, `16px` body leading 1.6, interspersed full-bleed image breaks.
- Education hub `/education`: workshop/event cards (date, location, title, "Register" `<a>` link). Mentorship application form with `role="status"` on submit.
- Press strip: horizontal row of monochrome publication logos. `filter: grayscale(1)`. `aria-label` per logo.

Playfair Display serif headings `clamp(32px, 4vw, 56px)` weight 600. No color accents — black/white/grey only. `prefers-reduced-motion`: no fade animations, all grid items visible immediately.

---

### ChatGPT Canvas

Let's build a global luxury wedding portfolio — "Iconic Excellence" — for an internationally acclaimed photographer inspired by Joseph Radhik.

**Design system:**
- Background: `#FFFFFF`; Surface: `#F9F9F9`; Text: `#1A1A1A`; Muted: `#757575`
- Border-radius: `0px` everywhere
- Headings: Playfair Display — `clamp(32px, 4vw, 56px)` weight 600; nav `14px` weight 500 uppercase `letter-spacing: 0.15em`; body `16px` weight 400 leading 1.6

**Build iteratively:**
1. **Homepage** — full-screen hero (video loop or hi-res image) + CSS columns masonry editorial grid with hover title reveal + prestige press strip (monochrome logos)
2. **Journal page** `/journal/[slug]` — centered narrative `max-width: 700px`, editorial captions, interspersed full-bleed image highlights
3. **Education hub** `/education` — event listing cards (date, location, Register CTA) + mentorship application form with `role="status"` success
4. **EditorialMasonry component** — CSS `columns: 3 → 1`, `gap: 24px`, hover `opacity 0→1` overlay

Motion: `opacity 0→1 400ms ease-out` on grid items viewport entry. `prefers-reduced-motion`: no fade, all visible immediately.

---

### Bolt

Scaffold a global luxury wedding portfolio — iconic, editorial, masonry-driven.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root {
  --bg: #FFFFFF; --surface: #F9F9F9;
  --ink: #1A1A1A; --muted: #757575;
}
*, *::before, *::after { border-radius: 0; }
body { background: var(--bg); color: var(--ink); }
```

Components:
- `CinematicHero` — `height: 100svh`. `<video autoPlay muted loop playsInline poster>`. `useEffect` checks `prefers-reduced-motion`, renders `<img>` if true. `aria-label="Portfolio hero"`.
- `EditorialMasonry` — CSS `columns: 3` desktop → `1` mobile, `gap: 24px`. Cards: full-bleed `<img>`, hover `opacity 0→1` title overlay. `useReducedMotion()` guard on Framer Motion fade.
- `EducationHub` — event card grid: date, location, title, Register `<a href rel="noopener noreferrer">` link. No inline payment.
- `PressStrip` — horizontal logo row, `filter: grayscale(1)` on all logos, `aria-label` per item.

---

### Claude Artifacts

Build a self-contained luxury wedding portfolio. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export interface WeddingStory {
  id: string; slug: string; title: string
  coupleName: string; location: string; year: number
  coverSrc: string; coverAlt: string
  excerpt: string; aspectRatio: 'portrait' | 'landscape'
}

export interface Workshop {
  id: string; title: string; type: 'conference' | 'masterclass' | 'mentorship'
  date: string; location: string; registrationUrl: string
}
```

Design rules:
- `border-radius: 0` everywhere — no exceptions
- Nav links: `14px` weight 500 uppercase `letter-spacing: 0.15em` — Montserrat
- `EditorialMasonry` uses CSS `columns` — NOT a JS masonry library — for SSR compatibility
- `CinematicHero`: `useEffect` detects `prefers-reduced-motion` — if `true`, renders `<img coverSrc>` instead of `<video>`
- `generateStaticParams()` from story slugs. `notFound()` for unknown slugs.

---

### Grok

Implement IconicElegance — global luxury wedding portfolio.

1. `src/app/globals.css` — `--bg: #FFFFFF; --surface: #F9F9F9; --ink: #1A1A1A; --muted: #757575` — `*, *::before, *::after { border-radius: 0; }`
2. `src/types/index.ts` — `WeddingStory` interface (id, slug, title, coupleName, location, year, coverSrc, coverAlt, excerpt, aspectRatio: 'portrait'|'landscape') — `Workshop` interface (id, title, type: 'conference'|'masterclass'|'mentorship', date, location, registrationUrl)
3. `src/lib/stories.ts` — 10 mock `WeddingStory` objects with mixed aspect ratios; `src/lib/workshops.ts` — 6 mock `Workshop` objects
4. `src/components/home/CinematicHero.tsx` — `height: 100svh` — `<video autoPlay muted loop playsInline poster={posterSrc}>` — `useEffect` checks `window.matchMedia('(prefers-reduced-motion: reduce)')`, swaps to `<img>` — `aria-label="Portfolio hero"`
5. `src/app/page.tsx` — CinematicHero + EditorialMasonry grid (CSS columns) + prestige press strip (monochrome logos, `filter: grayscale(1)`)
6. `src/app/journal/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — centered narrative `max-width: 700px` + interspersed full-bleed images
7. `src/app/education/page.tsx` — event cards (date, location, title, Register link) + mentorship form with `role="status"` on submit
8. QA: `grep -r "border-radius" src/components --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a global luxury wedding portfolio — "Iconic Excellence" — for an internationally acclaimed photographer.

**Design layer:** `#FFFFFF` background, `#F9F9F9` surface, `#1A1A1A` text, `#757575` muted. Typography: Playfair Display — `clamp(32px, 4vw, 56px)` weight 600 serif; nav `14px` weight 500 uppercase `letter-spacing: 0.15em`; body `16px` weight 400 leading 1.6. `border-radius: 0` everywhere. No color accents — monochromatic only.

**Data layer:** `WeddingStory` interface (slug, coupleName, location, year, coverSrc, coverAlt, excerpt, aspectRatio: 'portrait'|'landscape'). `Workshop` interface (id, title, type, date, location, registrationUrl). Static in `src/lib/`. `generateStaticParams()` for `[slug]`.

**Component layer:** `CinematicHero` (100svh, autoPlay muted loop, poster fallback via `useEffect`). `EditorialMasonry` (CSS columns, varied aspect ratios, hover title overlay). `JournalPage` (max-width 700px centered narrative, full-bleed image breaks). `EducationHub` (event cards + mentorship form with `role="status"`). `PressStrip` (monochrome logo row, `filter: grayscale(1)`, `aria-label` per item).

**Motion layer:** Grid items: `opacity 0→1 400ms ease-out` on viewport entry. `prefers-reduced-motion`: all visible immediately; hero shows poster image only; `useReducedMotion()` guard on all Framer Motion components.
