const request = require('supertest');
const app = require('../src/app');

const setup = require('./config/setup');
const teardown = require('./config/teardown');

beforeAll(() => {
 return setup();
});

afterAll(() => {
 return teardown();
});

describe('Book API', () => {
 describe('GET /api/book', () => {
  it('[200] data buku dengan paginasi', async () => {
   const response = await request(app)
    .get('/api/book')
    .query({ page: 1, limit: 1 });

   expect(response.status).toBe(200);
   expect(response.body).toHaveProperty('message');
   expect(response.body).toHaveProperty('data');
   expect(response.body).toHaveProperty('totalCount');
   expect(response.body).toHaveProperty('currentPage');
   expect(response.body).toHaveProperty('totalPage');

   const { data, totalCount, currentPage, totalPage } = response.body;
   expect(Array.isArray(data)).toBe(true);
   expect(data.length).toBeLessThanOrEqual(1);
   expect(typeof totalCount).toBe('number');
   expect(typeof currentPage).toBe('number');
   expect(typeof totalPage).toBe('number');

   data.map((book) => {
    expect(typeof book.code).toBe('string');
    expect(typeof book.title).toBe('string');
    expect(typeof book.author).toBe('string');
    expect(book.stock).toBeGreaterThan(0);
   });
  });

  it('[200] data buku dengan nilai default paginasi', async () => {
   const response = await request(app).get('/api/book');

   expect(response.status).toBe(200);
   expect(response.body).toHaveProperty('message');
   expect(response.body).toHaveProperty('data');
   expect(response.body).toHaveProperty('totalCount');
   expect(response.body).toHaveProperty('currentPage');
   expect(response.body).toHaveProperty('totalPage');

   const { data, totalCount, currentPage, totalPage } = response.body;
   expect(Array.isArray(data)).toBe(true);
   expect(data.length).toBeLessThanOrEqual(10);
   expect(typeof totalCount).toBe('number');
   expect(typeof currentPage).toBe('number');
   expect(typeof totalPage).toBe('number');

   data.map((book) => {
    expect(typeof book.code).toBe('string');
    expect(typeof book.title).toBe('string');
    expect(typeof book.author).toBe('string');
    expect(book.stock).toBeGreaterThan(0);
   });
  });
 });
});
