'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(JSON.stringify({ status: 'ok' }));
});

app.listen(config.port);
