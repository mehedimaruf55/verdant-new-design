# Verdant ESG — homepage

Vite + React + TypeScript, plain CSS (ported from the approved prototype). Design spec and prototype live in `design-handoff/`.

```
npm install
npm run dev      # http://localhost:5173
npm run build
```

- Palette switcher (client-review tool) is visible, as in the prototype. Set `SWITCHER_ON` in `src/App.tsx` to `false` (or gate it on `?palette`) before launch. `?palette=forest|mint|moss|verdant` preselects a palette.
- Leaf shapes are generated verbatim from the prototype into `src/components/leaf/paths.ts`; components in `src/components/leaf/index.tsx`.
- Open items (service URLs, newsletter backend, button contrast): see `design-handoff/HANDOFF.md` §8–9.
