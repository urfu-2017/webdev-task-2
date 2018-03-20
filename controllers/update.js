'use strict';
const Update = require('../models/updateModel.js');
const ObjectID = require('mongodb').ObjectID;

module.exports = async (req, res, db) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    let mark = req.body.mark;
    if (mark === '' || mark === undefined) {
        mark = 'X';
    }
    const note = { place: req.body.place, description: req.body.body,
        mark: mark, time: details._id.getTimestamp() };

    return await Update.get(db, details, note, res);
};
