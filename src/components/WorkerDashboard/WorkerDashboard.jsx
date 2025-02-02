import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { TaskList } from './TaskList';
import { Announcements } from './Announcements';
import { AddEventModal } from './AddEventModal';
import { EventCalendar } from './EventCalendar';
import { PerformanceMetrics } from './PerformanceMetrics';
import { Notifications } from './Notifications';
import './WorkerDashboard.css';

export const WorkerDashboard = ({ userData, onLogout }) => {
  const [tasks, setTasks] = useState([]);
  const [events, setEvents] = useState([]);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [metrics, setMetrics] = useState({
    tasksCompleted: 0,
    efficiency: 0,
    attendance: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Load saved data from localStorage
    const savedTasks = localStorage.getItem('workerTasks');
    const savedEvents = localStorage.getItem('workerEvents');
    const savedNotifications = localStorage.getItem('workerNotifications');

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedEvents) setEvents(JSON.parse(savedEvents));
    if (savedNotifications) setNotifications(JSON.parse(savedNotifications));

    // Initialize some sample metrics
    setMetrics({
      tasksCompleted: 15,
      efficiency: 87,
      attendance: 95,
    });

    // Add sample notification if none exist
    if (!savedNotifications) {
      const sampleNotifications = [
        {
          id: 1,
          type: 'info',
          message: 'Welcome back! You have 3 tasks pending for today.',
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          type: 'success',
          message: 'Great job! You completed all tasks yesterday.',
          timestamp: new Date().toISOString(),
        },
      ];
      setNotifications(sampleNotifications);
      localStorage.setItem('workerNotifications', JSON.stringify(sampleNotifications));
    }
  }, []);

  const handleUpdateTaskStatus = (taskId, newStatus) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('workerTasks', JSON.stringify(updatedTasks));

    // Update metrics when a task is completed
    if (newStatus === 'completed') {
      setMetrics(prev => ({
        ...prev,
        tasksCompleted: prev.tasksCompleted + 1,
      }));
    }
  };

  const handleAddEvent = (newEvent) => {
    const updatedEvents = [...events, { ...newEvent, id: Date.now() }];
    setEvents(updatedEvents);
    localStorage.setItem('workerEvents', JSON.stringify(updatedEvents));
    setShowAddEventModal(false);
  };

  const handleNotificationDismiss = (notificationId) => {
    const updatedNotifications = notifications.filter(n => n.id !== notificationId);
    setNotifications(updatedNotifications);
    localStorage.setItem('workerNotifications', JSON.stringify(updatedNotifications));
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function passed as a prop
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="worker-dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {userData?.name || 'Worker'}</h1>
        <button 
          className="add-event-button"
          onClick={() => setShowAddEventModal(true)}
        >
          Add Event
        </button>
        <button onClick={handleLogout} className="logout-button">Logout</button>
      </div>

      <div className="dashboard-content">
        <div className="main-content">
          <div className="content-left">
            <TaskList 
              tasks={tasks} 
              onUpdateStatus={handleUpdateTaskStatus} 
            />
            <PerformanceMetrics metrics={metrics} />
          </div>
          <div className="content-right">
            <EventCalendar events={events} />
            <Notifications 
              notifications={notifications}
              onDismiss={handleNotificationDismiss}
            />
          </div>
        </div>
        <Announcements />
      </div>

      {showAddEventModal && (
        <AddEventModal
          onClose={() => setShowAddEventModal(false)}
          onAddEvent={handleAddEvent}
        />
      )}
    </div>
  );
};