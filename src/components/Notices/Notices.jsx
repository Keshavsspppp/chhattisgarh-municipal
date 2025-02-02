import React, { useState } from 'react';
import { FiSearch, FiDownload } from 'react-icons/fi';
import './Notices.css';

export const Notices = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const notices = [
    {
      id: 1,
      title: 'Property Tax Payment Deadline Extension',
      category: 'Tax',
      date: '3/15/2024',
      description: 'The deadline for property tax payment has been extended to April 30, 2024.',
      pdfUrl: '/notices/tax-deadline.pdf'
    },
    {
      id: 2,
      title: 'Municipal Water Supply Schedule Update',
      category: 'Utilities',
      date: '3/10/2024',
      description: 'New water supply schedule for summer months starting April 1st.',
      pdfUrl: '/notices/water-schedule.pdf'
    },
    {
      id: 3,
      title: 'Public Park Renovation Notice',
      category: 'Development',
      date: '3/5/2024',
      description: 'Renovation work at Central Park will commence from March 20th.',
      pdfUrl: '/notices/park-renovation.pdf'
    }
  ];

  return (
    <div className="notices-page">
      <div className="notices-header">
        <h1>Public Notices</h1>
        <p>Stay updated with the latest announcements and notifications</p>
      </div>

      <div className="notices-filters">
        <div className="search-bar">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search notices..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="Tax">Tax</option>
            <option value="Utilities">Utilities</option>
            <option value="Development">Development</option>
          </select>

          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            <option value="all">All Years</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
          </select>
        </div>
      </div>

      <div className="notices-grid">
        {notices.map((notice) => (
          <div key={notice.id} className={`notice-card ${notice.category.toLowerCase()}-border`}>
            <div className="notice-header">
              <span className="notice-category">{notice.category}</span>
              <span className="notice-date">{notice.date}</span>
            </div>
            <h3>{notice.title}</h3>
            <p>{notice.description}</p>
            <a href={notice.pdfUrl} className="download-link">
              <FiDownload /> Download PDF
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};