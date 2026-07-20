import type { LockSectionItem } from "./api";

/**
 * Client-side mirror of the backend's buildJsonPrompt() — same shape, built
 * from lock fields already present in state. Lets the Text/JSON toggle react
 * instantly to already-generated results instead of only updating on the
 * next generate/improve/refine call (the server only returns `jsonPrompt`
 * when a request explicitly asked for it).
 */
export function buildClientJsonPrompt(
  categoryLabel: string | null,
  lockSection: LockSectionItem[],
  negativeLocks: string[],
  platform: string,
): Record<string, unknown> {
  const fields: Record<string, string> = {};
  for (const item of lockSection) {
    fields[item.key] = item.value;
  }

  return {
    platform,
    category: categoryLabel,
    ...fields,
    negative_prompt: negativeLocks,
  };
}
