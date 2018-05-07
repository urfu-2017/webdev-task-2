'use strict';
const HttpStatus = require('http-status-codes');

module.exports.error404 = (req, res) => res.sendStatus(HttpStatus.BAD_REQUEST);
