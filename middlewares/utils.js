'use strict';
const HttpStatus = require('http-status-codes');
const PlacesRepository = require('../models/places-repository');
const PlaceSymbol = Symbol();


module.exports.findPlaceMiddleware = function (req, res, next) {
    const id = req.params.id;
    const place = PlacesRepository.findById(id);
    if (place !== undefined) {
        res.locals[PlaceSymbol] = place;
        next();
    } else {
        res.status(HttpStatus.NOT_FOUND).send();
    }
};

module.exports.PlaceSymbol = PlaceSymbol;
