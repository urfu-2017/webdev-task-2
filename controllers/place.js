'use strict';

const Place = require('../models/place');

exports.create = (req, res) => {
    let place = new Place(req.params.name);
    place.save();
    res.statusCode = 201;
    res.send(place);
};

exports.list = (req, res) => {
    let places = Place.getAll(req.params.fieldSort, req.params.order);
    res.status(200);
    res.send(places);
};

exports.find = (req, res) => {
    let place = Place.tryfind(req.params.name);
    if (place) {
        res.statusCode = 200;
        res.send(place);
    } else {
        res.sendStatus(400);
    }
};

exports.edit = (req, res) => {
    let result = Place.tryEdit(req.params.name, req.params.newName);
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};

exports.visit = (req, res) => {
    let result = Place.tryVisit(req.params.name, req.params.isVisited !== 'false');
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};

exports.delete = (req, res) => {
    let result = Place.tryDelete(req.params.name);
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};

exports.swap = (req, res) => {
    let result = Place.trySwap(Number(req.params.index1), Number(req.params.index2));
    if (result) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};

exports.clear = (req, res) => {
    Place.clearList();
    res.sendStatus(200);
};
