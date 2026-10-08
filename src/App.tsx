import { useEffect, useRef, useState } from 'react';
import { PALETTES, type PaletteId } from './data';
import { GradientDefs } from './components/leaf';
import { PaletteSwitcher } from './components/PaletteSwitcher';
import { StemDividerRow } from './components/StemDivider';
import { useReveal } from './hooks';
import { Nav } from './sections/Nav';
import { Hero } from './sections/Hero';
import { Problem } from './sections/Problem';
import { Framework } from './sections/Framework';
import { RedZone } from './sections/RedZone';
import { Services } from './sections/Services';
import { Resources } from './sections/Resources';
import { Cta } from './sections/Cta';
import { Footer } from './sections/Footer';

const STORAGE_KEY = 'verdant-palette';
const isPalette = (v: unknown): v is PaletteId => typeof v === 'string' && v in PALETTES;

/** Matches the prototype: switcher visible and remembered. Set to false (or gate on `?palette`) before launch. */
const params = new URLSearchParams(window.location.search);
const SWITCHER_ON = true;

function initialPalette(): PaletteId {
  const q = params.get('palette');
  if (isPalette(q)) return q;
  if (SWITCHER_ON) {
    try { const s = localStorage.getItem(STORAGE_KEY); if (isPalette(s)) return s; } catch { /* ignore */ }
  }
  return 'verdant';
}

export default function App() {
  const root = useRef<HTMLDivElement>(null);
  const [palette, setPalette] = useState<PaletteId>(initialPalette);
  useReveal(root);

  useEffect(() => {
    if (!SWITCHER_ON) return;
    try { localStorage.setItem(STORAGE_KEY, palette); } catch { /* ignore */ }
  }, [palette]);

  return (
    <div ref={root} className={`vg p-${palette}`}>
      <GradientDefs />
      <Nav />
      <main>
        <Hero />
        <Problem />
        <div className="wrap"><StemDividerRow /></div>
        <Framework />
        <RedZone />
        <Services />
        <Resources />
        <Cta />
      </main>
      <Footer />
      {SWITCHER_ON && <PaletteSwitcher value={palette} onChange={setPalette} />}
    </div>
  );
}
