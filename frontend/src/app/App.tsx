import { useEffect, useState, useRef, useCallback, lazy, Suspense } from "react";
import { Toaster } from "sonner";
import LoadingScreen from "./components/LoadingScreen";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { AuthModal } from "./components/AuthModal";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Home } from "./components/pages/Home";
import { authStore } from "./lib/api";

const CommandPalette   = lazy(() => import("./components/CommandPalette").then(m => ({ default: m.CommandPalette })));
const Library          = lazy(() => import("./components/pages/Library").then(m => ({ default: m.Library })));
const LibraryLanding   = lazy(() => import("./components/pages/Library").then(m => ({ default: m.LibraryLanding })));
const Detail           = lazy(() => import("./components/pages/Detail").then(m => ({ default: m.Detail })));
const Builder          = lazy(() => import("./components/pages/Builder").then(m => ({ default: m.Builder })));
const Improver         = lazy(() => import("./components/pages/Improver").then(m => ({ default: m.Improver })));
const Compare          = lazy(() => import("./components/pages/Compare").then(m => ({ default: m.Compare })));
const Dashboard        = lazy(() => import("./components/pages/Dashboard").then(m => ({ default: m.Dashboard })));
const Profile          = lazy(() => import("./components/pages/Profile").then(m => ({ default: m.Profile })));
const Submit           = lazy(() => import("./components/pages/Submit").then(m => ({ default: m.Submit })));
const AdminImport      = lazy(() => import("./components/pages/AdminImport").then(m => ({ default: m.AdminImport })));
const AdminImageReview = lazy(() => import("./components/pages/AdminImageReview").then(m => ({ default: m.AdminImageReview })));
const WebsiteDetail    = lazy(() => import("./components/pages/WebsiteDetail").then(m => ({ default: m.WebsiteDetail })));
const Guide            = lazy(() => import("./components/pages/Guide").then(m => ({ default: m.Guide })));
const Pricing          = lazy(() => import("./components/pages/Pricing").then(m => ({ default: m.Pricing })));

function PageFallback() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-6 h-6 rounded-full border-2 border-[#0a0a0a]/10 border-t-[#4FC3F7] animate-spin" />
    </div>
  );
}

function NotFound({ go }: { go: (p: string) => void }) {
  return (
    <div className="min-h-[50vh] flex items-center justify-center px-6 py-24 text-center">
      <div>
        <h1 className="text-[#0a0a0a] mb-3" style={{ fontSize: 26, fontWeight: 700 }}>Page not found</h1>
        <p className="text-[#6b7280] mb-6" style={{ fontSize: 14 }}>That link doesn't lead anywhere. Head back to the library to keep browsing.</p>
        <button
          onClick={() => go("library")}
          className="h-10 px-5 rounded-full bg-[#4FC3F7] text-[#0a0a0a] font-bold hover:bg-[#4FC3F7]/90 transition-colors"
        >
          Go to Library
        </button>
      </div>
    </div>
  );
}

function AdminOnly({ children }: { children: React.ReactNode }) {
  const isAdmin = authStore.getUser()?.isAdmin === true;
  if (!isAdmin) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center px-6 py-24 text-center">
        <p className="text-[#6b7280]" style={{ fontSize: 14 }}>This page is only available to admins.</p>
      </div>
    );
  }
  return <>{children}</>;
}

function safeDecodeURIComponent(s: string): string | null {
  try {
    return decodeURIComponent(s);
  } catch {
    return null;
  }
}

