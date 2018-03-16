'use strict';
const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const app = express();
global.notes = [];

app.use(bodyParser.json());
routes(app);

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, next) => {
    console.error(error);
    res.sendStatus(500);
});

// app.listen(5000);
module.exports = app;
