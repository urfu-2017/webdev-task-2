'use strict';

const storage = require('../storage');

module.exports = (req, res) => {
    if (!storage[req.query.user]) {
        res.sendStatus(404);
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(storage[req.query.user].listPlaces()));
};
