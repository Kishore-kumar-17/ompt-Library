import { Hono } from "hono";
import { improvePrompt } from "../engine/modules/improver.js";
import { optionalAuth, engineRateLimit } from "../middleware/rateLimit.js";
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
      // Same shape adaptation as routes/builder.ts: the frontend expects a
      // richer object (changes as {label, applied}, platform/family/tokensUsed,
      // plus lock-layer fields the lock-engine used to produce for this flow
      // before build/improve moved off it (it's still live for /api/variables,
      // see routes/variables.ts) — than the frozen public contract returns.
      return c.json({
        original: result.original,
        improved: result.improved,
        changes: result.improvements.map((label) => ({ label, applied: true })),
        platform: body.platform,
        family: body.family ?? "image",
        tokensUsed: 0,
        categoryId,
        categoryLabel: categoryId ? (CATEGORY_LABELS[categoryId] ?? categoryId) : null,
        lockSection: [],
        negativeLocks: [],
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
