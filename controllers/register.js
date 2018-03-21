'use strict';

const User = require('../models/user');

module.exports = ({ query }, res) => {
    try {
        User.createUser(query.user);
        res.sendStatus(201);
    } catch (e) {
        res.sendStatus(400);
    }
};
