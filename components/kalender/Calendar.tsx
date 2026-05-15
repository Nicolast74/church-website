"use client";

import { useState } from 'react';

// Dummy data for liturgical events. In a real app, this would come from a database.
const liturgicalEvents: { [key: string]: { title: string; color: string } } = {
  '2026-02-06': { title: 'Peringatan Wajib St. Paulus Miki, Martir', color: 'red' },
  '2026-02-08': { title: 'Hari Minggu Biasa V', color: 'green' },
  '2026-02-14': { title: 'Pesta St. Sirilus dan Metodius', color: 'white' },
  '2026-02-18': { title: 'Rabu Abu', color: 'purple' },
};

const liturgicalColorClasses: { [key: string]: { bg: string; text: string; dot: string } } = {
  red: { bg: 'bg-red-50', text: 'text-red-800', dot: 'bg-red-500' },
  green: { bg: 'bg-green-50', text: 'text-green-800', dot: 'bg-green-500' },
  white: { bg: 'bg-gray-50', text: 'text-gray-800', dot: 'bg-gray-400' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-800', dot: 'bg-purple-500' },
};

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 1)); // Start with Feb 2026
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(2026, 1, 6));

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const monthName = currentDate.toLocaleString('id-ID', { month: 'long' });

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(new Date(year, month, day));
  };

  const renderDays = () => {
    const days = [];
    // Add blank days for the first week
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`blank-${i}`} className="p-2 border rounded-lg"></div>);
    }
    // Add the days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const event = liturgicalEvents[dateKey];
      const isSelected = selectedDate && selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
      
      const dayClasses = `p-2 border rounded-lg cursor-pointer transition-colors relative ${
        isSelected ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'
      }`;

      days.push(
        <div key={day} className={dayClasses} onClick={() => handleDateClick(day)}>
          <span>{day}</span>
          {event && <div className={`absolute bottom-2 right-2 h-2 w-2 rounded-full ${liturgicalColorClasses[event.color]?.dot}`}></div>}
        </div>
      );
    }
    return days;
  };

  const selectedEvent = selectedDate ? liturgicalEvents[`${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`] : null;
  const selectedEventColor = selectedEvent ? liturgicalColorClasses[selectedEvent.color] : liturgicalColorClasses.white;

  return (
    <div>
      <div className="flex items-center justify-center mb-6">
        <button onClick={handlePrevMonth} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">&larr;</button>
        <h2 className="text-2xl font-bold mx-4 w-48 text-center">{`${monthName} ${year}`}</h2>
        <button onClick={handleNextMonth} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors">&rarr;</button>
      </div>
      <div className="grid grid-cols-7 gap-2 text-center">
        <div className="font-bold">Min</div>
        <div className="font-bold">Sen</div>
        <div className="font-bold">Sel</div>
        <div className="font-bold">Rab</div>
        <div className="font-bold">Kam</div>
        <div className="font-bold">Jum</div>
        <div className="font-bold">Sab</div>
        {renderDays()}
      </div>
      {selectedDate && (
        <div className={`mt-8 p-4 border-l-4 rounded-r-lg ${selectedEvent ? `${selectedEventColor.bg} border-${selectedEvent.color}-500` : 'bg-gray-50 border-gray-400'}`}>
          <h3 className={`font-bold ${selectedEvent ? selectedEventColor.text : 'text-gray-800'}`}>
            {selectedDate.toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </h3>
          <p className={`mt-1 ${selectedEvent ? selectedEventColor.text : 'text-gray-600'}`}>
            {selectedEvent ? selectedEvent.title : 'Tidak ada acara liturgi khusus.'}
          </p>
        </div>
      )}
    </div>
  );
}
