'use strict';

const Places = require('../models/places');

module.exports.search = (req, res) => {
    const data = Places.search(req.query);
    res.json(data);
};

module.exports.append = (req, res) => {
    const { description } = req.body;
    if (description) {
        Places.append({ description });
        res.sendStatus(200);
    } else {
        res.status(400).json({ message: 'needs description string' });
    }
};

module.exports.deletePlace = (req, res) => {
    Places.delete(req.params.id);
    res.sendStatus(200);
};

module.exports.deleteAll = (req, res) => {
    Places.deleteAll();
    res.sendStatus(200);
};

module.exports.patch = (req, res) => {
    const place = Places.find(req.params.id);
    if (place === null) {
        res.status(404).json({ message: 'place not found' });
    } else {
        Places.edit(place, req.body);
        res.sendStatus(200);
    }
};
