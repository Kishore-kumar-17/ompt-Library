# Standalone Prompt Format — Single File Structure

A standalone prompt is a single `.md` file containing a detailed base prompt plus 8 platform-adapted versions. Used for quick UI generation on AI platforms.

**Naming convention:** `{category}_{nn}.md`
Examples: `dpecom_01.md`, `bw_clinic_01.md`, `sbecom_03.md`

**Location:** `library/` directory (alongside scaffold directories)

---

## File Structure Overview

```
{YAML frontmatter}
---
## Base Prompt
  ### Section 1 — Role
  ### Section 2 — Application Overview
  ### Section 3 — Brand Voice & Mood
  ### Section 4 — Core Features & Functionality
  ### Section 5 — Design Specifications
  ### Section 6 — Structure
  ### Section 7 — Technical Specifications
  ### Section 8 — Implementation Steps
  ### Section 9 — User Experience
  ### Section 10 — Constraints
---
## Platform Versions
  ### 1 — Lovable
  ### 2 — ChatGPT Canvas
  ### 3 — Bolt
  ### 4 — v0
  ### 5 — Claude Artifacts
  ### 6 — Grok
  ### 7 — Gemini
  ### 8 — Cursor
```

---

## Part 1: YAML Frontmatter

```yaml
---
prompt_id: dpecom_01
sub_category: E-commerce
sub_type: Creator Digital Storefront
title: Neo-Creator — Bold Digital Goods Marketplace
reference_patterns: neo_brutalism, creator_first_onboarding, hard_shadow_components
inspiration: gumroad.com
quality_score:
status: draft
notes: Based on Gumroad's Neo-Brutalist aesthetic and creator-centric workflow.
---
```

| Field | Description |
|-------|-------------|
| `prompt_id` | Unique ID matching the filename |
| `sub_category` | Top-level category (E-commerce, Business, Portfolio, Landing Page, etc.) |
| `sub_type` | Specific variant within the category |
| `title` | Human-readable descriptive title |
| `reference_patterns` | Pattern names from `design-patterns.json` (never URLs) |
| `inspiration` | Real website the design is inspired by |
| `quality_score` | 1-5 score after testing (blank until tested) |
| `status` | `draft` / `tested` / `approved` / `rework` |
| `notes` | Context for the design direction |

---

## Part 2: Base Prompt (10 Sections)

The base prompt contains all design and technical specifications. Each platform version is adapted from this.

---

### Section 1 — Role

Sets who the AI is and what expertise it brings.

```markdown
### Section 1 — Role

You are a senior product designer specializing in {domain}. You understand
that {key insight about this type of product}. You reject {anti-pattern
aesthetic} in favor of {chosen aesthetic}: {defining characteristics}.
You design for {primary conversion goal}.
```

**Key qualities:**
- Specific domain expertise (not generic "web developer")
- States what the AI rejects (prevents generic output)
- Names the aesthetic movement/style explicitly
- Ties to a measurable goal

---

### Section 2 — Application Overview

What is being built, who it's for, and what pages/features exist.

```markdown
### Section 2 — Application Overview

This is a {product type} for {target user} to {primary action}. The customer
is a {persona description}. The {secondary user} is a {persona description}.

The application covers: {Page 1}, {Page 2}, {Page 3}, and {Page 4}.
The primary goal is a successful {conversion event}.
```

---

### Section 3 — Brand Voice & Mood

The emotional character of the design — how copy reads, what the vibe is.

```markdown
### Section 3 — Brand Voice & Mood

The mood is "{Aesthetic Name}" and "{Quality}." It feels like {analogy}.
It is {adjective}, {adjective}, and {adjective}. There is zero {anti-quality}.

Copy is {tone}. Headlines focus on {pattern}: "{example}," "{example}."
No {rejected language}. Just "{direct alternative}."

Vibe word: {Single Word}.
```

---

### Section 4 — Core Features & Functionality

Numbered list of pages/features with specific behaviors.

```markdown
### Section 4 — Core Features & Functionality

1. **{Page/Feature Name}** — {What it shows}. {Key UI element}. {Primary action}.
2. **{Page/Feature Name}** — {Layout description}. {Content areas}. {CTA}.
3. **{Page/Feature Name}** — {Component details}. {Interaction pattern}. {Data display}.
4. **{Page/Feature Name}** — {Modal/overlay/flow description}. {Steps}. {Success state}.
```

---

### Section 5 — Design Specifications

The most critical section. Exact visual tokens — no ambiguity.

