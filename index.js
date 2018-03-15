'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 10010;

const placesContoller = require('./controllers/places');

app.use(bodyParser.json());

app.post('/places', placesContoller.addPlace);
app.get('/places', placesContoller.getPlaces);
app.delete('/places', placesContoller.deletePlaces);
app.patch('/places/:id', placesContoller.patchPlace);
app.delete('/places/:id', placesContoller.deletePlace);

app.listen(port, function () {
    console.info(`App is started on port ${port}.`);
});
