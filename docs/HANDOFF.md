# Verdant ESG — Site build handoff

> In this repository the reference pages live at the repo root (`index.html`, `about.html` …), assets in `/assets`, and this spec in `/docs`. Wherever this file says `prototype/…`, read the root page of the same name.

The approved homepage design for Verdant ESG (verdantesg.com), a UK green-claims / greenwashing regulatory-risk consultancy. The direction is a "2027" look: minimal, corporate, calm, and built entirely from the logo's two-leaf sprout.

**Source of truth**
- `index.html` is the reference for look and behaviour. Open it in a browser and everything works: the sprout drawing in, the palette switcher, the scroll indicator, fade/rise on scroll, the counters and the mobile menu. Copy exact values (sizes, spacing, timings, paths) from its `<style>` and `<script>`. Do not eyeball them.
- `brief/original-brief.txt` is the client brief. All homepage copy is verbatim from it.
- `assets/` holds the fonts, logos and every leaf shape as SVG.

---

## 1. Folder map

```
index.html              homepage reference (vanilla HTML/CSS/JS)
about.html              About page reference
services.html           Services overview
service-*.html          the five service pages
resources.html          Insights & Guides index
guide-8-greenwashing-risks.html   the long-read guide
contact.html            Contact
                                  (all prototype pages link to each other)
assets/css/vg-core.css            the shared stylesheet used by every inner page (see §12)
assets/fonts/                     Cedora Regular 400 + Bold 700 (woff2 + woff)
assets/logo/
  verdant-esg-logo-original.png   as supplied
  verdant-esg-logo-black.png      cropped, transparent — light backgrounds
  verdant-esg-logo-white.png      wordmark white, sprout kept green — dark palette
assets/images/                    Insights article photos, about-team.jpg, and the original hero photos for the inner pages (*-hero.jpg, downloaded from the live site) (cropped from a screenshot of the current site, so low-res: replace with the originals)
assets/leaf/
  sprout.svg                      full sprout, re-traced from the logo artwork, gradient #316535 → #67B545 (USE THIS)
  sprout-mono.svg                 same, fill=currentColor
  verdant-leaf.svg / -mono.svg    the originally supplied trace, kept for reference only: its leaf tip is squared off and edges drift from the logo
  sprout-parts.svg                outer silhouette + left slit + right slit as SEPARATE paths (hero animation)
  sprout-outline.svg              stroke-only sprout (footer, nav indicator)
  leaf-single-large.svg           the large (up-right) leaf alone — index badges, arrow hover leaf, divider leaf
  leaf-single-large-with-slit.svg same with its slit cut out
  leaf-single-small.svg           the small (left) leaf alone — bullets / eyebrow markers
  slit.svg                        the leaf slit rotated horizontal — underline, strike-through, accent dash
  stem-divider.svg                stem curve rising into a single leaf — section divider
```

All leaf shapes were traced from the logo artwork itself and smoothed, keeping the sharp corners (leaf tips, slit ends, the notches where the leaves meet the stem). The single leaves are cut from that trace, with a clean pointed base. Don't redraw them or swap in a generic leaf icon. Keep them as inline SVG components so they recolour through `currentColor` / CSS variables.

## 2. Stack notes

The current site (projectverdant.xyz) is a Lovable-built React SPA. Build the homepage in whatever the repo already uses (React + TypeScript + Tailwind + shadcn/ui is likely) and follow its existing conventions. Specifically:
- Put the colour tokens in CSS variables, either in the global stylesheet or in Tailwind theme extensions that point at the variables, so the four palettes can swap at runtime.
- Each leaf shape becomes a small React SVG component (`<Sprout/>`, `<LeafLarge/>`, `<LeafSmall/>`, `<Slit/>`, `<StemDivider/>`, `<ArrowLeaf/>`).
- The prototype uses container queries on `.vg-in`. In the app, use normal media queries or Tailwind breakpoints at the same widths (≤1180px tablet, ≤760px mobile).
- No animation library is needed. CSS keyframes/transitions plus IntersectionObserver are enough. If the repo already uses Framer Motion, it's fine to use it, but match the timings in §6.

## 3. Colour tokens (four palettes)

