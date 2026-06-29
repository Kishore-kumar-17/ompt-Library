import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image as ImageIcon, Film, Type, FileText, Code2, BarChart3, Play, ArrowRight, Copy, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

type TabKey = "image" | "video" | "text" | "content" | "code" | "compare";

type Tab = {
  key: TabKey;
  label: string;
  Icon: any;
  accent: string;
  verb: string;
  prompt: string;
  output: { kind: "image" | "code" | "text" | "compare"; src?: string; body?: string; lines?: string[] };
  route: string | null;
};

const tabs: Tab[] = [
  {
    key: "image",
    label: "Image",
    Icon: ImageIcon,
    accent: "#4FC3F7",
    verb: "design",
    prompt: "A cinematic event poster, dramatic rim lighting, bold typography —ar 2:3",
    output: { kind: "image", src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1000" },
    route: "library:image",
  },
  {
    key: "video",
    label: "Video",
    Icon: Film,
    accent: "#3a86ff",
    verb: "animate",
    prompt: "15-second product trailer, macro lens, warm tones, slow dolly-in, cinematic grade",
    output: { kind: "image", src: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=1000" },
    route: "library:video",
  },
  {
    key: "text",
    label: "Text",
    Icon: Type,
    accent: "#d4a900",
    verb: "write",
    prompt: "Act as a senior engineer. Summarize this architecture doc in 5 bullets for execs.",
    output: {
      kind: "text",
      lines: [
        "• Platform migrates to an event-driven core — removes 3 legacy services.",
        "• Latency p99 drops from 840ms to 210ms on the read path.",
        "• Cost profile shifts from fixed capacity to per-request billing.",
        "• Rollout is gated by a feature flag; rollback takes under 60 seconds.",
        "• Compliance: tokens move to a vaulted store; meets the new SOC-2 control.",
      ],
    },
    route: "library:text",
  },
  {
    key: "content",
    label: "Content",
    Icon: FileText,
    accent: "#22c55e",
    verb: "publish",
    prompt: "Write a 3-sentence LinkedIn post for product designers about prompt libraries.",
    output: {
      kind: "text",
      lines: [
        "Stop rewriting the same prompt ten different ways.",
        "A shared library turns every junior designer into a senior one —",
        "because the best prompt in the team becomes the default. 🧵",
      ],
    },
    route: "library:content",
  },
  {
    key: "code",
    label: "Code",
    Icon: Code2,
    accent: "#8b5cf6",
    verb: "code",
    prompt: "Refactor this function into a pure, testable unit. Explain the changes.",
    output: {
      kind: "code",
      lines: [
        "export function priceFor(items: Item[], coupon?: Coupon) {",
        "  const subtotal = items.reduce((n, i) => n + i.price * i.qty, 0);",
        "  const discount = coupon ? applyCoupon(subtotal, coupon) : 0;",
        "  return Math.max(0, subtotal - discount);",
        "}",
      ],
    },
    route: "library:text",
  },
  {
    key: "compare",
    label: "Compare",
    Icon: BarChart3,
    accent: "#4FC3F7",
    verb: "compare",
    prompt: "Run this prompt across ChatGPT, Gemini, Grok, Midjourney, Firefly, FLUX.",
    output: { kind: "compare" },
    route: "compare",
  },
];

export function InteractiveDemo({ go }: { go: (r: string) => void }) {
  const [active, setActive] = useState<TabKey>("image");
  const tab = tabs.find((t) => t.key === active)!;

  return (
    <section className="max-w-[1200px] mx-auto px-6 mt-20">
      <h2 className="text-[#0a0a0a] mb-2" style={{ fontSize: "clamp(24px,2.6vw,36px)", fontWeight: 800 }}>
        See how prompts become products.
      </h2>
      <p className="text-[#6b7280] mb-6">Pick a discipline — we'll run a real prompt through it.</p>

      {/* The frame */}
      <div className="relative rounded-3xl border-2 border-[#0a0a0a] shadow-[8px_8px_0_0_#0a0a0a] overflow-hidden bg-white">
        {/* Chrome */}
        <div className="flex items-center gap-3 h-11 px-4 border-b-2 border-[#0a0a0a]/15 bg-white">
          <span className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#4FC3F7]" />
            <span className="w-3 h-3 rounded-full bg-[#4FC3F7]" />
            <span className="w-3 h-3 rounded-full bg-[#22c55e]" />
          </span>
          <div className="flex-1 flex items-center justify-center">
            <div className="inline-flex items-center gap-2 h-7 px-3 rounded-lg bg-[#0a0a0a]/5 border border-[#0a0a0a]/15 text-[12px] text-[#6b7280]">
              <Sparkles className="w-3.5 h-3.5 text-[#0a0a0a]" />
              promptvault.app / {tab.key}
            </div>
          </div>
          <div className="flex -space-x-2">
            {["#4FC3F7", "#4FC3F7", "#3a86ff"].map((c) => (
              <span key={c} className="w-6 h-6 rounded-full border-2 border-white" style={{ background: c }} />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="grid md:grid-cols-[360px_1fr] min-h-[420px]">
          {/* Prompt pane */}
          <div className="p-5 border-b-2 md:border-b-0 md:border-r-2 border-[#0a0a0a]/15 bg-white">
            <div className="text-[11px] text-[#6b7280] uppercase mb-2" style={{ fontWeight: 700, letterSpacing: "0.08em" }}>
              Prompt
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key + "-prompt"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <TypewriterText text={tab.prompt} />
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 flex items-center gap-2">
              <button
                className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border-2 border-[#0a0a0a] bg-[#4FC3F7] text-[#0a0a0a] text-[13px]"
                style={{ fontWeight: 700, boxShadow: "3px 3px 0 0 #0a0a0a" }}
              >
                <Play className="w-3.5 h-3.5" /> Run
              </button>
              <button className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#0a0a0a]/20 text-[#0a0a0a] text-[13px]">
                <Copy className="w-3.5 h-3.5" /> Copy
              </button>
            </div>
          </div>

          {/* Output pane */}
          <div className="relative bg-[#0b1220] min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={tab.key + "-output"}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0"
              >
                <OutputView tab={tab} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Chips */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 md:gap-4">
        {tabs.map((t) => {
          const on = t.key === active;
          return (
            <button
              key={t.key}
              onMouseEnter={() => setActive(t.key)}
              className="relative inline-flex items-center gap-1.5 px-3 py-1.5 text-[14px] cursor-default"
              style={{ fontWeight: 600, color: on ? "#0a0a0a" : "#6b7280" }}
            >
              <t.Icon className="w-4 h-4" style={{ color: on ? t.accent : "#6b7280" }} />
              {t.label}
              {on && (
                <motion.span
                  layoutId="demo-underline"
                  className="absolute left-1 right-1 -bottom-1 h-[3px] rounded-full"
                  style={{ background: t.accent }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Caption */}
      <div className="mt-4 text-center text-[#6b7280]">
        Prompt to{" "}
        <span style={{ color: tab.accent, fontWeight: 700 }}>{tab.verb}</span>{" "}
        anything you can imagine with AI.
      </div>
      {tab.route && (
        <div className="mt-3 text-center">
          <button
            onClick={() => go(tab.route!)}
            className="inline-flex items-center gap-1 text-[#0a0a0a] text-[13px] underline decoration-2 underline-offset-4"
            style={{ fontWeight: 700, textDecorationColor: tab.accent }}
          >
            Explore {tab.label} prompts <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </section>
  );
}

function TypewriterText({ text }: { text: string }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    setI(0);
    const id = setInterval(() => setI((v) => (v >= text.length ? v : v + 1)), 18);
    return () => clearInterval(id);
  }, [text]);
  return (
    <div className="text-[#0a0a0a] text-[14px] leading-relaxed min-h-[96px]">
      {text.slice(0, i)}
      <span className="inline-block w-[2px] h-4 bg-[#4FC3F7] translate-y-[3px] ml-0.5 animate-pulse" />
    </div>
  );
}

function OutputView({ tab }: { tab: Tab }) {
  if (tab.output.kind === "image") {
    return (
      <div className="absolute inset-0">
        <ImageWithFallback src={tab.output.src!} alt={tab.label + " output"} className="w-full h-full object-cover" />
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "200%" }}
          transition={{ duration: 1.6, ease: "linear" }}
          className="absolute inset-y-0 w-1/3"
          style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
        />
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full bg-black/50 backdrop-blur text-white text-[11px]" style={{ fontWeight: 700 }}>
          <Play className="w-3 h-3" /> Playing preview
        </div>
      </div>
    );
  }

  if (tab.output.kind === "code") {
    return (
      <div className="absolute inset-0 p-5 font-mono text-[13px] leading-relaxed text-[#d4d7de] overflow-auto">
        <div className="text-[#6b7280] mb-2">// refactor.ts</div>
        {tab.output.lines!.map((ln, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 }}
          >
            <span className="text-[#6b7280] mr-3 select-none">{String(i + 1).padStart(2, " ")}</span>
            <span dangerouslySetInnerHTML={{ __html: highlightCode(ln) }} />
          </motion.div>
        ))}
      </div>
    );
  }

  if (tab.output.kind === "text") {
    return (
      <div className="absolute inset-0 p-6 text-[#e6e9ef] text-[14px] leading-relaxed overflow-auto">
        {tab.output.lines!.map((ln, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.18 }}
            className="mb-2"
          >
            {ln}
          </motion.div>
        ))}
      </div>
    );
  }

  // compare
  const pills = [
    { n: "ChatGPT",    c: "#10a37f" },
    { n: "Gemini",     c: "#4285f4" },
    { n: "Grok",       c: "#a7a9be" },
    { n: "Midjourney", c: "#c8a2c8" },
    { n: "Firefly",    c: "#ff6b6b" },
    { n: "FLUX",       c: "#4FC3F7" },
  ];
  return (
    <div className="absolute inset-0 p-5 grid grid-cols-2 md:grid-cols-3 gap-3 overflow-auto">
      {pills.map((p, i) => (
        <motion.div
          key={p.n}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="rounded-xl p-3 border border-white/10 bg-white/5"
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.c }} />
            <div className="text-white text-[12px]" style={{ fontWeight: 700 }}>{p.n}</div>
          </div>
          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${45 + (i * 9) % 55}%` }}
              transition={{ duration: 0.9, delay: 0.1 + i * 0.08 }}
              className="h-full rounded-full"
              style={{ background: p.c }}
            />
          </div>
          <div className="mt-2 text-white/60 text-[11px]">quality · {(3.8 + (i % 5) * 0.2).toFixed(1)}</div>
        </motion.div>
      ))}
    </div>
  );
}

function highlightCode(s: string) {
  const escape = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  let out = escape(s);
  out = out.replace(/\b(export|function|const|let|return|if|else|new)\b/g, '<span style="color:#c792ea">$1</span>');
  out = out.replace(/\b(reduce|applyCoupon|Math|max)\b/g, '<span style="color:#82aaff">$1</span>');
  out = out.replace(/(\/\/[^<]*)/g, '<span style="color:#6b7280">$1</span>');
  out = out.replace(/([0-9]+)/g, '<span style="color:#f78c6c">$1</span>');
  return out;
}