'use strict';

const User = require('../models/user');

module.exports = ({ query, body }, res) => {
    try {
        User.addPlace(query.user, body.name, body.description);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(400);
    }
};
