---
prompt_id: business_03
sub_category: Education Business Website
sub_type: Premium EdTech K-12 and Competitive Preparation Platform
title: Personalized Outcomes — K-12 and Competitive Learning Platform
reference_patterns: proof_of_scale_education, personalized_learning_journeys, lead_to_trial_funnel
inspiration: byjus.com
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior product and conversion designer with 10+ years of experience building large-scale education technology websites. You understand how parents and students evaluate high-stakes learning platforms: visible outcomes, teacher credibility, pedagogy clarity, app experience, and counseling/admission flow.

You know that edtech conversion depends on trust at multiple levels. The buyer must believe the platform can improve outcomes, the learner must understand the product, and the parent must feel safe about the investment.

---

### Section 2 — Application Overview

This is a premium edtech platform serving K-12 students and competitive exam aspirants. The product portfolio includes personalized learning apps, online tutoring, JEE/NEET preparation, foundational school support, and test-prep programs.

The website must convert traffic into free class registrations, app installs, demo requests, scholarship inquiries, and program admissions. It must also support city-level discovery, parent trust reinforcement, and proof of learner outcomes.

Primary goal: lead and admission conversion. Secondary goal: app adoption and counseling funnel completion.

Core website areas: Homepage, Results/Proof pages, Program pages, App experience pages, Free trial/demo flow, Scholarship/exam pages, City/Center discovery, Support/FAQ, and policy pages.

---

### Section 3 — Brand Voice & Mood

Tone is authoritative, encouraging, and outcome-focused. It should feel academic but accessible, with enough warmth to reassure parents.

The copy should explain what the platform does, how it works, and why it is credible. It should not overpromise or lean on vague claims.

Visual mood is product-and-proof-led: clear metrics, student success proof, teacher credibility, app previews, and pathway cards. The interface should feel large-scale and dependable.

Vibe word: dependable.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — core value proposition, program pathway cards, proof metrics, teacher/mentor trust blocks, app story, free class CTA
2. **Results / Proof Pages** — outcomes by exam, year, and program; selection highlights; app adoption and usage metrics; proof methodology notes
3. **Programs** — K-12 learning, JEE, NEET, IAS/other competitive preparation, online tutoring, hybrid/offline options, class-wise pathways
4. **Free Trial / Demo Flow** — lead capture, child/student details, city, class/exam intent, OTP/contact verification, counselor follow-up
5. **Scholarship / Test Pages** — scholarship exam registration, eligibility, schedule, test center/city selection, confirmation
6. **City / Center Pages** — center network, local contact, class batches, demo booking, maps, language options, fee inquiry
7. **Support / FAQ / Policy** — course policy, fee policy, refund/cancellation terms, privacy/terms, contact options, parent support

---

### Section 5 — Design Specifications

**Visual style:** institutional, polished, and proof-heavy. Strong use of white space, blue trust tones, and metric-led cards.

**Color mode:** Light.

**Color palette:**
- Background: `#F7FAFE`
- Surface: `#FFFFFF`
- Section tint: `#EAF2FC`
- Primary text: `#12233F`
- Secondary text: `#4A5F7D`
- Tertiary text: `rgba(18,35,63,0.46)`
- Border: `rgba(18,35,63,0.14)`
- Primary action: `#0E4BAF`
- Action hover: `#0B3D8F`
- Success: `#1F7C3B`
- Warning: `#B36A12`
- Data accent: `#5E3BA9`

**Typography:**
- Display: `clamp(36px, 5vw, 62px)`, weight 700, line-height 1.1
- H2: `clamp(24px, 3.6vw, 40px)`, weight 600, line-height 1.15
- H3: `20px`, weight 600, line-height 1.25
- Body: `16px`, line-height 1.6
- Small/meta: `14px`, line-height 1.5
- Label/badge: `11px`, uppercase tracking `0.05em`

**Spacing:** 8pt scale.
- Section spacing: `88px` desktop / `56px` mobile
- Grid gaps: `20px` desktop / `14px` mobile

**Border radius:**
- Buttons: `8px`
- Cards: `10px`
- Inputs: `8px`
- Pills/badges: `999px`

**Responsive:** mobile-first.
- Breakpoints: `640`, `768`, `1024`, `1280`
- Program grid: 4 desktop, 2 tablet, 2 mobile

**Accessibility:** WCAG AA, keyboardable forms and filters, visible focus rings, screen-reader-safe lead flows.

**Motion:** restrained. transitions under `250ms`; no distracting autoplay loops.

---

