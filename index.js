'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const placesRoute = require('./routes/places-route');
const { port } = require('./config/default.json');
const { error404 } = require('./controllers/errors');
const { serverError, bodyParseError } = require('./middlewares');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParseError);
app.use('/places', placesRoute);
app.all('*', error404);
app.use(serverError);

app.listen(process.env.PORT || port);
