import { useState } from 'react';
import './WorkerDashboard.css';

export const TaskList = ({ tasks, onUpdateStatus }) => {
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <div className="tasks-section">
      <div className="section-header">
        <h2>Tasks</h2>
        <div className="task-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={`filter-btn ${filter === 'in-progress' ? 'active' : ''}`}
            onClick={() => setFilter('in-progress')}
          >
            In Progress
          </button>
          <button 
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>

      <div className="task-list">
        {filteredTasks.map(task => (
          <div key={task.id} className="task-item">
            <div className="task-header">
              <h4>{task.title}</h4>
              <span className={`task-status ${task.status}`}>
                {task.status}
              </span>
            </div>
            <p>{task.description}</p>
            <div className="task-footer">
              <span>Due: {task.dueDate}</span>
              <div className="task-actions">
                {task.status === 'pending' && (
                  <button 
                    className="task-button"
                    onClick={() => onUpdateStatus(task.id, 'in-progress')}
                  >
                    Start Task
                  </button>
                )}
                {task.status === 'in-progress' && (
                  <button 
                    className="task-button"
                    onClick={() => onUpdateStatus(task.id, 'completed')}
                  >
                    Complete
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};