'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const config = require('config');
const morgan = require('morgan');

const places = require('./mocks/places');
const routes = require('./routes');
const Place = require('./models/place');

places.forEach(place => new Place(place).save());

const app = express();

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());

routes(app);

app.use((err, req, res) => {
    console.error(err.stack);
    res.sendStatus(500);
});

app.listen(config.get('port'), () => {
    console.info(`Open http://localhost:${config.get('port')}/places`);
});
