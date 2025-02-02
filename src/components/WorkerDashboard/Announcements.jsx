import { useState, useEffect } from 'react';
import './WorkerDashboard.css';

export const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Monthly Meeting',
      content: 'Department meeting scheduled for next Monday at 10 AM',
      date: '2 days ago'
    },
    {
      id: 2,
      title: 'New Safety Guidelines',
      content: 'Updated safety protocols for field workers',
      date: '1 week ago'
    }
  ]);

  return (
    <div className="announcements-section">
      <h2>Announcements</h2>
      <div className="announcement-list">
        {announcements.map(announcement => (
          <div key={announcement.id} className="announcement-item">
            <h4>{announcement.title}</h4>
            <p>{announcement.content}</p>
            <span className="announcement-date">{announcement.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};