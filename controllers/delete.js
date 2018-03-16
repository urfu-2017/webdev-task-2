'use strict';

const storage = require('../storage');

module.exports = ({ query, params }, res) => {
    try {
        if (!storage[query.user]) {
            res.sendStatus(404);
        }

        storage[query.user].deletePlace(params.id);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
};
