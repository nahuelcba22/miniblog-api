const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');

const app = require('../server');

// =====================
// AUTHORS
// =====================

test('GET /api/authors should return array', async () => {
  const res = await request(app).get('/api/authors');

  assert.strictEqual(res.statusCode, 200);
  assert.ok(Array.isArray(res.body));
});

test('GET /api/authors should return authors with id field', async () => {
  const res = await request(app).get('/api/authors');

  assert.strictEqual(res.statusCode, 200);
  assert.ok(Array.isArray(res.body));
  assert.ok(res.body.length > 0);
  assert.ok(res.body[0].id);
});

test('GET /api/authors/999999 should return 404', async () => {
  const res = await request(app).get('/api/authors/999999');

  assert.strictEqual(res.statusCode, 404);
});

test('POST /api/authors should create author', async () => {
  const res = await request(app)
    .post('/api/authors')
    .send({
      name: 'Test Author',
      email: `test${Date.now()}@example.com`,
      bio: 'Testing author'
    });

  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.body.name, 'Test Author');
});

// =====================
// POSTS
// =====================

test('GET /api/posts should return array', async () => {
  const res = await request(app).get('/api/posts');

  assert.strictEqual(res.statusCode, 200);
  assert.ok(Array.isArray(res.body));
});

test('GET /api/posts should return posts with id field', async () => {
  const res = await request(app).get('/api/posts');

  assert.strictEqual(res.statusCode, 200);
  assert.ok(Array.isArray(res.body));
  assert.ok(res.body.length > 0);
  assert.ok(res.body[0].id);
});

test('GET /api/posts/999999 should return 404', async () => {
  const res = await request(app).get('/api/posts/999999');

  assert.strictEqual(res.statusCode, 404);
});

test('POST /api/posts should validate required fields', async () => {
  const res = await request(app)
    .post('/api/posts')
    .send({});

  assert.strictEqual(res.statusCode, 400);
});

test('GET /api/posts/author/1 should return posts by author', async () => {
  const res = await request(app).get('/api/posts/author/1');

  assert.strictEqual(res.statusCode, 200);
  assert.ok(Array.isArray(res.body));
});
test('POST /api/authors should validate required fields', async () => {
  const res = await request(app)
    .post('/api/authors')
    .send({});

  assert.strictEqual(res.statusCode, 400);
});
test('POST /api/posts should create post', async () => {
  const res = await request(app)
    .post('/api/posts')
    .send({
      title: 'Post de prueba',
      content: 'Contenido de prueba',
      author_id: 2
    });

  assert.strictEqual(res.statusCode, 201);
  assert.strictEqual(res.body.title, 'Post de prueba');
});