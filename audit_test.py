import os, re

base = "D:/PL Backend/prompt-library-backend/Website Previews/project_store"

def clean(s):
    return (s.replace("\ufffd", "-").replace("\u2014", "-").replace("\u2019", "'")
             .replace("\u201c", "'").replace("\u201d", "'")
             .replace("`", "'").replace("\\", "").replace('"', '\\"').replace("\n", " ").strip())

def parse_h2_subtitle(h2_raw):
    m = re.match(r"(?:Inspired by|Reference:|Inspiration:?)\s+(.+?)(?:\s+[·\-]\s+\S+\.\S+)?$", h2_raw, re.I)
    if m:
        return m.group(1).strip()
    parts = re.split(r"\s+·\s+", h2_raw)
    return parts[0].strip()

def extract_meta(content, filename):
    fm_section = ""
    fm_block = re.match(r"^---\s*\n([\s\S]*?)\n---", content)
    if fm_block:
        fm_section = fm_block.group(1)

    fm_title = re.search(r"^title:\s*(.+)", fm_section, re.M) if fm_section else None
    fm_sub   = re.search(r"^sub_type:\s*(.+)", fm_section, re.M) if fm_section else None
    if fm_title:
        raw   = clean(fm_title.group(1))
        parts = raw.split(" - ")
        name  = parts[0].strip()
        style = parts[1].strip() if len(parts) > 1 else name
        sub   = clean(fm_sub.group(1)) if fm_sub else style
        return name, style, sub

    h1 = re.search(r"^#\s+(.+)", content, re.M)
    h2 = re.search(r"^##\s+(.+)", content, re.M)
    if h1:
        raw = clean(h1.group(1))
        raw = re.sub(r"^Portfolio(?:\s+Prompt)?\s+\d+\s*-\s*", "", raw)
        parts = raw.split(" - ")
        name  = parts[0].strip()
        style = parts[1].strip() if len(parts) > 1 else name

        if re.match(r"^[a-z][a-z0-9_]*$", name):
            if style != name:
                name = style
            elif h2:
                name = parse_h2_subtitle(clean(h2.group(1)))
                style = name

        sub2 = parse_h2_subtitle(clean(h2.group(1))) if h2 else style
        return name, style, sub2

    return filename.replace("_", " ").title(), "Website Design", "Website Design"

# Check all files and report
all_entries = []
problem_entries = []

for root, dirs, filenames in os.walk(base):
    dirs[:] = [d for d in dirs if d not in {".git", ".next", "node_modules", "project"}]
    for f in filenames:
        if not f.endswith(".md") or re.match(r"0[0-7]_", f) or f.startswith("README"):
            continue
        slug = f.replace(".md", "")
        fpath = os.path.join(root, f)
        with open(fpath, encoding="utf-8-sig", errors="replace") as fp:
            content = fp.read()

        name, style, sub = extract_meta(content, slug)
        h1 = re.search(r"^#\s+(.+)", content, re.M)
        h1_text = h1.group(1)[:80] if h1 else "NONE"

        all_entries.append((slug, name, style, sub))

        issues = []
        if name in ("string", "Website Design") or name == slug:
            issues.append(f"BAD_NAME: {name[:50]!r}")
        if "string" in name.lower() and ";" in name:
            issues.append("TYPE_DEF_LEAK")
        if len(name) > 80:
            issues.append("NAME_TOO_LONG")

        if issues:
            problem_entries.append((slug, name, style, sub, h1_text, issues))

all_entries.sort(key=lambda x: x[0])

print(f"Total entries: {len(all_entries)}")
print(f"Problems found: {len(problem_entries)}")
print()

if problem_entries:
    print("=== PROBLEMS ===")
    for slug, name, style, sub, h1, issues in sorted(problem_entries):
        print(f"SLUG: {slug}")
        print(f"  H1:    {h1!r}")
        print(f"  name:  {name!r}")
        print(f"  sub:   {sub!r}")
        print(f"  FLAGS: {issues}")
        print()
else:
    print("=== ALL OK - showing all entries ===")

print("=== ALL ENTRIES ===")
for slug, name, style, sub in all_entries:
    print(f"  {slug:<30} | {name[:45]:<45} | {sub[:40]}")
