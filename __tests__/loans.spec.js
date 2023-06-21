const request = require('supertest');
const app = require('../src/app');
const { Penalties, Loan } = require('../src/databases/models');
const dayjs = require('dayjs');
const setup = require('./config/setup');
const teardown = require('./config/teardown');

beforeAll(() => {
 return setup();
});

afterAll(() => {
 return teardown();
});

describe('Loan API', () => {
 describe('POST /api/loan', () => {
  it('[400] tanpa mengirim payload', async () => {
   const response = await request(app).post('/api/loan');

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
  });

  it('[400] memberCode tidak dikirim', async () => {
   const payload = {
    bookCode: ['B001', 12345],
   };

   const response = await request(app).post('/api/loan').send(payload);

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Kode member harus diisi');
  });

  it('[400] memberCode bukan string', async () => {
   const payload = {
    memberCode: 12345,
    bookCode: ['B001', 'B002'],
   };

   const response = await request(app).post('/api/loan').send(payload);

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Kode member harus berupa string');
  });

  it('[400] bookCode bukan array', async () => {
   const payload = {
    memberCode: 'M001',
    bookCode: 'B001',
   };

   const response = await request(app).post('/api/loan').send(payload);

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Kode buku harus berupa array');
  });

  it('[400] bookCode yang memiliki lebih dari 2 item', async () => {
   const payload = {
    memberCode: 'M001',
    bookCode: ['B001', 'B002', 'B003'],
   };

   const response = await request(app).post('/api/loan').send(payload);

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Kode buku maksimal 2 item');
  });

  it('[400] bookCode yang memiliki item bukan string', async () => {
   const payload = {
    memberCode: 'M001',
    bookCode: ['B001', 12345],
   };

   const response = await request(app).post('/api/loan').send(payload);

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Setiap kode buku harus berupa string');
  });

  it('[403] punya penalties yang melebihi tanggal sekarang', async () => {
   const start_date = dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss');
   const end_date = dayjs(start_date)
    .add(3, 'day')
    .format('YYYY-MM-DD HH:mm:ss');
   await Penalties.bulkCreate([
    {
     member_id: 1,
     start_date: dayjs().subtract(10, 'day').format('YYYY-MM-DD HH:mm:ss'),
     end_date: dayjs().subtract(8, 'day').format('YYYY-MM-DD HH:mm:ss'),
    },
    {
     member_id: 1,
     start_date: dayjs().subtract(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
     end_date: dayjs().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
    },
   ]);

   const payload = {
    memberCode: 'M001',
    bookCode: ['JK-45', 'SHR-1'],
   };

   const response = await request(app).post('/api/loan').send(payload);

   Penalties.destroy({
    truncate: true,
   });

   expect(response.status).toBe(403);
  });

  it('[404] member tidak ditemukan', async () => {
   const payload = {
    memberCode: 'M010',
    bookCode: ['B001', 'B002'],
   };

   const response = await request(app).post('/api/loan').send(payload);

   expect(response.status).toBe(404);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Member tidak ditemukan');
  });

  it('[404] ada kode buku yang tidak ditemukan', async () => {
   const payload = {
    memberCode: 'M001',
    bookCode: ['JK-45', 'B001'],
   };

   const response = await request(app).post('/api/loan').send(payload);

   expect(response.status).toBe(404);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Ada kode buku yang tidak ditemukan');
  });

  it('[201] punya penalties yang kurang dari tanggal sekarang', async () => {
   await Penalties.bulkCreate([
    {
     member_id: 1,
     start_date: dayjs().subtract(10, 'day').format('YYYY-MM-DD HH:mm:ss'),
     end_date: dayjs().subtract(8, 'day').format('YYYY-MM-DD HH:mm:ss'),
    },
   ]);

   const payload = {
    memberCode: 'M001',
    bookCode: ['JK-45', 'SHR-1'],
   };

   const response = await request(app).post('/api/loan').send(payload);

   Penalties.destroy({
    truncate: true,
   });

   expect(response.status).toBe(201);
  });

  it('[201] tidak punya penalties', async () => {
   const payload = {
    memberCode: 'M001',
    bookCode: ['TW-11', 'HOB-83'],
   };

   const response = await request(app).post('/api/loan').send(payload);

   expect(response.status).toBe(201);
  });

  it('[404] tidak bisa meminjam buku yang sedang dipinjam', async () => {
   const payload = {
    memberCode: 'M002',
    bookCode: ['TW-11', 'HOB-83'],
   };

   const response = await request(app).post('/api/loan').send(payload);

   expect(response.status).toBe(404);
  });
 });

 describe('POST /api/loan/return', () => {
  it('[400] tanpa mengirim payload', async () => {
   const response = await request(app).post('/api/loan/return');

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
  });

  it('[400] memberCode tidak dikirim', async () => {
   const payload = {
    bookCode: ['B001', 12345],
   };

   const response = await request(app).post('/api/loan/return').send(payload);

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Kode member harus diisi');
  });

  it('[400] memberCode bukan string', async () => {
   const payload = {
    memberCode: 12345,
    bookCode: ['B001', 'B002'],
   };

   const response = await request(app).post('/api/loan/return').send(payload);

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Kode member harus berupa string');
  });

  it('[400] bookCode bukan array', async () => {
   const payload = {
    memberCode: 'M001',
    bookCode: 'B001',
   };

   const response = await request(app).post('/api/loan/return').send(payload);

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Kode buku harus berupa array');
  });

  it('[400] bookCode yang memiliki lebih dari 2 item', async () => {
   const payload = {
    memberCode: 'M001',
    bookCode: ['B001', 'B002', 'B003'],
   };

   const response = await request(app).post('/api/loan/return').send(payload);

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Kode buku maksimal 2 item');
  });

  it('[400] bookCode yang memiliki item bukan string', async () => {
   const payload = {
    memberCode: 'M001',
    bookCode: ['B001', 12345],
   };

   const response = await request(app).post('/api/loan/return').send(payload);

   expect(response.status).toBe(400);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Setiap kode buku harus berupa string');
  });

  it('[403] jumlah buku yang dikembalikan tidak sesuai', async () => {
   const payload = {
    memberCode: 'M001',
    bookCode: ['TW-11'],
   };

   const response = await request(app).post('/api/loan/return').send(payload);

   expect(response.status).toBe(403);
  });

  it('[403] Buku yang dikembalikan tidak sesuai', async () => {
   const payload = {
    memberCode: 'M001',
    bookCode: ['TW-11', 'SHR-1'],
   };

   const response = await request(app).post('/api/loan/return').send(payload);

   expect(response.status).toBe(403);
  });

  it('[404] member tidak ditemukan', async () => {
   const payload = {
    memberCode: 'M010',
    bookCode: ['B001', 'B002'],
   };

   const response = await request(app).post('/api/loan/return').send(payload);

   expect(response.status).toBe(404);
   expect(response.body).toHaveProperty('error');

   const { error } = response.body;
   expect(typeof error).toBe('string');
   expect(error).toBe('Member tidak ditemukan');
  });

  it('[201] pengembalian berhasil tanpa pinalties', async () => {
   const payload = {
    memberCode: 'M001',
    bookCode: ['TW-11', 'HOB-83'],
   };

   const response = await request(app).post('/api/loan/return').send(payload);

   expect(response.status).toBe(201);

   const penalties = await Penalties.findOne({
    where: { member_id: 1 },
   });

   expect(penalties).toBe(null);
  });

  it('[201] pengembalian hari terakhir berhasil tanpa pinalties', async () => {
   const loan_date = dayjs().subtract(7, 'day').format('YYYY-MM-DD HH:mm:ss');
   const due_date = dayjs(loan_date)
    .add(7, 'day')
    .format('YYYY-MM-DD HH:mm:ss');

   await Loan.create(
    { id: 2, loan_date, due_date },
    {
     updateOnDuplicate: ['loan_date', 'due_date'],
    }
   );

   const payload = {
    memberCode: 'M001',
    bookCode: ['TW-11', 'HOB-83'],
   };

   const response = await request(app).post('/api/loan/return').send(payload);

   expect(response.status).toBe(201);

   const penalties = await Penalties.findOne({
    where: { member_id: 1 },
   });

   expect(penalties).toBe(null);

   Penalties.destroy({
    truncate: true,
   });
  });

  it('[201] pengembalian berhasil dengan pinalties', async () => {
   const loan_date = dayjs().subtract(8, 'day').format('YYYY-MM-DD HH:mm:ss');
   const due_date = dayjs(loan_date)
    .add(7, 'day')
    .format('YYYY-MM-DD HH:mm:ss');

   await Loan.create(
    { id: 2, loan_date, due_date },
    {
     updateOnDuplicate: ['loan_date', 'due_date'],
    }
   );

   const payload = {
    memberCode: 'M001',
    bookCode: ['TW-11', 'HOB-83'],
   };

   const response = await request(app).post('/api/loan/return').send(payload);

   expect(response.status).toBe(201);

   const penalties = await Penalties.findOne({
    where: { member_id: 1 },
   });

   expect(penalties).toHaveProperty('member_id');
   expect(penalties).toHaveProperty('start_date');
   expect(penalties).toHaveProperty('end_date');

   const { member_id, start_date, end_date } = penalties;
   expect(member_id).toBe(1);
   expect(dayjs(start_date).isSame(dayjs(), 'day')).toBe(true);
   expect(dayjs(end_date).isSame(dayjs(start_date).add(2, 'day'))).toBe(true);

   Penalties.destroy({
    truncate: true,
   });
  });
 });
});
