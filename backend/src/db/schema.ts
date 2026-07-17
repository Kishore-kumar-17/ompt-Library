import {
  pgTable,
  text,
  varchar,
  integer,
  boolean,
  timestamp,
  pgEnum,
  primaryKey,
  index,
  uniqueIndex,
  jsonb,
  decimal,
  serial,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// ─── Enums ────────────────────────────────────────────────────────────────────

export const familyEnum = pgEnum("family", ["image", "video", "text", "content", "website"]);
export const promptStatusEnum = pgEnum("prompt_status", ["draft", "pending", "approved", "rejected"]);
export const subscriptionStatusEnum = pgEnum("subscription_status", ["active", "cancelled", "past_due", "trialing"]);
export const importStatusEnum = pgEnum("import_status", ["pending", "processing", "completed", "failed"]);
export const notificationTypeEnum = pgEnum("notification_type", [
  "prompt_approved", "prompt_rejected", "review_received", "new_follower", "system",
]);

// ─── Users ────────────────────────────────────────────────────────────────────

export const users = pgTable("users", {
  id: varchar("id", { length: 21 }).primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash"),
  displayName: varchar("display_name", { length: 100 }),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  isAdmin: boolean("is_admin").notNull().default(false),
  emailVerified: boolean("email_verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// ─── Categories ───────────────────────────────────────────────────────────────

export const categories = pgTable("categories", {
  id: varchar("id", { length: 50 }).primaryKey(),
  family: familyEnum("family").notNull(),
  label: varchar("label", { length: 100 }).notNull(),
  icon: varchar("icon", { length: 50 }),
  slug: varchar("slug", { length: 100 }).notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
}, (t) => ({
  slugIdx: uniqueIndex("categories_slug_idx").on(t.slug),
  familyIdx: index("categories_family_idx").on(t.family),
}));

// ─── Platforms ────────────────────────────────────────────────────────────────

export const platforms = pgTable("platforms", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  logoUrl: text("logo_url"),
  color: varchar("color", { length: 7 }),
  isActive: boolean("is_active").notNull().default(true),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Prompts ──────────────────────────────────────────────────────────────────

export const prompts = pgTable("prompts", {
  id: varchar("id", { length: 21 }).primaryKey(),
  authorId: varchar("author_id", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  categoryId: varchar("category_id", { length: 50 }).references(() => categories.id, { onDelete: "set null" }),
  family: familyEnum("family").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  description: text("description"),
  basePrompt: text("base_prompt").notNull(),
  qualityScore: integer("quality_score").default(0),
  testedOn: text("tested_on").array().notNull().default(sql`'{}'::text[]`),
  isFeatured: boolean("is_featured").notNull().default(false),
  status: promptStatusEnum("status").notNull().default("pending"),
  copyCount: integer("copy_count").notNull().default(0),
  viewCount: integer("view_count").notNull().default(0),
  saveCount: integer("save_count").notNull().default(0),
  searchVector: text("search_vector").generatedAlwaysAs(
    sql`to_tsvector('english', coalesce(title,'') || ' ' || coalesce(description,'') || ' ' || coalesce(base_prompt,''))`
  ),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}, (t) => ({
  statusIdx: index("prompts_status_idx").on(t.status),
  familyIdx: index("prompts_family_idx").on(t.family),
  authorIdx: index("prompts_author_idx").on(t.authorId),
  searchIdx: index("prompts_search_idx").using("gin", sql`to_tsvector('english', coalesce(${t.title},'') || ' ' || coalesce(${t.description},'') || ' ' || coalesce(${t.basePrompt},''))`),
}));

// ─── Prompt Platform Versions ─────────────────────────────────────────────────

export const promptPlatforms = pgTable("prompt_platforms", {
  id: serial("id").primaryKey(),
  promptId: varchar("prompt_id", { length: 21 }).notNull().references(() => prompts.id, { onDelete: "cascade" }),
  platformId: varchar("platform_id", { length: 50 }).notNull().references(() => platforms.id),
  promptText: text("prompt_text").notNull(),
  qualityScore: integer("quality_score"),
  exampleOutput: text("example_output"),
  isTested: boolean("is_tested").notNull().default(false),
}, (t) => ({
  uniquePair: uniqueIndex("prompt_platforms_unique").on(t.promptId, t.platformId),
}));

// ─── Prompt Variables ─────────────────────────────────────────────────────────

export const promptVariables = pgTable("prompt_variables", {
  id: serial("id").primaryKey(),
  promptId: varchar("prompt_id", { length: 21 }).notNull().references(() => prompts.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 100 }).notNull(),
  placeholder: varchar("placeholder", { length: 200 }),
  defaultValue: varchar("default_value", { length: 500 }),
  isRequired: boolean("is_required").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
});

// ─── Prompt Tags ──────────────────────────────────────────────────────────────

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 50 }).notNull().unique(),
});

export const promptTags = pgTable("prompt_tags", {
  promptId: varchar("prompt_id", { length: 21 }).notNull().references(() => prompts.id, { onDelete: "cascade" }),
  tagId: integer("tag_id").notNull().references(() => tags.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: primaryKey({ columns: [t.promptId, t.tagId] }),
}));

// ─── Reviews ──────────────────────────────────────────────────────────────────

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  promptId: varchar("prompt_id", { length: 21 }).notNull().references(() => prompts.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 21 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  rating: integer("rating").notNull(),
  body: text("body"),
  helpfulCount: integer("helpful_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  uniqueReview: uniqueIndex("reviews_unique_user_prompt").on(t.userId, t.promptId),
  promptIdx: index("reviews_prompt_idx").on(t.promptId),
}));

