'use strict';

const User = require('../models/user');
const storage = require('../storage');

module.exports = (req, res) => {
    try {
        if (!storage[req.query.user]) {
            storage[req.query.user] = new User();
        }

        storage[req.query.user].addPlace(req.body.name, req.body.description);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(400);
    }
};
