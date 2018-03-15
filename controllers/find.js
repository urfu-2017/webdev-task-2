'use strict';

const storage = require('../storage');

module.exports = ({ query }, res) => {
    if (!storage[query.user]) {
        res.sendStatus(404);
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(storage[query.user].findPlaceByDecription(query.description)));
};
