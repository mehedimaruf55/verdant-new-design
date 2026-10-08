import type { ReactNode } from 'react';
import { LeafSmall } from './leaf';

export const Eyebrow = ({ children, className = '' }: { children: ReactNode; className?: string }) => (
  <p className={`eyebrow ${className}`.trim()}><LeafSmall />{children}</p>
);
