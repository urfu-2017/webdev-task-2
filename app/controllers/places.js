'use strict';

const PlacesStorage = require('../models/placesStorage');
const Place = require('../models/place');

const placesStorage = new PlacesStorage();

exports.deleteAll = (req, res) => {
    placesStorage.places.clear();
    res.sendStatus(200);
};

exports.list = (req, res) => {
    let places = placesStorage.getList(req.query);
    res.json(places);
};

exports.create = (req, res) => {
    const place = new Place(req.body);
    placesStorage.places.insert(place);
    res.sendStatus(200);
};

exports.deleteById = (req, res) => {
    const statusCode = !placesStorage.tryDeletePlace(req.params.id) ? 400 : 200;
    res.sendStatus(statusCode);
};

exports.getById = (req, res) => {
    const place = placesStorage.places.get(req.params.id);
    if (place === null) {
        res.sendStatus(400);
    } else {
        res.json(new Place(place));
    }
};

exports.findByDescription = (req, res) => {
    const places = placesStorage.findByDescription(req.params.description);
    if (places.length === 0) {
        res.sendStatus(400);
    }

    res.json(places);
};

exports.updateDescription = (req, res) => {
    const statusCode = placesStorage.tryUpdateDescription(req.params.id, req.params.newValue)
        ? 200
        : 400;
    res.sendStatus(statusCode);
};

exports.updateMark = (req, res) => {
    let newValue;
    if (req.params.newValue.toLowerCase() === 'true') {
        newValue = true;
    }

    if (req.params.newValue.toLowerCase() === 'false') {
        newValue = false;
    }

    const statusCode = newValue !== undefined &&
        placesStorage.tryUpdateMark(req.params.id, newValue)
        ? 200
        : 400;
    res.sendStatus(statusCode);
};

exports.shuffle = (req, res) => {
    placesStorage.shuffle();
    res.sendStatus(200);
};

