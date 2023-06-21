const Sequelize = require('sequelize');
const {
 username,
 password,
 database,
 host,
 port,
 dialect,
} = require('../config/database')[process.env.NODE_ENV || 'development'];
const sequelize = new Sequelize(database, username, password, {
 host,
 port,
 dialect,
});

sequelize
 .authenticate()
 .then(() => {
  console.log('Connection has been established successfully.');
 })
 .catch((err) => {
  console.error('Unable to connect to the database:', err);
 });
