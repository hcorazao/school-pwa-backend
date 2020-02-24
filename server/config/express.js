const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../api/routes/v1');

const app = express();

const error = require('../helpers/error');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(helmet());
app.use('/uploads', express.static('uploads'))
// mount api v1 routes
app.use('/api/v1',routes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

module.exports = app;