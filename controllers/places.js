'use strict';

const storage = require('../models/placeStorage');

module.exports.search = (req, res) => {
    const data = storage.search(req.query);
    res.json(data);
};

module.exports.append = (req, res) => {
    const { description } = req.body;
    if (description) {
        storage.append({ description });
        res.sendStatus(200);
    } else {
        res.status(400).json({ message: 'needs description string' });
    }
};

module.exports.deletePlace = (req, res) => {
    storage.delete(req.params.id);
    res.sendStatus(200);
};

module.exports.deleteAll = (req, res) => {
    storage.deleteAll();
    res.sendStatus(200);
};

module.exports.patch = (req, res) => {
    const editResult = storage.edit(req.params.id, req.body);
    if (editResult) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};
