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
