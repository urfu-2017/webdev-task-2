'use strict';

const Place = require('../models/place');
const errors = require('../models/errors');


exports.swap = (req, res) => {
    const { firstId, secondId } = req.params;

    const result = Place.swap({ firstId, secondId });
    if (!result) {
        return res.status(400).send({ error: errors.BAD_PARAMS });
    }

    return res.sendStatus(200);
};

exports.change = (req, res) => {
    const { id } = req.params;

    const result = Place.change({ id, body: req.body });
    if (!result) {
        return res.status(400).send({ error: errors.BAD_PARAMS });
    }

    return res.sendStatus(200);
};

exports.remove = (req, res) => {
    const { id } = req.params;

    let result;
    if (id) {
        result = Place.remove(id);
    } else {
        result = Place.remove();
    }

    if (!result) {
        return res.status(400).send({ error: errors.BAD_PARAMS });
    }

    return res.sendStatus(200);
};

exports.list = (req, res) => {
    const { sort, page } = req.query;

    const result = Place.findAll({ sort, page });
    if (!result) {
        return res.status(400).send({ error: errors.BAD_PARAMS });
    }

    res.json(result);
};

exports.item = (req, res) => {
    const { description } = req.params;

    const result = Place.findByDescription(description);
    if (!result) {
        return res.status(400).send({ error: errors.BAD_PARAMS });
    }

    res.json(result);
};

exports.create = (req, res) => {
    const { body } = req;
    const result = new Place(body);
    if (!result) {
        return res.status(400).send({ error: errors.BAD_PARAMS });
    }
    result.save();
    res.sendStatus(201);
};
