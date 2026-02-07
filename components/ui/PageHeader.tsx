import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-12">
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        {title}
      </h1>
      {subtitle && (
        <p className="mt-3 text-xl text-gray-500 sm:mt-4">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
