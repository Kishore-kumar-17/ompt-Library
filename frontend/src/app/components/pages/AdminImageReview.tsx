import { useState, useMemo } from "react";
import { Download, Check, AlertCircle, ChevronDown, ChevronRight } from "lucide-react";
import { imageLibraryPrompts } from "../../lib/library-data";
import { ImageWithFallback } from "../figma/ImageWithFallback";

// Only include the original 350 prompts (id 1–350), not the viral ones
const BASE_PROMPTS = imageLibraryPrompts.filter(p => Number(p.id) <= 350);

export function AdminImageReview() {
  // corrections: slug → new image path
  const [corrections, setCorrections] = useState<Record<string, string>>({});
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [exported, setExported] = useState(false);

  // Group prompts by category
  const grouped = useMemo(() => {
    const map = new Map<string, typeof BASE_PROMPTS>();
    for (const p of BASE_PROMPTS) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    }
    return map;
  }, []);

  const totalCorrections = Object.keys(corrections).length;

  function getImage(p: typeof BASE_PROMPTS[0]) {
    return corrections[p.slug!] ?? p.image;
  }

  function handleImageInput(slug: string, original: string, val: string) {
    const trimmed = val.trim();
    if (!trimmed || trimmed === original) {
      const next = { ...corrections };
      delete next[slug];
      setCorrections(next);
    } else {
      // Accept bare number "42" or full path "/images/image42.png"
      const path = /^\d+$/.test(trimmed)
        ? `/images/image${trimmed}.png`
        : trimmed;
      setCorrections({ ...corrections, [slug]: path });
    }
  }

  function exportCorrections() {
    const output = Object.entries(corrections).map(([slug, image]) => ({
      slug,
      newImage: image,
      oldImage: BASE_PROMPTS.find(p => p.slug === slug)?.image ?? "",
    }));
    const json = JSON.stringify(output, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "image-corrections.json";
    a.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  }

  function toggleCat(cat: string) {
    setExpandedCats(prev => ({ ...prev, [cat]: !prev[cat] }));
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 py-8 text-[#0a0a0a]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[#0a0a0a]">Image Review Tool</h1>
          <p className="text-[#6b7280] text-sm mt-0.5">
            {BASE_PROMPTS.length} prompts · {totalCorrections} correction{totalCorrections !== 1 ? "s" : ""} pending
          </p>
        </div>
        <button
          onClick={exportCorrections}
          disabled={totalCorrections === 0}
          className="inline-flex items-center gap-2 h-10 px-5 rounded-full bg-[#0a0a0a] text-white text-sm font-semibold disabled:opacity-30"
        >
          {exported ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
          {exported ? "Downloaded!" : `Export ${totalCorrections} corrections`}
        </button>
      </div>

      <div className="bg-[#4FC3F7]/20 border border-[#4FC3F7] rounded-xl p-4 mb-6 flex gap-3 text-sm text-[#0a0a0a]">
        <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-[#0a0a0a]" />
        <span>
          For each wrong image, type the correct image number (e.g. <code className="bg-white px-1 rounded">42</code>) or full path in the input below the image. Leave blank if correct. When done, click <strong>Export corrections</strong> and share the JSON file.
        </span>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {Array.from(grouped.entries()).map(([cat, prompts]) => {
          const catCorrections = prompts.filter(p => corrections[p.slug!]).length;
          const isOpen = expandedCats[cat] !== false; // open by default

          return (
            <div key={cat} className="border border-[#0a0a0a]/15 rounded-2xl overflow-hidden">
              {/* Category header */}
              <button
                onClick={() => toggleCat(cat)}
                className="w-full flex items-center justify-between px-5 py-3 bg-[#0a0a0a]/5 hover:bg-[#0a0a0a]/10"
              >
                <div className="flex items-center gap-3">
                  {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                  <span className="font-semibold text-[#0a0a0a]">{cat}</span>
                  <span className="text-[#6b7280] text-sm">({prompts.length} prompts)</span>
                  {catCorrections > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-[#4FC3F7] text-white text-[11px] font-bold">
                      {catCorrections} fixed
                    </span>
                  )}
                </div>
              </button>

              {/* Prompt grid */}
              {isOpen && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 p-4">
                  {prompts.map(p => {
                    const isCorrected = !!corrections[p.slug!];
                    const currentImage = getImage(p);
                    const originalNumber = p.image.match(/image(\d+)/)?.[1] ?? "";

                    return (
                      <div
                        key={p.id}
                        className={`rounded-xl border-2 overflow-hidden ${
                          isCorrected ? "border-[#10a37f]" : "border-[#0a0a0a]/10"
                        }`}
                      >
                        {/* Image */}
                        <div className="aspect-square bg-[#0a0a0a]/5 relative">
                          <ImageWithFallback
                            src={currentImage}
                            alt={p.title}
                            className="w-full h-full object-contain"
                          />
                          {isCorrected && (
                            <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-[#10a37f] flex items-center justify-center">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="p-2">
                          <div className="text-[11px] font-mono text-[#6b7280] mb-0.5">{p.slug}</div>
                          <div className="text-[12px] font-semibold text-[#0a0a0a] line-clamp-2 mb-2">{p.title}</div>
                          <input
                            type="text"
                            placeholder={`now: ${originalNumber}`}
                            defaultValue={isCorrected ? (corrections[p.slug!].match(/image(\d+)/)?.[1] ?? corrections[p.slug!]) : ""}
                            onChange={e => handleImageInput(p.slug!, p.image, e.target.value)}
                            className="w-full h-7 px-2 text-[12px] rounded-lg border border-[#0a0a0a]/20 focus:outline-none focus:border-[#4FC3F7] bg-white text-[#0a0a0a] placeholder:text-[#6b7280]/50"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {totalCorrections > 0 && (
        <div className="sticky bottom-6 mt-8 flex justify-center">
          <button
            onClick={exportCorrections}
            className="inline-flex items-center gap-2 h-12 px-8 rounded-full bg-[#0a0a0a] text-white font-bold shadow-[4px_4px_0_0_#4FC3F7]"
          >
            {exported ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            {exported ? "Downloaded!" : `Export ${totalCorrections} corrections`}
          </button>
        </div>
      )}
    </div>
  );
}
