'use strict';

const Place = require('../models/place');

module.exports.getAll = (req, res) => {
    const places = Place.getAll(req.query);

    res.json(places);
};

module.exports.find = (req, res) => {
    const place = Place.findByDescription(req.body.description);

    if (place) {
        res.json(place);
    } else {
        res.sendStatus(404);
    }
};

module.exports.create = (req, res) => {
    if (!req.body.description || Place.findByDescription(req.body.description)) {
        res.sendStatus(409);
    } else {
        new Place(req.body.description).save();
        res.sendStatus(201);
    }
};

module.exports.update = (req, res) => {
    const place = Place.findById(req.params.id);

    if (place) {
        place.description = req.body.description || place.description;
        place.visited = req.body.visited === true;

        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

module.exports.removeAll = (req, res) => {
    Place.removeAll();
    res.sendStatus(200);
};

module.exports.remove = (req, res) => {
    const place = Place.findById(req.params.id);

    if (place) {
        place.remove();
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};
