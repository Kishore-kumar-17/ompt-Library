/**
 * REST surface for the Prompt Intelligence Engine.
 *
 * Retrieves existing library prompts (from both the pl_prompts library and the
 * curated `prompts` table), then assembles a platform variant + lock layer +
 * negative lock layer. It does NOT generate prompt content.
 */

import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";
import {
  assembleEnginePrompt,
  searchEngine,
  getEnginePromptById,
  isEngineError,
} from "../engine/index.js";

const router = new Hono();

const searchSchema = z.object({
  q: z.string().min(1),
  limit: z.coerce.number().int().min(1).max(50).default(10),
});

router.get("/search", zValidator("query", searchSchema), async (c) => {
  const { q, limit } = c.req.valid("query");
  const results = await searchEngine(q, limit);
  return c.json({ data: results, query: q });
});

router.get("/prompts/:id", async (c) => {
  const id = c.req.param("id");
  const prompt = await getEnginePromptById(id);
  if (!prompt) return c.json({ error: "Not found" }, 404);
  return c.json(prompt);
});

const assembleSchema = z.object({
  promptId: z.string().min(1),
  platform: z.string().min(1).optional(),
});

router.post("/assemble", zValidator("json", assembleSchema), async (c) => {
  const { promptId, platform } = c.req.valid("json");
  const result = await assembleEnginePrompt({ promptId, platform });
  if (isEngineError(result)) return c.json(result, 404);
  return c.json(result);
});

export default router;
