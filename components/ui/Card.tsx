import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  isUpcoming?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className = '', isUpcoming = false }) => {
  const upcomingClasses = isUpcoming 
    ? 'border-2 border-blue-500 shadow-blue-100' 
    : 'border border-transparent';

  return (
    <div className={`relative bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${upcomingClasses} ${className}`}>
      {isUpcoming && (
        <div className="absolute top-0 right-0 mt-2 mr-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          Akan Datang
        </div>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default Card;
