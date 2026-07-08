// ─── Text Prompt Parser ─────────────────────────────────────────────────────────
// Keyword extraction from raw user input — no AI, no API.

import type { ParsedTextPrompt, TextCategory } from "./types.js"

const CATEGORY_KEYWORDS: Record<TextCategory, string[]> = {
  qa:             ["what is", "how do", "why does", "explain", "define", "difference between", "can you tell me"],
  creative:       ["write a story", "short story", "story about", "poem", "write a script", "creative", "fiction", "tagline", "slogan", "marketing copy", "song lyrics"],
  analysis:       ["compare", "analyze", "analyse", "evaluate", "pros and cons", "trade-off", "assessment", "which is better"],
  summarization:  ["summarize", "summarise", "tl;dr", "condense", "key points", "shorten", "extract the main"],
  transformation: ["rewrite", "translate", "convert to", "reformat", "make this more", "turn this into", "paraphrase"],
}

const OUTPUT_FORMAT_KEYWORDS = ["markdown", "bullet list", "numbered steps", "table", "json", "prose", "code block", "email"]

// Alias phrase → canonical dictionary key. Several natural phrasings ("explain
// like i'm five", "show your work") don't literally contain the dict's key
// ("eli5", "show working"), so a plain substring match against the dict never
// resolves them — map every alias to its canonical key here instead, and have
// findAliasMatch() return the canonical key so context-expander's dictionary
// lookups always hit.
const TONE_KEYWORDS: Record<string, string> = {
  "formal":     "formal",
  "casual":     "casual",
  "technical":  "technical",
  "eli5":       "eli5",
  "explain like i'm five": "eli5",
  "explain like i am five": "eli5",
  "persuasive": "persuasive",
  "empathetic": "empathetic",
  "direct":     "direct",
}
const REASONING_KEYWORDS: Record<string, string> = {
  "quick answer":        "quick answer",
  "step by step":        "step by step",
  "consider edge cases": "consider edge cases",
  "exhaustive":          "exhaustive",
  "show working":        "show working",
  "show your work":      "show working",
}
const AUDIENCE_KEYWORDS: Record<string, string> = {
  "for a beginner":        "beginner",
  "for beginners":         "beginner",
  "beginners":             "beginner",
  "novice":                "beginner",
  "for an expert":         "expert",
  "for experts":           "expert",
  "expert audience":       "expert",
  "for a 5-year-old":      "child",
  "for a 5 year old":      "child",
  "like i'm five":         "child",
  "like i am five":        "child",
  "for a child":           "child",
  "for kids":              "child",
  "for children":          "child",
  "for executives":        "executive",
  "for an executive":      "executive",
  "for the board":         "executive",
  "c-suite":               "executive",
  "for a general audience": "general",
  "general audience":      "general",
  "layperson":             "general",
  "laypeople":             "general",
  "for students":          "student",
  "for a student":         "student",
  "classroom":             "student",
  "technical audience":    "technical",
  "non-technical audience": "non-technical",
  "non technical audience": "non-technical",
  "for professionals":     "professional",
  "for practitioners":     "professional",
}

function detectCategory(text: string): TextCategory {
  const lower = text.toLowerCase()
  const scores: Record<TextCategory, number> = { qa: 0, creative: 0, analysis: 0, summarization: 0, transformation: 0 }
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) scores[cat as TextCategory]++
    }
  }
  const sorted = (Object.entries(scores) as [TextCategory, number][]).sort((a, b) => b[1] - a[1])
  return sorted[0][1] > 0 ? sorted[0][0] : "qa"
}

function findFirstMatch(text: string, keywords: string[]): string | null {
  const lower = text.toLowerCase()
  for (const kw of keywords) {
    if (lower.includes(kw)) return kw
  }
  return null
}

// Like findFirstMatch, but for alias maps (phrase → canonical dict key).
// Longer phrases are checked first so a specific alias ("for a 5-year-old")
// wins over a shorter one that might also incidentally match.
function findAliasMatch(text: string, aliasMap: Record<string, string>): string | null {
  const lower = text.toLowerCase()
  const phrases = Object.keys(aliasMap).sort((a, b) => b.length - a.length)
  for (const phrase of phrases) {
    if (lower.includes(phrase)) return aliasMap[phrase]
  }
  return null
}

function getMissingComponents(parsed: Partial<ParsedTextPrompt>, category: TextCategory): string[] {
  const required: Record<TextCategory, string[]> = {
    qa:             ["task"],
    creative:       ["task", "outputFormat"],
    analysis:       ["task"],
    summarization:  ["task", "outputFormat"],
    transformation: ["task", "outputFormat"],
  }
  return (required[category] ?? []).filter((field) => !parsed[field as keyof typeof parsed])
}

export function parseTextPrompt(raw: string): ParsedTextPrompt {
  const words = raw.trim().split(/\s+/)
  const category = detectCategory(raw)

  const parsed: ParsedTextPrompt = {
    detectedCategory: category,
    task:           raw.trim().length > 3 ? raw.trim() : null,
    audience:       findAliasMatch(raw, AUDIENCE_KEYWORDS),
    tone:           findAliasMatch(raw, TONE_KEYWORDS),
    outputFormat:   findFirstMatch(raw, OUTPUT_FORMAT_KEYWORDS),
    reasoningDepth: findAliasMatch(raw, REASONING_KEYWORDS),
    missingComponents: [],
    originalWords: words,
  }

  parsed.missingComponents = getMissingComponents(parsed, category)
  return parsed
}
