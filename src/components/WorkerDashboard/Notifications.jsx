import React from 'react';
import './Notifications.css';

export const Notifications = ({ notifications, onDismiss }) => {
  if (notifications.length === 0) {
    return (
      <div className="notifications-container">
        <h2>Notifications</h2>
        <p className="no-notifications">No new notifications</p>
      </div>
    );
  }

  return (
    <div className="notifications-container">
      <h2>Notifications</h2>
      <div className="notifications-list">
        {notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <div className="notification-content">
              <div className="notification-header">
                <span className={`notification-type ${notification.type}`}>
                  {notification.type}
                </span>
                <span className="notification-time">
                  {new Date(notification.timestamp).toLocaleDateString()}
                </span>
              </div>
              <p className="notification-message">{notification.message}</p>
            </div>
            <button
              className="dismiss-button"
              onClick={() => onDismiss(notification.id)}
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};