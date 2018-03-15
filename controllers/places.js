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
    const description = req.body.description;

    if (place) {
        if (description) {
            place.description = description;

            res.sendStatus(200);
        } else {
            res.sendStatus(204);
        }
    } else {
        res.sendStatus(404);
    }
};

module.exports.visit = (req, res) => {
    const place = Place.findById(req.params.id);

    if (place) {
        place.visited = true;

        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

module.exports.swap = (req, res) => {
    const success = Place.swap(req.params.id1, req.params.id2);

    res.sendStatus(success ? 200 : 404);
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
