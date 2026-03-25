import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'active', 'completed'
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/tasks`);
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Failed to load tasks. Please check if the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      const response = await axios.post(`${API_URL}/api/tasks`, {
        title: title.trim(),
        description: description.trim()
      });
      setTasks([response.data, ...tasks]);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error creating task:', error);
      setError('Failed to create task');
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    try {
      const response = await axios.put(`${API_URL}/api/tasks/${editingTask.id}`, {
        ...editingTask,
        title: title.trim(),
        description: description.trim()
      });
      setTasks(tasks.map(task => 
        task.id === editingTask.id ? response.data : task
      ));
      setEditingTask(null);
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Error updating task:', error);
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
      setError('Failed to delete task');
    }
  };

  const toggleComplete = async (task) => {
    try {
      const response = await axios.put(`${API_URL}/api/tasks/${task.id}`, {
        ...task,
        completed: !task.completed
      });
      setTasks(tasks.map(t => t.id === task.id ? response.data : t));
    } catch (error) {
      console.error('Error toggling task:', error);
      setError('Failed to update task');
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description);
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
  };

  const getFilteredTasks = () => {
    let filtered = tasks;
    
    // Apply filter
    if (filter === 'active') {
      filtered = filtered.filter(task => !task.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(task => task.completed);
    }
    
    // Apply search
    if (searchTerm.trim()) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return filtered;
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const active = total - completed;
    return { total, completed, active };
  };

  const stats = getStats();
  const filteredTasks = getFilteredTasks();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p>Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="background-animation">
        <div className="gradient-bg"></div>
      </div>
      
      <div className="container">
        <header>
          <div className="header-content">
            <div className="logo">
              <svg className="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 11L12 14L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M21 12V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <h1>TaskFlow</h1>
            </div>
            <p className="subtitle">Organize your tasks, boost your productivity</p>
          </div>
        </header>

        {error && (
          <div className="error-alert">
            <span>{error}</span>
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">{stats.total}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.active}</div>
            <div className="stat-label">Active</div>
          </div>
          <div className="stat-card">
            <div className="stat-value">{stats.completed}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="task-form-container">
          <form onSubmit={editingTask ? updateTask : createTask}>
            <div className="form-group">
              <input
                type="text"
                placeholder="What needs to be done?"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="task-input"
              />
              <textarea
                placeholder="Add description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="task-textarea"
                rows="2"
              />
              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingTask ? (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        <polygon points="18 2 22 6 12 16 8 16 8 12 18 2" fill="currentColor"/>
                      </svg>
                      Update Task
                    </>
                  ) : (
                    <>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                      Add Task
                    </>
                  )}
                </button>
                {editingTask && (
                  <button type="button" onClick={cancelEdit} className="btn-secondary">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>

        <div className="filters-section">
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Tasks
            </button>
            <button 
              className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
              onClick={() => setFilter('active')}
            >
              Active
            </button>
            <button 
              className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
              onClick={() => setFilter('completed')}
            >
              Completed
            </button>
          </div>
          
          <div className="search-box">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
        </div>

        <div className="tasks-container">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12H15M9 16H12M12 2C12 2 9 2 9 4C9 6 12 6 12 6C12 6 15 6 15 4C15 2 12 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M4 12C4 7.58172 7.58172 4 12 4C16.4183 4 20 7.58172 20 12C20 16.4183 16.4183 20 12 20C7.58172 20 4 16.4183 4 12Z" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
              <h3>No tasks found</h3>
              <p>{searchTerm ? 'Try a different search term' : 'Create your first task to get started'}</p>
            </div>
          ) : (
            <div className="tasks-list">
              {filteredTasks.map(task => (
                <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <div className="task-checkbox">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleComplete(task)}
                      id={`task-${task.id}`}
                    />
                    <label htmlFor={`task-${task.id}`}></label>
                  </div>
                  
                  <div className="task-content">
                    <h3 className="task-title">{task.title}</h3>
                    {task.description && (
                      <p className="task-description">{task.description}</p>
                    )}
                    <div className="task-meta">
                      <span className="task-date">
                        {new Date(task.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                  
                  <div className="task-actions">
                    <button 
                      onClick={() => startEdit(task)} 
                      className="action-btn edit-btn"
                      title="Edit task"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 3L21 7L7 21H3V17L17 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                    <button 
                      onClick={() => deleteTask(task.id)} 
                      className="action-btn delete-btn"
                      title="Delete task"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 7H20M10 11V16M14 11V16M5 7L6 19C6 20.1046 6.89543 21 8 21H16C17.1046 21 18 20.1046 18 19L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;