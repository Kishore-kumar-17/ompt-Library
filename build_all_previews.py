"""
Parallel build: npm install + next build for all scaffold projects
Copies static out/ to frontend/public/previews/<slug>/

Usage: python build_all_previews.py [--workers N]
"""
import os, re, subprocess, shutil, sys, time, argparse
from concurrent.futures import ThreadPoolExecutor, as_completed

sys.stdout.reconfigure(encoding="utf-8", errors="replace")
sys.stderr.reconfigure(encoding="utf-8", errors="replace")

BASE     = "D:/PL Backend/prompt-library-backend/Website Previews/project_store"
OUT_DIR  = "D:/PL Backend/prompt-library-backend/frontend/public/previews"
WORKERS  = 4

os.makedirs(OUT_DIR, exist_ok=True)

parser = argparse.ArgumentParser()
parser.add_argument("--workers", type=int, default=WORKERS)
parser.add_argument("--only", help="Comma-separated list of slugs to build")
args = parser.parse_args()

# Collect projects
projects = []
for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in {"node_modules", ".git"}]
    if "package.json" in files and "src" in dirs:
        scaffold_dir = os.path.dirname(root)
        md_files = [f for f in os.listdir(scaffold_dir)
                    if f.endswith(".md") and not re.match(r"0[0-7]_", f) and not f.startswith("README")]
        if md_files:
            slug = md_files[0].replace(".md", "")
            projects.append((slug, root))

projects.sort()

if args.only:
    only_set = set(args.only.split(","))
    projects = [(s, p) for s, p in projects if s in only_set]

total = len(projects)
print(f"Projects: {total} | Workers: {args.workers}\n")

results = {"ok": [], "skip": [], "fail": []}
lock_print = __import__("threading").Lock()

def log(msg):
    with lock_print:
        print(msg, flush=True)

def build_project(slug, project_dir):
    dest = os.path.join(OUT_DIR, slug)

    if os.path.isdir(dest) and os.listdir(dest):
        log(f"  SKIP  {slug}")
        return "skip", slug

    t0 = time.time()
    log(f"  START {slug}")

    try:
        # Step 1: npm install if needed
        if not os.path.isdir(os.path.join(project_dir, "node_modules")):
            r = subprocess.run(
                "npm install --prefer-offline --no-audit --no-fund --legacy-peer-deps",
                cwd=project_dir, shell=True,
                capture_output=True, text=True,
                encoding="utf-8", errors="replace", timeout=300,
            )
            if r.returncode != 0:
                log(f"  FAIL  {slug} — npm install failed\n{r.stderr[-200:]}")
                return "fail", slug

        # Step 2: next build
        r = subprocess.run(
            "npm run build",
            cwd=project_dir, shell=True,
            capture_output=True, text=True,
            encoding="utf-8", errors="replace", timeout=600,
        )
        if r.returncode != 0:
            log(f"  FAIL  {slug} — build failed\n{r.stderr[-300:] if r.stderr else ''}")
            return "fail", slug

        # Step 3: copy out/ to previews/<slug>/
        out_folder = os.path.join(project_dir, "out")
        if not os.path.isdir(out_folder):
            log(f"  FAIL  {slug} — no out/ folder")
            return "fail", slug

        if os.path.isdir(dest):
            shutil.rmtree(dest)
        shutil.copytree(out_folder, dest)

        elapsed = time.time() - t0
        log(f"  OK    {slug} ({elapsed:.0f}s)")
        return "ok", slug

    except subprocess.TimeoutExpired:
        log(f"  FAIL  {slug} — timeout")
        return "fail", slug
    except Exception as e:
        log(f"  FAIL  {slug} — {e}")
        return "fail", slug

t_start = time.time()
with ThreadPoolExecutor(max_workers=args.workers) as pool:
    futures = {pool.submit(build_project, slug, pdir): slug for slug, pdir in projects}
    for future in as_completed(futures):
        status, slug = future.result()
        results[status].append(slug)
        done = sum(len(v) for v in results.values())
        with lock_print:
            print(f"  [{done:03}/{total}] {status.upper()} {slug}", flush=True)

elapsed = time.time() - t_start
print(f"\n{'='*50}")
print(f"Done in {elapsed:.0f}s | OK: {len(results['ok'])} | Skip: {len(results['skip'])} | Fail: {len(results['fail'])}")
if results["fail"]:
    print("\nFailed:")
    for s in sorted(results["fail"]):
        print(f"  {s}")
