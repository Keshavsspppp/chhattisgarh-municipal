import React from 'react';
import './PerformanceMetrics.css';

export const PerformanceMetrics = ({ metrics }) => {
  return (
    <div className="performance-metrics">
      <h2>Performance Metrics</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-icon">✓</div>
          <div className="metric-content">
            <h3>Tasks Completed</h3>
            <p className="metric-value">{metrics.tasksCompleted}</p>
            <p className="metric-label">This Month</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">⚡</div>
          <div className="metric-content">
            <h3>Efficiency Rate</h3>
            <p className="metric-value">{metrics.efficiency}%</p>
            <p className="metric-label">Task Completion Rate</p>
          </div>
        </div>

        <div className="metric-card">
          <div className="metric-icon">📊</div>
          <div className="metric-content">
            <h3>Attendance</h3>
            <p className="metric-value">{metrics.attendance}%</p>
            <p className="metric-label">This Month</p>
          </div>
        </div>
      </div>
    </div>
  );
};