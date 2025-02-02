import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiMapPin, FiEdit2, FiLock } from 'react-icons/fi';
import './Profile.css';

export const Profile = ({ userData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData?.name || 'John Doe',
    email: userData?.email || 'john@example.com',
    phone: userData?.phone || '+91 9876543210',
    address: userData?.address || 'Raipur, Chhattisgarh',
    department: userData?.department || 'Sanitation',
    employeeId: userData?.employeeId || 'EMP001',
    joinDate: userData?.joinDate || '2023-01-01'
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notification, setNotification] = useState({
    type: '',
    message: ''
  });

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    // Simulate API call
    setTimeout(() => {
      setNotification({
        type: 'success',
        message: 'Profile updated successfully!'
      });
      setIsEditing(false);
    }, 1000);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({
        type: 'error',
        message: 'New passwords do not match!'
      });
      return;
    }
    // Simulate API call
    setTimeout(() => {
      setNotification({
        type: 'success',
        message: 'Password changed successfully!'
      });
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }, 1000);
  };

  const handleInputChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordInputChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <FiUser className="avatar-icon" />
          </div>
          <div className="profile-title">
            <h1>{profileData.name}</h1>
            <p>{profileData.department} Department</p>
          </div>
        </div>

        {notification.message && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <div className="profile-content">
          <div className="profile-section">
            <div className="section-header">
              <h2>Personal Information</h2>
              <button 
                className="edit-button"
                onClick={() => setIsEditing(!isEditing)}
              >
                <FiEdit2 /> {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <form onSubmit={handleProfileUpdate}>
              <div className="form-grid">
                <div className="form-group">
                  <label>
                    <FiUser /> Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FiMail /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FiPhone /> Phone
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={profileData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>
                    <FiMapPin /> Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              {isEditing && (
                <button type="submit" className="save-button">
                  Save Changes
                </button>
              )}
            </form>
          </div>

          <div className="profile-section">
            <div className="section-header">
              <h2>Change Password</h2>
              <FiLock />
            </div>

            <form onSubmit={handlePasswordChange}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Current Password</label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordInputChange}
                  />
                </div>

                <div className="form-group">
                  <label>Confirm New Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordInputChange}
                  />
                </div>
              </div>

              <button type="submit" className="save-button">
                Change Password
              </button>
            </form>
          </div>

          <div className="profile-section">
            <div className="section-header">
              <h2>Employment Details</h2>
            </div>

            <div className="details-grid">
              <div className="detail-item">
                <span className="detail-label">Employee ID</span>
                <span className="detail-value">{profileData.employeeId}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Department</span>
                <span className="detail-value">{profileData.department}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Join Date</span>
                <span className="detail-value">
                  {new Date(profileData.joinDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};