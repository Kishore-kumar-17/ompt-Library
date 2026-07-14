# Character Reference

Title: Character Reference

URL Source: <http://docs.midjourney.com/hc/en-us/articles/32162917505293-Character-Reference>

Markdown Content:

### Want to use the same character in multiple images and scenes? You can provide Midjourney with a Character Reference

![Image 1: character-ref-header-new.png](https://docs.midjourney.com/hc/article_attachments/35587406260877)

When using V7, use [Omni Reference](https://docs.midjourney.com/hc/en-us/articles/36285124473997) instead. For more information about V8.1, see our [Version](https://docs.midjourney.com/hc/en-us/articles/32199405667853) article.

## What is a Character Reference?

A Character Reference allows you to recreate a specific character in multiple images.

By using a picture of a character you like, Midjourney can recognize the character's features, like hair color, clothes, and facial traits, and use these details for generating the character in new scenes. This helps maintain consistency across different images.

## Using a Character Reference

* To add an image to your prompt, start by clicking on the image ![Image 2: image-icon.svg](https://docs.midjourney.com/hc/article_attachments/32168458993421) icon in the Imagine bar. This opens the images panel, allowing you to upload new images or pick from those you've already uploaded.

![Image 3: new-character-ref-ui.png](https://docs.midjourney.com/hc/article_attachments/35587413100429)

Drag and drop your image from the uploads library into the Character Reference section. To remove your image from the Imagine bar, hover your mouse over it and click the X icon.

If you want to use your images with multiple prompts, click the lock icon ![Image 4: lock-icon.svg](https://docs.midjourney.com/hc/article_attachments/34019527842445) to keep your images pinned to the Imagine bar.

**Image Reference Types:**

![Image 5: video-frame-icon.svg](https://docs.midjourney.com/hc/article_attachments/38169570364429)[Starting Frame](https://docs.midjourney.com/hc/en-us/articles/37460773864589)

![Image 6: image-prompt-icon.svg](https://docs.midjourney.com/hc/article_attachments/32365078878477)[Image Prompt](https://docs.midjourney.com/hc/en-us/articles/32040250122381)

![Image 7: style-reference-icon.svg](https://docs.midjourney.com/hc/article_attachments/32365078888589)[Style Reference](https://docs.midjourney.com/hc/en-us/articles/32180011136653)

![Image 8: character-reference-icon.svg](https://docs.midjourney.com/hc/article_attachments/32168806889741)[Omni Reference](https://docs.midjourney.com/hc/en-us/articles/36285124473997) (replaces Character Reference in V7)

* To use a Character Reference in Discord, start by adding the `--cref` parameter to the end of your prompt, then pasting your image URL. If you want to use multiple images, separate each URL with a space.

![Image 9: discord-cref.png](https://docs.midjourney.com/hc/article_attachments/32169938615309)

It's important to ensure that you have a valid image URL, meaning the image should already be online. If your image is stored on your computer or device, you can [host it on Discord](https://docs.midjourney.com/hc/en-us/articles/32558957919117) to generate an image URL.

## Best Practices

* **Use Midjourney Images:** For best results, start with an image of a single character created by Midjourney. Images of real people typically won't look exactly like them.
* **Limit Character References:** While you can use more than one image of the same character, it's often not necessary.
* **Account for Details:** Be aware that intricate details like specific freckles or logos on clothing might not come out exactly right.
* **Use Detailed Text Prompts:** Combine your character reference with a clear text prompt. Text is just as important for conveying the full scene and additional details beyond what the reference image shows.

#### ![Image 10: thumb-down-icon.svg](https://docs.midjourney.com/hc/article_attachments/32168458988941) Bad Prompt Examples

![Image 11: image-icon.svg](https://docs.midjourney.com/hc/article_attachments/32168458993421) put this man in a cafe

![Image 12: image-icon.svg](https://docs.midjourney.com/hc/article_attachments/32168458993421) add this man to a cafe setting

#### ![Image 13: thumb-up-icon.svg](https://docs.midjourney.com/hc/article_attachments/32168458999565) Good Prompt Examples

![Image 14: image-icon.svg](https://docs.midjourney.com/hc/article_attachments/32168458993421) a man with blue hair and gold glasses sitting in a cafe

![Image 15: image-icon.svg](https://docs.midjourney.com/hc/article_attachments/32168458993421) illustration of a man sitting alone in a cafe

## Character Weight

The character weight parameter `--cw` acts like a dial that lets you choose how much detail from your reference image shows up in your new image.

By default, with `--cw 100`, Midjourney includes as much detail as possible, like the face, hair, and clothing. If you turn the dial down to `--cw 0`, the focus will mainly be on the character's face. This gives you the flexibility to adjust how much detail is pulled from your reference image.

Midjourney uses Image Prompts and references as inspiration to guide new creations, not to copy them exactly. If you're not getting exactly the results you want, check out the [Editor](https://docs.midjourney.com/hc/en-us/articles/32764383466893).

* • For your prompts to work, you need a text prompt in combination with your Character Reference.

• Your image file should end in .png, .gif, .webp, .jpg, or .jpeg.

• Character Reference can be used with Midjourney and Niji version 6.

• Character Reference can be combined with [Style References](https://docs.midjourney.com/hc/en-us/articles/32180011136653) and [Image Prompts](https://docs.midjourney.com/hc/en-us/articles/32040250122381).
