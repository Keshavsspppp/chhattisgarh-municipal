import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiBell, FiArrowRight } from 'react-icons/fi';
import './Announcement.css';

const Announcement = () => {
  // Mock data instead of fetching
  const mockAnnouncements = [
    {
      id: 1,
      type: "Important",
      title: "Water Supply Maintenance",
      date: "2024-03-20",
      description: "Scheduled maintenance of water supply in Sector 7 from 10 AM to 2 PM."
    },
    {
      id: 2,
      type: "Notice",
      title: "Road Construction Update",
      date: "2024-03-19",
      description: "New road construction project starting in Central District next week."
    },
    {
      id: 3,
      type: "Update",
      title: "Property Tax Deadline",
      date: "2024-03-18",
      description: "Last date for property tax payment is extended to March 31st, 2024."
    }
  ];

  const [announcements, setAnnouncements] = useState(mockAnnouncements);

  return (
    <div className="announcement-section">
      <div className="announcement-container">
        <div className="announcement-header">
          <h2>
            <FiBell className="announcement-icon" />
            Latest Announcements
          </h2>
          <Link to="/notices" className="view-all">
            View All <FiArrowRight />
          </Link>
        </div>
        
        <div className="announcement-cards">
          {announcements.map(announcement => (
            <div key={announcement.id} className="announcement-card">
              <div className="announcement-type">{announcement.type}</div>
              <h3>{announcement.title}</h3>
              <p className="announcement-date">{announcement.date}</p>
              <p className="announcement-desc">{announcement.description}</p>
              <Link to={`/notices/${announcement.id}`} className="read-more">
                Read More <FiArrowRight />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Announcement;
