import { useState, useEffect } from "react";
import { Wand2, Copy, Check, RefreshCw, ArrowLeft, Image, Video, FileText, PenTool, Globe, Save } from "lucide-react";
import { toast } from "sonner";
import { platforms, videoPlatforms, websitePlatforms } from "../theme";
import { improverApi, variablesApi, authStore, type ImproverResult } from "../../lib/api";
import { LockLayerPanel } from "../LockLayerPanel";
import { VariablePanel } from "../VariablePanel";
import { highlight } from "../../lib/highlight";
import { useEngineOutput } from "../../lib/useEngineOutput";

// ─── Family definitions ──────────────────────────────────────────────────────

const FAMILIES = [
  { key: "image",   label: "Image",   icon: Image,    desc: "Midjourney, FLUX, Firefly..." },
  { key: "video",   label: "Video",   icon: Video,    desc: "Veo, Kling, Pika..." },
  { key: "website", label: "Website", icon: Globe,     desc: "Lovable, Bolt, v0..." },
  { key: "text",    label: "Text",    icon: FileText,  desc: "ChatGPT, Gemini, Grok..." },
  { key: "content", label: "Content", icon: PenTool,   desc: "Ads, posts, copy..." },
] as const;

function getPlatformsForFamily(family: string) {
  switch (family) {
    case "video":   return videoPlatforms;
    case "website": return websitePlatforms;
    default:        return platforms;
  }
}

function getDefaultPlatform(family: string) {
  switch (family) {
    case "video":   return "veo";
    case "website": return "lovable";
    default:        return "chatgpt";
  }
}

