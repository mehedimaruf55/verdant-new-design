import { Eyebrow } from '../components/Eyebrow';
import { ArrowLeaf, LeafBadge } from '../components/leaf';

export function Resources() {
  return (
    <section className="res" id="resources">
      <div className="wrap">
        <Eyebrow className="rv">Resources</Eyebrow>
        <a className="guide rv" href="/resources/8-greenwashing-risks">
          <div className="guide-copy">
            <span className="tag">Guide</span>
            <h3 className="guide-t">8 Greenwashing Risks Every Brand Should Check Before Publishing a Sustainability Claim</h3>
            <p className="body">A pre-publication checklist for the eight most common — and most frequently penalised — categories of misleading environmental claim.</p>
            <span className="tlink">Read the guide <ArrowLeaf /></span>
          </div>
          <div className="guide-art" aria-hidden="true">
            <LeafBadge />
            <span className="g8">8</span>
          </div>
        </a>
      </div>
    </section>
  );
}
