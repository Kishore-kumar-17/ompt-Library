import { useEffect, useState } from "react";
import { Toaster } from "sonner";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";
import { AuthModal } from "./components/AuthModal";
import { CommandPalette } from "./components/CommandPalette";
import { Home } from "./components/pages/Home";
import { Library, LibraryLanding } from "./components/pages/Library";
import { Detail } from "./components/pages/Detail";
import { Builder } from "./components/pages/Builder";
import { Improver } from "./components/pages/Improver";
import { Compare } from "./components/pages/Compare";
import { Dashboard } from "./components/pages/Dashboard";
import { Profile } from "./components/pages/Profile";
import { Submit } from "./components/pages/Submit";
import { AdminImport } from "./components/pages/AdminImport";
import { AdminImageReview } from "./components/pages/AdminImageReview";
import { WebsiteDetail } from "./components/pages/WebsiteDetail";
import { Guide } from "./components/pages/Guide";
import { Pricing } from "./components/pages/Pricing";

export default function App() {
  const [route, setRouteRaw] = useState("home");
  const [authOpen, setAuthOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);

  const setRoute = (r: string) => {
    setRouteRaw(r);
    queueMicrotask(() => window.scrollTo({ top: 0, behavior: "smooth" }));
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
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
  const detailId       = detailParts ? detailParts[1] : null;
  const detailPlatform = detailParts?.[2] ?? null;
  const libraryFamily  = route.startsWith("library:") ? (route.split(":")[1] as any) : null;
  const websiteSlug    = route.startsWith("website-detail:") ? route.split(":")[1] : null;
  const guideSection   = route.startsWith("guide:") ? route.split(":")[1] : null;

  return (
    <div className="min-h-screen bg-white text-[#094067]">
      <Nav current={current} onNavigate={setRoute} onAuth={() => setAuthOpen(true)} />
      <main>
        {route === "home"      && <Home go={setRoute} />}
        {route === "library"   && <LibraryLanding go={setRoute} />}
        {libraryFamily         && <Library go={setRoute} family={libraryFamily} />}
        {detailId              && <Detail key={detailId} id={detailId} defaultPlatform={detailPlatform} go={setRoute} />}
        {route === "builder"   && <Builder go={setRoute} />}
        {route === "improver"  && <Improver go={setRoute} />}
        {route === "compare"   && <Compare go={setRoute} />}
        {route === "dashboard" && <Dashboard />}
        {route === "profile"   && <Profile go={setRoute} />}
        {route === "submit"    && <Submit />}
        {route === "admin"     && <AdminImport />}
        {route === "image-review" && <AdminImageReview />}
        {websiteSlug && <WebsiteDetail key={websiteSlug} slug={websiteSlug} go={setRoute} />}
        {(route === "guide" || guideSection) && <Guide go={setRoute} initialSection={guideSection ?? undefined} />}
        {route === "pricing"   && <Pricing go={setRoute} onAuth={() => setAuthOpen(true)} />}
      </main>
      <Footer go={setRoute} />
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} go={setRoute} />
      <Toaster
        position="bottom-right"
        richColors
        toastOptions={{
          style: {
            background: "#ffffff",
            color: "#094067",
            border: "2px solid #094067",
            boxShadow: "4px 4px 0 0 #094067",
          },
        }}
      />
    </div>
  );
}