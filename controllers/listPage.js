'use strict';

const storage = require('../storage');

module.exports = ({ query, params }, res) => {
    if (!storage[query.user]) {
        res.sendStatus(404);
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(storage[query.user].listPage(params.page, params.type)));
};
