import React, { useState } from 'react';
import { Map } from '../Map/Map';
import Announcement from "../Announcements/Announcement";
import Achievements from '../Achievements/Achievements';
import './Home.css';
import { Footer } from '../Footer/Footer';

function Home() {
  const [isMapFullscreen, setIsMapFullscreen] = useState(false);

  return (
    <div className="home-wrapper">
      <main className="home">
        {/* Map Section */}
        <section className="map-wrapper">
          <h2 className="section-title">Interactive City Map</h2>
          <div className={`map-section ${isMapFullscreen ? 'fullscreen' : ''}`}>
            <select className="department-select">
              <option value="">Select Department</option>
              <option value="water">Water Department</option>
              <option value="road">Road Department</option>
              <option value="sanitation">Sanitation Department</option>
              <option value="electricity">Electricity Department</option>
              <option value="construction">Construction Department</option>
            </select>
            <div className="map-container">
              <Map />
              <button 
                className="fullscreen-button"
                onClick={() => setIsMapFullscreen(!isMapFullscreen)}
              >
                {isMapFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
              </button>
            </div>
          </div>
        </section>

        {/* Announcements Section */}
        <section className="announcement-wrapper">
          <Announcement />
        </section>

        {/* Achievements Section */}
        <section className="achievements-wrapper">
          <Achievements />
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default Home;