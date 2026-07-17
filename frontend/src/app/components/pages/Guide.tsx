import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { BookOpen, Target, Layers, Wand2, Sparkles, Scale, ListChecks, Lightbulb, Copy, ChevronRight, Play, Image, Globe, Video, Code2, FileText, ArrowLeft, Rocket, Check, AlertTriangle } from "lucide-react";
import { websiteDesigns, type WebsiteDesign } from "../../lib/website-data";

const sections = [
  { key: "playground", label: "Playground",          icon: Play,      group: "craft" },
  { key: "anatomy",    label: "Anatomy of a prompt", icon: Layers,    group: "craft" },
  { key: "variables",  label: "Using variables",      icon: Wand2,     group: "craft" },
  { key: "platforms",  label: "Platform differences", icon: Scale,     group: "craft" },
  { key: "patterns",   label: "Prompt patterns",      icon: Sparkles,  group: "craft" },
  { key: "checklist",  label: "Quality checklist",    icon: ListChecks,group: "craft" },
  { key: "tips",       label: "Pro tips",             icon: Lightbulb, group: "craft" },
  { key: "image-gen",  label: "Image Generation",     icon: Image,     group: "how-to" },
  { key: "web-gen",    label: "Website Generation",   icon: Globe,     group: "how-to" },
  { key: "video-gen",  label: "Video Generation",     icon: Video,     group: "how-to" },
  { key: "code-gen",   label: "Code Generation",      icon: Code2,     group: "how-to" },
  { key: "content-gen",label: "Content Generation",   icon: FileText,  group: "how-to" },
];

