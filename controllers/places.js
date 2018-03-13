'use strict';

const Place = require('../models/place');

exports.list = (req, res) => {
    const {
        sortBy = 'date',
        pageSize = 10,
        pageNumber = 1,
        description = '',
        reverse = false
    } = req.query;

    let places = Place.findByDescription(sortBy, description);
    places = reverse ? places.reverse() : places;
    places = places.slice(pageSize * (pageNumber - 1), pageSize * pageNumber);

    res.json(places);
};

exports.getPlace = (req, res) => {
    const place = Place.findById(req.params.id);
    res.json(place);
};

exports.create = (req, res) => {
    if (typeof req.body.description !== 'string') {
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

    if (req.body.description && typeof req.body.description !== 'string') {
        res.status(400).send('description must be a string');

        return;
    }

    if (req.body.isVisited && typeof req.body.isVisited !== 'boolean') {
        res.status(400).send('isVisited must be boolean');

        return;
    }

    place.update(req.body);

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
