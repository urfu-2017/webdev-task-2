'use strict';

const storage = require('../places-storage');

module.exports.addPlaceController = function addPlaceController(req, res) {
    const { name, description } = req.body;
    storage.addPlace(name, description);

    res.sendStatus(200);
};

module.exports.getPlacesController = function getPlacesController(req, res) {
    const { search, sortBy, sortDirection, skip, take } = req.query;
    const sort = { 'type': sortBy, 'direction': sortDirection };
    const places = storage.getPlaces(search, sort, Number(skip), Number(take));

    res.json(places);
};

module.exports.patchPlaceController = function patchPlaceController(req, res) {
    const id = req.params.id;
    const result = storage.editPlace(id, req.body);
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};

module.exports.deletePlacesController = function deletePlacesController(req, res) {
    storage.removeAllPlaces();

    res.sendStatus(200);
};

module.exports.deletePlaceController = function deletePlaceController(req, res) {
    const id = req.params.id;
    const result = storage.removePlace(id);

    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};
