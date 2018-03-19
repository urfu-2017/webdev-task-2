'use strict';

const Place = require('../models/place');
const placesStorage = require('../models/placesStorage');

exports.deleteAll = (req, res) => {
    placesStorage.deleteAll();
    res.sendStatus(200);
};

exports.list = (req, res) => {
    let places = placesStorage.getList(req.query);
    res.json(places);
};

exports.create = (req, res) => {
    const place = new Place(req.body);
    placesStorage.add(place);
    res.sendStatus(200);
};

exports.deleteById = (req, res) => {
    if (!placesStorage.tryDeletePlace(req.params.id)) {
        sendIdNotExistsError(req.params.id);
    } else {
        res.sendStatus(200);
    }
};

exports.getById = (req, res) => {
    const place = placesStorage.getById(req.params.id);
    if (place === null) {
        sendIdNotExistsError(req.params.id);
    } else {
        res.json(place);
    }
};

exports.findByDescription = (req, res) => {
    const places = placesStorage.findByDescription(req.params.description);
    res.json(places);
};

exports.updateDescription = (req, res) => {
    if (placesStorage.tryUpdateDescription(req.params.id, req.params.newValue)) {
        sendIdNotExistsError(req.params.id);
    } else {
        res.sendStatus(200);
    }
};

exports.updateMark = (req, res) => {
    let newValue = JSON.parse(req.params.newValue);
    if (typeof newValue !== 'boolean') {
        res.status(400).send(`parameter type = ${typeof newValue}, expected boolean `);
    }

    if (newValue === undefined || !placesStorage.tryUpdateMark(req.params.id, newValue)) {
        sendIdNotExistsError(req.params.id);
    } else {
        res.sendStatus(200);
    }
};

exports.shuffle = (req, res) => {
    placesStorage.shuffle();
    res.sendStatus(200);
};

function sendIdNotExistsError(res, id) {
    return res.status(400).send(`place with id = ${id} doesn't exist`);
}
