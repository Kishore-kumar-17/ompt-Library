---
prompt_id: pcpp08
sub_category: Portfolio
sub_type: Indian Wedding Films & Photography Production House
title: CrewCinema — High-Energy Production & Vibrant Storytelling
reference_patterns: video_led_production_heros, mosaic_masonry_galleries, multi_service_catalog
inspiration: thecameracrew.in
quality_score:
status: draft
notes: Focused on a "Production-Scale" aesthetic that balances traditional rituals with modern cinematic flair.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in large-scale photography and film production house portfolios. You understand that for high-volume, elite studios, the website must communicate "Technical Scale" and "Operational Reliability" as much as artistic vision. You master the "Studio UI," where multi-category service offerings (Wedding, Fashion, Corporate) are organized into a high-performance visual catalog. You reject "vague" single-image layouts in favor of the "Production" philosophy: high-energy video heros, dense mosaic grids, and prominent social proof. You design for "Impact and Efficiency," ensuring that the transition from a high-octane 4K trailer to a 500-image wedding gallery is fast, vibrant, and professionally structured.

---

### Section 2 — Application Overview

This is a premium digital hub for a major Indian wedding photography and cinematography production house. The audience consists of high-profile families, luxury wedding planners, and corporate brand managers. The goal is to showcase the firm's immense experience (500+ weddings) through a structured, multi-service environment that highlights both "Candid Emotions" and "Grand Traditions."

The application covers: High-Energy Video Landing Page, Categorized Service Grids (Cinematography, Photography, Pre-Wedding), "Meet the Crew" Team Section, Client Testimonial Slider, and a Streamlined Booking Inquiry Portal.

---

### Section 3 — Brand Voice & Mood

The mood is "Energetic & Professional" and "Vibrantly Modern." It feels like a high-end film studio headquarters. It is high-octane, polished, and confident.

Copy is direct and service-oriented. Headers focus on the scale of production: "Cinematic Excellence," "Crafting Your Legacy," "50+ Cities Globally." It avoids "artsy" abstraction in favor of proving results and reliability.

Vibe word: Production.

---

### Section 4 — Core Features & Functionality

1. **Auto-Playing Cinematic Hero** — A full-bleed video loop (muted) that showcases the "best of" the studio's cinematography and event scale.
2. **Multi-Category Mosaic Grid** — A high-density gallery that organizes work by service type (Candid, Traditional, Films, Pre-wedding).
3. **"Meet the Crew" Grid** — A dedicated section highlighting the team's scale, featuring portraits of directors and leads to humanize the production house.
4. **Client Impact Slider** — A sophisticated testimonial component with verified ratings (e.g., 4.6/5 from WedMeGood) and client headshots.
5. **Categorized "Series" Pages** — Project-specific pages that group photos and videos into a single narrative flow (The Film + The Photos).

---

### Section 5 — Design Specifications

**Visual style:** Production Modern. Vibrant high-contrast imagery, clean neutral UI blocks, and bold, authoritative typography.

**Color mode:** Primarily Light Mode with deep slate/charcoal footer and video sections.

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Surface/UI: `#F3F4F6` (Light Grey Surface)
- Accent: `#DAA520` (Goldenrod — for status badges and active links)
- Text Primary: `#111827` (Deep Slate)
- Text Secondary: `#4B5563` (Cool Grey)
- Border: `#E5E7EB` (Slate-200)

**Typography:** Bold Modern Sans-Serif (e.g., Inter, Montserrat, or Open Sans).
- Main Headings: `clamp(32px, 5vw, 60px)`, weight 800, tracking `-0.01em`.
- Service Titles: `22px`, weight 700.
- Body Copy: `16px`, weight 400, leading 1.6.
- Labels: `12px`, uppercase, bold, tracking `0.1em`.

**Spacing:** 16px base unit. 
- Section Padding: `96px` to `128px`.
- Grid Gaps: `12px` to `24px` (Variable density).
- Container Max-width: `1360px` (Production scale width).

**Border radius:** `8px` (Modern, professional rounding).

**Responsive:** Mobile-first approach. Category navigation collapses into a persistent tab-bar or clean hamburger menu.

**Accessibility:** WCAG AA. High-contrast typography for all service descriptions. All video content must have manual play/pause overrides.

