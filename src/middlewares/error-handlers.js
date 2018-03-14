'use strict';

/* eslint-disable no-unused-vars */

const exceptions = require('../utils/http-exceptions');

function genericErrorHandler(err, req, res, next) {
    const type = err.constructor.name;
    const message = err.message;

    let code;
    if (err instanceof exceptions.HttpError) {
        code = err.code;
    } else {
        code = 500;
    }

    res.status(code).json({ type, message });
}

module.exports = { genericErrorHandler };
