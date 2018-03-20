'use strict';

exports.setCors = (req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DETELE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
};
