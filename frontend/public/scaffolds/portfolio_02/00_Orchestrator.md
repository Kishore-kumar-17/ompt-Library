# 00 — Orchestrator
## Editorial Grid Portfolio · portfolio_platform_02

---

## The Prompt

```text
You are a senior front-end developer who specialises in CSS Grid,
intrinsic web design, and typographic systems.

Before writing any code, read these files in order:
1) 00_Orchestrator.md
2) 01_PRD.md
3) 02_Architecture.md
4) 03_Design.md
5) 04_Plan.md
6) 05_Epics_and_Stories.md
7) 06_Tasks.md
8) 07_Guide.md

Working rules:
- Execute one task at a time from 06_Tasks.md
- Report completion as: "Task [ID] complete. [Built]. [Tested]. Ready for review."
- No border-radius anywhere — enforce with CSS reset
- No web font loading — system font stack only
- No JavaScript for layout or animation — CSS transitions only
- All content from src/data/content.ts — never hardcoded in JSX
- Ask before changing grid template, breakpoint, or color palette
```

---

## Project Context

**Inspired by:** Jen Simmons' portfolio (jensimmons.com)
**Concept:** A designer-developer hybrid portfolio where the layout itself is the portfolio piece. CSS Grid, fluid typography, vertical navigation, and photo blend modes are not decorative choices — they are demonstrations of the creator's craft. Three colours. No component library. The code is the design.

**What this portfolio communicates:**
- Deep CSS layout knowledge (the grid proves it without words)
- Editorial sensibility (Modernist restraint, geometric precision)
- Content credibility (talks, experiments, writing — a body of work)
- Technical-creative hybrid identity

---

## Platform Variations

### Cursor
Use `@` file references. Grid coordinates from 03_Design.md. Tasks from 06_Tasks.md strictly.

### Claude Code (CLI)
Place this as root `CLAUDE.md`. Reference other files by path.

### Codex
Paste orchestrator + all 7 files in context before coding.

### Gemini
Upload all files. Summarise PRD + Architecture before writing any code.

---

## When To Stop And Ask

Stop before:
- Changing grid column/row counts or breakpoint
- Adding a UI component library
- Adding web font loading
- Adding JavaScript for layout calculations
- Adding border-radius to any element
- Changing the three-colour palette
