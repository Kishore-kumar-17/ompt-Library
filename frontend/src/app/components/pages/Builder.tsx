import { useState, useEffect } from "react";
import {
  Copy, Sparkles, Wand2, ChevronDown, ChevronUp,
  RefreshCw, Check, ArrowRight, Layers, ArrowLeft, Save, Download,
} from "lucide-react";
import { toast } from "sonner";
import { platforms, videoPlatforms, websitePlatforms } from "../theme";
import { authStore, builderApi, variablesApi, type EngineLockFields, type BuilderResult } from "../../lib/api";
import { LockLayerPanel } from "../LockLayerPanel";
import { VariablePanel } from "../VariablePanel";
import { applyVariables } from "../../lib/variables";
import { highlight } from "../../lib/highlight";

// ─── Enhancement options ──────────────────────────────────────────────────────

const STYLES  = ["Cinematic", "Minimalist", "Vintage", "Dark Moody", "Vibrant", "Hyperrealistic", "Anime", "Watercolor", "3D Render", "Sketch", "Oil Painting", "Neon"];
const MOODS   = ["Dramatic", "Peaceful", "Energetic", "Mysterious", "Nostalgic", "Futuristic", "Romantic", "Eerie", "Epic", "Intimate"];
const ASPECTS = ["1:1", "16:9", "9:16", "4:3", "2:3", "3:2", "21:9"];

// Video-specific options
const VIDEO_STYLES    = ["Cinematic", "Documentary", "Commercial", "Motion Graphics", "Animated", "Slow-Mo", "Timelapse", "Vlog", "Film Noir", "Music Video", "Drone Aerial", "Neon"];
const VIDEO_MOODS     = ["Dramatic", "Peaceful", "Energetic", "Mysterious", "Nostalgic", "Futuristic", "Romantic", "Eerie", "Epic", "Intimate"];
const VIDEO_DURATIONS = ["5s", "10s", "15s", "30s", "60s"];
const VIDEO_CAMERAS   = ["Static", "Dolly In", "Dolly Out", "Lateral Track", "Crane Up", "Crane Down", "Steadicam Orbit", "Whip Pan", "Push-In", "Pull-Back Reveal", "Drone Ascent", "Handheld"];
const VIDEO_PACING    = ["Slow & Dreamy", "Medium & Steady", "Fast & Dynamic", "Building Crescendo", "Rhythmic / Beat-Sync"];
const VIDEO_SOUND     = ["Music Only", "Ambient + SFX", "Dialogue + Score", "Sound Effects", "Silence / ASMR", "Voiceover + Music"];

const VIDEO_CATEGORIES = [
  { key: "cinematic",    label: "Cinematic & Film" },
  { key: "commercial",   label: "Advertising & Commercial" },
  { key: "social-media", label: "Social Media Videos" },
  { key: "product",      label: "Product & E-Commerce" },
  { key: "education",    label: "Education & Explainers" },
  { key: "creative",     label: "Creative & Entertainment" },
];

const FAMILIES = [
  { key: "image",   label: "Image",   desc: "Midjourney, Flux..." },
  { key: "video",   label: "Video",   desc: "Sora, Runway..." },
  { key: "website", label: "Website", desc: "Lovable, Bolt, v0..." },
  { key: "text",    label: "Text",    desc: "ChatGPT, Claude..." },
  { key: "content", label: "Content", desc: "Ads, posts, copy..." },
];

const CATEGORIES = [
  { key: "people-portraits",  label: "People & Portraits" },
  { key: "product-ecommerce", label: "Product & Ecommerce" },
  { key: "fashion-apparel",   label: "Fashion & Apparel" },
  { key: "marketing-ads",     label: "Marketing & Ads" },
  { key: "art-illustration",  label: "Art & Illustration" },
  { key: "trending-viral",    label: "Trending & Viral" },
  { key: "social-media",      label: "Social Media" },
];

// ─── Website-specific data ───────────────────────────────────────────────────

const WEBSITE_CATEGORIES = [
  { key: "business",   label: "Business Website",        subs: ["Restaurant / Cafe", "Clinic / Healthcare", "Educational Institute", "Boutique / Retail", "Real Estate", "Legal / Law Firm", "Service Business"] },
  { key: "ecommerce",  label: "E-Commerce",              subs: ["Single Product", "Multi-Product", "Fashion Store", "Subscription Box", "Digital Products"] },
  { key: "portfolio",  label: "Portfolio / Creator Site", subs: ["Photographer", "Designer", "Writer / Blogger", "Developer", "Artist"] },
  { key: "saas",       label: "Apps & SaaS Interface",    subs: ["Dashboard", "Landing + App", "Developer Tool"] },
  { key: "landing",    label: "Landing Page",             subs: ["SaaS Product", "Personal Brand", "Course / Info Product", "Event / Conference"] },
];

