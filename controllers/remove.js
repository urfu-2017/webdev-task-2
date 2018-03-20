'use strict';
const remove = require('../models/removeModel.js');
const ObjectID = require('mongodb').ObjectID;

module.exports = async (req, res, db) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    return await remove.get(db, details, id, res);
};
