'use strict';
const ObjectID = require('mongodb').ObjectID;
const Search = require('../models/findModel.js');
module.exports = async (req, res, db) => {

    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };

    // eslint-disable-next-line new-cap
    return await Search.Get(db, details, res);
};
