'use strict';

const User = require('../models/user');

module.exports = ({ query, params }, res) => {
    try {
        res.json(User.listPlaces(query.user, params.type));
    } catch (e) {
        res.sendStatus(404);
    }
};
