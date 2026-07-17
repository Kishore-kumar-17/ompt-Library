---
prompt_id: pcpp20
sub_category: Portfolio
sub_type: Career-Focused Edtech & ROI-Led Landing Pages
title: ROIMaster — Career Transformations & University-Certified Growth
reference_patterns: university_trust_walls, career_transition_narratives, data_dense_outcome_blocks
inspiration: upgrad.com
quality_score:
status: draft
notes: Focused on high-stakes professional upskilling with a strong emphasis on salary hikes and career outcomes.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in high-stakes professional education, career-transition platforms, and ROI-led edtech architectures. You understand that for working professionals, the course is an "Investment," not just a hobby. You master the "Outcome-Driven UI," where salary hikes, prestigious university logos (IIT, IIM, Duke), and "Alumni Success" statistics are the primary visual anchors. You reject "generic" academic layouts in favor of the "Career Growth" philosophy: bold corporate reds, data-dense ROI blocks, and scannable "Step-by-Step" transformation narratives. You design for "Professional Confidence," ensuring that the path from a Data Science syllabus preview to a $3,000 executive enrollment is authoritative, evidence-backed, and career-accelerating.

---

### Section 2 — Application Overview

This is a premium digital hub for a leading higher-education and upskilling platform. The audience consists of mid-career professionals, tech founders, and aspiring managers looking for "Double Credentials" and "Placement Support." The goal is to provide a "Career ROI" engine that handles goal-based routing, showcases prestigious university partnerships, and manages high-volume lead capture for long-duration degree and certificate programs.

The application covers: Goal-Oriented Marketplace Hub, University-Certified Landing Pages (ROI-dense), "Success Story" Video Feed, Syllabus-Download Conversion Engine, and an Integrated "Talk to Experts" Inquiry Portal.

---

### Section 3 — Brand Voice & Mood

The mood is "Boldly Ambitious & Corporate-Reliable." It feels like a high-end corporate training center or an executive MBA boardroom. It is results-oriented, fast-paced, and highly professional.

Copy is persuasive, data-backed, and urgency-driven. Headers focus on "The Result": "Master tomorrow's skills today," "Will AI get you fired?", "93.5% positive career impact." It avoids educational fluff in favor of "Executive Alumni Status" and "Market-Ready Skillsets."

Vibe word: Transformation.

---

### Section 4 — Core Features & Functionality

1. **University Prestige Walls** — A high-visibility strip of global university logos (IITB, IIMK, Duke, Liverpool) used to establish immediate institutional trust.
2. **Data-Dense ROI Blocks** — Visualization components showing average salary hikes, number of hiring partners (800+), and positive career impact percentages.
3. **Syllabus-Download Conversion Trigger** — A primary CTA on every course card that captures leads in exchange for high-value PDF curriculum guides.
4. **"Transition Story" Video Modules** — Integrated social proof featuring "Before & After" salary and title data for verified learners.
5. **Goal-Based Navigation Engine** — A hierarchical menu system allowing users to browse by "Domains" (AI, MBA) or "Goals" (Promotion, Study Abroad).

---

### Section 5 — Design Specifications

**Visual style:** Professional Corporate. Clean white surfaces, bold "upGrad Red" accents, and a focus on "Evidence of Impact." The UI uses high-contrast typography and "Trust Markers" (University seals, hiring partner logos) as primary anchors.

**Color mode:** Primarily Light Mode (High Confidence).

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Surface/UI: `#F3F4F6` (Lightest Grey for secondary blocks)
- Accent (Primary): `#E31E24` (upGrad Red — for primary CTAs and urgency)
- Text Primary: `#111827` (Deep Slate / Black)
- Text Secondary: `#4B5563` (Neutral Grey for deck/summary)
- Success Green: `#059669` (For salary hike indicators)

**Typography:** Bold Sans-Serif.
- Display Headings: `clamp(32px, 5vw, 54px)`, weight 800, all-caps, tracking `-0.01em` (e.g., Montserrat, Inter, or SF Pro).
- Body/ROI Stats: `16px`, weight 400, leading 1.6.
- Labels: `12px`, bold, all-caps, tracking `0.1em`.

**Spacing:** 16px base unit. 
- Section Padding: `100px` to `128px`.
- Grid Gaps: `24px`.
- Container Max-width: `1360px` (Optimized for information density).

**Border radius:** `4px` (Crisp) or `8px` (Modern rounding). Focus on sharp, professional geometry.

**Responsive:** Mobile-first approach. Course cards show "Placement Support" and "University Logo" prominently on mobile entry.

**Accessibility:** WCAG AA. High-contrast text on white. All ROI charts must have accessible data tables or descriptions for screen readers.

