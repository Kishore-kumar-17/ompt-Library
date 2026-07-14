# Image Generation

Title: Image Generation

URL Source: <http://docs.x.ai/developers/model-capabilities/images/generation>

Published Time: 2026-05-14T00:00:00Z

Markdown Content:

#### [Model Capabilities](http://docs.x.ai/developers/model-capabilities/images/generation#model-capabilities)

Generate images from text prompts with Grok Imagine models. The API supports batch generation of multiple images, and control over aspect ratio and resolution.

**`grok-imagine-image-pro` will be deprecated as of May 15, 2026.** Use `grok-imagine-image-quality` for all new image generation requests. Existing `-pro` requests will continue to work during a transition period, but we recommend migrating promptly.

* * *

## [Quick Start](http://docs.x.ai/developers/model-capabilities/images/generation#quick-start)

Generate an image with a single API call:

```
import xai_sdk

client = xai_sdk.Client()

response = client.image.sample(
    prompt="A collage of London landmarks in a stenciled street‑art style",
    model="grok-imagine-image-quality",
)

print(response.url)
```

Images are returned as URLs by default. URLs are temporary, so download or process promptly. You can also request [base64 output](http://docs.x.ai/developers/model-capabilities/images/generation#base64-output) for embedding images directly.

* * *

## [Configuration](http://docs.x.ai/developers/model-capabilities/images/generation#configuration)

### [Multiple Images](http://docs.x.ai/developers/model-capabilities/images/generation#multiple-images)

Generate multiple images in a single request using the `sample_batch()` method and the `n` parameter. This returns a list of `ImageResponse` objects.

```
import xai_sdk

client = xai_sdk.Client()

responses = client.image.sample_batch(
    prompt="A futuristic city skyline at night",
    model="grok-imagine-image-quality",
    n=4,
)

for i, image in enumerate(responses):
    print(f"Variation {i + 1}: {image.url}")
```

### [Aspect Ratio](http://docs.x.ai/developers/model-capabilities/images/generation#aspect-ratio)

Control image dimensions with the `aspect_ratio` parameter. This works for image generation and image editing with multiple images. For image editing with a single image, the output aspect ratio respects the input image's aspect ratio.

| Ratio | Use case |
| --- | --- |
| `1:1` | Social media, thumbnails |
| `16:9` / `9:16` | Widescreen, mobile, stories |
| `4:3` / `3:4` | Presentations, portraits |
| `3:2` / `2:3` | Photography |
| `2:1` / `1:2` | Banners, headers |
| `19.5:9` / `9:19.5` | Modern smartphone displays |
| `20:9` / `9:20` | Ultra-wide displays |
| `auto` | Model auto-selects the best ratio for the prompt |

```
import xai_sdk

client = xai_sdk.Client()

response = client.image.sample(
    prompt="Mountain landscape at sunrise",
    model="grok-imagine-image-quality",
    aspect_ratio="16:9",
)

print(response.url)
```

### [Resolution](http://docs.x.ai/developers/model-capabilities/images/generation#resolution)

You can specify different resolutions of the output image. Currently supported image resolutions are:

* 1k
* 2k

```
import xai_sdk

client = xai_sdk.Client()

response = client.image.sample(
    prompt="An astronaut performing EVA in LEO.",
    model="grok-imagine-image-quality",
    resolution="2k"
)

print(response.url)
```

### [Base64 Output](http://docs.x.ai/developers/model-capabilities/images/generation#base64-output)

For embedding images directly without downloading, request base64:

```
import xai_sdk

client = xai_sdk.Client()

response = client.image.sample(
    prompt="A serene Japanese garden",
    model="grok-imagine-image-quality",
    image_format="base64",
)

# Save to file
with open("garden.jpg", "wb") as f:
    f.write(response.image)
```

### [Response Details](http://docs.x.ai/developers/model-capabilities/images/generation#response-details)

The xAI SDK exposes additional metadata on the response object beyond the image URL or base64 data.

**Moderation** — Check whether the generated image passed content moderation:

Python

```
if response.respect_moderation:
    print(response.url)
else:
    print("Image filtered by moderation")
```

**Model** — Get the actual model used (resolving any aliases):

Python

```
print(f"Model: {response.model}")
```

* * *

## [Concurrent Requests](http://docs.x.ai/developers/model-capabilities/images/generation#concurrent-requests)

When you need to generate multiple images with **different prompts**, such as generating unrelated images in parallel, use `AsyncClient` with `asyncio.gather` to fire requests concurrently. This is significantly faster than issuing them one at a time.

If you want multiple variations from the **same prompt**, use [`sample_batch()` with the `n` parameter`](http://docs.x.ai/developers/model-capabilities/images/generation#multiple-images) instead. That generates all images in a single request and is the most efficient approach for same-prompt generation.

Python

```
import asyncio
import xai_sdk

async def generate_concurrently():
    client = xai_sdk.AsyncClient()

    # Each request uses a different prompt
    prompts = [
        "A futuristic city skyline at sunset",
        "A serene Japanese garden in winter",
        "An astronaut floating above Earth",
        "A medieval castle on a misty mountain",
    ]

    # Fire all requests concurrently
    tasks = [
        client.image.sample(
            prompt=prompt,
            model="grok-imagine-image-quality",
        )
        for prompt in prompts
    ]

    results = await asyncio.gather(*tasks)

    for prompt, result in zip(prompts, results):
        print(f"{prompt}: {result.url}")

asyncio.run(generate_concurrently())
```

* * *

* [Models](http://docs.x.ai/developers/models) — Available image models
* [Image Editing](http://docs.x.ai/developers/model-capabilities/images/editing) — Edit images with natural language
* [Video Generation](http://docs.x.ai/developers/model-capabilities/video/generation) — Generate videos from text prompts
* [API Reference](http://docs.x.ai/developers/rest-api-reference) — Full endpoint documentation
* [Imagine API Landing Page](https://x.ai/api/imagine) — Showcase of the Imagine API in action
