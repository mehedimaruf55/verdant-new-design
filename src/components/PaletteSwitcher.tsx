import { PALETTES, type PaletteId } from '../data';

export function PaletteSwitcher({ value, onChange }: { value: PaletteId; onChange: (id: PaletteId) => void }) {
  return (
    <div className="pal" role="group" aria-label="Colour palette">
      <span className="pal-name">{PALETTES[value]}</span>
      {(Object.keys(PALETTES) as PaletteId[]).map((id) => (
        <button
          key={id}
          className={`sw sw-${id}${id === value ? ' is-on' : ''}`}
          type="button"
          aria-label={PALETTES[id]}
          title={PALETTES[id]}
          aria-pressed={id === value}
          onClick={() => onChange(id)}
        />
      ))}
    </div>
  );
}
