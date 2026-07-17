import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import { Upload, Check, ChevronRight, FileSpreadsheet, AlertTriangle, ArrowLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { adminApi, type BulkImportColumnMap, type BulkImportResult } from "../../lib/api";

const steps = ["Upload", "Map columns", "Preview", "Validate", "Commit"];
const VALID_FAMILIES = ["image", "video", "text", "content", "website"];
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const MAX_ROWS = 500; // mirrors backend/src/routes/admin.ts MAX_IMPORT_ROWS

// Minimal RFC4180-ish CSV parser (quoted fields, escaped quotes, commas/
// newlines inside quotes) — avoids pulling in a dependency for an admin-only
// internal tool.
function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; } else { inQuotes = false; }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field); field = "";
    } else if (c === "\r") {
      // skip, \n handles the line break
    } else if (c === "\n") {
      row.push(field); rows.push(row); row = []; field = "";
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) { row.push(field); rows.push(row); }
  return rows.filter(r => r.some(cell => cell.trim() !== ""));
}

const REQUIRED_FIELDS: { key: keyof BulkImportColumnMap; label: string; required: boolean }[] = [
  { key: "title",        label: "Title",         required: true  },
  { key: "family",       label: "Family",        required: true  },
  { key: "basePrompt",   label: "Base prompt",   required: true  },
  { key: "categoryId",   label: "Category ID",   required: false },
  { key: "qualityScore", label: "Quality score", required: false },
];

function guessColumn(headers: string[], key: string): string {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const aliases: Record<string, string[]> = {
    title: ["title", "name"],
    family: ["family", "type", "mode"],
    basePrompt: ["baseprompt", "prompt", "prompttext", "text"],
    categoryId: ["categoryid", "category"],
    qualityScore: ["qualityscore", "quality", "score"],
  };
  const candidates = aliases[key] ?? [norm(key)];
  return headers.find(h => candidates.includes(norm(h))) ?? "";
}

