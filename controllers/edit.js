'use strict';

const storage = require('../storage');

module.exports = ({ query, body, params }, res) => {
    try {
        if (!storage[query.user]) {
            res.sendStatus(404);
        }

        storage[query.user].editPlace(params.id, body.description);
        res.sendStatus(200);
    } catch (e) {
        res.sendStatus(404);
    }
};
