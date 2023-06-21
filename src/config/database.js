const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'test') {
 dotenv.config({ path: '.env.test' });
} else if (process.env.NODE_ENV === 'development') {
 dotenv.config({ path: '.env.development' });
} else {
 dotenv.config({ path: '.env' });
}

module.exports = {
 development: {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
 },
 test: {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
 },
 production: {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
 },
};
