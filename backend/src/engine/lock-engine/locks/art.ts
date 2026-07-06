import type { LockTemplate } from "../types.js";
import { artNegativeLocks } from "../negatives/art.js";

export const artLockTemplate: LockTemplate = {
  categoryId: "art-illustration",
  categoryLabel: "Art & Illustration",
  purpose: "Protect illustration language more than realism across model variants.",
  mandatoryLocks: [
    { key: "styleDna", label: "Art Style", required: true, description: "The defining art style the image must preserve.", warning: "Art style was not clearly extracted; output may drift toward generic realism." },
    { key: "subject", label: "Character", required: true, description: "The character or subject of the illustration." },
    { key: "palette", label: "Palette", required: true, description: "The color palette that defines the piece.", warning: "Palette was not clearly extracted; color identity may drift." },
    { key: "composition", label: "Composition", required: true, description: "The framing logic of the illustration." },
  ],
  optionalLocks: [
    { key: "pose", label: "Pose", required: false, description: "Character pose — only when the piece depicts a posed figure." },
    { key: "expression", label: "Expression", required: false, description: "Character expression — only when a face is present." },
    { key: "lighting", label: "Lighting", required: false, description: "Lighting logic — often implicit in flat or decorative illustration." },
    { key: "background", label: "Background", required: false, description: "Backdrop — only when distinct from an all-over pattern." },
    { key: "renderingStyle", label: "Rendering Style", required: false, description: "Linework/shading/brushwork — only when stated separately from the art style." },
    { key: "gaze", label: "Gaze", required: false, description: "Useful when the character's gaze direction is intentional." },
    { key: "material", label: "Material", required: false, description: "Useful when a specific medium texture is part of the style." },
    { key: "crop", label: "Crop", required: false, description: "Useful when a specific aspect ratio matters." },
  ],
  locksToAvoid: [
    "Photographic camera-rig metrics",
    "Skin-physics realism notes that fight the art style",
    "Coordinate systems as a default art lock",
  ],
  extractionRules: [
    "Protect the art style before realism — art style is the primary lock.",
    "Separate art style (genre) from rendering style (linework/shading/brushwork).",
    "Treat the depicted figure or creature as the character.",
    "Map medium words like watercolor, cel-shaded, or ink wash into rendering style.",
  ],
  defaultNegativeLocks: artNegativeLocks,
  examples: [
    {
      promptTitle: "Watercolor Fox Spirit Illustration",
      extracted: {
        styleDna: "Storybook watercolor",
        subject: "Fox spirit",
        pose: "Curled and alert",
        expression: "Serene",
        palette: "Warm autumn ochres and teal",
        lighting: "Soft diffused glow",
        renderingStyle: "Loose watercolor wash with ink linework",
        background: "Misty forest",
        composition: "Centered character vignette",
      },
      notes: "Anchor example for the art parser.",
    },
  ],
};
