import { useEffect, useRef, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Nav translucency after 8px + sprout indicator fill (rAF-throttled). */
export function useScrollChrome() {
  const rect = useRef<SVGRectElement>(null);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      ticking = false;
      const se = document.documentElement;
      const max = se.scrollHeight - window.innerHeight;
      const y = window.scrollY || se.scrollTop || 0;
      const p = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      const top = 12 + 213 * (1 - p); // sprout spans y 12 → 225 in its 310×238 viewBox
      if (rect.current) {
        rect.current.setAttribute('y', top.toFixed(1));
        rect.current.setAttribute('height', (238 - top).toFixed(1));
      }
      setScrolled(y > 8);
    };
    const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return { rect, scrolled };
}

/** Fade/rise on scroll. Adds `.rv-on` to the page root, and `.in` to each `.rv` once it is 8% visible. */
export function useReveal(root: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    el.classList.add('rv-on');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    el.querySelectorAll('.rv').forEach((n) => io.observe(n));
    return () => { io.disconnect(); el.classList.remove('rv-on'); };
  }, [root]);
}

/** Counts 0 → value once the stats row is 40% visible (only if it starts below the fold). */
export function useCountUp(values: number[]) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(values);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || !('IntersectionObserver' in window)) return;
    if (el.getBoundingClientRect().top <= window.innerHeight) return;
    setShown(values.map(() => 0));
    let raf = 0;
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now(), dur = 1700;
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / dur), eased = 1 - Math.pow(1 - k, 3);
        setShown(values.map((v) => Math.round(v * eased)));
        if (k < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return { ref, shown };
}
