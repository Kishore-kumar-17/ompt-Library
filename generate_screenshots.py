"""
Screenshot all built preview sites → frontend/public/previews/<slug>/thumb.jpg

Requirements:
    pip install playwright
    playwright install chromium

Usage:
    python generate_screenshots.py
    python generate_screenshots.py --only bw_01,saas_platform_01
    python generate_screenshots.py --force          # re-shoot even if thumb exists
"""
import os, asyncio, argparse, threading, time, sys
import http.server, socketserver
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8", errors="replace")

PREVIEWS_DIR = Path("D:/PL Backend/prompt-library-backend/frontend/public/previews")
PUBLIC_DIR   = Path("D:/PL Backend/prompt-library-backend/frontend/public")
PORT         = 8766
BASE_URL     = f"http://localhost:{PORT}"

# ── HTTP server serving frontend/public/ ──────────────────────────────────────

class SilentHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args): pass

def start_server():
    os.chdir(PUBLIC_DIR)
    server = socketserver.TCPServer(("localhost", PORT), SilentHandler)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    return server

# ── Screenshot one slug ────────────────────────────────────────────────────────

async def shoot(page, slug: str, force: bool) -> str:
    dest = PREVIEWS_DIR / slug / "thumb.jpg"
    if dest.exists() and not force:
        print(f"  SKIP  {slug}")
        return "skip"

    url = f"{BASE_URL}/previews/{slug}/index.html"
    try:
        await page.set_viewport_size({"width": 1280, "height": 900})
        await page.goto(url, wait_until="networkidle", timeout=20_000)
        await page.wait_for_timeout(600)          # let CSS transitions settle
        await page.screenshot(
            path=str(dest),
            type="jpeg",
            quality=88,
            full_page=False,                      # viewport only → consistent crop
            clip={"x": 0, "y": 0, "width": 1280, "height": 900},
        )
        print(f"  OK    {slug}")
        return "ok"
    except Exception as e:
        print(f"  FAIL  {slug} — {e}")
        return "fail"

# ── Main ──────────────────────────────────────────────────────────────────────

async def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--only",  help="Comma-separated slugs to process")
    parser.add_argument("--force", action="store_true", help="Re-shoot even if thumb.jpg exists")
    args = parser.parse_args()

    # Collect slugs from previews dir
    slugs = sorted(
        d.name for d in PREVIEWS_DIR.iterdir()
        if d.is_dir() and (d / "index.html").exists()
    )

    if args.only:
        only = set(args.only.split(","))
        slugs = [s for s in slugs if s in only]

    print(f"Slugs to process: {len(slugs)}  |  force={args.force}\n")
    if not slugs:
        print("Nothing to do.")
        return

    server = start_server()
    time.sleep(0.4)

    results = {"ok": 0, "skip": 0, "fail": 0, "fail_list": []}

    from playwright.async_api import async_playwright
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(args=["--disable-web-security"])
        context = await browser.new_context()
        page    = await context.new_page()

        for i, slug in enumerate(slugs, 1):
            status = await shoot(page, slug, args.force)
            results[status] += 1
            if status == "fail":
                results["fail_list"].append(slug)
            print(f"  [{i:03}/{len(slugs)}]", flush=True)

        await browser.close()

    server.shutdown()

    print(f"\n{'='*50}")
    print(f"OK: {results['ok']}  |  Skip: {results['skip']}  |  Fail: {results['fail']}")
    if results["fail_list"]:
        print("\nFailed slugs:")
        for s in results["fail_list"]:
            print(f"  {s}")

if __name__ == "__main__":
    asyncio.run(main())
