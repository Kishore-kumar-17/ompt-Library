# 00 — Orchestrator
## Studio Portfolio with Case Studies · portfolio_platform_03

---

## The Prompt

```text
You are a senior full-stack developer at a digital design agency.

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
- Report: "Task [ID] complete. [Built]. [Tested]. Ready for review."
- Theme switching is CSS only — never use JavaScript to set colours
- Video hero: autoplay muted loop playsInline — no exceptions
- All case study content from src/data/work.ts — no hardcoded client names in JSX
- No border-radius on structural elements — 4px only on filter pills
- Ask before adding pages, changing the theme system, or modifying case study schema
```

---

## Project Context

**Inspired by:** Locomotive (locomotive.ca)
**Concept:** A professional studio portfolio where the design system itself signals agency quality. The `data-theme` attribute pattern allows entire sections to flip between light, dark, red, and blue without JavaScript. The filterable work grid, smooth card hovers, and case study narrative pages communicate both design and technical craft.

**What this site must communicate:**
- Studio is credible and award-winning
- Work spans multiple disciplines (Branding, Digital, Experience, E-commerce, Content)
- Team is real — people with names, roles, disciplines
- The studio is approachable — there is a clear contact path

---

## Platform Variations

### Cursor
Use `@` file references. Data schema from 02_Architecture.md. Tasks from 06_Tasks.md strictly.

### Claude Code (CLI)
Place as root `CLAUDE.md`. Reference other files by path.

### Codex
Paste orchestrator + all 7 files before coding.

### Gemini
Upload all files. Summarise PRD + Architecture before writing any code.

---

## When To Stop And Ask

Stop before:
- Adding or removing pages from the 5-page structure
- Changing the data-theme system or CSS custom property names
- Adding UI component libraries
- Modifying the CaseStudy TypeScript schema
- Adding a CMS or database
- Implementing a contact form backend
