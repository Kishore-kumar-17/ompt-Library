// ─── Instruction Formula v1.0 — Dictionaries ───────────────────────────────────
// Term → rich instruction-engineering description. No API calls — pure lookup.

export const ROLE_PERSONA: Record<string, string> = {
  "expert":      "an expert in the relevant field with deep practical experience, not just textbook knowledge",
  "teacher":     "a patient teacher skilled at explaining complex ideas in accessible steps, checking understanding as you go",
  "editor":      "a meticulous editor focused on clarity, concision, and correctness, willing to cut anything that doesn't earn its place",
  "analyst":     "a rigorous analyst who separates evidence from speculation and states confidence levels explicitly",
  "consultant":  "a pragmatic consultant who gives a direct recommendation with the main trade-off, not an exhaustive survey of options",
  "coach":       "a supportive but honest coach who gives specific, actionable feedback rather than generic encouragement",
  "researcher":  "a careful researcher who cites the basis for claims and flags where evidence is thin or contested",
  "copywriter":  "an experienced copywriter who writes for a specific audience and a specific action, not generic prose",
  "reviewer":    "a critical reviewer whose job is to find weaknesses, not to be agreeable",
}

export const OUTPUT_FORMAT: Record<string, string> = {
  "markdown":       "well-structured markdown with clear headers, no more than 2 levels of nesting, and short paragraphs",
  "bullet list":    "a concise bullet list — one idea per bullet, no nested sub-bullets unless strictly necessary",
  "numbered steps": "a numbered sequence of steps in the exact order they should be performed, each step a single action",
  "table":          "a markdown table with clearly labeled columns, one row per item, no merged or empty cells",
  "json":           "valid JSON only — no markdown fences, no commentary before or after, matching the exact keys requested",
  "prose":          "flowing prose in complete paragraphs, no bullet points or headers, natural connective language between ideas",
  "code block":     "a single fenced code block with the correct language tag, no explanation unless explicitly requested",
  "email":          "a ready-to-send email with a clear subject line, greeting, body, and sign-off — no placeholder brackets left unfilled",
}

export const TONE: Record<string, string> = {
  "formal":       "formal, professional register — no contractions, no slang, precise vocabulary",
  "casual":       "casual, conversational register — contractions are fine, plain everyday vocabulary",
  "technical":    "technical register assuming domain familiarity — precise terminology used without re-explaining basics",
  "eli5":         "explain-like-I'm-five register — no jargon, concrete analogies, short sentences",
  "persuasive":   "persuasive register — leads with the strongest point, anticipates objections, ends with a clear call to action",
  "empathetic":   "empathetic, supportive register — acknowledges difficulty before offering solutions",
  "direct":       "direct and blunt register — leads with the conclusion, no throat-clearing or hedging",
}

export const REASONING_DEPTH: Record<string, string> = {
  "quick answer":     "a quick, direct answer — no more than 2-3 sentences, skip the reasoning trace entirely",
  "step by step":      "explicit step-by-step reasoning shown before the final answer, each step building on the last",
  "consider edge cases": "reasoning that explicitly considers edge cases and failure modes before settling on the answer",
  "exhaustive":       "an exhaustive treatment covering the mainstream view, key alternatives, and their trade-offs",
  "show working":     "show the intermediate working/calculation, not just the final result",
}

export const AUDIENCE: Record<string, string> = {
  "beginner":       "a complete beginner with no prior background in this topic — define terms before using them and build up from first principles",
  "expert":         "an expert practitioner in this field — skip basic definitions and engage at a peer level with precise, domain-specific terminology",
  "child":          "a young child — use simple everyday words, concrete examples, and short sentences, and avoid abstract or multi-step reasoning",
  "executive":      "a senior executive with limited time — lead with the bottom line and business impact first, and keep supporting detail brief and optional",
  "general":        "a general audience with no specialized background — avoid jargon, and briefly explain any technical term the moment it's used",
  "student":        "a student learning this subject — explain the underlying reasoning, not just the answer, so the concept actually transfers",
  "technical":      "a technical audience of engineers or practitioners — precise terminology is expected and does not need to be simplified",
  "non-technical":  "a non-technical audience — avoid jargon entirely and translate any technical concept into a plain-language equivalent",
  "professional":   "working professionals in this field — assume baseline competence but not deep specialization in the specific sub-topic",
}

