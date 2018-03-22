'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 10010;

const placesContoller = require('./controllers/places');

app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'POST, GET, DELETE, PATCH');
    next();
});

app.post('/places', placesContoller.addPlace);
app.get('/places', placesContoller.getPlaces);
app.delete('/places', placesContoller.deletePlaces);
app.patch('/places/:id', placesContoller.patchPlace);
app.delete('/places/:id', placesContoller.deletePlace);

app.listen(port, function () {
    console.info(`App is started on port ${port}.`);
});
