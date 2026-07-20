import type { AssembledPromptResult } from "./types.js";

/**
 * "JSON Prompting" mode — restructures the SAME data the Lock Layer panel
 * already shows (extracted fields + negative locks) into a structured JSON
 * object instead of prose, for platforms/workflows that consume structured
 * input. Deterministic — no extra AI call, so it's exactly as accurate (and
 * exactly as fast) as the text-mode lock layer it's derived from.
 */
export function buildJsonPrompt(
  assembled: AssembledPromptResult,
  platform: string,
): Record<string, unknown> {
  const fields: Record<string, string> = {};
  for (const item of assembled.lockSection) {
    fields[item.key] = item.value;
  }

  return {
    platform,
    category: assembled.categoryLabel,
    ...fields,
    negative_prompt: assembled.negativeLockSection,
  };
}
