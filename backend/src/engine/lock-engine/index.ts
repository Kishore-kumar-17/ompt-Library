/**
 * Engine Module 9 — Output Engine / public orchestrator.
 *
 * The only module routes should import. It runs the full pipeline:
 *   retrieve -> select platform variant -> resolve category -> parse ->
 *   validate -> assemble (locks + negative locks) -> final text.
 *
 * Categories without a registered engine fall through gracefully: the platform
 * variant is returned with empty lock sections and a validation warning.
 */

import { resolveCategoryId, getCategoryLabel } from "./categories.js";
import { getCategoryEngine } from "./registry.js";
import { assemblePromptResult } from "./assembler.js";
import { extractVariables } from "./variables.js";
import { validateExtractedFields } from "./validator.js";
import { getEnginePromptById, searchEnginePrompts } from "./db-source.js";
import { PLATFORM_IDS } from "./types.js";
import type { AssembledPromptResult, PlatformId, PromptRecord } from "./types.js";

export interface AssembleEngineInput {
  promptId: string;
  platform?: PlatformId | string;
}

export interface EngineError {
  error: string;
}

export function isEngineError(value: AssembledPromptResult | EngineError): value is EngineError {
  return (value as EngineError).error !== undefined;
}

interface PlatformSelection {
  platformId: PlatformId;
  text: string;
  warnings: string[];
}

// Locks are parsed from a single canonical reference variant chosen the SAME way
// for every request (independent of the platform the caller selects), so the lock
// layer is identical across platforms. We prefer the richest authored variants
// (flux/chatgpt are the longest, most-detailed) and fall back to the longest
// available text, then the base prompt.
const REFERENCE_PRIORITY = ["flux", "chatgpt", "firefly", "gemini", "midjourney", "grok"];

function pickReferenceText(prompt: PromptRecord): string | undefined {
  for (const id of REFERENCE_PRIORITY) {
    const v = prompt.platforms[id];
    if (typeof v === "string" && v.trim().length > 30) return v;
  }
  const longest = Object.values(prompt.platforms)
    .filter((v): v is string => typeof v === "string")
    .sort((a, b) => b.length - a.length)[0];
  return longest ?? prompt.basePrompt ?? prompt.description;
}

function selectPlatform(prompt: PromptRecord, requested?: PlatformId | string): PlatformSelection {
  const warnings: string[] = [];
  const available = Object.entries(prompt.platforms)
    .filter(([, value]) => typeof value === "string" && value.trim().length > 0)
    .map(([key]) => key);

  if (requested && available.includes(requested)) {
    return { platformId: requested as PlatformId, text: prompt.platforms[requested], warnings };
  }

  if (requested && !available.includes(requested)) {
    warnings.push(`Requested platform "${requested}" is not available for this prompt.`);
  }

  if (available.length > 0) {
    const first = available[0]!;
    if (requested) warnings.push(`Fell back to "${first}".`);
    return { platformId: first as PlatformId, text: prompt.platforms[first]!, warnings };
  }

  warnings.push("Prompt has no platform variants; used base prompt text.");
  return {
    platformId: (requested as PlatformId) ?? PLATFORM_IDS[0],
    text: prompt.basePrompt ?? "",
    warnings,
  };
}

export async function assembleEnginePrompt(
  input: AssembleEngineInput,
): Promise<AssembledPromptResult | EngineError> {
  const prompt = await getEnginePromptById(input.promptId);
  if (!prompt) return { error: "Prompt not found" };
  return assembleFromRecord(prompt, input.platform);
}

/**
 * Pure assembly over an already-loaded record (no DB). Runs platform selection,
 * category resolution, parse, validate, and final assembly. Exposed so the
 * pipeline can be exercised in isolation (see scripts/engine-smoke.ts).
 */
export function assembleFromRecord(
  prompt: PromptRecord,
  platform?: PlatformId | string,
): AssembledPromptResult {
  const { platformId, text: platformPromptText, warnings: platformWarnings } = selectPlatform(
    prompt,
    platform,
  );

  const categoryId = resolveCategoryId(prompt.category);
  const categoryEngine = categoryId ? getCategoryEngine(categoryId) : null;

  if (categoryId && categoryEngine) {
    // Parse from the canonical reference variant (NOT the selected platform), so
    // the lock layer + negative locks are identical across every platform variant.
    // Only platformPromptText / finalAssembledText differ per platform.
    const fields = categoryEngine.parse(prompt, pickReferenceText(prompt));
    const validation = validateExtractedFields(fields, categoryEngine.template);

    const result = assemblePromptResult({
      prompt,
      categoryId,
      categoryLabel: getCategoryLabel(categoryId),
      selectedPlatform: platformId,
      platformPromptText,
      fields,
      template: categoryEngine.template,
      negativeLocks: categoryEngine.negatives,
      validation: {
        ...validation,
        warnings: [...platformWarnings, ...validation.warnings],
      },
    });

    return result;
  }

  // Graceful passthrough — no lock template for this category.
  const categoryLabel = categoryId ? getCategoryLabel(categoryId) : prompt.category || "Uncategorized";
  return {
    promptId: prompt.id,
    title: prompt.title,
    categoryId,
    categoryLabel,
    selectedPlatform: platformId,
    platformPromptText,
    lockSection: [],
    negativeLockSection: [],
    variables: extractVariables(platformPromptText),
    validation: {
      valid: true,
      warnings: [
        ...platformWarnings,
        `No lock template for category "${categoryLabel}"; returned platform variant only.`,
      ],
      missingRequiredFields: [],
    },
    finalAssembledText: platformPromptText.trim(),
  };
}

/**
 * Generate a lock layer + negative locks for a piece of prompt TEXT (e.g. a
 * Builder/Improver output that isn't in the library). Wraps the text as an
 * in-memory PromptRecord and runs the normal assembly. Unsupported categories
 * pass through with empty lock sections.
 */
export function assembleFromText(input: {
  text: string;
  category: string;
  platform?: PlatformId | string;
  title?: string;
}): AssembledPromptResult {
  const platformId = (input.platform as string) || "chatgpt";
  const record: PromptRecord = {
    id: "generated",
    title: input.title ?? "",
    category: input.category,
    description: input.text,
    basePrompt: input.text,
    platforms: { [platformId]: input.text },
  };
  return assembleFromRecord(record, platformId);
}

export interface EngineSearchResult {
  id: string;
  title: string;
  category: string;
  platforms: string[];
}

export async function searchEngine(query: string, limit = 10): Promise<EngineSearchResult[]> {
  const records = await searchEnginePrompts(query, limit);
  return records.map((record) => ({
    id: record.id,
    title: record.title,
    category: record.category,
    platforms: Object.keys(record.platforms),
  }));
}

export { getEnginePromptById };
