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

module.exports.ensureNoErrors = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const result = Object.assign(...errors.array().map(x => ({ [x.param]: x.msg })));
        res.status(HttpStatus.UNPROCESSABLE_ENTITY).json(result);
    } else {
        next();
    }

};
