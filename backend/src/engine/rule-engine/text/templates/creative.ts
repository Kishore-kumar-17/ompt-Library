import { TextCategoryTemplate } from "../types.js"
import { CREATIVE_MODES } from "../dictionaries.js"
import { detectMode } from "../mode-detector.js"

export const CREATIVE_TEMPLATE: TextCategoryTemplate = {
  name: "Creative Writing",
  defaultOutputFormat: "prose",
  defaultReasoningDepth: "quick answer",
  sections: [
    "ROLE", "TASK", "CONSTRAINTS", "AUDIENCE_TONE", "OUTPUT_FORMAT",
    "AVOID", "LOCKS_SCOPE", "LOCKS_FORMAT",
  ],
}

export type CreativeMode = "narrative" | "persuasive" | "ideation"

const MODE_KEYWORDS: Record<CreativeMode, string[]> = {
  narrative:  ["story", "short story", "novel", "poem", "script", "screenplay", "fiction", "character", "plot", "song lyrics"],
  persuasive: ["tagline", "slogan", "marketing copy", "pitch", "ad copy", "advertisement", "sales copy", "persuasive essay", "call to action"],
  ideation:   ["brainstorm", "ideas for", "name ideas", "list of ideas", "generate ideas", "concepts for", "name options", "come up with"],
}

export function detectCreativeMode(task: string): CreativeMode {
  return detectMode(task, MODE_KEYWORDS, "narrative")
}

export function buildCreativeConstraints(task: string): string {
  const mode = detectCreativeMode(task)
  return `CONSTRAINTS: specify length, point of view, and genre conventions to follow — a creative brief without these produces generic output. ${CREATIVE_MODES[mode]}`
}
