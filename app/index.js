'use strict';
require('dotenv').config();

const express = require('express');

const routes = require('./routes');
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    if (req.get('Origin') === 'http://localhost:3000') {
        res.set('Access-Control-Allow-Origin', '*');
        res.set('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
    }
    next();
});

routes(app);

module.exports = app;