export function Guide({ go, initialSection }: { go: (p: string) => void; initialSection?: string }) {
  const validInitial = initialSection && sections.some(s => s.key === initialSection) ? initialSection : "playground";
  const [active, setActive] = useState(validInitial);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const activeSection = sections.find(s => s.key === active) ?? sections[0];

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 text-[#0a0a0a]">
      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="lg:sticky lg:top-6 self-start">
          {/* Mobile: compact toggle showing the active section name */}
          <button
            className="lg:hidden w-full flex items-center justify-between px-4 py-3 mb-2 bg-white border border-[#0a0a0a]/10 rounded-2xl shadow-sm"
            onClick={() => setMobileNavOpen(v => !v)}
            aria-expanded={mobileNavOpen}
            aria-controls="guide-mobile-nav"
          >
            <span className="text-[#0a0a0a] text-[14px]" style={{ fontWeight: 600 }}>
              {activeSection?.label ?? "Select section"}
            </span>
            <ChevronRight className={`w-4 h-4 text-[#6b7280] transition-transform ${mobileNavOpen ? "rotate-90" : ""}`} />
          </button>

          <div id="guide-mobile-nav" className={`lg:block ${mobileNavOpen ? "" : "hidden"}`}>
            <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl p-2 shadow-sm">
              <div className="px-3 pt-1 pb-2 text-[10px] uppercase tracking-widest text-[#6b7280]" style={{ fontWeight: 700 }}>
                Prompt Craft
              </div>
              {sections.filter(s => s.group === "craft").map((s) => {
                const Icon = s.icon;
                const on = active === s.key;
                return (
                  <button
                    key={s.key}
                    aria-current={on ? "page" : undefined}
                    onClick={() => { setActive(s.key); setMobileNavOpen(false); }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition ${
                      on ? "bg-[#4FC3F7] text-white" : "text-[#6b7280] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span style={{ fontWeight: on ? 700 : 500 }}>{s.label}</span>
                    <ChevronRight className={`w-4 h-4 ml-auto ${on ? "opacity-100" : "opacity-40"}`} />
                  </button>
                );
              })}
              <div className="px-3 pt-3 pb-2 text-[10px] uppercase tracking-widest text-[#6b7280]" style={{ fontWeight: 700 }}>
                How-To Guides
              </div>
              {sections.filter(s => s.group === "how-to").map((s) => {
                const Icon = s.icon;
                const on = active === s.key;
                return (
                  <button
                    key={s.key}
                    aria-current={on ? "page" : undefined}
                    onClick={() => { setActive(s.key); setMobileNavOpen(false); }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition ${
                      on ? "bg-[#4FC3F7] text-white" : "text-[#6b7280] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span style={{ fontWeight: on ? 700 : 500 }}>{s.label}</span>
                    <ChevronRight className={`w-4 h-4 ml-auto ${on ? "opacity-100" : "opacity-40"}`} />
                  </button>
                );
              })}
            </div>

            <div className="mt-5 bg-white border border-[#0a0a0a]/10 rounded-2xl p-5 shadow-sm relative overflow-hidden">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-[#0a0a0a] mb-1" style={{ fontWeight: 700 }}>Ready to try?</div>
                  <p className="text-[#6b7280] mb-3" style={{ fontSize: "13px", lineHeight: 1.5 }}>Jump into the library and copy a tested prompt.</p>
                  <button onClick={() => go("library")} className="h-9 px-4 rounded-full bg-[#4FC3F7] text-white" style={{ fontWeight: 700 }}>
                    Browse prompts
                  </button>
                </div>
                <Rocket className="w-10 h-10 text-[#4FC3F7] opacity-60 -rotate-45 shrink-0 mt-1" />
              </div>
            </div>
          </div>
        </aside>

        <div className="min-w-0">
          <button onClick={() => go("library")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-3 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>
          <h1 className="text-4xl font-bold mb-3">Prompt <span className="font-extrabold">Guide</span></h1>
          <p className="text-[#6b7280] mb-10" style={{ fontSize: "15px", lineHeight: 1.6 }}>
            A prompt is an instruction you give an AI model. Great prompts are specific, structured, and testable. This guide breaks down the parts, shows the patterns that work, and the traps to avoid.
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              {active === "playground"  && <Playground />}
              {active === "anatomy"     && <Anatomy />}
              {active === "variables"   && <Variables />}
              {active === "platforms"   && <Platforms />}
              {active === "patterns"    && <Patterns />}
              {active === "checklist"   && <Checklist />}
              {active === "tips"        && <Tips />}
              {active === "image-gen"   && <ImageGenGuide />}
              {active === "web-gen"     && <WebGenGuide go={go} />}
              {active === "video-gen"   && <VideoGenGuide />}
              {active === "code-gen"    && <CodeGenGuide />}
              {active === "content-gen" && <ContentGenGuide />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }: any) {
  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2 text-[#0a0a0a]">
        <Icon className="w-5 h-5" />
        <span style={{ fontWeight: 700 }}>{title}</span>
      </div>
      {children}
    </div>
  );
}

function Card({ children }: any) {
  return <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl p-6">{children}</div>;
}

function PromptBlock({ children }: any) {
  return (
    <div className="relative bg-[#0a0a0a]/5 border border-[#0a0a0a]/10 rounded-xl p-4 font-mono text-[13px] text-[#0a0a0a] whitespace-pre-wrap leading-relaxed">
      <button
        onClick={() => {
          const t = typeof children === "string" ? children : "";
          navigator.clipboard?.writeText(t);
          toast.success("Prompt copied");
        }}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white border border-[#0a0a0a]/10 text-[#6b7280] hover:text-[#0a0a0a]"
        aria-label="Copy"
      >
        <Copy className="w-3.5 h-3.5" />
      </button>
      {children}
    </div>
  );
}

function Pill({ color, label }: { color: string; label: string }) {
  return (
    <span className="px-2 py-0.5 rounded-full text-[11px] border" style={{ background: `${color}22`, color, borderColor: `${color}55`, fontWeight: 700 }}>
      {label}
    </span>
  );
}

// ─── Anatomy (with before/after examples) ───────────────────────────────────

function Anatomy() {
  const parts = [
    { color: "#4FC3F7", name: "Role",        desc: "Who the AI should act as.",                     ex: "You are a senior copywriter..." },
    { color: "#0a0a0a", name: "Task",        desc: "What to produce, clearly.",                     ex: "Write a 3-line LinkedIn hook..." },
    { color: "#6b7280", name: "Context",     desc: "Relevant background or audience.",              ex: "Audience: early-stage founders." },
    { color: "#4FC3F7", name: "Constraints", desc: "Length, tone, format rules.",                   ex: "Max 60 words. No emojis." },
    { color: "#6b7280", name: "Format",      desc: "How output should be shaped.",                  ex: "Return as JSON with 3 fields." },
    { color: "#4FC3F7", name: "Examples",    desc: "Few-shot samples (optional but powerful).",     ex: "Example: 'Shipping beats perfection.'" },
  ];

  return (
    <Section title="Anatomy of a prompt" icon={Layers}>
      <Card>
        <p className="text-[#6b7280] mb-5" style={{ lineHeight: 1.6 }}>
          Most high-quality prompts are made of six repeatable parts. You don't need all of them every time -
          but naming them helps you debug when output is off.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {parts.map((p) => (
            <div key={p.name} className="border border-[#0a0a0a]/10 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <Pill color={p.color} label={p.name} />
              </div>
              <div className="text-[#0a0a0a] mb-1" style={{ fontWeight: 600 }}>{p.desc}</div>
              <div className="text-[#6b7280] font-mono text-[12px]">{p.ex}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Put together</div>
        <PromptBlock>{`You are a senior copywriter.
Write a 3-line LinkedIn hook announcing a new AI tool.
Audience: early-stage founders who skim feeds fast.
Max 60 words. Punchy, no emojis, no hashtags.
Return as a markdown list.
Example tone: "Shipping beats perfection. Here's why..."`}</PromptBlock>
      </Card>

      {/* Before/After comparison */}
      <Card>
        <div className="text-[#0a0a0a] mb-4" style={{ fontWeight: 700 }}>Before & After: Why anatomy matters</div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border border-red-200 bg-red-50/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-red-100 text-red-600 border border-red-200" style={{ fontWeight: 700 }}>Weak</span>
            </div>
            <div className="font-mono text-[12px] text-[#0a0a0a] whitespace-pre-wrap leading-relaxed bg-white/60 rounded-lg p-3 border border-red-100">
              {`Write me a LinkedIn post about AI.`}
            </div>
            <p className="text-[#6b7280] text-[12px] mt-3" style={{ lineHeight: 1.5 }}>
              No role, no audience, no tone, no length. The model guesses everything - output is generic and unusable.
            </p>
          </div>
          <div className="border border-green-200 bg-green-50/50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-green-100 text-green-700 border border-green-200" style={{ fontWeight: 700 }}>Strong</span>
            </div>
            <div className="font-mono text-[12px] text-[#0a0a0a] whitespace-pre-wrap leading-relaxed bg-white/60 rounded-lg p-3 border border-green-100">
              {`You are a B2B SaaS marketer.
Write a LinkedIn post (120 words max)
announcing our AI prompt library.
Audience: startup founders.
Tone: confident, no buzzwords.
End with a CTA linking to the site.`}
            </div>
            <p className="text-[#6b7280] text-[12px] mt-3" style={{ lineHeight: 1.5 }}>
              Role + Task + Context + Constraints + Format. The model knows exactly what to produce and what to avoid.
            </p>
          </div>
        </div>
      </Card>
    </Section>
  );
}

// ─── Variables (enriched with environment, format, common mistakes) ──────────

function Variables() {
  return (
    <Section title="Using variables" icon={Wand2}>
      <Card>
        <p className="text-[#6b7280] mb-4" style={{ lineHeight: 1.6 }}>
          Variables are placeholders in square brackets that you fill in before sending the prompt. They turn a
          one-off prompt into a reusable template.
        </p>
        <PromptBlock>{`A [subject] in [mood] lighting,
shot on 35mm, [style] composition,
background: [environment],
output as [format].`}</PromptBlock>
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-3 mt-5">
          {[
            { name: "subject",     ex: "vintage motorcycle" },
            { name: "mood",        ex: "cinematic golden-hour" },
            { name: "style",       ex: "symmetrical wide-angle" },
            { name: "environment", ex: "foggy mountain road" },
            { name: "format",      ex: "16:9 landscape" },
          ].map((v) => (
            <div key={v.name} className="border border-[#0a0a0a]/10 rounded-xl p-3">
              <span className="font-mono text-[12px] bg-[#4FC3F7] px-1.5 py-0.5 rounded text-white">[{v.name}]</span>
              <div className="text-[#6b7280] mt-2 text-[13px]">{v.ex}</div>
            </div>
          ))}
        </div>
      </Card>

      {/* Text/content template example */}
      <Card>
        <div className="text-[#0a0a0a] mb-2" style={{ fontWeight: 700 }}>Text template example</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>
          Variables work for text prompts too - not just images.
        </p>
        <PromptBlock>{`You are a [role] with [years] years of experience.
Write a [content_type] about [topic].
Audience: [audience].
Tone: [tone]. Max [word_count] words.`}</PromptBlock>
      </Card>

      <Card>
        <div className="text-[#0a0a0a] mb-2" style={{ fontWeight: 700 }}>Why this matters</div>
        <ul className="space-y-2 text-[#6b7280]" style={{ lineHeight: 1.7 }}>
          <li>• Test one variable at a time - isolate what changes output.</li>
          <li>• Name variables meaningfully (<span className="font-mono text-[#0a0a0a]">[audience]</span>, not <span className="font-mono text-[#0a0a0a]">[x]</span>).</li>
          <li>• Default values help teammates fill them in faster.</li>
        </ul>
      </Card>

      {/* Common mistakes */}
      <Card>
        <div className="flex items-center gap-2 mb-3">
          <AlertTriangle className="w-4 h-4 text-amber-500" />
          <div className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>Common mistakes</div>
        </div>
        <div className="space-y-3">
          {[
            { bad: "[x] [y] [z]", good: "[subject] [mood] [style]", why: "Unnamed variables are impossible for others to fill in." },
            { bad: "[very detailed description of the thing]", good: "[subject]", why: "Variable names should be short labels, not full descriptions." },
            { bad: "A photo of something cool", good: "A photo of [subject] in [environment]", why: "Vague words should become variables so you can swap them." },
          ].map((m, i) => (
            <div key={i} className="grid md:grid-cols-[1fr_1fr_1.5fr] gap-3 border border-[#0a0a0a]/10 rounded-xl p-3">
              <div>
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-red-100 text-red-600 border border-red-200" style={{ fontWeight: 700 }}>Weak</span>
                <div className="font-mono text-[12px] text-[#0a0a0a] mt-1">{m.bad}</div>
              </div>
              <div>
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-green-100 text-green-700 border border-green-200" style={{ fontWeight: 700 }}>Strong</span>
                <div className="font-mono text-[12px] text-[#0a0a0a] mt-1">{m.good}</div>
              </div>
              <div className="text-[#6b7280] text-[12px]" style={{ lineHeight: 1.5 }}>{m.why}</div>
            </div>
          ))}
        </div>
      </Card>
    </Section>
  );
}

function Platforms() {
  const rows = [
    { name: "ChatGPT",    color: "#10a37f", strength: "Reasoning, long-form, code",       tip: "Use system role + step-by-step tasks." },
    { name: "Gemini",     color: "#4285f4", strength: "Multimodal, web-aware",             tip: "Give explicit sources and formats." },
    { name: "Grok",       color: "#0a0a0a", strength: "Conversational, current events",    tip: "Add tone cues; tolerates casual prompts." },
    { name: "Midjourney", color: "#4FC3F7", strength: "Stylized imagery, aesthetics",      tip: "Use commas; end with --ar and --s." },
    { name: "Firefly",    color: "#FF6B35", strength: "Brand-safe, commercial",            tip: "Short descriptive phrases beat paragraphs." },
    { name: "FLUX",       color: "#90b4ce", strength: "Photoreal, fine control",           tip: "Natural language, specify lens + lighting." },
  ];
  return (
    <Section title="Platform differences" icon={Scale}>
      <Card>
        <p className="text-[#6b7280] mb-4" style={{ lineHeight: 1.6 }}>
          The same prompt rarely performs the same across bots. Start with a text-first phrasing, then tune per platform.
        </p>
        <div className="overflow-auto">
          <table className="w-full">
            <thead className="text-[#6b7280] bg-[#0a0a0a]/5">
              <tr>
                <th className="text-left p-3">Platform</th>
                <th className="text-left p-3">Best at</th>
                <th className="text-left p-3">How to prompt</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.name} className="border-t border-[#0a0a0a]/10">
                  <td className="p-3">
                    <span className="inline-flex items-center gap-2 text-[#0a0a0a]" style={{ fontWeight: 600 }}>
                      <span className="w-3 h-3 rounded-full" style={{ background: r.color }} />
                      {r.name}
                    </span>
                  </td>
                  <td className="p-3 text-[#6b7280]">{r.strength}</td>
                  <td className="p-3 text-[#0a0a0a]">{r.tip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </Section>
  );
}

function Patterns() {
  const items = [
    { name: "Role + Task",        desc: "Set a persona, then give a single clear task.",                            ex: "You are a strict code reviewer. Review the function below for edge cases." },
    { name: "Chain-of-thought",   desc: "Ask the model to reason step by step before answering.",                  ex: "Think step by step. First list assumptions, then derive the answer." },
    { name: "Few-shot",           desc: "Show 2-3 examples so the model imitates the shape you want.",             ex: "Input: apple -> Output: fruit.\nInput: carrot -> Output: vegetable.\nInput: banana ->" },
    { name: "Structured output",  desc: "Demand JSON/markdown so results are parseable.",                         ex: `Return strict JSON: { "title": string, "score": number }` },
    { name: "Self-critique",      desc: "Ask the model to critique & revise its own draft.",                      ex: "Write the answer, then list 3 weaknesses, then rewrite." },
    { name: "Negative prompting", desc: "State what NOT to include.",                                              ex: "...minimal, clean. Avoid: text, watermarks, extra fingers." },
  ];
  return (
    <Section title="Prompt patterns" icon={Sparkles}>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((i) => (
          <Card key={i.name}>
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-4 h-4 text-[#0a0a0a]" />
              <div className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>{i.name}</div>
            </div>
            <p className="text-[#6b7280] mb-3">{i.desc}</p>
            <div className="bg-[#0a0a0a]/5 border border-[#0a0a0a]/10 rounded-lg p-3 font-mono text-[12px] text-[#0a0a0a] whitespace-pre-wrap">{i.ex}</div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// ─── Interactive Checklist ──────────────────────────────────────────────────

function Checklist() {
  const items = [
    "The task is a single, clear instruction.",
    "The output format is specified (length, structure, tone).",
    "Context includes audience and intent.",
    "Constraints list what to avoid, not just what to do.",
    "Variables are named meaningfully and used consistently.",
    "An example of ideal output is included where possible.",
    "The prompt has been tested on at least two platforms.",
  ];

  const [checked, setChecked] = useState<boolean[]>(Array(items.length).fill(false));
  const completedCount = checked.filter(Boolean).length;

  const toggleItem = (index: number) => {
    setChecked(prev => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  return (
    <Section title="Quality checklist" icon={ListChecks}>
      <Card>
        <ul className="space-y-2">
          {items.map((t, i) => (
            <li key={i}>
              <button
                role="checkbox"
                aria-checked={checked[i]}
                onClick={() => toggleItem(i)}
                className="w-full flex items-start gap-3 p-2 rounded-xl text-left transition-colors hover:bg-[#0a0a0a]/5"
              >
                <span className={`mt-0.5 shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                  checked[i]
                    ? "bg-[#4FC3F7] border-[#4FC3F7]"
                    : "border-[#0a0a0a]/20 bg-transparent"
                }`}>
                  {checked[i] && <Check className="w-3 h-3 text-white" />}
                </span>
                <span className={`transition-all ${checked[i] ? "line-through text-[#6b7280]" : "text-[#0a0a0a]"}`}>
                  {t}
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Progress bar */}
        <div className="mt-5 pt-4 border-t border-[#0a0a0a]/10">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#0a0a0a] text-[13px]" style={{ fontWeight: 600 }}>
              {completedCount}/{items.length} completed
            </span>
            {completedCount === items.length && (
              <span className="text-[12px] text-green-600" style={{ fontWeight: 700 }}>All done!</span>
            )}
          </div>
          <div className="h-2 rounded-full bg-[#0a0a0a]/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-[#4FC3F7]"
              animate={{ width: `${(completedCount / items.length) * 100}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 18 }}
            />
          </div>
        </div>
      </Card>
    </Section>
  );
}

// ─── Pro Tips (with 3 advanced tips) ────────────────────────────────────────

function Tips() {
  const tips = [
    { t: "Start broad, narrow fast",         d: "First prompt gets you a draft; 2-3 refinements beat one 'perfect' prompt." },
    { t: "Show, don't just tell",            d: "One example is worth three adjectives. Few-shot wins on tone." },
    { t: "Separate instructions from content", d: "Use clear delimiters (---, ```). Models follow structure." },
    { t: "Name the failure mode",            d: "Tell it what NOT to do. 'Avoid cliches.' 'No bullet points.'" },
    { t: "Version your prompts",             d: "Save what works. Track the change + the output improvement." },
    { t: "Temperature matters",              d: "Lower for code/JSON, higher for creative. If the app lets you set it." },
    { t: "Prompt chaining",                  d: "Break complex tasks into a multi-step pipeline. Step 1 output feeds Step 2. Each link is simpler to debug than one mega-prompt." },
    { t: "Hallucination prevention",         d: "Ground the model: 'Only use facts from the provided text.' Add 'If unsure, say so.' Cite sources when possible." },
    { t: "Token & length awareness",         d: "Long prompts eat into the response budget. Front-load the most important instructions. Trim examples if the model is cutting off." },
  ];
  return (
    <Section title="Pro tips" icon={Lightbulb}>
      <div className="grid md:grid-cols-2 gap-4">
        {tips.map((x) => (
          <Card key={x.t}>
            <div className="flex items-center gap-2 mb-1">
              <Lightbulb className="w-4 h-4 text-[#4FC3F7]" />
              <div className="text-[#0a0a0a]" style={{ fontWeight: 700 }}>{x.t}</div>
            </div>
            <p className="text-[#6b7280]" style={{ lineHeight: 1.6 }}>{x.d}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// ─── Playground ─────────────────────────────────────────────────────────────

type PartKey = "role" | "task" | "context" | "constraints" | "format" | "examples";

const partDefs: { key: PartKey; name: string; color: string; sample: string }[] = [
  { key: "role",        name: "Role",        color: "#0a0a0a", sample: "You are a senior copywriter with 10 years of B2B SaaS experience." },
  { key: "task",        name: "Task",        color: "#0a0a0a", sample: "Write a 3-line LinkedIn hook announcing a new AI prompt library." },
  { key: "context",     name: "Context",     color: "#0a0a0a", sample: "Audience: early-stage founders who skim feeds fast." },
  { key: "constraints", name: "Constraints", color: "#0a0a0a", sample: "Max 60 words. Punchy tone. No emojis. No hashtags." },
  { key: "format",      name: "Format",      color: "#0a0a0a", sample: "Return as a 3-item markdown list." },
  { key: "examples",    name: "Examples",    color: "#0a0a0a", sample: "Example tone: \"Shipping beats perfection. Here's why...\"" },
];

function Playground() {
  const [on, setOn] = useState<Record<PartKey, boolean>>({
    role: true, task: true, context: true, constraints: false, format: false, examples: false,
  });
  const [copied, setCopied] = useState(false);

  const assembled = partDefs.filter((p) => on[p.key]).map((p) => p.sample).join("\n");
  const count = Object.values(on).filter(Boolean).length;
  const score = Math.min(5, Math.round((count / 6) * 5 * 10) / 10);

  const copy = () => {
    navigator.clipboard?.writeText(assembled);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <Section title="Playground" icon={Play}>
      <Card>
        <p className="text-[#6b7280] mb-5" style={{ lineHeight: 1.6 }}>
          Toggle prompt parts on and off - watch the prompt rebuild itself in real time.
          The more complete the anatomy, the higher the quality score.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {partDefs.map((p) => {
            const active = on[p.key];
            return (
              <motion.button
                key={p.key}
                onClick={() => setOn((s) => ({ ...s, [p.key]: !s[p.key] }))}
                whileTap={{ scale: 0.94 }}
                className="px-3 py-1.5 rounded-full border-2 transition"
                style={{
                  background:   active ? p.color : "transparent",
                  color:        active ? "#ffffff" : "#0a0a0a",
                  borderColor:  active ? p.color : "#0a0a0a33",
                  fontWeight:   700,
                  fontSize:     "13px",
                }}
              >
                {active ? <><span className="inline-block w-1.5 h-1.5 rounded-full bg-current mr-1.5" />{p.name}</> : <>{`+ ${p.name}`}</>}
              </motion.button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-[1fr_220px] gap-5">
          <div className="relative bg-[#0a0a0a]/5 border border-[#0a0a0a]/10 rounded-xl p-6 font-mono text-[13px] text-[#0a0a0a] whitespace-pre-wrap leading-relaxed min-h-[240px]">
            <AnimatePresence mode="popLayout">
              {partDefs.filter((p) => on[p.key]).map((p) => (
                <motion.div
                  key={p.key}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                  className="mb-4 flex items-start gap-3"
                >
                  <span className="inline-block mt-1.5 w-2 h-2 rounded-full shrink-0" style={{ background: p.color }} />
                  {p.sample}
                </motion.div>
              ))}
              {count === 0 && (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[#6b7280]">
                  Add parts above to build your prompt...
                </motion.div>
              )}
            </AnimatePresence>
            <button
              onClick={copy}
              disabled={count === 0}
              className="absolute top-2 right-2 p-1.5 rounded-md bg-white border border-[#0a0a0a]/10 text-[#6b7280] hover:text-[#0a0a0a] disabled:opacity-40"
              aria-label="Copy prompt"
            >
              <Copy className="w-3.5 h-3.5" />
            </button>
            <AnimatePresence>
              {copied && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute top-2 right-12 px-2 py-1 rounded bg-[#4FC3F7] text-white text-[11px]"
                  style={{ fontWeight: 700 }}
                >
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-gradient-to-br from-[#4FC3F7]/20 to-[#4FC3F7]/10 border border-[#0a0a0a]/10 rounded-xl p-4">
            <div className="text-[#6b7280] text-[12px]" style={{ fontWeight: 600 }}>QUALITY SCORE</div>
            <div className="flex items-baseline gap-1 mt-1 mb-3">
              <motion.span
                key={score}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-[#0a0a0a]"
                style={{ fontSize: "36px", fontWeight: 800 }}
              >
                {score.toFixed(1)}
              </motion.span>
              <span className="text-[#6b7280]">/ 5</span>
            </div>
            <div className="h-2 rounded-full bg-[#0a0a0a]/10 overflow-hidden mb-3">
              <motion.div
                className="h-full bg-gradient-to-r from-[#4FC3F7] to-[#2f8fc7]"
                animate={{ width: `${(score / 5) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
            </div>
            <div className="text-[#0a0a0a]" style={{ fontSize: "12px", fontWeight: 600 }}>
              {count}/6 parts included
            </div>
            <div className="text-[#6b7280] text-[12px] mt-2" style={{ lineHeight: 1.5 }}>
              {count < 3 && "Add more parts - prompts work best with role, task, and context at minimum."}
              {count >= 3 && count < 5 && "Good start. Add constraints or format for more predictable output."}
              {count >= 5 && "Strong prompt. This is the structure pros reach for."}
            </div>
          </div>
        </div>
      </Card>
    </Section>
  );
}

// ─── How-To Guide helpers ────────────────────────────────────────────────────

function HowToStep({ n, text }: { n: number; text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="shrink-0 w-7 h-7 rounded-full bg-[#4FC3F7] flex items-center justify-center text-white" style={{ fontWeight: 800, fontSize: "13px" }}>
        {n}
      </span>
      <span className="text-[#0a0a0a] pt-0.5" style={{ lineHeight: 1.6 }}>{text}</span>
    </div>
  );
}

function StepCard({ stepIndex, totalSteps, done, onToggle, children }: {
  stepIndex: number;
  totalSteps: number;
  done: boolean[];
  onToggle: (i: number) => void;
  children: React.ReactNode;
}) {
  const isDone = done[stepIndex];
  // Steps unlock in order — step N is only actionable once step N-1 is marked done.
  const locked = stepIndex > 0 && !done[stepIndex - 1];

  return (
    <div
      className="border rounded-2xl p-6 transition-all duration-300 relative"
      style={{
        borderColor: isDone ? "#10b981" : "rgba(10, 10, 10, 0.10)",
        background: isDone ? "rgba(16, 185, 129, 0.04)" : "#ffffff",
        opacity: locked ? 0.55 : 1,
      }}
    >
      {isDone && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[#10b981]" style={{ fontSize: "12px", fontWeight: 700 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#10b981"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Completed
        </div>
      )}
      {locked && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[#6b7280]" style={{ fontSize: "12px", fontWeight: 700 }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
          Locked
        </div>
      )}
      <div style={locked ? { pointerEvents: "none" } : undefined}>{children}</div>
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#0a0a0a]/10">
        {locked ? (
          <span className="text-[#6b7280] text-[13px]" style={{ fontWeight: 600 }}>
            Complete Step {stepIndex} first
          </span>
        ) : isDone ? (
          <button
            onClick={() => onToggle(stepIndex)}
            className="px-4 py-2 rounded-xl text-[13px] transition-all border border-[#4FC3F7]/30 text-[#0a0a0a] hover:bg-[#4FC3F7]/5 flex items-center gap-1.5"
            style={{ fontWeight: 600 }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Undo Step {stepIndex + 1}
          </button>
        ) : (
          <button
            onClick={() => onToggle(stepIndex)}
            className="px-4 py-2 rounded-xl text-[13px] transition-all text-white hover:opacity-90"
            style={{ fontWeight: 600, background: "#4FC3F7" }}
          >
            Mark Step {stepIndex + 1} Done
          </button>
        )}
        <span className="text-[#6b7280] text-[11px] ml-auto" style={{ fontWeight: 600 }}>
          {done.filter(Boolean).length}/{totalSteps} completed
        </span>
      </div>
    </div>
  );
}

function useStepDone(count: number) {
  const [done, setDone] = useState<boolean[]>(Array(count).fill(false));
  const toggle = (i: number) => setDone(prev => {
    const next = [...prev];
    next[i] = !next[i];
    return next;
  });
  return { done, toggle };
}

function ToolBadge({ name, color }: { name: string; color: string }) {
  return (
    <span className="px-3 py-1 rounded-full border-2 text-[13px]" style={{ background: `${color}18`, color, borderColor: `${color}55`, fontWeight: 700 }}>
      {name}
    </span>
  );
}

function ProTip({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <span className="text-[15px]">✅</span>
      <span className="text-[#0a0a0a]" style={{ lineHeight: 1.6 }}>{text}</span>
    </div>
  );
}

// ─── Image Generation Guide (consolidated 8 -> 5 steps) ────────────────────

function ImageGenGuide() {
  const { done, toggle } = useStepDone(5);

  return (
    <Section title="Image Generation" icon={Image}>
      <StepCard stepIndex={0} totalSteps={5} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 1 - Choose Your Tool & Set Up</div>
        <p className="text-[#6b7280] mb-4" style={{ lineHeight: 1.6 }}>Pick an image generation tool, create an account, and get familiar with the interface.</p>
        <div className="flex flex-wrap gap-2">
          <ToolBadge name="ChatGPT"        color="#10a37f" />
          <ToolBadge name="Leonardo AI"    color="#7C3AED" />
          <ToolBadge name="Ideogram"       color="#0a0a0a" />
          <ToolBadge name="Midjourney"     color="#4FC3F7" />
          <ToolBadge name="Flux"           color="#90b4ce" />
          <ToolBadge name="Adobe Firefly"  color="#FF6B35" />
        </div>
      </StepCard>

      <StepCard stepIndex={1} totalSteps={5} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 2 - Define Your Goal</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Ask yourself: What image do I need, and where will it be used?</p>
        <div className="flex flex-wrap gap-2">
          {["Poster", "Product Shot", "Advertisement", "Social Media Post", "Portrait", "Logo", "Concept Art"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a] text-[12px]" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </StepCard>

      <StepCard stepIndex={2} totalSteps={5} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 3 - Write Your Prompt</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Use this formula: Subject + Style + Background + Quality modifiers.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {["Subject", "Style", "Background", "Quality"].map((s, i) => (
            <div key={s} className="border border-[#0a0a0a]/10 rounded-xl p-3 text-center">
              <div className="w-6 h-6 rounded-full bg-[#4FC3F7] text-white flex items-center justify-center mx-auto mb-1" style={{ fontWeight: 800, fontSize: "11px" }}>{i + 1}</div>
              <div className="text-[#0a0a0a]" style={{ fontWeight: 700, fontSize: "13px" }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Before/After example */}
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div className="border border-red-200 bg-red-50/50 rounded-xl p-3">
            <span className="text-[11px] text-red-500" style={{ fontWeight: 700 }}>BEFORE</span>
            <div className="font-mono text-[12px] text-[#0a0a0a] mt-1">A coffee cup</div>
          </div>
          <div className="border border-green-200 bg-green-50/50 rounded-xl p-3">
            <span className="text-[11px] text-green-600" style={{ fontWeight: 700 }}>AFTER</span>
            <div className="font-mono text-[12px] text-[#0a0a0a] mt-1">Luxury coffee cup on a wooden table, cinematic lighting, ultra realistic, shallow depth of field</div>
          </div>
        </div>

        <div className="text-[#6b7280] text-[12px] mb-2" style={{ fontWeight: 600 }}>FULL EXAMPLE</div>
        <PromptBlock>{`Luxury coffee cup,
wooden table,
cinematic lighting,
ultra realistic`}</PromptBlock>
      </StepCard>

      <StepCard stepIndex={3} totalSteps={5} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 4 - Refine & Iterate</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Generate, review, and add more details to improve the output. Experiment with these modifiers:</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Lighting", "Camera Angle", "Colors", "Mood", "Lens Type", "Composition"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#4FC3F7]/20 text-[#0a0a0a] text-[12px] border border-[#4FC3F7]/50" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
        <div className="border border-[#0a0a0a]/10 rounded-xl p-4 bg-[#0a0a0a]/3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-[#0a0a0a] text-[13px]" style={{ fontWeight: 700 }}>Negative prompting</span>
          </div>
          <p className="text-[#6b7280] text-[12px]" style={{ lineHeight: 1.5 }}>
            Tell the AI what to avoid: "No text, no watermarks, no extra fingers, no blurry edges." This is especially powerful in Midjourney (--no) and Stable Diffusion.
          </p>
        </div>
      </StepCard>

      <StepCard stepIndex={4} totalSteps={5} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 5 - Apply & Publish</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Download your image (PNG, JPG, or WebP) and use it in your projects.</p>
        <div className="flex flex-wrap gap-2">
          {["Website", "Instagram", "Marketing", "Presentations", "Posters", "Product Packaging"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#4FC3F7]/10 text-[#0a0a0a] text-[12px] border border-[#4FC3F7]/30" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </StepCard>
    </Section>
  );
}

// ─── Website Generation Guide ────────────────────────────────────────────────

const FEATURED_WEBSITE_IDS = [
  "bw_01", "bw_04", "bw_05", "bw_07",
  "dpecom_01",
  "lp_07", "lp_15",
  "pcpp01", "pcpp05", "pcpp07", "pcpp11",
  "pfecomm_01", "pfecomm_02", "pfecomm_04",
  "portfolio_04",
  "sbecom_01", "sbecom_03",
];

function FeaturedWebsiteCard({ design, onClick }: { design: WebsiteDesign; onClick: () => void }) {
  const [thumbError, setThumbError] = useState(false);
  const thumbUrl = design.screenshot || `/previews/${design.slug}/thumb.jpg`;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="flex-shrink-0 rounded-2xl overflow-hidden border border-[#0a0a0a]/10 bg-white text-left group"
      style={{ width: "260px" }}
    >
      <div className="w-full aspect-[16/10] bg-[#f5f5f5] overflow-hidden relative">
        {!thumbError ? (
          <img
            src={thumbUrl}
            alt={design.title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
            onError={() => setThumbError(true)}
          />
        ) : (
          <iframe
            src={`/previews/${design.slug}/index.html`}
            title={`${design.title} preview`}
            className="pointer-events-none"
            style={{ width: "1280px", height: "800px", transform: "scale(0.203)", transformOrigin: "top left", border: "none" }}
            tabIndex={-1}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
          <span className="text-white text-[11px] flex items-center gap-1" style={{ fontWeight: 600 }}>
            View Details →
          </span>
        </div>
      </div>
      <div className="p-3">
        <div className="text-[#0a0a0a] text-[13px] truncate" style={{ fontWeight: 700 }}>{design.title}</div>
        <div className="text-[#6b7280] text-[11px] truncate mt-0.5">{design.category}</div>
      </div>
    </motion.button>
  );
}

function WebGenGuide({ go }: { go: (p: string) => void }) {
  const featured = FEATURED_WEBSITE_IDS
    .map(id => websiteDesigns.find(d => d.id === id))
    .filter((d): d is WebsiteDesign => Boolean(d));
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueePaused = useRef(false);
  const marqueeResumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pauseMarquee = () => { marqueePaused.current = true; if (marqueeResumeTimer.current) clearTimeout(marqueeResumeTimer.current); };
  const resumeMarqueeSoon = (delay = 0) => {
    if (marqueeResumeTimer.current) clearTimeout(marqueeResumeTimer.current);
    marqueeResumeTimer.current = setTimeout(() => { marqueePaused.current = false; }, delay);
  };

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;
    let raf: number;
    const tick = () => {
      if (!marqueePaused.current) {
        el.scrollLeft += 0.5;
        const half = el.scrollWidth / 2;
        if (el.scrollLeft >= half) el.scrollLeft -= half;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf); if (marqueeResumeTimer.current) clearTimeout(marqueeResumeTimer.current); };
  }, []);

  return (
    <Section title="Website Generation" icon={Globe}>
      {/* Featured Websites Showcase */}
      <div className="rounded-2xl border border-[#0a0a0a]/10 bg-gradient-to-br from-[#0a0a0a]/[0.03] to-[#4FC3F7]/[0.03] p-5 -mx-1">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[#0a0a0a] text-[15px]" style={{ fontWeight: 800 }}>Top Website Designs</div>
            <div className="text-[#6b7280] text-[12px] mt-0.5">Hand-picked from our library - click to explore</div>
          </div>
          <button
            onClick={() => go("library:website")}
            className="text-[#0a0a0a] hover:text-[#4FC3F7] transition-colors text-[12px]"
            style={{ fontWeight: 600 }}
          >
            View all →
          </button>
        </div>
        <div
          ref={marqueeRef}
          className="overflow-x-auto overflow-y-hidden no-scrollbar"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)",
            WebkitOverflowScrolling: "touch",
          }}
          onMouseEnter={pauseMarquee}
          onMouseLeave={() => resumeMarqueeSoon(0)}
          onTouchStart={pauseMarquee}
          onTouchEnd={() => resumeMarqueeSoon(2500)}
          onPointerDown={pauseMarquee}
          onPointerUp={() => resumeMarqueeSoon(1000)}
          onPointerCancel={() => resumeMarqueeSoon(1000)}
        >
          <div className="flex gap-4 py-1" style={{ width: "max-content" }}>
            {[...featured, ...featured].map((d, i) => (
              <FeaturedWebsiteCard
                key={`${d.id}-${i}`}
                design={d}
                onClick={() => go("website-detail:" + d.slug)}
              />
            ))}
          </div>
        </div>
        <style>{`
          .no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
          .no-scrollbar::-webkit-scrollbar { display: none; }
        `}</style>
      </div>

      <Card>
        <div className="text-[#0a0a0a] mb-2" style={{ fontWeight: 700 }}>What is Website Generation?</div>
        <p className="text-[#6b7280]" style={{ lineHeight: 1.6 }}>
          Website prompts help AI generate full landing pages, SaaS interfaces, portfolio sites, e-commerce
          stores, and agency websites - complete with layout, components, and styling.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {["Landing pages", "SaaS websites", "Portfolio websites", "E-commerce stores", "Agency websites"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a] text-[12px]" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </Card>

      <Card>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Popular Tools</div>
        <div className="flex flex-wrap gap-2">
          <ToolBadge name="Lovable"   color="#4FC3F7" />
          <ToolBadge name="Bolt"      color="#0a0a0a" />
          <ToolBadge name="v0"        color="#0a0a0a" />
          <ToolBadge name="Replit AI" color="#4FC3F7" />
          <ToolBadge name="Cursor"    color="#10a37f" />
          <ToolBadge name="CodeSX"    color="#90b4ce" />
        </div>
      </Card>

      <Card>
        <div className="text-[#0a0a0a] mb-4" style={{ fontWeight: 700 }}>How to Use</div>
        <div className="space-y-4">
          <HowToStep n={1} text="Choose a website prompt from the Library." />
          <HowToStep n={2} text="Copy the prompt." />
          <HowToStep n={3} text="Paste into Lovable, Bolt, or v0 and generate." />
          <HowToStep n={4} text="Refine with follow-up prompts for colors, fonts, and spacing." />
        </div>
        <div className="mt-5">
          <div className="text-[#6b7280] text-[12px] mb-2" style={{ fontWeight: 600 }}>EXAMPLE PROMPT</div>
          <PromptBlock>{`Create a modern AI SaaS landing page.

Features:
- Hero section with headline + CTA
- Feature cards (3-column)
- Pricing section
- Testimonials
- FAQ
- Dark mode toggle

Style:
- Minimal, Apple-inspired
- Use Inter font
- Premium SaaS aesthetic`}</PromptBlock>
        </div>
        <div className="mt-5">
          <div className="text-[#6b7280] text-[12px] mb-2" style={{ fontWeight: 600 }}>REFINEMENT PROMPT</div>
          <PromptBlock>{`Use purple gradients.
Add glassmorphism to cards.
Increase whitespace between sections.
Make the CTA button 48px height.`}</PromptBlock>
        </div>
      </Card>

      <Card>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Pro Tips</div>
        <div className="space-y-3">
          <ProTip text="Always specify layout - '3-column feature section', 'full-width hero'." />
          <ProTip text="Name every component - Navbar, Hero, Features, Pricing, Footer." />
          <ProTip text="Reference real design systems - 'Inspired by Linear and Figma'." />
          <ProTip text="Iterate in small steps - one refinement prompt per change is easier to track." />
        </div>
      </Card>
    </Section>
  );
}

// ─── Video Generation Guide (consolidated 8 -> 5 steps) ────────────────────

function VideoGenGuide() {
  const { done, toggle } = useStepDone(5);

  return (
    <Section title="Video Generation" icon={Video}>
      <StepCard stepIndex={0} totalSteps={5} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 1 - Choose Your Tool & Set Up</div>
        <p className="text-[#6b7280] mb-4" style={{ lineHeight: 1.6 }}>Pick a video AI tool, create an account, and explore the interface. Most tools offer text-to-video and image-to-video modes.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <ToolBadge name="Seedance"  color="#0a0a0a" />
          <ToolBadge name="Kling"     color="#4FC3F7" />
          <ToolBadge name="Hailuo"    color="#4FC3F7" />
          <ToolBadge name="Runway"    color="#7C3AED" />
          <ToolBadge name="Pika"      color="#10a37f" />
          <ToolBadge name="Veo"       color="#4285f4" />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="border border-[#0a0a0a]/10 rounded-xl p-3">
            <div className="text-[#0a0a0a] text-[13px]" style={{ fontWeight: 700 }}>Text-to-Video</div>
            <p className="text-[#6b7280] text-[12px] mt-1">Describe a scene from scratch. Best for creative concepts.</p>
          </div>
          <div className="border border-[#0a0a0a]/10 rounded-xl p-3">
            <div className="text-[#0a0a0a] text-[13px]" style={{ fontWeight: 700 }}>Image-to-Video</div>
            <p className="text-[#6b7280] text-[12px] mt-1">Animate a still image. Best for product shots and portraits.</p>
          </div>
        </div>
      </StepCard>

      <StepCard stepIndex={1} totalSteps={5} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 2 - Define Your Video Type</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>What kind of video do you need? This determines the right duration and style.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Advertisement", "Product Demo", "Short Film", "Anime", "Reel", "Commercial", "Music Video"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a] text-[12px]" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
        <div className="border border-[#0a0a0a]/10 rounded-xl p-3 bg-[#0a0a0a]/3">
          <div className="text-[#0a0a0a] text-[12px]" style={{ fontWeight: 700 }}>Duration guidance</div>
          <p className="text-[#6b7280] text-[12px] mt-1" style={{ lineHeight: 1.5 }}>
            Most AI tools generate 4-10 second clips. Plan for multiple short clips stitched together rather than one long take. Reels and ads work best at 5s per scene.
          </p>
        </div>
      </StepCard>

      <StepCard stepIndex={2} totalSteps={5} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 3 - Write Your Prompt</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Use this formula: Subject + Action + Camera Movement + Environment.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {["Subject", "Action", "Camera Movement", "Environment"].map((s, i) => (
            <div key={s} className="border border-[#0a0a0a]/10 rounded-xl p-3 text-center">
              <div className="w-6 h-6 rounded-full bg-[#4FC3F7] text-white flex items-center justify-center mx-auto mb-1" style={{ fontWeight: 800, fontSize: "11px" }}>{i + 1}</div>
              <div className="text-[#0a0a0a]" style={{ fontWeight: 700, fontSize: "13px" }}>{s}</div>
            </div>
          ))}
        </div>

        {/* Before/After */}
        <div className="grid md:grid-cols-2 gap-3 mb-4">
          <div className="border border-red-200 bg-red-50/50 rounded-xl p-3">
            <span className="text-[11px] text-red-500" style={{ fontWeight: 700 }}>BEFORE</span>
            <div className="font-mono text-[12px] text-[#0a0a0a] mt-1">A car driving in a city at night</div>
          </div>
          <div className="border border-green-200 bg-green-50/50 rounded-xl p-3">
            <span className="text-[11px] text-green-600" style={{ fontWeight: 700 }}>AFTER</span>
            <div className="font-mono text-[12px] text-[#0a0a0a] mt-1">A luxury sports car drifting through a neon-lit futuristic city, cinematic drone tracking shot, rain reflections on wet asphalt, night atmosphere</div>
          </div>
        </div>

        <div className="text-[#6b7280] text-[12px] mb-2" style={{ fontWeight: 600 }}>FULL EXAMPLE</div>
        <PromptBlock>{`A luxury sports car driving through a futuristic city,
cinematic drone shot,
rain reflections,
night atmosphere`}</PromptBlock>
      </StepCard>

      <StepCard stepIndex={3} totalSteps={5} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 4 - Refine & Iterate</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Generate, preview, and add camera movements or motion cues to enhance your video.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {["Zoom In", "Tracking Shot", "Orbit Shot", "Slow Motion", "Dolly Push", "Pan Left/Right"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#4FC3F7]/20 text-[#0a0a0a] text-[12px] border border-[#4FC3F7]/50" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
        <div className="border border-[#0a0a0a]/10 rounded-xl p-4 bg-[#0a0a0a]/3">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="w-3.5 h-3.5 text-[#4FC3F7]" />
            <span className="text-[#0a0a0a] text-[13px]" style={{ fontWeight: 700 }}>Motion tips</span>
          </div>
          <ul className="text-[#6b7280] text-[12px] space-y-1" style={{ lineHeight: 1.5 }}>
            <li>• Describe motion explicitly: "slowly zooms in" beats "close up".</li>
            <li>• One camera movement per clip works better than combining many.</li>
            <li>• For smooth results, keep the subject and action simple per generation.</li>
          </ul>
        </div>
      </StepCard>

      <StepCard stepIndex={4} totalSteps={5} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 5 - Export & Publish</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Download your video (MP4 or MOV) and use it across platforms.</p>
        <div className="flex flex-wrap gap-2">
          {["Instagram", "YouTube", "TikTok", "Website", "Marketing Campaign", "Product Page"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#4FC3F7]/10 text-[#0a0a0a] text-[12px] border border-[#4FC3F7]/30" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </StepCard>
    </Section>
  );
}

// ─── Code Generation Guide (converted to 4-step StepCards) ──────────────────

function CodeGenGuide() {
  const { done, toggle } = useStepDone(4);

  return (
    <Section title="Code Generation" icon={Code2}>
      <StepCard stepIndex={0} totalSteps={4} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 1 - Choose Your Tool</div>
        <p className="text-[#6b7280] mb-4" style={{ lineHeight: 1.6 }}>
          Pick a code generation tool. Each excels at different tasks - Cursor and Copilot for inline editing, ChatGPT and Claude for full components.
        </p>
        <div className="flex flex-wrap gap-2">
          <ToolBadge name="Cursor"         color="#10a37f" />
          <ToolBadge name="Claude Code"    color="#4FC3F7" />
          <ToolBadge name="GitHub Copilot" color="#0a0a0a" />
          <ToolBadge name="ChatGPT"        color="#10a37f" />
        </div>
      </StepCard>

      <StepCard stepIndex={1} totalSteps={4} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 2 - Define Requirements</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>
          Specify the stack, component type, and constraints before writing the prompt.
        </p>
        <div className="flex flex-wrap gap-2">
          {["React components", "Landing pages", "Dashboards", "SaaS interfaces", "Utility functions", "API routes"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a] text-[12px]" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </StepCard>

      <StepCard stepIndex={2} totalSteps={4} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 3 - Write & Generate</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>
          Write a structured prompt with stack, features, and constraints. Paste it into your tool and generate.
        </p>
        <PromptBlock>{`Build a responsive pricing section in React + Tailwind CSS.

Requirements:
- 3 tiers: Free, Pro, Enterprise
- Dark mode support
- Highlight the middle (Pro) tier
- Smooth hover effects on cards
- Include a monthly/yearly toggle
- TypeScript props for plan data`}</PromptBlock>
      </StepCard>

      <StepCard stepIndex={3} totalSteps={4} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 4 - Refine</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>
          Review the generated code, then use follow-up prompts to add features one at a time.
        </p>
        <div className="space-y-3">
          <ProTip text="Specify the exact stack - React, Tailwind, TypeScript, shadcn/ui." />
          <ProTip text="State constraints upfront - 'no external dependencies', 'single file'." />
          <ProTip text="Ask for TypeScript interfaces - better output and easier to refine." />
          <ProTip text="Use follow-up prompts to add features one at a time, not all at once." />
        </div>
      </StepCard>
    </Section>
  );
}

// ─── Content Generation Guide (converted to 4-step StepCards) ───────────────

function ContentGenGuide() {
  const { done, toggle } = useStepDone(4);

  return (
    <Section title="Content Generation" icon={FileText}>
      <StepCard stepIndex={0} totalSteps={4} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 1 - Choose Your Tool</div>
        <p className="text-[#6b7280] mb-4" style={{ lineHeight: 1.6 }}>
          Pick a text generation tool. Each has different strengths for tone, length, and creativity.
        </p>
        <div className="flex flex-wrap gap-2">
          <ToolBadge name="ChatGPT" color="#10a37f" />
          <ToolBadge name="Claude"  color="#4FC3F7" />
          <ToolBadge name="Gemini"  color="#4285f4" />
        </div>
      </StepCard>

      <StepCard stepIndex={1} totalSteps={4} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 2 - Define Your Brief</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>
          What type of content do you need? Define the format, audience, and goal before writing the prompt.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Blog posts", "Social captions", "Marketing copy", "Email sequences", "Ad copy", "Scripts"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a] text-[12px]" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </StepCard>

      <StepCard stepIndex={2} totalSteps={4} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 3 - Write & Generate</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>
          Write a structured prompt with tone, audience, length, and constraints. Paste it and generate.
        </p>
        <PromptBlock>{`Write a LinkedIn post announcing an AI startup launch.

Tone: Professional but approachable
Length: 150-200 words
Audience: Startup founders and early adopters

Include:
- A hook in the first line
- 2-3 key benefits
- A clear call to action

Avoid: Buzzwords, excessive emojis, passive voice`}</PromptBlock>
      </StepCard>

      <StepCard stepIndex={3} totalSteps={4} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 4 - Refine & Publish</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>
          Review the output, adjust tone or length with follow-up prompts, then publish.
        </p>
        <div className="space-y-3">
          <ProTip text="Always define tone - professional, casual, witty, authoritative." />
          <ProTip text="Set an exact word count - 'under 150 words' prevents over-generation." />
          <ProTip text="Include a negative constraint - 'avoid cliches', 'no bullet points'." />
          <ProTip text="Provide an example of ideal output - one sample beats three adjectives." />
        </div>
      </StepCard>
    </Section>
  );
}
