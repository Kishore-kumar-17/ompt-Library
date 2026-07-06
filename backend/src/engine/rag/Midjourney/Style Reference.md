# Style Reference

Title: Style Reference

URL Source: <http://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference>

Markdown Content:

### Want to match the look and feel of another image? You can provide Midjourney with a Style Reference

![Image 1: style-ref-header-v7.png](http://docs.midjourney.com/hc/article_attachments/37412423919629)

For more information about V8.1, see our [Version](http://docs.midjourney.com/hc/en-us/articles/32199405667853) article.

## What is a Style Reference?

A Style Reference is a way to capture the visual vibe of an existing image and apply it to your new Midjourney creations. It doesn't copy objects or people, just the overall style—like colors, medium, textures, or lighting—helping you achieve a consistent visual theme.

Style References are compatible with Midjourney [versions](http://docs.midjourney.com/hc/en-us/articles/32199405667853) 6 and later.

**Video tutorial:** Watch this quick [video tutorial on Style References](https://youtu.be/tx0DPppldwU?si=05v9J0JLegidPnDs) below.

## Using a Style Reference

* To add an image to your prompt, start by clicking on the image ![Image 2: image-icon.svg](http://docs.midjourney.com/hc/article_attachments/32180035478541) icon in the Imagine bar. This opens the images panel, allowing you to upload new images or pick from those you've already uploaded. You can even select multiple images to use in your prompt!

![Image 3: web-style-reference.png](http://docs.midjourney.com/hc/article_attachments/32181174394253)

Drag and drop your image from the uploads library into the Style Reference section. To remove your image from the Imagine bar, hover your mouse over it and click the X icon.

If you want to use your images with multiple prompts, click the lock icon ![Image 4: lock-icon.svg](http://docs.midjourney.com/hc/article_attachments/34019581934477) to keep your images pinned to the Imagine bar.

**Image Reference Types:**

![Image 5: video-frame-icon.svg](http://docs.midjourney.com/hc/article_attachments/38169026373517)[Starting Frame](http://docs.midjourney.com/hc/en-us/articles/37460773864589)

![Image 6: image-prompt-icon.svg](http://docs.midjourney.com/hc/article_attachments/32365787270925)[Image Prompt](http://docs.midjourney.com/hc/en-us/articles/32040250122381)

![Image 7: style-reference-icon.svg](http://docs.midjourney.com/hc/article_attachments/32181269857293) Style Reference

![Image 8: character-reference-icon.svg](http://docs.midjourney.com/hc/article_attachments/32180035481357)[Omni Reference](http://docs.midjourney.com/hc/en-us/articles/36285124473997) (V7)

* To use a Style Reference in Discord, start by adding the `--sref` parameter to the end of your prompt, then pasting your image URL. If you want to use multiple images, separate each URL with a space.
![Image 9: discord-sref.png](http://docs.midjourney.com/hc/article_attachments/32181174395021)

It's important to ensure that you have a valid image URL, meaning the image should already be online. If your image is stored on your computer or device, you can [host it on Discord](http://docs.midjourney.com/hc/en-us/articles/32558957919117) to generate an image URL.

## Best Practices

* **Keep text prompts simple** - Avoid adding style words that might conflict with your reference image's look.
* **Add style words selectively** - If achieving a specific style is difficult, include descriptive words that match your reference image.
* **Focus on content, not instructions** - Use your text prompt to describe what you want to see, not how Midjourney should modify the reference image.

#### ![Image 10: thumb-down-icon.svg](http://docs.midjourney.com/hc/article_attachments/32180035477645) Bad Prompt Examples

![Image 11: image-icon.svg](http://docs.midjourney.com/hc/article_attachments/32180035478541) the look of this image but a dog

![Image 12: image-icon.svg](http://docs.midjourney.com/hc/article_attachments/32180035478541) copy this style and make a bunny

#### ![Image 13: thumb-up-icon.svg](http://docs.midjourney.com/hc/article_attachments/32180011127821) Good Prompt Examples

![Image 14: image-icon.svg](http://docs.midjourney.com/hc/article_attachments/32180035478541) detailed portrait of a dog

![Image 15: image-icon.svg](http://docs.midjourney.com/hc/article_attachments/32180035478541) ballpoint pen sketch of a bunny

## Style Weight

The style weight parameter `--sw`, allows you to control how strongly the style of your reference influences your new image. You can set this parameter to any value between 0 and 1000, with the default being `--sw 100`. If using V7, you may notice that style weight has more impact when used with style codes than with images.

Note:`--sw` is not compatible with [Moodboards](http://docs.midjourney.com/hc/en-us/articles/32433330574221).

![Image 16: style-ref-weights.png](http://docs.midjourney.com/hc/article_attachments/33726060931981)

## Style Reference Codes

Instead of uploading an image as your Style Reference, you can use a Style Reference Code to apply a specific look from the Midjourney internal style library. Each numerical code produces a unique visual style, and can be used by adding `--sref <code>` to the end of your prompt.

Use `--sref random` in your prompt and Midjourney will apply a random style code. After submitting your prompt, "random" converts to a style code.

Once your prompt has a style code, using rerun/reroll or variations keeps the same style code. If you use `--sref random` with a [permutation](http://docs.midjourney.com/hc/en-us/articles/32761322355597) or [repeat](http://docs.midjourney.com/hc/en-us/articles/32757107922061) prompt, each image will have a different style code.

You can use the `--sw` parameter with style codes to adjust the influence they have on your image. You can also mix style codes by using more than one, and combine images with style codes.

You cannot create a style code based on an uploaded image. See the [instructions above](http://docs.midjourney.com/hc/en-us/articles/32180011136653-Style-Reference#h_01JCRMPT77EVWXDF6X1DG95BK0) to use an uploaded image as a Style Reference.

Note: The Style Reference feature was updated between V6 and V7, and older style codes may not produce the same styles anymore. To use old codes, add `--sv 4` to your prompt (uses the old V7 model) or switch to V6.

## Style Explorer

The Style Explorer is a visual way to discover new style codes and find inspiration for your creations. You can browse style codes, try them instantly, and even save your favorites for later.

1. Open the [Explore Page](https://www.midjourney.com/explore) and click the ![Image 17: standard-profile-icon.svg](http://docs.midjourney.com/hc/article_attachments/39337446169869)**Styles** tab in the top-right corner
2. Use the sorting buttons in the top-left to switch between:
    *Random style codes to discover new looks
    *   Popular style codes favored by the Midjourney community

3. Use the search bar and type things like "photographic" or "anime" and the fuzzy search will try to show you corresponding style codes

![Image 18: style-explorer.png](http://docs.midjourney.com/hc/article_attachments/39337446171021)

Click any style code to open a gallery of example images that showcase its unique look. From there, you can:

If you find a style code you love, hit the ![Image 19: heart-icon.svg](http://docs.midjourney.com/hc/article_attachments/39337446173581)**Like** button to save it. Your favorites are collected under the **Likes** tab, making it easy to revisit and reuse your go-to style codes whenever inspiration strikes.

Note: Liking style codes does not affect your [Personalization](https://docs.midjourney.com/hc/en-us/articles/32433330574221-Personalization) profiles.

If you're interested in creating your own custom style codes, see our [Style Creator](http://docs.midjourney.com/hc/en-us/articles/41308374558221) article.

* There are six versions of the Style Reference feature in Midjourney version 7 when using images. Use the `--sv` parameter to choose between them.

`--sv 6` is default.

`--sv 4` is the old V7 sref model (prior to June 16, 2025).

Each version offers a unique way of interpreting and applying your Style Reference, so experiment and see what works best for you!

Note: Sref random and sref codes are only compatible with `--sv 4` and `--sv 6`

![Image 20: style-ref-versions-v7.png](http://docs.midjourney.com/hc/article_attachments/37415853030029)

* There are four versions of the Style Reference feature in Midjourney version 6. Use the `--sv` parameter to choose between them. `--sv 4` is default. Each version may offer a unique way of interpreting and applying your Style Reference, so experiment and see what works best for you!

`--sv 1` The original style reference algorithm, more “vibey”

`--sv 2` The second iteration of style references

`--sv 3` An updated version of the more “vibey” `--sv 1`

`--sv 4` An updated version of `--sv 2`

![Image 21: style-ref-versions.png](http://docs.midjourney.com/hc/article_attachments/34551954327181)

Note: style reference version (`--sv`) is not compatible with [Moodboards](http://docs.midjourney.com/hc/en-us/articles/32433330574221).

* • For your prompts to work, you need a text prompt in combination with your Style Reference.

• Your image file should end in .png, .gif, .webp, .jpg, or .jpeg.

• Style Reference can be combined with [Character References](http://docs.midjourney.com/hc/en-us/articles/32162917505293)/[Omni References](http://docs.midjourney.com/hc/en-us/articles/36285124473997) and [Image Prompts](http://docs.midjourney.com/hc/en-us/articles/32040250122381).

• When using Midjourney in Discord, individual Style References can also be assigned different weights: `--sref URL1::2 URL2::1 URL3::1` For more information on how weights work, see our article on [Multi-Prompts & Weights](http://docs.midjourney.com/hc/en-us/articles/32658968492557).
