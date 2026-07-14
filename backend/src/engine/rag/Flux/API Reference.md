# API Reference

Title: Get Result - Black Forest Labs

URL Source: <http://docs.bfl.ai/api-reference/utility/get-result>

Markdown Content:

# Get Result - Black Forest Labs

> ## Documentation Index
>
>
> Fetch the complete documentation index at: [/llms.txt](http://docs.bfl.ai/llms.txt)
>
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](http://docs.bfl.ai/api-reference/utility/get-result#content-area)

Introducing the official FLUX MCP • [Try now](https://mcp.bfl.ai/)

[Black Forest Labs home page![Image 1: light logo](https://mintcdn.com/bfl/OQ5B17YmedKOM4zs/logo/logo_light.png?fit=max&auto=format&n=OQ5B17YmedKOM4zs&q=85&s=a11f73fac1ef9254cffa5eb412269198)![Image 2: dark logo](https://mintcdn.com/bfl/OQ5B17YmedKOM4zs/logo/logo_dark.png?fit=max&auto=format&n=OQ5B17YmedKOM4zs&q=85&s=d933d5452b84db18fc87cd6321e33d08)](http://docs.bfl.ai/)

Search...

Ctrl K

* [Help Center](https://help.bfl.ai/)
* [API Status](https://status.bfl.ai/)
* [API Pricing](https://bfl.ai/pricing)
* [Get API Key](https://dashboard.bfl.ai/)
* [Get API Key](https://dashboard.bfl.ai/)

Search...

Navigation

General

Get Result

[Documentation](http://docs.bfl.ai/quick_start/introduction)[Prompting Guide](http://docs.bfl.ai/guides/prompting_summary)[API Reference](http://docs.bfl.ai/api-reference/utility/get-result)[Release Notes](http://docs.bfl.ai/release-notes)

* [Documentation](http://docs.bfl.ai/quick_start/introduction)
* [Prompting Guide](http://docs.bfl.ai/guides/prompting_summary)
* [BFL Homepage](https://bfl.ai/)
* [Help Center](https://help.bfl.ai/)

### General

* [GET Get Result](http://docs.bfl.ai/api-reference/utility/get-result)
* [GET Get the user's credits](http://docs.bfl.ai/api-reference/get-the-users-credits)

### FLUX.2 Models

* [POST FLUX.2 [max]](http://docs.bfl.ai/api-reference/models/generate-or-edit-an-image-with-flux2-[max])
* [POST FLUX.2 [pro]](http://docs.bfl.ai/api-reference/models/generate-or-edit-an-image-with-flux2-[pro])
* [POST FLUX.2 [pro] (preview)](http://docs.bfl.ai/api-reference/models/generate-or-edit-an-image-with-flux2-[pro]-preview)
* [POST FLUX.2 [flex]](http://docs.bfl.ai/api-reference/models/generate-or-edit-an-image-with-flux2-[flex])

### FLUX.2 Klein Models

* [POST FLUX.2 [klein] 9B (preview)](http://docs.bfl.ai/api-reference/models/generate-or-edit-an-image-with-flux2-[klein]-9b-preview)
* [POST FLUX.2 [klein] 9B](http://docs.bfl.ai/api-reference/models/generate-or-edit-an-image-with-flux2-[klein]-9b)
* [POST FLUX.2 [klein] 4B](http://docs.bfl.ai/api-reference/models/generate-or-edit-an-image-with-flux2-[klein]-4b)

### Tools

* [POST Outpaint or extend an image](http://docs.bfl.ai/api-reference/models/outpaint-or-extend-an-image)
* [POST Erase an object from an image](http://docs.bfl.ai/api-reference/models/erase-an-object-from-an-image)
* [POST Virtual try-on](http://docs.bfl.ai/api-reference/models/virtual-try-on)

### Legacy Models

* [POST FLUX.1 Kontext [pro]](http://docs.bfl.ai/api-reference/models/edit-or-create-an-image-with-flux1-kontext-[pro])
* [POST FLUX.1 Kontext [max]](http://docs.bfl.ai/api-reference/models/edit-or-create-an-image-with-flux1-kontext-[max])
* [POST FLUX1.1 [pro]](http://docs.bfl.ai/api-reference/models/generate-an-image-with-flux11-[pro])
* [POST FLUX1.1 [pro] ultra](http://docs.bfl.ai/api-reference/models/generate-an-image-with-flux11-[pro]-ultra-mode)
* [POST FLUX.1 [dev]](http://docs.bfl.ai/api-reference/models/generate-an-image-with-flux1-[dev])
* [POST FLUX.1 Fill [pro]](http://docs.bfl.ai/api-reference/models/inpaint-an-image-with-flux1-fill-[pro]-using-an-input-image-and-mask)
* [POST FLUX.1 Expand [pro]](http://docs.bfl.ai/api-reference/models/expand-an-image-with-flux1-expand-[pro]-by-adding-pixels-on-any-side)

### Fine-tuning

* [GET Finetune Details](http://docs.bfl.ai/api-reference/utility/finetune-details)
* [GET My Finetunes](http://docs.bfl.ai/api-reference/utility/my-finetunes)
* [POST Delete Finetune](http://docs.bfl.ai/api-reference/utility/delete-finetune)
* [POST Generate an image with FLUX 1.1 [pro] finetune with ultra mode.](http://docs.bfl.ai/api-reference/models/generate-an-image-with-flux-11-[pro]-finetune-with-ultra-mode)
* [POST Generate an image with FLUX.1 Fill [pro] finetune using an input image and mask.](http://docs.bfl.ai/api-reference/models/generate-an-image-with-flux1-fill-[pro]-finetune-using-an-input-image-and-mask)

### Licensing

* Models  

Get Result

cURL

```
curl --request GET \
  --url https://api.bfl.ai/v1/get_result
```

200

422

```
{
  "id": "<string>",
  "result": null,
  "progress": 123,
  "details": {},
  "preview": {}
}
```

General

# Get Result

Copy page

An endpoint for getting generation task result.

Copy page

GET

/

v1

/

get_result

Try it

Get Result

cURL

```
curl --request GET \
  --url https://api.bfl.ai/v1/get_result
```

200

422

```
{
  "id": "<string>",
  "result": null,
  "progress": 123,
  "details": {},
  "preview": {}
}
```

#### Query Parameters

[​](http://docs.bfl.ai/api-reference/utility/get-result#parameter-id)

id

string

required

#### Response

200

application/json

Successful Response

[​](http://docs.bfl.ai/api-reference/utility/get-result#response-id)

id

string

required

Task id for retrieving result

[​](http://docs.bfl.ai/api-reference/utility/get-result#response-status)

status

enum<string>

required

Available options:

`Task not found`,

`Pending`,

`Request Moderated`,

`Content Moderated`,

`Ready`,

`Error`

[​](http://docs.bfl.ai/api-reference/utility/get-result#response-result)

result

unknown

[​](http://docs.bfl.ai/api-reference/utility/get-result#response-progress-one-of-0)

progress

number | null

[​](http://docs.bfl.ai/api-reference/utility/get-result#response-details-one-of-0)

details

Details · object

[​](http://docs.bfl.ai/api-reference/utility/get-result#response-preview-one-of-0)

preview

Preview · object

Was this page helpful?

Yes No

[Get the user's credits Next](http://docs.bfl.ai/api-reference/get-the-users-credits)

Ctrl+I

[Black Forest Labs home page![Image 3: light logo](https://mintcdn.com/bfl/OQ5B17YmedKOM4zs/logo/logo_light.png?fit=max&auto=format&n=OQ5B17YmedKOM4zs&q=85&s=a11f73fac1ef9254cffa5eb412269198)![Image 4: dark logo](https://mintcdn.com/bfl/OQ5B17YmedKOM4zs/logo/logo_dark.png?fit=max&auto=format&n=OQ5B17YmedKOM4zs&q=85&s=d933d5452b84db18fc87cd6321e33d08)](http://docs.bfl.ai/)

[x](https://x.com/bfl_ai)[github](https://github.com/black-forest-labs)[linkedin](https://www.linkedin.com/company/bflai)

Legal

[Impressum](https://bfl.ai/legal/imprint)[Developer Terms of Service](https://bfl.ai/legal/developer-terms-of-service)[Flux API Service Terms](https://bfl.ai/legal/flux-api-service-terms)[Terms of Use](https://bfl.ai/legal/terms-of-use)[Responsible AI Development Policy](https://bfl.ai/legal/responsible-ai-development-policy)[Usage Policy](https://bfl.ai/legal/usage-policy)[Intellectual Property Policy](https://bfl.ai/legal/intellectual-property-policy)[Privacy Policy](https://bfl.ai/legal/privacy-policy)

Company

[Careers](https://bfl.ai/careers)[Help Center](https://help.bfl.ai/)[Contact](https://bfl.ai/contact)

[x](https://x.com/bfl_ai)[github](https://github.com/black-forest-labs)[linkedin](https://www.linkedin.com/company/bflai)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=bfl)