**Motion:** 
- Progress Reveal: Smooth `opacity 0 -> 1` and `scale 0.98 -> 1` for ROI stat blocks.
- Transition: Quick `250ms` slides for category switches.
- Count-up animations: For salary hike and learner-count statistics.

---

### Section 6 — Structure

**Marketplace Hub Layout:**
1. **Nav:** Sticky. Logo (Left). Right: Program Finder, Enterprise, Success Stories, Sign In. Primary CTA: "Talk to Experts" (Red).
2. **Hero:** Goal-based search ("What is your goal?") + Massive ROI Stat ("150k+ Careers transformed").
3. **University Strip:** Grayscale row of 6-8 partner logos with subtle hover reveals.
4. **Trending Grid:** "Top Programs for [Selected Role]" grid featuring university badges and syllabus-download triggers.
5. **Social Proof Strip:** "Thriving at top firms" — Row of 10+ corporate logos (Amazon, Google, Microsoft).

**Course Landing Page Layout:**
- **Header:** Course Title -> University Badge -> "Executive Alumni Status" label.
- **ROI Block:** "93% Positive Career Impact" centered in a high-contrast Red/White section.
- **Curriculum:** Scannable list of modules with "Download Full Syllabus" sticky button.
- **Mentorship:** 3-column list of industry mentors with current senior titles.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3 with custom "Corporate" palette.
- **Lead Gen:** Integrated "Talk to Expert" multi-step form with conditional routing (Indian vs. Foreign).
- **CMS:** Sanity.io or Contentful (to handle hundreds of university partners and course variants).
- **Data Viz:** Recharts or custom SVG for outcome-statistics (Salary hike distributions).
- **SEO:** Metadata-heavy architecture for long-tail career keywords (e.g., "Executive MBA from IIT").

---

### Section 8 — Implementation Steps

1. **The Corporate Shell:** Setup `globals.css` with the upGrad-Red variables and define the Montserrat/Inter hierarchy.
2. **Trust Engine:** Build the logo-strip components for Universities and Hiring Partners with responsive spacing.
3. **ROI Visualization:** Create the data-dense outcome blocks with count-up animations for success metrics.
4. **Syllabus-Lead Hub:** Implement the course grid cards with "Download PDF" modal triggers and email capture logic.
5. **Inquiry Portal:** Build the "Talk to Expert" multi-step form with region-based validation and expert-status indicators.

---

### Section 9 — User Experience

The user is an "Ambitious Professional." 
The UI must be "Evidence-First and Authoritative." Don't just list modules—show the job title the user will get after those modules. 
The "Aha! moment" is the Career Transition Story—where a user sees a peer move from a "Junior Role" to "VP at Walmart" with a 50% salary hike.

---

### Section 10 — Constraints

