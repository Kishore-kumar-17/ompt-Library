"""
Inject a navigation-guard script into every preview index.html.

The guard prevents Next.js client-side router from navigating outside
the preview's own directory (e.g. to / which would load our main app).
It also blocks anchor clicks that point to absolute paths outside the
preview base directory.

Run once:
    python fix_preview_navigation.py

Re-running is safe — it skips files that already have the guard.
"""

import os
from pathlib import Path

PREVIEWS_DIR = Path("D:/PL Backend/prompt-library-backend/frontend/public/previews")

GUARD_MARKER = "data-nav-guard"

GUARD_SCRIPT = (
    '<script ' + GUARD_MARKER + '="1">'
    '!function(){'
    # base = the preview directory, e.g. /previews/business_01/
    'var b=location.pathname.replace(/\\/[^\\/]*$/,"/");'
    # wrap history methods
    'var gp=history.pushState.bind(history),gr=history.replaceState.bind(history);'
    'function ok(u){if(!u)return 1;try{return new URL(u,location.href).pathname.indexOf(b)===0;}catch(e){return 1;}}'
    'history.pushState=function(s,t,u){if(ok(u))gp(s,t,u);};'
    'history.replaceState=function(s,t,u){if(ok(u))gr(s,t,u);};'
    # intercept anchor clicks
    'document.addEventListener("click",function(e){'
    'var a=e.target.closest("a[href]");'
    'if(a){'
    'var h=a.getAttribute("href");'
    'if(h&&h[0]!="#"&&h.indexOf("javascript")!==0){'
    'try{if(new URL(h,location.href).pathname.indexOf(b)!==0)e.preventDefault();}catch(x){}'
    '}'
    '}'
    '},true);'
    '}();'
    '</script>'
)


def patch(html_path: Path) -> str:
    text = html_path.read_text(encoding="utf-8", errors="replace")

    # Skip if already patched
    if GUARD_MARKER in text:
        return "skip"

    # Inject right before </head> — works for all Next.js exports
    if "</head>" in text:
        text = text.replace("</head>", GUARD_SCRIPT + "</head>", 1)
    elif "<body" in text:
        # fallback: inject before <body>
        idx = text.index("<body")
        text = text[:idx] + GUARD_SCRIPT + text[idx:]
    else:
        return "fail"

    html_path.write_text(text, encoding="utf-8")
    return "ok"


def main():
    slugs = sorted(d for d in PREVIEWS_DIR.iterdir() if d.is_dir())
    ok = skip = fail = 0

    for slug_dir in slugs:
        html = slug_dir / "index.html"
        if not html.exists():
            print(f"  MISSING  {slug_dir.name}")
            fail += 1
            continue

        result = patch(html)
        print(f"  {result.upper():<5}  {slug_dir.name}")
        if result == "ok":
            ok += 1
        elif result == "skip":
            skip += 1
        else:
            fail += 1

    print(f"\nDone — OK: {ok}  Skip: {skip}  Fail: {fail}")


if __name__ == "__main__":
    main()
