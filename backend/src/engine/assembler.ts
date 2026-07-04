import { buildLockSection, formatLockSection } from "./lock-builder.js";
import { extractVariables } from "./variables.js";
import type {
  AssembledPromptResult,
  CategoryId,
  ExtractedPromptFields,
  PlatformId,
  PromptRecord,
  ValidationResult,
  LockTemplate,
} from "./types.js";

export interface AssemblePromptInput {
  prompt: PromptRecord;
  categoryId: CategoryId;
  categoryLabel: string;
  selectedPlatform: PlatformId;
  platformPromptText: string;
  fields: ExtractedPromptFields;
  template: LockTemplate;
  negativeLocks: string[];
  validation: ValidationResult;
}

function formatNegativeLocks(negativeLocks: string[]): string {
  if (negativeLocks.length === 0) return "";
  return negativeLocks.map((item) => `- ${item}`).join("\n");
}

function buildFinalAssembledText(
  platformPromptText: string,
  lockSectionText: string,
  negativeLocksText: string,
): string {
  const parts = [platformPromptText.trim()];

  if (lockSectionText.trim().length > 0) {
    parts.push("LOCK LAYER", lockSectionText.trim());
  }

  if (negativeLocksText.trim().length > 0) {
    parts.push("NEGATIVE LOCKS", negativeLocksText.trim());
  }

  return parts.join("\n\n");
}

export function assemblePromptResult(input: AssemblePromptInput): AssembledPromptResult {
  const lockSection = buildLockSection(input.template, input.fields);
  const lockSectionText = formatLockSection(lockSection);
  const negativeLocksText = formatNegativeLocks(input.negativeLocks);
  const finalAssembledText = buildFinalAssembledText(
    input.platformPromptText,
    lockSectionText,
    negativeLocksText,
  );

  // Variable layer is detected from the DESCRIPTIVE prompt only (locks never carry
  // tokens). Any authored record-level variables take precedence on metadata.
  const variables = extractVariables(input.platformPromptText);

  return {
    promptId: input.prompt.id,
    title: input.prompt.title,
    categoryId: input.categoryId,
    categoryLabel: input.categoryLabel,
    selectedPlatform: input.selectedPlatform,
    platformPromptText: input.platformPromptText,
    lockSection,
    negativeLockSection: input.negativeLocks,
    variables,
    validation: input.validation,
    finalAssembledText,
  };
}
