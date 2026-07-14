import { useState, useEffect, useMemo, useCallback } from "react";
import { toast } from "sonner";
import { motion } from "motion/react";
import {
  ThumbsUp, ThumbsDown, Copy, Loader2, ArrowLeft, Layers,
  AlertTriangle, ChevronDown, ChevronLeft, ChevronRight,
  Columns2, LayoutGrid, Star,
} from "lucide-react";
import { platforms } from "../theme";
import { imageLibraryPrompts } from "../../lib/library-data";

// ─── Prompt structure analysis ──────────────────────────────────────────────

interface PromptStructure {
  description: string;
  locks: { label: string; value: string }[];
  negativeLocks: string[];
}

function parsePromptStructure(text: string): PromptStructure {
  const lockLayerIdx = text.indexOf("LOCK LAYER");
  const negativeLockIdx = text.indexOf("NEGATIVE LOCKS");

  const description = lockLayerIdx !== -1
    ? text.slice(0, lockLayerIdx).trim()
    : text.trim();

  const locks: { label: string; value: string }[] = [];
  const negativeLocks: string[] = [];

  if (lockLayerIdx !== -1) {
    const lockSection = negativeLockIdx !== -1
      ? text.slice(lockLayerIdx, negativeLockIdx)
      : text.slice(lockLayerIdx);
    const lockMatches = lockSection.matchAll(/LOCK\s+\d+\s*-\s*([^:]+):\s*(.+)/g);
    for (const m of lockMatches) {
      locks.push({ label: m[1].trim(), value: m[2].trim() });
    }
  }

  if (negativeLockIdx !== -1) {
    const negSection = text.slice(negativeLockIdx);
    const lines = negSection.split("\n").filter(l => l.trim().startsWith("- No") || l.trim().startsWith("-No"));
    for (const l of lines) {
      negativeLocks.push(l.trim().replace(/^-\s*/, ""));
    }
  }

  return { description, locks, negativeLocks };
}

function analyzeStyle(text: string): { label: string; detail: string }[] {
  const traits: { label: string; detail: string }[] = [];

  if (text.includes(" :: ")) traits.push({ label: "Separator", detail: ":: (double colon)" });
  else if (text.includes(" \u2014 ")) traits.push({ label: "Separator", detail: "em-dash" });
  else traits.push({ label: "Separator", detail: "Commas / spaces" });

  const mjFlags = text.match(/--\w+/g);
  if (mjFlags && mjFlags.length > 0) {
    traits.push({ label: "Platform flags", detail: mjFlags.join("  ") });
  }

  if (/\b(Subject|Composition|Medium|Light|Material physics|Palette|References):/i.test(text)) {
    traits.push({ label: "Format", detail: "Labeled sections" });
  } else if (text.length > 500) {
    traits.push({ label: "Format", detail: "Flowing prose" });
  } else {
    traits.push({ label: "Format", detail: "Compressed keywords" });
  }

  const wordCount = text.split(/\s+/).length;
  traits.push({ label: "Words", detail: `~${Math.round(wordCount / 10) * 10}` });

  const charCount = text.length;
  traits.push({ label: "Chars", detail: String(charCount) });

  if (text.includes("--no ")) traits.push({ label: "Negatives", detail: "--no flag" });
  else if (text.includes("Exclude:")) traits.push({ label: "Negatives", detail: "Exclude:" });

  return traits;
}

// ─── Platform metadata ─────────────────────────────────────────────────────

const platformHints: Record<string, string> = {
  chatgpt:    "Full natural language with em-dash separators. Verbose, descriptive prose.",
  gemini:     "Compressed comma-separated keywords. Shorter than ChatGPT, drops articles.",
  grok:       "Most compressed. Minimal keywords, stripped to essentials.",
  midjourney: ":: separators, --ar --v --stylize --style --q --no flags at end.",
  firefly:    "Short descriptive phrases. Keyword-focused, Adobe-optimized.",
  flux:       "Labeled sections (Subject:, Composition:, Medium:). Structured natural language.",
};

