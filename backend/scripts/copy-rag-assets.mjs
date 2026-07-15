// tsc only compiles .ts -> .js; it never copies the RAG platform folders
// (backend/src/engine/rag/ChatGPT, /Firefly, ...) into dist/, so the
// production build had no markdown to load even after the RAG_DIR path fix.
// Run after `tsc` as part of the build script.
import { cpSync, existsSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const srcDir = join(__dirname, "..", "src", "engine", "rag");
const destDir = join(__dirname, "..", "dist", "engine", "rag");

if (!existsSync(srcDir)) {
  process.exit(0);
}

for (const entry of readdirSync(srcDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  cpSync(join(srcDir, entry.name), join(destDir, entry.name), { recursive: true });
}
