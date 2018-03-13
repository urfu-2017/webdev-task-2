'use strict';

const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
routes(app);

app.listen(8080);
