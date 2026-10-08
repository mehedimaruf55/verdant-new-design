# Prompt to paste into Claude Code

Unzip `verdant-homepage-handoff` into the root of the Verdant site repo (e.g. as `/design-handoff`), open the repo in Claude Code, and paste the following:

---

Rebuild the homepage of this site from the design handoff in `design-handoff/`.

Read these first, in order:
1. `design-handoff/HANDOFF.md`: the full spec (tokens, type, layout, motion timings, sections, open items, acceptance checklist).
2. `design-handoff/index.html`: the working reference. Treat its CSS values, SVG paths and JS behaviour as exact. Open it in a browser to see the motion.
3. `design-handoff/brief/original-brief.txt`: the client brief. Homepage copy must stay verbatim.

How to build it:
- Use this repo's existing stack and conventions. Inspect the project before writing anything, and tell me what you found (framework, styling, routing, component folders) before you start.
- Copy `design-handoff/assets/fonts` and `design-handoff/assets/logo` into the project's public/static assets. Self-host Cedora 400/700 with `@font-face` and preload the woff2 files.
- Define the four palettes as CSS variables exactly as in HANDOFF.md §3, switched by a class on the page root. Wire Tailwind (if used) to those variables rather than hard-coding hex values.
- Turn every leaf shape in `design-handoff/assets/leaf/` into a small reusable inline-SVG component that colours via `currentColor`/CSS variables. Use the supplied paths unchanged and never swap in a generic leaf icon.
- Build the homepage as one component per section: Nav, Hero, Problem, Framework, RedZone, Services, Resources, CTA, Footer, plus PaletteSwitcher and StemDivider.
- Implement every motion in HANDOFF.md §6 with CSS plus IntersectionObserver (or the repo's existing animation library), and fully support `prefers-reduced-motion`.
- Responsive: match the prototype at 1440, 1180, 768 and 390. Use media queries/breakpoints at 1180px and 760px.
- Keep the palette switcher behind a `?palette` query param (hidden by default) unless I say otherwise.
- Do not change other pages. Ask me before changing the shared nav/footer if other pages use them.

When you're done, run the dev server, compare against the prototype at the four widths, work through the acceptance checklist in HANDOFF.md §10, and list any open items from §9 that still need my decision.

---

## Follow-up prompt: About page

Paste this after the homepage is built:

---

Build the About page (`/about`) from `design-handoff/about.html` and HANDOFF.md §11. Reuse the homepage components (Nav, Footer, StemDivider, leaf components, the index badge, the service-list row, buttons, reveal hook and palette switcher), and add only the new pieces: AboutHero (with the leaf line-art draw-in), PhotoFigure, Statement, QuoteCard band, StepsList and the deep CTA. Copy stays verbatim. Set About as the current nav item. Then compare against the prototype at 1440, 1180, 768 and 390, and list the §11 open items.

---

## Follow-up prompt: inner pages

Paste this once Home and About are built:

---

Build the remaining pages from `design-handoff/HANDOFF.md` §12 and the matching files in `design-handoff/`: `/services`, the five `/services/*` pages, `/resources`, `/resources/8-greenwashing-risks` and `/contact`. Use `design-handoff/assets/css/vg-core.css` as the reference for every value, but implement it in this repo's styling approach. Turn its sections into shared components (page hero with numbered leaf, photo figure, section head, cards, leaf badges, numbered rows, lens cards, workflow steps, report card, limits, guide long-read with sticky TOC, contact form) and reuse the Nav, Footer, StemDivider and leaf components from the homepage. Keep all copy verbatim, set the correct active nav item and `aria-current` on each page, and give the service pages one data-driven template if the repo has a CMS or content files. Wire the contact form to the existing form handler. When you're done, compare every page against its prototype at 1440, 1180, 768 and 390, and list the §12 open items.

