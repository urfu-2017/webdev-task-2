'use strict';

const Place = require('../models/place');
const errors = require('./errors');

const orderings = {
    name: function (p1, p2) {
        return p1.name < p2.name ? -1 : 1;
    },
    date: function (p1, p2) {
        return p1.createdAt - p2.createdAt;
    }
};

let placesStore = require('../domain/places-store');

exports.get = (req, res) => {
    let { order, limit, offset, query } = req.query;
    limit = Number(limit) || 10;
    offset = Number(offset) || 0;

    let requestedPlaces = placesStore.get().slice(offset, limit + offset);

    if (query) {
        requestedPlaces = requestedPlaces.filter(({ name }) => {
            return name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
        });
    }

    if (order && Object.keys(orderings).includes(order)) {
        requestedPlaces.sort(orderings[order]);
    }

    res.json(requestedPlaces);
};

exports.getById = (req, res) => {
    let placeId = req.params.id;
    let requestedPlace = placesStore.getById(placeId);

    if (requestedPlace) {
        res.json(requestedPlace);
    } else {
        errors.error404(req, res).send('Place not found');
    }
};

exports.add = (req, res) => {
    let placeName = req.body.name;

    if (!placeName) {
        errors.error400(req, res).send(`Name is not specified at ${req.method} request`);

        return;
    }

    let addedPlace = placesStore.add(new Place(placeName));

    if (!addedPlace) {
        errors.error409(req, res).send(`Place (${placeName}) has already been added`);

        return;
    }

    res.status(201).json(addedPlace);
};

exports.delete = (req, res) => {
    let placeId = req.params.id;

    let success = placesStore.deleteById(placeId);
    if (success) {
        res.sendStatus(204);
    } else {
        errors.error404(req, res).send('Place not found');
    }
};

exports.deleteAll = (req, res) => {
    placesStore.deleteAll();

    res.sendStatus(204);
};

exports.update = (req, res) => {
    let placeId = req.params.id;
    // to - на какую позицию в списке нужно переместить место
    let to = req.body.moveTo;
    delete req.body.moveTo;

    let success = placesStore.update(placeId, req.body);

    if (success) {
        placesStore.moveTo(placeId, to);
        res.sendStatus(204);

        return;
    }

    errors.error404(req, res).send('Place not found');
};
