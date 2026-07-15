const envApiUrl = (import.meta as any).env?.VITE_API_URL as string | undefined;
if ((import.meta as any).env?.PROD && !envApiUrl) {
  // A build without VITE_API_URL set has actually shipped talking to
  // localhost in production — this is loud on purpose.
  console.error("[api] VITE_API_URL is not set for this production build — every API call will target localhost and fail. Set VITE_API_URL in the deployment environment and rebuild.");
}
const API_BASE = envApiUrl ?? "http://localhost:3000";

// ─── Token helpers ────────────────────────────────────────────────────────────

export const token = {
  get: (): string | null => localStorage.getItem("pv_token"),
  set: (t: string) => localStorage.setItem("pv_token", t),
  clear: () => localStorage.removeItem("pv_token"),
};

export const AUTH_CHANGED_EVENT = "pv-auth-changed";

export const authStore = {
  getUser: (): AuthUser | null => {
    try {
      const raw = localStorage.getItem("pv_user");
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object" || typeof parsed.id !== "string" || typeof parsed.email !== "string") {
        return null;
      }
      return parsed as AuthUser;
    } catch {
      return null;
    }
  },
  setUser: (u: AuthUser) => {
    localStorage.setItem("pv_user", JSON.stringify(u));
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  },
  clear: () => {
    token.clear();
    localStorage.removeItem("pv_user");
    window.dispatchEvent(new Event(AUTH_CHANGED_EVENT));
  },
};

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string;
  displayName: string | null;
  avatarUrl: string | null;
  isAdmin: boolean;
}

export interface ProfileStats {
  saved: number;
  copied: number;
  submitted: number;
  approved: number;
}

export interface SubmitPayload {
  title: string;
  description?: string;
  family: string;
  categoryId?: string;
  basePrompt: string;
  platformIds: string[];
  variables?: { name: string; placeholder?: string }[];
  exampleOutput?: string;
}

export interface Submission {
  id: string;
  promptId: string | null;
  rawData: SubmitPayload | Record<string, unknown> | null;
  status: "draft" | "pending" | "approved" | "rejected";
  reviewNote: string | null;
  submittedAt: string;
}

// ─── Core fetch ───────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const t = token.get();
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(t ? { Authorization: `Bearer ${t}` } : {}),
        ...(options?.headers ?? {}),
      },
    });
  } catch {
    // fetch() itself throws on network failure (offline, DNS, CORS-blocked) —
    // normalize to the same Error shape as an HTTP-level failure instead of
    // letting a raw TypeError escape.
    throw new Error("Network error — check your connection and try again.");
  }

  if (res.status === 401 && t) {
    // Only a previously-authenticated request that got rejected counts as a
    // stale/expired session — clear it so the UI stops rendering "signed in"
    // against a token the server no longer accepts.
    authStore.clear();
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Request failed" }));
    throw new Error((err as any).error ?? "Request failed");
  }

  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

export const authApi = {
  login: async (email: string, password: string) => {
    const data = await apiFetch<{ user: AuthUser; token: string }>("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    token.set(data.token);
    authStore.setUser(data.user);
    return data;
  },

  register: async (email: string, password: string, displayName: string) => {
    const data = await apiFetch<{ user: AuthUser; token: string }>("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, displayName }),
    });
    token.set(data.token);
    authStore.setUser(data.user);
    return data;
  },

  logout: () => authStore.clear(),
};

// ─── Prompts ──────────────────────────────────────────────────────────────────

export const promptsApi = {
  copy: (id: string, platformId?: string) =>
    apiFetch<{ success: boolean }>(`/api/prompts/${id}/copy`, {
      method: "POST",
      body: JSON.stringify({ platformId }),
    }),

  save: (id: string) =>
    apiFetch<{ saved: boolean }>(`/api/prompts/${id}/save`, { method: "POST" }),
};

// ─── Submissions ──────────────────────────────────────────────────────────────