export default function App() {
  const [loading, setLoading] = useState(true);
  const [route, setRouteRaw] = useState("home");
  const [authOpen, setAuthOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [cmdEverOpened, setCmdEverOpened] = useState(false);
  const history = useRef<string[]>(["home"]);

  const setRoute = (r: string) => {
    if (r !== route) {
      history.current.push(r);
    }
    setRouteRaw(r);
    queueMicrotask(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  const goBack = useCallback(() => {
    if (history.current.length > 1) {
      history.current.pop(); // remove current
      const prev = history.current[history.current.length - 1];
      setRouteRaw(prev);
      queueMicrotask(() => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  }, []);

  const canGoBack = history.current.length > 1 && route !== "home";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdEverOpened(true);
        setCmdOpen((v) => !v);
      }
      if (e.key === "Escape") setCmdOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const current = route.startsWith("detail:") || route.startsWith("library:") || route.startsWith("website-detail:") ? "library" : route.startsWith("guide:") ? "guide" : route;
  // route format: "detail:42" or "detail:42:midjourney"
  const detailParts    = route.startsWith("detail:") ? route.split(":") : null;
  const detailId       = detailParts?.[1] ? detailParts[1] : null; // "detail:" (empty id) falls through to Not Found, not a blank page
  const detailPlatform = detailParts?.[2] ?? null;
  const libraryParts   = route.startsWith("library:") ? route.split(":") : null;
  const libraryFamily  = libraryParts ? (libraryParts[1] as any) : null;
  const libraryInitialCategory = libraryParts?.[2] ? safeDecodeURIComponent(libraryParts[2]) : null;
  const websiteSlug    = route.startsWith("website-detail:") ? route.split(":")[1] : null;
  const guideSection   = route.startsWith("guide:") ? route.split(":")[1] : null;

  const matchedRoute =
    route === "home" || route === "library" || !!libraryFamily || !!detailId ||
    route === "builder" || route === "improver" || route === "compare" ||
    route === "dashboard" || route === "profile" || route === "submit" ||
    route === "admin" || route === "image-review" || !!websiteSlug ||
    route === "guide" || !!guideSection || route === "pricing";

  return (
    <div className="min-h-screen bg-white text-[#0a0a0a]">
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <Nav current={current} onNavigate={setRoute} onAuth={() => setAuthOpen(true)} onBack={goBack} canGoBack={canGoBack} />
      <main>
        <ErrorBoundary onRecover={() => setRoute("home")}>
          {route === "home" && <Home go={setRoute} />}
          <Suspense fallback={<PageFallback />}>
            {route === "library"   && <LibraryLanding go={setRoute} />}
            {libraryFamily         && <Library key={route} go={setRoute} family={libraryFamily} initialCategory={libraryInitialCategory} />}
            {detailId              && <Detail key={detailId} id={detailId} defaultPlatform={detailPlatform} go={setRoute} />}
            {route === "builder"   && <Builder go={setRoute} />}
            {route === "improver"  && <Improver go={setRoute} />}
            {route === "compare"   && <Compare go={setRoute} />}
            {route === "dashboard" && <Dashboard go={setRoute} />}
            {route === "profile"   && <Profile go={setRoute} />}
            {route === "submit"    && <Submit go={setRoute} onAuth={() => setAuthOpen(true)} />}
            {route === "admin"     && <AdminOnly><AdminImport go={setRoute} /></AdminOnly>}
            {route === "image-review" && <AdminOnly><AdminImageReview /></AdminOnly>}
            {websiteSlug && <WebsiteDetail key={websiteSlug} slug={websiteSlug} go={setRoute} />}
            {(route === "guide" || guideSection) && <Guide key={guideSection ?? "guide"} go={setRoute} initialSection={guideSection ?? undefined} />}
            {route === "pricing"   && <Pricing go={setRoute} onAuth={() => setAuthOpen(true)} />}
            {!matchedRoute && <NotFound go={setRoute} />}
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer go={setRoute} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      {cmdEverOpened && (
        <Suspense fallback={null}>
          <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} go={setRoute} />
        </Suspense>
      )}
      <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#0a0a0a",
            border: "2px solid #0a0a0a",
            boxShadow: "4px 4px 0 0 #0a0a0a",
          },
        }}
      />
    </div>
  );
}