- **No ads.** High-stakes education requires 100% ad-free focus.
- **No generic stock imagery.** Use professional campus shots or original learner headshots.
- **No pure black text.** Use Deep Slate (#111827) for a high-end corporate feel.
- **No slow/laggy menus.** Professionals value speed; the program finder must be instant.

---

## Platform Versions

### Category A — v0

Build a "Career ROI" edtech landing page inspired by upGrad. 
Style: Pure White background (#FFFFFF), upGrad Red (#E31E24) and Blue (#1D4ED8) accents, 4px border-radius, and bold modern Sans-serif fonts (Montserrat).
Include:
1. University Trust Wall featuring logos of top institutions (IIT, IIM, Duke).
2. Data-Dense ROI Blocks showing salary hike stats and placement percentages (e.g., 93% success).
3. Scannable Course Grid where each card has a "Download Syllabus" trigger and university badge.
Use high-contrast branding and a "Professional Transformation" UI approach. No ads allowed.

---

### Category B — Cursor

In `src/app/`, implement an "Indian Professional Upskilling Hub" (upGrad style).
Stack: Next.js 14, Tailwind, Sanity CMS, Recharts, Zustand.
Visual Rules: 
- Primary Color: `#E31E24` (Red)
- Text Color: `#111827` (Slate)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-sm` (4px)
- Font: Bold All-Caps Sans (e.g., Montserrat) + Inter.

Implement:
1. `app/page.tsx` - A results-driven homepage featuring goal-discovery and massive career stats.
2. `app/courses/[slug]/page.tsx` - A high-res landing page with university credentials and syllabus-download conversion triggers.
3. `components/roi/OutcomeChart.tsx` - A custom SVG component visualizing salary growth distributions for alumni.
4. `components/lead-gen/TalkToExpert.tsx` - A multi-step inquiry form that routes leads based on nationality and career interest.

Focus on "Professional Growth" and authoritative information density. No modern gradients or blurs. No ads.

---

### Lovable

Build a career-ROI professional education hub — "Evidence-First, Outcome-Driven" — for ambitious mid-career professionals. White (#FFFFFF) canvas, upGrad Red (#E31E24) accent, deep slate (#111827) text, 4px border-radius.

Must include:
- University trust wall: `<ul role="list">` of logo `<img alt="[University name]">` with CSS `filter: grayscale(1)` — never override to color.
- ROI blocks: `<section aria-label="Career outcomes">`. Each stat: `#059669` salary hike percentage + `#111827` label + `role="img" aria-label="[full stat description]"` for screen reader access.
- Course grid: each card has "Download Syllabus" `<button aria-label="Download [course] syllabus">` → opens `SyllabusModal` with name + email + `<input type="tel">` phone capture (NEVER payment fields).
- `TalkToExperts` multi-step inquiry: Step 1 name+email; Step 2 domain `<select>` (AI, Data Science, MBA, Product, Marketing, Design); Step 3 nationality `<select>` (India/International). Submits to CRM — NEVER payment fields.
- Course landing `/courses/[slug]`: `generateStaticParams()` + `notFound()`. University badge `<img alt>` + `#E31E24` "93% Positive Career Impact" ROI banner + curriculum module list + mentor grid (3-col, current senior titles).

`prefers-reduced-motion`: count-up stats show final values immediately. Modals appear instantly with no scale animation. No ads — 100% ad-free.

---

### ChatGPT Canvas

Let's build a career-ROI professional education hub — "ROIMaster" — for ambitious professionals. upGrad aesthetic.

**Design system:**
- Background: `#FFFFFF`; Surface: `#F3F4F6`; Text: `#111827`; Muted: `#4B5563`; Red: `#E31E24`; Success: `#059669`
- Border-radius: `4px` crisp; `8px` modern card rounding
- Font: Montserrat weight 800 `clamp(32px, 5vw, 54px)` all-caps display tracking `-0.01em`; body Inter `16px` weight 400 leading 1.6; labels `12px` bold all-caps `letter-spacing: 0.1em`

**Build iteratively:**
1. **Marketplace homepage** — sticky red "Talk to Experts" nav CTA + hero goal search + `UniversityStrip` (grayscale logos) + ROI stats block (93% success, 150k+ careers) + trending course grid
2. **Course landing** `/courses/[slug]` — `generateStaticParams()` + `notFound()` — university badge + `#E31E24` "93% Positive Career Impact" banner + curriculum module list + "Download Syllabus" → `SyllabusModal` (name+email+phone, no payment fields)
3. **SyllabusModal** — `position: fixed; inset: 0` — lead capture: name + email + `<input type="tel">` phone — NO payment fields — `role="status"` success state
4. **TalkToExperts** — multi-step form: Step 1 name+email; Step 2 domain `<select>`; Step 3 nationality `<select>` — routes to CRM endpoint — NO payment fields

Motion: stat count-up `0→final 1000ms ease-out`. `prefers-reduced-motion`: show final values immediately; `useReducedMotion()` guard.

---

### Bolt

Scaffold a career-ROI professional education hub — evidence-first, outcome-driven.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS

```css
:root {
  --bg: #FFFFFF; --surface: #F3F4F6;
  --ink: #111827; --muted: #4B5563;
  --red: #E31E24; --success: #059669;
  --radius-sm: 4px; --radius: 8px;
}
body { background: var(--bg); color: var(--ink); }
```

Components:
- `UniversityStrip` — `<ul role="list">` + logo `<img alt="[university name]">` with CSS `filter: grayscale(1)` — NEVER override to color.
- `ROIBlock` — stat items: `#059669` salary hike + `#E31E24` career-impact numbers. Count-up `1000ms`. `useReducedMotion()` → show final value immediately.
- `SyllabusModal` — `position: fixed; inset: 0` — name + email + `<input type="tel">` phone — NEVER payment fields — `role="status"` success state.
- `TalkToExperts` — multi-step: Step 1 name+email; Step 2 domain `<select>` (ai|data-science|mba|product|marketing|design); Step 3 nationality `<select>` (india|international). Submit to CRM — NEVER payment fields.
- `CourseCard` — university badge `<img alt>` + title + "Download Syllabus" `<button aria-label="Download [course] syllabus">` trigger.

---

### Claude Artifacts

Build a self-contained career-ROI professional education hub. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type CareerDomain = 'ai' | 'data-science' | 'mba' | 'product' | 'marketing' | 'design'

export interface Course {
  slug: string; title: string; tagline: string
  university: string; universityLogoSrc: string; universityLogoAlt: string
  domain: CareerDomain
  durationWeeks: number
  salaryHikePercent: number   // e.g. 50 for "50% salary hike"
  placementRate: number       // e.g. 93 for "93% positive impact"
  modules: { title: string; topics: string[] }[]
  published: boolean
}

export interface LeadForm {
  name: string; email: string; phone: string
  domain: CareerDomain; nationality: 'india' | 'international'
  // NEVER include payment fields in this interface
}
```

Design rules:
- `border-radius: 4px` crisp; `8px` modern card rounding
- `UniversityStrip`: `<img alt={course.universityLogoAlt}>` with CSS `filter: grayscale(1)` — NEVER override to color
- `SyllabusModal`: captures name + email + phone ONLY — NO payment fields — `role="status"` success state required
- `TalkToExperts`: multi-step with domain + nationality `<select>` — NO payment fields — submits to CRM endpoint only
- `OutcomeChart`: `<svg role="img" aria-label="Career outcome distribution chart">` required — accessible description mandatory
- `generateStaticParams()` from course slugs. `notFound()` for unknown slugs.

---

### Grok

Implement ROIMaster — career-ROI professional education hub for ambitious mid-career professionals.

1. `src/app/globals.css` — `--bg: #FFFFFF; --surface: #F3F4F6; --ink: #111827; --muted: #4B5563; --red: #E31E24; --success: #059669; --radius-sm: 4px; --radius: 8px` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `CareerDomain` union (ai|data-science|mba|product|marketing|design) — `Course` interface (slug, title, university, universityLogoSrc, universityLogoAlt, domain, durationWeeks, salaryHikePercent, placementRate, modules, published) — `LeadForm` interface (name, email, phone, domain, nationality — NO payment fields)
3. `src/lib/courses.ts` — 12 mock `Course` objects across 6 domains — `src/lib/outcomes.ts` — platform-wide stats object (careersTransformed: 150000, hiringPartners: 800, positiveImpactPercent: 93)
4. `src/app/page.tsx` — sticky nav with red "Talk to Experts" CTA + hero goal search + `UniversityStrip` (grayscale) + ROI stats block + trending course grid
5. `src/app/courses/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — university badge + `#E31E24` ROI banner + curriculum list + "Download Syllabus" → `SyllabusModal` trigger
6. `src/components/lead-gen/SyllabusModal.tsx` — `position: fixed; inset: 0` — name + email + `<input type="tel">` phone — NEVER payment fields — `role="status"` success state
7. `src/components/lead-gen/TalkToExperts.tsx` — multi-step: Step 1 name+email; Step 2 domain `<select>`; Step 3 nationality `<select>` (india|international) — submit to CRM endpoint — NEVER payment fields
8. QA: `grep -r "payment\|card\|stripe\|razorpay" src/components/lead-gen --include="*.tsx" -i` → empty — `grep -r "filter.*grayscale" src/components/ui/UniversityStrip.tsx` → must match — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a career-ROI professional education hub — "ROIMaster" — for ambitious mid-career professionals.

**Design layer:** `#FFFFFF` background, `#F3F4F6` surface, `#111827` text, `#4B5563` muted, `#E31E24` upGrad Red for CTAs/urgency/ROI banners, `#059669` success green for salary hike indicators. Typography: Montserrat weight 800 `clamp(32px, 5vw, 54px)` all-caps display tracking `-0.01em`; body Inter `16px` weight 400 leading 1.6; labels `12px` bold all-caps. `border-radius: 4px` crisp; `8px` cards.

**Data layer:** `CareerDomain` union (6 values). `Course` interface (slug, title, university, universityLogoSrc, universityLogoAlt, domain, durationWeeks, salaryHikePercent, placementRate, modules). `LeadForm` interface (name, email, phone, domain, nationality — no payment fields). `generateStaticParams()` for `[slug]`.

**Component layer:** `UniversityStrip` (`<ul role="list">` logos with CSS `filter: grayscale(1)` — never override). `ROIBlock` (count-up stats with `useReducedMotion()` guard). `CourseCard` (university badge + "Download Syllabus" `<button aria-label>` trigger). `SyllabusModal` (`position: fixed; inset: 0`, name+email+phone — NO payment fields, `role="status"` success). `TalkToExperts` (multi-step, domain+nationality `<select>` — NO payment fields). `OutcomeChart` (`<svg role="img" aria-label>` required).

**Motion layer:** Stat count-up: `0→final 1000ms ease-out`. Card entrance: `opacity 0→1 250ms ease-out`. `prefers-reduced-motion`: stat count-up shows final value immediately, cards visible immediately; `useReducedMotion()` guard on all Framer Motion components.
