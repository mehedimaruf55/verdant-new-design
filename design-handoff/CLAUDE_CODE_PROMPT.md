# Prompt to paste into Claude Code

Unzip `verdant-homepage-handoff` into the root of the Verdant site repo (e.g. as `/design-handoff`), open the repo in Claude Code, and paste the following:

---

Rebuild the homepage of this site from the design handoff in `design-handoff/`.

Read these first, in order:
1. `design-handoff/HANDOFF.md`: the full spec (tokens, type, layout, motion timings, sections, open items, acceptance checklist).
2. `design-handoff/prototype/index.html`: the working reference. Treat its CSS values, SVG paths and JS behaviour as exact. Open it in a browser to see the motion.
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
