import React from 'react';
import { Task as TaskType } from '../types/Task';
import './Task.css';

interface TaskProps {
  task: TaskType;
  onToggleComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
  isAnimating?: boolean;
}

const Task: React.FC<TaskProps> = ({ task, onToggleComplete, onDelete, isAnimating = false }) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH':
        return 'priority-high';
      case 'MEDIUM':
        return 'priority-medium';
      case 'LOW':
        return 'priority-low';
      default:
        return 'priority-low';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays} days ago`;
  };

  const getAnimationClass = () => {
    if (!isAnimating) return '';
    return task.completed ? 'sliding-down' : 'sliding-up';
  };

  return (
    <div className={`task-card ${task.completed ? 'completed' : ''} ${getAnimationClass()}`}>
      <div className="task-header">
        <div className="task-title">
          <h3 className={task.completed ? 'completed-text' : ''}>
            {task.title}
          </h3>
        </div>
        <span className={`priority-badge ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
      </div>
      
      {task.description && (
        <p className={`task-description ${task.completed ? 'completed-text-desc' : ''}`}>
          {task.description}
        </p>
      )}
      
      <div className="task-footer">
        <div className="task-timestamp-section">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={(e) => onToggleComplete(task.id, e.target.checked)}
            className="task-checkbox"
          />
          <span className="task-timestamp">
            {task.completed ? 'Completed' : 'Created'} {formatDate(task.completed ? task.updatedAt : task.createdAt)}
          </span>
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="delete-button"
          title="Delete task"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Task;
