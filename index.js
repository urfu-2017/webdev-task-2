'use strict';

const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const routes = require('./routes.js');
const storage = require('./mocks/storage.json');
const Place = require('./models/place');

storage.forEach(place => new Place(place).save());

const app = express();

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PUT , OPTIONS');
    next();
});

app.use(bodyParser.json());

app.use(cors());

app.use('/api/places', routes);

app.use((err, req, res) => {
    console.error(err.stack);

    res.sendStatus(500);
});

app.listen(3000, function () {
    console.info('Open http://localhost:3000/api/places');
});