```markdown
### Section 5 — Design Specifications

**Visual style:** {Style name}. {1-sentence defining characteristic}.

**Color mode:** {Light/Dark/High-contrast}.

**Color palette:**
- Background: `#{hex}` ({Name})
- Surface: `#{hex}`
- Borders/Lines: `#{hex}` ({weight if relevant})
- Primary Accent: `#{hex}` ({Name})
- Secondary Accent: `#{hex}` ({Name})
- Text Primary: `#{hex}`
- Text Secondary: `#{hex}`
- {Additional tokens as needed}

**Typography:** {Font family} ({classification}).
- Display H1: `clamp({min}px, {vw}vw, {max}px)`, Weight {n}, tracking `{em}em`, line-height {n}.
- Section H2: `{px}px`, Weight {n}, tracking `{em}em`.
- Body: `{px}px`, Weight {n}, line-height {n}.
- {Additional roles as needed}

**Spacing:** {base unit}px base unit.
- {Component-specific spacing rules}
- {Padding/margin patterns}

**Border radius:** {value}px ({rationale}).

**Responsive:** {Layout strategy}.

**Accessibility:** WCAG {level} for text contrast. Focus states use {description}.

**Motion:**
- {Animation 1}: {property} `{value}`. {Duration}.
- {Animation 2}: {description}.
- Respect: `prefers-reduced-motion: reduce` -> {fallback}.
```

**Quality bar:** Every value must be exact. "Nice typography" fails. "`Inter Medium 56px with -0.02em tracking`" passes.

---

### Section 6 — Structure

Page-by-page layout breakdown with section order.

```markdown
### Section 6 — Structure

**{Page} Layout:**
1. **{Section}** — {layout details}. {Content}. {Visual treatment}.
2. **{Section}** — {columns/grid}. {Left content}. {Right content}.
3. **{Section}** — {description}.

**{Page} Layout:**
1. **{Section}** — {details}.
2. **{Section}** — {details}.
```

---

### Section 7 — Technical Specifications

Framework, libraries, state management, key implementation patterns.

```markdown
### Section 7 — Technical Specifications

- **Framework:** {e.g., Next.js 14, React 18, TypeScript}.
- **Styling:** {e.g., Tailwind CSS}. {Custom utility classes}.
- **State:** {e.g., Zustand for cart/checkout}.
- **Components:** {Key reusable component pattern}.
- **Payment:** {Integration details if applicable}.
```

---

### Section 8 — Implementation Steps

Ordered build sequence — what to build first.

```markdown
### Section 8 — Implementation Steps

1. **{Step name}:** {What to build and why it comes first}.
2. **{Step name}:** {What to build next}.
3. **{Step name}:** {Continues in dependency order}.
4. **{Step name}:** {Later features}.
5. **{Step name}:** {Final polish}.
```

---

### Section 9 — User Experience

The human perspective — what matters to end users.

```markdown
### Section 9 — User Experience

The user wants to {primary goal} and get it {quality: fast/now/easily}.
The {secondary user} wants to {their goal}.
The UI should feel "{quality}" not through {wrong approach}, but through
{right approach}. {Specific UX principles}.
```

---

### Section 10 — Constraints (Anti-Patterns)

What to explicitly avoid. Prevents generic AI output.

```markdown
### Section 10 — Constraints

- **No {anti-pattern 1}.**
- **No {anti-pattern 2}.**
- **No {anti-pattern 3}.**
- **No {anti-pattern 4}.** {Use this instead}.
- **No {anti-pattern 5}.** {Specific alternative}.
```

---

## Part 3: Platform Versions (8 Versions)

Each platform version rewrites the base prompt to match that platform's capabilities, tone, and optimal prompt shape.

---

### Platform 1 — Lovable

**Tone:** Detailed, structured, implementation-ready.
**Length:** Long (150-250 lines).
**Key traits:**
- Tailwind config extension with exact tokens (code block)
- TypeScript interfaces for all data types (code block)
- Component-by-component build order with class lists
- Anti-pattern enforcement list
- Build verification: `tsc --noEmit && npm run build`

```markdown
### 1 — Lovable

Build **{AppName}** — {1-line description} — using {stack}. Static export.
Font: {Font} {weights} via `next/font/google`.

**Design identity: {Style Name}.** {2-3 defining rules with code}.

**Tailwind config extension:**
```js
// tailwind.config.ts
theme: { extend: { colors: {...}, boxShadow: {...}, fontFamily: {...} } }
```

**Core types:**
```typescript
export interface {MainType} { ... }
export interface {SecondaryType} { ... }
```

**{Domain-specific constraint}** — {Rule with right/wrong examples}.

**Page sections (build in this order):**
1. **{Component}** — {Tailwind classes}, {behavior}
2. **{Component}** — {Tailwind classes}, {behavior}
...

