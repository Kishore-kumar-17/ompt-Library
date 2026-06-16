import { useMemo, useState, useEffect } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import {
  Heart, Copy, Star, Share2, BookmarkPlus,
  MessageSquare, ThumbsUp, Loader2, Lock, ExternalLink, ArrowLeft,
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
    author:      "Prompt Bot",
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
        <button onClick={() => go("library")} className="inline-flex items-center gap-1.5 text-[#094067] hover:text-[#094067]/80 text-[13px] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
        </button>
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
    try {
      await navigator.clipboard.writeText(rendered);
      toast.success("Prompt copied", { description: `${p.title} - ${activePlatformKey}` });
    } catch {
      toast.error("Failed to copy to clipboard");
      return;
    }
    if (!authStore.getUser()) return;
    try {
      await libraryApi.copy(p.id, activePlatformKey);
    } catch {
      // Activity tracking failure is non-critical
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-[#094067]">
      <button onClick={() => go("library")} className="inline-flex items-center gap-1.5 text-[#5f6c7b] hover:text-[#094067] text-[13px] mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
      </button>

      <div className="grid lg:grid-cols-[1fr_420px] gap-8">
        {/* ── Left: Image + Build Guide (scrollable) ──────────────────── */}
        <div>
          {/* Image / placeholder */}
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

          {/* Tags */}
          {(p.tags ?? []).length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 mb-4">
              {(p.tags ?? []).map(t => (
                <span key={t} className="px-2 py-1 rounded-full bg-[#094067]/5 border border-[#094067]/20 text-[#5f6c7b] text-[12px]">#{t}</span>
              ))}
            </div>
          )}

          {/* Build Guide */}
          <div className="mt-6 rounded-2xl overflow-hidden border border-[#094067]/15">
            <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#094067]/5 to-[#ffd803]/10 border-b border-[#094067]/10">
              <span className="w-8 h-8 rounded-full bg-[#ffd803] border-2 border-[#094067] flex items-center justify-center text-lg shrink-0">
                {isVideoPrompt ? "🎬" : "🎨"}
              </span>
              <div>
                <div className="text-[#094067] font-bold text-[15px]">
                  {isVideoPrompt
                    ? "How to Create This — From Prompt to Video"
                    : "How to Create This — From Prompt to Image"}
                </div>
                <div className="text-[#5f6c7b] text-[12px]">
                  8 steps · Beginner friendly · Prompt to output
                </div>
              </div>
            </div>
            {isVideoPrompt
              ? <VideoBuildGuide promptText={rendered} platformName={activePlatformKey} />
              : <ImageBuildGuide promptText={rendered} platformName={activePlatformKey} />
            }
          </div>
        </div>

        {/* ── Right: Prompt panel (STICKY) ─────────────────────────────── */}
        <div className="lg:sticky lg:top-8 self-start">
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
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4565]" />tested
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

          {/* Platform selector */}
          <div className="mb-3">
            <div className="text-[11px] text-[#5f6c7b] uppercase tracking-widest font-semibold mb-2">Choose your AI tool</div>
            <div className="flex flex-wrap gap-2 items-center">
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
                    className={`px-3 py-1.5 rounded-full border text-[12px] transition-colors ${
                      activePlatformKey === pl.key
                        ? "bg-[#094067]/10 border-[#094067]/40 text-[#094067] font-semibold"
                        : hasContent
                          ? "border-[#094067]/20 text-[#5f6c7b] hover:text-[#094067]"
                          : "border-[#094067]/10 text-[#5f6c7b]/30 cursor-not-allowed"
                    }`}
                  >
                    <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: pl.color }} />
                    {pl.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Live preview */}
          <div className="relative bg-white border-2 border-[#094067] rounded-2xl p-4 mb-4 shadow-[6px_6px_0_0_#094067]">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] text-[#5f6c7b] uppercase" style={{ fontWeight: 700, letterSpacing: "0.05em" }}>
                {(isVideoPrompt ? videoPlatforms : platforms).find(pl => pl.key === activePlatformKey)?.name ?? activePlatformKey} prompt
              </span>
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

          {/* Variable inputs */}
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

          {/* Actions */}
          <button
            onClick={handleCopyPrompt}
            className="w-full h-12 rounded-full bg-[#ffd803] text-[#094067] inline-flex items-center justify-center gap-2 mb-3"
            style={{ fontWeight: 700, fontSize: "15px" }}
          >
            <Copy className="w-4 h-4" />Copy {(isVideoPrompt ? videoPlatforms : platforms).find(pl => pl.key === activePlatformKey)?.name ?? ""} Prompt
          </button>
          <button
            onClick={handleSave}
            className={`w-full h-11 rounded-full border inline-flex items-center justify-center gap-2 transition-colors ${
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

// ─── Shared Guide helpers ────────────────────────────────────────────────────

function GLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#ffd803] hover:underline text-[13px] font-semibold">
      {label} <ExternalLink className="w-3 h-3 opacity-60" />
    </a>
  );
}

function GBadge({ children }: { children: React.ReactNode }) {
  return <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[#e6edf3] text-[12px] font-semibold">{children}</span>;
}

// ─── Image Build Guide ───────────────────────────────────────────────────────

const IMAGE_GUIDE_STEPS = [
  "Choose an AI Image Tool",
  "Create an Account",
  "Understand the Prompt",
  "Copy & Paste the Prompt",
  "Generate the Image",
  "Refine & Iterate",
  "Download Your Image",
  "Use Your Image",
];

function ImageStepContent({ idx, promptText, platformName }: { idx: number; promptText: string; platformName: string }) {
  const copyPrompt = () => { navigator.clipboard?.writeText(promptText); toast.success("Prompt copied"); };
  switch (idx) {
    case 0: return (
      <div className="space-y-3">
        <p>Pick the AI image generation tool that works best for your needs.</p>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Midjourney", href: "https://midjourney.com" },
            { name: "ChatGPT (DALL-E)", href: "https://chat.openai.com" },
            { name: "Adobe Firefly", href: "https://firefly.adobe.com" },
            { name: "FLUX", href: "https://flux.ai" },
            { name: "Gemini", href: "https://gemini.google.com" },
          ].map(t => (
            <a key={t.name} href={t.href} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-white/15 text-[#e6edf3] text-[12px] font-bold hover:border-[#ffd803]/60 hover:text-[#ffd803] transition-colors flex items-center gap-1">
              {t.name} <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          ))}
        </div>
      </div>
    );
    case 1: return (
      <div className="space-y-3">
        <p>Sign up or log in to your chosen platform. Most offer free tiers to get started.</p>
        <div className="flex flex-wrap gap-2">
          {["Free tier available", "No credit card required", "Start generating immediately"].map(b => <GBadge key={b}>{b}</GBadge>)}
        </div>
      </div>
    );
    case 2: return (
      <div className="space-y-3">
        <p>Review the prompt below. Notice the structure — subject, style, lighting, composition, and technical details all work together.</p>
        <div className="flex flex-wrap gap-2">
          {["Subject", "Style", "Lighting", "Composition", "Camera", "Mood"].map(b => <GBadge key={b}>{b}</GBadge>)}
        </div>
        <p className="text-[13px]">Each element guides the AI to produce a specific result. Missing any part leads to generic output.</p>
      </div>
    );
    case 3: return (
      <div className="space-y-3">
        <p>Copy the prompt and paste it into your chosen AI tool's input field.</p>
        <div className="border border-[#ffd803]/30 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-[#ffd803]/8 border-b border-[#ffd803]/20">
            <span className="text-[11px] text-[#ffd803]/70 uppercase font-bold tracking-widest">{platformName} prompt</span>
            <button onClick={copyPrompt} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd803] text-[#094067] text-[11px] font-bold hover:bg-[#ffd803]/80 transition-colors">
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
          <pre className="px-4 py-3 font-mono text-[12px] text-[#e6edf3] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto bg-[#161b22]">{promptText}</pre>
        </div>
      </div>
    );
    case 4: return (
      <div className="space-y-3">
        <p>Hit Generate (or send in ChatGPT) and wait for the AI to create your image. This usually takes 10-60 seconds.</p>
        <div className="flex flex-wrap gap-2">
          {["Midjourney: /imagine", "ChatGPT: Send message", "Firefly: Generate", "FLUX: Create"].map(b => <GBadge key={b}>{b}</GBadge>)}
        </div>
      </div>
    );
    case 5: return (
      <div className="space-y-3">
        <p>Not perfect on the first try? That's normal. Try these refinement strategies:</p>
        <div className="space-y-2">
          {[
            "Adjust specific words — swap 'cinematic' for 'editorial' or 'dramatic'",
            "Add more detail — specify exact camera, lens, or lighting setup",
            "Use variations — most tools let you create variations of a result you like",
            "Change aspect ratio — portrait (2:3), landscape (16:9), or square (1:1)",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#ffd803] text-[#0d1117] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-[13px]">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    );
    case 6: return (
      <div className="space-y-3">
        <p>Once you're happy with the result, download the highest quality version available.</p>
        <div className="flex flex-wrap gap-2">
          {["PNG for transparency", "JPG for photos", "Upscale for print", "Save originals"].map(b => <GBadge key={b}>{b}</GBadge>)}
        </div>
        <p className="text-[13px]">Most platforms offer upscaling options — always upscale before using in professional work.</p>
      </div>
    );
    case 7: return (
      <div className="space-y-3">
        <p className="text-[#ffd803] font-semibold">Your image is ready to use!</p>
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          {["Social Media", "Marketing", "Product Shots", "Presentations", "Websites", "Print"].map((use, i, arr) => (
            <span key={use} className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#094067] text-white font-semibold">{use}</span>
              {i < arr.length - 1 && <span className="text-[#094067]/30 font-bold">·</span>}
            </span>
          ))}
        </div>
      </div>
    );
    default: return null;
  }
}

function ImageBuildGuide({ promptText, platformName }: { promptText: string; platformName: string }) {
  return (
    <BuildGuide
      steps={IMAGE_GUIDE_STEPS}
      renderContent={(idx) => <ImageStepContent idx={idx} promptText={promptText} platformName={platformName} />}
      doneMessage="Your AI image is ready to use!"
      doneEmoji="🎨"
    />
  );
}

// ─── Video Build Guide ───────────────────────────────────────────────────────

const VIDEO_GUIDE_STEPS = [
  "Choose an AI Video Tool",
  "Create an Account",
  "Decide Your Video Type",
  "Copy & Paste the Prompt",
  "Generate the Video",
  "Refine Motion & Details",
  "Export Your Video",
  "Publish & Share",
];

function VideoStepContent({ idx, promptText, platformName }: { idx: number; promptText: string; platformName: string }) {
  const copyPrompt = () => { navigator.clipboard?.writeText(promptText); toast.success("Prompt copied"); };
  switch (idx) {
    case 0: return (
      <div className="space-y-3">
        <p>Pick the AI video generation platform that fits your needs.</p>
        <div className="flex flex-wrap gap-2">
          {[
            { name: "Google Veo", href: "https://deepmind.google/technologies/veo/" },
            { name: "Kling AI", href: "https://klingai.com" },
            { name: "Seedance", href: "https://seedance.ai" },
            { name: "Pika", href: "https://pika.art" },
            { name: "Runway", href: "https://runwayml.com" },
          ].map(t => (
            <a key={t.name} href={t.href} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-white/15 text-[#e6edf3] text-[12px] font-bold hover:border-[#ffd803]/60 hover:text-[#ffd803] transition-colors flex items-center gap-1">
              {t.name} <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          ))}
        </div>
      </div>
    );
    case 1: return (
      <div className="space-y-3">
        <p>Sign up for your chosen platform. Most offer free credits to start generating.</p>
        <div className="flex flex-wrap gap-2">
          {["Free credits on signup", "No downloads needed", "Browser-based"].map(b => <GBadge key={b}>{b}</GBadge>)}
        </div>
      </div>
    );
    case 2: return (
      <div className="space-y-3">
        <p>Understand what type of video you're creating. Each type needs different prompt structure.</p>
        <div className="flex flex-wrap gap-2">
          {["Text to Video", "Image to Video", "Cinematic Scene", "Product Demo", "Social Reel", "Animation"].map(b => <GBadge key={b}>{b}</GBadge>)}
        </div>
        <p className="text-[13px]">This prompt is optimized for the selected video type. The structure includes scene description, camera movement, mood, and pacing.</p>
      </div>
    );
    case 3: return (
      <div className="space-y-3">
        <p>Copy the prompt and paste it into your AI video tool.</p>
        <div className="border border-[#ffd803]/30 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-[#ffd803]/8 border-b border-[#ffd803]/20">
            <span className="text-[11px] text-[#ffd803]/70 uppercase font-bold tracking-widest">{platformName} prompt</span>
            <button onClick={copyPrompt} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd803] text-[#094067] text-[11px] font-bold hover:bg-[#ffd803]/80 transition-colors">
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
          <pre className="px-4 py-3 font-mono text-[12px] text-[#e6edf3] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto bg-[#161b22]">{promptText}</pre>
        </div>
      </div>
    );
    case 4: return (
      <div className="space-y-3">
        <p>Click Generate and wait. Video generation takes 1-5 minutes depending on the platform and duration.</p>
        <div className="flex flex-wrap gap-2">
          {["5-10 sec clips", "720p-4K resolution", "Multiple variations"].map(b => <GBadge key={b}>{b}</GBadge>)}
        </div>
      </div>
    );
    case 5: return (
      <div className="space-y-3">
        <p>Improve your video with these refinement techniques:</p>
        <div className="space-y-2">
          {[
            "Adjust camera movement — slow pan, zoom, tracking shot, static",
            "Change pacing — add 'slow motion' or 'time-lapse' keywords",
            "Specify lighting — golden hour, dramatic shadows, neon, studio",
            "Control duration — shorter clips are usually higher quality",
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#ffd803] text-[#0d1117] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
              <span className="text-[13px]">{tip}</span>
            </div>
          ))}
        </div>
      </div>
    );
    case 6: return (
      <div className="space-y-3">
        <p>Download your video in the highest quality available.</p>
        <div className="flex flex-wrap gap-2">
          {["MP4 format", "Highest resolution", "No watermark (paid)", "Keep originals"].map(b => <GBadge key={b}>{b}</GBadge>)}
        </div>
        <p className="text-[13px]">Tip: Export at the highest resolution first, then resize for specific platforms later.</p>
      </div>
    );
    case 7: return (
      <div className="space-y-3">
        <p className="text-[#ffd803] font-semibold">Your AI video is ready to share!</p>
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          {["Instagram Reels", "TikTok", "YouTube Shorts", "Ads", "Presentations", "Website Hero"].map((use, i, arr) => (
            <span key={use} className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#094067] text-white font-semibold">{use}</span>
              {i < arr.length - 1 && <span className="text-[#094067]/30 font-bold">·</span>}
            </span>
          ))}
        </div>
      </div>
    );
    default: return null;
  }
}

function VideoBuildGuide({ promptText, platformName }: { promptText: string; platformName: string }) {
  return (
    <BuildGuide
      steps={VIDEO_GUIDE_STEPS}
      renderContent={(idx) => <VideoStepContent idx={idx} promptText={promptText} platformName={platformName} />}
      doneMessage="Your AI video is ready to share!"
      doneEmoji="🎬"
    />
  );
}

// ─── Shared Build Guide Component ────────────────────────────────────────────

function BuildGuide({ steps, renderContent, doneMessage, doneEmoji }: {
  steps: string[];
  renderContent: (idx: number) => React.ReactNode;
  doneMessage: string;
  doneEmoji: string;
}) {
  const TOTAL = steps.length;
  const [progress, setProgress] = useState(0);
  const [reviewStep, setReviewStep] = useState<number | null>(null);

  const activeStep = reviewStep ?? Math.min(progress, TOTAL - 1);
  const allDone = progress >= TOTAL;

  const advance = () => {
    setReviewStep(null);
    setProgress(p => Math.min(p + 1, TOTAL));
  };

  const handleDotClick = (idx: number) => {
    if (idx < progress) setReviewStep(r => r === idx ? null : idx);
    else if (idx === progress) setReviewStep(null);
  };

  const fillFraction = Math.min(progress / (TOTAL - 1), 1);

  return (
    <div className="bg-[#0d1117] px-6 py-8 rounded-b-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-[#8b949e] text-[13px] font-semibold">
          {Math.min(progress, TOTAL)} of {TOTAL} steps complete
        </span>
        {allDone
          ? <span className="text-[#3fb950] font-bold text-[13px] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3fb950]" /> All done!
            </span>
          : <div className="flex items-center gap-3">
              {progress > 0 && (
                <button
                  onClick={() => { setProgress(p => Math.max(0, p - 1)); setReviewStep(null); }}
                  className="text-[11px] text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                >
                  Undo
                </button>
              )}
              <button
                onClick={() => { setProgress(0); setReviewStep(null); }}
                className="text-[11px] text-[#8b949e] hover:text-[#ef4565] transition-colors"
              >
                Reset
              </button>
            </div>
        }
      </div>

      <div className="flex gap-5">
        {/* Left: vertical dot timeline */}
        <div className="relative shrink-0 w-[190px]">
          <div className="absolute bg-white/10" style={{ left: 14, top: 14, bottom: 14, width: 2 }} />
          <motion.div
            className="absolute origin-top"
            style={{ left: 14, top: 14, bottom: 14, width: 2, background: "linear-gradient(180deg, #3fb950, #ffd803)" }}
            animate={{ scaleY: fillFraction }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />

          <div className="relative z-10 flex flex-col gap-4">
            {steps.map((title, idx) => {
              const status: "completed" | "active" | "locked" =
                idx < progress ? "completed" : idx === progress ? "active" : "locked";
              const isReviewing = reviewStep === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 ${status !== "locked" ? "cursor-pointer" : "cursor-not-allowed"}`}
                  onClick={() => status !== "locked" && handleDotClick(idx)}
                >
                  <motion.div
                    animate={status === "active" ? {
                      boxShadow: ["0 0 0px #ffd803", "0 0 12px #ffd803, 0 0 24px rgba(255,216,3,0.4)", "0 0 0px #ffd803"],
                    } : isReviewing ? { boxShadow: "0 0 0 3px rgba(63,185,80,0.4)" } : {}}
                    transition={{ duration: 1.8, repeat: status === "active" ? Infinity : 0, ease: "easeInOut" }}
                    className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[10px] font-bold border-2 shrink-0 transition-all duration-300 ${
                      status === "completed"
                        ? "bg-[#3fb950] border-[#3fb950] text-white"
                        : status === "active"
                        ? "bg-[#ffd803] border-[#ffd803] text-[#0d1117]"
                        : "bg-[#161b22] border-white/10 text-white/20"
                    }`}
                  >
                    {status === "completed" ? <span className="w-2 h-2 rounded-full bg-current" /> : status === "locked" ? <Lock className="w-3 h-3" /> : idx + 1}
                  </motion.div>

                  <span
                    className="text-[12px] font-semibold leading-tight select-none"
                    style={{
                      color: status === "completed" ? "rgba(63,185,80,0.65)" : status === "active" ? "#ffd803" : "rgba(255,255,255,0.18)",
                      textDecoration: status === "completed" ? "line-through" : "none",
                      textDecorationColor: "rgba(63,185,80,0.45)",
                    }}
                  >
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: content card */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {allDone ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="border border-[#3fb950]/30 rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center"
                style={{ background: "rgba(63,185,80,0.05)" }}
              >
                <div className="text-4xl mb-3">{doneEmoji}</div>
                <div className="text-[#3fb950] font-bold text-[16px] mb-1">{doneMessage}</div>
                <div className="text-[#8b949e] text-[13px]">You've completed all {TOTAL} steps.</div>
                <button
                  onClick={() => { setProgress(0); setReviewStep(null); }}
                  className="mt-5 text-[12px] text-[#8b949e] hover:text-[#ef4565] transition-colors underline"
                >
                  Start over
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.22 }}
                className="border rounded-2xl overflow-hidden"
                style={{ borderColor: reviewStep !== null ? "rgba(63,185,80,0.25)" : "rgba(255,216,3,0.25)" }}
              >
                <div
                  className="flex items-center justify-between px-4 py-3 border-b"
                  style={{
                    background: reviewStep !== null ? "rgba(63,185,80,0.06)" : "rgba(255,216,3,0.06)",
                    borderColor: reviewStep !== null ? "rgba(63,185,80,0.15)" : "rgba(255,216,3,0.15)",
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: reviewStep !== null ? "#3fb950" : "#ffd803", color: reviewStep !== null ? "#fff" : "#0d1117" }}
                    >
                      {reviewStep !== null ? <span className="w-2 h-2 rounded-full bg-current" /> : activeStep + 1}
                    </span>
                    <span
                      className="text-[13px] font-bold truncate"
                      style={{
                        color: reviewStep !== null ? "#8b949e" : "#e6edf3",
                        textDecoration: reviewStep !== null ? "line-through" : "none",
                        textDecorationColor: "rgba(63,185,80,0.5)",
                      }}
                    >
                      {steps[activeStep]}
                    </span>
                  </div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest shrink-0 ml-2"
                    style={{ color: reviewStep !== null ? "#3fb950" : "rgba(255,216,3,0.7)" }}
                  >
                    {reviewStep !== null ? "Review" : "Active"}
                  </span>
                </div>

                <div className="px-4 py-4 text-[#8b949e] text-[13px] leading-relaxed">
                  {renderContent(activeStep)}
                  {reviewStep === null && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={advance}
                      className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold"
                      style={{ background: "#ffd803", color: "#0d1117" }}
                    >
                      {activeStep < TOTAL - 1 ? "Done — Unlock Next →" : "Complete! 🎉"}
                    </motion.button>
                  )}
                  {reviewStep !== null && (
                    <button
                      onClick={() => setReviewStep(null)}
                      className="mt-4 text-[12px] text-[#8b949e] hover:text-[#ffd803] transition-colors flex items-center gap-1"
                    >
                      ← Back to current step
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Highlight ───────────────────────────────────────────────────────────────

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
