'use strict';
const HttpStatus = require('http-status-codes');
module.exports.error404 = (req, res) => res.sendStatus(404);
module.exports.preFlightCORSOnAllDomains = function (req, res, next) {
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
