'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 10010;

const placesContoller = require('./controllers/places-controller');

app.use(bodyParser.json());

app.post('/places', placesContoller.addPlaceController);
app.get('/places', placesContoller.getPlacesController);
app.delete('/places', placesContoller.deletePlacesController);
app.patch('/places/:id', placesContoller.patchPlaceController);
app.delete('/places/:id', placesContoller.deletePlaceController);

app.listen(port, function () {
    console.info(`App is started on port ${port}.`);
});
