/** @type {import('jest').Config} */
const config = {
 verbose: true,
 modulePathIgnorePatterns: ['./__tests__/config'],
 silent: true,
 detectOpenHandles: true,
 forceExit: true,
};

module.exports = config;
