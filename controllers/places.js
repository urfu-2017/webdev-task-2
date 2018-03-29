'use strict';

var HttpStatus = require('http-status-codes');
const Place = require('../models/place');

module.exports.post = (req, res) => {
    const place = new Place(req.body);
    if (!place.save()) {
        res.status(HttpStatus.BAD_REQUEST).send({
            error: 'invalid place for save'
        });

        return;
    }

    res.status(HttpStatus.CREATED).send(place);
};

module.exports.get = (req, res) => {
    const place = Place.find(req.params.id);
    if (!place) {
        res.status(HttpStatus.NOT_FOUND).send({
            error: `place with id "${req.params.id}" not found`
        });

        return;
    }

    res.status(HttpStatus.OK).send(place);
};

module.exports.patch = (req, res) => {
    const place = Place.find(req.params.id);
    if (!place) {
        res.status(HttpStatus.NOT_FOUND).send({
            error: `place with id "${req.params.id}" not found`
        });

        return;
    }
    place.update(req.body);
    if (!place.save()) {
        res.status(HttpStatus.BAD_REQUEST).send({
            error: 'invalid place for update'
        });

        return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
};

module.exports.getByQuery = (req, res) => {
    const result = Place.findByQuery(req.query);
    res.status(HttpStatus.OK).send(result);
};

module.exports.patchOrder = (req, res) => {
    const oldIndex = Number.parseInt(req.body.oldIndex, 10);
    const newIndex = Number.parseInt(req.body.newIndex, 10);
    if (isNaN(oldIndex) || isNaN(newIndex) || !Place.changeIndex(oldIndex, newIndex)) {
        res.status(HttpStatus.BAD_REQUEST).send({
            error: 'invalid oldIndex or newIndex'
        });

        return;
    }

    res.status(HttpStatus.NO_CONTENT).send();
};

module.exports.delete = (req, res) => {
    Place.delete(req.id);

    res.status(HttpStatus.NO_CONTENT).send();
};

module.exports.deleteAll = (req, res) => {
    Place.deleteAll();

    res.status(HttpStatus.NO_CONTENT).send();
};
