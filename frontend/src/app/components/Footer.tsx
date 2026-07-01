export function Footer({ go }: { go: (route: string) => void }) {
  const linkClass = "text-left text-[#8b95a5] hover:text-white transition-colors cursor-pointer bg-transparent border-none p-0 focus:outline-2 focus:outline-white focus:outline-offset-2 rounded";

  return (
    <footer className="mt-20 relative overflow-hidden" style={{ background: "#1a1f2e" }}>
      {/* Footer content */}
      <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-14 pb-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-3">
            <img src="/logo-text.png" alt="Prompt Bot" style={{ height: "30px", width: "auto", filter: "brightness(0) invert(1)" }} />
          </div>
          <p className="text-[#8b95a5] leading-relaxed mb-5" style={{ fontSize: "13px" }}>
            The world's largest AI prompt library. Browse, copy, create.
          </p>
        </div>

        <div>
          <div className="text-white mb-4" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
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
          <div className="text-white mb-4" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Community
          </div>
          <div className="flex flex-col gap-2.5" style={{ fontSize: "14px" }}>
            <button onClick={() => go("submit")} className={linkClass}>Submit a Prompt</button>
            <button onClick={() => go("guide")} className={linkClass}>Guides</button>
            <button onClick={() => go("pricing")} className={linkClass}>Pricing</button>
          </div>
        </div>

        <div>
          <div className="text-white mb-4" style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>
            Resources
          </div>
          <div className="flex flex-col gap-2.5" style={{ fontSize: "14px" }}>
            <button onClick={() => go("guide:image")} className={linkClass}>Image Gen Guide</button>
            <button onClick={() => go("guide:video")} className={linkClass}>Video Gen Guide</button>
            <button onClick={() => go("guide:website")} className={linkClass}>Website Gen Guide</button>
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
            fontFamily: "'DM Sans', 'Inter', system-ui, sans-serif",
            whiteSpace: "nowrap",
          }}
        >
          Prompt Bot
        </div>
      </div>

      {/* Bottom bar */}
      <div className="relative z-10 border-t border-white/8 py-5">
        <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#6b7580]" style={{ fontSize: "12px" }}>
            &copy; {new Date().getFullYear()} Prompt Bot. All rights reserved.
          </p>
          <p className="text-[#6b7580]" style={{ fontSize: "12px" }}>
            Built with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
