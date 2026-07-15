import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, ThumbsUp, ThumbsDown, ExternalLink, ChevronDown, ChevronUp, Loader2, Maximize2, X, Lock, ArrowLeft, Download } from "lucide-react";
import { toast } from "sonner";
import { websiteDesigns } from "../../lib/website-data";
import { websitePlatformVersions } from "../../lib/website-platforms";
import { websitePlatforms } from "../theme";
import { patchIframeLinks, guardIframeNavigation } from "../../lib/patch-iframe-links";

const DOCS = [
  { key: "orchestrator", label: "00 Orchestrator",    desc: "Step-by-step AI build guide",    file: "00_Orchestrator.md" },
  { key: "prd",          label: "01 PRD",             desc: "Product requirements & personas", file: "01_PRD.md" },
  { key: "architecture", label: "02 Architecture",    desc: "Tech stack & data model",         file: "02_Architecture.md" },
  { key: "design",       label: "03 Design",          desc: "Visual language & tokens",        file: "03_Design.md" },
  { key: "plan",         label: "04 Plan",            desc: "Build sequence",                  file: "04_Plan.md" },
  { key: "epics",        label: "05 Epics & Stories", desc: "Feature epics & user stories",    file: "05_Epics_and_Stories.md" },
  { key: "tasks",        label: "06 Tasks",           desc: "Executable task checklist",       file: "06_Tasks.md" },
  { key: "guide",        label: "07 Guide",           desc: "Accessibility & performance",     file: "07_Guide.md" },
];

async function downloadScaffoldFile(slug: string, fileName: string, displayLabel: string) {
  try {
    const res = await fetch(`/scaffolds/${slug}/${fileName}`);
    if (!res.ok) throw new Error("Not found");
    const text = await res.text();
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded", { description: fileName });
  } catch {
    toast.error("Download failed", { description: `${displayLabel} not available` });
  }
}

async function downloadAllScaffoldFiles(slug: string, title: string) {
  try {
    const files = [...DOCS.map(d => d.file), `${slug}.md`];
    const sections: string[] = [];
    let missing = 0;
    for (const file of files) {
      const res = await fetch(`/scaffolds/${slug}/${file}`);
      if (res.ok) {
        const text = await res.text();
        sections.push(text);
      } else {
        missing++;
      }
    }

    if (sections.length === 0) {
      toast.error("Download failed", { description: "No scaffold files were found for this design." });
      return;
    }

    const combined = sections.join("\n\n---\n\n");
    const blob = new Blob([combined], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}-scaffold.md`;
    a.click();
    URL.revokeObjectURL(url);

    if (missing > 0) {
      toast.warning("Downloaded with missing sections", {
        description: `${slug}-scaffold.md includes ${sections.length} of ${files.length} files — ${missing} weren't found.`,
      });
    } else {
      toast.success("Downloaded", { description: `${slug}-scaffold.md (${sections.length} files)` });
    }
  } catch {
    toast.error("Download failed");
  }
}

