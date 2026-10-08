# Prompt for Lovable

Paste everything below the line into a new Lovable project.

---

Build the complete marketing website for **Verdant ESG**, a UK green-claims and greenwashing regulatory-risk consultancy. The design is finished and approved. Your job is to reproduce it faithfully as a production React site, not to redesign it.

## Source of truth
The approved design is a working static build in this public GitHub repo: **https://github.com/mehedimaruf55/verdant-new-design**

- Raw file base: `https://raw.githubusercontent.com/mehedimaruf55/verdant-new-design/main/`
- Each page has its own reference file in the repo root. Copy text, structure, class names and every value from these files:

| Page | Reference file |
|---|---|
| `/` | `index.html` |
| `/about` | `about.html` |
| `/services` | `services.html` |
| `/services/green-claims-risk-audit` | `service-green-claims-risk-audit.html` |
| `/services/ongoing-compliance-support` | `service-ongoing-compliance-support.html` |
| `/services/supply-chain-transparency-review` | `service-supply-chain-transparency-review.html` |
| `/services/regulatory-response-readiness` | `service-regulatory-response-readiness.html` |
| `/services/ai-assisted-green-claims-screening` | `service-ai-assisted-green-claims-screening.html` |
| `/resources` | `resources.html` |
| `/resources/8-greenwashing-risks` | `guide-8-greenwashing-risks.html` |
| `/contact` | `contact.html` |

- `docs/HANDOFF.md` is the full spec: tokens, type, layout, sections, open items, and the motion spec in §13. Read it before you start.
- `assets/css/vg-core.css` is the shared stylesheet for the inner pages, and `assets/css/vg-motion.css` is the motion CSS. `assets/js/motion.js` is the GSAP motion layer to port.

**All copy must be verbatim.** Take it from the reference files. Do not rewrite, shorten or add marketing copy.

## Stack
- Vite, React, TypeScript, Tailwind, React Router, with one route per page above.
- Animation: `gsap` (3.13+, including `ScrollTrigger` and `SplitText`, which are free) and `lenis` for smooth scrolling. Use `@gsap/react`'s `useGSAP` so animations clean up on route change.
- No UI kit look: don't use shadcn's default styling on visible components. Recreate the design's own buttons, cards and lists.

## Assets
Download these into `public/` and keep the same paths:
- **Fonts:** `assets/fonts/Cedora.woff2`, `Cedora.woff`, `Cedora-Bold.woff2`, `Cedora-Bold.woff` (weights 400 and 700). Self-host them with `@font-face`, preload the woff2 files, and use Cedora for everything.
- **Logos:** `assets/logo/verdant-esg-logo-black.png` (light backgrounds) and `verdant-esg-logo-white.png` (Deep Forest palette).
- **Images:** `assets/images/*.jpg`: the seven `*-hero.jpg` page photos, `about-team.jpg`, and the three `insight-*.jpg` thumbnails.
- **Leaf shapes:** `assets/leaf/*.svg` and `assets/leaf/masks/*.svg`. These are traced from the logo. **Never** substitute a generic leaf icon. Build small reusable components (LeafSmall bullet, LeafLarge badge/outline, Slit dash, Sprout, StemDivider), coloured with `currentColor` or CSS masks so they follow the palette.

## Design tokens
Use CSS variables on the page root and point Tailwind's theme at them; never hard-code hex values in components. The default palette is **Moss & Stone**:

`--bg #F4F2EC · --surface #ECE8DE · --fg #141414 · --muted #66635B · --line #DCD7CA · --primary #5E7A4A · --on-primary #FFFFFF · --primary-hover-fg #141414 · --accent #C9D8A8 · --accent-ink #5E7A4A · --leaf #5E7A4A · --deep #1F2A19 · --deep-fg #F4F2EC · --deep-muted #B5BBA8 · --deep-line #34402C · --deep-accent #C9D8A8`

Three more palettes (Verdant, Deep Forest, Mono + Mint) are defined at the top of `assets/css/vg-core.css`. Include them as `.p-verdant / .p-forest / .p-mint / .p-moss` classes on the root. Show the palette switcher (bottom-right pill) only when the URL has `?palette`.

Other system values to match exactly:
- **Type:** H1 72px/1.0 bold, −0.02em (60 at tablet, 40–46 on mobile). H2 48px/1.06 (34–36 on mobile). XL H2 64px. H3 22px. Body 16–17px/1.7. Eyebrow 12px bold, letter-spacing .18em, uppercase, led by the small leaf.
- **Layout:** 12-column grid, 24px gutter, max-width 1400px, 32px side padding (20px on mobile). Breakpoints at 1180px and 760px. Sections use 144–160px vertical padding (96–104px on mobile).
- **Signature "leaf corner" radius:** `0 4px 48px 4px` (buttons `0 4px 18px 4px`, cards `0 4px 40px 4px`).
- **One dark (`--deep`) block per page:** the closing CTA. On the guide it's the "When to pause" card instead.