### Section 6 — Structure

**Homepage**
1. Utility strip with helpline and free class messaging
2. Sticky nav with Programs, Results, App, Scholarship, Centers, Contact
3. Hero with personalized learning promise and CTA pair
4. Proof metrics band
5. Program pathway grid
6. App experience module
7. Teacher/mentor trust section
8. Parent testimonial block
9. Free class / demo CTA band
10. Footer with support and policy links

**Results / Proof pages**
- exam filters
- year filters
- program filters
- result highlights with context labels
- notes explaining what metric means

**Programs**
- pathway matrix by class/exam
- mode comparison: classroom, online, hybrid
- duration, schedule, and pedagogy summary

**Free Trial / Demo**
- student name
- parent contact
- city and class/exam intent
- verification flow
- confirmation and counselor callback

**Support / Policy**
- course policy
- fee policy
- refund/cancellation terms
- FAQ and contact

---

### Section 7 — Technical Specifications

- Next.js 14 + TypeScript strict
- Tailwind + CSS variables
- CMS-backed content for results/programs/teacher modules
- lead capture APIs with CRM integration
- analytics events for CTA clicks, app visits, form starts, and form submission
- mobile performance target: Lighthouse 95+

---

### Section 8 — Implementation Steps

1. IA, navigation, and global shell
2. Proof modules and results pages
3. Program matrix and mode comparison pages
4. App experience sections and free class CTA
5. Scholarship and demo lead forms
6. City/center discovery pages
7. Support/policy pages and contact routing
8. analytics and CRM integration
9. QA on mobile forms, proof clarity, and event tracking

Cut order: long editorial stories and secondary testimonial variants. Never cut proof modules, program clarity, or lead form reliability.

---

### Section 9 — User Experience

Users arrive with one of three goals:
1. improve school performance
2. prepare for a competitive exam
3. understand whether the app/course is worth it

The site must answer these quickly with proof, program clarity, and a visible next step.

Parents should see why the platform is credible. Students should see how the learning journey works. Both should see what action comes next.

Friction to remove: vague claims, long forms, hidden policy terms, unclear course fit, and poor mobile form usability.

---

### Section 10 — Constraints

- no vague “best in class” claims without proof context
- no hidden fee/refund policy details
- no long forms without progressive disclosure
- no inaccessible verification or form flows
- no cluttered CTA hierarchy

---

## Platform Versions

### Category A — Lovable

Build a premium K-12 edtech admissions website with proof-led, app-centric messaging. Inspired by byjus.com.

**Design system:**
Background `#F7FAFE`, surface `#FFFFFF`, tint `#EAF2FC`, text `#12233F`, action blue `#0E4BAF`. Cards `10px` radius, buttons `8px`, pills `999px`. Product-and-proof-led visual style.

**Build order:**
1. **Nav + Utility Strip** — sticky nav (Programs, Results, App, Scholarship, Centers, Contact) + free class messaging strip.
2. **Hero + ProofMetricsBand** — "personalized learning promise" H1 + dual CTA ("Book Free Class" / "Download App") + 4-stat metrics band (students, selections, teachers, years).
3. **ProgramPathwayGrid + AppExperienceModule** — K-12/JEE/NEET/IAS pathway cards + app feature highlights with product screen previews.
4. **TeacherTrustSection** — 4-col mentor cards (name, subject, experience, degree) — NO unverified claims.
5. **FreeClassCTA + CounselingForm** — free class registration (name, phone, city, class, exam) + counselor callback confirmation.

---

### ChatGPT Canvas

Let's build a premium K-12 edtech admissions website — "Personalized Learning Platform" — proof, app story, free class funnel. Inspired by byjus.com.

**Design system:**
- Background: `#F7FAFE`; Surface: `#FFFFFF`; Tint: `#EAF2FC`; Text: `#12233F`; Muted: `#4A5F7D`; Action: `#0E4BAF`
- Border-radius: `10px` cards, `8px` buttons + inputs, `999px` pills
- Font: Inter — display `clamp(36px,5vw,62px)` weight 700; body `16px` line-height 1.6; label `11px` uppercase `tracking-[0.05em]`

**Build iteratively:**
1. **Homepage** — utility strip + sticky nav + hero (dual CTA: "Book Free Class" / "Download App") + ProofMetricsBand (4 stats) + ProgramPathwayGrid + AppExperienceModule + TeacherTrustSection + parent testimonials + FreeClassCTA
2. **Results `/results`** — exam/year/program filters (`aria-pressed`) + outcome cards with context labels + app usage metrics + methodology note
3. **Programs `/programs/[track]`** — `generateStaticParams()` — pathway matrix by class/exam + mode comparison (classroom/online/hybrid) + pedagogy summary + free class CTA
4. **Free Trial `/free-class`** — student name + parent phone + city + class/exam intent + OTP verification + counselor callback confirmation

