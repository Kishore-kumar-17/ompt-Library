import type { ExtractedPromptFields, LockTemplate, ValidationResult } from "./types.js";

function isPresent(value: string | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Template-driven validation. Required fields come from the category's mandatory
 * locks; soft warnings come from any lock that declares a `warning`. Nothing here
 * is specific to one category, so every registered category validates cleanly.
 */
export function validateExtractedFields(
  fields: ExtractedPromptFields,
  template: LockTemplate,
): ValidationResult {
  const isMissing = (key: string) => !isPresent(fields[key as keyof ExtractedPromptFields]);

  const missingRequiredFields = template.mandatoryLocks
    .filter((lock) => lock.required && isMissing(lock.key))
    .map((lock) => lock.label);

  const warnings = [...template.mandatoryLocks, ...template.optionalLocks]
    .filter((lock) => lock.warning && isMissing(lock.key))
    .map((lock) => lock.warning!);

  return {
    valid: missingRequiredFields.length === 0,
    warnings,
    missingRequiredFields,
  };
}
