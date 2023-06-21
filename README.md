# PT. Eigen Tri Mathema Test Case - Abby Darda Damarullah

![Node.js Version](https://img.shields.io/badge/Node.js-14.17.0-green)
![Express Version](https://img.shields.io/badge/Express-4.17.1-blue)

Ini adalah API untuk test backend developer PT. Eigen Tri Mathema.

## Case Algoritma

Untuk case algoritma ada di dalam folder algoritma

## Dokumentasi

Dokumentasi API dapat diakses melalui Swagger UI yang berjalan pada endpoint `/api-docs`.

## Instalasi

1. Clone repositori ini ke direktori lokal Anda:

   ```bash
   git clone git@github.com:abbydarda/eigen-backend-test-case.git
   ```

2. Masuk ke direktori proyek:

   ```bash
   cd eigen-backend-test-case
   ```

3. Buat file `.env` dan isi dengan konfigurasi yang sesuai:

   ```bash
   touch .env
   ```

   Contoh isi file `.env`:

   ```env
   PORT=3001   
   DB_USERNAME=username
   DB_PASSWORD=password
   DB_NAME=dbname
   DB_HOST=localhost
   DB_PORT=3306
   DB_DIALECT=mysql
   ```

4. Buat file `.env.development` dan `.env.test` untuk tahap development dan test, dan isi dengan konfigurasi yang sesuai.

   Contoh isi file `.env.development`:

   ```env
   PORT=3001   
   DB_USERNAME=dev_username
   DB_PASSWORD=dev_password
   DB_NAME=dev_dbname
   DB_HOST=localhost
   DB_PORT=3306
   DB_DIALECT=mysql
   ```

   Contoh isi file `.env.test`:

   ```env
   PORT=3001   
   DB_USERNAME=test_username
   DB_PASSWORD=test_password
   DB_NAME=test_dbname
   DB_HOST=localhost
   DB_PORT=3306
   DB_DIALECT=mysql
   ```

5. Install dependensi yang diperlukan:

   ```bash
   npm install
   ```

6. jalankan migrasi dan seed:

   ```bash
   npm run init:db
   ```

## Menjalankan Aplikasi

### Tahap Production

1. Jalankan aplikasi dalam mode development:

   ```bash
   npm run start
   ```

   Aplikasi akan berjalan di `http://localhost:3001`.

### Tahap Development

1. Jalankan aplikasi dalam mode development:

   ```bash
   npm run start:dev
   ```

   Aplikasi akan berjalan di `http://localhost:3001`.

### Tahap Testing

1. Jalankan perintah berikut untuk menjalankan unit test:

   ```bash
   npm test
   ```

   Unit test akan dieksekusi dan hasilnya akan ditampilkan di konsol.