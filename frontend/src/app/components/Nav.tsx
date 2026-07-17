import { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronLeft } from "lucide-react";
import { authStore, AUTH_CHANGED_EVENT } from "../lib/api";

type Props = {
  current: string;
  onNavigate: (page: string) => void;
  onAuth: () => void;
  onSearch?: (q: string) => void;
  onBack?: () => void;
  canGoBack?: boolean;
};

const NAV_LINKS = [
  { label: "Library",      route: "library"      },
  { label: "Builder",      route: "builder"      },
  { label: "Improver",     route: "improver"     },
  { label: "Compare",      route: "compare"      },
  { label: "Guide",        route: "guide"        },
  { label: "Pricing",      route: "pricing"      },
];

const ADMIN_LINKS = [
  { label: "Admin",        route: "admin"        },
  { label: "Review",       route: "image-review" },
];

/* Triangle logo — pointing right */
const TriangleLogo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <path d="M4 2L26 14L4 26V2z" fill="#0a0a0a" />
  </svg>
);

const isActive = (current: string, route: string) => current === route || current.startsWith(route + ":");
const focusRing = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#4FC3F7] focus-visible:outline-offset-2";

export function Nav({ current, onNavigate, onAuth, onBack, canGoBack }: Props) {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(() => authStore.getUser());
  const nav = (key: string) => { setOpen(false); onNavigate(key); };
  const menuRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus trap: keep Tab/Shift+Tab cycling within the open mobile menu,
  // Escape closes it and returns focus to the hamburger button.
  useEffect(() => {
    if (!open) return;
    const menu = menuRef.current;
    if (!menu) return;

    const getFocusable = () =>
      Array.from(menu.querySelectorAll<HTMLElement>('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.hasAttribute("disabled"));

    const focusable = getFocusable();
    focusable[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        hamburgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;
      const items = getFocusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    menu.addEventListener("keydown", onKeyDown);
    return () => menu.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const onAuthChanged = () => setUser(authStore.getUser());
    window.addEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
    return () => window.removeEventListener(AUTH_CHANGED_EVENT, onAuthChanged);
  }, []);

  const displayName = user?.displayName || user?.email?.split("@")[0] || "";

  return (
    <header className="bg-white sticky top-0 z-50" style={{ borderBottom: "1px solid rgba(10,10,10,0.1)" }}>
      <div className="max-w-[1280px] mx-auto px-2 lg:px-3 h-16 flex items-center gap-3">

        {/* ── Back button ── */}
        {canGoBack && (
          <button
            onClick={onBack}
            className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[#6b7280] hover:text-[#0a0a0a] hover:bg-[#0a0a0a]/5 transition-all ${focusRing}`}
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* ── Logo ── */}
        <button
          onClick={() => nav("home")}
          className={`flex items-center gap-2.5 shrink-0 hover:opacity-75 rounded-lg transition-opacity ${focusRing}`}
        >
          <TriangleLogo />
          <span style={{ fontSize: "18px", fontWeight: 700, color: "#0a0a0a", letterSpacing: "-0.02em" }}>Prompt Bot</span>
        </button>

        {/* ── Nav links ── */}
        <nav className="hidden lg:flex items-center gap-1 ml-2">
          {NAV_LINKS.map((item) => {
            const active = isActive(current, item.route);
            return (
              <button
                key={item.label}
                onClick={() => nav(item.route)}
                aria-current={active ? "page" : undefined}
                className={`px-4 py-2 rounded-lg transition-colors hover:bg-[#0a0a0a]/5 ${focusRing}`}
                style={{
                  fontSize: "14px",
                  fontWeight: active ? 600 : 500,
                  color: active ? "#0a0a0a" : "#6b7280",
                  background: active ? "#0a0a0a0d" : "transparent",
                }}
              >
                {item.label}
              </button>
            );
          })}
          {user?.isAdmin && ADMIN_LINKS.map((item) => {
            const active = isActive(current, item.route);
            return (
              <button
                key={item.label}
                onClick={() => nav(item.route)}
                aria-current={active ? "page" : undefined}
                className={`px-4 py-2 rounded-lg transition-colors hover:bg-[#0a0a0a]/5 ${focusRing}`}
                style={{
                  fontSize: "14px",
                  fontWeight: active ? 600 : 500,
                  color: active ? "#0a0a0a" : "#6b7280",
                  background: active ? "#0a0a0a0d" : "transparent",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* ── Right actions ── */}
        <div className="ml-auto flex items-center gap-3">
          {user ? (
            <button
              onClick={() => nav("profile")}
              className={`hidden lg:flex items-center gap-2 px-2 py-1.5 rounded-full hover:bg-[#0a0a0a]/5 transition-colors ${focusRing}`}
              aria-label={`Signed in as ${displayName} — go to profile`}
            >
              <span className="w-7 h-7 rounded-full bg-[#4FC3F7] text-white flex items-center justify-center text-[12px] font-bold shrink-0">
                {displayName ? displayName[0].toUpperCase() : "?"}
              </span>
              <span className="text-[#0a0a0a] text-[14px] font-medium max-w-[120px] truncate">{displayName}</span>
            </button>
          ) : (
            <button
              onClick={onAuth}
              className={`hidden lg:block px-3 py-2 text-[#6b7280] hover:text-[#0a0a0a] rounded-lg transition-colors ${focusRing}`}
              style={{ fontSize: "14px", fontWeight: 500 }}
            >
              Log in
            </button>
          )}

          <button
            onClick={() => nav("submit")}
            className={`hidden lg:block px-5 py-2 rounded-lg border text-[#6b7280] hover:border-[#0a0a0a]/40 hover:text-[#0a0a0a] transition-all ${focusRing}`}
            style={{ fontSize: "14px", fontWeight: 500, borderColor: "rgba(10,10,10,0.15)" }}
          >
            Submit a prompt
          </button>

          <button
            onClick={() => nav("library")}
            className={`hidden lg:block px-5 py-2 rounded-lg bg-[#0a0a0a] text-white hover:bg-[#2a2a2a] transition-colors ${focusRing}`}
            style={{ fontSize: "14px", fontWeight: 600 }}
          >
            Get started for free
          </button>

          {/* Mobile hamburger */}
          <button
            ref={hamburgerRef}
            onClick={() => setOpen(v => !v)}
            className={`ml-1 lg:hidden p-2 text-[#6b7280] rounded-lg ${focusRing}`}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <>
          <div
            className="lg:hidden fixed inset-0 top-16 bg-[#0a0a0a]/30 z-40"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div ref={menuRef} id="mobile-nav-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation" className="lg:hidden absolute top-full left-0 right-0 bg-white border-t border-[#0a0a0a]/10 shadow-lg z-50">
            <div className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map(item => {
                const active = isActive(current, item.route);
                return (
                  <button
                    key={item.label}
                    onClick={() => nav(item.route)}
                    aria-current={active ? "page" : undefined}
                    className={`text-left py-2.5 transition-colors rounded ${focusRing}`}
                    style={{ fontSize: "15px", fontWeight: active ? 600 : 500, color: active ? "#0a0a0a" : "#6b7280" }}
                  >
                    {item.label}
                  </button>
                );
              })}
              {user?.isAdmin && ADMIN_LINKS.map(item => {
                const active = isActive(current, item.route);
                return (
                  <button
                    key={item.label}
                    onClick={() => nav(item.route)}
                    aria-current={active ? "page" : undefined}
                    className={`text-left py-2.5 transition-colors rounded ${focusRing}`}
                    style={{ fontSize: "15px", fontWeight: active ? 600 : 500, color: active ? "#0a0a0a" : "#6b7280" }}
                  >
                    {item.label}
                  </button>
                );
              })}
              <div className="h-px bg-[#0a0a0a]/10 my-2" />
              {user ? (
                <button onClick={() => nav("profile")} className={`text-left py-2.5 text-[#0a0a0a] rounded ${focusRing}`} style={{ fontSize: "15px", fontWeight: 500 }}>
                  {displayName} — Profile
                </button>
              ) : (
                <button onClick={() => { setOpen(false); onAuth(); }} className={`text-left py-2.5 text-[#6b7280] rounded ${focusRing}`} style={{ fontSize: "15px", fontWeight: 500 }}>
                  Log in
                </button>
              )}
              <button onClick={() => nav("submit")} className={`text-left py-2.5 text-[#6b7280] rounded ${focusRing}`} style={{ fontSize: "15px", fontWeight: 500 }}>
                Submit a prompt
              </button>
              <button onClick={() => nav("library")} className={`mt-1 w-full py-2.5 rounded-lg bg-[#0a0a0a] text-white text-center ${focusRing}`} style={{ fontSize: "14px", fontWeight: 600 }}>
                Get started for free
              </button>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
