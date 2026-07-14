// ─── Code Rule Engine Types ─────────────────────────────────────────────────────
// Engineering Spec Formula v1.0 — zero-API deterministic coding prompt
// construction. Code prompting fails on SCOPE CREEP (touching unrelated
// files), WRONG STACK ASSUMPTIONS (hallucinated APIs/versions), and MISSING
// ACCEPTANCE CRITERIA (no definition of done). Locks pin boundary, acceptance,
// and convention-compliance instead of visual, motion, or clarity properties.

export type CodeCategory = "bugfix" | "feature" | "refactor" | "review" | "test"

export type CodePlatformKey = "claude-code" | "cursor" | "copilot" | "chatgpt-code" | "gemini-code"

export interface CodeBuildRequest {
  category: CodeCategory
  task?: string
  techStack?: string
  outputFormat?: string
  scopeBoundary?: string
  extraNotes?: string
  platform: CodePlatformKey
}

export interface CodeImproveRequest {
  promptText: string
  platform: CodePlatformKey
  category?: CodeCategory
}

export interface ParsedCodePrompt {
  detectedCategory: CodeCategory
  task: string | null
  techStack: string | null
  outputFormat: string | null
  missingComponents: string[]
  originalWords: string[]
}

export interface CodeLockValues {
  boundaryInclude: string
  boundaryExclude: string
  acceptance: string
  convention: string
}

export interface CodeRuleEngineResult {
  prompt: string
  platform: CodePlatformKey
  category: CodeCategory
  score: number
  components: {
    task: boolean
    techStack: boolean
    outputFormat: boolean
    scopeBoundary: boolean
    locks: boolean
  }
  locks: {
    boundary: string
    acceptance: string
    convention: string
  }
  antiPatterns: string[]
  wordCount: number
  engine: "rule-based"
}

export interface CodeCategoryTemplate {
  name: string
  sections: string[]
  defaultOutputFormat: string
  isAgentic: boolean
}