Every colour reads from these variables. A palette is one class on the page root (`p-verdant`, `p-forest`, `p-mint`, `p-moss`).

**Default palette: Moss & Stone (`p-moss`).** This is the theme the client chose. Ship with it, and keep the other three working through the tokens.

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

Nothing bouncy and no leaf watermarks behind sections. **Motion v2 (§13) supersedes the scroll-reveal, parallax and hover rows above.**

## 7. Sections (copy verbatim, see the brief)

1. **Nav**: logo · sprout scroll indicator (after a hairline) · Home, About, Services ▾ (dropdown listing the 5 services + "View all services"; AI-Assisted carries a "Tool" tag), Resources ▾ (Insights & Guides → `/resources`, 8 Greenwashing Risks → `/resources/8-greenwashing-risks`) · Contact pill. Mobile: logo, indicator, Contact pill, menu button → full-width panel (Esc closes it, and so does following a link).
2. **Hero**: eyebrow "ESG Consultancy" · H1 with "Enforcement" in `--accent-ink` plus the slit underline in `--accent` · body · primary button "Assess Your Exposure" → `/contact` · text link "View Our Governance Framework" → `#framework`. The sprout is 900px wide, positioned `right:-170px; top:56px` (720px / −230px at ≤1180; 440px / −150px / top 24px on mobile, where the copy is pushed down by 304px top padding). The H1 sits in the left 6 columns so the left leaf tip never touches it.
3. **The Problem**: eyebrow + H2 "A Gap in Scrutiny" (4 cols) | H3 + body (cols 7–12; "vague", "exaggerated" and "unsubstantiated" in bold) + a "More Details" text link · 3 stats · two columns (Regulatory Focus / The Compliance Standard), each an intro line plus a hairline list with leaf bullets · "Your Exposure": 3 leaf-corner cards (number, slit dash, H3 pushed down, body) · pull quote (cols 3–10) led by a slit dash, with "Governance Failure" in `--accent-ink`.
4. **Stem divider**, then **The Framework** (`id="framework"`): eyebrow, H2, "Precision over Persuasion" sub, intro · six principles in a 3-col grid (2 cols at tablet, 1 on mobile), each with a 01–06 number inside an outlined single-leaf badge · callout on `--surface` with a small gradient sprout.
5. **The Red Zone**, the one deep block: heading + intro · five terms in big type, each with an index and a slit strike-through in `--deep-accent` (term turns accent on hover) · side column "Such terms often call for:" list plus the note led by a slit dash.
6. **Services**: eyebrow + H2 "Our Services" + "View all services" → `/services` · an index list where each whole row is a link: number | title | descriptor | circular arrow button (fills `--primary` on hover).
7. **Insights** (`id="resources"`): eyebrow "Insights" + H2 "Our Insights" + the intro "Read our informed perspectives on some of the key sustainability opportunities and challenges facing businesses today." · "View all insights" → `/resources` (right-aligned). Then:
   - a featured guide card linking to `/resources/8-greenwashing-risks`, with a "Guide" tag, title, excerpt, "Read the guide" and, on the right, the large single leaf (`leaf-single-large.svg`, 230px wide; outline in `--leaf`, 10% tint fill that deepens to 18% on hover) with a 120px bold "8" centred on the leaf's visual centre. On mobile it is 160px with an 84px "8" and moves above the copy;
   - three article cards in a 3-col grid (1 col on mobile). Each card is a whole-card link on `--surface` with the leaf corner `0 4px 40px 4px`, a 16:10 photo (scales 1.03 on hover), the date "March 2026" as an eyebrow-style caption, a 20px title (turns `--accent-ink` on hover), an excerpt clamped to 3 lines, and "Read More" with the leaf arrow. The articles are "The Future of ESG Reporting in 2026", "Net Zero Buildings: A Practical Guide for Developers" and "Understanding Carbon Credits and Offsetting". Pull their real excerpts and links from the site's CMS/data if it has them.
