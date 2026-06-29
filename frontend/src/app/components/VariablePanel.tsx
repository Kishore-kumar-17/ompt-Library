import { useRef } from "react";
import { Play, Upload, Sparkles, RefreshCw } from "lucide-react";
import type { VariableField } from "../lib/api";

/**
 * Variable layer input panel. Renders one typed input per `[TOKEN]` placeholder so
 * the user can personalize the descriptive prompt (text / color / image / select).
 * Substitution + the locks are handled by the caller — this is purely the form.
 */
export function VariablePanel({
  variables,
  values,
  onChange,
  onRegenerate,
  regenerating,
}: {
  variables: VariableField[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
  // Optional Option-B path: re-expand the descriptive from the filled brief (AI).
  onRegenerate?: () => void;
  regenerating?: boolean;
}) {
  if (variables.length === 0) return null;
  const filled = variables.filter((v) => values[v.name]?.trim()).length;

  return (
    <div className="bg-gradient-to-br from-[#4FC3F7]/15 to-[#4FC3F7]/10 border border-[#0a0a0a]/20 rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#0a0a0a]" style={{ fontWeight: 700 }}>
          <span className="w-5 h-5 rounded bg-[#4FC3F7] border border-[#0a0a0a] inline-flex items-center justify-center">
            <Play className="w-3 h-3 fill-[#0a0a0a]" />
          </span>
          Variable Brief
        </div>
        <span className="text-[12px] text-[#6b7280] font-semibold">
          {filled}/{variables.length} filled
        </span>
      </div>

      {variables.map((v) => (
        <VariableInput key={v.name} field={v} value={values[v.name] || ""} onChange={(val) => onChange(v.name, val)} />
      ))}

      {onRegenerate && (
        <div className="pt-1">
          <button
            type="button"
            onClick={onRegenerate}
            disabled={regenerating}
            className="w-full h-10 rounded-lg bg-[#0a0a0a] text-white text-[13px] font-bold inline-flex items-center justify-center gap-2 hover:bg-[#0a0a0a]/90 disabled:opacity-50 transition-colors"
          >
            {regenerating
              ? <><RefreshCw className="w-3.5 h-3.5 animate-spin" /> Regenerating…</>
              : <><Sparkles className="w-3.5 h-3.5" /> Regenerate with my values</>}
          </button>
          <p className="text-[11px] text-[#6b7280] mt-1.5 text-center">
            Re-expands the prompt with correct colours &amp; detail for your values (uses AI).
          </p>
        </div>
      )}
    </div>
  );
}

function VariableInput({
  field,
  value,
  onChange,
}: {
  field: VariableField;
  value: string;
  onChange: (value: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);

  const label = (
    <label className="text-[12px] text-[#6b7280] mb-1 block" style={{ fontWeight: 600 }}>
      <span className="font-mono text-[#0a0a0a] bg-[#4FC3F7]/60 px-1 rounded mr-1">[{field.name}]</span>
      {field.label}
    </label>
  );

  const inputClass =
    "w-full h-10 px-3 rounded-lg bg-white border-2 border-[#0a0a0a]/20 text-[#0a0a0a] placeholder:text-[#6b7280] outline-none focus:border-[#4FC3F7]";
  const ph = field.placeholder || field.default;
  // Long-form brief fields read better as a textarea.
  const MULTILINE = new Set(["SUBJECT", "OUTFIT", "SETTING", "PALETTE", "EXCLUDE", "STYLE_REFERENCE"]);

  if (field.type === "text" && MULTILINE.has(field.name)) {
    return (
      <div>
        {label}
        <textarea
          rows={2}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={ph}
          className="w-full px-3 py-2 rounded-lg bg-white border-2 border-[#0a0a0a]/20 text-[#0a0a0a] placeholder:text-[#6b7280] outline-none focus:border-[#4FC3F7] text-[13px] leading-relaxed resize-y"
        />
      </div>
    );
  }

  if (field.type === "select") {
    return (
      <div>
        {label}
        <select value={value} onChange={(e) => onChange(e.target.value)} className={inputClass}>
          <option value="">{field.placeholder || "Choose…"}</option>
          {(field.options ?? []).map((o) => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>
    );
  }

  if (field.type === "color") {
    // Named color text + a swatch picker. Value stays the human text (e.g. "electric
    // blue") unless the user picks a swatch, which writes the hex.
    return (
      <div>
        {label}
        <div className="flex gap-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={ph}
            className={inputClass}
          />
          <input
            type="color"
            aria-label={`${field.label} swatch`}
            onChange={(e) => onChange(e.target.value)}
            className="h-10 w-12 rounded-lg border-2 border-[#0a0a0a]/20 bg-white cursor-pointer shrink-0"
          />
        </div>
      </div>
    );
  }

  if (field.type === "image") {
    // Text-to-image can't ingest a file, so the substituted value is a description /
    // reference URL. The upload is a visual reference for the user (and future
    // on-site generation); selecting a file fills the description with its name.
    return (
      <div>
        {label}
        <div className="flex gap-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={ph || "describe or paste a reference URL"}
            className={inputClass}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="h-10 px-3 rounded-lg border-2 border-[#0a0a0a]/20 bg-white text-[#0a0a0a] inline-flex items-center gap-1.5 text-[13px] font-semibold hover:border-[#4FC3F7] shrink-0"
          >
            <Upload className="w-3.5 h-3.5" /> Reference
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f && !value.trim()) onChange(f.name.replace(/\.[^.]+$/, ""));
            }}
          />
        </div>
      </div>
    );
  }

  // text (default)
  return (
    <div>
      {label}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={ph}
        className={inputClass}
      />
    </div>
  );
}
