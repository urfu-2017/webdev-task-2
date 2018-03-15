'use strict';

const Storage = require('../models/placeStorage');

module.exports.edit = (req, res) => {
    const editResult = Storage.edit(req.params.id, req.body);
    if (editResult) {
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }
};

