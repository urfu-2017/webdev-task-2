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
        return res.sendStatus(400);
    }

    Place.create(req.body.description).save();
    res.sendStatus(201);
};

module.exports.update = (req, res) => {
    const place = Place.findById(req.params.id);
    const description = req.body.description;

    if (!place) {
        return res.sendStatus(404);
    }
    if (!description) {
        return res.sendStatus(204);
    }

    place.description = description;

    res.sendStatus(200);
};

module.exports.visit = (req, res) => {
    const id = Number(req.params.id);
    const place = Place.findById(id);

    if (!place) {
        return res.sendStatus(404);
    }

    place.visited = true;

    res.sendStatus(200);
};

module.exports.swap = (req, res) => {
    const [id1, id2] = [Number(req.params.id1), Number(req.params.id2)];
    const success = Place.swap(id1, id2);

    res.sendStatus(success ? 200 : 404);
};

module.exports.removeAll = (req, res) => {
    Place.removeAll();
    res.sendStatus(200);
};

module.exports.remove = (req, res) => {
    const id = Number(req.params.id);
    const place = Place.findById(id);

    if (!place) {
        return res.sendStatus(404);
    }

    place.remove();
    res.sendStatus(200);
};