// Mirrors backend CATEGORY_LABELS (routes/improver.ts) — the rule engine's
// subject-category classifier can misdetect (e.g. defaulting a non-portrait
// idea to "people"), so the detected category is shown and correctable here
// rather than silently driving wardrobe/skin sections the user never asked for.
const RULE_ENGINE_CATEGORIES = [
  { key: "people",  label: "People & Portraits" },
  { key: "fashion", label: "Fashion & Apparel" },
  { key: "product", label: "Product & Ecommerce" },
  { key: "art",     label: "Art & Illustration" },
  { key: "social",  label: "Social & Content" },
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export function Improver({ go }: { go: (p: string) => void }) {
  const [input, setInput]     = useState("");
  const [family, setFamily]   = useState("image");
  const [platform, setPlatform] = useState("chatgpt");
  const [result, setResult]   = useState<ImproverResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [error, setError]     = useState("");
  const output = useEngineOutput(result, result?.improved ?? "");
  const { vars, setVars, regenText, setRegenText, variableFields, displayText } = output;
  const [regenerating, setRegen]  = useState(false);
  // Explicit category override — null means "trust the rule engine's own
  // detection." Set when the user corrects a misclassified category.
  const [categoryOverride, setCategoryOverride] = useState<string | null>(null);
  useEffect(() => { setRegenText(null); }, [platform]);

  // Reset platform when family changes
  useEffect(() => {
    setPlatform(getDefaultPlatform(family));
    setResult(null);
    setError("");
    setCategoryOverride(null);
  }, [family]);

  const activePlatforms = getPlatformsForFamily(family);

  async function handleRegenerate() {
    if (regenerating || !result) return;
    setRegen(true);
    try {
      const res = await variablesApi.expand({ category: result.categoryId ?? "", platform, brief: vars });
      setRegenText(res.finalAssembledText);
      toast.success("Regenerated with your values");
    } catch (err: any) {
      toast.error("Regeneration failed", { description: err?.message });
    } finally {
      setRegen(false);
    }
  }

  async function run(overrideCategory?: string) {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    output.resetForNewRun();

    try {
      const category = overrideCategory ?? categoryOverride ?? undefined;
      const res = await improverApi.improve({ prompt: input, platform, family, category });
      setResult(res);
      output.prefillFromResult(res);
    } catch (err: any) {
      setError(err?.message ?? "Improvement failed");
      toast.error("Improvement failed", { description: err?.message });
    } finally {
      setLoading(false);
    }
  }

  function handleCategoryOverride(key: string) {
    if (loading || key === result?.categoryId) return;
    setCategoryOverride(key);
    run(key);
  }

  function handleCopy() {
    if (!result?.improved) return;
    navigator.clipboard?.writeText(displayText);
    setCopied(true);
    toast.success("Prompt copied");
    setTimeout(() => setCopied(false), 2000);
  }

  const changes = result?.changes ?? [];
  const appliedCount = changes.filter(c => c.applied).length;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 text-[#0a0a0a]">
      <div className="mb-8">
        <button onClick={() => go("library")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
        </button>
        <h1
          className="text-[#0a0a0a] mb-2"
          style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.03em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Prompt <span style={{ fontWeight: 800 }}>Improver</span>
        </h1>
        <p className="text-[#6b7280]" style={{ fontSize: "15px" }}>Paste a weak prompt — AI upgrades it to pro quality with lock blocks, camera rigs, and platform-native formatting.</p>
      </div>

      {/* Family selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FAMILIES.map(f => {
          const Icon = f.icon;
          const on = family === f.key;
          const locked = f.key === "text" || f.key === "content";
          return (
            <button
              key={f.key}
              disabled={loading}
              aria-disabled={locked}
              onClick={() => {
                if (locked || loading) { if (locked) toast("Coming Soon", { description: `${f.label} prompts will be available soon.` }); return; }
                setFamily(f.key);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-[13px] transition-all relative disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2 ${
                locked
                  ? "bg-[#0a0a0a]/5 border-[#0a0a0a]/10 text-[#6b7280]/50 cursor-not-allowed"
                  : on
                  ? "bg-[#4FC3F7] text-[#0a0a0a] border-[#4FC3F7]"
                  : "bg-white border-[#0a0a0a]/15 text-[#6b7280] hover:border-[#0a0a0a]/30 hover:text-[#0a0a0a]"
              }`}
              style={on && !locked ? { fontWeight: 600 } : {}}
            >
              <Icon className="w-4 h-4" />
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  {f.label}
                  {locked && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#4FC3F7]/15 text-[#0a0a0a]">SOON</span>}
                </div>
                <div className={`text-[10px] ${locked ? "text-[#6b7280]/40" : on ? "text-[#0a0a0a]/70" : "text-[#6b7280]/60"}`}>{f.desc}</div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">

        {/* Input */}
        <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-6 flex flex-col">
          <label htmlFor="improver-input" className="block text-[#6b7280] text-[13px] mb-2 font-semibold">Original prompt</label>
          <textarea
            id="improver-input"
            disabled={loading}
            value={input}
            onChange={e => { setInput(e.target.value); setResult(null); setError(""); setCategoryOverride(null); }}
            placeholder={"Paste your prompt here.\n\nExamples:\n\u2022 \"a cat sitting on a windowsill, golden hour\"\n\u2022 \"create a photo of a luxury watch on dark background\"\n\u2022 \"write a blog post about AI trends\""}
            className="flex-1 w-full p-4 rounded-xl bg-[#f5f5f5] border border-[#0a0a0a]/15 text-[#0a0a0a] outline-none focus:border-[#4FC3F7] font-mono text-[13px] resize-none min-h-[340px] disabled:opacity-60"
          />
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => run()}
              disabled={!input.trim() || loading}
              className="h-13 px-6 rounded-2xl bg-[#4FC3F7] text-[#0a0a0a] font-bold inline-flex items-center gap-2 hover:bg-[#4FC3F7]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              style={{ height: "52px" }}
            >
              {loading ? <><RefreshCw className="w-4 h-4 animate-spin" />Improving...</> : <><Wand2 className="w-4 h-4" />Improve prompt</>}
            </button>
            <span className="text-[12px] text-[#6b7280]">{input.length} chars</span>
          </div>
        </div>

        {/* Output (sticky) */}
        <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-6 flex flex-col min-w-0">
          {/* Platform tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {activePlatforms.map(pl => (
              <button
                key={pl.key}
                disabled={loading}
                onClick={() => { setPlatform(pl.key); setResult(null); setError(""); }}
                className={`px-3 py-1.5 rounded-full border text-[13px] transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2 ${
                  platform === pl.key
                    ? "bg-[#4FC3F7] text-[#0a0a0a] border-[#4FC3F7]"
                    : "border-[#0a0a0a]/15 text-[#6b7280] hover:text-[#0a0a0a]"
                }`}
              >
                <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: pl.color }} />
                {pl.name}
              </button>
            ))}
          </div>

          <div className="text-[#6b7280] text-[13px] mb-2 font-semibold">Improved prompt</div>

          {/* Detected subject category — image family only. Correctable: the
              rule engine's keyword classifier can misdetect the subject, which
              silently changes wardrobe/skin/composition sections. */}
          {result && family === "image" && (
            <div className="mb-3">
              <div className="text-[11px] text-[#6b7280] mb-1.5">
                Detected category <span className="text-[#6b7280]/50">— wrong? pick the right one</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {RULE_ENGINE_CATEGORIES.map(cat => {
                  const active = (result.categoryId ?? "product") === cat.key;
                  return (
                    <button
                      key={cat.key}
                      disabled={loading}
                      onClick={() => handleCategoryOverride(cat.key)}
                      aria-pressed={active}
                      className={`px-2.5 py-1 rounded-full text-[11.5px] border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                        active
                          ? "bg-[#4FC3F7] text-[#0a0a0a] border-[#4FC3F7]"
                          : "bg-white border-[#0a0a0a]/15 text-[#6b7280] hover:border-[#0a0a0a]/40 hover:text-[#0a0a0a]"
                      }`}
                      style={active ? { fontWeight: 600 } : {}}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-[13px] text-red-600 mb-3">
              {error}
            </div>
          )}

          <div className={`flex-1 rounded-xl border p-4 min-h-[340px] max-h-[600px] overflow-y-auto shrink-0 relative transition-all ${
            result ? "bg-[#fafafa] border-[#0a0a0a]/15" : "bg-[#f5f5f5] border-[#0a0a0a]/10"
          }`}>
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#4FC3F7]/50 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <span className="text-[13px] text-[#6b7280]">AI is improving your prompt...</span>
              </div>
            ) : result ? (
              <pre className="whitespace-pre-wrap break-words text-[#0a0a0a] font-mono text-[13px] leading-relaxed">
                {variableFields.length > 0 ? highlight(displayText, variableFields.map(v => v.name)) : displayText}
              </pre>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[#6b7280] text-[13px] text-center px-6">
                  {input.trim() ? "Hit \"Improve prompt\" to see the result" : "Paste your prompt on the left to get started"}
                </p>
              </div>
            )}
          </div>

          {result && (
            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="h-10 px-5 rounded-full bg-[#4FC3F7] text-[#0a0a0a] font-bold inline-flex items-center gap-2 hover:bg-[#4FC3F7]/90 transition-colors"
              >
                {copied ? <><Check className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy</>}
              </button>
              <button
                onClick={() => {
                  if (!authStore.getUser()) { toast.error("Sign in to save prompts"); return; }
                  toast("Saving improved prompts isn't available yet", { description: "Copy it for now — we're working on it." });
                }}
                className="h-10 px-5 rounded-full border border-[#0a0a0a]/15 text-[#0a0a0a] font-semibold inline-flex items-center gap-2 hover:bg-[#0a0a0a]/5 transition-colors"
              >
                <Save className="w-4 h-4" />Save to Library
              </button>
            </div>
          )}
        </div>
      </div>

      {/* What changed */}
      {result && (
        <section className="mt-6 bg-white border border-[#0a0a0a]/15 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#0a0a0a] font-bold">What changed</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#4FC3F7]/15 text-[#0a0a0a] text-[12px] font-bold">
              {appliedCount} improvement{appliedCount !== 1 ? "s" : ""} applied
            </span>
          </div>
          {appliedCount === 0 && (
            <p className="text-[#6b7280] text-[13px] mb-3">
              Your prompt already covered the checks below — nothing needed changing.
            </p>
          )}
          <ul className="space-y-2">
            {changes.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-[14px]">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${c.applied ? "bg-[#4FC3F7]" : "bg-[#0a0a0a]/20"}`} />
                <span
                  className={c.applied ? "text-[#0a0a0a]" : "text-[#6b7280]/50 line-through"}
                  title={c.applied ? undefined : "Not applied — your prompt already handled this, or it didn't apply here."}
                >
                  {c.label}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Variable layer */}
      {result && variableFields.length > 0 && (
        <div className="mt-6">
          <VariablePanel
            variables={variableFields}
            values={vars}
            onChange={(name, value) => setVars(prev => ({ ...prev, [name]: value }))}
            onRegenerate={handleRegenerate}
            regenerating={regenerating}
          />
        </div>
      )}

      {/* Engine lock layer */}
      {result && (
        <div className="mt-6">
          <LockLayerPanel
            categoryLabel={result.categoryLabel}
            lockSection={result.lockSection}
            negativeLocks={result.negativeLocks}
            validation={result.validation}
          />
        </div>
      )}
    </div>
  );
}
