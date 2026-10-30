# Lunare Global — website

A single-page, scroll-driven site for Lunare Global. A moon rises from the horizon as the visitor scrolls, then fills with light and settles behind the closing call to action.

**Stack:** Next.js 16 (App Router, static export-ready) · React 19 · Tailwind CSS 4 · GSAP 3 + ScrollTrigger. No 3D libraries.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
```

Production build:

```bash
npm run build
npm start            # serves the production build on :3000
```

## Deploy

**Vercel (recommended).** Push this folder to a Git repository, then import it at vercel.com/new. The framework is detected automatically, so no settings are needed. Then add `lunareglobal.com` under Project → Settings → Domains.

**Any Node host.** Run `npm run build && npm start` behind your proxy.

**Static hosting (Netlify, S3, Cloudflare Pages).** The page is fully static. Add `output: "export"` to `next.config.ts` and run `npm run build`, which writes the site to `out/`. With static export, the `/moon/*` cache headers in `next.config.ts` don't apply, so set them on the host instead.

## Before launch, check

- **Contact email:** `lib/site.ts` → `site.contact.email` is set to `hello@lunareglobal.com`. This address **could not be verified** from the public site during the build. Replace it with Lunare's real inbox. Every CTA and mailto link reads from this one value.
- **Copy:** all business facts come from the current lunareglobal.com. That covers paid media execution for in-house performance and growth teams, the founder Sanjana Morris, the service areas and the working principles. No statistics, clients or testimonials were added. Review the wording in `lib/site.ts` and `components/sections/*`.

## How it's built

```
app/
  layout.tsx          metadata, fonts (self-hosted via @fontsource), preload
  page.tsx            section order + JSON-LD
  globals.css         design tokens, stage/moon styles, type
components/
  MoonStage.tsx       fixed background: sky, stars, moon, orbit ring, horizon
  ScrollEffects.tsx   restrained one-shot content reveals + process line
  Nav.tsx, Footer.tsx, Logo.tsx, Starfield.tsx
  sections/           Hero, About, Services, Process, Why, Contact
lib/site.ts           all content + contact config
public/moon/          moon renders (WebP 1000/1800), generated at build if missing
scripts/generate-moon.py  procedural moon renderer (source of the assets)
```

### The moon animation

- `MoonStage` is a `position: fixed` layer behind `<main>`. Content scrolls normally over it, and native scrolling is never hijacked.
- There is one GSAP timeline, scrubbed by a ScrollTrigger from the top of the page to the bottom. Each section has a keyframe in `DESKTOP` / `MOBILE` (`MoonStage.tsx`). A keyframe holds the moon's position, scale and opacity, plus its shade (illumination), glow, ambient light, horizon and readability scrim.
- Keyframes are placed where each section's top crosses mid-viewport, so the moon arrives with its content. They are recomputed whenever ScrollTrigger refreshes, for example on resize.
- Only `transform` and `opacity` are animated, and there are no CSS filters on animated layers.
- In "How we work" an instrument-style orbit ring appears around the moon and turns with scroll.
- **Below 1024px** the moon stays centred and dims behind the copy, with lighter scrubbing.
- **`prefers-reduced-motion`**: there is no scrubbing and no reveals. The page shows a single calm composition with the moon resting at the right edge.
- **Without JavaScript**, the CSS default is the same static composition, and all content is visible in the HTML.

### The moon asset

The moon image is rendered procedurally by `scripts/generate-moon.py`, using numpy and Pillow. The maria sit at their real selenographic positions, the craters follow a power-law size distribution, and Tycho and Copernicus have ray systems. Because of this, the asset is original and needs no licence. To re-render it:

```bash
python3 scripts/generate-moon.py moon-master.png 2048
convert moon-master.png -resize 1800x1800 -quality 86 public/moon/moon-1800.webp
convert moon-master.png -resize 1000x1000 -quality 84 public/moon/moon-1000.webp
```

To use a photograph instead, such as NASA LRO imagery, which is public domain, drop a square PNG with transparency into `public/moon/` under the same names.

## Search & LLM crawlability

- All copy is server-rendered static HTML, so crawlers that don't run JavaScript still see every section. Animations only enhance content that is already there.
- `/llms.txt` and `/llms-full.txt` (see [llmstxt.org](https://llmstxt.org)) are generated from `lib/site.ts`. The page links to them with `<link rel="alternate" type="text/markdown">`.
- `robots.txt` allows all crawlers and names the major AI crawlers explicitly, including GPTBot, ClaudeBot, PerplexityBot and Google-Extended.
- JSON-LD (`lib/structured-data.ts`) describes the business as a `ProfessionalService` with its founder, audience and an `OfferCatalog` of the four services. It also includes `WebSite` and `WebPage` entries.
- To change any copy, edit `copy`, `services`, `process` or `differentiators` in `lib/site.ts`. The page, the llms files and the structured data all update together.
