'use strict';
const HttpStatus = require('http-status-codes');
const { body } = require('express-validator/check');
const { ensureNoErrors } = require('./errors');
const Place = require('../models/place');
const PlacesRepository = require('../models/places-repository');

const PlaceSymbol = Symbol();


module.exports.validators = {
    move: [
        body('offset')
            .exists()
            .isInt(),
        ensureNoErrors
    ]
};

module.exports.create = function (req, res) {
    const description = req.body.description;
    const place = new Place(description);
    PlacesRepository.insert(place);
    res.json(place);
};


module.exports.get = function (req, res) {
    const place = res.locals[PlaceSymbol];
    res.json(place);
};

module.exports.update = function (req, res) {
    const place = res.locals[PlaceSymbol];
    Object.assign(place, req.body);
    res.json(place);
};

module.exports.remove = function (req, res) {
    const place = res.locals[PlaceSymbol];
    PlacesRepository.remove(place);
    res.status(HttpStatus.NO_CONTENT).send();
};

module.exports.validateId = function (req, res, next) {
    const id = req.params.id;
    const place = PlacesRepository.findById(id);
    if (place !== undefined) {
        res.locals[PlaceSymbol] = place;
        next();
    } else {
        res.status(HttpStatus.NOT_FOUND).send();
    }
};

module.exports.move = function (req, res) {
    const place = res.locals[PlaceSymbol];
    const succeed = PlacesRepository.tryMove(place, req.body.offset);
    if (succeed) {
        res.status(HttpStatus.OK).send();
    } else {
        res.status(HttpStatus.BAD_REQUEST).send();
    }
};

