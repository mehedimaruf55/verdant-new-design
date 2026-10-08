# Verdant ESG — Homepage build handoff

The approved homepage design for Verdant ESG (verdantesg.com), a UK green-claims / greenwashing regulatory-risk consultancy. The direction is a "2027" look: minimal, corporate, calm, and built entirely from the logo's two-leaf sprout.

**Source of truth**
- `prototype/index.html` is the reference for look and behaviour. Open it in a browser and everything works: the sprout drawing in, the palette switcher, the scroll indicator, fade/rise on scroll, the counters and the mobile menu. Copy exact values (sizes, spacing, timings, paths) from its `<style>` and `<script>`. Do not eyeball them.
- `brief/original-brief.txt` is the client brief. All homepage copy is verbatim from it.
- `assets/` holds the fonts, logos and every leaf shape as SVG.

---

## 1. Folder map

```
prototype/index.html              working reference page (vanilla HTML/CSS/JS)
assets/fonts/                     Cedora Regular 400 + Bold 700 (woff2 + woff)
assets/logo/
  verdant-esg-logo-original.png   as supplied
  verdant-esg-logo-black.png      cropped, transparent — light backgrounds
  verdant-esg-logo-white.png      wordmark white, sprout kept green — dark palette
assets/leaf/
  verdant-leaf.svg                full sprout, original gradient #316535 → #67B545 (as supplied)
  verdant-leaf-mono.svg           full sprout, fill=currentColor (as supplied)
  sprout-parts.svg                outer silhouette + left slit + right slit as SEPARATE paths (hero animation)
  sprout-outline.svg              stroke-only sprout (footer, nav indicator)
  leaf-single-large.svg           the large (up-right) leaf alone — index badges, arrow hover leaf, divider leaf
  leaf-single-large-with-slit.svg same with its slit cut out
  leaf-single-small.svg           the small (left) leaf alone — bullets / eyebrow markers
  slit.svg                        the leaf slit rotated horizontal — underline, strike-through, accent dash
  stem-divider.svg                stem curve rising into a single leaf — section divider
```

All leaf shapes were cut from the supplied vector, not redrawn. Keep them as inline SVG components so they recolour through `currentColor` / CSS variables.

## 2. Stack notes

The current site (projectverdant.xyz) is a Lovable-built React SPA. Build the homepage in whatever the repo already uses (React + TypeScript + Tailwind + shadcn/ui is likely) and follow its existing conventions. Specifically:
- Put the colour tokens in CSS variables, either in the global stylesheet or in Tailwind theme extensions that point at the variables, so the four palettes can swap at runtime.
- Each leaf shape becomes a small React SVG component (`<Sprout/>`, `<LeafLarge/>`, `<LeafSmall/>`, `<Slit/>`, `<StemDivider/>`, `<ArrowLeaf/>`).
- The prototype uses container queries on `.vg-in`. In the app, use normal media queries or Tailwind breakpoints at the same widths (≤1180px tablet, ≤760px mobile).
- No animation library is needed. CSS keyframes/transitions plus IntersectionObserver are enough. If the repo already uses Framer Motion, it's fine to use it, but match the timings in §6.

## 3. Colour tokens (four palettes)

Every colour reads from these variables. A palette is one class on the page root (`p-verdant`, `p-forest`, `p-mint`, `p-moss`).

| Token | Verdant (default) | Deep Forest (dark) | Mono + Mint | Moss & Stone |
|---|---|---|---|---|
| `--bg` | #FFFFFF | #0E1F17 | #FFFFFF | #F4F2EC |
| `--surface` | #F5F5F5 | #142A20 | #F5F5F5 | #ECE8DE |
| `--fg` | #000000 | #F2F5F3 | #0A0A0A | #141414 |
| `--muted` (body grey) | #6B6B6B | #A9B8B0 | #6B6B6B | #66635B |
| `--line` (hairlines) | #E0E0E0 | #263B31 | #E6E6E6 | #DCD7CA |
| `--primary` (buttons) | #49926E | #77F8C0 | #0A0A0A | #5E7A4A |
| `--on-primary` | #FFFFFF | #0E1F17 | #FFFFFF | #FFFFFF |
| `--primary-hover-fg` | #000000 | #000000 | #77F8C0 | #141414 |
| `--accent` (bright marks) | #77F8C0 | #77F8C0 | #77F8C0 | #C9D8A8 |
| `--accent-ink` (accent text) | #49926E | #77F8C0 | #0A0A0A | #5E7A4A |
| `--leaf` (mono leaf) | #49926E | #67B545 | #77F8C0 | #5E7A4A |
| `--leaf-a` / `--leaf-b` (gradient) | #316535 / #67B545 | #67B545 / #67B545 | #77F8C0 / #77F8C0 | #5E7A4A / #5E7A4A |
| `--deep` (Red Zone block) | #000000 | #08140E | #0A0A0A | #1F2A19 |
| `--deep-fg` | #FFFFFF | #F2F5F3 | #FFFFFF | #F4F2EC |
| `--deep-muted` | #A6A6A6 | #A9B8B0 | #A3A3A3 | #B5BBA8 |
| `--deep-line` | #2A2A2A | #1E3128 | #262626 | #34402C |
| `--deep-accent` | #77F8C0 | #77F8C0 | #77F8C0 | #C9D8A8 |