const platformBestFor: Record<string, { label: string; color: string }> = {
  chatgpt:    { label: "Best for detailed concepts", color: "#10a37f" },
  gemini:     { label: "Best for multimodal", color: "#4285f4" },
  grok:       { label: "Best for quick drafts", color: "#094067" },
  midjourney: { label: "Best for stylized art", color: "#ef4565" },
  firefly:    { label: "Best for brand-safe", color: "#ffd803" },
  flux:       { label: "Best for photorealism", color: "#90b4ce" },
};

const CHAR_LIMITS: Record<string, number> = {
  midjourney: 6000,
  firefly: 2000,
};

// ─── Diff highlighting ─────────────────────────────────────────────────────

function highlightPlatformSyntax(text: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let key = 0;

  // Patterns to highlight
  const patterns: { regex: RegExp; className: string }[] = [
    { regex: /--\w+\s*[^\s,]*/g, className: "text-[#4FC3F7] font-semibold" },           // MJ flags
    { regex: / :: /g, className: "text-[#ef4565] font-bold" },                            // MJ separators
    { regex: /\b(Subject|Composition|Medium|Light|Material physics|Palette|References):/gi, className: "text-[#10a37f] font-semibold" }, // FLUX labels
    { regex: /\[SUBJECT\]|\[THEME\]/gi, className: "bg-amber-100 text-amber-800 px-0.5 rounded" }, // Variables
    { regex: /#[0-9A-Fa-f]{6}/g, className: "text-[#7C3AED] font-mono" },                 // Hex colors
  ];

  // Simple approach: find all matches, sort by position, render
  const allMatches: { start: number; end: number; text: string; className: string }[] = [];
  for (const p of patterns) {
    const regex = new RegExp(p.regex.source, p.regex.flags);
    let match;
    while ((match = regex.exec(text)) !== null) {
      allMatches.push({ start: match.index, end: match.index + match[0].length, text: match[0], className: p.className });
    }
  }
  allMatches.sort((a, b) => a.start - b.start);

  // Remove overlaps
  const filtered: typeof allMatches = [];
  let lastEnd = 0;
  for (const m of allMatches) {
    if (m.start >= lastEnd) {
      filtered.push(m);
      lastEnd = m.end;
    }
  }

  let pos = 0;
  for (const m of filtered) {
    if (m.start > pos) {
      parts.push(<span key={key++}>{text.slice(pos, m.start)}</span>);
    }
    parts.push(<span key={key++} className={m.className}>{m.text}</span>);
    pos = m.end;
  }
  if (pos < text.length) {
    parts.push(<span key={key++}>{text.slice(pos)}</span>);
  }

  return parts;
}

// ─── Component ──────────────────────────────────────────────────────────────

export function Compare({ go }: { go: (p: string) => void }) {
  // Derived from the actual dataset, so it can never drift out of sync with it.
  const ALL_CATEGORIES = useMemo(
    () => Array.from(new Set(imageLibraryPrompts.map(p => p.category))).sort(),
    []
  );
  const categoryCounts = useMemo(
    () => ALL_CATEGORIES.map(name => ({ name, count: imageLibraryPrompts.filter(p => p.category === name).length })),
    [ALL_CATEGORIES]
  );
  const [promptId, setPromptId] = useState(imageLibraryPrompts[0].id);
  const [platformData, setPlatformData] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"prompt" | "sidebyside" | "structure">("prompt");
  const [catFilter, setCatFilter] = useState<string | null>(null);

  // Side-by-side platform picks
  const [leftPl, setLeftPl] = useState(platforms[0].key);
  const [rightPl, setRightPl] = useState(platforms[3].key);

  const prompt = imageLibraryPrompts.find(x => x.id === promptId) ?? imageLibraryPrompts[0];

  // Filtered prompts by category
  const filteredPrompts = useMemo(() => {
    if (!catFilter) return imageLibraryPrompts;
    return imageLibraryPrompts.filter(p => p.category === catFilter);
  }, [catFilter]);

  // Keep promptId valid when filter changes
  useEffect(() => {
    if (filteredPrompts.length > 0 && !filteredPrompts.find(p => p.id === promptId)) {
      setPromptId(filteredPrompts[0].id);
    }
  }, [filteredPrompts, promptId]);

  // Lazy-load platform versions
  useEffect(() => {
    setPlatformData(null);
    setLoading(true);
    setExpandedCard(null);
    import("../../lib/library-platforms-locked").then(m => {
      const versions = m.platformVersions[prompt.slug ?? ""] ?? {};
      setPlatformData(versions);
    }).finally(() => setLoading(false));
  }, [prompt.slug]);

  const [votes, setVotes] = useState<Record<string, "up" | "down" | null>>({});
  const vote = (key: string, dir: "up" | "down") => setVotes(v => ({ ...v, [key]: v[key] === dir ? null : dir }));

  // Parse all platform structures
  const structures = useMemo(() => {
    if (!platformData) return {};
    const result: Record<string, { structure: PromptStructure; style: { label: string; detail: string }[] }> = {};
    for (const pl of platforms) {
      const text = platformData[pl.key]?.trim();
      if (text) {
        result[pl.key] = {
          structure: parsePromptStructure(text),
          style: analyzeStyle(text),
        };
      }
    }
    return result;
  }, [platformData]);

  // Keyboard navigation: left/right arrows to switch prompts
  const currentIdx = filteredPrompts.findIndex(p => p.id === promptId);
  const goToPrev = useCallback(() => {
    if (currentIdx > 0) setPromptId(filteredPrompts[currentIdx - 1].id);
  }, [currentIdx, filteredPrompts]);
  const goToNext = useCallback(() => {
    if (currentIdx < filteredPrompts.length - 1) setPromptId(filteredPrompts[currentIdx + 1].id);
  }, [currentIdx, filteredPrompts]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLSelectElement ||
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLButtonElement ||
        e.target instanceof HTMLTextAreaElement
      ) return;
      if (e.key === "ArrowLeft") { e.preventDefault(); goToPrev(); }
      if (e.key === "ArrowRight") { e.preventDefault(); goToNext(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goToPrev, goToNext]);

  // Copy all versions
  const copyAll = () => {
    if (!platformData) return;
    const allText = platforms
      .map(pl => {
        const text = platformData[pl.key]?.trim();
        if (!text) return null;
        return `=== ${pl.name.toUpperCase()} ===\n\n${text}`;
      })
      .filter(Boolean)
      .join("\n\n\n");
    navigator.clipboard?.writeText(allText);
    toast.success("All platform versions copied");
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-[#0a0a0a]">
      {/* Header */}
      <div className="mb-6">
        <button onClick={() => go("library")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-3 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
        </button>
        <h1 className="text-3xl font-bold">Compare <span className="font-extrabold">Platforms</span></h1>
        <p className="text-[#6b7280] mt-1">See how the same prompt is structured differently for ChatGPT, Gemini, Grok, Midjourney, Firefly, and FLUX.</p>
      </div>

      {/* Category filter */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => setCatFilter(null)}
          className={`px-3 py-1.5 rounded-full border text-[12px] transition-all ${!catFilter ? "bg-[#4FC3F7] text-white border-[#4FC3F7]" : "bg-white border-[#0a0a0a]/15 text-[#6b7280] hover:text-[#0a0a0a]"}`}
          style={{ fontWeight: 600 }}
        >
          All ({imageLibraryPrompts.length})
        </button>
        {categoryCounts.map(({ name: c, count }) => (
          <button
            key={c}
            onClick={() => setCatFilter(catFilter === c ? null : c)}
            className={`px-3 py-1.5 rounded-full border text-[12px] transition-all ${catFilter === c ? "bg-[#4FC3F7] text-white border-[#4FC3F7]" : "bg-white border-[#0a0a0a]/15 text-[#6b7280] hover:text-[#0a0a0a]"}`}
            style={{ fontWeight: 600 }}
          >
            {c} ({count})
          </button>
        ))}
      </div>

      {/* Prompt selector + image preview + nav */}
      <div className="grid md:grid-cols-[1fr_160px] gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[#6b7280] text-[13px]" style={{ fontWeight: 600 }}>Select a prompt</span>
            <span className="text-[#6b7280]/50 text-[11px] ml-auto">Use arrow keys to navigate</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={goToPrev}
              disabled={currentIdx <= 0}
              aria-label="Previous prompt"
              className="shrink-0 w-8 h-10 rounded-lg border border-[#0a0a0a]/10 flex items-center justify-center text-[#6b7280] hover:text-[#0a0a0a] disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <select
              value={promptId}
              onChange={e => setPromptId(e.target.value)}
              className="h-10 px-3 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/10 text-[#0a0a0a] flex-1 min-w-0"
            >
              {filteredPrompts.map(x => (
                <option key={x.id} value={x.id}>{x.title}</option>
              ))}
            </select>
            <button
              onClick={goToNext}
              disabled={currentIdx >= filteredPrompts.length - 1}
              aria-label="Next prompt"
              className="shrink-0 w-8 h-10 rounded-lg border border-[#0a0a0a]/10 flex items-center justify-center text-[#6b7280] hover:text-[#0a0a0a] disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-[#6b7280] text-[11px]">{prompt.category}</span>
            <span className="text-[#6b7280]/30 text-[11px]">|</span>
            <span className="text-[#6b7280] text-[11px]">{currentIdx + 1} of {filteredPrompts.length}</span>
          </div>
        </div>
        {prompt.image && (
          <div className="rounded-xl overflow-hidden border border-[#0a0a0a]/10 bg-[#f5f5f5] aspect-square w-32 md:w-auto mx-auto md:mx-0">
            <img src={prompt.image} alt={prompt.title} className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      {/* Tab bar + actions */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        <div className="flex gap-1 bg-[#0a0a0a]/5 rounded-xl p-1">
          {([
            { key: "prompt" as const, label: "All Platforms", icon: LayoutGrid },
            { key: "sidebyside" as const, label: "Side by Side", icon: Columns2 },
            { key: "structure" as const, label: "Structure", icon: Layers },
          ]).map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-3 py-2 rounded-lg text-[12px] flex items-center gap-1.5 transition-all ${activeTab === tab.key ? "bg-white text-[#0a0a0a] shadow-sm" : "text-[#6b7280] hover:text-[#0a0a0a]"}`}
                style={{ fontWeight: 600 }}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <button
          onClick={copyAll}
          className="ml-auto inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[#0a0a0a]/10 text-[12px] text-[#0a0a0a] hover:bg-[#0a0a0a]/5 transition-colors"
          style={{ fontWeight: 600 }}
        >
          <Copy className="w-3.5 h-3.5" /> Copy All Versions
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-[#6b7280]">
          <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading platform versions...
        </div>
      ) : activeTab === "prompt" ? (
        /* ── All Platforms View ── */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {platforms.map((pl) => (
            <PlatformCard
              key={pl.key}
              pl={pl}
              text={platformData?.[pl.key]?.trim() || ""}
              parsed={structures[pl.key]}
              expanded={expandedCard === pl.key}
              onToggleExpand={() => setExpandedCard(expandedCard === pl.key ? null : pl.key)}
              vote={votes[pl.key] ?? null}
              onVote={(dir) => vote(pl.key, dir)}
            />
          ))}
        </div>
      ) : activeTab === "sidebyside" ? (
        /* ── Side by Side View ── */
        <div>
          <div className="flex items-center gap-4 mb-4">
            <PlatformSelect value={leftPl} onChange={setLeftPl} exclude={rightPl} />
            <span className="text-[#6b7280] text-[13px] shrink-0" style={{ fontWeight: 700 }}>vs</span>
            <PlatformSelect value={rightPl} onChange={setRightPl} exclude={leftPl} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[leftPl, rightPl].map(plKey => {
              const pl = platforms.find(p => p.key === plKey)!;
              return (
                <PlatformCard
                  key={pl.key}
                  pl={pl}
                  text={platformData?.[pl.key]?.trim() || ""}
                  parsed={structures[pl.key]}
                  expanded={true}
                  onToggleExpand={() => {}}
                  vote={votes[pl.key] ?? null}
                  onVote={(dir) => vote(pl.key, dir)}
                  showFullByDefault
                />
              );
            })}
          </div>
        </div>
      ) : (
        /* ── Structure Comparison View ── */
        <div className="space-y-6">
          {/* Structure overview table */}
          <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-[#0a0a0a]/10">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#4FC3F7]" />
                <span className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>Prompt Structure by Platform</span>
              </div>
              <p className="text-[#6b7280] text-[12px] mt-1">How the same content is formatted differently for each AI platform.</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-[#0a0a0a]/5 text-[#6b7280] text-[12px]">
                  <tr>
                    <th className="text-left p-3" style={{ fontWeight: 600 }}>Platform</th>
                    <th className="text-left p-3" style={{ fontWeight: 600 }}>Best For</th>
                    <th className="text-left p-3" style={{ fontWeight: 600 }}>Syntax Style</th>
                    <th className="text-left p-3" style={{ fontWeight: 600 }}>Separator</th>
                    <th className="text-left p-3" style={{ fontWeight: 600 }}>Words</th>
                    <th className="text-left p-3" style={{ fontWeight: 600 }}>Chars</th>
                    <th className="text-left p-3" style={{ fontWeight: 600 }}>Flags</th>
                  </tr>
                </thead>
                <tbody>
                  {platforms.map(pl => {
                    const parsed = structures[pl.key];
                    if (!parsed) return (
                      <tr key={pl.key} className="border-t border-[#0a0a0a]/10">
                        <td className="p-3">
                          <span className="inline-flex items-center gap-2 text-[#0a0a0a]" style={{ fontWeight: 600 }}>
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: pl.color }} />
                            {pl.name}
                          </span>
                        </td>
                        <td className="p-3 text-[#6b7280] text-[12px]" colSpan={6}>Not applicable</td>
                      </tr>
                    );
                    const traits = Object.fromEntries(parsed.style.map(s => [s.label, s.detail]));
                    const charCount = parseInt(traits["Chars"] ?? "0");
                    const limit = CHAR_LIMITS[pl.key];
                    const nearLimit = limit && charCount > limit * 0.8;
                    const bestFor = platformBestFor[pl.key];

                    return (
                      <tr key={pl.key} className="border-t border-[#0a0a0a]/10">
                        <td className="p-3">
                          <span className="inline-flex items-center gap-2 text-[#0a0a0a]" style={{ fontWeight: 600 }}>
                            <span className="w-2.5 h-2.5 rounded-full" style={{ background: pl.color }} />
                            {pl.name}
                          </span>
                        </td>
                        <td className="p-3">
                          {bestFor && (
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]" style={{ background: `${bestFor.color}18`, color: bestFor.color, fontWeight: 700 }}>
                              <Star className="w-2.5 h-2.5" />
                              {bestFor.label.replace("Best for ", "")}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-[#0a0a0a] text-[12px]">{traits["Format"] ?? "-"}</td>
                        <td className="p-3 text-[#0a0a0a] text-[12px] font-mono">{traits["Separator"] ?? "-"}</td>
                        <td className="p-3 text-[#0a0a0a] text-[12px]">{traits["Words"] ?? "-"}</td>
                        <td className="p-3 text-[12px]">
                          <span className={nearLimit ? "text-amber-600 font-semibold" : "text-[#0a0a0a]"}>
                            {traits["Chars"] ?? "-"}
                          </span>
                          {limit && (
                            <span className={`text-[10px] ml-1 ${nearLimit ? "text-amber-500" : "text-[#6b7280]"}`}>
                              / {limit}
                            </span>
                          )}
                        </td>
                        <td className="p-3 text-[12px]">
                          {traits["Platform flags"] ? (
                            <span className="font-mono text-[#4FC3F7]">{traits["Platform flags"]}</span>
                          ) : (
                            <span className="text-[#6b7280]">None</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Lock Layer comparison */}
          {(() => {
            const firstParsed = Object.values(structures)[0];
            if (!firstParsed || firstParsed.structure.locks.length === 0) return null;
            return (
              <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#0a0a0a]/10">
                  <div className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <span className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>Lock Layer</span>
                    <span className="text-[#6b7280] text-[12px] ml-2">Shared across all platforms</span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  {firstParsed.structure.locks.map((lock, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="shrink-0 mt-0.5 px-2 py-0.5 rounded text-[10px] bg-[#4FC3F7]/15 text-[#4FC3F7] font-mono" style={{ fontWeight: 700 }}>
                        LOCK {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <span className="text-[#0a0a0a] text-[13px]" style={{ fontWeight: 700 }}>{lock.label}</span>
                        <p className="text-[#6b7280] text-[12px] mt-0.5" style={{ lineHeight: 1.5 }}>{lock.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* Negative Locks */}
          {(() => {
            const firstParsed = Object.values(structures)[0];
            if (!firstParsed || firstParsed.structure.negativeLocks.length === 0) return null;
            return (
              <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl overflow-hidden">
                <div className="p-4 border-b border-[#0a0a0a]/10">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <span className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>Negative Locks</span>
                    <span className="text-[#6b7280] text-[12px] ml-2">What to avoid - shared across platforms</span>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid md:grid-cols-2 gap-2">
                    {firstParsed.structure.negativeLocks.map((neg, i) => (
                      <div key={i} className="flex items-start gap-2 text-[12px]">
                        <span className="shrink-0 mt-0.5 w-1.5 h-1.5 rounded-full bg-red-400" />
                        <span className="text-[#6b7280]">{neg}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Platform syntax snippets with diff highlighting */}
          <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl overflow-hidden">
            <div className="p-4 border-b border-[#0a0a0a]/10">
              <span className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>Platform Syntax Differences</span>
              <p className="text-[#6b7280] text-[12px] mt-1">Syntax highlighted: <span className="text-[#4FC3F7]">flags</span> <span className="text-[#ef4565]">separators</span> <span className="text-[#10a37f]">labels</span> <span className="bg-amber-100 text-amber-800 px-0.5 rounded">variables</span> <span className="text-[#7C3AED]">colors</span></p>
            </div>
            <div className="divide-y divide-[#0a0a0a]/10">
              {platforms.map(pl => {
                const parsed = structures[pl.key];
                if (!parsed) return null;
                const snippet = parsed.structure.description.slice(0, 300);
                const bestFor = platformBestFor[pl.key];
                return (
                  <div key={pl.key} className="p-4">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: pl.color }} />
                      <span className="text-[#0a0a0a] text-[13px]" style={{ fontWeight: 700 }}>{pl.name}</span>
                      {bestFor && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]" style={{ background: `${bestFor.color}18`, color: bestFor.color, fontWeight: 700 }}>
                          <Star className="w-2.5 h-2.5" /> {bestFor.label}
                        </span>
                      )}
                      <span className="text-[#6b7280] text-[10px] ml-auto">{platformHints[pl.key]}</span>
                    </div>
                    <pre className="whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed bg-[#0a0a0a]/3 rounded-lg p-3">
                      {highlightPlatformSyntax(snippet)}...
                    </pre>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Platform Card ──────────────────────────────────────────────────────────

function PlatformCard({
  pl,
  text,
  parsed,
  expanded,
  onToggleExpand,
  vote,
  onVote,
  showFullByDefault = false,
}: {
  pl: typeof platforms[number];
  text: string;
  parsed?: { structure: PromptStructure; style: { label: string; detail: string }[] };
  expanded: boolean;
  onToggleExpand: () => void;
  vote: "up" | "down" | null;
  onVote: (dir: "up" | "down") => void;
  showFullByDefault?: boolean;
}) {
  const isNA = !text;
  const descriptionText = parsed?.structure.description ?? text;
  const isExpanded = showFullByDefault || expanded;
  const displayText = isExpanded ? descriptionText : descriptionText.slice(0, 300);
  const isTruncated = !showFullByDefault && descriptionText.length > 300;
  const bestFor = platformBestFor[pl.key];
  const charCount = text.length;
  const limit = CHAR_LIMITS[pl.key];
  const nearLimit = limit && charCount > limit * 0.8;

  return (
    <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl overflow-hidden flex flex-col">
      {/* Platform header */}
      <div className="flex items-center gap-2 p-4 pb-0 flex-wrap">
        <span className="w-3 h-3 rounded-full shrink-0" style={{ background: pl.color }} />
        <div className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>{pl.name}</div>
        {bestFor && (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]" style={{ background: `${bestFor.color}18`, color: bestFor.color, fontWeight: 700 }}>
            <Star className="w-2.5 h-2.5" /> {bestFor.label}
          </span>
        )}
        <span className="ml-auto text-[10px] text-[#6b7280] px-2 py-0.5 rounded-full bg-[#0a0a0a]/5" style={{ fontWeight: 600 }}>
          {platformHints[pl.key]?.split(".")[0]}
        </span>
      </div>

      <div className="p-4 flex-1 flex flex-col">
        {isNA ? (
          <div className="text-[#6b7280]/40 italic text-[13px] py-8 text-center">Not applicable for this prompt</div>
        ) : (
          <>
            {/* Prompt text with syntax highlighting */}
            <pre className="whitespace-pre-wrap break-words font-mono text-[12px] leading-relaxed flex-1">
              {highlightPlatformSyntax(displayText)}{!isExpanded && isTruncated ? "..." : ""}
            </pre>

            {isTruncated && (
              <button
                onClick={onToggleExpand}
                className="text-[#4FC3F7] text-[12px] mt-2 flex items-center gap-1 hover:underline"
                style={{ fontWeight: 600 }}
              >
                <ChevronDown className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`} />
                {expanded ? "Show less" : "Show full prompt"}
              </button>
            )}

            {/* Style traits + char count */}
            {parsed && (
              <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-[#0a0a0a]/10">
                {parsed.style.map((s, i) => (
                  <span key={i} className="px-2 py-0.5 rounded-full text-[10px] bg-[#0a0a0a]/5 text-[#6b7280]" style={{ fontWeight: 600 }}>
                    {s.label}: {s.detail}
                  </span>
                ))}
                {limit && (
                  <span className={`px-2 py-0.5 rounded-full text-[10px] ${nearLimit ? "bg-amber-100 text-amber-700" : "bg-[#0a0a0a]/5 text-[#6b7280]"}`} style={{ fontWeight: 600 }}>
                    {nearLimit && <AlertTriangle className="w-2.5 h-2.5 inline mr-0.5" />}
                    {charCount}/{limit} char limit
                  </span>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#0a0a0a]/10">
              <button
                onClick={() => { navigator.clipboard?.writeText(text); toast.success(`Copied ${pl.name} version`); }}
                className="text-[#0a0a0a] inline-flex items-center gap-1 text-[12px] hover:text-[#4FC3F7] transition-colors"
                style={{ fontWeight: 600 }}
              >
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
              <span className="ml-auto inline-flex items-center gap-1.5">
                <button onClick={() => onVote("up")} aria-label="This version was helpful" className={`p-1 rounded-md transition-colors ${vote === "up" ? "bg-[#4FC3F7]/20 text-[#4FC3F7]" : "text-[#6b7280] hover:text-[#0a0a0a]"}`}><ThumbsUp className="w-3.5 h-3.5" /></button>
                <button onClick={() => onVote("down")} aria-label="This version was not helpful" className={`p-1 rounded-md transition-colors ${vote === "down" ? "bg-red-100 text-red-500" : "text-[#6b7280] hover:text-[#0a0a0a]"}`}><ThumbsDown className="w-3.5 h-3.5" /></button>
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Platform Selector (for side-by-side) ───────────────────────────────────

function PlatformSelect({ value, onChange, exclude }: { value: string; onChange: (v: string) => void; exclude: string }) {
  return (
    <div className="flex-1">
      <div className="flex gap-1.5 flex-wrap">
        {platforms.map(pl => (
          <button
            key={pl.key}
            onClick={() => onChange(pl.key)}
            disabled={pl.key === exclude}
            className={`px-3 py-1.5 rounded-full text-[12px] transition-all border-2 ${
              value === pl.key
                ? "text-white border-transparent"
                : pl.key === exclude
                ? "bg-[#0a0a0a]/5 text-[#6b7280]/30 border-transparent cursor-not-allowed"
                : "bg-white text-[#6b7280] border-[#0a0a0a]/10 hover:border-[#0a0a0a]/30"
            }`}
            style={{
              fontWeight: 700,
              ...(value === pl.key ? { background: pl.color } : {}),
            }}
          >
            {pl.name}
          </button>
        ))}
      </div>
    </div>
  );
}
