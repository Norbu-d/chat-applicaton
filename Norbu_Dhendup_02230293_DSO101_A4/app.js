const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for todo items
let todos = [];
let idCounter = 1;

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Get all todos
app.get('/todos', (req, res) => {
  res.json({
    success: true,
    data: todos,
    count: todos.length
  });
});

// Get single todo by ID
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  
  if (!todo) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }

  res.json({
    success: true,
    data: todo
  });
});

// Create new todo
app.post('/todos', (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({
      success: false,
      message: 'Title is required'
    });
  }

  const newTodo = {
    id: idCounter++,
    title,
    description: description || '',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  todos.push(newTodo);

  res.status(201).json({
    success: true,
    message: 'Todo created successfully',
    data: newTodo
  });
});

// Update todo
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));

  if (!todo) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }

  if (req.body.title) todo.title = req.body.title;
  if (req.body.description !== undefined) todo.description = req.body.description;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;
  todo.updatedAt = new Date();

  res.json({
    success: true,
    message: 'Todo updated successfully',
    data: todo
  });
});

// Delete todo
app.delete('/todos/:id', (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: 'Todo not found'
    });
  }

  const deletedTodo = todos.splice(index, 1);

  res.json({
    success: true,
    message: 'Todo deleted successfully',
    data: deletedTodo[0]
  });
});

// Statistics endpoint
app.get('/stats', (req, res) => {
  const completed = todos.filter(t => t.completed).length;
  const pending = todos.length - completed;

  res.json({
    success: true,
    data: {
      total: todos.length,
      completed,
      pending,
      completionRate: todos.length > 0 ? ((completed / todos.length) * 100).toFixed(2) + '%' : '0%'
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Reset function for testing
const resetTodos = () => {
  todos = [];
  idCounter = 1;
};

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, server, resetTodos };
