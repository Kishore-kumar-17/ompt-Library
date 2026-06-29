/**
 * Substitute `[TOKEN]` placeholders with filled values. Tokens without a value are
 * left intact (template form preserved). Mirrors the backend engine's applyVariables
 * — used by Builder/Improver/Detail to personalize the descriptive layer while the
 * lock layer (which never contains tokens) stays invariant.
 */
export function applyVariables(text: string, values: Record<string, string>): string {
  if (!text) return text;
  return text.replace(/\[([A-Z0-9_]+)\]/g, (full, name: string) => {
    const v = values[name];
    return v && v.trim().length > 0 ? v : full;
  });
}
