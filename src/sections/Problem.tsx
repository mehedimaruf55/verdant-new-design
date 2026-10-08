import { Eyebrow } from '../components/Eyebrow';
import { LeafSmall, Slit } from '../components/leaf';
import { useCountUp } from '../hooks';

const FOCUS = ['The clarity of claims', 'The context in which they are presented', 'How they are understood by consumers', 'The evidence supporting them'];
const STANDARD = ['Clear and unambiguous', 'Avoid misleading by omission', 'Reflect the appropriate scope of the product or service', 'Based on verifiable, contemporaneous evidence'];
const CARDS = [
  { n: '01', t: 'The Substantiation Trap', b: 'Broad, aspirational statements such as "Net Zero" or "Sustainable" made without an internal evidence repository that survives an audit are being flagged by regulators as inherently deceptive. Every claim must be supported by data accessible at the point of sale.' },
  { n: '02', t: 'Misleading by Omission', b: "Highlighting a single 'green' feature while ignoring significant environmental impacts elsewhere in the supply chain is no longer viable. Total lifecycle transparency is becoming the new legal baseline." },
  { n: '03', t: 'Compliance Lag', b: 'Marketing cycles move quicker than legal and ESG teams can verify data, leading to unqualified claims that can attract ASA/CAP sanctions. Alignment between creative and compliance teams is now a strategic necessity.' },
];

const List = ({ items, className = 'll' }: { items: string[]; className?: string }) => (
  <ul className={className}>{items.map((t) => <li key={t}><LeafSmall /><span>{t}</span></li>)}</ul>
);

export function Problem() {
  const { ref, shown } = useCountUp([3, 6, 100]);
  return (
    <section className="sec" id="problem">
      <div className="wrap">
        <div className="g12 head rv">
          <div className="s4">
            <Eyebrow>The Problem</Eyebrow>
            <h2 className="h2">A Gap in Scrutiny</h2>
          </div>
          <div className="s6 st7">
            <h3 className="h3 lg">Why Greenwashing is Now a Boardroom Risk.</h3>
            <p className="body">Regulators are increasingly categorising environmental claims as greenwashing where they are vague, exaggerated, or unsubstantiated — closing the gap between corporate ambition and verifiable action.</p>
          </div>
        </div>

        <div className="g12 stats rv" ref={ref}>
          <div className="stat s4"><div className="num"><span>{shown[0]}</span></div><div className="cap">Core Exposure Risks</div></div>
          <div className="stat s4"><div className="num"><span>{shown[1]}</span></div><div className="cap">CMA Principles</div></div>
          <div className="stat s4"><div className="num"><span>{shown[2]}</span><span className="pc">%</span></div><div className="cap">Substantiation Required</div></div>
        </div>

        <div className="g12 two">
          <div className="s5 rv">
            <h3 className="h3">Regulatory Focus</h3>
            <p className="body muted">Regulators such as the CMA and ASA, applying the CAP Code, are shifting from voluntary guidance to strictly enforced disclosure. They now scrutinise:</p>
            <List items={FOCUS} />
          </div>
          <div className="s5 st8 rv">
            <h3 className="h3">The Compliance Standard</h3>
            <p className="body muted">It is no longer enough for a claim to be technically true in a narrow sense. Environmental communication must also be:</p>
            <List items={STANDARD} />
          </div>
        </div>

        <div className="exposure">
          <Eyebrow className="rv">Your Exposure</Eyebrow>
          <div className="cards">
            {CARDS.map((c) => (
              <article className="card rv" key={c.n}>
                <div className="card-k"><span className="cap">{c.n}</span><Slit /></div>
                <h3 className="h3">{c.t}</h3>
                <p className="body">{c.b}</p>
              </article>
            ))}
          </div>
        </div>

        <figure className="pull g12 rv">
          <div className="s8 st3">
            <Slit />
            <blockquote>Greenwashing is a <span>Governance Failure</span>, Not a Marketing Choice.</blockquote>
          </div>
        </figure>
      </div>
    </section>
  );
}
