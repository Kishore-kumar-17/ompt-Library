# Format Reference

This folder documents the two output formats used in the PL Website prompt library.

| Format | Use Case | Output |
|--------|----------|--------|
| [Scaffold Format](scaffold-format.md) | Full app builds via AI coding agents (Cursor, Claude Code, Codex, Gemini) | 8 `.md` files in a directory |
| [Standalone Prompt Format](standalone-prompt-format.md) | Quick UI generation on platforms (Lovable, Bolt, v0, etc.) | 1 `.md` file with 8 platform versions |

## When to use which

- **Scaffold** = building a complete, production-grade application (e-commerce store, SaaS platform, portfolio site)
- **Standalone Prompt** = generating a single page or component with specific design constraints
