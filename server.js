'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use('/', require('./routes'));

app.listen(8080);

module.exports = app;
