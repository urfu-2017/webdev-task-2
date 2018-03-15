'use strict';
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const config = require('./config/config');
const restApiConfig = require('./config/rest-api-config');
const routes = require('./rest-api-routes');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.use(restApiConfig.apiPath, routes);

app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/* eslint-disable no-unused-vars */
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'dev' ? err : {};

    res.sendStatus(err.status || 500);
});


app.listen(config.port, () => {
    console.info(`Server started on ${config.port}`);
});


module.exports = app;
