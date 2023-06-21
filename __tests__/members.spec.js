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

describe('Member API', () => {
 describe('GET /api/member', () => {
  it('[200] data member dengan paginasi', async () => {
   const response = await request(app)
    .get('/api/member')
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

   data.map((member) => {
    expect(typeof member.code).toBe('string');
    expect(typeof member.name).toBe('string');
    expect(typeof member.bookBorrowed).toBe('number');
   });
  });

  it('[200] data member dengan nilai default paginasi', async () => {
   const response = await request(app).get('/api/member');

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

   data.map((member) => {
    expect(typeof member.code).toBe('string');
    expect(typeof member.name).toBe('string');
    expect(typeof member.bookBorrowed).toBe('number');
   });
  });
 });
});
