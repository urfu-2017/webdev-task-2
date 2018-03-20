'use strict';
const HttpStatus = require('http-status-codes');
const { validationResult } = require('express-validator/check');

module.exports.error404 = (req, res) => res.status(404).send();

module.exports.allowContentType = contentType => (req, res, next) => {
    if (!req.is(contentType)) {
        res.status(HttpStatus.UNSUPPORTED_MEDIA_TYPE).send();
    } else {
        next();
    }
};

module.exports.jsonOnly = module.exports.allowContentType('application/json');

module.exports.preFlightCorsOnAllDomains = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');

    if (req.method === 'OPTIONS') {
        res.status(HttpStatus.OK).send();
    } else {
        next();
    }
};

module.exports.ensureNoErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const result = Object.assign(...errors.array().map(x => ({ [x.param]: x.msg })));
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(result);
    } else {
        next();
    }

};
