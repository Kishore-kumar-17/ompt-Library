import { useState, useEffect } from "react";
import {
  Copy, Save, Sparkles, Wand2, ChevronDown, ChevronUp,
  RefreshCw, Check, ArrowRight, Layers, ArrowLeft,
} from "lucide-react";
import { toast } from "sonner";
import { platforms } from "../theme";
import { authStore, builderApi, variablesApi, type EngineLockFields } from "../../lib/api";
import { LockLayerPanel } from "../LockLayerPanel";
import { VariablePanel } from "../VariablePanel";
import { applyVariables } from "../../lib/variables";
import { highlight } from "../../lib/highlight";

// â”€â”€â”€ Enhancement options â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

const STYLES  = ["Cinematic", "Minimalist", "Vintage", "Dark Moody", "Vibrant", "Hyperrealistic", "Anime", "Watercolor", "3D Render", "Sketch", "Oil Painting", "Neon"];
const MOODS   = ["Dramatic", "Peaceful", "Energetic", "Mysterious", "Nostalgic", "Futuristic", "Romantic", "Eerie", "Epic", "Intimate"];
const ASPECTS = ["1:1", "16:9", "9:16", "4:3", "2:3", "3:2", "21:9"];

const FAMILIES = [
  { key: "image",   label: "Image",   desc: "Midjourney, Flux..." },
  { key: "video",   label: "Video",   desc: "Sora, Runway..." },
  { key: "text",    label: "Text",    desc: "ChatGPT, Claude..." },
  { key: "content", label: "Content", desc: "Ads, posts, copy..." },
];

// Image categories drive which lock template the engine applies.
const CATEGORIES = [
  { key: "people-portraits",  label: "People & Portraits" },
  { key: "product-ecommerce", label: "Product & Ecommerce" },
  { key: "fashion-apparel",   label: "Fashion & Apparel" },
  { key: "marketing-ads",     label: "Marketing & Ads" },
  { key: "art-illustration",  label: "Art & Illustration" },
  { key: "trending-viral",    label: "Trending & Viral" },
  { key: "social-media",      label: "Social Media" },
];

