# PromptVault AI — Prompt Engine Architecture
**Version:** 1.0  
**Date:** 2026-06-27  
**Author:** Lead AI Solutions Architect  
**Status:** Pre-implementation — Awaiting approval before any code is written

---

## Table of Contents

1. [Architecture Review](#1-architecture-review)
2. [Gap Analysis](#2-gap-analysis)
3. [Integration Strategy](#3-integration-strategy)
4. [Updated Folder Structure](#4-updated-folder-structure)
5. [Engine Architecture](#5-engine-architecture)
6. [Data Flow Diagrams](#6-data-flow-diagrams)
7. [API Design](#7-api-design)
8. [Type Definitions](#8-type-definitions)
9. [Database Changes](#9-database-changes)
10. [Prompt Pipeline Architecture](#10-prompt-pipeline-architecture)
11. [State Management Architecture](#11-state-management-architecture)
12. [Frontend Integration Plan](#12-frontend-integration-plan)
13. [Backend Integration Plan](#13-backend-integration-plan)
14. [AI Service Abstraction](#14-ai-service-abstraction)
15. [Testing Strategy](#15-testing-strategy)
16. [Performance Considerations](#16-performance-considerations)
17. [Security Considerations](#17-security-considerations)
18. [Future Roadmap](#18-future-roadmap)

---

## 1. Architecture Review

### 1.1 What Exists Today

The current PromptVault platform is a production-ready monorepo with two well-separated workspaces:

```
prompt-library-backend/
├── backend/              Hono.js + TypeScript + Drizzle ORM + PostgreSQL
│   └── src/
│       ├── routes/
│       │   ├── auth.ts           JWT auth (register, login, /me)
│       │   ├── prompts.ts        User prompt CRUD + lifecycle
│       │   ├── prompt-library.ts Pre-seeded library (raw SQL, 350+ prompts)
│       │   ├── submissions.ts    Community submission workflow
│       │   ├── admin.ts          Bulk CSV import
│       │   ├── profile.ts        User stats + saved prompts
│       │   ├── builder.ts        ← AI generation (EXISTS, partial)
│       │   └── improver.ts       ← AI improvement (EXISTS, partial)
│       ├── db/
│       │   ├── schema.ts         20 Drizzle tables (source of truth)
│       │   └── client.ts         postgres.js driver
│       └── middleware/auth.ts    requireAuth + requireAdmin guards
│
└── frontend/             React 18 + Vite + TypeScript + Tailwind CSS v4
    └── src/app/
        ├── App.tsx               String-based router (useState)
        ├── lib/api.ts            Typed fetch wrappers (authApi, builderApi, etc.)
        └── components/pages/
            ├── Builder.tsx       ← AI Builder UI (EXISTS, partial)
            ├── Improver.tsx      ← AI Improver UI (EXISTS, partial)
            └── (12 other pages)
```

### 1.2 Current Engine Capabilities

**Builder (`/api/builder/generate`):**
- Input: `{ idea, family, platform, style?, mood?, aspect? }`
- Output: `{ prompt, platform, family, tokensUsed }`
- Uses the "Pro Formula v4.2" system embedded directly in the route file
- Platform formulas for: chatgpt, gemini, grok, midjourney, firefly, flux (6 platforms, image-only bias)
- Anthropic client instantiated fresh on every request — no pooling
- No auth required — no usage tracking per user
- Does NOT save to the `built_prompts` database table (table exists, route ignores it)

**Improver (`/api/improver/improve`):**
- Input: `{ prompt, platform, family? }`
- Output: `{ improved, changes[], platform, family, tokensUsed }`
- Platform improvement rules for the same 6 platforms
- Family auto-detected via regex heuristic in `detectFamily()`
- Returns structured JSON `{ improved, changes }` with AI-enforced format
- Does NOT save to the `improved_prompts` table (table exists, route ignores it)

**Frontend Builder:**
- Supports 4 families: image, video, text, content
- Single-platform and "Generate All" (parallel 6 calls) modes
- Save button: toast only — no actual API call to persist
- No streaming — full response wait

**Frontend Improver:**
- Platform tabs for same 6 platforms
- Shows "What changed" breakdown after improvement
- No save to library functionality wired up

### 1.3 Database Schema Assessment

The schema in `schema.ts` is well-designed with 20 tables. Key existing tables relevant to the engine:

| Table | Status | Notes |
|-------|--------|-------|
| `built_prompts` | Exists, unused | Has `fieldValues jsonb`, `generatedPrompt`, `savedAsPromptId` |
| `improved_prompts` | Exists, unused | Has `originalText`, `improvedText`, `changesSummary jsonb` |
| `prompt_variables` | Exists, unused | Has `name`, `placeholder`, `defaultValue`, `isRequired` |
| `platforms` | Exists | Only 6 platforms seeded (image-focused) |
| `categories` | Exists | Needs expansion for text/video/code families |
| `prompts` | Exists, active | The user-submitted prompt lifecycle table |

### 1.4 What Is Missing

The engine PRD describes 8 modules. Current state:

| Module | Status |
|--------|--------|
| Prompt Builder | Partial (image/text only, no pipeline) |
| Prompt Improver | Partial (image/text only, no pipeline) |
| Prompt Analyzer | Missing |
| Prompt Optimizer | Missing |
| Prompt Converter | Missing |
| Prompt Explainer | Missing |
| Prompt Variable System | Schema exists, no implementation |
| Prompt Testing/Versioning | Missing |

---

## 2. Gap Analysis

### 2.1 Platform Coverage Gap

**Current:** 6 platforms hardcoded in two route files (image-heavy)  
**Required:** 25+ platforms across 4 families

| Family | Current | Required |
|--------|---------|----------|
| Image | 6 (chatgpt, gemini, grok, midjourney, firefly, flux) | +ideogram, +leonardo, +runway-image, +stable-diffusion (10 total) |
| Video | 0 | runway, veo, pika, kling, luma, sora (6) |
| Text | 0 | chatgpt, claude, gemini, grok, perplexity, deepseek (6) |
| Code | 0 | claude-code, cursor, copilot, chatgpt, gemini-code (5) |

### 2.2 Architecture Gap

**Current architecture (flat):**
```
HTTP Request → Route Handler → String System Prompt → Anthropic API → Response
```

**Required architecture (pipeline):**
```
Intent → Category Detection → Platform Detection → Requirement Extraction
→ Prompt Planning → Component Assembly → Platform Optimization
→ Prompt Validation → Prompt Scoring → Output Generation
```

Every stage independent and replaceable. Currently it's one monolithic string concatenation.

### 2.3 Module Gaps

| Gap | Impact | Priority |
|-----|--------|----------|
| No Analyzer module | Users get prompts but don't know why they work or what's missing | P1 |
| No Optimizer module | Platform-specific tuning is crude (wrong format, no token budgeting) | P1 |
| No Converter module | Can't move a prompt from Midjourney to Flux format | P2 |
| No Explainer module | No educational value — engine is a black box | P2 |
| No Variable System | Prompts are static — no `{{subject}}` reuse | P2 |
| No Prompt Versioning | Can't track prompt improvement over time | P3 |
| No streaming | UX feels slow; 3-8 second full waits | P1 |
| No auth on engine | No per-user rate limiting, no usage attribution | P1 |
| No persistence in builder | `built_prompts` table unused | P1 |
| No code family support | Entire code generation category missing | P1 |
| No content family detail | Content category too vague | P2 |

### 2.4 Data Model Gap

**`platforms` table:** Only seeded for 6 image platforms. Needs 25+ entries with `family` discriminator.

**`categories` table:** No entries for text/code/video categories. No relationship to platform compatibility.

**Missing tables:**
- `engine_runs` — audit log of every pipeline execution
- `prompt_scores` — persisted quality scores per prompt
- `prompt_versions` — versioned prompt history
- `platform_formulas` — database-driven formula definitions (replace hardcoded strings)
- `prompt_variables` — exists but no route uses it

### 2.5 Frontend Gap

| Gap | Impact |
|-----|--------|
| String-based router | Can't deep-link to engine tools, no browser back/forward |
| Builder save button is fake | Generates prompt but saving is a toast with no API call |
| No Analyzer UI | No surface to visualize prompt quality scores |
| No Converter UI | Can't switch a prompt between platforms with one click |
| No Variable UI | Can't create/fill prompt templates |
| No streaming render | Output appears all-at-once, poor perceived performance |
| No history panel | User loses previous generations on page reload |
| Builder doesn't show category-specific fields | Same 3 fields for all categories |

---

## 3. Integration Strategy

### 3.1 Principles

1. **Never rewrite working code.** Auth, CRUD routes, library search, admin import — all untouched.
2. **Extend, don't replace.** The existing `builder.ts` and `improver.ts` become thin adapters that call into the new engine service layer.
3. **Additive database changes only.** New tables added via migrations. Existing 20 tables unchanged.
4. **Ship incrementally.** The engine is delivered in phases. Each phase adds a module without breaking existing functionality.
5. **The engine is a service, not a route.** Routes stay thin. Business logic lives in `engine/` services.

### 3.2 Migration Path

**Phase 0 — Foundation (no breaking changes):**
- Create `backend/src/engine/` directory
- Implement AI service abstraction (client pool, token tracking)
- Create engine pipeline types
- Add new DB tables via migration
- Seed new platforms and categories

**Phase 1 — Refactor existing Builder + Improver:**
- Move hardcoded formulas out of routes into `engine/platforms/`
- Wire existing routes through the new pipeline
- Persist to `built_prompts` and `improved_prompts` tables
- Add auth requirement + rate limiting
- Add streaming support

**Phase 2 — Add Analyzer + Optimizer:**
- New routes `/api/engine/analyze` and `/api/engine/optimize`
- Frontend: new Analyzer panel inside Builder result view
- Optimizer: expose as "Optimize for Platform" action on existing prompts

**Phase 3 — Add Converter + Explainer:**
- Converter: cross-platform translation
- Explainer: "Why does this prompt work?" breakdown
- Frontend: add these as tabs in the Detail page

**Phase 4 — Variable System + Versioning:**
- Template system: `{{variable}}` extraction and filling
- Prompt versions: save snapshots with diff view
- History panel in frontend

### 3.3 Coexistence Contract

The new engine exposes all its functionality under `/api/engine/*`. The existing routes stay under their current mounts. No existing API contract changes.

```
Existing (untouched):    /api/auth, /api/prompts, /api/library, /api/submissions
                         /api/profile, /api/admin
Adapter (refactored):    /api/builder/generate  → calls engine.build()
                         /api/improver/improve  → calls engine.improve()
New engine:              /api/engine/analyze
                         /api/engine/optimize
                         /api/engine/convert
                         /api/engine/explain
                         /api/engine/variables
                         /api/engine/history
```

---

## 4. Updated Folder Structure

```
prompt-library-backend/
├── backend/
│   └── src/
│       ├── app.ts                          (add engine router mount)
│       ├── db/
│       │   ├── schema.ts                   (add engine tables)
│       │   └── client.ts                   (unchanged)
│       ├── middleware/
│       │   ├── auth.ts                     (unchanged)
│       │   └── rateLimit.ts                (NEW — per-user engine rate limiting)
│       ├── routes/
│       │   ├── auth.ts                     (unchanged)
│       │   ├── prompts.ts                  (unchanged)
│       │   ├── prompt-library.ts           (unchanged)
│       │   ├── submissions.ts              (unchanged)
│       │   ├── admin.ts                    (unchanged)
│       │   ├── profile.ts                  (unchanged)
│       │   ├── builder.ts                  (refactored — thin adapter)
│       │   ├── improver.ts                 (refactored — thin adapter)
│       │   └── engine.ts                   (NEW — Analyzer, Optimizer, Converter, Explainer)
│       └── engine/
│           ├── index.ts                    (NEW — engine entry point, exports all services)
│           ├── types.ts                    (NEW — all engine TypeScript interfaces)
│           ├── pipeline/
│           │   ├── index.ts                (NEW — orchestrates pipeline stages)
│           │   ├── intent-analyzer.ts      (NEW — stage 1: parse user intent)
│           │   ├── category-detector.ts    (NEW — stage 2: detect family + category)
│           │   ├── platform-resolver.ts    (NEW — stage 3: resolve platform config)
│           │   ├── requirement-extractor.ts (NEW — stage 4: extract structured requirements)
│           │   ├── prompt-planner.ts       (NEW — stage 5: plan component structure)
│           │   ├── component-assembler.ts  (NEW — stage 6: assemble prompt components)
│           │   ├── platform-optimizer.ts   (NEW — stage 7: apply platform-specific rules)
│           │   ├── prompt-validator.ts     (NEW — stage 8: validate output)
│           │   └── prompt-scorer.ts        (NEW — stage 9: score the output)
│           ├── modules/
│           │   ├── builder.ts              (NEW — build service, calls pipeline)
│           │   ├── improver.ts             (NEW — improve service, calls pipeline)
│           │   ├── analyzer.ts             (NEW — analyze service)
│           │   ├── optimizer.ts            (NEW — optimize service)
│           │   ├── converter.ts            (NEW — convert between platforms)
│           │   └── explainer.ts            (NEW — explain why a prompt works)
│           ├── platforms/
│           │   ├── index.ts                (NEW — platform registry)
│           │   ├── image/
│           │   │   ├── midjourney.ts       (extracted from builder.ts)
│           │   │   ├── chatgpt.ts          (extracted from builder.ts)
│           │   │   ├── gemini.ts           (extracted from builder.ts)
│           │   │   ├── firefly.ts          (extracted from builder.ts)
│           │   │   ├── flux.ts             (extracted from builder.ts)
│           │   │   ├── grok.ts             (extracted from builder.ts)
│           │   │   ├── ideogram.ts         (NEW)
│           │   │   ├── leonardo.ts         (NEW)
│           │   │   ├── stable-diffusion.ts (NEW)
│           │   │   └── runway-image.ts     (NEW)
│           │   ├── video/
│           │   │   ├── runway.ts           (NEW)
│           │   │   ├── veo.ts              (NEW)
│           │   │   ├── pika.ts             (NEW)
│           │   │   ├── kling.ts            (NEW)
│           │   │   ├── luma.ts             (NEW)
│           │   │   └── sora.ts             (NEW)
│           │   ├── text/
│           │   │   ├── chatgpt.ts          (NEW)
│           │   │   ├── claude.ts           (NEW)
│           │   │   ├── gemini.ts           (NEW)
│           │   │   ├── grok.ts             (NEW)
│           │   │   ├── perplexity.ts       (NEW)
│           │   │   └── deepseek.ts         (NEW)
│           │   └── code/
│           │       ├── claude-code.ts      (NEW)
│           │       ├── cursor.ts           (NEW)
│           │       ├── copilot.ts          (NEW)
│           │       ├── chatgpt.ts          (NEW)
│           │       └── gemini-code.ts      (NEW)
│           ├── components/
│           │   ├── index.ts                (NEW — component registry)
│           │   ├── role.ts                 (NEW — Role component builder)
│           │   ├── objective.ts            (NEW — Objective component builder)
│           │   ├── context.ts              (NEW — Context component builder)
│           │   ├── constraints.ts          (NEW — Constraints component builder)
│           │   ├── style.ts                (NEW — Style component builder)
│           │   ├── output-format.ts        (NEW — Output format component builder)
│           │   ├── technical.ts            (NEW — Technical instructions component)
│           │   ├── platform-params.ts      (NEW — Platform-specific parameters)
│           │   ├── safety.ts               (NEW — Safety rules component)
│           │   └── negative.ts             (NEW — Negative instructions component)
│           ├── scoring/
│           │   ├── index.ts                (NEW — scoring orchestrator)
│           │   ├── rules.ts                (NEW — scoring rubric definitions)
│           │   └── scorer.ts               (NEW — per-dimension scorer)
│           └── ai/
│               ├── client.ts               (NEW — shared Anthropic client singleton)
│               ├── stream.ts               (NEW — SSE streaming helpers)
│               └── tokens.ts               (NEW — token budget + tracking)
│
└── frontend/
    └── src/app/
        ├── App.tsx                         (add new engine routes)
        ├── lib/
        │   ├── api.ts                      (add engineApi)
        │   ├── stream.ts                   (NEW — SSE consumer helpers)
        │   └── engine-store.ts             (NEW — engine session state)
        └── components/
            ├── engine/
            │   ├── EngineShell.tsx         (NEW — unified engine layout)
            │   ├── BuilderV2.tsx           (NEW — full-featured builder)
            │   ├── ImproverV2.tsx          (NEW — streaming improver)
            │   ├── Analyzer.tsx            (NEW — prompt analyzer with scores)
            │   ├── Optimizer.tsx           (NEW — platform optimizer)
            │   ├── Converter.tsx           (NEW — cross-platform converter)
            │   ├── Explainer.tsx           (NEW — prompt explainer)
            │   ├── VariableEditor.tsx      (NEW — template variable UI)
            │   ├── HistoryPanel.tsx        (NEW — session history sidebar)
            │   ├── ScoreCard.tsx           (NEW — quality score visualization)
            │   ├── PipelineStatus.tsx      (NEW — streaming pipeline progress)
            │   └── CategoryPicker.tsx      (NEW — hierarchical category selector)
            └── pages/
                ├── Builder.tsx             (updated — delegates to BuilderV2)
                ├── Improver.tsx            (updated — delegates to ImproverV2)
                └── Engine.tsx              (NEW — unified engine hub page)
```

---

## 5. Engine Architecture

### 5.1 Core Design: The Engine Is a Service Layer

The Prompt Engine is not a set of routes. It is a service layer that routes can call. This ensures:
- Routes stay thin (validation, auth, response serialization only)
- Engine logic is independently testable
- Pipeline stages can be unit-tested without HTTP
- Multiple routes can share the same engine logic

```
┌────────────────────────────────────────────────────┐
│                  HTTP Routes Layer                  │
│  /api/builder  /api/improver  /api/engine/*         │
└───────────────────┬────────────────────────────────┘
                    │ calls
┌───────────────────▼────────────────────────────────┐
│               Engine Modules Layer                  │
│   builder.ts  improver.ts  analyzer.ts              │
│   optimizer.ts  converter.ts  explainer.ts          │
└───────────────────┬────────────────────────────────┘
                    │ orchestrates
┌───────────────────▼────────────────────────────────┐
│              Pipeline Stages Layer                  │
│   IntentAnalyzer → CategoryDetector                 │
│   → PlatformResolver → RequirementExtractor         │
│   → PromptPlanner → ComponentAssembler              │
│   → PlatformOptimizer → Validator → Scorer          │
└───────────────────┬────────────────────────────────┘
                    │ uses
┌───────────────────▼────────────────────────────────┐
│             Infrastructure Layer                    │
│   AI Client (Anthropic)  Platform Registry          │
│   Component Registry     Scoring Rules              │
│   Token Tracker          Streaming SSE              │
└────────────────────────────────────────────────────┘
```

### 5.2 Platform Registry

Every platform is a typed configuration object. No hardcoded strings in route files.

```typescript
// engine/platforms/index.ts

interface PlatformConfig {
  id: string;
  name: string;
  family: "image" | "video" | "text" | "code";
  wordBudget: { min: number; max: number };
  structureRules: string;          // platform-native formatting rules
  systemPromptAddition: string;    // appended to the shared system prompt
  supportedTiers?: string[];       // e.g. ["PRODUCT", "PEOPLE", "ART"]
  parameterFlags?: string;         // e.g. "--ar X:Y --v 6.1" for Midjourney
  compressionLevel: "minimal" | "standard" | "verbose";
}

const platformRegistry = new Map<string, PlatformConfig>();
```

Each platform file in `engine/platforms/image/midjourney.ts` exports a `PlatformConfig` and registers itself.

### 5.3 Component System

Every prompt is built from named components. The system is modular: any component can be added, skipped, or overridden per platform or category.

```typescript
interface PromptComponent {
  key: ComponentKey;
  content: string;
  weight: number;         // how much this component contributes to quality
  required: boolean;
}

type ComponentKey =
  | "role"
  | "objective"
  | "context"
  | "constraints"
  | "style"
  | "output_format"
  | "technical"
  | "platform_params"
  | "safety"
  | "negative";
```

The `ComponentAssembler` stage receives a `ComponentPlan` (which components to include, in what order) and the platform's formatting rules, then assembles the final prompt string.

### 5.4 Scoring System

Prompt quality is measured across 6 dimensions. Each dimension has a 0–100 score and a weight.

| Dimension | Weight | What It Measures |
|-----------|--------|-----------------|
| Specificity | 25% | How precisely the subject/objective is described |
| Completeness | 20% | How many required components are present |
| Platform Fit | 20% | How well the format matches the target platform |
| Clarity | 15% | Absence of ambiguous or vague language |
| Structure | 10% | Correct ordering and formatting |
| Safety | 10% | Absence of harmful or policy-violating content |

**Overall Score** = weighted average, 0–100. Thresholds:
- 0–39: Poor — show improvement suggestions
- 40–69: Good — show "You could also try..." hints
- 70–89: Excellent
- 90–100: Pro-level

### 5.5 Pipeline Context Object

Every pipeline execution carries a `PipelineContext` object passed through all stages. Stages mutate it or replace fields.

```typescript
interface PipelineContext {
  // Input (set at start, never mutated)
  request: EngineRequest;
  userId: string | null;
  runId: string;
  startedAt: Date;

  // Stage 1: Intent analysis
  intent: ParsedIntent | null;

  // Stage 2: Category detection
  detectedFamily: Family | null;
  detectedCategory: string | null;

  // Stage 3: Platform resolution
  platform: PlatformConfig | null;

  // Stage 4: Requirements
  requirements: StructuredRequirements | null;

  // Stage 5: Plan
  componentPlan: ComponentKey[];

  // Stage 6: Components
  components: Map<ComponentKey, PromptComponent>;

  // Stage 7: Optimized output
  assembledPrompt: string | null;

  // Stage 8: Validation
  validationResult: ValidationResult | null;

  // Stage 9: Score
  score: PromptScore | null;

  // Metadata
  tokensUsed: number;
  stageTimings: Record<string, number>;
  errors: string[];
}
```

---

## 6. Data Flow Diagrams

### 6.1 Builder Pipeline

```
User Input
{ idea, family, platform, style?, mood?, aspect?, category? }
          │
          ▼
┌─────────────────────────┐
│   1. Intent Analyzer    │  Parses natural-language idea into structured intent
│   Model: haiku-4-5      │  { subject, action, setting, mood, style, constraints }
└────────────┬────────────┘
             │ ParsedIntent
             ▼
┌─────────────────────────┐
│  2. Category Detector   │  Confirms or overrides user-selected family/category
│   (Rule-based, fast)    │  Uses keyword matching + family from input
└────────────┬────────────┘
             │ { family, category, tier }
             ▼
┌─────────────────────────┐
│  3. Platform Resolver   │  Loads PlatformConfig from registry
│   (Registry lookup)     │  Validates platform supports the family
└────────────┬────────────┘
             │ PlatformConfig
             ▼
┌─────────────────────────┐
│ 4. Requirement Extract  │  Converts intent → structured requirements
│   Model: haiku-4-5      │  per component (role, obj, context, style, etc.)
└────────────┬────────────┘
             │ StructuredRequirements
             ▼
┌─────────────────────────┐
│  5. Prompt Planner      │  Decides which components to include, in which order
│   (Rule-based)          │  Based on family + category + platform
└────────────┬────────────┘
             │ ComponentPlan[]
             ▼
┌─────────────────────────┐
│  6. Component Assembler │  Builds each component's text
│   Model: sonnet-4-6     │  Assembles into platform-native format
└────────────┬────────────┘
             │ Assembled prompt string
             ▼
┌─────────────────────────┐
│ 7. Platform Optimizer   │  Applies platform-specific post-processing
│   (Rule-based)          │  Word budget enforcement, token hyphenation, flags
└────────────┬────────────┘
             │ Optimized prompt
             ▼
┌─────────────────────────┐
│  8. Prompt Validator    │  Checks: length in budget, required sections present,
│   (Rule-based)          │  no prohibited content, correct format markers
└────────────┬────────────┘
             │ ValidationResult
             ▼
┌─────────────────────────┐
│  9. Prompt Scorer       │  Scores across 6 dimensions
│   Model: haiku-4-5      │  Returns PromptScore { overall, breakdown[] }
└────────────┬────────────┘
             │ PipelineContext (complete)
             ▼
┌─────────────────────────┐
│  Persistence + Stream   │  Save to built_prompts table
│                         │  Stream final output + score to client
└─────────────────────────┘
```

### 6.2 Improver Pipeline (Simplified)

```
User Input: { prompt, platform, family? }
          │
          ▼
  Detect Family (fast heuristic, existing logic)
          │
          ▼
  Load PlatformConfig from registry
          │
          ▼
  Score original prompt (Scorer stage)    ← NEW: baseline score
          │
          ▼
  AI improvement call (Sonnet)
  System: SHARED_FORMULA + platformRule
  Enforce JSON response: { improved, changes[] }
          │
          ▼
  Score improved prompt                   ← NEW: score delta
          │
          ▼
  Persist to improved_prompts             ← NEW: was missing
          │
          ▼
  Return { improved, changes, scoreBefore, scoreAfter, delta }
```

### 6.3 Analyzer Data Flow

```
Input: { promptText, platform?, family? }
          │
          ▼
  Detect family + platform
          │
          ▼
  Score across 6 dimensions (haiku-4-5)
          │
          ▼
  Identify missing required components
          │
          ▼
  Generate specific improvement suggestions per dimension
          │
          ▼
  Return PromptAnalysis {
    score: PromptScore,
    missingComponents: ComponentKey[],
    presentComponents: ComponentKey[],
    suggestions: AnalysisSuggestion[],
    weakestDimension: string,
    strongestDimension: string
  }
```

### 6.4 Converter Data Flow

```
Input: { promptText, fromPlatform, toPlatform, family }
          │
          ▼
  Load both PlatformConfigs from registry
          │
          ▼
  Parse source prompt structure
  (identify components present in fromPlatform format)
          │
          ▼
  Component extraction (structured extraction via AI)
  Extract: subject, locks, camera, grade, palette, refs, excludes
          │
          ▼
  Re-assemble in toPlatform format
  Apply toPlatform word budget + structural rules
          │
          ▼
  Score converted prompt
          │
          ▼
  Return { converted, changesSummary, scoreAfter }
```

### 6.5 Streaming Architecture

```
Client                          Server
  │                               │
  │   POST /api/builder/generate  │
  │ ────────────────────────────► │
  │                               │  Stage 1: intent (fast)
  │ ◄── data: {stage: "intent"}   │
  │                               │  Stage 2: category (fast)
  │ ◄── data: {stage: "category"} │
  │                               │  Stage 3-5: planning (fast)
  │ ◄── data: {stage: "planning"} │
  │                               │  Stage 6: assembling (AI call)
  │ ◄── data: {stage: "building"} │
  │ ◄── data: {chunk: "..."}     │  Token streaming
  │ ◄── data: {chunk: "..."}     │
  │                               │  Stage 7-8: optimize + validate (fast)
  │ ◄── data: {stage: "scoring"}  │  Stage 9: scoring (AI call)
  │                               │
  │ ◄── data: {done: true,        │  Final payload
  │       prompt: "...",           │
  │       score: {...},            │
  │       runId: "..."}            │
  │                               │
  │   [SSE stream closed]         │
```

---

## 7. API Design

### 7.1 Existing Routes (Unchanged)

All existing `/api/auth/*`, `/api/prompts/*`, `/api/library/*`, `/api/submissions/*`, `/api/profile/*`, `/api/admin/*` routes remain unchanged.

### 7.2 Refactored Builder + Improver (Same URL, New Behavior)

#### `POST /api/builder/generate`

**Auth:** Optional (unauthenticated allowed with lower rate limit)

Request (unchanged schema, new optional fields):
```typescript
{
  idea: string;             // required
  family: string;           // required: "image" | "video" | "text" | "code" | "content"
  platform: string;         // required
  style?: string;
  mood?: string;
  aspect?: string;
  category?: string;        // NEW — hint for category detection
  stream?: boolean;         // NEW — SSE streaming (default: false)
}
```

Response (enriched):
```typescript
{
  prompt: string;
  platform: string;
  family: string;
  tokensUsed: number;
  score?: PromptScore;      // NEW — quality score
  runId?: string;           // NEW — for history lookup
}
```

#### `POST /api/improver/improve`

Request (unchanged):
```typescript
{
  prompt: string;
  platform: string;
  family?: string;
}
```

Response (enriched):
```typescript
{
  improved: string;
  changes: ImproverChange[];
  platform: string;
  family: string;
  tokensUsed: number;
  scoreBefore?: PromptScore;  // NEW
  scoreAfter?: PromptScore;   // NEW
  delta?: number;             // NEW — score improvement
}
```

### 7.3 New Engine Routes

#### `POST /api/engine/analyze`

```typescript
// Request
{
  promptText: string;           // required
  platform?: string;            // optional hint
  family?: string;              // optional hint
}

// Response
{
  score: PromptScore;
  analysis: {
    missingComponents: ComponentKey[];
    presentComponents: ComponentKey[];
    suggestions: Array<{
      dimension: string;
      severity: "critical" | "warning" | "info";
      message: string;
      example?: string;
    }>;
    wordCount: number;
    platformFit: number;
    detectedFamily: string;
    detectedPlatform: string | null;
  };
}
```

#### `POST /api/engine/optimize`

```typescript
// Request
{
  promptText: string;
  targetPlatform: string;
  family: string;
  focus?: "quality" | "length" | "format";   // what to optimize for
}

// Response
{
  optimized: string;
  changes: string[];
  score: PromptScore;
  tokensUsed: number;
}
```

#### `POST /api/engine/convert`

```typescript
// Request
{
  promptText: string;
  fromPlatform: string;
  toPlatform: string;
  family: string;
}

// Response
{
  converted: string;
  changesSummary: string[];
  score: PromptScore;
  tokensUsed: number;
}
```

#### `POST /api/engine/explain`

```typescript
// Request
{
  promptText: string;
  platform?: string;
  family?: string;
}

// Response
{
  explanation: {
    summary: string;
    components: Array<{
      key: ComponentKey;
      text: string;
      purpose: string;
      effectiveness: "high" | "medium" | "low";
    }>;
    strengths: string[];
    techniques: string[];
  };
  tokensUsed: number;
}
```

#### `GET /api/engine/history` (auth required)

```typescript
// Query params: ?type=built|improved&limit=20&page=1

// Response
{
  data: Array<{
    id: number;
    type: "built" | "improved";
    platform: string;
    family: string;
    preview: string;       // first 100 chars of the prompt
    score: number | null;
    createdAt: string;
  }>;
  total: number;
  page: number;
}
```

#### `GET /api/engine/history/:id` (auth required)

```typescript
// Response
{
  id: number;
  type: "built" | "improved";
  platform: string;
  family: string;
  prompt: string;
  originalPrompt?: string;   // for improved prompts
  score: PromptScore | null;
  fieldValues?: Record<string, unknown>;   // builder inputs
  changes?: ImproverChange[];
  createdAt: string;
}
```

#### `GET /api/engine/platforms`

```typescript
// Response — all registered platforms
{
  platforms: Array<{
    id: string;
    name: string;
    family: string;
    logoUrl: string | null;
    color: string | null;
    wordBudget: { min: number; max: number };
    isActive: boolean;
  }>;
}
```

#### `GET /api/engine/categories`

```typescript
// Response — all categories with platform support info
{
  categories: Array<{
    id: string;
    family: string;
    label: string;
    icon: string | null;
    slug: string;
    supportedPlatforms: string[];
  }>;
}
```

---

## 8. Type Definitions

All shared types live in `backend/src/engine/types.ts`.

```typescript
// ─── Families ──────────────────────────────────────────────────────────────

export type Family = "image" | "video" | "text" | "code" | "content";

// ─── Prompt Components ─────────────────────────────────────────────────────

export type ComponentKey =
  | "role"
  | "objective"
  | "context"
  | "constraints"
  | "style"
  | "output_format"
  | "technical"
  | "platform_params"
  | "safety"
  | "negative";

export interface PromptComponent {
  key: ComponentKey;
  content: string;
  weight: number;
  required: boolean;
  presentInOutput: boolean;
}

// ─── Platform Configuration ────────────────────────────────────────────────

export interface PlatformConfig {
  id: string;
  name: string;
  family: Family;
  wordBudget: { min: number; max: number };
  structureRules: string;
  systemPromptAddition: string;
  supportedTiers: string[];
  parameterFlags: string;
  compressionLevel: "minimal" | "standard" | "verbose";
  componentOrder: ComponentKey[];
  requiredComponents: ComponentKey[];
}

// ─── Scoring ───────────────────────────────────────────────────────────────

export interface ScoreDimension {
  name: string;
  score: number;        // 0-100
  weight: number;       // 0-1, all weights sum to 1
  feedback: string;
}

export interface PromptScore {
  overall: number;      // 0-100 weighted average
  grade: "poor" | "good" | "excellent" | "pro";
  dimensions: ScoreDimension[];
  wordCount: number;
  inBudget: boolean;
}

// ─── Engine Requests ───────────────────────────────────────────────────────

export interface BuildRequest {
  idea: string;
  family: Family;
  platform: string;
  style?: string;
  mood?: string;
  aspect?: string;
  category?: string;
  stream?: boolean;
}

export interface ImproveRequest {
  prompt: string;
  platform: string;
  family?: Family;
}

export interface AnalyzeRequest {
  promptText: string;
  platform?: string;
  family?: Family;
}

export interface OptimizeRequest {
  promptText: string;
  targetPlatform: string;
  family: Family;
  focus?: "quality" | "length" | "format";
}

export interface ConvertRequest {
  promptText: string;
  fromPlatform: string;
  toPlatform: string;
  family: Family;
}

export interface ExplainRequest {
  promptText: string;
  platform?: string;
  family?: Family;
}

// ─── Engine Results ────────────────────────────────────────────────────────

export interface BuildResult {
  prompt: string;
  platform: string;
  family: Family;
  score: PromptScore;
  runId: string;
  tokensUsed: number;
}

export interface ImproveResult {
  improved: string;
  changes: ImproverChange[];
  platform: string;
  family: Family;
  scoreBefore: PromptScore;
  scoreAfter: PromptScore;
  delta: number;
  tokensUsed: number;
}

export interface ImproverChange {
  label: string;
  applied: boolean;
}

export interface AnalyzeResult {
  score: PromptScore;
  missingComponents: ComponentKey[];
  presentComponents: ComponentKey[];
  suggestions: AnalysisSuggestion[];
  wordCount: number;
  detectedFamily: Family;
  detectedPlatform: string | null;
}

export interface AnalysisSuggestion {
  dimension: string;
  severity: "critical" | "warning" | "info";
  message: string;
  example?: string;
}

export interface ConvertResult {
  converted: string;
  changesSummary: string[];
  score: PromptScore;
  tokensUsed: number;
}

export interface ExplainResult {
  summary: string;
  components: Array<{
    key: ComponentKey;
    text: string;
    purpose: string;
    effectiveness: "high" | "medium" | "low";
  }>;
  strengths: string[];
  techniques: string[];
  tokensUsed: number;
}

// ─── Pipeline Context ──────────────────────────────────────────────────────

export interface ParsedIntent {
  subject: string;
  action: string | null;
  setting: string | null;
  mood: string | null;
  style: string | null;
  constraints: string[];
  suggestedTier: string | null;
}

export interface StructuredRequirements {
  role: string | null;
  objective: string;
  context: string | null;
  constraints: string[];
  style: string | null;
  outputFormat: string | null;
  technical: string | null;
  negative: string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  wordCount: number;
  inBudget: boolean;
}

export interface PipelineContext {
  request: BuildRequest;
  userId: string | null;
  runId: string;
  startedAt: Date;
  intent: ParsedIntent | null;
  detectedFamily: Family | null;
  detectedCategory: string | null;
  platform: PlatformConfig | null;
  requirements: StructuredRequirements | null;
  componentPlan: ComponentKey[];
  components: Map<ComponentKey, PromptComponent>;
  assembledPrompt: string | null;
  validationResult: ValidationResult | null;
  score: PromptScore | null;
  tokensUsed: number;
  stageTimings: Record<string, number>;
  errors: string[];
}

// ─── Pipeline Stage Interface ──────────────────────────────────────────────

export interface PipelineStage {
  name: string;
  execute(ctx: PipelineContext): Promise<PipelineContext>;
}
```

---

## 9. Database Changes

All changes are additive. No existing tables modified. Apply via Drizzle migration.

### 9.1 New Tables

```typescript
// Add to schema.ts

// ─── Engine Run Audit Log ─────────────────────────────────────────────────

export const engineRunTypeEnum = pgEnum("engine_run_type", [
  "build", "improve", "analyze", "optimize", "convert", "explain"
]);

export const engineRuns = pgTable("engine_runs", {
  id: varchar("id", { length: 21 }).primaryKey(),
  userId: varchar("user_id", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  type: engineRunTypeEnum("type").notNull(),
  platform: varchar("platform", { length: 50 }),
  family: familyEnum("family"),
  inputTokens: integer("input_tokens").notNull().default(0),
  outputTokens: integer("output_tokens").notNull().default(0),
  durationMs: integer("duration_ms"),
  success: boolean("success").notNull().default(true),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  userIdx: index("engine_runs_user_idx").on(t.userId),
  typeIdx: index("engine_runs_type_idx").on(t.type),
  createdIdx: index("engine_runs_created_idx").on(t.createdAt),
}));

// ─── Prompt Scores ────────────────────────────────────────────────────────

export const promptScores = pgTable("prompt_scores", {
  id: serial("id").primaryKey(),
  promptId: varchar("prompt_id", { length: 21 }).references(() => prompts.id, { onDelete: "cascade" }),
  builtPromptId: integer("built_prompt_id").references(() => builtPrompts.id, { onDelete: "cascade" }),
  overall: integer("overall").notNull(),
  grade: varchar("grade", { length: 20 }).notNull(),
  dimensionsJson: jsonb("dimensions_json").notNull(),
  wordCount: integer("word_count"),
  scoredAt: timestamp("scored_at").notNull().defaultNow(),
});

// ─── Prompt Versions ──────────────────────────────────────────────────────

export const promptVersions = pgTable("prompt_versions", {
  id: serial("id").primaryKey(),
  promptId: varchar("prompt_id", { length: 21 }).notNull().references(() => prompts.id, { onDelete: "cascade" }),
  versionNumber: integer("version_number").notNull(),
  promptText: text("prompt_text").notNull(),
  changeReason: text("change_reason"),
  score: integer("score"),
  createdBy: varchar("created_by", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  promptIdx: index("prompt_versions_prompt_idx").on(t.promptId),
  uniqueVersion: uniqueIndex("prompt_versions_unique").on(t.promptId, t.versionNumber),
}));
```

### 9.2 Modified Tables

```typescript
// builtPrompts — add score columns
// (Drizzle migration: add columns with DEFAULT NULL)
export const builtPrompts = pgTable("built_prompts", {
  // existing columns unchanged
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  categoryId: varchar("category_id", { length: 50 }),
  platformId: varchar("platform_id", { length: 50 }),
  fieldValues: jsonb("field_values").notNull(),
  generatedPrompt: text("generated_prompt").notNull(),
  savedAsPromptId: varchar("saved_as_prompt_id", { length: 21 }).references(() => prompts.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // NEW columns
  qualityScore: integer("quality_score"),                   // overall 0-100
  scoreGrade: varchar("score_grade", { length: 20 }),       // "good", "excellent", etc.
  tokensUsed: integer("tokens_used"),
  durationMs: integer("duration_ms"),
  runId: varchar("run_id", { length: 21 }),
});

// improvedPrompts — add score columns
export const improvedPrompts = pgTable("improved_prompts", {
  // existing columns unchanged
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  originalText: text("original_text").notNull(),
  improvedText: text("improved_text").notNull(),
  platformId: varchar("platform_id", { length: 50 }),
  changesSummary: jsonb("changes_summary"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // NEW columns
  scoreBefore: integer("score_before"),
  scoreAfter: integer("score_after"),
  scoreDelta: integer("score_delta"),
  tokensUsed: integer("tokens_used"),
});
```

### 9.3 Platform Seeds

Add new rows to the `platforms` table:

```sql
-- Video platforms
INSERT INTO platforms (id, name, logo_url, color, is_active, sort_order) VALUES
  ('runway',       'Runway',      NULL, '#0A0A0A', true, 10),
  ('veo',          'Veo',         NULL, '#4285F4', true, 11),
  ('pika',         'Pika',        NULL, '#FF6B35', true, 12),
  ('kling',        'Kling',       NULL, '#7C3AED', true, 13),
  ('luma',         'Luma Dream',  NULL, '#06B6D4', true, 14),
  ('sora',         'Sora',        NULL, '#10A37F', true, 15);

-- Text platforms
INSERT INTO platforms (id, name, logo_url, color, is_active, sort_order) VALUES
  ('claude',       'Claude',      NULL, '#D97706', true, 20),
  ('perplexity',   'Perplexity',  NULL, '#1FB8CD', true, 21),
  ('deepseek',     'DeepSeek',    NULL, '#0066CC', true, 22);

-- Code platforms
INSERT INTO platforms (id, name, logo_url, color, is_active, sort_order) VALUES
  ('claude-code',  'Claude Code', NULL, '#D97706', true, 30),
  ('cursor',       'Cursor',      NULL, '#000000', true, 31),
  ('copilot',      'Copilot',     NULL, '#2088FF', true, 32),
  ('gemini-code',  'Gemini Code', NULL, '#4285F4', true, 33);

-- Additional image platforms
INSERT INTO platforms (id, name, logo_url, color, is_active, sort_order) VALUES
  ('ideogram',     'Ideogram',    NULL, '#6366F1', true, 7),
  ('leonardo',     'Leonardo AI', NULL, '#F59E0B', true, 8),
  ('stable-diffusion', 'Stable Diffusion', NULL, '#7C3AED', true, 9),
  ('runway-image', 'Runway (Image)', NULL, '#0A0A0A', true, 10);
```

---

## 10. Prompt Pipeline Architecture

### 10.1 Stage Interface Contract

Every pipeline stage implements one interface:

```typescript
interface PipelineStage {
  name: string;
  execute(ctx: PipelineContext): Promise<PipelineContext>;
}
```

Stages never throw — they catch errors, add to `ctx.errors`, and return the context. This makes the pipeline resilient: a failed scoring stage still returns the assembled prompt.

### 10.2 Pipeline Orchestrator

```typescript
// engine/pipeline/index.ts

class PromptPipeline {
  private stages: PipelineStage[];

  constructor(stages: PipelineStage[]) {
    this.stages = stages;
  }

  async execute(ctx: PipelineContext): Promise<PipelineContext> {
    for (const stage of this.stages) {
      const t0 = Date.now();
      try {
        ctx = await stage.execute(ctx);
      } catch (err) {
        ctx.errors.push(`${stage.name}: ${err instanceof Error ? err.message : String(err)}`);
      }
      ctx.stageTimings[stage.name] = Date.now() - t0;
    }
    return ctx;
  }
}

// Build pipeline factory
export function createBuildPipeline(): PromptPipeline {
  return new PromptPipeline([
    new IntentAnalyzerStage(),
    new CategoryDetectorStage(),
    new PlatformResolverStage(),
    new RequirementExtractorStage(),
    new PromptPlannerStage(),
    new ComponentAssemblerStage(),
    new PlatformOptimizerStage(),
    new PromptValidatorStage(),
    new PromptScorerStage(),
  ]);
}
```

### 10.3 Stage Details

**Stage 1: IntentAnalyzer**
- Model: `claude-haiku-4-5-20251001` (cheap, fast)
- Input: `ctx.request.idea`
- Output: `ctx.intent: ParsedIntent`
- Purpose: Structure natural-language input without full AI call cost
- Fast path: If idea is very short (<30 chars), skip AI call and create intent directly

**Stage 2: CategoryDetector**
- Model: Rule-based (no AI call)
- Input: `ctx.intent`, `ctx.request.family`, `ctx.request.category`
- Output: `ctx.detectedFamily`, `ctx.detectedCategory`, `ctx.intent.suggestedTier`
- Keyword matching for tier detection: product keywords → PRODUCT tier, person keywords → PEOPLE tier

**Stage 3: PlatformResolver**
- Model: Registry lookup (no AI call)
- Input: `ctx.request.platform`
- Output: `ctx.platform: PlatformConfig`
- Validates platform exists and supports the detected family
- Falls back to closest platform for the family if exact match not found

**Stage 4: RequirementExtractor**
- Model: `claude-haiku-4-5-20251001`
- Input: `ctx.intent`, `ctx.request` (style, mood, aspect)
- Output: `ctx.requirements: StructuredRequirements`
- Maps each component key to its content based on user input and intent

**Stage 5: PromptPlanner**
- Model: Rule-based (no AI call)
- Input: `ctx.platform.requiredComponents`, `ctx.platform.componentOrder`, `ctx.detectedFamily`
- Output: `ctx.componentPlan: ComponentKey[]`
- Determines which components to include and in what order for this specific platform + family combination

**Stage 6: ComponentAssembler**
- Model: `claude-sonnet-4-6` (main generation quality)
- Input: `ctx.componentPlan`, `ctx.requirements`, `ctx.platform`
- Output: `ctx.assembledPrompt`, `ctx.components`
- The primary AI call — generates the actual prompt text in platform-native format
- Uses platform's `structureRules` + `systemPromptAddition` as the system context

**Stage 7: PlatformOptimizer**
- Model: Rule-based post-processing (no AI call)
- Input: `ctx.assembledPrompt`, `ctx.platform`
- Output: modified `ctx.assembledPrompt`
- Enforces word budget (trims if over), applies parameter flags (Midjourney `--ar`, etc.), hyphenates tokens for token-dense platforms

**Stage 8: PromptValidator**
- Model: Rule-based (no AI call)
- Input: `ctx.assembledPrompt`, `ctx.platform`
- Output: `ctx.validationResult`
- Checks: word count in budget, required sections present by string matching, no prohibited content

**Stage 9: PromptScorer**
- Model: `claude-haiku-4-5-20251001`
- Input: `ctx.assembledPrompt`, `ctx.platform`, `ctx.detectedFamily`
- Output: `ctx.score: PromptScore`
- Returns structured JSON score across 6 dimensions

### 10.4 Token Budget per Pipeline Run

| Stage | Model | Est. Tokens |
|-------|-------|-------------|
| Stage 1: Intent | haiku-4-5 | ~300 |
| Stage 4: Requirements | haiku-4-5 | ~500 |
| Stage 6: Assembly | sonnet-4-6 | ~1,500 |
| Stage 9: Scoring | haiku-4-5 | ~400 |
| **Total per build** | | **~2,700** |

At ~$0.001/1K for haiku and ~$0.003/1K for sonnet, a full build pipeline costs approximately **$0.005 per generation**.

---

## 11. State Management Architecture

### 11.1 Current Frontend State

The frontend currently uses uncoordinated `useState` in individual page components. No shared state. Auth stored in localStorage via `authStore`.

### 11.2 Engine State Requirements

The engine introduces state that must persist across:
- Multiple pipeline calls in a session
- Navigation between engine tool pages
- The gap between generate and save

**Proposed: Lightweight Context + LocalStorage**

No Redux. No Zustand. Use React Context with a reducer for engine-specific state, backed by localStorage for session persistence.

```typescript
// engine-store.ts

interface EngineSession {
  history: EngineHistoryItem[];       // local session history (last 20)
  lastBuildInput: Partial<BuildRequest>;   // restore form state on nav back
  lastImproveInput: string;           // restore textarea
  activeRunId: string | null;         // running pipeline
}

interface EngineHistoryItem {
  id: string;                         // nanoid
  type: "built" | "improved";
  family: Family;
  platform: string;
  preview: string;                    // first 80 chars
  prompt: string;                     // full prompt
  score: PromptScore | null;
  createdAt: string;
}
```

The `EngineContext` provider wraps only the engine pages (not the whole app), scoped to avoid unnecessary re-renders.

### 11.3 Builder Form State

```typescript
// BuilderV2 internal state — no need for global store

interface BuilderState {
  // Inputs
  idea: string;
  family: Family;
  platform: string;
  category: string;
  style: string;
  mood: string;
  aspect: string;

  // Pipeline state
  status: "idle" | "running" | "done" | "error";
  currentStage: string | null;        // for streaming progress display
  stageProgress: string[];            // completed stages

  // Output
  result: BuildResult | null;
  error: string | null;

  // UI
  viewMode: "single" | "all-platforms";
  showEnhancements: boolean;
  allPlatformResults: Record<string, BuildResult>;
}
```

### 11.4 Streaming State

```typescript
// Stream events emitted by the server
type StreamEvent =
  | { type: "stage"; stage: string; label: string }
  | { type: "chunk"; text: string }
  | { type: "score"; score: PromptScore }
  | { type: "done"; runId: string; tokensUsed: number }
  | { type: "error"; message: string };
```

The frontend `useStream` hook subscribes to the SSE endpoint, updates `BuilderState.stageProgress` as stages emit, and accumulates `chunk` events into the output textarea for streaming display.

---

## 12. Frontend Integration Plan

### 12.1 Navigation Changes

Add two new routes to `App.tsx` string router:

```
"engine"          → Engine hub page (entry point to all tools)
"engine:builder"  → BuilderV2 (replaces "builder")
"engine:improver" → ImproverV2 (replaces "improver")
"engine:analyzer" → Analyzer
"engine:converter" → Converter
"engine:explainer" → Explainer
```

The existing `"builder"` and `"improver"` routes still work — they redirect to the new routes. No broken links.

### 12.2 Engine Hub Page (`Engine.tsx`)

A new landing page that presents all engine tools in one place:
- 6 tool cards (Builder, Improver, Analyzer, Optimizer, Converter, Explainer)
- Recent history panel (last 5 generations, pulled from localStorage)
- "Quick Improve" input for zero-friction access to the improver

### 12.3 BuilderV2

Extends the existing Builder with:
- **Category Picker**: hierarchical dropdown (Family → Category) rather than flat chips
- **Pipeline Status Panel**: shows stages animating in real-time during streaming
- **Score Card**: displayed below the output — overall score with dimension breakdown
- **Save to Library**: actually wired to the API (currently only a toast)
- **History Sidebar**: last 5 builds in the current session, click to restore
- **All-platforms View**: unchanged behavior, just cleaner layout

### 12.4 ImproverV2

Extends existing Improver with:
- **Before/After Score Comparison**: `scoreBefore` vs `scoreAfter` with delta indicator
- **Streaming output**: tokens appear as they generate
- **Save improved prompt**: save button actually persists
- **Analyzer shortcut**: "Analyze this prompt first" button before improving

### 12.5 Analyzer Page

```
┌─────────────────────────────────────────────────────┐
│  Prompt Analyzer                                    │
│  Paste any prompt to get an instant quality report  │
├─────────────────────────────────────────────────────┤
│  [Textarea: paste your prompt]    [Platform select] │
│                          [Analyze →]                │
├───────────────────────────┬─────────────────────────┤
│  Overall Score            │  Dimension Breakdown    │
│                           │                         │
│  ┌──────────────────┐     │  Specificity    ████░  │
│  │    78/100        │     │  Completeness   ██████ │
│  │    Excellent     │     │  Platform Fit   ███░░  │
│  └──────────────────┘     │  Clarity        █████░ │
│                           │  Structure      ██████ │
│                           │  Safety         ██████ │
├───────────────────────────┴─────────────────────────┤
│  Issues Found                                       │
│  ⚠ Missing: camera rig specification                │
│  ⚠ Missing: exclude list                            │
│  ℹ Lock block values use round numbers              │
├─────────────────────────────────────────────────────┤
│  [Improve This Prompt →]   [Save to Library]        │
└─────────────────────────────────────────────────────┘
```

### 12.6 Converter Page

```
┌─────────────────────────────────────────────────────┐
│  Prompt Converter                                   │
│  Translate a prompt between AI platforms            │
├───────────────────────┬─────────────────────────────┤
│  From: [Midjourney ▼] │  To: [Flux ▼]               │
├───────────────────────┴─────────────────────────────┤
│  Original (Midjourney format)                       │
│  [source prompt textarea]                           │
├─────────────────────────────────────────────────────┤
│                    [Convert →]                      │
├─────────────────────────────────────────────────────┤
│  Converted (Flux format)                            │
│  [output textarea]                [Copy]            │
│  Score: 84/100 Excellent                            │
│  Changes made: 6                                    │
└─────────────────────────────────────────────────────┘
```

### 12.7 API Client Additions

```typescript
// Add to frontend/src/app/lib/api.ts

export const engineApi = {
  analyze: (payload: AnalyzeRequest) =>
    apiFetch<AnalyzeResult>("/api/engine/analyze", { method: "POST", body: JSON.stringify(payload) }),

  optimize: (payload: OptimizeRequest) =>
    apiFetch<OptimizeResult>("/api/engine/optimize", { method: "POST", body: JSON.stringify(payload) }),

  convert: (payload: ConvertRequest) =>
    apiFetch<ConvertResult>("/api/engine/convert", { method: "POST", body: JSON.stringify(payload) }),

  explain: (payload: ExplainRequest) =>
    apiFetch<ExplainResult>("/api/engine/explain", { method: "POST", body: JSON.stringify(payload) }),

  history: (params?: { type?: "built" | "improved"; limit?: number; page?: number }) =>
    apiFetch<HistoryPage>(`/api/engine/history?${new URLSearchParams(params as any)}`),

  platforms: () => apiFetch<{ platforms: PlatformSummary[] }>("/api/engine/platforms"),
  categories: () => apiFetch<{ categories: CategorySummary[] }>("/api/engine/categories"),
};

// Add stream consumer
export function streamBuild(
  payload: BuildRequest,
  onEvent: (event: StreamEvent) => void,
  onDone: (result: BuildResult) => void,
  onError: (err: string) => void
): AbortController {
  const controller = new AbortController();
  // SSE fetch using EventSource or fetch with ReadableStream
  // ...
  return controller;
}
```

---

## 13. Backend Integration Plan

### 13.1 Route Registration

Add to `app.ts`:
```typescript
import engineRouter from "./routes/engine.js";
// ...
app.route("/api/engine", engineRouter);
```

### 13.2 Refactor `builder.ts`

The existing `builder.ts` route becomes a thin adapter:

```typescript
// routes/builder.ts (refactored)
import { Hono } from "hono";
import { buildPrompt } from "../engine/modules/builder.js";
import { optionalAuth } from "../middleware/auth.js";

const router = new Hono();

router.post("/generate", optionalAuth, async (c) => {
  const body = await c.req.json<BuildRequest>();
  if (!body.idea?.trim()) return c.json({ error: "idea is required" }, 400);

  const userId = c.get("user")?.sub ?? null;
  const result = await buildPrompt(body, userId);

  return c.json(result);
});

export default router;
```

All logic moves to `engine/modules/builder.ts`.

### 13.3 Refactor `improver.ts`

Same pattern — thin adapter delegating to `engine/modules/improver.ts`.

### 13.4 New `engine.ts` Route

```typescript
// routes/engine.ts
import { Hono } from "hono";
import { analyzePrompt } from "../engine/modules/analyzer.js";
import { optimizePrompt } from "../engine/modules/optimizer.js";
import { convertPrompt } from "../engine/modules/converter.js";
import { explainPrompt } from "../engine/modules/explainer.js";
import { getEngineHistory, getHistoryItem } from "../engine/modules/history.js";
import { requireAuth, optionalAuth } from "../middleware/auth.js";
import { engineRateLimit } from "../middleware/rateLimit.js";

const router = new Hono();

router.post("/analyze", optionalAuth, engineRateLimit("analyze"), async (c) => { ... });
router.post("/optimize", optionalAuth, engineRateLimit("optimize"), async (c) => { ... });
router.post("/convert",  optionalAuth, engineRateLimit("convert"),  async (c) => { ... });
router.post("/explain",  optionalAuth, engineRateLimit("explain"),  async (c) => { ... });

router.get("/history",     requireAuth, async (c) => { ... });
router.get("/history/:id", requireAuth, async (c) => { ... });

router.get("/platforms",   async (c) => { ... });
router.get("/categories",  async (c) => { ... });

export default router;
```

### 13.5 AI Client Singleton

Replace per-request instantiation with a shared singleton:

```typescript
// engine/ai/client.ts
import Anthropic from "@anthropic-ai/sdk";

let _client: Anthropic | null = null;

export function getAIClient(): Anthropic {
  if (!_client) {
    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) throw new Error("ANTHROPIC_API_KEY not configured");
    _client = new Anthropic({ apiKey });
  }
  return _client;
}
```

### 13.6 Middleware: Rate Limiting

```typescript
// middleware/rateLimit.ts
// Per-user rate limiting for engine endpoints

type EngineOperation = "build" | "improve" | "analyze" | "optimize" | "convert" | "explain";

const LIMITS: Record<EngineOperation, { requests: number; windowMs: number }> = {
  build:    { requests: 20,  windowMs: 60_000 },   // 20 per minute
  improve:  { requests: 20,  windowMs: 60_000 },
  analyze:  { requests: 50,  windowMs: 60_000 },   // cheaper, higher limit
  optimize: { requests: 20,  windowMs: 60_000 },
  convert:  { requests: 20,  windowMs: 60_000 },
  explain:  { requests: 30,  windowMs: 60_000 },
};

// In-memory store (Redis in production)
const counters = new Map<string, { count: number; resetAt: number }>();

export function engineRateLimit(op: EngineOperation) {
  return async (c: Context, next: Next) => {
    const user = c.get("user");
    const key = user ? `user:${user.sub}:${op}` : `ip:${c.req.header("x-forwarded-for")}:${op}`;
    // ... rate limit check logic
    await next();
  };
}
```

---

## 14. AI Service Abstraction

### 14.1 Design Goal

The engine must never hard-depend on Anthropic. All AI calls go through an `AIService` interface. This makes the engine:
- Testable (inject a mock AIService in tests)
- Extensible (add OpenAI or other providers later)
- Observable (all calls logged centrally)

### 14.2 AIService Interface

```typescript
// engine/ai/types.ts

export interface AIMessage {
  role: "user" | "assistant";
  content: string;
}

export interface AIRequest {
  model: string;
  system: string;
  messages: AIMessage[];
  maxTokens: number;
  stream?: boolean;
}

export interface AIResponse {
  text: string;
  inputTokens: number;
  outputTokens: number;
}

export interface AIService {
  complete(request: AIRequest): Promise<AIResponse>;
  stream(request: AIRequest, onChunk: (text: string) => void): Promise<AIResponse>;
}
```

### 14.3 AnthropicAIService Implementation

```typescript
// engine/ai/anthropic.ts

export class AnthropicAIService implements AIService {
  private client: Anthropic;

  constructor() {
    this.client = getAIClient();
  }

  async complete(req: AIRequest): Promise<AIResponse> {
    const response = await this.client.messages.create({
      model: req.model,
      max_tokens: req.maxTokens,
      system: req.system,
      messages: req.messages,
    });
    const text = response.content
      .filter((b): b is Anthropic.TextBlock => b.type === "text")
      .map((b) => b.text)
      .join("");
    return {
      text,
      inputTokens: response.usage.input_tokens,
      outputTokens: response.usage.output_tokens,
    };
  }

  async stream(req: AIRequest, onChunk: (text: string) => void): Promise<AIResponse> {
    let inputTokens = 0;
    let outputTokens = 0;
    let fullText = "";

    const stream = await this.client.messages.stream({
      model: req.model,
      max_tokens: req.maxTokens,
      system: req.system,
      messages: req.messages,
    });

    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") {
        onChunk(event.delta.text);
        fullText += event.delta.text;
      }
    }

    const final = await stream.finalMessage();
    inputTokens = final.usage.input_tokens;
    outputTokens = final.usage.output_tokens;

    return { text: fullText, inputTokens, outputTokens };
  }
}
```

### 14.4 Model Selection Strategy

Each pipeline stage declares its required model tier. The engine maps tiers to actual model IDs.

```typescript
// engine/ai/models.ts

export const MODEL_TIER = {
  FAST:    "claude-haiku-4-5-20251001",   // intent, requirements, scoring
  QUALITY: "claude-sonnet-4-6",           // assembly, improvement
  PREMIUM: "claude-opus-4-8",             // complex analysis (future)
} as const;
```

This means changing the model for all "fast" operations is a one-line change.

### 14.5 Mock AI Service for Testing

```typescript
// engine/ai/mock.ts

export class MockAIService implements AIService {
  private responses: Map<string, string>;

  constructor(responses?: Map<string, string>) {
    this.responses = responses ?? new Map();
  }

  async complete(req: AIRequest): Promise<AIResponse> {
    const key = req.messages[0]?.content?.slice(0, 50) ?? "default";
    const text = this.responses.get(key) ?? `Mock response for: ${key}`;
    return { text, inputTokens: 10, outputTokens: 20 };
  }

  async stream(req: AIRequest, onChunk: (text: string) => void): Promise<AIResponse> {
    const result = await this.complete(req);
    onChunk(result.text);
    return result;
  }
}
```

---

## 15. Testing Strategy

### 15.1 Testing Pyramid

```
                    ┌─────────┐
                    │  E2E    │  3-5 critical user flows
                   /├─────────┤\
                  / │Integr.  │ \  Route-level tests with real DB
                 /  ├─────────┤  \
                /   │  Unit   │   \  Pipeline stages, scoring, validators
               /    └─────────┘    \
              / (most tests here)   \
```

### 15.2 Unit Tests — Pipeline Stages

Each stage is independently testable because:
1. It implements `PipelineStage` with a single `execute(ctx)` method
2. It depends on `AIService` (injectable mock)
3. Context is a plain object (no HTTP, no DB)

```typescript
// engine/pipeline/__tests__/category-detector.test.ts

describe("CategoryDetector", () => {
  const stage = new CategoryDetectorStage();

  it("detects PEOPLE tier from portrait keywords", async () => {
    const ctx = makeContext({ request: { idea: "woman walking in rain", family: "image" } });
    const result = await stage.execute(ctx);
    expect(result.intent?.suggestedTier).toBe("PEOPLE");
  });

  it("detects PRODUCT tier from product keywords", async () => {
    const ctx = makeContext({ request: { idea: "luxury perfume bottle", family: "image" } });
    const result = await stage.execute(ctx);
    expect(result.intent?.suggestedTier).toBe("PRODUCT");
  });
});
```

### 15.3 Unit Tests — Scoring

```typescript
// engine/scoring/__tests__/scorer.test.ts

describe("PromptScorer", () => {
  const aiService = new MockAIService(new Map([
    ["Score this prompt", JSON.stringify({ overall: 75, dimensions: [...] })]
  ]));
  const scorer = new PromptScorerStage(aiService);

  it("scores a pro-quality image prompt above 80", async () => {
    const ctx = makeContext({ assembledPrompt: PRO_SAMPLE_PROMPT });
    const result = await scorer.execute(ctx);
    expect(result.score?.overall).toBeGreaterThan(80);
  });

  it("scores a weak prompt below 50", async () => {
    const ctx = makeContext({ assembledPrompt: "a cat" });
    const result = await scorer.execute(ctx);
    expect(result.score?.overall).toBeLessThan(50);
  });
});
```

### 15.4 Unit Tests — Platform Registry

```typescript
describe("Platform Registry", () => {
  it("has all required image platforms registered", () => {
    const platforms = platformRegistry.getByFamily("image");
    const ids = platforms.map(p => p.id);
    expect(ids).toContain("midjourney");
    expect(ids).toContain("flux");
    expect(ids).toContain("ideogram");
  });

  it("enforces word budget for Midjourney prompts", () => {
    const mj = platformRegistry.get("midjourney");
    expect(mj?.wordBudget.min).toBe(210);
    expect(mj?.wordBudget.max).toBe(250);
  });
});
```

### 15.5 Integration Tests — API Routes

```typescript
// routes/__tests__/engine.test.ts

describe("POST /api/engine/analyze", () => {
  it("returns a score for a valid prompt", async () => {
    const response = await app.request("/api/engine/analyze", {
      method: "POST",
      body: JSON.stringify({ promptText: SAMPLE_IMAGE_PROMPT, platform: "midjourney" }),
      headers: { "Content-Type": "application/json" },
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.score.overall).toBeGreaterThan(0);
    expect(body.score.overall).toBeLessThanOrEqual(100);
  });

  it("returns 400 for empty promptText", async () => {
    const response = await app.request("/api/engine/analyze", {
      method: "POST",
      body: JSON.stringify({ promptText: "" }),
      headers: { "Content-Type": "application/json" },
    });
    expect(response.status).toBe(400);
  });
});
```

### 15.6 Integration Tests — Backward Compatibility

Critical: existing builder/improver routes must continue to work.

```typescript
describe("Backward compatibility", () => {
  it("POST /api/builder/generate still works", async () => {
    const response = await app.request("/api/builder/generate", {
      method: "POST",
      body: JSON.stringify({ idea: "test", family: "image", platform: "midjourney" }),
      headers: { "Content-Type": "application/json" },
    });
    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.prompt).toBeTruthy();
  });
});
```

### 15.7 Test Fixtures

```typescript
// engine/__tests__/fixtures.ts

export const PRO_IMAGE_PROMPT = `
Editorial product shot, A/R 4:5. Perfume bottle...
**LOCKS — GEOMETRY:** cylindrical body height 0.92m... 
Camera: Phase One XF IQ4 150MP, Schneider 80mm LS, f/8, 1/125s, ISO 50...
Grade: Capture One LUT, grain 3, +0.3EV...
Palette: Warm Gold #D4A853 47%, Cool White #F8F6F2 32%...
References: Annie Leibovitz, Lara Jade...
Exclude: harsh specular, plastic sheen, visible seams
`;

export const WEAK_IMAGE_PROMPT = "a pretty cat sitting on a window";

export function makeContext(overrides: Partial<PipelineContext> = {}): PipelineContext {
  return {
    request: { idea: "test", family: "image", platform: "midjourney" },
    userId: null,
    runId: "test-run-1",
    startedAt: new Date(),
    intent: null,
    detectedFamily: null,
    detectedCategory: null,
    platform: null,
    requirements: null,
    componentPlan: [],
    components: new Map(),
    assembledPrompt: null,
    validationResult: null,
    score: null,
    tokensUsed: 0,
    stageTimings: {},
    errors: [],
    ...overrides,
  };
}
```

---

## 16. Performance Considerations

### 16.1 Token Cost Management

The pipeline makes 3-4 AI calls per build. Optimization targets:

| Optimization | Impact |
|-------------|--------|
| Use `haiku-4-5` for stages 1, 4, 9 | 80-90% cost reduction on those stages vs sonnet |
| Cache platform formulas (already in registry) | Eliminates string rebuilding per request |
| Skip Stage 1 for very short ideas (<30 chars) | Saves one haiku call for simple inputs |
| Skip Stage 9 scoring in "fast mode" | Saves scoring call when user doesn't need score |
| Prompt caching for system prompts | Anthropic's 5-min cache TTL = large savings on high-volume platform formulas |

### 16.2 Response Time Targets

| Operation | Target P50 | Target P95 |
|-----------|-----------|-----------|
| Builder (no stream) | 4s | 8s |
| Builder (streaming first token) | 800ms | 1.5s |
| Improver | 3s | 6s |
| Analyzer | 2s | 4s |
| Converter | 3s | 6s |
| Explainer | 2.5s | 5s |

Streaming makes the builder feel fast even when the total time is 5+ seconds.

### 16.3 Concurrency

The `handleGenerateAll()` function in the current Builder UI fires 6 parallel Anthropic requests. This is fine for low traffic. Under load, consider:
- Adding per-user concurrency limits (max 2 simultaneous engine calls)
- Queue-based processing for "Generate All" (sequential with progress updates)
- Vercel serverless functions handle I/O concurrency natively

### 16.4 Database Query Performance

New `engine_runs` table will grow fast. Index strategy:
- `user_id + created_at DESC` — for history queries
- Partition by month if volume exceeds 1M rows
- History endpoint: `LIMIT 20` always — no full scans

---

## 17. Security Considerations

### 17.1 Input Validation

All engine route inputs validated with Zod before reaching engine code:

```typescript
const BuildRequestSchema = z.object({
  idea: z.string().min(3).max(2000).trim(),
  family: z.enum(["image", "video", "text", "code", "content"]),
  platform: z.string().min(2).max(50).regex(/^[a-z0-9-]+$/),
  style:  z.string().max(50).optional(),
  mood:   z.string().max(50).optional(),
  aspect: z.string().max(10).optional(),
  category: z.string().max(100).optional(),
  stream: z.boolean().optional(),
});
```

The `platform` field is validated against the registry — unknown platforms return 400, preventing prompt injection via platform ID.

### 17.2 Prompt Injection Prevention

User-provided text (`idea`, `promptText`) is passed in the `user` role of the AI message, never interpolated into the `system` prompt. This isolates user input from system instructions.

```typescript
// SAFE: user input in user message only
messages: [{ role: "user", content: userInput }]
system: STATIC_SYSTEM_PROMPT

// UNSAFE (never do this):
system: `${STATIC_SYSTEM_PROMPT}\n\nUser wants: ${userInput}`
```

### 17.3 Rate Limiting

Unauthenticated users get tighter limits:

| User Type | Builder calls/min | Analyzer calls/min |
|-----------|------------------|-------------------|
| Unauthenticated | 5 | 10 |
| Authenticated | 20 | 50 |
| Admin | Unlimited | Unlimited |

### 17.4 AI Output Sanitization

Engine outputs are not rendered as HTML — displayed in `<pre>` or `<textarea>` elements. No XSS risk. However, if prompts are ever displayed in rich HTML contexts, sanitize with `DOMPurify`.

### 17.5 Token Budget Enforcement

Set `max_tokens` per model call based on expected output:

| Stage | max_tokens |
|-------|-----------|
| Intent (haiku) | 300 |
| Requirements (haiku) | 500 |
| Assembly (sonnet) | 1,500 |
| Scoring (haiku) | 400 |
| Improvement (sonnet) | 1,500 |
| Analysis (haiku) | 800 |

This prevents runaway costs from unexpected model behavior.

### 17.6 API Key Handling

- `ANTHROPIC_API_KEY` only in backend `.env`, never exposed to frontend
- Fail-fast on startup if key missing: `getAIClient()` throws on first call if not configured
- `/health` endpoint checks AI client availability without exposing the key

---

## 18. Future Roadmap

### Phase 1 — Foundation (Weeks 1-3)
- Extract platform formulas from route files into `engine/platforms/`
- Create `AIService` abstraction with `AnthropicAIService`
- Implement pipeline infrastructure (`PipelineContext`, `PipelineStage`, `PromptPipeline`)
- Wire existing Builder + Improver through the new pipeline
- Fix persistence: actually save to `built_prompts` and `improved_prompts` tables
- Add streaming to Builder
- Add auth + rate limiting

### Phase 2 — Analyzer + Scoring (Weeks 4-5)
- Implement `PromptScorerStage`
- Implement `analyzePrompt` module
- Add `/api/engine/analyze` route
- Add `ScoreCard` component to Builder output
- Add "Before/After" score to Improver result

### Phase 3 — New Platforms (Weeks 5-6)
- Add video platform configs (Runway, Veo, Pika, Kling, Luma, Sora)
- Add text platform configs (Claude, Perplexity, DeepSeek)
- Add code platform configs (Cursor, Copilot, Claude Code)
- Update Builder UI with full platform list organized by family
- Seed new platform DB rows

### Phase 4 — Converter + Explainer (Weeks 7-8)
- Implement `convertPrompt` and `explainPrompt` modules
- Add `/api/engine/convert` and `/api/engine/explain` routes
- Add Converter and Explainer UI pages
- Add "Convert to..." action in Detail page platform tabs

### Phase 5 — Variable System (Weeks 9-10)
- Implement template extraction: detect `{{variable}}` patterns in prompts
- `VariableEditor` component: fill-in-the-blank UI for template prompts
- Save prompt templates as reusable assets
- Variable API endpoints

### Phase 6 — Engine Hub + History (Weeks 11-12)
- `Engine.tsx` hub page
- Session history panel (localStorage + DB sync)
- Engine analytics dashboard for admins
- Usage insights: most-used platforms, average scores over time

### V2 Horizon (Future)
- **Prompt A/B Testing**: save two versions of a prompt, compare performance
- **Batch Generation**: generate 10 variations at once
- **Prompt Regression Tracking**: alert when a prompt's score drops after model updates
- **Team Workspaces**: shared prompt collections with role-based access
- **Live AI Testing**: execute the generated prompt against the actual AI and show the output
- **Prompt Recommendation Engine**: suggest similar high-quality prompts based on current input
- **Multi-language Support**: generate prompts in non-English languages for non-English AI platforms

---

## Appendix A: Implementation Checklist

Use this to track implementation progress after architecture is approved.

### Phase 0 — Foundation
- [ ] Create `backend/src/engine/` directory structure
- [ ] Create `engine/types.ts` with all type definitions
- [ ] Create `engine/ai/client.ts` (singleton)
- [ ] Create `engine/ai/service.ts` (AIService interface)
- [ ] Create `engine/ai/anthropic.ts` (implementation)
- [ ] Create `engine/ai/mock.ts` (test mock)
- [ ] Create `engine/platforms/index.ts` (registry)
- [ ] Extract midjourney formula to `engine/platforms/image/midjourney.ts`
- [ ] Extract chatgpt formula to `engine/platforms/image/chatgpt.ts`
- [ ] Extract remaining 4 image platforms
- [ ] Create `engine/pipeline/index.ts` (PromptPipeline class)
- [ ] Add `engine_runs` table to schema.ts
- [ ] Add `prompt_versions` table to schema.ts
- [ ] Add score columns to `built_prompts` and `improved_prompts`
- [ ] Run Drizzle migration
- [ ] Seed new platforms in DB

### Phase 1 — Refactor Existing
- [ ] Create `engine/pipeline/intent-analyzer.ts`
- [ ] Create `engine/pipeline/category-detector.ts`
- [ ] Create `engine/pipeline/platform-resolver.ts`
- [ ] Create `engine/pipeline/requirement-extractor.ts`
- [ ] Create `engine/pipeline/prompt-planner.ts`
- [ ] Create `engine/pipeline/component-assembler.ts`
- [ ] Create `engine/pipeline/platform-optimizer.ts`
- [ ] Create `engine/pipeline/prompt-validator.ts`
- [ ] Create `engine/pipeline/prompt-scorer.ts`
- [ ] Create `engine/modules/builder.ts`
- [ ] Create `engine/modules/improver.ts`
- [ ] Refactor `routes/builder.ts` to thin adapter
- [ ] Refactor `routes/improver.ts` to thin adapter
- [ ] Add streaming to builder route
- [ ] Add `middleware/rateLimit.ts`
- [ ] Add `optionalAuth` middleware for engine endpoints
- [ ] Fix: builder actually saves to `built_prompts`
- [ ] Fix: improver actually saves to `improved_prompts`
- [ ] Write unit tests for all pipeline stages
- [ ] Write integration tests for backward compatibility

### Phase 2 — Analyzer
- [ ] Create `engine/modules/analyzer.ts`
- [ ] Create `engine/scoring/rules.ts`
- [ ] Create `engine/scoring/scorer.ts`
- [ ] Add `routes/engine.ts` with analyze endpoint
- [ ] Register engine router in `app.ts`
- [ ] Add `ScoreCard.tsx` frontend component
- [ ] Add score display to Builder output panel
- [ ] Add score delta display to Improver result
- [ ] Add `Analyzer.tsx` page
- [ ] Add `"engine:analyzer"` route to App.tsx
- [ ] Write analyzer module tests

---

## Appendix B: Decision Log

| Decision | Rationale | Alternatives Considered |
|---------|-----------|------------------------|
| Pipeline pattern over monolithic AI call | Independent stages = independent testing, easy replacement | Single large prompt (current state, brittle) |
| haiku for fast stages, sonnet for assembly | Cost efficiency — 80% of pipeline runs cheap stages | Sonnet everywhere (3x cost, no quality gain on simple stages) |
| AIService interface over direct Anthropic import | Testability and future provider flexibility | Direct SDK use (faster to implement, less testable) |
| Additive DB changes only | Zero risk of breaking existing tables | Schema refactor (risky, requires data migration) |
| SSE streaming over WebSockets | Simpler, no upgrade handshake, Vercel-compatible | WebSockets (more complex, limited Vercel support) |
| Per-user rate limit in middleware | Prevents abuse without external service in Phase 1 | Redis + Upstash (correct for production, overkill for Phase 1) |
| Platform files per platform | Easy to add/modify one platform without touching others | Single registry file (scales poorly beyond 10 platforms) |
| React Context for engine state | Lightweight, scoped, no new dependencies | Zustand (fine choice, slightly more complex setup) |
| String router kept as-is | No breaking changes, existing nav patterns work | React Router migration (large scope, not required for engine) |
