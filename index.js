'use strict';
require('dotenv').config();

const express = require('express');

const routes = require('./routes');
const app = express();

app.use(express.json());

routes(app);

module.exports = app;