**Motion:** 
- "Production" Entry: Quick, staggered fade-ins for grid items `opacity 0 -> 1` over `200ms`.
- Hover Zoom: Subtle scale-up `1.03` on project cards.
- Layout Shifts: Smooth accordion-style category reveals.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Sticky. Logo (Left). Right: Cinematography, Photography, Categories (Dropdown), Testimonials, Contact.
2. **Hero:** Full-screen 4K Trailer Loop + Centered Headline + "Enquire Now" Primary CTA.
3. **Service Mosaic:** 4-block grid (Photography, Films, Pre-wedding, Lifestyle). Each block: High-impact image -> Title -> "View All."
4. **The Crew Section:** Horizontal scroll of 6-8 team member cards.
5. **Press & Ratings Strip:** Row of monochrome logos + a prominent 4.6/5 rating badge.

**Category Page Layout:**
- **Header:** Category Title (e.g., "Cinematography") + Statistical summary ("500+ Films Delivered").
- **Grid:** Infinite scroll or paginated masonry grid of trailers and highlight reels.
- **Filter Bar:** Sub-categories: "Destination Weddings," "Celebrity," "Candid Only."

**Inquiry Page:**
- Two-column layout. Left: "Why choose our crew?" list. Right: Simplified booking form with event date and location fields.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3 with custom "Mosaic" utility classes.
- **Video:** Vimeo SDK or Mux for high-bitrate trailer embeds with custom skins.
- **State:** Zustand for managing category filters and video player modal state.
- **CMS:** Sanity.io or Contentlayer for handling multi-category project metadata.
- **Performance:** Mandatory `loading="lazy"` for all non-hero grid items; sub-2s initial load target.

---

### Section 8 — Implementation Steps

1. **The Production Shell:** Setup `globals.css` with the slate/white palette and define the bold sans-serif hierarchy.
2. **Mosaic Engine:** Build a flexible CSS Grid component that handles variable card sizes for the homepage services.
3. **Video Pipeline:** Integrate the video player component with support for auto-playing previews on hover.
4. **Team & Trust Blocks:** Build the crew grid and the client testimonial slider with Supabase integration.
5. **Category Routing:** Implement the dynamic route system for Photography vs Cinematography with shared filter logic.

---

### Section 9 — User Experience

The user is a "Results-Oriented Planner." 
The UI must be "Efficient." Don't make the user dig for information—the scale and quality of the production should be obvious in 3 seconds.
The "Aha! moment" is the Service Mosaic—where the sheer variety and volume of high-quality work (Weddings, Fashion, Corporate) establishes the studio as a "One-Stop Production Powerhouse."

---

### Section 10 — Constraints

- **No simple "Single-Artist" layouts.** Must feel like a team/studio site.
- **No desaturated or moody B&W filters.** Colors must be vibrant and high-energy.
- **No slow-loading video heros.** Use poster images and adaptive bitrates.
- **No generic contact labels.** Use "Start Your Production" or "Book the Crew."

---

## Platform Versions

### Category A — v0

