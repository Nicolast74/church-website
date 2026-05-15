import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  isGray?: boolean;
  noPaddingTop?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = '', isGray = false, noPaddingTop = false }) => {
  // Use CSS variables so dark mode always applies without JIT compilation uncertainty
  const bgStyle = isGray
    ? { background: 'color-mix(in srgb, var(--background) 90%, currentColor 5%)' }
    : { background: 'var(--background)' };

  return (
    <section className={`py-16 sm:py-24 transition-colors duration-200 ${noPaddingTop ? 'pt-0 sm:pt-0' : ''} ${className}`} style={bgStyle}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
