'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const app = express();
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'GET,PATCH,POST,DELETE',
    optionsSuccessStatus: 204
};

app.use(express.json());

app.use(cors(corsOptions));

routes(app);

module.exports = app;
