'use strict';

const DEFAULT_PAGE_COUNT = 10;

const places = require('../models/placesStorage');
const { getCompareFn } = require('../utils/utils');

module.exports.createPlace = function (req, res) {
    let id = places.createPlace(req.body.description || '').id;
    res.redirect(`/places/${id}`);
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
        result = result.slice(offset, offset + limit);
    }

    res.json(result);
};

module.exports.getPlace = function (req, res) {
    let place = places.getPlace(parseInt(req.params.id));
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

    const editableFields = [
        {
            name: 'description',
            type: 'string'
        },
        {
            name: 'visited',
            type: 'boolean'
        }
    ];

    for (let { name, type } of editableFields) {
        const userValue = req.body[name];
        if (userValue === undefined) {
            continue;
        }
        if (typeof userValue !== type) {
            res.statusCode = 400;
            res.send(`Field '${name}' must be of type '${type}'`);

            return;
        }
        place[name] = userValue;
    }
    res.sendStatus(204);
};

module.exports.setPlaceIndex = function (req, res) {
    let id = Number(req.params.id);
    let index = req.body.index;
    if (index === undefined) {
        res.sendStatus(400);

        return;
    }
    if (places.moveTo(id, index)) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};

module.exports.deletePlace = function (req, res) {
    if (places.remove(parseInt(req.params.id))) {
        res.sendStatus(204);
    } else {
        res.sendStatus(404);
    }
};

module.exports.clearPlaces = function (req, res) {
    places.clear();
    res.sendStatus(204);
};
