import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';
import { useNavigate } from 'react-router-dom';

export const AdminDashboard = ({ onLogout }) => {
  const [workers, setWorkers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [statistics, setStatistics] = useState({
    totalWorkers: 0,
    activeTasks: 0,
    completedTasks: 0,
    efficiency: 0
  });

  const navigate = useNavigate();

  useEffect(() => {
    // Load saved data from localStorage
    const savedWorkers = localStorage.getItem('adminWorkers');
    const savedTasks = localStorage.getItem('adminTasks');

    if (savedWorkers) {
      setWorkers(JSON.parse(savedWorkers));
    } else {
      // Sample worker data
      const sampleWorkers = [
        { id: 1, name: 'John Doe', role: 'Sanitation', status: 'active' },
        { id: 2, name: 'Jane Smith', role: 'Maintenance', status: 'active' },
        { id: 3, name: 'Mike Johnson', role: 'Gardening', status: 'inactive' },
      ];
      setWorkers(sampleWorkers);
      localStorage.setItem('adminWorkers', JSON.stringify(sampleWorkers));
    }

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      // Sample task data
      const sampleTasks = [
        { id: 1, title: 'Clean Main Street', assignedTo: 1, status: 'in-progress' },
        { id: 2, title: 'Fix Street Lights', assignedTo: 2, status: 'pending' },
        { id: 3, title: 'Park Maintenance', assignedTo: 3, status: 'completed' },
      ];
      setTasks(sampleTasks);
      localStorage.setItem('adminTasks', JSON.stringify(sampleTasks));
    }
  }, []);

  useEffect(() => {
    // Update statistics whenever workers or tasks change
    const activeWorkers = workers.filter(w => w.status === 'active').length;
    const activeTasksCount = tasks.filter(t => t.status === 'in-progress').length;
    const completedTasksCount = tasks.filter(t => t.status === 'completed').length;
    const efficiencyRate = tasks.length > 0 
      ? Math.round((completedTasksCount / tasks.length) * 100) 
      : 0;

    setStatistics({
      totalWorkers: workers.length,
      activeTasks: activeTasksCount,
      completedTasks: completedTasksCount,
      efficiency: efficiencyRate
    });
  }, [workers, tasks]);

  const handleAssignTask = (taskId, workerId) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, assignedTo: workerId } : task
    );
    setTasks(updatedTasks);
    localStorage.setItem('adminTasks', JSON.stringify(updatedTasks));
  };

  const handleLogout = () => {
    onLogout(); // Call the logout function passed as a prop
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="statistics-grid">
        <div className="stat-card">
          <h3>Total Workers</h3>
          <p>{statistics.totalWorkers}</p>
        </div>
        <div className="stat-card">
          <h3>Active Tasks</h3>
          <p>{statistics.activeTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <p>{statistics.completedTasks}</p>
        </div>
        <div className="stat-card">
          <h3>Efficiency Rate</h3>
          <p>{statistics.efficiency}%</p>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="workers-section">
          <h2>Workers</h2>
          <div className="workers-list">
            {workers.map(worker => (
              <div key={worker.id} className="worker-card">
                <h3>{worker.name}</h3>
                <p>Role: {worker.role}</p>
                <p>Status: {worker.status}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="tasks-section">
          <h2>Tasks</h2>
          <div className="tasks-list">
            {tasks.map(task => (
              <div key={task.id} className="task-card">
                <h3>{task.title}</h3>
                <p>Status: {task.status}</p>
                <p>Assigned to: {workers.find(w => w.id === task.assignedTo)?.name || 'Unassigned'}</p>
                <select
                  value={task.assignedTo || ''}
                  onChange={(e) => handleAssignTask(task.id, Number(e.target.value))}
                >
                  <option value="">Assign to...</option>
                  {workers.map(worker => (
                    <option key={worker.id} value={worker.id}>
                      {worker.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};