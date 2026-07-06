# Prompting Guide

Title: FLUX Prompting Guide - Black Forest Labs

URL Source: <http://docs.bfl.ai/guides/prompting_summary>

Published Time: Thu, 18 Jun 2026 18:30:52 GMT

Markdown Content:

# FLUX Prompting Guide - Black Forest Labs

> ## Documentation Index
>
>
> Fetch the complete documentation index at: [/llms.txt](http://docs.bfl.ai/llms.txt)
>
>
> Use this file to discover all available pages before exploring further.

[Skip to main content](http://docs.bfl.ai/guides/prompting_summary#content-area)

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

Image Generation with FLUX

FLUX Prompting Guide

[Documentation](http://docs.bfl.ai/quick_start/introduction)[Prompting Guide](http://docs.bfl.ai/guides/prompting_summary)[API Reference](http://docs.bfl.ai/api-reference/utility/get-result)[Release Notes](http://docs.bfl.ai/release-notes)

* [Documentation](http://docs.bfl.ai/quick_start/introduction)
* [Prompting Guide](http://docs.bfl.ai/guides/prompting_summary)
* [BFL Homepage](https://bfl.ai/)
* [Help Center](https://help.bfl.ai/)

### Image Generation with FLUX

* [Overview](http://docs.bfl.ai/guides/prompting_summary)
* [Prompting Basics](http://docs.bfl.ai/guides/prompting_unified_basics)
* [Building a Good Prompt](http://docs.bfl.ai/guides/prompting_unified_building)
* [Style, Aesthetics & Text](http://docs.bfl.ai/guides/prompting_unified_style)
* [Technical Parameters](http://docs.bfl.ai/guides/prompting_unified_technical)
* [Prompt Reference](http://docs.bfl.ai/guides/prompting_unified_reference)

### Image Editing with FLUX

* [Image Editing](http://docs.bfl.ai/guides/prompting_editing_overview)
* [Single-Reference Editing](http://docs.bfl.ai/guides/prompting_editing_single_reference)
* [Multi-Reference Editing](http://docs.bfl.ai/guides/prompting_editing_multi_reference)

### Use Cases with FLUX

* [Use Cases](http://docs.bfl.ai/guides/prompting_unified_usecases)
* Text-to-Image Use Cases  
* Editing Use Cases  

Image Generation with FLUX

# FLUX Prompting Guide

Copy page

Learn how to prompt FLUX — from the basics to advanced techniques.

Copy page

Welcome to the official **FLUX** Prompting Guide. Whether you’re just getting started or looking to refine your results, this guide walks you through everything you need to get the most out of FLUX — from crafting your first prompt to mastering advanced techniques.

![Image 3: A cinematic long shot with the camera positioned half underwater and half above the surface, showing a whale diving in the open ocean](https://cdn.sanity.io/images/2gpum2i6/production/055402a70efb2876f1f70549374d7a37d71918f7-1504x1008.png)

This guide covers prompting for the entire FLUX model family — FLUX.1, FLUX.1 Kontext and FLUX.2. Where behavior differs meaningfully between models, we’ll call it out explicitly.If you’re still choosing a model, see [Which Model to Choose?](http://docs.bfl.ai/flux_2/flux2_overview#which-model-to-choose) in the FLUX.2 overview.

## [Prompt Basics How FLUX reads prompts — structure, word order, and what actually matters.](http://docs.bfl.ai/guides/prompting_unified_basics)

## [Editing Workflows Single-reference and multi-reference editing with FLUX.2.](http://docs.bfl.ai/guides/prompting_editing_overview)

## [Use Cases Photorealism, typography, style transfer, and more — with example prompts.](http://docs.bfl.ai/guides/prompting_unified_usecases)

## [Model Comparison Which FLUX.2 variant fits your workflow.](http://docs.bfl.ai/flux_2/flux2_overview#which-model-to-choose)

Was this page helpful?

Yes No

[Prompting Basics Next](http://docs.bfl.ai/guides/prompting_unified_basics)

Ctrl+I

[Black Forest Labs home page![Image 4: light logo](https://mintcdn.com/bfl/OQ5B17YmedKOM4zs/logo/logo_light.png?fit=max&auto=format&n=OQ5B17YmedKOM4zs&q=85&s=a11f73fac1ef9254cffa5eb412269198)![Image 5: dark logo](https://mintcdn.com/bfl/OQ5B17YmedKOM4zs/logo/logo_dark.png?fit=max&auto=format&n=OQ5B17YmedKOM4zs&q=85&s=d933d5452b84db18fc87cd6321e33d08)](http://docs.bfl.ai/)

[x](https://x.com/bfl_ai)[github](https://github.com/black-forest-labs)[linkedin](https://www.linkedin.com/company/bflai)

Legal

[Impressum](https://bfl.ai/legal/imprint)[Developer Terms of Service](https://bfl.ai/legal/developer-terms-of-service)[Flux API Service Terms](https://bfl.ai/legal/flux-api-service-terms)[Terms of Use](https://bfl.ai/legal/terms-of-use)[Responsible AI Development Policy](https://bfl.ai/legal/responsible-ai-development-policy)[Usage Policy](https://bfl.ai/legal/usage-policy)[Intellectual Property Policy](https://bfl.ai/legal/intellectual-property-policy)[Privacy Policy](https://bfl.ai/legal/privacy-policy)

Company

[Careers](https://bfl.ai/careers)[Help Center](https://help.bfl.ai/)[Contact](https://bfl.ai/contact)

[x](https://x.com/bfl_ai)[github](https://github.com/black-forest-labs)[linkedin](https://www.linkedin.com/company/bflai)

[Powered by This documentation is built and hosted on Mintlify, a developer documentation platform](https://www.mintlify.com/?utm_campaign=poweredBy&utm_medium=referral&utm_source=bfl)

![Image 6: A cinematic long shot with the camera positioned half underwater and half above the surface, showing a whale diving in the open ocean](https://cdn.sanity.io/images/2gpum2i6/production/055402a70efb2876f1f70549374d7a37d71918f7-1504x1008.png)
