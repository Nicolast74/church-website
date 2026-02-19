import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isUpcoming?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', isUpcoming = false }) => {
  const upcomingClasses = isUpcoming 
    ? 'border-2 border-amber-500 shadow-amber-100' 
    : 'border-t-4 border-amber-600 border border-stone-100';

  return (
    <div className={`relative bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${upcomingClasses} ${className}`}>
      {isUpcoming && (
        <div className="absolute top-0 right-0 mt-4 mr-4 bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
          Akan Datang
        </div>
      )}
      <div className="p-8">
        {children}
      </div>
    </div>
  );
};

export default Card;
