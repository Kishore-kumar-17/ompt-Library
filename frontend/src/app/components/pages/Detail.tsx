import { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Heart, Copy, Star, CheckCircle2, Share2, BookmarkPlus,
  MessageSquare, ThumbsUp, Loader2,
} from "lucide-react";
import { platforms, videoPlatforms, type PromptItem } from "../theme";
import { authStore, libraryApi, type LibraryPrompt } from "../../lib/api";
import { promptImageMap } from "../../lib/prompt-images";
import { imageLibraryPrompts } from "../../lib/library-data";
import { videoLibraryPrompts } from "../../lib/video-data";
import { videoPlatformVersions } from "../../lib/video-platforms";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { PromptCard } from "../PromptCard";

const SAMPLE_REVIEWS = [
  { name: "Arjun S.",   initials: "AS", color: "#094067", stars: 5, helpful: 34, body: "Produced exactly what I needed — sharp, editorial output on the first try. Saved me 20 minutes of prompt tweaking." },
  { name: "Priya M.",  initials: "PM", color: "#ef4565", stars: 5, helpful: 21, body: "Love how the variables work. Dropped in my project details and got a production-ready prompt immediately." },
  { name: "Thomas W.", initials: "TW", color: "#ffd803", stars: 4, helpful: 17, body: "Works great on ChatGPT and Gemini. Midjourney output needed a small tweak for my style, but overall solid." },
];

// ─── Normalise API prompt to a PromptItem-like shape ─────────────────────────

