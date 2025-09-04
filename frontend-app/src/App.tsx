import React, { useState, useEffect } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import Task from './components/Task';
import { Task as TaskType, CreateTaskRequest } from './types/Task';
import { taskApi } from './services/api';

interface TaskStats {
  total: number;
  completed: number;
  pending: number;
}

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'high'>('all');
  const [animatingTasks, setAnimatingTasks] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState<TaskStats>({ total: 0, completed: 0, pending: 0 });

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTasks = await taskApi.getTasks();
      setTasks(fetchedTasks);
    } catch (err) {
      setError('Failed to fetch tasks. Please check if the backend is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const taskStats = await taskApi.getTaskStats();
      setStats(taskStats);
    } catch (err) {
      console.error('Error fetching task stats:', err);
      // Don't show error for stats, just log it
    }
  };

  const handleCreateTask = async (taskData: CreateTaskRequest) => {
    try {
      const newTask = await taskApi.createTask(taskData);
      setTasks(prev => [newTask, ...prev]);
      // Refresh stats after creating a task
      fetchStats();
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    try {
      // Mark task as animating
      setAnimatingTasks(prev => new Set(prev).add(id));
      
      const updatedTask = await taskApi.updateTask(id, { completed });
      
      // Update the task in state
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));

      // Add animation class and reorder after a short delay
      setTimeout(() => {
        // Reorder tasks: uncompleted first, then completed
        setTasks(prev => {
          const updatedTasks = prev.map(task => 
            task.id === id ? updatedTask : task
          );
          
          return updatedTasks.sort((a, b) => {
            if (a.completed === b.completed) {
              // If both have same completion status, sort by creation date
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            }
            // Uncompleted tasks first
            return a.completed ? 1 : -1;
          });
        });

        // Remove animation class after reordering
        setTimeout(() => {
          setAnimatingTasks(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }, 500); // Match animation duration
      }, 100);

      // Refresh stats after updating task completion
      fetchStats();
      
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
      // Remove animation class on error
      setAnimatingTasks(prev => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await taskApi.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      // Refresh stats after deleting a task
      fetchStats();
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const getFilteredTasks = () => {
    switch (filter) {
      case 'pending':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      case 'high':
        return tasks.filter(task => task.priority === 'HIGH');
      default:
        return tasks;
    }
  };

  const getHighPriorityCount = () => {
    return tasks.filter(task => task.priority === 'HIGH').length;
  };

  const clearError = () => setError(null);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
      </header>
      
      <main className="App-main">
        <div className="dashboard-container">
          <div className="left-panel">
            <TaskForm onSubmit={handleCreateTask} />
          </div>
          
          <div className="right-panel">
            <div className="tasks-header">
              <h2>Tasks</h2>
              <div className="filter-buttons">
                <button
                  className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  All <span className="count-badge">{stats.total}</span>
                </button>
                <button
                  className={`filter-btn ${filter === 'pending' ? 'active' : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  Pending <span className="count-badge">{stats.pending}</span>
                </button>
                <button
                  className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completed <span className="count-badge">{stats.completed}</span>
                </button>
                <button
                  className={`filter-btn ${filter === 'high' ? 'active' : ''}`}
                  onClick={() => setFilter('high')}
                >
                  High Priority <span className="count-badge">{getHighPriorityCount()}</span>
                </button>
              </div>
            </div>

            {error && (
              <div className="error-banner" onClick={clearError}>
                <span>{error}</span>
                <button className="error-close">×</button>
              </div>
            )}

            <div className="tasks-container">
              {loading ? (
                <div className="loading">Loading tasks...</div>
              ) : getFilteredTasks().length === 0 ? (
                <div className="no-tasks">
                  {filter === 'all' ? 'No tasks yet. Create your first task!' : `No ${filter} tasks found.`}
                </div>
              ) : (
                getFilteredTasks().map(task => (
                  <Task
                    key={task.id}
                    task={task}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDeleteTask}
                    isAnimating={animatingTasks.has(task.id)}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
