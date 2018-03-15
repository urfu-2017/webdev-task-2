'use strict';

const Place = require('../models/place');

module.exports.create = (req, res) => {
    if (!Place.findPlace(req.body)) {
        Place.create(req.body);
        res.sendStatus(201);
    } else {
        res.sendStatus(409);
    }
};

module.exports.list = (req, res) => {
    const [order, property] = req.query.sort.split('.');
    const storage = Place.sort(property, order);
    if (storage) {
        res.status(200).send(storage);
    } else {
        res.sendStatus(404);
    }
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
        res.status(200).send([]);
    }
};

module.exports.updatePlaceDescription = (req, res) => {
    const { description, name } = req.body;
    const placeId = Number(req.params.id);
    if (Place.updatePlaceDescription(placeId, description)) {
        res.sendStatus(200);
    } else if (name) {
        Place.create(req.body);
        res.sendStatus(201);
    }
};

module.exports.updatePlaceVisit = (req, res) => {
    const placeId = Number(req.params.id);
    const visit = req.query.visit;
    if (Place.updatePlaceVisit(placeId, visit)) {
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
