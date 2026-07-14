// ─── Text Rule Engine Types ─────────────────────────────────────────────────────
// Instruction Formula v1.0 — zero-API deterministic text/LLM prompt construction.
// Unlike image (static geometry) or video (temporal motion), text prompting
// fails on AMBIGUITY: unclear scope, unspecified output format, wrong reasoning
// depth, uncalibrated audience. Locks here pin scope, format, and depth instead
// of visual or motion properties.

export type TextCategory = "qa" | "creative" | "analysis" | "summarization" | "transformation"

export type TextPlatformKey = "claude" | "chatgpt-text" | "gemini-text" | "grok-text" | "perplexity" | "deepseek"

export interface TextBuildRequest {
  category: TextCategory
  task?: string
  audience?: string
  tone?: string
  outputFormat?: string
  reasoningDepth?: string
  extraNotes?: string
  platform: TextPlatformKey
}

export interface TextImproveRequest {
  promptText: string
  platform: TextPlatformKey
  category?: TextCategory
}

export interface ParsedTextPrompt {
  detectedCategory: TextCategory
  task: string | null
  audience: string | null
  tone: string | null
  outputFormat: string | null
  reasoningDepth: string | null
  missingComponents: string[]
  originalWords: string[]
}

export interface TextLockValues {
  scopeInclude: string
  scopeExclude: string
  formatSpec: string
  depthSpec: string
}

export interface TextRuleEngineResult {
  prompt: string
  platform: TextPlatformKey
  category: TextCategory
  score: number
  components: {
    task: boolean
    audience: boolean
    tone: boolean
    outputFormat: boolean
    reasoningDepth: boolean
    locks: boolean
  }
  locks: {
    scope: string
    format: string
    depth: string
  }
  antiPatterns: string[]
  wordCount: number
  engine: "rule-based"
}

export interface TextCategoryTemplate {
  name: string
  sections: string[]
  defaultOutputFormat: string
  defaultReasoningDepth: string
}
