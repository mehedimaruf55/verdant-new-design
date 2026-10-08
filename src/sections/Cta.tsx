import { ArrowLeaf } from '../components/leaf';
import { StemDividerRow } from '../components/StemDivider';

export function Cta() {
  return (
    <section className="cta" id="contact-cta">
      <div className="wrap">
        <StemDividerRow />
        <div className="g12 rv">
          <div className="s8"><h2 className="h2 xl">Move from Vulnerability to Verified Compliance</h2></div>
          <div className="s4 self-end">
            <p className="body">Do not let your environmental claims become regulatory liabilities.</p>
            <a className="btn" href="/contact">Book a Technical Consultation <ArrowLeaf /></a>
          </div>
        </div>
      </div>
    </section>
  );
}
