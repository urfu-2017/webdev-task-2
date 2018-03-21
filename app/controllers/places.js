'use strict';

const Place = require('../models/place');

exports.deleteAll = (req, res) => {
    Place.deleteAll();
    res.sendStatus(200);
};

exports.list = (req, res) => {
    let places = Place.getList(req.query);
    res.json(places);
};

exports.create = (req, res) => {
    const place = new Place(req.body);
    Place.add(place);
    res.sendStatus(200);
};

exports.deleteById = (req, res) => {
    Place.deletePlace(req.params.id);
    res.sendStatus(200);
};

exports.getById = (req, res) => {
    const place = Place.getById(req.params.id);
    res.json(place);
};

exports.find = (req, res) => {
    const places = Place.find(req.query.request);
    res.json(places);
};

exports.updateDescription = (req, res) => {
    Place.updateDescription(req.params.id, req.params.newValue);
    res.sendStatus(200);
};

exports.updateMark = (req, res) => {
    const newValue = JSON.parse(req.params.newValue);
    if (typeof newValue !== 'boolean') {
        res.status(400).send(`parameter type = ${typeof newValue}, expected boolean `);
    }

    Place.updateMark(req.params.id, newValue);
    res.sendStatus(200);
};

exports.swap = (req, res) => {
    Place.swap(req.query.oldIndex, req.query.newIndex);
    res.sendStatus(200);
};
