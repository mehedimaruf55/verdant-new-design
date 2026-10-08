import { Eyebrow } from '../components/Eyebrow';
import { LeafSmall, Slit } from '../components/leaf';

const TERMS = ['Net Zero', 'Carbon Neutral', 'Sustainable', 'Eco-Friendly', 'Responsibly Sourced'];
const CALLS = ['Refining the scope and boundaries', 'Transparent methodology', 'Evidentiary support', 'Clearly explaining limitations'];

export function RedZone() {
  return (
    <section className="deep" id="red-zone">
      <div className="wrap">
        <div className="g12 head rv">
          <div className="s7">
            <Eyebrow>The 'Red Zone' Terminology</Eyebrow>
            <h2 className="h2">Is your vocabulary creating liability?</h2>
          </div>
          <div className="s4 st9">
            <p className="body">In the current regulatory environment, "absolute" claims must be accompanied by absolute proof. We specialise in de-risking high-stakes terminology.</p>
          </div>
        </div>
        <div className="g12 rz">
          <ul className="terms s7">
            {TERMS.map((t, i) => (
              <li className="rv" key={t}>
                <span className="tn">{String(i + 1).padStart(2, '0')}</span>
                <span className="term">{t}<Slit className="strike" /></span>
              </li>
            ))}
          </ul>
          <div className="s4 st9 rz-side rv">
            <h3 className="h3">Such terms often call for:</h3>
            <ul className="ll on-deep">
              {CALLS.map((t) => <li key={t}><LeafSmall /><span>{t}</span></li>)}
            </ul>
            <p className="note"><Slit /><span>Without this, they may be considered misleading due to ambiguity or lack of substantiation.</span></p>
          </div>
        </div>
      </div>
    </section>
  );
}
