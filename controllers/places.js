'use strict';

const DEFAULT_PAGE_COUNT = 10;

const places = require('../models/places');

module.exports.createPlace = function (req, res) {
    let id = places.createPlace(req.body.description).id;
    res.redirect('/places/' + id);
};

module.exports.listPlaces = function (req, res) {
    let searchQuery = req.query.query;
    let result = searchQuery ? places.find(searchQuery) : places.list();

    result.sort(getCompareFn(req.query.sorting));

    let page = Math.max(req.query.page - 1, 0);
    let count = req.query.page_count || DEFAULT_PAGE_COUNT;
    if (page) {
        let offset = Number(page) * Number(count);
        let limit = Number(count);
        result = result.slice(offset, limit);
    }

    res.json(result);
};

module.exports.getPlace = function (req, res) {
    let place = places.getPlace(Number(req.params.id));
    if (place === null) {
        return res.sendStatus(404);
    }

    res.json(place);
};

module.exports.editPlace = function (req, res) {
    let place = places.getPlace(Number(req.params.id));
    if (place === null) {
        return res.sendStatus(404);
    }

    for (let field of ['description', 'visited']) {
        if (req.body[field] !== undefined) {
            place[field] = req.body[field];
        }
    }
    res.sendStatus(204);
};

module.exports.setPlaceIndex = function (req, res) {
    let id = Number(req.params.id);
    let index = req.body;
    if (places.moveTo(id, index)) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};

module.exports.deletePlace = function (req, res) {
    if (places.remove(Number(req.params.id))) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};

module.exports.clearPlaces = function (req, res) {
    places.clear();
    res.sendStatus(204);
};

function getCompareFn(sorting) {
    switch (sorting) {
        case 'creationDate':
            return keyCompare(place => place.creationDate);

        case 'alphabet':
            return (placeA, placeB) => placeA.description.localeCompare(placeB.description);

        default:
            return;
    }
}

function keyCompare(keySelector) {
    // eslint-disable-next-line no-nested-ternary
    return (a, b) => keySelector(a) < keySelector(b) ? -1
        : (keySelector(a) > keySelector(b) ? 1 : 0);
}
