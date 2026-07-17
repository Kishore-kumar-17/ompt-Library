// ─── Families ─────────────────────────────────────────────────────────────────

export type Family = "image" | "video" | "text" | "code" | "content" | "website";

// ─── Prompt Components ────────────────────────────────────────────────────────

export type ComponentKey =
  | "role"
  | "objective"
  | "context"
  | "constraints"
  | "style"
  | "output_format"
  | "technical"
  | "platform_params"
  | "safety"
  | "negative";

export interface PromptComponent {
  key: ComponentKey;
  content: string;
  weight: number;
  required: boolean;
  presentInOutput: boolean;
}

// ─── Platform Configuration ───────────────────────────────────────────────────

export interface PlatformConfig {
  id: string;
  name: string;
  family: Family;
  wordBudget: { min: number; max: number };
  structureRules: string;
  systemPromptAddition: string;
  supportedTiers: string[];
  parameterFlags: string;
  compressionLevel: "minimal" | "standard" | "verbose";
  componentOrder: ComponentKey[];
  requiredComponents: ComponentKey[];
}

// ─── Scoring ──────────────────────────────────────────────────────────────────

export interface ScoreDimension {
  name: string;
  score: number;
  weight: number;
  feedback: string;
}

export type ScoreGrade = "poor" | "good" | "excellent" | "pro";

export interface PromptScore {
  overall: number;
  grade: ScoreGrade;
  dimensions: ScoreDimension[];
  wordCount: number;
  inBudget: boolean;
}

// ─── Engine Requests ──────────────────────────────────────────────────────────

export interface BuildRequest {
  idea: string;
  family: Family;
  platform: string;
  style?: string;
  mood?: string;
  aspect?: string;
  category?: string;
  stream?: boolean;
}

export interface ImproveRequest {
  prompt: string;
  platform: string;
  family?: Family;
  category?: string;
}

export interface AnalyzeRequest {
  promptText: string;
  platform?: string;
  family?: Family;
}

export interface OptimizeRequest {
  promptText: string;
  targetPlatform: string;
  family: Family;
  focus?: "quality" | "length" | "format";
}

export interface ConvertRequest {
  promptText: string;
  fromPlatform: string;
  toPlatform: string;
  family: Family;
}

export interface ExplainRequest {
  promptText: string;
  platform?: string;
  family?: Family;
}

// ─── Engine Results ───────────────────────────────────────────────────────────

export interface BuildResult {
  prompt: string;
  platform: string;
  family: Family;
  score: PromptScore | null;
  runId: string | null;
  tokensUsed: number;
}

export interface ImproverChange {
  label: string;
  applied: boolean;
}

export interface ImproveResult {
  improved: string;
  changes: ImproverChange[];
  platform: string;
  family: Family;
  scoreBefore: PromptScore | null;
  scoreAfter: PromptScore | null;
  delta: number | null;
  tokensUsed: number;
  // Rule engine's detected/used subject category (image family only).
  category?: string | null;
}

export interface AnalysisSuggestion {
  dimension: string;
  severity: "critical" | "warning" | "info";
  message: string;
  example?: string;
}

export interface AnalyzeResult {
  score: PromptScore;
  missingComponents: ComponentKey[];
  presentComponents: ComponentKey[];
  suggestions: AnalysisSuggestion[];
  wordCount: number;
  detectedFamily: Family;
  detectedPlatform: string | null;
  tokensUsed: number;
}

export interface ConvertResult {
  converted: string;
  changesSummary: string[];
  score: PromptScore | null;
  tokensUsed: number;
}

export interface ExplainResult {
  summary: string;
  components: Array<{
    key: ComponentKey;
    text: string;
    purpose: string;
    effectiveness: "high" | "medium" | "low";
  }>;
  strengths: string[];
  techniques: string[];
  tokensUsed: number;
}

// ─── Pipeline ─────────────────────────────────────────────────────────────────

export interface ParsedIntent {
  subject: string;
  action: string | null;
  setting: string | null;
  mood: string | null;
  style: string | null;
  constraints: string[];
  suggestedTier: string | null;
}

export interface StructuredRequirements {
  role: string | null;
  objective: string;
  context: string | null;
  constraints: string[];
  style: string | null;
  outputFormat: string | null;
  technical: string | null;
  negative: string | null;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  wordCount: number;
  inBudget: boolean;
}

export interface PipelineContext {
  request: BuildRequest;
  userId: string | null;
  runId: string;
  startedAt: Date;
  intent: ParsedIntent | null;
  detectedFamily: Family | null;
  detectedCategory: string | null;
  platform: PlatformConfig | null;
  requirements: StructuredRequirements | null;
  componentPlan: ComponentKey[];
  components: Map<ComponentKey, PromptComponent>;
  assembledPrompt: string | null;
  validationResult: ValidationResult | null;
  score: PromptScore | null;
  tokensUsed: number;
  stageTimings: Record<string, number>;
  errors: string[];
}

export interface PipelineStage {
  name: string;
  execute(ctx: PipelineContext): Promise<PipelineContext>;
}

// ─── Streaming ────────────────────────────────────────────────────────────────

export type StreamEvent =
  | { type: "stage"; stage: string; label: string }
  | { type: "chunk"; text: string }
  | { type: "score"; score: PromptScore }
  | { type: "done"; runId: string | null; tokensUsed: number }
  | { type: "error"; message: string };