const WEBSITE_STYLES   = ["Minimal", "Bold", "Luxury", "Playful", "Corporate", "Editorial", "Dark Mode", "Brutalist"];
const WEBSITE_MOODS    = ["Professional", "Creative", "Elegant", "Warm", "Technical", "Energetic", "Sophisticated"];
const WEBSITE_PALETTES = ["Dark", "Light", "Vibrant", "Monochrome", "Earth Tones", "Pastel", "Neon"];
const WEBSITE_AUDIENCES = ["B2B", "B2C", "Youth / Gen-Z", "Premium / Luxury", "Students", "Parents", "Developers"];
const WEBSITE_PAGES    = ["Home", "About", "Pricing", "Blog", "Contact", "Shop", "Portfolio", "Dashboard", "FAQ", "Testimonials", "Team", "Services"];

const STEPS = [
  { num: "1", label: "Describe" },
  { num: "2", label: "Configure" },
  { num: "3", label: "Generate" },
];

// ─── Chip selector ────────────────────────────────────────────────────────────

function ChipGroup({ label, options, value, onChange, disabled }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void; disabled?: boolean;
}) {
  return (
    <div>
      <div className="text-[13px] text-[#6b7280] mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            disabled={disabled}
            onClick={() => onChange(value === opt ? "" : opt)}
            className={`px-3 py-1 rounded-full text-[12px] border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
              value === opt
                ? "bg-[#4FC3F7] text-[#0a0a0a] border-[#4FC3F7]"
                : "bg-white border-[#0a0a0a]/15 text-[#6b7280] hover:border-[#0a0a0a]/40 hover:text-[#0a0a0a]"
            }`}
            style={value === opt ? { fontWeight: 600 } : {}}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiChipGroup({ label, options, value, onChange, disabled }: {
  label: string; options: string[]; value: string[]; onChange: (v: string[]) => void; disabled?: boolean;
}) {
  return (
    <div>
      <div className="text-[13px] text-[#6b7280] mb-2">{label}</div>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => {
          const selected = value.includes(opt);
          return (
            <button
              key={opt}
              disabled={disabled}
              onClick={() => onChange(selected ? value.filter(v => v !== opt) : [...value, opt])}
              className={`px-3 py-1 rounded-full text-[12px] border transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
                selected
                  ? "bg-[#4FC3F7] text-[#0a0a0a] border-[#4FC3F7]"
                  : "bg-white border-[#0a0a0a]/15 text-[#6b7280] hover:border-[#0a0a0a]/40 hover:text-[#0a0a0a]"
              }`}
              style={selected ? { fontWeight: 600 } : {}}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export function Builder({ go }: { go: (p: string) => void }) {
  const [idea, setIdea]         = useState("");
  const [family, setFamily]     = useState("image");
  const [style, setStyle]       = useState("");
  const [mood, setMood]         = useState("");
  const [aspect, setAspect]     = useState("16:9");
  const [platform, setPlatform] = useState("midjourney");
  const [showEnhance, setShowEnhance] = useState(false);
  const [showAllPlatforms, setShowAllPlatforms] = useState(false);

  // Video-specific state
  const [videoDuration, setVideoDuration]       = useState("");
  const [videoCamera, setVideoCamera]           = useState("");
  const [videoPacing, setVideoPacing]            = useState("");
  const [videoSound, setVideoSound]             = useState("");
  const [videoCategory, setVideoCategory]       = useState("");

  // Website-specific state
  const [websiteCategory, setWebsiteCategory]     = useState("");
  const [websiteSubCategory, setWebsiteSubCategory] = useState("");
  const [websiteAudience, setWebsiteAudience]     = useState("");
  const [websitePalette, setWebsitePalette]       = useState("");
  const [websitePages, setWebsitePages]           = useState<string[]>([]);

  // Generation state
  const [generated, setGenerated]   = useState("");
  const [allPlatformResults, setAllPlatformResults] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading]   = useState(false);
  const [copied, setCopied]         = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [error, setError]           = useState("");
  const [category, setCategory]     = useState("people-portraits");
  const [lockData, setLockData]     = useState<EngineLockFields | null>(null);
  const [vars, setVars]             = useState<Record<string, string>>({});
  const [regenText, setRegenText]   = useState<string | null>(null);
  const [regenerating, setRegen]    = useState(false);
  useEffect(() => { setRegenText(null); }, [platform]);

  // Reset website subcategory when category changes
  useEffect(() => { setWebsiteSubCategory(""); }, [websiteCategory]);

  // Switch platform defaults when family changes, and clear family-specific
  // enhancement state so a value picked under one family (e.g. an Image style)
  // never gets silently submitted under another (e.g. Video).
  useEffect(() => {
    if (family === "website") {
      setPlatform("lovable");
    } else if (family === "video") {
      setPlatform("veo");
    } else {
      setPlatform("midjourney");
    }
    setStyle("");
    setMood("");
    setHasGenerated(false);
  }, [family]);

  const isWebsite = family === "website";
  const isVideo   = family === "video";
  const activePlatforms = isWebsite ? websitePlatforms : isVideo ? videoPlatforms : platforms;
  const selectedCategorySubs = WEBSITE_CATEGORIES.find(c => c.key === websiteCategory)?.subs ?? [];

  const canGenerate = idea.trim().length > 0;
  const variableFields = lockData?.variables ?? [];
  // Single source of truth for "the current prompt text" — used for both the
  // on-screen preview and Copy/Download, so users never copy something they
  // didn't see rendered.
  const baseText = lockData?.finalAssembledText || generated;
  const displayPrompt = regenText ?? applyVariables(baseText, vars);
  const outputText = isWebsite ? generated : displayPrompt;

  // Current step indicator
  const currentStep = !canGenerate ? 0 : !hasGenerated ? 1 : 2;

  async function handleRegenerate() {
    if (regenerating || !lockData) return;
    setRegen(true);
    try {
      const res = await variablesApi.expand({ category, platform, brief: vars, title: idea });
      setRegenText(res.finalAssembledText);
      toast.success("Regenerated with your values");
    } catch (err: any) {
      toast.error("Regeneration failed", { description: err?.message });
    } finally {
      setRegen(false);
    }
  }

  async function handleGenerate() {
    if (!canGenerate || isLoading) return;
    setIsLoading(true);
    setError("");
    setHasGenerated(false);
    setAllPlatformResults({});
    setLockData(null);
    setVars({});
    setRegenText(null);

    try {
      const payload: Parameters<typeof builderApi.generate>[0] = {
        idea, family, platform,
        style: style || undefined,
        mood: mood || undefined,
        aspect: (family === "image" || family === "video") ? aspect : undefined,
        category: isWebsite ? (websiteCategory || undefined) : isVideo ? (videoCategory || undefined) : (family === "image" ? category : undefined),
        subCategory: isWebsite ? (websiteSubCategory || undefined) : undefined,
        audience: isWebsite ? (websiteAudience || undefined) : undefined,
        palette: isWebsite ? (websitePalette || undefined) : undefined,
        pages: isWebsite && websitePages.length > 0 ? websitePages : undefined,
        duration: isVideo ? (videoDuration || undefined) : undefined,
        cameraMovement: isVideo ? (videoCamera || undefined) : undefined,
        pacing: isVideo ? (videoPacing || undefined) : undefined,
        soundDesign: isVideo ? (videoSound || undefined) : undefined,
      };
      const result = await builderApi.generate(payload);
      setGenerated(result.prompt);
      setLockData(result);
      setVars(Object.fromEntries((result.variables ?? []).filter(v => v.default).map(v => [v.name, v.default!])));
      setHasGenerated(true);
    } catch (err: any) {
      setError(err?.message ?? "Generation failed");
      toast.error("Generation failed", { description: err?.message });
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGenerateAll() {
    if (!canGenerate || isLoading) return;
    setIsLoading(true);
    setError("");
    setShowAllPlatforms(true);
    setAllPlatformResults({});

    const results: Record<string, string> = {};
    const fullResults: Record<string, BuilderResult> = {};
    const failed: string[] = [];
    const outcomes = await Promise.allSettled(
      activePlatforms.map(async (pl) => {
        const payload: Parameters<typeof builderApi.generate>[0] = {
          idea, family, platform: pl.key,
          style: style || undefined,
          mood: mood || undefined,
          aspect: (family === "image" || family === "video") ? aspect : undefined,
          category: isWebsite ? (websiteCategory || undefined) : isVideo ? (videoCategory || undefined) : (family === "image" ? category : undefined),
          subCategory: isWebsite ? (websiteSubCategory || undefined) : undefined,
          audience: isWebsite ? (websiteAudience || undefined) : undefined,
          palette: isWebsite ? (websitePalette || undefined) : undefined,
          pages: isWebsite && websitePages.length > 0 ? websitePages : undefined,
          duration: isVideo ? (videoDuration || undefined) : undefined,
          cameraMovement: isVideo ? (videoCamera || undefined) : undefined,
          pacing: isVideo ? (videoPacing || undefined) : undefined,
          soundDesign: isVideo ? (videoSound || undefined) : undefined,
        };
        const result = await builderApi.generate(payload);
        results[pl.key] = result.finalAssembledText || result.prompt;
        fullResults[pl.key] = result;
      })
    );
    outcomes.forEach((o, i) => { if (o.status === "rejected") failed.push(activePlatforms[i].name); });

    setAllPlatformResults(results);
    if (Object.keys(results).length > 0) setHasGenerated(true);

    // Keep "Single view" in sync with the batch: populate it for whichever
    // platform is currently selected, or clear stale data from a previous
    // single-generate if that platform didn't come back in this batch.
    const currentPlatformResult = fullResults[platform];
    if (currentPlatformResult) {
      setGenerated(currentPlatformResult.prompt);
      setLockData(currentPlatformResult);
      setVars(Object.fromEntries((currentPlatformResult.variables ?? []).filter(v => v.default).map(v => [v.name, v.default!])));
    } else {
      setGenerated("");
      setLockData(null);
      setVars({});
    }
    setRegenText(null);

    if (failed.length > 0 && Object.keys(results).length > 0) {
      setError(`Failed for: ${failed.join(", ")}. Other platforms generated successfully.`);
      toast.error("Some platforms failed", { description: failed.join(", ") });
    } else if (failed.length > 0) {
      setError("Generation failed for all platforms.");
      toast.error("Multi-platform generation failed");
    }
    setIsLoading(false);
  }

  function handleCopy() {
    if (!generated) return;
    navigator.clipboard?.writeText(outputText);
    setCopied(true);
    toast.success("Prompt copied");
    setTimeout(() => setCopied(false), 2000);
  }

  function handleDownload() {
    if (!generated) return;
    const blob = new Blob([outputText], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${family}-prompt-${platform}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Downloaded as .md file");
  }

  // Count active enhancements
  const videoEnhancementCount   = [style, mood, videoDuration, videoCamera, videoPacing, videoSound].filter(Boolean).length;
  const websiteEnhancementCount = [style, mood, websitePalette, websiteAudience].filter(Boolean).length + (websitePages.length > 0 ? 1 : 0);

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-10 text-[#0a0a0a]">

      {/* Header */}
      <div className="mb-8">
        <button onClick={() => go("library")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-4 transition-colors">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Library
        </button>
        <h1
          className="text-[#0a0a0a] mb-2"
          style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.03em", fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif" }}
        >
          Prompt <span style={{ fontWeight: 800 }}>Builder</span>
        </h1>
        <p className="text-[#6b7280]" style={{ fontSize: "15px" }}>
          {isWebsite
            ? "Describe your business — AI generates a structured 10-section website prompt for any AI builder."
            : "Describe your idea — AI generates a production-ready prompt with locks and formatting."}
        </p>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mt-5">
          {STEPS.map((s, i) => (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] transition-all"
                style={{
                  background: i <= currentStep ? "#4FC3F7" : "rgba(10,10,10,0.06)",
                  color: i <= currentStep ? "#0a0a0a" : "#6b7280",
                  fontWeight: 700,
                }}
              >
                {i < currentStep ? <Check className="w-3.5 h-3.5" /> : s.num}
              </div>
              <span className={`text-[13px] ${i <= currentStep ? "text-[#0a0a0a]" : "text-[#6b7280]"}`} style={{ fontWeight: i === currentStep ? 600 : 400 }}>
                {s.label}
              </span>
              {i < STEPS.length - 1 && (
                <div className="w-8 h-px mx-1" style={{ background: i < currentStep ? "#4FC3F7" : "rgba(10,10,10,0.12)" }} />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1fr] gap-6 items-start">

        {/* ── Left: Input panel ──────────────────────────────────────────── */}
        <div className="space-y-4 min-w-0">

          {/* Family */}
          <div>
            <div className="text-[13px] text-[#6b7280] mb-2">What are you creating?</div>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {FAMILIES.map((f) => {
                const locked = f.key === "text" || f.key === "content";
                return (
                  <button
                    key={f.key}
                    disabled={isLoading}
                    aria-disabled={locked}
                    onClick={() => {
                      if (locked || isLoading) { if (locked) toast("Coming Soon", { description: `${f.label} prompts will be available soon.` }); return; }
                      setFamily(f.key); setHasGenerated(false);
                    }}
                    className={`p-3 rounded-xl border text-left transition-all relative disabled:opacity-50 disabled:cursor-not-allowed ${
                      locked
                        ? "bg-[#0a0a0a]/5 border-[#0a0a0a]/10 cursor-not-allowed"
                        : family === f.key
                        ? "bg-[#4FC3F7] border-[#4FC3F7]"
                        : "bg-white border-[#0a0a0a]/15 hover:border-[#0a0a0a]/30"
                    }`}
                  >
                    <div className={`text-[13px] flex items-center gap-1.5 ${locked ? "text-[#6b7280]/50" : "text-[#0a0a0a]"}`} style={{ fontWeight: 600 }}>
                      {f.label}
                      {locked && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#4FC3F7]/15 text-[#0a0a0a]">SOON</span>}
                    </div>
                    <div className={`text-[10px] mt-0.5 ${locked ? "text-[#6b7280]/40" : family === f.key ? "text-[#0a0a0a]/70" : "text-[#6b7280]"}`}>{f.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Website category */}
          {isWebsite && (
            <div>
              <div className="text-[13px] text-[#6b7280] mb-2">Website type</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {WEBSITE_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    disabled={isLoading}
                    onClick={() => { setWebsiteCategory(websiteCategory === cat.key ? "" : cat.key); setHasGenerated(false); }}
                    className={`p-3 rounded-xl border text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      websiteCategory === cat.key
                        ? "bg-[#4FC3F7] border-[#4FC3F7]"
                        : "bg-white border-[#0a0a0a]/15 hover:border-[#0a0a0a]/30"
                    }`}
                  >
                    <div className="text-[13px]" style={{ fontWeight: 600 }}>{cat.label}</div>
                    <div className={`text-[10px] mt-0.5 ${websiteCategory === cat.key ? "text-[#0a0a0a]/70" : "text-[#6b7280]"}`}>
                      {cat.subs.length} types
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Website subcategory */}
          {isWebsite && websiteCategory && selectedCategorySubs.length > 0 && (
            <div>
              <div className="text-[13px] text-[#6b7280] mb-2">Subcategory</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedCategorySubs.map((sub) => (
                  <button
                    key={sub}
                    disabled={isLoading}
                    onClick={() => { setWebsiteSubCategory(websiteSubCategory === sub ? "" : sub); setHasGenerated(false); }}
                    className={`px-3 py-1 rounded-full text-[12px] border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      websiteSubCategory === sub
                        ? "bg-[#4FC3F7] text-[#0a0a0a] border-[#4FC3F7]"
                        : "bg-white border-[#0a0a0a]/15 text-[#6b7280] hover:border-[#0a0a0a]/40 hover:text-[#0a0a0a]"
                    }`}
                    style={websiteSubCategory === sub ? { fontWeight: 600 } : {}}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Idea input */}
          <div className="bg-white border-2 border-[#0a0a0a]/15 rounded-2xl p-5 focus-within:border-[#4FC3F7] transition-colors">
            <div className="flex items-center gap-2 mb-3">
              <Wand2 className="w-4 h-4 text-[#4FC3F7]" />
              <label htmlFor="builder-idea" className="text-[13px] text-[#0a0a0a]" style={{ fontWeight: 600 }}>
                {isWebsite ? "Describe your business or idea" : "Your idea or scene"}
              </label>
            </div>
            <textarea
              id="builder-idea"
              rows={3}
              disabled={isLoading}
              value={idea}
              onChange={(e) => { setIdea(e.target.value); setHasGenerated(false); setError(""); }}
              placeholder={isWebsite
                ? `Try:\n"A premium Japanese restaurant in Mumbai with omakase dining, sake bar, and chef's table booking"\n"SaaS dashboard for managing freelance invoices and contracts"`
                : `Try:\n"a samurai standing in rain at night"\n"luxury perfume bottle on marble surface"`}
              className="w-full resize-none text-[#0a0a0a] placeholder:text-[#6b7280]/50 text-[15px] outline-none leading-relaxed bg-transparent disabled:opacity-60"
            />
            <div className="flex items-center justify-between mt-1">
              <div className="text-[11px] text-[#6b7280]/50">{idea.length > 0 ? `${idea.length} characters` : ""}</div>
              {idea.length > 200 && <div className="text-[11px] text-[#4FC3F7]">Great detail!</div>}
            </div>
          </div>

          {/* Category (drives the image lock layer) */}
          {family === "image" && (
            <div>
              <div className="text-[13px] text-[#6b7280] mb-2">
                Category <span className="text-[#6b7280]/50 text-[11px]">- determines lock layer</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    disabled={isLoading}
                    onClick={() => { setCategory(cat.key); setHasGenerated(false); }}
                    className={`px-3 py-1 rounded-full text-[12px] border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      category === cat.key
                        ? "bg-[#4FC3F7] text-[#0a0a0a] border-[#4FC3F7]"
                        : "bg-white border-[#0a0a0a]/15 text-[#6b7280] hover:border-[#0a0a0a]/40 hover:text-[#0a0a0a]"
                    }`}
                    style={category === cat.key ? { fontWeight: 600 } : {}}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Video category */}
          {isVideo && (
            <div>
              <div className="text-[13px] text-[#6b7280] mb-2">
                Category <span className="text-[#6b7280]/50 text-[11px]">- shapes the prompt style</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {VIDEO_CATEGORIES.map((cat) => (
                  <button
                    key={cat.key}
                    disabled={isLoading}
                    onClick={() => { setVideoCategory(videoCategory === cat.key ? "" : cat.key); setHasGenerated(false); }}
                    className={`px-3 py-1 rounded-full text-[12px] border transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      videoCategory === cat.key
                        ? "bg-[#4FC3F7] text-[#0a0a0a] border-[#4FC3F7]"
                        : "bg-white border-[#0a0a0a]/15 text-[#6b7280] hover:border-[#0a0a0a]/40 hover:text-[#0a0a0a]"
                    }`}
                    style={videoCategory === cat.key ? { fontWeight: 600 } : {}}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Platform picker */}
          <div>
            <div className="text-[13px] text-[#6b7280] mb-2">Platform</div>
            <div className="flex flex-wrap gap-2">
              {activePlatforms.map((pl) => (
                <button
                  key={pl.key}
                  disabled={isLoading}
                  onClick={() => { setPlatform(pl.key); setHasGenerated(false); }}
                  className={`px-3 py-1.5 rounded-full border text-[13px] transition-all disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2 ${
                    platform === pl.key
                      ? "bg-[#4FC3F7] text-[#0a0a0a] border-[#4FC3F7]"
                      : "border-[#0a0a0a]/15 text-[#6b7280] hover:text-[#0a0a0a] hover:border-[#0a0a0a]/30"
                  }`}
                  style={platform === pl.key ? { fontWeight: 600 } : {}}
                >
                  <span className="inline-block w-2 h-2 rounded-full mr-1.5" style={{ background: pl.color }} />
                  {pl.name}
                </button>
              ))}
            </div>
          </div>

          {/* Enhancements - collapsed by default */}
          <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl overflow-hidden">
            <button
              onClick={() => setShowEnhance(!showEnhance)}
              className="w-full flex items-center justify-between px-5 py-3 text-[13px] text-[#0a0a0a] hover:bg-[#0a0a0a]/[0.02] transition-colors"
              style={{ fontWeight: 600 }}
            >
              <span className="flex items-center gap-2">
                Enhancements
                <span className="text-[#6b7280] font-normal">optional</span>
                {(isWebsite ? websiteEnhancementCount > 0 : isVideo ? videoEnhancementCount > 0 : (style || mood)) && (
                  <span className="px-1.5 py-0.5 rounded-full bg-[#4FC3F7] text-[10px] text-[#0a0a0a]" style={{ fontWeight: 700 }}>
                    {isWebsite ? websiteEnhancementCount : isVideo ? videoEnhancementCount : [style, mood].filter(Boolean).length}
                  </span>
                )}
              </span>
              {showEnhance ? <ChevronUp className="w-4 h-4 text-[#6b7280]" /> : <ChevronDown className="w-4 h-4 text-[#6b7280]" />}
            </button>
            {showEnhance && (
              <div className="px-5 pb-5 space-y-4 border-t border-[#0a0a0a]/8 pt-4">
                {isWebsite ? (
                  <>
                    <ChipGroup disabled={isLoading} label="Style"    options={WEBSITE_STYLES}    value={style}           onChange={(v) => { setStyle(v);           setHasGenerated(false); }} />
                    <ChipGroup disabled={isLoading} label="Mood"     options={WEBSITE_MOODS}     value={mood}            onChange={(v) => { setMood(v);            setHasGenerated(false); }} />
                    <ChipGroup disabled={isLoading} label="Palette"  options={WEBSITE_PALETTES}  value={websitePalette}  onChange={(v) => { setWebsitePalette(v);  setHasGenerated(false); }} />
                    <ChipGroup disabled={isLoading} label="Audience" options={WEBSITE_AUDIENCES} value={websiteAudience} onChange={(v) => { setWebsiteAudience(v); setHasGenerated(false); }} />
                    <MultiChipGroup disabled={isLoading} label="Pages" options={WEBSITE_PAGES}   value={websitePages}    onChange={(v) => { setWebsitePages(v);    setHasGenerated(false); }} />
                  </>
                ) : isVideo ? (
                  <>
                    <ChipGroup disabled={isLoading} label="Style"           options={VIDEO_STYLES}    value={style}         onChange={(v) => { setStyle(v);          setHasGenerated(false); }} />
                    <ChipGroup disabled={isLoading} label="Mood"            options={VIDEO_MOODS}     value={mood}          onChange={(v) => { setMood(v);           setHasGenerated(false); }} />
                    <ChipGroup disabled={isLoading} label="Duration"        options={VIDEO_DURATIONS} value={videoDuration}  onChange={(v) => { setVideoDuration(v);  setHasGenerated(false); }} />
                    <ChipGroup disabled={isLoading} label="Camera Movement" options={VIDEO_CAMERAS}   value={videoCamera}    onChange={(v) => { setVideoCamera(v);    setHasGenerated(false); }} />
                    <ChipGroup disabled={isLoading} label="Pacing"          options={VIDEO_PACING}    value={videoPacing}    onChange={(v) => { setVideoPacing(v);    setHasGenerated(false); }} />
                    <ChipGroup disabled={isLoading} label="Sound Design"    options={VIDEO_SOUND}     value={videoSound}     onChange={(v) => { setVideoSound(v);     setHasGenerated(false); }} />
                    <ChipGroup disabled={isLoading} label="Aspect Ratio"    options={ASPECTS}         value={aspect}         onChange={(v) => { setAspect(v);         setHasGenerated(false); }} />
                  </>
                ) : (
                  <>
                    <ChipGroup disabled={isLoading} label="Style"       options={STYLES}  value={style}  onChange={(v) => { setStyle(v);  setHasGenerated(false); }} />
                    <ChipGroup disabled={isLoading} label="Mood"        options={MOODS}   value={mood}   onChange={(v) => { setMood(v);   setHasGenerated(false); }} />
                    {family === "image" && (
                      <ChipGroup disabled={isLoading} label="Aspect Ratio" options={ASPECTS} value={aspect} onChange={(v) => { setAspect(v); setHasGenerated(false); }} />
                    )}
                  </>
                )}
              </div>
            )}
          </div>

          {/* Generate buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2">
            <button
              onClick={handleGenerate}
              disabled={!canGenerate || isLoading}
              className="h-13 rounded-2xl bg-[#0a0a0a] text-white text-[15px] flex items-center justify-center gap-2.5 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#1a1a1a] active:scale-[0.98] transition-all"
              style={{ fontWeight: 700, height: "52px" }}
            >
              {isLoading && !showAllPlatforms ? (
                <>
                  <RefreshCw className="w-4.5 h-4.5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4.5 h-4.5" />
                  Generate Prompt
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </>
              )}
            </button>
            <button
              onClick={handleGenerateAll}
              disabled={!canGenerate || isLoading}
              title={`Generate for all ${activePlatforms.length} platforms`}
              className="h-[52px] px-5 rounded-2xl border border-[#0a0a0a]/15 text-[#0a0a0a] text-[13px] flex items-center justify-center gap-2 hover:bg-[#0a0a0a]/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              style={{ fontWeight: 600 }}
            >
              <Layers className="w-4 h-4" />
              All {activePlatforms.length} platforms
            </button>
          </div>
        </div>

        {/* ── Right: Output panel (sticky) ─────────────────────────────── */}
        <div className="bg-white border border-[#0a0a0a]/10 rounded-2xl p-6 flex flex-col gap-4 min-w-0 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto">

          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="text-[14px] text-[#0a0a0a]" style={{ fontWeight: 700 }}>
              {hasGenerated ? (isWebsite ? "Website Prompt" : "Generated Prompt") : "Output"}
            </div>
            {hasGenerated && (
              <div className="flex items-center gap-1.5">
                {showAllPlatforms && (
                  <button
                    onClick={() => setShowAllPlatforms(false)}
                    className="text-[12px] text-[#6b7280] hover:text-[#0a0a0a] transition-colors"
                  >
                    Single view
                  </button>
                )}
                {!showAllPlatforms && Object.keys(allPlatformResults).length > 0 && (
                  <button
                    onClick={() => setShowAllPlatforms(true)}
                    className="text-[12px] text-[#6b7280] hover:text-[#0a0a0a] flex items-center gap-1 transition-colors"
                  >
                    <Layers className="w-3 h-3" /> All platforms
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-[13px] text-red-600">
              {error}
            </div>
          )}

          {/* Single platform output */}
          {!showAllPlatforms && (
            <div className={`relative rounded-xl border min-h-[220px] max-h-[600px] overflow-y-auto shrink-0 p-4 transition-all ${
              hasGenerated ? "bg-[#fafafa] border-[#0a0a0a]/10" : "bg-[#f5f5f5] border-[#0a0a0a]/8"
            }`}>
              {isLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex gap-1.5">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2.5 h-2.5 rounded-full bg-[#4FC3F7] animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-[13px] text-[#6b7280]">
                    {isWebsite ? "Building your website prompt..." : "Crafting your prompt..."}
                  </span>
                </div>
              ) : hasGenerated ? (
                <pre className="whitespace-pre-wrap break-words font-mono text-[13px] leading-relaxed text-[#0a0a0a]">
                  {!isWebsite && variableFields.length > 0 ? highlight(outputText, variableFields.map(v => v.name)) : outputText}
                </pre>
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-center px-6">
                  <Wand2 className="w-8 h-8 text-[#0a0a0a]/15" />
                  <p className="text-[#6b7280] text-[13px]">
                    {canGenerate
                      ? "Hit Generate to build your prompt"
                      : isWebsite
                        ? "Describe your business to get started"
                        : "Type your idea to get started"}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* All platforms output */}
          {showAllPlatforms && (
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#4FC3F7]" />
                  <span className="text-[13px] text-[#6b7280]">Generating for all {activePlatforms.length} platforms...</span>
                </div>
              ) : (
                activePlatforms.map((pl) => (
                  <div key={pl.key} className="rounded-xl border border-[#0a0a0a]/8 p-3 bg-[#fafafa]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ background: pl.color }} />
                      <span className="text-[12px] text-[#0a0a0a]" style={{ fontWeight: 600 }}>{pl.name}</span>
                      <button
                        onClick={() => {
                          navigator.clipboard?.writeText(allPlatformResults[pl.key] ?? "");
                          toast.success(`Copied ${pl.name} prompt`);
                        }}
                        className="ml-auto text-[11px] text-[#6b7280] hover:text-[#0a0a0a] flex items-center gap-1 transition-colors"
                      >
                        <Copy className="w-3 h-3" /> Copy
                      </button>
                    </div>
                    <pre className="font-mono text-[11px] text-[#6b7280] leading-relaxed whitespace-pre-wrap break-words max-h-[200px] overflow-y-auto">
                      {allPlatformResults[pl.key] ?? "-"}
                    </pre>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Variable layer (non-website only) */}
          {hasGenerated && !showAllPlatforms && !isWebsite && variableFields.length > 0 && (
            <VariablePanel
              variables={variableFields}
              values={vars}
              onChange={(name, value) => setVars(prev => ({ ...prev, [name]: value }))}
              onRegenerate={handleRegenerate}
              regenerating={regenerating}
            />
          )}

          {/* Active tags */}
          {hasGenerated && !showAllPlatforms && (
            <div className="flex flex-wrap gap-1.5">
              {style  && <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/15 text-[11px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>{style}</span>}
              {mood   && <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/15 text-[11px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>{mood}</span>}
              {isVideo && videoDuration && <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/15 text-[11px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>{videoDuration}</span>}
              {isVideo && videoCamera && <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/15 text-[11px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>{videoCamera}</span>}
              {isVideo && videoPacing && <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/15 text-[11px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>{videoPacing}</span>}
              {isVideo && videoSound && <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/15 text-[11px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>{videoSound}</span>}
              {isVideo && videoCategory && (
                <span className="px-2 py-0.5 rounded-full bg-[#0a0a0a]/6 text-[11px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>
                  {VIDEO_CATEGORIES.find(c => c.key === videoCategory)?.label}
                </span>
              )}
              {isWebsite && websitePalette && <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/15 text-[11px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>{websitePalette}</span>}
              {isWebsite && websiteAudience && <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7]/15 text-[11px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>{websiteAudience}</span>}
              {isWebsite && websiteCategory && (
                <span className="px-2 py-0.5 rounded-full bg-[#0a0a0a]/6 text-[11px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>
                  {WEBSITE_CATEGORIES.find(c => c.key === websiteCategory)?.label}
                </span>
              )}
              {!isWebsite && (family === "image" || family === "video") && aspect && (
                <span className="px-2 py-0.5 rounded-full bg-[#0a0a0a]/6 text-[11px] text-[#0a0a0a]" style={{ fontWeight: 500 }}>{aspect}</span>
              )}
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            {isWebsite ? (
              <>
                <button
                  onClick={handleGenerate}
                  disabled={!hasGenerated || isLoading}
                  className="h-11 rounded-xl border border-[#0a0a0a]/15 text-[#0a0a0a] text-[13px] flex items-center justify-center gap-2 hover:bg-[#0a0a0a]/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{ fontWeight: 600 }}
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                  Regenerate
                </button>
                <button
                  onClick={handleCopy}
                  disabled={!hasGenerated || isLoading}
                  className="h-11 rounded-xl bg-[#4FC3F7] text-[#0a0a0a] text-[13px] flex items-center justify-center gap-2 hover:bg-[#4FC3F7]/85 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{ fontWeight: 700 }}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Prompt"}
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!hasGenerated || isLoading}
                  className="h-11 rounded-xl border border-[#0a0a0a]/15 text-[#0a0a0a] text-[13px] flex items-center justify-center gap-2 hover:bg-[#0a0a0a]/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{ fontWeight: 600 }}
                >
                  <Download className="w-4 h-4" />
                  Download as .md
                </button>
                <button
                  onClick={() => {
                    if (!authStore.getUser()) { toast.error("Sign in to save prompts"); return; }
                    toast("Saving generated prompts isn't available yet", { description: "Copy or download it for now — we're working on it." });
                  }}
                  disabled={!hasGenerated || isLoading}
                  className="h-11 rounded-xl border border-[#0a0a0a]/15 text-[#0a0a0a] text-[13px] flex items-center justify-center gap-2 hover:bg-[#0a0a0a]/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all col-span-2"
                  style={{ fontWeight: 600 }}
                >
                  <Save className="w-4 h-4" />
                  Save to Library
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleRegenerate}
                  disabled={!hasGenerated || isLoading || regenerating}
                  className="h-11 rounded-xl border border-[#0a0a0a]/15 text-[#0a0a0a] text-[13px] flex items-center justify-center gap-2 hover:bg-[#0a0a0a]/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{ fontWeight: 600 }}
                >
                  <RefreshCw className={`w-4 h-4 ${regenerating ? "animate-spin" : ""}`} />
                  {regenerating ? "Regenerating..." : "Regenerate"}
                </button>

                <button
                  onClick={handleCopy}
                  disabled={!hasGenerated || isLoading}
                  className="h-11 rounded-xl bg-[#4FC3F7] text-[#0a0a0a] text-[13px] flex items-center justify-center gap-2 hover:bg-[#4FC3F7]/85 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  style={{ fontWeight: 700 }}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? "Copied!" : "Copy Prompt"}
                </button>

                <button
                  onClick={() => {
                    if (!authStore.getUser()) { toast.error("Sign in to save prompts"); return; }
                    toast("Saving generated prompts isn't available yet", { description: "Copy or download it for now — we're working on it." });
                  }}
                  disabled={!hasGenerated || isLoading}
                  className="h-11 rounded-xl border border-[#0a0a0a]/15 text-[#0a0a0a] text-[13px] flex items-center justify-center gap-2 hover:bg-[#0a0a0a]/5 disabled:opacity-40 disabled:cursor-not-allowed transition-all col-span-2"
                  style={{ fontWeight: 600 }}
                >
                  <Save className="w-4 h-4" />
                  Save to Library
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Engine lock layer (image only) */}
      {hasGenerated && !isWebsite && lockData && (
        <div className="mt-6">
          <LockLayerPanel
            categoryLabel={lockData.categoryLabel}
            lockSection={lockData.lockSection}
            negativeLocks={lockData.negativeLocks}
            validation={lockData.validation}
          />
        </div>
      )}
    </div>
  );
}
