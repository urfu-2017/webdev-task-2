'use strict';

const Place = require('../models/place');

exports.list = (req, res) => {
    let places = [];
    const { description, sortMethod = '', max, offset = 0 } = req.query;

    if (!description) {
        places = Place.findAll();
    } else {
        places = Place.find(description);
    }
    places = sort(places, sortMethod);

    const maximum = Number(max) || places.length;
    const begin = maximum * Number(offset);
    const end = begin + maximum;

    places = places.slice(begin, end);

    res.json(places);
};

function sort(places, sortMethod) {
    switch (sortMethod) {
        case 'alphabetically':
        {
            return places.sort(function (a, b) {
                if (a.description < b.description) {
                    return -1;
                }
                if (a.description > b.description) {
                    return 1;
                }

                return 0;
            });
        }
        case 'creationDate':
        {
            return places.sort(function (a, b) {
                return new Date(a.creationDate) - new Date(b.creationDate);
            });
        }
        default:
            return places;
    }
}

exports.create = (req, res) => {
    const description = req.body.description;

    if (!description) {
        return res.sendStatus(400);
    }

    const place = new Place(description);

    place.create();

    res.sendStatus(201);
};

exports.remove = (req, res) => {
    const index = Place.get(req.params.id);

    if (index === -1) {
        return res.sendStatus(404);
    }

    Place.delete(index);

    res.sendStatus(200);
};

exports.clean = (req, res) => {
    Place.clean();

    res.sendStatus(200);
};

exports.update = (req, res) => {

    const index = Place.get(req.params.id);

    if (index === -1) {
        return res.sendStatus(404);
    }

    const data = req.body;

    if (!data.description) {
        return res.sendStatus(400);
    }

    Place.update(index, data);

    res.sendStatus(200);
};

exports.visit = (req, res) => {

    const index = Place.get(req.params.id);

    if (index === -1) {
        return res.sendStatus(404);
    }

    Place.update(index, { isVisited: true });

    res.sendStatus(200);
};

exports.swap = (req, res) => {
    const { id1, id2 } = req.params;

    const index1 = Place.get(id1);
    const index2 = Place.get(id2);

    if (index1 === -1 || index2 === -1) {
        return res.sendStatus(404);
    }

    Place.swap(index1, index2);

    res.sendStatus(200);
};
