import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app, prisma } from '../../src/server';

beforeAll(async () => {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      birthdate: new Date('1990-01-01T00:00:00.000Z'),
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('POST /users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'New User',
        email: 'newuser@example.com',
        birthdate: new Date('1995-05-05T00:00:00.000Z'),
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe('New User');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/users')
      .send({ name: 'Incomplete User' });

    expect(response.status).toBe(400);
  });
});

describe('GET /users', () => {
  it('should return all users', async () => {
    const response = await request(app).get('/users');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return a single user by id', async () => {
    const response = await request(app).get('/users/1');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });
});

describe('PUT /users/:id', () => {
  it('should update a user', async () => {
    const response = await request(app)
      .put('/users/1')
      .send({
        name: 'Updated User',
        email: 'updated@example.com',
        birthdate: new Date('1990-01-01T00:00:00.000Z'),
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe('Updated User');
  });

  it('should return 404 if the user does not exist', async () => {
    const response = await request(app)
      .put('/users/999')
      .send({
        name: 'Nonexistent User',
        email: 'noemail@example.com',
        birthdate: new Date('1990-01-01T00:00:00.000Z'),
      });

    expect(response.status).toBe(404);
  });
});

describe('DELETE /users/:id', () => {
  it('should delete a user', async () => {
    const response = await request(app).delete('/users/1');

    expect(response.status).toBe(204);
  });

  it('should return 404 if the user does not exist', async () => {
    const response = await request(app).delete('/users/999');

    expect(response.status).toBe(404);
  });
});
