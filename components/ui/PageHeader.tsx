import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="text-center mb-16">
      <h1 className="text-4xl font-serif font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl relative inline-block pb-4">
        {title}
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-amber-600 rounded-full opacity-80"></span>
      </h1>
      {subtitle && (
        <p className="mt-6 text-xl text-slate-600 dark:text-slate-400 sm:mt-8 max-w-2xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default PageHeader;
