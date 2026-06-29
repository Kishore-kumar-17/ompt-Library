import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import { BookOpen, Target, Layers, Wand2, Sparkles, Scale, ListChecks, Lightbulb, Copy, ChevronRight, Play, Image, Globe, Video, Code2, FileText, ArrowLeft } from "lucide-react";
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
  const [active, setActive] = useState(initialSection || "playground");

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-12 text-[#0a0a0a]">
      <button onClick={() => go("home")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-3 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>
      <div className="flex items-center gap-2 text-[#0a0a0a] mb-3">
        <BookOpen className="w-5 h-5" />
        <span style={{ fontWeight: 700 }}>Prompt Guide</span>
      </div>
      <h1 className="text-4xl mb-3">How prompts actually work</h1>
      <p className="text-[#6b7280] max-w-2xl mb-10" style={{ fontSize: "17px", lineHeight: 1.6 }}>
        A prompt is an instruction you give an AI model. Great prompts are specific, structured, and testable.
        This guide breaks down the parts, shows the patterns that work, and the traps to avoid.
      </p>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="lg:sticky lg:top-6 self-start">
          <div className="bg-[#bce4d8] border border-[#0a0a0a]/15 rounded-2xl p-2">
            <div className="px-3 pt-1 pb-2 text-[10px] uppercase tracking-widest text-[#6b7280]" style={{ fontWeight: 700 }}>
              Prompt Craft
            </div>
            {sections.filter(s => s.group === "craft").map((s) => {
              const Icon = s.icon;
              const on = active === s.key;
              return (
                <button
                  key={s.key}
                  onClick={() => setActive(s.key)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition ${
                    on ? "bg-[#4FC3F7] text-[#0a0a0a]" : "text-[#6b7280] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5"
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
                  onClick={() => setActive(s.key)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition ${
                    on ? "bg-[#4FC3F7] text-[#0a0a0a]" : "text-[#6b7280] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span style={{ fontWeight: on ? 700 : 500 }}>{s.label}</span>
                  <ChevronRight className={`w-4 h-4 ml-auto ${on ? "opacity-100" : "opacity-40"}`} />
                </button>
              );
            })}
          </div>

          <div className="mt-5 bg-gradient-to-br from-[#4FC3F7]/15 to-[#4FC3F7]/10 border border-[#0a0a0a]/15 rounded-2xl p-5">
            <div className="text-[#0a0a0a] mb-1" style={{ fontWeight: 700 }}>Ready to try?</div>
            <p className="text-[#6b7280] mb-3" style={{ fontSize: "14px" }}>Jump into the library and copy a tested prompt.</p>
            <button onClick={() => go("library")} className="h-9 px-4 rounded-full bg-[#4FC3F7] text-[#0a0a0a]" style={{ fontWeight: 700 }}>
              Browse prompts
            </button>
          </div>
        </aside>

        <div className="min-w-0">
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
  return <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-6">{children}</div>;
}

function PromptBlock({ children }: any) {
  return (
    <div className="relative bg-[#0a0a0a]/5 border border-[#0a0a0a]/15 rounded-xl p-4 font-mono text-[13px] text-[#0a0a0a] whitespace-pre-wrap leading-relaxed">
      <button
        onClick={() => {
          const t = typeof children === "string" ? children : "";
          navigator.clipboard?.writeText(t);
          toast.success("Prompt copied");
        }}
        className="absolute top-2 right-2 p-1.5 rounded-md bg-white border border-[#0a0a0a]/15 text-[#6b7280] hover:text-[#0a0a0a]"
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

function Anatomy() {
  const parts = [
    { color: "#4FC3F7", name: "Role",        desc: "Who the AI should act as.",                     ex: "You are a senior copywriter…" },
    { color: "#0a0a0a", name: "Task",        desc: "What to produce, clearly.",                     ex: "Write a 3-line LinkedIn hook…" },
    { color: "#90b4ce", name: "Context",     desc: "Relevant background or audience.",              ex: "Audience: early-stage founders." },
    { color: "#4FC3F7", name: "Constraints", desc: "Length, tone, format rules.",                   ex: "Max 60 words. No emojis." },
    { color: "#6b7280", name: "Format",      desc: "How output should be shaped.",                  ex: "Return as JSON with 3 fields." },
    { color: "#4FC3F7", name: "Examples",    desc: "Few-shot samples (optional but powerful).",     ex: "Example: 'Shipping beats perfection.'" },
  ];

  return (
    <Section title="Anatomy of a prompt" icon={Layers}>
      <Card>
        <p className="text-[#6b7280] mb-5" style={{ lineHeight: 1.6 }}>
          Most high-quality prompts are made of six repeatable parts. You don't need all of them every time —
          but naming them helps you debug when output is off.
        </p>
        <div className="grid md:grid-cols-2 gap-3">
          {parts.map((p) => (
            <div key={p.name} className="border border-[#0a0a0a]/15 rounded-xl p-4">
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
Example tone: "Shipping beats perfection. Here's why…"`}</PromptBlock>
      </Card>
    </Section>
  );
}

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
background: [environment].`}</PromptBlock>
        <div className="grid md:grid-cols-3 gap-3 mt-5">
          {[
            { name: "subject", ex: "vintage motorcycle" },
            { name: "mood",    ex: "cinematic golden-hour" },
            { name: "style",   ex: "symmetrical wide-angle" },
          ].map((v) => (
            <div key={v.name} className="border border-[#0a0a0a]/15 rounded-xl p-3">
              <span className="font-mono text-[12px] bg-[#4FC3F7] px-1.5 py-0.5 rounded text-[#0a0a0a]">[{v.name}]</span>
              <div className="text-[#6b7280] mt-2 text-[13px]">{v.ex}</div>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <div className="text-[#0a0a0a] mb-2" style={{ fontWeight: 700 }}>Why this matters</div>
        <ul className="space-y-2 text-[#6b7280]" style={{ lineHeight: 1.7 }}>
          <li>• Test one variable at a time — isolate what changes output.</li>
          <li>• Name variables meaningfully (<span className="font-mono text-[#0a0a0a]">[audience]</span>, not <span className="font-mono text-[#0a0a0a]">[x]</span>).</li>
          <li>• Default values help teammates fill them in faster.</li>
        </ul>
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
    { name: "Firefly",    color: "#4FC3F7", strength: "Brand-safe, commercial",            tip: "Short descriptive phrases beat paragraphs." },
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
                <tr key={r.name} className="border-t border-[#0a0a0a]/15">
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
    { name: "Few-shot",           desc: "Show 2–3 examples so the model imitates the shape you want.",             ex: "Input: apple → Output: fruit.\nInput: carrot → Output: vegetable.\nInput: banana →" },
    { name: "Structured output",  desc: "Demand JSON/markdown so results are parseable.",                         ex: `Return strict JSON: { "title": string, "score": number }` },
    { name: "Self-critique",      desc: "Ask the model to critique & revise its own draft.",                      ex: "Write the answer, then list 3 weaknesses, then rewrite." },
    { name: "Negative prompting", desc: "State what NOT to include.",                                              ex: "…minimal, clean. Avoid: text, watermarks, extra fingers." },
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
            <div className="bg-[#0a0a0a]/5 border border-[#0a0a0a]/15 rounded-lg p-3 font-mono text-[12px] text-[#0a0a0a] whitespace-pre-wrap">{i.ex}</div>
          </Card>
        ))}
      </div>
    </Section>
  );
}

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
  return (
    <Section title="Quality checklist" icon={ListChecks}>
      <Card>
        <ul className="space-y-3">
          {items.map((t) => (
            <li key={t} className="flex items-start gap-3">
              <span className="mt-2 w-2 h-2 rounded-full bg-[#0a0a0a] shrink-0" />
              <span className="text-[#0a0a0a]">{t}</span>
            </li>
          ))}
        </ul>
      </Card>
    </Section>
  );
}

function Tips() {
  const tips = [
    { t: "Start broad, narrow fast",         d: "First prompt gets you a draft; 2–3 refinements beat one 'perfect' prompt." },
    { t: "Show, don't just tell",            d: "One example is worth three adjectives. Few-shot wins on tone." },
    { t: "Separate instructions from content", d: "Use clear delimiters (---, ```). Models follow structure." },
    { t: "Name the failure mode",            d: "Tell it what NOT to do. 'Avoid clichés.' 'No bullet points.'" },
    { t: "Version your prompts",             d: "Save what works. Track the change + the output improvement." },
    { t: "Temperature matters",              d: "Lower for code/JSON, higher for creative. If the app lets you set it." },
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
  { key: "role",        name: "Role",        color: "#4FC3F7", sample: "You are a senior copywriter with 10 years of B2B SaaS experience." },
  { key: "task",        name: "Task",        color: "#0a0a0a", sample: "Write a 3-line LinkedIn hook announcing a new AI prompt library." },
  { key: "context",     name: "Context",     color: "#90b4ce", sample: "Audience: early-stage founders who skim feeds fast." },
  { key: "constraints", name: "Constraints", color: "#4FC3F7", sample: "Max 60 words. Punchy tone. No emojis. No hashtags." },
  { key: "format",      name: "Format",      color: "#6b7280", sample: "Return as a 3-item markdown list." },
  { key: "examples",    name: "Examples",    color: "#4FC3F7", sample: "Example tone: \"Shipping beats perfection. Here's why...\"" },
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
          Toggle prompt parts on and off — watch the prompt rebuild itself in real time.
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
                  color:        active ? (p.color === "#4FC3F7" ? "#0a0a0a" : "#bce4d8") : "#0a0a0a",
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
          <div className="relative bg-[#0a0a0a]/5 border border-[#0a0a0a]/15 rounded-xl p-4 font-mono text-[13px] text-[#0a0a0a] whitespace-pre-wrap leading-relaxed min-h-[180px]">
            <AnimatePresence mode="popLayout">
              {partDefs.filter((p) => on[p.key]).map((p) => (
                <motion.div
                  key={p.key}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                  className="mb-2"
                >
                  <span className="inline-block mr-2 align-middle w-2 h-2 rounded-full" style={{ background: p.color }} />
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
              className="absolute top-2 right-2 p-1.5 rounded-md bg-white border border-[#0a0a0a]/15 text-[#6b7280] hover:text-[#0a0a0a] disabled:opacity-40"
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
                  className="absolute top-2 right-12 px-2 py-1 rounded bg-[#4FC3F7] text-[#0a0a0a] text-[11px]"
                  style={{ fontWeight: 700 }}
                >
                  Copied!
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="bg-gradient-to-br from-[#4FC3F7]/20 to-[#4FC3F7]/10 border border-[#0a0a0a]/15 rounded-xl p-4">
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
                className="h-full bg-gradient-to-r from-[#4FC3F7] to-[#4FC3F7]"
                animate={{ width: `${(score / 5) * 100}%` }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              />
            </div>
            <div className="text-[#0a0a0a]" style={{ fontSize: "12px", fontWeight: 600 }}>
              {count}/6 parts included
            </div>
            <div className="text-[#6b7280] text-[12px] mt-2" style={{ lineHeight: 1.5 }}>
              {count < 3 && "Add more parts — prompts work best with role, task, and context at minimum."}
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
      <span className="shrink-0 w-7 h-7 rounded-full bg-[#4FC3F7] border-2 border-[#0a0a0a] flex items-center justify-center text-[#0a0a0a]" style={{ fontWeight: 800, fontSize: "13px" }}>
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

  return (
    <div
      className="bg-white border rounded-2xl p-6 transition-all duration-300 relative"
      style={{
        borderColor: isDone ? "#10b981" : "rgba(10, 10, 10,0.15)",
        opacity: isDone ? 0.6 : 1,
      }}
    >
      {isDone && (
        <div className="absolute top-4 right-4 flex items-center gap-1.5 text-[#10b981]" style={{ fontSize: "12px", fontWeight: 700 }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="8" fill="#10b981"/><path d="M5 8l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Completed
        </div>
      )}
      {children}
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-[#0a0a0a]/10">
        {isDone ? (
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
            style={{ fontWeight: 600, background: "#0a0a0a" }}
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
      <span className="text-[#10a37f] text-[15px]">✅</span>
      <span className="text-[#0a0a0a]" style={{ lineHeight: 1.6 }}>{text}</span>
    </div>
  );
}

// ─── Image Generation Guide ──────────────────────────────────────────────────

function ImageGenGuide() {
  const { done, toggle } = useStepDone(8);

  return (
    <Section title="Image Generation Guide" icon={Image}>
      <StepCard stepIndex={0} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 1 — Choose an AI Tool</div>
        <p className="text-[#6b7280] mb-4" style={{ lineHeight: 1.6 }}>Download or open one of these image generation tools:</p>
        <div className="flex flex-wrap gap-2">
          <ToolBadge name="ChatGPT"        color="#10a37f" />
          <ToolBadge name="Leonardo AI"    color="#7C3AED" />
          <ToolBadge name="Ideogram"       color="#0a0a0a" />
          <ToolBadge name="Midjourney"     color="#4FC3F7" />
          <ToolBadge name="Flux"           color="#90b4ce" />
          <ToolBadge name="Adobe Firefly"  color="#4FC3F7" />
        </div>
      </StepCard>

      <StepCard stepIndex={1} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 2 — Create an Account</div>
        <div className="space-y-3">
          <HowToStep n={1} text="Sign Up" />
          <HowToStep n={2} text="Verify Email" />
          <HowToStep n={3} text="Login" />
        </div>
      </StepCard>

      <StepCard stepIndex={2} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 3 — Understand What You Want</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Ask yourself: What image do I want?</p>
        <div className="flex flex-wrap gap-2">
          {["Poster", "Product", "Advertisement", "Social Media Post", "Portrait", "Logo"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a] text-[12px]" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </StepCard>

      <StepCard stepIndex={3} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 4 — Learn Prompt Structure</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Simple formula:</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {["Subject", "Style", "Background", "Quality"].map((s, i) => (
            <div key={s} className="border border-[#0a0a0a]/15 rounded-xl p-3 text-center">
              <div className="w-6 h-6 rounded-full bg-[#4FC3F7] text-[#0a0a0a] flex items-center justify-center mx-auto mb-1" style={{ fontWeight: 800, fontSize: "11px" }}>{i + 1}</div>
              <div className="text-[#0a0a0a]" style={{ fontWeight: 700, fontSize: "13px" }}>{s}</div>
            </div>
          ))}
        </div>
        <div className="text-[#6b7280] text-[12px] mb-2" style={{ fontWeight: 600 }}>EXAMPLE</div>
        <PromptBlock>{`Luxury coffee cup,
wooden table,
cinematic lighting,
ultra realistic`}</PromptBlock>
      </StepCard>

      <StepCard stepIndex={4} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 5 — Generate First Image</div>
        <div className="space-y-3">
          <HowToStep n={1} text="Paste your prompt into the tool." />
          <HowToStep n={2} text="Click Generate." />
          <HowToStep n={3} text="Wait for the result." />
        </div>
      </StepCard>

      <StepCard stepIndex={5} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 6 — Improve Your Prompt</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Add more details to refine your output:</p>
        <div className="flex flex-wrap gap-2">
          {["Lighting", "Camera Angle", "Colors", "Mood"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#4FC3F7]/20 text-[#0a0a0a] text-[12px] border border-[#4FC3F7]/50" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </StepCard>

      <StepCard stepIndex={6} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 7 — Download Image</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Available formats:</p>
        <div className="flex flex-wrap gap-2">
          {["PNG", "JPG", "WebP"].map(t => (
            <span key={t} className="px-3 py-1 rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a] text-[12px]" style={{ fontWeight: 700 }}>{t}</span>
          ))}
        </div>
      </StepCard>

      <StepCard stepIndex={7} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 8 — Use in Your Projects</div>
        <div className="flex flex-wrap gap-2">
          {["Website", "Instagram", "Marketing", "Presentations", "Posters"].map(t => (
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
  const [scrollPaused, setScrollPaused] = useState(false);

  return (
    <Section title="Website Generation" icon={Globe}>
      {/* Featured Websites Showcase */}
      <div className="rounded-2xl border border-[#0a0a0a]/10 bg-gradient-to-br from-[#0a0a0a]/[0.03] to-[#4FC3F7]/[0.03] p-5 -mx-1">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[#0a0a0a] text-[15px]" style={{ fontWeight: 800 }}>Top Website Designs</div>
            <div className="text-[#6b7280] text-[12px] mt-0.5">Hand-picked from our library — click to explore</div>
          </div>
          <button
            onClick={() => go("library:website")}
            className="text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors text-[12px]"
            style={{ fontWeight: 600 }}
          >
            View all →
          </button>
        </div>
        <div
          className="overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 2%, black 98%, transparent 100%)",
          }}
          onMouseEnter={() => setScrollPaused(true)}
          onMouseLeave={() => setScrollPaused(false)}
        >
          <div
            className="flex gap-4 py-1 featured-web-marquee"
            style={{
              width: "max-content",
              animationPlayState: scrollPaused ? "paused" : "running",
            }}
          >
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
          .featured-web-marquee {
            animation: featured-web-scroll 50s linear infinite;
          }
          @keyframes featured-web-scroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      <Card>
        <div className="text-[#0a0a0a] mb-2" style={{ fontWeight: 700 }}>What is Website Generation?</div>
        <p className="text-[#6b7280]" style={{ lineHeight: 1.6 }}>
          Website prompts help AI generate full landing pages, SaaS interfaces, portfolio sites, e-commerce
          stores, and agency websites — complete with layout, components, and styling.
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
          <ToolBadge name="v0"        color="#0f0f0f" />
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
          <ProTip text="Always specify layout — '3-column feature section', 'full-width hero'." />
          <ProTip text="Name every component — Navbar, Hero, Features, Pricing, Footer." />
          <ProTip text="Reference real design systems — 'Inspired by Linear and Figma'." />
          <ProTip text="Iterate in small steps — one refinement prompt per change is easier to track." />
        </div>
      </Card>
    </Section>
  );
}

// ─── Video Generation Guide ──────────────────────────────────────────────────

function VideoGenGuide() {
  const { done, toggle } = useStepDone(8);

  return (
    <Section title="Video Generation Guide" icon={Video}>
      <StepCard stepIndex={0} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 1 — Choose a Video AI Tool</div>
        <div className="flex flex-wrap gap-2">
          <ToolBadge name="Seedance"  color="#0a0a0a" />
          <ToolBadge name="Kling"     color="#4FC3F7" />
          <ToolBadge name="Hailuo"    color="#4FC3F7" />
          <ToolBadge name="Runway"    color="#7C3AED" />
          <ToolBadge name="Pika"      color="#10a37f" />
          <ToolBadge name="Veo"       color="#4285f4" />
        </div>
      </StepCard>

      <StepCard stepIndex={1} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 2 — Create an Account</div>
        <div className="space-y-3">
          <HowToStep n={1} text="Register" />
          <HowToStep n={2} text="Verify Email" />
          <HowToStep n={3} text="Login" />
        </div>
      </StepCard>

      <StepCard stepIndex={2} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 3 — Decide Your Video Type</div>
        <div className="flex flex-wrap gap-2">
          {["Advertisement", "Product Demo", "Short Film", "Anime", "Reel", "Commercial"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a] text-[12px]" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </StepCard>

      <StepCard stepIndex={3} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 4 — Learn Video Prompt Formula</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          {["Subject", "Action", "Camera Movement", "Environment"].map((s, i) => (
            <div key={s} className="border border-[#0a0a0a]/15 rounded-xl p-3 text-center">
              <div className="w-6 h-6 rounded-full bg-[#4FC3F7] text-[#0a0a0a] flex items-center justify-center mx-auto mb-1" style={{ fontWeight: 800, fontSize: "11px" }}>{i + 1}</div>
              <div className="text-[#0a0a0a]" style={{ fontWeight: 700, fontSize: "13px" }}>{s}</div>
            </div>
          ))}
        </div>
        <div className="text-[#6b7280] text-[12px] mb-2" style={{ fontWeight: 600 }}>EXAMPLE</div>
        <PromptBlock>{`A luxury sports car driving through a futuristic city,
cinematic drone shot,
rain reflections,
night atmosphere`}</PromptBlock>
      </StepCard>

      <StepCard stepIndex={4} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 5 — Generate Video</div>
        <div className="space-y-3">
          <HowToStep n={1} text="Paste your prompt into the tool." />
          <HowToStep n={2} text="Click Generate." />
          <HowToStep n={3} text="Preview the result." />
        </div>
      </StepCard>

      <StepCard stepIndex={5} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 6 — Improve Motion</div>
        <p className="text-[#6b7280] mb-3" style={{ lineHeight: 1.6 }}>Add camera movements to enhance your video:</p>
        <div className="flex flex-wrap gap-2">
          {["Zoom In", "Tracking Shot", "Orbit Shot", "Slow Motion"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#4FC3F7]/20 text-[#0a0a0a] text-[12px] border border-[#4FC3F7]/50" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </StepCard>

      <StepCard stepIndex={6} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 7 — Export Video</div>
        <div className="flex flex-wrap gap-2">
          {["MP4", "MOV"].map(t => (
            <span key={t} className="px-3 py-1 rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a] text-[12px]" style={{ fontWeight: 700 }}>{t}</span>
          ))}
        </div>
      </StepCard>

      <StepCard stepIndex={7} totalSteps={8} done={done} onToggle={toggle}>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Step 8 — Publish</div>
        <div className="flex flex-wrap gap-2">
          {["Instagram", "YouTube", "Website", "Marketing Campaign"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#4FC3F7]/10 text-[#0a0a0a] text-[12px] border border-[#4FC3F7]/30" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </StepCard>
    </Section>
  );
}

// ─── Code Generation Guide ───────────────────────────────────────────────────

function CodeGenGuide() {
  return (
    <Section title="Code Generation" icon={Code2}>
      <Card>
        <div className="text-[#0a0a0a] mb-2" style={{ fontWeight: 700 }}>What is Code Generation?</div>
        <p className="text-[#6b7280]" style={{ lineHeight: 1.6 }}>
          Code generation prompts produce React components, full landing pages, dashboards,
          SaaS interfaces, and utility functions — ready to drop into your project.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {["React components", "Landing pages", "Dashboards", "SaaS interfaces", "Utility functions"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a] text-[12px]" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </Card>

      <Card>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Popular Tools</div>
        <div className="flex flex-wrap gap-2">
          <ToolBadge name="Cursor"         color="#10a37f" />
          <ToolBadge name="Claude Code"    color="#4FC3F7" />
          <ToolBadge name="GitHub Copilot" color="#0a0a0a" />
          <ToolBadge name="ChatGPT"        color="#10a37f" />
        </div>
      </Card>

      <Card>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Example Prompt</div>
        <PromptBlock>{`Build a responsive pricing section in React + Tailwind CSS.

Requirements:
- 3 tiers: Free, Pro, Enterprise
- Dark mode support
- Highlight the middle (Pro) tier
- Smooth hover effects on cards
- Include a monthly/yearly toggle
- TypeScript props for plan data`}</PromptBlock>
      </Card>

      <Card>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Pro Tips</div>
        <div className="space-y-3">
          <ProTip text="Specify the exact stack — React, Tailwind, TypeScript, shadcn/ui." />
          <ProTip text="State constraints upfront — 'no external dependencies', 'single file'." />
          <ProTip text="Ask for TypeScript interfaces — better output and easier to refine." />
          <ProTip text="Use follow-up prompts to add features one at a time, not all at once." />
        </div>
      </Card>
    </Section>
  );
}

// ─── Content Generation Guide ────────────────────────────────────────────────

function ContentGenGuide() {
  return (
    <Section title="Content Generation" icon={FileText}>
      <Card>
        <div className="text-[#0a0a0a] mb-2" style={{ fontWeight: 700 }}>What is Content Generation?</div>
        <p className="text-[#6b7280]" style={{ lineHeight: 1.6 }}>
          Content generation prompts produce blog posts, social media captions, marketing copy,
          email sequences, and scripts — on-brand and ready to publish or edit.
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {["Blog posts", "Social captions", "Marketing copy", "Email sequences", "Ad copy"].map(t => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-[#0a0a0a]/8 text-[#0a0a0a] text-[12px]" style={{ fontWeight: 600 }}>{t}</span>
          ))}
        </div>
      </Card>

      <Card>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Popular Tools</div>
        <div className="flex flex-wrap gap-2">
          <ToolBadge name="ChatGPT" color="#10a37f" />
          <ToolBadge name="Claude"  color="#4FC3F7" />
          <ToolBadge name="Gemini"  color="#4285f4" />
        </div>
      </Card>

      <Card>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Example Prompt</div>
        <PromptBlock>{`Write a LinkedIn post announcing an AI startup launch.

Tone: Professional but approachable
Length: 150–200 words
Audience: Startup founders and early adopters

Include:
- A hook in the first line
- 2–3 key benefits
- A clear call to action

Avoid: Buzzwords, excessive emojis, passive voice`}</PromptBlock>
      </Card>

      <Card>
        <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 700 }}>Pro Tips</div>
        <div className="space-y-3">
          <ProTip text="Always define tone — professional, casual, witty, authoritative." />
          <ProTip text="Set an exact word count — 'under 150 words' prevents over-generation." />
          <ProTip text="Include a negative constraint — 'avoid clichés', 'no bullet points'." />
          <ProTip text="Provide an example of ideal output — one sample beats three adjectives." />
        </div>
      </Card>
    </Section>
  );
}