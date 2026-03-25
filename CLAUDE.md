# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build
npm run lint      # ESLint
npm run preview   # Preview production build
```

## Architecture

**Single-page React portfolio with no client-side router.** Navigation is anchor/hash-based (`#about`, `#projects`, `#contact`) with smooth scrolling. All sections render together; visibility is scroll-driven.

### App structure

```
LaunchSequence (race-start intro) → onComplete →
ScrollExpansionHero (scroll-to-reveal hero with ProfileCard) →
Navbar (sticky, tracks active section via getBoundingClientRect) →
About / Projects / Contact (sections stacked vertically)
```

### Animation engines — three are in use, each with a distinct role

- **GSAP + ScrollTrigger** — section-level animations (header wipes via `clipPath`, card staggers, timeline line drawing). Always initialised inside `gsap.context(() => { ... }, sectionRef)` and cleaned up with `ctx.revert()`.
- **Framer Motion** — component-level interactions (Navbar slide-in, ProfileCard 3D tilt via `useSpring`/`useTransform`, Contact stagger).
- **tsParticles** — background speed streaks and sparks in `SpeedBackground.jsx`.

### Scroll-hijack hero (`ScrollExpansionHero.jsx`)

Intercepts `wheel` and `touch` events with `preventDefault`, drives a `progress` state (0→1) that animates the hero. At `progress === 1`, releases control and scrolls to `#about`. On mobile, the ProfileCard slide is disabled.

### Theme

Defined entirely in `src/index.css` using Tailwind v4's `@theme` block — no `tailwind.config.js`. Colors: `primary` (#060C1F), `secondary` (#0A1A3F), `accent` (#B11226 red), `highlight` (#FCD116 yellow). Fonts: Titillium Web (headings) and Inter (body), loaded from Google Fonts in `index.html`.

### Path alias

`@` maps to `./src` (configured in both `vite.config.js` and `jsconfig.json`).

### shadcn/ui

Configured in `components.json` with the `new-york` style. `cn()` utility lives in `src/lib/utils.js`. Additional components from Magic UI can be pulled via the registry at `https://magicui.design/r/{name}.json`.

### 3D tilt pattern

Used in both `ProfileCard.jsx` (Framer Motion `useSpring`) and project cards (`Projects.jsx`, GSAP `mousemove` listener). When adding 3D tilt to a card, **do not put `overflow-hidden` on the element being rotated** — it breaks gradient overlays. Apply `overflow-hidden` only to inner image containers.
