'use strict';

const Place = require('../models/place');

exports.deleteAll = (req, res) => {
    Place.deleteAll();
    res.sendStatus(200);
};

exports.list = (req, res) => {
    let places = Place.getList(req.query);
    res.json(places);
};

exports.create = (req, res) => {
    const place = new Place(req.body);
    Place.add(place);
    res.sendStatus(200);
};

exports.deleteById = (req, res) => {
    if (!Place.tryDeletePlace(req.params.id)) {
        _sendIdNotExistsError(req.params.id);
    } else {
        res.sendStatus(200);
    }
};

exports.getById = (req, res) => {
    const place = Place.getById(req.params.id);
    if (place === null) {
        _sendIdNotExistsError(req.params.id);
    } else {
        res.json(place);
    }
};

exports.findByDescription = (req, res) => {
    const places = Place.findByDescription(req.params.description);
    res.json(places);
};

exports.updateDescription = (req, res) => {
    if (Place.tryUpdateDescription(req.params.id, req.params.newValue)) {
        _sendIdNotExistsError(req.params.id);
    } else {
        res.sendStatus(200);
    }
};

exports.updateMark = (req, res) => {
    let newValue = JSON.parse(req.params.newValue);
    if (typeof newValue !== 'boolean') {
        res.status(400).send(`parameter type = ${typeof newValue}, expected boolean `);
    }

    if (newValue === undefined || !Place.tryUpdateMark(req.params.id, newValue)) {
        _sendIdNotExistsError(req.params.id);
    } else {
        res.sendStatus(200);
    }
};

exports.swap = (req, res) => {
    if (!Place.trySwap(req.query.oldIndex, req.query.newIndex)) {
        return res.status(400).send('one of the indexes is out of range');
    }

    res.sendStatus(200);
};

function _sendIdNotExistsError(res, id) {
    return res.status(400).send(`place with id = ${id} doesn't exist`);
}
