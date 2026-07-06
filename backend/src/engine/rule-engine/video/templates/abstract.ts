import { VideoCategoryTemplate } from "../types.js"

export const ABSTRACT_TEMPLATE: VideoCategoryTemplate = {
  name: "Abstract / Motion Graphics",
  defaultCameraMove: "static",
  defaultLighting: "studio soft",
  defaultDuration: "4-8s",
  sections: [
    "SUBJECT", "TRANSFORM", "CAMERA",
    "LIGHTING", "COLOR_GRADE", "EXCLUDE",
    "LOCKS_MOTION", "LOCKS_TEMPORAL",
  ],
}

export function buildAbstractTransform(): string {
  return "TRANSFORM: continuous, mathematically smooth transformation from the start form to the end form — no sudden jumps in scale, topology, or color"
}
