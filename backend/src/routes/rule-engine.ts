// ─── Rule Engine Routes ────────────────────────────────────────────────────────
// Zero-API prompt building and improvement — no LLM required.
// POST /api/rule-engine/build
// POST /api/rule-engine/improve
// POST /api/rule-engine/analyze

import { Hono } from "hono"
import { improveWithRules, scorePrompt, getMissingSections, parsePrompt, generatePrompt } from "../engine/rule-engine"
import type { RuleEngineBuildRequest, RuleEngineImproveRequest, PlatformKey } from "../engine/rule-engine/types"

const app = new Hono()

// ─── POST /build ──────────────────────────────────────────────────────────────
app.post("/build", async (c) => {
  try {
    const body = await c.req.json()

    if (!body.idea?.trim()) {
      return c.json({ ok: false, error: "idea is required" }, 400)
    }

    const platform = (body.platform as PlatformKey) ?? "chatgpt"
    const ideaParts = [body.idea]
    if (body.style) ideaParts.push(body.style)
    if (body.mood)  ideaParts.push(body.mood)

    const result = generatePrompt(ideaParts.join(", "), platform)
    return c.json({ ok: true, data: result })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Rule engine build failed"
    return c.json({ ok: false, error: msg }, 500)
  }
})

// ─── POST /improve ────────────────────────────────────────────────────────────
app.post("/improve", async (c) => {
  try {
    const body = await c.req.json()

    if (!body.promptText?.trim()) {
      return c.json({ ok: false, error: "promptText is required" }, 400)
    }

    const req: RuleEngineImproveRequest = {
      promptText: body.promptText,
      platform:   (body.platform as PlatformKey) ?? "chatgpt",
      category:   body.category,
    }

    const result = improveWithRules(req)
    return c.json({ ok: true, data: result })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Rule engine improve failed"
    return c.json({ ok: false, error: msg }, 500)
  }
})

// ─── POST /analyze ────────────────────────────────────────────────────────────
app.post("/analyze", async (c) => {
  try {
    const body = await c.req.json()

    if (!body.promptText?.trim()) {
      return c.json({ ok: false, error: "promptText is required" }, 400)
    }

    const parsed  = parsePrompt(body.promptText)
    const score   = scorePrompt(body.promptText, parsed.detectedCategory)
    const missing = getMissingSections(body.promptText, parsed.detectedCategory)

    return c.json({
      ok: true,
      data: {
        score,
        category: parsed.detectedCategory,
        detected: {
          subject:      parsed.subject,
          wardrobe:     parsed.wardrobe,
          setting:      parsed.setting,
          lighting:     parsed.lighting,
          camera:       parsed.camera,
          handPosition: parsed.handPosition,
          style:        parsed.style,
          palette:      parsed.palette,
        },
        missing,
        missingComponents: parsed.missingComponents,
        engine: "rule-based",
      },
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Rule engine analyze failed"
    return c.json({ ok: false, error: msg }, 500)
  }
})

export default app
