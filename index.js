'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const routes = require('./routes.js');
const storage = require('./mocks/storage.json');
const Place = require('./models/place');

storage.forEach(place => new Place(place).save());

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json());

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

app.listen(8080, function () {
    console.info('Open http://localhost:8080');
});
