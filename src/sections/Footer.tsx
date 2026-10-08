import type { FormEvent } from 'react';
import { Eyebrow } from '../components/Eyebrow';
import { Logo } from '../components/Logo';
import { ArrowLeaf, SproutOutline } from '../components/leaf';
import { SERVICES } from '../data';

export function Footer() {
  // TODO: wire to the site's newsletter provider (no backend in the handoff).
  const onSubmit = (e: FormEvent) => e.preventDefault();
  return (
    <footer className="foot">
      <SproutOutline />
      <div className="wrap">
        <div className="g12 news">
          <div className="s5">
            <Eyebrow>Stay Updated</Eyebrow>
            <h3 className="h3 lg">Subscribe to Our Newsletter</h3>
            <p className="body muted">Get the latest ESG insights, industry trends, and sustainability updates delivered to your inbox.</p>
          </div>
          <form className="nl-form s6 st7" onSubmit={onSubmit}>
            <label className="sr" htmlFor="vg-email">Email address</label>
            <input id="vg-email" type="email" name="email" placeholder="Email address" autoComplete="email" />
            <button className="btn" type="submit">Subscribe <ArrowLeaf /></button>
          </form>
        </div>
        <div className="g12 cols">
          <div className="s4 brandcol">
            <Logo />
            <a className="mail" href="mailto:hello@verdantesg.com">hello@verdantesg.com</a>
          </div>
          <div className="s2 st6 half">
            <p className="col-h">Company</p>
            <ul><li><a href="/">Home</a></li><li><a href="/about">About</a></li><li><a href="/contact">Contact</a></li></ul>
          </div>
          <div className="s3">
            <p className="col-h">Services</p>
            <ul>{SERVICES.map((s) => <li key={s.href}><a href={s.href}>{s.title}</a></li>)}</ul>
          </div>
          <div className="s2 half">
            <p className="col-h">Resources</p>
            <ul><li><a href="/resources">Insights &amp; Guides</a></li><li><a href="/resources/8-greenwashing-risks">8 Greenwashing Risks</a></li></ul>
          </div>
        </div>
        <div className="bottom">
          <span>© 2026 Verdant ESG. All rights reserved.</span>
          <nav aria-label="Legal"><a href="/privacy-policy">Privacy Policy</a><a href="/terms-of-use">Terms of Use</a></nav>
        </div>
      </div>
    </footer>
  );
}