export function AdminImport({ go }: { go: (p: string) => void }) {
  const [step, setStep] = useState(0);
  const [filename, setFilename] = useState("");
  const [headers, setHeaders] = useState<string[]>([]);
  const [rows, setRows] = useState<Record<string, string>[]>([]);
  const [columnMap, setColumnMap] = useState<Record<string, string>>({});
  const [committing, setCommitting] = useState(false);
  const [result, setResult] = useState<BulkImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetAll() {
    setStep(0);
    setFilename("");
    setHeaders([]);
    setRows([]);
    setColumnMap({});
    setResult(null);
  }

  function handleFile(file: File) {
    if (file.size > MAX_FILE_BYTES) {
      toast.error("File too large", { description: "Max 10MB per import." });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = String(reader.result ?? "");
      const parsed = parseCSV(text);
      if (parsed.length < 2) {
        toast.error("Empty or unreadable CSV", { description: "The file needs a header row plus at least one data row." });
        return;
      }
      const [headerRow, ...dataRows] = parsed;
      const trimmedHeaders = headerRow.map(h => h.trim());
      if (dataRows.length > MAX_ROWS) {
        toast(`Only the first ${MAX_ROWS} rows were loaded`, {
          description: `This file has ${dataRows.length} data rows — the import endpoint caps a single batch at ${MAX_ROWS}. Re-run for the rest.`,
        });
      }
      const dataObjects = dataRows.slice(0, MAX_ROWS).map(r =>
        Object.fromEntries(trimmedHeaders.map((h, i) => [h, (r[i] ?? "").trim()]))
      );
      setFilename(file.name);
      setHeaders(trimmedHeaders);
      setRows(dataObjects);
      const guessed: Record<string, string> = {};
      for (const f of REQUIRED_FIELDS) guessed[f.key] = guessColumn(trimmedHeaders, f.key);
      setColumnMap(guessed);
      setResult(null);
      setStep(1);
    };
    reader.onerror = () => toast.error("Couldn't read file");
    reader.readAsText(file);
  }

  function onFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    e.target.value = "";
  }

  function onDrop(e: DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  }

  // Client-side pre-check mirroring the backend's per-row validation, so
  // admins see a real preview before committing — the server still
  // re-validates every row authoritatively on submit.
  const rowChecks = rows.map((r, i) => {
    const title = columnMap.title ? r[columnMap.title] : "";
    const family = columnMap.family ? r[columnMap.family] : "";
    const basePrompt = columnMap.basePrompt ? r[columnMap.basePrompt] : "";
    if (!title?.trim()) return { row: i + 1, ok: false, message: "missing title" };
    if (!basePrompt?.trim()) return { row: i + 1, ok: false, message: "missing prompt text" };
    if (!VALID_FAMILIES.includes(family?.trim())) return { row: i + 1, ok: false, message: `invalid family "${family}"` };
    return { row: i + 1, ok: true, message: "" };
  });
  const validCount = rowChecks.filter(r => r.ok).length;
  const errorChecks = rowChecks.filter(r => !r.ok);

  const canMapNext = !!(columnMap.title && columnMap.family && columnMap.basePrompt);

  function canAdvance(): boolean {
    if (step === 0) return rows.length > 0;
    if (step === 1) return canMapNext;
    return true;
  }

  async function handleCommit() {
    setCommitting(true);
    try {
      const payload = {
        filename,
        columnMap: {
          title: columnMap.title,
          family: columnMap.family,
          basePrompt: columnMap.basePrompt,
          categoryId: columnMap.categoryId || undefined,
          qualityScore: columnMap.qualityScore || undefined,
        },
        rows,
      };
      const res = await adminApi.bulkImport(payload);
      setResult(res);
      toast.success(`Imported ${res.imported} prompt${res.imported === 1 ? "" : "s"}`, {
        description: res.errors.length ? `${res.errors.length} row(s) were rejected.` : undefined,
      });
    } catch (err: any) {
      toast.error("Import failed", { description: err.message ?? "Please try again." });
    } finally {
      setCommitting(false);
    }
  }

  function downloadErrors() {
    if (!result?.errors.length) return;
    const text = result.errors.map(e => `Row ${e.row}: ${e.error}`).join("\n");
    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${filename.replace(/\.[^.]+$/, "") || "import"}-errors.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-10 text-[#0a0a0a]">
      <button onClick={() => go("home")} className="inline-flex items-center gap-1.5 text-[#6b7280] hover:text-[#0a0a0a] text-[13px] mb-3 transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" /> Back
      </button>
      <h1 className="text-3xl mb-2">Admin · Bulk Import</h1>
      <p className="text-[#6b7280] mb-6">Upload a CSV of prompts, map fields, validate, commit.</p>

      <div className="flex items-center gap-2 mb-8 flex-wrap">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[13px] ${
              i < step ? "bg-[#4FC3F7] text-[#0a0a0a]" :
              i === step ? "bg-[#0a0a0a]/10 text-[#0a0a0a] border border-[#4FC3F7]" :
              "bg-[#0a0a0a]/5 text-[#6b7280]"
            }`}>
              {i < step ? <Check className="w-4 h-4" /> : i + 1}
            </div>
            <div className={`${i===step?"text-[#0a0a0a]":"text-[#6b7280]"} hidden sm:block text-[13px]`}>{s}</div>
            {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-[#6b7280]" />}
          </div>
        ))}
      </div>

      <div className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-6 min-h-[320px]">
        {step === 0 && (
          <div
            className="border-2 border-dashed border-[#0a0a0a]/20 rounded-2xl p-10 text-center"
            onDragOver={(e) => e.preventDefault()}
            onDrop={onDrop}
          >
            <Upload className="w-10 h-10 mx-auto text-[#0a0a0a] mb-3" />
            <div className="text-[#0a0a0a] mb-1" style={{ fontWeight: 600 }}>Drag & drop a file, or click to browse</div>
            <div className="text-[#6b7280]">Accepts CSV (max 10MB, first row = headers)</div>
            <input ref={fileInputRef} type="file" accept=".csv,text/csv" className="hidden" onChange={onFileInputChange} />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="mt-4 h-10 px-5 rounded-full bg-[#4FC3F7] text-[#0a0a0a]"
              style={{ fontWeight: 700 }}
            >
              Choose file
            </button>
            {filename && (
              <div className="mt-3 text-[13px] text-[#6b7280]">
                Loaded <span className="text-[#0a0a0a] font-mono">{filename}</span> — {rows.length} row(s)
              </div>
            )}
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="text-[#0a0a0a] mb-1" style={{ fontWeight: 600 }}>Map CSV columns to database fields</div>
            <div className="text-[#6b7280] text-[13px] mb-3">Title, Family, and Base prompt are required.</div>
            <div className="space-y-2">
              {REQUIRED_FIELDS.map(f => (
                <div key={f.key} className="bg-[#f5f5f5] border border-[#0a0a0a]/15 rounded-lg p-3 flex items-center gap-3">
                  <FileSpreadsheet className="w-4 h-4 text-[#0a0a0a] shrink-0" />
                  <div className="text-[#0a0a0a] text-[13px] w-36 shrink-0">
                    {f.label}{f.required && <span className="text-[#4FC3F7]"> *</span>}
                  </div>
                  <select
                    value={columnMap[f.key] ?? ""}
                    onChange={(e) => setColumnMap(m => ({ ...m, [f.key]: e.target.value }))}
                    className="ml-auto bg-white border border-[#0a0a0a]/15 rounded-lg px-3 py-1.5 text-[13px] font-mono"
                  >
                    <option value="">— unmapped —</option>
                    {headers.map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                  {columnMap[f.key] ? (
                    <span className="text-[#0a0a0a] text-[13px]">✓ matched</span>
                  ) : f.required ? (
                    <span className="text-[#6b7280] text-[13px]">required</span>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        )}
        {step === 2 && (
          <div className="overflow-auto">
            <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>Preview · first 10 rows</div>
            <table className="w-full">
              <thead className="text-[#6b7280] bg-[#0a0a0a]/5">
                <tr>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Family</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {rows.slice(0, 10).map((r, i) => (
                  <tr key={i} className="border-t border-[#0a0a0a]/15 text-[#6b7280]">
                    <td className="p-2 text-[#0a0a0a]">{columnMap.title ? r[columnMap.title] : "—"}</td>
                    <td className="p-2 font-mono text-[12px]">{columnMap.family ? r[columnMap.family] : "—"}</td>
                    <td className="p-2">{columnMap.categoryId ? (r[columnMap.categoryId] || "—") : "—"}</td>
                    <td className="p-2 text-[#0a0a0a]" style={{ fontWeight: 700 }}>{columnMap.qualityScore ? (r[columnMap.qualityScore] || "—") : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <Stat label="Valid"  value={String(validCount)} color="#4FC3F7" />
              <Stat label="Errors" value={String(errorChecks.length)} color="#0a0a0a" />
            </div>
            {errorChecks.length > 0 && (
              <div className="bg-[#f5f5f5] border border-[#0a0a0a]/15 rounded-lg p-4">
                <div className="text-[#0a0a0a] mb-2 inline-flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#0a0a0a]" />Errors
                </div>
                {errorChecks.slice(0, 20).map(e => (
                  <div key={e.row} className="text-[#6b7280] py-1 font-mono text-[12px]">Row {e.row}: {e.message}</div>
                ))}
                {errorChecks.length > 20 && <div className="text-[#6b7280] py-1 text-[12px]">…and {errorChecks.length - 20} more</div>}
              </div>
            )}
            <div className="text-[#6b7280] text-[13px] mt-3">This is a client-side preview — the server re-validates every row on commit.</div>
          </div>
        )}
        {step === 4 && (
          <div className="text-center py-10">
            {!result ? (
              <>
                <div className="w-14 h-14 rounded-full bg-[#4FC3F7]/20 mx-auto flex items-center justify-center mb-4">
                  <Upload className="w-7 h-7 text-[#0a0a0a]" />
                </div>
                <div className="text-[#0a0a0a] text-xl mb-1" style={{ fontWeight: 700 }}>Ready to import {rows.length} row(s)</div>
                <div className="text-[#6b7280] mb-6">{filename} · {validCount} pass client-side checks, {errorChecks.length} likely to be rejected.</div>
                <button
                  onClick={handleCommit}
                  disabled={committing}
                  className="h-10 px-5 rounded-full bg-[#4FC3F7] text-[#0a0a0a] disabled:opacity-40 inline-flex items-center gap-2 mx-auto"
                  style={{ fontWeight: 700 }}
                >
                  {committing && <Loader2 className="w-4 h-4 animate-spin" />}
                  {committing ? "Importing…" : "Commit import"}
                </button>
              </>
            ) : (
              <>
                <div className="w-14 h-14 rounded-full bg-[#4FC3F7]/20 mx-auto flex items-center justify-center mb-4">
                  <Check className="w-7 h-7 text-[#0a0a0a]" />
                </div>
                <div className="text-[#0a0a0a] text-xl mb-1" style={{ fontWeight: 700 }}>
                  Imported {result.imported} prompt{result.imported === 1 ? "" : "s"}
                </div>
                <div className="text-[#6b7280] mb-6">
                  {result.errors.length > 0 ? `${result.errors.length} row(s) were rejected.` : "No rows were rejected."}
                  {result.truncated && " Import stopped early to stay within the request time limit — re-run with the remaining rows."}
                </div>
                <div className="flex gap-2 justify-center">
                  <button
                    onClick={downloadErrors}
                    disabled={!result.errors.length}
                    className="h-10 px-5 rounded-full bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a] disabled:opacity-40"
                  >
                    Download errors
                  </button>
                  <button onClick={resetAll} className="h-10 px-5 rounded-full bg-[#4FC3F7] text-[#0a0a0a]" style={{ fontWeight: 700 }}>
                    Start a new import
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <button
          disabled={step === 0}
          onClick={() => setStep(s => s - 1)}
          className="h-10 px-5 rounded-full bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a] disabled:opacity-40"
        >
          Back
        </button>
        <button
          disabled={step === steps.length - 1 || !canAdvance()}
          onClick={() => setStep(s => s + 1)}
          className="h-10 px-5 rounded-full bg-[#4FC3F7] text-[#0a0a0a] disabled:opacity-40"
          style={{ fontWeight: 700 }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="bg-[#f5f5f5] border border-[#0a0a0a]/15 rounded-lg p-4">
      <div className="text-3xl" style={{ color, fontWeight: 700 }}>{value}</div>
      <div className="text-[#6b7280]">{label}</div>
    </div>
  );
}
