# Babel Gavel — Quest 2 Artifact Showcase

Landing page for **Babel Gavel**, the Quest 2 artifact of **Team Sinterklass** (Elina & Matthew), created for the INT Synergy course at Saxion. Visitors explore the project by clicking floating bubbles around an illustrated Babel tower, each opening a full-screen panel (Chambers, Journey, AI Logs, Authors, Reflection) through a portal transition.

## Project Structure

``` txt
synergy-showcase/
├── index.html                  Main landing page (structured, links css/ + js/)
├── drafts/
│   └── babel_gavel_typography_authors.html
│                               Self-contained fallback — every style and script
│                               inline in one file. Share or open it directly,
│                               no other files needed.
├── css/
│   ├── global.css              Import hub (single entry point, cascade order)
│   ├── variables.css           Design tokens: colors, fonts, scrollbar
│   ├── base.css                Reset, html/body, base typography
│   ├── typography.css          Display scale: headers, leads, panel titles
│   ├── cursor.css              Custom ring + dot cursor
│   ├── background.css          Doodle SVG layer + drifting language particles
│   ├── scrollbar.css           Parchment scrollbar styling
│   ├── landing.css             Tower stage, bubbles, sigils, glow pass
│   ├── transitions.css         Portal veil (clip-path circle bloom)
│   ├── panels.css              Panel shell: bar, exit button, body, footer
│   ├── chambers.css            Four package cards
│   ├── journey.css             Numbered pipeline flow
│   ├── ai-logs.css             Paper-stack sheets
│   ├── authors.css             Leather codex: tabs, seal, ribbons
│   ├── reflection.css          AI assessment badge
│   └── responsive.css          ≤640px layout + reduced-motion
└── js/
    ├── cursor.js               Cursor tracking + hover states
    ├── particles.js            Randomly spawned glyph particles
    ├── panels.js               Bubble → panel navigation + portal transition
    └── codex.js                Codex tab switching + seal updates
```

## Design Vision

A parchment-and-ink "illuminated manuscript" aesthetic:

| Layer | Choice |
| --- | --- |
| **Palette** | Parchment `#f7f0e1`, deep teal `#1a4a4a`, rust `#8b3a2a`, gold `#c9a227` |
| **Type** | Fraunces (display) · Lora (serif) · DM Sans (body) |
| **Motif** | Hand-illustrated SVG Babel tower with brickwork, lantern glow, and floating language glyphs (A, ß, あ, Я, ε, ø) |
| **Motion** | Floating bubbles, breathing aura rings, portal clip-path transitions — all disabled under `prefers-reduced-motion` |

## Responsive

Four tiers, all verified at 320 / 360 / 740 / 768 / 1024 / 1440px with zero horizontal overflow:

| Breakpoint | Behavior |
| --- | --- |
| **Desktop (>1024px)** | Side-tab codex, full tower stage, custom cursor |
| **Tablet (641–1024px)** | Codex shifts right into a reserved lane so the side tabs stay on-screen |
| **Phone (≤640px)** | Codex flips vertical with thumb-sized tabs on top; tower, bubbles, and panel chrome shrink; title wraps |
| **Small phone (≤380px)** | Further bubble/header downsizing |
| **Landscape (≤520px tall)** | Tower height traded down so the header fits |

Also: `100dvh` (no mobile-toolbar jump), safe-area insets for notches, gold tap highlights, `touch-action: manipulation`, sticky-hover styles suppressed on touch devices, and a `theme-color` meta for browser chrome.

## Sections

| Section | Description |
| --- | --- |
| **Landing** | Tower hero with 5 clickable bubbles and rotating sigil rings |
| **Chambers** | The four Python packages: Model, Analysis, Translation, Rules |
| **Journey** | 8-step numbered flow of how a sentence climbs the tower |
| **AI Logs** | Documented AI conversations as stacked paper sheets |
| **Authors** | Leather-bound codex with tabbed pages (Elina, Matthew, Team, Field Notes) |
| **Reflection** | AI assessment: Level 3 collaboration statement |

## Fallback Draft

`drafts/babel_gavel_typography_authors.html` is the original single-file version of this exact page — identical markup, styles, and behavior, with everything inline. Keep it as the quick way to share the webpage directly (e.g. sending one file over chat), while `index.html` is the maintainable version for development.

## Run Locally

```bash
npx serve .
```

Then open `http://localhost:3000`. (The draft in `drafts/` also works when opened straight from disk via `file://`.)

## Tech Stack

- HTML5 (semantic, ARIA roles on dialogs and tabs)
- CSS3 (custom properties, grid, `color-mix`-free palette, `min()`, `clamp()`, `clip-path`)
- Vanilla JavaScript (no frameworks, no build step)