// ─── Category sub-mode guidance ───────────────────────────────────────────────
// Each text category covers meaningfully different jobs-to-be-done. Rather than
// one generic sentence per category, sub-mode detection (see mode-detector.ts
// and each templates/*.ts) picks the guidance that actually matches the task.

export const QA_QUESTION_TYPES: Record<string, string> = {
  factual:     "This is a factual lookup question — lead with the specific fact or definition in the first sentence. Add only the minimal context needed to make the fact usable (units, date, scope, source); skip surrounding history or tangential trivia.",
  diagnostic:  "This is a diagnostic/troubleshooting question — the user needs a working fix, not a definition. Lead with the single most likely root cause, then a short ranked list of things to check or try, most probable first.",
  exploratory: "This is an open-ended/exploratory question — the user wants to understand a concept or weigh options, not retrieve one fact. Explain the core idea plainly, then the distinctions that actually change a decision; skip exhaustive enumeration of minor variants.",
}

export const ANALYSIS_MODES: Record<string, string> = {
  comparative: "This is a comparative analysis — the deliverable is a structured, dimension-by-dimension comparison of the named options. Judge every option against the same criteria so they can be read side-by-side, and end with an explicit recommendation or ranking, not just a neutral list of differences.",
  causal:      "This is a causal analysis — the deliverable explains why something happened or what it will cause, not how two things compare. Distinguish correlation from causation explicitly, rank candidate causes/effects by evidence strength, and flag any link in the causal chain that is inferred rather than directly evidenced.",
  evaluative:  "This is an evaluative analysis — the deliverable is a judgment of whether something is good, sufficient, or worth doing against explicit criteria. State the criteria before rendering judgment, give a clear bottom-line verdict, and keep the verdict separate from the supporting evidence.",
}

export const CREATIVE_MODES: Record<string, string> = {
  narrative:  "This is narrative fiction — establish point of view, tense, and voice in the opening lines and hold them consistently throughout. Show character and setting through concrete sensory detail and action instead of exposition, and land the ending on a deliberate beat rather than trailing off.",
  persuasive: "This is persuasive/marketing copy — lead with the single strongest benefit or hook, not a warm-up. Write to the stated audience's actual motivations, keep sentences short and punchy, and end with an explicit call to action rather than a general summary.",
  ideation:   "This is ideation/brainstorming — generate genuinely distinct options rather than minor variations on one idea; each option should differ in its core angle, not just its wording. Note the distinguishing angle of each option briefly so the set can be scanned at a glance, and favor breadth over polishing any single option.",
}

export const SUMMARIZATION_MODES: Record<string, string> = {
  executive:      "This is an executive summary — lead with the bottom line and the decision or action it implies, in 2-4 sentences maximum. Omit supporting detail entirely unless it would change the bottom line; assume the reader will ask if they want specifics.",
  detailed:       "This is a detailed/comprehensive summary — preserve every material fact, figure, and qualification from the source, organized under clear subheadings by topic. Longer output is fine here; the failure mode to avoid is dropping a caveat or number that changes interpretation, not brevity.",
  "bullet-point": "This is a bullet-point summary — one self-contained idea per bullet, ordered by importance rather than the source's original order unless order itself is meaningful. Each bullet should make sense read in isolation; avoid bullets that only work next to the one before them.",
}

export const TRANSFORMATION_MODES: Record<string, string> = {
  "format-conversion": "This is a format conversion — the content and meaning stay fixed; only the structural container changes (e.g. notes to email, prose to table). Map every piece of source content to an explicit slot in the new format; nothing should be dropped just because the new format has no obvious place for it.",
  "tone-shift":        "This is a tone/register shift — the facts, structure, and length stay essentially the same; only word choice, formality, and voice change. Do not add hedging, enthusiasm, or authority that wasn't in the original just because the new tone implies it stereotypically.",
  simplification:      "This is a simplification/plain-language rewrite — preserve every material fact while replacing jargon with everyday equivalents and shortening sentences. If a technical term is essential and has no plain equivalent, keep it but define it inline the first time it appears.",
}

