'use strict';

const config = require('./config/default.json');
const { error500 } = require('./controllers/errors');

module.exports.bodyParseError = (err, req, res, next) => {
    console.error(err);
    next();
};

module.exports.serverError = (err, req, res, next) => {
    /* eslint no-unused-vars: 0*/

    console.error(err);
    error500(req, res);
};
