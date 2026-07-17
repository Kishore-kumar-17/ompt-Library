// ─── RAG Document Loader ──────────────────────────────────────────────────────
// Reads the scraped platform documentation from the RAG folder.
// Cleans navigation noise (link lists, footers, menus) to extract useful text.
// Used by the /api/builder/docs endpoint to serve platform knowledge to the UI.

import { readFileSync, existsSync, readdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
// Platform subfolders (ChatGPT/, Firefly/, ...) live directly under this
// directory — there is no nested "RAG" subfolder. The old `join(__dirname,
// "RAG")` path never existed, so every function below silently returned []
// in every environment.
const RAG_DIR = __dirname

// Lines to strip (navigation/UI noise from scraped markdown)
const NOISE_PATTERNS = [
  /^\s*\*\s*\[.+\]\(https?:\/\/.+\)\s*$/,   // markdown link list items
  /^\s*\*\s*$/,                                // bare bullet points
  /^\s*#+\s*$/,                                // empty headers
  /https?:\/\/[^\s)]+/g,                       // URLs (inline, stripped not removed)
  /^\s*\[.*\]\(.*\)\s*$/,                      // standalone link lines
  /Copyright.*\d{4}/i,
  /All rights reserved/i,
  /Language Navigation/,
  /Was this page helpful/,
  /Locale Modalv2/,
  /Choose a region/,
  /Selecting a region/,
]

const MIN_CONTENT_LINE_LENGTH = 20  // skip very short lines (nav items)

function isNavNoise(line: string): boolean {
  if (line.trim().length < MIN_CONTENT_LINE_LENGTH) {
    // Short lines are usually nav bullets — keep headers and bullets with real text
    if (/^#+\s+\w/.test(line)) return false  // real header
    if (/^\d+\./.test(line)) return false    // numbered list
    return true
  }
  for (const pattern of NOISE_PATTERNS) {
    if (typeof pattern === "string") {
      if (line.includes(pattern)) return true
    } else if (pattern.test && pattern.test(line)) {
      return true
    }
  }
  return false
}

function cleanMarkdown(raw: string): string {
  const lines = raw.split("\n")
  const cleaned: string[] = []
  let blankCount = 0

  for (const line of lines) {
    if (isNavNoise(line)) continue

    if (line.trim() === "") {
      blankCount++
      if (blankCount <= 1) cleaned.push("")
    } else {
      blankCount = 0
      cleaned.push(line)
    }
  }

  return cleaned.join("\n").trim()
}

export interface RAGDocument {
  platform: string
  file: string
  content: string
  charCount: number
}

export function loadRAGDocuments(platform?: string): RAGDocument[] {
  if (!existsSync(RAG_DIR)) return []

  const platforms = platform
    ? [platform]
    : readdirSync(RAG_DIR, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name)

  const docs: RAGDocument[] = []

  for (const pl of platforms) {
    const plDir = join(RAG_DIR, pl)
    if (!existsSync(plDir)) continue

    const files = readdirSync(plDir).filter(f => f.endsWith(".md"))
    for (const file of files) {
      const raw = readFileSync(join(plDir, file), "utf-8")
      const content = cleanMarkdown(raw)
      docs.push({
        platform: pl.toLowerCase(),
        file,
        content,
        charCount: content.length,
      })
    }
  }

  return docs
}

export function loadPlatformDocs(platform: string): string {
  const docs = loadRAGDocuments(platform)
  return docs.map(d => `## ${d.file}\n\n${d.content}`).join("\n\n---\n\n")
}

export function getRAGFileList(): Array<{ platform: string; files: string[] }> {
  if (!existsSync(RAG_DIR)) return []

  return readdirSync(RAG_DIR, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => ({
      platform: d.name.toLowerCase(),
      files: readdirSync(join(RAG_DIR, d.name)).filter(f => f.endsWith(".md")),
    }))
}
