import { Hono } from "hono";
import { improvePrompt } from "../engine/modules/improver.js";
import { optionalAuth, engineRateLimit } from "../middleware/rateLimit.js";
import { assembleFromText } from "../engine/lock-engine/index.js";
import type { ImprovePromptRequest } from "../engine/contracts.js";

const router = new Hono();

// Human-readable labels for the rule engine's detected subject category —
// surfaced to the frontend so a misclassification is visible and correctable
// instead of silently driving the wrong wardrobe/skin/composition sections.
const CATEGORY_LABELS: Record<string, string> = {
  people:  "People & Portraits",
  fashion: "Fashion & Apparel",
  product: "Product & Ecommerce",
  art:     "Art & Illustration",
  social:  "Social & Content",
};

router.post(
  "/improve",
  optionalAuth,
  engineRateLimit("improve"),
  async (c) => {
    const body = await c.req.json<ImprovePromptRequest>();

    if (!body.prompt?.trim()) {
      return c.json({ error: "prompt is required" }, 400);
    }
    if (!body.platform) {
      return c.json({ error: "platform is required" }, 400);
    }

    const user = c.get("user") as { sub: string } | undefined;
    const userId = user?.sub ?? null;

    try {
      const result = await improvePrompt(body, userId);
      const categoryId = result.metadata.category ?? null;
      const family = body.family ?? "image";
      // Same shape adaptation as routes/builder.ts: the frontend expects a
      // richer object (changes as {label, applied}, platform/family/tokensUsed,
      // plus lock-layer fields) than the frozen public contract returns. For
      // images, run the real content-aware lock-engine (same one
      // /api/variables/expand uses) over the improved text so the lock panel
      // reflects what was actually produced, instead of a category-generic
      // template.
      const assembled = family === "image"
        ? assembleFromText({ text: result.improved, category: categoryId ?? "", platform: body.platform, title: body.prompt })
        : null;
      return c.json({
        original: result.original,
        improved: result.improved,
        changes: result.improvements.map((label) => ({ label, applied: true })),
        platform: body.platform,
        family,
        tokensUsed: 0,
        categoryId,
        categoryLabel: categoryId ? (CATEGORY_LABELS[categoryId] ?? categoryId) : null,
        lockSection: assembled?.lockSection ?? [],
        negativeLocks: assembled?.negativeLockSection ?? [],
        variables: [],
        validation: null,
        finalAssembledText: result.improved,
      });
    } catch (err: any) {
      console.error("Improver error:", err?.message ?? err);
      return c.json({ error: err?.message ?? "AI improvement failed. Please try again." }, 500);
    }
  }
);

export default router;
