import { useState } from "react";
import { Upload, Check, ChevronRight, FileSpreadsheet, AlertTriangle } from "lucide-react";

const steps = ["Upload", "Map columns", "Preview", "Validate", "Commit"];

export function AdminImport() {
  const [step, setStep] = useState(0);

  return (
    <div className="max-w-[1100px] mx-auto px-6 py-10 text-[#0a0a0a]">
      <h1 className="text-3xl mb-2">Admin · Bulk Import</h1>
      <p className="text-[#6b7280] mb-6">Upload a CSV/XLSX of prompts, map fields, validate, commit.</p>

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
          <div className="border-2 border-dashed border-[#0a0a0a]/20 rounded-2xl p-10 text-center">
            <Upload className="w-10 h-10 mx-auto text-[#0a0a0a] mb-3" />
            <div className="text-[#0a0a0a] mb-1" style={{ fontWeight: 600 }}>Drag & drop a file, or click to browse</div>
            <div className="text-[#6b7280]">Accepts CSV, XLSX (max 10MB)</div>
            <button className="mt-4 h-10 px-5 rounded-full bg-[#4FC3F7] text-[#0a0a0a]" style={{ fontWeight: 700 }}>Choose file</button>
          </div>
        )}
        {step === 1 && (
          <div>
            <div className="text-[#0a0a0a] mb-3" style={{ fontWeight: 600 }}>Map CSV columns to database fields</div>
            <div className="space-y-2">
              {[
                "prompt_id → id",
                "title → title",
                "category → category",
                "chatgpt_version → platforms.chatgpt",
                "midjourney_version → platforms.midjourney",
                "tags → tags",
                "quality_score → quality",
                "tested → tested",
              ].map(m => (
                <div key={m} className="bg-[#f5f5f5] border border-[#0a0a0a]/15 rounded-lg p-3 flex items-center gap-3">
                  <FileSpreadsheet className="w-4 h-4 text-[#0a0a0a]" />
                  <div className="text-[#0a0a0a] font-mono text-[13px]">{m}</div>
                  <div className="ml-auto text-[#0a0a0a] text-[13px]">✓ matched</div>
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
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Category</th>
                  <th className="p-2 text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({length: 6}).map((_, i) => (
                  <tr key={i} className="border-t border-[#0a0a0a]/15 text-[#6b7280]">
                    <td className="p-2 font-mono text-[12px]">MKT-POS-00{i+1}</td>
                    <td className="p-2 text-[#0a0a0a]">Cinematic Event Poster {i+1}</td>
                    <td className="p-2">Design Outputs</td>
                    <td className="p-2 text-[#0a0a0a]" style={{ fontWeight: 700 }}>4.{7-i}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {step === 3 && (
          <div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <Stat label="Valid"    value="78" color="#4FC3F7" />
              <Stat label="Warnings" value="3"  color="#a7a9be" />
              <Stat label="Errors"   value="5"  color="#4FC3F7" />
            </div>
            <div className="bg-[#f5f5f5] border border-[#0a0a0a]/15 rounded-lg p-4">
              <div className="text-[#0a0a0a] mb-2 inline-flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-[#0a0a0a]" />Errors
              </div>
              {[
                "Row 12: missing category",
                "Row 28: invalid platform 'dalle'",
                "Row 44: duplicate prompt_id",
                "Row 61: score out of range",
                "Row 72: empty prompt text",
              ].map(e => (
                <div key={e} className="text-[#6b7280] py-1 font-mono text-[12px]">{e}</div>
              ))}
            </div>
          </div>
        )}
        {step === 4 && (
          <div className="text-center py-10">
            <div className="w-14 h-14 rounded-full bg-[#4FC3F7]/20 mx-auto flex items-center justify-center mb-4">
              <Check className="w-7 h-7 text-[#0a0a0a]" />
            </div>
            <div className="text-[#0a0a0a] text-xl mb-1" style={{ fontWeight: 700 }}>Ready to import 78 prompts</div>
            <div className="text-[#6b7280] mb-6">5 rejected rows will be excluded. Download error report?</div>
            <div className="flex gap-2 justify-center">
              <button className="h-10 px-5 rounded-full bg-[#0a0a0a]/5 border border-[#0a0a0a]/20 text-[#0a0a0a]">Download errors</button>
              <button className="h-10 px-5 rounded-full bg-[#4FC3F7] text-[#0a0a0a]" style={{ fontWeight: 700 }}>Commit import</button>
            </div>
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
          disabled={step === steps.length - 1}
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

function Stat({ label, value, color }: any) {
  return (
    <div className="bg-[#f5f5f5] border border-[#0a0a0a]/15 rounded-lg p-4">
      <div className="text-3xl" style={{ color, fontWeight: 700 }}>{value}</div>
      <div className="text-[#6b7280]">{label}</div>
    </div>
  );
}