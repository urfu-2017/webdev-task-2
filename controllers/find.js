'use strict';

const User = require('../models/user');

module.exports = ({ query }, res) => {
    try {
        res.json(User.findPlaceByDescription(query.user, query.description));
    } catch (e) {
        res.sendStatus(404);
    }
};
