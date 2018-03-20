'use strict';
const HttpStatus = require('http-status-codes');
const { body } = require('express-validator/check');
const { ensureNoErrors } = require('./errors');
const Place = require('../models/place');
const PlacesRepository = require('../models/places-repository');
const { PlaceSymbol } = require('../middlewares/utils');

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
    Object.keys(place)
        .filter(key => key !== 'id')
        .filter(key => key in req.body)
        .forEach(key => {
            place[key] = req.body[key];
        });
    res.json(place);
};

module.exports.remove = function (req, res) {
    const place = res.locals[PlaceSymbol];
    PlacesRepository.remove(place);
    res.status(HttpStatus.NO_CONTENT).send();
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

