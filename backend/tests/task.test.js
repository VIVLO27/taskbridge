const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../server');

const TEST_MONGO_URI =
  process.env.MONGO_URI ||
  'mongodb://localhost:27017/taskbridge_test';

let token;

beforeAll(async () => {
  await mongoose.connect(TEST_MONGO_URI);

  // Register a test user and grab token
  const res = await request(app).post('/api/auth/register').send({
    name: 'Test User',
    email: `test_${Date.now()}@test.com`,
    password: 'password123',
  });
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Task API', () => {
  let taskId;

  it('POST /api/tasks — creates a task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Task', priority: 'high', status: 'todo' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Test Task');
    taskId = res.body._id;
  });

  it('GET /api/tasks — returns tasks for the user', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('PUT /api/tasks/:id — updates a task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ status: 'done' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('done');
  });

  it('DELETE /api/tasks/:id — deletes a task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Task removed');
  });

  it('GET /api/tasks — returns 401 without token', async () => {
    const res = await request(app).get('/api/tasks');
    expect(res.statusCode).toBe(401);
  });
});
