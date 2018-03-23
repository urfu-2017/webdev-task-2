'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const routes = require('./routes');
const Place = require('./models/place');
const stubData = require('./data_for_check_app/seven-wonders-of-the-world.json');

for (const place of stubData) {
    new Place(place).create();
}

const app = express();

app.use(cors());
app.use(bodyParser.json());

routes(app);

app.listen(3000);

module.exports = app;
