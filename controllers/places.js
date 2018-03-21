'use strict';

const Place = require('../models/place');

exports.findAll = (req, res) => {
    const { type, sort } = req.query;

    switch (type) {
        case 'description':
            res.send(Place.findByDescription(req.query.type));
            break;

        case 'sortDate':
            res.send(Place.getSortedPlacesByDate(sort));
            break;

        case 'sortAlphabet':
            res.send(Place.getSortedPlacesByAlphabet(sort));
            break;

        default:
            res.send(Place.findAll());
    }
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
    let page = Number(req.params.page);
    let countOnPage = Number(req.query.countOnPage);
    let count = Math.ceil((Place.findAll().length) / countOnPage);

    if (isNaN(page)) {
        res.sendStatus(404);
    } else {
        page = Number(page);
        if (page < 1 || page > count) {
            res.sendStatus(404);
        } else {
            res.send(getPageByNumber(page, countOnPage, Place.findAll()));
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
    const { id1, id2 } = req.query;

    if (id1 !== undefined && id2 !== undefined &&
        Place.findById(Number(id1)) !== undefined && Place.findById(Number(id2)) !== undefined) {
        Place.reshuffle(Number(id1), Number(id2));
        res.sendStatus(200);
    }
    res.send(Place.findAll());
};

function getPageByNumber(page, countOnPage, storage) {
    let storageCopy = JSON.parse(JSON.stringify(storage));
    let res = [];
    let current = [];

    for (let i = 0; i < storageCopy.length; i++) {
        current.push(storageCopy[i]);
        if (current.length === countOnPage) {
            res.push(current);
            current = [];
        }
    }
    if (current.length !== 0) {
        res.push(current);
    }

    return res[page - 1];
}
