---
prompt_id: pcpp17
sub_category: Portfolio
sub_type: Premium Course Landing Page & Professional Network
title: ReforgeElite — Peer-Driven Growth & Artifact-Led Learning
reference_patterns: artifact_preview_grids, operator_led_storytelling, prestigious_alumni_walls
inspiration: reforge.com
quality_score:
status: draft
notes: Focused on an "Elite Tech Community" aesthetic with data-dense curriculum layouts and peer-driven social proof.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in high-end professional education, career-growth platforms, and elite tech community identities. You understand that for senior "operators" (PMs, Engineers, Growth leaders), the website is a "Proof of Relevance." You master the "Artifact-Led UI," where real-world strategy docs, PRDs, and roadmaps are the primary value anchors. You reject "cartoonish" e-learning templates in favor of the "Professional" philosophy: clean high-contrast grids, prestigious corporate logo walls (Google, Meta, Miro), and a focus on "Learn from Operators, not Professors." You design for "Career Velocity," ensuring that the path from a specific artifact preview to an annual $1,500 membership is authoritative, data-dense, and highly persuasive.

---

### Section 2 — Application Overview

This is a premium career-growth platform and membership hub for high-performing tech professionals. The audience consists of "Operators"—individuals currently in the trenches at top-tier startups and tech giants. The goal is to provide an "Evidence-Based" learning environment that combines live cohorts, a searchable library of 1,000+ real-world artifacts, and an elite peer network.

The application covers: High-Conversion Membership Home, Course-Specific Landing Pages (Curriculum-dense), Searchable Artifact Library, Operator/Host Directory, and a Team-Based Demo Portal.

---

### Section 3 — Brand Voice & Mood

The mood is "Technically Rigorous & Humanly Credible." It feels like a high-speed executive briefing or a private strategy session at a top VC firm. It is clean, ambitious, and highly structured.

Copy is direct, operator-centric, and outcome-oriented. Headers focus on "The Hardest Challenges": "Built for Builders," "Learn from real operators," "Relevant expertise for AI-native teams." It avoids educational fluff in favor of "Proven Approaches" and "Vetted Artifacts."

Vibe word: Rigorous.

---

### Section 4 — Core Features & Functionality

1. **"Artifact" Discovery Engine** — A specialized grid system that previews real-world strategy docs (e.g., "Uber's 2018 Growth Roadmap") with category tags and "Authority" metadata.
2. **Social-Proof Badge Strips** — High-impact, monochrome logo walls featuring the world's highest-performing tech teams (e.g., Miro, Toggl, Notion).
3. **Multi-Track Curriculum Hub** — A dense, scannable layout that organizes courses by "Live Cohort" vs. "On-Demand" and "Role-Specific" tracks (Product, Marketing, AI).
4. **"Learn from Operators" Grid** — A directory of course hosts featuring high-authority portraits, names, and titles (e.g., "CPO at [X]", "VP Growth at [Y]").
5. **Membership "Plus" Access Layer** — A pricing and feature module that clearly delineates between "Free Trial" value and "Unlimited Access" to artifacts and AI tools.

---

### Section 5 — Design Specifications

**Visual style:** Professional Tech Editorial. Modular blocks, high-contrast typography, and a "Data-Dense but Breathable" grid system. The UI is restrained to let the "Artifact" documents provide the visual value.

**Color mode:** Primarily Light Mode (High Signal).

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Surface/UI: `#F9FAFB` (Softest Grey)
- Text Primary: `#111827` (Deep Slate / Black)
- Text Secondary: `#4B5563` (Neutral Grey for descriptions)
- Accent: `#1D4ED8` (Reforge Blue — for primary CTAs and links)
- Border: `#E5E7EB` (Slate-200 — hair-line separators)

**Typography:** Functional Geometric Sans.
- Display Headings: `clamp(32px, 5vw, 56px)`, weight 800, tracking `-0.01em` (e.g., Inter, Montserrat, or Public Sans).
- Body/Curriculum: `16px`, weight 400, leading 1.6.
- Role Tags: `12px`, bold, all-caps, tracking `0.05em`.

**Spacing:** 16px base unit. 
- Section Padding: `96px` to `128px`.
- Grid Gaps: `24px` to `32px`.
- Container Max-width: `1280px` (Optimized for information density).

**Border radius:** `8px` (Modern, professional rounding) or `12px` for large cards.

