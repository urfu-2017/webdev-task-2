'use strict';

const Place = require('../models/place');

exports.findAll = (req, res) => {
    if (req.query.description !== undefined) {
        res.send(Place.findByDescription(req.query.description));
    }
    if (req.query.sortDate !== undefined) {
        res.send(getSortedPlacesByDate(req.query.sortDate, Place.findAll()));
    }
    if (req.query.sortAlphabet !== undefined) {
        res.send(getSortedPlacesByAlphabet(req.query.sortAlphabet, Place.findAll()));
    }
    res.send(Place.findAll());
};

exports.remove = (req, res) => {
    if (req.query.id !== undefined) {
        res.send(Place.deleteById(Number(req.query.id)));
    }
    res.send(Place.deleteAll());
};

exports.create = (req, res) => {
    const place = new Place(req.body);
    place.save();
    res.sendStatus(201);
};

exports.item = (req, res) => {
    const id = Number(req.params.id);
    const place = Place.findById(id);
    if (place) {
        res.send(place);
    } else {
        res.sendStatus(404);
    }
};

exports.getPage = (req, res) => {
    let page = req.params.page;
    if (isNaN(page)) {
        res.sendStatus(404);
    } else {
        page = Number(page);
        if (page < 1 || page > 3) {
            res.sendStatus(404);
        } else {
            res.send(getPageByNumber(page, Place.findAll()));
        }
    }
};

exports.edit = (req, res) => {
    const id = Number(req.params.id);
    const newDescription = req.body.description;
    const newVisit = req.body.visit;
    const place = Place.findById(id);
    if (newDescription !== undefined) {
        place.description = newDescription;
    }
    if (newVisit !== undefined) {
        place.visit = newVisit;
    }
    res.sendStatus(200);
};

exports.reshuffle = (req, res) => {
    const id1 = req.query.id1;
    const id2 = req.query.id2;
    if (id1 !== undefined && id2 !== undefined) {
        Place.reshuffle(Number(id1), Number(id2));
        res.sendStatus(200);
    }
    res.send(Place.findAll());
};

function getSortedPlacesByDate(order, storage) {
    let storageCopy = JSON.parse(JSON.stringify(storage));
    if (order === 'asc') {
        return storageCopy.sort((firstPlace, secondPlace) =>
            firstPlace.creationDate < secondPlace.creationDate);
    }
    if (order === 'desc') {
        return storageCopy.sort((firstPlace, secondPlace) =>
            firstPlace.creationDate > secondPlace.creationDate);
    }

    return storage;
}

function getSortedPlacesByAlphabet(order, storage) {
    let storageCopy = JSON.parse(JSON.stringify(storage));
    if (order === 'asc') {
        return storageCopy.sort((firstPlace, secondPlace) =>
            firstPlace.name < secondPlace.name);
    }
    if (order === 'desc') {
        return storageCopy.sort((firstPlace, secondPlace) =>
            firstPlace.name > secondPlace.name);
    }

    return storage;
}

function getPageByNumber(page, storage) {
    let storageCopy = JSON.parse(JSON.stringify(storage));
    let count = Math.ceil(storageCopy.length / 3);
    let res = [];
    let current = [];
    for (let i = 0; i < storageCopy.length; i++) {
        current.push(storageCopy[i]);
        if (current.length === count) {
            res.push(current);
            current = [];
        }
    }
    if (current.length !== 0) {
        res.push(current);
    }

    return res[page - 1];
}
