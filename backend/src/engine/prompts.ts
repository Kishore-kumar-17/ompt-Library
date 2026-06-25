import { resolveCategoryId } from "./categories.js";
import type { CategoryId, PlatformId, PromptRecord } from "./types.js";

export interface PromptIndex {
  all: PromptRecord[];
  byId: Map<string, PromptRecord>;
  bySlug: Map<string, PromptRecord>;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

export function normalizePromptRecord(raw: unknown): PromptRecord | null {
  if (!isRecord(raw)) return null;

  const id = typeof raw.id === "string" ? raw.id : null;
  const title = typeof raw.title === "string" ? raw.title : null;
  const category = typeof raw.category === "string" ? raw.category : null;
  const platforms = isRecord(raw.platforms) ? raw.platforms : {};

  if (!id || !title || !category) return null;

  return {
    id,
    slug: typeof raw.slug === "string" ? raw.slug : undefined,
    title,
    description: typeof raw.description === "string" ? raw.description : undefined,
    basePrompt: typeof raw.basePrompt === "string" ? raw.basePrompt : undefined,
    category,
    subCategory: typeof raw.subCategory === "string"
      ? raw.subCategory
      : typeof raw.subcategory === "string"
      ? raw.subcategory
      : undefined,
    family: raw.family === "image" || raw.family === "video" || raw.family === "text" || raw.family === "content" || raw.family === "website"
      ? raw.family
      : undefined,
    tags: normalizeStringArray(raw.tags),
    tested: typeof raw.tested === "boolean" ? raw.tested : undefined,
    rating: typeof raw.rating === "number" ? raw.rating : undefined,
    reviews: typeof raw.reviews === "number" ? raw.reviews : undefined,
    image: typeof raw.image === "string" ? raw.image : undefined,
    author: typeof raw.author === "string" ? raw.author : undefined,
    variables: Array.isArray(raw.variables)
      ? raw.variables
          .filter(isRecord)
          .map((variable) => ({
            name: typeof variable.name === "string" ? variable.name : "",
            placeholder: typeof variable.placeholder === "string" ? variable.placeholder : undefined,
          }))
          .filter((variable) => variable.name.length > 0)
      : [],
    platforms: Object.fromEntries(
      Object.entries(platforms).filter((entry): entry is [string, string] => typeof entry[1] === "string")
    ),
    metadata: isRecord(raw.metadata) ? raw.metadata : undefined,
  };
}

export function normalizePromptRecords(rawRecords: unknown[]): PromptRecord[] {
  return rawRecords
    .map(normalizePromptRecord)
    .filter((record): record is PromptRecord => record !== null);
}

export function buildPromptIndex(records: PromptRecord[]): PromptIndex {
  return {
    all: records,
    byId: new Map(records.map((record) => [record.id, record])),
    bySlug: new Map(records.filter((record) => record.slug).map((record) => [record.slug!, record])),
  };
}

export function getPromptById(index: PromptIndex, id: string): PromptRecord | null {
  return index.byId.get(id) ?? null;
}

export function getPromptBySlug(index: PromptIndex, slug: string): PromptRecord | null {
  return index.bySlug.get(slug) ?? null;
}

export function getPlatformPrompt(prompt: PromptRecord, platformId: PlatformId): string | null {
  const value = prompt.platforms[platformId];
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export function getPromptCategoryId(prompt: PromptRecord): CategoryId | null {
  return resolveCategoryId(prompt.category);
}

function tokenize(value: string): string[] {
  return value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

export function searchPrompts(records: PromptRecord[], query: string, limit = 10): PromptRecord[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const scored = records
    .map((record) => {
      const title = record.title.toLowerCase();
      const description = (record.description ?? "").toLowerCase();
      const tags = (record.tags ?? []).join(" ").toLowerCase();
      const haystack = `${title} ${description} ${tags}`;

      let score = 0;
      for (const token of queryTokens) {
        if (title.includes(token)) score += 5;
        if (description.includes(token)) score += 2;
        if (tags.includes(token)) score += 2;
        if (haystack.includes(token)) score += 1;
      }

      return { record, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.record.title.localeCompare(b.record.title));

  return scored.slice(0, limit).map((item) => item.record);
}
