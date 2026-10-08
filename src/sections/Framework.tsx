import { Eyebrow } from '../components/Eyebrow';
import { LeafBadge, SproutMini } from '../components/leaf';

const PRINCIPLES = [
  ['Truthful and Accurate', 'Move beyond halo effects and into factual precision.'],
  ['Clear and Unambiguous', "Ensure consumers aren't misled by technical jargon."],
  ['No Omission of Material Information', 'Provide the full picture of environmental impacts.'],
  ['Fair and Meaningful Comparisons', 'Defend your "greenest" or "more sustainable" assertions.'],
  ['Contextually Complete', "Prove that a benefit in one section of the product's lifecycle is not offset by negative impacts in another."],
  ['Full Substantiation', 'Build the contemporaneous evidence packs needed to mount a defence.'],
];

export function Framework() {
  return (
    <section className="sec" id="framework">
      <div className="wrap">
        <div className="g12 head rv">
          <div className="s6">
            <Eyebrow>The Framework</Eyebrow>
            <h2 className="h2">CMA's Six-Point Test.</h2>
            <p className="sub">Precision over Persuasion</p>
          </div>
          <div className="s5 st8">
            <p className="body">We align your commercial output with the CMA Green Claims Code. Our consultancy ensures that every statement satisfies the six fundamental principles of the new regulatory framework.</p>
          </div>
        </div>
        <ol className="fw">
          {PRINCIPLES.map(([t, b], i) => (
            <li className="rv" key={t}>
              <span className="idx"><LeafBadge /><span>{String(i + 1).padStart(2, '0')}</span></span>
              <h3 className="h3">{t}</h3>
              <p className="body">{b}</p>
            </li>
          ))}
        </ol>
        <div className="callout rv">
          <SproutMini />
          <p>Evidence must exist at the point a claim is made and not be developed retroactively.</p>
        </div>
      </div>
    </section>
  );
}
