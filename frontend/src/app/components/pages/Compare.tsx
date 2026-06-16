import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Star, Copy, Loader2, ArrowLeft } from "lucide-react";
import { platforms } from "../theme";
import { imageLibraryPrompts } from "../../lib/library-data";

export function Compare({ go }: { go: (p: string) => void }) {
  const [promptId, setPromptId]     = useState(imageLibraryPrompts[0].id);
  const [platformData, setPlatform] = useState<Record<string, string> | null>(null);
  const [loading, setLoading]       = useState(false);

  const prompt = imageLibraryPrompts.find(x => x.id === promptId) ?? imageLibraryPrompts[0];

  // Lazy-load the platform versions whenever the selected prompt changes
  useEffect(() => {
    setPlatform(null);
    setLoading(true);
    import("../../lib/library-platforms").then(m => {
      const versions = m.platformVersions[prompt.slug ?? ""] ?? {};
      setPlatform(versions);
    }).finally(() => setLoading(false));
  }, [prompt.slug]);

  const fakeScore = (i: number) => (3.8 + ((i * 0.27) % 1.2)).toFixed(1);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 text-[#094067]">
      <div className="mb-8">
        <button onClick={() => go("home")} className="inline-flex items-center gap-1.5 text-[#5f6c7b] hover:text-[#094067] text-[13px] mb-3 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
        <h1 className="text-3xl">Compare across platforms</h1>
        <p className="text-[#5f6c7b]">See how the same prompt performs on ChatGPT, Gemini, Grok, Midjourney, Firefly, and FLUX.</p>
      </div>

      <div className="mb-6">
        <div className="text-[#5f6c7b] mb-1">Select a prompt</div>
        <select
          value={promptId}
          onChange={e => setPromptId(e.target.value)}
          className="h-10 px-3 rounded-lg bg-[#094067]/5 border border-[#094067]/20 text-[#094067] w-full max-w-md"
        >
          {imageLibraryPrompts.map(x => (
            <option key={x.id} value={x.id}>{x.title}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24 text-[#5f6c7b]">
          <Loader2 className="w-5 h-5 animate-spin mr-2" /> Loading platform versions…
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {platforms.map((pl, i) => {
            const text = platformData?.[pl.key]?.trim() || "(not applicable)";
            const isNA = text === "(not applicable)";
            return (
              <div key={pl.key} className="bg-white border border-[#094067]/15 rounded-2xl overflow-hidden">
                {/* Prompt image */}
                <div className="aspect-[4/3] bg-[#f5f5f5] overflow-hidden">
                  {prompt.image ? (
                    <img src={prompt.image} alt={pl.name} className="w-full h-full object-cover opacity-90" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-4xl opacity-10">✦</div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: pl.color }} />
                    <div className="text-[#094067] font-semibold">{pl.name}</div>
                    {!isNA && (
                      <span className="ml-auto inline-flex items-center gap-1 text-[#094067]">
                        <Star className="w-4 h-4 fill-[#ffd803] text-[#ef4565]" />{fakeScore(i)}
                      </span>
                    )}
                  </div>
                  <pre className={`whitespace-pre-wrap font-mono text-[12px] min-h-[80px] mb-3 leading-relaxed ${isNA ? "text-[#5f6c7b]/40 italic" : "text-[#5f6c7b]"}`}>
                    {text}
                  </pre>
                  {!isNA && (
                    <div className="flex items-center justify-between">
                      <Bar value={Number(fakeScore(i))} />
                      <button
                        onClick={() => { navigator.clipboard?.writeText(text); toast.success(`Copied ${pl.name} version`); }}
                        className="text-[#ef4565] inline-flex items-center gap-1 text-[13px]"
                      >
                        <Copy className="w-4 h-4" />Copy
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function Bar({ value }: { value: number }) {
  return (
    <div className="w-24 h-2 rounded-full bg-[#094067]/5 overflow-hidden">
      <div className="h-full bg-gradient-to-r from-[#ffd803] to-[#ef4565]" style={{ width: `${(value / 5) * 100}%` }} />
    </div>
  );
}
