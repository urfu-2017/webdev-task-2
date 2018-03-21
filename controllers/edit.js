'use strict';

const User = require('../models/user');

module.exports = ({ query, body, params }, res) => {
    try {
        User.editPlace(query.user, params.id, body.description);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
};
