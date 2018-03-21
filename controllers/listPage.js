'use strict';

const User = require('../models/user');

module.exports = ({ query, params }, res) => {
    try {
        res.json(User.listPage(query.user, params.page, params.type));
    } catch (e) {
        res.sendStatus(404);
    }
};
