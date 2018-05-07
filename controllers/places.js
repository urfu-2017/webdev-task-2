'use strict';
const PlacesRepo = require('../models/placesRepo');
const HttpStatus = require('http-status-codes');

let places = new PlacesRepo();

const dateComparator = (a, b) => a.date - b.date;

const descriptionComparator = (a, b) => {
    return a.description.localeCompare(b.description);
};

exports.addPlace = (req, res) => {
    if (req.body.description) {
        const place = places.add(req.body.description);

        res.status(HttpStatus.CREATED).json(place);
    } else {
        res.sendStatus(HttpStatus.NO_CONTENT);
    }
};

function getByDescription(req, res) {
    let description = places.getByDescription(req.query.query);
    if (description) {
        res.status(HttpStatus.OK).json(description);
    } else {
        res.status(HttpStatus.NO_CONTENT);
    }
}

function getSorted(req, res) {
    if (req.query.sort === 'date') {
        sortByDate(req, res);
    } else if (req.query.sort === 'description') {
        sortByDescription(req, res);
    }
}

exports.getPlaces = (req, res) => {
    if (req.query.query) {
        getByDescription(req, res);
    } else if (req.query.sort) {
        getSorted(req, res);
    } else {
        res.status(HttpStatus.OK).json(places.getAll());
    }
};

exports.changeDescription = (req, res) => {
    const place = places.update(req.params.id, req.body.description);
    if (place) {
        res.status(HttpStatus.OK).json(place);
    }
};

exports.updateVisited = (req, res) => {
    const place = places.updateVisited(req.params.id);
    if (place) {
        res.status(HttpStatus.OK).json(place);
    } else {
        res.sendStatus(HttpStatus.BAD_REQUEST);
    }
};

exports.deletePlace = (req, res) => {
    if (places.delete(req.params.id)) {
        res.sendStatus(HttpStatus.OK);
    }
};

exports.deleteAll = (req, res) => {
    places.deleteAll();

    res.sendStatus(HttpStatus.OK);
};

exports.swap = (req, res) => {
    if (places.swap(req.params.id1, req.params.id2)) {
        res.sendStatus(HttpStatus.OK);
    } else {
        res.sendStatus(HttpStatus.BAD_REQUEST);
    }
};

function sortByDate(req, res) {
    sort(req, res, dateComparator);
}


function sortByDescription(req, res) {
    sort(req, res, descriptionComparator);
}

exports.getPage = (req, res) => {
    const page = places.getPage(req.query.start, req.query.limit);

    res.response(HttpStatus.OK).json(page);
};

function sort(req, res, comparator) {
    let sorted;
    if (req.query.order === 'desc') {
        sorted = places.getOrdered(req, res, comparator);
        sorted.reverse();
    } else {
        sorted = places.getOrdered(req, res, comparator);
    }

    res.response(HttpStatus.OK).json(sorted);
}
