'use strict';
const deleteAll = require('../models/deleteAll.js');

module.exports = async (req, res, db) => {
    return await deleteAll.all(db, res);
};