8. **CTA**: stem divider · H2 XL left (8 cols) · body + "Book a Technical Consultation" → `/contact` (4 cols, bottom-aligned).
9. **Footer**: newsletter block (label + email input with placeholder "Enter your email" + Subscribe) · logo + tagline "A sustainability consultancy grounded in reality — delivering measurable ESG impact." + `hello@verdantesg.com` · columns Company / Services / Resources · bottom bar with © 2026, Privacy Policy and Terms of Use. An oversized stroke-only sprout sits cropped off the bottom-right edge, behind the content. The bottom bar has a `--bg` background so the outline passes behind it.

## 8. Accessibility

- Use real `<a>`, `<button>`, and `<label>` + `<input>`. Icon-only buttons need an `aria-label`. All decorative SVGs get `aria-hidden="true"`.
- Use visible `:focus-visible` outlines (2px `--primary`, 3px offset), and make sure keyboard focus opens the dropdown.
- Touch targets must be ≥44px. The swatch buttons are 34px; that's acceptable for a review tool, but enlarge them if the switcher ships publicly.
- **Known contrast issue:** white on `#49926E` (the brand Green Dark) is about 3.7:1, below 4.5:1 for the 15px button text. That's the client's brand spec, but flag it to them, or darken the button green to about #3B7A5B to reach AA.

## 9. Open items / decisions to confirm

- **Service URLs** are confirmed against the live site: `/services/green-claims-risk-audit`, `/services/ongoing-compliance-support`, `/services/supply-chain-transparency-review`, `/services/regulatory-response-readiness`, `/services/ai-assisted-green-claims-screening`.
- **Copy not in the brief:** "Our Services" (H2), "Read the guide", "Subscribe" and "View all services" in the dropdown. The Insights section, Resources dropdown, "More Details" link, footer tagline and "Enter your email" placeholder come from the current live homepage.
- **"More Details"** (The Problem) links to `/about` as a placeholder. Confirm the real target.
- **Article URLs** are assumed slugs (`/resources/the-future-of-esg-reporting-in-2026`, `/resources/net-zero-buildings-a-practical-guide-for-developers`, `/resources/understanding-carbon-credits-and-offsetting`). Wire them to the real posts.
- **Article photos** in `assets/images/` are screenshot crops. Use the original files from the current site.
- **Newsletter** has no backend in the prototype. Wire it to the site's existing provider.
- The palette switcher is a client-review tool (see §3).
- The mobile H1 is 46px rather than the brief's 48px minimum, so "Environmental" fits on one line at 390.

## 10. Acceptance checklist

