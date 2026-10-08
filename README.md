# Verdant ESG — website (2027 design)

Static reference build of the redesigned Verdant ESG site: all 11 pages in the Moss & Stone palette, with the full motion system.

**View it:** open `index.html` in a browser, or enable GitHub Pages (Settings → Pages → Deploy from branch → `main` / root) for a live URL. The pages link to each other, and the palette switcher is bottom-right.

| Page | File |
|---|---|
| Home | `index.html` |
| About | `about.html` |
| Services | `services.html` |
| Green Claims Risk Audit | `service-green-claims-risk-audit.html` |
| Ongoing Compliance Support | `service-ongoing-compliance-support.html` |
| Supply Chain Transparency Review | `service-supply-chain-transparency-review.html` |
| Regulatory Response Readiness | `service-regulatory-response-readiness.html` |
| AI-Assisted Green Claims Screening | `service-ai-assisted-green-claims-screening.html` |
| Insights & Guides | `resources.html` |
| 8 Greenwashing Risks (guide) | `guide-8-greenwashing-risks.html` |
| Contact | `contact.html` |

## What's here
- `assets/fonts`, `assets/logo`, `assets/images`: Cedora 400/700, logos, and the original page photos.
- `assets/leaf`: every leaf shape, traced from the logo. `masks/` holds the CSS-mask versions.
- `assets/css/vg-core.css`: the shared stylesheet for the inner pages. Each page also inlines its own styles, so it works on its own.
- `assets/css/vg-motion.css`: the CSS motion layer (reveals, hairlines, badges, hovers, page-load entrances).
- `assets/js/motion.js`: the GSAP motion layer (Lenis smooth scroll, page transitions, SplitText headline and word reveals, photo unmask + parallax, the dark-block expand, hide-on-scroll nav).
- `assets/js/vendor`: GSAP 3.13 (core, ScrollTrigger, SplitText; GreenSock's no-charge standard licence) and Lenis 1.3.4 (MIT).
- `docs/HANDOFF.md`: the build spec. Tokens, type, layout, every page's sections, open items, and the motion spec (§13).
- `docs/CLAUDE_CODE_PROMPT.md`: prompts for rebuilding the site in an existing codebase with Claude Code.
- `LOVABLE_PROMPT.md`: the prompt for rebuilding the whole site in Lovable.

All motion respects `prefers-reduced-motion`.
