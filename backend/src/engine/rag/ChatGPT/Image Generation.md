# Image Generation

Title: Image generation | OpenAI API

URL Source: <http://developers.openai.com/api/docs/guides/image-generation>

Markdown Content:
The OpenAI API lets you generate and edit images from text prompts using GPT Image models, including our latest, `gpt-image-2`. You can access image generation capabilities through two APIs:

### Image API

Starting with `gpt-image-1` and later models, the [Image API](https://developers.openai.com/api/docs/api-reference/images) provides two endpoints, each with distinct capabilities:

* **Generations**: [Generate images](http://developers.openai.com/api/docs/guides/image-generation#generate-images) from scratch based on a text prompt
* **Edits**: [Modify existing images](http://developers.openai.com/api/docs/guides/image-generation#edit-images) using a new prompt, either partially or entirely

The Image API also includes a variations endpoint for models that support it, such as DALL·E 2.

### Responses API

The [Responses API](https://developers.openai.com/api/docs/api-reference/responses/create#responses-create-tools) allows you to generate images as part of conversations or multi-step flows. It supports image generation as a [built-in tool](https://developers.openai.com/api/docs/guides/tools?api-mode=responses), and accepts image inputs and outputs within context.

Compared to the Image API, it adds:

* **Multi-turn editing**: Iteratively make high fidelity edits to images with prompting
* **Flexible inputs**: Accept image [File](https://developers.openai.com/api/docs/api-reference/files) IDs as input images, not just bytes

The Responses API image generation tool uses its own GPT Image model selection. For details on mainline models that support calling this tool, refer to the [supported models](http://developers.openai.com/api/docs/guides/image-generation#supported-models) below.

### Choosing the right API

* If you only need to generate or edit a single image from one prompt, the Image API is your best choice.
* If you want to build conversational, editable image experiences with GPT Image, go with the Responses API.

With the Image API, you choose a GPT Image model directly. With the Responses API, you choose a mainline model that supports the image generation tool; the tool handles GPT Image model selection. Responses API requests include the mainline model’s token usage in addition to image generation costs.

Both APIs let you [customize output](http://developers.openai.com/api/docs/guides/image-generation#customize-image-output) by adjusting quality, size, format, and compression. Transparent backgrounds depend on model support.

This guide focuses on GPT Image.

To ensure these models are used responsibly, you may need to complete the [API Organization Verification](https://help.openai.com/en/articles/10910291-api-organization-verification) from your [developer console](https://platform.openai.com/settings/organization/general) before using GPT Image models, including `gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`.

![Image 1: A beige coffee mug on a wooden table](https://cdn.openai.com/API/docs/images/mug.png)

You can use the [image generation endpoint](https://developers.openai.com/api/docs/api-reference/images/create) to create images based on text prompts, or the [image generation tool](https://developers.openai.com/api/docs/guides/tools?api-mode=responses) in the Responses API to generate images as part of a conversation.

To learn more about customizing the output (size, quality, format, compression), refer to the [customize image output](http://developers.openai.com/api/docs/guides/image-generation#customize-image-output) section below.

You can set the `n` parameter to generate multiple images at once in a single request (by default, the API returns a single image).

Image API

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
from openai import OpenAI
import base64
client = OpenAI()

prompt = """
A children's book drawing of a veterinarian using a stethoscope to 
listen to the heartbeat of a baby otter.
"""

result = client.images.generate(
    model="gpt-image-2",
    prompt=prompt
)

image_base64 = result.data[0].b64_json
image_bytes = base64.b64decode(image_base64)

# Save the image to a file
with open("otter.png", "wb") as f:
    f.write(image_bytes)
```

### Multi-turn image generation

With the Responses API, you can build multi-turn conversations involving image generation either by providing image generation calls outputs within context (you can also just use the image ID), or by using the [`previous_response_id` parameter](https://developers.openai.com/api/docs/guides/conversation-state?api-mode=responses#openai-apis-for-conversation-state). This lets you iterate on images across multiple turns—refining prompts, applying new instructions, and evolving the visual output as the conversation progresses.

With the Responses API image generation tool, supported tool models can choose whether to generate a new image or edit one already in the conversation. The optional `action` parameter controls this behavior: keep `action: "auto"` to let the model decide, set `action: "generate"` to always create a new image, or set `action: "edit"` to force editing when an image is in context.

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
from openai import OpenAI
import base64

client = OpenAI() 

response = client.responses.create(
    model="gpt-5.5",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation", "action": "generate"}],
)

# Save the image to a file
image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]
    
if image_data:
    image_base64 = image_data[0]
    with open("otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

If you force `edit` without providing an image in context, the call will return an error. Leave `action` at `auto` to have the model decide when to generate or edit.

Using previous response ID

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
from openai import OpenAI
import base64

client = OpenAI()

response = client.responses.create(
    model="gpt-5.5",
    input="Generate an image of gray tabby cat hugging an otter with an orange scarf",
    tools=[{"type": "image_generation"}],
)

image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]

if image_data:
    image_base64 = image_data[0]

    with open("cat_and_otter.png", "wb") as f:
        f.write(base64.b64decode(image_base64))

# Follow up

response_fwup = client.responses.create(
    model="gpt-5.5",
    previous_response_id=response.id,
    input="Now make it look realistic",
    tools=[{"type": "image_generation"}],
)

image_data_fwup = [
    output.result
    for output in response_fwup.output
    if output.type == "image_generation_call"
]

if image_data_fwup:
    image_base64 = image_data_fwup[0]
    with open("cat_and_otter_realistic.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

#### Result

“Generate an image of gray tabby cat hugging an otter with an orange scarf”![Image 2: A cat and an otter](https://cdn.openai.com/API/docs/images/cat_and_otter.png)
“Now make it look realistic”![Image 3: A cat and an otter](https://cdn.openai.com/API/docs/images/cat_and_otter_realistic.png)

### Streaming

The Responses API and Image API support streaming image generation. You can stream partial images as the APIs generate them, providing a more interactive experience.

You can adjust the `partial_images` parameter to receive 0-3 partial images.

* If you set `partial_images` to 0, you will only receive the final image.
* For values larger than zero, you may not receive the full number of partial images you requested if the full image is generated more quickly.

Responses API

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
from openai import OpenAI
import base64

client = OpenAI()

def save_base64_image(filename, image_base64):
    image_bytes = base64.b64decode(image_base64)
    with open(filename, "wb") as f:
        f.write(image_bytes)

stream = client.responses.create(
    model="gpt-5.5",
    input="Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape",
    stream=True,
    tools=[{"type": "image_generation", "partial_images": 2}],
)

for event in stream:
    if event.type == "response.image_generation_call.partial_image":
        idx = event.partial_image_index
        save_base64_image(f"river-partial-{idx}.png", event.partial_image_b64)
    elif event.type == "response.completed":
        image_data = [
            output.result
            for output in event.response.output
            if output.type == "image_generation_call"
        ]

        if image_data:
            save_base64_image("river-final.png", image_data[0])
```

#### Result

| Partial 1 | Partial 2 | Final image |
| --- | --- | --- |
| ![Image 4: 1st partial](https://cdn.openai.com/API/docs/images/imgen1p5-streaming1.png) | ![Image 5: 2nd partial](https://cdn.openai.com/API/docs/images/imgen1p5-streaming2.png) | ![Image 6: 3rd partial](https://cdn.openai.com/API/docs/images/imgen1p5-streaming3.png) |

Prompt: Draw a gorgeous image of a river made of white owl feathers, snaking its way through a serene winter landscape

### Revised prompt

When using the image generation tool in the Responses API, the mainline model (for example, `gpt-5.5`) will automatically revise your prompt for improved performance.

You can access the revised prompt in the `revised_prompt` field of the image generation call:

```
1
2
3
4
5
6
7
{
  "id": "ig_123",
  "type": "image_generation_call",
  "status": "completed",
  "revised_prompt": "A gray tabby cat hugging an otter. The otter is wearing an orange scarf. Both animals are cute and friendly, depicted in a warm, heartwarming style.",
  "result": "..."
}
```

The [image edits](https://developers.openai.com/api/docs/api-reference/images/createEdit) endpoint lets you:

* Edit existing images
* Generate new images using other images as a reference
* Edit parts of an image by uploading an image and mask that identifies the areas to replace

### Create a new image using image references

You can use one or more images as a reference to generate a new image.

In this example, we’ll use 4 input images to generate a new image of a gift basket containing the items in the reference images.

Responses API

With the Responses API, you can provide input images in 3 different ways:

* By providing a fully qualified URL
* By providing an image as a Base64-encoded data URL
* By providing a file ID (created with the [Files API](https://developers.openai.com/api/docs/api-reference/files))

#### Create a File

```
1
2
3
4
5
6
7
8
9
10
from openai import OpenAI
client = OpenAI()

def create_file(file_path):
  with open(file_path, "rb") as file_content:
    result = client.files.create(
        file=file_content,
        purpose="vision",
    )
    return result.id
```

#### Create a base64 encoded image

```
1
2
3
4
5
6
import base64

def encode_image(file_path):
    with open(file_path, "rb") as f:
        base64_image = base64.b64encode(f.read()).decode("utf-8")
    return base64_image
```

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
from openai import OpenAI
import base64

client = OpenAI()

def encode_image(file_path):
    with open(file_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode("utf-8")

def create_file(file_path):
    with open(file_path, "rb") as file_content:
        result = client.files.create(file=file_content, purpose="vision")
    return result.id

prompt = """Generate a photorealistic image of a gift basket on a white background 
labeled 'Relax & Unwind' with a ribbon and handwriting-like font, 
containing all the items in the reference pictures."""

base64_image1 = encode_image("body-lotion.png")
base64_image2 = encode_image("soap.png")
file_id1 = create_file("bath-bomb.png")
file_id2 = create_file("incense-kit.png")

response = client.responses.create(
    model="gpt-5.5",
    input=[
        {
            "role": "user",
            "content": [
                {"type": "input_text", "text": prompt},
                {
                    "type": "input_image",
                    "image_url": f"data:image/png;base64,{base64_image1}",
                },
                {
                    "type": "input_image",
                    "image_url": f"data:image/png;base64,{base64_image2}",
                },
                {
                    "type": "input_image",
                    "file_id": file_id1,
                },
                {
                    "type": "input_image",
                    "file_id": file_id2,
                }
            ],
        }
    ],
    tools=[{"type": "image_generation"}],
)

image_generation_calls = [
    output
    for output in response.output
    if output.type == "image_generation_call"
]

image_data = [output.result for output in image_generation_calls]

if image_data:
    image_base64 = image_data[0]
    with open("gift-basket.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
else:
    print(response.output_text)
```

### Edit an image using a mask

You can provide a mask to indicate which part of the image should be edited.

When using a mask with GPT Image, additional instructions are sent to the model to help guide the editing process accordingly.

Masking with GPT Image is entirely prompt-based. The model uses the mask as guidance, but may not follow its exact shape with complete precision.

If you provide multiple input images, the mask will be applied to the first image.

Responses API

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
from openai import OpenAI
import base64

client = OpenAI()

def create_file(file_path):
    with open(file_path, "rb") as file_content:
        result = client.files.create(file=file_content, purpose="vision")
    return result.id

fileId = create_file("sunlit_lounge.png")
maskId = create_file("mask.png")

response = client.responses.create(
    model="gpt-5.5",
    input=[
        {
            "role": "user",
            "content": [
                {
                    "type": "input_text",
                    "text": "generate an image of the same sunlit indoor lounge area with a pool but the pool should contain a flamingo",
                },
                {
                    "type": "input_image",
                    "file_id": fileId,
                }
            ],
        },
    ],
    tools=[
        {
            "type": "image_generation",
            "quality": "high",
            "input_image_mask": {
                "file_id": maskId,
            }
        },
    ],
)

image_data = [
    output.result
    for output in response.output
    if output.type == "image_generation_call"
]

if image_data:
    image_base64 = image_data[0]
    with open("lounge.png", "wb") as f:
        f.write(base64.b64decode(image_base64))
```

| Image | Mask | Output |
| --- | --- | --- |
| ![Image 7: A pink room with a pool](https://cdn.openai.com/API/docs/images/sunlit_lounge.png) | ![Image 8: A mask in part of the pool](https://cdn.openai.com/API/docs/images/mask.png) | ![Image 9: The original pool with an inflatable flamingo replacing the mask](https://cdn.openai.com/API/docs/images/sunlit_lounge_result.png) |

Prompt: a sunlit indoor lounge area with a pool containing a flamingo

#### Mask requirements

The image to edit and mask must be of the same format and size (less than 50MB in size).

The mask image must also contain an alpha channel. If you’re using an image editing tool to create the mask, make sure to save the mask with an alpha channel.

You can modify a black and white image programmatically to add an alpha channel.

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
from PIL import Image
from io import BytesIO

# 1. Load your black & white mask as a grayscale image
mask = Image.open("mask.png").convert("L")

# 2. Convert it to RGBA so it has space for an alpha channel
mask_rgba = mask.convert("RGBA")

# 3. Then use the mask itself to fill that alpha channel
mask_rgba.putalpha(mask)

# 4. Convert the mask into bytes
buf = BytesIO()
mask_rgba.save(buf, format="PNG")
mask_bytes = buf.getvalue()

# 5. Save the resulting file
img_path_mask_alpha = "mask_alpha.png"
with open(img_path_mask_alpha, "wb") as f:
    f.write(mask_bytes)
```

### Image input fidelity

The `input_fidelity` parameter controls how strongly a model preserves details from input images during edits and reference-image workflows. For `gpt-image-2`, omit this parameter; the API doesn’t allow changing it because the model processes every image input at high fidelity automatically.

Because `gpt-image-2` always processes image inputs at high fidelity, image input tokens can be higher for edit requests that include reference images. To understand the cost implications, refer to the [vision costs](https://developers.openai.com/api/docs/guides/images-vision?api-mode=responses#calculating-costs) section.

You can configure the following output options:

* **Size**: Image dimensions (for example, `1024x1024`, `1024x1536`)
* **Quality**: Rendering quality (for example, `low`, `medium`, `high`)
* **Format**: File output format
* **Compression**: Compression level (0-100%) for JPEG and WebP formats
* **Background**: Opaque or automatic

`size`, `quality`, and `background` support the `auto` option, where the model will automatically select the best option based on the prompt.

`gpt-image-2` doesn’t currently support transparent backgrounds. Requests with `background: "transparent"` aren’t supported for this model.

### Size and quality options

`gpt-image-2` accepts any resolution in the `size` parameter when it satisfies the constraints below. Square images are typically fastest to generate.

Popular sizes*   `1024x1024` (square)

* `1536x1024` (landscape)

* `1024x1536` (portrait)

* `2048x2048` (2K square)

* `2048x1152` (2K landscape)

* `3840x2160` (4K landscape)

* `2160x3840` (4K portrait)

* `auto` (default)
Size constraints*   Maximum edge length must be less than or equal to `3840px`

* Both edges must be multiples of `16px`

* Long edge to short edge ratio must not exceed `3:1`

* Total pixels must be at least `655,360` and no more than `8,294,400`
Quality options*   `low`
* `medium`
* `high`
* `auto` (default)

Use `quality: "low"` for fast drafts, thumbnails, and quick iterations. It is the fastest option and works well for many common use cases before you move to `medium` or `high` for final assets.

Outputs that contain more than `2560x1440` (`3,686,400`) total pixels, typically referred to as 2K, are considered experimental.

### Output format

The Image API returns base64-encoded image data. The default format is `png`, but you can also request `jpeg` or `webp`.

If using `jpeg` or `webp`, you can also specify the `output_compression` parameter to control the compression level (0-100%). For example, `output_compression=50` will compress the image by 50%.

Using `jpeg` is faster than `png`, so you should prioritize this format if latency is a concern.

GPT Image models (`gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`) are powerful and versatile image generation models, but they still have some limitations to be aware of:

* **Latency:** Complex prompts may take up to 2 minutes to process.
* **Text Rendering:** Although significantly improved, the model can still struggle with precise text placement and clarity.
* **Consistency:** While capable of producing consistent imagery, the model may occasionally struggle to maintain visual consistency for recurring characters or brand elements across multiple generations.
* **Composition Control:** Despite improved instruction following, the model may have difficulty placing elements precisely in structured or layout-sensitive compositions.

### Content Moderation

All prompts and generated images are filtered in accordance with our [content policy](https://openai.com/policies/usage-policies/).

For image generation using GPT Image models (`gpt-image-2`, `gpt-image-1.5`, `gpt-image-1`, and `gpt-image-1-mini`), you can control moderation strictness with the `moderation` parameter. This parameter supports two values:

* `auto` (default): Standard filtering that seeks to limit creating certain categories of potentially age-inappropriate content.
* `low`: Less restrictive filtering.

### Handling blocked requests and other errors

Handle image generation failures the same way you handle other API errors: check the HTTP status or SDK exception type, log the request ID, and refer to the [error codes guide](https://developers.openai.com/api/docs/guides/error-codes) for authentication, quota, rate-limit, and server failures. Retries are appropriate for transient failures like `429` and `5xx`, but not for image generation user errors that require changing the request.

Some image generation failures are user-correctable and may return `error.type = "image_generation_user_error"`. Don’t automatically retry these errors without modifying the prompt or input images. For programmatic handling, use `error.code` as the stable discriminator.

When `error.code = "moderation_blocked"`, the error may also include an optional `error.moderation_details` object:

```
1
2
3
4
5
6
7
8
9
10
{
  "error": {
    "type": "image_generation_user_error",
    "code": "moderation_blocked",
    "moderation_details": {
      "moderation_stage": "input",
      "categories": ["harassment"]
    }
  }
}
```

The `moderation_details` object provides coarse debugging context without exposing internal classifier labels or scores.

`moderation_stage` can be:

* `input`: The block came from the prompt or request inputs.
* `output`: The block came from a generated image or downstream output moderation stage.
* `unknown`: A rare fallback when provenance is hard to determine.

`categories` contains coarse public labels. For example, you might see values like `harassment`, `self-harm`, `sexual`, or `violence`.

For most apps, keep the primary end-user message generic. Use `moderation_details` for developer logs, support workflows, analytics, and light remediation hints.

For example, if `harassment` appears, suggest removing abusive or targeting language. If the block happened at the `input` stage, guide the user to revise the prompt. If it happened at the `output` stage, treat it as a generated result safety block and distinguish it in your logs. Always branch on `error.code = "moderation_blocked"` first, and treat `moderation_details` as optional extra context.

```
1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
import OpenAI from "openai";

const openai = new OpenAI();

try {
  // The same error handling pattern applies to image generation requests,
  // image edits, and Responses API tool calls that generate images.
  await openai.images.generate({
    model: "gpt-image-2",
    prompt: "Create a poster humiliating my coworker with insulting captions",
  });
} catch (error) {
  if (error?.code !== "moderation_blocked") {
    throw error;
  }

  const moderationDetails = error?.moderation_details;
  const categories = moderationDetails?.categories ?? [];
  const stage = moderationDetails?.moderation_stage;

  let hint =
    "This request could not be completed because it did not meet safety requirements.";

  if (categories.includes("harassment")) {
    hint =
      "Try removing abusive or targeting language and focus on neutral visual details instead.";
  } else if (stage === "input") {
    hint = "Try revising the prompt or input images and submit the request again.";
  } else if (stage === "output") {
    hint = "The generated result was blocked by a safety check. Try changing the prompt and generating again.";
  }

  console.error("Image generation blocked", {
    request_id: error?.request_id,
    code: error?.code,
    moderation_details: moderationDetails,
  });

  console.log(hint);
}
```

### Supported models

When using image generation in the Responses API, `gpt-5` and newer models should support the image generation tool. [Check the model detail page for your model](https://developers.openai.com/api/docs/models) to confirm if your desired model can use the image generation tool.

### `gpt-image-2` output tokens

For `gpt-image-2`, use the calculator to estimate output tokens from the requested `quality` and `size`:

Quality

Width Height

Output tokens

196

### Models prior to `gpt-image-2`

GPT Image models prior to `gpt-image-2` generate images by first producing specialized image tokens. Both latency and eventual cost are proportional to the number of tokens required to render an image—larger image sizes and higher quality settings result in more tokens.

The number of tokens generated depends on image dimensions and quality:

| Quality | Square (1024×1024) | Portrait (1024×1536) | Landscape (1536×1024) |
| --- | --- | --- | --- |
| Low | 272 tokens | 408 tokens | 400 tokens |
| Medium | 1056 tokens | 1584 tokens | 1568 tokens |
| High | 4160 tokens | 6240 tokens | 6208 tokens |

Note that you will also need to account for [input tokens](https://developers.openai.com/api/docs/guides/images-vision?api-mode=responses#calculating-costs): text tokens for the prompt and image tokens for the input images if editing images. Because `gpt-image-2` always processes image inputs at high fidelity, edit requests that include reference images can use more input tokens.

Refer to the [pricing page](https://developers.openai.com/api/docs/pricing#image-generation) for current text and image token prices, and use the [Calculating costs](http://developers.openai.com/api/docs/guides/image-generation#calculating-costs) section below to estimate request costs.

The final cost is the sum of:

* input text tokens
* input image tokens if using the edits endpoint
* image output tokens

### Calculating costs

Use the pricing calculator below to estimate request costs for GPT Image models. `gpt-image-2` supports thousands of valid resolutions; the table below lists the same sizes used for previous GPT Image models for comparison. For GPT Image 1.5, GPT Image 1, and GPT Image 1 Mini, the legacy per-image output pricing table is also listed below. You should still account for text and image input tokens when estimating the total cost of a request.

A larger non-square resolution can sometimes produce fewer output tokens than a smaller or square resolution at the same quality setting.

| Model | Quality | 1024 x 1024 | 1024 x 1536 | 1536 x 1024 |
| --- | --- | --- | --- | --- |
| GPT Image 2 Additional sizes available | Low | $0.006 | $0.005 | $0.005 |
| Medium | $0.053 | $0.041 | $0.041 |
| High | $0.211 | $0.165 | $0.165 |
| GPT Image 1.5 | Low | $0.009 | $0.013 | $0.013 |
| Medium | $0.034 | $0.05 | $0.05 |
| High | $0.133 | $0.2 | $0.2 |
| GPT Image 1 | Low | $0.011 | $0.016 | $0.016 |
| Medium | $0.042 | $0.063 | $0.063 |
| High | $0.167 | $0.25 | $0.25 |
| GPT Image 1 Mini | Low | $0.005 | $0.006 | $0.006 |
| Medium | $0.011 | $0.015 | $0.015 |
| High | $0.036 | $0.052 | $0.052 |

### Partial images cost

If you want to [stream image generation](http://developers.openai.com/api/docs/guides/image-generation#streaming) using the `partial_images` parameter, each partial image will incur an additional 100 image output tokens.