export const helpfulVotes = pgTable("helpful_votes", {
  reviewId: integer("review_id").notNull().references(() => reviews.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 21 }).notNull().references(() => users.id, { onDelete: "cascade" }),
}, (t) => ({
  pk: primaryKey({ columns: [t.reviewId, t.userId] }),
}));

// ─── Saves & Copies ───────────────────────────────────────────────────────────

export const savedPrompts = pgTable("saved_prompts", {
  userId: varchar("user_id", { length: 21 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  promptId: varchar("prompt_id", { length: 21 }).notNull().references(() => prompts.id, { onDelete: "cascade" }),
  savedAt: timestamp("saved_at").notNull().defaultNow(),
}, (t) => ({
  pk: primaryKey({ columns: [t.userId, t.promptId] }),
  userIdx: index("saved_prompts_user_idx").on(t.userId),
}));

export const copyEvents = pgTable("copy_events", {
  id: serial("id").primaryKey(),
  promptId: varchar("prompt_id", { length: 21 }).notNull().references(() => prompts.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  platformId: varchar("platform_id", { length: 50 }),
  copiedAt: timestamp("copied_at").notNull().defaultNow(),
}, (t) => ({
  promptIdx: index("copy_events_prompt_idx").on(t.promptId),
  userIdx: index("copy_events_user_idx").on(t.userId),
}));

export const viewEvents = pgTable("view_events", {
  id: serial("id").primaryKey(),
  promptId: varchar("prompt_id", { length: 21 }).notNull().references(() => prompts.id, { onDelete: "cascade" }),
  userId: varchar("user_id", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  viewedAt: timestamp("viewed_at").notNull().defaultNow(),
}, (t) => ({
  promptIdx: index("view_events_prompt_idx").on(t.promptId),
  userIdx: index("view_events_user_idx").on(t.userId),
}));

// ─── Submissions ──────────────────────────────────────────────────────────────

export const submissions = pgTable("submissions", {
  id: varchar("id", { length: 21 }).primaryKey(),
  submitterId: varchar("submitter_id", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  promptId: varchar("prompt_id", { length: 21 }).references(() => prompts.id, { onDelete: "set null" }),
  categoryId: varchar("category_id", { length: 50 }).references(() => categories.id, { onDelete: "set null" }),
  platformIds: text("platform_ids").array().notNull().default(sql`'{}'::text[]`),
  rawData: jsonb("raw_data"),
  status: promptStatusEnum("status").notNull().default("pending"),
  reviewNote: text("review_note"),
  reviewedBy: varchar("reviewed_by", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  reviewedAt: timestamp("reviewed_at"),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
}, (t) => ({
  submitterIdx: index("submissions_submitter_idx").on(t.submitterId),
  statusIdx: index("submissions_status_idx").on(t.status),
}));

// ─── Builder / Improver Output ────────────────────────────────────────────────

export const builtPrompts = pgTable("built_prompts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  categoryId: varchar("category_id", { length: 50 }),
  platformId: varchar("platform_id", { length: 50 }),
  fieldValues: jsonb("field_values").notNull(),
  generatedPrompt: text("generated_prompt").notNull(),
  savedAsPromptId: varchar("saved_as_prompt_id", { length: 21 }).references(() => prompts.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // Engine additions
  qualityScore: integer("quality_score"),
  scoreGrade: varchar("score_grade", { length: 20 }),
  tokensUsed: integer("tokens_used"),
  durationMs: integer("duration_ms"),
  runId: varchar("run_id", { length: 21 }),
});

export const improvedPrompts = pgTable("improved_prompts", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  originalText: text("original_text").notNull(),
  improvedText: text("improved_text").notNull(),
  platformId: varchar("platform_id", { length: 50 }),
  changesSummary: jsonb("changes_summary"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // Engine additions
  scoreBefore: integer("score_before"),
  scoreAfter: integer("score_after"),
  scoreDelta: integer("score_delta"),
  tokensUsed: integer("tokens_used"),
});

// ─── Bulk Import ──────────────────────────────────────────────────────────────

export const bulkImports = pgTable("bulk_imports", {
  id: varchar("id", { length: 21 }).primaryKey(),
  adminId: varchar("admin_id", { length: 21 }).notNull().references(() => users.id),
  filename: varchar("filename", { length: 255 }),
  rowCount: integer("row_count"),
  importedCount: integer("imported_count"),
  errorCount: integer("error_count"),
  columnMap: jsonb("column_map"),
  errors: jsonb("errors"),
  status: importStatusEnum("status").notNull().default("pending"),
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
});

// ─── Pricing ──────────────────────────────────────────────────────────────────

export const pricingPlans = pgTable("pricing_plans", {
  id: varchar("id", { length: 50 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  priceMonthly: decimal("price_monthly", { precision: 10, scale: 2 }).notNull(),
  priceYearly: decimal("price_yearly", { precision: 10, scale: 2 }),
  features: jsonb("features").notNull().default(sql`'[]'::jsonb`),
  promptLimit: integer("prompt_limit"),
  isActive: boolean("is_active").notNull().default(true),
  stripePriceIdMonthly: varchar("stripe_price_id_monthly", { length: 100 }),
  stripePriceIdYearly: varchar("stripe_price_id_yearly", { length: 100 }),
});

export const userSubscriptions = pgTable("user_subscriptions", {
  id: varchar("id", { length: 21 }).primaryKey(),
  userId: varchar("user_id", { length: 21 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  planId: varchar("plan_id", { length: 50 }).notNull().references(() => pricingPlans.id),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 100 }),
  stripeCustomerId: varchar("stripe_customer_id", { length: 100 }),
  status: subscriptionStatusEnum("status").notNull().default("active"),
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  userIdx: uniqueIndex("user_subscriptions_user_idx").on(t.userId),
}));

// ─── Notifications ────────────────────────────────────────────────────────────

export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 21 }).notNull().references(() => users.id, { onDelete: "cascade" }),
  type: notificationTypeEnum("type").notNull(),
  title: varchar("title", { length: 200 }).notNull(),
  body: text("body"),
  isRead: boolean("is_read").notNull().default(false),
  metadata: jsonb("metadata"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  userIdx: index("notifications_user_idx").on(t.userId),
  readIdx: index("notifications_read_idx").on(t.isRead),
}));

// ─── Engine Run Audit Log ─────────────────────────────────────────────────────

export const engineRunTypeEnum = pgEnum("engine_run_type", [
  "build", "improve", "analyze", "optimize", "convert", "explain",
]);

export const engineRuns = pgTable("engine_runs", {
  id: varchar("id", { length: 21 }).primaryKey(),
  userId: varchar("user_id", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  type: engineRunTypeEnum("type").notNull(),
  platform: varchar("platform", { length: 50 }),
  family: familyEnum("family"),
  inputTokens: integer("input_tokens").notNull().default(0),
  outputTokens: integer("output_tokens").notNull().default(0),
  durationMs: integer("duration_ms"),
  success: boolean("success").notNull().default(true),
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  userIdx: index("engine_runs_user_idx").on(t.userId),
  typeIdx: index("engine_runs_type_idx").on(t.type),
  createdIdx: index("engine_runs_created_idx").on(t.createdAt),
}));

// ─── Prompt Versions ──────────────────────────────────────────────────────────

export const promptVersions = pgTable("prompt_versions", {
  id: serial("id").primaryKey(),
  promptId: varchar("prompt_id", { length: 21 }).notNull().references(() => prompts.id, { onDelete: "cascade" }),
  versionNumber: integer("version_number").notNull(),
  promptText: text("prompt_text").notNull(),
  changeReason: text("change_reason"),
  score: integer("score"),
  createdBy: varchar("created_by", { length: 21 }).references(() => users.id, { onDelete: "set null" }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
}, (t) => ({
  promptIdx: index("prompt_versions_prompt_idx").on(t.promptId),
  uniqueVersion: uniqueIndex("prompt_versions_unique").on(t.promptId, t.versionNumber),
}));
