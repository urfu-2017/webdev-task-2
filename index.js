'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const Place = require('./models/place');
const stubData = require('./data_for_check_app/sevenWondersOfTheWorld.json');

for (let place of stubData) {
    new Place(place).insertPlace();
}

const app = express();

app.use(bodyParser.json());

routes(app);

app.listen(8080);
