'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const places = require('./mocks/places');
const Place = require('./models/place');

for (let place of places) {
    new Place(place).save();
}

const app = express();
app.use(bodyParser.json());
routes(app);

app.listen(8080);
console.info('http://localhost:8080/places');