export function WebsiteDetail({ slug, go }: { slug: string; go: (p: string) => void }) {
  const design = websiteDesigns.find(d => d.slug === slug);
  const [platform, setPlatform] = useState("lovable");
  const [docsOpen, setDocsOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const castVote = (dir: "up" | "down") => {
    setVote(v => (v === dir ? null : dir));
    if (vote !== dir) toast.success(dir === "up" ? "Thanks for the feedback!" : "Thanks — we'll take a look.");
  };
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const previewUrl = `/previews/${slug}/index.html`;

  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen]);

  // The iframe's onError rarely fires for a missing local file (the browser
  // "successfully" loads a 404 page), so proactively check the file exists
  // instead of relying on it.
  useEffect(() => {
    setIframeLoaded(false);
    setIframeError(false);
    let cancelled = false;
    fetch(previewUrl, { method: "HEAD" })
      .then(res => { if (!cancelled && !res.ok) setIframeError(true); })
      .catch(() => { if (!cancelled) setIframeError(true); });
    return () => { cancelled = true; };
  }, [previewUrl]);

  if (!design) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-16 text-center">
        <p className="text-[#6b7280] mb-4">Website design not found.</p>
        <button onClick={() => go("library:website")} className="inline-flex items-center gap-1.5 text-[#0a0a0a] hover:text-[#0a0a0a]/80 text-[13px] transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
        </button>
      </div>
    );
  }

  const versions = websitePlatformVersions[design.slug] ?? {};
  const promptText = versions[platform] ?? Object.values(versions)[0] ?? design.description;
  const activePl = websitePlatforms.find(p => p.key === platform);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(promptText);
      toast.success("Prompt copied", { description: `${design.title} - ${activePl?.name}` });
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-[#0a0a0a]">
      <button onClick={() => go("library:website")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Website Library
      </button>

      <div className="grid lg:grid-cols-2 gap-10 items-start">

        {/* ── Left: Preview + Guide (scrolls) ──────────────────────────── */}
        <div>
          {/* Browser mockup */}
          <div className="rounded-2xl overflow-hidden border border-[#0a0a0a]/15 shadow-[0_8px_40px_rgba(10,10,10,0.12)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f0f0f0] border-b border-[#d8d8d8]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 bg-white rounded-md px-2.5 py-1 flex items-center gap-1.5 border border-[#d8d8d8]">
                <div className={`w-2 h-2 rounded-full shrink-0 ${iframeLoaded && !iframeError ? "bg-[#28c840]" : "bg-[#febc2e]"}`} />
                <span className="text-[11px] text-[#6b7280] flex-1 truncate">{design.slug.replace(/_/g, "-")}.vercel.app</span>
              </div>
              <button onClick={() => window.open(previewUrl, "_blank")} className="text-[#6b7280] hover:text-[#0a0a0a] p-0.5 rounded transition-colors" title="Open in new tab" aria-label="Open preview in new tab">
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setFullscreen(true)} className="text-[#6b7280] hover:text-[#0a0a0a] p-0.5 rounded transition-colors" title="Expand fullscreen" aria-label="Expand preview fullscreen">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Preview iframe */}
            <div
              className="relative bg-[#f8f8f8] group cursor-pointer"
              style={{ height: 540 }}
              onClick={() => iframeLoaded && !iframeError && setFullscreen(true)}
            >
              {!iframeLoaded && !iframeError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10">
                  <Loader2 className="w-7 h-7 text-[#0a0a0a]/40 animate-spin" />
                  <span className="text-[12px] text-[#6b7280]">Loading preview…</span>
                </div>
              )}
              {iframeLoaded && !iframeError && (
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-[#0a0a0a]/80 backdrop-blur-sm text-white text-[13px] font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Maximize2 className="w-4 h-4" /> Click to expand
                  </div>
                </div>
              )}
              {iframeError ? (
                <WebsiteDetailPlaceholder design={design} previewUrl={previewUrl} />
              ) : (
                <>
                  {/* sandbox="allow-scripts allow-same-origin" is a documented sandbox-bypass
                      combination — accepted here because guardIframeNavigation/patchIframeLinks
                      below reach into iframe.contentDocument, which requires the iframe to be
                      same-origin in the first place. Preview HTML is static, developer-authored
                      content under frontend/public/previews/, not user-generated — revisit this
                      if that ever changes. */}
                  <iframe
                    ref={iframeRef}
                    src={previewUrl}
                    className="w-full h-full border-0"
                    style={{ opacity: iframeLoaded ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none" }}
                    onLoad={(e) => {
                      const el = e.currentTarget;
                      if (guardIframeNavigation(el, slug)) {
                        setIframeLoaded(true);
                        return;
                      }
                      setIframeLoaded(true);
                      patchIframeLinks(el, slug);
                    }}
                    onError={() => setIframeError(true)}
                    title={design.title}
                    sandbox="allow-scripts allow-same-origin"
                  />
                  {/* Transparent overlay - blocks iframe link clicks, opens fullscreen on click */}
                  <div
                    className="absolute inset-0 z-20 cursor-pointer"
                    onClick={() => iframeLoaded && setFullscreen(true)}
                  />
                </>
              )}
            </div>
          </div>

          {/* Stack + tags */}
          <div className="flex flex-wrap gap-2 mt-4 mb-8">
            {design.stack.map(s => (
              <span key={s} className="px-2 py-1 rounded-lg bg-[#0a0a0a]/5 text-[#0a0a0a] text-[12px] font-mono font-semibold">{s}</span>
            ))}
            {design.tags.map(t => (
              <span key={t} className="px-2 py-1 rounded-full border border-[#0a0a0a]/15 text-[#6b7280] text-[12px]">#{t}</span>
            ))}
          </div>

          {/* ── Build Guide ───────────────────────────────────────────── */}
          <div className="rounded-2xl overflow-hidden border border-[#0a0a0a]/15">
            <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#0a0a0a]/5 to-[#4FC3F7]/10 border-b border-[#0a0a0a]/10">
              <span className="w-8 h-8 rounded-full bg-[#4FC3F7] border-2 border-[#0a0a0a] flex items-center justify-center text-lg shrink-0">🚀</span>
              <div>
                <div className="text-[#0a0a0a] font-bold text-[15px]">How to Build This - From Prompt to Live Website</div>
                <div className="text-[#6b7280] text-[12px]">14 steps · Beginner friendly · Prompt to deployment</div>
              </div>
            </div>
            <WebsiteBuildGuide promptText={promptText} platformName={activePl?.name ?? "Lovable"} />
          </div>
        </div>

        {/* ── Right: Prompt panel (STICKY for entire page) ─────────────── */}
        <div className="lg:sticky lg:top-8 self-start">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#6b7280] text-[12px]">{design.category}</span>
            <span className="text-[#6b7280]">·</span>
            <span className="text-[#6b7280] text-[12px]">{design.subCategory}</span>
            {design.tested && (
              <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/20 text-[#0a0a0a] text-[11px] inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7]" /> tested
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-[#0a0a0a] mb-1">{design.title}</h1>
          <p className="text-[#4FC3F7] text-[13px] font-semibold uppercase tracking-wide mb-2">{design.style}</p>
          <p className="text-[#6b7280] mb-5 leading-relaxed line-clamp-3">{design.description}</p>

          <div className="flex items-center gap-4 mb-6 text-[#6b7280]">
            <span className="inline-flex items-center gap-1.5">
              <button
                onClick={() => castVote("up")}
                aria-label="This design was helpful"
                className={`p-1 rounded-md transition-colors ${vote === "up" ? "bg-[#4FC3F7]/20 text-[#4FC3F7]" : "text-[#6b7280] hover:text-[#4FC3F7] hover:bg-[#4FC3F7]/10"}`}
              ><ThumbsUp className="w-4 h-4" /></button>
              <button
                onClick={() => castVote("down")}
                aria-label="This design was not helpful"
                className={`p-1 rounded-md transition-colors ${vote === "down" ? "bg-red-100 text-red-500" : "text-[#6b7280] hover:text-red-500 hover:bg-red-50"}`}
              ><ThumbsDown className="w-4 h-4" /></button>
            </span>
          </div>

          {/* Platform selector */}
          <div className="mb-3">
            <div className="text-[11px] text-[#6b7280] uppercase tracking-widest font-semibold mb-2">Choose your AI tool</div>
            <div className="flex flex-wrap gap-2">
              {websitePlatforms.map(pl => (
                <button
                  key={pl.key}
                  onClick={() => setPlatform(pl.key)}
                  className={`px-3 py-1.5 rounded-full border text-[12px] font-semibold transition-colors ${
                    platform === pl.key ? "border-transparent text-white" : "border-[#0a0a0a]/20 text-[#6b7280] hover:text-[#0a0a0a] hover:border-[#0a0a0a]/40"
                  }`}
                  style={platform === pl.key ? { background: pl.color } : {}}
                >
                  <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: pl.color }} />
                  {pl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Prompt preview */}
          <div className="relative bg-white border-2 border-[#0a0a0a] rounded-2xl p-4 mb-4 shadow-[6px_6px_0_0_#0a0a0a]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-[#6b7280] uppercase font-bold tracking-widest">{activePl?.name} prompt</span>
              <button onClick={handleCopy} className="p-1.5 rounded-lg bg-[#0a0a0a]/5 hover:bg-[#0a0a0a]/10 text-[#6b7280] hover:text-[#0a0a0a] transition-colors" title="Copy prompt" aria-label="Copy prompt">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <pre className="whitespace-pre-wrap text-[#0a0a0a] font-mono text-[12px] leading-relaxed max-h-72 overflow-y-auto">{promptText}</pre>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="w-full h-11 rounded-full bg-[#4FC3F7] text-[#0a0a0a] font-bold flex items-center justify-center gap-2 hover:bg-[#4FC3F7]/90 transition-colors mb-3"
          >
            <Copy className="w-4 h-4" /> Copy {activePl?.name} Prompt
          </button>

          {/* Download button */}
          <button
            onClick={() => downloadAllScaffoldFiles(design.slug, design.title)}
            className="w-full h-11 rounded-full border-2 border-[#0a0a0a] text-[#0a0a0a] font-bold flex items-center justify-center gap-2 hover:bg-[#0a0a0a]/5 transition-colors mb-6"
          >
            <Download className="w-4 h-4" /> Download Project Files
          </button>

          {/* Supporting docs accordion */}
          <div className="border border-[#0a0a0a]/15 rounded-2xl overflow-hidden">
            <button
              onClick={() => setDocsOpen(v => !v)}
              aria-expanded={docsOpen}
              aria-controls="scaffold-docs-list"
              className="w-full flex items-center justify-between px-4 py-3 bg-[#0a0a0a]/3 hover:bg-[#0a0a0a]/5 transition-colors"
            >
              <span className="text-[#0a0a0a] font-semibold text-[14px]">{DOCS.length + 1} Supporting scaffold files</span>
              {docsOpen ? <ChevronUp className="w-4 h-4 text-[#6b7280]" /> : <ChevronDown className="w-4 h-4 text-[#6b7280]" />}
            </button>
            {docsOpen && (
              <div id="scaffold-docs-list" className="divide-y divide-[#0a0a0a]/8">
                {DOCS.map(doc => (
                  <div key={doc.key} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <div className="text-[#0a0a0a] text-[13px] font-semibold">{doc.label}</div>
                      <div className="text-[#6b7280] text-[11px]">{doc.desc}</div>
                    </div>
                    <button
                      onClick={() => downloadScaffoldFile(design.slug, doc.file, doc.label)}
                      aria-label={`Download ${doc.label}`}
                      className="p-1.5 rounded-lg hover:bg-[#0a0a0a]/5 text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                      title={`Download ${doc.label}`}
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 bg-[#4FC3F7]/10">
                  <div>
                    <div className="text-[#0a0a0a] text-[13px] font-semibold">{design.slug}.md</div>
                    <div className="text-[#6b7280] text-[11px]">Base prompt + all 8 platform versions</div>
                  </div>
                  <button
                    onClick={() => downloadScaffoldFile(design.slug, `${design.slug}.md`, `${design.slug}.md`)}
                    aria-label={`Download ${design.slug}.md`}
                    className="p-1.5 rounded-lg hover:bg-[#4FC3F7]/20 text-[#0a0a0a] hover:text-[#0a0a0a] transition-colors"
                    title={`Download ${design.slug}.md`}
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Fullscreen modal ──────────────────────────────────────────── */}
      <AnimatePresence>
        {fullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex flex-col"
            style={{ background: "rgba(0,0,0,0.88)" }}
            onClick={(e) => { if (e.target === e.currentTarget) setFullscreen(false); }}
          >
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="flex flex-col m-4 rounded-2xl overflow-hidden shadow-2xl flex-1"
              style={{ maxHeight: "calc(100vh - 32px)" }}
            >
              {/* Dark macOS chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-[#1c1c1e] border-b border-white/10 shrink-0">
                <div className="flex gap-1.5">
                  <button onClick={() => setFullscreen(false)} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all" title="Close (Esc)" aria-label="Close fullscreen preview" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 bg-white/10 rounded-md px-2.5 py-1 flex items-center gap-1.5 border border-white/10">
                  <div className="w-2 h-2 rounded-full shrink-0 bg-[#28c840]" />
                  <span className="text-[11px] text-white/50 flex-1 truncate">{design.slug.replace(/_/g, "-")}.vercel.app</span>
                </div>
                <button
                  onClick={() => window.open(previewUrl, "_blank")}
                  className="text-white/40 hover:text-white/80 p-1 rounded transition-colors"
                  title="Open in new tab"
                  aria-label="Open preview in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setFullscreen(false)}
                  className="text-white/40 hover:text-white/80 p-1 rounded transition-colors"
                  title="Close (Esc)"
                  aria-label="Close fullscreen preview"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Fullscreen iframe */}
              <div className="flex-1 bg-white">
                <iframe
                  src={previewUrl}
                  className="w-full h-full border-0"
                  title={`${design.title} - fullscreen`}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  onLoad={(e) => {
                    const el = e.currentTarget;
                    if (guardIframeNavigation(el, slug)) return;
                    patchIframeLinks(el, slug);
                  }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Build Guide ──────────────────────────────────────────────────────────────

// ─── Guide helpers (shared) ───────────────────────────────────────────────────

function GCode({ children }: { children: string }) {
  const copy = () => { navigator.clipboard?.writeText(children); toast.success("Copied"); };
  return (
    <div className="relative bg-[#0d1117] rounded-xl px-4 py-3 font-mono text-[13px] text-[#e6edf3] whitespace-pre mt-2 overflow-x-auto">
      <button onClick={copy} className="absolute top-2 right-2 p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white/60 hover:text-white transition-colors">
        <Copy className="w-3 h-3" />
      </button>
      {children}
    </div>
  );
}

function GLink({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer"
      className="inline-flex items-center gap-1 text-[#58a6ff] font-semibold underline underline-offset-2 hover:text-[#4FC3F7] transition-colors">
      {label} <ExternalLink className="w-3 h-3" />
    </a>
  );
}

function GBadge({ children }: { children: React.ReactNode }) {
  return <span className="px-2.5 py-0.5 rounded-full bg-white/8 border border-white/10 text-[#e6edf3] text-[12px] font-semibold">{children}</span>;
}

const GUIDE_STEPS = [
  "Choose an AI Website Builder",
  "Download an IDE",
  "Create a GitHub Account",
  "Generate Your Website",
  "Download the Project Files",
  "Open the Project in VS Code or Cursor",
  "Install Node.js",
  "Install Project Dependencies",
  "Run the Website Locally",
  "Customise the Website",
  "Upload to GitHub",
  "Deploy on Vercel",
  "Connect a Custom Domain",
  "Launch Your Website 🚀",
];

function StepContent({ idx, promptText, platformName }: { idx: number; promptText: string; platformName: string }) {
  const copyPrompt = () => { navigator.clipboard?.writeText(promptText); toast.success("Prompt copied"); };
  switch (idx) {
    case 0: return (
      <div className="space-y-3">
        <p>Pick a platform to generate your website from the prompt above.</p>
        <div className="flex flex-wrap gap-2">
          {[{ name: "Lovable", href: "https://lovable.dev" }, { name: "Bolt", href: "https://bolt.new" }, { name: "v0", href: "https://v0.dev" }, { name: "Replit AI", href: "https://replit.com" }, { name: "Cursor", href: "https://cursor.com" }].map(t => (
            <a key={t.name} href={t.href} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-white/15 text-[#e6edf3] text-[12px] font-bold hover:border-[#4FC3F7]/60 hover:text-[#4FC3F7] transition-colors flex items-center gap-1">
              {t.name} <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          ))}
        </div>
      </div>
    );
    case 1: return (
      <div className="space-y-3">
        <p>An IDE lets you edit and manage your website code after generation.</p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[{ name: "VS Code", desc: "Best for beginners and developers.", href: "https://code.visualstudio.com/" }, { name: "Cursor", desc: "AI-powered code editor.", href: "https://cursor.com/" }].map(ide => (
            <div key={ide.name} className="border border-white/10 rounded-xl p-4 bg-white/5">
              <div className="text-[#e6edf3] font-bold mb-1">{ide.name}</div>
              <div className="text-[#8b949e] text-[13px] mb-2">{ide.desc}</div>
              <GLink href={ide.href} label={`Download ${ide.name}`} />
            </div>
          ))}
        </div>
      </div>
    );
    case 2: return (
      <div className="space-y-3">
        <p>GitHub stores your code online, tracks changes, and lets you deploy your website.</p>
        <div className="flex flex-wrap gap-2">
          {["Store code online", "Track changes", "Deploy websites", "Collaborate with others"].map(b => <GBadge key={b}>{b}</GBadge>)}
        </div>
        <GLink href="https://github.com/" label="Create a GitHub account" />
      </div>
    );
    case 3: return (
      <div className="space-y-3">
        <p>Copy the prompt below and paste it into your chosen AI builder, then click Generate.</p>
        <div className="border border-[#4FC3F7]/30 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-[#4FC3F7]/8 border-b border-[#4FC3F7]/20">
            <span className="text-[11px] text-[#4FC3F7]/70 uppercase font-bold tracking-widest">{platformName} prompt</span>
            <button onClick={copyPrompt} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4FC3F7] text-[#0a0a0a] text-[11px] font-bold hover:bg-[#4FC3F7]/80 transition-colors">
              <Copy className="w-3 h-3" /> Copy
            </button>
          </div>
          <pre className="px-4 py-3 font-mono text-[12px] text-[#e6edf3] whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto bg-[#161b22]">{promptText}</pre>
        </div>
      </div>
    );
    case 4: return (
      <div className="space-y-3">
        <p>Once generation is complete, download the project as a ZIP and extract it to a folder.</p>
        <GCode>{`YourWebsite/\n├── src/\n├── public/\n├── package.json\n└── next.config.js`}</GCode>
      </div>
    );
    case 5: return (
      <div className="space-y-3">
        <p>Open your IDE, then navigate to:</p>
        <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 font-mono text-[13px] text-[#e6edf3]">
          File → Open Folder → Select the extracted folder
        </div>
      </div>
    );
    case 6: return (
      <div className="space-y-3">
        <p>Node.js is required to run React and Next.js websites locally.</p>
        <GLink href="https://nodejs.org/" label="Download Node.js" />
        <p>After installing, verify in your terminal:</p>
        <GCode>{`node -v\nnpm -v`}</GCode>
        <p className="text-[13px]">Both should return version numbers (e.g. v20.x.x).</p>
      </div>
    );
    case 7: return (
      <div className="space-y-3">
        <p>Open the terminal inside VS Code (Terminal → New Terminal) and run:</p>
        <GCode>{`npm install`}</GCode>
        <p className="text-[13px]">Wait until installation completes. This installs all required packages.</p>
      </div>
    );
    case 8: return (
      <div className="space-y-3">
        <p>Start the development server:</p>
        <GCode>{`npm run dev`}</GCode>
        <p className="text-[13px]">Open <span className="font-mono text-[#0a0a0a] bg-[#0a0a0a]/8 px-1.5 py-0.5 rounded">http://localhost:3000</span> in your browser - your website is running locally.</p>
      </div>
    );
    case 9: return (
      <div className="space-y-3">
        <p>Make the website yours by updating:</p>
        <div className="flex flex-wrap gap-2">
          {["Logo", "Brand colors", "Images", "Typography", "Features", "Pricing plans", "Testimonials", "Contact info"].map(b => <GBadge key={b}>{b}</GBadge>)}
        </div>
      </div>
    );
    case 10: return (
      <div className="space-y-3">
        <p>Push your project to GitHub so it can be deployed:</p>
        <GCode>{`git init\ngit add .\ngit commit -m "Initial Website"\ngit push`}</GCode>
        <p className="text-[13px]">Prefer a visual interface? Use <GLink href="https://desktop.github.com/" label="GitHub Desktop" /> instead.</p>
      </div>
    );
    case 11: return (
      <div className="space-y-3">
        <div className="space-y-2">
          {["Sign in to Vercel", "Connect your GitHub account", "Import your repository", "Click Deploy"].map((s, i) => (
            <div key={s} className="flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-[#4FC3F7] text-[#0d1117] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <GLink href="https://vercel.com/" label="Go to Vercel" />
        <p className="text-[13px]">Vercel automatically builds and hosts your website. Every git push triggers a new deployment.</p>
      </div>
    );
    case 12: return (
      <div className="space-y-3">
        <p>Purchase a domain and connect it inside Vercel's dashboard.</p>
        <div className="flex flex-wrap gap-2">
          {[{ name: "Namecheap", href: "https://namecheap.com" }, { name: "Porkbun", href: "https://porkbun.com" }, { name: "GoDaddy", href: "https://godaddy.com" }].map(d => (
            <a key={d.name} href={d.href} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-white/15 text-[#e6edf3] text-[12px] font-semibold hover:border-[#4FC3F7]/60 hover:text-[#4FC3F7] transition-colors flex items-center gap-1">
              {d.name} <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          ))}
        </div>
        <p className="text-[13px]">After purchasing, add the domain in Vercel → Project → Settings → Domains, then configure DNS as instructed.</p>
      </div>
    );
    case 13: return (
      <div className="space-y-3">
        <p className="text-[#4FC3F7] font-semibold">Congratulations - your website is live on the internet!</p>
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          {["Idea", "Prompt", "Generate", "Download", "Open in IDE", "Install deps", "Customise", "GitHub", "Vercel", "Domain", "Live 🚀"].map((step, i, arr) => (
            <span key={step} className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#0a0a0a] text-white font-semibold">{step}</span>
              {i < arr.length - 1 && <span className="text-[#0a0a0a]/30 font-bold">→</span>}
            </span>
          ))}
        </div>
      </div>
    );
    default: return null;
  }
}

function WebsiteBuildGuide({ promptText, platformName }: { promptText: string; platformName: string }) {
  const TOTAL = GUIDE_STEPS.length;
  const [progress, setProgress] = useState(0);
  const [reviewStep, setReviewStep] = useState<number | null>(null);

  const activeStep = reviewStep ?? Math.min(progress, TOTAL - 1);
  const allDone = progress >= TOTAL;

  const advance = () => {
    setReviewStep(null);
    setProgress(p => Math.min(p + 1, TOTAL));
  };

  const handleDotClick = (idx: number) => {
    if (idx < progress) setReviewStep(r => r === idx ? null : idx);
    else if (idx === progress) setReviewStep(null);
  };

  // Fill: line extends from dot 0 center to active dot center (13 gaps total)
  const fillFraction = Math.min(progress / 13, 1);

  return (
    <div className="bg-[#0d1117] px-6 py-8 rounded-b-2xl">

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-[#8b949e] text-[13px] font-semibold">
          {Math.min(progress, TOTAL)} of {TOTAL} steps complete
        </span>
        {allDone
          ? <span className="text-[#3fb950] font-bold text-[13px] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-[#3fb950]" /> All done - website is live!
            </span>
          : <div className="flex items-center gap-3">
              {progress > 0 && (
                <button
                  onClick={() => { setProgress(p => Math.max(0, p - 1)); setReviewStep(null); }}
                  className="text-[11px] text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                >
                  Undo
                </button>
              )}
              <button
                onClick={() => { setProgress(0); setReviewStep(null); }}
                className="text-[11px] text-[#8b949e] hover:text-[#e6edf3] transition-colors"
              >
                Reset
              </button>
            </div>
        }
      </div>

      <div className="flex flex-col gap-5 lg:flex-row">

        {/* ── Left: vertical dot timeline ────────────────────────────── */}
        <div className="relative shrink-0 w-full lg:w-[190px]">
          {/* Track line: from center of dot 0 to center of dot 13 */}
          <div
            className="absolute bg-white/10"
            style={{ left: 14, top: 14, bottom: 14, width: 2 }}
          />
          {/* Animated fill line */}
          <motion.div
            className="absolute origin-top"
            style={{ left: 14, top: 14, bottom: 14, width: 2, background: "linear-gradient(180deg, #3fb950, #4FC3F7)" }}
            animate={{ scaleY: fillFraction }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          />

          {/* Steps column */}
          <div className="relative z-10 flex flex-col gap-4">
            {GUIDE_STEPS.map((title, idx) => {
              const status: "completed" | "active" | "locked" =
                idx < progress ? "completed" : idx === progress ? "active" : "locked";
              const isReviewing = reviewStep === idx;

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 ${status !== "locked" ? "cursor-pointer" : "cursor-not-allowed"}`}
                  onClick={() => status !== "locked" && handleDotClick(idx)}
                >
                  {/* Dot */}
                  <motion.div
                    animate={status === "active" ? {
                      boxShadow: [
                        "0 0 0px #4FC3F7",
                        "0 0 12px #4FC3F7, 0 0 24px rgba(79,195,247,0.4)",
                        "0 0 0px #4FC3F7",
                      ],
                    } : isReviewing ? {
                      boxShadow: "0 0 0 3px rgba(63,185,80,0.4)",
                    } : {}}
                    transition={{ duration: 1.8, repeat: status === "active" ? Infinity : 0, ease: "easeInOut" }}
                    className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[10px] font-bold border-2 shrink-0 transition-all duration-300 ${
                      status === "completed"
                        ? "bg-[#3fb950] border-[#3fb950] text-white"
                        : status === "active"
                        ? "bg-[#4FC3F7] border-[#4FC3F7] text-[#0d1117]"
                        : "bg-[#161b22] border-white/10 text-white/20"
                    }`}
                  >
                    {status === "completed" ? <span className="w-2 h-2 rounded-full bg-current" /> : status === "locked" ? <Lock className="w-3 h-3" /> : idx + 1}
                  </motion.div>

                  {/* Label */}
                  <span
                    className="text-[12px] font-semibold leading-tight select-none"
                    style={{
                      color: status === "completed" ? "rgba(63,185,80,0.65)" : status === "active" ? "#4FC3F7" : "rgba(255,255,255,0.18)",
                      textDecoration: status === "completed" ? "line-through" : "none",
                      textDecorationColor: "rgba(63,185,80,0.45)",
                    }}
                  >
                    {title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Right: content card ─────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            {allDone ? (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="border border-[#3fb950]/30 rounded-2xl p-6 text-center h-full flex flex-col items-center justify-center"
                style={{ background: "rgba(63,185,80,0.05)" }}
              >
                <div className="text-4xl mb-3">🚀</div>
                <div className="text-[#3fb950] font-bold text-[16px] mb-1">Your website is live!</div>
                <div className="text-[#8b949e] text-[13px] leading-relaxed">You've completed all 14 steps. Share your new website with the world.</div>
                <button
                  onClick={() => { setProgress(0); setReviewStep(null); }}
                  className="mt-5 text-[12px] text-[#8b949e] hover:text-[#e6edf3] transition-colors underline"
                >
                  Start over
                </button>
              </motion.div>
            ) : (
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.22 }}
                className="border rounded-2xl overflow-hidden"
                style={{ borderColor: reviewStep !== null ? "rgba(63,185,80,0.25)" : "rgba(79,195,247,0.25)" }}
              >
                {/* Card header */}
                <div
                  className="flex items-center justify-between px-4 py-3 border-b"
                  style={{
                    background: reviewStep !== null ? "rgba(63,185,80,0.06)" : "rgba(79,195,247,0.06)",
                    borderColor: reviewStep !== null ? "rgba(63,185,80,0.15)" : "rgba(79,195,247,0.15)",
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: reviewStep !== null ? "#3fb950" : "#4FC3F7", color: reviewStep !== null ? "#fff" : "#0d1117" }}
                    >
                      {reviewStep !== null ? <span className="w-2 h-2 rounded-full bg-current" /> : activeStep + 1}
                    </span>
                    <span
                      className="text-[13px] font-bold truncate"
                      style={{
                        color: reviewStep !== null ? "#8b949e" : "#e6edf3",
                        textDecoration: reviewStep !== null ? "line-through" : "none",
                        textDecorationColor: "rgba(63,185,80,0.5)",
                      }}
                    >
                      {GUIDE_STEPS[activeStep]}
                    </span>
                  </div>
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest shrink-0 ml-2"
                    style={{ color: reviewStep !== null ? "#3fb950" : "rgba(79,195,247,0.7)" }}
                  >
                    {reviewStep !== null ? "Review" : "Active"}
                  </span>
                </div>

                {/* Card body */}
                <div className="px-4 py-4 text-[#8b949e] text-[13px] leading-relaxed">
                  <StepContent idx={activeStep} promptText={promptText} platformName={platformName} />
                  {reviewStep === null && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={advance}
                      className="mt-4 flex items-center gap-2 px-4 py-2 rounded-full text-[12px] font-bold"
                      style={{ background: "#4FC3F7", color: "#0d1117" }}
                    >
                      {activeStep < TOTAL - 1 ? "Done - Unlock Next →" : "Complete - Launch! 🚀"}
                    </motion.button>
                  )}
                  {reviewStep !== null && (
                    <button
                      onClick={() => setReviewStep(null)}
                      className="mt-4 text-[12px] text-[#8b949e] hover:text-[#4FC3F7] transition-colors flex items-center gap-1"
                    >
                      ← Back to current step
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Preview-unavailable fallback ──────────────────────────────────────────────
// Shown when the live iframe preview fails to load. Reflects this design's own
// metadata rather than a generic mockup, so it never misrepresents what the
// design actually is.

function WebsiteDetailPlaceholder({ design, previewUrl }: { design: { title: string; category: string; subCategory: string; style: string; accentColor: string; bgColor: string }; previewUrl: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: design.bgColor }}>
      <div className="max-w-sm text-center px-6">
        <div
          className="w-12 h-12 rounded-2xl mx-auto mb-4 flex items-center justify-center"
          style={{ background: `${design.accentColor}1a` }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={design.accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="14" rx="2" />
            <path d="M3 9h18" />
            <path d="M9 4v5" />
          </svg>
        </div>
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#0a0a0a" }} className="mb-1.5">
          Live preview isn't available right now
        </div>
        <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: 1.5 }} className="mb-4">
          {design.title} — {design.style || design.subCategory || design.category} — is still fully documented below: the prompt, the build guide, and every scaffold file.
        </div>
        <a
          href={previewUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ fontSize: "13px", fontWeight: 600, color: design.accentColor }}
          className="hover:underline"
        >
          Try opening it directly →
        </a>
      </div>
    </div>
  );
}
