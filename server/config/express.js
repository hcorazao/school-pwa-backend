const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const routes = require('../api/routes/v1');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

// mount api v1 routes
app.use('/api/v1',routes);

module.exports = app;