**Responsive:** Mobile-first approach. Curriculum lists become vertical accordions on small screens. "Artifact" grids use horizontal swipe behavior on mobile.

**Accessibility:** WCAG AA. High-contrast text on white. All artifact previews must have "Doc-Type" ARIA labels and clear download/expand triggers.

**Motion:** 
- "Insight" Reveals: Staggered entry for artifact cards `opacity 0 -> 1` and `scale 0.98 -> 1`.
- Transition: Quick `300ms` fades between course modules.
- No distracting parallax.

---

### Section 6 — Structure

**Membership Landing Page Layout:**
1. **Nav:** Minimalist. Logo (Left). Right: Courses, Artifacts, For Teams, Sign In. Primary CTA: "Start Free Trial" (Blue).
2. **Hero:** High-impact Value Prop ("AI-native product teams start here") + Multi-device Mockup showing the Artifact Library.
3. **Authority Strip:** Grayscale logo wall: "Trusted by top performing teams."
4. **Artifact Preview Grid:** 3x2 grid of documents. Each card: [Doc Icon] [Company Logo] [Title] [Tags].
5. **Course Tracks:** 3-column section: Product, Growth, Marketing. Each with a list of 3-4 course links.

**Course Landing Page:**
- **Header:** Course Title -> Host Portraits -> "Live" or "On-Demand" Badge.
- **Curriculum:** Vertical stack of modules. Each: [Module Name] [Lesson Titles] [Key Artifacts included].
- **Testimonials:** Large-scale quote cards with high-authority headshots.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **Search:** Algolia for high-speed indexing of the 1,400+ entry Artifact Library.
- **CMS:** Sanity.io or Contentlayer (to handle structured course and document data).
- **Authentication:** Clerk or Auth.js (integrated with membership tier checks).
- **Payments:** Stripe (Customer Portal for team-based and individual billing).

---

### Section 8 — Implementation Steps

1. **The Professional Shell:** Setup `globals.css` with the Inter-font hierarchy and high-contrast Slate/White palette.
2. **Artifact Grid Engine:** Build the modular card system for document previews with SVG-based document icons.
3. **Authority Strip:** Implement the grayscale logo wall with responsive spacing and hover effects.
4. **Curriculum Layout:** Create the dense, hierarchical course detail view with tabbed "Live/On-demand" states.
5. **Membership Portal:** Build the multi-step signup modal and the "Artifact Lock" component for non-members.

---

### Section 9 — User Experience

The user is a "High-Performing Operator." 
The UI must be "Efficient and Evidence-Based." Don't just say a course is good—show the real-world documents (Artifacts) that the user will get access to.
The "Aha! moment" is the Artifact Preview—where the user sees a PRD from a company like Uber and realizes this is "Expert Secrets" not just "E-learning."

---

### Section 10 — Constraints

- **No generic "Online Course" visuals.** Avoid stock photos of students with laptops.
- **No pure black backgrounds.** Use white to maintain the "Professional Publication" feel.
- **No low-authority testimonials.** Every quote must have a corporate logo and senior title attached.
- **No cluttered sidebars.** Keep the focus on the central curriculum and artifacts.

---

## Platform Versions

### Category A — v0

