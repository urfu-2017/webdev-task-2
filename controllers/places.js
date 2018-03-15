'use strict';

const Place = require('../models/place');

exports.swap = (req, res) => {
    const firstId = req.params.firstId;
    const secondId = req.params.secondId;
    res.sendStatus(Place.swap(firstId, secondId));
};

exports.change = (req, res) => {
    const id = req.params.id;
    res.sendStatus(Place.change(id, req.body));
};

exports.remove = (req, res) => {
    const id = req.params.id;
    if (id) {
        res.sendStatus(Place.remove(id));
    } else {
        res.sendStatus(Place.remove());
    }
};

exports.list = (req, res) => {
    const query = req.query;
    const places = Place.findAll(query.sort, query.page);

    res.json(places);
};

exports.item = (req, res) => {
    const description = req.params.description;
    const place = Place.find(description);

    if (place) {
        res.json(place);
    } else {
        res.sendStatus(404);
    }
};

exports.create = (req, res) => {
    const place = new Place(req.body);
    place.save();

    res.sendStatus(201);
};
