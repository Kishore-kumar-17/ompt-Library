export const PLATFORM_IDS = [
  "chatgpt",
  "gemini",
  "grok",
  "midjourney",
  "firefly",
  "flux",
  "ideogram",
  "seedream",
  "recraft",
] as const;

export type PlatformId = (typeof PLATFORM_IDS)[number];

export const CATEGORY_IDS = [
  "people-portraits",
  "fashion-apparel",
  "product-ecommerce",
  "marketing-ads",
  "art-illustration",
  "trending-viral",
  "social-media",
] as const;

export type CategoryId = (typeof CATEGORY_IDS)[number];

export type PromptFamily = "image" | "video" | "text" | "content" | "website";

export type PlatformPromptMap = Partial<Record<PlatformId, string>> & Record<string, string>;

export interface PromptVariable {
  name: string;
  placeholder?: string;
}

// ─── Variable layer ──────────────────────────────────────────────────────────
export type VariableType = "text" | "color" | "image" | "select";

export interface VariableField {
  /** Token name without brackets, e.g. "BRAND" (matches `[BRAND]` in the text). */
  name: string;
  /** Human label for the input, e.g. "Brand". */
  label: string;
  type: VariableType;
  /** Input placeholder / example value. */
  placeholder?: string;
  /** Allowed options for `select` type. */
  options?: string[];
  /** Original phrase this token replaced — pre-fills the input so the prompt reads
   *  complete out-of-the-box (the "Variable Brief" default). */
  default?: string;
}

export interface PromptRecord {
  id: string;
  slug?: string;
  title: string;
  description?: string;
  basePrompt?: string;
  category: string;
  subCategory?: string;
  family?: PromptFamily;
  tags?: string[];
  tested?: boolean;
  rating?: number;
  reviews?: number;
  image?: string;
  author?: string;
  variables?: PromptVariable[];
  platforms: PlatformPromptMap;
  metadata?: Record<string, unknown>;
}

export interface ExtractedPromptFields {
  subject?: string;
  action?: string;
  expression?: string;
  gaze?: string;
  pose?: string;
  handPosition?: string;
  headPosition?: string;
  wardrobe?: string;
  garment?: string;
  garmentVisibility?: string;
  garmentColor?: string;
  garmentFit?: string;
  product?: string;
  productOrientation?: string;
  productPosition?: string;
  productVisibility?: string;
  brandStyle?: string;
  scale?: string;
  props?: string;
  background?: string;
  composition?: string;
  crop?: string;
  cameraAngle?: string;
  lighting?: string;
  material?: string;
  surface?: string;
  palette?: string;
  styleDna?: string;
  // Marketing / advertising
  ctaSpace?: string;
  brandColors?: string;
  // Art / illustration
  renderingStyle?: string;
  // Trending / viral
  visualHook?: string;
}

export type LockKey = keyof ExtractedPromptFields | (string & {});

export interface LockDefinition {
  key: LockKey;
  label: string;
  required: boolean;
  description: string;
  extractionHints?: string[];
  // Soft quality warning emitted by the validator when this lock's field is
  // absent (category-specific guidance — keeps the validator template-driven
  // instead of hardcoded to one category).
  warning?: string;
}

export interface LockSectionItem {
  key: LockKey;
  label: string;
  value: string;
  required: boolean;
}

export interface LockTemplateExample {
  promptTitle: string;
  extracted: Partial<ExtractedPromptFields>;
  notes?: string;
}

export interface LockTemplate {
  categoryId: CategoryId;
  categoryLabel: string;
  purpose: string;
  mandatoryLocks: LockDefinition[];
  optionalLocks: LockDefinition[];
  locksToAvoid: string[];
  extractionRules: string[];
  defaultNegativeLocks: string[];
  examples: LockTemplateExample[];
}

export interface ValidationResult {
  valid: boolean;
  warnings: string[];
  missingRequiredFields: string[];
}

export interface AssembledPromptResult {
  promptId: string;
  title: string;
  // null when the prompt's category does not resolve to a supported CategoryId
  // (graceful passthrough — platform variant returned without a lock layer).
  categoryId: CategoryId | null;
  categoryLabel: string;
  selectedPlatform: PlatformId;
  platformPromptText: string;
  lockSection: LockSectionItem[];
  negativeLockSection: string[];
  // Variable layer: `[TOKEN]` placeholders detected in the descriptive prompt that
  // the user can fill in to personalize it (locks stay invariant). Empty when none.
  variables: VariableField[];
  validation: ValidationResult;
  finalAssembledText: string;
}
