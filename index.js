'use strict';

const bodyParser = require('body-parser');
const express = require('express');

const Place = require('./models/place');
const places = require('./mocks/places');
const routes = require('./routes/routes');

for (const place of places) {
    new Place(place).save();
}

const app = express();

app.use(bodyParser.json());

app.use((err, req, res, next) => {
    console.error(err.stack);

    next();
});

routes(app);

app.listen(8080, () => {
    console.info('Open http://localhost:8080/api/places');
});
