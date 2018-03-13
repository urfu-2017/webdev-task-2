'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const config = require('config');
const morgan = require('morgan');

const places = require('./mocks/places');
const routes = require('./routes');
const Place = require('./models/place');
const { handleError } = require('./middlewares/error-handler');

places.forEach(place => new Place(place).save());

const app = express();

if (config.get('debug')) {
    app.use(morgan('dev'));
}

app.use(bodyParser.json());

routes(app);

app.use(handleError);

app.listen(config.get('port'), () => {
    console.info(`Open http://localhost:${config.get('port')}/places`);
});
