const test = require('node:test');
const assert = require('node:assert');
const request = require('supertest');

const app = require('../server');

test('GET /api/authors should return array', async () => {
  const res = await request(app).get('/api/authors');

  assert.strictEqual(res.statusCode, 200);
  assert.ok(Array.isArray(res.body));
});