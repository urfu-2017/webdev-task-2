'use strict';

const routes = require('./routes');

const express = require('express');

const app = express();

app.use(({ req, res, next }) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

routes(app);

app.listen(8081, () => {
    console.info('Open http://localhost:8080/');
});

module.exports = app;
