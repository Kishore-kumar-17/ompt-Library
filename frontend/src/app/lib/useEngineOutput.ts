import { useState } from "react";
import { applyVariables } from "./variables";
import type { EngineLockFields, VariableField } from "./api";

// Builder.tsx and Improver.tsx each independently reimplemented this same
// "single source of truth for the current prompt text" pattern — what Copy,
// Download, and the on-screen preview all read. A fix to one page's version
// (as happened before an earlier audit) didn't propagate to the other.
//
// `fallbackText` is passed explicitly rather than read off `EngineLockFields`
// because the two pages fall back to differently-named result fields
// (Builder's `generated` vs Improver's `result.improved`), and neither lives
// on the shared base type.
//
// `skipVariables` preserves Builder's website-family bypass (website output
// is shown raw, with no variable-brief/regenerate layer) — Improver never
// had this bypass, so it simply omits the option.
export function useEngineOutput(
  engineFields: EngineLockFields | null,
  fallbackText: string,
  opts?: { skipVariables?: boolean }
) {
  const [vars, setVars] = useState<Record<string, string>>({});
  const [regenText, setRegenText] = useState<string | null>(null);

  const variableFields: VariableField[] = engineFields?.variables ?? [];
  const baseText = engineFields?.finalAssembledText || fallbackText;
  const displayText = opts?.skipVariables
    ? fallbackText
    : regenText ?? applyVariables(baseText, vars);

  // Pre-fill the variable brief with each field's default — both pages did
  // this identically after a successful generate/improve.
  function prefillFromResult(result: EngineLockFields) {
    setVars(Object.fromEntries((result.variables ?? []).filter((v) => v.default).map((v) => [v.name, v.default!])));
  }

  function resetForNewRun() {
    setVars({});
    setRegenText(null);
  }

  return { vars, setVars, regenText, setRegenText, variableFields, baseText, displayText, prefillFromResult, resetForNewRun };
}
