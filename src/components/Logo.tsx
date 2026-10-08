/** Wordmark flips black/white (white on Deep Forest via CSS); the sprout stays green in both files. */
export const Logo = ({ className = 'brand' }: { className?: string }) => (
  <a className={className} href="/" aria-label="Verdant ESG — home">
    <img className="logo logo-b" src="/logo/verdant-esg-logo-black.png" alt="Verdant ESG" />
    <img className="logo logo-w" src="/logo/verdant-esg-logo-white.png" alt="" aria-hidden="true" />
  </a>
);
