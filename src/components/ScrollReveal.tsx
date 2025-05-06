import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({ children, className = '' }) => {
  const ref = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} data-scroll className={className}>
      {children}
    </div>
  );
};

export default ScrollReveal;