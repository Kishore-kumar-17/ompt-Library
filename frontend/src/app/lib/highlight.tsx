import type { ReactNode } from "react";

/**
 * Highlights `[TOKEN]` placeholders inside a prompt string. Filled tokens (whose
 * name is NOT in `unfilledNames`) render muted; unfilled ones render in accent.
 * Used by the variable layer to show which placeholders still need a value.
 */
export function highlight(text: string, unfilledNames: string[]): ReactNode {
  if (!text) return text;
  const parts: ReactNode[] = [];
  const regex = /\[([^\]]+)\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    const before = text.slice(last, m.index);
    if (before) parts.push(before);
    const isUnfilled = unfilledNames.includes(m[1]);
    parts.push(
      <span
        key={`v-${i++}`}
        className={isUnfilled ? "bg-[#4FC3F7] px-1 rounded" : "bg-[#90b4ce]/30 px-1 rounded"}
      >
        {m[0]}
      </span>,
    );
    last = regex.lastIndex;
  }
  const rest = text.slice(last);
  if (rest) parts.push(rest);
  return parts;
}
