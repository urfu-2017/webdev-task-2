'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const { cors } = require('./middlewares/cors');

const app = express();

app.use(cors);

app.use(bodyParser.json());

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

app.listen(8000);

module.exports = app;