**Anti-patterns:**
- Never {thing} — {why}
- Never {thing} — {alternative}

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**
```

---

### Platform 2 — ChatGPT Canvas

**Tone:** Structured, code-heavy, explicit setup commands.
**Length:** Medium-long (120-200 lines).
**Key traits:**
- Starts with bash setup commands
- Complete type system in one code block
- Key utility functions with full implementations
- Zustand store with full implementation
- Route list

```markdown
### 2 — ChatGPT Canvas

Create **{AppName}** — {description} — {stack}. Static export.

```bash
npx create-next-app@latest {name} --typescript --app --tailwind --import-alias "@/*"
npm install {dependencies}
```

**Tailwind config** — {what to extend}.

**Complete type system:**
```typescript
// src/types/index.ts
export interface {Type} { ... }
```

**Key utilities:**
```typescript
// src/lib/{util}.ts
export function {name}({params}): {return} { ... }
```

**Zustand store:**
```typescript
// src/store/{name}.ts
export const use{Name}Store = create<{Type}>()(...)
```

**Routes:**
- `/` — {description}
- `/{path}` — {description}
```

---

### Platform 3 — Bolt

**Tone:** File-structure-first, implementation-ready, copy-paste.
**Length:** Medium-long (120-200 lines).
**Key traits:**
- Complete file tree with descriptions
- Key component with full JSX/class list
- Domain-specific component patterns
- QA bash checks at the end

```markdown
### 3 — Bolt

Build **{AppName}** — {description}. {Stack}. Static export.

```bash
npx create-next-app@latest {name} --typescript --app --tailwind
npm install {dependencies}
```

**File structure:**
```
src/
  types/index.ts           — {types list}
  lib/
    data.ts                — {constants}
    {util}.ts              — {function description}
  store/
    {name}.ts              — {store description}
  components/
    layout/
      {Component}.tsx      — {1-line description}
    {domain}/
      {Component}.tsx      — {1-line description}
  app/
    globals.css
    layout.tsx
    page.tsx
    {route}/page.tsx
```

**{Key visual system} — the defining constraint:**
```
{Tailwind class pattern for core visual identity}
```

**`{Component}` class list:**
```tsx
<{element} className="{full Tailwind class string}">
  {children structure}
</{element}>
```

**QA checks:**
```bash
grep -r "{anti-pattern}" src/components --include="*.tsx"  # must be empty
tsc --noEmit && npm run build
```
```

---

### Platform 4 — v0

**Tone:** Component-focused, visual-first, Tailwind-heavy.
**Length:** Medium (80-150 lines).
**Key traits:**
- Tailwind aliases defined upfront (1 line)
- Full JSX for 3-4 key components with complete class lists
- Anti-pattern enforcement at the end
- Focused on visual output, less on architecture

```markdown
### 4 — v0

Design **{AppName}** component system — {description}. {Stack}.

**Tailwind aliases:** `{alias}` = `{hex}` . `{alias}` = `{hex}` . {shadow aliases}.

**{Component}:**
```tsx
<{element} className="{full class list}">
  {complete JSX structure}
</{element}>
```

**{Component}:**
```tsx
{complete JSX}
```

**{Component}:**
```tsx
{complete JSX}
```

**Anti-pattern enforcement:**
- {Rule with contrast ratios if relevant}
- {Rule with specific wrong/right examples}
```

---

### Platform 5 — Claude Artifacts

**Tone:** Constraint-driven, right/wrong examples, comprehensive.
**Length:** Long (150-250 lines).
**Key traits:**
- "N defining constraints" structure (numbered)
- Each constraint has WRONG and RIGHT code examples
- Complete folder structure
- `globals.css` content
- QA bash checks

```markdown
### 5 — Claude Artifacts

Build **{AppName}** — production-quality {description} — {stack}. Static export.

**{N} defining constraints:**

**Constraint 1 — {Name} (never approximate):**
```
/* WRONG: {bad pattern} */
/* RIGHT: {correct pattern} */
```

**Constraint 2 — {Name}:**
```typescript
// WRONG:
{bad code}

// RIGHT:
{correct code}
```

**Constraint 3 — {Name}:**
```
{Rule with specific values}
```

**Complete folder structure:**
```
src/
  {full tree with 1-line descriptions per file}
```

**`src/app/globals.css`:**
```css
{base styles}
```

**QA checks:**
```bash
tsc --noEmit
grep -r "{pattern}" src/ --include="*.tsx"  # {expected result}
npm run build
```
```

---

### Platform 6 — Grok

**Tone:** File-list-first, numbered generation order, rule-based.
**Length:** Medium (80-120 lines).
**Key traits:**
- Numbered file list (generate in this order)
- 1-line description per file
- Rules block at the end (apply to every file)
- No full code blocks — descriptions only

```markdown
### 6 — Grok

