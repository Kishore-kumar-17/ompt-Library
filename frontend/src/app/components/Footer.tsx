export function Footer({ go }: { go: (route: string) => void }) {
  const linkClass = "text-left text-white/65 hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2 rounded";

  return (
    <footer className="mt-20 relative overflow-hidden" style={{ background: "#0a0a0a" }}>
      {/* Footer content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-14 pb-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-3">
            <span style={{ fontSize: "18px", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Prompt <span style={{ color: "#4FC3F7" }}>Bot</span></span>
          </div>
          <p className="text-white/65 leading-relaxed mb-5" style={{ fontSize: "13px" }}>
            The world's largest AI prompt library. Browse, copy, create.
          </p>
        </div>

        <div>
          <div className="text-[#4FC3F7] mb-4" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Product
          </div>
          <div className="flex flex-col gap-2.5" style={{ fontSize: "14px" }}>
            <button onClick={() => go("library")} className={linkClass}>Library</button>
            <button onClick={() => go("builder")} className={linkClass}>Builder</button>
            <button onClick={() => go("improver")} className={linkClass}>Improver</button>
            <button onClick={() => go("compare")} className={linkClass}>Compare</button>
          </div>
        </div>

        <div>
          <div className="text-[#4FC3F7] mb-4" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Community
          </div>
          <div className="flex flex-col gap-2.5" style={{ fontSize: "14px" }}>
            <button onClick={() => go("submit")} className={linkClass}>Submit a Prompt</button>
            <button onClick={() => go("guide")} className={linkClass}>Guides</button>
            <button onClick={() => go("pricing")} className={linkClass}>Pricing</button>
          </div>
        </div>

        <div>
          <div className="text-[#4FC3F7] mb-4" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Resources
          </div>
          <div className="flex flex-col gap-2.5" style={{ fontSize: "14px" }}>
            <button onClick={() => go("guide:image-gen")} className={linkClass}>Image Gen Guide</button>
            <button onClick={() => go("guide:video-gen")} className={linkClass}>Video Gen Guide</button>
            <button onClick={() => go("guide:web-gen")} className={linkClass}>Website Gen Guide</button>
          </div>
        </div>
      </div>

      {/* Giant watermark area */}
      <div className="relative w-full" style={{ height: "clamp(180px, 22vw, 320px)" }}>
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
          style={{
            fontSize: "clamp(140px, 20vw, 340px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            color: "rgba(255,255,255,0.035)",
            fontFamily: "'DM Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          Prompt Bot
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/10 py-5">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/55" style={{ fontSize: "12px" }}>
            &copy; {new Date().getFullYear()} Prompt Bot. All rights reserved.
          </p>
          <p className="text-white/55" style={{ fontSize: "12px" }}>
            Built with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
