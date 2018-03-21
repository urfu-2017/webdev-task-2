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

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.status(200).send();
    } else {
        next();
    }
});
routes(app);

let port = process.env.PORT || 8080;
app.listen(port);
