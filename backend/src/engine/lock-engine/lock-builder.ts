import type {
  ExtractedPromptFields,
  LockSectionItem,
  LockTemplate,
} from "./types.js";

function isPresent(value: string | undefined): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function fallbackValue(key: string): string | null {
  switch (key) {
    case "handPosition":
      return "Hands not emphasized; preserve a natural pose if visible.";
    case "gaze":
      return "Preserve a natural portrait gaze consistent with the subject.";
    case "styleDna":
      return "Preserve the authored portrait style without cross-model drift.";
    default:
      return null;
  }
}

// A "required" lock exists to tell the user this dimension matters for
// consistency — silently omitting it when the parser can't find a value
// breaks that contract more than showing an honest "not specified" line
// does. Field-specific fallbacks (above) win when one exists; this generic
// one is the backstop for every other required field (lighting, composition,
// background, etc. across the other 6 categories) so a mandatory lock never
// just vanishes because the AI phrased something in a way no pattern caught.
function genericFallback(label: string): string {
  return `${label} not explicitly specified in the generated prompt — keep consistent with the reference intent.`;
}

function toItem(
  key: string,
  label: string,
  required: boolean,
  fields: ExtractedPromptFields,
): LockSectionItem | null {
  const direct = fields[key as keyof ExtractedPromptFields];
  if (isPresent(direct)) {
    return {
      key,
      label,
      value: direct.trim(),
      required,
    };
  }

  if (!required) return null;

  const fallback = fallbackValue(key) ?? genericFallback(label);

  return {
    key,
    label,
    value: fallback,
    required,
  };
}

export function buildLockSection(
  template: LockTemplate,
  fields: ExtractedPromptFields,
): LockSectionItem[] {
  const items: LockSectionItem[] = [];

  for (const lock of template.mandatoryLocks) {
    const item = toItem(lock.key, lock.label, true, fields);
    if (item) items.push(item);
  }

  for (const lock of template.optionalLocks) {
    const item = toItem(lock.key, lock.label, false, fields);
    if (item) items.push(item);
  }

  return items;
}

export function formatLockSection(items: LockSectionItem[]): string {
  if (items.length === 0) return "";

  const lines = items.map((item, index) => {
    const number = String(index + 1).padStart(2, "0");
    return `LOCK ${number} - ${item.label.toUpperCase()}: ${item.value}`;
  });

  return lines.join("\n");
}
