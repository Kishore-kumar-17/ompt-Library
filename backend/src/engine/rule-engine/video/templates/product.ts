import { VideoCategoryTemplate } from "../types.js"

export const PRODUCT_TEMPLATE: VideoCategoryTemplate = {
  name: "Product Showcase",
  defaultCameraMove: "orbit",
  defaultLighting: "studio soft",
  defaultDuration: "4-6s",
  sections: [
    "SUBJECT", "ROTATION", "SETTING", "CAMERA",
    "LIGHTING", "COLOR_GRADE", "EXCLUDE",
    "LOCKS_MOTION", "LOCKS_CAMERA", "LOCKS_TEMPORAL",
  ],
}

export function buildProductRotation(): string {
  return "ROTATION: product rotates smoothly on a fixed vertical axis at constant angular speed, one clean revolution across the clip, no wobble or axis drift"
}
