'use strict';

const config = require('./config/default.json');
const { error500 } = require('./controllers/errors');

module.exports.info = (req, res, next) => {
    res.locals.meta = config.meta;
    res.locals.lang = config.lang;
    res.locals.title = config.title;

    next();
};

module.exports.serverError = (err, req, res, next) => {
    /* eslint no-unused-vars: 0*/

    console.error(err);
    error500(req, res);
};
