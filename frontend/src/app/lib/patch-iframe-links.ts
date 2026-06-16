/**
 * Patches navigation inside a same-origin iframe so links stay within
 * the preview directory instead of navigating to the parent app.
 *
 * Strategy (defense in depth):
 *   1. Rewrite all <a href> attributes in the DOM to point inside /previews/
 *   2. MutationObserver re-rewrites anchors after Next.js hydration/renders
 *   3. Capture-phase click listener with stopImmediatePropagation (beats React)
 *   4. Monkey-patch pushState/replaceState to rewrite URLs
 *   5. Kill Next.js router after hydration (delayed)
 *   6. Periodic anchor sweep to catch late-rendered links
 */
export function patchIframeLinks(iframe: HTMLIFrameElement, slug: string) {
  try {
    const win = iframe.contentWindow;
    const doc = iframe.contentDocument;
    if (!win || !doc) return;

    const basePath = `/previews/${slug}`;

    // Already patched — skip
    if ((doc as any).__patchedPreviewLinks) return;
    (doc as any).__patchedPreviewLinks = true;

    /** Rewrite an absolute path to the preview directory. Returns null if no rewrite needed. */
    function rewritePath(href: string): string | null {
      if (!href || !href.startsWith("/") || href.startsWith("//")) return null;
      if (href.startsWith(basePath)) return null;

      let pathname = href;
      let search = "";
      let hash = "";

      const hashIdx = pathname.indexOf("#");
      if (hashIdx !== -1) { hash = pathname.slice(hashIdx); pathname = pathname.slice(0, hashIdx); }
      const queryIdx = pathname.indexOf("?");
      if (queryIdx !== -1) { search = pathname.slice(queryIdx); pathname = pathname.slice(0, queryIdx); }

      if (pathname === "/" || pathname === "") {
        return `${basePath}/index.html${search}${hash}`;
      }

      const cleanPath = pathname.replace(/\/$/, "");
      return `${basePath}${cleanPath}.html${search}${hash}`;
    }

    /** Rewrite a full URL string or URL object */
    function rewriteUrl(url: string | URL | null | undefined): string | null {
      if (!url) return null;
      let parsed: URL;
      try {
        parsed = typeof url === "string" ? new URL(url, win!.location.origin) : url;
      } catch { return null; }

      if (parsed.origin !== win!.location.origin) return null;
      if (parsed.pathname.startsWith(basePath)) return null;

      const rewritten = rewritePath(parsed.pathname + parsed.search + parsed.hash);
      if (!rewritten) return null;
      return win!.location.origin + rewritten;
    }

    // ── 1. Rewrite all anchor hrefs in the DOM ─────────────────────────
    function rewriteAnchors() {
      doc.querySelectorAll("a[href]").forEach((a) => {
        const href = a.getAttribute("href");
        if (!href) return;
        const rewritten = rewritePath(href);
        if (rewritten) a.setAttribute("href", rewritten);
      });
    }

    // Run immediately
    rewriteAnchors();

    // ── 2. MutationObserver — re-rewrite after DOM changes ─────────────
    let rewriteTimer: ReturnType<typeof setTimeout> | null = null;
    const observer = new MutationObserver(() => {
      // Debounce to avoid excessive rewrites during hydration
      if (rewriteTimer) clearTimeout(rewriteTimer);
      rewriteTimer = setTimeout(rewriteAnchors, 50);
    });
    if (doc.body) {
      observer.observe(doc.body, { childList: true, subtree: true, attributes: true, attributeFilter: ["href"] });
    }

    // ── 3. Capture-phase click listener (fires before React) ───────────
    doc.addEventListener(
      "click",
      (e) => {
        const anchor = (e.target as Element).closest?.("a");
        if (!anchor) return;

        const href = anchor.getAttribute("href");
        if (!href) return;

        // Skip external, protocol-relative, javascript:, mailto:, tel:
        if (href.startsWith("//") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) return;

        // Hash-only on current page — scroll
        if (href === "#" || (href.startsWith("#") && !href.startsWith("#/"))) {
          e.preventDefault();
          e.stopImmediatePropagation();
          const el = doc.querySelector(href);
          if (el) el.scrollIntoView({ behavior: "smooth" });
          return;
        }

        // Already rewritten — let it through
        if (href.startsWith(basePath)) return;

        // Absolute path starting with / — rewrite and navigate
        if (href.startsWith("/")) {
          e.preventDefault();
          e.stopImmediatePropagation();

          if (href === "/" || href.startsWith("/#")) {
            const hashPart = href.startsWith("/#") ? href.slice(1) : "";
            if (hashPart) {
              const el = doc.querySelector(hashPart);
              if (el) { el.scrollIntoView({ behavior: "smooth" }); return; }
            }
            win!.location.replace(`${basePath}/index.html`);
            return;
          }

          const rewritten = rewritePath(href);
          if (rewritten) {
            win!.location.replace(rewritten);
          }
          return;
        }

        // Relative path (no leading /) — these should be fine with current base
      },
      true // capture phase — fires before bubble and before React
    );

    // ── 4. Monkey-patch pushState / replaceState ───────────────────────
    const origPush = win.history.pushState.bind(win.history);
    const origReplace = win.history.replaceState.bind(win.history);

    win.history.pushState = function (data: any, unused: string, url?: string | URL | null) {
      const rewritten = rewriteUrl(url);
      return origPush(data, unused, rewritten ?? url);
    };

    win.history.replaceState = function (data: any, unused: string, url?: string | URL | null) {
      const rewritten = rewriteUrl(url);
      return origReplace(data, unused, rewritten ?? url);
    };

    // ── 5. Kill Next.js router (delayed to catch post-hydration) ───────
    function killNextRouter() {
      try {
        if ((win as any).next?.router) {
          const router = (win as any).next.router;
          router.push = (url: string) => {
            const rewritten = rewritePath(url);
            if (rewritten) win!.location.replace(rewritten);
          };
          router.replace = (url: string) => {
            const rewritten = rewritePath(url);
            if (rewritten) win!.location.replace(rewritten);
          };
          router.prefetch = () => Promise.resolve();
        }
        // Also kill Next.js App Router
        if ((win as any).__next_router_push) {
          (win as any).__next_router_push = (url: string) => {
            const rewritten = rewritePath(url);
            if (rewritten) win!.location.replace(rewritten);
          };
        }
      } catch { /* ignore */ }
    }

    // Run immediately and again after hydration
    killNextRouter();
    setTimeout(killNextRouter, 500);
    setTimeout(killNextRouter, 1500);
    setTimeout(killNextRouter, 3000);

    // ── 6. Periodic anchor sweep (catches lazy-loaded content) ─────────
    let sweepCount = 0;
    const sweepInterval = setInterval(() => {
      rewriteAnchors();
      sweepCount++;
      if (sweepCount > 10) clearInterval(sweepInterval); // stop after ~5s
    }, 500);

  } catch {
    // Cross-origin or security error — silently ignore
  }
}

/**
 * Call from the parent's onLoad handler to detect if the iframe
 * navigated outside the preview directory and force it back.
 */
export function guardIframeNavigation(iframe: HTMLIFrameElement, slug: string): boolean {
  try {
    const iframeUrl = iframe.contentWindow?.location.href;
    if (!iframeUrl) return false;

    const url = new URL(iframeUrl);
    // If the iframe is NOT in the previews directory, it escaped
    if (!url.pathname.startsWith(`/previews/${slug}`)) {
      iframe.src = `/previews/${slug}/index.html`;
      return true; // escaped — forced back
    }
  } catch {
    // Cross-origin error — ignore
  }
  return false;
}
