'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable('loan_details', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
   },
   loan_id: {
    type: Sequelize.INTEGER,
    references: {
     model: 'loans',
     key: 'id',
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
    },
   },
   book_id: {
    type: Sequelize.INTEGER,
    references: {
     model: 'books',
     key: 'id',
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
    },
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
  await queryInterface.dropTable('loan_details');
 },
};
