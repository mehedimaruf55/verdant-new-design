# Verdant ESG — homepage

Vite + React + TypeScript, plain CSS (ported from the approved prototype). Design spec and prototype live in `design-handoff/`.

```
npm install
npm run dev      # http://localhost:5173
npm run build
```

- Palette switcher (client-review tool) is hidden by default. Add `?palette` to the URL to show it, or `?palette=forest|mint|moss|verdant` to preselect.
- Leaf shapes are generated verbatim from the prototype into `src/components/leaf/paths.ts`; components in `src/components/leaf/index.tsx`.
- Open items (service URLs, newsletter backend, button contrast): see `design-handoff/HANDOFF.md` §8–9.
