# 00 — Orchestrator
## Interactive 3D World Portfolio · portfolio_platform_01

---

## The Prompt

```text
You are a senior creative developer specialising in React Three Fiber,
WebGL, and interactive web experiences.

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
- Music MUST default to OFF — browser autoplay policy
- ZonePanel must close on: Escape key, click outside, ✕ button
- Invisible RigidBody walls must contain the car — no escape from world
- Accessible fallback routes (/about, /projects, /skills, /contact) required
- Camera lerp factor: 0.08 — do not change without explicit instruction
- Ask before changing physics parameters, zone positions, or audio setup
```

---

## Project Context

**Inspired by:** Bruno Simon's portfolio (bruno-simon.com)
**Concept:** The portfolio IS the world. No pages, no scroll. Visitor drives a red car through a sandy low-poly world to discover content zones. Reaching a zone triggers a glassmorphic UI panel with portfolio content.

**What makes this portfolio memorable:**
- The navigation metaphor (driving) replaces clicking/scrolling
- Content is geographically distributed — you go to the About area, the Projects area
- The playful physics and sound make it feel alive
- It shows the creator's technical ability before a single word is read

---

## Platform Variations

### Cursor
Use `@` file references. Execute tasks in strict sequence from 06_Tasks.md.

### Claude Code (CLI)
Place this as root `CLAUDE.md`. Reference other files by path.

### Codex
Paste orchestrator + all 7 files in context before coding.

### Gemini
Upload all files. Summarise PRD + Architecture before writing any code.

---

## When To Stop And Ask

Stop before:
- Changing zone positions (affects content discovery flow)
- Changing physics parameters (gravity, car speed, proximity threshold)
- Adding new npm dependencies
- Modifying the audio architecture
- Changing the accessible fallback route structure
