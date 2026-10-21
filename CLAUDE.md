# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server (after build)
```

No test suite is configured.

## Architecture

This is a **single-page Next.js 15 portfolio site** (App Router) using React 19, TypeScript, and Tailwind CSS v4.

- `src/app/page.tsx` — The entire homepage (the "Wall Index") lives here as a `'use client'` component. All data (projects, work experience, journal, songs) is defined inline as constants at the top of this file, and all of its CSS is the `WALL_CSS` string, injected by `<WallStyles/>`.
- `src/app/layout.tsx` — Sets metadata, JSON-LD structured data, and loads the Google Fonts.
- `src/app/opengraph-image.tsx` / `twitter-image.tsx` — The link-preview card, rendered at build time with `next/og`. Its colors are hardcoded copies of the wall tokens.
- `src/app/api/spotify/route.ts` — Server-side Spotify proxy for the songs card. Spotify rate-limits this app hard, so the route caches the token, memoizes responses for 30s, refreshes top tracks hourly, and backs off per endpoint on 429.
- `src/app/globals.css` — Tailwind v4 base and a few global rules (including a 44px min tap size for links/buttons on phones).
- `src/app/prev/` — The previous design, kept at `/prev`. It is the only user of `src/components/Reveal.tsx`, `github-graph-simple.tsx`, and `work-experience.tsx`.
- `src/components/ui/button.tsx`, `src/lib/utils.ts` — shadcn/ui leftovers, currently unused.

### SEO constraint

Everything on the homepage must be in the server HTML. Don't gate the wall behind client state:
- The cat splash is an overlay on top of the already-rendered wall; `.wall.booting` pauses entrance animations until it goes.
- Modals (`WModal`) and their tab panels are always rendered and hidden with the `hidden` attribute, not unmounted. `WModal` remounts its content on close so each open starts fresh.

## Design System

The homepage is dark. Colors are CSS variables on `:root` in `WALL_CSS`, read in components through the `W` object — never hardcode hex values in components:

| Variable | Value | Usage |
|---|---|---|
| `--wall-bg` | `#101113` | Page background |
| `--wall-bg-deep` | `#090a0c` | Deep card background (work card) |
| `--wall-card` | `#17181b` | Modal and card surfaces |
| `--wall-ink` | `#e8e5de` | Primary text, strong borders |
| `--wall-ink-soft` | `#8f939a` | Secondary text |
| `--wall-line` | `#2d3035` | Hairlines and grid lines |
| `--wall-accent` | `oklch(0.70 0.19 28)` | Coral accent: highlights, ink marks |

**Typography** (all loaded in `layout.tsx`):
- `.wserif` — Instrument Serif: headlines and body copy
- `.wmono` — JetBrains Mono: labels, indexes, metadata
- `.ink-hand` — Playwrite HU: handwritten margin notes in the ink layer
- Work Sans: base UI font on `.wall`

**Ink layer:** hand-drawn notes and doodles drawn over the grid. Path data lives in the `INK` object; render with `<Ink>`, `<InkNote>`, and `<ScribbleLink>`. Strokes draw in only once `.wall` has `.inked` (after the welcome modal closes), and appear fully drawn under `prefers-reduced-motion`.

## Adding Content

To add a new project, add an entry to the `projectsData` object in `src/app/page.tsx` under `serious`, `fun`, or `more`. Each entry follows the `Project` interface defined at the top of that file.

## Environment Variables

- `NEXT_PUBLIC_SITE_URL` — production URL (falls back to `http://localhost:3000`)
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — Google Search Console verification token
