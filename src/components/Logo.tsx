/** Wordmark flips black/white (white on Deep Forest via CSS); the sprout stays green in both files. */
export const Logo = ({ className = 'brand' }: { className?: string }) => (
  <a className={className} href="/" aria-label="Verdant ESG — home">
    <img className="logo logo-b" src={`${import.meta.env.BASE_URL}logo/verdant-esg-logo-black.png`} alt="Verdant ESG" />
    <img className="logo logo-w" src={`${import.meta.env.BASE_URL}logo/verdant-esg-logo-white.png`} alt="" aria-hidden="true" />
  </a>
);
