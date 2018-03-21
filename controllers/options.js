'use strict';

const Place = require('../models/place');

exports.create = (req, res) => {
    const { name, country, city } = req.body;
    const place = new Place({ name, country, city });
    if (place.name) {
        place.save();
        res.sendStatus(201);
    } else {
        res.sendStatus(409);
    }
};

exports.itemId = (req, res) => {
    const { id } = req.params;
    const place = Place.findItemById(id);

    if (place) {
        res.json(place);
    } else {
        res.sendStatus(404);
    }
};

exports.find = (req, res) => {
    const { feature } = req.params;
    const places = Place.find(feature);

    if (places) {
        res.json(places);
    } else {
        res.sendStatus(404);
    }
};

exports.list = (req, res) => {
    const places = Place.findAll(req.query);
    res.json(places);
};

exports.update = (req, res) => {
    const { id } = req.params;
    const { name, country, city } = req.body;
    const isUpdate = Place.update(id, { name, country, city });
    if (isUpdate) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

exports.visit = (req, res) => {
    const { id } = req.params;
    const isVisit = Place.visit(id);
    if (isVisit) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

exports.deleteItem = (req, res) => {
    const { id } = req.params;
    const isDelete = Place.deletePlace(id);
    if (isDelete) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

exports.deleteAll = (req, res) => {
    const isDelete = Place.deleteAll();
    if (isDelete) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};
