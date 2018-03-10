'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes');

const app = express();

module.exports = app;

app.use(bodyParser.json());

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);
    res.sendStatus(500);
});

app.listen(8080, () => {
    console.info('Open http://localhost:8080/');
});
