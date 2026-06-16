import { useState } from "react";
import { Wand2, Copy, Check, RefreshCw, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { platforms } from "../theme";
import { improverApi, type ImproverChange } from "../../lib/api";

// ─── Component ────────────────────────────────────────────────────────────────

export function Improver({ go }: { go: (p: string) => void }) {
  const [input, setInput]     = useState("");
  const [platform, setPlatform] = useState("chatgpt");
  const [result, setResult]   = useState<{ text: string; changes: ImproverChange[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied]   = useState(false);
  const [error, setError]     = useState("");

  async function run() {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await improverApi.improve({ prompt: input, platform });
      setResult({ text: res.improved, changes: res.changes });
    } catch (err: any) {
      setError(err?.message ?? "Improvement failed");
      toast.error("Improvement failed", { description: err?.message });
    } finally {
      setLoading(false);
    }
  }

  function handleCopy() {
    if (!result?.text) return;
    navigator.clipboard?.writeText(result.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const appliedCount = result?.changes.filter(c => c.applied).length ?? 0;

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 text-[#094067]">
      <div className="mb-8">
        <button onClick={() => go("home")} className="inline-flex items-center gap-1.5 text-[#5f6c7b] hover:text-[#094067] text-[13px] mb-3 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <div className="inline-flex items-center gap-2 text-[#ef4565] mb-2 text-[13px] font-semibold">
          <Wand2 className="w-4 h-4" />Prompt Improver
        </div>
        <h1 className="text-3xl font-bold">Paste a weak prompt — AI upgrades it to pro quality.</h1>
        <p className="text-[#5f6c7b] mt-1">Applies the v4.2 Pro Formula with lock blocks, camera rigs, and platform-native formatting.</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6 items-start">

        {/* Input */}
        <div className="bg-white border border-[#094067]/15 rounded-2xl p-6 flex flex-col">
          <div className="text-[#5f6c7b] text-[13px] mb-2 font-semibold">Original prompt</div>
          <textarea
            rows={10}
            value={input}
            onChange={e => { setInput(e.target.value); setResult(null); setError(""); }}
            placeholder={"Paste your prompt here.\n\nExamples:\n\u2022 \"a cat sitting on a windowsill, golden hour\"\n\u2022 \"create a photo of a luxury watch on dark background\"\n\u2022 \"write a blog post about AI trends\""}
            className="flex-1 w-full p-3 rounded-lg bg-[#f5f5f5] border border-[#094067]/20 text-[#094067] outline-none focus:border-[#ffd803] font-mono text-[13px] resize-none"
          />
          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={run}
              disabled={!input.trim() || loading}
              className="h-11 px-6 rounded-full bg-[#ef4565] text-white font-bold inline-flex items-center gap-2 hover:bg-[#ef4565]/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            >
              {loading ? <><RefreshCw className="w-4 h-4 animate-spin" />Improving...</> : <><Wand2 className="w-4 h-4" />Improve prompt</>}
            </button>
            <span className="text-[12px] text-[#5f6c7b]">{input.length} chars</span>
          </div>
        </div>

        {/* Output (sticky) */}
        <div className="bg-white border border-[#094067]/15 rounded-2xl p-6 flex flex-col lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">
          {/* Platform tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {platforms.map(pl => (
              <button
                key={pl.key}
                onClick={() => { setPlatform(pl.key); setResult(null); }}
                className={`px-3 py-1.5 rounded-full border text-[13px] transition-all ${
                  platform === pl.key
                    ? "bg-[#094067] text-white border-[#094067]"
                    : "border-[#094067]/20 text-[#5f6c7b] hover:text-[#094067]"
                }`}
              >
                <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: pl.color }} />
                {pl.name}
              </button>
            ))}
          </div>

          <div className="text-[#5f6c7b] text-[13px] mb-2 font-semibold">Improved prompt</div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-[13px] text-red-600 mb-3">
              {error}
            </div>
          )}

          <div className={`flex-1 rounded-xl border p-3 min-h-[200px] relative transition-all ${
            result ? "bg-[#f8f9ff] border-[#094067]/20" : "bg-[#f5f5f5] border-[#094067]/10"
          }`}>
            {loading ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <div className="flex gap-1.5">
                  {[0, 1, 2].map(i => (
                    <span key={i} className="w-2.5 h-2.5 rounded-full bg-[#ef4565]/50 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
                <span className="text-[13px] text-[#5f6c7b]">AI is improving your prompt...</span>
              </div>
            ) : result ? (
              <pre className="whitespace-pre-wrap text-[#094067] font-mono text-[13px] leading-relaxed">{result.text}</pre>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[#5f6c7b] text-[13px] text-center px-6">
                  {input.trim() ? "Hit \"Improve prompt\" to see the result" : "Paste your prompt on the left to get started"}
                </p>
              </div>
            )}
          </div>

          {result && (
            <button
              onClick={handleCopy}
              className="mt-4 h-10 px-5 rounded-full bg-[#ffd803] text-[#094067] font-bold inline-flex items-center gap-2 self-start hover:bg-[#ffd803]/90 transition-colors"
            >
              {copied ? <><Check className="w-4 h-4" />Copied!</> : <><Copy className="w-4 h-4" />Copy</>}
            </button>
          )}
        </div>
      </div>

      {/* What changed */}
      {result && (
        <section className="mt-6 bg-white border border-[#094067]/15 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-[#094067] font-bold">What changed</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-[#ffd803] text-[#094067] text-[12px] font-bold border border-[#094067]">
              {appliedCount} improvement{appliedCount !== 1 ? "s" : ""} applied
            </span>
          </div>
          <ul className="space-y-2">
            {result.changes.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-[14px]">
                <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-2 ${c.applied ? "bg-[#ef4565]" : "bg-[#094067]/20"}`} />
                <span className={c.applied ? "text-[#094067]" : "text-[#5f6c7b]/50 line-through"}>{c.label}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
