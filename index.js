'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const router = require('./router');
const handleErrors = require('./middlewares/handleErrors');
const { port } = require('./config');

const app = express();
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

router(app);
app.use(handleErrors);

app.listen(port, () => {
    console.info(`Listening on port ${port}`);
});
