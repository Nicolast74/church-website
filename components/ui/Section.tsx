import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  isGray?: boolean;
}

const Section: React.FC<SectionProps> = ({ children, className = '', isGray = false }) => {
  const bgColor = isGray ? 'bg-gray-50' : 'bg-white';
  return (
    <section className={`py-16 sm:py-20 ${bgColor} ${className}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};

export default Section;
