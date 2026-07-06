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
const TONE_KEYWORDS = ["formal", "casual", "technical", "eli5", "explain like i'm five", "persuasive", "empathetic", "direct"]
const REASONING_KEYWORDS = ["quick answer", "step by step", "consider edge cases", "exhaustive", "show working", "show your work"]

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
    audience:       null,
    tone:           findFirstMatch(raw, TONE_KEYWORDS),
    outputFormat:   findFirstMatch(raw, OUTPUT_FORMAT_KEYWORDS),
    reasoningDepth: findFirstMatch(raw, REASONING_KEYWORDS),
    missingComponents: [],
    originalWords: words,
  }

  parsed.missingComponents = getMissingComponents(parsed, category)
  return parsed
}
