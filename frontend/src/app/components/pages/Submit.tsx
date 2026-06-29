import { useState } from "react";
import { Check, ChevronRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { categories, platforms } from "../theme";
import { submissionsApi, authStore } from "../../lib/api";

const steps = ["Category", "Platform", "Prompt", "Variables", "Example", "Review"];

export function Submit() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<any>({ category: "", platform: "chatgpt", prompt: "", vars: "", example: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const all = [...categories.image, ...categories.text, ...(categories as any).website];
  const update = (k: string, v: any) => setData({ ...data, [k]: v });

  function canAdvance(): string | null {
    if (step === 0 && !data.category) return "Please select a category to continue.";
    if (step === 2 && !data.prompt.trim()) return "Please enter your prompt text to continue.";
    return null;
  }

  async function handleSubmit() {
    if (!authStore.getUser()) {
      toast.error("Sign in required", { description: "Please log in to submit a prompt." });
      return;
    }
    setSubmitting(true);
    try {
      const vars = data.vars
        ? data.vars.split(",").map((v: string) => ({ name: v.trim(), placeholder: v.trim() }))
        : [];
      await submissionsApi.submit({
        title: data.category + " Prompt",
        family: "text",
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
      <h1 className="text-3xl mb-2">Submit a prompt</h1>
      <p className="text-[#6b7280] mb-6">A guided 6-step wizard. Our editors review before publishing.</p>

      {submitted && (
        <div className="mb-6 flex items-center gap-3 bg-[#bce4d8]/30 border border-[#bce4d8] rounded-2xl p-5">
          <div className="w-9 h-9 rounded-full bg-[#4FC3F7] border-2 border-[#0a0a0a] flex items-center justify-center shrink-0">
            <Check className="w-5 h-5 text-[#0a0a0a]" />
          </div>
          <div>
            <div className="font-bold text-[#0a0a0a]">Submitted successfully!</div>
            <div className="text-[#6b7280] text-[13px]">Our editors will review your prompt. You'll be notified on approval.</div>
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] ${
              i < step ? "bg-[#4FC3F7] text-[#0a0a0a]" :
              i === step ? "bg-[#0a0a0a]/10 text-[#0a0a0a] border border-[#4FC3F7]" :
              "bg-[#0a0a0a]/5 text-[#6b7280]"
            }`}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <div className={`${i===step?"text-[#0a0a0a]":"text-[#6b7280]"} hidden sm:block text-[13px]`}>{s}</div>
            {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-[#6b7280]" />}
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
                  onClick={() => update("category", c.name)}
                  className={`p-3 rounded-xl border text-left text-[13px] ${data.category===c.name?"bg-[#4FC3F7]/10 border-[#4FC3F7] text-[#0a0a0a]":"border-[#0a0a0a]/20 text-[#6b7280] hover:text-[#0a0a0a]"}`}
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
              {platforms.map(p => (
                <button
                  key={p.key}
                  onClick={() => update("platform", p.key)}
                  className={`p-3 rounded-xl border flex items-center gap-2 text-[13px] ${data.platform===p.key?"bg-[#0a0a0a]/10 border-[#0a0a0a]/40 text-[#0a0a0a]":"border-[#0a0a0a]/20 text-[#6b7280] hover:text-[#0a0a0a]"}`}
                >
                  <span className="w-3 h-3 rounded-full" style={{background:p.color}} />{p.name}
                </button>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div>
            <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>Prompt text</div>
            <textarea
              rows={8}
              value={data.prompt}
              onChange={e => update("prompt", e.target.value)}
              placeholder="Paste your prompt. Use [bracketed] placeholders for variables."
              className="w-full p-3 rounded-lg bg-[#f5f5f5] border border-[#0a0a0a]/20 text-[#0a0a0a] font-mono text-[13px] outline-none focus:border-[#4FC3F7]"
            />
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>Variables</div>
            <input
              value={data.vars}
              onChange={e => update("vars", e.target.value)}
              placeholder="Comma-separated: subject, mood, style"
              className="w-full h-10 px-3 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a] placeholder:text-[#6b7280] outline-none focus:border-[#4FC3F7]"
            />
          </div>
        )}
        {step === 4 && (
          <div>
            <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>Example output (optional)</div>
            <input
              value={data.example}
              onChange={e => update("example", e.target.value)}
              placeholder="Image URL or short text sample"
              className="w-full h-10 px-3 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a] placeholder:text-[#6b7280] outline-none focus:border-[#4FC3F7]"
            />
          </div>
        )}
        {step === 5 && (
          <div className="space-y-3">
            <div className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>Review & submit</div>
            <div><span className="text-[#6b7280]">Category:</span> <span className="text-[#0a0a0a]">{data.category || "—"}</span></div>
            <div><span className="text-[#6b7280]">Platform:</span> <span className="text-[#0a0a0a]">{data.platform}</span></div>
            <div><span className="text-[#6b7280]">Variables:</span> <span className="text-[#0a0a0a]">{data.vars || "—"}</span></div>
            <div className="bg-[#f5f5f5] border border-[#0a0a0a]/20 rounded-lg p-3 font-mono text-[13px] text-[#0a0a0a] whitespace-pre-wrap">{data.prompt || "—"}</div>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          disabled={step === 0}
          onClick={() => setStep(s => s - 1)}
          className="h-10 px-5 rounded-full bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a] disabled:opacity-40"
        >
          Back
        </button>
        {step < steps.length - 1 ? (
          <button
            onClick={() => {
              const err = canAdvance();
              if (err) { toast.error(err); return; }
              setStep(s => s + 1);
            }}
            className="h-10 px-5 rounded-full bg-[#4FC3F7] text-[#0a0a0a]"
            style={{ fontWeight: 700 }}
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={submitting || submitted || !data.prompt.trim()}
            className="h-10 px-5 rounded-full bg-[#4FC3F7] text-[#bce4d8] inline-flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ fontWeight: 700 }}
          >
            {submitting ? <><Loader2 className="w-4 h-4 animate-spin" />Submitting…</> : "Submit for review"}
          </button>
        )}
      </div>
    </div>
  );
}