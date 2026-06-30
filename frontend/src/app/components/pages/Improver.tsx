import { useState, useEffect } from "react";
import { Wand2, Copy, Check, RefreshCw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { platforms } from "../theme";
import { improverApi, variablesApi, type ImproverResult } from "../../lib/api";
import { LockLayerPanel } from "../LockLayerPanel";
import { VariablePanel } from "../VariablePanel";
import { applyVariables } from "../../lib/variables";
import { highlight } from "../../lib/highlight";

// ─── Component ────────────────────────────────────────────────────────────────

export function Improver({ go }: { go: (p: string) => void }) {
  const [input, setInput]     = useState("");
  const [platform, setPlatform] = useState("chatgpt");
  const [result, setResult]   = useState<ImproverResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [error, setError]     = useState("");
  const [vars, setVars]       = useState<Record<string, string>>({});
  const [regenText, setRegenText] = useState<string | null>(null);
  const [regenerating, setRegen]  = useState(false);
  useEffect(() => { setRegenText(null); }, [platform]);

  const variableFields = result?.variables ?? [];

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

  async function run() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);
    setVars({});
    setRegenText(null);

    try {
      const res = await improverApi.improve({ prompt: input, platform });
      setResult(res);
      // Pre-fill the brief with each variable's default.
      setVars(Object.fromEntries((res.variables ?? []).filter(v => v.default).map(v => [v.name, v.default!])));
    } catch (err: any) {
      setError(err?.message ?? "Improvement failed");
      toast.error("Improvement failed", { description: err?.message });
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result?.improved) return;
    navigator.clipboard?.writeText(regenText ?? applyVariables(result.finalAssembledText || result.improved, vars));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const appliedCount = result?.changes.filter(c => c.applied).length ?? 0;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 text-[#0a0a0a]">
      <div className="mb-8">
        <button onClick={() => go("home")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-3 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <div className="inline-flex items-center gap-2 text-[#0a0a0a] mb-2 text-[13px] font-semibold">
          <Wand2 className="w-4 h-4" />Prompt Improver
        </div>
        <h1 className="text-3xl font-bold">Paste a weak prompt — AI upgrades it to pro quality.</h1>
        <p className="text-[#6b7280] mt-1">Applies the v4.2 Pro Formula with lock blocks, camera rigs, and platform-native formatting.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">

        {/* Input */}
        <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-6 flex flex-col">
          <div className="text-[#6b7280] text-[13px] mb-2 font-semibold">Original prompt</div>
          <textarea
            rows={10}
            value={input}
            onChange={e => { setInput(e.target.value); setResult(null); setError(""); }}
            placeholder={"Paste your prompt here.\n\nExamples:\n\u2022 \"a cat sitting on a windowsill, golden hour\"\n\u2022 \"create a photo of a luxury watch on dark background\"\n\u2022 \"write a blog post about AI trends\""}
            className="flex-1 w-full p-3 rounded-lg bg-[#f5f5f5] border border-[#0a0a0a]/20 text-[#0a0a0a] outline-none focus:border-[#4FC3F7] font-mono text-[13px] resize-none"
          />
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={run}
              disabled={!input.trim() || loading}
              className="h-11 px-6 rounded-full bg-[#4FC3F7] text-white font-bold inline-flex items-center gap-2 hover:bg-[#4FC3F7]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {loading ? <><RefreshCw className="w-4 h-4 animate-spin" />Improving...</> : <><Wand2 className="w-4 h-4" />Improve prompt</>}
            </button>
            <span className="text-[12px] text-[#6b7280]">{input.length} chars</span>
          </div>
        </div>

        {/* Output (sticky) */}
        <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-6 flex flex-col min-w-0 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          {/* Platform tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {platforms.map(pl => (
              <button
                key={pl.key}
                onClick={() => { setPlatform(pl.key); setResult(null); }}
                className={`px-3 py-1.5 rounded-full border text-[13px] transition-all ${
                  platform === pl.key
                    ? "bg-[#0a0a0a] text-white border-[#0a0a0a]"
                    : "border-[#0a0a0a]/20 text-[#6b7280] hover:text-[#0a0a0a]"
                }`}
              >
                <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: pl.color }} />
                {pl.name}
              </button>
            ))}
          </div>

          <div className="text-[#6b7280] text-[13px] mb-2 font-semibold">Improved prompt</div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-[13px] text-red-600 mb-3">
              {error}
            </div>
          )}

          <div className={`flex-1 rounded-xl border p-3 min-h-[200px] relative transition-all ${
            result ? "bg-[#f8f9ff] border-[#0a0a0a]/20" : "bg-[#f5f5f5] border-[#0a0a0a]/10"
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
                {regenText
                  ? regenText
                  : variableFields.length > 0
                  ? highlight(applyVariables(result.improved, vars), variableFields.map(v => v.name))
                  : result.improved}
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
            <button
              onClick={handleCopy}
              className="mt-4 h-10 px-5 rounded-full bg-[#4FC3F7] text-[#0a0a0a] font-bold inline-flex items-center gap-2 self-start hover:bg-[#4FC3F7]/90 transition-colors"
            >
              {copied ? <><Check className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy</>}
            </button>
          )}
        </div>
      </div>

      {/* What changed */}
      {result && (
        <section className="mt-6 bg-white border border-[#0a0a0a]/15 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#0a0a0a] font-bold">What changed</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#4FC3F7] text-[#0a0a0a] text-[12px] font-bold border border-[#0a0a0a]">
              {appliedCount} improvement{appliedCount !== 1 ? "s" : ""} applied
            </span>
          </div>
          <ul className="space-y-2">
            {result.changes.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-[14px]">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${c.applied ? "bg-[#4FC3F7]" : "bg-[#0a0a0a]/20"}`} />
                <span className={c.applied ? "text-[#0a0a0a]" : "text-[#6b7280]/50 line-through"}>{c.label}</span>
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
