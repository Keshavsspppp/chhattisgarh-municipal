// src/components/Announcement/AnnouncementPage.jsx
import React, { useState, useEffect } from 'react';
import './AnnouncementPage.css';

const AnnouncementPage = () => {
    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        // Fetch announcements from an API or local JSON file
        const fetchAnnouncements = async () => {
            const response = await fetch('public/announcements.json'); // Update with your actual path
            const data = await response.json();
            setAnnouncements(data.announcements);
        };

        fetchAnnouncements();
    }, []);

    return (
        <div className="announcement-page">
            <h1>Announcements</h1>
            <ul className="announcement-list">
                {announcements.map((announcement) => (
                    <li key={announcement.id} className="announcement-item">
                        <h2 className="announcement-title">{announcement.title}</h2>
                        <p className="announcement-content">{announcement.content}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AnnouncementPage;