const request = require('supertest');
const { app, resetTodos } = require('./app');

describe('Todo API Tests', () => {
  // Reset todos before each test
  beforeEach(() => {
    resetTodos();
  });
  
  // Test 1: Health Check
  describe('GET /health', () => {
    test('should return health status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body.status).toBe('success');
      expect(response.body.message).toBe('Server is running');
    });
  });

  // Test 2: Get all todos (initially empty)
  describe('GET /todos', () => {
    test('should return empty array initially', async () => {
      const response = await request(app)
        .get('/todos')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.count).toBe(0);
    });
  });

  // Test 3: Create a todo
  describe('POST /todos', () => {
    test('should create a new todo', async () => {
      const response = await request(app)
        .post('/todos')
        .send({
          title: 'Complete Assignment 4',
          description: 'Build CI/CD pipeline'
        })
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Complete Assignment 4');
      expect(response.body.data.completed).toBe(false);
      expect(response.body.data.id).toBe(1);
    });

    test('should reject todo without title', async () => {
      const response = await request(app)
        .post('/todos')
        .send({
          description: 'Missing title'
        })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Title is required');
    });
  });

  // Test 4: Get single todo
  describe('GET /todos/:id', () => {
    test('should create and retrieve a todo', async () => {
      // Create a todo
      await request(app)
        .post('/todos')
        .send({ title: 'Test Todo' });

      // Get the todo
      const response = await request(app)
        .get('/todos/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.id).toBe(1);
      expect(response.body.data.title).toBe('Test Todo');
    });

    test('should return 404 for non-existent todo', async () => {
      const response = await request(app)
        .get('/todos/9999')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Todo not found');
    });
  });

  // Test 5: Update todo
  describe('PUT /todos/:id', () => {
    test('should update a todo', async () => {
      // Create a todo
      await request(app)
        .post('/todos')
        .send({ title: 'Original Title' });

      // Update the todo
      const response = await request(app)
        .put('/todos/1')
        .send({
          title: 'Updated Title',
          completed: true
        })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('Updated Title');
      expect(response.body.data.completed).toBe(true);
    });
  });

  // Test 6: Delete todo
  describe('DELETE /todos/:id', () => {
    test('should delete a todo', async () => {
      // Create a todo
      await request(app)
        .post('/todos')
        .send({ title: 'To Be Deleted' });

      // Delete the todo
      const response = await request(app)
        .delete('/todos/1')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.title).toBe('To Be Deleted');

      // Verify it's deleted
      await request(app)
        .get('/todos/1')
        .expect(404);
    });
  });

  // Test 7: Statistics endpoint
  describe('GET /stats', () => {
    test('should return correct statistics', async () => {
      // Create todos
      await request(app)
        .post('/todos')
        .send({ title: 'Todo 1' });

      await request(app)
        .post('/todos')
        .send({ title: 'Todo 2' });

      // Mark one as completed
      await request(app)
        .put('/todos/1')
        .send({ completed: true });

      // Get stats
      const response = await request(app)
        .get('/stats')
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.total).toBeGreaterThan(0);
      expect(response.body.data.completed).toBeGreaterThanOrEqual(0);
      expect(response.body.data.pending).toBeGreaterThanOrEqual(0);
    });
  });

  // Test 8: 404 handling
  describe('404 Handler', () => {
    test('should return 404 for unknown routes', async () => {
      const response = await request(app)
        .get('/unknown-route')
        .expect(404);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe('Route not found');
    });
  });
});
