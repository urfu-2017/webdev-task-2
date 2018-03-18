'use strict';

const express = require('express');
const router = require('./router');
const morgan = require('morgan');
const app = express();

app.use(morgan('dev'));
app.use('/', router);
app.listen('8080', () => {
    console.info('http://localhost:8080');
});
