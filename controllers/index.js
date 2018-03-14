'use strict';

const Place = require('../models/place');

module.exports.createPlace = (req, res) => {
    new Place(req.body).save();
    res.sendStatus(201);
};

module.exports.list = (req, res) => {
    let storage;
    const order = req.query.order;
    if (order === 'date') {
        storage = Place.sortByDate();
    } else if (order === 'alphabet') {
        storage = Place.sortByAlphabet();
    } else {
        res.sendStatus(404);
    }
    res.status(200).send(storage);
};

module.exports.getPage = (req, res) => {
    const pageNumber = Number(req.params.page);
    const placesCount = Number(req.query.count);
    const page = Place.getPage(pageNumber, placesCount);
    if (page) {
        res.status(200).send(page);
    } else {
        res.sendStatus(404);
    }
};

module.exports.searchPlaces = (req, res) => {
    const description = req.query.description;
    const places = Place.searchPlaces(description);
    if (places.length !== 0) {
        res.status(200).send(places);
    } else {
        res.sendStatus(404);
    }
};

module.exports.update = (req, res) => {
    const { description, name, visited } = req.body;
    const placeId = Number(req.params.id);
    if (visited === undefined) {
        if (Place.updatePlaceDescription(placeId, description)) {
            res.sendStatus(200);
        } else if (name) {
            new Place(req.body).save();
            res.sendStatus(201);
        }
    } else if (Place.updatePlaceVisit(placeId, visited)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};

module.exports.clearList = (req, res) => {
    Place.clearStorage();
    res.sendStatus(204);
};

module.exports.deletePlace = (req, res) => {
    const placeId = Number(req.params.id);
    if (Place.deletePlace(placeId)) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};

module.exports.swap = (req, res) => {
    const id1 = Number(req.params.id);
    const id2 = Number(req.query.id);
    if (Place.swap(id1, id2)) {
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
};
