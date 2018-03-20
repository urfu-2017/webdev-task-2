'use strict';

const Place = require('../models/place');
const store = require('../models/places-store');
const errors = require('./errors');

exports.getPlaces = (req, res) => {
    const places = store.get(req.query.comparer);

    if (places === null) {
        errors.error400(req, res);

        return;
    }

    res.send(places);
};

exports.getPlacesPage = (req, res) => {
    const places = store.getPage(Number(req.params.number));

    if (places === null) {
        errors.error400(req, res);

        return;
    }

    res.send(places);
};

exports.searchPlaces = (req, res) => {
    if (req.query.q === null) {
        errors.error400(req, res);

        return;
    }

    const places = store.search(req.query.q);

    res.send(places);
};

exports.removePlaces = (req, res) => {
    if (req.query.id) {
        const place = store.remove(req.query.id);

        if (place === null) {
            errors.error400(req, res);

            return;
        }
    } else {
        store.drop();
    }

    res.sendStatus(200);
};

exports.swapPlaces = (req, res) => {
    if (!(req.query.id1 && req.query.id2)) {
        errors.error404(req, res);

        return;
    }

    const places = store.swap(req.query.id1, req.query.id2);

    if (places === null) {
        errors.error400(req, res);

        return;
    }

    res.sendStatus(200);
};

exports.createPlace = (req, res) => {
    const place = new Place(req.body.name, req.body.description);
    store.add(place);

    res.sendStatus(201);
};

exports.editPlace = (req, res) => {
    const hasRequiredParams = req.params.id &&
        ((req.body.name && req.body.description) || req.body.visited);
    if (!hasRequiredParams) {
        errors.error404(req, res);

        return;
    }

    const place = store.edit(req.params.id, {
        name: req.body.name,
        description: req.body.description,
        visited: req.body.visited
    });

    if (place === null) {
        errors.error400(req, res);

        return;
    }

    res.sendStatus(200);
};
