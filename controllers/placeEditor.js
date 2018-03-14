'use strict';

const Storage = require('../models/placeStorage');

module.exports.edit = (req, res) => {
    const visitResult = Storage.edit(req.params.id, req.body);
    if (visitResult) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};

