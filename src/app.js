const bodyParser = require('body-parser');
const express = require('express');

const { memberRoute } = require('./modules/members');
const { bookRoute } = require('./modules/books');
const { loanRoute } = require('./modules/loans');

const { errorHandler } = require('./commons/middlewares');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/member', memberRoute);
app.use('/api/book', bookRoute);
app.use('/api/loan', loanRoute);

app.use(errorHandler);

module.exports = app;
