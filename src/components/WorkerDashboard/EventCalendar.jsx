import { useState } from 'react';
import './WorkerDashboard.css';

export const EventCalendar = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedDate);
    const firstDay = getFirstDayOfMonth(selectedDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const dayEvents = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.toDateString();
      });

      days.push(
        <div key={day} className={`calendar-day ${dayEvents.length ? 'has-events' : ''}`}>
          <span className="day-number">{day}</span>
          {dayEvents.map(event => (
            <div key={event.id} className="calendar-event">
              {event.title}
            </div>
          ))}
        </div>
      );
    }

    return days;
  };

  const changeMonth = (increment) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + increment, 1));
  };

  return (
    <div className="calendar-section">
      <div className="calendar-header">
        <h2>Event Calendar</h2>
        <div className="calendar-nav">
          <button onClick={() => changeMonth(-1)}>&lt;</button>
          <span>
            {selectedDate.toLocaleString('default', { 
              month: 'long', 
              year: 'numeric' 
            })}
          </span>
          <button onClick={() => changeMonth(1)}>&gt;</button>
        </div>
      </div>
      <div className="calendar-grid">
        <div className="calendar-weekdays">
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </div>
        <div className="calendar-days">
          {renderCalendar()}
        </div>
      </div>
    </div>
  );
};