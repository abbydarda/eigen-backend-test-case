'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  await queryInterface.createTable('penalties', {
   id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER,
   },
   member_id: {
    type: Sequelize.INTEGER,
    references: {
     model: 'members',
     key: 'id',
     onDelete: 'CASCADE',
     onUpdate: 'CASCADE',
    },
   },
   start_date: {
    type: Sequelize.DATE,
   },
   end_date: {
    type: Sequelize.DATE,
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
  await queryInterface.dropTable('penalties');
 },
};
