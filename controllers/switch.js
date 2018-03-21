'use strict';

const User = require('../models/user');

module.exports = ({ query, body }, res) => {
    try {
        User.switchPlaces(query.user, body.index1, body.index2);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
};
