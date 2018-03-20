'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const config = require('./config/default.json');
const placesRoute = require('./routes/places-route');
const { error404 } = require('./controllers/errors');
const { serverError, bodyParseError } = require('./middlewares');

const port = process.env.PORT || config.port;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParseError);
app.use('/places', placesRoute);
app.all('*', error404);
app.use(serverError);

app.listen(port);

/* eslint no-console: 0 */
console.log(`listen on ${port}`);