## Shared components
- **Nav:** logo, the sprout scroll-progress indicator (it fills bottom → top with page progress), Home, About, Services ▾ (5 services + "View all services", with a "Tool" tag on AI Screening), Resources ▾, and a Contact pill. It turns translucent with a blur after 8px of scroll. On mobile it collapses to a full-width menu panel. Mark the current page with `aria-current`.
- **Footer:** newsletter form, logo + tagline + email, Company / Services / Resources columns, a legal bar, and the oversized outline sprout cropped bottom-right.
- **Page hero:** eyebrow or breadcrumb, H1, accent lead, intro at columns 7–12, CTAs. On the right, the large leaf outline that draws itself in, with the service number (01–05), "5" (Services) or "8" (Guide) inside it.
- **Section pieces:** photo figure (21:9, 4:3 on mobile, with a caption led by a slit dash); section head (eyebrow + H2 left, intro right); statement line; leaf-bullet lists; cards; leaf-number badges (`.fw`); deliverable pairs; numbered rows; ASA/CMA lens cards; 6-step workflow; sample report card; "does not do" cards; the services index rows; the guide card with the "8" leaf; article cards; the contact form.
- **Guide page:** a two-column long read with a sticky "In this guide" table of contents that highlights the current section (it becomes a collapsible `<details>` under 1180px), plus timeline, definition card, risk blocks with "What to check" / "The safer approach" boxes, and the dark escalation card.

## Motion (important; follow `docs/HANDOFF.md` §13 and port `assets/js/motion.js`)
The feel is corporate, calm and precise. Use `expo.out` for things arriving, `expo.inOut` for wipes, and `back.out` only for leaf badges and bullets. Durations are 0.9–1.4s, staggers 0.07–0.1s. Nothing bouncy or flashy.

1. **Lenis smooth scroll**, synced to the GSAP ticker and ScrollTrigger. Anchor links scroll with a 96px offset.
2. **Page transitions:** on internal navigation a `--deep` curtain rises from the bottom (0.65s) with the sprout fading in. The new route opens with the curtain lifting away (0.9s).
3. **Hero timeline on each page:**
   - nav drops in;
   - eyebrow rises;
   - the H1 is split into lines with SplitText that rise out of a mask (yPercent 112 → 0, stagger .09);
   - then the lead, the intro paragraphs and the CTAs follow;
   - the big leaf outline draws in (stroke-dashoffset), its tint fades in, and its number rises.
4. **Nav** hides when scrolling down past 520px and returns on scroll up.
5. **Section H2s:** SplitText lines rise out of a mask when they enter the viewport.
6. **Blocks and lists:** fade and rise 32px. Grid siblings and list rows stagger. Leaf bullets bud open. Hairlines draw left → right. Leaf badges pop. Workflow steps light up in sequence.
7. **Statements and pull quotes:** split into words that brighten from 16% → 100% opacity, scrubbed as you scroll.
8. **Photos:** the clip-path unmasks from `inset(12% 8%)` while the image settles from scale 1.3 → 1.12, then a ±5% parallax drift with scroll.
9. **Dark CTA blocks:** expand from `inset(0 3.5% round 44px)` to full bleed, scrubbed on entry.
10. **Hover:** buttons get an accent fill sweep from the left; text links get an underline that draws in; cards lift 6px with a soft shadow; arrow icons slide 3px and grow a tiny leaf.
11. **Homepage extras:**
    - the hero sprout drawing sequence;
    - the stat counters (3, 6, 100%);
    - the strike-throughs across the Red Zone terms.
12. **Reduced motion:** honour `prefers-reduced-motion: reduce`. Skip GSAP, disable Lenis and show final states.

## Behaviour and quality
- Contact form fields: full name, work email, company, and "How can we help?". Validate them, and show a calm success state. Wire it to a Supabase table (`enquiries`) if a backend is connected; otherwise keep it client-only and say so in a comment.
- The newsletter form works the same way, with a `subscribers` table.
- Use semantic HTML, visible focus rings (2px `--primary`, 3px offset), alt text from the reference files, and 44px touch targets. There must be no horizontal scroll at any width.
- Set a per-page `<title>` and meta description from each page's hero.
- Match the reference pages at 1440, 1180, 768 and 390px wide.

**Work in this order:**
1. Tokens, fonts and the leaf components.
2. Nav, footer, buttons and the motion provider (Lenis + GSAP + page transition).
3. The homepage.
4. About.
5. Services and the five service pages (one data-driven template is fine, as long as each page keeps its own sections and copy).
6. Resources and the guide.
7. Contact.

After each step, compare the result against the matching reference page.
