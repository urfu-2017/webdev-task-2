'use strict';

const Place = require('../models/place');

exports.list = (req, res) => {
    let places = [];
    const description = req.query.description;
    const sortMethod = req.query.sortMethod || '';

    if (!description) {
        places = Place.findAll();
    } else {
        places = Place.find(description);
    }
    places = sort(places, sortMethod);

    const max = Number(req.query.max) || places.length;
    const offset = Number(req.query.offset) || 0;
    const begin = max * offset;
    const end = begin + max;

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

    const place = new Place(req.body.description);

    place.create();

    res.sendStatus(201);
};

exports.remove = (req, res) => {
    const index = Place.get(req.params.id);

    if (index === -1) {
        res.sendStatus(404);
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
        res.sendStatus(404);
    }

    const data = req.body;

    Place.update(index, data);

    res.sendStatus(200);
};

exports.swap = (req, res) => {
    const index1 = Place.get(req.params.index1);
    const index2 = Place.get(req.params.index2);

    Place.swap(index1, index2);

    res.sendStatus(200);
};
