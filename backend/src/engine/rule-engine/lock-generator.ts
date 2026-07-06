// ─── Lock Generator ───────────────────────────────────────────────────────────
// Generates Pro Formula v4.2 LOCK blocks from numeric values.
// No AI — deterministic output from category defaults + overrides.

import type { LockValues, RuleEngineCategory } from "./types"
import { LOCK_DEFAULTS } from "./dictionaries"
import { buildOrientationLock, buildFramingLock, buildLightLock, buildHandLock } from "./templates/people"

export function generateLocks(
  category: RuleEngineCategory,
  handPositionExpanded: string | null,
  overrides: Partial<LockValues> = {}
): { orientation: string; framing: string; light: string; hand: string | null } {
  const d = LOCK_DEFAULTS[category] ?? LOCK_DEFAULTS.people

  const v: LockValues = {
    facingAngle:    overrides.facingAngle    ?? d.facingAngle,
    headAngle:      overrides.headAngle      ?? d.headAngle,
    symmetry:       overrides.symmetry       ?? d.symmetry,
    repeatedDetails: overrides.repeatedDetails ?? 3,
    verticalAngle:  overrides.verticalAngle  ?? 88,
    cameraPosition: overrides.cameraPosition ?? "perpendicular",
    primaryX:       overrides.primaryX       ?? d.primaryX,
    primaryY:       overrides.primaryY       ?? d.primaryY,
    secondaryX:     overrides.secondaryX     ?? parseFloat((1 - d.primaryX).toFixed(2)),
    secondaryY:     overrides.secondaryY     ?? parseFloat((d.primaryY + 0.10).toFixed(2)),
    border:         overrides.border         ?? d.border,
    negativeSpace:  overrides.negativeSpace  ?? d.negativeSpace,
    ar:             overrides.ar             ?? d.ar,
    colorTemp:      overrides.colorTemp      ?? d.colorTemp,
    lightAltitude:  overrides.lightAltitude  ?? d.lightAltitude,
    lightAzimuth:   overrides.lightAzimuth   ?? d.lightAzimuth,
    shadowFeather:  overrides.shadowFeather  ?? d.shadowFeather,
    contrast:       overrides.contrast       ?? d.contrast,
    specular:       overrides.specular       ?? d.specular,
    handLock:       overrides.handLock       ?? handPositionExpanded,
  }

  return {
    orientation: buildOrientationLock(v.facingAngle, v.headAngle, v.symmetry, v.repeatedDetails, v.verticalAngle),
    framing:     buildFramingLock(v.primaryX, v.primaryY, v.border, v.negativeSpace, v.ar),
    light:       buildLightLock(v.colorTemp, v.lightAltitude, v.lightAzimuth, v.shadowFeather, v.contrast, v.specular),
    hand:        buildHandLock(v.handLock),
  }
}
