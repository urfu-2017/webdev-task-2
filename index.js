'use strict';

const express = require('express');
const routes = require('./routes');

const port = 8080;

const app = express();

app.use(express.json());

module.exports = app;
routes(app);

app.listen(port);
