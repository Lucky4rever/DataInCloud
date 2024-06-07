import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { app, prisma } from '../../src/server';

beforeAll(async () => {
  await prisma.post.deleteMany();
  await prisma.user.deleteMany();

  await prisma.post.create({
    data: {
      id: 1,
      title: 'Test Post',
      content: 'Content of the test post',
      createdAt: new Date('1990-01-01T00:00:00.000Z'),
      userId: 1,
    },
  });

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

describe('POST /posts', () => {
  it('should create a new post', async () => {
    const response = await request(app)
      .post('/posts')
      .send({
        id: 1,
        title: 'New Post',
        content: 'Content of the new post',
        createdAt: new Date('1990-01-01T00:00:00.000Z'),
        userId: 1,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.title).toBe('New Post');
  });

  it('should return 400 if required fields are missing', async () => {
    const response = await request(app)
      .post('/posts')
      .send({ title: 'Incomplete Post' });

    expect(response.status).toBe(400);
  });
});

describe('PUT /posts/:id', () => {
  it('should update a post', async () => {
    const response = await request(app)
      .put('/posts/1')
      .send({
        title: 'Updated Post',
        content: 'Updated content of the post',
        createdAt: new Date('1990-01-01T00:00:00.000Z'),
        userId: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('Updated Post');
  });

  it('should return 404 if the post does not exist', async () => {
    const response = await request(app)
      .put('/posts/999')
      .send({
        title: 'Nonexistent Post',
        content: 'Content of a nonexistent post',
        userId: 1,
      });

    expect(response.status).toBe(404);
  });
});

describe('GET /posts', () => {
  it('should return all posts', async () => {
    const response = await request(app).get('/posts');

    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return a single post by id', async () => {
    const response = await request(app).get('/posts/1');

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', 1);
  });
});

describe('DELETE /posts/:id', () => {
  it('should delete a post', async () => {
    const response = await request(app).delete('/posts/1');

    console.log(response.headers);
    expect(response.status).toBe(204);
  });

  it('should return 404 if the post does not exist', async () => {
    const response = await request(app).delete('/posts/999');

    expect(response.status).toBe(404);
  });
});
