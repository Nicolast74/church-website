import React from 'react';

interface ReadingSection {
  title: string;
  subtitle: string;
  content: string[];
  refrain?: string;
}

interface ReadingPaneProps {
  date: string;
  readings: ReadingSection[];
}

const ReadingPane: React.FC<ReadingPaneProps> = ({ date, readings }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg max-w-3xl mx-auto overflow-hidden">
      <div className="p-8 sm:p-12">
        <p className="text-center text-lg text-gray-500 mb-8">{date}</p>
        
        <div className="space-y-10">
          {readings.map((reading, index) => (
            <div key={index}>
              <h2 className="text-2xl font-bold text-gray-800 border-b border-gray-200 pb-3 mb-4">
                {reading.title}
              </h2>
              <p className="text-md text-gray-600 italic mb-4">
                {reading.subtitle}
              </p>
              {reading.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-gray-700 leading-relaxed mb-4">
                  {paragraph}
                </p>
              ))}
              {reading.refrain && (
                <p className="text-gray-800 font-bold leading-relaxed mt-4">
                  Refren: {reading.refrain}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReadingPane;
