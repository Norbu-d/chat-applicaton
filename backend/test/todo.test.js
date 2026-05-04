const request = require('supertest');
const app = require('../server');

describe('Todo API', () => {
  test('GET /health - should return OK', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('OK');
  });

  test('POST /api/tasks - should return 400 if title is missing', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .send({});
    expect(res.statusCode).toBe(400);
  });
});