import { useState } from "react";
import { Menu, X } from "lucide-react";

type Props = {
  current: string;
  onNavigate: (page: string) => void;
  onAuth: () => void;
  onSearch?: (q: string) => void;
};

const NAV_LINKS = [
  { label: "Library",      route: "library"      },
  { label: "Builder",      route: "builder"      },
  { label: "Improver",     route: "improver"     },
  { label: "Compare",      route: "compare"      },
  { label: "Guide",        route: "guide"        },
  { label: "Pricing",      route: "pricing"      },
];

export function Nav({ current, onNavigate, onAuth }: Props) {
  const [open, setOpen] = useState(false);
  const nav = (key: string) => { setOpen(false); onNavigate(key); };

  return (
    <header className="bg-white sticky top-0 z-50" style={{ borderBottom: "1px solid #f0f0f0" }}>
      <div className="max-w-[1280px] mx-auto px-8 h-16 flex items-center gap-8">

        {/* ── Logo ── */}
        <button
          onClick={() => nav("home")}
          className="flex items-center gap-2 shrink-0 hover:opacity-75 transition-opacity"
        >
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
            <polygon points="4,3 23,13 4,23" fill="#1a1a1a" />
          </svg>
          <span style={{ fontSize: "15px", fontWeight: 700, color: "#0f0f0f", letterSpacing: "-0.01em" }}>
            Prompt Bot
          </span>
        </button>

        {/* ── Nav links ── */}
        <nav className="hidden md:flex items-center gap-0.5 ml-1">
          {NAV_LINKS.map((item) => (
            <button
              key={item.label}
              onClick={() => nav(item.route)}
              className="px-3 py-2 rounded-lg transition-colors"
              style={{
                fontSize: "14px",
                fontWeight: current === item.route ? 600 : 500,
                color: current === item.route ? "#0f0f0f" : "#3f3f3f",
                background: current === item.route ? "#f5f5f5" : "transparent",
              }}
              onMouseEnter={e => { if (current !== item.route) (e.currentTarget as HTMLElement).style.background = "#f5f5f5"; }}
              onMouseLeave={e => { if (current !== item.route) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* ── Right actions ── */}
        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={onAuth}
            className="hidden md:block px-3 py-2 text-[#3f3f3f] hover:text-[#0f0f0f] transition-colors"
            style={{ fontSize: "14px", fontWeight: 500 }}
          >
            Log in
          </button>

          <button
            onClick={() => nav("submit")}
            className="hidden md:block px-4 py-2 rounded-lg border text-[#3f3f3f] hover:border-[#9ca3af] hover:text-[#0f0f0f] transition-all"
            style={{ fontSize: "14px", fontWeight: 500, borderColor: "#d1d5db" }}
          >
            Submit a prompt
          </button>

          <button
            onClick={() => nav("library")}
            className="px-4 py-2 rounded-lg bg-[#0f0f0f] text-white hover:bg-[#2a2a2a] transition-colors"
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            Get started for free
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(v => !v)}
            className="ml-1 md:hidden p-2 text-[#3f3f3f]"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-[#f0f0f0] shadow-lg z-50">
          <div className="flex flex-col px-6 py-4 gap-1">
            {NAV_LINKS.map(item => (
              <button
                key={item.label}
                onClick={() => nav(item.route)}
                className="text-left py-2.5 text-[#3f3f3f] hover:text-[#0f0f0f] transition-colors"
                style={{ fontSize: "15px", fontWeight: 500 }}
              >
                {item.label}
              </button>
            ))}
            <div className="h-px bg-[#f0f0f0] my-2" />
            <button onClick={() => { setOpen(false); onAuth(); }} className="text-left py-2.5 text-[#3f3f3f]" style={{ fontSize: "15px", fontWeight: 500 }}>
              Log in
            </button>
            <button onClick={() => nav("submit")} className="text-left py-2.5 text-[#3f3f3f]" style={{ fontSize: "15px", fontWeight: 500 }}>
              Submit a prompt
            </button>
            <button onClick={() => nav("library")} className="mt-1 w-full py-2.5 rounded-lg bg-[#0f0f0f] text-white text-center" style={{ fontSize: "14px", fontWeight: 600 }}>
              Get started for free
            </button>
          </div>
        </div>
      )}
    </header>
  );
}