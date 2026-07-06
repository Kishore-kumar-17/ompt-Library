// ─── Text Rule Engine — Barrel Exports ─────────────────────────────────────────
export { buildTextFromRules }   from "./builder.js"
export { improveTextWithRules } from "./improver.js"
export { parseTextPrompt }      from "./parser.js"
export { generateTextLocks }    from "./lock-generator.js"
export { formatForTextPlatform } from "./formatter.js"
export { scoreTextPrompt, getMissingTextSections } from "./validator.js"
export * from "./types.js"