Build an "Elite Professional Education" landing page inspired by Reforge. 
Style: Pure White background (#FFFFFF), Deep Slate typography (#111827), 8px border-radius, and bold modern Sans-serif fonts (Inter).
Include:
1. Artifact Preview Grid showcasing real-world tech documents (e.g., roadmaps, PRDs) with category tags.
2. High-Authority Logo Wall featuring top tech companies (Google, Meta, Notion).
3. Data-Dense Course Curriculum layout with host portraits and "Live/On-demand" badges.
Use high-contrast branding and a "Professional Operator" UI approach. No ads or blurs allowed.

---

### Category B — Cursor

In `src/app/`, implement a "Tech Career Growth Hub & Artifact Library" (Reforge style).
Stack: Next.js 14, Tailwind, Sanity CMS, Algolia, Stripe.
Visual Rules: 
- Primary Color: `#111827` (Black)
- Accent Color: `#1D4ED8` (Blue)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-lg` (8px)
- Font: Modern Grotesque Sans (e.g., Inter).

Implement:
1. `app/artifacts/page.tsx` - A high-speed searchable index of 1,000+ professional documents with company logos.
2. `app/courses/[slug]/page.tsx` - A detailed curriculum page with horizontal operator-host cards and high-authority testimonials.
3. `components/membership/ArtifactLock.tsx` - A premium gating component that shows a document preview with a "Join Membership to Unlock" CTA.
4. `components/ui/AuthorityStrip.tsx` - A responsive row of grayscale tech company logos with subtle hover reveals.

Focus on "Rigorous Excellence" and high-signal information hierarchy. No modern blurs. No generic stock imagery.

---

### Lovable

Build an elite professional education and membership platform — "Rigorous Excellence" — inspired by Reforge. White (#FFFFFF) canvas, deep slate (#111827) text, Reforge Blue (#1D4ED8) accent, 8px border-radius.

Must include:
- Authority logo wall: horizontal row of monochrome tech company logos (Google, Meta, Miro, Notion, Toggl). `filter: grayscale(1)`. `aria-label` per logo.
- Artifact preview grid: 3×2 card grid. Each: document SVG icon + company logo `<img alt>` + title + category tags. `aria-label="View artifact: {title}"`. Locked: blurred preview + "Join Membership to Unlock" overlay CTA.
- Course tracks section: 3-column (Product, Marketing, AI). Each: track name + 3-4 course links with Live/On-Demand badge.
- Operator portraits: instructor `<img alt>` + name + current title ("CPO at X") `12px` uppercase + student count.
- Membership CTA: "Start Free Trial" `#1D4ED8` button → `<a href={stripePortalUrl} rel="noopener noreferrer">`. No inline payment form.

`prefers-reduced-motion`: artifact card stagger instant, all visible immediately.

---

### ChatGPT Canvas

Let's build an elite professional education and membership platform — "Rigorous Excellence" — inspired by Reforge.

**Design system:**
- Background: `#FFFFFF`; Surface: `#F9FAFB`; Text: `#111827`; Muted: `#4B5563`; Accent: `#1D4ED8`; Border: `#E5E7EB`
- Border-radius: `8px` standard cards; `12px` large hero cards
- Font: Inter — display `clamp(32px, 5vw, 56px)` weight 800 `tracking: -0.01em`; body `16px` weight 400 leading 1.6; role tags `12px` bold uppercase `letter-spacing: 0.05em`

**Build iteratively:**
1. **Homepage** — value prop H1 + authority logo wall (`filter: grayscale(1)`) + artifact preview grid (3×2, locked state overlay) + 3-column course tracks + operator portrait grid
2. **Artifacts page** `/artifacts` — Algolia search + `aria-pressed` category filter + artifact card grid with `ArtifactLock` overlay
3. **Course page** `/courses/[slug]` — instructor hero + Live/On-demand badge + `CurriculumAccordion` + high-authority testimonials + membership CTA
4. **Membership CTA** — "Start Free Trial" `#1D4ED8` → external Stripe portal link. No inline payment.

Motion: artifact cards stagger `opacity 0→1 + scale 0.98→1 300ms`. Accordion `height 0→auto 300ms`. `prefers-reduced-motion`: all instant.

---

### Bolt

Scaffold an elite professional education and membership platform — data-dense, operator-led.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root {
  --bg: #FFFFFF; --surface: #F9FAFB;
  --ink: #111827; --muted: #4B5563;
  --blue: #1D4ED8; --border: #E5E7EB;
  --radius: 8px;
}
body { background: var(--bg); color: var(--ink); }
```

Components:
- `AuthorityStrip` — horizontal logo row. `filter: grayscale(1)`. `opacity 0.5→1` on hover. `aria-label` per logo.
- `ArtifactGrid` — 3×2 CSS grid. Each card `border-radius: var(--radius)`: SVG doc icon + company `<img alt>` + title + tags. `ArtifactLock`: blur + "Join to Unlock" overlay `<a href={stripePortalUrl} rel="noopener noreferrer">`. `aria-label="Join to unlock this artifact"`.
- `CurriculumAccordion` — weekly/module sections. Framer Motion `height 0→auto 300ms`. `useReducedMotion()`: instant expand.
- `OperatorCard` — portrait `<img alt>` + name `16px` bold + title `12px` uppercase + student count badge.
- `MembershipCTA` — `#1D4ED8` "Start Free Trial" `<a href={stripePortalUrl} rel="noopener noreferrer">`. No Stripe Elements.

---

### Claude Artifacts

Build a self-contained elite professional education platform. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type CourseTrack = 'product' | 'marketing' | 'ai' | 'engineering'
export type CourseFormat = 'live_cohort' | 'on_demand'

export interface Artifact {
  id: string; title: string; company: string
  category: CourseTrack; docType: string
  previewSrc: string; previewAlt: string
  isLocked: boolean
}

export interface CourseHost {
  id: string; name: string; title: string  // e.g. "CPO at Miro"
  imageSrc: string; imageAlt: string; studentCount: number
}

export interface Course {
  slug: string; title: string; track: CourseTrack
  format: CourseFormat; hosts: CourseHost[]
  modules: { name: string; lessons: string[]; artifacts: string[] }[]
  stripePortalUrl: string  // external — never inline form
}
```

Design rules:
- `--radius: 8px` standard cards; `12px` large hero cards
- `AuthorityStrip` logos: `filter: grayscale(1)` — never override in components
- `ArtifactLock`: `aria-label="Join to unlock this artifact"` — `<a href={stripePortalUrl} rel="noopener noreferrer">` — no inline payment
- `CurriculumAccordion`: `useReducedMotion()` guard on `AnimatePresence` height animation
- `generateStaticParams()` from course slugs. `notFound()` for unknown slugs.

---

### Grok

Implement ReforgeElite — elite professional education and membership platform.

1. `src/app/globals.css` — `--bg: #FFFFFF; --surface: #F9FAFB; --ink: #111827; --muted: #4B5563; --blue: #1D4ED8; --border: #E5E7EB; --radius: 8px` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `CourseTrack` union (product|marketing|ai|engineering) — `CourseFormat` union (live_cohort|on_demand) — `Artifact` interface (id, title, company, category, docType, previewSrc, previewAlt, isLocked) — `CourseHost` interface (id, name, title, imageSrc, imageAlt, studentCount) — `Course` interface (slug, title, track, format, hosts, modules, stripePortalUrl)
3. `src/lib/artifacts.ts` — 12 mock `Artifact` objects (mix locked/unlocked); `src/lib/courses.ts` — 6 mock `Course` objects; `src/lib/hosts.ts` — 10 `CourseHost` objects
4. `src/app/page.tsx` — value prop H1 + AuthorityStrip (`filter: grayscale(1)`, `aria-label`) + ArtifactGrid (3×2, locked overlay) + 3-col course tracks + OperatorCard grid
5. `src/app/artifacts/page.tsx` — search input + `aria-pressed` category filter + artifact card grid with `ArtifactLock` overlays
6. `src/app/courses/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — instructor hero + format badge + CurriculumAccordion + testimonials + membership CTA
7. `src/components/membership/ArtifactLock.tsx` — blur preview + "Join Membership to Unlock" overlay — `aria-label="Join to unlock this artifact"` — `<a href={stripePortalUrl} rel="noopener noreferrer">`
8. QA: `grep -r "grayscale(0)\|filter.*color" src/components --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement an elite professional education platform — "Rigorous Excellence" — for high-performing tech professionals.

**Design layer:** `#FFFFFF` background, `#F9FAFB` surface, `#111827` text, `#4B5563` muted, `#1D4ED8` Reforge Blue for CTAs/links, `#E5E7EB` borders. Typography: Inter — display `clamp(32px, 5vw, 56px)` weight 800 `tracking: -0.01em`; body `16px` leading 1.6; role tags `12px` bold uppercase. `border-radius: 8px` standard, `12px` large cards.

**Data layer:** `CourseTrack` union (4 values). `CourseFormat` union. `Artifact` interface (id, title, company, category, docType, previewSrc, isLocked). `CourseHost` interface (name, title, imageSrc, imageAlt, studentCount). `Course` interface (slug, title, track, format, hosts, modules, stripePortalUrl). `generateStaticParams()` for `[slug]`.

**Component layer:** `AuthorityStrip` (horizontal monochrome logos, `filter: grayscale(1)`, `aria-label`). `ArtifactGrid` (3×2 doc cards, `ArtifactLock` overlay with external link). `CurriculumAccordion` (`height 0→auto 300ms`, `useReducedMotion()` guard). `OperatorCard` (portrait + name + title + student count). `MembershipCTA` (external Stripe portal link — no inline form).

**Motion layer:** Artifact cards: stagger `opacity 0→1 + scale 0.98→1 300ms`. Accordion: `height 0→auto 300ms`. `prefers-reduced-motion`: all instant; `useReducedMotion()` guard on all Framer Motion.
