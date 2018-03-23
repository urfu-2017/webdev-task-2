'use strict';

const placesRepo = require('../repository/placesRepository');

module.exports.addPlace = function addPlace(req, res) {
    const { name } = req.body;
    const answer = placesRepo.addPlace(name);
    res.json(answer);
};

module.exports.getPlaces = function getPlaces(req, res) {
    const { search, sortBy, sortDir, page, limit } = req.body;
    const sort = { direction: sortDir, by: sortBy };
    const places = placesRepo.getPlaces(search, sort, page, limit);
    res.json(places);
};

// module.exports.clearPlaces = function clearPlaces(req, res) {
//     placesRepo.clearAll();
//     res.sendStatus(200);
// };

module.exports.deletePlace = function deletePlace(req, res) {
    const { id } = req.body;
    if (id !== undefined) {
        const isComplete = placesRepo.deletePlace(id);
        if (isComplete) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } else {
        placesRepo.clearAll();
        res.sendStatus(200);
    }
};

module.exports.updatePlace = function updatePlace(req, res) {
    const { id, name, isVisited } = req.body;
    const place = placesRepo.updatePlace(id, name, isVisited);
    if (place) {
        res.json(place);
    } else {
        res.sendStatus(404);
    }
};

module.exports.swapPlace = function swapPlace(req, res) {
    const { id } = req.params;
    const { position } = req.body;
    const isComplete = placesRepo.swapPlace(Number(id), Number(position));
    if (isComplete) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};
