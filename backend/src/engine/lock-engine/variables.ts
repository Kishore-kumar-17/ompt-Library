/**
 * Engine — Variable Layer.
 *
 * The variable layer turns the DESCRIPTIVE prompt into a reusable template. Swappable
 * content is marked with bracket tokens (e.g. `[BRAND]`, `[PRODUCT]`, `[COLOR]`); the
 * user fills them in to personalize a prompt while the LOCK LAYER stays invariant.
 *
 * Two sources of truth:
 *   - VARIABLE_DICTIONARY  — canonical, typed tokens (label + input type + placeholder).
 *   - CATEGORY_VARIABLES   — which canonical tokens each category is expected to expose.
 *
 * Unknown tokens (anything in [BRACKETS] not in the dictionary) auto-detect as a generic
 * text field, so the layer works on any prompt without curation.
 */

import type { CategoryId, VariableField } from "./types.js";

/** A token definition without its `name` (the dictionary key supplies the name). */
type VariableDef = Omit<VariableField, "name">;

// ─── Curated canonical tokens ────────────────────────────────────────────────
// Token keys are UPPER_SNAKE so they read clearly inside a prompt: `[PRODUCT]`.
export const VARIABLE_DICTIONARY: Record<string, VariableDef> = {
  BRAND:           { label: "Brand",           type: "text",   placeholder: "e.g. Nike, Apple" },
  PRODUCT:         { label: "Product",         type: "image",  placeholder: "e.g. running sneakers" },
  COLOR:           { label: "Color",           type: "color",  placeholder: "e.g. electric blue" },
  TAGLINE:         { label: "Tagline",         type: "text",   placeholder: "e.g. Just Do It" },
  SUBJECT:         { label: "Subject",         type: "text",   placeholder: "person: age, skin, hair, expression" },
  OUTFIT:          { label: "Outfit",          type: "text",   placeholder: "clothing, fabric, colour, details" },
  SETTING:         { label: "Setting",         type: "text",   placeholder: "location, backdrop, environment" },
  PALETTE:         { label: "Colour palette",  type: "text",   placeholder: "dominant colours (names or hex)" },
  STYLE_REFERENCE: { label: "Style reference", type: "text",   placeholder: "photographer or publication" },
  EXCLUDE:         { label: "Exclude",         type: "text",   placeholder: "artefacts / features to avoid" },
  MODEL:           { label: "Model",           type: "text",   placeholder: "e.g. female model, 20s" },
  LOCATION:        { label: "Location",        type: "text",   placeholder: "e.g. rooftop at dusk" },
  GARMENT:         { label: "Garment",         type: "text",   placeholder: "e.g. tailored trench coat" },
  STYLE:           { label: "Style",           type: "text",   placeholder: "e.g. watercolor, line art" },
  THEME:           { label: "Theme",           type: "text",   placeholder: "e.g. festival of lights" },
  TEXT:            { label: "Headline",        type: "text",   placeholder: "e.g. SALE 50% OFF" },
  LOGO:            { label: "Logo",            type: "image",  placeholder: "brand logo image" },
  MOOD:            { label: "Mood",            type: "select", options: ["serene", "dramatic", "playful", "luxurious", "energetic", "moody", "confident", "nostalgic"] },
  SEASON:          { label: "Season",          type: "select", options: ["Spring", "Summer", "Autumn", "Winter"] },
};

// ─── Per-category canonical tokens ───────────────────────────────────────────
// Drives which tokens the templatizer should insert and which inputs a category's
// prompts are expected to surface. (Auto-detect still picks up any extra tokens.)
export const CATEGORY_VARIABLES: Record<CategoryId, string[]> = {
  "marketing-ads":     ["BRAND", "PRODUCT", "COLOR", "TAGLINE"],
  "product-ecommerce": ["PRODUCT", "BRAND", "COLOR", "SETTING"],
  "fashion-apparel":   ["SUBJECT", "OUTFIT", "SETTING", "PALETTE", "MOOD", "STYLE_REFERENCE", "EXCLUDE"],
  "people-portraits":  ["SUBJECT", "OUTFIT", "SETTING", "PALETTE", "MOOD", "STYLE_REFERENCE", "EXCLUDE"],
  "art-illustration":  ["SUBJECT", "STYLE", "PALETTE", "THEME"],
  "trending-viral":    ["SUBJECT", "THEME", "COLOR", "TEXT"],
  "social-media":      ["BRAND", "SUBJECT", "COLOR", "TEXT"],
};

const TOKEN_RE = /\[([A-Z0-9_]+)\]/g;

/** Build a typed VariableField for a token, falling back to a generic text field. */
export function fieldForToken(name: string): VariableField {
  const def = VARIABLE_DICTIONARY[name];
  if (def) return { name, ...def };
  // Auto-detect fallback: Title-case the token for a readable label.
  const label = name
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
  return { name, label, type: "text", placeholder: `Your ${label.toLowerCase()}` };
}

/**
 * Detect `[TOKEN]` placeholders present in `text`, in first-appearance order,
 * deduped, and typed via the dictionary (generic text fallback for unknowns).
 */
export function extractVariables(text: string): VariableField[] {
  if (!text) return [];
  const seen = new Set<string>();
  const fields: VariableField[] = [];
  for (const m of text.matchAll(TOKEN_RE)) {
    const name = m[1]!;
    if (seen.has(name)) continue;
    seen.add(name);
    fields.push(fieldForToken(name));
  }
  return fields;
}

/**
 * Substitute `[TOKEN]` placeholders with provided values. Tokens without a value
 * are left intact (so the template form is preserved when nothing is filled).
 */
export function applyVariables(text: string, values: Record<string, string>): string {
  if (!text) return text;
  return text.replace(TOKEN_RE, (full, name: string) => {
    const v = values[name];
    return v && v.trim().length > 0 ? v : full;
  });
}