Build a "Cinematic Production House" wedding portfolio inspired by Camera Crew. 
Style: Clean White background, Slate (#111827) and Gold (#DAA520) accents, 8px border-radius, and bold modern Sans-serif fonts.
Include:
1. Full-screen Video Hero section for 4K trailer loops.
2. "Service Mosaic" Grid - a high-density homepage layout for Photography, Films, and Pre-wedding categories.
3. "Meet the Crew" section with a horizontal scroll of team profiles.
Use vibrant, high-energy imagery and a "Studio Pro" UI approach.

---

### Category B — Cursor

In `src/app/`, implement a "Wedding Film & Photo Production Platform" (Camera Crew style).
Stack: Next.js 14, Tailwind, Sanity CMS, Mux Video.
Visual Rules: 
- Primary Color: `#111827` (Slate)
- Accent Color: `#DAA520` (Gold)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-lg` (8px)
- Font: Bold Sans-serif (Inter/Montserrat).

Implement:
1. `app/page.tsx` - A high-energy landing page with a service mosaic and a team-based "Meet the Crew" block.
2. `app/services/[type]/page.tsx` - A dynamic category route with statistical summaries (e.g., "500+ Films") and a filtered masonry grid.
3. `components/ui/MosaicGrid.tsx` - A flexible grid component that handles variable card sizes for different services.
4. `components/video/CinemaPlayer.tsx` - A high-performance video modal that transitions from an auto-playing hover preview.

Focus on "Scale & Professionalism" and vibrant visual storytelling. No minimalist blurs. No artsy abstractions.

---

### Lovable

Build an Indian wedding production house portfolio — "Scale & Professionalism" — for a major studio. White (#FFFFFF) canvas, deep slate (#111827) and goldenrod (#DAA520) accents, 8px border-radius, bold modern aesthetic.

Must include:
- Video hero: `height: 100svh`. `<video autoPlay muted loop playsInline poster={posterSrc}>`. Centered H1 `clamp(32px, 5vw, 60px)` weight 800 `tracking: -0.01em` + "Book the Crew" CTA button. Manual play/pause button with `aria-label="Toggle video playback"`. `prefers-reduced-motion`: poster `<img>` only.
- Service mosaic: 4-block asymmetric CSS grid (Photography, Films, Pre-wedding, Lifestyle). Each: full-bleed `<img alt>`, service title `22px` weight 700, "View All" text link.
- Meet the Crew: `overflow-x: auto` horizontal scroll strip of 6-8 team member cards. Each: `<img alt>`, name, role. `aria-label="Meet the team"` on container.
- Testimonial slider: client quote, headshot `<img alt>`, WedMeGood rating badge `#DAA520`. `aria-live="polite"` on active slide. Prev/Next buttons with `aria-label`.
- Category page `/services/[type]`: statistical summary header ("500+ Films Delivered"), `ServiceFilterBar` with `aria-pressed` tabs (Destination / Celebrity / Candid), paginated masonry grid.

`prefers-reduced-motion`: grid stagger instant, slider auto-advance disabled, hero poster static.

---

### ChatGPT Canvas

Let's build a wedding film & photo production house platform — "Production Scale" — inspired by Camera Crew.

**Design system:**
- Background: `#FFFFFF`; Surface: `#F3F4F6`; Accent: `#DAA520`; Text: `#111827`; Muted: `#4B5563`; Border: `#E5E7EB`
- Border-radius: `8px` cards; `4px` buttons
- Font: Inter/Montserrat — headings `clamp(32px, 5vw, 60px)` weight 800 `tracking: -0.01em`; service titles `22px` weight 700; body `16px` weight 400 leading 1.6

**Build iteratively:**
1. **Homepage** — 100svh video hero + 4-block service mosaic + "Meet the Crew" horizontal scroll + press & ratings strip (4.6/5 WedMeGood badge)
2. **Category page** `/services/[type]` — statistical summary header + `ServiceFilterBar` with `aria-pressed` + paginated masonry grid
3. **Testimonial slider** — client quote + headshot + rating badge `#DAA520` + `aria-live="polite"` on active slide
4. **Inquiry page** — 2-column layout (Why us? list + booking form with date/location fields) — `role="status"` success state

Motion: grid stagger `opacity 0→1 200ms` per item. Hover: `scale(1.03)` on project cards. `prefers-reduced-motion`: all instant, no auto-advance on slider.

---

### Bolt

Scaffold an Indian wedding production house platform — high-energy, production-scale.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root {
  --bg: #FFFFFF; --surface: #F3F4F6;
  --gold: #DAA520; --ink: #111827;
  --muted: #4B5563; --border: #E5E7EB;
  --radius: 8px;
}
body { background: var(--bg); color: var(--ink); }
```

Components:
- `VideoHero` — `height: 100svh`. `<video autoPlay muted loop playsInline poster>`. Manual play/pause `aria-label="Toggle video playback"`. `useReducedMotion()`: poster `<img>` only.
- `ServiceMosaic` — 4-block asymmetric CSS Grid. Each: full-bleed `<img alt>`, title overlay, "View All" text link. `border-radius: var(--radius)`.
- `CrewScroll` — `overflow-x: auto`. Horizontal team card strip. Each: `<img alt>`, name `16px` 700, role `14px` muted. `aria-label="Meet the team"` on wrapper.
- `TestimonialSlider` — `aria-live="polite"` on active slide. Client quote, headshot, `#DAA520` rating badge. Prev/Next with `aria-label`. No auto-advance if `useReducedMotion()`.
- `ServiceFilterBar` — filter tabs with `aria-pressed`. `AnimatePresence` grid transition. `useReducedMotion()`: instant swap.

---

### Claude Artifacts

Build a self-contained wedding production house platform. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type ServiceType = 'photography' | 'films' | 'pre_wedding' | 'lifestyle'
export type FilterTag = 'destination' | 'celebrity' | 'candid' | 'traditional'

export interface CrewMember {
  id: string; name: string; role: string
  imageSrc: string; imageAlt: string
}

export interface Project {
  id: string; slug: string; title: string
  service: ServiceType; tags: FilterTag[]
  coverSrc: string; coverAlt: string
  videoUrl?: string; year: number
}

export interface Testimonial {
  id: string; clientName: string; quote: string
  imageSrc: string; imageAlt: string; rating: number
}
```

Design rules:
- `--radius: 8px` — cards `border-radius: var(--radius)`; buttons `4px`
- `VideoHero`: `useReducedMotion()` guard — if `true`, render `<img poster>` instead of `<video>`
- `ServiceFilterBar` is `'use client'` — `AnimatePresence` guarded by `useReducedMotion()`
- `TestimonialSlider`: `aria-live="polite"` on active slide container; no auto-advance when `useReducedMotion()` is true
- `generateStaticParams()` from `ServiceType` union values. `notFound()` for unknown types.

---

### Grok

Implement CrewCinema — wedding film & photo production platform.

1. `src/app/globals.css` — `--bg: #FFFFFF; --surface: #F3F4F6; --gold: #DAA520; --ink: #111827; --muted: #4B5563; --border: #E5E7EB; --radius: 8px` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `ServiceType` union (photography|films|pre_wedding|lifestyle) — `FilterTag` union (destination|celebrity|candid|traditional) — `CrewMember` interface — `Project` interface (id, slug, title, service, tags, coverSrc, coverAlt, optional videoUrl, year) — `Testimonial` interface (id, clientName, quote, imageSrc, imageAlt, rating)
3. `src/lib/projects.ts` — 16 mock `Project` objects across 4 service types; `src/lib/crew.ts` — 8 `CrewMember` objects; `src/lib/testimonials.ts` — 6 `Testimonial` objects
4. `src/components/home/VideoHero.tsx` — `height: 100svh` — `<video autoPlay muted loop playsInline poster>` — manual play/pause `aria-label="Toggle video playback"` — `useReducedMotion()` → `<img poster>`
5. `src/app/page.tsx` — VideoHero + ServiceMosaic (4-block asymmetric grid) + CrewScroll (horizontal overflow) + TestimonialSlider + press ratings strip
6. `src/app/services/[type]/page.tsx` — `generateStaticParams()` from ServiceType — `notFound()` — statistical summary header + `ServiceFilterBar` (`aria-pressed`) + paginated masonry grid
7. `src/components/ui/TestimonialSlider.tsx` — `aria-live="polite"` — prev/next `aria-label` buttons — `#DAA520` rating badge — no auto-advance if `useReducedMotion()`
8. QA: `grep -r "payment\|stripe\|card" src --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a wedding film & photography production platform — "Production Scale" — for a major Indian studio.

**Design layer:** `#FFFFFF` background, `#F3F4F6` surface, `#DAA520` goldenrod accent for badges/active states, `#111827` slate text, `#4B5563` muted, `#E5E7EB` borders. Typography: Inter/Montserrat — `clamp(32px, 5vw, 60px)` weight 800 `tracking: -0.01em`; service titles `22px` weight 700; body `16px` leading 1.6; labels `12px` uppercase bold. `border-radius: 8px` cards, `4px` buttons.

**Data layer:** `ServiceType` union (photography|films|pre_wedding|lifestyle). `FilterTag` union. `Project` interface (slug, service, tags, coverSrc, videoUrl?, year). `CrewMember` interface. `Testimonial` interface. `generateStaticParams()` for `[type]`.

**Component layer:** `VideoHero` (100svh, autoPlay muted loop, poster fallback, manual play/pause controls). `ServiceMosaic` (4-block asymmetric CSS grid). `CrewScroll` (horizontal overflow scroll, `aria-label` on container). `TestimonialSlider` (`aria-live="polite"`, `#DAA520` rating badge). `ServiceFilterBar` (`aria-pressed` tabs, `AnimatePresence` transition).

**Motion layer:** Grid stagger: `opacity 0→1 200ms ease-out` per item with `50ms` delay increment. Hover: `scale(1.03) 200ms`. `prefers-reduced-motion`: all instant; hero shows poster only; `useReducedMotion()` guard on all Framer Motion; slider no auto-advance.