Generate all source files for **{AppName}** — {description}. {Stack}. Static export.

Generate in order:
1. `{file path}` — {what it contains}
2. `{file path}` — {what it contains}
3. `{file path}` — {function signature and behavior}
...
{15-25 files total}

**Rules for every file:**
- {Visual rule}
- {Contrast/accessibility rule}
- {Data handling rule}
- {State management rule}
```

---

### Platform 7 — Gemini

**Tone:** Layered architecture brief, design-system-first, structured.
**Length:** Medium-long (100-150 lines, minimum 24 lines).
**Key traits:**
- "N rules that define everything" upfront
- Color rules with contrast ratios
- "N layers" architecture breakdown
- Motion section with `useReducedMotion` requirement
- Functional requirements with input/output examples

```markdown
### 7 — Gemini

**Project:** {AppName} — {description}. {Stack}. Static export.

**Design system — {N} rules that define everything:**
1. {CSS/Tailwind rule}
2. {Shadow/border rule}
3. {Radius rule}
4. {Interaction rule}

**Color rules:**
- `{alias}` (`{hex}`) — always with `{text color}` ({ratio} {pass/fail})
- {More color pairing rules}

**Architecture — {N} layers:**

Layer 1 — Foundation: {types, utilities, stores}.

Layer 2 — Layout: {nav, footer with key classes}.

Layer 3 — {Domain}:
- `{Component}` — {key classes and behavior}
- `{Component}` — {key classes and behavior}

Layer 4 — {Feature}:
- `{Component}` — {behavior and constraints}

**Motion:**
- {Animation details with durations}
- All Framer Motion guarded by `useReducedMotion()`

**Functional requirements:**
- `{function}({input})` -> `{output}`
- `{function}({input})` -> `{output}`
```

---

### Platform 8 — Cursor

**Tone:** Code-heavy, full implementations, copy-paste ready.
**Length:** Long (150-250 lines).
**Key traits:**
- Complete file contents as code blocks (most code of any platform)
- Config files, type files, utility files, components — all full implementations
- Absolute rules with bash grep verification
- Every code block has the file path as a comment

```markdown
### 8 — Cursor

Build **{AppName}** {description}. {Stack}. Static export.

**`tailwind.config.ts`:**
```typescript
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: { ... } },
}
export default config
```

**`src/types/index.ts`:**
```typescript
export interface {Type} { ... }
```

**`src/lib/{util}.ts`:**
```typescript
export function {name}({params}): {return} {
  // full implementation
}
```

**`src/store/{name}.ts`:**
```typescript
// full Zustand store implementation
```

**`src/components/{domain}/{Component}.tsx`:**
```tsx
// full component implementation with all classes
```

**Absolute rules:**
```bash
grep -r "{anti-pattern}" src/components --include="*.tsx"  # must be empty
grep -r "{anti-pattern}" src --include="*.tsx"              # must be empty
tsc --noEmit && npm run build
```
```

---

## Platform Comparison Summary

| Platform | Tone | Code density | Length | Key differentiator |
|----------|------|-------------|--------|-------------------|
| Lovable | Structured | High | 150-250 | Tailwind config + types + build order |
| ChatGPT Canvas | Explicit | High | 120-200 | Setup commands + full utilities |
| Bolt | File-first | Medium-high | 120-200 | File tree + class patterns + QA |
| v0 | Visual | Medium | 80-150 | Full JSX components, less architecture |
| Claude Artifacts | Constraint-driven | High | 150-250 | WRONG/RIGHT examples per constraint |
| Grok | List-based | Low | 80-120 | Numbered file generation order |
| Gemini | Layered | Medium | 100-150 | Design rules + architecture layers |
| Cursor | Code-complete | Highest | 150-250 | Full file implementations, copy-paste |

---

## Quality Checklist (Before Saving)

1. All hex codes are specific (no "use a nice blue")
2. Typography uses `clamp()` with exact min/max values
3. Anti-patterns section has 4+ items
4. Each platform version is genuinely different (not copy-paste with minor edits)
5. `reference_patterns` in frontmatter lists pattern names, not URLs
6. No brand names appear in any platform version (use fictional app names)
7. Accessibility contrast ratios are called out for accent colors
8. `prefers-reduced-motion` handling is specified
9. Bash QA checks are included (at minimum in Bolt, Claude Artifacts, Cursor versions)
10. Cursor version has complete code blocks (not pseudocode)