// â”€â”€â”€ Chip selector â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function ChipGroup({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-[13px] text-[#6b7280] mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(value === opt ? "" : opt)}
            className={`px-3 py-1 rounded-full text-[12px] border transition-all ${
              value === opt
                ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                : "bg-white border-[#0a0a0a]/20 text-[#6b7280] hover:border-[#0a0a0a]/50 hover:text-[#0a0a0a]"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// â”€â”€â”€ Component â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

export function Builder({ go }: { go: (p: string) => void }) {
  const [idea, setIdea]         = useState("");
  const [family, setFamily]     = useState("image");
  const [style, setStyle]       = useState("");
  const [mood, setMood]         = useState("");
  const [aspect, setAspect]     = useState("16:9");
  const [platform, setPlatform] = useState("midjourney");
  const [showEnhance, setShowEnhance] = useState(true);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  // Generation state
  const [generated, setGenerated]   = useState("");
  const [allPlatformResults, setAllPlatformResults] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading]   = useState(false);
  const [copied, setCopied]         = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [error, setError]           = useState("");
  const [category, setCategory]     = useState("people-portraits");
  const [lockData, setLockData]     = useState<EngineLockFields | null>(null);
  const [vars, setVars]             = useState<Record<string, string>>({});
  const [regenText, setRegenText]   = useState<string | null>(null);
  const [regenerating, setRegen]    = useState(false);
  useEffect(() => { setRegenText(null); }, [platform]);

  const canGenerate = idea.trim().length > 0;
  const variableFields = lockData?.variables ?? [];
  const displayPrompt = regenText ?? applyVariables(generated, vars);

  async function handleRegenerate() {
    if (regenerating || !lockData) return;
    setRegen(true);
    try {
      const res = await variablesApi.expand({ category, platform, brief: vars, title: idea });
      setRegenText(res.finalAssembledText);
      toast.success("Regenerated with your values");
    } catch (err: any) {
      toast.error("Regeneration failed", { description: err?.message });
    } finally {
      setRegen(false);
    }
  }

  async function handleGenerate() {
    if (!canGenerate || isLoading) return;
    setIsLoading(true);
    setError("");
    setHasGenerated(false);
    setAllPlatformResults({});
    setLockData(null);
    setVars({});
    setRegenText(null);

    try {
      const result = await builderApi.generate({
        idea, family, platform,
        style: style || undefined,
        mood: mood || undefined,
        aspect: (family === "image" || family === "video") ? aspect : undefined,
        category: family === "image" ? category : undefined,
      });
      setGenerated(result.prompt);
      setLockData(result);
      // Pre-fill the brief with each variable's default.
      setVars(Object.fromEntries((result.variables ?? []).filter(v => v.default).map(v => [v.name, v.default!])));
      setHasGenerated(true);
    } catch (err: any) {
      setError(err?.message ?? "Generation failed");
      toast.error("Generation failed", { description: err?.message });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleRegenerate() {
    await handleGenerate();
  }

  async function handleGenerateAll() {
    if (!canGenerate || isLoading) return;
    setIsLoading(true);
    setError("");
    setShowAllPlatforms(true);

    const results: Record<string, string> = {};
    try {
      const promises = platforms.map(async (pl) => {
        const result = await builderApi.generate({
          idea, family, platform: pl.key,
          style: style || undefined,
          mood: mood || undefined,
          aspect: (family === "image" || family === "video") ? aspect : undefined,
          category: family === "image" ? category : undefined,
        });
        // Canonical structure per platform: descriptive + (platform-invariant) lock layer.
        results[pl.key] = result.finalAssembledText || result.prompt;
      });
      await Promise.all(promises);
      setAllPlatformResults(results);
      setHasGenerated(true);
    } catch (err: any) {
      setError(err?.message ?? "Generation failed");
      toast.error("Multi-platform generation failed");
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopy() {
    if (!generated) return;
    // Substitute filled variables into the canonical output (locks carry no tokens),
    // or use the AI-regenerated text when present.
    navigator.clipboard?.writeText(regenText ?? applyVariables(lockData?.finalAssembledText || generated, vars));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 text-[#0a0a0a]">

      {/* Header */}
      <div className="mb-8">
        <button onClick={() => go("home")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-3 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <div className="inline-flex items-center gap-2 text-[#0a0a0a] mb-2">
          <Sparkles className="w-4 h-4" /> Prompt Builder
        </div>
        <h1 className="text-3xl font-bold">Describe your idea â€” AI generates a pro prompt</h1>
        <p className="text-[#6b7280] mt-1">
          Powered by the v4.2 Pro Formula with geometry locks, camera rigs, and platform-native formatting.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-6 items-start">

        {/* â”€â”€ Left: Input panel â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="space-y-4 min-w-0">

          {/* Idea input */}
          <div className="bg-white border-2 border-[#0a0a0a]/20 rounded-2xl p-5 focus-within:border-[#4FC3F7] transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="w-4 h-4 text-[#0a0a0a]" />
              <span className="text-[13px] font-semibold">Your idea or scene</span>
            </div>
            <textarea
              rows={3}
              value={idea}
              onChange={(e) => { setIdea(e.target.value); setHasGenerated(false); }}
              placeholder={`Try:\n"a samurai standing in rain at night"\n"luxury perfume bottle on marble surface"\n"write a product launch email for an AI tool"`}
              className="w-full resize-none text-[#0a0a0a] placeholder:text-[#6b7280]/50 text-[15px] outline-none leading-relaxed bg-transparent"
            />
            <div className="text-[11px] text-[#6b7280]/50 mt-1 text-right">{idea.length} chars</div>
          </div>

          {/* Family */}
          <div>
            <div className="text-[13px] text-[#6b7280] mb-2">What are you creating?</div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {FAMILIES.map((f) => (
                <button
                  key={f.key}
                  onClick={() => { setFamily(f.key); setHasGenerated(false); }}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    family === f.key
                      ? "bg-[#0a0a0a] border-[#0a0a0a]"
                      : "bg-white border-[#0a0a0a]/20 hover:border-[#0a0a0a]/40"
                  }`}
                >
                  <div className={`text-[13px] font-semibold ${family === f.key ? "text-white" : "text-[#0a0a0a]"}`}>{f.label}</div>
                  <div className={`text-[10px] mt-0.5 ${family === f.key ? "text-white/70" : "text-[#6b7280]"}`}>{f.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Category (drives the image lock layer) */}
          {family === "image" && (
            <div>
              <div className="text-[13px] text-[#6b7280] mb-2">
                Category <span className="text-[#6b7280]/60">(for lock layer)</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    onClick={() => { setCategory(cat.key); setHasGenerated(false); }}
                    className={`px-3 py-1 rounded-full text-[12px] border transition-all ${
                      category === cat.key
                        ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                        : "bg-white border-[#0a0a0a]/20 text-[#6b7280] hover:border-[#0a0a0a]/50 hover:text-[#0a0a0a]"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhancements */}
          <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowEnhance(!showEnhance)}
              className="w-full flex items-center justify-between px-5 py-3 text-[13px] font-semibold text-[#0a0a0a] hover:bg-[#0a0a0a]/3"
            >
              <span>
                Enhancements{" "}
                <span className="text-[#6b7280] font-normal">(optional)</span>
                {(style || mood) && (
                  <span className="ml-2 px-1.5 py-0.5 rounded-full bg-[#4FC3F7] text-[10px] font-bold text-[#0a0a0a]">
                    {[style, mood].filter(Boolean).length} active
                  </span>
                )}
              </span>
              {showEnhance ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {showEnhance && (
              <div className="px-5 pb-5 space-y-4 border-t border-[#0a0a0a]/10 pt-4">
                <ChipGroup label="Style"       options={STYLES}  value={style}  onChange={(v) => { setStyle(v);  setHasGenerated(false); }} />
                <ChipGroup label="Mood"        options={MOODS}   value={mood}   onChange={(v) => { setMood(v);   setHasGenerated(false); }} />
                {(family === "image" || family === "video") && (
                  <ChipGroup label="Aspect Ratio" options={ASPECTS} value={aspect} onChange={(v) => { setAspect(v); setHasGenerated(false); }} />
                )}
              </div>
            )}
          </div>

          {/* Platform picker */}
          <div>
            <div className="text-[13px] text-[#6b7280] mb-2">Platform</div>
            <div className="flex flex-wrap gap-2">
              {platforms.map((pl) => (
                <button
                  key={pl.key}
                  onClick={() => { setPlatform(pl.key); setHasGenerated(false); }}
                  className={`px-3 py-1.5 rounded-full border text-[13px] transition-all ${
                    platform === pl.key
                      ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                      : "border-[#0a0a0a]/20 text-[#6b7280] hover:text-[#0a0a0a] hover:border-[#0a0a0a]/40"
                  }`}
                >
                  <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: pl.color }} />
                  {pl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={handleGenerate}
            disabled={!canGenerate || isLoading}
            className="w-full h-14 rounded-2xl bg-[#0a0a0a] text-white font-bold text-[16px] flex items-center justify-center gap-3 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0a0a0a]/90 active:scale-[0.98] transition-all shadow-lg shadow-[#0a0a0a]/20"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                Generating with AI...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Generate Pro Prompt
                <ArrowRight className="w-4 h-4 opacity-60" />
              </>
            )}
          </button>
        </div>

        {/* â”€â”€ Right: Output panel (sticky) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
        <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-6 flex flex-col gap-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">

          {/* View toggle */}
          <div className="flex items-center justify-between">
            <div className="text-[13px] font-semibold text-[#0a0a0a]">
              {hasGenerated ? "Generated prompt" : "Output"}
            </div>
            <button
              onClick={() => {
                if (!showAllPlatforms && canGenerate && Object.keys(allPlatformResults).length === 0) {
                  handleGenerateAll();
                } else {
                  setShowAllPlatforms(!showAllPlatforms);
                }
              }}
              disabled={isLoading || !canGenerate}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] border transition-all disabled:opacity-40 ${
                showAllPlatforms
                  ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                  : "border-[#0a0a0a]/20 text-[#6b7280] hover:border-[#0a0a0a]/40 hover:text-[#0a0a0a]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              All platforms
            </button>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-[13px] text-red-600">
              {error}
            </div>
          )}

          {/* Single platform output */}
          {!showAllPlatforms && (
            <div className={`relative rounded-xl border min-h-[220px] p-4 transition-all ${
              hasGenerated ? "bg-[#f8f9ff] border-[#0a0a0a]/20" : "bg-[#f5f5f5] border-[#0a0a0a]/10"
            }`}>
              {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-[#0a0a0a]/40 animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-[13px] text-[#6b7280]">AI is crafting your v4.2 prompt...</span>
                </div>
              ) : hasGenerated ? (
                <pre className="whitespace-pre-wrap font-mono text-[13px] leading-relaxed text-[#0a0a0a]">
                  {variableFields.length > 0 ? highlight(displayPrompt, variableFields.map(v => v.name)) : generated}
                </pre>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
                  <Wand2 className="w-8 h-8 text-[#0a0a0a]/20" />
                  <p className="text-[#6b7280] text-[13px]">
                    {canGenerate
                      ? "Hit Generate to build your prompt"
                      : "Type your idea to get started"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* All platforms output */}
          {showAllPlatforms && (
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#0a0a0a]/40" />
                  <span className="text-[13px] text-[#6b7280]">Generating for all 6 platforms...</span>
                </div>
              ) : (
                platforms.map((pl) => (
                  <div key={pl.key} className="rounded-xl border border-[#0a0a0a]/10 p-3 bg-[#f8f9ff]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: pl.color }} />
                      <span className="text-[12px] font-semibold text-[#0a0a0a]">{pl.name}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(allPlatformResults[pl.key] ?? "");
                          toast.success(`Copied ${pl.name} prompt`);
                        }}
                        className="ml-auto text-[11px] text-[#6b7280] hover:text-[#0a0a0a] flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                    <pre className="font-mono text-[11px] text-[#6b7280] leading-relaxed whitespace-pre-wrap max-h-[200px] overflow-y-auto">
                      {allPlatformResults[pl.key] ?? "â€”"}
                    </pre>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Variable layer */}
          {hasGenerated && !showAllPlatforms && variableFields.length > 0 && (
            <VariablePanel
              variables={variableFields}
              values={vars}
              onChange={(name, value) => setVars(prev => ({ ...prev, [name]: value }))}
              onRegenerate={handleRegenerate}
              regenerating={regenerating}
            />
          )}

          {/* Active tags */}
          {hasGenerated && (style || mood || aspect) && !showAllPlatforms && (
            <div className="flex flex-wrap gap-1.5">
              {style  && <span className="px-2 py-0.5 rounded-full bg-[#0a0a0a]/8 text-[11px] text-[#0a0a0a]">{style}</span>}
              {mood   && <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/10 text-[11px] text-[#0a0a0a]">{mood}</span>}
              {(family === "image" || family === "video") && aspect && (
                <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/30 text-[11px] text-[#0a0a0a]">{aspect}</span>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">

            {/* Regenerate */}
            <button
              onClick={handleRegenerate}
              disabled={!canGenerate || isLoading}
              className="h-11 rounded-xl border border-[#0a0a0a]/20 text-[#0a0a0a] text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#0a0a0a]/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              <RefreshCw className="w-4 h-4" />
              Regenerate
            </button>

            {/* Copy */}
            <button
              onClick={handleCopy}
              disabled={!hasGenerated || isLoading}
              className="h-11 rounded-xl bg-[#4FC3F7] text-[#0a0a0a] text-[13px] font-bold flex items-center justify-center gap-2 hover:bg-[#4FC3F7]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied!" : "Copy"}
            </button>

            {/* Save */}
            <button
              onClick={() => {
                if (!authStore.getUser()) { toast.error("Sign in to save prompts"); return; }
                toast.success("Saved to library", { description: `${platform} Â· ${family}` });
              }}
              disabled={!hasGenerated || isLoading}
              className="h-11 rounded-xl border border-[#0a0a0a]/20 text-[#0a0a0a] text-[13px] font-semibold flex items-center justify-center gap-2 hover:bg-[#0a0a0a]/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all col-span-2"
            >
              <Save className="w-4 h-4" />
              Save to Library
            </button>
          </div>
        </div>
      </div>

      {/* Engine lock layer (image only) */}
      {hasGenerated && lockData && (
        <div className="mt-6">
          <LockLayerPanel
            categoryLabel={lockData.categoryLabel}
            lockSection={lockData.lockSection}
            negativeLocks={lockData.negativeLocks}
            validation={lockData.validation}
          />
        </div>
      )}
    </div>
  );
}
