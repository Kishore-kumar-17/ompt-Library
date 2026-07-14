// ─── Rule-Based Website Improver ────────────────────────────────────────────────
// Enriches a weak/vague website-builder prompt using rule-based expansion — no
// API calls. Strategy: parse → detect gaps in category/subcategory/palette/
// audience/pages → rebuild the full Website Formula v1.0 structure around the
// user's original idea → add design-system locks.

import type { WebsiteImproveRequest, WebsiteRuleEngineResult } from "./types.js"
import { parseWebsitePrompt } from "./parser.js"
import { buildWebsiteFromRules } from "./builder.js"

export function improveWebsiteWithRules(req: WebsiteImproveRequest): WebsiteRuleEngineResult {
  const parsed = parseWebsitePrompt(req.promptText)
  const cat = req.category ?? parsed.detectedCategory

  // Re-run the same deterministic assembly the builder uses, seeded from
  // whatever the parser could recover. The original prompt text doubles as
  // the `idea` (so APPLICATION OVERVIEW describes what the user actually
  // wrote, not a generic subcategory placeholder) — builder.ts's NOTES
  // dedup means it won't also be echoed a second time verbatim.
  return buildWebsiteFromRules({
    category: cat,
    subcategory: parsed.subcategory ?? undefined,
    idea: req.promptText.trim(),
    palette: parsed.palette ?? undefined,
    audience: parsed.audience ?? undefined,
    pages: parsed.pages.length ? parsed.pages : undefined,
    extraNotes: req.promptText.trim(),
    platform: req.platform,
  })
}
