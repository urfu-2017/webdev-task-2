'use strict';

const Place = require('../models/place');

exports.list = (req, res) => {
    const {
        sortBy,
        pageSize = 10,
        pageNumber = 1,
        description = ''
    } = req.query;

    if (sortBy) {
        Place.sortPlaces(sortBy);
    }

    let places = Place.findByDescription(description);
    places = places.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);

    res.json(places);
};

exports.getPlace = (req, res) => {
    const place = Place.findById(req.params.id);
    res.json(place);
};

exports.create = (req, res) => {
    const { description } = req.body;

    if (typeof description !== 'string') {
        res.status(400).send('body must contain a description as a string');

        return;
    }

    const place = new Place(req.body);
    place.save();

    res.status(201).json(place);
};

exports.change = (req, res) => {
    const place = Place.findById(req.params.id);

    if (!place) {
        res.status(400).send('place with such id is not found');

        return;
    }

    const { description, isVisited, indexNumber } = req.body;

    const errorMessage = getErrorMessage({ description, isVisited, indexNumber });
    if (errorMessage) {
        res.status(400).send(errorMessage);

        return;
    }

    place.update({ description, isVisited, indexNumber });

    res.status(200).send(place);
};

exports.deletePlace = (req, res) => {
    const placeToDelete = Place.findById(req.params.id);
    Place.deletePlace(placeToDelete);
    res.sendStatus(200);
};

exports.deleteAll = (req, res) => {
    Place.deleteAll();
    res.sendStatus(200);
};

function getErrorMessage({ description, isVisited, indexNumber }) {
    if (isPropertyCorrect(description, 'string')) {
        return 'description must be a string';
    }

    if (isPropertyCorrect(isVisited, 'boolean')) {
        return 'isVisited must be boolean';
    }

    if (isPropertyCorrect(indexNumber, 'number')) {
        return 'indexNumber must be a number';
    }

    return;
}

function isPropertyCorrect(property, typeOfProperty) {
    return property !== undefined && typeof property !== typeOfProperty;
}
