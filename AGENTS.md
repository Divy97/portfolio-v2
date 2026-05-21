# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server (after build)
```

No test suite is configured.

## Architecture

This is a **single-page Next.js 15 portfolio site** (App Router) using React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

- `src/app/page.tsx` — The entire portfolio lives here as a `'use client'` component. All data (projects, work experience) is defined inline as constants at the top of this file.
- `src/app/layout.tsx` — Sets metadata, JSON-LD structured data, and loads the two Google Fonts.
- `src/app/globals.css` — Tailwind v4 theme config and CSS custom properties for the design system.
- `src/components/Reveal.tsx` — Scroll-triggered reveal animation wrapper using `IntersectionObserver`. Wrap sections in this for entrance animations.
- `src/components/github-graph-simple.tsx` — Fetches GitHub contribution data from `github-contributions-api.deno.dev` and renders a contribution graph.
- `src/components/work-experience.tsx` — Work experience timeline component.
- `src/components/ui/button.tsx` — shadcn/ui Button component.
- `src/lib/utils.ts` — `cn()` utility (clsx + tailwind-merge).

## Design System

Colors are defined as CSS variables in `globals.css` and should always be used via Tailwind tokens or these variables — never hardcoded hex values in components:

| Variable | Hex | Usage |
|---|---|---|
| `--cream` | `#F3E2D4` | Page background |
| `--lavender` | `#C5B0CD` | Borders, subtle accents |
| `--slate-blue` | `#415E72` | Primary buttons, key elements |
| `--dark-blue` | `#17313E` | Primary text |

**Typography:**
- `var(--font-playwrite-hu)` / Tailwind `font-display` — headings and display text (cursive/handwriting)
- `var(--font-work-sans)` / Tailwind `font-sans` — all body text and UI

Use the CSS font utility classes from `globals.css` (e.g. `playwrite-hu-400`, `work-sans-600`) rather than one-off Tailwind font utilities.

## Adding Content

To add a new project, add an entry to the `projectsData` object in `src/app/page.tsx` under `serious`, `fun`, or `more`. Each entry follows the `Project` interface defined at the top of that file.

## Environment Variables

- `NEXT_PUBLIC_SITE_URL` — production URL (falls back to `http://localhost:3000`)
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` — Google Search Console verification token
