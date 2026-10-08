import type { SVGProps } from 'react';
import {
  LEAF_SMALL, LEAF_LARGE, SLIT, STEM, SPROUT_NAV, HERO_FILL, HERO_SLIT_L, HERO_SLIT_R, SPROUT_MINI, FOOTER,
} from './paths';

type P = SVGProps<SVGSVGElement>;

/** Shared gradient so every filled sprout recolours through --leaf-a / --leaf-b. */
export const GradientDefs = () => (
  <svg className="vg-defs" width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="vgGrad" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" className="ga" />
        <stop offset="1" className="gb" />
      </linearGradient>
    </defs>
  </svg>
);

/** Small (left) leaf: bullets and eyebrow markers. */
export const LeafSmall = ({ className = 'lb', ...p }: P) => (
  <svg className={className} viewBox="0 0 148 99" aria-hidden="true" {...p}><path d={LEAF_SMALL} /></svg>
);

/** The slit as a graphic stroke: dashes, underline, strike-through. */
export const Slit = ({ className = 'dash', ...p }: P) => (
  <svg className={className} viewBox="0 0 71.9 11.8" preserveAspectRatio="none" aria-hidden="true" {...p}><path d={SLIT} /></svg>
);

/** Arrow that grows a small leaf on hover (CSS-driven). */
export const ArrowLeaf = () => (
  <svg className="arr" viewBox="0 -3 24 17" aria-hidden="true">
    <path className="ln" d="M1 7.5H21M16 2.5L21 7.5L16 12.5" />
    <g transform="translate(5.6 -1.4) scale(0.058)"><path className="lf" d={LEAF_LARGE} /></g>
  </svg>
);

/** Large single leaf in outline: index badges and the guide card art. */
export const LeafBadge = (p: P) => (
  <svg viewBox="-3 -3 146 161" aria-hidden="true" {...p}><path d={LEAF_LARGE} /></svg>
);

export const StemDivider = () => (
  <svg className="sd" viewBox="0 -36 122 85.5" aria-hidden="true">
    <path className="st" d={STEM} />
    <g transform="translate(84 -34) scale(0.22)"><path className="lf2" d={LEAF_LARGE} /></g>
  </svg>
);

/** Small gradient sprout with both slits cut out (callout). */
export const SproutMini = ({ className = 'mini' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 310 238" aria-hidden="true"><path className="eo" fill="url(#vgGrad)" d={SPROUT_MINI} /></svg>
);

/** Stroke-only sprout, cropped off the footer's bottom-right edge. */
export const SproutOutline = ({ className = 'fsp' }: { className?: string }) => (
  <svg className={className} viewBox="0 0 310 238" aria-hidden="true"><path d={FOOTER} /></svg>
);

/** Hero sprout: outline draws, fill fades in, slits open (see styles.css). */
export const HeroSprout = () => (
  <svg className="hero-sprout" viewBox="0 0 310 238" aria-hidden="true">
    <defs>
      <mask id="vgSlits" maskUnits="userSpaceOnUse" x="0" y="0" width="310" height="238">
        <rect x="0" y="0" width="310" height="238" fill="#ffffff" />
        <path className="slit-m" fill="#000000" d={HERO_SLIT_L} />
        <path className="slit-m d2" fill="#000000" d={HERO_SLIT_R} />
      </mask>
    </defs>
    <g mask="url(#vgSlits)">
      <path className="sp-fill" fill="url(#vgGrad)" d={HERO_FILL} />
      <path className="sp-stroke" pathLength={1} d={HERO_FILL} />
    </g>
  </svg>
);

/** Nav scroll indicator; the clip rect is driven by useScrollChrome. */
export const SproutIndicator = ({ rectRef }: { rectRef: React.RefObject<SVGRectElement | null> }) => (
  <span className="sind" aria-hidden="true">
    <svg viewBox="0 0 310 238">
      <defs>
        <clipPath id="vgScrollClip"><rect ref={rectRef} x="0" y="225" width="310" height="13" /></clipPath>
      </defs>
      <path className="o" d={SPROUT_NAV} />
      <path className="f eo" fill="url(#vgGrad)" d={SPROUT_NAV} />
    </svg>
  </span>
);
