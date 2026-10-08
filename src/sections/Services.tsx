import { Eyebrow } from '../components/Eyebrow';
import { ArrowLeaf } from '../components/leaf';
import { SERVICES } from '../data';

export function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <div className="g12 head rv">
          <div className="s6">
            <Eyebrow>Services</Eyebrow>
            <h2 className="h2">Our Services</h2>
          </div>
          <div className="s6 st7 right">
            <a className="tlink" href="/services">View all services <ArrowLeaf /></a>
          </div>
        </div>
        <ul className="svc">
          {SERVICES.map((s) => (
            <li className="rv" key={s.href}>
              <a className="svc-row" href={s.href}>
                <span className="svc-n">{s.n}</span>
                <span className="svc-t">{s.title}{s.tool && <span className="tag">Tool</span>}</span>
                <span className="svc-d">{s.desc}</span>
                <span className="svc-a"><ArrowLeaf /></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
