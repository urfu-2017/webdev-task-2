'use strict';

const Place = require('../models/place');

exports.create = (req, res) => {
    const place = new Place(req.body[0]);
    if (place.name) {
        place.save();
        res.sendStatus(201);
    } else {
        res.sendStatus(409);
    }
};

exports.itemId = (req, res) => {
    const id = req.params.id;
    const place = Place.findItemById(id);

    if (place) {
        res.json(place);
    } else {
        res.sendStatus(404);
    }
};

exports.find = (req, res) => {
    const feature = req.params.feature;
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
    const id = req.params.id;
    const isUpdate = Place.update(id, req.body[0]);
    if (isUpdate) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

exports.visit = (req, res) => {
    const id = req.params.id;
    const isVisit = Place.visit(id);
    if (isVisit) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

exports.deleteItem = (req, res) => {
    const id = req.params.id;
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

/* exports.move = (req, res) => {
    const id = req.params.id;
    const isMove = Place.move(id, req.query);
    if (isMove) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
}; */
