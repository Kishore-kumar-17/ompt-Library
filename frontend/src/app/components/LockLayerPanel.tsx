import { Lock, ShieldOff, CheckCircle2, AlertTriangle } from "lucide-react";
import type { LockSectionItem, EngineValidation } from "../lib/api";

/**
 * Renders the engine's lock layer + negative locks for Builder/Improver output.
 * Hidden entirely when there are no locks (e.g. non-image prompts).
 */
export function LockLayerPanel({
  categoryLabel,
  lockSection,
  negativeLocks,
  validation,
}: {
  categoryLabel?: string | null;
  lockSection: LockSectionItem[];
  negativeLocks: string[];
  validation: EngineValidation | null;
}) {
  if (lockSection.length === 0 && negativeLocks.length === 0) return null;

  return (
    <section className="bg-white border border-[#0a0a0a]/15 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h2 className="text-[#0a0a0a] font-bold inline-flex items-center gap-2">
          <Lock className="w-4 h-4 text-[#0a0a0a]" />
          Lock layer{categoryLabel ? <span className="text-[#6b7280] font-medium"> · {categoryLabel}</span> : null}
        </h2>
        {validation && (
          <span
            className={`px-2.5 py-0.5 rounded-full text-[12px] font-bold border inline-flex items-center gap-1 ${
              validation.valid
                ? "bg-[#bce4d8] text-[#0a0a0a] border-[#0a0a0a]/20"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            {validation.valid ? (
              <><CheckCircle2 className="w-3 h-3" />All locks resolved</>
            ) : (
              <><AlertTriangle className="w-3 h-3" />{validation.missingRequiredFields.length} missing</>
            )}
          </span>
        )}
      </div>

      {lockSection.length > 0 && (
        <ul className="space-y-1.5 mb-5">
          {lockSection.map((l, i) => (
            <li key={l.key} className="font-mono text-[13px] text-[#0a0a0a] leading-relaxed">
              <span className="text-[#6b7280]">LOCK {String(i + 1).padStart(2, "0")} — </span>
              <span className="font-bold">{l.label.toUpperCase()}:</span> {l.value}
            </li>
          ))}
        </ul>
      )}

      {negativeLocks.length > 0 && (
        <>
          <h3 className="text-[#0a0a0a] font-bold text-[14px] mb-2 inline-flex items-center gap-1.5">
            <ShieldOff className="w-3.5 h-3.5 text-[#0a0a0a]" />
            Negative locks
          </h3>
          <ul className="space-y-1">
            {negativeLocks.map((n, i) => (
              <li key={i} className="flex items-start gap-2 text-[13px] text-[#6b7280]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4FC3F7]/40 shrink-0 mt-1.5" />
                {n}
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