Motion: transitions under `250ms`. No autoplay loops. `prefers-reduced-motion: reduce` → disable all. Focus rings always visible.

---

### Bolt

Scaffold a K-12 edtech admissions platform — app-centric, proof-led, free class funnel. Next.js 14 + TypeScript + Tailwind.

```css
:root {
  --bg: #F7FAFE;
  --surface: #FFFFFF;
  --tint: #EAF2FC;
  --ink: #12233F;
  --muted: #4A5F7D;
  --action: #0E4BAF;
  --hover: #0B3D8F;
  --success: #1F7C3B;
  --data: #5E3BA9;
  --border: rgba(18,35,63,0.14);
}
```

Components:
- `ProofMetricsBand` — 4 stat cards: students enrolled, exam selections, teachers, years — each with context label and source note.
- `ProgramPathwayGrid` — K-12 / JEE / NEET / IAS / Olympiad cards — `grid-cols-4 md:grid-cols-2` — class range + mode chip + free class CTA.
- `AppExperienceModule` — product screen previews (left) + 4 feature highlights (right) — adaptive learning, live classes, test series, progress reports.
- `TeacherTrustSection` — 4-col mentor cards: name, subject, degree, years experience — `aria-label` per card.
- `FreeClassForm` — fields: `studentName`, `parentPhone`, `city`, `classLevel`, `examIntent` — OTP verification step — CRM payload on success.

No vague claims. All proof metrics must cite source. Free class form: no payment fields.

---

### Category A — v0

Create a Next.js 14 App Router premium edtech site — personalized learning, app-centric, free class conversion.

**CSS Tokens:**
```css
:root {
  --bg: #F7FAFE;
  --surface: #FFFFFF;
  --action: #0E4BAF;
  --ink: #12233F;
  --muted: #4A5F7D;
  --data: #5E3BA9;
}
```

**Specs:**
- `<ProofMetricsBand />` — 4 contextualized stats with source labels.
- `<ProgramPathwayGrid />` — K-12/JEE/NEET/IAS pathway cards with mode chip.
- `<AppExperienceModule />` — product screens + feature highlights (adaptive, live, tests, reports).
- `<TeacherTrustSection />` — 4-col mentor cards with credentials.
- `<FreeClassCTA />` — form (name, phone, city, class, exam) + OTP + counselor callback.

---

### Category B — Claude Artifacts

You are building a premium K-12 edtech admissions platform. Next.js 14 App Router, TypeScript strict, Tailwind, CMS-backed.

**Types (types/index.ts):**
```typescript
export type ExamTrack = 'K12' | 'JEE' | 'NEET' | 'IAS' | 'Olympiad';
export type LearningMode = 'classroom' | 'online' | 'hybrid';

export interface Mentor {
  name: string;
  subject: string;
  degree: string;
  yearsExperience: number;
  avatarAlt: string; // "[name], [subject] teacher"
}

export interface FreeClassPayload {
  studentName: string;
  parentPhone: string;
  city: string;
  classLevel: string;
  examIntent: ExamTrack;
}

export interface ProofMetric {
  value: string;
  label: string;
  source: string; // citation required
}
```

**Conventions:**
- `ProofMetric.source` must always render — no unsourced claims.
- `FreeClassPayload`: no payment fields — lead capture only.
- `Mentor.avatarAlt`: must follow format `"[name], [subject] teacher"`.
- All filters: `aria-pressed` active state, `role="group"` on filter bar.

---

### Grok

Implement a K-12 edtech admissions platform — personalized learning, app story, free class funnel. Next.js 14, TypeScript, Tailwind.

