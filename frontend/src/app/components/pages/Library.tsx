import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutGrid, List, Star, Copy, CheckCircle2, X,
  Search, ChevronLeft, ChevronRight, Loader2, ArrowRight,
} from "lucide-react";
import { platforms, videoPlatforms, websitePlatforms, familyMeta, categories as themeCats, type Family } from "../theme";
import { libraryApi, type LibraryPrompt } from "../../lib/api";
import { promptImageMap } from "../../lib/prompt-images";
import { imageLibraryPrompts } from "../../lib/library-data";
import { videoLibraryPrompts } from "../../lib/video-data";
import { videoPlatformVersions } from "../../lib/video-platforms";
import { PromptCard } from "../PromptCard";
import { WebsitePromptCard, WebsitePreviewModal } from "../WebsitePromptCard";
import { websiteDesigns } from "../../lib/website-data";
import { websitePlatformVersions } from "../../lib/website-platforms";

const PAGE_SIZE = 20;

// ─── Types ────────────────────────────────────────────────────────────────────

interface CategoryRow { category: string; count: number }

// Map API prompt → PromptCard-compatible shape
function toCardItem(p: LibraryPrompt) {
  return {
    id:       String(p.id),
    slug:     p.slug,
    title:    p.title,
    description: p.base_prompt.slice(0, 120) + (p.base_prompt.length > 120 ? "…" : ""),
    category: p.category,
    family:   "image" as const,
    tags:     p.tags,
    tested:   p.tested,
    rating:   p.quality_score,
    reviews:  0,
    image:    (p as any).image_url ?? promptImageMap[p.slug] ?? "",
    platforms: {} as Record<string, string>,
    variables: [],
    author: "PromptVault",
    subCategory: (p as any).sub_category ?? "",
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function Library({ go, family }: { go: (p: string) => void; family?: Family | null }) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [view, setView]         = useState<"grid" | "list">("grid");
  const [cat, setCat]           = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [sortBy, setSortBy]     = useState<"latest" | "score">("latest");
  const [page, setPage]         = useState(1);
  const [query, setQuery]       = useState("");
  const [inputVal, setInputVal] = useState("");

  const [prompts, setPrompts]     = useState<LibraryPrompt[]>([]);
  const [total, setTotal]         = useState(0);
  const [pages, setPages]         = useState(0);
  const [loading, setLoading]     = useState(true);
  const [categories, setCategories] = useState<CategoryRow[]>([]);
  const [useFallback, setUseFallback] = useState(false);
  const [searchMode, setSearchMode]   = useState<string | null>(null);

  const searchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Load categories once ──────────────────────────────────────────────────
  useEffect(() => {
    libraryApi.categories()
      .then(setCategories)
      .catch(() => setUseFallback(true));
  }, []);

  // ── Reset filters when family changes ────────────────────────────────────
  useEffect(() => { setCat(null); setPlatform(null); setPage(1); setQuery(""); setInputVal(""); }, [family]);

  // ── Debounce search input ────────────────────────────────────────────────
  const handleInput = (val: string) => {
    setInputVal(val);
    if (searchTimer.current) clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      setQuery(val.trim());
      setPage(1);
    }, 350);
  };

  // ── Fetch prompts when deps change ───────────────────────────────────────
  const fetchPrompts = useCallback(async () => {
    setLoading(true);
    setSearchMode(null);
    try {
      const params = {
        category: cat ?? undefined,
        page,
        limit: PAGE_SIZE,
      };

      if (query.length >= 2) {
        const res = await libraryApi.search({ q: query, ...params });
        setPrompts(res.data);
        setTotal(res.total);
        setPages(res.pages);
        setSearchMode(res.mode);
      } else {
        const res = await libraryApi.list(params);
        setPrompts(res.data);
        setTotal(res.total);
        setPages(res.pages);
      }
      setUseFallback(false);
    } catch {
      setUseFallback(true);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }, [query, cat, page]);

  useEffect(() => { fetchPrompts(); }, [fetchPrompts]);

  // ── Reset page when filter changes ──────────────────────────────────────
  const handleCatChange = (c: string | null) => { setCat(c); setPage(1); };

  const meta = family ? familyMeta[family] : null;

  const isImageFamily   = !family || family === "image";
  const isVideoFamily   = family === "video";
  const isWebsiteFamily = family === "website";
  const activePlatforms = isWebsiteFamily ? websitePlatforms : isVideoFamily ? videoPlatforms : platforms;

  // ── Fallback: filter static prompts locally ───────────────────────────────
  const videoWithPlatforms = videoLibraryPrompts.map(p => ({
    ...p,
    platforms: videoPlatformVersions[p.slug ?? ""] ?? {},
  }));

  const fallbackSource = isImageFamily ? imageLibraryPrompts : isVideoFamily ? videoWithPlatforms : [];
  const fallbackFiltered = fallbackSource.filter(p =>
    (!cat || p.category === cat) &&
    (!query || p.title.toLowerCase().includes(query.toLowerCase()) ||
               p.description.toLowerCase().includes(query.toLowerCase()))
  );
  const fallbackPage   = fallbackFiltered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const fallbackPages  = Math.ceil(fallbackFiltered.length / PAGE_SIZE);

  // ── Determine items to render ────────────────────────────────────────────
  const useFallbackForFamily = isImageFamily || isVideoFamily;
  const displayItems  = (useFallback || useFallbackForFamily) ? fallbackPage : prompts.map(toCardItem);
  const displayTotal  = (useFallback || useFallbackForFamily) ? fallbackFiltered.length : total;
  const displayPages  = (useFallback || useFallbackForFamily) ? fallbackPages : pages;

  // ── Sort client-side for both sources ────────────────────────────────────
  const sorted = [...displayItems].sort((a, b) => {
    if (sortBy === "score") return (b.rating ?? 0) - (a.rating ?? 0);
    return 0;
  });

  // ── Category list ─────────────────────────────────────────────────────────
  const staticCats = Array.from(
    imageLibraryPrompts.reduce((m, p) => {
      m.set(p.category, (m.get(p.category) ?? 0) + 1);
      return m;
    }, new Map<string, number>())
  ).map(([category, count]) => ({ category, count }));

  const videoStaticCats  = themeCats.video.map(c => ({ category: c.name, count: videoLibraryPrompts.filter(p => p.category === c.name).length }));
  const websiteStaticCats = themeCats.website.map(c => ({ category: c.name, count: websiteDesigns.filter(d => d.category === c.name).length }));

  const catList = isImageFamily
    ? (categories.length > 0 ? categories : staticCats)
    : isVideoFamily
    ? videoStaticCats
    : isWebsiteFamily
    ? websiteStaticCats
    : [];

  return (
  <>
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-[#094067]">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[#094067] text-3xl">{meta ? meta.title : "Prompt Library"}</h1>
            {meta && (
              <button
                onClick={() => go("library")}
                className="inline-flex items-center gap-1 h-8 px-3 rounded-full border-2 border-[#094067] bg-white text-[#094067] text-[13px]"
                style={{ fontWeight: 600 }}
              >
                <X className="w-3.5 h-3.5" /> All prompts
              </button>
            )}
          </div>
          <p className="text-[#5f6c7b] mt-0.5">
            {loading
              ? "Loading…"
              : `${displayTotal.toLocaleString()} prompt${displayTotal !== 1 ? "s" : ""}${cat ? ` in ${cat}` : ""}${platform ? ` · ${activePlatforms.find(p => p.key === platform)?.name ?? platform}` : ""}`}
            {searchMode === "fuzzy" && (
              <span className="ml-2 text-[11px] px-2 py-0.5 bg-[#ffd803]/40 text-[#094067] rounded-full">fuzzy match</span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "latest" | "score")}
            className="h-9 px-3 rounded-lg bg-[#094067]/5 border border-[#094067]/20 text-[#094067]"
          >
            <option value="latest">Latest</option>
            <option value="score">Highest score</option>
          </select>
          <div className="flex rounded-lg border border-[#094067]/20 overflow-hidden">
            <button onClick={() => setView("grid")} className={`p-2 ${view==="grid"?"bg-[#094067]/10":"bg-transparent"}`}><LayoutGrid className="w-4 h-4" /></button>
            <button onClick={() => setView("list")} className={`p-2 ${view==="list"?"bg-[#094067]/10":"bg-transparent"}`}><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* ── Search bar ─────────────────────────────────────────────────── */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5f6c7b]" />
        <input
          type="text"
          placeholder="Search prompts…"
          value={inputVal}
          onChange={(e) => handleInput(e.target.value)}
          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#094067]/20 bg-white text-[#094067] placeholder:text-[#5f6c7b]/60 focus:outline-none focus:border-[#094067]/50"
        />
        {inputVal && (
          <button
            onClick={() => { setInputVal(""); setQuery(""); setPage(1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5f6c7b] hover:text-[#094067]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6">
        {/* ── Sidebar filters ──────────────────────────────────────────── */}
        <aside className="space-y-6">
          <FilterGroup title="Category">
            <FilterPill active={cat===null} onClick={() => handleCatChange(null)}>All</FilterPill>
            {catList.map(c => (
              <FilterPill key={c.category} active={cat===c.category} onClick={() => handleCatChange(c.category)}>
                {c.category}
                {c.count > 0 && <span className="ml-1 text-[11px] opacity-60">({c.count})</span>}
              </FilterPill>
            ))}
          </FilterGroup>
          <FilterGroup title="Platform">
            <FilterPill active={platform === null} onClick={() => { setPlatform(null); setPage(1); }}>All</FilterPill>
            {activePlatforms.map(pl => (
              <FilterPill key={pl.key} active={platform === pl.key} onClick={() => { setPlatform(pl.key); setPage(1); }}>
                <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: pl.color }} />
                {pl.name}
              </FilterPill>
            ))}
          </FilterGroup>
        </aside>

        {/* ── Prompt grid / list ───────────────────────────────────────── */}
        <main>
          {/* Website Generation */}
          {isWebsiteFamily ? (() => {
            const filtered = websiteDesigns.filter(d => !cat || d.subCategory === cat || d.category === cat);
            return filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#094067]/10 flex items-center justify-center text-3xl">⌨️</div>
                <p className="text-[#5f6c7b]">No website prompts in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(d => (
                  <WebsitePromptCard
                    key={d.id}
                    design={d}
                    onClick={() => go("website-detail:" + d.slug)}
                    onCopy={() => {
                      const prompt = websitePlatformVersions[d.slug]?.lovable ?? d.description;
                      navigator.clipboard?.writeText(prompt);
                    }}
                    onPreviewExpand={() => setExpandedSlug(d.slug)}
                  />
                ))}
              </div>
            );
          })() :!loading && !isImageFamily && !isVideoFamily && !isWebsiteFamily && sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#ffd803]/30 to-[#094067]/10 flex items-center justify-center text-4xl">
                ✦
              </div>
              <h3 className="text-[#094067] text-xl" style={{ fontWeight: 700 }}>
                {meta?.title ?? "Prompts"} coming soon
              </h3>
              <p className="text-[#5f6c7b] text-center max-w-sm">
                We're curating a hand-picked collection of {meta?.title?.toLowerCase() ?? "prompts"}.
                Check back soon — or{" "}
                <button onClick={() => go("submit")} className="text-[#ef4565] underline">
                  submit your own
                </button>
                .
              </p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center py-24 text-[#5f6c7b]">
              <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading prompts…
            </div>
          ) : sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-[#5f6c7b] gap-3">
              <Search className="w-10 h-10 opacity-30" />
              <p>No prompts found{query ? ` for "${query}"` : ""}.</p>
              {query && (
                <button
                  onClick={() => { setInputVal(""); setQuery(""); }}
                  className="text-[#ef4565] underline text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : view === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {sorted.map(p => (
                <PromptCard key={p.id} p={p as any} onClick={() => go("detail:" + p.id + (platform ? ":" + platform : ""))} />
              ))}
            </div>
          ) : (
            <div className="bg-white border border-[#094067]/15 rounded-2xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-[#094067]/5 text-[#5f6c7b]">
                  <tr>
                    <th className="text-left p-3">Title</th>
                    <th className="text-left p-3">Category</th>
                    <th className="text-left p-3">Score</th>
                    <th className="text-left p-3">Status</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(p => (
                    <tr key={p.id} className="border-t border-[#094067]/15 hover:bg-[#094067]/5 cursor-pointer" onClick={() => go("detail:" + p.id + (platform ? ":" + platform : ""))}>
                      <td className="p-3 text-[#094067]" style={{ fontWeight: 600 }}>{p.title}</td>
                      <td className="p-3 text-[#5f6c7b]">{p.category}</td>
                      <td className="p-3"><span className="inline-flex items-center gap-1 text-[#094067]"><Star className="w-4 h-4 fill-[#ffd803] text-[#ef4565]" />{p.rating}</span></td>
                      <td className="p-3">{(p as any).tested && <span className="inline-flex items-center gap-1 text-[#ef4565]"><CheckCircle2 className="w-4 h-4" />tested</span>}</td>
                      <td className="p-3 text-right"><Copy className="w-4 h-4 text-[#ef4565] inline" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* ── Pagination ─────────────────────────────────────────────── */}
          {displayPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
                className="p-2 rounded-lg border border-[#094067]/20 disabled:opacity-30 hover:bg-[#094067]/5"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {Array.from({ length: Math.min(displayPages, 7) }, (_, i) => {
                const n = page <= 4 ? i + 1 : page - 3 + i;
                if (n < 1 || n > displayPages) return null;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`w-9 h-9 rounded-lg border text-sm ${n === page ? "bg-[#094067] text-white border-[#094067]" : "border-[#094067]/20 text-[#094067] hover:bg-[#094067]/5"}`}
                  >
                    {n}
                  </button>
                );
              })}

              <button
                disabled={page >= displayPages}
                onClick={() => setPage(p => p + 1)}
                className="p-2 rounded-lg border border-[#094067]/20 disabled:opacity-30 hover:bg-[#094067]/5"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </main>
      </div>
    </div>

    {/* ── Website preview modal ─────────────────────────────────────── */}
    <AnimatePresence>
      {expandedSlug && (() => {
        const d = websiteDesigns.find(x => x.slug === expandedSlug);
        return d ? (
          <WebsitePreviewModal
            key={expandedSlug}
            slug={expandedSlug}
            title={d.title}
            onClose={() => setExpandedSlug(null)}
          />
        ) : null;
      })()}
    </AnimatePresence>
  </>
  );
}

// ─── Library Landing ─────────────────────────────────────────────────────────

const FAMILY_CARDS = [
  {
    key: "image",
    title: "Image Generation",
    tagline: "Craft stunning visuals for Midjourney, Firefly, FLUX and more",
    count: "420+",
    label: "prompts",
    chips: ["Midjourney", "Firefly", "FLUX", "ChatGPT", "Gemini"],
    bg: "bg-white",
    border: "border-[#ffd803]/60",
    accentBg: "bg-[#ffd803]",
    accentText: "text-[#094067]",
    taglineColor: "text-[#5f6c7b]",
    countColor: "text-[#094067]",
    chipClass: "bg-[#094067]/8 border border-[#094067]/15 text-[#5f6c7b]",
    visual: (
      <div className="flex gap-2 flex-wrap">
        {["#ffd803","#ef4565","#094067","#90b4ce"].map((c, i) => (
          <div key={i} className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" style={{ background: c }} />
        ))}
      </div>
    ),
  },
  {
    key: "video",
    title: "Video Generation",
    tagline: "Direct AI-generated videos across Veo, Kling, Seedance and more",
    count: "30",
    label: "prompts",
    chips: ["Veo", "Kling", "Seedance", "Higgsfield", "Pika"],
    bg: "bg-gradient-to-br from-[#1a1a2e] to-[#4c1d95]",
    border: "border-[#7c3aed]/40",
    accentBg: "bg-[#7c3aed]",
    accentText: "text-white",
    taglineColor: "text-white/60",
    countColor: "text-white",
    chipClass: "border border-white/20 text-white/60",
    visual: (
      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-white border-b-[8px] border-b-transparent ml-1" />
      </div>
    ),
  },
  {
    key: "website",
    title: "Website Generation",
    tagline: "Full-stack UI prompts for Lovable, Bolt, Claude Code and more",
    count: "Coming",
    label: "soon",
    chips: ["Lovable", "Bolt", "Claude Code", "Codex", "Replit"],
    bg: "bg-[#094067]",
    border: "border-[#094067]/20",
    accentBg: "bg-[#ffd803]",
    accentText: "text-[#094067]",
    taglineColor: "text-white/60",
    countColor: "text-white",
    chipClass: "border border-white/20 text-white/60",
    visual: (
      <div className="flex gap-1">
        {["#ef4565","#ffd803","#10a37f"].map((c,i) => (
          <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
        ))}
      </div>
    ),
  },
  {
    key: "text",
    title: "Text Generation",
    tagline: "Structured prompts for developers, marketers, analysts and more",
    count: "Coming",
    label: "soon",
    chips: ["ChatGPT", "Gemini", "Grok", "Claude"],
    bg: "bg-[#0d1b2a]",
    border: "border-[#094067]/30",
    accentBg: "bg-[#ef4565]",
    accentText: "text-white",
    taglineColor: "text-white/50",
    countColor: "text-white",
    chipClass: "border border-white/15 text-white/50",
    visual: (
      <div className="font-mono text-[10px] text-[#bce4d8]/60 leading-4 space-y-0.5">
        <div>const prompt = <span className="text-[#ffd803]">`</span></div>
        <div className="pl-2 text-[#90b4ce]">You are an expert…</div>
        <div><span className="text-[#ffd803]">`</span>;</div>
      </div>
    ),
  },
  {
    key: "content",
    title: "Content Generation",
    tagline: "Campaigns, copy, and content for every channel and format",
    count: "Coming",
    label: "soon",
    chips: ["ChatGPT", "Gemini", "Claude", "Grok"],
    bg: "bg-gradient-to-br from-[#ef4565]/10 to-white",
    border: "border-[#ef4565]/20",
    accentBg: "bg-[#ef4565]",
    accentText: "text-white",
    taglineColor: "text-[#5f6c7b]",
    countColor: "text-[#094067]",
    chipClass: "bg-[#ef4565]/10 border border-[#ef4565]/20 text-[#ef4565]",
    visual: (
      <div className="flex flex-wrap gap-1">
        {["Blog", "Email", "Ad Copy", "Social"].map(t => (
          <span key={t} className="px-2 py-0.5 rounded-full bg-[#ef4565]/20 text-[#ef4565] text-[10px] font-semibold">{t}</span>
        ))}
      </div>
    ),
  },
];

export function LibraryLanding({ go }: { go: (p: string) => void }) {
  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 text-[#094067]">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-[#094067] mb-2">Prompt Library</h1>
        <p className="text-[#5f6c7b] text-lg">Choose a category to explore curated, tested prompts.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FAMILY_CARDS.map((card) => (
          <motion.div
            key={card.key}
            onClick={() => go("library:" + card.key)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") go("library:" + card.key); }}
            whileHover={{ y: -6, boxShadow: "6px 10px 0 0 #094067" }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className={`${card.bg} border-2 ${card.border} rounded-2xl p-6 cursor-pointer flex flex-col gap-4 group relative overflow-hidden`}
          >
            {/* Visual accent */}
            <div className="h-12 flex items-center">{card.visual}</div>

            {/* Count badge */}
            <div className="flex items-baseline gap-1.5">
              <span className={`text-3xl font-black ${card.countColor}`}>{card.count}</span>
              <span className={`text-sm font-semibold ${card.taglineColor}`}>{card.label}</span>
            </div>

            {/* Title + tagline */}
            <div>
              <div className={`text-lg font-bold ${card.countColor} mb-1`}>{card.title}</div>
              <p className={`text-[13px] leading-relaxed ${card.taglineColor}`}>{card.tagline}</p>
            </div>

            {/* Platform chips */}
            <div className="flex flex-wrap gap-1 mt-auto">
              {card.chips.map(chip => (
                <span key={chip} className={`px-2 py-0.5 rounded-full text-[11px] font-semibold ${card.chipClass}`}>
                  {chip}
                </span>
              ))}
            </div>

            {/* Arrow */}
            <div className={`absolute bottom-5 right-5 w-8 h-8 rounded-full ${card.accentBg} ${card.accentText} flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity`}>
              <ArrowRight className="w-4 h-4" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: any) {
  return (
    <div>
      <div className="text-[#094067] mb-3" style={{ fontWeight: 600 }}>{title}</div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterPill({ active, onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-[13px] ${active ? "bg-[#ffd803] text-[#094067] border-[#ffd803]" : "border-[#094067]/20 text-[#5f6c7b] hover:text-[#094067] hover:border-[#094067]/30"}`}
    >
      {children}
    </button>
  );
}
