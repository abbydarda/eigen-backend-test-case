const util = require('util');
const { exec } = require('child_process');

const execPromise = util.promisify(exec);

const setup = async () => {
 try {
  await execPromise(
   'npx sequelize-cli db:migrate && npx sequelize-cli db:seed:all'
  );
 } catch (error) {
  console.error('Error executing setup commands:', error);
 }
};

module.exports = setup;
