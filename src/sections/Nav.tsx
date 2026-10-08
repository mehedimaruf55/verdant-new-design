import { useEffect, useRef, useState } from 'react';
import { SERVICES } from '../data';
import { LeafSmall, SproutIndicator } from '../components/leaf';
import { Logo } from '../components/Logo';
import { useScrollChrome } from '../hooks';

const Chevron = () => (
  <svg className="chev" viewBox="0 0 10 10" aria-hidden="true"><path d="M2 3.5L5 6.5L8 3.5" /></svg>
);

export function Nav() {
  const { rect, scrolled } = useScrollChrome();
  const [open, setOpen] = useState(false);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); btn.current?.focus(); } };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="wrap nav-row">
        <Logo />
        <SproutIndicator rectRef={rect} />
        <nav className="links" aria-label="Primary">
          <a className="nl is-active" href="/">Home</a>
          <a className="nl" href="/about">About</a>
          <div className="dd">
            <a className="nl" href="/services">Services <Chevron /></a>
            <div className="dd-menu">
              {SERVICES.map((s) => (
                <a key={s.href} href={s.href}>
                  <LeafSmall />{s.title}{s.tool && <> <span className="tag">Tool</span></>}
                </a>
              ))}
              <a className="all" href="/services">View all services</a>
            </div>
          </div>
          <a className="nl" href="/resources">Resources</a>
        </nav>
        <a className="pill" href="/contact">Contact</a>
        <button
          ref={btn}
          className="menu-btn"
          type="button"
          aria-controls="mpanel"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg className="ic-close" viewBox="0 0 18 18" aria-hidden="true"><path d="M4 4L14 14M14 4L4 14" /></svg>
          <svg className="ic-open" viewBox="0 0 18 18" aria-hidden="true"><path d="M2 6.5H16M2 11.5H16" /></svg>
        </button>
      </div>
      <div className="mpanel" id="mpanel" hidden={!open} onClick={(e) => { if ((e.target as HTMLElement).closest('a')) setOpen(false); }}>
        <div className="wrap">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/services">Services</a></li>
            <li className="msub">
              {SERVICES.map((s) => (
                <a key={s.href} href={s.href}>{s.title}{s.tool && <> <span className="tag">Tool</span></>}</a>
              ))}
            </li>
            <li><a href="/resources">Resources</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