1. `src/app/globals.css` — CSS vars: `--bg: #F7FAFE; --action: #0E4BAF; --ink: #12233F; --muted: #4A5F7D; --data: #5E3BA9; --success: #1F7C3B` — radius: `button 8px; .card 10px; .pill 999px; .label 999px`
2. `src/types/index.ts` — `ExamTrack` union — `LearningMode` union — `Mentor` (name, subject, degree, yearsExperience, avatarAlt) — `ProofMetric` (value, label, source) — `FreeClassPayload` (studentName, parentPhone, city, classLevel, examIntent)
3. `src/lib/data.ts` — 4 ProofMetrics with source citations — 5 Programs — 8 Mentors with credentials — 15 Centers
4. `src/app/page.tsx` — utility strip + sticky nav + hero (dual CTA) + ProofMetricsBand + ProgramPathwayGrid + AppExperienceModule + TeacherTrustSection + parent testimonials + FreeClassCTA + footer
5. `src/app/results/page.tsx` — exam/year/program filters (`aria-pressed`) + contextualized outcome cards + app adoption metrics + methodology note
6. `src/app/programs/[track]/page.tsx` — `generateStaticParams()` + `notFound()` — pathway matrix + mode comparison + pedagogy summary + free class CTA
7. `src/app/free-class/page.tsx` — `FreeClassForm` (5 fields + OTP verification step) + counselor callback confirmation — server-validated — CRM payload
8. QA: `grep -r "ProofMetric" src/components --include="*.tsx"` → source always rendered — `grep -r "payment\|stripe\|card" src/components/forms --include="*.tsx" -i` → empty — `grep -r "avatarAlt" src/components/teachers --include="*.tsx"` → must match — `npx tsc --noEmit` → 0 errors

---

### Gemini

Design and implement a K-12 edtech admissions platform — personalized outcomes, app-centric, free class conversion funnel.

**Design layer:** `#F7FAFE` bg, `#FFFFFF` surface, `#EAF2FC` tint, `#12233F` ink, `#4A5F7D` muted, `#0E4BAF` action blue, `#5E3BA9` data accent. Inter. Display `clamp(36px,5vw,62px)` weight 700. Body `16px` line-height 1.6. Label `11px` uppercase `tracking-[0.05em]`. Cards `10px`, buttons `8px`, pills `999px`. Section padding `88px` desktop / `56px` mobile.

**Data layer:** `Mentor` (name, subject, degree, yearsExperience, avatarAlt) + `ProofMetric` (value, label, source) + `FreeClassPayload` (studentName, parentPhone, city, classLevel, examIntent). CMS-backed results/programs/teachers. CRM-ready free class API. Analytics: hero CTA click, app link click, form start, OTP verify, form submit.

**Component layer:** `ProofMetricsBand` (4 stats, source citation always visible). `ProgramPathwayGrid` (K-12/JEE/NEET/IAS, 4-col, mode chip, free class CTA). `AppExperienceModule` (product screens + adaptive/live/tests/reports feature list). `TeacherTrustSection` (4-col mentor cards, `avatarAlt` format enforced). `FreeClassForm` (5-field + OTP step + counselor callback confirmation).

**Motion layer:** Transitions under `250ms`. No autoplay loops. `prefers-reduced-motion: reduce` → disable all. Focus rings always visible. All proof metrics cite source. No vague "best in class" claims.

---

### Category B — Cursor

In `src/app/`, implement a K-12 edtech admissions platform. Next.js 14, Tailwind, TypeScript strict.

**Design variables in globals.css:**
```css
--bg: #F7FAFE; --surface: #FFFFFF; --tint: #EAF2FC;
--ink: #12233F; --muted: #4A5F7D; --action: #0E4BAF;
--data: #5E3BA9; --success: #1F7C3B; --border: rgba(18,35,63,0.14);
```

**Implementation order:**
1. `globals.css` — CSS vars + typography resets + radius tokens.
2. `src/components/proof/ProofMetricsBand.tsx` — 4 stats with source labels.
3. `src/components/programs/ProgramPathwayGrid.tsx` — pathway + mode chip.
4. `src/components/app/AppExperienceModule.tsx` — screens + feature list.
5. `src/components/teachers/TeacherTrustSection.tsx` — mentor cards with credentials.
6. `src/app/page.tsx` — full homepage assembly.
7. `src/app/results/page.tsx` — filtered outcomes hub + methodology note.
8. `src/app/programs/[track]/page.tsx` — `generateStaticParams()` + program detail.
9. `src/app/free-class/page.tsx` — multi-step form + OTP + confirmation.

**Rules:**
- `ProofMetric.source` always rendered — no unsourced metrics.
- `Mentor.avatarAlt` format: `"[name], [subject] teacher"`.
- Free class form: 5 fields max, no payment fields, server-validated.
- Filters: `aria-pressed` on active state.

---

## Review Notes

- Lovable:
- Replit:
- Bolt:
- v0:
- Claude Code:
- Codex:
- Gemini:
- Cursor:
- Overall score: /5
- What to fix:
