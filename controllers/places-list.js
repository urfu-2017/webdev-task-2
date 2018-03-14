'use strict';
const HttpStatus = require('http-status-codes');
const PlacesRepository = require('../models/places-repository');
const { ensureNoErrors } = require('./errors');
const { query } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');

const DEFAULT_PARAMS = Object.freeze({
    limit: '10',
    offset: '0',
    orderBy: null
});


module.exports.validators = {
    getAll: [
        query('orderBy')
            .optional()
            .isIn(['createdAt', 'description']),
        query('offset')
            .optional()
            .isInt({ min: 0, max: Number.MAX_SAFE_INTEGER }),
        query('limit')
            .optional()
            .isInt({ min: 0, max: 200 }),
        ensureNoErrors
    ]
};

module.exports.getAll = function (req, res) {
    const { orderBy, offset, limit } = Object.assign({}, matchedData(req), DEFAULT_PARAMS);
    const places = PlacesRepository.getAll(orderBy, Number(offset), Number(limit));
    res.json(places);
};


module.exports.clear = function (req, res) {
    PlacesRepository.clear();
    res.sendStatus(HttpStatus.NO_CONTENT);
};