- [ ] Matches `index.html` at 1440, 1180, 768 and 390 widths
- [ ] The hero sprout draw → fill → slits sequence plays once on load, and only the final state shows with reduced motion
- [ ] All four palettes recolour everything, including leaves, buttons, the deep block and focus rings; the logo wordmark flips on Deep Forest
- [ ] The nav sprout fills with scroll, and the nav turns translucent after scrolling
- [ ] Counters, reveals, strikes and dividers animate once, on scroll
- [ ] No horizontal scroll at any width; the hero sprout and footer sprout are clipped (`overflow: clip`) by their sections
- [ ] Lighthouse accessibility ≥ 95 (except the known button contrast if the client keeps #49926E)
- [ ] Fonts self-hosted from `assets/fonts`, with no layout shift (preload the woff2 files when served over http)

---

## 11. About page (`/about`)

`about.html` is the reference. It uses the same tokens, type, grid, nav, footer, palette switcher and motion as the homepage, so build it from the components you already made and add only the pieces below. All copy is verbatim from the current live About page.

**Shared changes:** the nav marks About as current (`aria-current="page"`, with the same active style as Home on the homepage). The footer is identical.

**Sections, in order**
1. **Hero** (`.ahero`, padding 120/112, 56/72 on mobile)
   - eyebrow "About us", H1 "About Verdant ESG", and a 26px bold lead "Helping businesses make environmental claims they can support." in `--accent-ink` (23px at tablet, 21px on mobile)
   - on the right, the large single leaf as line art (`leaf-single-large-with-slit.svg`, 250×278; 200×222 at tablet; 112×125 placed above the heading on mobile). The outline draws in (2.6s from .3s), then the slit (1.4s from 1.8s), then a 9% `--leaf` tint fades in (1.6s from 2.4s). With reduced motion, only the final state shows
   - below, at cols 7–12, two muted 17px paragraphs and the primary button "Get in Touch" → `/contact`
2. **Photo**: a full-width `figure` with `about-team.jpg`, the leaf-corner radius, and a figcaption led by a slit dash: "We bring a regulatory and evidential perspective to the language you publish."
3. **Our perspective**: eyebrow, H2 "Accuracy Gives a Claim Its Credibility", two muted paragraphs, then a `.statement` (26px bold, hairline above).
4. **Informed by legal practice**, a band on `--surface`: H2 "A Regulator's Eye on Every Wording" plus two paragraphs. On the right is `aside.qcard` (`--bg`, radius `0 4px 48px 4px`, slit dash, H3 "The same questions arise across sectors." in `--accent-ink`, body).
5. **How we work**: H2 "Practical Advice in Plain Language" + intro. Then an ordered list of 3 (More specific wording / Greater prominence / Further information) using the homepage's 01–03 single-leaf index badges (3 cols, 2 at tablet, 1 on mobile), and a closing paragraph led by a slit dash.
6. **Stem divider**.
7. **Our services**: H2 "Support Across the Full Claims Lifecycle" + the AI paragraph. Then a 5-row link list (`.alist`) styled like the homepage services index: number | title | circular arrow, with a `--fg` top rule and hairlines. "AI-Assisted Green Claims Screening" carries the "Tool" tag.
8. **CTA**, the page's one deep block: H2 XL "Clear Advice for Credible Communications", body, and an inverted button "Get in Touch" → `/contact`.
9. **Footer**.

**Motion:** reveals, divider and arrow hovers as on the homepage. There are no counters on this page.

**Open items (About)**
- `about-team.jpg` is a screenshot crop of the live page. Use the original photo.
- Service links reuse the assumed slugs from §9.
- The homepage "More Details" link now has a real target: `/about`.

---

## 12. Inner pages (Services, service pages, Resources, Guide, Contact)

Every inner page is built from **one shared stylesheet**, `assets/css/vg-core.css` (the prototypes inline it). It holds the same tokens, type scale, grid, nav, footer, palette switcher and reveal motion as the homepage and About, plus the components below. Build these as shared components once and compose the pages from them.

**Leaf shapes as masks.** On these pages the small leaf bullet, slit dash, arrow leaf, divider leaf, index badge, nav scroll sprout and footer sprout are CSS masks over the SVGs in `assets/leaf/masks/` (`background: var(--leaf)` + `mask-image`), so they recolour with the palette and the markup stays tiny. Inline-SVG components (as on the homepage) are equally fine. Pick one approach and use it everywhere. The shapes are identical. Masks are fetched with CORS, so serve the site over http. The prototypes inline them as data URIs so they also work from `file://`.

**Routes and pages**

| Route | Prototype | Sections (top to bottom) |
|---|---|---|
| `/services` | `services.html` | Hero with a "5" numbered leaf · photo · Where is the Risk? · Our approach (5-part system row) · The solutions (5-row index: number, service, headline + summary + View Service) · stem divider · Prevention Over Remediation · deep CTA |
| `/services/green-claims-risk-audit` | `service-green-claims-risk-audit.html` | Hero (01) · photo · The Regulators' Stress-Test (leaf list + statement) · Total Coverage (6 cards) · The 6-Point Framework (leaf badges) · A Roadmap to De-Risking (4 deliverables) · deep CTA |
| `/services/ongoing-compliance-support` | `service-ongoing-compliance-support.html` | Hero (02) · photo · Advice Before Publication · Every Surface a Claim Appears On (6 badges) · Shaped Around Your Business (+ quote card linking to the Risk Audit) · A Consistent, Documented Review Process (5 items) · deep CTA |
| `/services/supply-chain-transparency-review` | `service-supply-chain-transparency-review.html` | Hero (03) · photo · The Gap Between Marketing and Procurement (with the "How do you know?" pull quote) · What Regulators Are Looking For (4 cards) · What a Review Covers (5 badges) · Who This Is For (numbered rows) · deep CTA |
| `/services/regulatory-response-readiness` | `service-regulatory-response-readiness.html` | Hero (04) · photo · What Regulatory Readiness Actually Means (3 badges) · What This Service Covers (5 cards) · The Regulator's Lens (ASA / CMA cards + statement) · Who This Is For · deep CTA |
| `/services/ai-assisted-green-claims-screening` | `service-ai-assisted-green-claims-screening.html` | Hero (05, Tool tag) · photo · The Problem It Solves · What the Tool Scans For (8 badges, 4 columns) · sample report card · What This Tool Does Not Do (4 bordered cards) · workflow (6 steps, step 2 highlighted) · Who This Is For · deep CTA |
| `/resources` | `resources.html` | Hero with leaf line art · featured guide card (leaf "8") · Our Insights (3 article cards from the homepage) |
| `/resources/8-greenwashing-risks` | `guide-8-greenwashing-risks.html` | Hero ("8" leaf) · photo · long read: sticky "In this guide" table of contents on the left (a collapsible `<details>` at ≤1180px) and the article on the right. The article has a timeline, a definition card, six principle badges, Risks 01–07 each with "What to check" / "The safer approach" boxes, Risk 08 "coming soon", the substantiation file list, a dark "When to pause" card, and a final note with two CTAs and a disclaimer |
| `/contact` | `contact.html` | Intro + enquiry form (full name, work email, company, message) + direct contact (email, phone, office, response time). On mobile the form sits directly under the intro |

**Shared inner-page components:** `.phero` (eyebrow or breadcrumb, H1, accent lead, intro at cols 7–12, CTAs) · `.nleaf` (big leaf outline that draws in, tint fades in, and a number rises: 01–05 for services, 5 for the overview, 8 for the guide) · `.aphoto` (21:9 photo, 4:3 on mobile, leaf-corner radius, caption led by a slit dash) · `.shead` (eyebrow + H2 left, intro right) · `.statement` · `.ll` leaf list · `.cards` · `.fw` + `.idx` leaf badges · `.pairs` · `.rows` · `.lens` · `.steps` · `.report` · `.limits` · `.sys` · `.sol` · `.pull` · `.qcard` · `.deep.acta` (with an optional "Return to Services" link) · `.deepcard` · `.guide` / `.posts` · `.cform`.

**Each page keeps to one deep block:** the closing CTA on the service pages, and the "When to pause" card on the guide. Resources and Contact have none.

**Copy:** everything is verbatim from the live pages, apart from these additions to confirm:
- eyebrows "The gap" and "Our principle" (Services);
- breadcrumbs "Service 01–05" on the service pages;
- the "Guides" label (Resources);
- the eyebrows "Context", "Definition", "The framework", "Evidence", "Escalation" and "Next steps", plus the "In progress" tag on Risk 08 (Guide);
- "Return to Services" added to the Risk Audit and Ongoing Support pages so all five match;
- the ASA/CMA full names as card subtitles.

**Restructured copy:**
- In the guide, the "·"-separated check lists became bullet lists, and the table of contents shows "01 Using Absolute Claims…" instead of "Risk 01 — Using…".
- The Services overview's line "We take your communications from aspirational to defensible." moved up to be the hero lead.

**Open items (inner pages)**
- The Resources page also lists the three homepage articles. The live `/resources` page shows only the guide. Remove them if those posts aren't published yet. Their slugs are assumed (§9).
- The contact and newsletter forms have no backend in the prototype. Wire them to the site's existing handlers. The phone number is a `tel:` link.
- Hero photos are the original files from the live site (`assets/images/*-hero.jpg`, 1600 px wide). Supply 2× versions if you have them.
- The canvas shows pages taller than 8,000 px as a "1/2, 2/2" (or "1/3…3/3") series of frames. In the build each one is a single page.

---

## 13. Motion v2 (all pages)

Motion is one shared system in two layers. Both live in `assets/`:

- **`assets/css/vg-motion.css`** is the CSS layer. It runs everywhere, including the design canvas. Blocks marked `.rv` reveal when an IntersectionObserver adds `.in`. Hero entrances play on load, photos unmask, hairlines draw, leaf badges pop, workflow steps light up in order, and buttons get a fill sweep. Where the browser supports scroll-driven animation, the dark CTA block also opens out.
- **`assets/js/motion.js`** is the GSAP layer, for the live site. It needs `gsap`, `ScrollTrigger`, `SplitText` and `lenis` (vendored in `assets/js/vendor/`). It adds `html.gs`, which hands these effects from CSS to GSAP: the hero timeline, headline line reveals, word-by-word statements, photo unmask + parallax, the dark-block expand, hide-on-scroll nav, smooth scrolling and page transitions.

**Easing:** `expo.out` (`cubic-bezier(.16,1,.3,1)`) for everything that arrives, `expo.inOut` for wipes and the page curtain, and `back.out` (`cubic-bezier(.34,1.56,.64,1)`) only for the leaf badges and bullets.

**Timing:** durations are 0.9–1.4s and the stagger is 0.07–0.1s. Scrubbed effects never use easing.

| Element | Behaviour |
|---|---|
| Page load | Nav drops in (1s). The eyebrow or breadcrumb rises at .1s. The H1 splits into lines that rise out of a mask (yPercent 112 → 0, stagger .09) at .18s. The lead and sub follow at .5s, then the intro paragraphs and CTAs (stagger .07) at .62s. The numbered leaf keeps its outline draw-in. |
| Page transition | Clicking an internal link raises a `--deep` curtain from the bottom (.65s expo.inOut) with the sprout fading in, then navigates. The next page opens with the curtain lifting off the top (.9s). |
| Smooth scroll | Lenis (`duration 1.15`, expo easing) is driven by the GSAP ticker. Anchor links scroll with a 96px offset. |
| Nav | Hides when you scroll down past 520px, returns on any scroll up (GSAP yPercent, .5s in / .7s out). |
| Section headlines (`.h2`, `.guide-t`) | Split into lines that rise out of a mask when the heading is 10% into the viewport (1.15s, stagger .08). In CSS mode the whole heading wipes up instead. |
| `.rv` blocks | Opacity 0 → 1 and y 32 → 0 (1s / 1.25s). Siblings in a grid land .1s apart. |
| Lists (`.ll`, `.rows`, `.nlist`, `.tl`, `.alist`, `.sys`, `.steps`, `.chk`, report rows) | Rows rise in turn (.07–.08s apart). Leaf bullets bud open (scale 0 → 1, rotate −40° → 0, back.out). |
| Hairlines (`.fw`, `.pairs`, `.sol`, `.statement`) | Draw left → right (1.4s expo.inOut). |
| Leaf index badges | Pop from scale .35 / rotate −22° (1s back.out). |
| Workflow steps | The connecting line and each leaf light up one after another (.18s apart). |
| Statements (`.statement`, `.pull blockquote`, `.callout p`, `.defn p`, `.qcard h3`, `.lead-b`) | Split into words that brighten from 16% → 100% opacity, scrubbed while the block crosses the viewport (88% → 58%). |
| Photos | The mask opens from `inset(12% 8%)` to full (1.7s) while the image settles from scale 1.3 → 1.12 (2.2s), then drifts ±5% with scroll (parallax). Captions fade up .4s later. Article thumbnails do a smaller version, then hand back to the CSS hover zoom. |
| Dark blocks (`.deep`) | Open out from `inset(0 3.5% round 44px)` to full bleed, scrubbed from 96% → 40% of the viewport. |
| Hero art (`.nleaf`, `.aleaf`, `.hero-sprout`) | Drifts up 14% as the hero scrolls away. The footer sprout rises and straightens into place. |
| Guide TOC | The active section's entry highlights as you read (ScrollTrigger at 40%). |
| Hover | Buttons: an accent fill sweeps in from the left (`--sweep`, .6s); text links: an underline draws in; cards: lift 6px with a soft shadow; card leaf: rotates −24° and grows; guide card: the leaf tilts. |
| Reduced motion | `prefers-reduced-motion: reduce` disables all of it (GSAP is not initialised and the CSS rules sit inside `@media (prefers-reduced-motion: no-preference)`). |

**Rule for the build:** never put a CSS `transition` on a property GSAP is animating on the same element. GSAP also writes `translate/rotate/scale: none` inline, so don't rely on the individual transform properties for elements GSAP touches. Use GSAP for them, as `motion.js` does for the nav.

