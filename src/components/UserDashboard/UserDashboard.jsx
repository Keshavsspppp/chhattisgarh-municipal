import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

export const UserDashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const info = localStorage.getItem('userInfo');
    if (!info) {
      navigate('/login');
      return;
    }
    setUserInfo(JSON.parse(info));
  }, [navigate]);

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  if (!userInfo) return null;

  return (
    <div className="user-dashboard">
      <div className="dashboard-header">
        <h1>Citizen Dashboard</h1>
        <div className="user-info">
          <span className="welcome-text">Welcome, {userInfo.fullName}</span>
        </div>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Active Complaints</h3>
          <p>2</p>
        </div>
        <div className="stat-card">
          <h3>Services Used</h3>
          <p>5</p>
        </div>
        <div className="stat-card">
          <h3>Pending Payments</h3>
          <p>₹500</p>
        </div>
        <div className="stat-card">
          <h3>Documents</h3>
          <p>3</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="services-section">
          <h2>Quick Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>File Complaint</h3>
              <p>Report issues in your area</p>
              <button className="service-button">File Now</button>
            </div>
            <div className="service-card">
              <h3>Pay Bills</h3>
              <p>Water and property tax</p>
              <button className="service-button">Pay Now</button>
            </div>
            <div className="service-card">
              <h3>Apply for Certificate</h3>
              <p>Birth, death, and other certificates</p>
              <button className="service-button">Apply</button>
            </div>
          </div>
        </div>

        <div className="status-section">
          <h2>Recent Activities</h2>
          <div className="status-list">
            <div className="status-item">
              <h4>Water Bill Payment</h4>
              <p>Payment successful</p>
              <span className="status-date">Yesterday</span>
            </div>
            <div className="status-item">
              <h4>Street Light Complaint</h4>
              <p>Under review</p>
              <span className="status-date">2 days ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 