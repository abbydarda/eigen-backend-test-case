'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
 async up(queryInterface, Sequelize) {
  return queryInterface.bulkInsert('members', [
   {
    code: 'M001',
    name: 'Angga',
   },
   {
    code: 'M002',
    name: 'Ferry',
   },
   {
    code: 'M003',
    name: 'Putri',
   },
  ]);
 },

 async down(queryInterface, Sequelize) {
  return queryInterface.bulkDelete('members', null, {});
 },
};
