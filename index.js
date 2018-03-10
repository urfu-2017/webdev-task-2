'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

require('./routes')(app);

const port = 8080;
const url = `http://localhost:${port}/`;
// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Сервис работает на адресе:\n${url}`));

module.exports = app;
