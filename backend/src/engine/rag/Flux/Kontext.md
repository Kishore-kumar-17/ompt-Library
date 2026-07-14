# Image Generation API

Title: Image Generation - Black Forest Labs

URL Source: <http://docs.bfl.ai/kontext/kontext_text_to_image>

Markdown Content:
**FLUX.1 Kontext [pro]** is a previous-generation model that creates images from text prompts, with capabilities for character consistency and editing.

## Quick Examples

**Prompts for the images above:**• **Abstract cat artwork:** “Abstract expressionist painting Pop Art and cubism early 20 century, straight lines and solids, cute cat face without body, warm colors, green, intricate details, hologram floating in space, a vibrant digital illustration, black background, flat color, 2D, strong lines.”• **Robot and truck:** “A cute round rusted robot repairing a classic pickup truck, colorful, futuristic, vibrant glow, van gogh style”• **Furry elephant:** “A small furry elephant pet looks out from a cat house”• **Face paint portrait:** “A close-up of a face adorned with intricate black and blue patterns. The left side of the face is predominantly yellow, with symbols and doodles, while the right side is dark, featuring mechanical elements. The eye on the left is a striking shade of yellow, contrasting sharply with the surrounding patterns. The face is partially covered by a hooded garment, realistic style”

**Prompts for the images above:**• **Rainy car scene:** “Close-up of a vintage car hood under heavy rain, droplets cascading down the deep cherry-red paint, windshield blurred with streaks of water, glowing headlights diffused through mist, reflections of crimson neon signage spelling “FLUX” dancing across the wet chrome grille, steam rising from the engine, ambient red light enveloping the scene, moody composition, shallow depth of field, monochromatic red palette, cinematic lighting with glossy textures.”• **Burning temple warrior:** “A lone warrior, clad in bloodstained samurai armor, stands motionless before a massive pagoda engulfed in flames. Embers and ash swirl around him like ghosts of fallen enemies. The once-sacred temple is collapsing, its ornate carvings crumbling into the blaze as distant screams echo through the smoke-filled air. A tattered banner flutters beside him, the last symbol of a forgotten oath. The scene is both devastating and mesmerizing, with deep reds, burning oranges, and cold blue shadows creating a stark contrast. Cinematic composition, ultra-detailed textures, dynamic lighting, atmospheric fog, embers in the wind, dark fantasy realism, intense contrast.”• **Foggy gas station:** “Remote gas station swallowed by crimson fog, green glow from overhead lights staining the asphalt, new tiny smart car idling with taillights cutting through the mist, vending machine humming beside cracked fuel pumps, oily puddles reflecting distorted neon, shadows stretching unnaturally long, skeletal trees barely visible in the background, wide-angle cinematic shot, deep green monochromatic palette with faint charcoal accents, backlighting and heavy atmosphere, surreal and ominous mood.”• **Detective game character:** “Retro game style, man in old school suit, upper body, true detective, detailed character, night sky, crimson moon silhouette, american muscle car parked on dark street in background, complex background in style of Bill Sienkiewicz and Dave McKean and Carne Griffiths, extremely detailed, mysterious, grim, provocative, thrilling, dynamic, action-packed, fallout style, vintage, game theme, masterpiece, high contrast, stark. vivid colors, 16-bit, pixelated, textured, distressed”

## Using FLUX.1 Kontext API for Text-to-Image Generation

### Create a Request

A successful response will be a JSON object containing the request’s `id`. This ID is used to retrieve the generated image.

### Poll for Result

After submitting a request, you need to poll using the returned `polling_url` to retrieve the output when ready.

A successful response will be a JSON object containing the result, and `result['sample']` is a signed URL for retrieval.

### FLUX.1 Kontext Text-to-Image Parameters

* **Supported Range**: Aspect ratios can range from 3:7 (portrait) to 7:3 (landscape).
* **Default Behavior**: If `aspect_ratio` is not specified, the model defaults to 1:1 (1024x1024).

| Parameter | Type | Default | Description | Required |
| --- | --- | --- | --- | --- |
| `prompt` | string |  | Text description of the desired image. | **Yes** |
| `aspect_ratio` | string / null | `"1:1"` | Desired aspect ratio (e.g., “16:9”). All outputs are ~1MP total. Supports ratios from 3:7 to 7:3. | No |
| `seed` | integer / null | `null` | Seed for reproducibility. If `null` or omitted, a random seed is used. Accepts any integer. | No |
| `prompt_upsampling` | boolean | `false` | If true, performs upsampling on the prompt | No |
| `safety_tolerance` | integer | `2` | Moderation level for inputs and outputs. Value ranges from 0 (most strict) to 6 (more permissive). | No |
| `output_format` | string | `"jpeg"` | Desired format of the output image. Can be “jpeg” or “png”. | No |
| `webhook_url` | string / null | `null` | URL for asynchronous completion notification. Must be a valid HTTP/HTTPS URL. | No |
| `webhook_secret` | string / null | `null` | Secret for webhook signature verification, sent in the `X-Webhook-Secret` header. | No |
