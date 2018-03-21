'use strict';

const User = require('../models/user');

module.exports = ({ query, params }, res) => {
    try {
        User.togglePlace(query.user, params.id);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
};
