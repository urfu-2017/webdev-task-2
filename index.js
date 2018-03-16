'use strict';

const routes = require('./routes');

const express = require('express');

const app = express();

routes(app);

app.listen(8080, () => {
    console.info('Open http://localhost:8080/');
});

module.exports = app;