Rules:
- The logo's sprout always stays its original green. Only the wordmark flips: black on light palettes, white on Deep Forest (`verdant-esg-logo-white.png`).
- The page is mostly white, with exactly one deep block, the Red Zone. Use colour sparingly. No full-page gradients, glows or blobs.
- Palette switcher: a discreet pill fixed at the bottom-right. It shows the palette name (hidden ≤760px) and four 18px split swatches inside 34px buttons with `aria-pressed`. The prototype remembers the last choice in `localStorage` under `verdant-palette`. **It's a client-review tool, so put it behind a flag or query param (e.g. `?palette`) before launch.**

## 4. Typography

Use Cedora for everything (400 / 700, `font-display: swap`), falling back to `system-ui, sans-serif`. No second typeface, and no decorative italics.

| Role | Desktop | Mobile (≤760) | Notes |
|---|---|---|---|
| H1 (hero) | 72px / 1.0, −0.02em, 700 | 46px / 1.02 | 60px at ≤1180. Uses `text-wrap: balance` |
| H2 | 48px / 1.06, −0.018em | 36px | |
| H2 XL (final CTA) | 64px / 1.02 | 40px | |
| H3 | 22px / 1.25 (24px "lg") | same | framework items 20px |
| Eyebrow | 12px, 700, uppercase, 0.18em tracking | same | led by a small leaf (15×10) |
| Body | 16px / 1.7 | 17px | `text-wrap: pretty` |
| Lead (hero) | 17px / 1.7, max 540px | 17px | |
| Caption | 13–14px, `--muted` | same | |
| Stat numbers | 96px / .95, −0.035em, tabular | 72px | |
| Red Zone terms | 60px, 700 | 34px | 50px at ≤1180 |
| Service titles | 30px | 22px | 26px at ≤1180 |

## 5. Layout

- Max content width 1400px, 32px side padding (20px on mobile).
- 12-column grid, 24px gutters, strong left alignment and asymmetric compositions. At ≤760 everything spans the full width.
- 1px hairlines in `--line`. Stats have a 1px top rule in `--fg`, and the services list has a 1px `--fg` top rule.
- Section rhythm: 160px vertical padding (104px on mobile). The Red Zone gets 168px.
- **Leaf corner** (cards, callout, guide card, buttons, input): `border-radius: 0 4px 48px 4px`. Top-left is the sharp "tip", bottom-right is the rounded end, and the other two get a near-square 4px. Buttons and the input use `0 4px 18px 4px`, the guide card `0 4px 56px 4px`.
- Nav: 84px tall (68px mobile), sticky. The Contact button is a pill.

## 6. Motion spec

All motion must respect `prefers-reduced-motion: reduce`: show final states and skip transitions.

| Element | Behaviour | Timing |
|---|---|---|
| Hero sprout | 1) the outer outline draws as a thin stroke (`pathLength=1`, dash offset 1 → 0); 2) the gradient fill fades in; 3) the stroke fades out; 4) the two slits open (mask paths scale 0 → 1 from their centres; the right slit starts 0.3s after the left) | draw 2.8s `cubic-bezier(.45,0,.2,1)` @0.3s · fill 1.6s ease @2.3s · stroke out 1.2s @3.7s · slits 1.3s `cubic-bezier(.5,0,.2,1)` @3.5s / 3.8s |
| "Enforcement" underline | slit grows left → right | 1.4s `cubic-bezier(.6,0,.2,1)` @1.1s |
| Nav | after 8px of scroll: background `--bg` at 76% opacity, 16px backdrop blur, hairline bottom border | .35s |
| Nav scroll indicator | sprout outline beside the logo; a gradient fill clipped by a rect rises bottom → top with page scroll progress (viewBox y 225 → 12) | rAF-throttled scroll listener |
| Fade/rise on scroll | elements with `.rv`: opacity 0 → 1, translateY 22px → 0 when 8% inside the viewport, once | .9s, transform `cubic-bezier(.2,.7,.2,1)` |
| Stat counters | 0 → 3, 6, 100 once the stats row is 40% visible (only if it starts below the fold) | 1.7s ease-out cubic |
| Red Zone strikes | slit strike-through scales in from the left as each term reveals | 1s `cubic-bezier(.6,0,.2,1)` + .2s delay |
| Stem dividers | hairline draws left → right on reveal | 1.2s |
| Arrow hover | arrow shifts 3px and a tiny leaf grows on its shaft (scale 0 → 1 from its base) | .45–.5s `cubic-bezier(.2,.7,.2,1)` |
| Primary button hover | text colour → `--primary-hover-fg` (black on Verdant) | .25s |
| Nav link hover | 1px underline scales in from the left | .35s |
| Services dropdown | opens on hover and focus-within, fades with a 6px rise | .25s |
| Palette change | `background-color`/`color` transitions | .5s |

