import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Copy, Star, ExternalLink, ChevronDown, ChevronUp, Loader2, Maximize2, X, Lock, ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { websiteDesigns } from "../../lib/website-data";
import { websitePlatformVersions } from "../../lib/website-platforms";
import { websitePlatforms } from "../theme";
import { patchIframeLinks, guardIframeNavigation } from "../../lib/patch-iframe-links";

const DOCS = [
  { key: "orchestrator", label: "00 Orchestrator",    desc: "Step-by-step AI build guide" },
  { key: "prd",          label: "01 PRD",             desc: "Product requirements & personas" },
  { key: "architecture", label: "02 Architecture",    desc: "Tech stack & data model" },
  { key: "design",       label: "03 Design",          desc: "Visual language & tokens" },
  { key: "plan",         label: "04 Plan",            desc: "Build sequence" },
  { key: "epics",        label: "05 Epics & Stories", desc: "Feature epics & user stories" },
  { key: "tasks",        label: "06 Tasks",           desc: "Executable task checklist" },
  { key: "guide",        label: "07 Guide",           desc: "Accessibility & performance" },
];

export function WebsiteDetail({ slug, go }: { slug: string; go: (p: string) => void }) {
  const design = websiteDesigns.find(d => d.slug === slug);
  const [platform, setPlatform] = useState("lovable");
  const [docsOpen, setDocsOpen] = useState(false);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const previewUrl = `/previews/${slug}/index.html`;

  useEffect(() => {
    if (!fullscreen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setFullscreen(false); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [fullscreen]);

  if (!design) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-16 text-center">
        <p className="text-[#5f6c7b] mb-4">Website design not found.</p>
        <button onClick={() => go("library:website")} className="inline-flex items-center gap-1.5 text-[#094067] hover:text-[#094067]/80 text-[13px] transition-colors">
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
      toast.success("Prompt copied", { description: `${design.title} — ${activePl?.name}` });
    } catch {
      toast.error("Failed to copy to clipboard");
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-[#094067]">
      <button onClick={() => go("library:website")} className="inline-flex items-center gap-1.5 text-[#5f6c7b] hover:text-[#094067] text-[13px] mb-4 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Website Generation
      </button>

      <div className="grid lg:grid-cols-2 gap-10 items-start">

        {/* ── Left: Preview + Guide (scrolls) ──────────────────────────── */}
        <div>
          {/* Browser mockup */}
          <div className="rounded-2xl overflow-hidden border border-[#094067]/15 shadow-[0_8px_40px_rgba(9,64,103,0.12)]">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-3 py-2.5 bg-[#f0f0f0] border-b border-[#d8d8d8]">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                <div className="w-3 h-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="flex-1 bg-white rounded-md px-2.5 py-1 flex items-center gap-1.5 border border-[#d8d8d8]">
                <div className={`w-2 h-2 rounded-full shrink-0 ${iframeLoaded && !iframeError ? "bg-[#28c840]" : "bg-[#febc2e]"}`} />
                <span className="text-[11px] text-[#5f6c7b] flex-1 truncate">{design.slug.replace(/_/g, "-")}.vercel.app</span>
              </div>
              <button onClick={() => window.open(previewUrl, "_blank")} className="text-[#5f6c7b] hover:text-[#094067] p-0.5 rounded transition-colors" title="Open in new tab">
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => setFullscreen(true)} className="text-[#5f6c7b] hover:text-[#094067] p-0.5 rounded transition-colors" title="Expand fullscreen">
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
                  <Loader2 className="w-7 h-7 text-[#094067]/40 animate-spin" />
                  <span className="text-[12px] text-[#5f6c7b]">Loading preview…</span>
                </div>
              )}
              {iframeLoaded && !iframeError && (
                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-[#094067]/80 backdrop-blur-sm text-white text-[13px] font-semibold px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                    <Maximize2 className="w-4 h-4" /> Click to expand
                  </div>
                </div>
              )}
              {iframeError ? (
                <WebsiteDetailPlaceholder design={design} />
              ) : (
                <>
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
                  {/* Transparent overlay — blocks iframe link clicks, opens fullscreen on click */}
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
              <span key={s} className="px-2 py-1 rounded-lg bg-[#094067]/5 text-[#094067] text-[12px] font-mono font-semibold">{s}</span>
            ))}
            {design.tags.map(t => (
              <span key={t} className="px-2 py-1 rounded-full border border-[#094067]/15 text-[#5f6c7b] text-[12px]">#{t}</span>
            ))}
          </div>

          {/* ── Build Guide ───────────────────────────────────────────── */}
          <div className="rounded-2xl overflow-hidden border border-[#094067]/15">
            <div className="flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-[#094067]/5 to-[#ffd803]/10 border-b border-[#094067]/10">
              <span className="w-8 h-8 rounded-full bg-[#ffd803] border-2 border-[#094067] flex items-center justify-center text-lg shrink-0">🚀</span>
              <div>
                <div className="text-[#094067] font-bold text-[15px]">How to Build This — From Prompt to Live Website</div>
                <div className="text-[#5f6c7b] text-[12px]">14 steps · Beginner friendly · Prompt to deployment</div>
              </div>
            </div>
            <WebsiteBuildGuide promptText={promptText} platformName={activePl?.name ?? "Lovable"} />
          </div>
        </div>

        {/* ── Right: Prompt panel (STICKY for entire page) ─────────────── */}
        <div className="lg:sticky lg:top-8 self-start">
          {/* Header */}
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2 py-0.5 rounded-full bg-[#094067]/5 border border-[#094067]/20 text-[#5f6c7b] text-[12px]">{design.category}</span>
            <span className="text-[#5f6c7b]">·</span>
            <span className="text-[#5f6c7b] text-[12px]">{design.subCategory}</span>
            {design.tested && (
              <span className="px-2 py-0.5 rounded-full bg-[#ffd803]/20 text-[#ef4565] text-[11px] inline-flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ef4565]" /> tested
              </span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-[#094067] mb-1">{design.title}</h1>
          <p className="text-[#5f6c7b] text-[15px] mb-1">{design.style}</p>
          <p className="text-[#5f6c7b] mb-5 leading-relaxed">{design.description}</p>

          <div className="flex items-center gap-4 mb-6 text-[#5f6c7b]">
            <span className="inline-flex items-center gap-1 text-[#094067]">
              <Star className="w-4 h-4 fill-[#ffd803] text-[#ffd803]" />
              <span className="font-bold">{design.rating}</span>
            </span>
          </div>

          {/* Platform selector */}
          <div className="mb-3">
            <div className="text-[11px] text-[#5f6c7b] uppercase tracking-widest font-semibold mb-2">Choose your AI tool</div>
            <div className="flex flex-wrap gap-2">
              {websitePlatforms.map(pl => (
                <button
                  key={pl.key}
                  onClick={() => setPlatform(pl.key)}
                  className={`px-3 py-1.5 rounded-full border text-[12px] font-semibold transition-colors ${
                    platform === pl.key ? "border-transparent text-white" : "border-[#094067]/20 text-[#5f6c7b] hover:text-[#094067] hover:border-[#094067]/40"
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
          <div className="relative bg-white border-2 border-[#094067] rounded-2xl p-4 mb-4 shadow-[6px_6px_0_0_#094067]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] text-[#5f6c7b] uppercase font-bold tracking-widest">{activePl?.name} prompt</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#5f6c7b]">
                <span className="inline-block w-2 h-2 rounded-full" style={{ background: activePl?.color }} />
                Optimised for {activePl?.name}
              </span>
            </div>
            <pre className="whitespace-pre-wrap text-[#094067] font-mono text-[12px] leading-relaxed max-h-72 overflow-y-auto">{promptText}</pre>
          </div>

          {/* Copy button */}
          <button
            onClick={handleCopy}
            className="w-full h-11 rounded-full bg-[#ffd803] text-[#094067] font-bold flex items-center justify-center gap-2 hover:bg-[#ffd803]/90 transition-colors mb-6"
          >
            <Copy className="w-4 h-4" /> Copy {activePl?.name} Prompt
          </button>

          {/* Supporting docs accordion */}
          <div className="border border-[#094067]/15 rounded-2xl overflow-hidden">
            <button
              onClick={() => setDocsOpen(v => !v)}
              className="w-full flex items-center justify-between px-4 py-3 bg-[#094067]/3 hover:bg-[#094067]/5 transition-colors"
            >
              <span className="text-[#094067] font-semibold text-[14px]">9 Supporting scaffold files</span>
              {docsOpen ? <ChevronUp className="w-4 h-4 text-[#5f6c7b]" /> : <ChevronDown className="w-4 h-4 text-[#5f6c7b]" />}
            </button>
            {docsOpen && (
              <div className="divide-y divide-[#094067]/8">
                {DOCS.map(doc => (
                  <div key={doc.key} className="flex items-center justify-between px-4 py-3">
                    <div>
                      <div className="text-[#094067] text-[13px] font-semibold">{doc.label}</div>
                      <div className="text-[#5f6c7b] text-[11px]">{doc.desc}</div>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[#5f6c7b]" />
                  </div>
                ))}
                <div className="flex items-center justify-between px-4 py-3 bg-[#ffd803]/10">
                  <div>
                    <div className="text-[#094067] text-[13px] font-semibold">{design.slug}.md</div>
                    <div className="text-[#5f6c7b] text-[11px]">Base prompt + all 8 platform versions</div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#094067]" />
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
                  <button onClick={() => setFullscreen(false)} className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-90 transition-all" title="Close (Esc)" />
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
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setFullscreen(false)}
                  className="text-white/40 hover:text-white/80 p-1 rounded transition-colors"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Fullscreen iframe */}
              <div className="flex-1 bg-white">
                <iframe
                  src={previewUrl}
                  className="w-full h-full border-0"
                  title={`${design.title} — fullscreen`}
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
      className="inline-flex items-center gap-1 text-[#58a6ff] font-semibold underline underline-offset-2 hover:text-[#ffd803] transition-colors">
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
            <a key={t.name} href={t.href} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-white/15 text-[#e6edf3] text-[12px] font-bold hover:border-[#ffd803]/60 hover:text-[#ffd803] transition-colors flex items-center gap-1">
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
        <div className="border border-[#ffd803]/30 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-[#ffd803]/8 border-b border-[#ffd803]/20">
            <span className="text-[11px] text-[#ffd803]/70 uppercase font-bold tracking-widest">{platformName} prompt</span>
            <button onClick={copyPrompt} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffd803] text-[#094067] text-[11px] font-bold hover:bg-[#ffd803]/80 transition-colors">
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
        <p className="text-[13px]">Open <span className="font-mono text-[#094067] bg-[#094067]/8 px-1.5 py-0.5 rounded">http://localhost:3000</span> in your browser — your website is running locally.</p>
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
              <span className="w-5 h-5 rounded-full bg-[#ffd803] text-[#0d1117] flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{i + 1}</span>
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
            <a key={d.name} href={d.href} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-full border border-white/15 text-[#e6edf3] text-[12px] font-semibold hover:border-[#ffd803]/60 hover:text-[#ffd803] transition-colors flex items-center gap-1">
              {d.name} <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          ))}
        </div>
        <p className="text-[13px]">After purchasing, add the domain in Vercel → Project → Settings → Domains, then configure DNS as instructed.</p>
      </div>
    );
    case 13: return (
      <div className="space-y-3">
        <p className="text-[#ffd803] font-semibold">Congratulations — your website is live on the internet!</p>
        <div className="flex flex-wrap items-center gap-2 text-[12px]">
          {["Idea", "Prompt", "Generate", "Download", "Open in IDE", "Install deps", "Customise", "GitHub", "Vercel", "Domain", "Live 🚀"].map((step, i, arr) => (
            <span key={step} className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#094067] text-white font-semibold">{step}</span>
              {i < arr.length - 1 && <span className="text-[#094067]/30 font-bold">→</span>}
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
              <span className="w-2 h-2 rounded-full bg-[#3fb950]" /> All done — website is live!
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
                className="text-[11px] text-[#8b949e] hover:text-[#ef4565] transition-colors"
              >
                Reset
              </button>
            </div>
        }
      </div>

      <div className="flex gap-5">

        {/* ── Left: vertical dot timeline ────────────────────────────── */}
        <div className="relative shrink-0 w-[190px]">
          {/* Track line: from center of dot 0 to center of dot 13 */}
          <div
            className="absolute bg-white/10"
            style={{ left: 14, top: 14, bottom: 14, width: 2 }}
          />
          {/* Animated fill line */}
          <motion.div
            className="absolute origin-top"
            style={{ left: 14, top: 14, bottom: 14, width: 2, background: "linear-gradient(180deg, #3fb950, #ffd803)" }}
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
                        "0 0 0px #ffd803",
                        "0 0 12px #ffd803, 0 0 24px rgba(255,216,3,0.4)",
                        "0 0 0px #ffd803",
                      ],
                    } : isReviewing ? {
                      boxShadow: "0 0 0 3px rgba(63,185,80,0.4)",
                    } : {}}
                    transition={{ duration: 1.8, repeat: status === "active" ? Infinity : 0, ease: "easeInOut" }}
                    className={`w-[28px] h-[28px] rounded-full flex items-center justify-center text-[10px] font-bold border-2 shrink-0 transition-all duration-300 ${
                      status === "completed"
                        ? "bg-[#3fb950] border-[#3fb950] text-white"
                        : status === "active"
                        ? "bg-[#ffd803] border-[#ffd803] text-[#0d1117]"
                        : "bg-[#161b22] border-white/10 text-white/20"
                    }`}
                  >
                    {status === "completed" ? <span className="w-2 h-2 rounded-full bg-current" /> : status === "locked" ? <Lock className="w-3 h-3" /> : idx + 1}
                  </motion.div>

                  {/* Label */}
                  <span
                    className="text-[12px] font-semibold leading-tight select-none"
                    style={{
                      color: status === "completed" ? "rgba(63,185,80,0.65)" : status === "active" ? "#ffd803" : "rgba(255,255,255,0.18)",
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
                  className="mt-5 text-[12px] text-[#8b949e] hover:text-[#ef4565] transition-colors underline"
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
                style={{ borderColor: reviewStep !== null ? "rgba(63,185,80,0.25)" : "rgba(255,216,3,0.25)" }}
              >
                {/* Card header */}
                <div
                  className="flex items-center justify-between px-4 py-3 border-b"
                  style={{
                    background: reviewStep !== null ? "rgba(63,185,80,0.06)" : "rgba(255,216,3,0.06)",
                    borderColor: reviewStep !== null ? "rgba(63,185,80,0.15)" : "rgba(255,216,3,0.15)",
                  }}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: reviewStep !== null ? "#3fb950" : "#ffd803", color: reviewStep !== null ? "#fff" : "#0d1117" }}
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
                    style={{ color: reviewStep !== null ? "#3fb950" : "rgba(255,216,3,0.7)" }}
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
                      style={{ background: "#ffd803", color: "#0d1117" }}
                    >
                      {activeStep < TOTAL - 1 ? "Done — Unlock Next →" : "Complete — Launch! 🚀"}
                    </motion.button>
                  )}
                  {reviewStep !== null && (
                    <button
                      onClick={() => setReviewStep(null)}
                      className="mt-4 text-[12px] text-[#8b949e] hover:text-[#ffd803] transition-colors flex items-center gap-1"
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

// ─── Large detail placeholder ─────────────────────────────────────────────────

function WebsiteDetailPlaceholder({ design }: { design: { accentColor: string; bgColor: string } }) {
  return (
    <div className="w-full" style={{ background: design.bgColor }}>
      {/* Nav */}
      <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "#E5E7EB" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, color: "#1A1A1A", letterSpacing: "0.1em" }}>CULINARYNARRATIVE</span>
        <div className="flex gap-4 items-center">
          {["Menu", "Stories", "Shop"].map(l => (
            <span key={l} style={{ fontSize: "9px", color: "#1A1A1A" }}>{l}</span>
          ))}
          <span style={{ fontSize: "9px", fontWeight: 700, color: "#fff", background: "#E31E24", padding: "3px 10px", borderRadius: "2px" }}>
            Book a Table
          </span>
        </div>
      </div>

      {/* Hero */}
      <div className="py-16 px-5 text-center" style={{ background: "#1A1A1A" }}>
        <div style={{ fontSize: "8px", color: design.accentColor, fontWeight: 700, letterSpacing: "4px" }} className="mb-2">MODERN INDIAN DINING</div>
        <div style={{ fontSize: "22px", fontWeight: 700, color: "#FFFDF6", lineHeight: 1.2 }} className="mb-3">
          A Canteen for the Curious
        </div>
        <div style={{ fontSize: "9px", color: "rgba(255,253,246,0.6)" }} className="mb-5">
          Where stories meet the plate. Where the curious find their table.
        </div>
        <div className="flex gap-3 justify-center">
          <span style={{ fontSize: "9px", background: "#E31E24", color: "#fff", padding: "5px 14px", borderRadius: "2px", fontWeight: 600 }}>Book a Table</span>
          <span style={{ fontSize: "9px", color: "#FFFDF6", border: "1px solid rgba(255,255,255,0.4)", padding: "5px 14px", borderRadius: "2px" }}>View Menu</span>
        </div>
      </div>

      {/* Menu Strip */}
      <div className="px-5 py-6" style={{ background: design.bgColor }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A1A" }} className="mb-3">Our Menu</div>
        <div className="space-y-3">
          {[
            { name: "Pork Ribs Vindaloo", desc: "A slow-braise of spare ribs, Goan vinegar spice, pickled shallots, roti.", veg: false, price: "₹ 1,450" },
            { name: "Mumbai Masala Chips", desc: "Fried potatoes, spiced compound butter, tamarind chutney, peanuts.", veg: true, price: "₹ 450" },
            { name: "Bombay Sour", desc: "House whisky, kokum shrub, cardamom bitters, curry leaf salt rim.", veg: true, price: "₹ 750" },
          ].map(dish => (
            <div key={dish.name} className="flex items-center justify-between border-b pb-2" style={{ borderColor: "#E5E7EB" }}>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full mt-0.5 shrink-0" style={{ background: dish.veg ? design.accentColor : "#E31E24" }} />
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#1A1A1A" }}>{dish.name}</div>
                  <div style={{ fontSize: "8px", color: "#6B7280" }}>{dish.desc}</div>
                </div>
              </div>
              <span style={{ fontSize: "10px", color: "#1A1A1A", fontWeight: 600, marginLeft: "8px" }}>{dish.price}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Stories */}
      <div className="px-5 py-6" style={{ background: "#F9FAFB" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#1A1A1A" }} className="mb-3">Canteen Stories</div>
        <div className="grid grid-cols-2 gap-3">
          {[
            "Independence Day Daawat",
            "The Cocktail Book Launch",
            "Chef's Table Series",
            "Community Harvest Festival",
          ].map(story => (
            <div key={story} style={{ background: "#EAB308", padding: "10px 12px", borderRadius: "8px" }}>
              <div style={{ fontSize: "8px", fontWeight: 700, color: "#1A1A1A", lineHeight: 1.4 }}>{story}</div>
              <div style={{ fontSize: "7px", color: "#92400E", marginTop: "4px" }}>Read More →</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-5 py-6" style={{ background: "#0D0D0D" }}>
        <div style={{ fontSize: "13px", fontWeight: 700, color: "#FFFDF6" }} className="mb-1">CulinaryNarrative</div>
        <div style={{ fontSize: "8px", color: "rgba(255,255,255,0.4)" }} className="mb-3">Mumbai · London · Singapore</div>
        <div className="flex gap-4">
          {["Menu", "Stories", "Shop", "Careers"].map(l => (
            <span key={l} style={{ fontSize: "8px", color: design.accentColor }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