// ─── Few-shot / example scaffolds ──────────────────────────────────────────────
// Small illustrative examples, keyed "<category>:<subMode>", used only where an
// example genuinely helps calibrate output (QA, transformation). Optional —
// omitted entirely for categories/modes with no entry here.

export const EXAMPLE_SCAFFOLDS: Record<string, string> = {
  "qa:factual":     "Q: What is the boiling point of water at sea level?\nA: 100°C (212°F) at standard atmospheric pressure (1 atm).",
  "qa:diagnostic":  "Q: My app crashes on startup right after the last update — why?\nA: Most likely cause: a database migration didn't run. Check, in order: 1) the error log for a stack trace, 2) whether the DB schema version matches the app version, 3) any dependency bump in the same release.",
  "qa:exploratory": "Q: What are the trade-offs between microservices and a monolith?\nA: Microservices: independent scaling and deployment per service, at the cost of more operational overhead and cross-service debugging. Monolith: simpler to build, test, and deploy as one unit, but scaling and team ownership get harder as it grows.",
  "transformation:format-conversion": "Input: \"Meeting notes: discussed budget, need approval by Friday.\"\nOutput (email): \"Subject: Budget Approval Needed by Friday\\n\\nHi team,\\n\\nFollowing our meeting, we discussed the budget and need approval by Friday.\\n\\nThanks,\"",
  "transformation:tone-shift":        "Input: \"hey can u send that file when u get a sec\"\nOutput (formal): \"Could you please send the file at your earliest convenience?\"",
  "transformation:simplification":    "Input: \"The mitochondria is the organelle responsible for cellular respiration and ATP synthesis.\"\nOutput (simplified): \"Mitochondria are the parts of a cell that make its energy.\"",
}

// ─── Category defaults ────────────────────────────────────────────────────────

export const CATEGORY_DEFAULTS: Record<string, {
  outputFormat: string; reasoningDepth: string; tone: string; role: string;
}> = {
  qa:             { outputFormat: "prose",          reasoningDepth: "quick answer",       tone: "direct",      role: "expert" },
  creative:       { outputFormat: "prose",          reasoningDepth: "quick answer",       tone: "casual",      role: "copywriter" },
  analysis:       { outputFormat: "markdown",        reasoningDepth: "consider edge cases", tone: "direct",      role: "analyst" },
  summarization:  { outputFormat: "bullet list",     reasoningDepth: "quick answer",       tone: "direct",      role: "editor" },
  transformation:  { outputFormat: "prose",           reasoningDepth: "quick answer",       tone: "formal",      role: "editor" },
}

// ─── Anti-patterns per category ───────────────────────────────────────────────
// The text-prompting equivalent of the image engine's "negative locks" — the
// most common ways LLM output goes wrong for each task type.

export const ANTI_PATTERNS: Record<string, string[]> = {
  qa: [
    "No unnecessary hedging or disclaimers when the answer is well-established",
    "No restating the question before answering",
    "No padding the answer with generic caveats that don't apply here",
    "No burying the direct answer at the end of a long preamble",
  ],
  creative: [
    "No clichés or stock phrases unless intentionally used for effect",
    "No purple prose or overwrought adjective stacking",
    "No generic characters or settings — be specific",
    "No abrupt tone shifts inconsistent with the rest of the piece",
  ],
  analysis: [
    "No unsupported claims presented as fact",
    "No false balance — if the evidence clearly favors one side, say so",
    "No conflating correlation with causation",
    "No omitting the confidence level or key uncertainty",
  ],
  summarization: [
    "No adding information not present in the source material",
    "No losing the source's key caveats or qualifications",
    "No summarizing at a level of detail that defeats the purpose of summarizing",
    "No reordering that changes the source's emphasis or meaning",
  ],
  transformation: [
    "No altering the meaning of the original while changing its form",
    "No dropping details that change downstream interpretation",
    "No inconsistent terminology between the original and the transformed version",
  ],
}