Nothing bouncy, no parallax, no leaf watermarks behind sections.

## 7. Sections (copy verbatim, see the brief)

1. **Nav**: logo · sprout scroll indicator (after a hairline) · Home, About, Services ▾ (dropdown listing the 5 services + "View all services"; AI-Assisted carries a "Tool" tag), Resources · Contact pill. Mobile: logo, indicator, Contact pill, menu button → full-width panel (Esc closes it, and so does following a link).
2. **Hero**: eyebrow "ESG Consultancy" · H1 with "Enforcement" in `--accent-ink` plus the slit underline in `--accent` · body · primary button "Assess Your Exposure" → `/contact` · text link "View Our Governance Framework" → `#framework`. The sprout is 900px wide, positioned `right:-170px; top:56px` (720px / −230px at ≤1180; 440px / −150px / top 24px on mobile, where the copy is pushed down by 304px top padding). The H1 sits in the left 6 columns so the left leaf tip never touches it.
3. **The Problem**: eyebrow + H2 "A Gap in Scrutiny" (4 cols) | H3 + body (cols 7–12) · 3 stats · two columns (Regulatory Focus / The Compliance Standard), each an intro line plus a hairline list with leaf bullets · "Your Exposure": 3 leaf-corner cards (number, slit dash, H3 pushed down, body) · pull quote (cols 3–10) led by a slit dash, with "Governance Failure" in `--accent-ink`.
4. **Stem divider**, then **The Framework** (`id="framework"`): eyebrow, H2, "Precision over Persuasion" sub, intro · six principles in a 3-col grid (2 cols at tablet, 1 on mobile), each with a 01–06 number inside an outlined single-leaf badge · callout on `--surface` with a small gradient sprout.
5. **The Red Zone**, the one deep block: heading + intro · five terms in big type, each with an index and a slit strike-through in `--deep-accent` (term turns accent on hover) · side column "Such terms often call for:" list plus the note led by a slit dash.
6. **Services**: eyebrow + H2 "Our Services" + "View all services" → `/services` · an index list where each whole row is a link: number | title | descriptor | circular arrow button (fills `--primary` on hover).
7. **Resources**: one featured guide card linking to `/resources/8-greenwashing-risks`, with a "Guide" tag, title, excerpt, "Read the guide" and, on the right, a large outlined single leaf with "8" (it moves above the copy on mobile).
8. **CTA**: stem divider · H2 XL left (8 cols) · body + "Book a Technical Consultation" → `/contact` (4 cols, bottom-aligned).
9. **Footer**: newsletter block (label + email input + Subscribe) · logo + `hello@verdantesg.com` · columns Company / Services / Resources · bottom bar with © 2026, Privacy Policy and Terms of Use. An oversized stroke-only sprout sits cropped off the bottom-right edge, behind the content. The bottom bar has a `--bg` background so the outline passes behind it.

## 8. Accessibility

- Use real `<a>`, `<button>`, and `<label>` + `<input>`. Icon-only buttons need an `aria-label`. All decorative SVGs get `aria-hidden="true"`.
- Use visible `:focus-visible` outlines (2px `--primary`, 3px offset), and make sure keyboard focus opens the dropdown.
- Touch targets must be ≥44px. The swatch buttons are 34px; that's acceptable for a review tool, but enlarge them if the switcher ships publicly.
- **Known contrast issue:** white on `#49926E` (the brand Green Dark) is about 3.7:1, below 4.5:1 for the 15px button text. That's the client's brand spec, but flag it to them, or darken the button green to about #3B7A5B to reach AA.

## 9. Open items / decisions to confirm

- **Service URLs** are assumed: `/services/green-claims-risk-audit`, `/services/ongoing-compliance-support`, `/services/supply-chain-transparency-review`, `/services/regulatory-response-readiness`, `/services/ai-assisted-green-claims-screening`. Match them to the real routes.
- **Copy not in the brief:** "Our Services" (H2), "Read the guide", "Subscribe", "View all services" in the dropdown, and the "Email address" placeholder.
- **Newsletter** has no backend in the prototype. Wire it to the site's existing provider.
- The palette switcher is a client-review tool (see §3).
- The mobile H1 is 46px rather than the brief's 48px minimum, so "Environmental" fits on one line at 390.

## 10. Acceptance checklist

- [ ] Matches `prototype/index.html` at 1440, 1180, 768 and 390 widths
- [ ] The hero sprout draw → fill → slits sequence plays once on load, and only the final state shows with reduced motion
- [ ] All four palettes recolour everything, including leaves, buttons, the deep block and focus rings; the logo wordmark flips on Deep Forest
- [ ] The nav sprout fills with scroll, and the nav turns translucent after scrolling
- [ ] Counters, reveals, strikes and dividers animate once, on scroll
- [ ] No horizontal scroll at any width; the hero sprout and footer sprout are clipped (`overflow: clip`) by their sections
- [ ] Lighthouse accessibility ≥ 95 (except the known button contrast if the client keeps #49926E)
- [ ] Fonts self-hosted from `assets/fonts`, with no layout shift (preload the woff2 files when served over http)
