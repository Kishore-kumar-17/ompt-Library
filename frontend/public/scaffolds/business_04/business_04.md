---
prompt_id: business_04
sub_category: Education Business Website
sub_type: Career Acceleration & Tech Upskilling Platform
title: Placement Guarantee — Career Acceleration & Tech Upskilling Platform
reference_patterns: placement_proof_conversion, cohort_enrollment_funnel, mentor_credibility_trust
inspiration: scaler.com
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior product and conversion designer with 10+ years of experience building large-scale education technology websites. You understand high-stakes parent-student decision behavior: visible outcomes, teacher credibility, pedagogy clarity, app experience, and counseling/admission flow.

You know that edtech conversion depends on trust at multiple levels. The buyer must believe the platform can improve outcomes, the learner must understand the product, and the parent must feel safe about the investment.

---

### Section 2 — Application Overview

This is a premium edtech platform serving K-12 students and competitive exam aspirants. The product portfolio includes personalized learning apps, online tutoring, JEE/NEET preparation, foundation school support, and test-prep programs.

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

Build a premium career upskilling admissions website — placement proof, cohort enrollment, mentor credibility. Inspired by scaler.com.

**Design system:**
Background `#F7FAFE`, surface `#FFFFFF`, tint `#EAF2FC`, text `#12233F`, action blue `#0E4BAF`. Cards `10px` radius, buttons `8px`, pills `999px`. Proof-heavy, mentor-led layout.

**Build order:**
1. **Nav** — sticky nav (Programs, Mentors, Placement, Community, Contact) + "Apply Now" CTA button.
2. **Hero + PlacementProofBand** — placement guarantee headline + dual CTA ("Apply for Program" / "Talk to Counselor") + 4-stat proof band (avg package, top recruiter count, companies, alumni).
3. **ProgramCatalog** — Data Structures / Full Stack / System Design / ML — each card: duration, placement guarantee badge, mentor count, cohort size.
4. **MentorGrid** — 4-col mentor cards (name, company, role, alumni image `alt` required) — industry professionals only.
5. **CohortEnrollForm** — name, phone, current role, target role, years experience — qualification step — counselor callback.

---

### ChatGPT Canvas

Let's build a career acceleration admissions platform — "Placement Guarantee Upskilling" — proof, cohorts, mentor trust. Inspired by scaler.com.

**Design system:**
- Background: `#F7FAFE`; Surface: `#FFFFFF`; Tint: `#EAF2FC`; Text: `#12233F`; Muted: `#4A5F7D`; Action: `#0E4BAF`
- Border-radius: `10px` cards, `8px` buttons + inputs, `999px` pills
- Font: Inter — display `clamp(36px,5vw,62px)` weight 700; body `16px` line-height 1.6; label `11px` uppercase

**Build iteratively:**
1. **Homepage** — sticky nav + hero (placement guarantee headline + dual CTA) + PlacementProofBand (avg package/companies/alumni stats) + ProgramCatalog + MentorGrid + alumni testimonials + CohortEnrollCTA
2. **Placement `/placement`** — company-wise placement data (year/program filter `aria-pressed`) + salary distribution chart + recruiter logos — methodology note always visible
3. **Programs `/programs/[track]`** — `generateStaticParams()` — curriculum detail + mentor roster + cohort schedule + placement guarantee terms + apply CTA
4. **Apply `/apply`** — multi-step: program selection → background form (name, phone, role, experience) → qualification interview booking → confirmation

Motion: transitions under `250ms`. No autoplay loops. `prefers-reduced-motion: reduce` → disable all. Focus rings always visible.

---

### Bolt

Scaffold a career upskilling admissions platform — placement proof, cohort model, mentor credibility. Next.js 14 + TypeScript + Tailwind.

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
- `PlacementProofBand` — 4 stats: avg CTC, top package, companies hiring, alumni placed — each with year label and methodology note.
- `ProgramCatalog` — `grid-cols-3 md:grid-cols-2` — each card: program name, duration, placement guarantee badge, mentor count, cohort size, apply CTA.
- `MentorGrid` — `grid-cols-4 md:grid-cols-2` — mentor card: name, current company, role, `<img alt="[name], [role] at [company]">` required.
- `CohortEnrollForm` — fields: `name`, `phone`, `currentRole`, `targetProgram`, `yearsExperience` — qualification checkpoint — server-validated — CRM payload.

No placement guarantee claims without terms link. No uncontextualized salary figures. Mentor images: `alt` required.

---

### Category A — v0

Create a Next.js 14 App Router career upskilling platform — placement proof, cohort discovery, apply funnel.

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
- `<PlacementProofBand />` — 4 salary/company stats with year label + methodology note.
- `<ProgramCatalog />` — 3-col program cards with placement guarantee badge + cohort size.
- `<MentorGrid />` — 4-col mentor cards, `alt="[name], [role] at [company]"` required.
- `<RecruiterLogoStrip />` — grayscale company logos, `aria-label` per logo.
- `<CohortEnrollForm />` — 5-field apply form + qualification step + callback confirmation.

---

### Category B — Claude Artifacts

You are building a career acceleration admissions platform. Next.js 14 App Router, TypeScript strict, Tailwind, CMS-backed.

**Types (types/index.ts):**
```typescript
export type ProgramTrack = 'dsa' | 'full-stack' | 'system-design' | 'ml' | 'product';

export interface Mentor {
  name: string;
  company: string;
  role: string;
  avatarAlt: string; // "[name], [role] at [company]"
  linkedIn?: string;
}

export interface PlacementStat {
  value: string;
  label: string;
  year: number;
  methodology: string; // citation required — always render
}

export interface CohortApplication {
  name: string;
  phone: string;
  currentRole: string;
  targetProgram: ProgramTrack;
  yearsExperience: number;
}
```

