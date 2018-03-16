'use strict';

const placesRepo = require('../repository/placesRepository');

module.exports.addPlace = function addPlace(req, res) {
    const { name } = req.params;
    placesRepo.addPlace(name);
    res.sendStatus(200);
};

module.exports.getPlaces = function getPlaces(req, res) {
    const { search, sortBy, sortDir, page, limit } = req.query;
    const sort = { 'dir': sortDir, 'by': sortBy };
    const places = placesRepo.getPlaces(search, sort, page, limit);
    res.json(places);
};

module.exports.clearPlaces = function clearPlaces(req, res) {
    placesRepo.clearAll();
    res.sendStatus(200);
};

module.exports.deletePlace = function deletePlace(req, res) {
    const { id } = req.params;
    const complite = placesRepo.deletePlace(id);
    if (complite) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};

module.exports.updatePlace = function updatePlace(req, res) {
    const { id } = req.params;
    const { name, isVisited } = req.query;
    const complite = placesRepo.updatePlace(id, name, isVisited);
    if (complite) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};

module.exports.swapPlace = function swapPlace(req, res) {
    const { id } = req.params;
    const { position } = req.query;
    const complite = placesRepo.swapPlace(id, position);
    if (complite) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};
