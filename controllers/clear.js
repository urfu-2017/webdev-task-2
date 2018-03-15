'use strict';

const storage = require('../storage');

module.exports = ({ query }, res) => {
    try {
        if (!storage[query.user]) {
            res.sendStatus(404);
        }

        storage[query.user].clear();
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
};
