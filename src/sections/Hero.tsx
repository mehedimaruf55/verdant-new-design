import { ArrowLeaf, HeroSprout, Slit } from '../components/leaf';
import { Eyebrow } from '../components/Eyebrow';

export function Hero() {
  return (
    <section className="hero" id="top">
      <HeroSprout />
      <div className="wrap g12">
        <div className="hero-copy s6">
          <Eyebrow>ESG Consultancy</Eyebrow>
          <h1 className="h1">
            Environmental Claims are now <span className="em">Enforcement<Slit className="em-slit" /></span> Realities.
          </h1>
          <p className="lead">The era of aspirational green marketing is over. Today, environmental statements can prompt legal scrutiny. We provide the technical rigour and evidence-led consultancy required to assess green claims and protect your commercial reputation.</p>
          <div className="cta-row">
            <a className="btn" href="/contact">Assess Your Exposure <ArrowLeaf /></a>
            <a className="tlink" href="#framework">View Our Governance Framework <ArrowLeaf /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
