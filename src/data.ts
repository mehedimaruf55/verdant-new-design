export const SERVICES = [
  { n: '01', title: 'Green Claims Risk Audit', desc: 'Find Weakpoints In Your Communication Ecosystem', href: '/services/green-claims-risk-audit' },
  { n: '02', title: 'Ongoing Compliance Support', desc: 'Reduce Risk on Fast-Moving Brands', href: '/services/ongoing-compliance-support' },
  { n: '03', title: 'Supply Chain Transparency Review', desc: 'Connecting What You Say to What Actually Happens', href: '/services/supply-chain-transparency-review' },
  { n: '04', title: 'Regulatory Response Readiness', desc: 'Prepare Before Scrutiny Arrives', href: '/services/regulatory-response-readiness' },
  { n: '05', title: 'AI-Assisted Green Claims Screening', desc: 'Built by Regulatory Specialists. Trained on the Right Risks.', href: '/services/ai-assisted-green-claims-screening', tool: true },
];

export const PALETTES = {
  verdant: 'Verdant',
  forest: 'Deep Forest',
  mint: 'Mono + Mint',
  moss: 'Moss & Stone',
} as const;
export type PaletteId = keyof typeof PALETTES;
