const { sequelize } = require('../../src/databases/models');

async function teardown() {
 try {
  const queryInterface = sequelize.getQueryInterface();
  await queryInterface.dropAllTables();
 } catch (error) {
 } finally {
  await sequelize.close();
 }
}

module.exports = teardown;
