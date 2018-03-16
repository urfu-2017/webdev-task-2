'use strict';

const fs = require('fs');
const Place = require('../models/place');

exports.swap = (req, res) => {
    const { firstId } = req.params;
    const { secondId } = req.params;
    res.sendStatus(Place.swap({ firstId, secondId }));
};

exports.change = (req, res) => {
    const { id } = req.params;
    res.sendStatus(Place.change({ id, body: req.body }));
};

exports.remove = (req, res) => {
    const { id } = req.params;
    if (id) {
        res.sendStatus(Place.remove(id));
    } else {
        res.sendStatus(Place.remove());
    }
};

exports.list = (req, res) => {
    const { query } = req;
    const places = Place.findAll({ sort: query.sort, page: query.page });

    res.json(places);
};

exports.item = (req, res) => {
    const { description } = req.params;
    const place = Place.find(description);

    if (place) {
        res.json(place);
    } else {
        res.sendStatus(404);
    }
};

exports.create = (req, res) => {
    const place = new Place(req.body);
    place.save();
    fs.writeFile('./storage/places.json', JSON.stringify(Place.findAll()),
        (error) => {
            if (error) {
                console.error(error.stack);
            }
        });

    res.sendStatus(201);
};
