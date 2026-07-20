import { Hono } from "hono";
import { refinePrompt, type RefineTurn } from "../engine/modules/refiner.js";
import { assembleFromText } from "../engine/lock-engine/index.js";
import { buildJsonPrompt } from "../engine/lock-engine/json-prompt.js";
import { optionalAuth, engineRateLimit } from "../middleware/rateLimit.js";

const router = new Hono();

interface RefineRequestBody {
  family?: string;
  platform?: string;
  category?: string;
  history?: RefineTurn[];
  promptFormat?: "text" | "json";
}

function isValidHistory(history: unknown): history is RefineTurn[] {
  return (
    Array.isArray(history) &&
    history.length > 0 &&
    history.every(
      (turn) =>
        turn &&
        (turn.role === "user" || turn.role === "assistant") &&
        typeof turn.content === "string" &&
        turn.content.trim().length > 0
    )
  );
}

// ─── POST /refine — chat-driven revision of a previously generated/improved prompt ──
router.post("/", optionalAuth, engineRateLimit("refine"), async (c) => {
  const body = await c.req.json<RefineRequestBody>();

  if (!body.family) return c.json({ error: "family is required" }, 400);
  if (!body.platform) return c.json({ error: "platform is required" }, 400);
  if (!isValidHistory(body.history)) {
    return c.json({ error: "history is required and must end with a non-empty user message" }, 400);
  }
  const lastTurn = body.history[body.history.length - 1];
  if (lastTurn.role !== "user") {
    return c.json({ error: "history must end with a user message" }, 400);
  }

  try {
    const result = await refinePrompt({
      family: body.family,
      platform: body.platform,
      category: body.category,
      history: body.history,
    });

    // Same content-aware lock re-derivation Builder/Improver already run on
    // their own outputs — the refined text needs the same treatment so the
    // lock panel stays in sync with whatever the chat just changed.
    const assembled = body.family === "image"
      ? assembleFromText({ text: result.revised, category: body.category ?? "", platform: body.platform })
      : null;
    const jsonPrompt = assembled && body.promptFormat === "json"
      ? buildJsonPrompt(assembled, body.platform)
      : null;

    return c.json({
      revised: result.revised,
      categoryId: assembled?.categoryId ?? null,
      categoryLabel: assembled?.categoryLabel ?? null,
      lockSection: assembled?.lockSection ?? [],
      negativeLocks: assembled?.negativeLockSection ?? [],
      tokensUsed: result.tokensUsed,
      jsonPrompt,
    });
  } catch (err: any) {
    console.error("Refine error:", err?.message ?? err);
    return c.json({ error: err?.message ?? "Refinement failed. Please try again." }, 500);
  }
});

export default router;
