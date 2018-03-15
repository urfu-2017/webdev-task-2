'use strict';

const storage = require('../storage');

module.exports = ({ query, body }, res) => {
    try {
        if (!storage[query.user]) {
            res.sendStatus(404);
        }

        storage[query.user].switchPlaces(body.index1, body.index2);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
};
