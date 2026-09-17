# INT Synergy — Artifact Showcase

A group project website showcasing five artifacts created throughout the INT Synergy course at Saxion. The site brings together individual contributions and group work into one cohesive presentation.

## Project Structure

``` txt
Synergy/
├── index.html                  Main showcase page
├── 404.html                    Not-found page
├── .prettierrc                 Prettier config
├── css/
│   ├── global.css              Import hub (single entry point)
│   ├── variables.css           Custom properties: colors, fonts, spacing
│   ├── base.css                Reset, typography
│   ├── header.css              Sticky header, nav, dropdown
│   ├── hero.css                Hero section, CTA buttons
│   ├── sections.css            Kickers, artifacts, authors, popover, split layout
│   ├── footer.css              Site footer
│   ├── animations.css          Scroll-triggered reveal animations
│   ├── responsive.css          Wide screen (1400px+) adjustments
│   └── empty-state.css         Artifact placeholder pages, 404
├── js/
│   └── main.js                 Dropdown, smooth scroll, reveal, popover
├── images/
│   ├── enquiry.jpg             Hero background
│   ├── surpassing-obstacles.jpg  Challenges section
│   └── collaboration.jpg       Collaboration section
└── quests/
    ├── artifact-01.html        Good, Bad, Funny
    ├── artifact-02.html        GiGo — Garbage In / Garbage Out
    ├── artifact-03.html        Lost in Translation, Found in Structure
    ├── artifact-04.html        The Culture Games
    └── artifact-05.html        Getting to know Maranda
```

## Sections

| Section | Description |
| --- | --- |
| **Hero** | Full-width background image with overlay, title, and CTAs |
| **Introduction** | Course context and project overview |
| **Artifacts** | 3-column grid linking to five quest artifact pages |
| **Authors** | Team member cards with hover-activated contact popovers |
| **Challenges** | Split layout with image — obstacles faced during the project |
| **Collaboration** | Split layout with image — how the team worked together |
| **Final Showcase** | Closing section with CTA back to artifacts |

## Features

- **Dropdown navigation** — artifact links with keyboard support and outside-click close
- **Scroll reveal** — elements animate in via IntersectionObserver with staggered delays
- **Author popovers** — floating contact panels with smart positioning (flips below when near viewport top, right-aligns for last card)
- **Split layouts** — reversible two-column sections with image hover zoom
- **CSS import hub** — single `global.css` entry point imports all section files

## Team

| Name | Role |
| --- | --- |
| Matthew Jacob Sarkodie Darkwah | Website development & final showcase |
| Elina Nilisani | PowerPoint development |
| Thijmen Verschuur | PowerPoint development |

## Tech Stack

- HTML5 (semantic)
- CSS3 (custom properties, grid, flexbox, `color-mix`, `min()`)
- Vanilla JavaScript (no frameworks)

## Run Locally

```bash
npx serve .
```

Then open `http://localhost:3000`.
