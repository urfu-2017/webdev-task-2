'use strict';

const Storage = require('../models/placeStorage');

module.exports.search = (req, res) => {
    const data = Storage.search(req.params);
    res.json(data);
};

module.exports.append = (req, res) => {
    if (req.body.hasOwnProperty('description')) {
        Storage.append({ description: req.body.description });
        res.sendStatus(200);
    } else {
        res.sendStatus(400);
    }

};
