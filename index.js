'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(function (req, res, next) {
    res.header('content-type', 'application/json');
    next();
});

routes(app);

module.exports = app;
