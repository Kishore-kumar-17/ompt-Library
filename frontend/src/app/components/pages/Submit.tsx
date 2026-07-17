import { useState } from "react";
import { Check, ChevronRight, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { categories, platforms, videoPlatforms, websitePlatforms } from "../theme";
import { submissionsApi, authStore } from "../../lib/api";

const steps = ["Category", "Platform", "Prompt", "Variables", "Example", "Review"];

export function Submit({ go, onAuth }: { go: (p: string) => void; onAuth?: () => void }) {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({ category: "", family: "", platform: "chatgpt", title: "", prompt: "", vars: "", example: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const all = [
    ...categories.image.map(c => ({ ...c, family: "image" })),
    ...categories.video.map(c => ({ ...c, family: "video" })),
    ...categories.text.map(c => ({ ...c, family: "text" })),
    ...categories.website.map(c => ({ ...c, family: "website" })),
  ];
  const update = (k: string, v: any) => setData({ ...data, [k]: v });
  const activePlatforms = data.family === "video" ? videoPlatforms : data.family === "website" ? websitePlatforms : platforms;
  const activePlatform = activePlatforms.find(p => p.key === data.platform);

  function canAdvance(): string | null {
    if (step === 0 && !data.category) return "Please select a category to continue.";
    if (step === 2 && !data.title.trim()) return "Please give your prompt a title to continue.";
    if (step === 2 && !data.prompt.trim()) return "Please enter your prompt text to continue.";
    return null;
  }

  async function handleSubmit() {
    if (!authStore.getUser()) {
      toast.error("Sign in required", { description: "Please log in to submit a prompt." });
      onAuth?.();
      return;
    }
    setSubmitting(true);
    try {
      const vars = data.vars
        ? data.vars.split(",").map((v: string) => ({ name: v.trim(), placeholder: v.trim() }))
        : [];
      await submissionsApi.submit({
        title: data.title.trim(),
        family: data.family || "text",
        basePrompt: data.prompt,
        platformIds: [data.platform],
        variables: vars,
        exampleOutput: data.example || undefined,
      });
      setSubmitted(true);
      toast.success("Submitted for review!", { description: "Our editors will review your prompt shortly." });
    } catch (err: any) {
      toast.error("Submission failed", { description: err.message ?? "Please try again." });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-[900px] mx-auto px-6 py-10 text-[#0a0a0a]">
      <button onClick={() => go("library")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-3 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>
      <h1 className="text-3xl font-bold mb-2">Submit <span className="font-extrabold">a Prompt</span></h1>
      <p className="text-[#6b7280] mb-6">A guided 6-step wizard. Our editors review before publishing.</p>

      {submitted && (
        <div className="mb-6 flex items-center gap-3 bg-[#4FC3F7]/10 border border-[#4FC3F7]/40 rounded-2xl p-5">
          <div className="w-9 h-9 rounded-full bg-[#4FC3F7] flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-[#0a0a0a]">Submitted successfully!</div>
            <div className="text-[#6b7280] text-[13px]">Our editors will review your prompt. You'll be notified on approval.</div>
          </div>
          <div className="ml-auto flex gap-2 shrink-0">
            <button
              onClick={() => {
                setData({ category: "", family: "", platform: "chatgpt", title: "", prompt: "", vars: "", example: "" });
                setStep(0);
                setSubmitted(false);
              }}
              className="h-9 px-4 rounded-full bg-white border border-[#0a0a0a]/15 text-[#0a0a0a] text-[13px] font-semibold hover:bg-[#0a0a0a]/5 transition-colors"
            >
              Submit another
            </button>
            <button
              onClick={() => go("dashboard")}
              className="h-9 px-4 rounded-full bg-[#0a0a0a] text-white text-[13px] font-semibold hover:bg-[#2a2a2a] transition-colors"
            >
              View dashboard
            </button>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-8 flex-wrap" role="list" aria-label="Submission steps">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2" role="listitem" aria-current={i === step ? "step" : undefined}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] ${
                i < step ? "bg-[#4FC3F7] text-white" :
                i === step ? "bg-[#0a0a0a]/10 text-[#0a0a0a] border border-[#4FC3F7]" :
                "bg-[#0a0a0a]/5 text-[#6b7280]"
              }`}
              aria-label={`Step ${i + 1}: ${s}${i < step ? " (completed)" : i === step ? " (current)" : ""}`}
            >
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <div className={`${i===step?"text-[#0a0a0a]":"text-[#6b7280]"} hidden sm:block text-[13px]`} aria-hidden="true">{s}</div>
            {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-[#6b7280]" aria-hidden="true" />}
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-6 min-h-[320px]">
        {step === 0 && (
          <div>
            <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>Pick a category</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {all.map(c => (
                <button
                  key={c.name}
                  onClick={() => {
                    const newPlatforms = c.family === "video" ? videoPlatforms : c.family === "website" ? websitePlatforms : platforms;
                    const platformStillValid = newPlatforms.some(p => p.key === data.platform);
                    setData({ ...data, category: c.name, family: c.family, platform: platformStillValid ? data.platform : newPlatforms[0].key });
                  }}
                  className={`p-3 rounded-xl border text-left text-[13px] ${data.category===c.name?"bg-[#4FC3F7]/10 border-[#4FC3F7] text-[#0a0a0a]":"border-[#0a0a0a]/15 text-[#6b7280] hover:text-[#0a0a0a]"}`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>Pick a primary platform</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {activePlatforms.map(p => (
                <button
                  key={p.key}
                  onClick={() => update("platform", p.key)}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-[13px] ${data.platform===p.key?"bg-[#4FC3F7]/10 border-[#4FC3F7] text-[#0a0a0a]":"border-[#0a0a0a]/15 text-[#6b7280] hover:text-[#0a0a0a]"}`}
                >
                  <span className="w-3 h-3 rounded-full" style={{background:p.color}} />{p.name}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <label htmlFor="submit-title" className="block text-[#0a0a0a] mb-2" style={{ fontWeight: 600 }}>Title</label>
            <input
              id="submit-title"
              value={data.title}
              onChange={e => update("title", e.target.value)}
              placeholder="A short, specific title for this prompt"
              maxLength={200}
              className="w-full h-10 px-3 mb-4 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/15 text-[#0a0a0a] placeholder:text-[#6b7280] outline-none focus:border-[#4FC3F7]"
            />
            <label htmlFor="submit-prompt" className="block text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>Prompt text</label>
            <textarea
              id="submit-prompt"
              rows={8}
              value={data.prompt}
              onChange={e => update("prompt", e.target.value)}
              placeholder="Paste your prompt. Use [bracketed] placeholders for variables."
              className="w-full p-3 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/15 text-[#0a0a0a] font-mono text-[13px] outline-none focus:border-[#4FC3F7]"
            />
          </div>
        )}
        {step === 3 && (
          <div>
            <label htmlFor="submit-vars" className="block text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>Variables</label>
            <input
              id="submit-vars"
              value={data.vars}
              onChange={e => update("vars", e.target.value)}
              placeholder="Comma-separated: subject, mood, style"
              className="w-full h-10 px-3 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/15 text-[#0a0a0a] placeholder:text-[#6b7280] outline-none focus:border-[#4FC3F7]"
            />
            {(() => {
              const bracketed = Array.from(data.prompt.matchAll(/\[([^\]]+)\]/g)).map((m: any) => m[1].trim().toLowerCase());
              const named = data.vars.split(",").map((v: string) => v.trim().toLowerCase()).filter(Boolean);
              const unmatched = bracketed.filter(b => !named.includes(b));
              if (bracketed.length === 0 || unmatched.length === 0) return null;
              return (
                <p className="text-[12px] text-[#b9791f] mt-2">
                  Your prompt has [{unmatched.join("], [")}] that {unmatched.length === 1 ? "isn't" : "aren't"} listed above — add {unmatched.length === 1 ? "it" : "them"} so reviewers know it's a variable.
                </p>
              );
            })()}
          </div>
        )}
        {step === 4 && (
          <div>
            <label htmlFor="submit-example" className="block text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>Example output (optional)</label>
            <input
              id="submit-example"
              value={data.example}
              onChange={e => update("example", e.target.value)}
              placeholder="Image URL or short text sample"
              className="w-full h-10 px-3 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/15 text-[#0a0a0a] placeholder:text-[#6b7280] outline-none focus:border-[#4FC3F7]"
            />
          </div>
        )}
        {step === 5 && (
          <div className="space-y-3">
            <div className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>Review & submit</div>
            <div><span className="text-[#6b7280]">Title:</span> <span className="text-[#0a0a0a]">{data.title || "-"}</span></div>
            <div><span className="text-[#6b7280]">Category:</span> <span className="text-[#0a0a0a]">{data.category || "-"}</span></div>
            <div><span className="text-[#6b7280]">Platform:</span> <span className="text-[#0a0a0a]">{activePlatform?.name ?? data.platform}</span></div>
            <div><span className="text-[#6b7280]">Variables:</span> <span className="text-[#0a0a0a]">{data.vars || "-"}</span></div>
            <div className="bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 rounded-lg p-3 font-mono text-[13px] text-[#0a0a0a] whitespace-pre-wrap">{data.prompt || "-"}</div>
            {data.example && (
              <div><span className="text-[#6b7280]">Example output:</span> <span className="text-[#0a0a0a]">{data.example}</span></div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          disabled={step === 0}
          onClick={() => setStep(s => s - 1)}
          className="h-10 px-5 rounded-full bg-[#0a0a0a]/5 border border-[#0a0a0a]/15 text-[#0a0a0a] font-semibold disabled:opacity-40"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            disabled={!!canAdvance()}
            onClick={() => {
              const err = canAdvance();
              if (err) { toast.error(err); return; }
              setStep(s => s + 1);
            }}
            className="h-10 px-5 rounded-full bg-[#4FC3F7] text-white disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontWeight: 700 }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || submitted || !data.title.trim() || !data.prompt.trim()}
            className="h-10 px-5 rounded-full bg-[#4FC3F7] text-white inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontWeight: 700 }}
          >
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting…</> : "Submit for review"}
          </button>
        )}
      </div>
    </div>
  );
}