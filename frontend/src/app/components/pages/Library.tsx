import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutGrid, List, ThumbsUp, ThumbsDown, Copy, X,
  Search, ChevronLeft, ChevronRight, Loader2, ArrowRight, ArrowLeft,
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

const FEATURED_IMAGE_IDS = [
  "2","6","7","12","15","18","21","24","26","32","33","40","41","46","50",
  "59","67","71","72","107","137","144","151","156","161","171","172","173",
  "175","199","206","211","225","227","265","269","274","276","284","286",
  "288","289","291","294","298","304","305","306","310","311","313","316",
  "321","323","325","336","343",
];

// ─── Featured Thumbnail ──────────────────────────────────────────────────────

function FeaturedThumb({ design, onClick }: { design: typeof websiteDesigns[0]; onClick: () => void }) {
  const [thumbErr, setThumbErr] = useState(false);
  const thumbUrl = design.screenshot || `/previews/${design.slug}/thumb.jpg`;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -3, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="rounded-xl overflow-hidden border border-[#0a0a0a]/10 bg-white text-left group"
    >
      <div className="w-full aspect-[16/10] bg-[#f5f5f5] overflow-hidden relative">
        {!thumbErr ? (
          <img
            src={thumbUrl}
            alt={design.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setThumbErr(true)}
          />
        ) : (
          <iframe
            src={`/previews/${design.slug}/index.html`}
            className="pointer-events-none"
            style={{ width: "1280px", height: "800px", transform: "scale(0.17)", transformOrigin: "top left", border: "none" }}
            tabIndex={-1}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
          <span className="text-white text-[11px] flex items-center gap-1" style={{ fontWeight: 600 }}>
            View Details →
          </span>
        </div>
      </div>
      <div className="px-2.5 py-2">
        <div className="text-[#0a0a0a] text-[12px] truncate" style={{ fontWeight: 700 }}>{design.title}</div>
        <div className="text-[#6b7280] text-[10px] truncate mt-0.5">{design.category}</div>
      </div>
    </motion.button>
  );
}

// ─── Masonry Image Card (Pinterest-style) ────────────────────────────────────

function MasonryImageCard({ p, onClick }: { p: any; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="break-inside-avoid mb-4 rounded-[20px] overflow-hidden cursor-pointer relative group"
      style={{
        background: "#fff",
        boxShadow: hovered
          ? "0 20px 40px -12px rgba(0,0,0,0.15), 0 4px 12px rgba(0,0,0,0.06)"
          : "0 2px 8px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden">
        {p.image ? (
          <img
            src={p.image}
            alt={p.title}
            className="w-full block transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.4s ease" }}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <div className="w-full aspect-[4/3] bg-gradient-to-br from-[#f0f0f0] to-[#e8e8e8] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>
          </div>
        )}

        {/* Hover overlay - smooth gradient reveal */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 40%, transparent 100%)" }}
        >
          <div className="p-3.5 pb-4">
            <div className="text-white text-[13px] line-clamp-2 leading-snug" style={{ fontWeight: 700, textShadow: "0 1px 3px rgba(0,0,0,0.3)" }}>{p.title}</div>
            <div className="text-white/70 text-[11px] mt-1">{p.category}</div>
          </div>
        </motion.div>

        {/* Save button - top right on hover */}
        <motion.div
          className="absolute top-2.5 right-2.5"
          initial={false}
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            onClick={(e) => e.stopPropagation()}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md text-[#0a0a0a] flex items-center justify-center hover:bg-white transition-colors"
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/></svg>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

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
    author: "Prompt Bot",
    subCategory: (p as any).sub_category ?? "",
  };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function Library({ go, family, initialCategory }: { go: (p: string) => void; family?: Family | null; initialCategory?: string | null }) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const [view, setView]         = useState<"grid" | "list">("grid");
  const [cat, setCat]           = useState<string | null>(
    initialCategory?.startsWith("#") ? null : (initialCategory ?? null)
  );
  const [platform, setPlatform] = useState<string | null>(null);
  const [sortBy, setSortBy]     = useState<"latest" | "score">("latest");
  const [page, setPage]         = useState(1);
  const [query, setQuery]       = useState(
    initialCategory?.startsWith("#") ? initialCategory.slice(1) : ""
  );
  const [inputVal, setInputVal] = useState(
    initialCategory?.startsWith("#") ? initialCategory.slice(1) : ""
  );

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
  const isStaticFamily = !family || family === "image" || family === "video" || family === "website";

  const fetchPrompts = useCallback(async () => {
    // Static families (image, video, website) use local data - skip API call
    if (isStaticFamily) { setLoading(false); return; }

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
  }, [query, cat, page, isStaticFamily]);

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
  const fallbackFiltered = useMemo(() => {
    const filtered = fallbackSource.filter(p =>
      (!cat || p.category === cat) &&
      (!query || p.title.toLowerCase().includes(query.toLowerCase()) ||
                 p.description.toLowerCase().includes(query.toLowerCase()))
    );
    // Featured images first within every category
    if (isImageFamily && !query) {
      filtered.sort((a, b) => {
        const aIdx = FEATURED_IMAGE_IDS.indexOf(a.id);
        const bIdx = FEATURED_IMAGE_IDS.indexOf(b.id);
        if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
        if (aIdx !== -1) return -1;
        if (bIdx !== -1) return 1;
        if (sortBy === "score") return (b.rating ?? 0) - (a.rating ?? 0);
        return 0;
      });
    } else if (sortBy === "score") {
      filtered.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    }
    return filtered;
  }, [fallbackSource, cat, query, isImageFamily, sortBy]);
  const effectivePageSize = isImageFamily ? fallbackFiltered.length || 1 : PAGE_SIZE;
  const fallbackPage   = isImageFamily ? fallbackFiltered : fallbackFiltered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const fallbackPages  = isImageFamily ? 1 : Math.ceil(fallbackFiltered.length / PAGE_SIZE);

  // ── Determine items to render ────────────────────────────────────────────
  const useFallbackForFamily = isImageFamily || isVideoFamily;
  const displayItems  = (useFallback || useFallbackForFamily) ? fallbackPage : prompts.map(toCardItem);
  const displayTotal  = (useFallback || useFallbackForFamily) ? fallbackFiltered.length : total;
  const displayPages  = (useFallback || useFallbackForFamily) ? fallbackPages : pages;

  // ── Sort client-side (non-image families) ──────────────────────────────
  const sorted = useMemo(() => {
    if (isImageFamily) return displayItems; // already sorted before pagination
    return [...displayItems].sort((a, b) => {
      if (sortBy === "score") return (b.rating ?? 0) - (a.rating ?? 0);
      return 0;
    });
  }, [displayItems, isImageFamily, sortBy]);

  // ── Category list (memoized) ───────────────────────────────────────────
  const catList = useMemo(() => {
    if (isImageFamily) {
      return Array.from(
        imageLibraryPrompts.reduce((m, p) => {
          m.set(p.category, (m.get(p.category) ?? 0) + 1);
          return m;
        }, new Map<string, number>())
      ).map(([category, count]) => ({ category, count }));
    }
    if (isVideoFamily) return themeCats.video.map(c => ({ category: c.name, count: videoLibraryPrompts.filter(p => p.category === c.name).length }));
    if (isWebsiteFamily) return themeCats.website.map(c => ({ category: c.name, count: websiteDesigns.filter(d => d.category === c.name).length }));
    return categories.length > 0 ? categories : [];
  }, [isImageFamily, isVideoFamily, isWebsiteFamily, categories]);

  return (
  <>
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-[#0a0a0a]">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <button onClick={() => go("library")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-3 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
      </button>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-[#0a0a0a] text-3xl">{meta ? meta.title : "Prompt Library"}</h1>
            {meta && (
              <button
                onClick={() => go("library")}
                className="inline-flex items-center gap-1 h-8 px-3 rounded-full border-2 border-[#0a0a0a] bg-white text-[#0a0a0a] text-[13px]"
                style={{ fontWeight: 600 }}
              >
                <X className="w-3.5 h-3.5" /> All prompts
              </button>
            )}
            {isImageFamily && (
              <button
                onClick={() => go("guide:image-gen")}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#0a0a0a]/20 bg-[#0a0a0a]/5 text-[#0a0a0a] text-[13px] hover:bg-[#0a0a0a]/10 transition-colors"
                style={{ fontWeight: 600 }}
              >
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M2 3h12M2 7h8M2 11h10" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"/></svg>
                Image Gen Guide
              </button>
            )}
            {isVideoFamily && (
              <button
                onClick={() => go("guide:video-gen")}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#0a0a0a]/20 bg-[#0a0a0a]/5 text-[#0a0a0a] text-[13px] hover:bg-[#0a0a0a]/10 transition-colors"
                style={{ fontWeight: 600 }}
              >
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M2 3h12M2 7h8M2 11h10" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"/></svg>
                Video Gen Guide
              </button>
            )}
            {isWebsiteFamily && (
              <button
                onClick={() => go("guide:web-gen")}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-[#0a0a0a]/20 bg-[#0a0a0a]/5 text-[#0a0a0a] text-[13px] hover:bg-[#0a0a0a]/10 transition-colors"
                style={{ fontWeight: 600 }}
              >
                <svg viewBox="0 0 16 16" fill="none" width={14} height={14}><path d="M2 3h12M2 7h8M2 11h10" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round"/></svg>
                Website Gen Guide
              </button>
            )}
          </div>
          {searchMode === "fuzzy" && (
            <p className="text-[#6b7280] mt-0.5">
              <span className="text-[11px] px-2 py-0.5 bg-[#4FC3F7]/40 text-[#0a0a0a] rounded-full">fuzzy match</span>
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "latest" | "score")}
            className="h-9 px-3 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a]"
          >
            <option value="latest">Latest</option>
            <option value="score">Highest score</option>
          </select>
          <div className="flex rounded-lg border border-[#0a0a0a]/20 overflow-hidden">
            <button onClick={() => setView("grid")} className={`p-2 ${view==="grid"?"bg-[#0a0a0a]/10":"bg-transparent"}`}><LayoutGrid className="w-4 h-4" /></button>
            <button onClick={() => setView("list")} className={`p-2 ${view==="list"?"bg-[#0a0a0a]/10":"bg-transparent"}`}><List className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* ── Search bar ─────────────────────────────────────────────────── */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
        <input
          type="text"
          placeholder="Search prompts…"
          value={inputVal}
          onChange={(e) => handleInput(e.target.value)}
          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-[#0a0a0a]/20 bg-white text-[#0a0a0a] placeholder:text-[#6b7280]/60 focus:outline-none focus:border-[#0a0a0a]/50"
        />
        {inputVal && (
          <button
            onClick={() => { setInputVal(""); setQuery(""); setPage(1); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-[#0a0a0a]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* ── Horizontal category filter ─────────────────────────────── */}
      <div className="flex flex-wrap gap-2 mb-6">
        <FilterPill active={cat===null} onClick={() => handleCatChange(null)} count={displayTotal}>All</FilterPill>
        {catList.map(c => (
          <FilterPill key={c.category} active={cat===c.category} onClick={() => handleCatChange(c.category)} count={c.count}>
            {c.category}
          </FilterPill>
        ))}
      </div>
      {!isImageFamily && !isVideoFamily && !isWebsiteFamily && (
        <div className="flex flex-wrap gap-2 mb-6">
          <FilterPill active={platform === null} onClick={() => { setPlatform(null); setPage(1); }}>All</FilterPill>
          {activePlatforms.map(pl => (
            <FilterPill key={pl.key} active={platform === pl.key} onClick={() => { setPlatform(pl.key); setPage(1); }}>
              {pl.name}
            </FilterPill>
          ))}
        </div>
      )}

      {/* ── Prompt grid / list ───────────────────────────────────────── */}
      <div>
          {/* Website Library */}
          {isWebsiteFamily ? (() => {
            const FEATURED_IDS = [
              "bw_01","bw_04","bw_05","bw_07","dpecom_01","lp_07","lp_15",
              "pcpp01","pcpp05","pcpp07","pcpp11",
              "pfecomm_01","pfecomm_02","pfecomm_04",
              "portfolio_04","sbecom_01","sbecom_03",
            ];
            const filtered = websiteDesigns.filter(d => !cat || d.subCategory === cat || d.category === cat);
            // Sort: featured IDs first, rest after
            const sorted = [...filtered].sort((a, b) => {
              const aIdx = FEATURED_IDS.indexOf(a.id);
              const bIdx = FEATURED_IDS.indexOf(b.id);
              if (aIdx !== -1 && bIdx !== -1) return aIdx - bIdx;
              if (aIdx !== -1) return -1;
              if (bIdx !== -1) return 1;
              return 0;
            });

            return sorted.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#0a0a0a]/10 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M8 12h.01M12 12h.01M16 12h.01M8 16h8"/></svg>
                </div>
                <p className="text-[#6b7280]">No website prompts in this category yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sorted.map(d => (
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
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-[#4FC3F7]/30 to-[#0a0a0a]/10 flex items-center justify-center text-4xl">
                ✦
              </div>
              <h3 className="text-[#0a0a0a] text-xl" style={{ fontWeight: 700 }}>
                {meta?.title ?? "Prompts"} coming soon
              </h3>
              <p className="text-[#6b7280] text-center max-w-sm">
                We're curating a hand-picked collection of {meta?.title?.toLowerCase() ?? "prompts"}.
                Check back soon - or{" "}
                <button onClick={() => go("submit")} className="text-[#0a0a0a] underline">
                  submit your own
                </button>
                .
              </p>
            </div>
          ) : (loading && !isImageFamily && !isVideoFamily) ? (
            <div className="flex items-center justify-center py-24 text-[#6b7280]">
              <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading prompts…
            </div>
          ) : sorted.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-[#6b7280] gap-3">
              <Search className="w-10 h-10 opacity-30" />
              <p>No prompts found{query ? ` for "${query}"` : ""}.</p>
              {query && (
                <button
                  onClick={() => { setInputVal(""); setQuery(""); }}
                  className="text-[#0a0a0a] underline text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          ) : view === "grid" ? (
            isImageFamily ? (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
                {sorted.map(p => (
                  <MasonryImageCard key={p.id} p={p as any} onClick={() => go("detail:" + p.id + (platform ? ":" + platform : ""))} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {sorted.map(p => (
                  <PromptCard key={p.id} p={p as any} onClick={() => go("detail:" + p.id + (platform ? ":" + platform : ""))} />
                ))}
              </div>
            )
          ) : (
            <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-[#0a0a0a]/5 text-[#6b7280]">
                  <tr>
                    <th className="text-left p-3">Title</th>
                    <th className="text-left p-3">Category</th>
                    <th className="text-left p-3">Feedback</th>
                    <th className="text-left p-3">Status</th>
                    <th className="p-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map(p => (
                    <tr key={p.id} className="border-t border-[#0a0a0a]/15 hover:bg-[#0a0a0a]/5 cursor-pointer" onClick={() => go("detail:" + p.id + (platform ? ":" + platform : ""))}>
                      <td className="p-3 text-[#0a0a0a]" style={{ fontWeight: 600 }}>{p.title}</td>
                      <td className="p-3 text-[#6b7280]">{p.category}</td>
                      <td className="p-3"><span className="inline-flex items-center gap-1.5"><ThumbsUp className="w-3.5 h-3.5 text-[#6b7280]" /><ThumbsDown className="w-3.5 h-3.5 text-[#6b7280]" /></span></td>
                      <td className="p-3">{(p as any).tested && <span className="inline-flex items-center gap-1 text-[#0a0a0a]"><span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7]" />tested</span>}</td>
                      <td className="p-3 text-right"><Copy className="w-4 h-4 text-[#0a0a0a] inline" /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          )}

          {/* ── Pagination ─────────────────────────────────────────────── */}
          {displayPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
                className="p-2 rounded-lg border border-[#0a0a0a]/20 disabled:opacity-30 hover:bg-[#0a0a0a]/5"
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
                    className={`w-9 h-9 rounded-lg border text-sm ${n === page ? "bg-[#0a0a0a] text-white border-[#0a0a0a]" : "border-[#0a0a0a]/20 text-[#0a0a0a] hover:bg-[#0a0a0a]/5"}`}
                  >
                    {n}
                  </button>
                );
              })}

              <button
                disabled={page >= displayPages}
                onClick={() => setPage(p => p + 1)}
                className="p-2 rounded-lg border border-[#0a0a0a]/20 disabled:opacity-30 hover:bg-[#0a0a0a]/5"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
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
    title: "Image Library",
    tagline: "Craft stunning visuals for Midjourney, Firefly, FLUX and more",
    count: "420+",
    label: "prompts",
    chips: ["Midjourney", "Firefly", "FLUX", "ChatGPT", "Gemini"],
    cover: "/images/image5.png",
    comingSoon: false,
    bg: "bg-white",
    border: "border-[#4FC3F7]/60",
    accentBg: "bg-[#4FC3F7]",
    accentText: "text-[#0a0a0a]",
    taglineColor: "text-[#6b7280]",
    countColor: "text-[#0a0a0a]",
    chipClass: "bg-[#0a0a0a]/8 border border-[#0a0a0a]/15 text-[#6b7280]",
    visual: (
      <div className="flex gap-2 flex-wrap">
        {["#4FC3F7","#4FC3F7","#0a0a0a","#90b4ce"].map((c, i) => (
          <div key={i} className="w-10 h-10 rounded-xl border-2 border-white shadow-sm" style={{ background: c }} />
        ))}
      </div>
    ),
  },
  {
    key: "video",
    title: "Video Library",
    tagline: "Direct AI-generated videos across Veo, Kling, Seedance and more",
    count: "30",
    label: "prompts",
    chips: ["Veo", "Kling", "Seedance", "Higgsfield", "Pika"],
    cover: "/images/image175.png",
    comingSoon: false,
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
    title: "Website Library",
    tagline: "Full-stack UI prompts for Lovable, Bolt, Claude Code and more",
    count: "90+",
    label: "designs",
    chips: ["Lovable", "Bolt", "Claude Code", "Codex", "Replit"],
    cover: "/images/image260.png",
    comingSoon: false,
    bg: "bg-[#0a0a0a]",
    border: "border-[#0a0a0a]/20",
    accentBg: "bg-[#4FC3F7]",
    accentText: "text-[#0a0a0a]",
    taglineColor: "text-white/60",
    countColor: "text-white",
    chipClass: "border border-white/20 text-white/60",
    visual: (
      <div className="flex gap-1">
        {["#4FC3F7","#4FC3F7","#10a37f"].map((c,i) => (
          <div key={i} className="w-3 h-3 rounded-full" style={{ background: c }} />
        ))}
      </div>
    ),
  },
  {
    key: "text",
    title: "Text Library",
    tagline: "Structured prompts for developers, marketers, analysts and more",
    count: "Coming",
    label: "soon",
    chips: ["ChatGPT", "Gemini", "Grok", "Claude"],
    cover: "/images/image40.png",
    comingSoon: true,
    bg: "bg-[#0d1b2a]",
    border: "border-[#0a0a0a]/30",
    accentBg: "bg-[#4FC3F7]",
    accentText: "text-white",
    taglineColor: "text-white/50",
    countColor: "text-white",
    chipClass: "border border-white/15 text-white/50",
    visual: (
      <div className="font-mono text-[10px] text-[#bce4d8]/60 leading-4 space-y-0.5">
        <div>const prompt = <span className="text-[#4FC3F7]">`</span></div>
        <div className="pl-2 text-[#90b4ce]">You are an expert…</div>
        <div><span className="text-[#4FC3F7]">`</span>;</div>
      </div>
    ),
  },
  {
    key: "content",
    title: "Content Library",
    tagline: "Campaigns, copy, and content for every channel and format",
    count: "Coming",
    label: "soon",
    chips: ["ChatGPT", "Gemini", "Claude", "Grok"],
    cover: "/images/image120.png",
    comingSoon: true,
    bg: "bg-gradient-to-br from-[#4FC3F7]/10 to-white",
    border: "border-[#4FC3F7]/20",
    accentBg: "bg-[#4FC3F7]",
    accentText: "text-white",
    taglineColor: "text-[#6b7280]",
    countColor: "text-[#0a0a0a]",
    chipClass: "bg-[#4FC3F7]/10 border border-[#4FC3F7]/20 text-[#0a0a0a]",
    visual: (
      <div className="flex flex-wrap gap-1">
        {["Blog", "Email", "Ad Copy", "Social"].map(t => (
          <span key={t} className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/20 text-[#0a0a0a] text-[10px] font-semibold">{t}</span>
        ))}
      </div>
    ),
  },
];

function LandingCard({ card, go }: { card: typeof FAMILY_CARDS[number]; go: (p: string) => void }) {
  const [hovered, setHovered] = useState(false);
  const [loaded, setLoaded]   = useState(false);

  return (
    <motion.div
      onClick={() => {
        if (card.comingSoon) { toast("Coming Soon", { description: `${card.title} will be available soon.` }); return; }
        go("library:" + card.key);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") { if (card.comingSoon) return; go("library:" + card.key); } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: card.comingSoon ? 0 : -4 }}
      whileTap={{ scale: card.comingSoon ? 1 : 0.99 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="break-inside-avoid mb-5 bg-white rounded-2xl border p-3 cursor-pointer group"
      style={{
        borderColor: hovered ? "#4FC3F7" : "rgba(10,10,10,0.10)",
        boxShadow: hovered
          ? "0 18px 40px -16px rgba(10,10,10,0.20)"
          : "0 1px 2px rgba(10,10,10,0.04)",
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
      }}
    >
      {/* Meta row */}
      <div className="flex items-center justify-between px-1 pt-0.5 pb-2.5">
        <span className="text-[12px] text-[#6b7280]">
          <span className="text-[#0a0a0a] font-bold">{card.count}</span> {card.label}
        </span>
        <span className="w-6 h-6 rounded-full border border-[#0a0a0a]/10 flex items-center justify-center text-[#6b7280] transition-colors group-hover:bg-[#4FC3F7] group-hover:text-[#0a0a0a] group-hover:border-[#4FC3F7]">
          <ArrowRight className="w-3.5 h-3.5" />
        </span>
      </div>

      {/* Cover image */}
      <div className="relative rounded-xl overflow-hidden bg-[#f4f4f5]">
        <img
          src={card.cover}
          alt={card.title}
          className="w-full block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          style={{
            opacity: loaded ? 1 : 0,
            filter: card.comingSoon ? "grayscale(0.45)" : "none",
            transition: "opacity 0.4s ease",
          }}
          onLoad={() => setLoaded(true)}
        />
        {card.comingSoon && (
          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full bg-[#4FC3F7] text-[#0a0a0a] text-[11px] font-bold">
            Coming soon
          </span>
        )}
      </div>

      {/* Title + tagline + chips */}
      <div className="px-1 pt-3 pb-1">
        <h3 className="text-[#0a0a0a] text-[17px] font-bold leading-tight">{card.title}</h3>
        <p className="text-[#6b7280] text-[13px] leading-relaxed mt-1.5">{card.tagline}</p>

        <div className="flex flex-wrap gap-1.5 mt-3">
          {card.chips.map(chip => (
            <span key={chip} className="px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#0a0a0a]/[0.05] text-[#6b7280]">
              {chip}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function LibraryLanding({ go }: { go: (p: string) => void }) {
  return (
    <div className="max-w-[1260px] mx-auto px-6 py-12 text-[#0a0a0a]">
      <div className="mb-10 text-center">
        <h1
          className="text-[#0a0a0a] mb-2"
          style={{ fontSize: "clamp(32px, 5vw, 48px)", fontWeight: 800, letterSpacing: "-0.035em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Prompt Library
        </h1>
        <p className="text-[#6b7280] text-lg max-w-lg mx-auto">Choose a category to explore curated, tested prompts.</p>
      </div>

      {/* ── Bento Grid - PayFlow-style layout ── */}
      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-3"
        style={{ gridTemplateRows: "220px 220px 220px" }}
      >
        {/* Image Library - tall left (1 col × rows 1-2) */}
        <BentoTile
          card={FAMILY_CARDS[0]}
          go={go}
          className="md:row-span-2"
          images={["/images/image6.png", "/images/image72.png", "/images/image144.png", "/images/image286.png"]}
        />
        {/* Video Library - top middle (1 col × row 1) */}
        <BentoTile
          card={FAMILY_CARDS[1]}
          go={go}
          className=""
          images={["/images/image175.png"]}
        />
        {/* Content Library - top right (1 col × row 1) */}
        <BentoTile
          card={FAMILY_CARDS[4]}
          go={go}
          className=""
          images={["/images/image120.png"]}
        />
        {/* Website Library - wide right (2 cols × rows 2-3) */}
        <BentoTile
          card={FAMILY_CARDS[2]}
          go={go}
          className="md:col-span-2 md:row-span-2"
          images={["/images/image260.png"]}
        />
        {/* Text Library - bottom left (1 col × row 3) */}
        <BentoTile
          card={FAMILY_CARDS[3]}
          go={go}
          className=""
          images={["/images/image40.png"]}
        />
      </div>
    </div>
  );
}

function BentoTile({
  card,
  go,
  className = "",
  images,
}: {
  card: typeof FAMILY_CARDS[number];
  go: (p: string) => void;
  className?: string;
  images: string[];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onClick={() => {
        if (card.comingSoon) { toast("Coming Soon", { description: `${card.title} will be available soon.` }); return; }
        go("library:" + card.key);
      }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter") { if (card.comingSoon) return; go("library:" + card.key); } }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: card.comingSoon ? 1 : 0.985 }}
      className={`relative rounded-[20px] overflow-hidden ${card.comingSoon ? "cursor-not-allowed" : "cursor-pointer"} group ${className}`}
      style={{
        background: "#0a0a0a",
        boxShadow: hovered
          ? "0 24px 48px -12px rgba(10,10,10,0.25)"
          : "0 2px 8px rgba(10,10,10,0.08)",
        transition: "box-shadow 0.35s ease",
      }}
    >
      {/* Background image collage */}
      <div className="absolute inset-0">
        {images.length === 1 ? (
          <img
            src={images[0]}
            alt=""
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            style={{ filter: card.comingSoon ? "grayscale(0.5) brightness(0.6)" : "brightness(0.55)" }}
          />
        ) : (
          <div className="w-full h-full grid grid-cols-2 grid-rows-2">
            {images.slice(0, 4).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                style={{ filter: "brightness(0.5)" }}
              />
            ))}
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-5 md:p-6">
        {/* Coming soon badge */}
        {card.comingSoon && (
          <span className="absolute top-4 left-4 px-2.5 py-1 rounded-full bg-[#4FC3F7] text-[#0a0a0a] text-[11px]" style={{ fontWeight: 700 }}>
            Coming soon
          </span>
        )}

        {/* Count pill */}
        <div className="mb-2">
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px]"
            style={{
              background: "rgba(79,195,247,0.2)",
              color: "#4FC3F7",
              fontWeight: 700,
              backdropFilter: "blur(8px)",
            }}
          >
            {card.count} {card.label}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-white leading-tight mb-1"
          style={{ fontSize: "clamp(18px, 2.5vw, 26px)", fontWeight: 800, letterSpacing: "-0.02em" }}
        >
          {card.title}
        </h3>

        {/* Tagline */}
        <p className="text-white/60 text-[13px] leading-relaxed mb-3 max-w-md">{card.tagline}</p>

        {/* Platform chips */}
        <div className="flex flex-wrap gap-1.5">
          {card.chips.map(chip => (
            <span
              key={chip}
              className="px-2 py-0.5 rounded-full text-[10px] text-white/70"
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(4px)",
                fontWeight: 600,
              }}
            >
              {chip}
            </span>
          ))}
        </div>

        {/* Arrow */}
        <motion.div
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: hovered ? "#4FC3F7" : "rgba(255,255,255,0.15)",
            backdropFilter: "blur(8px)",
            transition: "background 0.25s ease",
          }}
          animate={{ x: hovered ? 2 : 0 }}
        >
          <ArrowRight className="w-4 h-4" style={{ color: hovered ? "#0a0a0a" : "#fff" }} />
        </motion.div>
      </div>
    </motion.div>
  );
}


function FilterPill({ active, onClick, children, count }: { active: boolean; onClick: () => void; children: React.ReactNode; count?: number }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-[13px] transition-all ${
        active
          ? "bg-[#4FC3F7] text-white border-[#4FC3F7]"
          : "bg-white border-[#0a0a0a]/15 text-[#3f3f3f] hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a]"
      }`}
      style={active ? { fontWeight: 600 } : {}}
    >
      {children}
      {count !== undefined && (
        <span className={`text-[11px] tabular-nums ${active ? "text-white/70" : "text-[#6b7280]"}`}>
          {count}
        </span>
      )}
    </button>
  );
}

