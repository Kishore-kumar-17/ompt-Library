// ─── Video Formula — Per-Platform Adaptation ────────────────────────────────────
// Appended to VIDEO_FORMULA (./system-prompts.ts) to tell the model how to
// reshape the 15-section + 6-extras structure for each target platform's
// actual prompting style. Voice per platform is drawn from the existing
// 30-prompt showcase library (frontend/src/app/lib/video-platforms.ts), which
// already has a distinct, working style established for each of these 5 —
// not invented from scratch.

export const VIDEO_PLATFORM_FORMULAS: Record<string, string> = {
  veo: `Platform: Google Veo
Tone: Flowing, single continuous cinematic narrative — one rich paragraph, not a list or shot-by-shot breakdown.

FORMAT REQUIREMENTS:
1. Write as one (or two, if needed) unbroken paragraph(s) of vivid prose — no headers, no numbered lists, no line breaks between sections.
2. Open by establishing the subject and identity ("Use the uploaded reference face as the main character, preserving facial identity throughout..." when a person is present).
3. Describe the action and environment together, then the camera's single continuous movement across the shot (e.g. "the camera begins behind the character in a medium tracking shot, slowly closing in...").
4. Close with a dense run of quality/technical tags in prose form (volumetric lighting, shallow depth of field, cinematic bokeh, professional cinematography, film-grade color grading, ultra-realistic HDR 4K) followed by explicit "Duration: Ns. Aspect ratio: X:Y." and a one-phrase style/genre tag.
5. Never break into bullet points or numbered shots — Veo reads best as one continuous cinematic sentence-flow.`,

  kling: `Platform: Kling AI
Tone: Physics-and-simulation-heavy — every sentence should describe HOW something physically moves or reacts, not just that it exists.

FORMAT REQUIREMENTS:
1. Establish subject and identity consistency first ("Use the uploaded reference face as the main character, consistent throughout").
2. For every physical element in the scene, describe its simulated behavior explicitly: how cloth drapes/billows/responds to wind or motion, how hair moves strand-by-strand, how liquid/rain/dust interacts with surfaces, how weight transfers through the body during movement, how light reflects off wet or textured surfaces with ray-traced accuracy.
3. Describe environmental physics transitions (lighting changing across surfaces as time/weather shifts, cloud movement, water reflections) as physically-grounded processes, not static descriptions.
4. Close with a dense tag run emphasizing simulation fidelity (realistic cloth simulation, natural hair physics, physically accurate reflections, accurate rain/wind interactions, ultra-realistic 4K) plus explicit "Duration: Ns. Aspect ratio: X:Y."
5. This is the platform where Physics & Motion Dynamics and Realism from the Advanced Enhancement list should dominate the prompt's language.`,

  seedance: `Platform: Seedance
Tone: Explicit three-act emotional arc — Beginning, Middle, End — every prompt tells a micro-story.

FORMAT REQUIREMENTS:
1. Establish subject and identity consistency first ("Use the uploaded reference face as the main character, identity consistent throughout").
2. Structure the body as exactly three labeled beats: "Beginning: ..." (the opening state/emotion/action), "Middle: ..." (the turn, discovery, or escalation — where the emotional or narrative shift happens), "End: ..." (the resolution, a specific final image/pose/expression that lands the story).
3. Each beat should describe both what's visually happening AND the emotional/internal shift it represents — this platform is about legible Story Telling and Mood & Emotional Atmosphere above all.
4. Close with a short tag run (cinematic atmosphere, relevant lighting mood, film-grade color grading, ultra-realistic 4K) plus explicit "Duration: Ns. Aspect ratio: X:Y."
5. Do not use numbered shots or dense technical/physics language here — the three-beat emotional structure is the whole point.`,

  higgsfield: `Platform: Higgsfield
Tone: Timestamped, numbered shot list — this platform is directed like a storyboard, not written as prose.

FORMAT REQUIREMENTS:
1. Establish subject and identity consistency first ("Use the uploaded reference face as the main character throughout").
2. Break the full duration into 4-6 discrete shots, each on its own line, formatted exactly as: "Shot N (start–ends): [shot type/framing] — [what happens, camera behavior, key visual detail]." Timestamps must sum to the total duration with no gaps or overlaps.
3. Vary shot type/camera deployment across the sequence deliberately (e.g. wide establishing → push-in → close-up → extreme close-up → final wide) — this is the platform where Shot Type/Camera Deployment and Cinematography are most explicit.
4. Close with a compact technical tag line (smooth camera movement / volumetric lighting / relevant atmosphere, HDR, 4K) and explicit "Aspect ratio: X:Y" (duration is already implied by the shot timestamps, so it doesn't need restating).
5. Every shot line must be self-contained and filmable on its own — no vague transitions between shots.`,

  pika: `Platform: Pika Labs
Tone: Maximally compact — one dense line, every word earning its place, no flourish.

FORMAT REQUIREMENTS:
1. Compress the entire prompt into a single unbroken line (no paragraph breaks, no lists).
2. Lead with subject + action + environment in the fewest words possible, then a short comma-separated run of the highest-signal modifiers only: key lighting/time-of-day, one camera move, one style/quality tag cluster (e.g. "ultra-realistic 4K"), explicit duration, explicit aspect ratio.
3. Drop anything that isn't load-bearing — no scene-setting prose, no emotional narration, no physics detail. This is the terse, keyword-dense counterpart to the other four platforms' longer forms.
4. End the line with "N seconds, X:Y" as the final two tokens.`,
};
