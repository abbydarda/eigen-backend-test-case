'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable('books', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
   },
   code: {
    type: Sequelize.STRING,
    unique: true,
   },
   title: {
    type: Sequelize.STRING,
   },
   author: {
    type: Sequelize.STRING,
   },
   stock: {
    type: Sequelize.INTEGER,
   },
   created_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    allowNull: false,
   },
   updated_at: {
    type: 'TIMESTAMP',
    defaultValue: Sequelize.literal(
     'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
    ),
    allowNull: false,
   },
  });
 },
 async down(queryInterface, Sequelize) {
  await queryInterface.dropTable('books');
 },
};
