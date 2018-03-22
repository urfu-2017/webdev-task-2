'use strict';

const storage = require('../places-storage');

module.exports.addPlace = function addPlace(req, res) {
    const { name } = req.body;
    const result = storage.addPlace(name);
    if (!result) {
        res.sendStatus(400);
    } else {
        res.sendStatus(200);
    }
};

module.exports.getPlaces = function getPlaces(req, res) {
    const { search, sortBy, sortDirection, skip, take } = req.query;
    const sort = { 'type': sortBy, 'direction': sortDirection };
    const places = storage.getPlaces(search, sort, Number(skip), Number(take));

    res.json(places);
};

module.exports.patchPlace = function patchPlace(req, res) {
    const id = req.params.id;
    const result = storage.editPlace(id, req.body);
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};

module.exports.deletePlaces = function deletePlaces(req, res) {
    storage.removeAllPlaces();

    res.sendStatus(200);
};

module.exports.deletePlace = function deletePlace(req, res) {
    const id = req.params.id;
    const result = storage.removePlace(id);

    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};
