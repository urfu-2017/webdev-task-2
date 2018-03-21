'use strict';

const User = require('../models/user');

module.exports = ({ query }, res) => {
    try {
        User.clear(query.user);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
};