**Conventions:**
- `PlacementStat.methodology` always rendered — no unsourced salary claims.
- `Mentor.avatarAlt` must follow `"[name], [role] at [company]"` format.
- `CohortApplication`: no payment fields — qualification lead only.
- Placement guarantee sections: must link to terms and conditions page.

---

### Grok

Implement a career upskilling admissions platform — placement guarantee, cohort model, mentor credibility. Next.js 14, TypeScript, Tailwind.

1. `src/app/globals.css` — CSS vars: `--bg: #F7FAFE; --action: #0E4BAF; --ink: #12233F; --muted: #4A5F7D; --data: #5E3BA9; --success: #1F7C3B` — radius: `button 8px; .card 10px; .pill 999px`
2. `src/types/index.ts` — `ProgramTrack` union — `Mentor` (name, company, role, avatarAlt, linkedIn?) — `PlacementStat` (value, label, year, methodology) — `CohortApplication` (name, phone, currentRole, targetProgram, yearsExperience)
3. `src/lib/data.ts` — 4 PlacementStats with year + methodology — 6 Programs with cohort details — 12 Mentors with company/role — 30+ recruiter companies
4. `src/app/page.tsx` — sticky nav + hero (placement headline + dual CTA) + PlacementProofBand + ProgramCatalog + MentorGrid + alumni testimonials + CohortEnrollCTA + footer
5. `src/app/placement/page.tsx` — year/program filters (`aria-pressed`) + company placement data + salary distribution + RecruiterLogoStrip — methodology note always visible
6. `src/app/programs/[track]/page.tsx` — `generateStaticParams()` + `notFound()` — curriculum detail + cohort schedule + mentor roster + placement guarantee terms link + apply CTA
7. `src/app/apply/page.tsx` — multi-step: program select → `CohortApplication` form (5 fields) → interview booking → confirmation — server-validated — CRM payload
8. QA: `grep -r "guaranteed.*salary\|100%.*placement" src --include="*.tsx"` → always has terms link — `grep -r "avatarAlt" src/components/mentors --include="*.tsx"` → must match format — `grep -r "payment\|stripe\|card" src/components/forms --include="*.tsx" -i` → empty — `npx tsc --noEmit` → 0 errors

---

### Gemini

Design and implement a career upskilling admissions platform — placement guarantee, cohort enrollment, mentor credibility.

**Design layer:** `#F7FAFE` bg, `#FFFFFF` surface, `#EAF2FC` tint, `#12233F` ink, `#4A5F7D` muted, `#0E4BAF` action blue, `#5E3BA9` data accent, `#1F7C3B` success. Inter. Display `clamp(36px,5vw,62px)` weight 700. Body `16px` line-height 1.6. Label `11px` uppercase `tracking-[0.05em]`. Cards `10px`, buttons `8px`, pills `999px`. Section padding `88px` desktop / `56px` mobile.

**Data layer:** `Mentor` (name, company, role, avatarAlt: "[name], [role] at [company]") + `PlacementStat` (value, label, year, methodology) + `CohortApplication` (name, phone, currentRole, targetProgram, yearsExperience). CMS-backed programs/mentors/placement. CRM-ready cohort application API. Analytics: CTA click, form start, qualification step, interview booking, confirmation.

**Component layer:** `PlacementProofBand` (4 salary/company stats, year label + methodology always visible). `ProgramCatalog` (3-col, placement guarantee badge — must link to terms, cohort size, mentor count, apply CTA). `MentorGrid` (4-col, `avatarAlt` format enforced, company + role). `RecruiterLogoStrip` (grayscale logos, `aria-label` per logo). `CohortEnrollForm` (5-field multi-step + interview booking + confirmation).

**Motion layer:** Transitions under `250ms`. No autoplay loops. `prefers-reduced-motion: reduce` → disable all. Focus rings always visible. Placement guarantee claims always linked to terms page.

---

### Category B — Cursor

In `src/app/`, implement a career upskilling admissions platform. Next.js 14, Tailwind, TypeScript strict.

**Design variables in globals.css:**
```css
--bg: #F7FAFE; --surface: #FFFFFF; --tint: #EAF2FC;
--ink: #12233F; --muted: #4A5F7D; --action: #0E4BAF;
--data: #5E3BA9; --success: #1F7C3B; --border: rgba(18,35,63,0.14);
```

**Implementation order:**
1. `globals.css` — CSS vars + typography resets + radius tokens.
2. `src/components/proof/PlacementProofBand.tsx` — 4 stats with year + methodology note.
3. `src/components/programs/ProgramCatalog.tsx` — cohort cards + guarantee badge + terms link.
4. `src/components/mentors/MentorGrid.tsx` — 4-col, `avatarAlt` enforced.
5. `src/app/page.tsx` — full homepage assembly.
6. `src/app/placement/page.tsx` — filtered placement data + recruiter logos + methodology.
7. `src/app/programs/[track]/page.tsx` — `generateStaticParams()` + curriculum + cohort + apply CTA.
8. `src/app/apply/page.tsx` — multi-step cohort application + interview booking + confirmation.

**Rules:**
- `PlacementStat.methodology` always rendered — no unsourced figures.
- `Mentor.avatarAlt` format: `"[name], [role] at [company]"`.
- Placement guarantee: always links to terms page.
- Application form: no payment fields — lead capture only.

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
