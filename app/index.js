'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const registerRoutes = require('./routes');

const app = express();
app.use(bodyParser.json());
registerRoutes(app);

app.use(function (err, req, res, next) {
    res.status(err.statusCode).send(err.message);
    next();
});


app.listen(8080, () => {
    console.info('Open http://localhost:8080/');
});