export const submissionsApi = {
  submit: (payload: SubmitPayload) =>
    apiFetch<{ id: string; status: string }>("/api/submissions", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  mine: () => apiFetch<Submission[]>("/api/submissions/mine"),
};

// ─── Profile ──────────────────────────────────────────────────────────────────

export const profileApi = {
  stats: () => apiFetch<ProfileStats>("/api/profile/stats"),
};

// ─── Library ──────────────────────────────────────────────────────────────────

export interface LibraryPrompt {
  id: number;
  slug: string;
  title: string;
  base_prompt: string;
  category: string;
  sub_category: string;
  prompt_type: string;
  tags: string[];
  quality_score: number;
  tested: boolean;
  image_url: string;
  created_at: string;
}

export interface LibraryPage {
  data: LibraryPrompt[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface LibrarySearchPage extends LibraryPage {
  query: string;
  mode: "fulltext" | "fuzzy" | "none";
}

export const libraryApi = {
  categories: () =>
    apiFetch<{ category: string; count: number }[]>("/api/library/categories"),

  tags: (limit = 30) =>
    apiFetch<{ tag: string; count: number }[]>(`/api/library/tags?limit=${limit}`),

  list: (params: { category?: string; tags?: string; page?: number; limit?: number }) => {
    const qs = new URLSearchParams();
    if (params.category) qs.set("category", params.category);
    if (params.tags) qs.set("tags", params.tags);
    if (params.page) qs.set("page", String(params.page));
    if (params.limit) qs.set("limit", String(params.limit));
    return apiFetch<LibraryPage>(`/api/library/prompts?${qs}`);
  },

  search: (params: { q: string; mode?: "fulltext" | "fuzzy" | "both"; category?: string; tags?: string; page?: number; limit?: number }) => {
    const qs = new URLSearchParams();
    qs.set("q", params.q);
    if (params.mode) qs.set("mode", params.mode);
    if (params.category) qs.set("category", params.category);
    if (params.tags) qs.set("tags", params.tags);
    if (params.page) qs.set("page", String(params.page));
    if (params.limit) qs.set("limit", String(params.limit));
    return apiFetch<LibrarySearchPage>(`/api/library/prompts/search?${qs}`);
  },

  getById: (id: number) =>
    apiFetch<LibraryPrompt & { platforms: Record<string, string> }>(`/api/library/prompts/${id}`),

  copy: (id: number | string, platformId?: string) =>
    apiFetch<{ success: boolean }>(`/api/library/prompts/${id}/copy`, {
      method: "POST",
      body: JSON.stringify({ platformId }),
    }),

  save: (id: number | string) =>
    apiFetch<{ saved: boolean }>(`/api/library/prompts/${id}/save`, { method: "POST" }),

  // IDs of prompts the current user has already saved — fetch once and use
  // to hydrate each card's initial saved state instead of always starting
  // from false (which previously meant re-clicking "Save" on an
  // already-saved prompt would silently un-save it).
  savedIds: () => apiFetch<{ ids: number[] }>("/api/library/saved"),
};

// ─── Engine lock layer (shared by Builder + Improver) ────────────────────────

export interface LockSectionItem {
  key: string;
  label: string;
  value: string;
  required: boolean;
}

export interface EngineValidation {
  valid: boolean;
  warnings: string[];
  missingRequiredFields: string[];
}

export type VariableType = "text" | "color" | "image" | "select";

export interface VariableField {
  name: string;
  label: string;
  type: VariableType;
  placeholder?: string;
  options?: string[];
  // Original phrase this token replaced — pre-fills the input so the prompt reads
  // complete out-of-the-box (the "Variable Brief" default).
  default?: string;
}

export interface EngineLockFields {
  categoryId: string | null;
  categoryLabel: string | null;
  lockSection: LockSectionItem[];
  negativeLocks: string[];
  // Variable layer: `[TOKEN]` placeholders the user can fill to personalize the
  // descriptive prompt (locks stay invariant). Empty when none.
  variables: VariableField[];
  validation: EngineValidation | null;
  // Full canonical output: descriptive prompt + LOCK LAYER + NEGATIVE LOCKS.
  // Falls back to the plain prompt for non-image families.
  finalAssembledText: string;
}

// ─── Builder ─────────────────────────────────────────────────────────────────

export interface BuilderResult extends EngineLockFields {
  prompt: string;
  platform: string;
  family: string;
  tokensUsed: number;
}

export const builderApi = {
  generate: (payload: {
    idea: string;
    family: string;
    platform: string;
    style?: string;
    mood?: string;
    aspect?: string;
    category?: string;
    subCategory?: string;
    audience?: string;
    palette?: string;
    pages?: string[];
    duration?: string;
    cameraMovement?: string;
    pacing?: string;
    soundDesign?: string;
  }) =>
    apiFetch<BuilderResult>("/api/builder/generate", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

// ─── Improver ────────────────────────────────────────────────────────────────

export interface ImproverChange {
  label: string;
  applied: boolean;
}

export interface ImproverResult extends EngineLockFields {
  improved: string;
  changes: ImproverChange[];
  platform: string;
  family: string;
  tokensUsed: number;
}

export const improverApi = {
  improve: (payload: { prompt: string; platform: string; family?: string; category?: string }) =>
    apiFetch<ImproverResult>("/api/improver/improve", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};

// ─── Variable layer — Regenerate with my values (Option B) ───────────────────

export interface ExpandResult extends EngineLockFields {
  prompt: string;
  platform: string;
  family: string;
  tokensUsed: number;
}

export const variablesApi = {
  expand: (payload: { category: string; platform: string; brief: Record<string, string>; title?: string }) =>
    apiFetch<ExpandResult>("/api/variables/expand", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
