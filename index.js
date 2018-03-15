'use strict';

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 10010;

const storage = require('./places-storage');

app.use(bodyParser.json());

app.post('/places', addPlaceController);
app.get('/places', getPlacesController);
app.delete('/places', deletePlacesController);
app.patch('/places/:id', patchPlaceController);
app.delete('/places/:id', deletePlaceController);

app.listen(port, function () {
    console.info(`App is started on port ${port}.`);
});

function addPlaceController(req, res) {
    const { name, description } = req.body;
    storage.addPlace(name, description);

    res.sendStatus(200);
}

function getPlacesController(req, res) {
    const { search, sortBy, sortDirection, skip, take } = req.query;
    const sort = { 'type': sortBy, 'direction': sortDirection };
    const places = storage.getPlaces(search, sort, Number(skip), Number(take));

    res.json(places);
}

function patchPlaceController(req, res) {
    const id = req.params.id;
    const result = storage.editPlace(id, req.body);
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}

function deletePlacesController(req, res) {
    storage.removeAllPlaces();

    res.sendStatus(200);
}

function deletePlaceController(req, res) {
    const id = req.params.id;
    const result = storage.removePlace(id);

    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
}
