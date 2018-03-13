'use strict';
const PlacesRepo = require('../models/placesRepo');
let places = new PlacesRepo();

const dateComparator = (a, b) => {
    if (a.date > b.date) {
        return 1;
    }
    if (a.date < b.date) {
        return -1;
    }

    return 0;
};

const descriptionComparator = (a, b) => {
    return a.description.localeCompare(b.description);
};

exports.addPlace = (req, res) => {
    if (req.body.description) {
        const place = places.add(req.body.description);

        res.status(201).json(place);
    } else {
        res.status(204);
    }
};

exports.getPlaces = (req, res) => {
    res.status(200).json(places.getAll());
};

exports.changeDescription = (req, res) => {
    const place = places.update(req.params.id, req.body.description);
    if (place) {
        res.status(200).json(place);
    } else {
        res.response(404);
    }
};

exports.updateVisited = (req, res) => {
    const place = places.updateVisited(req.params.id);
    if (place) {
        res.status(200).json(place);
    } else {
        res.status(404);
    }
};

exports.deletePlace = (req, res) => {
    if (places.delete(req.params.id)) {
        res.status(200);
    } else {
        res.status(404);
    }
};

exports.deleteAll = (req, res) => {
    places.deleteAll();

    res.status(200);
};

exports.swap = (req, res) => {
    if (places.swap(req.params.id1, req.params.id2)) {
        res.response(200);
    } else {
        res.response(404);
    }
};

exports.sortByDate = (req, res) => {
    sort(req, res, dateComparator);
};

exports.sortByDescription = (req, res) => {
    sort(req, res, descriptionComparator);
};

exports.getPage = (req, res) => {
    const page = places.getPage(req.query.start, req.query.limit);

    res.response(200).json(page);
};

function sort(req, res, comparator) {
    const sortedPlaces = places.sort(comparator);

    res.response(200).json(sortedPlaces);
}
