const app = require('./src/app');
const { APP_PORT } = require('./src/config/app');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const options = {
 definition: {
  failOnErrors: true,
  openapi: '3.0.0',
  info: {
   title: 'Eigen Backend Test Case',
   version: '1.0.0',
  },
 },
 apis: [path.join(__dirname, 'src', '**', '*.js')],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.listen(APP_PORT, () => {
 console.log(`Server running on port ${APP_PORT}`);
});