function fromApi(p: LibraryPrompt & { platforms?: Record<string, string>; image_url?: string }): PromptItem {
  return {
    id:          String(p.id),
    slug:        p.slug,
    title:       p.title,
    description: p.base_prompt,
    category:    p.category,
    subCategory: p.sub_category ?? "",
    family:      "image" as const,
    tags:        p.tags ?? [],
    tested:      p.tested,
    rating:      p.quality_score ?? 5,
    reviews:     0,
    image:       p.image_url ?? promptImageMap[p.slug] ?? "",
    author:      "PromptVault",
    variables:   [],
    platforms:   p.platforms ?? {},
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Detail({ id, go, defaultPlatform }: { id: string; go: (p: string) => void; defaultPlatform?: string | null }) {
  // Check local static data first — image then video
  const staticPrompt =
    imageLibraryPrompts.find(x => x.id === id) ??
    videoLibraryPrompts.find(x => x.id === id) ??
    null;

  const [prompt, setPrompt]       = useState<PromptItem | null>(staticPrompt);
  const [fetchState, setFetch]    = useState<"idle" | "loading" | "error">(
    staticPrompt ? "idle" : "loading"
  );
  // Lazily-loaded platform versions from library-platforms.ts
  const [platformData, setPlatformData] = useState<Record<string, string> | null>(null);

  const isVideoPrompt = staticPrompt?.family === "video";
  const [platform, setPlatform] = useState(defaultPlatform ?? (isVideoPrompt ? "veo" : "chatgpt"));
  const [vars, setVars]         = useState<Record<string, string>>({});
  const [saved, setSaved]       = useState(false);
  const [saving, setSaving]     = useState(false);

  // For static prompts: load platform versions from correct source
  useEffect(() => {
    if (!staticPrompt?.slug) return;
    if (Object.keys(staticPrompt.platforms ?? {}).length > 0) return;
    if (isVideoPrompt) {
      const versions = videoPlatformVersions[staticPrompt.slug];
      if (versions) setPlatformData(versions);
    } else {
      import("../../lib/library-platforms").then(m => {
        const versions = m.platformVersions[staticPrompt.slug!];
        if (versions) setPlatformData(versions);
      });
    }
  }, [staticPrompt, isVideoPrompt]);

  // Fetch from API when ID is numeric and not in static data
  useEffect(() => {
    if (staticPrompt) return;
    const numId = Number(id);
    if (isNaN(numId)) { setFetch("error"); return; }
    setFetch("loading");
    libraryApi.getById(numId)
      .then(data => { setPrompt(fromApi(data)); setFetch("idle"); })
      .catch(() => setFetch("error"));
  }, [id, staticPrompt]);

  const p = prompt;

  // Merge lazily-loaded platform data into the prompt's platforms map
  const resolvedPlatforms: Record<string, string> = {
    ...(p?.platforms ?? {}),
    ...(platformData ?? {}),
  };

  const rendered = useMemo(() => {
    if (!p) return "";
    // Use platform-specific text if available; fall back to base description
    const s0 = resolvedPlatforms[platform]
      ?? resolvedPlatforms["chatgpt"]
      ?? Object.values(resolvedPlatforms)[0]
      ?? p.description
      ?? "";
    let s = s0;
    (p.variables ?? []).forEach(v => { s = s.replaceAll(`[${v.name}]`, vars[v.name] || `[${v.name}]`); });
    return s;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [p, platform, vars, platformData]);

  // ── Loading state ──────────────────────────────────────────────────────
  if (fetchState === "loading") {
    return (
      <div className="flex items-center justify-center py-32 text-[#5f6c7b]">
        <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading prompt…
      </div>
    );
  }

  if (fetchState === "error" || !p) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-16 text-center">
        <p className="text-[#5f6c7b] mb-4">Prompt not found.</p>
        <button onClick={() => go("library")} className="text-[#094067] underline">← Back to library</button>
      </div>
    );
  }

  // Use resolvedPlatforms (merged static + lazy-loaded) for availability check
  const availablePlatforms = Object.keys(resolvedPlatforms).filter(k => {
    const v = resolvedPlatforms[k];
    return v && v !== "(not applicable)";
  });

  const activePlatformKey =
    availablePlatforms.includes(platform) ? platform : (availablePlatforms[0] ?? "chatgpt");

  const handleSave = async () => {
    if (!authStore.getUser()) { toast.error("Sign in to save prompts"); return; }
    setSaving(true);
    try {
      const res = await libraryApi.save(p.id);
      setSaved(res.saved);
      toast(res.saved ? "Saved to library" : "Removed from library", { description: p.title });
    } catch { toast.error("Could not save — is the backend running?"); }
    finally { setSaving(false); }
  };

  const handleCopyPrompt = async () => {
    navigator.clipboard?.writeText(rendered);
    toast.success("Prompt copied", { description: `${p.title} - ${activePlatformKey}` });
    if (!authStore.getUser()) return;
    try {
      await libraryApi.copy(p.id, activePlatformKey);
    } catch {
      // Clipboard copy should still succeed when activity tracking is unavailable.
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-[#094067]">
      <button onClick={() => go("library")} className="text-[#5f6c7b] hover:text-[#094067] mb-4">
        ← Back to library
      </button>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* ── Image / placeholder ──────────────────────────────────────── */}
        <div className="rounded-3xl overflow-hidden border border-[#094067]/20 aspect-[4/3] bg-[#094067]/5 flex items-center justify-center">
          {p.image ? (
            <ImageWithFallback src={p.image} alt={p.title} className="w-full h-full object-contain" />
          ) : isVideoPrompt ? (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{ background: "linear-gradient(135deg,#1a1a2e 0%,#4c1d95 100%)" }}>
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1" />
              </div>
              <span className="text-white/60 text-[13px] font-semibold uppercase tracking-widest">{p.subCategory}</span>
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#094067]/10 to-[#ffd803]/20 flex items-center justify-center">
              <span className="text-6xl opacity-20">✦</span>
            </div>
          )}
        </div>

        {/* ── Info panel ───────────────────────────────────────────────── */}
        <div>
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-[#094067]/5 border border-[#094067]/20 text-[#5f6c7b]" style={{ fontSize: "13px" }}>{p.category}</span>
            {p.subCategory && (
              <>
                <span className="text-[#5f6c7b]">·</span>
                <span className="text-[#5f6c7b]" style={{ fontSize: "13px" }}>{p.subCategory}</span>
              </>
            )}
            {p.tested && (
              <span className="ml-2 px-2 py-0.5 rounded-full bg-[#ffd803]/20 text-[#ef4565] inline-flex items-center gap-1 text-[12px]">
                <CheckCircle2 className="w-3 h-3" />tested
              </span>
            )}
          </div>

          <h1 className="text-[#094067] text-3xl mb-2">{p.title}</h1>
          <p className="text-[#5f6c7b] mb-4 line-clamp-3">{p.description}</p>

          <div className="flex items-center gap-4 mb-6 text-[#5f6c7b]">
            <span className="inline-flex items-center gap-1 text-[#094067]">
              <Star className="w-4 h-4 fill-[#ffd803] text-[#ef4565]" />
              {p.rating}
              {p.reviews > 0 && <span>({p.reviews})</span>}
            </span>
            <button
              onClick={handleSave}
              className={`inline-flex items-center gap-1 transition-colors ${saved ? "text-[#ef4565]" : "hover:text-[#ef4565]"}`}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Heart className={`w-4 h-4 ${saved ? "fill-[#ef4565]" : ""}`} />}
              {saved ? "Saved" : "Save"}
            </button>
            <button
              onClick={() => { navigator.clipboard?.writeText(window.location.href); toast("Link copied"); }}
              className="inline-flex items-center gap-1 hover:text-[#094067]"
            >
              <Share2 className="w-4 h-4" />Share
            </button>
          </div>

          {/* ── Platform selector ──────────────────────────────────────── */}
          <div className="flex flex-wrap gap-2 mb-4 items-center">
            {/* Show spinner while platform data is lazy-loading */}
            {!platformData && !Object.keys(p.platforms ?? {}).length && (
              <span className="text-[12px] text-[#5f6c7b] flex items-center gap-1 mr-1">
                <Loader2 className="w-3 h-3 animate-spin" /> loading versions…
              </span>
            )}
            {(isVideoPrompt ? videoPlatforms : platforms).map(pl => {
              const hasContent = availablePlatforms.includes(pl.key);
              return (
                <button
                  key={pl.key}
                  disabled={!hasContent}
                  onClick={() => { if (hasContent) setPlatform(pl.key); }}
                  className={`px-3 py-1.5 rounded-full border text-[13px] transition-colors ${
                    activePlatformKey === pl.key
                      ? "bg-[#094067]/10 border-[#094067]/40 text-[#094067]"
                      : hasContent
                        ? "border-[#094067]/20 text-[#5f6c7b] hover:text-[#094067]"
                        : "border-[#094067]/10 text-[#5f6c7b]/30 cursor-not-allowed"
                  }`}
                >
                  <span className="inline-block w-2 h-2 rounded-full mr-2" style={{ background: pl.color }} />
                  {pl.name}
                </button>
              );
            })}
          </div>

          {/* ── Live preview ──────────────────────────────────────────── */}
          <div className="relative bg-white border-2 border-[#094067] rounded-2xl p-4 mb-4 shadow-[6px_6px_0_0_#094067]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] text-[#5f6c7b] uppercase" style={{ fontWeight: 700, letterSpacing: "0.05em" }}>Live preview</span>
              {(p.variables ?? []).length > 0 && (
                <span className="text-[11px] text-[#094067] px-2 py-0.5 rounded-full bg-[#ffd803]">
                  {(p.variables ?? []).filter(v => vars[v.name]).length}/{(p.variables ?? []).length} filled
                </span>
              )}
            </div>
            <pre className="whitespace-pre-wrap text-[#094067] font-mono text-[13px] leading-relaxed max-h-64 overflow-y-auto">
              {highlight(rendered, (p.variables ?? []).map(v => v.name))}
            </pre>
          </div>

          {/* ── Variable inputs ─────────────────────────────────────────── */}
          {(p.variables ?? []).length > 0 && (
            <div className="mb-4 bg-gradient-to-br from-[#ffd803]/15 to-[#ef4565]/10 border border-[#094067]/20 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 text-[#094067]" style={{ fontWeight: 700 }}>
                <span className="w-5 h-5 rounded bg-[#ffd803] border border-[#094067] inline-flex items-center justify-center text-[11px]">▶</span>
                Try it — fill the variables
              </div>
              {(p.variables ?? []).map(v => (
                <div key={v.name}>
                  <label className="text-[12px] text-[#5f6c7b] mb-1 block" style={{ fontWeight: 600 }}>
                    <span className="font-mono text-[#094067] bg-[#ffd803]/60 px-1 rounded mr-1">[{v.name}]</span>
                  </label>
                  <input
                    placeholder={v.placeholder}
                    value={vars[v.name] || ""}
                    onChange={e => setVars({ ...vars, [v.name]: e.target.value })}
                    className="w-full h-10 px-3 rounded-lg bg-white border-2 border-[#094067]/20 text-[#094067] placeholder:text-[#5f6c7b] outline-none focus:border-[#ffd803]"
                  />
                </div>
              ))}
            </div>
          )}

          {/* ── Actions ──────────────────────────────────────────────────── */}
          <div className="flex gap-2">
            <button
              onClick={handleCopyPrompt}
              className="flex-1 h-11 rounded-full bg-[#ffd803] text-[#094067] inline-flex items-center justify-center gap-2"
              style={{ fontWeight: 700 }}
            >
              <Copy className="w-4 h-4" />Copy prompt
            </button>
            <button
              onClick={handleSave}
              className={`h-11 px-4 rounded-full border inline-flex items-center gap-2 transition-colors ${
                saved
                  ? "bg-[#ef4565]/10 border-[#ef4565]/30 text-[#ef4565]"
                  : "bg-[#094067]/5 border-[#094067]/20 text-[#094067] hover:bg-[#094067]/10"
              }`}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <BookmarkPlus className="w-4 h-4" />}
              {saved ? "Saved" : "Save"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Below fold ──────────────────────────────────────────────────── */}
      <section className="mt-16 grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-[#094067] mb-4 inline-flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-[#ef4565]" />Reviews
          </h2>
          {SAMPLE_REVIEWS.map((r, i) => (
            <div key={i} className="bg-white border border-[#094067]/15 rounded-2xl p-4 mb-3">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-[13px] font-bold text-white" style={{ background: r.color }}>{r.initials}</div>
                <div className="text-[#094067]" style={{ fontWeight: 600 }}>{r.name}</div>
                <div className="text-[#ffd803] text-[13px]">{"★".repeat(r.stars)}</div>
                <button className="ml-auto text-[#5f6c7b] hover:text-[#094067] inline-flex items-center gap-1 text-[13px]">
                  <ThumbsUp className="w-3 h-3" />Helpful ({r.helpful})
                </button>
              </div>
              <p className="text-[#5f6c7b]">{r.body}</p>
            </div>
          ))}
        </div>
        <div>
          {(p.tags ?? []).length > 0 && (
            <>
              <h2 className="text-[#094067] mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2 mb-8">
                {(p.tags ?? []).map(t => (
                  <span key={t} className="px-2 py-1 rounded-full bg-[#094067]/5 border border-[#094067]/20 text-[#5f6c7b] text-[13px]">#{t}</span>
                ))}
              </div>
            </>
          )}
          <h2 className="text-[#094067] mb-4">Author</h2>
          <div className="bg-white border border-[#094067]/15 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ffd803] to-[#ef4565]" />
            <div>
              <div className="text-[#094067]" style={{ fontWeight: 600 }}>{p.author}</div>
              <div className="text-[#5f6c7b]" style={{ fontSize: "13px" }}>Contributor</div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-[#094067] mb-4">Related prompts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(isVideoPrompt ? videoLibraryPrompts : imageLibraryPrompts)
            .filter(x => x.category === p.category && x.id !== p.id)
            .slice(0, 4)
            .map(x => (
              <PromptCard key={x.id} p={x} onClick={() => go("detail:" + x.id)} />
            ))}
        </div>
      </section>
    </div>
  );
}

function highlight(text: string, varNames: string[]) {
  if (!text) return text;
  const parts: (string | JSX.Element)[] = [];
  const regex = /\[([^\]]+)\]/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let i = 0;
  while ((m = regex.exec(text)) !== null) {
    const before = text.slice(last, m.index);
    if (before) parts.push(before);
    const isUnfilled = varNames.includes(m[1]);
    parts.push(
      <span
        key={`v-${i++}`}
        className={isUnfilled ? "bg-[#ffd803] px-1 rounded" : "bg-[#90b4ce]/30 px-1 rounded"}
      >
        {m[0]}
      </span>
    );
    last = regex.lastIndex;
  }
  const rest = text.slice(last);
  if (rest) parts.push(rest);
  return parts;
}
