import { Hono } from "hono";
import { improvePrompt } from "../engine/modules/improver.js";
import { optionalAuth, engineRateLimit } from "../middleware/rateLimit.js";
import type { ImprovePromptRequest } from "../engine/contracts.js";

const router = new Hono();

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
      // Same shape adaptation as routes/builder.ts: the frontend expects a
      // richer object (changes as {label, applied}, platform/family/tokensUsed,
      // plus lock-layer fields the retired lock-engine used to produce) than
      // the frozen public contract returns.
      return c.json({
        original: result.original,
        improved: result.improved,
        changes: result.improvements.map((label) => ({ label, applied: true })),
        platform: body.platform,
        family: (body as { family?: string }).family ?? "image",
        tokensUsed: 0,
        categoryId: null,
        categoryLabel: null,
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
