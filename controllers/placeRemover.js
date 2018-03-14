'use strict';

const Storage = require('../models/placeStorage');

module.exports.deletePlace = (req, res) => {
    Storage.delete(req.params.id);
    res.sendStatus(200);
};

module.exports.deleteAll = (req, res) => {
    Storage.deleteAll();
    res.sendStatus(200);
};
