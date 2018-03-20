'use strict';

const express = require('express');
const routes = require('./routes');

const { port } = require('./config.json');

const app = express();

app.use(express.json());

module.exports = app;
routes(app);

app.listen(port, () => console.info(`server started: localhost:${port}`));
